# Technical Specification: Phase 4 AI Diagnostic Essay Assessment Engine (IELTS Writing Task 1 & Task 2)

## 1. Architectural Scope & Objectives
This specification translates `docs/DOMAIN_BLUEPRINT.md` (§2.1.2, §3.2.8, §4.2.9, §5.1.8) and `docs/USER_FLOWS.md` (Screen 5A.1 & Screen 5A.2, AC 4.27–4.30) into concrete database schemas, API contracts, analytical algorithms, and frontend components.

Phase 4 establishes:
1. **Authentic Task 1 & Task 2 Prompt Engine**:
   - Task 1 Academic (Visual data descriptions: line graph, bar chart, pie chart, process diagram, map) with 150-word minimum threshold.
   - Task 1 General Training (Formal, semi-formal, informal transactional letter) with 150-word minimum threshold.
   - Task 2 Discursive Essay (Opinion/Agree-Disagree, Discussion, Problem-Solution, Advantages-Disadvantages, Two-Part Questions) with 250-word minimum threshold.
2. **Deterministic Cambridge 4-Criteria Evaluation Algorithm**:
   - Task Achievement / Task Response (TA/TR): Word count compliance, penalty curves, prompt coverage.
   - Coherence & Cohesion (CC): Paragraph progression, discourse marker frequency, referential clarity.
   - Lexical Resource (LR): Academic Word List (AWL) density (>= 8.5% for Band 8+), Type-Token Ratio (TTR), Guiraud Index.
   - Grammatical Range & Accuracy (GRA): Error-Free Sentence Ratio (EFSR >= 75%), clause subordination density, modal collocations.
   - Weighted overall calculation: 1/3 Task 1 + 2/3 Task 2 with Cambridge 0.25 / 0.75 half-band rounding rule.
3. **Sentence-Level Diagnostic Annotation Engine**:
   - 4-Category Taxonomy: `grammar_error`, `collocation_suggestion`, `vocabulary_enhancement`, `cohesive_marker_feedback`.
   - Character span offsets (`charStart`, `charEnd`), severity (`critical`, `warning`, `info`), and 1-click replacement suggestions.
4. **Interactive Writing Studio UI/UX (`/studio/writing` & `WritingStudioView.tsx`)**:
   - Split-screen workspace: Left panel with prompt & visual stimulus; Right panel with responsive text editor.
   - Live word counter with amber/green threshold progress indicator.
   - Timed Exam Mode (20m / 40m countdown) vs Practice Mode (untimed with autosave).
   - Post-submission Diagnostic Scorecard: 4-criteria radar chart, sentence-level color-coded diff canvas with floating popover annotations, model answer side-by-side comparison.
5. **100% Indonesian Localization**:
   - Zero English leakage in UI chrome, criteria descriptors, and diagnostic explanations when `language = 'id'`.

---

## 2. Database Schema & Data Models

### 2.1 Table: `writing_prompts`
```sql
CREATE TABLE IF NOT EXISTS writing_prompts (
  id TEXT PRIMARY KEY,               -- e.g. 'ielts_write_t1_acad_seed01'
  task_type TEXT NOT NULL,           -- 'task1_academic', 'task1_general', 'task2_discursive'
  title_en TEXT NOT NULL,
  title_id TEXT NOT NULL,
  prompt_text_en TEXT NOT NULL,
  prompt_text_id TEXT NOT NULL,
  minimum_words INTEGER NOT NULL,    -- 150 or 250
  suggested_minutes INTEGER NOT NULL,-- 20 or 40
  visual_type TEXT,                  -- 'bar_chart', 'line_graph', 'pie_chart', 'data_table', 'process_diagram', 'map'
  visual_asset_url TEXT,
  visual_data_points TEXT,           -- JSON string of data series or table
  guidance_notes_en TEXT,            -- JSON array of strings
  guidance_notes_id TEXT,            -- JSON array of strings
  benchmark_band REAL DEFAULT 8.5,
  model_text TEXT NOT NULL,
  model_strengths_en TEXT,           -- JSON array of strings
  model_strengths_id TEXT,           -- JSON array of strings
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 2.2 Table: `writing_submissions`
```sql
CREATE TABLE IF NOT EXISTS writing_submissions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL DEFAULT 'default_user',
  prompt_id TEXT NOT NULL,
  task_type TEXT NOT NULL,
  essay_content TEXT NOT NULL,
  overall_band REAL NOT NULL,
  cefr_level TEXT NOT NULL,           -- 'B1', 'B2', 'C1', 'C2'
  ta_score REAL NOT NULL,
  cc_score REAL NOT NULL,
  lr_score REAL NOT NULL,
  gra_score REAL NOT NULL,
  word_count INTEGER NOT NULL,
  is_underlength INTEGER NOT NULL,    -- 0 or 1
  awl_density REAL NOT NULL,
  error_free_ratio REAL NOT NULL,
  annotations_json TEXT NOT NULL,     -- JSON array of SentenceAnnotation
  full_scorecard_json TEXT NOT NULL,  -- JSON string of DiagnosticScorecardResult
  duration_seconds INTEGER NOT NULL,
  is_timed_mode INTEGER NOT NULL,     -- 0 or 1
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## 3. REST API Contracts

### 3.1 `GET /api/writing/prompts`
Returns array of available prompts filtered optionally by `taskType`.

### 3.2 `POST /api/writing/evaluate`
Payload:
```json
{
  "promptId": "ielts_write_t1_acad_seed01",
  "taskType": "task1_academic",
  "essayContent": "The provided line graph and table shows...",
  "durationSeconds": 1140,
  "isTimedMode": true,
  "locale": "id"
}
```
Response:
Returns `DiagnosticScorecardResult` as defined in `shared/types.ts`.

### 3.3 `GET /api/writing/submissions`
Returns list of user's past essay diagnostic submissions.

### 3.4 `GET /api/writing/submissions/:id`
Returns full `DiagnosticScorecardResult` for the specified submission ID.

---

## 4. Verification & QA Standard
1. Zero Task Duplication across all prompts and mock datasets.
2. 100% Indonesian localization in `id` mode with zero raw translation keys or English bleed in UI labels.
3. Accurate real-time word counter with amber/green threshold indicators.
4. Clean headless browser interaction with screenshot proofs in `docs/proof/`.
