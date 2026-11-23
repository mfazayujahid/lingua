// Typed Client API Service
import {
  KanjiStrokeData,
  SRSItem,
  WritingEvaluationResult,
  DiagnosticAnalytics,
  LevelCode,
  SpeakingDiagnosticEvaluationResult,
  SpeakingExamPackage
} from '../../shared/types';

const BASE_URL = '/api';

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
