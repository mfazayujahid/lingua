# Technical Specification: Phase 3 Expanded Multi-Mock Exam Engine (5 Distinct Official Mock Exams)

## 1. Objective & Architecture Overview
This specification translates `docs/DOMAIN_BLUEPRINT.md` (§5.1.7, §5.2.10, §3.2.7) and `docs/USER_FLOWS.md` (Screen 4 & Screen 6) into concrete database schemas, API contracts, algorithms, and frontend components.

Phase 3 establishes:
1. **5 Complete Distinct Official Mock Exam Batteries for IELTS & JLPT**:
   - Zero Task Duplication across Exam Packs 1–5.
   - Distinct reading passages (~2,600 to ~2,800 words each for IELTS Reading), listening manifests, writing tasks, and speaking prompts.
   - Standard official time allocations (e.g. 60 min for IELTS Reading 40 items, 32 min for IELTS Listening 40 items).
2. **Master Exam Battery Selector Hub (`/exam` & `ExamRunnerView.tsx`)**:
   - Pack selection tabs (Pack 1 to 5) with difficulty ratings, thematic titles, section breakdowns, and completion status.
   - Seamless loading of the selected exam package without hardcoded single-exam assumptions.
3. **Longitudinal Attempt History & Weighted Readiness Index ($WRI$)**:
   - Exponential recency weighting ($w_k = \frac{e^{0.5 \times (k-1)}}{\sum e^{0.5 \times (j-1)}}$) for predicting test-day readiness.
   - Score trajectory tracking across attempts stored in SQLite table `user_exam_attempts`.
4. **100% Indonesian Localization**:
   - Full dictionary keys under `exam.*` and `analytics.*` in `LanguageContext.tsx`.

---

## 2. Database Schema & Data Models

### 2.1 Table: `exam_packages`
```sql
CREATE TABLE IF NOT EXISTS exam_packages (
  id TEXT PRIMARY KEY,               -- e.g. 'ielts_acad_mock_01', 'jlpt_n5_mock_01'
  level_code TEXT NOT NULL,          -- e.g. 'ielts_academic', 'jlpt_n5'
  pack_number INTEGER NOT NULL,      -- 1, 2, 3, 4, 5
  title_en TEXT NOT NULL,
  title_id TEXT NOT NULL,
  thematic_focus_en TEXT NOT NULL,
  thematic_focus_id TEXT NOT NULL,
  difficulty_tier TEXT NOT NULL,     -- 'diagnostic', 'standard', 'challenging', 'advanced', 'mastery'
  total_duration_minutes INTEGER NOT NULL,
  pass_threshold_score REAL NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 2.2 Table: `user_exam_attempts`
```sql
CREATE TABLE IF NOT EXISTS user_exam_attempts (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL DEFAULT 'default_user',
  package_id TEXT NOT NULL,
  level_code TEXT NOT NULL,
  pack_number INTEGER NOT NULL,
  raw_score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  scaled_score REAL NOT NULL,        -- Band (e.g. 7.5) or JLPT Score (e.g. 135/180)
  passed INTEGER NOT NULL DEFAULT 0,
  sectional_breakdown TEXT NOT NULL, -- JSON string
  time_spent_seconds INTEGER NOT NULL,
  completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (package_id) REFERENCES exam_packages(id)
);
```

---

## 3. Shared API Types (`shared/types.ts`)
```typescript
export interface MasterExamPackageSummary {
  id: string;
  levelCode: LevelCode;
  packNumber: 1 | 2 | 3 | 4 | 5;
  titleEn: string;
  titleId: string;
  thematicFocusEn: string;
  thematicFocusId: string;
  difficultyTier: 'diagnostic' | 'standard' | 'challenging' | 'advanced' | 'mastery';
  totalDurationMinutes: number;
  passThresholdScore: number;
  questionCount: number;
  completed?: boolean;
  bestScore?: number;
  bestBand?: number;
  lastAttemptAt?: string;
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
  sectionalBreakdown: Record<string, { correct: number; total: number; percentage: number }>;
  timeSpentSeconds: number;
  completedAt: string;
}

export interface ExamBatteryTrajectoryResult {
  attempts: UserExamAttemptRecord[];
  weightedReadinessIndex: number;
  readinessMargin: number;
  targetThreshold: number;
  predictedScore: number;
  totalAttemptsCount: number;
  progressionTrend: 'ascending' | 'stable' | 'needs_reinforcement';
}
```

---

## 4. API Endpoints (`server/src/routes/exams.ts`)
1. `GET /api/exams/packages?track=:levelCode`: Returns list of 5 exam packages for the active track with user attempt summaries.
2. `GET /api/exams/packages/:packageId`: Returns full package questions and passage data.
3. `POST /api/exams/submit`: Records an attempt and evaluates score/band with distractor audit.
4. `GET /api/exams/trajectory?track=:levelCode`: Computes and returns the Weighted Readiness Index ($WRI$) and attempt history.

---

## 5. Delegation Strategy
- **Backend Engineer**: Create schema migrations, database queries, seed packages 1–5, scoring algorithm with WRI formula, and REST endpoints.
- **Frontend Engineer**: Update `ExamRunnerView.tsx` with 5-Pack Selector Grid, integrate with `/api/exams`, update `AnalyticsView.tsx` with progression trajectory chart, and wire 100% Indonesian localization.
