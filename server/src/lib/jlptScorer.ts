// JLPT 5-Tier Official Scaled Scoring & Sectional Cutoff Safeguard Engine (N5 to N1)
// Conforming to docs/SPEC.md §3 and docs/DOMAIN_BLUEPRINT.md §5.2

import {
  JLPTExamPackageData,
  JLPTExamQuestion,
  JLPTScoringResult,
  JLPTSectionalScore,
  JLPTQuestionEvaluation,
  ExamPackageContent
} from '../types';

/**
 * Normalizes an answer string token for robust matching.
 * Strips leading option prefixes ('1: ', '1. ', '1) '), punctuation, brackets, and extra spaces.
 */
export function normalizeToken(val: any): string {
  if (val === undefined || val === null) return '';
  return String(val)
    .trim()
    .toLowerCase()
    .replace(/^[1-4][:\.\)\s\-]+/i, '')
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'【】「」]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Extracts a numeric choice index (1, 2, 3, or 4) from an answer string if present.
 */
export function extractChoiceIndex(val: any): string | null {
  if (val === undefined || val === null) return null;
  const s = String(val).trim();
  const m = s.match(/^([1-4])(?:\s*[:\.\)\-\s]|$)/);
  if (m) return m[1];
  if (s === '1' || s === '2' || s === '3' || s === '4') return s;
  return null;
}

/**
 * Checks whether the user's provided answer matches the authentic correct answer.
 * Handles numeric indices, full text options, trimmed tokens, and accepted alternative answers.
 */
export function checkAnswerCorrect(userAns: any, correctAns: any, acceptedAnswers?: any[]): boolean {
  if (userAns === undefined || userAns === null || String(userAns).trim() === '') {
    return false;
  }

  const uStr = String(userAns).trim();
  const cStr = String(correctAns).trim();

  // 1. Direct index equality (e.g. '1' === '1: はあく' or 2 === 2)
  const uIdx = extractChoiceIndex(userAns);
  const cIdx = extractChoiceIndex(correctAns);
  if (uIdx && cIdx && uIdx === cIdx) {
    return true;
  }

  // 2. Direct string equality (case-insensitive)
  if (uStr.toLowerCase() === cStr.toLowerCase()) {
    return true;
  }

  // 3. Normalized token equality
  const uNorm = normalizeToken(userAns);
  const cNorm = normalizeToken(correctAns);
  if (uNorm.length > 0 && cNorm.length > 0 && uNorm === cNorm) {
    return true;
  }

  // 4. Accepted answers list
  if (acceptedAnswers && Array.isArray(acceptedAnswers)) {
    for (const acc of acceptedAnswers) {
      const aIdx = extractChoiceIndex(acc);
      if (uIdx && aIdx && uIdx === aIdx) return true;
      if (uStr.toLowerCase() === String(acc).trim().toLowerCase()) return true;
      if (uNorm.length > 0 && normalizeToken(acc) === uNorm) return true;
    }
  }

  return false;
}

/**
 * Evaluates candidate responses for a full JLPT mock exam package.
 * Implements official 180-point scaled score conversion, sectional breakdowns,
 * and the strict 19-point cutoff rule (基準点未達: any section < 19/60 or < 38/120 triggers automatic 不合格).
 */
