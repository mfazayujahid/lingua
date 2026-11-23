import { Router, Request, Response } from 'express';
import { db } from '../db/database';
import { evaluateSpeakingPerformance } from '../algorithms/speaking';
import { SpeakingExamPackage } from '../types';

export const speakingRouter = Router();

/**
 * GET /api/speaking/packages
 * Returns the list of all available speaking practice packages.
 */
speakingRouter.get('/packages', (req: Request, res: Response) => {
  try {
    const rows = db.prepare(`
      SELECT id, title, description, level_code, package_data_json, created_at
      FROM speaking_packages
      ORDER BY id ASC
    `).all() as any[];

    const packages = rows.map(r => {
      let data: Partial<SpeakingExamPackage> = {};
      try {
        data = JSON.parse(r.package_data_json);
      } catch (err) {
        console.error('Failed to parse package_data_json for package', r.id, err);
      }

      return {
        id: r.id,
        title: r.title,
        description: r.description,
        levelCode: r.level_code,
        createdAt: r.created_at,
        part1TopicCount: data.parts?.part1?.topicSets?.length ?? 0,
        part2CueCardCount: data.parts?.part2?.cueCards?.length ?? 0,
        part3ThemeCount: data.parts?.part3?.thematicTopics?.length ?? 0,
        cueCards: data.parts?.part2?.cueCards?.map(c => ({
          id: c.id,
          cueCardCode: c.cueCardCode,
          themeCategory: c.themeCategory,
          taskTitle: c.taskTitle
        })) ?? []
      };
    });

    res.json({ packages });
  } catch (error: any) {
    console.error('Error fetching speaking packages:', error);
    res.status(500).json({ error: 'Internal server error fetching speaking packages' });
  }
});

/**
 * GET /api/speaking/packages/:packageId
 * Returns full details of a specific speaking exam package including Part 1, Part 2, and Part 3.
 */
speakingRouter.get('/packages/:packageId', (req: Request, res: Response) => {
  const { packageId } = req.params;

  try {
    const row = db.prepare(`
      SELECT id, title, description, level_code, package_data_json, created_at
      FROM speaking_packages
      WHERE id = ?
    `).get(packageId) as any;

    if (!row) {
      res.status(404).json({ error: `Speaking package '${packageId}' not found.` });
      return;
    }

    const packageData = JSON.parse(row.package_data_json) as SpeakingExamPackage;
    res.json({ package: packageData });
  } catch (error: any) {
    console.error(`Error fetching speaking package ${packageId}:`, error);
    res.status(500).json({ error: `Internal server error fetching speaking package '${packageId}'` });
  }
});

/**
 * POST /api/speaking/evaluate
 * Evaluates spoken performance transcript according to official 9-Band criteria.
 * Body: { transcript, durationSeconds, silentPausesCount, hesitationCount, packageId?, partNumber?, promptTitle?, userId? }
 */
speakingRouter.post('/evaluate', (req: Request, res: Response) => {
  const {
    transcript,
    durationSeconds,
    silentPausesCount = 0,
    hesitationCount = 0,
    packageId,
    partNumber = 2,
    promptTitle = 'Speaking Task Evaluation',
    userId = 'user_001'
  } = req.body;

  if (!transcript || typeof transcript !== 'string' || transcript.trim().length === 0) {
    res.status(400).json({ error: 'Transcript is required and must be a non-empty string.' });
    return;
  }

  if (durationSeconds === undefined || typeof durationSeconds !== 'number' || durationSeconds <= 0) {
    res.status(400).json({ error: 'durationSeconds must be a positive number.' });
    return;
  }

  try {
    const evaluation = evaluateSpeakingPerformance({
      transcript: transcript.trim(),
      durationSeconds,
      silentPausesCount: Number(silentPausesCount) || 0,
      hesitationCount: Number(hesitationCount) || 0
    });

    let savedSessionId: string | undefined;

    // Persist session if packageId is supplied or default exists
    const targetPackageId = packageId || 'pkg_speaking_01';
    const pkgExists = db.prepare('SELECT id FROM speaking_packages WHERE id = ?').get(targetPackageId);

    if (pkgExists) {
      savedSessionId = `spk_sess_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      try {
        db.prepare(`
          INSERT INTO speaking_sessions (
            id, package_id, user_id, part_number, prompt_title,
            transcript, duration_seconds, silent_pauses_count, hesitation_count,
            wpm, fc_score, lr_score, gra_score, pr_score,
            overall_band, evaluation_json
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
          savedSessionId,
          targetPackageId,
          userId,
          Number(partNumber) || 2,
          promptTitle,
          transcript.trim(),
          Math.round(durationSeconds),
          Number(silentPausesCount) || 0,
          Number(hesitationCount) || 0,
          evaluation.wpm,
          evaluation.criteria.fluencyAndCoherence.score,
          evaluation.criteria.lexicalResource.score,
          evaluation.criteria.grammaticalRangeAndAccuracy.score,
          evaluation.criteria.pronunciation.score,
          evaluation.overallBand,
          JSON.stringify(evaluation)
        );
      } catch (dbErr) {
        console.warn('Warning: Could not persist speaking session to database:', dbErr);
      }
    }

    res.json({
      sessionId: savedSessionId,
      ...evaluation
    });
  } catch (error: any) {
    console.error('Error evaluating speaking performance:', error);
    res.status(500).json({ error: 'Internal error evaluating speaking transcript.' });
  }
});

/**
 * GET /api/speaking/sessions
 * Returns user's speaking assessment history.
 */
speakingRouter.get('/sessions', (req: Request, res: Response) => {
  const userId = (req.query.userId as string) || 'user_001';

  try {
    const rows = db.prepare(`
      SELECT s.*, p.title as package_title
      FROM speaking_sessions s
      LEFT JOIN speaking_packages p ON s.package_id = p.id
      WHERE s.user_id = ?
      ORDER BY s.created_at DESC
      LIMIT 20
    `).all(userId) as any[];

    const sessions = rows.map(r => ({
      id: r.id,
      packageId: r.package_id,
      packageTitle: r.package_title,
      partNumber: r.part_number,
      promptTitle: r.prompt_title,
      transcript: r.transcript,
      durationSeconds: r.duration_seconds,
      wpm: r.wpm,
      fcScore: r.fc_score,
      lrScore: r.lr_score,
      graScore: r.gra_score,
      prScore: r.pr_score,
      overallBand: r.overall_band,
      evaluation: r.evaluation_json ? JSON.parse(r.evaluation_json) : null,
      createdAt: r.created_at
    }));

    res.json({ sessions });
  } catch (error: any) {
    console.error('Error fetching speaking sessions:', error);
    res.status(500).json({ error: 'Internal server error fetching speaking sessions' });
  }
});
