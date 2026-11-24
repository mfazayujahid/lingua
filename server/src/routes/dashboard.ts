import { Router, Request, Response } from 'express';
import { db } from '../db/database';

export const dashboardRouter = Router();

dashboardRouter.get('/', (req: Request, res: Response) => {
  const userId = (req.query.userId as string) || 'user_001';

  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId) as any;
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Count due SRS cards
  const nowIso = new Date().toISOString();
  const srsCountRow = db.prepare(`
    SELECT COUNT(*) as dueCount 
    FROM srs_items 
    WHERE user_id = ? AND due_date <= ?
  `).get(userId, nowIso) as any;

  // Real completed sessions count
  const sessionCountRow = db.prepare(`
    SELECT COUNT(*) as sessionCount 
    FROM practice_sessions 
    WHERE user_id = ? AND pass_status != 'pending'
  `).get(userId) as any;
  const completedSessions = sessionCountRow ? sessionCountRow.sessionCount : 0;

  // Map user active_track to level code
  let levelCode = 'n5';
  if (user.active_track === 'ielts_academic') levelCode = 'academic';
  else if (user.active_track === 'ielts_general') levelCode = 'general';
  else if (user.active_track === 'jlpt_n5') levelCode = 'n5';
  else if (user.active_track === 'jlpt_n4') levelCode = 'n4';
  else if (user.active_track === 'jlpt_n3') levelCode = 'n3';
  else if (user.active_track === 'jlpt_n2') levelCode = 'n2';
  else if (user.active_track === 'jlpt_n1') levelCode = 'n1';

  // Count total lessons and completed lessons for active level
  const levelLessons = db.prepare(`
    SELECT l.id 
    FROM lessons l
    JOIN units u ON l.unit_id = u.id
    JOIN skill_pillars sp ON u.skill_pillar_id = sp.id
    JOIN levels lvl ON sp.level_id = lvl.id
    WHERE lvl.code = ?
  `).all(levelCode) as any[];

  const completedLevelLessons = db.prepare(`
    SELECT c.lesson_id
    FROM user_lesson_completions c
    JOIN lessons l ON c.lesson_id = l.id
    JOIN units u ON l.unit_id = u.id
    JOIN skill_pillars sp ON u.skill_pillar_id = sp.id
    JOIN levels lvl ON sp.level_id = lvl.id
    WHERE c.user_id = ? AND lvl.code = ?
  `).all(userId, levelCode) as any[];

  const totalLessonsInLevel = levelLessons.length > 0 ? levelLessons.length : 1;
  const completedCount = completedLevelLessons.length;
  
  // Progress calculation: If user completed at least 1 session/lesson, show real %!
  let progressPct = 0;
  if (completedCount > 0) {
    progressPct = Math.min(100, Math.round((completedCount / totalLessonsInLevel) * 100));
  } else if (completedSessions > 0) {
    progressPct = Math.min(100, Math.round((completedSessions / totalLessonsInLevel) * 100));
  }

  // Fallback: If 0 but completedSessions > 0, make sure it's at least 15%
  if (completedSessions > 0 && progressPct === 0) {
    progressPct = 15;
  }

  // Recent completed practice sessions
  const sessions = db.prepare(`
    SELECT * FROM practice_sessions 
    WHERE user_id = ? 
    ORDER BY started_at DESC LIMIT 5
  `).all(userId);

  // Recommended next lessons filtered by active level, excluding already completed lessons
  let recommendedLessons = db.prepare(`
    SELECT l.id, l.title, l.lesson_type, l.estimated_minutes, l.order_index as orderIndex, u.title as unit_title, sp.title as pillar_title
    FROM lessons l
    JOIN units u ON l.unit_id = u.id
    JOIN skill_pillars sp ON u.skill_pillar_id = sp.id
    JOIN levels lvl ON sp.level_id = lvl.id
    WHERE lvl.code = ? AND l.id NOT IN (SELECT lesson_id FROM user_lesson_completions WHERE user_id = ?)
    ORDER BY u.order_index ASC, l.order_index ASC
    LIMIT 3
  `).all(levelCode, userId) as any[];

  // Fallback to top / first lesson if all lessons in the level/track are completed
  if (recommendedLessons.length === 0) {
    recommendedLessons = db.prepare(`
      SELECT l.id, l.title, l.lesson_type, l.estimated_minutes, l.order_index as orderIndex, u.title as unit_title, sp.title as pillar_title
      FROM lessons l
      JOIN units u ON l.unit_id = u.id
      JOIN skill_pillars sp ON u.skill_pillar_id = sp.id
      JOIN levels lvl ON sp.level_id = lvl.id
      WHERE lvl.code = ?
      ORDER BY u.order_index ASC, l.order_index ASC
      LIMIT 1
    `).all(levelCode) as any[];
  }

  res.json({
    user: {
      id: user.id,
      username: user.username,
      activeTrack: user.active_track,
      baselineScore: user.baseline_score,
      targetScore: user.target_score,
      dailyGoalMinutes: user.daily_goal_minutes,
      streakDays: (completedSessions > 0 || completedCount > 0) ? Math.max(1, user.streak_days) : 0
    },
    progressPct,
    hasActivity: completedSessions > 0 || completedCount > 0,
    completedLessonsCount: completedCount,
    totalLevelLessons: totalLessonsInLevel,
    srsDueCount: srsCountRow ? srsCountRow.dueCount : 0,
    recentSessions: sessions,
    recommendedLessons
  });
});

dashboardRouter.post('/switch-track', (req: Request, res: Response) => {
  const { userId, newTrack } = req.body;
  if (!newTrack) {
    return res.status(400).json({ error: 'newTrack is required' });
  }
  const uId = userId || 'user_001';

  db.prepare(`UPDATE users SET active_track = ? WHERE id = ?`).run(newTrack, uId);
  res.json({ success: true, activeTrack: newTrack });
});
