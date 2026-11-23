---
title: Authentic KanjiVG Stroke Order Trajectory Validation
author: principal-architect
date: 2026-11-22
cost: { tokens: 46200 }
touches:
  - client/src/lib/strokeValidator.ts
  - client/src/components/KanjiCanvasView.tsx
  - test_hitsujun_validator.cjs
---
## Decided
- Japanese stroke order validation (Hitsujun) must strictly align with authentic KanjiVG vector standards.
- First stroke must always register and count towards completion without skipping or dropped pointer events.
- For curved/circular strokes (such as Hiragana 'A' stroke 3), trajectory angle evaluation must follow the authentic counter-clockwise sweep direction.
- User strokes are rendered in a distinct high-contrast color (indigo/blue) and orange direction arrows must never occlude or erase user drawings.

## Tried and ruled out
- Clockwise trajectory tolerance for Hiragana 'A' stroke 3, which inverted official Japanese handwriting standards.
- Overwriting canvas context with guide animations while the learner is actively drawing.

## Watch out
- Always resample pointer coordinates to 64 normalized points in 1000x1000 space before computing trajectory angular differences.
- Keep tolerance window at 45 degrees for standard strokes and 60 degrees for complex rounded sweeps.
