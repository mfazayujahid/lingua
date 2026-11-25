// REST API Router for Multi-Mock Exam Progression & Diagnostic Trajectory (Packs 1-5)
import { Router, Request, Response } from 'express';
import { db } from '../db/database';
import {
  evaluateMockSubmission,
  computeBatteryTrajectory
} from '../algorithms/multiMock';
import { evaluateJLPTSubmission } from '../lib/jlptScorer';
import {
  LevelCode,
  ExamPackageContent,
  MasterExamPackageSummary,
  UserExamAttemptRow,
  ExamPackageRow
} from '../types';

export const examsRouter = Router();

/**
 * Normalizes user track/level code input into standardized database level_code.
 */
function normalizeLevelCode(input?: string): string {
  if (!input) return 'ielts_academic';
  const norm = input.trim().toLowerCase();

  if (norm === 'ielts_academic' || norm === 'academic' || norm === 'en_ielts_academic' || norm === 'ielts') {
    return 'ielts_academic';
  }
  if (norm === 'ielts_general' || norm === 'general' || norm === 'en_ielts_general' || norm === 'gt') {
    return 'ielts_general';
  }
  if (norm === 'jlpt_n1' || norm === 'n1' || norm === 'ja_jlpt_n1') return 'jlpt_n1';
  if (norm === 'jlpt_n2' || norm === 'n2' || norm === 'ja_jlpt_n2') return 'jlpt_n2';
  if (norm === 'jlpt_n3' || norm === 'n3' || norm === 'ja_jlpt_n3') return 'jlpt_n3';
  if (norm === 'jlpt_n4' || norm === 'n4' || norm === 'ja_jlpt_n4') return 'jlpt_n4';
  if (norm === 'jlpt_n5' || norm === 'n5' || norm === 'ja_jlpt_n5') return 'jlpt_n5';

  return norm;
}

/**
 * GET /api/exams/packages?track=:levelCode
 * Returns the official exam packages for the target track/level with candidate attempt summaries.
 */
examsRouter.get('/packages', (req: Request, res: Response) => {
  const trackQuery = (req.query.track || req.query.level || req.query.levelCode) as string | undefined;
  const userId = (req.query.userId as string) || 'user_001';

  try {
    let rows: ExamPackageRow[] = [];
    const isGenericJlpt = trackQuery && trackQuery.trim().toLowerCase() === 'jlpt';

    if (isGenericJlpt) {
      rows = db.prepare(`
        SELECT 
          id, level_code, pack_number, title_en, title_id,
          thematic_focus_en, thematic_focus_id, difficulty_tier,
          total_duration_minutes, pass_threshold_score, total_questions,
          created_at
        FROM exam_packages
        WHERE level_code LIKE 'jlpt_%'
        ORDER BY level_code DESC, pack_number ASC
      `).all() as ExamPackageRow[];
    } else {
      const levelCode = normalizeLevelCode(trackQuery);
      rows = db.prepare(`
        SELECT 
          id, level_code, pack_number, title_en, title_id,
          thematic_focus_en, thematic_focus_id, difficulty_tier,
          total_duration_minutes, pass_threshold_score, total_questions,
          created_at
        FROM exam_packages
        WHERE level_code = ?
        ORDER BY pack_number ASC
      `).all(levelCode) as ExamPackageRow[];
    }

    // Fetch user attempts for these packages to build attempt summaries
    const attempts = db.prepare(`
      SELECT 
        id, user_id, package_id, level_code, pack_number,
        raw_score, total_questions, scaled_score, passed,
        sectional_breakdown, time_spent_seconds, completed_at
      FROM user_exam_attempts
      WHERE user_id = ?
      ORDER BY completed_at ASC
    `).all(userId) as UserExamAttemptRow[];

    // Group attempts by package_id
    const attemptsByPackage = new Map<string, UserExamAttemptRow[]>();
    for (const att of attempts) {
      const list = attemptsByPackage.get(att.package_id) || [];
      list.push(att);
      attemptsByPackage.set(att.package_id, list);
    }

    const packages: MasterExamPackageSummary[] = rows.map(r => {
      const pkgAttempts = attemptsByPackage.get(r.id) || [];
      const count = pkgAttempts.length;

      let attemptSummary = null;
      if (count > 0) {
        const latest = pkgAttempts[count - 1];
        let bestScore = latest.raw_score;
        for (const att of pkgAttempts) {
          if (att.raw_score > bestScore) bestScore = att.raw_score;
        }

        attemptSummary = {
          attemptsCount: count,
          bestScore,
          latestScore: latest.raw_score,
          latestScaledScore: latest.scaled_score,
          passed: Boolean(latest.passed),
          lastAttemptedAt: latest.completed_at
        };
      }

      return {
        id: r.id,
        levelCode: r.level_code as LevelCode,
        packNumber: r.pack_number as 1 | 2 | 3 | 4 | 5,
        titleEn: r.title_en,
        titleId: r.title_id,
        thematicFocusEn: r.thematic_focus_en,
        thematicFocusId: r.thematic_focus_id,
        difficultyTier: r.difficulty_tier,
        totalDurationMinutes: r.total_duration_minutes,
        passThresholdScore: r.pass_threshold_score,
        totalQuestions: r.total_questions || 40,
        attemptSummary,
        createdAt: r.created_at
      };
    });

    res.json({
      track: isGenericJlpt ? 'jlpt' : normalizeLevelCode(trackQuery),
      totalPackages: packages.length,
      packages
    });
  } catch (error: any) {
    console.error('Error fetching exam packages:', error);
    res.status(500).json({ error: 'Internal server error fetching exam packages' });
  }
});

