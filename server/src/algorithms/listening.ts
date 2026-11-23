// IELTS Listening Audio Engine & Performance Evaluation Algorithm
// Reference specifications: DOMAIN_BLUEPRINT.md (§2.1.6 & §5.1.6) and USER_FLOWS.md (AC 4.21–4.23)

import {
  IeltsListeningPackage,
  ListeningQuestion,
  ListeningEvaluationResult,
  QuestionEvaluationDetail,
  AccentVulnerabilityProfile,
  ListeningAccentCode
} from '../types';

/**
 * Standard Levenshtein edit distance algorithm for spelling distance measurement.
 */
export function calculateLevenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];
  const aLen = a.length;
  const bLen = b.length;

  for (let i = 0; i <= aLen; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= bLen; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= aLen; i++) {
    for (let j = 1; j <= bLen; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,       // deletion
        matrix[i][j - 1] + 1,       // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return matrix[aLen][bLen];
}

/**
 * Normalizes a candidate or key answer string for exact / equivalence comparison.
 */
export function normalizeAnswer(str: string): string {
  if (!str) return '';
  return str
    .trim()
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, ' ') // replace punctuation with space
    .replace(/\s+/g, ' ')                      // collapse multiple spaces
    .trim();
}

/**
 * Returns canonical US/UK variant mappings to support bidirectional equivalence.
 */
const SPELLING_VARIANTS: Record<string, string> = {
  theatre: 'theater',
  theater: 'theatre',
  colour: 'color',
  color: 'colour',
  favour: 'favor',
  favor: 'favour',
  centre: 'center',
  center: 'centre',
  programme: 'program',
  program: 'programme',
  analyse: 'analyze',
  analyze: 'analyse',
  dialogue: 'dialog',
  dialog: 'dialogue',
  practise: 'practice',
  practice: 'practise',
  travelling: 'traveling',
  traveling: 'travelling'
};

/**
 * Checks whether user input matches the key or accepted alternatives,
 * accounting for casing, US/UK orthography, and format normalization.
 */
export function matchesAnswerKey(
  userAnswer: string,
  correctAnswer: string,
  acceptedAnswers: string[] = []
): boolean {
  const normUser = normalizeAnswer(userAnswer);
  if (!normUser) return false;

  const allAcceptable = [correctAnswer, ...acceptedAnswers].map(normalizeAnswer);

  // 1. Direct match
  if (allAcceptable.includes(normUser)) {
    return true;
  }

  // 2. Alphanumeric / compact match (e.g. "WA72 KLU" -> "wa72klu", "ECH-9042" -> "ech9042")
  const compactUser = normUser.replace(/\s+/g, '');
  for (const acc of allAcceptable) {
    if (compactUser === acc.replace(/\s+/g, '')) {
      return true;
    }
  }

  // 3. Currency / number variations (e.g. "125", "£125", "125 pounds", "125 gbp")
  const numericUser = normUser.replace(/[^0-9]/g, '');
  if (numericUser) {
    for (const acc of allAcceptable) {
      const numericAcc = acc.replace(/[^0-9]/g, '');
      if (numericAcc && numericAcc === numericUser) {
        // Verify user didn't write an unrelated number
        if (normUser.includes(numericAcc) || acc.includes(numericUser)) {
          return true;
        }
      }
    }
  }

  // 4. US/UK orthographic equivalence checking
  const userWords = normUser.split(' ');
  for (const acc of allAcceptable) {
    const accWords = acc.split(' ');
    if (userWords.length === accWords.length) {
      const allWordsMatch = userWords.every((w, idx) => {
        const target = accWords[idx];
        return w === target || SPELLING_VARIANTS[w] === target;
      });
      if (allWordsMatch) return true;
    }
  }

  return false;
}

/**
 * Counts words in a string according to IELTS rules.
 * Hyphenated compounds like "gluten-free" count as 1 word or 2 words;
 * here words are non-whitespace chunks.
 */
export function countWords(input: string): number {
  if (!input || !input.trim()) return 0;
  return input.trim().split(/\s+/).filter(w => w.length > 0).length;
}

/**
 * Evaluates whether an answer violates the specified word limit rule.
 */
