# Technical Specification: JLPT 5-Tier Official Mock Exam Engine (N5 to N1)

## 1. Architectural Scope & Objectives
This specification translates `docs/DOMAIN_BLUEPRINT.md` (§2.2, §3.3, §4.3, §5.2) and `docs/USER_FLOWS.md` (§4.31, Scenarios 69–75) into concrete technical designs, database schemas, API contracts, analytical algorithms, and frontend components.

The JLPT Official Mock Exam Engine delivers:
1. **Full 5-Tier Level Coverage (N5, N4, N3, N2, N1)**:
   - N5: 3 Sesi Ujian (文字・語彙 20m, 文法・読解 40m, 聴解 30m) | Pass: ≥80/180 | Furigana: 100% Penuh.
   - N4: 3 Sesi Ujian (文字・語彙 25m, 文法・読解 55m, 聴解 35m) | Pass: ≥90/180 | Furigana: 100% Penuh.
   - N3: 3 Sesi Ujian (文字・語彙 30m, 文法・読解 70m, 聴解 40m) | Pass: ≥95/180 | Furigana: Parsial (N5/N4 kanji polos, N3+ furigana).
   - N2: 2 Sesi Terintegrasi (言語知識・読解 105m, 聴解 50m) | Pass: ≥90/180 | Furigana: Nol pada 2.136 Kanji Joyo.
   - N1: 2 Sesi Terintegrasi (言語知識・読解 110m, 聴解 60m) | Pass: ≥100/180 | Furigana: Nol (hanya kanji non-Joyo langka).
2. **Official 180-Point Scaled Scoring & Sectional 19-Point Cutoff Algorithm**:
   - Total Skor: 0–180 poin (N1–N3: 3 seksi x 60 poin; N4–N5: 120 poin Pengetahuan/Bacaan + 60 poin Listening).
   - **Batas Minimum Seksi (基準点未達 / 19-Point Safeguard)**: Wajib $\ge 19/60$ di setiap seksi. Jika ada seksi $< 19$, hasil mutlak **不合格 (FAILED)** meskipun total poin melampaui passing threshold.
3. **Canonical Mondai (問題) Module Coverage**:
   - 漢字読み (Kanji Reading) & 表記 (Orthography).
   - 文脈規定 (Contextual Vocabulary Selection) & 言い換え類義 (Paraphrase & Synonyms).
   - 用法 (Contextual Idiomatic Usage - N3/N2/N1).
   - 文の組み立て (★ Star Reordering Grammar - 4-slot interactive sentence constructor).
   - 文章の文法 (Text Grammar Cloze).
   - 読解 (Dokkai - Short, Medium, Long, Integrated Comparative, Information Retrieval from notices/flyers).
   - 聴解 (Chokai - Task-Based 課題理解, Key Point ポイント理解, Expression 発話表現, Quick Response 即時応答).
4. **Authentic Japanese Test Booklet & Optical Mark Sheet (マークシート) UI**:
   - Japanese typography (`Noto Serif JP` Mincho & `Noto Sans JP` Gothic).
   - Optical Mark Sheet sidebar with interactive bubble selection `[1] [2] [3] [4]`, flag for review, and instant jump navigation.
   - Interactive 4-slot Star Reordering widget with prominent gold star (`★`) target slot.
   - Split-screen Reading comprehension view with line/paragraph markers and text highlighter.
   - Official JLPT Score Report (合否結果通知書) with radar criteria breakdown and cutoff alerts.

---

## 2. Database Schema & Data Models

The system reuses and enhances the existing `exam_packages` and `user_exam_attempts` tables in `server/src/db/database.ts`:

