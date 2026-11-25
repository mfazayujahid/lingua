import React, { useState, useEffect } from 'react';
import { LevelCode, MasterExamPackageSummary } from '../../../shared/types';
import { fetchExamPackages, fetchExamPackageById, BASE_URL, DEFAULT_EXAM_PACKAGES } from '../api';
import {
  JLPT_LEVEL_SPECS,
  JLPTLevelTier,
  JLPTFullExamPackage,
  getJLPTMockPackage
} from '../data/jlptMockBank';
import {
  Clock,
  Award,
  ShieldAlert,
  Play,
  BookOpen,
  Headphones,
  CheckCircle2,
  Sparkles,
  Layers,
  Eye,
  Timer,
  SlidersHorizontal
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface JLPTExamHubViewProps {
  activeTrack: LevelCode;
  onStartExam: (pkg: JLPTFullExamPackage, mode: 'strict' | 'practice') => void;
  onOpenLessonDrill?: () => void;
}

const TIER_ORDER: JLPTLevelTier[] = ['n5', 'n4', 'n3', 'n2', 'n1'];

export const JLPTExamHubView: React.FC<JLPTExamHubViewProps> = ({
  activeTrack,
  onStartExam,
  onOpenLessonDrill
}) => {
  const { t, language } = useLanguage();

  const extractTier = (track: LevelCode): JLPTLevelTier => {
    const lower = String(track).toLowerCase();
    if (lower.includes('n1')) return 'n1';
    if (lower.includes('n2')) return 'n2';
    if (lower.includes('n3')) return 'n3';
    if (lower.includes('n4')) return 'n4';
    return 'n5';
  };

  const [selectedTier, setSelectedTier] = useState<JLPTLevelTier>(() => extractTier(activeTrack));
  const [selectedPackNumber, setSelectedPackNumber] = useState<number>(1);
  const [examMode, setExamMode] = useState<'strict' | 'practice'>('strict');
  const [packagesByTier, setPackagesByTier] = useState<Record<string, MasterExamPackageSummary[]>>({});
  const [loadingPacks, setLoadingPacks] = useState<boolean>(false);
  const [launching, setLaunching] = useState<boolean>(false);

  // Sync default tier when user switches activeTrack in Navbar
  useEffect(() => {
    setSelectedTier(extractTier(activeTrack));
  }, [activeTrack]);

  // Dynamic fetching from GET /api/exams/packages?track=jlpt and per-tier packages
  useEffect(() => {
    let isMounted = true;
    const loadAllPackages = async () => {
      setLoadingPacks(true);
      try {
        // Explicit query against /api/exams/packages?track=jlpt per contract
        const aggregateRes = await fetch(`${BASE_URL}/exams/packages?track=jlpt`).catch(() => null);
        if (aggregateRes && aggregateRes.ok) {
          const data = await aggregateRes.json();
          if (isMounted && Array.isArray(data?.packages) && data.packages.length > 0) {
            const grouped: Record<string, MasterExamPackageSummary[]> = {};
            data.packages.forEach((p: MasterExamPackageSummary) => {
              const key = String(p.levelCode).toLowerCase();
              if (!grouped[key]) grouped[key] = [];
              grouped[key].push(p);
            });
            setPackagesByTier(prev => ({ ...prev, ...grouped }));
          }
        }

        // Also fetch active tier packages specifically for attempt summaries
        const tierCode = `jlpt_${selectedTier}` as LevelCode;
        const tierRes = await fetchExamPackages(tierCode);
        if (isMounted && tierRes?.packages?.length > 0) {
          setPackagesByTier(prev => ({ ...prev, [tierCode]: tierRes.packages }));
        }
      } catch (err) {
        console.warn('JLPT Hub dynamic package fetch fallback active:', err);
      } finally {
        if (isMounted) setLoadingPacks(false);
      }
    };

    loadAllPackages();
    return () => {
      isMounted = false;
    };
  }, [selectedTier]);

  const currentSpec = JLPT_LEVEL_SPECS[selectedTier];
  const currentTierKey = `jlpt_${selectedTier}`;
  const currentTierPackages: MasterExamPackageSummary[] =
    packagesByTier[currentTierKey] && packagesByTier[currentTierKey].length > 0
      ? packagesByTier[currentTierKey]
      : DEFAULT_EXAM_PACKAGES[currentTierKey] || DEFAULT_EXAM_PACKAGES.jlpt_n5;

  const handleLaunchExam = async () => {
    setLaunching(true);
    try {
      const localTemplate = getJLPTMockPackage(currentTierKey, selectedPackNumber);
      const selectedSummary = currentTierPackages.find(p => p.packNumber === selectedPackNumber);
      const targetId = selectedSummary?.id || localTemplate.id;

      try {
        const remote = await fetchExamPackageById(targetId);
        const remotePkg = remote?.package || remote;
        if (remotePkg && Array.isArray(remotePkg.questions) && remotePkg.questions.length >= 10) {
          // Normalize remote questions into JLPTFullExamPackage while preserving canonical Mondai fields
          const mergedQuestions = remotePkg.questions.map((q: any, idx: number) => ({
            id: q.id || `${targetId}_q${idx + 1}`,
            questionNumber: q.questionNumber || idx + 1,
            sessionNumber: q.sessionNumber || (idx < 6 ? 1 : currentSpec.sessions.length),
            mondaiNumber: q.mondaiNumber || 1,
            mondaiTitleJp: q.mondaiTitleJp || `問題${idx + 1}`,
            mondaiTitleId: q.mondaiTitleId || `Soal ${idx + 1}`,
            mondaiTitleEn: q.mondaiTitleEn || `Question ${idx + 1}`,
            sectionCategory:
              q.sectionCategory ||
              (q.itemType === 'chokai_audio'
                ? 'listening'
                : q.passageId || q.sectionNumber === 2
                  ? 'reading'
                  : 'language_knowledge'),
            itemType: q.itemType || 'mcq',
            prompt: q.prompt,
            stimulusText: q.stimulusText,
            passageId: q.passageId || (q.passagePart ? `pas_${q.passagePart}` : undefined),
            audioScriptJp: q.audioScriptJp,
            audioSpeakers: q.audioSpeakers,
            audioDurationSec: q.audioDurationSec || 25,
            scrambledChunks: q.scrambledChunks || (q.itemType === 'star_sentence' ? q.options : undefined),
            starPosition: q.starPosition || 3,
            options: q.options || [],
            correctAnswer: String(q.correctAnswer),
            explanation: q.explanation || '',
            explanationId: q.explanationId || q.explanation || '',
            trapNoteId: q.distractorAnalysis?.explanationId,
            trapNoteEn: q.distractorAnalysis?.correctExplanation
          }));

          const mergedPassages =
            Array.isArray(remotePkg.passages) && remotePkg.passages.length > 0
              ? remotePkg.passages.map((p: any, pIdx: number) => ({
                  id: p.id || `pas_${p.partNumber || pIdx + 1}`,
                  partNumber: p.partNumber || pIdx + 1,
                  passageType: p.passageType || 'medium',
                  titleJp: p.titleJp || p.title || '',
                  titleEn: p.titleEn || p.title || '',
                  titleId: p.titleId || p.title || '',
                  textJp: p.textJp || p.text || '',
                  textB: p.textB
                }))
              : localTemplate.passages;

          onStartExam(
            {
              ...localTemplate,
              id: remotePkg.id || localTemplate.id,
              titleEn: remotePkg.titleEn || localTemplate.titleEn,
              titleId: remotePkg.titleId || localTemplate.titleId,
              passages: mergedPassages,
              questions: mergedQuestions
            },
            examMode
          );
          return;
        }
      } catch {
        // Fallback smoothly to canonical local bank
      }

      onStartExam(localTemplate, examMode);
    } finally {
      setLaunching(false);
    }
  };

  const getTierBorderStyle = (tier: JLPTLevelTier, isSelected: boolean) => {
    if (isSelected) {
      return 'border-vermilion-500 ring-2 ring-vermilion-500/20 bg-washi-50 dark:bg-sumi-900 shadow-md';
    }
    return 'border-washi-300 dark:border-sumi-800 bg-white/70 dark:bg-sumi-900/60 hover:border-stone-400 dark:hover:border-sumi-700';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 pb-12 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-washi-50 dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-2xl p-5 sm:p-7 shadow-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vermilion-500/10 text-vermilion-600 dark:text-vermilion-400 text-xs font-bold tracking-wide">
              <Award className="w-3.5 h-3.5" />
              <span>{t('jlpt_exam.hub_badge')}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight flex flex-wrap items-center gap-2">
              <span className="font-jp text-vermilion-500">日本語能力試験</span>
              <span>{t('jlpt_exam.hub_title')}</span>
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              {t('jlpt_exam.hub_subtitle')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-2 shrink-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-300/70 dark:border-amber-700/50 text-amber-800 dark:text-amber-300 text-xs font-semibold">
              <ShieldAlert className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
              <span>{t('jlpt_exam.cutoff_rule_badge')}</span>
            </div>
            {onOpenLessonDrill && (
              <button
                onClick={onOpenLessonDrill}
                className="text-xs font-semibold text-stone-500 hover:text-vermilion-500 underline underline-offset-4 transition-colors"
              >
                {language === 'id' ? 'Atau buka Latihan Kurikulum Bintang ★' : 'Or open Curriculum Star Drills ★'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 5-Tier JLPT Level Corridor (N5 -> N1) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 flex items-center gap-2">
            <Layers className="w-4 h-4 text-vermilion-500" />
            <span>{language === 'id' ? 'Koridor Format JLPT 5 Tingkat (N5 – N1)' : 'JLPT-Aligned 5-Tier Corridor (N5 – N1)'}</span>
          </h2>
          {loadingPacks && (
            <span className="text-xs text-stone-400 animate-pulse">
              {language === 'id' ? 'Menyelaraskan paket ujian...' : 'Syncing exam packages...'}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {TIER_ORDER.map(tier => {
            const spec = JLPT_LEVEL_SPECS[tier];
            const isSelected = selectedTier === tier;
            const tierPacks = packagesByTier[`jlpt_${tier}`] || [];
            const completedCount = tierPacks.filter(p => p.attemptSummary || p.completed).length;

            return (
              <button
                key={tier}
                onClick={() => {
                  setSelectedTier(tier);
                  setSelectedPackNumber(1);
                }}
                className={`text-left rounded-xl border p-4 transition-all flex flex-col justify-between space-y-3 ${getTierBorderStyle(
                  tier,
                  isSelected
                )}`}
              >
                <div className="space-y-2 w-full">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-md text-xs font-extrabold tracking-wide ${
                        isSelected
                          ? 'bg-vermilion-500 text-white shadow-sm'
                          : 'bg-washi-200 dark:bg-sumi-800 text-stone-800 dark:text-stone-200'
                      }`}
                    >
                      {spec.label}
                    </span>
                    <span className="text-[11px] font-bold text-stone-500 dark:text-stone-400">
                      ≥ {spec.passThreshold}/180
                    </span>
                  </div>

                  <p className="text-xs font-bold text-stone-900 dark:text-stone-100 line-clamp-2 min-h-[2rem]">
                    {language === 'id' ? spec.subtitleId : spec.subtitleEn}
                  </p>

                  {/* Session Durations Summary */}
                  <div className="space-y-1 pt-1 border-t border-washi-200 dark:border-sumi-800 text-[11px] text-stone-600 dark:text-stone-400">
                    <div className="flex items-center justify-between font-medium">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-stone-400" />
                        {t('jlpt_exam.duration_label')}:
                      </span>
                      <span className="font-bold text-stone-800 dark:text-stone-200">
                        {spec.totalDurationMinutes} {language === 'id' ? 'mnt' : 'min'}
                      </span>
                    </div>
                    <div className="text-[10px] leading-snug text-stone-500 dark:text-stone-400">
                      {spec.sessions.map(s => `${s.durationMinutes}m`).join(' + ')} ({spec.sessions.length}{' '}
                      {language === 'id' ? 'Sesi' : 'Sessions'})
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 w-full pt-1 border-t border-washi-200 dark:border-sumi-800">
                  <div className="text-[10px] leading-tight text-stone-500 dark:text-stone-400">
                    <span className="font-semibold text-stone-700 dark:text-stone-300">Furigana:</span>{' '}
                    {language === 'id' ? spec.furiganaRuleId : spec.furiganaRuleEn}
                  </div>
                  {completedCount > 0 && (
                    <div className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>
                        {completedCount}/5 {language === 'id' ? 'Paket Selesai' : 'Packs Completed'}
                      </span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Selected Level Blueprint + Mode Selector + Pack Launcher */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 7 Columns: Official Level Breakdown & Pack 1-5 Selector */}
        <div className="lg:col-span-7 bg-washi-50 dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-washi-200 dark:border-sumi-800 pb-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-vermilion-500">
                {language === 'id' ? 'Struktur Sesi Ujian' : 'Standard Session Structure'}
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-stone-900 dark:text-stone-100 mt-0.5">
                {currentSpec.label} — {language === 'id' ? currentSpec.subtitleId : currentSpec.subtitleEn}
              </h3>
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase font-bold text-stone-500">{t('jlpt_exam.pass_mark_label')}</div>
              <div className="text-lg font-extrabold text-stone-900 dark:text-stone-100">
                {currentSpec.passThreshold}{' '}
                <span className="text-xs font-normal text-stone-500">/ 180 {language === 'id' ? 'poin' : 'pts'}</span>
              </div>
            </div>
          </div>

          {/* Session Cards */}
          <div className="space-y-2.5">
            <div className="text-xs font-bold text-stone-700 dark:text-stone-300">{t('jlpt_exam.sessions_label')}:</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {currentSpec.sessions.map(sess => (
                <div
                  key={sess.sessionNumber}
                  className="bg-washi-100 dark:bg-sumi-850 border border-washi-200 dark:border-sumi-800 rounded-xl p-3 space-y-1"
                >
                  <div className="flex items-center justify-between text-[11px] font-bold text-vermilion-600 dark:text-vermilion-400">
                    <span>
                      {language === 'id' ? `Sesi ${sess.sessionNumber}` : `Session ${sess.sessionNumber}`}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-vermilion-500/10">{sess.durationMinutes}m</span>
                  </div>
                  <div className="font-jp text-xs font-bold text-stone-900 dark:text-stone-100">{sess.titleJp}</div>
                  <div className="text-[11px] text-stone-500 dark:text-stone-400">
                    {language === 'id' ? sess.titleId : sess.titleEn}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pack 1-5 Selector */}
          <div className="space-y-2.5 pt-2">
            <div className="text-xs font-bold text-stone-700 dark:text-stone-300">{t('jlpt_exam.select_pack_label')}:</div>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map(num => {
                const packSummary = currentTierPackages.find(p => p.packNumber === num);
                const isPackSelected = selectedPackNumber === num;
                const hasBest = packSummary?.attemptSummary?.bestScore !== undefined && packSummary?.attemptSummary?.bestScore !== null;
                const isPassed = packSummary?.attemptSummary?.passed;

                return (
                  <button
                    key={num}
                    onClick={() => setSelectedPackNumber(num)}
                    className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between space-y-1.5 ${
                      isPackSelected
                        ? 'bg-vermilion-500 text-white border-vermilion-500 shadow-md'
                        : 'bg-washi-100 dark:bg-sumi-850 border-washi-300 dark:border-sumi-800 text-stone-800 dark:text-stone-200 hover:border-vermilion-400'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-extrabold">
                        {language === 'id' ? `Paket ${num}` : `Pack ${num}`}
                      </span>
                      {isPassed && (
                        <CheckCircle2 className={`w-3.5 h-3.5 ${isPackSelected ? 'text-white' : 'text-emerald-500'}`} />
                      )}
                    </div>
                    <div className={`text-[10px] leading-tight ${isPackSelected ? 'text-white/90' : 'text-stone-500 dark:text-stone-400'}`}>
                      {num === 1
                        ? language === 'id' ? 'Diagnostik' : 'Diagnostic'
                        : num === 5
                          ? language === 'id' ? 'Ujian Final' : 'Final Mock'
                          : language === 'id' ? `Simulasi ${num}` : `Mock ${num}`}
                    </div>
                    {hasBest && (
                      <div className={`text-[10px] font-bold ${isPackSelected ? 'text-white' : 'text-indigo-600 dark:text-indigo-400'}`}>
                        {packSummary?.attemptSummary?.latestScaledScore ?? packSummary?.attemptSummary?.bestScore}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Delivery Mode Toggle + Launch Action */}
        <div className="lg:col-span-5 bg-washi-50 dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
            <SlidersHorizontal className="w-4 h-4 text-vermilion-500" />
            <span>{t('jlpt_exam.mode_title')}</span>
          </div>

          <div className="space-y-3">
            {/* Strict Timed Mode */}
            <button
              onClick={() => setExamMode('strict')}
              className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 ${
                examMode === 'strict'
                  ? 'border-vermilion-500 bg-vermilion-500/5 ring-2 ring-vermilion-500/20'
                  : 'border-washi-300 dark:border-sumi-800 bg-washi-100/70 dark:bg-sumi-850 hover:border-stone-400'
              }`}
            >
              <div
                className={`p-2 rounded-lg shrink-0 ${
                  examMode === 'strict'
                    ? 'bg-vermilion-500 text-white'
                    : 'bg-washi-200 dark:bg-sumi-800 text-stone-500'
                }`}
              >
                <Timer className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="text-sm font-bold text-stone-900 dark:text-stone-100">{t('jlpt_exam.mode_strict')}</div>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">{t('jlpt_exam.mode_strict_desc')}</p>
              </div>
            </button>

            {/* Practice Drill Mode */}
            <button
              onClick={() => setExamMode('practice')}
              className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 ${
                examMode === 'practice'
                  ? 'border-emerald-500 bg-emerald-500/5 ring-2 ring-emerald-500/20'
                  : 'border-washi-300 dark:border-sumi-800 bg-washi-100/70 dark:bg-sumi-850 hover:border-stone-400'
              }`}
            >
              <div
                className={`p-2 rounded-lg shrink-0 ${
                  examMode === 'practice'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-washi-200 dark:bg-sumi-800 text-stone-500'
                }`}
              >
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="text-sm font-bold text-stone-900 dark:text-stone-100">{t('jlpt_exam.mode_practice')}</div>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">{t('jlpt_exam.mode_practice_desc')}</p>
              </div>
            </button>
          </div>

          {/* Policy Summary Box */}
          <div className="bg-washi-100 dark:bg-sumi-850 rounded-xl p-3.5 border border-washi-200 dark:border-sumi-800 space-y-2 text-xs">
            <div className="flex items-center justify-between text-stone-600 dark:text-stone-400">
              <span className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-stone-400" />
                {t('jlpt_exam.furigana_label')}:
              </span>
              <span className="font-semibold text-stone-800 dark:text-stone-200 text-right max-w-[200px]">
                {language === 'id' ? currentSpec.furiganaRuleId : currentSpec.furiganaRuleEn}
              </span>
            </div>
            <div className="flex items-center justify-between text-stone-600 dark:text-stone-400">
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-stone-400" />
                {language === 'id' ? 'Modul Ujian:' : 'Modules:'}
              </span>
              <span className="font-semibold text-stone-800 dark:text-stone-200">
                Kanji/Goi • ★ Grammar • Dokkai • Chokai
              </span>
            </div>
            <div className="flex items-center justify-between text-stone-600 dark:text-stone-400">
              <span className="flex items-center gap-1.5">
                <Headphones className="w-3.5 h-3.5 text-stone-400" />
                {language === 'id' ? 'Audio Chokai:' : 'Chokai Audio:'}
              </span>
              <span className="font-semibold text-stone-800 dark:text-stone-200">
                {examMode === 'strict'
                  ? language === 'id' ? '1x Putar (Dengan Bel Simulasi)' : 'Single-Play + Start Chime'
                  : language === 'id' ? 'Putar Ulang Bebas' : 'Unlimited Replay'}
              </span>
            </div>
          </div>

          <button
            onClick={handleLaunchExam}
            disabled={launching}
            className="w-full py-3.5 px-5 rounded-xl bg-vermilion-500 hover:bg-vermilion-600 disabled:opacity-60 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>
              {launching
                ? language === 'id' ? 'Mempersiapkan Lembar Ujian...' : 'Preparing Exam Booklet...'
                : `${t('jlpt_exam.launch_btn')} (${currentSpec.label} • ${language === 'id' ? 'Paket' : 'Pack'} ${selectedPackNumber})`}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
