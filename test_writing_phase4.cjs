const assert = require('assert');
const path = require('path');

// Set up server environment
const { db, initDatabase, getAllWritingPrompts, getWritingPromptById, saveWritingSubmission, getWritingSubmissions, getWritingSubmissionById } = require('./server/dist/db/database');
const { seed } = require('./server/dist/db/seed');
const {
  roundIELTSBand,
  roundCriterionScore,
  calculateOverallWritingModuleBand,
  tokenizeWithOffsets,
  segmentSentences,
  annotateEssay,
  evaluateWritingEssay
} = require('./server/dist/algorithms/writingEvaluator');

console.log('=== RUNNING PHASE 4 COMPREHENSIVE VERIFICATION SUITE ===\n');

// 1. Run database seed
console.log('1. Testing Database Seed...');
seed();

// 2. Test writing_prompts database records
console.log('\n2. Verifying Seeded Writing Prompts in Database...');
const allPrompts = getAllWritingPrompts();
console.log(`Total prompts in DB: ${allPrompts.length}`);
assert(allPrompts.length >= 3, 'Should have at least 3 seeded prompts');

const p1 = getWritingPromptById('ielts_write_t1_acad_seed01');
assert(p1, 'ielts_write_t1_acad_seed01 must exist');
assert.strictEqual(p1.task_type, 'task_1');
assert.strictEqual(p1.target_word_count, 150);
assert.strictEqual(p1.time_limit_minutes, 20);
assert(p1.visual_data_points, 'Visual data points must be populated for T1 Academic');
const vdp = JSON.parse(p1.visual_data_points);
assert(vdp.countries && vdp.countries.Germany, 'Germany data series must be present');
assert(p1.guidance_notes && p1.guidance_notes_id, 'Bilingual guidance notes must be present');
assert(p1.model_band_8_response.length > 100, 'Model answer must be populated');
console.log('✔ Prompt 1 (Academic T1 Line Graph) verified successfully.');

const p2 = getWritingPromptById('ielts_write_t1_gt_seed01');
assert(p2, 'ielts_write_t1_gt_seed01 must exist');
assert.strictEqual(p2.task_type, 'task_1');
assert.strictEqual(p2.target_word_count, 150);
assert(p2.prompt_text.includes('Community Library') || p2.prompt_title.includes('Community Library'), 'Should be Community Library prompt');
assert(p2.guidance_notes && p2.guidance_notes_id, 'Bilingual guidance notes must be present');
console.log('✔ Prompt 2 (General Training T1 Letter) verified successfully.');

const p3 = getWritingPromptById('ielts_write_t2_discursive_seed01');
assert(p3, 'ielts_write_t2_discursive_seed01 must exist');
assert.strictEqual(p3.task_type, 'task_2');
assert.strictEqual(p3.target_word_count, 250);
assert.strictEqual(p3.time_limit_minutes, 40);
assert(p3.prompt_title.includes('Healthcare Diagnosis') || p3.prompt_text.includes('Healthcare') || p3.prompt_text.includes('medical conditions'), 'Should be AI in Healthcare Diagnosis prompt');
assert(p3.guidance_notes && p3.guidance_notes_id, 'Bilingual guidance notes must be present');
console.log('✔ Prompt 3 (Academic & GT T2 Discursive Essay) verified successfully.');

// Test taskType query filter
const t1Only = getAllWritingPrompts('task_1');
console.log(`Filtered task_1 prompts: ${t1Only.length}`);
assert(t1Only.every(p => p.task_type.includes('task_1') || p.task_type.includes('task1')), 'All filtered prompts must be task 1');

const t2Only = getAllWritingPrompts('task_2');
console.log(`Filtered task_2 prompts: ${t2Only.length}`);
assert(t2Only.every(p => p.task_type.includes('task_2') || p.task_type.includes('task2')), 'All filtered prompts must be task 2');

// 3. Test Cambridge Rounding & Aggregation Rules
console.log('\n3. Verifying Cambridge 0.25 / 0.75 Rounding Rules & Weighting Formula...');
assert.strictEqual(roundIELTSBand(6.12), 6.0, '6.12 -> 6.0 (< 0.25)');
assert.strictEqual(roundIELTSBand(6.24), 6.0, '6.24 -> 6.0 (< 0.25)');
assert.strictEqual(roundIELTSBand(6.25), 6.5, '6.25 -> 6.5 (>= 0.25 and < 0.75)');
assert.strictEqual(roundIELTSBand(6.50), 6.5, '6.50 -> 6.5');
assert.strictEqual(roundIELTSBand(6.74), 6.5, '6.74 -> 6.5 (< 0.75)');
assert.strictEqual(roundIELTSBand(6.75), 7.0, '6.75 -> 7.0 (>= 0.75)');
assert.strictEqual(roundIELTSBand(6.90), 7.0, '6.90 -> 7.0 (>= 0.75)');
console.log('✔ Individual roundIELTSBand verified across boundary conditions.');

