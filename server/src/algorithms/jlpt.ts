// JLPT Scaled Scoring & Sectional Cutoff Safeguard Engine (N5 to N1)

export interface JLPTScoreResult {
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  languageKnowledgeScore: number; // For N5/N4 this includes Reading (0-120)
  readingScore?: number;          // For N1-N3 (0-60)
  listeningScore: number;         // 0 - 60
  totalScore: number;             // 0 - 180
  passThreshold: number;          // N5: 80, N4: 90, N3: 95, N2: 90, N1: 100
  sectionalCutoff: number;
  isLanguageKnowledgePassed: boolean;
  isReadingPassed?: boolean;
  isListeningPassed: boolean;
  isTotalPassed: boolean;
  passed: boolean;
  isCutoffCasualty: boolean;
  statusDescription: string;
}

export function evaluateJLPTResult(
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1',
  languageKnowledgeRaw: { correct: number; total: number },
  readingRaw: { correct: number; total: number },
  listeningRaw: { correct: number; total: number }
): JLPTScoreResult {
  const isLowerLevel = level === 'N5' || level === 'N4';

  const thresholds: Record<'N5' | 'N4' | 'N3' | 'N2' | 'N1', number> = {
    N5: 80,
    N4: 90,
    N3: 95,
    N2: 90,
    N1: 100
  };
  const passThreshold = thresholds[level];

  if (isLowerLevel) {
    // N4 & N5: 2 Sections -> Language Knowledge & Reading (0-120), Listening (0-60)
    const combinedCorrect = languageKnowledgeRaw.correct + readingRaw.correct;
    const combinedTotal = languageKnowledgeRaw.total + readingRaw.total;
    const lkRdPct = combinedTotal > 0 ? (combinedCorrect / combinedTotal) : 0;
    const lsPct = listeningRaw.total > 0 ? (listeningRaw.correct / listeningRaw.total) : 0;

    const languageKnowledgeScore = Math.round(lkRdPct * 120);
    const listeningScore = Math.round(lsPct * 60);
    const totalScore = languageKnowledgeScore + listeningScore;

    const lkCutoff = 38;
    const lsCutoff = 19;

    const isLanguageKnowledgePassed = languageKnowledgeScore >= lkCutoff;
    const isListeningPassed = listeningScore >= lsCutoff;
    const isTotalPassed = totalScore >= passThreshold;

    const passed = isLanguageKnowledgePassed && isListeningPassed && isTotalPassed;
    const isCutoffCasualty = isTotalPassed && (!isLanguageKnowledgePassed || !isListeningPassed);

    let statusDescription = '合格 (Pass) - Full certification standards achieved.';
    if (isCutoffCasualty) {
      statusDescription = '不合格 (Sectional Cutoff Casualty) - Total points met pass threshold, but failed sectional cutoff minimum (Language/Reading < 38 or Listening < 19).';
    } else if (!isTotalPassed) {
      statusDescription = `不合格 (Fail) - Total points ${totalScore}/180 did not meet the pass mark of ${passThreshold}.`;
    }

    return {
      level,
      languageKnowledgeScore,
      listeningScore,
      totalScore,
      passThreshold,
      sectionalCutoff: lsCutoff,
      isLanguageKnowledgePassed,
      isListeningPassed,
      isTotalPassed,
      passed,
      isCutoffCasualty,
      statusDescription
    };
  } else {
    // N3, N2, N1: 3 Sections -> Language Knowledge (0-60), Reading (0-60), Listening (0-60)
    const lkPct = languageKnowledgeRaw.total > 0 ? (languageKnowledgeRaw.correct / languageKnowledgeRaw.total) : 0;
    const rdPct = readingRaw.total > 0 ? (readingRaw.correct / readingRaw.total) : 0;
    const lsPct = listeningRaw.total > 0 ? (listeningRaw.correct / listeningRaw.total) : 0;

    const languageKnowledgeScore = Math.round(lkPct * 60);
    const readingScore = Math.round(rdPct * 60);
    const listeningScore = Math.round(lsPct * 60);
    const totalScore = languageKnowledgeScore + readingScore + listeningScore;

    const sectionalCutoff = 19;
    const isLanguageKnowledgePassed = languageKnowledgeScore >= sectionalCutoff;
    const isReadingPassed = readingScore >= sectionalCutoff;
    const isListeningPassed = listeningScore >= sectionalCutoff;
    const isTotalPassed = totalScore >= passThreshold;

    const passed = isLanguageKnowledgePassed && isReadingPassed && isListeningPassed && isTotalPassed;
    const isCutoffCasualty = isTotalPassed && (!isLanguageKnowledgePassed || !isReadingPassed || !isListeningPassed);

    let statusDescription = '合格 (Pass) - Full certification standards achieved.';
    if (isCutoffCasualty) {
      statusDescription = '不合格 (Sectional Cutoff Casualty) - Total points met pass threshold, but failed the mandatory 19-point minimum on one or more sections.';
    } else if (!isTotalPassed) {
      statusDescription = `不合格 (Fail) - Total points ${totalScore}/180 did not meet the pass mark of ${passThreshold}.`;
    }

    return {
      level,
      languageKnowledgeScore,
      readingScore,
      listeningScore,
      totalScore,
      passThreshold,
      sectionalCutoff,
      isLanguageKnowledgePassed,
      isReadingPassed,
      isListeningPassed,
      isTotalPassed,
      passed,
      isCutoffCasualty,
      statusDescription
    };
  }
}
