// Typed Client API Service
import {
  KanjiStrokeData,
  SRSItem,
  WritingEvaluationResult,
  DiagnosticAnalytics,
  LevelCode,
  SpeakingDiagnosticEvaluationResult,
  SpeakingExamPackage,
  MasterExamPackageSummary,
  UserExamAttemptRecord,
  ExamBatteryTrajectoryResult,
  IELTSWritingTaskType,
  IELTSWritingPromptStimulus,
  SentenceAnnotation,
  DiagnosticScorecardResult,
  EssaySubmissionPayload
} from '../../shared/types';
import { AUTHENTIC_WRITING_PROMPTS, analyzeEssayLocally } from './data/writingPromptsData';

export const BASE_URL = '/api';

export async function fetchHealth(): Promise<{ status: string }> {
  const res = await fetch(`${BASE_URL}/health`);
  return res.json();
}

export async function fetchDashboard(userId = 'user_001'): Promise<any> {
  const res = await fetch(`${BASE_URL}/dashboard?userId=${userId}`);
  return res.json();
}

export async function switchUserTrack(newTrack: LevelCode, userId = 'user_001'): Promise<any> {
  const res = await fetch(`${BASE_URL}/dashboard/switch-track`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ newTrack, userId })
  });
  return res.json();
}

export async function fetchCurriculum(trackLevel: LevelCode): Promise<any> {
  const res = await fetch(`${BASE_URL}/curriculum?level=${trackLevel}`);
  return res.json();
}

export async function fetchLesson(lessonId: string): Promise<any> {
  const res = await fetch(`${BASE_URL}/curriculum/lessons/${lessonId}`);
  return res.json();
}

export async function fetchSRSQueue(userId = 'user_001'): Promise<{ count: number; items: SRSItem[] }> {
  const res = await fetch(`${BASE_URL}/srs/queue?userId=${userId}`);
  return res.json();
}

export async function submitSRSReview(srsItemId: string, grade: 1 | 2 | 3 | 4): Promise<any> {
  const res = await fetch(`${BASE_URL}/srs/review`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ srsItemId, grade })
  });
  return res.json();
}

export async function startSession(payload: {
  userId?: string;
  sessionType: string;
  trackCode: string;
  levelCode: string;
}): Promise<{ sessionId: string; startedAt: string }> {
  const res = await fetch(`${BASE_URL}/sessions/start`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return res.json();
}

export async function submitSession(
  sessionId: string,
  answers: Record<string, any>,
  timeSpentSec: number,
  isAbandoned?: boolean
): Promise<any> {
  const res = await fetch(`${BASE_URL}/sessions/${sessionId}/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answers, timeSpentSec, isAbandoned: !!isAbandoned })
  });
  return res.json();
}

export async function evaluateWritingEssay(essayText: string, taskType = 2, level = 'jlpt_n5'): Promise<WritingEvaluationResult> {
  const res = await fetch(`${BASE_URL}/studio/writing/evaluate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ essayText, taskType, level })
  });
  return res.json();
}

export async function fetchModelAnswer(level = 'jlpt_n5'): Promise<any> {
  const res = await fetch(`${BASE_URL}/studio/writing/model-answer?level=${level}`);
  return res.json();
}

export async function fetchWritingPrompt(level = 'jlpt_n5'): Promise<any> {
  const res = await fetch(`${BASE_URL}/studio/writing/prompt?level=${level}`);
  return res.json();
}

export async function fetchKanjiList(level?: string): Promise<any[]> {
  const res = await fetch(`${BASE_URL}/kanji${level ? `?level=${level}` : ''}`);
  return res.json();
}

export async function fetchKanjiCatalog(level?: string, search?: string, limit = 50, offset = 0): Promise<{
  total: number;
  limit: number;
  offset: number;
  stats: Record<string, number>;
  items: any[];
}> {
  const params = new URLSearchParams();
  if (level && level !== 'ALL') params.append('level', level);
  if (search) params.append('search', search);
  params.append('limit', String(limit));
  params.append('offset', String(offset));
  const res = await fetch(`${BASE_URL}/kanji/catalog?${params.toString()}`);
  return res.json();
}

export async function fetchJoyoDetail(character: string): Promise<any> {
  const res = await fetch(`${BASE_URL}/kanji/detail/${encodeURIComponent(character)}`);
  return res.json();
}

