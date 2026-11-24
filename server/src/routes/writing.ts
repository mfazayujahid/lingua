import { Router, Request, Response } from 'express';
import {
  getAllWritingPrompts,
  getWritingPromptById,
  saveWritingSubmission,
  getWritingSubmissions,
  getWritingSubmissionById
} from '../db/database';
import { evaluateWritingEssay, ScoringEvaluationInput } from '../algorithms/writingEvaluator';
import { WritingPromptRow, WritingSubmissionRow } from '../db/schema';
import { IELTSWritingTaskType } from '../types';

export const writingRouter = Router();

function formatPromptResponse(row: WritingPromptRow) {
  let visualDataPoints: any = null;
  let guidanceNotes: string[] = [];
  let guidanceNotesId: string[] = [];
  let modelStrengthsEn: string[] = [];
  let modelStrengthsId: string[] = [];

  try {
    if (row.visual_data_points) visualDataPoints = JSON.parse(row.visual_data_points);
  } catch {}
  try {
    if (row.guidance_notes) guidanceNotes = JSON.parse(row.guidance_notes);
  } catch {}
  try {
    if (row.guidance_notes_id) guidanceNotesId = JSON.parse(row.guidance_notes_id);
  } catch {}
  try {
    if (row.model_strengths_en) modelStrengthsEn = JSON.parse(row.model_strengths_en);
  } catch {}
  try {
    if (row.model_strengths_id) modelStrengthsId = JSON.parse(row.model_strengths_id);
  } catch {}

  return {
    id: row.id,
    promptId: row.id,
    task_type: row.task_type,
    taskType: row.task_type as IELTSWritingTaskType,
    category: row.category,
    prompt_title: row.prompt_title,
    title: row.prompt_title,
    title_id: row.title_id || row.prompt_title,
    titleId: row.title_id || row.prompt_title,
    prompt_text: row.prompt_text,
    promptText: row.prompt_text,
    prompt_text_id: row.prompt_text_id || row.prompt_text,
    promptTextId: row.prompt_text_id || row.prompt_text,
    visual_asset_url: row.visual_asset_url,
    visualAssetUrl: row.visual_asset_url,
    visual_data_points: visualDataPoints,
    visualDataPoints: visualDataPoints,
    time_limit_minutes: row.time_limit_minutes,
    suggestedMinutes: row.time_limit_minutes,
    target_word_count: row.target_word_count,
    minimumWords: row.target_word_count,
    model_band_8_response: row.model_band_8_response,
    modelAnswer: row.model_band_8_response,
    guidance_notes: guidanceNotes,
    guidanceNotes: guidanceNotes,
    guidance_notes_id: guidanceNotesId,
    guidanceNotesId: guidanceNotesId,
    model_strengths_en: modelStrengthsEn,
    modelStrengthsEn: modelStrengthsEn,
    model_strengths_id: modelStrengthsId,
    modelStrengthsId: modelStrengthsId,
    benchmark_band: row.benchmark_band || 8.5,
    benchmarkBand: row.benchmark_band || 8.5,
    created_at: row.created_at,
    createdAt: row.created_at
  };
}

/**
 * GET /api/writing/prompts
 * Returns all prompts, optionally filtered by ?taskType= or ?task_type=
 */
writingRouter.get('/prompts', (req: Request, res: Response) => {
  try {
    const rawTaskType = req.query.taskType || req.query.task_type;
    const taskTypeQuery = typeof rawTaskType === 'string' ? rawTaskType : (Array.isArray(rawTaskType) ? (rawTaskType[0] as string) : undefined);
    const rows = getAllWritingPrompts(taskTypeQuery);
    const prompts = rows.map(formatPromptResponse);
    res.json({ prompts });
  } catch (error: any) {
    console.error('Error fetching writing prompts:', error);
    res.status(500).json({ error: 'Internal server error fetching writing prompts' });
  }
});

/**
 * GET /api/writing/prompts/:id
 * Returns a specific prompt by its unique ID.
 */
writingRouter.get('/prompts/:id', (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  try {
    const row = getWritingPromptById(id);
    if (!row) {
      res.status(404).json({ error: `Writing prompt with id '${id}' not found.` });
      return;
    }
    const prompt = formatPromptResponse(row);
    res.json({ prompt });
  } catch (error: any) {
    console.error(`Error fetching writing prompt '${id}':`, error);
    res.status(500).json({ error: `Internal server error fetching writing prompt '${id}'` });
  }
});

/**
 * POST /api/writing/evaluate
 * Evaluates candidate essay, stores submission in writing_submissions, returns DiagnosticScorecardResult.
 */
