// Database Seeder with Standard-Aligned Real Datasets Across All 7 Levels
import { db, initDatabase } from './database';
import { KANA_SEEDS } from './seeds/kanaSeeds';
import { KANJI_SEEDS } from './seeds/kanjiSeeds';
import { IELTS_MOCK_LESSON_ID, IELTS_FULL_MOCK_ITEMS } from './seeds/ieltsMockExamSeeds';
import { SPEAKING_PACKAGES_SEED } from './seeds/speakingSeeds';
import {
  CURRICULUM_PILLARS,
  CURRICULUM_UNITS,
  CURRICULUM_LESSONS,
  CURRICULUM_EXERCISE_ITEMS
} from './seeds/curriculumSeeds';

export function seed() {
  initDatabase();

  console.log('Clearing existing tables...');
  db.exec(`
    PRAGMA foreign_keys = OFF;
    DELETE FROM speaking_sessions;
    DELETE FROM speaking_packages;
    DELETE FROM user_lesson_completions;
    DELETE FROM submissions;
    DELETE FROM kanji_writing_attempts;
    DELETE FROM practice_sessions;
    DELETE FROM srs_items;
    DELETE FROM exercise_items;
    DELETE FROM lessons;
    DELETE FROM units;
    DELETE FROM skill_pillars;
    DELETE FROM levels;
    DELETE FROM tracks;
    DELETE FROM kanji_stroke_data;
    DELETE FROM users;
    PRAGMA foreign_keys = ON;
  `);

  console.log('Seeding fresh zero-progress user profile...');
  db.prepare(`
    INSERT INTO users (id, username, email, active_track, baseline_score, target_score, daily_goal_minutes, streak_days)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run('user_001', 'Elena & Marcus', 'scholar@lingua.io', 'jlpt_n5', 0, 80, 20, 0);

  console.log('Seeding tracks and full 5-tier + IELTS levels...');
  const insertTrack = db.prepare(`INSERT INTO tracks (id, code, title, description) VALUES (?, ?, ?, ?)`);
  insertTrack.run('track_ielts', 'ielts', 'English IELTS Preparation', 'Standardized preparation for IELTS Academic & General Training.');
  insertTrack.run('track_jlpt', 'jlpt', 'Japanese JLPT Progression', 'Complete 5-tier Japanese proficiency corridor from N5 to N1.');

  const insertLevel = db.prepare(`INSERT INTO levels (id, track_id, code, title, pass_threshold, sectional_cutoff) VALUES (?, ?, ?, ?, ?, ?)`);
  insertLevel.run('lvl_ielts_acad', 'track_ielts', 'academic', 'IELTS Academic', 7.5, 6.5);
  insertLevel.run('lvl_ielts_gen', 'track_ielts', 'general', 'IELTS General Training', 7.0, 6.0);
  insertLevel.run('lvl_jlpt_n5', 'track_jlpt', 'n5', 'JLPT N5 (Foundational Beginner)', 80, 19);
  insertLevel.run('lvl_jlpt_n4', 'track_jlpt', 'n4', 'JLPT N4 (Basic Communication)', 90, 19);
  insertLevel.run('lvl_jlpt_n3', 'track_jlpt', 'n3', 'JLPT N3 (Bridge to Intermediate)', 95, 19);
  insertLevel.run('lvl_jlpt_n2', 'track_jlpt', 'n2', 'JLPT N2 (Business & Academic Fluency)', 90, 19);
  insertLevel.run('lvl_jlpt_n1', 'track_jlpt', 'n1', 'JLPT N1 (Mastery & High Nuance)', 100, 19);

  console.log('Seeding skill pillars across all 7 levels...');
  const insertPillar = db.prepare(`INSERT INTO skill_pillars (id, level_id, code, title, max_score) VALUES (?, ?, ?, ?, ?)`);
  for (const pillar of CURRICULUM_PILLARS) {
    insertPillar.run(pillar.id, pillar.levelId, pillar.code, pillar.title, pillar.maxScore);
  }

  console.log('Seeding curriculum units...');
  const insertUnit = db.prepare(`INSERT INTO units (id, skill_pillar_id, title, description, order_index) VALUES (?, ?, ?, ?, ?)`);
  for (const unit of CURRICULUM_UNITS) {
    insertUnit.run(unit.id, unit.skillPillarId, unit.title, unit.description, unit.orderIndex);
  }

  console.log('Seeding lessons...');
  const insertLesson = db.prepare(`INSERT INTO lessons (id, unit_id, title, lesson_type, estimated_minutes, order_index) VALUES (?, ?, ?, ?, ?, ?)`);
  for (const lesson of CURRICULUM_LESSONS) {
    insertLesson.run(lesson.id, lesson.unitId, lesson.title, lesson.lessonType, lesson.estimatedMinutes, lesson.orderIndex);
  }

  console.log('Seeding exercise items with authentic texts & star drills...');
  const insertItem = db.prepare(`
    INSERT INTO exercise_items (id, lesson_id, item_type, prompt, passage_text, audio_url, options_json, correct_answer_json, explanation)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  for (const item of CURRICULUM_EXERCISE_ITEMS) {
    insertItem.run(
      item.id,
      item.lessonId,
      item.itemType,
      item.prompt,
      item.passageText || null,
      item.audioUrl || null,
      JSON.stringify(item.options),
      JSON.stringify(item.correctAnswer),
      item.explanation
    );
  }

  
  console.log('Seeding official 40-question IELTS Academic Mock Exam dataset...');
  try {
    insertUnit.run('u_ia_mock_1', 'sp_ia_read', 'Unit 7: Full Computer-Delivered Mock Exam', 'Official 40-question timed exam simulation', 7);
    insertLesson.run(IELTS_MOCK_LESSON_ID, 'u_ia_mock_1', 'Official Computer-Delivered IELTS Academic Practice Exam (Full 40 Questions)', 'mock_exam', 60, 1);
  } catch (e) {
    // Unit or lesson might exist
  }

  for (const item of IELTS_FULL_MOCK_ITEMS) {
    insertItem.run(
      item.id,
      item.lessonId,
      item.itemType,
      item.prompt,
      item.passageText,
      null,
      JSON.stringify(item.options),
      JSON.stringify(item.correctAnswer),
      item.explanation
    );
  }
  console.log('Seeded ' + IELTS_FULL_MOCK_ITEMS.length + ' official IELTS mock exam items successfully.');

console.log('Seeding Kana vector handwriting datasets (10 seed characters)...');
  const insertKanji = db.prepare(`
    INSERT INTO kanji_stroke_data (id, character, jlpt_level, on_yomi, kun_yomi, english_gloss, radical, stroke_count, stroke_paths_json, stroke_metadata_json)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const kana of KANA_SEEDS) {
    insertKanji.run(
      kana.id,
      kana.character,
      kana.syllabary,
      kana.romaji,
      kana.romaji,
      `${kana.syllabary} syllable: ${kana.romaji}`,
      kana.character,
      kana.strokeCount,
      JSON.stringify(kana.strokes.map(s => s.svgPath)),
      JSON.stringify(kana.strokes)
    );
  }

  console.log('Seeding Kanji vector handwriting datasets (15 anchor characters N5-N1)...');
  for (const kanji of KANJI_SEEDS) {
    insertKanji.run(
      kanji.id,
      kanji.character,
      kanji.jlptLevel,
      kanji.onYomi,
      kanji.kunYomi,
      kanji.englishGloss,
      kanji.radical,
      kanji.strokeCount,
      JSON.stringify(kanji.strokes.map(s => s.svgPath)),
      JSON.stringify(kanji.strokes)
    );
  }

  console.log('Seeding IELTS speaking exam packages...');
  const insertSpeakingPackage = db.prepare(`
    INSERT INTO speaking_packages (id, title, description, level_code, package_data_json)
    VALUES (?, ?, ?, ?, ?)
  `);

  for (const pkg of SPEAKING_PACKAGES_SEED) {
    insertSpeakingPackage.run(
      pkg.id,
      pkg.title,
      pkg.description,
      pkg.levelCode,
      JSON.stringify(pkg)
    );
  }
  console.log(`Seeded ${SPEAKING_PACKAGES_SEED.length} IELTS speaking exam packages.`);

  console.log('Seeding completed successfully!');
  console.log(`Summary: ${CURRICULUM_PILLARS.length} pillars, ${CURRICULUM_UNITS.length} units, ${CURRICULUM_LESSONS.length} lessons, ${CURRICULUM_EXERCISE_ITEMS.length} exercises, ${KANA_SEEDS.length} kana, ${KANJI_SEEDS.length} kanji, ${SPEAKING_PACKAGES_SEED.length} speaking packages.`);
}

// Execute directly if run as main
if (require.main === module) {
  seed();
}
