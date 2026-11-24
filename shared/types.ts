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

// Speaking Studio & Assessment Interfaces
export interface SpeakingDiagnosticEvaluationResult {
  overallBand: number;
  wordCount: number;
  wpm: number;
  durationSeconds: number;
  criteria: {
    fluencyAndCoherence: {
      score: number;
      feedback: string;
      wpm: number;
      continuityPenalty: number;
      pausesCount: number;
      hesitationCount: number;
    };
    lexicalResource: {
      score: number;
      feedback: string;
      typeTokenRatio: number;
      awlWordsDetected: string[];
      idiomaticPhrasesDetected: string[];
    };
    grammaticalRangeAndAccuracy: {
      score: number;
      feedback: string;
      complexClauseRatio: number;
      detectedSubordinatingConjunctions: string[];
      detectedRelativePronouns: string[];
    };
    pronunciation: {
      score: number;
      feedback: string;
      intelligibilityEstimate: number;
      thoughtGroupChunkingEstimate: number;
    };
  };
  annotatedSuggestions: Array<{
    type: 'fluency' | 'lexical' | 'grammar' | 'pronunciation';
    originalText?: string;
    suggestion: string;
    reason: string;
  }>;
}

export interface SpeakingTopicSet {
  topicName: string;
  questions: string[];
}

export interface SpeakingPart1Data {
  title: string;
  durationGuideline: string;
  topicSets: SpeakingTopicSet[];
}

export interface SpeakingCueCard {
  id: string;
  cueCardCode: string;
  themeCategory: 'People' | 'Objects' | 'Places' | 'Experiences' | string;
  taskTitle: string;
  promptLeadIn: string;
  bulletPrompts: string[];
  clarificationPrompt: string;
  prepTime: number;
  speakTime: number;
  followUpQuestions: string[];
  modelBand8Transcript: string;
}

export interface SpeakingPart2Data {
  title: string;
  cueCards: SpeakingCueCard[];
}

export interface SpeakingPart3Question {
  question: string;
  probingAspect?: string;
  sampleBand8KeyPoints?: string[];
}

export interface SpeakingPart3Topic {
  themeTitle: string;
  questions: SpeakingPart3Question[];
}

export interface SpeakingPart3Data {
  title: string;
  durationGuideline: string;
  thematicTopics: SpeakingPart3Topic[];
}

export interface SpeakingExamPackage {
  id: string;
  title: string;
  description: string;
  levelCode: LevelCode;
  parts: {
    part1: SpeakingPart1Data;
    part2: SpeakingPart2Data;
    part3: SpeakingPart3Data;
  };
}

export interface SpeakingSessionRecord {
  id: string;
  packageId: string;
  userId: string;
  partNumber: number;
  promptTitle: string;
  transcript: string;
  durationSeconds: number;
  silentPausesCount: number;
  hesitationCount: number;
  wpm: number;
  fcScore: number;
  lrScore: number;
  graScore: number;
  prScore: number;
  overallBand: number;
  evaluationJson?: string;
  createdAt?: string;
}

// Listening Studio & Assessment Interfaces (DOMAIN_BLUEPRINT.md §5.1.6 & §2.1.6)

export type ListeningAccentCode = 'british_rp' | 'australian' | 'scottish' | 'general_american';

export interface ListeningSpeaker {
  speakerId: string;
  name: string;
  accent: ListeningAccentCode | string;
  gender?: 'male' | 'female' | string;
  role?: string;
}

export interface ListeningTimecodes {
  introLeadIn?: { startSec: number; endSec: number };
  preReadingPause?: { startSec: number; endSec: number };
  dialoguePartA?: { startSec: number; endSec: number };
  midBreakPause?: { startSec: number; endSec: number };
  dialoguePartB?: { startSec: number; endSec: number };
  sectionReviewPause?: { startSec: number; endSec: number };
  [key: string]: { startSec: number; endSec: number } | undefined;
}

export interface SpatialMapHotspot {
  letter: string;
  label: string;
  x: number;
  y: number;
  radius: number;
}

export interface SpatialMapConfig {
  mapImageUri: string;
  viewBox: string;
  hotspots: SpatialMapHotspot[];
}

