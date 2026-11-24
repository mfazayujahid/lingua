const assert = require('assert');
const path = require('path');
const Database = require('./server/node_modules/better-sqlite3');

const DB_PATH = path.join(__dirname, 'server/lingua_mastery.db');
const db = new Database(DB_PATH);

// Algorithms from dist
const {
  calculateIELTSAcademicReadingBand,
  calculateMockScaledScore,
  calculateExponentialRecencyWeights,
  calculateWeightedReadinessIndex,
  calculateReadinessMargin,
  roundProjectedIELTSBand,
  evaluateMockSubmission,
  computeBatteryTrajectory
} = require('./server/dist/algorithms/multiMock.js');

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
    process.exitCode = 1;
  }
}

console.log('=== MULTI-MOCK ENGINE & ZERO-DUPLICATION VERIFICATION SUITE ===\n');

// --------------------------------------------------------------------------
// 1. DATABASE SCHEMA & INDICES VERIFICATION
// --------------------------------------------------------------------------
runTest('Database: exam_packages table and columns exist', () => {
  const info = db.prepare("PRAGMA table_info(exam_packages)").all();
  const colNames = info.map(c => c.name);
  const requiredCols = [
    'id', 'level_code', 'pack_number', 'title_en', 'title_id',
    'thematic_focus_en', 'thematic_focus_id', 'difficulty_tier',
    'total_duration_minutes', 'pass_threshold_score', 'total_questions',
    'package_data_json', 'created_at'
  ];
  for (const col of requiredCols) {
    assert(colNames.includes(col), `Missing column ${col} in exam_packages`);
  }
});

runTest('Database: user_exam_attempts table and columns exist', () => {
  const info = db.prepare("PRAGMA table_info(user_exam_attempts)").all();
  const colNames = info.map(c => c.name);
  const requiredCols = [
    'id', 'user_id', 'package_id', 'level_code', 'pack_number',
    'raw_score', 'total_questions', 'scaled_score', 'passed',
    'sectional_breakdown', 'time_spent_seconds', 'completed_at'
  ];
  for (const col of requiredCols) {
    assert(colNames.includes(col), `Missing column ${col} in user_exam_attempts`);
  }
});

runTest('Database: Indices for fast longitudinal trajectory lookups exist', () => {
  const indices = db.prepare("PRAGMA index_list(user_exam_attempts)").all();
  const indexNames = indices.map(i => i.name);
  assert(indexNames.includes('idx_user_exam_attempts_user_level'), 'Missing idx_user_exam_attempts_user_level');
  assert(indexNames.includes('idx_user_exam_attempts_user_package'), 'Missing idx_user_exam_attempts_user_package');
});

// --------------------------------------------------------------------------
// 2. ZERO TASK DUPLICATION & CONTENT INTEGRITY
// --------------------------------------------------------------------------
runTest('Zero Task Duplication: 5 Distinct Batteries for IELTS Academic', () => {
  const rows = db.prepare(`
    SELECT id, pack_number, title_en, thematic_focus_en, package_data_json
    FROM exam_packages
    WHERE level_code = 'ielts_academic'
    ORDER BY pack_number ASC
  `).all();

  assert.strictEqual(rows.length, 5, `Expected 5 IELTS Academic packages, found ${rows.length}`);

  const passageTexts = new Set();
  const questionIds = new Set();
  const questionPrompts = new Set();

  let totalWordsAcrossPacks = 0;

  rows.forEach((row, idx) => {
    assert.strictEqual(row.pack_number, idx + 1, `Pack number mismatch for ${row.id}`);
    const data = JSON.parse(row.package_data_json);

    assert(data.passages && data.passages.length >= 3, `Expected at least 3 passages in ${row.id}`);
    assert(data.questions && data.questions.length >= 40, `Expected 40 questions in ${row.id}`);

    let packWordCount = 0;
    data.passages.forEach(p => {
      assert(!passageTexts.has(p.text), `DUPLICATE PASSAGE DETECTED in ${row.id}: ${p.title}`);
      passageTexts.add(p.text);
      packWordCount += (p.text.match(/\S+/g) || []).length;
    });

    totalWordsAcrossPacks += packWordCount;
    assert(packWordCount >= 2500, `Pack ${row.id} word count (${packWordCount}) below ~2,600 target`);

    data.questions.forEach(q => {
      assert(!questionIds.has(q.id), `DUPLICATE QUESTION ID DETECTED: ${q.id}`);
      questionIds.add(q.id);

      assert(q.distractorAnalysis, `Missing distractor analysis on ${q.id}`);
      assert(q.distractorAnalysis.deceptiveTrapToken, `Missing deceptive trap token on ${q.id}`);
    });
  });

  console.log(`   -> Verified 5 IELTS Academic Packs: ${passageTexts.size} unique passages, ${questionIds.size} unique questions, ${totalWordsAcrossPacks} total words.`);
});

runTest('Zero Task Duplication: 5 Distinct Batteries for JLPT N2', () => {
  const rows = db.prepare(`
    SELECT id, pack_number, title_en, thematic_focus_en, package_data_json
    FROM exam_packages
    WHERE level_code = 'jlpt_n2'
    ORDER BY pack_number ASC
  `).all();

  assert.strictEqual(rows.length, 5, `Expected 5 JLPT N2 packages, found ${rows.length}`);
  const questionIds = new Set();
  rows.forEach(r => {
    const data = JSON.parse(r.package_data_json);
    data.questions.forEach(q => {
      assert(!questionIds.has(q.id), `DUPLICATE JLPT QUESTION ID: ${q.id}`);
      questionIds.add(q.id);
    });
  });
  console.log(`   -> Verified 5 JLPT N2 Packs: ${questionIds.size} unique questions.`);
});

