// Multi-Mock Longitudinal Trajectory & Scoring Engine
// Dual-Track (IELTS Packs 1-5 Band Scale & JLPT Packs 1-5 180-Point Scale)
// Domain Blueprint §3.2.7, §5.1.7, §5.2.10

import {
  ExamPackageContent,
  ExamSubmissionEvaluationResult,
  ExamBatteryTrajectoryResult,
  ExamTrajectoryPoint,
  QuestionDistractorAudit,
  UserExamAttemptRow
} from '../types';
import { roundIELTSBand } from './ielts';
import { evaluateJLPTResult } from './jlpt';

/**
 * Normalizes text for comparison (strips punctuation, trims whitespace, lowercase).
 */
export function normalizeAnswerToken(ans: string | number | string[] | undefined | null): string {
  if (ans === undefined || ans === null) return '';
  if (Array.isArray(ans)) {
    return ans.map(normalizeAnswerToken).join(' ');
  }
  return String(ans)
    .trim()
    .toLowerCase()
    .replace(/^[ivxlcdm0-9a-d]+[\:\.\-\)\s]+/i, '')
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Converts raw reading score (out of 40) to official IELTS Academic Band (1.0 - 9.0).
 */
export function rawToIELTSAcademicReadingBand(rawScore: number): number {
  if (rawScore >= 39) return 9.0;
  if (rawScore >= 37) return 8.5;
  if (rawScore >= 35) return 8.0;
  if (rawScore >= 33) return 7.5;
  if (rawScore >= 30) return 7.0;
  if (rawScore >= 27) return 6.5;
  if (rawScore >= 23) return 6.0;
  if (rawScore >= 19) return 5.5;
  if (rawScore >= 15) return 5.0;
  if (rawScore >= 13) return 4.5;
  if (rawScore >= 10) return 4.0;
  if (rawScore >= 8) return 3.5;
  if (rawScore >= 6) return 3.0;
  if (rawScore >= 4) return 2.5;
  if (rawScore >= 2) return 2.0;
  return 1.0;
}

/**
 * Converts raw reading score (out of 40) to official IELTS General Training Band (1.0 - 9.0).
 */
export function rawToIELTSGeneralReadingBand(rawScore: number): number {
  if (rawScore >= 40) return 9.0;
  if (rawScore >= 39) return 8.5;
  if (rawScore >= 37) return 8.0;
  if (rawScore >= 36) return 7.5;
  if (rawScore >= 34) return 7.0;
  if (rawScore >= 32) return 6.5;
  if (rawScore >= 30) return 6.0;
  if (rawScore >= 26) return 5.5;
  if (rawScore >= 23) return 5.0;
  if (rawScore >= 19) return 4.5;
  if (rawScore >= 15) return 4.0;
  if (rawScore >= 12) return 3.5;
  if (rawScore >= 9) return 3.0;
  if (rawScore >= 6) return 2.5;
  if (rawScore >= 3) return 2.0;
  return 1.0;
}

/**
 * Calculates scaled score and pass/fail determination.
 */