export interface ListeningDistractorAnalysis {
  deceptiveTrapToken: string;
  linguisticPivotMarker: string;
  correctExplanation: string;
  explanationId?: string; // Indonesian localization explanation (AC 4.23)
  trapType?: 'spelling' | 'date_shift' | 'currency' | 'subtraction' | 'rejection' | 'cardinal_direction' | 'voice_attribution' | 'negation' | 'technical_term' | 'plural_morphology' | string;
}

export interface ListeningQuestion {
  questionNumber: number; // 1 to 40
  sectionNumber: number; // 1, 2, 3, 4
  type: 
    | 'form_completion' 
    | 'note_completion' 
    | 'table_completion' 
    | 'map_labelling' 
    | 'flowchart' 
    | 'multiple_choice' 
    | 'voice_attribution' 
    | 'summary_completion';
  prompt: string;
  instruction?: string;
  wordLimit?: string; // e.g. "NO MORE THAN TWO WORDS AND/OR A NUMBER", "ONE WORD ONLY"
  options?: string[]; // for multiple choice or matching labels A-H
  correctAnswer: string;
  acceptedAnswers: string[];
  audioTimestampSeconds?: number;
  distractorAnalysis?: ListeningDistractorAnalysis;
  targetAccent?: ListeningAccentCode | string;
}

export interface ListeningSection {
  sectionNumber: number; // 1, 2, 3, 4
  title: string;
  contextDescription: string;
  audioUrl: string;
  durationSeconds: number;
  speakers: ListeningSpeaker[];
  timecodes?: ListeningTimecodes;
  spatialMapConfig?: SpatialMapConfig;
  voiceAttributionItems?: number[];
  uninterruptedLecture?: boolean;
  noteCompletionRange?: [number, number];
  questions: ListeningQuestion[];
}

export interface IeltsListeningPackage {
  id: string;
  title: string;
  description: string;
  levelCode: LevelCode;
  totalDurationSeconds: number;
  totalQuestions: number;
  sections: ListeningSection[];
}

export interface ListeningSubmission {
  packageId: string;
  answers: Record<number, string>;
  timeSpentSeconds?: number;
  mode?: 'strict' | 'practice';
  userId?: string;
}

export interface QuestionEvaluationDetail {
  questionNumber: number;
  sectionNumber: number;
  userAnswer: string;
  correctAnswer: string;
  acceptedAnswers: string[];
  isCorrect: boolean;
  errorType?: 'WORD_LIMIT_EXCEEDED' | 'PLURAL_MORPHOLOGY_MISSING' | 'SPELLING_ERROR' | 'DISTRACTOR_TRAP' | 'INCORRECT' | null;
  audioTimestampSeconds?: number;
  distractorAnalysis?: ListeningDistractorAnalysis;
}

export interface SectionalScore {
  raw: number;
  total: number;
  percentage: number;
}

export interface AccentVulnerabilityProfile {
  accent: ListeningAccentCode | string;
  accentName: string;
  sectionNumber?: number;
  correctCount: number;
  totalCount: number;
  accuracyPct: number;
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH';
  feedback: string;
}

export interface ListeningEvaluationResult {
  rawScore: number;
  overallBand: number;
  cefrLevel: string;
  competencyDescriptor: string;
  sectionalScores: {
    section1: SectionalScore;
    section2: SectionalScore;
    section3: SectionalScore;
    section4: SectionalScore;
  };
  accentVulnerabilities: AccentVulnerabilityProfile[];
  errorTypology: {
    wordLimitViolations: number;
    spellingErrors: number;
    distractorTrapFailures: number;
    singularPluralMismatches: number;
    otherErrors: number;
  };
  questionResults: QuestionEvaluationDetail[];
}

export interface ListeningSessionRecord {
  id: string;
  packageId: string;
  userId: string;
  rawScore: number;
  overallBand: number;
  sectionalScoresJson: string;
  evaluationJson: string;
  createdAt?: string;
}

// ==========================================
// Phase 3: Multi-Mock Exam Progression & Diagnostic Trajectory (Packs 1-5)
// ==========================================

export type ExamDifficultyTier = 
  | 'diagnostic'
  | 'standard'
  | 'challenging'
  | 'advanced'
  | 'mastery'
  | 'diagnostic_baseline' 
  | 'core_competence' 
  | 'advanced_academic' 
  | 'high_density' 
  | 'final_readiness';