// Test 1/3 T1 + 2/3 T2 weighting
// T1: 6.75, T2: 7.25 -> 1/3(6.75) + 2/3(7.25) = 2.25 + 4.8333 = 7.0833 -> 7.0
const weightedExample1 = calculateOverallWritingModuleBand(6.75, 7.25);
assert.strictEqual(weightedExample1, 7.0, 'T1=6.75, T2=7.25 should yield Overall 7.0');

// T1: 6.5, T2: 7.0 -> 1/3(6.5) + 2/3(7.0) = 2.1667 + 4.6667 = 6.8333 -> 7.0
const weightedExample2 = calculateOverallWritingModuleBand(6.5, 7.0);
assert.strictEqual(weightedExample2, 7.0, 'T1=6.5, T2=7.0 should yield Overall 7.0');

// T1: 6.0, T2: 6.0 -> 6.0
const weightedExample3 = calculateOverallWritingModuleBand(6.0, 6.0);
assert.strictEqual(weightedExample3, 6.0, 'T1=6.0, T2=6.0 should yield Overall 6.0');
console.log('✔ Weighted Writing Module calculation verified.');

// 4. Test Underlength Penalties
console.log('\n4. Verifying Underlength Penalty Calibration...');
const shortT1_severe = evaluateWritingEssay({
  taskType: 'task_1',
  promptId: 'ielts_write_t1_acad_seed01',
  essayContent: 'This is a very brief summary that fails to reach the minimum threshold of words required for IELTS Task 1.',
  targetMinimumWords: 150
});
assert(shortT1_severe.wordCountMetrics.isUnderlength, 'Should be marked underlength');
assert.strictEqual(shortT1_severe.wordCountMetrics.penaltyApplied, 2.0, 'Severe underlength (<100w) penalty should be 2.0');
assert(shortT1_severe.criteriaScores.taskAchievementOrResponse.score <= 4.0, 'Hard ceiling of 4.0 for <100 words');
console.log('✔ Task 1 severe underlength penalty (<100w) enforced.');

const shortT1_moderate = evaluateWritingEssay({
  taskType: 'task_1',
  promptId: 'ielts_write_t1_acad_seed01',
  essayContent: 'The line graph shows data across four countries from 2010 to 2025. ' + 'In Germany the renewable energy increased steadily over time while fossil fuel decreased. '.repeat(8),
  targetMinimumWords: 150
});
console.log(`Moderate T1 word count: ${shortT1_moderate.wordCountMetrics.totalWords}`);
assert(shortT1_moderate.wordCountMetrics.totalWords >= 100 && shortT1_moderate.wordCountMetrics.totalWords < 140, 'Should be between 100 and 139 words');
assert.strictEqual(shortT1_moderate.wordCountMetrics.penaltyApplied, 1.0, 'Moderate underlength (100-139w) penalty should be 1.0');
assert(shortT1_moderate.criteriaScores.taskAchievementOrResponse.score <= 5.0, 'Hard ceiling of 5.0 for 100-139 words');
console.log('✔ Task 1 moderate underlength penalty (100-139w) enforced.');

// 5. Test Linguistic Metrics: AWL, TTR, Guiraud, EFSR, CSR
console.log('\n5. Verifying Lexical & Syntactic Diagnostic Metrics...');
const testEssayText = 
  'The provided line graph and table shows the transition in energy consumption between 2010 and 2025. ' +
  'Overall, Germany and UK experienced substantial expansions in their renewable sector, which was significant. ' +
  'Although Poland remained reliant on fossil fuels, other nations demonstrated robust momentum.';

const tokens = tokenizeWithOffsets(testEssayText);
assert(tokens.length > 20, 'Tokens should be tokenized');
const sentences = segmentSentences(testEssayText);
assert.strictEqual(sentences.length, 3, 'Should segment into 3 sentences');
assert(sentences[1].isComplex, 'Second sentence contains "which was", should be complex');
assert(sentences[2].isComplex, 'Third sentence begins with "Although", should be complex');