writingRouter.post('/evaluate', (req: Request, res: Response) => {
  try {
    const {
      promptId,
      prompt_id,
      taskType,
      task_type,
      essayContent,
      essay_text,
      essayText,
      durationSeconds,
      time_spent_seconds,
      timeSpentSeconds,
      isTimedMode,
      is_timed_mode,
      isTimedExam,
      locale,
      userId,
      user_id
    } = req.body;

    const resolvedPromptId = promptId || prompt_id || 'ielts_write_t2_discursive_seed01';
    let resolvedTaskType: IELTSWritingTaskType = (taskType || task_type || 'task_2') as IELTSWritingTaskType;
    const resolvedEssay = essayContent || essay_text || essayText || '';
    const resolvedDuration = durationSeconds ?? time_spent_seconds ?? timeSpentSeconds ?? 0;
    const resolvedTimed = Boolean(isTimedMode ?? is_timed_mode ?? isTimedExam ?? false);
    const resolvedLocale = locale === 'id' ? 'id' : 'en';
    const resolvedUserId = userId || user_id || 'user_001';

    // Retrieve prompt details if available
    let targetMinimumWords = 150;
    let modelAnswerText = '';
    let modelStrengthsEn: string[] = [];
    let modelStrengthsId: string[] = [];
    let benchmarkBand = 8.5;

    const promptRow = getWritingPromptById(resolvedPromptId);
    if (promptRow) {
      if (!taskType && !task_type) {
        resolvedTaskType = promptRow.task_type as IELTSWritingTaskType;
      }
      targetMinimumWords = promptRow.target_word_count;
      modelAnswerText = promptRow.model_band_8_response;
      benchmarkBand = promptRow.benchmark_band || 8.5;
      try {
        if (promptRow.model_strengths_en) modelStrengthsEn = JSON.parse(promptRow.model_strengths_en);
      } catch {}
      try {
        if (promptRow.model_strengths_id) modelStrengthsId = JSON.parse(promptRow.model_strengths_id);
      } catch {}
    } else {
      targetMinimumWords = (resolvedTaskType === 'task_1' || resolvedTaskType === 'task1_academic' || resolvedTaskType === 'task1_general') ? 150 : 250;
    }

    const evaluationInput: ScoringEvaluationInput = {
      taskType: resolvedTaskType,
      promptId: resolvedPromptId,
      essayContent: resolvedEssay,
      durationSeconds: resolvedDuration,
      isTimedMode: resolvedTimed,
      locale: resolvedLocale,
      userId: resolvedUserId,
      targetMinimumWords,
      modelAnswerText,
      modelStrengthsEn,
      modelStrengthsId,
      benchmarkBand
    };

    const scorecard = evaluateWritingEssay(evaluationInput);

    // Save to writing_submissions
    const submissionRow: WritingSubmissionRow = {
      id: scorecard.submissionId,
      prompt_id: resolvedPromptId,
      user_id: resolvedUserId,
      essay_text: resolvedEssay,
      time_spent_seconds: resolvedDuration,
      word_count: scorecard.wordCountMetrics.totalWords,
      overall_band: scorecard.overallBand,
      ta_tr_band: scorecard.criteriaScores.taskAchievementOrResponse.score,
      cc_band: scorecard.criteriaScores.coherenceAndCohesion.score,
      lr_band: scorecard.criteriaScores.lexicalResource.score,
      gra_band: scorecard.criteriaScores.grammaticalRangeAndAccuracy.score,
      evaluation_json: JSON.stringify(scorecard),
      created_at: scorecard.submittedAt
    };

    try {
      saveWritingSubmission(submissionRow);
    } catch (dbErr) {
      console.warn('Warning: Failed to save writing submission to database:', dbErr);
    }

    // Return the scorecard directly, also containing scorecard property for flexibility
    res.status(200).json({
      ...scorecard,
      scorecard
    });
  } catch (error: any) {
    console.error('Error during essay evaluation:', error);
    res.status(500).json({ error: 'Internal server error evaluating writing submission' });
  }
});

/**
 * GET /api/writing/submissions
 * Returns user's past essay diagnostic submissions.
 */
writingRouter.get('/submissions', (req: Request, res: Response) => {
  try {
    const rawUserId = req.query.userId || req.query.user_id;
    const userIdQuery = typeof rawUserId === 'string' ? rawUserId : (Array.isArray(rawUserId) ? (rawUserId[0] as string) : undefined);
    const rows = getWritingSubmissions(userIdQuery);

    const submissions = rows.map(r => {
      let evaluationData: any = null;
      try {
        evaluationData = JSON.parse(r.evaluation_json);
      } catch {}

      return {
        id: r.id,
        submissionId: r.id,
        promptId: r.prompt_id,
        userId: r.user_id,
        essayText: r.essay_text,
        timeSpentSeconds: r.time_spent_seconds,
        wordCount: r.word_count,
        overallBand: r.overall_band,
        taTrBand: r.ta_tr_band,
        ccBand: r.cc_band,
        lrBand: r.lr_band,
        graBand: r.gra_band,
        createdAt: r.created_at,
        scorecard: evaluationData
      };
    });

    res.json({ submissions });
  } catch (error: any) {
    console.error('Error fetching writing submissions:', error);
    res.status(500).json({ error: 'Internal server error fetching writing submissions' });
  }
});

/**
 * GET /api/writing/submissions/:id
 * Returns the full diagnostic scorecard and details for a specific submission.
 */
writingRouter.get('/submissions/:id', (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  try {
    const row = getWritingSubmissionById(id);
    if (!row) {
      res.status(404).json({ error: `Writing submission '${id}' not found.` });
      return;
    }

    let scorecard: any = null;
    try {
      scorecard = JSON.parse(row.evaluation_json);
    } catch {}

    res.json({
      submission: {
        id: row.id,
        promptId: row.prompt_id,
        userId: row.user_id,
        essayText: row.essay_text,
        timeSpentSeconds: row.time_spent_seconds,
        wordCount: row.word_count,
        overallBand: row.overall_band,
        taTrBand: row.ta_tr_band,
        ccBand: row.cc_band,
        lrBand: row.lr_band,
        graBand: row.gra_band,
        createdAt: row.created_at
      },
      scorecard,
      ...scorecard
    });
  } catch (error: any) {
    console.error(`Error fetching writing submission '${id}':`, error);
    res.status(500).json({ error: `Internal server error fetching writing submission '${id}'` });
  }
});
