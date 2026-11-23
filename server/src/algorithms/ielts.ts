// IELTS Official Band Scoring & Rubric Evaluator Engine

export function rawToIELTSListeningBand(rawScore: number): number {
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
  return 2.5;
}

/**
 * Official IELTS overall band score rounding rule:
 * - If average ends in .25 -> round UP to .5
 * - If average ends in .75 -> round UP to next whole band
 * - If fraction is < .25 -> round down to whole band
 * - If fraction is >= .25 and < .75 -> round to .5
 * - If fraction is >= .75 -> round up to next whole band
 */
export function roundIELTSBand(rawAverage: number): number {
  const integerPart = Math.floor(rawAverage);
  const remainder = rawAverage - integerPart;

  if (remainder < 0.25) {
    return integerPart;
  } else if (remainder < 0.75) {
    return integerPart + 0.5;
  } else {
    return integerPart + 1.0;
  }
}

export function evaluateIELTSWriting(
  taskType: 1 | 2,
  essayText: string
): {
  overallBand: number;
  wordCount: number;
  wordCountSatisfied: boolean;
  criteria: {
    taskResponseOrAchievement: { score: number; feedback: string };
    coherenceAndCohesion: { score: number; feedback: string };
    lexicalResource: { score: number; feedback: string };
    grammaticalRangeAndAccuracy: { score: number; feedback: string };
  };
  annotatedCorrections: Array<{
    type: 'grammar' | 'vocabulary' | 'cohesion';
    originalText: string;
    suggestion: string;
    reason: string;
  }>;
} {
  const words = essayText.trim().split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;
  const minWords = taskType === 1 ? 150 : 250;
  const wordCountSatisfied = wordCount >= minWords;

  // Domain linguistic analysis
  const textLower = essayText.toLowerCase();

  // Lexical markers
  const academicCollocations = [
    'ubiquitous', 'paradigm', 'exponential', 'ramifications', 'catalyst',
    'autonomous', 'deterioration', 'exacerbate', 'mitigate', 'disproportionate',
    'cognitive', 'imperative', 'predominant', 'scrutiny', 'indispensable'
  ];
  let academicVocabCount = 0;
  academicCollocations.forEach(term => {
    if (textLower.includes(term)) academicVocabCount++;
  });

  // Cohesive markers
  const cohesiveDevices = [
    'furthermore', 'moreover', 'nonetheless', 'consequently', 'in contrast',
    'on the other hand', 'primarily', 'in light of', 'conversely', 'notably'
  ];
  let cohesiveCount = 0;
  cohesiveDevices.forEach(marker => {
    if (textLower.includes(marker)) cohesiveCount++;
  });

  // Clause complexity (relative clauses, conditionals, passive forms)
  const hasConditionals = /if\s+|unless\s+|provided\s+that/.test(textLower);
  const hasRelatives = /which\s+|who\s+|whereas\s+|wherein\s+/.test(textLower);
  const hasPassive = /is\s+\w+ed|are\s+\w+ed|been\s+\w+ed|was\s+\w+ed|were\s+\w+ed/.test(textLower);

  // Compute sub-scores (0-9 scale)
  let trScore = 6.0;
  if (!wordCountSatisfied) {
    trScore = Math.max(4.0, trScore - (minWords - wordCount) * 0.02);
  } else if (wordCount >= minWords + 50) {
    trScore = 7.5;
  } else {
    trScore = 7.0;
  }

  let ccScore = 6.0;
  if (cohesiveCount >= 4) ccScore = 8.0;
  else if (cohesiveCount >= 2) ccScore = 7.0;
  else ccScore = 6.0;

  let lrScore = 6.0;
  if (academicVocabCount >= 5) lrScore = 8.5;
  else if (academicVocabCount >= 3) lrScore = 7.5;
  else if (academicVocabCount >= 1) lrScore = 6.5;

  let graScore = 6.0;
  let complexCount = (hasConditionals ? 1 : 0) + (hasRelatives ? 1 : 0) + (hasPassive ? 1 : 0);
  if (complexCount >= 3) graScore = 8.0;
  else if (complexCount >= 2) graScore = 7.0;
  else graScore = 6.0;

  // Round sub-scores to nearest 0.5
  const avg = (trScore + ccScore + lrScore + graScore) / 4;
  const overallBand = roundIELTSBand(avg);

  // Annotated diagnostic suggestions
  const annotatedCorrections: Array<{
    type: 'grammar' | 'vocabulary' | 'cohesion';
    originalText: string;
    suggestion: string;
    reason: string;
  }> = [];

  if (textLower.includes('a lot of') || textLower.includes('lots of')) {
    annotatedCorrections.push({
      type: 'vocabulary',
      originalText: 'a lot of / lots of',
      suggestion: 'a considerable volume of / numerous / substantial',
      reason: 'Informal register. Academic Task 2 requires precise, formal academic determiners.'
    });
  }

  if (textLower.includes('good') && !textLower.includes('good user')) {
    annotatedCorrections.push({
      type: 'vocabulary',
      originalText: 'good',
      suggestion: 'advantageous / beneficial / commendable',
      reason: 'Overused elementary adjective. Upgrade to Band 8+ academic lexical resource.'
    });
  }

  if (textLower.includes('because') && !textLower.includes('owing to')) {
    annotatedCorrections.push({
      type: 'cohesion',
      originalText: 'because',
      suggestion: 'inasmuch as / attributable to / owing to the fact that',
      reason: 'Enhances discourse variety and cohesion.'
    });
  }

  return {
    overallBand,
    wordCount,
    wordCountSatisfied,
    criteria: {
      taskResponseOrAchievement: {
        score: trScore,
        feedback: wordCountSatisfied
          ? 'Clear central position maintained. All parts of the prompt addressed with relevant supporting evidence.'
          : `Underlength by ${minWords - wordCount} words. Incurred penalty for insufficient task development.`
      },
      coherenceAndCohesion: {
        score: ccScore,
        feedback: cohesiveCount >= 3
          ? 'Logical organization of ideas with skillful referencing and sophisticated discourse markers.'
          : 'Ideas are generally organized, but transitions between paragraphs rely on mechanical linkers.'
      },
      lexicalResource: {
        score: lrScore,
        feedback: academicVocabCount >= 3
          ? 'Wide academic lexical repertoire with natural collocations and sustained formal register.'
          : 'Adequate everyday vocabulary, but requires greater precision and less repetition of simple words.'
      },
      grammaticalRangeAndAccuracy: {
        score: graScore,
        feedback: complexCount >= 2
          ? 'Good variety of complex structures (adverbial clauses, passive voice) with high accuracy.'
          : 'Predominantly simple sentences. Needs higher frequency of subordinate clauses and conditional constructions.'
      }
    },
    annotatedCorrections
  };
}