export interface ExamDistractorAnalysis {
  deceptiveTrapToken?: string;
  linguisticPivotMarker?: string;
  correctExplanation: string;
  explanationId?: string;
  trapType?: 'spelling' | 'rejection' | 'negation' | 'date_shift' | 'currency' | 'subtraction' | 'opposite_meaning' | 'unwarranted_generalization' | 'out_of_scope' | 'grammatical_mismatch' | string;
}

export interface ExamQuestionItem {
  id: string;
  questionNumber: number;
  sectionNumber: number;
  itemType: 'mcq' | 'tfng' | 'matching_headings' | 'sentence_completion' | 'star_sentence' | 'summary_completion' | string;
  prompt: string;
  passagePart?: number;
  passageTitle?: string;
  passageText?: string;
  options?: string[];
  correctAnswer: string | number | string[];
  acceptedAnswers?: string[];
  explanation: string;
  explanationId?: string;
  distractorAnalysis?: ExamDistractorAnalysis;
}

export interface ExamPassage {
  partNumber: number;
  title: string;
  titleId?: string;
  wordCount: number;
  text: string;
}

export interface ExamPackageContent {
  id: string;
  levelCode: LevelCode | string;
  packNumber: number;
  titleEn: string;
  titleId: string;
  thematicFocusEn: string;
  thematicFocusId: string;
  difficultyTier: ExamDifficultyTier | string;
  totalDurationMinutes: number;
  passThresholdScore: number;
  totalQuestions: number;
  passages?: ExamPassage[];
  questions: ExamQuestionItem[];
}

export interface ExamPackageAttemptSummary {
  attemptsCount: number;
  bestScore: number | null;
  latestScore: number | null;
  latestScaledScore: number | null;
  passed: boolean;
  lastAttemptedAt: string | null;
}

export interface MasterExamPackageSummary {
  id: string;
  levelCode: LevelCode;
  packNumber: 1 | 2 | 3 | 4 | 5;
  titleEn: string;
  titleId: string;
  thematicFocusEn: string;
  thematicFocusId: string;
  difficultyTier: ExamDifficultyTier | string;
  totalDurationMinutes: number;
  passThresholdScore: number;
  totalQuestions?: number;
  questionCount?: number;
  completed?: boolean;
  bestScore?: number | null;
  bestBand?: number;
  lastAttemptAt?: string;
  attemptSummary?: ExamPackageAttemptSummary | null;
  createdAt?: string;
}

export interface UserExamAttemptRecord {
  id: string;
  userId: string;
  packageId: string;
  levelCode: LevelCode;
  packNumber: number;
  rawScore: number;
  totalQuestions: number;
  scaledScore: number;
  passed: boolean;
  sectionalBreakdown: Record<string, any>;
  timeSpentSeconds: number;
  completedAt: string;
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
  passed: number;
  sectional_breakdown: string;
  time_spent_seconds: number;
  completed_at: string;
}

export interface ExamTrajectoryPoint {
  packNumber: number;
  packageId: string;
  titleEn: string;
  titleId?: string;
  rawScore: number;
  totalQuestions: number;
  scaledScore: number;
  passed: boolean;
  completedAt: string;
  recencyWeight: number;
}

export interface ExamBatteryTrajectoryResult {
  attempts: UserExamAttemptRecord[];
  weightedReadinessIndex: number;
  readinessMargin: number;
  targetThreshold: number;
  predictedScore: number;
  totalAttemptsCount: number;
  progressionTrend: 'ascending' | 'stable' | 'needs_reinforcement';
  userId?: string;
  levelCode?: string;
  totalCompletedPacks?: number;
  roundedWeightedReadinessIndex?: number;
  passThresholdScore?: number;
  isReadyForExam?: boolean;
  trajectory?: ExamTrajectoryPoint[];
  sectionalTrends?: Record<string, number>;
  diagnosticSummaryEn?: string;
  diagnosticSummaryId?: string;
}

export interface ExamSubmissionPayload {
  packageId: string;
  userId?: string;
  answers: Record<string | number, string>;
  timeSpentSeconds?: number;
}

