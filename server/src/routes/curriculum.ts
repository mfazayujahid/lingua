import { Router, Request, Response } from 'express';
import { db } from '../db/database';

export const curriculumRouter = Router();

curriculumRouter.get('/tracks', (req: Request, res: Response) => {
  const tracks = db.prepare('SELECT * FROM tracks').all() as any[];
  const levels = db.prepare('SELECT * FROM levels').all() as any[];

  const result = tracks.map(t => ({
    ...t,
    levels: levels.filter(l => l.track_id === t.id)
  }));

  res.json(result);
});

curriculumRouter.get('/', (req: Request, res: Response) => {
  const trackLevel = (req.query.level as string) || 'ielts_academic';
  const userId = (req.query.userId as string) || 'user_001';

  // Find level
  let levelCode = 'academic';
  if (trackLevel === 'ielts_general') levelCode = 'general';
  else if (trackLevel === 'jlpt_n5') levelCode = 'n5';
  else if (trackLevel === 'jlpt_n4') levelCode = 'n4';
  else if (trackLevel === 'jlpt_n3') levelCode = 'n3';
  else if (trackLevel === 'jlpt_n2') levelCode = 'n2';
  else if (trackLevel === 'jlpt_n1') levelCode = 'n1';

  const level = db.prepare('SELECT * FROM levels WHERE code = ?').get(levelCode) as any;
  if (!level) {
    return res.status(404).json({ error: 'Level not found' });
  }

  // Get user completions
  const completions = db.prepare('SELECT * FROM user_lesson_completions WHERE user_id = ?').all(userId) as any[];
  const completionMap = new Map<string, any>();
  for (const c of completions) {
    completionMap.set(c.lesson_id, c);
  }

  const pillars = db.prepare('SELECT * FROM skill_pillars WHERE level_id = ?').all(level.id) as any[];

  let totalLessonsCount = 0;
  let completedLessonsCount = 0;

  const curriculum = pillars.map(p => {
    const units = db.prepare('SELECT * FROM units WHERE skill_pillar_id = ? ORDER BY order_index').all(p.id) as any[];
    const unitsWithLessons = units.map(u => {
      const lessons = db.prepare('SELECT * FROM lessons WHERE unit_id = ? ORDER BY order_index').all(u.id) as any[];
      return {
        id: u.id,
        title: u.title,
        description: u.description,
        orderIndex: u.order_index,
        lessons: lessons.map(l => {
          totalLessonsCount++;
          const comp = completionMap.get(l.id);
          if (comp) completedLessonsCount++;

          return {
            id: l.id,
            title: l.title,
            lessonType: l.lesson_type,
            estimatedMinutes: l.estimated_minutes,
            orderIndex: l.order_index,
            completed: !!comp,
            score: comp ? comp.score : null,
            maxScore: comp ? comp.max_score : null,
            accuracyPct: comp ? comp.accuracy_pct : null,
            completedAt: comp ? comp.completed_at : null
          };
        })
      };
    });

    return {
      id: p.id,
      code: p.code,
      title: p.title,
      maxScore: p.max_score,
      units: unitsWithLessons
    };
  });

  const levelProgressPct = totalLessonsCount > 0 ? Math.round((completedLessonsCount / totalLessonsCount) * 100) : 0;

  res.json({
    level,
    levelProgressPct,
    completedLessonsCount,
    totalLessonsCount,
    pillars: curriculum
  });
});

curriculumRouter.get('/lessons/:lessonId', (req: Request, res: Response) => {
  const { lessonId } = req.params;

  const lesson = db.prepare('SELECT * FROM lessons WHERE id = ?').get(lessonId) as any;
  if (!lesson) {
    return res.status(404).json({ error: 'Lesson not found' });
  }

  const rawItems = db.prepare('SELECT * FROM exercise_items WHERE lesson_id = ?').all(lessonId) as any[];
  const items = rawItems.map(it => ({
    ...it,
    passageText: it.passage_text || it.passageText,
    itemType: it.item_type || it.itemType,
    options: typeof it.options_json === 'string' ? JSON.parse(it.options_json) : (it.options || []),
    correctAnswer: typeof it.correct_answer_json === 'string' ? JSON.parse(it.correct_answer_json) : (it.correctAnswer || '')
  }));

  res.json({
    lesson,
    items
  });
});
