const assert = require('assert');

// 1. IELTS Algorithm Verification
const {
  rawToIELTSListeningBand,
  rawToIELTSAcademicReadingBand,
  roundIELTSBand,
  evaluateIELTSWriting
} = require('./server/dist/algorithms/ielts.js');

// 2. JLPT Algorithm Verification
const { evaluateJLPTResult } = require('./server/dist/algorithms/jlpt.js');

// 3. SRS Algorithm Verification
const { calculateSRSReview } = require('./server/dist/algorithms/srs.js');

// 4. WeakSpot Algorithm Verification
const { computeMasteryIndex } = require('./server/dist/algorithms/weakSpot.js');

let passCount = 0;
let totalTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`[PASS] ${name}`);
    passCount++;
  } catch (err) {
    console.error(`[FAIL] ${name}: ${err.message}`);
  }
}

console.log('=== RUNNING CORE ALGORITHM & CRITERIA TEST SUITE ===\n');

// --- IELTS ROUNDING RULES ---
runTest('IELTS Rounding: .25 rounds up to .5 (6.25 -> 6.5)', () => {
  assert.strictEqual(roundIELTSBand(6.25), 6.5);
});

runTest('IELTS Rounding: .125 rounds down to .0 (6.125 -> 6.0)', () => {
  assert.strictEqual(roundIELTSBand(6.125), 6.0);
});

runTest('IELTS Rounding: .75 rounds up to next whole band (6.75 -> 7.0)', () => {
  assert.strictEqual(roundIELTSBand(6.75), 7.0);
});

runTest('IELTS Rounding: .875 rounds up to next whole band (7.875 -> 8.0)', () => {
  assert.strictEqual(roundIELTSBand(7.875), 8.0);
});

runTest('IELTS Reading Band Table (34/40 raw -> 7.5)', () => {
  assert.strictEqual(rawToIELTSAcademicReadingBand(34), 7.5);
  assert.strictEqual(rawToIELTSAcademicReadingBand(30), 7.0);
  assert.strictEqual(rawToIELTSAcademicReadingBand(39), 9.0);
  assert.strictEqual(rawToIELTSAcademicReadingBand(15), 5.0);
});

runTest('IELTS Writing Rubric Evaluation (Word count penalty on short essay)', () => {
  const shortEssay = 'This is a short essay with only a few words.';
  const evalResult = evaluateIELTSWriting(2, shortEssay);
  assert.strictEqual(evalResult.wordCountSatisfied, false);
  assert(evalResult.criteria.taskResponseOrAchievement.score <= 5.0);
});

runTest('IELTS Writing Rubric Evaluation (Academic essay scores Band 7+)', () => {
  const academicEssay = `The ubiquitous proliferation of artificial intelligence across cognitive domains once deemed the exclusive preserve of human intellect has precipitated fierce debate. While technocentric optimists contend that autonomous algorithms will liberate humanity from computational drudgery, skeptics warn of acute intellectual atrophy and unprecedented socioeconomic dislocation. In my view, while structural disruptions are inevitable, judicious governance and educational reinvention can transform automation into an empowering cognitive catalyst.

On the one hand, apprehensions regarding intellectual deskilling are deeply substantiated. As generative models and analytical software assume responsibility for critical synthesis, diagnostic medicine, and software engineering, human practitioners risk succumbing to automated complacency. The cognitive degradation that accompanied basic mental arithmetic following the advent of digital calculators may be replicated on an exponential scale across complex problem-solving domains. Furthermore, without substantial social safety nets, displaced knowledge workers may struggle to transition into nascent industries, exacerbating socioeconomic bifurcation.

Conversely, proponents legitimately argue that automation historically shifts human enterprise up the value curve. By delegating iterative data processing and rote syntactical analysis to machines, professionals can redirect their focus toward conceptual creativity, philosophical inquiry, and empathetic leadership. In healthcare, for instance, algorithms capable of interpreting radiological scans with superior accuracy do not render physicians obsolete; rather, they enable practitioners to allocate greater temporal resources to holistic patient dialogue and complex palliative decisions. Thus, human agency is elevated rather than extinguished.

In conclusion, the transformative potential of artificial intelligence is neither inherently emancipatory nor disastrous. To prevent pervasive cognitive atrophy and economic disparity, educational institutions must pivot from memorization to high-order dialectical reasoning, and policymakers must enforce robust transitional frameworks. Provided these safeguards are enacted, automation will serve as an indispensable cognitive partner rather than a replacement for human intellect.`;
  const evalResult = evaluateIELTSWriting(2, academicEssay);
  assert(evalResult.wordCount >= 250, `Expected word count >= 250, got ${evalResult.wordCount}`);
  assert.strictEqual(evalResult.wordCountSatisfied, true);
  assert(evalResult.overallBand >= 7.0, `Expected overallBand >= 7.0, got ${evalResult.overallBand}`);
  assert(evalResult.criteria.lexicalResource.score >= 7.0);
});

// --- JLPT SCORING & 19-PT CUTOFF SAFEGUARDS ---
runTest('JLPT N2 Passing scenario (Total >= 90 and all sections >= 19)', () => {
  // LK: 45/60, Reading: 40/60, Listening: 35/60 -> Total: 120/180
  const result = evaluateJLPTResult(
    'N2',
    { correct: 45, total: 60 },
    { correct: 40, total: 60 },
    { correct: 35, total: 60 }
  );
  assert.strictEqual(result.passed, true);
  assert.strictEqual(result.isCutoffCasualty, false);
  assert.strictEqual(result.totalScore, 120);
});

