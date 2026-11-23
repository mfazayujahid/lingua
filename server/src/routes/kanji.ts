import { Router, Request, Response } from 'express';
import { db } from '../db/database';
import { KanjiStrokeData, StrokeDefinition } from '../types';

export const kanjiRouter = Router();

// Catalog endpoint for all 2,136 Joyo Kanji
kanjiRouter.get('/catalog', (req: Request, res: Response) => {
  const level = (req.query.level as string || '').toUpperCase();
  const search = (req.query.search as string || '').trim();
  const limit = Math.min(Math.max(parseInt(req.query.limit as string) || 50, 1), 200);
  const offset = Math.max(parseInt(req.query.offset as string) || 0, 0);

  let whereClauses: string[] = [];
  let params: any[] = [];

  if (level && ['N5', 'N4', 'N3', 'N2', 'N1'].includes(level)) {
    whereClauses.push('jlpt_level = ?');
    params.push(level);
  }

  if (search) {
    whereClauses.push('(character = ? OR meanings_json LIKE ? OR on_yomi_json LIKE ? OR kun_yomi_json LIKE ?)');
    params.push(search, `%${search}%`, `%${search}%`, `%${search}%`);
  }

  const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

  const totalRow = db.prepare(`SELECT count(*) as count FROM joyo_kanji ${whereSql}`).get(...params) as any;
  const total = totalRow?.count || 0;

  const rows = db.prepare(`
    SELECT id, character, jlpt_level, grade, stroke_count, freq,
           primary_radical, radicals_json, on_yomi_json, kun_yomi_json,
           meanings_json, mnemonic_meaning, mnemonic_reading, vocabulary_json
    FROM joyo_kanji
    ${whereSql}
    ORDER BY CASE jlpt_level
      WHEN 'N5' THEN 1
      WHEN 'N4' THEN 2
      WHEN 'N3' THEN 3
      WHEN 'N2' THEN 4
      WHEN 'N1' THEN 5
      ELSE 6 END,
      stroke_count ASC, freq ASC
    LIMIT ? OFFSET ?
  `).all(...params, limit, offset) as any[];

  const items = rows.map(r => ({
    id: r.id,
    character: r.character,
    jlptLevel: r.jlpt_level,
    grade: r.grade,
    strokeCount: r.stroke_count,
    freq: r.freq,
    primaryRadical: r.primary_radical,
    radicals: JSON.parse(r.radicals_json || '[]'),
    onYomi: JSON.parse(r.on_yomi_json || '[]'),
    kunYomi: JSON.parse(r.kun_yomi_json || '[]'),
    meanings: JSON.parse(r.meanings_json || '[]'),
    mnemonicMeaning: r.mnemonic_meaning,
    mnemonicReading: r.mnemonic_reading,
    vocabulary: JSON.parse(r.vocabulary_json || '[]')
  }));

  // Global tier stats
  const statsRows = db.prepare(`
    SELECT jlpt_level, count(*) as count FROM joyo_kanji GROUP BY jlpt_level
  `).all() as any[];
  const stats: Record<string, number> = { total: 0 };
  statsRows.forEach(s => {
    stats[s.jlpt_level] = s.count;
    stats.total += s.count;
  });

  res.json({
    total,
    limit,
    offset,
    stats,
    items
  });
});

// Single Joyo Kanji detailed record with full 4-step formula data
kanjiRouter.get('/detail/:character', (req: Request, res: Response) => {
  const { character } = req.params;

  const row = db.prepare(`
    SELECT * FROM joyo_kanji WHERE character = ? OR id = ?
  `).get(character, character) as any;

  if (!row) {
    return res.status(404).json({ error: 'Joyo kanji not found' });
  }

  // Check if vector stroke data exists
  const strokeRow = db.prepare(`
    SELECT stroke_paths_json, stroke_metadata_json FROM kanji_stroke_data WHERE character = ?
  `).get(row.character) as any;

  let strokePaths: string[] = [];
  let strokeMetadata: StrokeDefinition[] = [];

  if (strokeRow) {
    strokePaths = JSON.parse(strokeRow.stroke_paths_json);
    strokeMetadata = JSON.parse(strokeRow.stroke_metadata_json);
  }

  res.json({
    id: row.id,
    character: row.character,
    jlptLevel: row.jlpt_level,
    grade: row.grade,
    strokeCount: row.stroke_count,
    freq: row.freq,
    primaryRadical: row.primary_radical,
    radicals: JSON.parse(row.radicals_json || '[]'),
    onYomi: JSON.parse(row.on_yomi_json || '[]'),
    kunYomi: JSON.parse(row.kun_yomi_json || '[]'),
    meanings: JSON.parse(row.meanings_json || '[]'),
    mnemonicMeaning: row.mnemonic_meaning,
    mnemonicReading: row.mnemonic_reading,
    vocabulary: JSON.parse(row.vocabulary_json || '[]'),
    hasStrokeVector: Boolean(strokeRow),
    strokePaths,
    strokeMetadata
  });
});

