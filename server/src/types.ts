// Shared Domain Interfaces & Types
// Dual-Track Language Platform (IELTS & JLPT N5-N1 Progression)

export type TrackCode = 'ielts' | 'jlpt';
export type LevelCode = 
  | 'ielts_academic' 
  | 'ielts_general' 
  | 'jlpt_n5' 
  | 'jlpt_n4' 
  | 'jlpt_n3' 
  | 'jlpt_n2' 
  | 'jlpt_n1';

export type SkillPillarCode = 
  | 'listening' 
  | 'reading' 
  | 'writing' 
  | 'speaking' 
  | 'kanji_vocab' 
  | 'grammar';

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  activeTrack: LevelCode;
  baselineScore: number;
  targetScore: number;
  dailyGoalMinutes: number;
  streakDays: number;
  lastActiveAt?: string;
}

export interface TrackInfo {
  id: string;
  code: TrackCode;
  title: string;
  description: string;
}

export interface LevelInfo {
  id: string;
  trackId: string;
  code: LevelCode;
  title: string;
  passThreshold: number;
  sectionalCutoff: number;
}

export interface UnitInfo {
  id: string;
  skillPillarId: string;
  title: string;
  description: string;
  orderIndex: number;
  lessons: LessonSummary[];
}

export interface LessonSummary {
  id: string;
  unitId: string;
  title: string;
  lessonType: 'reading_drill' | 'writing_task' | 'speaking_task' | 'srs_deck' | 'kanji_writing';
  estimatedMinutes: number;
  orderIndex: number;
  completed?: boolean;
}

export interface ExerciseItem {
  id: string;
  lessonId: string;
  itemType: 'mcq' | 'tfng' | 'heading_match' | 'star_sentence' | 'essay_prompt' | 'speaking_cue';
  prompt: string;
  passageText?: string;
  audioUrl?: string;
  options?: string[];
  correctAnswer: any;
  explanation?: string;
  rubricCriteria?: Record<string, string>;
}

// Spaced Repetition (FSRS / SM-2)
export type SRSState = 'new' | 'learning' | 'review' | 'relearning';
export type RecallGrade = 1 | 2 | 3 | 4; // 1: Again, 2: Hard, 3: Good, 4: Easy

export interface SRSItem {
  id: string;
  userId: string;
  itemType: 'kanji' | 'vocab' | 'grammar';
  referenceId?: string;
  prompt: string;
  backContent: {
    reading?: string;
    englishMeaning: string;
    furigana?: string;
    exampleSentence?: string;
    exampleTranslation?: string;
    nuanceNotes?: string;
    collocations?: string[];
    jlptLevel?: string;
  };
  state: SRSState;
  step: number;
  intervalDays: number;
  easeFactor: number;
  stability: number;
  difficulty: number;
  repetitions: number;
  lapses: number;
  dueDate: string;
  lastReviewedAt?: string;
}

// Kanji Vector Geometry & Stroke Verification
export interface StrokePoint {
  x: number;
  y: number;
  t?: number;
}

export type StrokeMorphology = 
  | 'horizontal' 
  | 'vertical' 
  | 'left_fall' 
  | 'right_fall' 
  | 'dot' 
  | 'hook';

export interface StrokeDefinition {
  strokeIndex: number; // 1-indexed
  svgPath: string; // Canonical SVG path in [0, 1000] space
  startPoint: [number, number]; // [x, y] in [0, 1000]
  endPoint: [number, number];
  primaryAngleDeg: number;
  strokeType: StrokeMorphology;
  pedagogicalRule?: string; // MEXT Hitsujun rule explanation
  directionalHint?: string; // e.g., "Left to Right", "Top to Bottom"
}

export interface KanjiStrokeData {
  id: string;
  character: string;
  jlptLevel: 'HIRAGANA' | 'KATAKANA' | 'N5' | 'N4' | 'N3' | 'N2' | 'N1' | string;
  onYomi: string;
  kunYomi: string;
  englishGloss: string;
  radical: string;
  strokeCount: number;
  strokePaths: string[]; // SVG paths
  strokeMetadata: StrokeDefinition[];
}

export interface KanjiWritingAttempt {
  id?: string;
  userId: string;
  kanjiId: string;
  mode: 'guided' | 'strict_memory';
  strokeOrderCompliancePct: number;
  geometrySimilarityPct: number;
  compositeScore: number;
  masteryBadge: 'master' | 'proficient' | 'needs_practice';
  timeSpentSec: number;
  createdAt?: string;
}

// Evaluation & Diagnostic Results
export interface WritingEvaluationResult {
  overallBand: number;
  criteria: {
    taskResponseOrAchievement: { score: number; feedback: string };
    coherenceAndCohesion: { score: number; feedback: string };
    lexicalResource: { score: number; feedback: string };
    grammaticalRangeAndAccuracy: { score: number; feedback: string };
  };
  wordCount: number;
  wordCountSatisfied: boolean;
  annotatedCorrections: Array<{
    type: 'grammar' | 'vocabulary' | 'cohesion';
    originalText: string;
    suggestion: string;
    reason: string;
  }>;
}

export interface DiagnosticAnalytics {
  activeTrack: LevelCode;
  projectedScore: number;
  targetScore: number;
  confidenceInterval: [number, number];
  history: Array<{ date: string; score: number }>;
  jlptSectionalGauges?: {
    languageKnowledge: { score: number; max: number; cutoff: number; isCasualty: boolean };
    reading?: { score: number; max: number; cutoff: number; isCasualty: boolean };
    listening: { score: number; max: number; cutoff: number; isCasualty: boolean };
    total: { score: number; max: 180; passThreshold: number; passed: boolean };
  };
  radarCompetencies: Array<{ skill: string; studentScore: number; benchmark: number }>;
  srsMemoryHealth: {
    retentionProbabilityPct: number;
    dueToday: number;
    upcoming7Days: number[];
  };
  criticalWeakSpots: Array<{
    tag: string;
    label: string;
    attempts: number;
    accuracyPct: number;
    masteryIndex: number;
    isCritical: boolean;
  }>;
}