const annos = annotateEssay(testEssayText, sentences, 'task_1');
console.log(`Detected annotations: ${annos.length}`);
assert(annos.some(a => a.subCategory === 'SUBJECT_VERB_AGREEMENT'), 'Should detect subject-verb agreement error ("shows")');
assert(annos.some(a => a.subCategory === 'ARTICLE_DETERMINER'), 'Should detect missing article in "Germany and UK"');

// Verify exact offset span alignment
for (const a of annos) {
  const extracted = testEssayText.slice(a.charStart, a.charEnd);
  assert.strictEqual(extracted, a.originalText, `Span [${a.charStart}-${a.charEnd}] must match originalText exactly: "${a.originalText}" vs "${extracted}"`);
  assert(a.explanationEn && a.explanationEn.length > 0, 'Must have English explanation');
  assert(a.explanationId && a.explanationId.length > 0, 'Must have Indonesian explanation');
  assert(a.suggestedReplacement && a.suggestedReplacement.length > 0, 'Must have suggested replacement');
}
console.log('✔ Exact character span alignment and bilingual explanations verified.');

// 6. Test Authentic Candidate Draft 1 (Academic Task 1, Band 6.0)
console.log('\n6. Evaluating Authentic Candidate Draft 1 (Domain Blueprint §5.1.8 Seed Pair 1)...');
const candidateDraft1 = 
  'The provided line graph and table shows the changes in electricity generation from renewable and fossil fuels in four countries from 2010 to 2025.\n\n' +
  'Overall, it can clearly be seen that Germany and UK increased their renewable energy a lot, while Poland still used mostly fossil fuels.\n\n' +
  'Looking at the Western nations, the UK had a big growth. In 2010, renewable energy was only 9%, but in 2025 it became 42%. Germany also showed good progress, rising from 18% to 51% in 2025, which made it the biggest renewable producer. In Spain, renewable generation was 24% at first and then went up to 46% by 2025.\n\n' +
  'On the other hand, Poland was very different. In 2010, coal and gas made 93% of energy, and in 2025 it only dropped to 78%. In conclusion, western countries are doing much better than eastern countries in clean energy.';

const result1 = evaluateWritingEssay({
  taskType: 'task1_academic',
  promptId: 'ielts_write_t1_acad_seed01',
  essayContent: candidateDraft1,
  targetMinimumWords: 150
});

console.log(`Draft 1 Word Count: ${result1.wordCountMetrics.totalWords}`);
console.log(`Draft 1 AWL Density: ${result1.linguisticMetrics.awlDensityPercentage}%`);
console.log(`Draft 1 Overall Band: ${result1.overallBand}`);
console.log(`Draft 1 Criteria Scores: TA=${result1.criteriaScores.taskAchievementOrResponse.score}, CC=${result1.criteriaScores.coherenceAndCohesion.score}, LR=${result1.criteriaScores.lexicalResource.score}, GRA=${result1.criteriaScores.grammaticalRangeAndAccuracy.score}`);
assert.strictEqual(result1.wordCountMetrics.totalWords, 145, 'Candidate draft 1 has 145 words');
assert.strictEqual(result1.wordCountMetrics.isUnderlength, true, 'Candidate draft 1 (145w) is under 150w threshold');
assert.strictEqual(result1.wordCountMetrics.penaltyApplied, 0.5, 'Underlength penalty of 0.5 applied to TA');
assert.strictEqual(result1.overallBand, 6.0, 'Candidate draft 1 should evaluate to Band 6.0 benchmark');
assert(result1.annotations.length >= 4, 'Should detect key pedagogical annotations');
console.log('✔ Candidate Draft 1 evaluated to calibrated Band 6.0 benchmark.');

// 7. Test Authentic Candidate Draft 3 (Task 2 Discursive Essay, Band 6.0)
console.log('\n7. Evaluating Authentic Candidate Draft 3 (Domain Blueprint §5.1.8 Seed Pair 3)...');
const candidateDraft3 = 
  'Nowadays, artificial intelligence is becoming very popular in schools and universities. While some people believe that AI helps students learn faster and makes education efficient, others think that it destroys critical thinking and removes the teacher\'s role. In this essay, I will discuss both sides and give my opinion.\n\n' +
  'On the one hand, AI has many benefits for modern education. Firstly, automated tutoring systems can give instant feedback to students. For example, when students write an essay, software can find grammar mistakes immediately. Secondly, teachers do not have enough time to check every student\'s work because classes are very big. Therefore, AI can help teachers by grading papers quickly, which saves a lot of time. Also, students in poor areas can access good learning materials online without paying expensive tuition fees.\n\n' +
  'On the other hand, relying too much on AI can create serious problems. Firstly, if students always ask AI for answers, their brains will become lazy and they will not develop critical thinking skills. Secondly, education is not only about learning facts, but also about emotional connection. A human teacher can encourage a student who feels stressed, while an AI machine has no feelings. In my opinion, human mentorship is something that technology cannot replace.\n\n' +
  'In conclusion, although AI tools provide great convenience and efficiency, they should not replace real teachers. I believe that institutions should use AI only as an assistant while keeping human educators in control.';