export function isWordLimitViolated(userAnswer: string, wordLimitRule?: string): boolean {
  if (!wordLimitRule || !userAnswer) return false;

  const ruleUpper = wordLimitRule.toUpperCase();
  const wordCount = countWords(userAnswer);

  if (ruleUpper.includes('ONE WORD ONLY')) {
    return wordCount > 1;
  }
  if (ruleUpper.includes('NO MORE THAN TWO WORDS')) {
    return wordCount > 2;
  }
  if (ruleUpper.includes('NO MORE THAN THREE WORDS')) {
    return wordCount > 3;
  }

  return false;
}

/**
 * Checks if the answer represents a singular/plural morphological mismatch.
 * (e.g. Correct is plural "phonic lips", but candidate provided singular "phonic lip").
 */
export function isPluralMorphologyMismatch(
  userAnswer: string,
  correctAnswer: string,
  acceptedAnswers: string[] = []
): boolean {
  const normUser = normalizeAnswer(userAnswer);
  if (!normUser) return false;

  const allKeys = [correctAnswer, ...acceptedAnswers].map(normalizeAnswer);

  for (const key of allKeys) {
    // Check if key is plural and user answer is singular:
    // e.g. key: "phonic lips" -> user: "phonic lip"
    // e.g. key: "tubercles" -> user: "tubercle"
    // e.g. key: "receptors" -> user: "receptor"
    // e.g. key: "whiskers" -> user: "whisker"
    // e.g. key: "hulls" -> user: "hull"
    // e.g. key: "compost bays" -> user: "compost bay"
    if (key.endsWith('s') && !normUser.endsWith('s')) {
      if (normUser + 's' === key || normUser + 'es' === key) {
        return true;
      }
      // Check multi-word phrase where last word was singularized
      const keyParts = key.split(' ');
      const userParts = normUser.split(' ');
      if (keyParts.length === userParts.length && keyParts.length > 1) {
        const lastKey = keyParts[keyParts.length - 1];
        const lastUser = userParts[userParts.length - 1];
        const prefixMatches = keyParts.slice(0, -1).join(' ') === userParts.slice(0, -1).join(' ');
        if (prefixMatches && (lastUser + 's' === lastKey || lastUser + 'es' === lastKey)) {
          return true;
        }
      }
    }

    // Check converse: key is singular and user submitted plural
    if (!key.endsWith('s') && normUser.endsWith('s')) {
      if (key + 's' === normUser || key + 'es' === normUser) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Converts 40-item raw score to official Cambridge IELTS 9-Band scale.
 */
export function rawToIeltsListeningBand(rawScore: number): number {
  if (rawScore >= 39) return 9.0;
  if (rawScore >= 37) return 8.5;
  if (rawScore >= 35) return 8.0;
  if (rawScore >= 32) return 7.5;
  if (rawScore >= 30) return 7.0;
  if (rawScore >= 26) return 6.5;
  if (rawScore >= 23) return 6.0;
  if (rawScore >= 18) return 5.5;
  if (rawScore >= 16) return 5.0;
  if (rawScore >= 13) return 4.5;
  if (rawScore >= 10) return 4.0;
  if (rawScore >= 7) return 3.5;
  if (rawScore >= 5) return 3.0;
  return 2.5;
}

/**
 * Maps IELTS Band Score to CEFR classification and official descriptor.
 */
export function getCefrDetails(band: number): { cefrLevel: string; descriptor: string } {
  if (band >= 9.0) {
    return {
      cefrLevel: 'C2 (Mastery)',
      descriptor: 'Expert User: Has fully operational command of the language with effortless, nuanced comprehension of complex native speech.'
    };
  }
  if (band >= 8.0) {
    return {
      cefrLevel: 'C1 / C2',
      descriptor: 'Very Good User: Handles complex academic and transactional discourse effortlessly with only occasional unsystematic misunderstandings.'
    };
  }
  if (band >= 7.0) {
    return {
      cefrLevel: 'C1 (Operational)',
      descriptor: 'Good User: Operational command of language; generally handles complex academic lectures, subtle signposting, and voice attribution.'
    };
  }
  if (band >= 6.0) {
    return {
      cefrLevel: 'B2 (Vantage)',
      descriptor: 'Competent User: Generally effective command despite occasional inaccuracies and distractor trap vulnerability in fast-paced dialogues.'
    };
  }
  if (band >= 5.0) {
    return {
      cefrLevel: 'B1 (Threshold)',
      descriptor: 'Modest User: Partial command; handles everyday social dialogues but exhibits substantial breakdown in dense multi-speaker academic settings.'
    };
  }
  if (band >= 4.0) {
    return {
      cefrLevel: 'A2 (Waystage)',
      descriptor: 'Limited User: Basic receptive competence limited to familiar transactional formulas; frequent breakdowns under natural speed and unfamiliar accents.'
    };
  }
  return {
    cefrLevel: 'A1 / Pre-A1',
    descriptor: 'Intermittent / Non-User: Great difficulty understanding spoken English even at slow speech rates.'
  };
}

/**
 * Evaluates candidate responses for a full IELTS listening package.
 */
export function evaluateListeningPerformance(
  pkg: IeltsListeningPackage,
  answers: Record<number, string> = {}
): ListeningEvaluationResult {
  // Collect all 40 questions from all sections
  const allQuestions: ListeningQuestion[] = [];
  pkg.sections.forEach(sec => {
    sec.questions.forEach(q => {
      allQuestions.push(q);
    });
  });

  const questionResults: QuestionEvaluationDetail[] = [];
  let rawScore = 0;

  // Error typology accumulators
  let wordLimitViolations = 0;
  let spellingErrors = 0;
  let distractorTrapFailures = 0;
  let singularPluralMismatches = 0;
  let otherErrors = 0;

  // Sectional raw counts
  const sectionCounts: Record<number, { raw: number; total: number }> = {
    1: { raw: 0, total: 0 },
    2: { raw: 0, total: 0 },
    3: { raw: 0, total: 0 },
    4: { raw: 0, total: 0 }
  };

  // Accent performance tracking
  const accentStats: Record<string, { correct: number; total: number; name: string; section: number }> = {
    british_rp: { correct: 0, total: 0, name: 'British RP (Received Pronunciation)', section: 1 },
    australian: { correct: 0, total: 0, name: 'Australian English', section: 1 },
    scottish: { correct: 0, total: 0, name: 'Scottish English', section: 2 },
    general_american: { correct: 0, total: 0, name: 'General American English', section: 3 }
  };

  for (const question of allQuestions) {
    const qNum = question.questionNumber;
    const secNum = question.sectionNumber;
    const userAns = (answers[qNum] || '').trim();
    const targetAccent = (question.targetAccent || 'british_rp') as ListeningAccentCode;

    // Track totals
    if (sectionCounts[secNum]) {
      sectionCounts[secNum].total++;
    }
    if (accentStats[targetAccent]) {
      accentStats[targetAccent].total++;
    }

    // Step 1: Word limit check (strict disqualification)
    if (userAns && isWordLimitViolated(userAns, question.wordLimit)) {
      wordLimitViolations++;
      questionResults.push({
        questionNumber: qNum,
        sectionNumber: secNum,
        userAnswer: userAns,
        correctAnswer: question.correctAnswer,
        acceptedAnswers: question.acceptedAnswers,
        isCorrect: false,
        errorType: 'WORD_LIMIT_EXCEEDED',
        audioTimestampSeconds: question.audioTimestampSeconds,
        distractorAnalysis: question.distractorAnalysis
      });
      continue;
    }

    // Step 2: Answer key matching
    const isCorrect = matchesAnswerKey(userAns, question.correctAnswer, question.acceptedAnswers);

    if (isCorrect) {
      rawScore++;
      if (sectionCounts[secNum]) {
        sectionCounts[secNum].raw++;
      }
      if (accentStats[targetAccent]) {
        accentStats[targetAccent].correct++;
      }

      questionResults.push({
        questionNumber: qNum,
        sectionNumber: secNum,
        userAnswer: userAns,
        correctAnswer: question.correctAnswer,
        acceptedAnswers: question.acceptedAnswers,
        isCorrect: true,
        errorType: null,
        audioTimestampSeconds: question.audioTimestampSeconds,
        distractorAnalysis: question.distractorAnalysis
      });
    } else {
      // Step 3: Error typology diagnosis
      let errorType: 'WORD_LIMIT_EXCEEDED' | 'PLURAL_MORPHOLOGY_MISSING' | 'SPELLING_ERROR' | 'DISTRACTOR_TRAP' | 'INCORRECT' = 'INCORRECT';

      if (!userAns) {
        otherErrors++;
        errorType = 'INCORRECT';
      } else if (isPluralMorphologyMismatch(userAns, question.correctAnswer, question.acceptedAnswers)) {
        singularPluralMismatches++;
        errorType = 'PLURAL_MORPHOLOGY_MISSING';
      } else if (
        question.distractorAnalysis &&
        question.distractorAnalysis.deceptiveTrapToken &&
        normalizeAnswer(userAns).includes(normalizeAnswer(question.distractorAnalysis.deceptiveTrapToken))
      ) {
        distractorTrapFailures++;
        errorType = 'DISTRACTOR_TRAP';
      } else {
        // Check for near-miss spelling error
        const normU = normalizeAnswer(userAns);
        const normC = normalizeAnswer(question.correctAnswer);
        const dist = calculateLevenshteinDistance(normU, normC);
        if (normC.length > 3 && dist <= 2) {
          spellingErrors++;
          errorType = 'SPELLING_ERROR';
        } else {
          otherErrors++;
          errorType = 'INCORRECT';
        }
      }

      questionResults.push({
        questionNumber: qNum,
        sectionNumber: secNum,
        userAnswer: userAns,
        correctAnswer: question.correctAnswer,
        acceptedAnswers: question.acceptedAnswers,
        isCorrect: false,
        errorType,
        audioTimestampSeconds: question.audioTimestampSeconds,
        distractorAnalysis: question.distractorAnalysis
      });
    }
  }

  // Calculate overall band and CEFR
  const overallBand = rawToIeltsListeningBand(rawScore);
  const cefr = getCefrDetails(overallBand);

  // Calculate sectional scores
  const sectionalScores = {
    section1: {
      raw: sectionCounts[1].raw,
      total: sectionCounts[1].total,
      percentage: sectionCounts[1].total > 0 ? Math.round((sectionCounts[1].raw / sectionCounts[1].total) * 100) : 0
    },
    section2: {
      raw: sectionCounts[2].raw,
      total: sectionCounts[2].total,
      percentage: sectionCounts[2].total > 0 ? Math.round((sectionCounts[2].raw / sectionCounts[2].total) * 100) : 0
    },
    section3: {
      raw: sectionCounts[3].raw,
      total: sectionCounts[3].total,
      percentage: sectionCounts[3].total > 0 ? Math.round((sectionCounts[3].raw / sectionCounts[3].total) * 100) : 0
    },
    section4: {
      raw: sectionCounts[4].raw,
      total: sectionCounts[4].total,
      percentage: sectionCounts[4].total > 0 ? Math.round((sectionCounts[4].raw / sectionCounts[4].total) * 100) : 0
    }
  };

  // Compile accent vulnerability profiles
  const accentVulnerabilities: AccentVulnerabilityProfile[] = Object.entries(accentStats).map(
    ([code, stat]) => {
      const accuracyPct = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 100;
      let riskLevel: 'LOW' | 'MODERATE' | 'HIGH' = 'LOW';
      let feedback = '';

      if (accuracyPct >= 80) {
        riskLevel = 'LOW';
        feedback = `Strong comprehension of ${stat.name}. Minimal phonetic interference detected.`;
      } else if (accuracyPct >= 60) {
        riskLevel = 'MODERATE';
        feedback = `Moderate vulnerability with ${stat.name}. Pay closer attention to connected speech, vowel transitions, and conversational pivots.`;
      } else {
        riskLevel = 'HIGH';
        feedback = `High vulnerability under ${stat.name}. Focused drill on regional phonological features (e.g. non-rhotic glottalization, rising inflections, or rhotic taps) is strongly recommended.`;
      }

      return {
        accent: code,
        accentName: stat.name,
        sectionNumber: stat.section,
        correctCount: stat.correct,
        totalCount: stat.total,
        accuracyPct,
        riskLevel,
        feedback
      };
    }
  );

  return {
    rawScore,
    overallBand,
    cefrLevel: cefr.cefrLevel,
    competencyDescriptor: cefr.descriptor,
    sectionalScores,
    accentVulnerabilities,
    errorTypology: {
      wordLimitViolations,
      spellingErrors,
      distractorTrapFailures,
      singularPluralMismatches,
      otherErrors
    },
    questionResults
  };
}