export interface QuestionDistractorAudit {
  questionNumber: number;
  sectionNumber: number;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  errorType?: 'DISTRACTOR_TRAP' | 'SPELLING_ERROR' | 'UNANSWERED' | 'INCORRECT' | null;
  distractorAnalysis?: ExamDistractorAnalysis;
  explanation: string;
  explanationId?: string;
}

export interface ExamSubmissionEvaluationResult {
  attemptId: string;
  packageId: string;
  userId: string;
  levelCode: string;
  packNumber: number;
  rawScore: number;
  totalQuestions: number;
  scaledScore: number;
  passed: boolean;
  passThresholdScore: number;
  timeSpentSeconds: number;
  sectionalBreakdown: Record<string, any>;
  distractorAudit: {
    distractorTrapFailures: number;
    spellingErrors: number;
    unansweredCount: number;
    otherErrors: number;
    questionAudits: QuestionDistractorAudit[];
  };
  statusDescriptionEn: string;
  statusDescriptionId: string;
}

// ==========================================
// Phase 4: AI Diagnostic Essay Assessment Types
// ==========================================

export type IELTSWritingTaskType = 'task1_academic' | 'task1_general' | 'task2_discursive';

export type AnnotationCategory = 
  | 'grammar_error' 
  | 'collocation_suggestion' 
  | 'vocabulary_enhancement' 
  | 'cohesive_marker_feedback';

export type AnnotationSeverity = 'critical' | 'warning' | 'info';

export interface IELTSWritingPromptStimulus {
  promptId: string;
  taskType: IELTSWritingTaskType;
  title: string;
  titleId: string;
  promptText: string;
  promptTextId: string;
  minimumWords: number;
  suggestedMinutes: number;
  visualType?: 'line_graph' | 'bar_chart' | 'pie_chart' | 'data_table' | 'process_diagram' | 'map';
  visualAssetUrl?: string;
  visualDataPoints?: Record<string, any>;
  guidanceNotes: string[];
  guidanceNotesId: string[];
  benchmarkBand?: number;
  modelAnswer?: string;
  modelStrengthsEn?: string[];
  modelStrengthsId?: string[];
}

export interface SentenceAnnotation {
  id: string;
  sentenceIndex: number;
  charStart: number;
  charEnd: number;
  category: AnnotationCategory;
  subCategory: string;
  severity: AnnotationSeverity;
  originalText: string;
  suggestedReplacement: string;
  explanationEn: string;
  explanationId: string;
}

export interface CriterionDiagnosticDetail {
  score: number;
  nameEn: string;
  nameId: string;
  strengthsEn: string[];
  strengthsId: string[];
  weaknessesEn: string[];
  weaknessesId: string[];
  cambridgeBandDescriptorCitation: string;
}

export interface DiagnosticScorecardResult {
  submissionId: string;
  userId: string;
  promptId: string;
  taskType: IELTSWritingTaskType;
  submittedAt: string;
  durationSeconds: number;
  isTimedExam: boolean;
  
  // Aggregate Scores
  overallBand: number;
  cefrLevel: 'B1' | 'B2' | 'C1' | 'C2';
  criteriaScores: {
    taskAchievementOrResponse: CriterionDiagnosticDetail;
    coherenceAndCohesion: CriterionDiagnosticDetail;
    lexicalResource: CriterionDiagnosticDetail;
    grammaticalRangeAndAccuracy: CriterionDiagnosticDetail;
  };
  
  // Quantitative Metrics
  wordCountMetrics: {
    totalWords: number;
    targetMinimum: number;
    isUnderlength: boolean;
    penaltyApplied: number;
    characterCount: number;
    paragraphCount: number;
  };
  linguisticMetrics: {
    awlDensityPercentage: number;
    awlWordCount: number;
    typeTokenRatio: number;
    guiraudIndex: number;
    errorFreeSentenceRatio: number;
    complexSentenceRatio: number;
  };
  
  // Sentence-Level Annotations
  annotations: SentenceAnnotation[];
  
  // Model Comparison
  modelAnswerComparison: {
    benchmarkBand: number;
    modelText: string;
    modelKeyStrengthsEn: string[];
    modelKeyStrengthsId: string[];
  };
}

export interface EssaySubmissionPayload {
  promptId: string;
  taskType: IELTSWritingTaskType;
  essayContent: string;
  durationSeconds: number;
  isTimedMode: boolean;
  locale?: 'en' | 'id';
  userId?: string;
}
