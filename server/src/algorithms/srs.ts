// Spaced Repetition System (FSRS / SM-2 Hybrid Engine)
import { SRSItem, RecallGrade, SRSState } from '../types';

export interface SRSReviewResult {
  nextState: SRSState;
  nextStep: number;
  nextIntervalDays: number;
  nextEaseFactor: number;
  nextStability: number;
  nextDifficulty: number;
  nextDueDate: string; // ISO string
}

export function calculateSRSReview(
  item: SRSItem,
  grade: RecallGrade,
  reviewDate: Date = new Date()
): SRSReviewResult {
  let { state, step, intervalDays, easeFactor, stability, difficulty, repetitions, lapses } = item;

  // Grade mapping:
  // 1 = Again (failed recall)
  // 2 = Hard (successful recall with significant effort)
  // 3 = Good (successful recall with normal effort)
  // 4 = Easy (flawless, immediate recall)

  let nextState: SRSState = state;
  let nextStep = step;
  let nextIntervalDays = intervalDays;
  let nextEaseFactor = easeFactor;
  let nextStability = stability;
  let nextDifficulty = difficulty;

  // Update difficulty (D in [1, 10])
  const diffDelta = (3 - grade) * 0.8;
  nextDifficulty = Math.max(1, Math.min(10, difficulty + diffDelta));

  if (grade === 1) {
    // Again: Lapse or failure
    if (state === 'review') {
      nextState = 'relearning';
      lapses += 1;
    } else {
      nextState = 'learning';
    }
    nextStep = 0;
    nextIntervalDays = 0.007; // ~10 minutes
    nextEaseFactor = Math.max(1.30, easeFactor - 0.20);
    nextStability = Math.max(0.5, stability * 0.5);
  } else if (state === 'new' || state === 'learning' || state === 'relearning') {
    // Learning steps: step 0 -> 1 day, step 1 -> 3 days -> graduates to 'review'
    if (grade === 4) {
      // Direct graduation on Easy
      nextState = 'review';
      nextIntervalDays = 4;
      nextStep = 2;
      nextEaseFactor = Math.min(3.0, easeFactor + 0.15);
      nextStability = 4.0;
    } else if (step === 0) {
      nextStep = 1;
      nextIntervalDays = grade === 2 ? 0.5 : 1.0;
    } else {
      // Graduate to review
      nextState = 'review';
      nextStep = 2;
      nextIntervalDays = grade === 2 ? 2.0 : 3.0;
      nextStability = nextIntervalDays;
    }
  } else {
    // State is 'review'
    // Update Ease Factor: EF' = EF + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02))
    const efDelta = 0.1 - (5 - (grade + 1)) * (0.08 + (5 - (grade + 1)) * 0.02);
    nextEaseFactor = Math.max(1.30, Math.min(3.0, easeFactor + efDelta));

    // Calculate Interval multiplier
    let factor = nextEaseFactor;
    if (grade === 2) {
      factor = 1.2;
    } else if (grade === 4) {
      factor = nextEaseFactor * 1.3;
    }

    // Interval calculation
    if (intervalDays <= 0) {
      nextIntervalDays = 1;
    } else {
      // Add subtle fuzz factor (+/- 5%) to avoid card bunching
      const fuzz = 1 + (Math.sin(repetitions + 1) * 0.05);
      nextIntervalDays = Math.round(intervalDays * factor * fuzz);
    }
    nextStability = Math.max(1, nextIntervalDays);
  }

  // Calculate next due date
  const msToAdd = nextIntervalDays * 24 * 60 * 60 * 1000;
  const nextDueDate = new Date(reviewDate.getTime() + msToAdd).toISOString();

  return {
    nextState,
    nextStep,
    nextIntervalDays,
    nextEaseFactor: parseFloat(nextEaseFactor.toFixed(2)),
    nextStability: parseFloat(nextStability.toFixed(2)),
    nextDifficulty: parseFloat(nextDifficulty.toFixed(2)),
    nextDueDate
  };
}
