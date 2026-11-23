---
title: International Standard Pedagogical Rigor (JLPT & IELTS)
author: principal-architect
date: 2026-11-22
cost: { tokens: 52100 }
touches:
  - server/src/db/seeds/curriculumSeeds.ts
  - server/src/routes/curriculum.ts
  - client/src/components/CurriculumView.tsx
---
## Decided
- All learning content must adhere strictly to international exam specifications:
  - JLPT N5–N1: Official Japan Foundation & JEES syllabi (Hiragana, Katakana, Kanji radicals, particles, sentence patterns, star-reordering, authentic mock tests).
  - CEFR A1–C2 & IELTS Band 1–9: Cambridge & British Council rubrics (Academic vs General Training, Task 1 report/letter, Task 2 essay, authentic 3-section reading passages).
- Zero task duplication: each level, unit, and stage must feature distinct exercises and evaluation criteria tailored to its competency level.
- Absolute Truth Rule: Never provide stubbed, placeholder, or fake questions. Disclose limitations immediately.

## Tried and ruled out
- Reusing the same generic multiple-choice questions across different stages or levels.
- Stubbing exam runners with hardcoded dummy items.

## Watch out
- Ensure star-reordering exercises (`star_reorder`) provide valid Japanese sentence fragments that reconstruct into grammatically correct patterns.
- Ensure IELTS writing evaluations assess all 4 official criteria: Task Achievement/Response, Coherence & Cohesion, Lexical Resource, and Grammatical Range & Accuracy.
