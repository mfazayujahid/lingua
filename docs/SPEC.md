# TECHNICAL SPECIFICATION: DUAL-TRACK LANGUAGE PROFICIENCY PLATFORM
## English (IELTS Academic & General) & Japanese (JLPT N3–N1 Progression with Interactive Kanji Handwriting)

---

## 1. System Overview & Architecture

This document defines the production technical design translating [`docs/DOMAIN_BLUEPRINT.md`](file:///C:/Users/user/.orca/bots/principal-architect/docs/DOMAIN_BLUEPRINT.md) and [`docs/USER_FLOWS.md`](file:///C:/Users/user/.orca/bots/principal-architect/docs/USER_FLOWS.md) into an enterprise full-stack web application.

```mermaid
flowchart TD
    subgraph Client["Frontend Client (React 18 + TypeScript + Vite + Tailwind CSS)"]
        UI[Views & Screen Blueprints]
        CanvasEngine[Interactive 60 FPS HTML5 Canvas Brush & Vector Engine]
        ClientValidator[Local Stroke & Hitsujun Validator (<5ms)]
        AudioEngine[Audio & Pronunciation Visualizer]
        StateStore[Local State & Offline Autosave]
    end

    subgraph Server["Backend API (Node.js + Express + TypeScript)"]
        Router[REST API Routes /api/*]
        SRSEngine[FSRS / SM-2 Spaced Repetition Engine]
        IELTSEngine[IELTS Raw-to-Band & 4-Criteria Rubric Evaluator]
        JLPTEngine[JLPT Scaled Score & 19-Pt Cutoff Safeguard]
        WeakSpotEngine[Recency Decay & Mastery Index Diagnostic]
    end

    subgraph Storage["Persistent Database (SQLite: lingua_mastery.db)"]
        DBSchema[(Relational Tables & JSON Columns)]
    end

    UI --> Router
    CanvasEngine --> ClientValidator
    ClientValidator --> Router
    Router --> SRSEngine
    Router --> IELTSEngine
    Router --> JLPTEngine
    Router --> WeakSpotEngine
    Router --> DBSchema
```

---

## 2. Minimal Directory & Folder Structure

```text
.
├── docs/
│   ├── DOMAIN_BLUEPRINT.md
│   ├── USER_FLOWS.md
│   ├── SPEC.md
│   └── proof/                     # QA screenshots and verification artifacts
├── shared/
│   └── types.ts                   # Universal types (Tracks, Levels, Lessons, SRS, Kanji, Vectors)
├── server/
│   ├── package.json
│   ├── tsconfig.json
│   ├── src/
│   │   ├── index.ts               # Express server entry point (port 5000)
│   │   ├── db/
│   │   │   ├── database.ts        # SQLite connection & schema initialization
│   │   │   └── seed.ts            # Realistic standard-aligned seed data injector
│   │   ├── algorithms/
│   │   │   ├── srs.ts             # FSRS/SM-2 spaced repetition calculation
│   │   │   ├── ielts.ts           # IELTS band conversions, rounding & rubric evaluation
│   │   │   ├── jlpt.ts            # JLPT scaled scoring & 19-pt cutoff rules
│   │   │   └── weakSpot.ts        # Recency-weighted mastery index calculation
│   │   └── routes/
│   │       ├── dashboard.ts       # Hub stats, due items, projected bands
│   │       ├── curriculum.ts      # Tracks, levels, units, lessons
│   │       ├── srs.ts             # Flashcard queues and recall rating submissions
│   │       ├── sessions.ts        # Practice test runs and auto-grading
│   │       ├── studio.ts          # Writing & speaking rubric evaluation
│   │       ├── kanji.ts           # Kanji stroke vector definitions & attempt telemetry
│   │       └── analytics.ts       # Radar charts, score curves, cutoff alarms
│   └── lingua_mastery.db          # Isolated SQLite database (never touches trellix.db)
├── client/
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── index.html
│   └── src/
│       ├── main.tsx
│       ├── App.tsx
│       ├── index.css
│       ├── api.ts                 # Typed fetch client connecting to /api
│       ├── lib/
│       │   ├── strokeValidator.ts # 60 FPS vector math, normalization, DTW & hitsujun engine
│       │   └── sound.ts           # Audio chimes for stroke acceptance & error alerts
│       └── components/
│           ├── Navbar.tsx         # Track switcher, streak, daily goal badge
│           ├── DashboardView.tsx  # Screen 1: Mission control hub
│           ├── CurriculumView.tsx # Screen 2: Track & lesson navigator
│           ├── SRSReviewerView.tsx# Screen 3: Interactive flashcard runner
│           ├── ExamRunnerView.tsx # Screen 4: Split-screen exam simulator
│           ├── StudioView.tsx     # Screen 5: Writing essay & speaking evaluation
│           ├── AnalyticsView.tsx  # Screen 6: Mastery radar, score trends, cutoff alarms
│           └── KanjiCanvasView.tsx# Screen 7: Paint-like kanji writing & stroke canvas
├── package.json                   # Root orchestrator scripts
└── README.md
```

---

## 3. Database Schema (`lingua_mastery.db`)

All tables are maintained in `server/lingua_mastery.db` using SQLite.

### 3.1 DDL Schema Definitions

```sql
-- Users & Calibration
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  active_track TEXT NOT NULL DEFAULT 'ielts_academic', -- 'ielts_academic', 'ielts_general', 'jlpt_n3', 'jlpt_n2', 'jlpt_n1'
  baseline_score REAL DEFAULT 6.0,
  target_score REAL DEFAULT 7.5,
  daily_goal_minutes INTEGER DEFAULT 30,
  streak_days INTEGER DEFAULT 1,
  last_active_at TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Curriculum Hierarchy
CREATE TABLE IF NOT EXISTS tracks (
  id TEXT PRIMARY KEY,
  code TEXT UNIQUE NOT NULL, -- 'ielts', 'jlpt'
  title TEXT NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS levels (
  id TEXT PRIMARY KEY,
  track_id TEXT NOT NULL REFERENCES tracks(id),
  code TEXT NOT NULL, -- 'academic', 'general', 'n3', 'n2', 'n1'
  title TEXT NOT NULL,
  pass_threshold REAL,
  sectional_cutoff REAL
);

CREATE TABLE IF NOT EXISTS skill_pillars (
  id TEXT PRIMARY KEY,
  level_id TEXT NOT NULL REFERENCES levels(id),
  code TEXT NOT NULL, -- 'listening', 'reading', 'writing', 'speaking', 'kanji_vocab', 'grammar'
  title TEXT NOT NULL,
  max_score REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS units (
  id TEXT PRIMARY KEY,
  skill_pillar_id TEXT NOT NULL REFERENCES skill_pillars(id),
  title TEXT NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS lessons (
  id TEXT PRIMARY KEY,
  unit_id TEXT NOT NULL REFERENCES units(id),
  title TEXT NOT NULL,
  lesson_type TEXT NOT NULL, -- 'reading_drill', 'writing_task', 'speaking_task', 'srs_deck', 'kanji_writing'
  estimated_minutes INTEGER DEFAULT 15,
  order_index INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS exercise_items (
  id TEXT PRIMARY KEY,
  lesson_id TEXT NOT NULL REFERENCES lessons(id),
  item_type TEXT NOT NULL, -- 'mcq', 'tfng', 'heading_match', 'star_sentence', 'essay_prompt', 'speaking_cue'
  prompt TEXT NOT NULL,
  passage_text TEXT,
  audio_url TEXT,
  options_json TEXT,         -- Array of string choices
  correct_answer_json TEXT,  -- Correct string or array
  explanation TEXT,
  rubric_criteria_json TEXT
);

-- Kanji Stroke Vector Geometry & MEXT Hitsujun
CREATE TABLE IF NOT EXISTS kanji_stroke_data (
  id TEXT PRIMARY KEY,
  character TEXT UNIQUE NOT NULL,
  jlpt_level TEXT NOT NULL, -- 'N3', 'N2', 'N1'
  on_yomi TEXT NOT NULL,
  kun_yomi TEXT NOT NULL,
  english_gloss TEXT NOT NULL,
  radical TEXT NOT NULL,
  stroke_count INTEGER NOT NULL,
  stroke_paths_json TEXT NOT NULL,     -- Array of SVG canonical path strings
  stroke_metadata_json TEXT NOT NULL   -- Array of StrokeDefinition objects (start, end, angle, type, rules)
);

-- Spaced Repetition (FSRS / SM-2 Engine)
CREATE TABLE IF NOT EXISTS srs_items (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  item_type TEXT NOT NULL, -- 'kanji', 'vocab', 'grammar'
  reference_id TEXT,
  prompt TEXT NOT NULL,
  back_content_json TEXT NOT NULL,
  state TEXT NOT NULL DEFAULT 'new', -- 'new', 'learning', 'review', 'relearning'
  step INTEGER DEFAULT 0,
  interval_days REAL DEFAULT 0,
  ease_factor REAL DEFAULT 2.50,
  stability REAL DEFAULT 1.0,
  difficulty REAL DEFAULT 5.0,
  repetitions INTEGER DEFAULT 0,
  lapses INTEGER DEFAULT 0,
  due_date TEXT NOT NULL,
  last_reviewed_at TEXT
);

-- Test Sessions & Telemetry
CREATE TABLE IF NOT EXISTS practice_sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  session_type TEXT NOT NULL, -- 'mock_exam', 'skill_drill', 'srs_review', 'writing_studio', 'kanji_canvas'
  track_code TEXT NOT NULL,
  level_code TEXT NOT NULL,
  started_at TEXT DEFAULT CURRENT_TIMESTAMP,
  completed_at TEXT,
  time_spent_sec INTEGER DEFAULT 0,
  score_raw REAL DEFAULT 0,
  score_scaled REAL DEFAULT 0,
  band_estimate REAL DEFAULT 0,
  pass_status TEXT DEFAULT 'pending' -- 'pass', 'fail', 'cutoff_casualty', 'completed'
);

CREATE TABLE IF NOT EXISTS submissions (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL REFERENCES practice_sessions(id),
  exercise_item_id TEXT NOT NULL REFERENCES exercise_items(id),
  user_answer_json TEXT NOT NULL,
  is_correct INTEGER DEFAULT 0,
  score_awarded REAL DEFAULT 0,
  rubric_feedback_json TEXT
);

CREATE TABLE IF NOT EXISTS kanji_writing_attempts (
  id TEXT PRIMARY KEY,
  session_id TEXT REFERENCES practice_sessions(id),
  user_id TEXT NOT NULL REFERENCES users(id),
  kanji_id TEXT NOT NULL REFERENCES kanji_stroke_data(id),
  mode TEXT NOT NULL, -- 'guided', 'strict_memory'
  stroke_order_compliance_pct REAL NOT NULL,
  geometry_similarity_pct REAL NOT NULL,
  composite_score REAL NOT NULL,
  mastery_badge TEXT NOT NULL, -- 'master', 'proficient', 'needs_practice'
  time_spent_sec INTEGER DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
```

---

## 4. Exact API Contracts

| Route | Method | Description | Request Body Payload | Response Payload |
| :--- | :--- | :--- | :--- | :--- |
| `/api/health` | `GET` | Health status probe | *None* | `{ status: "ok", timestamp: string, database: "connected" }` |
| `/api/dashboard` | `GET` | Dashboard summary | Query: `?userId=user_001` | Active track, streak, due SRS cards count, projected score/band, recommended lessons |
| `/api/tracks` | `GET` | List available tracks | *None* | Array of tracks with levels and skill pillars |
| `/api/curriculum` | `GET` | Full curriculum tree | Query: `?track=jlpt_n2` | Units, lessons, exercise item counts, user completion status |
| `/api/lessons/:lessonId` | `GET` | Lesson detail & items | *None* | Lesson metadata, associated exercise items / passages / kanji |
| `/api/srs/queue` | `GET` | Fetch due SRS cards | Query: `?userId=user_001` | Array of due cards (`item_type`, `prompt`, `back_content`, `state`, `due_date`) |
| `/api/srs/review` | `POST` | Submit recall grade | `{ srsItemId: string, grade: 1\|2\|3\|4 }` | Updated SRS item with next `interval_days`, `ease_factor`, `due_date` |
| `/api/sessions/start` | `POST` | Begin practice/exam | `{ userId: string, sessionType: string, levelCode: string }` | `{ sessionId: string, startedAt: string }` |
| `/api/sessions/:sessionId/submit` | `POST` | Submit completed test | `{ answers: Record<string, any>, timeSpentSec: number }` | Graded summary: raw score, scaled score, band estimate, pass status, evidence citations |
| `/api/studio/writing/evaluate` | `POST` | Diagnostic essay eval | `{ taskId: string, essayText: string, taskType: 1\|2 }` | Sub-scores (TR, CC, LR, GRA), overall band, word count check, inline corrections & suggestions |
| `/api/kanji` | `GET` | List seed kanji cards | Query: `?level=N2` | Array of kanji characters with gloss, reading, and stroke counts |
| `/api/kanji/:kanjiId` | `GET` | Detailed kanji vector | *None* | Full `KanjiStrokeData` with SVG stroke paths and MEXT hitsujun rules |
| `/api/kanji/:kanjiId/attempt` | `POST` | Save writing attempt | `{ userId: string, mode: string, hitsujunOrderPct: number, geometrySimilarityPct: number, timeSpentSec: number }` | `{ attemptId: string, compositeScore: number, masteryBadge: string, srsScheduled: boolean }` |
| `/api/analytics` | `GET` | Comprehensive metrics | Query: `?userId=user_001` | Score trajectory, JLPT 19-pt cutoff alarms, radar chart dimensions, weak spot list |

---

## 5. Client-Side 60 FPS Kanji Handwriting Engine Architecture

```typescript
// Core Vector Mathematics & Normalization
export interface Point {
  x: number;
  y: number;
  t: number;
}

export interface StrokeDefinition {
  strokeIndex: number;
  startPoint: [number, number];   // Canonical [0, 1000]
  endPoint: [number, number];
  primaryAngleDeg: number;
  strokeType: 'horizontal' | 'vertical' | 'left_fall' | 'right_fall' | 'dot' | 'hook';
  pedagogicalRule?: string;       // e.g., "中先両側: Center hook before side dots"
}
```

1. **Stroke Capture**: Captures pointer events (`pointerdown`, `pointermove`, `pointerup`) with velocity calculation.
2. **Resampling**: Uses chord-length arc sampling to normalize raw drawn strokes to exactly $N=64$ equidistant points.
3. **Multi-Gate Validation Engine**:
   - Direction vector dot-product: $\cos(\Delta \theta) \ge 0.5$ (flags reversed strokes if $\Delta \theta > 135^\circ$).
   - Sequence State Machine: Rejects strokes drawn out of standard order, giving exact pedagogical rule feedback.
   - Endpoint proximity: Euclidean distance $\le 90$ units in $1000 \times 1000$ coordinate space.
4. **Snapping & Animation**: On acceptance, morphs drawn line into smooth canonical SVG stroke and plays audio confirmation chime.

---

## 6. Seed Data Specification

The database will be initialized via `server/src/db/seed.ts` with authentic content:
1. **IELTS Academic Reading**: Passage *"The Cognitive Architecture of Bilingualism"* (720 words), 5 Paragraph Headings, 4 True/False/Not Given questions with full pedagogical evidence explanations.
2. **IELTS Writing Task 2**: Prompt on AI and cognitive automation; Band 8.5 benchmark essay with full 4-criteria rubric breakdown.
3. **IELTS Speaking Part 2**: Cue card on an environmental initiative with sample transcript, lexical resource highlights, and Part 3 abstract follow-ups.
4. **JLPT N3**: Contrastive grammar (`〜に対して` vs `〜反面`), star-sentence drill, and Kanji vector: **`対`** (7 strokes).
5. **JLPT N2**: Grammar (`〜にほかならない`), remote work editorial reading comprehension, and Kanji vectors: **`把`** (7 strokes) and **`握`** (12 strokes).
6. **JLPT N1**: High-register grammar (`〜極まりない`), star-sentence nuance exercise, and Kanji vector: **`示`** (5 strokes - validating the *中先両側* center-first rule).

---

## 7. Exact Startup Command

The system runs cleanly without external dependencies:

```powershell
# From project root:
# 1. Install dependencies:
npm.cmd run install:all

# 2. Build & Seed database:
npm.cmd run db:seed

# 3. Start fullstack application (Server on :5000, Client on :5173):
npm.cmd run dev
```

Both backend (`http://localhost:5000/api/health`) and frontend (`http://localhost:5173`) boot with instant `200 OK` responses.

---

## 8. Kana Handwriting Syllabary & Mobile-First Architecture Extension

### 8.1 Kana Syllabary Schemas & Vector Datasets
- **Hiragana (平仮名) Seed Dataset**:
  - `あ` (`kana_a_hiragana`): 3 strokes (Horizontal beam, vertical curve, cursive loop).
  - `い` (`kana_i_hiragana`): 2 strokes (Vertical curve with hane flick, balancing right slant).
- **Katakana (片仮名) Seed Dataset**:
  - `ア` (`kana_a_katakana`): 2 strokes (Horizontal folding inward, sweeping left-fall).
  - `カ` (`kana_ka_katakana`): 2 strokes (Corner hook with sharp interior flick, diagonal piercing slant).
- **JLPT N5-N1 Kanji Progression**:
  - `日` (N5, 4 strokes), `本` (N5, 5 strokes), `会` (N4, 6 strokes), `把` (N2, 7 strokes).

### 8.2 Human-Friendly Adaptive Tolerance Engine
- **Canvas Resolution**: Canonical internal coordinate system fixed to $1000 \times 1000$ points. Screen touch/pointer events are normalized directly via bounding client rect:
  $$x_{\text{canon}} = \frac{e.clientX - \text{rect.left}}{\text{rect.width}} \times 1000, \quad y_{\text{canon}} = \frac{e.clientY - \text{rect.top}}{\text{rect.height}} \times 1000$$
- **Adaptive Proximity Thresholds**: Start point tolerance expanded to $\tau_{\text{start}} = 260$ units, End point tolerance $\tau_{\text{end}} = 280$ units.
- **Directional Compliance**: Validated by stroke morphology (horizontal: $dx > 20$, vertical: $dy > 20$, diagonal falls: signed quadrant checks).
- **Reverse Detection**: Rejects backwards strokes with clear hitsujun guidance ($D_{\text{reverse}} < 240, \Delta \theta > 110^\circ$).
- **No-Skip Demonstration Engine**: Monotonic $u \in [0.0, 1.0]$ interpolation via `requestAnimationFrame` with mandatory $180\text{ms}$ dwell phase between consecutive strokes.

### 8.3 Mobile-First Viewport Specifications (375px–430px)
- **Container Styling**: Strict `touch-action: none;` on canvas container preventing screen scroll bounce or zoom gestures while drawing.
- **Aspect Ratio**: 1:1 responsive square canvas (`w-full max-w-[380px] aspect-square mx-auto`).
- **Ergonomic Bottom Navigation**: Fixed bottom navigation bar on mobile (`md:hidden fixed bottom-0`) with 48px touch targets and safe-area insets.

---

## 9. Complete 2,136 Jōyō Kanji & 4-Step Mastery Formula Technical Specifications

### 9.1 Database Architecture (`joyo_kanji` Table)
The database stores all official 2,136 Jōyō Kanji across the 5 JLPT tiers:
- **JLPT N5**: ~81–103 foundational everyday kanji
- **JLPT N4**: ~168–181 daily living and action kanji
- **JLPT N3**: ~369–370 intermediate social and conceptual kanji
- **JLPT N2**: ~369–382 business, legal, and media kanji
- **JLPT N1**: ~1,149–1,100 high-register literary and philosophical kanji

```sql
CREATE TABLE IF NOT EXISTS joyo_kanji (
  id TEXT PRIMARY KEY,
  character TEXT NOT NULL UNIQUE,
  jlpt_level TEXT NOT NULL,
  grade INTEGER,
  stroke_count INTEGER NOT NULL,
  freq INTEGER,
  primary_radical TEXT,
  radicals_json TEXT,
  on_yomi_json TEXT,
  kun_yomi_json TEXT,
  meanings_json TEXT,
  mnemonic_meaning TEXT,
  mnemonic_reading TEXT,
  vocabulary_json TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_joyo_level ON joyo_kanji(jlpt_level);
CREATE INDEX IF NOT EXISTS idx_joyo_char ON joyo_kanji(character);
CREATE INDEX IF NOT EXISTS idx_joyo_strokes ON joyo_kanji(stroke_count);
```

### 9.2 REST API Contracts
1. `GET /api/kanji/catalog?level={ALL|N5|N4|N3|N2|N1}&search={term}&limit={n}&offset={m}`:
   - Returns paginated Jōyō catalog items with global level statistics and matching item counts.
2. `GET /api/kanji/detail/:character`:
   - Returns complete 4-step pedagogical record (Radicals, Mnemonics, Vocabulary Compounds, Stroke Data).
3. `POST /api/kanji/schedule-srs`:
   - Body: `{ character: string, pacing: 'SUSTAINABLE' | 'SPRINT' }`
   - Provisions or updates FSRS interval item in `srs_items` queue.

### 9.3 The 4-Step Kanji Mastery Formula Architecture (4段階漢字習得メソッド)
Integrated directly into the `KanjiCanvasView` interactive workspace:
- **Step 1 (Radical Breakdown / 部首分解)**: Primary radical (Kangxi #, position, meaning) and constituent sub-primitives.
- **Step 2 (Mnemonic Association / 記憶術)**: Dual meaning story and phonetic reading story.
- **Step 3 (Real Vocabulary Compounds / 生きた熟語)**: Practical native compounds with readings and definitions.
- **Step 4 (FSRS Spaced Repetition / FSRS同期)**: 1-click scheduling into user's review deck with habit pacing selector (Sustainable 3–6/day vs Accelerated 10–25/day).

### 9.4 Syllabus Furigana / Hiragana Subtext Toggle Control
Integrated into `CurriculumView`:
- Toolbar button: `"ふりがな (Furigana / Hiragana Subtext)"` with active status badge.
- **ON State**: Injects small Hiragana phonetic subtext directly below each Kanji character and compound across unit headers, lesson titles, and grammar descriptions.
- **OFF State**: Restores clean adult Japanese orthography for realistic exam simulation.
- Persisted in client `localStorage` (`lingua_furigana_enabled`).

## 10. Global Full-Application Furigana Engine & 6-Stage Guided Learning Roadmap

### 10.1 Global Furigana Architecture (`FuriganaContext.tsx`)
- **Global Context & State Management**: Persistent global provider `<FuriganaProvider>` managing `furiganaEnabled`, `toggleFurigana`, and `renderFurigana(text)` across the entire application lifecycle.
- **Top Navigation Bar Toggle**: Permanent global control in `Navbar.tsx` accessible from any screen:
  - Toggle button: `"ふりがな (Furigana): ON / OFF"` with real-time active status indicator (`text-vermilion-500` / `bg-emerald-500`).
  - Synced to `localStorage` key `lingua_furigana_enabled` (defaults to `true` for beginner accessibility).
  - Synchronous DOM attribute reflection: `<html data-furigana="on|off">` ensuring zero layout jank or flash during theme or page navigation.
- **Dual-Line Phonetic Subtext Layout**:
  - Each annotated Kanji or compound is rendered via an inline flex-column block:
    ```tsx
    <span className="inline-flex flex-col items-center justify-center align-middle mx-[1.5px] leading-none group/furi">
      <span className="leading-tight font-jp text-inherit">{kanji}</span>
      <span className="text-[9px] text-vermilion-600 dark:text-vermilion-400 font-jp font-semibold tracking-tighter leading-none mt-0.5 select-none animate-fadeIn">
        {hiragana_reading}
      </span>
    </span>
    ```
  - Subtext appears directly below each Kanji character without altering surrounding text baseline or distorting UI cards.

### 10.2 Ubiquitous Cross-Module Coverage
Furigana subtext is active across all 6 core modules of LinguaMastery:
1. **Dashboard (`/dashboard`)**: Recommended next step hero cards, syllabus milestone badges, and study goal trackers.
2. **Curriculum Navigator (`/curriculum`)**: 6-Stage interactive roadmap stepper, unit titles, lesson headers, and grammatical structure descriptors.
3. **Practice Exam Runner (`/practice/:lessonId`)**: Exam preset module titles, reference passage contexts, question prompts, and interactive multiple-choice options.
4. **Productive Writing Studio (`/studio`)**: Writing task prompt instructions, pedagogical rubrics (c1–c4 criterion labels), and official benchmark model answers.
5. **Spaced Repetition Reviewer (`/srs/review`)**: Front character prompts, back readings, native contextual sentences, and collocation tags.
6. **Kanji Mastery Studio (`/canvas/...`)**: Radical names, mnemonic meaning stories, mnemonic reading stories, and high-frequency vocabulary compounds.

### 10.3 Pedagogical 6-Stage Guided Progressive Corridor ("Where to Start / How to Learn")
Resolves the common beginner paralysis (*"Do I have to learn all words or 2,136 kanji first?"*). Guided by consensus SLA methodology (*Genki*, *Minna no Nihongo*, *Marugoto*, *WaniKani*):
- **Core Principle**: Vocabulary and grammar must be acquired together in thematic communicative units, preceded by Kana first, with daily Kanji learned in parallel (never in isolation).
- **Stage 1: Kana Literacy (文字の土台: 平仮名・片仮名)**: Master 46 Hiragana & 46 Katakana first with stroke order animations and canvas tracing.
- **Stage 2: Core Sentence Patterns (基本文型と格助詞: N5)**: Topic/subject particles (は, が, を, に, で), polite copula (です/ます), and basic adjectival inflections with immediate listening/reading drills.
- **Stage 3: Real-World Daily Communication (日常会話・授受動詞: N4)**: Te-form chains (〜てから, 〜てもいい), potential verbs (〜られる), giving/receiving (あげる/くれる/もらう), and everyday informational notices.
- **Stage 4: Intermediate Complex Expression (中級文法・複文構成: N3)**: Nuanced contrasts (〜に対して vs 〜反面), passive/causative, conditionals (〜ば, 〜なら), and editorial passages.
- **Stage 5: Professional & Academic Logic (上級論理表現・敬語: N2)**: Formal discourse markers (〜にほかならない, 〜余儀なくされる), Keigo honorific registers, and workplace communication.
- **Stage 6: Authentic Fluency & High Registers (極限表現・格調高い文末: N1)**: Sophisticated stylistic endings (〜極まりない, 〜皮切りに), essay argumentation, and abstract philosophical discussions.

### 10.4 Dashboard "おすすめの学習順序" Actionable Hero Card
- Positioned prominently at the top of the learner dashboard (`DashboardView.tsx`).
- Offers 3 immediate direct-action cards:
  1. **Step 1: Start with Kana (文字の土台)**: Directly launches the Kana tracing studio.
  2. **Step 2: Core Grammar & Vocab (文法と語彙)**: Directly opens Lesson 1 (Particles & Sentence Structure).
  3. **Step 3: Daily Kanji (日々の漢字習得)**: Launches the 4-step Kanji studio (Sustainable 3–6 kanji/day).
- Completely eliminates cognitive confusion for fresh and existing learners alike.

## 11. Learner-Centric Bilingual Pedagogical Architecture (Instructions in English, Targets in Japanese)

### 11.1 Problem & Resolution
- **Identified Pain Point**: Presenting meta-instructions, educational rationales, and exam guidelines exclusively in complex Japanese created an insurmountable barrier for beginners (*"we create japanese lesson are to understand the japanese, so why you make the instruction in jp? if i can read those jp instruction, i don't need to learn japanese anymore"*).
- **Core Pedagogical Principle**:
  - **Instructional Medium (How to Learn / What to Do)**: Communicated in clear, encouraging English so learners immediately comprehend expectations, task objectives, and grammatical rules.
  - **Linguistic Targets (What is Being Learned)**: Preserved in authentic Japanese (Hiragana, Katakana, Kanji, vocabulary compounds, and real contextual sentences) enhanced with the Global Furigana Subtext Engine.

### 11.2 Systematic Module Realignment
1. **Curriculum Navigator (`/curriculum`)**:
   - 6-Stage Roadmap Stepper: English stage headings (*Stage 1: Kana Literacy*, *Stage 2: Core Grammar & Vocab*, *Stage 3: Daily Kanji*, *Stage 4: Action Verbs & Particles*, *Stage 5: Real-World Reading & Listening*, *Stage 6: Star Reordering Drills*) paired with Japanese sub-labels.
   - Stage Focus Cards: Detailed pedagogical explanations in plain English clarifying why words are learned together with grammar rather than memorized in a vacuum.
   - Unit & Lesson Directory: English unit descriptors and lesson topics with Japanese target themes clearly anchored.
2. **Dashboard (`/dashboard`)**:
   - Actionable Hero Card: *"Recommended Learning Order: Start Here!"* directly answering *"Do I have to learn all words first? → No! Learn grammar and words together."*
   - Step 1 (Kana Literacy), Step 2 (Core Sentence Patterns), and Step 3 (Daily Kanji) feature clear English explanations and actionable launch buttons.
3. **Practice Exam Runner (`/practice/:lessonId`)**:
   - Preset Module Selectors: English module descriptions (*N5 Grammar & Star Drills*, *N5 Reading: Campus Tea Party Notice*, *N5 Listening: Movie Meetup Dialogue*).
   - Question Prompts: Clear English directions (*"Choose the most appropriate particle to fill in the blank (　)"*, *"Rearrange the numbered words to form a correct sentence"*) alongside English translations of the Japanese sentences.
   - Answer Explanations: Comprehensive English grammatical justifications explaining particle mechanics (e.g., topic marker は vs subject marker が, specific time particle に).
4. **Productive Writing Studio (`/studio`)**:
   - Task Prompts: Clear English writing instructions outlining what topics to cover and which grammatical forms to apply.
   - Diagnostic Rubrics: Bilingual criteria titles (*Grammar & Case Particles*, *Polite Register & Kana Accuracy*, *Vocabulary & Collocations*, *Coherence & Logical Flow*).
   - Feedback & Improvements: English pedagogical commentary guiding revisions and length requirements.