/**
 * GET /api/exams/packages/:packageId
 * Returns the full package questions, passage content, and stimuli for the specified exam battery.
 */
examsRouter.get('/packages/:packageId', (req: Request, res: Response) => {
  const { packageId } = req.params;

  try {
    const row = db.prepare(`
      SELECT 
        id, level_code, pack_number, title_en, title_id,
        thematic_focus_en, thematic_focus_id, difficulty_tier,
        total_duration_minutes, pass_threshold_score, total_questions,
        package_data_json, created_at
      FROM exam_packages
      WHERE id = ?
    `).get(packageId) as ExamPackageRow | undefined;

    if (!row) {
      res.status(404).json({ error: `Exam package '${packageId}' not found.` });
      return;
    }

    let parsedContent: Partial<ExamPackageContent> = {};
    try {
      parsedContent = JSON.parse(row.package_data_json);
    } catch (parseErr) {
      console.error(`Failed to parse package_data_json for package ${packageId}:`, parseErr);
    }

    const fullPackage: ExamPackageContent = {
      id: row.id,
      levelCode: row.level_code,
      packNumber: row.pack_number,
      titleEn: row.title_en,
      titleId: row.title_id,
      thematicFocusEn: row.thematic_focus_en,
      thematicFocusId: row.thematic_focus_id,
      difficultyTier: row.difficulty_tier,
      totalDurationMinutes: row.total_duration_minutes,
      passThresholdScore: row.pass_threshold_score,
      totalQuestions: row.total_questions || 40,
      passages: parsedContent.passages || [],
      questions: parsedContent.questions || []
    };

    res.json({
      package: fullPackage,
      // Direct access fields for convenience
      ...fullPackage
    });
  } catch (error: any) {
    console.error(`Error fetching exam package ${packageId}:`, error);
    res.status(500).json({ error: `Internal server error fetching package '${packageId}'` });
  }
});

/**
 * POST /api/exams/submit
 * Records a full exam attempt, evaluates score/band with authentic distractor audit.
 * Supports both IELTS multi-mock exams and JLPT 5-Tier official scaled scoring.
 */