### 2.1 `exam_packages` Schema
```sql
CREATE TABLE IF NOT EXISTS exam_packages (
  id TEXT PRIMARY KEY,               -- e.g. 'jlpt_n5_mock_pack_01', 'jlpt_n1_mock_pack_01'
  level_code TEXT NOT NULL,          -- 'n5', 'n4', 'n3', 'n2', 'n1'
  pack_number INTEGER NOT NULL,      -- 1 to 5
  title_en TEXT NOT NULL,
  title_id TEXT NOT NULL,
  thematic_focus_en TEXT,
  thematic_focus_id TEXT,
  difficulty_tier TEXT NOT NULL,     -- 'diagnostic', 'standard', 'challenging', 'advanced', 'mastery'
  total_duration_minutes INTEGER,    -- e.g. 90, 115, 140, 155, 170
  pass_threshold_score INTEGER,      -- e.g. 80, 90, 95, 100
  total_questions INTEGER,
  package_data_json TEXT NOT NULL,   -- Complete JSON structure (sections, passages, questions)
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 2.2 `package_data_json` Internal Structure
```typescript
export interface JLPTExamPackageData {
  id: string;
  trackCode: 'jlpt';
  levelCode: 'n5' | 'n4' | 'n3' | 'n2' | 'n1';
  packNumber: number;
  titleEn: string;
  titleId: string;
  titleJp: string;
  durationMinutes: number;
  passThresholdScore: number;
  sectionalCutoffScore: number; // 19
  furiganaPolicy: 'full' | 'partial' | 'none';
  sessions: {
    sessionNumber: number;
    sessionTitleJp: string;
    sessionTitleEn: string;
    sessionTitleId: string;
    durationMinutes: number;
  }[];
  passages: {
    id: string;
    passageType: 'short' | 'medium' | 'long' | 'comparative' | 'information_retrieval';
    titleJp: string;
    titleEn: string;
    textJp: string;
    hasFurigana?: boolean;
    noticeAssetUrl?: string; // For information retrieval flyers/tables
  }[];
  questions: {
    id: string;
    questionNumber: number;
    sessionNumber: number;
    mondaiNumber: number;
    mondaiTitleJp: string;
    mondaiTitleId: string;
    itemType: 'mcq' | 'star_sentence' | 'cloze' | 'chokai_audio';
    stimulusText?: string;
    passageId?: string;
    audioUrl?: string;
    prompt: string;
    scrambledChunks?: [string, string, string, string]; // For star_sentence
    starPosition?: 1 | 2 | 3 | 4;                      // Slot index of the ★
    options: string[];
    correctAnswer: string | number;
    explanation: string;
    explanationId: string;
    sectionCategory: 'language_knowledge' | 'reading' | 'listening';
  }[];
}
```

### 2.3 `user_exam_attempts` Schema
```sql
CREATE TABLE IF NOT EXISTS user_exam_attempts (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  package_id TEXT NOT NULL,
  level_code TEXT NOT NULL,
  pack_number INTEGER NOT NULL,
  raw_score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  scaled_score INTEGER NOT NULL,     -- 0 to 180
  passed BOOLEAN NOT NULL,
  sectional_breakdown TEXT NOT NULL, -- JSON with { languageKnowledge, reading, listening, cutoffFailed }
  time_spent_seconds INTEGER NOT NULL,
  completed_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## 3. Official JLPT Scoring Algorithm (`server/src/lib/jlptScorer.ts`)

```typescript
export interface JLPTScoringResult {
  attemptId: string;
  packageId: string;
  levelCode: string;
  rawScore: number;
  totalQuestions: number;
  accuracyPct: number;
  scaledScore: number; // 0 - 180
  sectionalScores: {
    languageKnowledge: { raw: number; total: number; scaled: number; cutoffPassed: boolean };
    reading: { raw: number; total: number; scaled: number; cutoffPassed: boolean };
    listening: { raw: number; total: number; scaled: number; cutoffPassed: boolean };
  };
  passThreshold: number;
  overallPassed: boolean;
  sectionalCutoffFailed: boolean;
  verdictJp: '合格' | '不合格';
  verdictId: 'LULUS' | 'TIDAK LULUS';
  cutoffAlertId?: string;
  questionEvaluations: {
    questionNumber: number;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    explanation: string;
    explanationId: string;
  }[];
}
```

### Scaling Rules:
1. **N1, N2, N3**:
   - `languageKnowledgeScaled` = $\text{round}\left(\frac{\text{raw}_{\text{vocab}}}{\text{total}_{\text{vocab}}} \times 60\right)$
   - `readingScaled` = $\text{round}\left(\frac{\text{raw}_{\text{read}}}{\text{total}_{\text{read}}} \times 60\right)$
   - `listeningScaled` = $\text{round}\left(\frac{\text{raw}_{\text{list}}}{\text{total}_{\text{list}}} \times 60\right)$
   - `scaledScore` = `languageKnowledgeScaled` + `readingScaled` + `listeningScaled` (Max 180).
   - `sectionalCutoffFailed` = `languageKnowledgeScaled < 19 || readingScaled < 19 || listeningScaled < 19`.
   - `overallPassed` = `scaledScore >= passThreshold && !sectionalCutoffFailed`.

2. **N4, N5**:
   - Combined Language Knowledge & Reading: max 120 points.
   - Listening: max 60 points.
   - `sectionalCutoffFailed` = `langKnowledgeReadingScaled < 38 || listeningScaled < 19`.
   - `overallPassed` = `scaledScore >= passThreshold && !sectionalCutoffFailed`.

---

## 4. REST API Contracts (`server/src/routes/exams.ts`)

1. **`GET /api/exams/packages?track=jlpt&level=n5`**
   - Returns array of exam package summaries for JLPT levels.
   - Response: `{ packages: MasterExamPackageSummary[], total: number }`.

2. **`GET /api/exams/packages/:packageId`**
   - Returns full package content (sections, passages, questions with scrambled chunks and star positions).

3. **`POST /api/exams/submit`**
   - Payload: `{ packageId: string; userId?: string; answers: Record<string | number, string>; timeSpentSeconds?: number; isTimedExam?: boolean }`.
   - Returns `JLPTScoringResult` with official scaled score, sectional cutoffs, and answer analysis.

4. **`GET /api/exams/trajectory?track=jlpt&level=n5`**
   - Returns candidate attempt history and score trajectory across Packs 1–5.

---

## 5. Frontend Component Architecture (`client/src/components/`)

1. **`JLPTExamHubView.tsx`**:
   - Official 5-Level JLPT Card Selector (N5, N4, N3, N2, N1).
   - Level statistics, official passing criteria display, and pack selector (Packs 1–5).
   - Mode Selector: *"Simulasi Resmi (Strict Timed)"* vs *"Mode Latihan Bebas (Untimed Practice)"*.

2. **`JLPTExamRunnerView.tsx`**:
   - Top Bar: Level badge, Session indicator, Countdown timer, Question counter, Furigana toggle.
   - Split-Screen Passage View: Resizable passage text on left, questions on right.
   - Star Reordering Widget: 4 draggable/tappable sentence chunk slots with highlighted `★` slot.
   - Optical Mark Sheet (マークシート) Drawer: Right-side bubble sheet synchronized with question state.
   - Chime Audio Stimulus: Single-play listening player with official chime cue.

3. **`JLPTScorecardModal.tsx`**:
   - Official Result Banner: `合格 (LULUS)` or `不合格 (TIDAK LULUS)`.
   - Total Scaled Score (0–180) vs Pass Threshold Gauge.
   - Sectional Score Bars with 19-point minimum benchmark indicators.
   - Radar Diagnostic Chart: Kanji/Vocab, Grammar, Reading Speed, Listening Comprehension.
   - Detailed Question Review with item-by-item explanation and star reconstruction preview.

---

## 6. Seed Data Specifications (`server/src/db/seeds/jlptExamSeeds.ts`)
Provide complete, authentic, non-trivial seed datasets for all 5 levels:
- **N5 Mock Pack 1** (`jlpt_n5_mock_pack_01`): 25 questions across Kanji Reading, Orthography, Context Vocabulary, Star Reordering (`〜から〜まで`, `〜に行きます`), Short Reading, and Task Listening.
- **N4 Mock Pack 1** (`jlpt_n4_mock_pack_01`): 25 questions across N4 Kanji, Vocabulary, Star Reordering (`〜てはいけません`, `〜ほうがいい`), Information Retrieval (Apartment Notice), and Listening.
- **N3 Mock Pack 1** (`jlpt_n3_mock_pack_01`): 25 questions across N3 Kanji, Nuanced Grammar, Star Reordering (`〜わけにはいかない`, `〜にかぎらず`), Workplace Reading, and Listening.
- **N2 Mock Pack 1** (`jlpt_n2_mock_pack_01`): 25 questions across N2 Kanji, Business Vocabulary, Star Reordering (`〜にほかならない`, `〜ざるを得ない`), Editorial Reading, and Listening.
- **N1 Mock Pack 1** (`jlpt_n1_mock_pack_01`): 25 questions across N1 Advanced Kanji, Literary Idioms, Star Reordering (`〜を皮切りに`, `〜極まりない`), Philosophy/Abstract Dual-Text Reading, and Complex Multi-Speaker Listening.
