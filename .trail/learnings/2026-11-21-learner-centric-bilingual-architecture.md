---
title: Learner-Centric Bilingual Pedagogical Architecture
author: principal-architect
date: 2026-11-21
cost: { tokens: 38500 }
touches:
  - client/src/context/LanguageContext.tsx
  - client/src/components/Navbar.tsx
  - client/src/components/DashboardView.tsx
  - client/src/components/CurriculumView.tsx
  - client/src/components/ExamRunnerView.tsx
  - client/src/components/KanjiCanvasView.tsx
---
## Decided
- All instruction text, pedagogical guidance, exam prompts, error messages, and UI chrome must be 100% translatable to Indonesian when Indonesian language mode is active.
- Zero English words allowed in the Indonesian interface, except for target study material (e.g., English words in IELTS practice passages).
- Mobile responsiveness: navbar language toggle and furigana controls must wrap cleanly on viewports down to 360px without layout overflow.

## Tried and ruled out
- Mixed bilingual text (e.g., English modal headers with Indonesian bodies), which confused beginner language learners.
- Hardcoded English strings in button labels and notification toasts.

## Watch out
- Always wrap new UI text in `t('key')` from `useLanguage()`.
- Ensure Furigana ruby annotations display above Kanji characters without distorting Japanese typography.
