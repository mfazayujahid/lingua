import { Router, Request, Response } from 'express';
import { db } from '../db/database';
import { calculateSRSReview } from '../algorithms/srs';
import { RecallGrade, SRSItem } from '../types';

export const srsRouter = Router();

srsRouter.get('/queue', (req: Request, res: Response) => {
  const userId = (req.query.userId as string) || 'user_001';
  const nowIso = new Date().toISOString();

  // Get items due today or overdue, plus learning cards
  const rows = db.prepare(`
    SELECT * FROM srs_items 
    WHERE user_id = ? AND due_date <= ?
    ORDER BY due_date ASC
  `).all(userId, nowIso) as any[];

  const items: SRSItem[] = rows.map(r => ({
    id: r.id,
    userId: r.user_id,
    itemType: r.item_type,
    referenceId: r.reference_id,
    prompt: r.prompt,
    backContent: JSON.parse(r.back_content_json),
    state: r.state,
    step: r.step,
    intervalDays: r.interval_days,
    easeFactor: r.ease_factor,
    stability: r.stability,
    difficulty: r.difficulty,
    repetitions: r.repetitions,
    lapses: r.lapses,
    dueDate: r.due_date,
    lastReviewedAt: r.last_reviewed_at
  }));

  res.json({
    count: items.length,
    items
  });
});

srsRouter.post('/review', (req: Request, res: Response) => {
  const { srsItemId, grade } = req.body;

  if (!srsItemId || !grade) {
    return res.status(400).json({ error: 'srsItemId and grade (1-4) are required' });
  }

  const row = db.prepare('SELECT * FROM srs_items WHERE id = ?').get(srsItemId) as any;
  if (!row) {
    return res.status(404).json({ error: 'SRS item not found' });
  }

  const item: SRSItem = {
    id: row.id,
    userId: row.user_id,
    itemType: row.item_type,
    referenceId: row.reference_id,
    prompt: row.prompt,
    backContent: JSON.parse(row.back_content_json),
    state: row.state,
    step: row.step,
    intervalDays: row.interval_days,
    easeFactor: row.ease_factor,
    stability: row.stability,
    difficulty: row.difficulty,
    repetitions: row.repetitions,
    lapses: row.lapses,
    dueDate: row.due_date,
    lastReviewedAt: row.last_reviewed_at
  };

  const result = calculateSRSReview(item, grade as RecallGrade);
  const nowIso = new Date().toISOString();

  db.prepare(`
    UPDATE srs_items SET
      state = ?,
      step = ?,
      interval_days = ?,
      ease_factor = ?,
      stability = ?,
      difficulty = ?,
      repetitions = repetitions + 1,
      lapses = lapses + ?,
      due_date = ?,
      last_reviewed_at = ?
    WHERE id = ?
  `).run(
    result.nextState,
    result.nextStep,
    result.nextIntervalDays,
    result.nextEaseFactor,
    result.nextStability,
    result.nextDifficulty,
    grade === 1 ? 1 : 0,
    result.nextDueDate,
    nowIso,
    srsItemId
  );

  res.json({
    success: true,
    result
  });
});
