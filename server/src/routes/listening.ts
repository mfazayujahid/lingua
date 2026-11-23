import { Router, Request, Response } from 'express';
import { db } from '../db/database';
import { evaluateListeningPerformance } from '../algorithms/listening';
import { IeltsListeningPackage } from '../types';

export const listeningRouter = Router();

/**
 * GET /api/listening/packages
 * Returns the list of all available listening simulation packages.
 */
listeningRouter.get('/packages', (req: Request, res: Response) => {
  try {
    const rows = db.prepare(`
      SELECT id, title, description, level_code, total_duration_seconds, total_questions, package_data_json, created_at
      FROM listening_packages
      ORDER BY id ASC
    `).all() as any[];

    const packages = rows.map(r => {
      let data: Partial<IeltsListeningPackage> = {};
      try {
        data = JSON.parse(r.package_data_json);
      } catch (err) {
        console.error('Failed to parse package_data_json for listening package', r.id, err);
      }

      return {
        id: r.id,
        title: r.title,
        description: r.description,
        levelCode: r.level_code,
        totalDurationSeconds: r.total_duration_seconds,
        totalQuestions: r.total_questions,
        createdAt: r.created_at,
        sectionCount: data.sections?.length ?? 0,
        sections: data.sections?.map(s => ({
          sectionNumber: s.sectionNumber,
          title: s.title,
          contextDescription: s.contextDescription,
          durationSeconds: s.durationSeconds,
          speakers: s.speakers,
          questionCount: s.questions?.length ?? 0
        })) ?? []
      };
    });

    res.json({ packages });
  } catch (error: any) {
    console.error('Error fetching listening packages:', error);
    res.status(500).json({ error: 'Internal server error fetching listening packages' });
  }
});

/**
 * GET /api/listening/packages/:packageId
 * Returns the full 40-item package data for the specified listening exam package.
 */
listeningRouter.get('/packages/:packageId', (req: Request, res: Response) => {
  const { packageId } = req.params;

  try {
    const row = db.prepare(`
      SELECT id, title, description, level_code, total_duration_seconds, total_questions, package_data_json, created_at
      FROM listening_packages
      WHERE id = ?
    `).get(packageId) as any;

    if (!row) {
      res.status(404).json({ error: `Listening package '${packageId}' not found.` });
      return;
    }

    const packageData = JSON.parse(row.package_data_json) as IeltsListeningPackage;
    res.json({ package: packageData });
  } catch (error: any) {
    console.error(`Error fetching listening package ${packageId}:`, error);
    res.status(500).json({ error: `Internal server error fetching listening package '${packageId}'` });
  }
});

/**
 * POST /api/listening/evaluate
 * Evaluates candidate responses against authentic answer keys, word limits, and distractor mechanics.
 * Body: { packageId: string, answers: Record<number, string>, timeSpentSeconds?: number, mode?: string, userId?: string }
 */
listeningRouter.post('/evaluate', (req: Request, res: Response) => {
  let { packageId } = req.body;
  if (!packageId) packageId = 'pkg_listening_01';
  const {
    answers = {},
    timeSpentSeconds = 0,
    mode = 'strict',
    userId = 'user_001'
  } = req.body;

  if (!packageId || typeof packageId !== 'string') {
    res.status(400).json({ error: 'packageId is required and must be a valid string.' });
    return;
  }

  try {
    const row = db.prepare(`
      SELECT id, title, description, level_code, package_data_json
      FROM listening_packages
      WHERE id = ?
    `).get(packageId) as any;

    if (!row) {
      res.status(404).json({ error: `Listening package '${packageId}' not found.` });
      return;
    }

    const pkg = JSON.parse(row.package_data_json) as IeltsListeningPackage;
    const evaluation = evaluateListeningPerformance(pkg, answers);

    // Persist assessment result to listening_sessions table
    const sessionId = `lsn_session_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    try {
      db.prepare(`
        INSERT INTO listening_sessions (
          id, package_id, user_id, raw_score, overall_band, sectional_scores_json, evaluation_json
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(
        sessionId,
        packageId,
        userId,
        evaluation.rawScore,
        evaluation.overallBand,
        JSON.stringify(evaluation.sectionalScores),
        JSON.stringify(evaluation)
      );
    } catch (dbErr) {
      console.warn('Warning: Could not persist listening session to database:', dbErr);
    }

    res.json({
      sessionId,
      packageId,
      userId,
      mode,
      timeSpentSeconds,
      evaluation
    });
  } catch (error: any) {
    console.error('Error evaluating listening performance:', error);
    res.status(500).json({ error: 'Internal server error evaluating listening performance' });
  }
});

/**
 * GET /api/listening/sessions
 * Returns user's past listening evaluation history.
 */
listeningRouter.get('/sessions', (req: Request, res: Response) => {
  const userId = (req.query.userId as string) || 'user_001';

  try {
    const rows = db.prepare(`
      SELECT s.*, p.title as package_title
      FROM listening_sessions s
      LEFT JOIN listening_packages p ON s.package_id = p.id
      WHERE s.user_id = ?
      ORDER BY s.created_at DESC
      LIMIT 20
    `).all(userId) as any[];

    const sessions = rows.map(r => {
      let evaluation = null;
      let sectionalScores = null;
      try {
        evaluation = JSON.parse(r.evaluation_json);
      } catch (e) {}
      try {
        sectionalScores = JSON.parse(r.sectional_scores_json);
      } catch (e) {}

      return {
        id: r.id,
        packageId: r.package_id,
        packageTitle: r.package_title,
        userId: r.user_id,
        rawScore: r.raw_score,
        overallBand: r.overall_band,
        sectionalScores,
        evaluation,
        createdAt: r.created_at
      };
    });

    res.json({ sessions });
  } catch (error: any) {
    console.error('Error fetching listening sessions:', error);
    res.status(500).json({ error: 'Internal server error fetching listening sessions' });
  }
});
