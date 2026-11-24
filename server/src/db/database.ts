// SQLite Database Connection & Schema Definition
import Database from 'better-sqlite3';
import path from 'path';
import { WritingPromptRow, WritingSubmissionRow } from './schema';

const DB_PATH = path.join(__dirname, '../../lingua_mastery.db');

export const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

export function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      active_track TEXT NOT NULL DEFAULT 'ielts_academic',
      baseline_score REAL DEFAULT 6.0,
      target_score REAL DEFAULT 7.5,
      daily_goal_minutes INTEGER DEFAULT 30,
      streak_days INTEGER DEFAULT 1,
      last_active_at TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS tracks (
      id TEXT PRIMARY KEY,
      code TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS levels (
      id TEXT PRIMARY KEY,
      track_id TEXT NOT NULL REFERENCES tracks(id),
      code TEXT NOT NULL,
      title TEXT NOT NULL,
      pass_threshold REAL,
      sectional_cutoff REAL
    );

    CREATE TABLE IF NOT EXISTS skill_pillars (
      id TEXT PRIMARY KEY,
      level_id TEXT NOT NULL REFERENCES levels(id),
      code TEXT NOT NULL,
      title TEXT NOT NULL,
      max_score REAL NOT NULL
    );

    CREATE TABLE IF NOT EXISTS units (
      id TEXT PRIMARY KEY,
      skill_pillar_id TEXT NOT NULL REFERENCES skill_pillars(id),
      title TEXT NOT NULL,
      description TEXT,
      order_index INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS lessons (
      id TEXT PRIMARY KEY,
      unit_id TEXT NOT NULL REFERENCES units(id),
      title TEXT NOT NULL,
      lesson_type TEXT NOT NULL,
      estimated_minutes INTEGER DEFAULT 15,
      order_index INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS exercise_items (
      id TEXT PRIMARY KEY,
      lesson_id TEXT NOT NULL REFERENCES lessons(id),
      item_type TEXT NOT NULL,
      prompt TEXT NOT NULL,
      passage_text TEXT,
      audio_url TEXT,
      options_json TEXT,
      correct_answer_json TEXT,
      explanation TEXT,
      rubric_criteria_json TEXT
    );

    CREATE TABLE IF NOT EXISTS kanji_stroke_data (
      id TEXT PRIMARY KEY,
      character TEXT UNIQUE NOT NULL,
      jlpt_level TEXT NOT NULL,
      on_yomi TEXT NOT NULL,
      kun_yomi TEXT NOT NULL,
      english_gloss TEXT NOT NULL,
      radical TEXT NOT NULL,
      stroke_count INTEGER NOT NULL,
      stroke_paths_json TEXT NOT NULL,
      stroke_metadata_json TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS srs_items (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id),
      item_type TEXT NOT NULL,
      reference_id TEXT,
      prompt TEXT NOT NULL,
      back_content_json TEXT NOT NULL,
      state TEXT NOT NULL DEFAULT 'new',
      step INTEGER DEFAULT 0,
      interval_days REAL DEFAULT 0,
      ease_factor REAL DEFAULT 2.50,
      stability REAL DEFAULT 1.0,
      difficulty REAL DEFAULT 5.0,
      repetitions INTEGER DEFAULT 0,
      lapses INTEGER DEFAULT 0,
      due_date TEXT NOT NULL,
      last_reviewed_at TEXT
    );

    CREATE TABLE IF NOT EXISTS practice_sessions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id),
      session_type TEXT NOT NULL,
      track_code TEXT NOT NULL,
      level_code TEXT NOT NULL,
      started_at TEXT DEFAULT CURRENT_TIMESTAMP,
      completed_at TEXT,
      time_spent_sec INTEGER DEFAULT 0,
      score_raw REAL DEFAULT 0,
      score_scaled REAL DEFAULT 0,
      band_estimate REAL DEFAULT 0,
      pass_status TEXT DEFAULT 'pending'
    );

    CREATE TABLE IF NOT EXISTS user_lesson_completions (
      user_id TEXT NOT NULL REFERENCES users(id),
      lesson_id TEXT NOT NULL REFERENCES lessons(id),
      completed_at TEXT DEFAULT CURRENT_TIMESTAMP,
      score REAL NOT NULL,
      max_score REAL NOT NULL,
      accuracy_pct REAL NOT NULL,
      PRIMARY KEY (user_id, lesson_id)
    );

    CREATE TABLE IF NOT EXISTS submissions (
      id TEXT PRIMARY KEY,
      session_id TEXT NOT NULL REFERENCES practice_sessions(id),
      exercise_item_id TEXT NOT NULL REFERENCES exercise_items(id),
      user_answer_json TEXT NOT NULL,
      is_correct INTEGER DEFAULT 0,
      score_awarded REAL DEFAULT 0,
      rubric_feedback_json TEXT
    );

    CREATE TABLE IF NOT EXISTS kanji_writing_attempts (
      id TEXT PRIMARY KEY,
      session_id TEXT REFERENCES practice_sessions(id),
      user_id TEXT NOT NULL REFERENCES users(id),
      kanji_id TEXT NOT NULL REFERENCES kanji_stroke_data(id),
      mode TEXT NOT NULL,
      stroke_order_compliance_pct REAL NOT NULL,
      geometry_similarity_pct REAL NOT NULL,
      composite_score REAL NOT NULL,
      mastery_badge TEXT NOT NULL,
      time_spent_sec INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS speaking_packages (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      level_code TEXT NOT NULL DEFAULT 'ielts_academic',
      package_data_json TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS speaking_sessions (
      id TEXT PRIMARY KEY,
      package_id TEXT NOT NULL REFERENCES speaking_packages(id),
      user_id TEXT NOT NULL REFERENCES users(id),
      part_number INTEGER NOT NULL,
      prompt_title TEXT NOT NULL,
      transcript TEXT NOT NULL,
      duration_seconds INTEGER NOT NULL,
      silent_pauses_count INTEGER DEFAULT 0,
      hesitation_count INTEGER DEFAULT 0,
      wpm REAL,
      fc_score REAL,
      lr_score REAL,
      gra_score REAL,
      pr_score REAL,
      overall_band REAL,
      evaluation_json TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS listening_packages (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      level_code TEXT NOT NULL DEFAULT 'ielts_academic',
      total_duration_seconds INTEGER DEFAULT 1920,
      total_questions INTEGER DEFAULT 40,
      package_data_json TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS listening_sessions (
      id TEXT PRIMARY KEY,
      package_id TEXT NOT NULL REFERENCES listening_packages(id),
      user_id TEXT NOT NULL REFERENCES users(id),
      raw_score REAL NOT NULL,
      overall_band REAL NOT NULL,
      sectional_scores_json TEXT NOT NULL,
      evaluation_json TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS exam_packages (
      id TEXT PRIMARY KEY,
      level_code TEXT NOT NULL,
      pack_number INTEGER NOT NULL,
      title_en TEXT NOT NULL,
      title_id TEXT NOT NULL,
      thematic_focus_en TEXT NOT NULL,
      thematic_focus_id TEXT NOT NULL,
      difficulty_tier TEXT NOT NULL,
      total_duration_minutes INTEGER NOT NULL,
      pass_threshold_score REAL NOT NULL,
      total_questions INTEGER DEFAULT 40,
      package_data_json TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS user_exam_attempts (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id),
      package_id TEXT NOT NULL REFERENCES exam_packages(id),
      level_code TEXT NOT NULL,
      pack_number INTEGER NOT NULL,
      raw_score REAL NOT NULL,
      total_questions INTEGER NOT NULL,
      scaled_score REAL NOT NULL,
      passed INTEGER NOT NULL DEFAULT 0,
      sectional_breakdown TEXT NOT NULL,
      time_spent_seconds INTEGER DEFAULT 0,
      completed_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_user_exam_attempts_user_level ON user_exam_attempts(user_id, level_code);
    CREATE INDEX IF NOT EXISTS idx_user_exam_attempts_user_package ON user_exam_attempts(user_id, package_id);
    CREATE INDEX IF NOT EXISTS idx_exam_packages_level ON exam_packages(level_code);
    CREATE INDEX IF NOT EXISTS idx_exam_packages_level_pack ON exam_packages(level_code, pack_number);

    CREATE TABLE IF NOT EXISTS writing_prompts (
      id TEXT PRIMARY KEY,
      task_type TEXT NOT NULL,
      category TEXT,
      prompt_title TEXT NOT NULL,
      prompt_text TEXT NOT NULL,
      visual_asset_url TEXT,
      visual_data_points TEXT,
      time_limit_minutes INTEGER NOT NULL DEFAULT 20,
      target_word_count INTEGER NOT NULL DEFAULT 150,
      model_band_8_response TEXT NOT NULL,
      guidance_notes TEXT,
      title_id TEXT,
      prompt_text_id TEXT,
      guidance_notes_id TEXT,
      model_strengths_en TEXT,
      model_strengths_id TEXT,
      benchmark_band REAL DEFAULT 8.5,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS writing_submissions (
      id TEXT PRIMARY KEY,
      prompt_id TEXT NOT NULL REFERENCES writing_prompts(id),
      user_id TEXT NOT NULL DEFAULT 'user_001',
      essay_text TEXT NOT NULL,
      time_spent_seconds INTEGER NOT NULL DEFAULT 0,
      word_count INTEGER NOT NULL DEFAULT 0,
      overall_band REAL NOT NULL,
      ta_tr_band REAL NOT NULL,
      cc_band REAL NOT NULL,
      lr_band REAL NOT NULL,
      gra_band REAL NOT NULL,
      evaluation_json TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_writing_prompts_task_type ON writing_prompts(task_type);
    CREATE INDEX IF NOT EXISTS idx_writing_submissions_prompt ON writing_submissions(prompt_id);
    CREATE INDEX IF NOT EXISTS idx_writing_submissions_user ON writing_submissions(user_id);
  `);
}

export function getAllWritingPrompts(taskType?: string): WritingPromptRow[] {
  if (taskType) {
    const raw = taskType.toLowerCase().trim();
    // Normalize task_1 / task1_academic / task1 / task_2 etc.
    let searchPattern = `%${raw}%`;
    if (raw === 'task_1' || raw === 'task1') {
      searchPattern = '%task%1%';
    } else if (raw === 'task_2' || raw === 'task2') {
      searchPattern = '%task%2%';
    }
    return db.prepare(`
      SELECT * FROM writing_prompts 
      WHERE LOWER(task_type) LIKE ? OR LOWER(id) LIKE ?
      ORDER BY id ASC
    `).all(searchPattern, searchPattern) as WritingPromptRow[];
  }
  return db.prepare(`SELECT * FROM writing_prompts ORDER BY id ASC`).all() as WritingPromptRow[];
}

export function getWritingPromptById(id: string): WritingPromptRow | undefined {
  return db.prepare(`SELECT * FROM writing_prompts WHERE id = ?`).get(id) as WritingPromptRow | undefined;
}

export function saveWritingSubmission(sub: WritingSubmissionRow): void {
  db.prepare(`
    INSERT INTO writing_submissions (
      id, prompt_id, user_id, essay_text, time_spent_seconds, word_count,
      overall_band, ta_tr_band, cc_band, lr_band, gra_band, evaluation_json, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    sub.id,
    sub.prompt_id,
    sub.user_id,
    sub.essay_text,
    sub.time_spent_seconds,
    sub.word_count,
    sub.overall_band,
    sub.ta_tr_band,
    sub.cc_band,
    sub.lr_band,
    sub.gra_band,
    sub.evaluation_json,
    sub.created_at || new Date().toISOString()
  );
}

export function getWritingSubmissions(userId?: string): WritingSubmissionRow[] {
  if (userId) {
    return db.prepare(`SELECT * FROM writing_submissions WHERE user_id = ? ORDER BY created_at DESC`).all(userId) as WritingSubmissionRow[];
  }
  return db.prepare(`SELECT * FROM writing_submissions ORDER BY created_at DESC`).all() as WritingSubmissionRow[];
}

export function getWritingSubmissionById(id: string): WritingSubmissionRow | undefined {
  return db.prepare(`SELECT * FROM writing_submissions WHERE id = ?`).get(id) as WritingSubmissionRow | undefined;
}
