// Master Aggregation & Database Seeder for Multi-Mock Exam Batteries (Packs 1-5)
// Dual-Track (IELTS Academic, IELTS General, and JLPT N5-N1)
// Conforming to DOMAIN_BLUEPRINT.md §5.1.7, §5.2.10, §3.2.7

import { Database as BetterSqliteDatabase } from 'better-sqlite3';
import { IELTS_ACADEMIC_PACKS_SEED } from './ieltsAcademicMockSeeds';
import { IELTS_GENERAL_PACKS_SEED } from './ieltsGeneralMockSeeds';
import { ALL_JLPT_PACKS_SEED } from './jlptMockSeeds';
import { ExamPackageContent } from '../../types';

export const ALL_EXAM_PACKAGES_SEED: ExamPackageContent[] = [
  ...IELTS_ACADEMIC_PACKS_SEED,
  ...IELTS_GENERAL_PACKS_SEED,
  ...ALL_JLPT_PACKS_SEED
];

export interface InitialUserAttemptSeed {
  id: string;
  userId: string;
  packageId: string;
  levelCode: string;
  packNumber: number;
  rawScore: number;
  totalQuestions: number;
  scaledScore: number;
  passed: number;
  sectionalBreakdown: Record<string, any>;
  timeSpentSeconds: number;
  completedAt: string;
}

// Initial attempt trajectory for user_001 (USER_FLOWS.md Scenario 60)
// Pack 1: Band 6.5 -> Pack 2: Band 7.0 -> Pack 3: Band 7.5 (WRI 7.18 => Band 7.5, Headroom +0.5)
export const INITIAL_USER_ATTEMPTS_SEED: InitialUserAttemptSeed[] = [
  {
    id: 'att_seed_ia_01',
    userId: 'user_001',
    packageId: 'ielts_acad_mock_01',
    levelCode: 'ielts_academic',
    packNumber: 1,
    rawScore: 28,
    totalQuestions: 40,
    scaledScore: 6.5,
    passed: 0,
    sectionalBreakdown: {
      section_1: { correct: 10, total: 13, score: 10 },
      section_2: { correct: 9, total: 13, score: 9 },
      section_3: { correct: 9, total: 14, score: 9 }
    },
    timeSpentSeconds: 3420,
    completedAt: '2026-11-10 14:30:00'
  },
  {
    id: 'att_seed_ia_02',
    userId: 'user_001',
    packageId: 'ielts_acad_mock_02',
    levelCode: 'ielts_academic',
    packNumber: 2,
    rawScore: 31,
    totalQuestions: 40,
    scaledScore: 7.0,
    passed: 0,
    sectionalBreakdown: {
      section_1: { correct: 11, total: 13, score: 11 },
      section_2: { correct: 10, total: 13, score: 10 },
      section_3: { correct: 10, total: 14, score: 10 }
    },
    timeSpentSeconds: 3280,
    completedAt: '2026-11-17 16:15:00'
  },
  {
    id: 'att_seed_ia_03',
    userId: 'user_001',
    packageId: 'ielts_acad_mock_03',
    levelCode: 'ielts_academic',
    packNumber: 3,
    rawScore: 34,
    totalQuestions: 40,
    scaledScore: 7.5,
    passed: 1,
    sectionalBreakdown: {
      section_1: { correct: 12, total: 13, score: 12 },
      section_2: { correct: 11, total: 13, score: 11 },
      section_3: { correct: 11, total: 14, score: 11 }
    },
    timeSpentSeconds: 3150,
    completedAt: '2026-11-23 10:45:00'
  },
  // JLPT N2 initial baseline attempt
  {
    id: 'att_seed_jlpt_n2_01',
    userId: 'user_001',
    packageId: 'jlpt_n2_mock_pack_01',
    levelCode: 'jlpt_n2',
    packNumber: 1,
    rawScore: 26,
    totalQuestions: 40,
    scaledScore: 117,
    passed: 1,
    sectionalBreakdown: {
      section_1: { correct: 18, total: 25, score: 43 },
      section_2: { correct: 8, total: 15, score: 38 }
    },
    timeSpentSeconds: 5400,
    completedAt: '2026-11-15 11:00:00'
  }
];

export function seedExamPackages(db: BetterSqliteDatabase) {
  console.log(`Seeding ${ALL_EXAM_PACKAGES_SEED.length} official Multi-Mock Exam Batteries (Packs 1-5)...`);

  const insertStmt = db.prepare(`
    INSERT INTO exam_packages (
      id, level_code, pack_number, title_en, title_id,
      thematic_focus_en, thematic_focus_id, difficulty_tier,
      total_duration_minutes, pass_threshold_score, total_questions,
      package_data_json
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const pkg of ALL_EXAM_PACKAGES_SEED) {
    insertStmt.run(
      pkg.id,
      pkg.levelCode,
      pkg.packNumber,
      pkg.titleEn,
      pkg.titleId,
      pkg.thematicFocusEn,
      pkg.thematicFocusId,
      pkg.difficultyTier,
      pkg.totalDurationMinutes,
      pkg.passThresholdScore,
      pkg.totalQuestions,
      JSON.stringify(pkg)
    );
  }

  console.log(`Seeding ${INITIAL_USER_ATTEMPTS_SEED.length} user attempt trajectory records for user_001...`);
  const insertAttemptStmt = db.prepare(`
    INSERT INTO user_exam_attempts (
      id, user_id, package_id, level_code, pack_number,
      raw_score, total_questions, scaled_score, passed,
      sectional_breakdown, time_spent_seconds, completed_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const att of INITIAL_USER_ATTEMPTS_SEED) {
    insertAttemptStmt.run(
      att.id,
      att.userId,
      att.packageId,
      att.levelCode,
      att.packNumber,
      att.rawScore,
      att.totalQuestions,
      att.scaledScore,
      att.passed,
      JSON.stringify(att.sectionalBreakdown),
      att.timeSpentSeconds,
      att.completedAt
    );
  }

  console.log('Multi-Mock Exam Batteries and attempt trajectories seeded successfully.');
}