runTest('JLPT N2 Cutoff Casualty scenario (Total >= 90 but Listening < 19)', () => {
  // LK: 50/60, Reading: 45/60, Listening: 15/60 -> Total: 110/180 (> 90 threshold)
  // Listening: 15 < 19
  const result = evaluateJLPTResult(
    'N2',
    { correct: 50, total: 60 },
    { correct: 45, total: 60 },
    { correct: 15, total: 60 }
  );
  assert.strictEqual(result.isTotalPassed, true);
  assert.strictEqual(result.isListeningPassed, false);
  assert.strictEqual(result.passed, false);
  assert.strictEqual(result.isCutoffCasualty, true);
});

runTest('JLPT N1 Cutoff Casualty scenario (Total >= 100 but Reading < 19)', () => {
  // LK: 55/60, Reading: 18/60, Listening: 40/60 -> Total: 113/180 (> 100 threshold)
  const result = evaluateJLPTResult(
    'N1',
    { correct: 55, total: 60 },
    { correct: 18, total: 60 },
    { correct: 40, total: 60 }
  );
  assert.strictEqual(result.isTotalPassed, true);
  assert.strictEqual(result.isReadingPassed, false);
  assert.strictEqual(result.passed, false);
  assert.strictEqual(result.isCutoffCasualty, true);
});

runTest('JLPT N3 Standard Fail scenario (Total < 95)', () => {
  // LK: 25/60, Reading: 25/60, Listening: 25/60 -> Total: 75/180
  const result = evaluateJLPTResult(
    'N3',
    { correct: 25, total: 60 },
    { correct: 25, total: 60 },
    { correct: 25, total: 60 }
  );
  assert.strictEqual(result.isTotalPassed, false);
  assert.strictEqual(result.passed, false);
  assert.strictEqual(result.isCutoffCasualty, false);
});

// --- FSRS / SM-2 SPACED REPETITION ENGINE ---
runTest('SRS: New card rated GOOD graduates step', () => {
  const item = {
    id: 'srs_test_1',
    userId: 'u1',
    itemType: 'vocab',
    prompt: 'paradigm',
    backContent: {},
    state: 'new',
    step: 0,
    intervalDays: 0,
    easeFactor: 2.50,
    stability: 1.0,
    difficulty: 5.0,
    repetitions: 0,
    lapses: 0,
    dueDate: new Date().toISOString()
  };
  const res = calculateSRSReview(item, 3);
  assert.strictEqual(res.nextStep, 1);
  assert.strictEqual(res.nextIntervalDays, 1.0);
});

runTest('SRS: Review card rated EASY increases interval and ease factor', () => {
  const item = {
    id: 'srs_test_2',
    userId: 'u1',
    itemType: 'kanji',
    prompt: '対',
    backContent: {},
    state: 'review',
    step: 2,
    intervalDays: 6,
    easeFactor: 2.50,
    stability: 6.0,
    difficulty: 5.0,
    repetitions: 3,
    lapses: 0,
    dueDate: new Date().toISOString()
  };
  const res = calculateSRSReview(item, 4);
  assert.strictEqual(res.nextState, 'review');
  assert(res.nextEaseFactor >= 2.50, `Expected EF >= 2.50, got ${res.nextEaseFactor}`);
  assert(res.nextIntervalDays >= 18, `Expected next interval >= 18 days, got ${res.nextIntervalDays}`);
});

runTest('SRS: Review card rated AGAIN triggers lapse and relearning state', () => {
  const item = {
    id: 'srs_test_3',
    userId: 'u1',
    itemType: 'vocab',
    prompt: 'ubiquitous',
    backContent: {},
    state: 'review',
    step: 2,
    intervalDays: 30,
    easeFactor: 2.50,
    stability: 30.0,
    difficulty: 5.0,
    repetitions: 5,
    lapses: 0,
    dueDate: new Date().toISOString()
  };
  const res = calculateSRSReview(item, 1);
  assert.strictEqual(res.nextState, 'relearning');
  assert.strictEqual(res.nextStep, 0);
  assert(res.nextEaseFactor < 2.50);
  assert(res.nextIntervalDays < 1.0);
});

// --- WEAK-SPOT & MASTERY INDEX ---
runTest('WeakSpot Mastery Index: High failure rate flags as critical weak spot', () => {
  const attempts = [
    { isCorrect: false, daysAgo: 1 },
    { isCorrect: false, daysAgo: 2 },
    { isCorrect: false, daysAgo: 3 },
    { isCorrect: true, daysAgo: 7 }
  ];
  const m = computeMasteryIndex(attempts, 1.5, 2.0);
  assert.strictEqual(m.isCritical, true);
  assert(m.masteryIndex < 0.65);
});

runTest('WeakSpot Mastery Index: Consistent success marks proficient (not critical)', () => {
  const attempts = [
    { isCorrect: true, daysAgo: 1 },
    { isCorrect: true, daysAgo: 2 },
    { isCorrect: true, daysAgo: 3 },
    { isCorrect: true, daysAgo: 4 }
  ];
  const m = computeMasteryIndex(attempts, 15.0, 1.0);
  assert.strictEqual(m.isCritical, false);
  assert(m.masteryIndex >= 0.80);
});

console.log(`\nAlgorithm Tests Summary: ${passCount}/${totalTests} PASSED.\n`);