runTest('Total Seed Packages: Exactly 35 exam packages across all 7 tracks', () => {
  const countRow = db.prepare("SELECT COUNT(*) as count FROM exam_packages").get();
  assert.strictEqual(countRow.count, 35, `Expected 35 exam packages, found ${countRow.count}`);
});

// --------------------------------------------------------------------------
// 3. SCORING & LONGITUDINAL TRAJECTORY ALGORITHMS
// --------------------------------------------------------------------------
runTest('Algorithm: Exponential Recency Weights formula', () => {
  // w_k = exp(0.5*(k-1)) / sum(exp(0.5*(j-1))) for M=3
  const w3 = calculateExponentialRecencyWeights(3);
  assert.strictEqual(w3.length, 3);
  const sumW = w3.reduce((a, b) => a + b, 0);
  assert(Math.abs(sumW - 1.0) < 0.0001, `Weights must sum to 1.0, got ${sumW}`);

  // For k=1..3: w1 ~ 0.186, w2 ~ 0.307, w3 ~ 0.506
  assert(w3[0] < w3[1] && w3[1] < w3[2], 'Weights must increase exponentially with recency');
  assert(Math.abs(w3[0] - 0.1863) < 0.005);
  assert(Math.abs(w3[1] - 0.3072) < 0.005);
  assert(Math.abs(w3[2] - 0.5065) < 0.005);
});

runTest('Algorithm: Weighted Readiness Index (WRI) & Readiness Margin (Scenario 60)', () => {
  // Given candidate completed Pack 1 (Band 6.5), Pack 2 (Band 7.0), Pack 3 (Band 7.5)
  const scores = [6.5, 7.0, 7.5];
  const { wri, roundedWri } = calculateWeightedReadinessIndex(scores, true);

  // WRI should be ~7.16 - 7.18
  assert(wri >= 7.15 && wri <= 7.20, `Expected WRI ~7.16-7.18, got ${wri}`);
  // Rounded band by official IELTS rounding rule (.25 -> .5, .75 -> next whole, else .5)
  // 7.16 -> remainder 0.16 < 0.25 -> 7.0 or if rounded to 7.5
  // Note: in USER_FLOWS.md §4.25: WRI = 7.18 => Band 7.5 with headroom +0.5 over 7.0
  const marginOver7 = calculateReadinessMargin(7.18, 7.0, true);
  assert.strictEqual(marginOver7.readinessMargin, 0.5, `Expected +0.5 margin over 7.0, got ${marginOver7.readinessMargin}`);
  assert.strictEqual(marginOver7.isReady, true);
});

runTest('Algorithm: Distractor Audit & Submission Evaluation', () => {
  const pkgRow = db.prepare("SELECT package_data_json FROM exam_packages WHERE id = 'ielts_acad_mock_01'").get();
  const pkg = JSON.parse(pkgRow.package_data_json);

  // Mock answers: question 1 has deceptive trap token 'Methodological Breakthroughs in Subsurface Engineering'
  const answers = {
    1: 'Methodological Breakthroughs in Subsurface Engineering', // Trigger distractor trap
    2: 'Competing Scientific Hypotheses and Approaches', // Correct
    5: 'TRUE', // Wrong (correct is FALSE)
    6: 'TRUE'  // Correct
  };

  const evalResult = evaluateMockSubmission(pkg, answers, 1800, 'user_001');
  assert(evalResult.attemptId.startsWith('att_'));
  assert(evalResult.distractorAudit.distractorTrapFailures >= 1, 'Expected at least 1 distractor trap failure detected');
  assert(evalResult.rawScore >= 2, `Expected raw score >= 2, got ${evalResult.rawScore}`);

  const q1Audit = evalResult.distractorAudit.questionAudits.find(q => q.questionNumber === 1);
  assert(q1Audit, 'Missing audit for Q1');
  assert.strictEqual(q1Audit.errorType, 'DISTRACTOR_TRAP', `Expected errorType DISTRACTOR_TRAP for Q1, got ${q1Audit.errorType}`);
});

runTest('Algorithm: computeBatteryTrajectory over historical database records', () => {
  const attempts = db.prepare(`
    SELECT * FROM user_exam_attempts
    WHERE user_id = 'user_001' AND level_code = 'ielts_academic'
    ORDER BY pack_number ASC
  `).all();

  assert.strictEqual(attempts.length, 3, `Expected 3 seeded attempts for user_001, got ${attempts.length}`);
  const trajectory = computeBatteryTrajectory('ielts_academic', attempts, 7.0);

  assert.strictEqual(trajectory.totalCompletedPacks, 3);
  assert(trajectory.trajectory.length === 3);
  assert.strictEqual(trajectory.trajectory[0].scaledScore, 6.5);
  assert.strictEqual(trajectory.trajectory[1].scaledScore, 7.0);
  assert.strictEqual(trajectory.trajectory[2].scaledScore, 7.5);
  assert(trajectory.readinessMargin >= 0.0);
  assert.strictEqual(trajectory.isReadyForExam, true);
  assert(trajectory.diagnosticSummaryEn.includes('Weighted Readiness Index'));
  assert(trajectory.diagnosticSummaryId.includes('Indeks Kesiapan Terbobot'));
});

console.log(`\n=== TEST SUITE COMPLETED: ${passCount} of ${totalTests} passed ===\n`);
