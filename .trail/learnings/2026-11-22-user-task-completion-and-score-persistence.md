---
title: User Task Completion and Active Level Progress Calculation
author: principal-architect
date: 2026-11-22
cost: { tokens: 41800 }
touches:
  - server/src/db/database.ts
  - server/src/routes/sessions.ts
  - server/src/routes/curriculum.ts
  - server/src/routes/dashboard.ts
  - client/src/components/ExamRunnerView.tsx
  - client/src/components/CurriculumView.tsx
---
## Decided
- Persist completed lessons in SQLite table `user_lesson_completions (user_id, lesson_id, completed_at, score, max_score, accuracy_pct)`.
- Return both `score` and `correctCount` from session completion endpoints to prevent undefined score rendering as `" / 3"`.
- Calculate Estimated Readiness and progress percentages based on the user's active level corridor (e.g. 1/7 = 14% on JLPT N5) rather than dividing by total global lesson count (44 lessons).
- Stepper roadmap tabs display a green `✓` checkmark and completed lesson cards show `SELESAI (Skor)` badge with `Ulangi (Selesai)` action button.

## Tried and ruled out
- Global 44-lesson denominator division, which rounded completed lessons down to 0% or 2% on the dashboard.
- Relying purely on ephemeral in-memory state for session completion.

## Watch out
- When querying `/api/curriculum/tree`, join `user_lesson_completions` with `userId` so that returned lessons have `completed: true` and accurate historical scores attached.