// Schedule a Kanji into active FSRS spaced repetition deck
kanjiRouter.post('/schedule-srs', (req: Request, res: Response) => {
  const { character, pacing = 'SUSTAINABLE' } = req.body;

  if (!character) {
    return res.status(400).json({ error: 'Missing character' });
  }

  const joyo = db.prepare('SELECT * FROM joyo_kanji WHERE character = ?').get(character) as any;
  if (!joyo) {
    return res.status(404).json({ error: 'Character not found in Joyo catalog' });
  }

  const user = db.prepare('SELECT id FROM users LIMIT 1').get() as any;
  const userId = user?.id || 'user_001';

  const onYomi = JSON.parse(joyo.on_yomi_json || '[]');
  const kunYomi = JSON.parse(joyo.kun_yomi_json || '[]');
  const meanings = JSON.parse(joyo.meanings_json || '[]');
  const reading = [...onYomi, ...kunYomi].join('・') || '読み';
  const meaning = meanings.join(', ') || 'Meaning';

  const existingCard = db.prepare(`
    SELECT id FROM srs_items WHERE user_id = ? AND prompt = ?
  `).get(userId, character) as any;

  const now = new Date();
  const nextDue = new Date(now.getTime() + (pacing === 'SUSTAINABLE' ? 24 * 3600 * 1000 : 12 * 3600 * 1000)).toISOString();

  if (existingCard) {
    db.prepare(`
      UPDATE srs_items
      SET due_date = ?, repetitions = repetitions + 1, interval_days = ?
      WHERE id = ?
    `).run(nextDue, pacing === 'SUSTAINABLE' ? 1 : 0.5, existingCard.id);

    return res.json({
      success: true,
      action: 'updated',
      cardId: existingCard.id,
      character,
      pacing,
      nextDue,
      message: `Kanji 「${character}」 SRS card refreshed in ${pacing === 'SUSTAINABLE' ? 'Sustainable Habit' : 'Accelerated Sprint'} queue.`
    });
  }

  const newId = `srs_joyo_${Date.now()}_${encodeURIComponent(character)}`;
  const backContent = JSON.stringify({
    reading,
    meaning,
    primaryRadical: joyo.primary_radical,
    mnemonic: joyo.mnemonic_meaning,
    vocabulary: JSON.parse(joyo.vocabulary_json || '[]')
  });

  db.prepare(`
    INSERT INTO srs_items (
      id, user_id, item_type, reference_id, prompt, back_content_json,
      state, step, interval_days, ease_factor, stability, difficulty,
      repetitions, lapses, due_date
    ) VALUES (?, ?, 'kanji', ?, ?, ?, 'learning', 0, ?, 2.5, 1.0, 5.0, 0, 0, ?)
  `).run(newId, userId, joyo.id, character, backContent, pacing === 'SUSTAINABLE' ? 1 : 0.5, nextDue);

  res.json({
    success: true,
    action: 'created',
    cardId: newId,
    character,
    pacing,
    nextDue,
    message: `Kanji 「${character}」 added to FSRS review queue (${pacing === 'SUSTAINABLE' ? 'Sustainable Habit: 3–6/day' : 'Sprint: 10–25/day'}).`
  });
});