const result3 = evaluateWritingEssay({
  taskType: 'task2_discursive',
  promptId: 'ielts_write_t2_discursive_seed01',
  essayContent: candidateDraft3,
  targetMinimumWords: 250
});

console.log(`Draft 3 Word Count: ${result3.wordCountMetrics.totalWords}`);
console.log(`Draft 3 AWL Density: ${result3.linguisticMetrics.awlDensityPercentage}%`);
console.log(`Draft 3 Overall Band: ${result3.overallBand}`);
assert.strictEqual(result3.wordCountMetrics.totalWords, 239, 'Candidate draft 3 has 239 words');
assert.strictEqual(result3.wordCountMetrics.isUnderlength, true, 'Candidate draft 3 (239w) is under 250w threshold');
assert.strictEqual(result3.wordCountMetrics.penaltyApplied, 0.5, 'Underlength penalty of 0.5 applied to TR');
assert.strictEqual(result3.overallBand, 6.0, 'Candidate draft 3 should evaluate to Band 6.0 benchmark');
console.log('✔ Candidate Draft 3 evaluated to calibrated Band 6.0 benchmark.');

// 8. Test Band 8.5 Model Answer
console.log('\n8. Evaluating Band 8.5 Model Answer...');
const modelAnswerT1 = p1.model_band_8_response;
const resultModelT1 = evaluateWritingEssay({
  taskType: 'task1_academic',
  promptId: 'ielts_write_t1_acad_seed01',
  essayContent: modelAnswerT1,
  targetMinimumWords: 150
});

console.log(`Model T1 Word Count: ${resultModelT1.wordCountMetrics.totalWords}`);
console.log(`Model T1 AWL Density: ${resultModelT1.linguisticMetrics.awlDensityPercentage}%`);
console.log(`Model T1 EFSR: ${resultModelT1.linguisticMetrics.errorFreeSentenceRatio}%`);
console.log(`Model T1 CSR: ${resultModelT1.linguisticMetrics.complexSentenceRatio}%`);
console.log(`Model T1 Overall Band: ${resultModelT1.overallBand}`);
assert(resultModelT1.overallBand >= 8.5, 'Model answer should achieve Band 8.5+');
assert(resultModelT1.linguisticMetrics.awlDensityPercentage >= 8.5, 'Model answer AWL density should be >= 8.5%');
assert(resultModelT1.linguisticMetrics.errorFreeSentenceRatio >= 80, 'Model answer EFSR should be >= 80%');
console.log('✔ Band 8.5 Model Answer verified successfully.');

// 9. Test Submission Persistence and Retrieval
console.log('\n9. Testing Submission Database Storage and Retrieval...');
saveWritingSubmission({
  id: result1.submissionId,
  prompt_id: 'ielts_write_t1_acad_seed01',
  user_id: 'user_001',
  essay_text: candidateDraft1,
  time_spent_seconds: 1140,
  word_count: result1.wordCountMetrics.totalWords,
  overall_band: result1.overallBand,
  ta_tr_band: result1.criteriaScores.taskAchievementOrResponse.score,
  cc_band: result1.criteriaScores.coherenceAndCohesion.score,
  lr_band: result1.criteriaScores.lexicalResource.score,
  gra_band: result1.criteriaScores.grammaticalRangeAndAccuracy.score,
  evaluation_json: JSON.stringify(result1),
  created_at: new Date().toISOString()
});

const userSubmissions = getWritingSubmissions('user_001');
assert(userSubmissions.length >= 1, 'Should find user submission in database');
const fetchedSub = getWritingSubmissionById(result1.submissionId);
assert(fetchedSub, 'Must retrieve submission by ID');
assert.strictEqual(fetchedSub.overall_band, 6.0);
console.log('✔ Submission database persistence and query helpers verified.');

console.log('\n======================================================');
console.log('✔ ALL PHASE 4 TESTS COMPLETED AND PASSED WITH 100% SUCCESS');
console.log('======================================================\n');
