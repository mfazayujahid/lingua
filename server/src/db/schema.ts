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

export type { SpeakingExamPackage, SpeakingSessionRecord };
