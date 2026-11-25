// Master Aggregation & Database Seeder for Authentic JLPT Exam Batteries (N5 to N1, Packs 1-5)
// Sourced from authentic, domain-calibrated question bank in jlptMockBank.ts
// Conforming to docs/SPEC.md §1-6 and docs/DOMAIN_BLUEPRINT.md §5.2

import { ExamPackageContent } from '../../types';
import { getJLPTMockPackage, JLPTLevelTier } from '../../data/jlptMockBank';

export function createJLPTExamPackages(): ExamPackageContent[] {
  const tiers: JLPTLevelTier[] = ['n5', 'n4', 'n3', 'n2', 'n1'];
  const packages: ExamPackageContent[] = [];

  for (const tier of tiers) {
    for (let packNum = 1; packNum <= 5; packNum++) {
      const p = getJLPTMockPackage(tier, packNum);
      packages.push({
        id: p.id,
        levelCode: p.levelCode,
        packNumber: p.packNumber,
        titleEn: p.titleEn,
        titleId: p.titleId,
        thematicFocusEn: p.thematicFocusEn,
        thematicFocusId: p.thematicFocusId,
        difficultyTier: packNum === 1 ? 'diagnostic_baseline' : packNum === 5 ? 'mastery' : 'standard',
        totalDurationMinutes: p.totalDurationMinutes,
        passThresholdScore: p.passThresholdScore,
        totalQuestions: p.questions.length,
        passages: p.passages.map(pas => ({
          id: pas.id,
          partNumber: pas.partNumber || 1,
          title: pas.titleJp || pas.titleEn,
          titleJp: pas.titleJp,
          titleEn: pas.titleEn,
          titleId: pas.titleId || pas.titleEn,
          wordCount: (pas.textJp || '').length,
          text: pas.textJp,
          textJp: pas.textJp,
          textB: pas.textB
        })),
        questions: p.questions.map(q => ({
          id: q.id,
          questionNumber: q.questionNumber,
          sectionNumber: q.sessionNumber || 1,
          sessionNumber: q.sessionNumber || 1,
          mondaiNumber: q.mondaiNumber,
          mondaiTitleJp: q.mondaiTitleJp,
          mondaiTitleId: q.mondaiTitleId,
          sectionCategory: q.sectionCategory,
          itemType: q.itemType,
          prompt: q.prompt,
          stimulusText: q.stimulusText,
          passageId: q.passageId,
          scrambledChunks: q.scrambledChunks,
          starPosition: q.starPosition,
          options: q.options,
          correctAnswer: String(q.correctAnswer),
          explanation: q.explanation,
          explanationId: q.explanationId
        }))
      });
    }
  }

  return packages;
}

export const ALL_JLPT_PACKS_SEED: ExamPackageContent[] = createJLPTExamPackages();
export const JLPT_N5_PACKS_SEED = ALL_JLPT_PACKS_SEED.filter(p => p.levelCode === 'jlpt_n5');
export const JLPT_N4_PACKS_SEED = ALL_JLPT_PACKS_SEED.filter(p => p.levelCode === 'jlpt_n4');
export const JLPT_N3_PACKS_SEED = ALL_JLPT_PACKS_SEED.filter(p => p.levelCode === 'jlpt_n3');
export const JLPT_N2_PACKS_SEED = ALL_JLPT_PACKS_SEED.filter(p => p.levelCode === 'jlpt_n2');
export const JLPT_N1_PACKS_SEED = ALL_JLPT_PACKS_SEED.filter(p => p.levelCode === 'jlpt_n1');