export async function scheduleKanjiSrs(character: string, pacing: 'SUSTAINABLE' | 'SPRINT' = 'SUSTAINABLE'): Promise<any> {
  const res = await fetch(`${BASE_URL}/kanji/schedule-srs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ character, pacing })
  });
  return res.json();
}

export async function fetchKanjiDetail(kanjiId: string): Promise<KanjiStrokeData> {
  const res = await fetch(`${BASE_URL}/kanji/${kanjiId}`);
  return res.json();
}


export async function saveKanjiAttempt(
  kanjiId: string,
  data: {
    userId?: string;
    mode: 'guided' | 'strict_memory';
    hitsujunOrderPct: number;
    geometrySimilarityPct: number;
    compositeScore: number;
    timeSpentSec: number;
  }
): Promise<any> {
  const res = await fetch(`${BASE_URL}/kanji/${kanjiId}/attempt`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function recordKanjiPractice(data: {
  userId?: string;
  character: string;
  syllabary?: string;
  kanjiId?: string;
  score?: number;
  timeSpentSec?: number;
  strokeCount?: number;
  strokeOrderCompliance?: number;
  geometrySimilarity?: number;
}): Promise<{
  success: boolean;
  sessionId: string;
  character: string;
  completedSessions: number;
  progressPct: number;
  streakDays: number;
  xpGained: number;
  message: string;
}> {
  const res = await fetch(`${BASE_URL}/kanji/record-practice`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function fetchMasteredCharacters(userId = 'user_001'): Promise<string[]> {
  try {
    const res = await fetch(`${BASE_URL}/kanji/mastered-characters?userId=${userId}`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    const characters: string[] = data.characters || data.masteredCharacters || [];
    try {
      const local = JSON.parse(localStorage.getItem('lingua_mastered_characters') || '[]');
      const combined = Array.from(new Set([...characters, ...local]));
      localStorage.setItem('lingua_mastered_characters', JSON.stringify(combined));
      return combined;
    } catch {
      return characters;
    }
  } catch (err) {
    console.warn('Fallback to local mastered characters', err);
    try {
      return JSON.parse(localStorage.getItem('lingua_mastered_characters') || '[]');
    } catch {
      return [];
    }
  }
}

export async function fetchAnalytics(userId = 'user_001'): Promise<DiagnosticAnalytics> {
  const res = await fetch(`${BASE_URL}/analytics?userId=${userId}`);
  return res.json();
}

// Speaking Studio APIs
export async function fetchSpeakingPackages(): Promise<{ packages: any[] }> {
  const res = await fetch(`${BASE_URL}/speaking/packages`);
  return res.json();
}

export async function fetchSpeakingPackage(packageId: string): Promise<{ package: SpeakingExamPackage }> {
  const res = await fetch(`${BASE_URL}/speaking/packages/${packageId}`);
  return res.json();
}

export async function evaluateSpeaking(payload: {
  transcript: string;
  durationSeconds: number;
  silentPausesCount?: number;
  hesitationCount?: number;
  packageId?: string;
  partNumber?: number;
  promptTitle?: string;
  userId?: string;
}): Promise<SpeakingDiagnosticEvaluationResult & { sessionId?: string }> {
  const res = await fetch(`${BASE_URL}/speaking/evaluate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return res.json();
}

export async function fetchListeningPackages(): Promise<any> {
  try {
    const res = await fetch(`${BASE_URL}/listening/packages`);
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Backend listening packages error, fallback', err);
  }
  return { status: 'ok', packages: [] };
}

export async function evaluateListening(payload: {
  packageId?: string;
  batteryMode: string;
  examType: string;
  answers: Record<number, string>;
  timeSpentSec: number;
}): Promise<any> {
  try {
    const res = await fetch(`${BASE_URL}/listening/evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      const data = await res.json();
      const ev = data.evaluation || data;
      const sectionScores = {
        1: { correct: ev.sectionalScores?.section1?.raw ?? ev.sectionScores?.[1]?.correct ?? 0, total: ev.sectionalScores?.section1?.total ?? ev.sectionScores?.[1]?.total ?? 10 },
        2: { correct: ev.sectionalScores?.section2?.raw ?? ev.sectionScores?.[2]?.correct ?? 0, total: ev.sectionalScores?.section2?.total ?? ev.sectionScores?.[2]?.total ?? 10 },
        3: { correct: ev.sectionalScores?.section3?.raw ?? ev.sectionScores?.[3]?.correct ?? 0, total: ev.sectionalScores?.section3?.total ?? ev.sectionScores?.[3]?.total ?? 10 },
        4: { correct: ev.sectionalScores?.section4?.raw ?? ev.sectionScores?.[4]?.correct ?? 0, total: ev.sectionalScores?.section4?.total ?? ev.sectionScores?.[4]?.total ?? 10 }
      };
      return {
        ...ev,
        rawScore: ev.rawScore,
        totalQuestions: ev.totalQuestions || 40,
        overallBand: ev.overallBand,
        cefrLevel: ev.cefrLevel,
        sectionScores,
        answers: payload.answers
      };
    }
  } catch (err) {
    console.warn('Backend listening evaluation error, fallback to client computation', err);
  }
  throw new Error('Fallback to local calculation');
}

// ==========================================
// Phase 3: Multi-Mock Exam API Service
// ==========================================

export const DEFAULT_EXAM_PACKAGES: Record<string, MasterExamPackageSummary[]> = {
  ielts_academic: [
    {
      id: 'ielts_acad_mock_01',
      levelCode: 'ielts_academic',
      packNumber: 1,
      titleEn: 'IELTS Academic Official Simulation Pack 1',
      titleId: 'Simulasi Resmi IELTS Akademik Paket 1',
      thematicFocusEn: 'Chronometry, Trophic Cascades & Bilingualism',
      thematicFocusId: 'Kronometri, Kaskade Trofik & Kedwibahasaan',
      difficultyTier: 'diagnostic',
      totalDurationMinutes: 60,
      passThresholdScore: 6.5,
      questionCount: 40
    },
    {
      id: 'ielts_acad_mock_02',
      levelCode: 'ielts_academic',
      packNumber: 2,
      titleEn: 'IELTS Academic Official Simulation Pack 2',
      titleId: 'Simulasi Resmi IELTS Akademik Paket 2',
      thematicFocusEn: 'Deep Tunnel Sewerage, Oceanic Paleoclimatology & High-Frequency Trading',
      thematicFocusId: 'Sistem Terowongan Pembuangan Dalam, Paleoklimatologi Laut & Perdagangan Frekuensi Tinggi',
      difficultyTier: 'standard',
      totalDurationMinutes: 60,
      passThresholdScore: 7.0,
      questionCount: 40
    },
    {
      id: 'ielts_acad_mock_03',
      levelCode: 'ielts_academic',
      packNumber: 3,
      titleEn: 'IELTS Academic Official Simulation Pack 3',
      titleId: 'Simulasi Resmi IELTS Akademik Paket 3',
      thematicFocusEn: 'Maize Domestication, Linguistic Relativity & Epigenetic Inheritance',
      thematicFocusId: 'Domestikasi Jagung Purba, Relativitas Linguistik & Warisan Epigenetika',
      difficultyTier: 'challenging',
      totalDurationMinutes: 60,
      passThresholdScore: 7.5,
      questionCount: 40
    },
    {
      id: 'ielts_acad_mock_04',
      levelCode: 'ielts_academic',
      packNumber: 4,
      titleEn: 'IELTS Academic Official Simulation Pack 4',
      titleId: 'Simulasi Resmi IELTS Akademik Paket 4',
      thematicFocusEn: 'Acoustic Ecology, Ancient Metallurgical Networks & Cognitive Neuromorphic AI',
      thematicFocusId: 'Ekologi Akustik, Jaringan Metalurgi Kuno & AI Neuromorfik Kognitif',
      difficultyTier: 'advanced',
      totalDurationMinutes: 60,
      passThresholdScore: 7.5,
      questionCount: 40
    },
    {
      id: 'ielts_acad_mock_05',
      levelCode: 'ielts_academic',
      packNumber: 5,
      titleEn: 'IELTS Academic Official Simulation Pack 5',
      titleId: 'Simulasi Resmi IELTS Akademik Paket 5',
      thematicFocusEn: 'Antarctic Glaciology, Urban Microclimate Thermodynamics & Quantum Metrology',
      thematicFocusId: 'Glasiologi Antartika, Termodinamika Perkotaan & Metrologi Kuantum',
      difficultyTier: 'mastery',
      totalDurationMinutes: 60,
      passThresholdScore: 8.0,
      questionCount: 40
    }
  ],
  ielts_general: [
    {
      id: 'ielts_gt_mock_01',
      levelCode: 'ielts_general',
      packNumber: 1,
      titleEn: 'IELTS General Training Mock Exam Pack 1',
      titleId: 'Simulasi Resmi IELTS General Training Paket 1',
      thematicFocusEn: 'DSE Workplace Ergonomics & Emergency HVAC Protocols',
      thematicFocusId: 'Ergonomi Tempat Kerja DSE & Protokol Darurat HVAC',
      difficultyTier: 'diagnostic',
      totalDurationMinutes: 60,
      passThresholdScore: 6.0,
      questionCount: 40
    },
    {
      id: 'ielts_gt_mock_02',
      levelCode: 'ielts_general',
      packNumber: 2,
      titleEn: 'IELTS General Training Mock Exam Pack 2',
      titleId: 'Simulasi Resmi IELTS General Training Paket 2',
      thematicFocusEn: 'Statutory Parental Leave Entitlements & HR Grievances',
      thematicFocusId: 'Hak Cuti Orang Tua Resmi & Prosedur Pengaduan HR',
      difficultyTier: 'standard',
      totalDurationMinutes: 60,
      passThresholdScore: 6.5,
      questionCount: 40
    },
    {
      id: 'ielts_gt_mock_03',
      levelCode: 'ielts_general',
      packNumber: 3,
      titleEn: 'IELTS General Training Mock Exam Pack 3',
      titleId: 'Simulasi Resmi IELTS General Training Paket 3',
      thematicFocusEn: 'Municipal Waste Sorting By-Laws & Public Transit Circulars',
      thematicFocusId: 'Peraturan Pemilahan Sampah Kotamadya & Edaran Transit Publik',
      difficultyTier: 'challenging',
      totalDurationMinutes: 60,
      passThresholdScore: 7.0,
      questionCount: 40
    },
    {
      id: 'ielts_gt_mock_04',
      levelCode: 'ielts_general',
      packNumber: 4,
      titleEn: 'IELTS General Training Mock Exam Pack 4',
      titleId: 'Simulasi Resmi IELTS General Training Paket 4',
      thematicFocusEn: 'Commercial Tenancy Lease Agreements & Workplace Mediation',
      thematicFocusId: 'Perjanjian Sewa Komersial & Mediasi Tempat Kerja',
      difficultyTier: 'advanced',
      totalDurationMinutes: 60,
      passThresholdScore: 7.5,
      questionCount: 40
    },
    {
      id: 'ielts_gt_mock_05',
      levelCode: 'ielts_general',
      packNumber: 5,
      titleEn: 'IELTS General Training Mock Exam Pack 5',
      titleId: 'Simulasi Resmi IELTS General Training Paket 5',
      thematicFocusEn: 'Occupational Safety Regulations & Environmental Compliance',
      thematicFocusId: 'Regulasi Keselamatan Kerja & Kepatuhan Lingkungan',
      difficultyTier: 'mastery',
      totalDurationMinutes: 60,
      passThresholdScore: 8.0,
      questionCount: 40
    }
  ],
  jlpt_n5: [
    {
      id: 'jlpt_n5_mock_01',
      levelCode: 'jlpt_n5',
      packNumber: 1,
      titleEn: 'JLPT N5 Official Simulation Pack 1',
      titleId: 'Simulasi Resmi JLPT N5 Paket 1',
      thematicFocusEn: 'Essential Verbal Conjugations & Campus Daily Schedules',
      thematicFocusId: 'Konjugasi Dasar Kata Kerja & Jadwal Harian Kampus',
      difficultyTier: 'diagnostic',
      totalDurationMinutes: 20,
      passThresholdScore: 80,
      questionCount: 25
    },
    {
      id: 'jlpt_n5_mock_02',
      levelCode: 'jlpt_n5',
      packNumber: 2,
      titleEn: 'JLPT N5 Official Simulation Pack 2',
      titleId: 'Simulasi Resmi JLPT N5 Paket 2',
      thematicFocusEn: 'Te-Form Chains, Sequential Actions & Department Store Shopping',
      thematicFocusId: 'Rangkaian Bentuk Te, Urutan Tindakan & Belanja Toserba',
      difficultyTier: 'standard',
      totalDurationMinutes: 25,
      passThresholdScore: 80,
      questionCount: 25
    },
    {
      id: 'jlpt_n5_mock_03',
      levelCode: 'jlpt_n5',
      packNumber: 3,
      titleEn: 'JLPT N5 Official Simulation Pack 3',
      titleId: 'Simulasi Resmi JLPT N5 Paket 3',
      thematicFocusEn: 'Short Notice Board Bulletins & Train Transfer Information',
      thematicFocusId: 'Papan Pengumuman Singkat & Informasi Transit Kereta',
      difficultyTier: 'challenging',
      totalDurationMinutes: 25,
      passThresholdScore: 90,
      questionCount: 25
    },
    {
      id: 'jlpt_n5_mock_04',
      levelCode: 'jlpt_n5',
      packNumber: 4,
      titleEn: 'JLPT N5 Official Simulation Pack 4',
      titleId: 'Simulasi Resmi JLPT N5 Paket 4',
      thematicFocusEn: 'Star Sentence Reordering (★) & Social Gathering Invitations',
      thematicFocusId: 'Rekonstruksi Kalimat Bintang (★) & Undangan Pertemuan',
      difficultyTier: 'advanced',
      totalDurationMinutes: 30,
      passThresholdScore: 95,
      questionCount: 25
    },
    {
      id: 'jlpt_n5_mock_05',
      levelCode: 'jlpt_n5',
      packNumber: 5,
      titleEn: 'JLPT N5 Official Simulation Pack 5',
      titleId: 'Simulasi Resmi JLPT N5 Paket 5',
      thematicFocusEn: 'Full-Length Standardized JEES Diagnostic Simulation',
      thematicFocusId: 'Simulasi Komprehensif Penuh Standar JEES N5',
      difficultyTier: 'mastery',
      totalDurationMinutes: 35,
      passThresholdScore: 100,
      questionCount: 30
    }
  ],
  jlpt_n4: [
    {
      id: 'jlpt_n4_mock_01',
      levelCode: 'jlpt_n4',
      packNumber: 1,
      titleEn: 'JLPT N4 Official Simulation Pack 1',
      titleId: 'Simulasi Resmi JLPT N4 Paket 1',
      thematicFocusEn: 'Complex Clause Connectors & Giving/Receiving Verbs',
      thematicFocusId: 'Penghubung Klausa Majemuk & Verba Memberi/Menerima',
      difficultyTier: 'diagnostic',
      totalDurationMinutes: 25,
      passThresholdScore: 90,
      questionCount: 25
    },
    {
      id: 'jlpt_n4_mock_02',
      levelCode: 'jlpt_n4',
      packNumber: 2,
      titleEn: 'JLPT N4 Official Simulation Pack 2',
      titleId: 'Simulasi Resmi JLPT N4 Paket 2',
      thematicFocusEn: 'Conditional Forms (〜たら, 〜ば) & Workplace Circulars',
      thematicFocusId: 'Bentuk Pengandaian & Surat Edaran Kerja',
      difficultyTier: 'standard',
      totalDurationMinutes: 30,
      passThresholdScore: 90,
      questionCount: 25
    },
    {
      id: 'jlpt_n4_mock_03',
      levelCode: 'jlpt_n4',
      packNumber: 3,
      titleEn: 'JLPT N4 Official Simulation Pack 3',
      titleId: 'Simulasi Resmi JLPT N4 Paket 3',
      thematicFocusEn: 'Daily Practical Notices & Neighborhood Waste Guidelines',
      thematicFocusId: 'Pengumuman Praktis Harian & Aturan Pemilahan Sampah',
      difficultyTier: 'challenging',
      totalDurationMinutes: 30,
      passThresholdScore: 95,
      questionCount: 25
    },
    {
      id: 'jlpt_n4_mock_04',
      levelCode: 'jlpt_n4',
      packNumber: 4,
      titleEn: 'JLPT N4 Official Simulation Pack 4',
      titleId: 'Simulasi Resmi JLPT N4 Paket 4',
      thematicFocusEn: 'Complex Sentence Synthesis & Star Drills (★)',
      thematicFocusId: 'Sintesis Kalimat Majemuk & Latihan Bintang (★)',
      difficultyTier: 'advanced',
      totalDurationMinutes: 35,
      passThresholdScore: 100,
      questionCount: 25
    },
    {
      id: 'jlpt_n4_mock_05',
      levelCode: 'jlpt_n4',
      packNumber: 5,
      titleEn: 'JLPT N4 Official Simulation Pack 5',
      titleId: 'Simulasi Resmi JLPT N4 Paket 5',
      thematicFocusEn: 'Full Standardized JEES N4 Simulation',
      thematicFocusId: 'Simulasi Standar Penuh JEES N4',
      difficultyTier: 'mastery',
      totalDurationMinutes: 40,
      passThresholdScore: 105,
      questionCount: 30
    }
  ],
  jlpt_n3: [
    {
      id: 'jlpt_n3_mock_01',
      levelCode: 'jlpt_n3',
      packNumber: 1,
      titleEn: 'JLPT N3 Official Simulation Pack 1',
      titleId: 'Simulasi Resmi JLPT N3 Paket 1',
      thematicFocusEn: 'Nuanced Contrastive Grammar & Intermediate Modality',
      thematicFocusId: 'Tata Bahasa Kontras Bernuansa & Modalitas Menengah',
      difficultyTier: 'diagnostic',
      totalDurationMinutes: 30,
      passThresholdScore: 95,
      questionCount: 28
    },
    {
      id: 'jlpt_n3_mock_02',
      levelCode: 'jlpt_n3',
      packNumber: 2,
      titleEn: 'JLPT N3 Official Simulation Pack 2',
      titleId: 'Simulasi Resmi JLPT N3 Paket 2',
      thematicFocusEn: 'Passive, Causative & Formal Written Registers',
      thematicFocusId: 'Bentuk Pasif, Kausatif & Ragam Tulis Formal',
      difficultyTier: 'standard',
      totalDurationMinutes: 35,
      passThresholdScore: 95,
      questionCount: 28
    },
    {
      id: 'jlpt_n3_mock_03',
      levelCode: 'jlpt_n3',
      packNumber: 3,
      titleEn: 'JLPT N3 Official Simulation Pack 3',
      titleId: 'Simulasi Resmi JLPT N3 Paket 3',
      thematicFocusEn: 'Editorial Articles & Complex Paragraph Cohesion',
      thematicFocusId: 'Artikel Tajuk Rencana & Kohesi Paragraf Kompleks',
      difficultyTier: 'challenging',
      totalDurationMinutes: 35,
      passThresholdScore: 100,
      questionCount: 28
    },
    {
      id: 'jlpt_n3_mock_04',
      levelCode: 'jlpt_n3',
      packNumber: 4,
      titleEn: 'JLPT N3 Official Simulation Pack 4',
      titleId: 'Simulasi Resmi JLPT N3 Paket 4',
      thematicFocusEn: 'Advanced Sentence Order (★) & Conversational Subtleties',
      thematicFocusId: 'Urutan Kalimat Lanjutan (★) & Nuansa Percakapan',
      difficultyTier: 'advanced',
      totalDurationMinutes: 40,
      passThresholdScore: 105,
      questionCount: 28
    },
    {
      id: 'jlpt_n3_mock_05',
      levelCode: 'jlpt_n3',
      packNumber: 5,
      titleEn: 'JLPT N3 Official Simulation Pack 5',
      titleId: 'Simulasi Resmi JLPT N3 Paket 5',
      thematicFocusEn: 'Full Official N3 JEES Examination Simulation',
      thematicFocusId: 'Simulasi Resmi Ujian JEES N3 Lengkap',
      difficultyTier: 'mastery',
      totalDurationMinutes: 45,
      passThresholdScore: 110,
      questionCount: 32
    }
  ],
  jlpt_n2: [
    {
      id: 'jlpt_n2_mock_01',
      levelCode: 'jlpt_n2',
      packNumber: 1,
      titleEn: 'JLPT N2 Official Simulation Pack 1',
      titleId: 'Simulasi Resmi JLPT N2 Paket 1',
      thematicFocusEn: 'Professional Keigo Registers & Business Communication',
      thematicFocusId: 'Ragam Keigo Profesional & Komunikasi Bisnis',
      difficultyTier: 'diagnostic',
      totalDurationMinutes: 35,
      passThresholdScore: 90,
      questionCount: 30
    },
    {
      id: 'jlpt_n2_mock_02',
      levelCode: 'jlpt_n2',
      packNumber: 2,
      titleEn: 'JLPT N2 Official Simulation Pack 2',
      titleId: 'Simulasi Resmi JLPT N2 Paket 2',
      thematicFocusEn: 'Formal Discourse Markers & Abstract Exposition',
      thematicFocusId: 'Penanda Wacana Formal & Eksposisi Abstrak',
      difficultyTier: 'standard',
      totalDurationMinutes: 40,
      passThresholdScore: 95,
      questionCount: 30
    },
    {
      id: 'jlpt_n2_mock_03',
      levelCode: 'jlpt_n2',
      packNumber: 3,
      titleEn: 'JLPT N2 Official Simulation Pack 3',
      titleId: 'Simulasi Resmi JLPT N2 Paket 3',
      thematicFocusEn: 'Critical Essay Argumentation & Editorial Critiques',
      thematicFocusId: 'Argumentasi Esai Kritis & Kritik Redaksional',
      difficultyTier: 'challenging',
      totalDurationMinutes: 45,
      passThresholdScore: 100,
      questionCount: 30
    },
    {
      id: 'jlpt_n2_mock_04',
      levelCode: 'jlpt_n2',
      packNumber: 4,
      titleEn: 'JLPT N2 Official Simulation Pack 4',
      titleId: 'Simulasi Resmi JLPT N2 Paket 4',
      thematicFocusEn: 'High-Speed Academic Listening & Dokkai Synthesis',
      thematicFocusId: 'Menyimak Akademik Cepat & Sintesis Dokkai',
      difficultyTier: 'advanced',
      totalDurationMinutes: 45,
      passThresholdScore: 105,
      questionCount: 30
    },
    {
      id: 'jlpt_n2_mock_05',
      levelCode: 'jlpt_n2',
      packNumber: 5,
      titleEn: 'JLPT N2 Official Simulation Pack 5',
      titleId: 'Simulasi Resmi JLPT N2 Paket 5',
      thematicFocusEn: 'Full Official N2 JEES Exam Benchmark',
      thematicFocusId: 'Tolok Ukur Ujian Resmi Penuh JEES N2',
      difficultyTier: 'mastery',
      totalDurationMinutes: 50,
      passThresholdScore: 110,
      questionCount: 35
    }
  ],
  jlpt_n1: [
    {
      id: 'jlpt_n1_mock_01',
      levelCode: 'jlpt_n1',
      packNumber: 1,
      titleEn: 'JLPT N1 Official Simulation Pack 1',
      titleId: 'Simulasi Resmi JLPT N1 Paket 1',
      thematicFocusEn: 'Supreme Literary Syntactic Ordering & Classical Registers',
      thematicFocusId: 'Rekonstruksi Sintaksis Sastra Puncak & Ragam Klasik',
      difficultyTier: 'diagnostic',
      totalDurationMinutes: 40,
      passThresholdScore: 100,
      questionCount: 32
    },
    {
      id: 'jlpt_n1_mock_02',
      levelCode: 'jlpt_n1',
      packNumber: 2,
      titleEn: 'JLPT N1 Official Simulation Pack 2',
      titleId: 'Simulasi Resmi JLPT N1 Paket 2',
      thematicFocusEn: 'Philosophical Discourse & Abstract Epistemology',
      thematicFocusId: 'Wacana Filosofis & Epistemologi Abstrak',
      difficultyTier: 'standard',
      totalDurationMinutes: 45,
      passThresholdScore: 100,
      questionCount: 32
    },
    {
      id: 'jlpt_n1_mock_03',
      levelCode: 'jlpt_n1',
      packNumber: 3,
      titleEn: 'JLPT N1 Official Simulation Pack 3',
      titleId: 'Simulasi Resmi JLPT N1 Paket 3',
      thematicFocusEn: 'Socio-Legal Commentaries & Juridical Critiques',
      thematicFocusId: 'Komentar Sosio-Hukum & Kritik Yuridis',
      difficultyTier: 'challenging',
      totalDurationMinutes: 50,
      passThresholdScore: 105,
      questionCount: 32
    },
    {
      id: 'jlpt_n1_mock_04',
      levelCode: 'jlpt_n1',
      packNumber: 4,
      titleEn: 'JLPT N1 Official Simulation Pack 4',
      titleId: 'Simulasi Resmi JLPT N1 Paket 4',
      thematicFocusEn: 'Advanced Cultural Discourse & High Cognitive Chokai',
      thematicFocusId: 'Wacana Kultural Lanjut & Chokai Kognitif Tinggi',
      difficultyTier: 'advanced',
      totalDurationMinutes: 50,
      passThresholdScore: 110,
      questionCount: 32
    },
    {
      id: 'jlpt_n1_mock_05',
      levelCode: 'jlpt_n1',
      packNumber: 5,
      titleEn: 'JLPT N1 Official Simulation Pack 5',
      titleId: 'Simulasi Resmi JLPT N1 Paket 5',
      thematicFocusEn: 'Full Official N1 JEES Mastery Simulation',
      thematicFocusId: 'Simulasi Penguasaan Mutlak Resmi JEES N1',
      difficultyTier: 'mastery',
      totalDurationMinutes: 55,
      passThresholdScore: 115,
      questionCount: 35
    }
  ]
};

function getLocalStoredAttempts(): UserExamAttemptRecord[] {
  try {
    const raw = localStorage.getItem('lingua_user_exam_attempts');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalStoredAttempt(attempt: UserExamAttemptRecord) {
  try {
    const existing = getLocalStoredAttempts();
    const updated = [attempt, ...existing.filter(a => a.id !== attempt.id)];
    localStorage.setItem('lingua_user_exam_attempts', JSON.stringify(updated));
  } catch (err) {
    console.warn('Failed to save attempt to localStorage', err);
  }
}

export async function fetchExamPackages(track: LevelCode): Promise<{ packages: MasterExamPackageSummary[] }> {
  try {
    const res = await fetch(`${BASE_URL}/exams/packages?track=${track}`);
    if (res.ok) {
      const data = await res.json();
      if (data.packages && data.packages.length > 0) {
        return data;
      }
    }
  } catch (err) {
    console.warn('Backend fetchExamPackages error, fallback to defaults', err);
  }

  // Fallback defaults decorated with local attempts
  const basePackages = DEFAULT_EXAM_PACKAGES[track] || DEFAULT_EXAM_PACKAGES.ielts_academic;
  const attempts = getLocalStoredAttempts().filter(a => a.levelCode === track);

  const decorated = basePackages.map(pkg => {
    const pkgAttempts = attempts.filter(a => a.packageId === pkg.id || a.packNumber === pkg.packNumber);
    if (pkgAttempts.length > 0) {
      const best = pkgAttempts.reduce((prev, curr) => curr.scaledScore > prev.scaledScore ? curr : prev, pkgAttempts[0]);
      return {
        ...pkg,
        completed: true,
        bestScore: best.scaledScore,
        bestBand: best.scaledScore,
        lastAttemptAt: best.completedAt
      };
    }
    return pkg;
  });

  return { packages: decorated };
}

export async function fetchExamPackageById(packageId: string): Promise<any> {
  try {
    const res = await fetch(`${BASE_URL}/exams/packages/${packageId}`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Backend fetchExamPackageById error, fallback', err);
  }

  // Fallback: If it's an IELTS mock package, map to lesson or mock items
  if (packageId.startsWith('ielts_acad_mock') || packageId === 'les_ia_mock_full_1') {
    return {
      package: {
        id: packageId,
        titleEn: 'Official Computer-Delivered IELTS Academic Practice Exam',
        titleId: 'Ujian Resmi Computer-Delivered IELTS Akademik',
        levelCode: 'ielts_academic',
        totalDurationMinutes: 60,
        questionCount: 40
      }
    };
  }

  return {
    package: {
      id: packageId,
      levelCode: 'jlpt_n5',
      totalDurationMinutes: 25,
      questionCount: 25
    }
  };
}

export async function submitExamAttempt(payload: {
  packageId: string;
  levelCode: LevelCode;
  packNumber: number;
  rawScore: number;
  totalQuestions: number;
  scaledScore: number;
  passed: boolean;
  sectionalBreakdown: Record<string, { correct: number; total: number; percentage: number }>;
  timeSpentSeconds: number;
}): Promise<UserExamAttemptRecord> {
  const record: UserExamAttemptRecord = {
    id: `attempt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    userId: 'default_user',
    packageId: payload.packageId,
    levelCode: payload.levelCode,
    packNumber: payload.packNumber,
    rawScore: payload.rawScore,
    totalQuestions: payload.totalQuestions,
    scaledScore: payload.scaledScore,
    passed: payload.passed,
    sectionalBreakdown: payload.sectionalBreakdown,
    timeSpentSeconds: payload.timeSpentSeconds,
    completedAt: new Date().toISOString()
  };

  saveLocalStoredAttempt(record);

  try {
    const res = await fetch(`${BASE_URL}/exams/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record)
    });
    if (res.ok) {
      const serverResult = await res.json();
      return serverResult.attempt || serverResult || record;
    }
  } catch (err) {
    console.warn('Backend submitExamAttempt error, saved locally', err);
  }

  return record;
}

export async function fetchExamTrajectory(track: LevelCode): Promise<ExamBatteryTrajectoryResult> {
  try {
    const res = await fetch(`${BASE_URL}/exams/trajectory?track=${track}`);
    if (res.ok) {
      const data = await res.json();
      if (data && (data.attempts || data.weightedReadinessIndex !== undefined)) {
        return data;
      }
    }
  } catch (err) {
    console.warn('Backend fetchExamTrajectory error, calculating locally', err);
  }

  // Local calculation based on recorded attempts
  const allAttempts = getLocalStoredAttempts()
    .filter(a => a.levelCode === track)
    .sort((a, b) => new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime());

  const isIelts = track.startsWith('ielts');
  const targetThreshold = isIelts ? 7.0 : (track === 'jlpt_n5' ? 80 : 90);

  if (allAttempts.length === 0) {
    return {
      attempts: [],
      weightedReadinessIndex: 0,
      readinessMargin: 0,
      targetThreshold,
      predictedScore: 0,
      totalAttemptsCount: 0,
      progressionTrend: 'stable'
    };
  }

  const K = allAttempts.length;
  // Exponential recency weighting: w_k = e^(0.5*(k-1)) / sum(e^(0.5*(j-1)))
  let sumWeight = 0;
  const weights: number[] = [];
  for (let k = 0; k < K; k++) {
    const w = Math.exp(0.5 * k);
    weights.push(w);
    sumWeight += w;
  }

  let weightedSum = 0;
  for (let k = 0; k < K; k++) {
    const normWeight = weights[k] / sumWeight;
    weightedSum += normWeight * allAttempts[k].scaledScore;
  }

  let finalWRI = weightedSum;
  if (isIelts) {
    // Standard IELTS 0.25/0.75 rounding
    const floor = Math.floor(finalWRI);
    const frac = finalWRI - floor;
    if (frac < 0.25) finalWRI = floor;
    else if (frac < 0.75) finalWRI = floor + 0.5;
    else finalWRI = floor + 1.0;
  } else {
    finalWRI = Math.round(finalWRI);
  }

  const margin = isIelts
    ? Math.round((finalWRI - targetThreshold) * 10) / 10
    : Math.round(finalWRI - targetThreshold);

  const firstScore = allAttempts[0].scaledScore;
  const lastScore = allAttempts[K - 1].scaledScore;
  let trend: 'ascending' | 'stable' | 'needs_reinforcement' = 'stable';
  if (lastScore > firstScore + (isIelts ? 0.25 : 5)) {
    trend = 'ascending';
  } else if (lastScore < firstScore - (isIelts ? 0.25 : 5)) {
    trend = 'needs_reinforcement';
  }

  return {
    attempts: allAttempts,
    weightedReadinessIndex: finalWRI,
    readinessMargin: margin,
    targetThreshold,
    predictedScore: finalWRI,
    totalAttemptsCount: K,
    progressionTrend: trend
  };
}

// ==========================================
// ==========================================
// Phase 4: Production Writing Studio API
// ==========================================

export async function fetchWritingPrompts(taskType?: IELTSWritingTaskType | string): Promise<{ prompts: IELTSWritingPromptStimulus[] }> {
  try {
    const url = taskType ? `${BASE_URL}/writing/prompts?taskType=${encodeURIComponent(taskType)}` : `${BASE_URL}/writing/prompts`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      if (data.prompts && data.prompts.length > 0) return data;
    }
  } catch (err) {
    console.warn('Backend fetchWritingPrompts error, fallback to defaults', err);
  }

  const filtered = taskType
    ? AUTHENTIC_WRITING_PROMPTS.filter(p => p.taskType === taskType)
    : AUTHENTIC_WRITING_PROMPTS;
  return { prompts: filtered };
}

export async function fetchWritingPromptById(id: string): Promise<{ prompt: IELTSWritingPromptStimulus }> {
  try {
    const res = await fetch(`${BASE_URL}/writing/prompts/${encodeURIComponent(id)}`);
    if (res.ok) {
      const data = await res.json();
      if (data.prompt) return data;
    }
  } catch (err) {
    console.warn('Backend fetchWritingPromptById error, fallback to defaults', err);
  }
  const prompt = AUTHENTIC_WRITING_PROMPTS.find(p => p.promptId === id) || AUTHENTIC_WRITING_PROMPTS[0];
  return { prompt };
}

export async function evaluateWritingSubmission(payload: EssaySubmissionPayload): Promise<DiagnosticScorecardResult> {
  try {
    const res = await fetch(`${BASE_URL}/writing/evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      const data = await res.json();
      if (data.overallBand !== undefined) {
        saveLocalWritingSubmission(data);
        return data;
      }
    }
  } catch (err) {
    console.warn('Backend evaluateWritingSubmission error, analyzing locally', err);
  }

  const prompt = AUTHENTIC_WRITING_PROMPTS.find(p => p.promptId === payload.promptId) || AUTHENTIC_WRITING_PROMPTS[0];
  const localResult = analyzeEssayLocally(payload, prompt);
  saveLocalWritingSubmission(localResult);
  return localResult;
}

export async function submitWritingEssayForDiagnostic(payload: EssaySubmissionPayload): Promise<DiagnosticScorecardResult> {
  return evaluateWritingSubmission(payload);
}

function getLocalWritingSubmissions(): DiagnosticScorecardResult[] {
  try {
    const raw = localStorage.getItem('lingua_writing_submissions');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalWritingSubmission(result: DiagnosticScorecardResult) {
  try {
    const existing = getLocalWritingSubmissions();
    const updated = [result, ...existing.filter(s => s.submissionId !== result.submissionId)];
    localStorage.setItem('lingua_writing_submissions', JSON.stringify(updated));
  } catch (err) {
    console.warn('Failed to save writing submission to localStorage', err);
  }
}

export async function fetchWritingSubmissions(userId = 'user_001'): Promise<{ submissions: any[] }> {
  try {
    const res = await fetch(`${BASE_URL}/writing/submissions?userId=${encodeURIComponent(userId)}`);
    if (res.ok) {
      const data = await res.json();
      if (data.submissions) return data;
    }
  } catch (err) {
    console.warn('Backend fetchWritingSubmissions error, fallback to local', err);
  }
  return { submissions: getLocalWritingSubmissions() };
}

export async function fetchWritingSubmissionById(id: string): Promise<any> {
  try {
    const res = await fetch(`${BASE_URL}/writing/submissions/${encodeURIComponent(id)}`);
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Backend fetchWritingSubmissionById error', err);
  }
  const local = getLocalWritingSubmissions().find(s => s.submissionId === id);
  return local || null;
}
