const assert = require('assert');

async function runTests() {
  console.log('=== VERIFYING KANJI/KANA PRACTICE PROGRESS & COMPLETION SYNC ===\n');

  process.env.PORT = '5066';
  const { server } = require('./server/dist/index');
  const { db } = require('./server/dist/db/database');

  const address = server.address();
  const port = typeof address === 'object' && address ? address.port : 5066;
  const baseUrl = `http://localhost:${port}/api`;
  console.log(`Testing against server at: ${baseUrl}\n`);

  try {
    const testUser = 'user_001';

    // Reset user completions and attempts for a clean test run
    db.prepare('DELETE FROM user_lesson_completions WHERE user_id = ?').run(testUser);
    db.prepare('DELETE FROM kanji_writing_attempts WHERE user_id = ?').run(testUser);
    db.prepare('DELETE FROM practice_sessions WHERE user_id = ?').run(testUser);
    db.prepare('UPDATE users SET active_track = ? WHERE id = ?').run('jlpt_n5', testUser);

    console.log('1. Checking initial Dashboard state before practice...');
    const resDashInit = await fetch(`${baseUrl}/dashboard?userId=${testUser}`);
    assert.strictEqual(resDashInit.status, 200);
    const dataDashInit = await resDashInit.json();
    console.log(`Initial recommended lessons: ${dataDashInit.recommendedLessons.map(l => l.id).join(', ')}`);
    assert(dataDashInit.recommendedLessons.length > 0, 'Should have initial recommendations');
    const firstInitialId = dataDashInit.recommendedLessons[0].id;
    console.log(`✔ Initial Dashboard recommendations fetched (top: ${firstInitialId}).`);

    // 2. Test POST /api/kanji/record-practice with Kana (HIRAGANA)
    console.log('\n2. Testing POST /api/kanji/record-practice for Hiragana (kana_a_h)...');
    const resKanaPractice = await fetch(`${baseUrl}/kanji/record-practice`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: testUser,
        character: 'あ',
        syllabary: 'HIRAGANA',
        kanjiId: 'kana_a_h',
        score: 100,
        strokeOrderCompliance: 100,
        geometrySimilarity: 98
      })
    });
    assert.strictEqual(resKanaPractice.status, 200);
    const dataKanaPractice = await resKanaPractice.json();
    assert.strictEqual(dataKanaPractice.success, true);

    // Verify record in user_lesson_completions
    const kanaComp = db.prepare('SELECT * FROM user_lesson_completions WHERE user_id = ? AND lesson_id = ?').get(testUser, 'kana_a_h');
    assert(kanaComp, 'user_lesson_completions MUST contain kana_a_h');
    assert.strictEqual(kanaComp.score, 100);
    assert.strictEqual(kanaComp.accuracy_pct, 100);
    console.log('✔ Kana practice successfully recorded in user_lesson_completions for kana_a_h.');

    // 3. Test POST /api/kanji/record-practice with Kanji (N5)
    console.log('\n3. Testing POST /api/kanji/record-practice for Kanji N5 (kanji_n5_01_nichi)...');
    const resKanjiPractice = await fetch(`${baseUrl}/kanji/record-practice`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: testUser,
        character: '日',
        syllabary: 'N5',
        kanjiId: 'kanji_n5_01_nichi',
        score: 100,
        strokeOrderCompliance: 96,
        geometrySimilarity: 95
      })
    });
    assert.strictEqual(resKanjiPractice.status, 200);
    const dataKanjiPractice = await resKanjiPractice.json();
    assert.strictEqual(dataKanjiPractice.success, true);

    // Verify records in user_lesson_completions
    const kanjiComp = db.prepare('SELECT * FROM user_lesson_completions WHERE user_id = ? AND lesson_id = ?').get(testUser, 'kanji_n5_01_nichi');
    assert(kanjiComp, 'user_lesson_completions MUST contain kanji_n5_01_nichi');
    assert.strictEqual(kanjiComp.score, 100);

    const lesVocab1Comp = db.prepare('SELECT * FROM user_lesson_completions WHERE user_id = ? AND lesson_id = ?').get(testUser, 'les_n5_vocab_1');
    assert(lesVocab1Comp, 'user_lesson_completions MUST contain les_n5_vocab_1');
    assert.strictEqual(lesVocab1Comp.score, 100);
    console.log('✔ Kanji practice successfully recorded in user_lesson_completions for kanji_n5_01_nichi and les_n5_vocab_1.');

    // 4. Test POST /api/kanji/:kanjiId/attempt
    console.log('\n4. Testing POST /api/kanji/:kanjiId/attempt for attempt recording...');
    const resAttempt = await fetch(`${baseUrl}/kanji/kanji_n5_nichi/attempt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: testUser,
        score: 95,
        completedInMs: 4000,
        syllabary: 'N5'
      })
    });
    assert.strictEqual(resAttempt.status, 200);
    const dataAttempt = await resAttempt.json();
    assert.strictEqual(dataAttempt.status, 'recorded');
    console.log('✔ Attempt recorded successfully.');

    // 5. Test GET /api/kanji/mastered-characters
    console.log('\n5. Testing GET /api/kanji/mastered-characters...');
    const resMastered = await fetch(`${baseUrl}/kanji/mastered-characters?userId=${testUser}`);
    assert.strictEqual(resMastered.status, 200);
    const dataMastered = await resMastered.json();
    console.log('Mastered payload:', dataMastered);
    assert(Array.isArray(dataMastered.masteredIds), 'masteredIds must be an array');
    assert(Array.isArray(dataMastered.masteredCharacters), 'masteredCharacters must be an array');
    assert(dataMastered.masteredIds.includes('kana_a_h'), 'masteredIds must contain kana_a_h');
    assert(dataMastered.masteredCharacters.includes('あ'), 'masteredCharacters must contain あ');
    assert(dataMastered.masteredCharacters.includes('日'), 'masteredCharacters must contain 日');
    console.log('✔ GET /api/kanji/mastered-characters successfully verified.');

    // 6. Test GET /api/dashboard recommendation logic
    console.log('\n6. Testing GET /api/dashboard recommendations after completion...');
    const resDashAfter = await fetch(`${baseUrl}/dashboard?userId=${testUser}`);
    assert.strictEqual(resDashAfter.status, 200);
    const dataDashAfter = await resDashAfter.json();
    const recommendedIds = dataDashAfter.recommendedLessons.map(l => l.id);
    console.log(`Recommended lessons after practice: ${recommendedIds.join(', ')}`);

    // Ensure completed lessons (kana_a_h, kanji_n5_01_nichi, les_n5_vocab_1) are NOT recommended
    assert(!recommendedIds.includes('kana_a_h'), 'Should not recommend kana_a_h (completed)');
    assert(!recommendedIds.includes('kanji_n5_01_nichi'), 'Should not recommend kanji_n5_01_nichi (completed)');
    assert(!recommendedIds.includes('les_n5_vocab_1'), 'Should not recommend les_n5_vocab_1 (completed)');

    // Ensure next uncompleted lesson is recommended
    assert(recommendedIds.includes('les_n5_gram_1'), 'Should recommend next uncompleted lesson les_n5_gram_1');
    assert.strictEqual(dataDashAfter.recommendedLessons[0].id, 'les_n5_gram_1', 'les_n5_gram_1 must be top recommendation');
    console.log('✔ Dashboard properly skips completed Stage 1 / Stage 3 and recommends les_n5_gram_1.');

    // 7. Test Curriculum completedLessonIds synchronization
    console.log('\n7. Testing GET /api/curriculum for Stage 1 & 3 completion flags...');
    const resCurriculum = await fetch(`${baseUrl}/curriculum?level=jlpt_n5&userId=${testUser}`);
    assert.strictEqual(resCurriculum.status, 200);
    const dataCurriculum = await resCurriculum.json();
    assert(Array.isArray(dataCurriculum.completedLessonIds), 'completedLessonIds must be an array');
    assert(dataCurriculum.completedLessonIds.includes('kana_a_h'), 'completedLessonIds must include kana_a_h');
    assert(dataCurriculum.completedLessonIds.includes('kanji_n5_01_nichi'), 'completedLessonIds must include kanji_n5_01_nichi');
    assert(dataCurriculum.completedLessonIds.includes('les_n5_vocab_1'), 'completedLessonIds must include les_n5_vocab_1');
    console.log('✔ Curriculum returns all completedLessonIds properly.');

    // 8. Test Dashboard fallback when all lessons in level are completed
    console.log('\n8. Testing Dashboard fallback when ALL lessons in level are completed...');
    const allN5Lessons = db.prepare(`
      SELECT l.id FROM lessons l
      JOIN units u ON l.unit_id = u.id
      JOIN skill_pillars sp ON u.skill_pillar_id = sp.id
      JOIN levels lvl ON sp.level_id = lvl.id
      WHERE lvl.code = 'n5'
    `).all().map(r => r.id);

    for (const lId of allN5Lessons) {
      db.prepare(`
        INSERT OR REPLACE INTO user_lesson_completions (user_id, lesson_id, completed_at, score, max_score, accuracy_pct)
        VALUES (?, ?, datetime('now'), 100, 100, 100)
      `).run(testUser, lId);
    }

    const resDashAllComp = await fetch(`${baseUrl}/dashboard?userId=${testUser}`);
    assert.strictEqual(resDashAllComp.status, 200);
    const dataDashAllComp = await resDashAllComp.json();
    assert.strictEqual(dataDashAllComp.recommendedLessons.length, 1, 'Should fallback to exactly 1 lesson (top/first)');
    console.log(`Fallback recommendation when all completed: ${dataDashAllComp.recommendedLessons[0].id}`);
    assert.strictEqual(dataDashAllComp.recommendedLessons[0].id, allN5Lessons[0], 'Should fallback to top lesson');
    console.log('✔ Dashboard successfully falls back to top lesson when all lessons completed.');

    console.log('\n======================================================');
    console.log('🎉 ALL AUTOMATED TESTS PASSED CLEANLY AND FULLY VERIFIED!');
    console.log('======================================================\n');
  } finally {
    server.close();
  }
}

runTests().catch(err => {
  console.error('\n❌ TEST FAILED:', err);
  process.exit(1);
});
