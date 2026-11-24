// Database Table Schema Types & Definitions
import { SpeakingExamPackage, SpeakingSessionRecord } from '../types';

export interface UserRow {
  id: string;
  username: string;
  email: string;
  active_track: string;
  baseline_score: number;
  target_score: number;
  daily_goal_minutes: number;
  streak_days: number;
  last_active_at?: string;
  created_at: string;
}

export interface TrackRow {
  id: string;
  code: string;
  title: string;
  description: string;
}

export interface LevelRow {
  id: string;
  track_id: string;
  code: string;
  title: string;
  pass_threshold?: number;
  sectional_cutoff?: number;
}

export interface SpeakingPackageRow {
  id: string;
  title: string;
  description: string;
  level_code: string;
  package_data_json: string;
  created_at: string;
}

export interface SpeakingSessionRow {
  id: string;
  package_id: string;
  user_id: string;
  part_number: number;
  prompt_title: string;
  transcript: string;
  duration_seconds: number;
  silent_pauses_count: number;
  hesitation_count: number;
  wpm: number;
  fc_score: number;
  lr_score: number;
  gra_score: number;
  pr_score: number;
  overall_band: number;
  evaluation_json: string;
  created_at: string;
}

export interface ListeningPackageRow {
  id: string;
  title: string;
  description: string;
  level_code: string;
  total_duration_seconds: number;
  total_questions: number;
  package_data_json: string;
  created_at: string;
}

export interface ListeningSessionRow {
  id: string;
  package_id: string;
  user_id: string;
  raw_score: number;
  overall_band: number;
  sectional_scores_json: string;
  evaluation_json: string;
  created_at: string;
}

export interface ExamPackageRow {
  id: string;
  level_code: string;
  pack_number: number;
  title_en: string;
  title_id: string;
  thematic_focus_en: string;
  thematic_focus_id: string;
  difficulty_tier: string;
  total_duration_minutes: number;
  pass_threshold_score: number;
  total_questions?: number;
  package_data_json: string;
  created_at: string;
}

export interface UserExamAttemptRow {
  id: string;
  user_id: string;
  package_id: string;
  level_code: string;
  pack_number: number;
  raw_score: number;
  total_questions: number;
  scaled_score: number;
  passed: number; // 0 | 1
  sectional_breakdown: string;
  time_spent_seconds: number;
  completed_at: string;
}

export interface WritingPromptRow {
  id: string;
  task_type: string;
  category?: string | null;
  prompt_title: string;
  prompt_text: string;
  visual_asset_url?: string | null;
  visual_data_points?: string | null;
  time_limit_minutes: number;
  target_word_count: number;
  model_band_8_response: string;
  guidance_notes?: string | null;
  title_id?: string | null;
  prompt_text_id?: string | null;
  guidance_notes_id?: string | null;
  model_strengths_en?: string | null;
  model_strengths_id?: string | null;
  benchmark_band?: number | null;
  created_at: string;
}

export interface WritingSubmissionRow {
  id: string;
  prompt_id: string;
  user_id: string;
  essay_text: string;
  time_spent_seconds: number;
  word_count: number;
  overall_band: number;
  ta_tr_band: number;
  cc_band: number;
  lr_band: number;
  gra_band: number;
  evaluation_json: string;
  created_at: string;
}

export type { SpeakingExamPackage, SpeakingSessionRecord };
export type { IeltsListeningPackage, ListeningSessionRecord, ListeningEvaluationResult } from '../types';
export type {
  MasterExamPackageSummary,
  UserExamAttemptRecord,
  ExamBatteryTrajectoryResult,
  ExamPackageContent,
  ExamQuestionItem,
  ExamPassage,
  ExamSubmissionPayload,
  ExamSubmissionEvaluationResult,
  IELTSWritingTaskType,
  AnnotationCategory,
  AnnotationSeverity,
  IELTSWritingPromptStimulus,
  SentenceAnnotation,
  CriterionDiagnosticDetail,
  DiagnosticScorecardResult,
  EssaySubmissionPayload
} from '../types';



