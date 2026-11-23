// SQLite Database Connection & Schema Definition
import Database from 'better-sqlite3';
import path from 'path';

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
  `);
}