export function evaluateJLPTSubmission(
  pkg: JLPTExamPackageData | ExamPackageContent,
  answers: Record<string | number, string | number> = {},
  timeSpentSeconds: number = 0,
  userId: string = 'user_001'
): JLPTScoringResult {
  const normLevel = String(pkg.levelCode || 'n5').toLowerCase();
  const isLowerLevel = normLevel.includes('n5') || normLevel.includes('n4');

  // Official JLPT Pass Thresholds
  let defaultPassThreshold = 90;
  if (normLevel.includes('n1')) defaultPassThreshold = 100;
  else if (normLevel.includes('n3')) defaultPassThreshold = 95;
  else if (normLevel.includes('n4')) defaultPassThreshold = 90;
  else if (normLevel.includes('n5')) defaultPassThreshold = 80;

  const passThreshold = pkg.passThresholdScore || defaultPassThreshold;

  // Track raw counts per section
  const sectionCounts = {
    language_knowledge: { raw: 0, total: 0 },
    reading: { raw: 0, total: 0 },
    listening: { raw: 0, total: 0 }
  };

  const questionEvaluations: JLPTQuestionEvaluation[] = [];
  let rawScore = 0;
  const questions = pkg.questions || [];

  for (let idx = 0; idx < questions.length; idx++) {
    const q = questions[idx];
    const qNum = q.questionNumber || (idx + 1);

    // Determine section category
    let category: 'language_knowledge' | 'reading' | 'listening' = 'language_knowledge';
    if (q.sectionCategory === 'language_knowledge' || q.sectionCategory === 'reading' || q.sectionCategory === 'listening') {
      category = q.sectionCategory;
    } else if (q.sessionNumber === 3 || q.itemType === 'chokai_audio' || (q.mondaiTitleJp && q.mondaiTitleJp.includes('聴解'))) {
      category = 'listening';
    } else if (q.passageId || (q as any).passagePart || (q.mondaiTitleJp && q.mondaiTitleJp.includes('読解'))) {
      category = 'reading';
    }

    sectionCounts[category].total++;

    // Retrieve candidate answer by questionNumber or ID
    const userAns = answers[qNum] ?? answers[String(qNum)] ?? (q.id ? answers[q.id] : undefined);
    const isCorrect = checkAnswerCorrect(userAns, q.correctAnswer, q.acceptedAnswers);

    if (isCorrect) {
      rawScore++;
      sectionCounts[category].raw++;
    }

    questionEvaluations.push({
      questionNumber: qNum,
      userAnswer: userAns !== undefined && userAns !== null ? String(userAns) : '',
      correctAnswer: String(q.correctAnswer),
      isCorrect,
      explanation: q.explanation || '',
      explanationId: q.explanationId || ''
    });
  }

  const totalQuestions = questions.length;
  const accuracyPct = totalQuestions > 0 ? Math.round((rawScore / totalQuestions) * 1000) / 10 : 0;

  let scaledScore = 0;
  let sectionalCutoffFailed = false;
  let sectionalScores: {
    languageKnowledge: JLPTSectionalScore;
    reading: JLPTSectionalScore;
    listening: JLPTSectionalScore;
  };

  if (isLowerLevel) {
    // =========================================================================
    // N4 & N5: 2 Official Sections
    // 1. Language Knowledge & Reading combined: 0 - 120 points (Cutoff: 38/120)
    // 2. Listening: 0 - 60 points (Cutoff: 19/60)
    // =========================================================================
    const rawLkRd = sectionCounts.language_knowledge.raw + sectionCounts.reading.raw;
    const totalLkRd = sectionCounts.language_knowledge.total + sectionCounts.reading.total;
    const langKnowledgeReadingScaled = totalLkRd > 0 ? Math.round((rawLkRd / totalLkRd) * 120) : 0;

    const rawList = sectionCounts.listening.raw;
    const totalList = sectionCounts.listening.total;
    const listeningScaled = totalList > 0 ? Math.round((rawList / totalList) * 60) : 0;

    scaledScore = Math.min(180, langKnowledgeReadingScaled + listeningScaled);

    const combinedCutoffPassed = langKnowledgeReadingScaled >= 38;
    const listeningCutoffPassed = listeningScaled >= 19;
    sectionalCutoffFailed = !combinedCutoffPassed || !listeningCutoffPassed;

    // Sub-sectional diagnostics for candidate insight
    const lkScaled = sectionCounts.language_knowledge.total > 0
      ? Math.round((sectionCounts.language_knowledge.raw / sectionCounts.language_knowledge.total) * 60)
      : 0;
    const rdScaled = sectionCounts.reading.total > 0
      ? Math.round((sectionCounts.reading.raw / sectionCounts.reading.total) * 60)
      : 0;

    sectionalScores = {
      languageKnowledge: {
        raw: sectionCounts.language_knowledge.raw,
        total: sectionCounts.language_knowledge.total,
        scaled: lkScaled,
        cutoffPassed: combinedCutoffPassed
      },
      reading: {
        raw: sectionCounts.reading.raw,
        total: sectionCounts.reading.total,
        scaled: rdScaled,
        cutoffPassed: combinedCutoffPassed
      },
      listening: {
        raw: sectionCounts.listening.raw,
        total: sectionCounts.listening.total,
        scaled: listeningScaled,
        cutoffPassed: listeningCutoffPassed
      }
    };
  } else {
    // =========================================================================
    // N1, N2, N3: 3 Official Sections (0 - 60 points each, Cutoff: 19/60 each)
    // 1. Language Knowledge: 0 - 60
    // 2. Reading: 0 - 60
    // 3. Listening: 0 - 60
    // =========================================================================
    const totalLk = sectionCounts.language_knowledge.total;
    const lkScaled = totalLk > 0 ? Math.round((sectionCounts.language_knowledge.raw / totalLk) * 60) : 0;

    const totalRd = sectionCounts.reading.total;
    const rdScaled = totalRd > 0 ? Math.round((sectionCounts.reading.raw / totalRd) * 60) : 0;

    const totalList = sectionCounts.listening.total;
    const listeningScaled = totalList > 0 ? Math.round((sectionCounts.listening.raw / totalList) * 60) : 0;

    scaledScore = Math.min(180, lkScaled + rdScaled + listeningScaled);

    const lkPassed = lkScaled >= 19;
    const rdPassed = rdScaled >= 19;
    const lsPassed = listeningScaled >= 19;
    sectionalCutoffFailed = !lkPassed || !rdPassed || !lsPassed;

    sectionalScores = {
      languageKnowledge: {
        raw: sectionCounts.language_knowledge.raw,
        total: totalLk,
        scaled: lkScaled,
        cutoffPassed: lkPassed
      },
      reading: {
        raw: sectionCounts.reading.raw,
        total: totalRd,
        scaled: rdScaled,
        cutoffPassed: rdPassed
      },
      listening: {
        raw: sectionCounts.listening.raw,
        total: totalList,
        scaled: listeningScaled,
        cutoffPassed: lsPassed
      }
    };
  }

  // Pass condition: Total score >= passThreshold AND sectional cutoffs passed
  const overallPassed = scaledScore >= passThreshold && !sectionalCutoffFailed;

  const verdictJp: '合格' | '不合格' = overallPassed ? '合格' : '不合格';
  const verdictId: 'LULUS' | 'TIDAK LULUS' = overallPassed ? 'LULUS' : 'TIDAK LULUS';

  let cutoffAlertId: string | undefined = undefined;
  if (sectionalCutoffFailed) {
    if (isLowerLevel) {
      cutoffAlertId = 'Perhatian: Nilai batas minimum seksi tidak tercapai (基準点未達). Nilai gabungan Pengetahuan Bahasa & Membaca minimal 38/120 poin dan Mendengar minimal 19/60 poin untuk lulus.';
    } else {
      cutoffAlertId = 'Perhatian: Nilai batas minimum seksi tidak tercapai (基準点未達). Setiap seksi (Pengetahuan Bahasa, Membaca, Mendengar) wajib mencapai minimal 19/60 poin untuk lulus.';
    }
  }

  const attemptId = `att_jlpt_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

  return {
    attemptId,
    packageId: pkg.id,
    levelCode: normLevel,
    rawScore,
    totalQuestions,
    accuracyPct,
    scaledScore,
    sectionalScores,
    passThreshold,
    overallPassed,
    passed: overallPassed,
    sectionalCutoffFailed,
    verdictJp,
    verdictId,
    cutoffAlertId,
    questionEvaluations
  };
}
