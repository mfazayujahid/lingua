---
title: Kanji and Kana Practice Completion Synchronization with Curriculum and Dashboard
author: lead-engineer
date: 2026-11-24
touches:
  - server/src/routes/kanji.ts
  - server/src/routes/dashboard.ts
  - server/src/routes/curriculum.ts
  - server/src/db/database.ts
  - server/src/db/seeds/curriculumSeeds.ts
  - client/src/api.ts
  - client/src/components/CurriculumView.tsx
---
## Decided
- In `POST /api/kanji/record-practice` and `POST /api/kanji/:kanjiId/attempt`, record successful completions directly into `user_lesson_completions`.
- Map Hiragana / Katakana / `kana_*` practice to `kana_a_h`, and Kanji / JLPT level / `nichi` practice to `kanji_n5_01_nichi` and `les_n5_vocab_1`.
- Ensure `kana_a_h` and `kanji_n5_01_nichi` are present in `lessons` table so SQLite foreign key constraints (`REFERENCES lessons(id)`) succeed and `GET /api/curriculum` includes them.
- Expose `GET /api/kanji/mastered-characters` querying `kanji_writing_attempts` joined with `kanji_stroke_data` where `mastery_badge = 'MASTERED' OR composite_score >= 80`, declared before parameterized route `/:kanjiId`.
- In `GET /api/dashboard`, filter `recommendedLessons` with `WHERE l.id NOT IN (SELECT lesson_id FROM user_lesson_completions WHERE user_id = ?)`, and fallback to the top / first lesson if all lessons are completed.

## Tried and ruled out
- Placing `GET /api/kanji/mastered-characters` after `GET /api/kanji/:kanjiId`, which caused Express route parameter collision.
- Attempting to insert completion records for `kana_a_h` without ensuring the lesson exists in the `lessons` table, which triggered foreign key constraint failures under SQLite `PRAGMA foreign_keys = ON`.

## Watch out
- Ensure `completedLessonIds` returned from `/api/curriculum` is populated from `user_lesson_completions` so stage completion checkmarks render in `CurriculumView`.
