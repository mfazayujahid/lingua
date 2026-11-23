import { Router, Request, Response } from 'express';
import { db } from '../db/database';
import { rawToIELTSAcademicReadingBand } from '../algorithms/ielts';
import { evaluateJLPTResult } from '../algorithms/jlpt';

export const sessionsRouter = Router();

sessionsRouter.post('/start', (req: Request, res: Response) => {
  const { userId, sessionType, trackCode, levelCode } = req.body;
  const sessionId = 'sess_' + Date.now();
  const uId = userId || 'user_001';

  db.prepare(`
    INSERT INTO practice_sessions (id, user_id, session_type, track_code, level_code)
    VALUES (?, ?, ?, ?, ?)
  `).run(sessionId, uId, sessionType || 'mock_exam', trackCode || 'ielts', levelCode || 'academic');

  res.json({
    sessionId,
    startedAt: new Date().toISOString()
  });
});

sessionsRouter.post('/:sessionId/submit', (req: Request, res: Response) => {
  const { sessionId } = req.params;
  const { answers, timeSpentSec, isAbandoned } = req.body;
  const nowIso = new Date().toISOString(); // answers is Record<itemId, userAnswer>

  // Handle premature abandonment / test disqualification (Score 0 / Band 0.0)
  if (isAbandoned) {
    db.prepare(`
      UPDATE practice_sessions SET
        completed_at = ?,
        time_spent_sec = ?,
        score_raw = 0,
        score_scaled = 0,
        band_estimate = 0.0,
        pass_status = 'disqualified'
      WHERE id = ?
    `).run(nowIso, timeSpentSec || 0, sessionId);

    return res.json({
      sessionId,
      lessonId: 'les_ia_mock_full_1',
      score: 0,
      maxScore: 40,
      correctCount: 0,
      totalQuestions: 40,
      accuracyPct: 0,
      bandEstimate: 0.0,
      scaledScore: 0,
      passStatus: 'disqualified',
      passed: false,
      disqualified: true,
      taskDone: true,
      message: 'Sesi ujian didiskualifikasi karena keluar sebelum waktu selesai. Skor Band Resmi: 0.0',
      itemResults: []
    });
  }

  const session = db.prepare('SELECT * FROM practice_sessions WHERE id = ?').get(sessionId) as any;
  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }

  let totalQuestions = 0;
  let correctCount = 0;
  const itemResults: any[] = [];
  let detectedLessonId = '';

  if (answers && typeof answers === 'object') {
    for (const [itemId, rawUserAnswer] of Object.entries(answers)) {
      const item = db.prepare('SELECT * FROM exercise_items WHERE id = ?').get(itemId) as any;
      if (!item) continue;

      if (!detectedLessonId && item.lesson_id) {
        detectedLessonId = item.lesson_id;
      }

      totalQuestions++;
      const correctAnswer = JSON.parse(item.correct_answer_json);
      const isCorrect = String(rawUserAnswer).trim().toLowerCase() === String(correctAnswer).trim().toLowerCase();

      if (isCorrect) correctCount++;

      const subId = 'sub_' + Math.random().toString(36).substring(2, 9);
      db.prepare(`
        INSERT INTO submissions (id, session_id, exercise_item_id, user_answer_json, is_correct, score_awarded)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(subId, sessionId, itemId, JSON.stringify(rawUserAnswer), isCorrect ? 1 : 0, isCorrect ? 1.0 : 0);

      itemResults.push({
        itemId,
        prompt: item.prompt,
        userAnswer: rawUserAnswer,
        correctAnswer,
        isCorrect,
        explanation: item.explanation
      });
    }
  }

  const accuracyPct = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  // Calculate scores
  let bandEstimate = 6.0;
  let scaledScore = 0;
  let passStatus = 'completed';

  if (session.track_code === 'ielts') {
    // Project IELTS band
    const scaledRaw = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 40) : 24;
    bandEstimate = rawToIELTSAcademicReadingBand(scaledRaw);
    passStatus = bandEstimate >= 6.5 ? 'pass' : 'needs_practice';
  } else {
    // JLPT Track
    const jlptEval = evaluateJLPTResult(
      (session.level_code as any) || 'N5',
      { correct: correctCount, total: totalQuestions },
      { correct: correctCount, total: totalQuestions },
      { correct: Math.max(1, correctCount - 1), total: totalQuestions }
    );
    scaledScore = jlptEval.totalScore;
    passStatus = jlptEval.passed ? 'pass' : (jlptEval.isCutoffCasualty ? 'cutoff_casualty' : 'fail');
  }

  db.prepare(`
    UPDATE practice_sessions SET
      completed_at = ?,
      time_spent_sec = ?,
      score_raw = ?,
      score_scaled = ?,
      band_estimate = ?,
      pass_status = ?
    WHERE id = ?
  `).run(nowIso, timeSpentSec || 120, correctCount, scaledScore, bandEstimate, passStatus, sessionId);

  // 1. Mark lesson as COMPLETED in user_lesson_completions
  if (detectedLessonId) {
    db.prepare(`
      INSERT OR REPLACE INTO user_lesson_completions (user_id, lesson_id, completed_at, score, max_score, accuracy_pct)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(session.user_id, detectedLessonId, nowIso, correctCount, totalQuestions, accuracyPct);
  }

  // 2. Update user profile streak & activity
  db.prepare(`
    UPDATE users SET
      last_active_at = ?,
      streak_days = CASE WHEN streak_days < 1 THEN 1 ELSE streak_days END,
      baseline_score = CASE WHEN baseline_score = 0 THEN ? ELSE baseline_score END
    WHERE id = ?
  `).run(nowIso, scaledScore > 0 ? scaledScore : 60, session.user_id);

  // 3. Return full response with both score, correctCount, passed, and completion status
  res.json({
    sessionId,
    lessonId: detectedLessonId,
    score: correctCount,
    maxScore: totalQuestions,
    correctCount,
    totalQuestions,
    accuracyPct,
    bandEstimate,
    scaledScore,
    passStatus,
    passed: correctCount >= Math.max(1, Math.floor(totalQuestions / 2)),
    taskDone: true,
    itemResults
  });
});
