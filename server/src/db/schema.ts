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
  ExamSubmissionEvaluationResult
} from '../types';