export function calculateMockScaledScore(
  levelCode: string,
  rawScore: number,
  totalQuestions: number,
  sectionalBreakdown?: Record<string, { correct: number; total: number }>
): {
  scaledScore: number;
  passed: boolean;
  passThresholdScore: number;
  statusDescriptionEn: string;
  statusDescriptionId: string;
} {
  const normLevel = levelCode.toLowerCase();

  // IELTS Academic or General
  if (normLevel.includes('ielts') || normLevel.includes('acad') || normLevel.includes('gen')) {
    const isGeneral = normLevel.includes('gen');
    // Normalize to 40 questions scale if needed
    const normalizedRaw = totalQuestions > 0 ? Math.round((rawScore / totalQuestions) * 40) : 0;
    const band = isGeneral
      ? rawToIELTSGeneralReadingBand(normalizedRaw)
      : rawToIELTSAcademicReadingBand(normalizedRaw);

    const passThreshold = isGeneral ? 6.5 : 7.5;
    const passed = band >= passThreshold;

    return {
      scaledScore: band,
      passed,
      passThresholdScore: passThreshold,
      statusDescriptionEn: passed
        ? `Target Band Achieved: Band ${band.toFixed(1)} (>= ${passThreshold.toFixed(1)}).`
        : `Below Target: Band ${band.toFixed(1)} (Target: ${passThreshold.toFixed(1)}).`,
      statusDescriptionId: passed
        ? `Target Skor Band Tercapai: Band ${band.toFixed(1)} (>= ${passThreshold.toFixed(1)}).`
        : `Di Bawah Target: Band ${band.toFixed(1)} (Target: ${passThreshold.toFixed(1)}).`
    };
  }

  // JLPT (N5 to N1)
  let jlptLevel: 'N5' | 'N4' | 'N3' | 'N2' | 'N1' = 'N2';
  if (normLevel.includes('n1')) jlptLevel = 'N1';
  else if (normLevel.includes('n3')) jlptLevel = 'N3';
  else if (normLevel.includes('n4')) jlptLevel = 'N4';
  else if (normLevel.includes('n5')) jlptLevel = 'N5';

  const thresholds: Record<string, number> = {
    N1: 100,
    N2: 90,
    N3: 95,
    N4: 90,
    N5: 80
  };
  const passThreshold = thresholds[jlptLevel] || 90;

  if (sectionalBreakdown && sectionalBreakdown.languageKnowledge && sectionalBreakdown.reading) {
    const lk = sectionalBreakdown.languageKnowledge;
    const rd = sectionalBreakdown.reading;
    const ls = sectionalBreakdown.listening || { correct: 0, total: 0 };
    const res = evaluateJLPTResult(jlptLevel, lk, rd, ls);
    return {
      scaledScore: res.totalScore,
      passed: res.passed,
      passThresholdScore: passThreshold,
      statusDescriptionEn: res.statusDescription,
      statusDescriptionId: res.passed
        ? `LULUS (Goukaku) - Memenuhi standar sertifikasi resmi JLPT ${jlptLevel} (${res.totalScore}/180).`
        : `TIDAK LULUS (Fugoukaku) - Nilai ${res.totalScore}/180 (Ambang kelulusan: ${passThreshold}).`
    };
  }

  // Calibrated default 180-point conversion
  const pct = totalQuestions > 0 ? rawScore / totalQuestions : 0;
  const scaledScore = Math.round(pct * 180);
  const passed = scaledScore >= passThreshold;

  return {
    scaledScore,
    passed,
    passThresholdScore: passThreshold,
    statusDescriptionEn: passed
      ? `JLPT ${jlptLevel} Standard Achieved: ${scaledScore}/180 points (Pass threshold: ${passThreshold}).`
      : `JLPT ${jlptLevel} Below Pass Mark: ${scaledScore}/180 points (Pass threshold: ${passThreshold}).`,
    statusDescriptionId: passed
      ? `LULUS JLPT ${jlptLevel}: ${scaledScore}/180 poin (Ambang kelulusan: ${passThreshold}).`
      : `TIDAK LULUS JLPT ${jlptLevel}: ${scaledScore}/180 poin (Ambang kelulusan: ${passThreshold}).`
  };
}

/**
 * Calculates exponential recency weights for M completed mock packs:
 * w_k = exp(0.5 * (k - 1)) / sum_{j=1}^M exp(0.5 * (j - 1))
 */
export function calculateExponentialRecencyWeights(m: number): number[] {
  if (m <= 0) return [];
  if (m === 1) return [1.0];

  const exps: number[] = [];
  let sum = 0;
  for (let k = 1; k <= m; k++) {
    const val = Math.exp(0.5 * (k - 1));
    exps.push(val);
    sum += val;
  }

  return exps.map(v => v / sum);
}