// Record completed handwriting practice session (Kana or Kanji)
kanjiRouter.post('/record-practice', (req: Request, res: Response) => {
  const {
    userId = 'user_001',
    character,
    syllabary = 'HIRAGANA',
    kanjiId,
    score = 100,
    timeSpentSec = 15,
    strokeOrderCompliance = 100,
    geometrySimilarity = 95
  } = req.body;

  if (!character) {
    return res.status(400).json({ error: 'Missing character' });
  }

  // 1. Insert session record
  const sessionId = `sess_write_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
  db.prepare(`
    INSERT INTO practice_sessions (
      id, user_id, session_type, track_code, level_code, started_at, completed_at, time_spent_sec, score_raw, score_scaled, band_estimate, pass_status
    ) VALUES (?, ?, 'kanji_writing', 'jlpt', 'n5', datetime('now', '-15 seconds'), datetime('now'), ?, ?, ?, ?, 'passed')
  `).run(sessionId, userId, timeSpentSec, score, score, 80);

  // 2. Insert writing attempt
  const attemptId = `kwa_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
  db.prepare(`
    INSERT INTO kanji_writing_attempts (
      id, session_id, user_id, kanji_id, mode, stroke_order_compliance_pct, geometry_similarity_pct, composite_score, mastery_badge, time_spent_sec
    ) VALUES (?, ?, ?, ?, 'guided', ?, ?, ?, 'MASTERED', ?)
  `).run(attemptId, sessionId, userId, kanjiId || character, strokeOrderCompliance, geometrySimilarity, score, timeSpentSec);

  // 3. Increment user streak
  const user = db.prepare('SELECT streak_days FROM users WHERE id = ?').get(userId) as any;
  const currentStreak = user?.streak_days || 0;
  const newStreak = currentStreak === 0 ? 1 : currentStreak + 1;
  db.prepare(`
    UPDATE users
    SET streak_days = ?,
        last_active_at = datetime('now')
    WHERE id = ?
  `).run(newStreak, userId);

  // 4. Update / Insert SRS flashcard
  const existingSrs = db.prepare('SELECT id, repetitions, interval_days, stability FROM srs_items WHERE user_id = ? AND prompt = ?').get(userId, character) as any;
  if (existingSrs) {
    db.prepare(`
      UPDATE srs_items
      SET repetitions = repetitions + 1,
          interval_days = interval_days + 1,
          stability = stability + 0.5,
          last_reviewed_at = datetime('now'),
          due_date = datetime('now', '+1 day')
      WHERE id = ?
    `).run(existingSrs.id);
  } else {
    const srsId = `srs_write_${Date.now()}_${encodeURIComponent(character)}`;
    db.prepare(`
      INSERT INTO srs_items (
        id, user_id, item_type, reference_id, prompt, back_content_json, state, step, interval_days, ease_factor, stability, difficulty, repetitions, lapses, due_date, last_reviewed_at
      ) VALUES (?, ?, 'character', ?, ?, ?, 'review', 1, 1.0, 2.5, 1.5, 5.0, 1, 0, datetime('now', '+1 day'), datetime('now'))
    `).run(srsId, userId, character, character, JSON.stringify({ character, syllabary }));
  }

  // Calculate new completed sessions & progressPct
  const sessionCountRow = db.prepare(`SELECT COUNT(*) as sessionCount FROM practice_sessions WHERE user_id = ? AND pass_status != 'pending'`).get(userId) as any;
  const completedSessions = sessionCountRow ? sessionCountRow.sessionCount : 1;
  const totalLessonsRow = db.prepare('SELECT COUNT(*) as totalLessons FROM lessons').get() as any;
  const totalLessons = totalLessonsRow ? totalLessonsRow.totalLessons : 25;
  const progressPct = Math.min(100, Math.round((completedSessions / totalLessons) * 100));

  res.json({
    success: true,
    sessionId,
    character,
    completedSessions,
    progressPct,
    streakDays: newStreak,
    xpGained: 25,
    message: `Karakter 「${character}」 berhasil dikuasai! Progres kesiapan meningkat menjadi ${progressPct}%.`
  });
});

// Standard list for canvas handwriting engine
kanjiRouter.get('/', (req: Request, res: Response) => {
  const level = req.query.level as string;
  let query = 'SELECT id, character, jlpt_level, on_yomi, kun_yomi, english_gloss, radical, stroke_count FROM kanji_stroke_data';
  const params: any[] = [];

  if (level) {
    query += ' WHERE jlpt_level = ?';
    params.push(level.toUpperCase());
  }

  const rows = db.prepare(query).all(...params);
  res.json(rows);
});

// Character stroke vector details
kanjiRouter.get('/:kanjiId', (req: Request, res: Response) => {
  const { kanjiId } = req.params;

  const row = db.prepare(`
    SELECT * FROM kanji_stroke_data WHERE id = ? OR character = ?
  `).get(kanjiId, kanjiId) as any;

  if (!row) {
    return res.status(404).json({ error: 'Kanji not found' });
  }

  const strokePaths: string[] = JSON.parse(row.stroke_paths_json);
  const strokeMetadata: StrokeDefinition[] = JSON.parse(row.stroke_metadata_json);

  const kanjiData: KanjiStrokeData = {
    id: row.id,
    character: row.character,
    jlptLevel: row.jlpt_level,
    onYomi: row.on_yomi,
    kunYomi: row.kun_yomi,
    englishGloss: row.english_gloss,
    radical: row.radical,
    strokeCount: row.stroke_count,
    strokePaths,
    strokeMetadata
  };

  res.json(kanjiData);
});

kanjiRouter.post('/:kanjiId/attempt', (req: Request, res: Response) => {
  const { kanjiId } = req.params;
  const { score = 100, completedInMs = 5000, strokesAttempted = 1, userId = 'user_001' } = req.body;

  // Also record to practice_sessions so readiness updates
  const sessionId = `sess_attempt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
  db.prepare(`
    INSERT INTO practice_sessions (
      id, user_id, session_type, track_code, level_code, started_at, completed_at, time_spent_sec, score_raw, score_scaled, band_estimate, pass_status
    ) VALUES (?, ?, 'kanji_writing', 'jlpt', 'n5', datetime('now', '-10 seconds'), datetime('now'), ?, ?, ?, ?, 'passed')
  `).run(sessionId, userId, Math.round(completedInMs / 1000), score, score, 80);

  // Update streak
  db.prepare(`UPDATE users SET streak_days = MAX(1, streak_days + 1), last_active_at = datetime('now') WHERE id = ?`).run(userId);

  res.json({
    status: 'recorded',
    sessionId,
    kanjiId,
    score,
    completedInMs,
    strokesAttempted,
    timestamp: new Date().toISOString()
  });
});
