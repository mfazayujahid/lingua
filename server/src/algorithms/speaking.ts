import { SpeakingDiagnosticEvaluationResult } from '../types';

/**
 * Official IELTS overall band score rounding rule:
 * - If fractional remainder < 0.25 -> round down to whole band
 * - If 0.25 <= remainder < 0.75 -> round to half band (.5)
 * - If remainder >= 0.75 -> round up to next whole band
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

// Academic Word List (AWL) & High-Register IELTS Lexemes
export const AWL_LEXICON = [
  'ubiquitous', 'paradigm', 'exponential', 'ramifications', 'catalyst',
  'autonomous', 'deterioration', 'exacerbate', 'mitigate', 'disproportionate',
  'cognitive', 'imperative', 'predominant', 'scrutiny', 'indispensable',
  'pedagogical', 'unorthodox', 'hermeneutics', 'synthetic', 'heterodoxy',
  'empirical', 'subsequent', 'intrinsic', 'innovative', 'infrastructure',
  'facilitate', 'fundamental', 'transformative', 'collaborative', 'comprehensive',
  'sustainable', 'preliminary', 'enhance', 'perspective', 'framework',
  'criteria', 'dimension', 'dynamic', 'externalities', 'governance',
  'legislation', 'proactive', 'resilience', 'advocacy', 'allocation',
  'compensation', 'integration', 'manifestation', 'parameter', 'resolution',
  'phenomenon', 'unprecedented', 'equilibrium', 'remediation', 'stewardship',
  'revere', 'disparate', 'provocative', 'synthesize', 'repository'
];

// Natural High-Band Idiomatic Expressions
export const IDIOMATIC_EXPRESSIONS = [
  'at the cutting edge',
  'food for thought',
  'down to earth',
  'blessing in disguise',
  'leave no stone unturned',
  'play a pivotal role',
  'see eye to eye',
  'shed light on',
  'a double-edged sword',
  'strike a balance',
  'stand the test of time',
  'part and parcel',
  'through thick and thin',
  'in the long run',
  'boil down to',
  'come to terms with',
  'on the fence',
  'second to none',
  'pave the way',
  'off the beaten track',
  'ahead of the curve',
  'give rise to',
  'set apart',
  'around the clock'
];

// Subordinating conjunctions indicating complex clause structures
export const SUBORDINATING_CONJUNCTIONS = [
  'because',
  'although',
  'whereas',
  'while',
  'if',
  'unless',
  'since',
  'when',
  'whenever',
  'where',
  'whether',
  'as long as',
  'provided that',
  'even though',
  'inasmuch as',
  'so that',
  'in order that',
  'though',
  'supposing',
  'even if',
  'after',
  'before'
];

// Relative pronouns indicating adjectival and relative clauses
export const RELATIVE_PRONOUNS = [
  'which',
  'who',
  'whom',
  'whose',
  'that',
  'whereby',
  'wherein'
];

export interface SpeakingEvaluationInput {
  transcript: string;
  durationSeconds: number;
  silentPausesCount?: number;
  hesitationCount?: number;
}

/**
 * IELTS 9-Band Speaking Diagnostic Assessment Engine
 * Evaluates spoken performance across:
 * 1. Fluency & Coherence (FC)
 * 2. Lexical Resource (LR)
 * 3. Grammatical Range & Accuracy (GRA)
 * 4. Pronunciation (PR)
 */
