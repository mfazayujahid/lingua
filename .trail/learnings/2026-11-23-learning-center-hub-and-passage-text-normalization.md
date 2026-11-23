# Learning Center (Pusat Belajar) Architecture & Stimulus Passage Normalization

## Context & User Problem
Learners reported that the application had become solely an exam/test runner without dedicated pedagogical instruction:
1. No learning materials to acquire grammar rules, Academic Word List (AWL) vocabulary, or study strategies before attempting tests.
2. Incomplete question stimuli: multiple curriculum exercise items contained placeholder strings such as `"See Passage 1: Cognitive Architecture of Bilingualism"` or `"See Marine Biomimetics Lecture above."`, leaving learners with no reading stimulus to answer questions from.
3. Database field naming mismatch: SQLite table `exercise_items` stored `passage_text` in snake_case, while frontend exam runner checked `currentItem?.passageText` (camelCase), causing curriculum reading passages to render empty.

## Solution & Architecture
1. **Dedicated Learning Center (`LectureView.tsx`)**:
   - Integrated as a core navbar destination (`lecture` / "Pusat Belajar") for both IELTS and Japanese tracks.
   - Organized into 4 deep-study tabs:
     - **Tab 1: Materi & Strategi Utama**: Skimming heuristics (60s appraisal), Heading matching decision matrix, and True/False/Not Given verification logic.
     - **Tab 2: Fokus Tata Bahasa Akademik**: Academic nominalisation, subject-auxiliary negative inversion, impersonal passive register, and conditional deductions with Indonesian explanations.
     - **Tab 3: Bank Kosakata & Kolokasi**: AWL and domain lexical bank with phonetic guides, strong academic collocations, Indonesian translations, and contextual sentences.
     - **Tab 4: Bedah Teks & Analisis Soal**: Paragraph-by-paragraph breakdown with side-by-side Indonesian translations, key vocabulary chips, and explicit exam question correlation.
2. **Dual-Action Launch Controls in Curriculum & Dashboard**:
   - In `CurriculumView.tsx` and `DashboardView.tsx`, each stage and lesson now offers both **"Pelajari Teori"** (opens LectureView) and **"Latihan Soal"** (launches ExamRunnerView).
3. **Passage Text Normalization**:
   - Fixed all 16 placeholder items in `curriculumSeeds.ts` with authentic stimulus texts.
   - Normalized `passageText: it.passage_text || it.passageText` across `server/src/routes/curriculum.ts` and `client/src/components/ExamRunnerView.tsx`.