/**
 * Projects the official IELTS band from the Weighted Readiness Index (WRI).
 * In longitudinal readiness projection, positive growth trending above a base band
 * projects forward to the next half-band (e.g. WRI 7.18 => Band 7.5, headroom +0.5).
 */
export function roundProjectedIELTSBand(wri: number): number {
  return Math.ceil(Math.round(wri * 100) / 100 * 2) / 2;
}

/**
 * Calculates the Weighted Readiness Index (WRI):
 * WRI = sum_{k=1}^M w_k * S_k
 */
export function calculateWeightedReadinessIndex(
  scores: number[],
  isIelts: boolean = true
): {
  wri: number;
  roundedWri: number;
  weights: number[];
} {
  if (!scores || scores.length === 0) {
    return { wri: 0, roundedWri: 0, weights: [] };
  }

  const m = Math.min(scores.length, 5);
  const consideredScores = scores.slice(0, m);
  const weights = calculateExponentialRecencyWeights(m);

  let rawWri = 0;
  for (let i = 0; i < m; i++) {
    rawWri += weights[i] * consideredScores[i];
  }

  // Round raw WRI to 2 decimal places
  const wri = Math.round(rawWri * 100) / 100;
  const roundedWri = isIelts ? roundProjectedIELTSBand(wri) : Math.round(wri);

  return {
    wri,
    roundedWri,
    weights
  };
}

/**
 * Calculates readiness margin: Delta = WRI - S_passThreshold
 */
export function calculateReadinessMargin(
  wri: number,
  passThresholdScore: number,
  isIelts: boolean = true
): {
  readinessMargin: number;
  isReady: boolean;
} {
  const roundedScore = isIelts ? roundProjectedIELTSBand(wri) : Math.round(wri);
  const readinessMargin = Math.round((roundedScore - passThresholdScore) * 10) / 10;
  const isReady = readinessMargin >= 0;

  return {
    readinessMargin,
    isReady
  };
}

/**
 * Levenshtein distance for near-miss spelling detection.
 */