examsRouter.post('/submit', (req: Request, res: Response) => {
  const {
    packageId,
    userId = 'user_001',
    answers = {},
    timeSpentSeconds = 0
  } = req.body;

  if (!packageId || typeof packageId !== 'string') {
    res.status(400).json({ error: 'packageId is required and must be a valid string.' });
    return;
  }

  try {
    const row = db.prepare(`
      SELECT 
        id, level_code, pack_number, title_en, title_id,
        thematic_focus_en, thematic_focus_id, difficulty_tier,
        total_duration_minutes, pass_threshold_score, total_questions,
        package_data_json
      FROM exam_packages
      WHERE id = ?
    `).get(packageId) as ExamPackageRow | undefined;

    if (!row) {
      res.status(404).json({ error: `Exam package '${packageId}' not found.` });
      return;
    }

    const packageContent: ExamPackageContent = JSON.parse(row.package_data_json);
    const isJLPT = row.level_code.startsWith('jlpt_') || packageId.startsWith('jlpt_');

    if (isJLPT) {
      // Evaluate using official JLPT 0-180 scaled score engine & 19-point cutoff safeguard
      const jlptResult = evaluateJLPTSubmission(
        packageContent,
        answers,
        Number(timeSpentSeconds) || 0,
        userId
      );

      // Persist attempt into user_exam_attempts table
      db.prepare(`
        INSERT INTO user_exam_attempts (
          id, user_id, package_id, level_code, pack_number,
          raw_score, total_questions, scaled_score, passed,
          sectional_breakdown, time_spent_seconds, completed_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      `).run(
        jlptResult.attemptId,
        userId,
        packageId,
        jlptResult.levelCode,
        packageContent.packNumber || row.pack_number || 1,
        jlptResult.rawScore,
        jlptResult.totalQuestions,
        jlptResult.scaledScore,
        jlptResult.overallPassed ? 1 : 0,
        JSON.stringify(jlptResult.sectionalScores),
        Number(timeSpentSeconds) || 0
      );

      res.json(jlptResult);
      return;
    }

    // Run the scoring and distractor audit engine for IELTS
    const evaluation = evaluateMockSubmission(
      packageContent,
      answers,
      Number(timeSpentSeconds) || 0,
      userId
    );

    // Persist attempt into user_exam_attempts table
    db.prepare(`
      INSERT INTO user_exam_attempts (
        id, user_id, package_id, level_code, pack_number,
        raw_score, total_questions, scaled_score, passed,
        sectional_breakdown, time_spent_seconds, completed_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `).run(
      evaluation.attemptId,
      userId,
      packageId,
      evaluation.levelCode,
      evaluation.packNumber,
      evaluation.rawScore,
      evaluation.totalQuestions,
      evaluation.scaledScore,
      evaluation.passed ? 1 : 0,
      JSON.stringify(evaluation.sectionalBreakdown),
      evaluation.timeSpentSeconds
    );

    res.json(evaluation);
  } catch (error: any) {
    console.error('Error evaluating exam submission:', error);
    res.status(500).json({ error: 'Internal server error evaluating exam submission' });
  }
});

/**
 * GET /api/exams/trajectory?track=:levelCode
 * Returns candidate's longitudinal attempt history, exponential recency-weighted readiness index (WRI),
 * and headroom margin over official target thresholds.
 */
examsRouter.get('/trajectory', (req: Request, res: Response) => {
  const trackQuery = (req.query.track || req.query.level || req.query.levelCode) as string | undefined;
  const userId = (req.query.userId as string) || 'user_001';
  const levelCode = normalizeLevelCode(trackQuery);

  let targetScore: number | undefined = req.query.targetScore ? Number(req.query.targetScore) : undefined;
  if (targetScore === undefined) {
    const userRow = db.prepare(`SELECT active_track, target_score FROM users WHERE id = ?`).get(userId) as any;
    if (userRow && userRow.target_score && (userRow.active_track === levelCode || (levelCode.includes('ielts') && userRow.target_score <= 9.0))) {
      targetScore = userRow.target_score;
    } else if (levelCode.includes('ielts')) {
      targetScore = 7.0; // Official benchmark target (e.g. Band 7.0 => +0.5 headroom at Band 7.5)
    }
  }

  try {
    const attempts = db.prepare(`
      SELECT 
        id, user_id, package_id, level_code, pack_number,
        raw_score, total_questions, scaled_score, passed,
        sectional_breakdown, time_spent_seconds, completed_at
      ) FROM user_exam_attempts
      WHERE user_id = ? AND level_code = ?
      ORDER BY completed_at ASC
    `).all(userId, levelCode) as UserExamAttemptRow[];

    const trajectoryResult = computeBatteryTrajectory(levelCode, attempts, targetScore);

    res.json(trajectoryResult);
  } catch (error: any) {
    console.error('Error calculating exam trajectory:', error);
    res.status(500).json({ error: 'Internal server error calculating exam trajectory' });
  }
});
