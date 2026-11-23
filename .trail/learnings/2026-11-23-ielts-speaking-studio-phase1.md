---
title: Interactive IELTS Speaking Studio and 9-Band Speech Evaluation Engine
author: principal-architect
date: 2026-11-23
cost: { tokens: 42000 }
touches:
  - client/src/components/SpeakingStudioView.tsx
  - server/src/algorithms/speaking.ts
  - server/src/routes/speaking.ts
  - server/src/db/seeds/speakingSeeds.ts
  - shared/types.ts
---
## Decided
- Authentic IELTS Speaking 3-Part architecture: Part 1 Personal Q&A, Part 2 Individual Long Turn (60s prep countdown + virtual scratchpad notes transitioning into 120s speech timer with 3-zone color gauge), and Part 3 Two-Way Analytical Discussion.
- Speech Evaluation Engine strictly implements official Cambridge 9-Band oral criteria: Fluency & Coherence (WPM & silent pause detection), Lexical Resource (Type-Token Ratio & AWL detection), Grammatical Range & Accuracy (subordinating clause ratio), and Pronunciation (chunking & intelligibility rating).
- Fallback & resilience: WebAudio ambient check and speech synthesis fallback smoothly when running in headless environments or when media permissions are constrained.
- Evaluation data shape normalization: Client harmonizes backend criteria object structure safely so scorecard rendering never crashes on missing properties.
- 100% Indonesian localization across all chrome buttons, timer indicators, and diagnostic breakdown titles, with English strictly preserved for test prompts and speech materials.

## Tried and ruled out
- Simple text input without live audio visualizer: failed the immersion requirement for oral interview preparation.
- Unconstrained preparation timing: Cambridge IELTS strictly limits Part 2 preparation to 60 seconds.

## Watch out
- Ensure evaluateSpeaking payload and response fields are normalized before rendering the 4-criteria diagnostic cards.
- Keep the Speaking Studio strictly scoped to the IELTS English track; Japanese track preserves Kana & Kanji without speaking pollution.