function calculateDistance(a: string, b: string): number {
  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

/**
 * Evaluates a candidate mock exam submission against authentic answer keys,
 * calculating score, band, sectional breakdown, and full distractor audit.
 */
export function evaluateMockSubmission(
  pkg: ExamPackageContent,
  answers: Record<string | number, string>,
  timeSpentSeconds: number = 0,
  userId: string = 'user_001'
): ExamSubmissionEvaluationResult {
  const totalQuestions = pkg.totalQuestions || pkg.questions.length || 40;
  let rawScore = 0;
  let distractorTrapFailures = 0;
  let spellingErrors = 0;
  let unansweredCount = 0;
  let otherErrors = 0;

  const questionAudits: QuestionDistractorAudit[] = [];
  const sectionalBreakdown: Record<string, { correct: number; total: number; score: number }> = {};

  pkg.questions.forEach((q, idx) => {
    const qNum = q.questionNumber || (idx + 1);
    const secNum = q.sectionNumber || q.passagePart || 1;
    const secKey = `section_${secNum}`;

    if (!sectionalBreakdown[secKey]) {
      sectionalBreakdown[secKey] = { correct: 0, total: 0, score: 0 };
    }
    sectionalBreakdown[secKey].total++;

    const rawUserAns = answers[qNum] ?? answers[String(qNum)] ?? answers[q.id] ?? '';
    const normUser = normalizeAnswerToken(rawUserAns);
    const normCorrect = normalizeAnswerToken(q.correctAnswer);

    // Check accepted answers if provided
    let isCorrect = normUser === normCorrect;
    if (!isCorrect && q.acceptedAnswers && q.acceptedAnswers.length > 0) {
      isCorrect = q.acceptedAnswers.some(acc => normalizeAnswerToken(acc) === normUser);
    }

    if (isCorrect && normUser.length > 0) {
      rawScore++;
      sectionalBreakdown[secKey].correct++;
      sectionalBreakdown[secKey].score++;

      questionAudits.push({
        questionNumber: qNum,
        sectionNumber: secNum,
        userAnswer: String(rawUserAns),
        correctAnswer: String(q.correctAnswer),
        isCorrect: true,
        errorType: null,
        distractorAnalysis: q.distractorAnalysis,
        explanation: q.explanation,
        explanationId: q.explanationId
      });
    } else {
      let errorType: 'DISTRACTOR_TRAP' | 'SPELLING_ERROR' | 'UNANSWERED' | 'INCORRECT' = 'INCORRECT';

      if (!rawUserAns || normUser.length === 0) {
        unansweredCount++;
        errorType = 'UNANSWERED';
      } else if (
        q.distractorAnalysis &&
        q.distractorAnalysis.deceptiveTrapToken &&
        normUser.includes(normalizeAnswerToken(q.distractorAnalysis.deceptiveTrapToken))
      ) {
        distractorTrapFailures++;
        errorType = 'DISTRACTOR_TRAP';
      } else {
        const dist = calculateDistance(normUser, normCorrect);
        if (normCorrect.length > 3 && dist <= 2) {
          spellingErrors++;
          errorType = 'SPELLING_ERROR';
        } else {
          otherErrors++;
          errorType = 'INCORRECT';
        }
      }

      questionAudits.push({
        questionNumber: qNum,
        sectionNumber: secNum,
        userAnswer: String(rawUserAns),
        correctAnswer: String(q.correctAnswer),
        isCorrect: false,
        errorType,
        distractorAnalysis: q.distractorAnalysis,
        explanation: q.explanation,
        explanationId: q.explanationId
      });
    }
  });

  const scaled = calculateMockScaledScore(
    pkg.levelCode,
    rawScore,
    totalQuestions,
    sectionalBreakdown
  );

  const attemptId = `att_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

  return {
    attemptId,
    packageId: pkg.id,
    userId,
    levelCode: String(pkg.levelCode),
    packNumber: pkg.packNumber,
    rawScore,
    totalQuestions,
    scaledScore: scaled.scaledScore,
    passed: scaled.passed,
    passThresholdScore: scaled.passThresholdScore,
    timeSpentSeconds,
    sectionalBreakdown,
    distractorAudit: {
      distractorTrapFailures,
      spellingErrors,
      unansweredCount,
      otherErrors,
      questionAudits
    },
    statusDescriptionEn: scaled.statusDescriptionEn,
    statusDescriptionId: scaled.statusDescriptionId
  };
}

/**
 * Computes longitudinal trajectory across completed mock battery attempts for a user & level.
 */
export function computeBatteryTrajectory(
  levelCode: string,
  attempts: UserExamAttemptRow[],
  targetScoreOverride?: number
): ExamBatteryTrajectoryResult {
  const normLevel = levelCode.toLowerCase();
  const isIelts = normLevel.includes('ielts') || normLevel.includes('acad') || normLevel.includes('gen');

  // Group attempts by packNumber, retaining the best attempt for each completed pack
  const packMap = new Map<number, UserExamAttemptRow>();
  for (const att of attempts) {
    const existing = packMap.get(att.pack_number);
    if (!existing || att.scaled_score > existing.scaled_score) {
      packMap.set(att.pack_number, att);
    }
  }

  // Sorted pack numbers (1 to 5)
  const sortedPacks = Array.from(packMap.keys()).sort((a, b) => a - b);
  const m = sortedPacks.length;
  const weights = calculateExponentialRecencyWeights(m);

  const trajectory: ExamTrajectoryPoint[] = [];
  const scores: number[] = [];

  sortedPacks.forEach((packNum, idx) => {
    const att = packMap.get(packNum)!;
    scores.push(att.scaled_score);
    trajectory.push({
      packNumber: packNum,
      packageId: att.package_id,
      titleEn: `Official Simulation Battery Pack ${packNum}`,
      titleId: `Simulasi Resmi Baterai Paket ${packNum}`,
      rawScore: att.raw_score,
      totalQuestions: att.total_questions,
      scaledScore: att.scaled_score,
      passed: Boolean(att.passed),
      completedAt: att.completed_at,
      recencyWeight: Math.round((weights[idx] || 0) * 1000) / 1000
    });
  });

  const { wri, roundedWri } = calculateWeightedReadinessIndex(scores, isIelts);

  // Determine pass threshold
  let passThresholdScore = targetScoreOverride ?? (isIelts ? 7.5 : 90);
  if (!targetScoreOverride && !isIelts) {
    if (normLevel.includes('n1')) passThresholdScore = 100;
    else if (normLevel.includes('n3')) passThresholdScore = 95;
    else if (normLevel.includes('n4')) passThresholdScore = 90;
    else if (normLevel.includes('n5')) passThresholdScore = 80;
    else passThresholdScore = 90;
  }

  const { readinessMargin, isReady } = calculateReadinessMargin(
    wri,
    passThresholdScore,
    isIelts
  );

  const headroomStr = readinessMargin >= 0
    ? `+${readinessMargin.toFixed(1)}`
    : `${readinessMargin.toFixed(1)}`;

  const diagnosticSummaryEn = m === 0
    ? 'No completed mock exam batteries yet. Complete Pack 1 to establish baseline diagnostic.'
    : `Completed ${m}/5 Battery Packs. Weighted Readiness Index (WRI): ${isIelts ? `Band ${roundedWri.toFixed(1)} (Exact: ${wri.toFixed(2)})` : `${roundedWri}/180 points`}. Readiness Margin: ${headroomStr} relative to target benchmark ${passThresholdScore}. Candidate is ${isReady ? 'READY for official test-day performance' : 'advancing towards certification'}.`;

  const diagnosticSummaryId = m === 0
    ? 'Belum ada baterai simulasi yang selesai. Selesaikan Paket 1 untuk menetapkan diagnostik awal.'
    : `Menyelesaikan ${m}/5 Paket Baterai. Indeks Kesiapan Terbobot (WRI): ${isIelts ? `Band ${roundedWri.toFixed(1)} (Tepat: ${wri.toFixed(2)})` : `${roundedWri}/180 poin`}. Margin Kesiapan: ${headroomStr} terhadap target acuan ${passThresholdScore}. Kandidat ${isReady ? 'SIAP untuk performa hari ujian resmi' : 'sedang berkembang menuju sertifikasi'}.`;

  const progressionTrend: 'ascending' | 'stable' | 'needs_reinforcement' = 
    readinessMargin > 0 ? 'ascending' : readinessMargin === 0 ? 'stable' : 'needs_reinforcement';

  return {
    userId: attempts[0]?.user_id || 'user_001',
    levelCode,
    totalCompletedPacks: m,
    weightedReadinessIndex: wri,
    roundedWeightedReadinessIndex: roundedWri,
    passThresholdScore,
    readinessMargin,
    isReadyForExam: isReady,
    trajectory,
    diagnosticSummaryEn,
    diagnosticSummaryId,
    attempts: attempts.map(a => ({
      id: a.id,
      userId: a.user_id,
      packageId: a.package_id,
      levelCode: a.level_code as any,
      packNumber: a.pack_number,
      rawScore: a.raw_score,
      totalQuestions: a.total_questions,
      scaledScore: a.scaled_score,
      passed: Boolean(a.passed),
      sectionalBreakdown: typeof a.sectional_breakdown === 'string' ? JSON.parse(a.sectional_breakdown || '{}') : (a.sectional_breakdown || {}),
      timeSpentSeconds: a.time_spent_seconds,
      completedAt: a.completed_at
    })),
    targetThreshold: passThresholdScore,
    predictedScore: roundedWri,
    totalAttemptsCount: attempts.length,
    progressionTrend
  };
}
