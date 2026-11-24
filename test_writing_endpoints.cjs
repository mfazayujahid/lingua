const assert = require('assert');

async function testEndpoints() {
  console.log('=== TESTING PHASE 4 WRITING HTTP ENDPOINTS ===\n');

  process.env.PORT = '5055';
  // Import app from compiled server
  const { default: app, server } = require('./server/dist/index');

  // Get port
  const address = server.address();
  const port = typeof address === 'object' && address ? address.port : 5000;
  const baseUrl = `http://localhost:${port}/api/writing`;
  console.log(`Testing against server at: ${baseUrl}`);

  try {
    // 1. GET /api/writing/prompts
    console.log('\n1. Testing GET /api/writing/prompts...');
    const resPrompts = await fetch(`${baseUrl}/prompts`);
    assert.strictEqual(resPrompts.status, 200);
    const dataPrompts = await resPrompts.json();
    assert(Array.isArray(dataPrompts.prompts), 'Should return prompts array');
    console.log(`Fetched ${dataPrompts.prompts.length} prompts.`);
    assert(dataPrompts.prompts.length >= 3, 'Must have at least 3 prompts');
    const firstPrompt = dataPrompts.prompts[0];
    assert(firstPrompt.id && firstPrompt.title && firstPrompt.promptText, 'Prompt must have core fields');
    console.log('✔ GET /api/writing/prompts passed.');

    // 2. GET /api/writing/prompts?taskType=task_1
    console.log('\n2. Testing GET /api/writing/prompts?taskType=task_1...');
    const resT1 = await fetch(`${baseUrl}/prompts?taskType=task_1`);
    assert.strictEqual(resT1.status, 200);
    const dataT1 = await resT1.json();
    assert(dataT1.prompts.length >= 2, 'Should have task_1 prompts');
    for (const p of dataT1.prompts) {
      assert(p.task_type.includes('task_1') || p.task_type.includes('task1'), 'Should be task 1');
    }
    console.log(`Fetched ${dataT1.prompts.length} task_1 prompts. ✔ Passed.`);

    // 3. GET /api/writing/prompts/:id
    console.log('\n3. Testing GET /api/writing/prompts/:id...');
    const resDetail = await fetch(`${baseUrl}/prompts/ielts_write_t1_acad_seed01`);
    assert.strictEqual(resDetail.status, 200);
    const dataDetail = await resDetail.json();
    assert(dataDetail.prompt, 'Should return prompt object');
    assert.strictEqual(dataDetail.prompt.id, 'ielts_write_t1_acad_seed01');
    assert.strictEqual(dataDetail.prompt.minimumWords, 150);
    assert(dataDetail.prompt.visualDataPoints, 'Should parse visualDataPoints');
    assert(dataDetail.prompt.guidanceNotes && dataDetail.prompt.guidanceNotesId, 'Should have bilingual guidance notes');
    console.log('✔ GET /api/writing/prompts/:id passed.');

    // Test 404
    const res404 = await fetch(`${baseUrl}/prompts/non_existent_prompt_999`);
    assert.strictEqual(res404.status, 404);
    console.log('✔ Non-existent prompt correctly returns 404.');

    // 4. POST /api/writing/evaluate
    console.log('\n4. Testing POST /api/writing/evaluate...');
    const candidateEssay = 
      'The provided line graph and table shows the changes in electricity generation from renewable and fossil fuels in four countries from 2010 to 2025.\n\n' +
      'Overall, it can clearly be seen that Germany and UK increased their renewable energy a lot, while Poland still used mostly fossil fuels.\n\n' +
      'Looking at the Western nations, the UK had a big growth. In 2010, renewable energy was only 9%, but in 2025 it became 42%. Germany also showed good progress, rising from 18% to 51% in 2025, which made it the biggest renewable producer. In Spain, renewable generation was 24% at first and then went up to 46% by 2025.\n\n' +
      'On the other hand, Poland was very different. In 2010, coal and gas made 93% of energy, and in 2025 it only dropped to 78%. In conclusion, western countries are doing much better than eastern countries in clean energy.';

    const evalPayload = {
      promptId: 'ielts_write_t1_acad_seed01',
      taskType: 'task1_academic',
      essayContent: candidateEssay,
      durationSeconds: 1140,
      isTimedMode: true,
      locale: 'id',
      userId: 'user_001'
    };

    const resEval = await fetch(`${baseUrl}/evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(evalPayload)
    });

    assert.strictEqual(resEval.status, 200);
    const evalResult = await resEval.json();
    assert(evalResult.submissionId, 'Should return submissionId');
    assert.strictEqual(evalResult.overallBand, 6.0, 'Should evaluate candidate draft to Band 6.0');
    assert(evalResult.criteriaScores, 'Should include criteriaScores');
    assert(evalResult.wordCountMetrics, 'Should include wordCountMetrics');
    assert(evalResult.linguisticMetrics, 'Should include linguisticMetrics');
    assert(Array.isArray(evalResult.annotations), 'Should include annotations');
    assert(evalResult.annotations.length > 0, 'Should have diagnostic annotations');
    assert(evalResult.modelAnswerComparison, 'Should include modelAnswerComparison');
    console.log(`Evaluated submissionId: ${evalResult.submissionId}, overallBand: ${evalResult.overallBand}`);
    console.log('✔ POST /api/writing/evaluate passed.');

    // 5. GET /api/writing/submissions
    console.log('\n5. Testing GET /api/writing/submissions...');
    const resSubs = await fetch(`${baseUrl}/submissions?userId=user_001`);
    assert.strictEqual(resSubs.status, 200);
    const dataSubs = await resSubs.json();
    assert(Array.isArray(dataSubs.submissions), 'Should return submissions array');
    assert(dataSubs.submissions.length >= 1, 'Should contain at least the recent submission');
    const matchedSub = dataSubs.submissions.find(s => s.submissionId === evalResult.submissionId);
    assert(matchedSub, 'Recent submission must be listed in history');
    assert.strictEqual(matchedSub.overallBand, 6.0);
    console.log(`Fetched ${dataSubs.submissions.length} submissions for user_001. ✔ Passed.`);

    // 6. GET /api/writing/submissions/:id
    console.log('\n6. Testing GET /api/writing/submissions/:id...');
    const resSubDetail = await fetch(`${baseUrl}/submissions/${evalResult.submissionId}`);
    assert.strictEqual(resSubDetail.status, 200);
    const dataSubDetail = await resSubDetail.json();
    assert(dataSubDetail.submission, 'Should return submission object');
    assert.strictEqual(dataSubDetail.submission.id, evalResult.submissionId);
    assert(dataSubDetail.scorecard, 'Should return scorecard object');
    assert.strictEqual(dataSubDetail.scorecard.overallBand, 6.0);
    assert(dataSubDetail.scorecard.annotations.length > 0, 'Scorecard should preserve annotations');
    console.log('✔ GET /api/writing/submissions/:id passed.');

    console.log('\n======================================================');
    console.log('✔ ALL 5 REST API ENDPOINTS TESTED AND VERIFIED CLEANLY');
    console.log('======================================================\n');
  } finally {
    server.close();
  }
}

testEndpoints().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