export function evaluateSpeakingPerformance(input: SpeakingEvaluationInput): SpeakingDiagnosticEvaluationResult {
  const duration = Math.max(1, input.durationSeconds);
  const rawWords = input.transcript.trim().split(/\s+/).filter(w => w.length > 0);
  const totalWords = rawWords.length;
  const wpm = Math.round((totalWords / duration) * 60);

  const lowerTranscript = input.transcript.toLowerCase();

  // -------------------------------------------------------------
  // 1. FLUENCY & COHERENCE (FC)
  // WPM Benchmarks:
  // >= 150 WPM -> Band 8.5–9.0
  // 125–149 WPM -> Band 7.0–8.0
  // 100–124 WPM -> Band 6.0–6.5
  // 75–99 WPM -> Band 5.0–5.5
  // < 75 WPM -> Band 4.0–4.5
  // -------------------------------------------------------------
  let baseFc = 4.0;
  if (wpm >= 150) {
    baseFc = wpm >= 165 ? 9.0 : 8.5;
  } else if (wpm >= 125) {
    baseFc = wpm >= 138 ? 8.0 : 7.0;
  } else if (wpm >= 100) {
    baseFc = wpm >= 112 ? 6.5 : 6.0;
  } else if (wpm >= 75) {
    baseFc = wpm >= 88 ? 5.5 : 5.0;
  } else {
    baseFc = wpm >= 50 ? 4.5 : 4.0;
  }

  const pausesCount = input.silentPausesCount ?? 0;
  const hesitationCount = input.hesitationCount ?? 0;
  const pausesPerMin = (pausesCount / duration) * 60;
  const hesitationsPerMin = (hesitationCount / duration) * 60;

  let continuityPenalty = 0.0;
  if (pausesPerMin > 6 || hesitationsPerMin > 6) {
    continuityPenalty = 1.5;
  } else if (pausesPerMin > 4 || hesitationsPerMin > 4) {
    continuityPenalty = 1.0;
  } else if (pausesPerMin > 2 || hesitationsPerMin > 2) {
    continuityPenalty = 0.5;
  }

  const fcScore = Math.max(3.5, Math.min(9.0, Number((baseFc - continuityPenalty).toFixed(1))));

  const fcFeedback = fcScore >= 8.0
    ? `Fluent and continuous speech tempo (${wpm} WPM) with natural discourse coherence and negligible hesitation.`
    : fcScore >= 6.5
    ? `Maintains a steady communicative tempo (${wpm} WPM) with occasional pauses or self-correction during complex ideas.`
    : `Speech rate (${wpm} WPM) is somewhat constrained by mid-sentence hesitations or silent pauses. Focus on flow.`;

  // -------------------------------------------------------------
  // 2. LEXICAL RESOURCE (LR)
  // Type-Token Ratio + AWL words + Idiomatic Expressions
  // -------------------------------------------------------------
  const cleanedWords = rawWords.map(w => w.toLowerCase().replace(/[^a-z0-9]/g, '')).filter(w => w.length > 0);
  const uniqueWordsSet = new Set(cleanedWords);
  const typeTokenRatio = totalWords > 0 ? Number((uniqueWordsSet.size / totalWords).toFixed(3)) : 0;

  const awlWordsDetected: string[] = [];
  for (const term of AWL_LEXICON) {
    const regex = new RegExp(`\\b${term}\\b`, 'i');
    if (regex.test(lowerTranscript) && !awlWordsDetected.includes(term)) {
      awlWordsDetected.push(term);
    }
  }

  const idiomaticPhrasesDetected: string[] = [];
  for (const idiom of IDIOMATIC_EXPRESSIONS) {
    if (lowerTranscript.includes(idiom) && !idiomaticPhrasesDetected.includes(idiom)) {
      idiomaticPhrasesDetected.push(idiom);
    }
  }

  let lrScore = 5.0;
  if (typeTokenRatio >= 0.52 && (awlWordsDetected.length >= 4 || (awlWordsDetected.length >= 2 && idiomaticPhrasesDetected.length >= 1))) {
    lrScore = (awlWordsDetected.length >= 6 && idiomaticPhrasesDetected.length >= 2) ? 9.0 : 8.5;
  } else if (typeTokenRatio >= 0.44 && (awlWordsDetected.length >= 2 || idiomaticPhrasesDetected.length >= 1)) {
    lrScore = awlWordsDetected.length >= 4 ? 8.0 : 7.5;
  } else if (typeTokenRatio >= 0.36 && awlWordsDetected.length >= 1) {
    lrScore = awlWordsDetected.length >= 2 ? 6.5 : 6.0;
  } else if (typeTokenRatio >= 0.30) {
    lrScore = 5.5;
  } else {
    lrScore = 4.5;
  }

  const lrFeedback = lrScore >= 8.0
    ? `Exceptional lexical variety (TTR: ${typeTokenRatio}) with sophisticated academic vocabulary (${awlWordsDetected.slice(0, 4).join(', ')}) and authentic idiomatic usage.`
    : lrScore >= 6.5
    ? `Effective vocabulary repertoire (TTR: ${typeTokenRatio}) capable of conveying abstract thoughts, with several academic terms.`
    : `Adequate everyday vocabulary (TTR: ${typeTokenRatio}), but relies on repetitive expressions. Enrich topic-specific collocations.`;

  // -------------------------------------------------------------
  // 3. GRAMMATICAL RANGE & ACCURACY (GRA)
  // Subordinating Conjunctions & Relative Pronouns
  // -------------------------------------------------------------
  const detectedSubordinatingConjunctions: string[] = [];
  let subConjunctionCount = 0;
  for (const conj of SUBORDINATING_CONJUNCTIONS) {
    const regex = new RegExp(`\\b${conj}\\b`, 'gi');
    const matches = lowerTranscript.match(regex);
    if (matches && matches.length > 0) {
      detectedSubordinatingConjunctions.push(conj);
      subConjunctionCount += matches.length;
    }
  }

  const detectedRelativePronouns: string[] = [];
  let relPronounCount = 0;
  for (const rel of RELATIVE_PRONOUNS) {
    const regex = new RegExp(`\\b${rel}\\b`, 'gi');
    const matches = lowerTranscript.match(regex);
    if (matches && matches.length > 0) {
      detectedRelativePronouns.push(rel);
      relPronounCount += matches.length;
    }
  }

  const totalComplexMarkers = subConjunctionCount + relPronounCount;
  const rawSentences = input.transcript.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 0);
  const sentenceCount = Math.max(1, rawSentences.length);
  const complexClauseRatio = Number((totalComplexMarkers / sentenceCount).toFixed(2));

  let graScore = 5.0;
  if (complexClauseRatio >= 0.6 && totalComplexMarkers >= 4) {
    graScore = (complexClauseRatio >= 0.8 && totalComplexMarkers >= 6) ? 9.0 : 8.5;
  } else if (complexClauseRatio >= 0.4 && totalComplexMarkers >= 3) {
    graScore = totalComplexMarkers >= 4 ? 8.0 : 7.5;
  } else if (complexClauseRatio >= 0.25 && totalComplexMarkers >= 2) {
    graScore = 6.5;
  } else if (totalComplexMarkers >= 1) {
    graScore = 5.5;
  } else {
    graScore = 4.5;
  }

  const graFeedback = graScore >= 8.0
    ? `Masterful syntactic range with frequent complex clauses (ratio: ${complexClauseRatio}), subordination (${detectedSubordinatingConjunctions.slice(0, 3).join(', ')}), and relative structures.`
    : graScore >= 6.5
    ? `Good variety of compound and complex sentence structures with solid grammatical accuracy.`
    : `Speech consists predominantly of simple coordinate sentences. Incorporate more concessive and conditional clauses.`;

  // -------------------------------------------------------------
  // 4. PRONUNCIATION (PR)
  // Intelligibility estimate & thought-group chunking
  // -------------------------------------------------------------
  const avgWordsPerSentence = totalWords / sentenceCount;
  const sentenceLengthVariance = Math.abs(avgWordsPerSentence - 14);
  const chunkingFactor = Math.max(0.4, 1.0 - (sentenceLengthVariance * 0.035));
  const thoughtGroupChunkingEstimate = Math.round(chunkingFactor * 100);

  const pauseImpact = Math.min(0.35, (pausesPerMin * 0.04));
  const hesitationImpact = Math.min(0.25, (hesitationsPerMin * 0.03));
  const intelligibilityEstimate = Math.max(45, Math.min(98, Math.round((chunkingFactor * 0.6 + (1.0 - pauseImpact - hesitationImpact) * 0.4) * 100)));

  let prScore = 5.0;
  if (intelligibilityEstimate >= 88) {
    prScore = intelligibilityEstimate >= 94 ? 9.0 : 8.5;
  } else if (intelligibilityEstimate >= 76) {
    prScore = intelligibilityEstimate >= 82 ? 8.0 : 7.5;
  } else if (intelligibilityEstimate >= 64) {
    prScore = intelligibilityEstimate >= 70 ? 6.5 : 6.0;
  } else if (intelligibilityEstimate >= 52) {
    prScore = 5.5;
  } else {
    prScore = 4.5;
  }

  const prFeedback = prScore >= 8.0
    ? `Natural phonological chunking (${thoughtGroupChunkingEstimate}% consistency) and high overall intelligibility (${intelligibilityEstimate}%).`
    : prScore >= 6.5
    ? `Clear pronunciation and mostly consistent thought-group pacing with minor cadence breaks.`
    : `Pronunciation pacing could be improved by chunking speech into rhythmic thought groups instead of isolated words.`;

  // -------------------------------------------------------------
  // OVERALL BAND SCORE (Official IELTS Rounding)
  // -------------------------------------------------------------
  const rawAverage = (fcScore + lrScore + graScore + prScore) / 4;
  const overallBand = roundIELTSBand(rawAverage);

  // -------------------------------------------------------------
  // ANNOTATED DIAGNOSTIC SUGGESTIONS
  // -------------------------------------------------------------
  const annotatedSuggestions: Array<{
    type: 'fluency' | 'lexical' | 'grammar' | 'pronunciation';
    originalText?: string;
    suggestion: string;
    reason: string;
  }> = [];

  if (hesitationCount > 3 || pausesCount > 4) {
    annotatedSuggestions.push({
      type: 'fluency',
      suggestion: 'Utilize filler discourse markers such as "That is an intriguing question..." or "In my estimation..."',
      reason: 'Replaces silent voids and vocalized hesitations with idiomatic academic signposting.'
    });
  }

  if (lowerTranscript.includes('very good') || lowerTranscript.includes('good')) {
    annotatedSuggestions.push({
      type: 'lexical',
      originalText: 'good / very good',
      suggestion: 'exemplary / indispensable / commendable / profoundly beneficial',
      reason: 'Elevates elementary adjectives to Band 8+ Academic Word List lexical standard.'
    });
  }

  if (lowerTranscript.includes('i think') || lowerTranscript.includes('i think that')) {
    annotatedSuggestions.push({
      type: 'lexical',
      originalText: 'I think that',
      suggestion: 'It is my firm conviction that / From my vantage point / One could contend that',
      reason: 'Varied stance markers project greater communicative nuance and formal register.'
    });
  }

  if (detectedSubordinatingConjunctions.length < 2) {
    annotatedSuggestions.push({
      type: 'grammar',
      suggestion: 'Integrate concessive clauses using "Although...", "Whereas...", or "In spite of the fact that..."',
      reason: 'Demonstrates Grammatical Range and complex clause coordination required for Band 7+.'
    });
  }

  if (thoughtGroupChunkingEstimate < 75) {
    annotatedSuggestions.push({
      type: 'pronunciation',
      suggestion: 'Practice pausing briefly at grammatical comma boundaries and prepositions rather than mid-clause.',
      reason: 'Aligns speech delivery with native-like thought-group rhythm and phonological chunking.'
    });
  }

  return {
    overallBand,
    wordCount: totalWords,
    wpm,
    durationSeconds: Math.round(duration),
    criteria: {
      fluencyAndCoherence: {
        score: fcScore,
        feedback: fcFeedback,
        wpm,
        continuityPenalty,
        pausesCount,
        hesitationCount
      },
      lexicalResource: {
        score: lrScore,
        feedback: lrFeedback,
        typeTokenRatio,
        awlWordsDetected,
        idiomaticPhrasesDetected
      },
      grammaticalRangeAndAccuracy: {
        score: graScore,
        feedback: graFeedback,
        complexClauseRatio,
        detectedSubordinatingConjunctions,
        detectedRelativePronouns
      },
      pronunciation: {
        score: prScore,
        feedback: prFeedback,
        intelligibilityEstimate,
        thoughtGroupChunkingEstimate
      }
    },
    annotatedSuggestions
  };
}
