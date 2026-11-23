// Weak-Spot Diagnostic & Recency Decay Mastery Index

export interface WeakSpotEvaluation {
  tag: string;
  label: string;
  attempts: number;
  accuracyPct: number;
  masteryIndex: number; // 0.0 - 1.0
  isCritical: boolean;
  recommendation: string;
}

export function computeMasteryIndex(
  attempts: Array<{ isCorrect: boolean; daysAgo: number }>,
  srsStability: number = 2.0,
  daysSinceLastSRSReview: number = 1.0
): { masteryIndex: number; accuracyPct: number; isCritical: boolean } {
  if (attempts.length === 0) {
    return { masteryIndex: 0.5, accuracyPct: 50, isCritical: false };
  }

  // Recency-weighted practice accuracy: w_i = exp(-0.05 * daysAgo)
  let weightedCorrect = 0;
  let weightSum = 0;
  let rawCorrect = 0;

  attempts.forEach(att => {
    const w = Math.exp(-0.05 * Math.max(0, att.daysAgo));
    weightSum += w;
    if (att.isCorrect) {
      weightedCorrect += w;
      rawCorrect++;
    }
  });

  const practiceAccuracy = weightSum > 0 ? (weightedCorrect / weightSum) : 0.5;
  const rawAccuracyPct = Math.round((rawCorrect / attempts.length) * 100);

  // SRS Retrievability: R = exp(-delta_t / S)
  const retrievability = Math.exp(-Math.max(0, daysSinceLastSRSReview) / Math.max(0.5, srsStability));

  // Composite Mastery Index: M_k = 0.60 * Practice + 0.40 * SRS
  const masteryIndex = parseFloat((0.60 * practiceAccuracy + 0.40 * retrievability).toFixed(3));

  // Critical flag: M_k < 0.65 and attempts >= 8 (or >= 4 in fast tracking)
  const isCritical = masteryIndex < 0.65 && attempts.length >= 4;

  return {
    masteryIndex,
    accuracyPct: rawAccuracyPct,
    isCritical
  };
}
