const http = require('http');
const assert = require('assert');

// Set port to 5002 to avoid collision
process.env.PORT = '5002';

// Import and start app
const { server } = require('./server/dist/index.js');

async function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runApiTests() {
  await wait(1000); // Give server a moment to start
  console.log('=== TESTING MULTI-MOCK REST API ENDPOINTS (/api/exams) ===\n');

  let passed = 0;
  let total = 0;

  async function test(name, fn) {
    total++;
    try {
      await fn();
      console.log(`[PASS] ${name}`);
      passed++;
    } catch (e) {
      console.error(`[FAIL] ${name}: ${e.message}`);
      process.exitCode = 1;
    }
  }

  // 1. GET /api/exams/packages?track=ielts_academic
  await test('GET /api/exams/packages?track=ielts_academic returns 5 packages with attempt summaries', async () => {
    const res = await fetch('http://localhost:5002/api/exams/packages?track=ielts_academic&userId=user_001');
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.track, 'ielts_academic');
    assert.strictEqual(data.packages.length, 5);
    assert.strictEqual(data.packages[0].id, 'ielts_acad_mock_01');
    assert.strictEqual(data.packages[0].packNumber, 1);
    assert(data.packages[0].thematicFocusEn.includes('Chronometry'));

    // Check attempt summaries for user_001 (Pack 1, 2, 3 should have attempt summaries)
    assert(data.packages[0].attemptSummary, 'Pack 1 should have attemptSummary');
    assert.strictEqual(data.packages[0].attemptSummary.latestScaledScore, 6.5);

    assert(data.packages[1].attemptSummary, 'Pack 2 should have attemptSummary');
    assert.strictEqual(data.packages[1].attemptSummary.latestScaledScore, 7.0);

    assert(data.packages[2].attemptSummary, 'Pack 3 should have attemptSummary');
    assert.strictEqual(data.packages[2].attemptSummary.latestScaledScore, 7.5);
    assert.strictEqual(data.packages[2].attemptSummary.passed, true);
  });

  // 2. GET /api/exams/packages/ielts_acad_mock_01
  await test('GET /api/exams/packages/ielts_acad_mock_01 returns full questions and passage content', async () => {
    const res = await fetch('http://localhost:5002/api/exams/packages/ielts_acad_mock_01');
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    const pkg = data.package || data;
    assert.strictEqual(pkg.id, 'ielts_acad_mock_01');
    assert.strictEqual(pkg.passages.length, 3);
    assert.strictEqual(pkg.questions.length, 40);
    assert(pkg.passages[0].text.length > 500);
    assert.strictEqual(pkg.questions[0].itemType, 'matching_headings');
    assert(pkg.questions[0].distractorAnalysis, 'Question should have distractor analysis');
  });

  // 3. GET /api/exams/trajectory?track=ielts_academic (Scenario 60: 3 seeded packs -> WRI 7.18 => Band 7.5, Headroom +0.5)
  await test('GET /api/exams/trajectory?track=ielts_academic returns longitudinal progression and WRI metrics', async () => {
    const res = await fetch('http://localhost:5002/api/exams/trajectory?track=ielts_academic&userId=user_001');
    assert.strictEqual(res.status, 200);
    const traj = await res.json();
    assert.strictEqual(traj.levelCode, 'ielts_academic');
    assert(traj.totalCompletedPacks === 3, `Expected exactly 3 completed packs, got ${traj.totalCompletedPacks}`);
    assert(traj.weightedReadinessIndex >= 7.0, `Expected WRI >= 7.0, got ${traj.weightedReadinessIndex}`);
    assert.strictEqual(traj.roundedWeightedReadinessIndex, 7.5);
    assert.strictEqual(traj.readinessMargin, 0.5, `Expected +0.5 headroom, got ${traj.readinessMargin}`);
    assert.strictEqual(traj.isReadyForExam, true);
    assert(traj.diagnosticSummaryEn.includes('Weighted Readiness Index'));
    assert(traj.diagnosticSummaryId.includes('Indeks Kesiapan Terbobot'));
  });

  // 4. POST /api/exams/submit
  await test('POST /api/exams/submit records attempt and evaluates score with distractor audit', async () => {
    const payload = {
      packageId: 'ielts_acad_mock_04',
      userId: 'user_002',
      timeSpentSeconds: 3200,
      answers: {
        1: 'Methodological Breakthroughs in Subsurface Engineering', // Deceptive trap token
        2: 'Competing Scientific Hypotheses and Approaches', // Correct
        5: 'FALSE', // Correct
        6: 'TRUE',  // Correct
        7: 'FALSE'  // Correct
      }
    };

    const res = await fetch('http://localhost:5002/api/exams/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    assert.strictEqual(res.status, 200);
    const evalData = await res.json();
    assert(evalData.attemptId, 'Should return attemptId');
    assert(evalData.rawScore >= 4, `Expected rawScore >= 4, got ${evalData.rawScore}`);
    assert(evalData.scaledScore !== undefined, 'Should return scaledScore');
    assert(evalData.distractorAudit, 'Should return distractorAudit');
    assert(evalData.distractorAudit.distractorTrapFailures >= 1, 'Should record distractor trap failure');
    assert(evalData.sectionalBreakdown, 'Should return sectionalBreakdown');
  });

  // 5. GET /api/exams/packages?track=jlpt_n2
  await test('GET /api/exams/packages?track=jlpt_n2 returns 5 JLPT packages', async () => {
    const res = await fetch('http://localhost:5002/api/exams/packages?track=jlpt_n2&userId=user_001');
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.packages.length, 5);
    assert.strictEqual(data.packages[0].id, 'jlpt_n2_mock_pack_01');
    assert.strictEqual(data.packages[0].passThresholdScore, 90);
  });

  console.log(`\n=== API TEST SUMMARY: ${passed} of ${total} passed ===\n`);
  if (server && server.close) {
    server.close();
  }
}

runApiTests();
