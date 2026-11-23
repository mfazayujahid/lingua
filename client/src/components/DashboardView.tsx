import React from 'react';
import { LevelCode } from '../../../shared/types';
import { useFurigana } from '../context/FuriganaContext';
import { useLanguage } from '../context/LanguageContext';
import {
  BookOpen,
  ArrowRight,
  Clock,
  Sparkles,
  Compass,
  ChevronRight,
  HelpCircle,
  Feather,
  PenTool,
  CheckCircle2,
  Layers,
  GraduationCap
} from 'lucide-react';

interface DashboardViewProps {
  data: any;
  onNavigate: (view: string) => void;
  onTrackChange: (track: LevelCode) => void;
}

function localizeLessonTitle(title: string, lang: string): string {
  if (lang !== 'id' || !title) return title;
  return title
    .replace(/Grammar Drill:\s*Case Particles & Sentence Formation/i, 'Latihan Tata Bahasa: Partikel Kasus & Pembentukan Kalimat')
    .replace(/Reading Drill:\s*Campus Tea Party Notice/i, 'Latihan Membaca: Pengumuman Acara Minum Teh Kampus')
    .replace(/Listening Drill:\s*Movie Meetup Dialogue/i, 'Latihan Menyimak: Dialog Janji Nonton Film')
    .replace(/Academic Reading Task 1:\s*Climate Science Abstract/i, 'Membaca Akademik Tugas 1: Abstrak Sains Iklim')
    .replace(/Academic Writing Task 1:\s*Global Renewable Energy Trends/i, 'Menulis Akademik Tugas 1: Tren Energi Terbarukan Global')
    .replace(/Academic Writing Task 2:\s*Universal Basic Income Debate/i, 'Menulis Akademik Tugas 2: Debat Pendapatan Dasar Universal')
    .replace(/General Reading Task 1:\s*Workplace Safety Guidelines/i, 'Membaca Umum Tugas 1: Pedoman Keselamatan Tempat Kerja')
    .replace(/General Writing Task 1:\s*Formal Complaint to City Council/i, 'Menulis Umum Tugas 1: Surat Pengaduan Resmi ke Dewan Kota');
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  data,
  onNavigate,
  onTrackChange
}) => {
  const { renderFurigana } = useFurigana();
  const { t, language } = useLanguage();

  const user = data?.user || {
    username: 'Learner',
    activeTrack: 'jlpt_n5',
    baselineScore: 0,
    targetScore: 80,
    dailyGoalMinutes: 20,
    streakDays: 0
  };

  const activeTrack = user.activeTrack as LevelCode;
  const isJLPT = activeTrack?.startsWith('jlpt');
  const srsDue = data?.srsDueCount || 0;
  const progressPct = data?.progressPct || 0;
  const hasActivity = data?.hasActivity || false;
  const recommendedLessons = data?.recommendedLessons || [];
  const levelUpper = activeTrack?.replace('jlpt_', '').toUpperCase();

  const accentColor = isJLPT ? 'vermilion' : 'indigo';

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn max-w-5xl mx-auto pb-12">
      
      {/* Sub-Track / Level Selection Pill (Strictly Partitioned) */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-washi-50 dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-xl p-3 sm:p-4 shadow-sm">
        {isJLPT ? (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-vermilion-500" />
              <span>{t('dashboard.jp_track')}</span>
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {(['jlpt_n5', 'jlpt_n4', 'jlpt_n3', 'jlpt_n2', 'jlpt_n1'] as LevelCode[]).map(lvl => (
                <button
                  key={lvl}
                  onClick={() => onTrackChange(lvl)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                    activeTrack === lvl
                      ? 'bg-vermilion-500 text-white shadow-sm'
                      : 'bg-washi-200 dark:bg-sumi-800 text-stone-700 dark:text-stone-300 hover:bg-washi-300 dark:hover:bg-sumi-750'
                  }`}
                >
                  {lvl.replace('jlpt_', '').toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-600" />
              <span>{t('dashboard.ielts_track')}</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onTrackChange('ielts_academic')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                  activeTrack === 'ielts_academic'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-washi-200 dark:bg-sumi-800 text-stone-700 dark:text-stone-300 hover:bg-washi-300 dark:hover:bg-sumi-750'
                }`}
              >
                {t('dashboard.academic')}
              </button>
              <button
                onClick={() => onTrackChange('ielts_general')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                  activeTrack === 'ielts_general'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-washi-200 dark:bg-sumi-800 text-stone-700 dark:text-stone-300 hover:bg-washi-300 dark:hover:bg-sumi-750'
                }`}
              >
                {t('dashboard.general')}
              </button>
            </div>
          </div>
        )}

        <div className="text-xs font-mono text-stone-500">
          {isJLPT ? 'Silabus Resmi Japan Foundation' : 'Standar Cambridge IELTS Band 1–9'}
        </div>
      </div>

      {/* Structured Roadmap Guide Card (Strictly Partitioned) */}
      {isJLPT ? (
        /* JAPANESE ROADMAP GUIDE */
        <div className="bg-gradient-to-br from-amber-500/10 via-vermilion-500/5 to-transparent border border-vermilion-500/30 rounded-2xl p-5 sm:p-7 shadow-sm space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-vermilion-500/15 text-vermilion-700 dark:text-vermilion-300 text-xs font-bold uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5" />
                <span>{t('dashboard.guide_badge')}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
                {t('dashboard.guide_title')}
              </h2>
              <p className="text-xs font-semibold text-vermilion-600 dark:text-vermilion-400">
                {t('dashboard.guide_faq')}
              </p>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
                {t('dashboard.guide_body')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 pt-1">
            {/* Step 1: Kana */}
            <div className="bg-white/80 dark:bg-sumi-850/80 p-5 rounded-xl border border-washi-200 dark:border-sumi-750 flex flex-col justify-between space-y-4 hover:border-vermilion-500/50 transition-all shadow-sm">
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-vermilion-500/10 text-vermilion-600 dark:text-vermilion-400 uppercase tracking-wider">
                  {t('dashboard.step1_badge')}
                </span>
                <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                  <Feather className="w-4 h-4 text-vermilion-500" />
                  <span>{t('dashboard.step1_title')}</span>
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 leading-normal">
                  {t('dashboard.step1_desc')}
                </p>
              </div>
              <button
                onClick={() => onNavigate('kanji')}
                className="w-full py-2 rounded-lg bg-vermilion-500 hover:bg-vermilion-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
              >
                <span>{t('dashboard.step1_btn')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Step 2: Grammar */}
            <div className="bg-white/80 dark:bg-sumi-850/80 p-5 rounded-xl border border-washi-200 dark:border-sumi-750 flex flex-col justify-between space-y-4 hover:border-vermilion-500/50 transition-all shadow-sm">
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  {t('dashboard.step2_badge')}
                </span>
                <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-indigo-500" />
                  <span>{t('dashboard.step2_title')}</span>
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 leading-normal">
                  {t('dashboard.step2_desc')}
                </p>
              </div>
              <button
                onClick={() => onNavigate('curriculum')}
                className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
              >
                <span>{t('dashboard.step2_btn')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Step 3: Kanji */}
            <div className="bg-white/80 dark:bg-sumi-850/80 p-5 rounded-xl border border-washi-200 dark:border-sumi-750 flex flex-col justify-between space-y-4 hover:border-vermilion-500/50 transition-all shadow-sm">
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  {t('dashboard.step3_badge')}
                </span>
                <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-500" />
                  <span>{t('dashboard.step3_title')}</span>
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 leading-normal">
                  {t('dashboard.step3_desc')}
                </p>
              </div>
              <button
                onClick={() => onNavigate('kanji')}
                className="w-full py-2 rounded-lg bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 hover:bg-stone-900 font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
              >
                <span>{t('dashboard.step3_btn')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ENGLISH / IELTS ROADMAP GUIDE (ZERO JAPANESE / ZERO KANJI) */
        <div className="bg-gradient-to-br from-indigo-500/10 via-blue-500/5 to-transparent border border-indigo-500/30 rounded-2xl p-5 sm:p-7 shadow-sm space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>{t('dashboard.ielts_guide_badge')}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
                {t('dashboard.ielts_guide_title')}
              </h2>
              <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                {t('dashboard.ielts_guide_faq')}
              </p>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
                {t('dashboard.ielts_guide_body')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 pt-1">
            {/* Step 1: Writing Studio */}
            <div className="bg-white/80 dark:bg-sumi-850/80 p-5 rounded-xl border border-washi-200 dark:border-sumi-750 flex flex-col justify-between space-y-4 hover:border-indigo-500/50 transition-all shadow-sm">
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  {t('dashboard.ielts_step1_badge')}
                </span>
                <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                  <PenTool className="w-4 h-4 text-indigo-600" />
                  <span>{t('dashboard.ielts_step1_title')}</span>
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 leading-normal">
                  {t('dashboard.ielts_step1_desc')}
                </p>
              </div>
              <button
                onClick={() => onNavigate('studio')}
                className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
              >
                <span>{t('dashboard.ielts_step1_btn')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Step 2: Curriculum Modules */}
            <div className="bg-white/80 dark:bg-sumi-850/80 p-5 rounded-xl border border-washi-200 dark:border-sumi-750 flex flex-col justify-between space-y-4 hover:border-indigo-500/50 transition-all shadow-sm">
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  {t('dashboard.ielts_step2_badge')}
                </span>
                <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-blue-500" />
                  <span>{t('dashboard.ielts_step2_title')}</span>
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 leading-normal">
                  {t('dashboard.ielts_step2_desc')}
                </p>
              </div>
              <button
                onClick={() => onNavigate('curriculum')}
                className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
              >
                <span>{t('dashboard.ielts_step2_btn')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Step 3: Mock Exam */}
            <div className="bg-white/80 dark:bg-sumi-850/80 p-5 rounded-xl border border-washi-200 dark:border-sumi-750 flex flex-col justify-between space-y-4 hover:border-indigo-500/50 transition-all shadow-sm">
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  {t('dashboard.ielts_step3_badge')}
                </span>
                <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-500" />
                  <span>{t('dashboard.ielts_step3_title')}</span>
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 leading-normal">
                  {t('dashboard.ielts_step3_desc')}
                </p>
              </div>
              <button
                onClick={() => onNavigate('exam')}
                className="w-full py-2 rounded-lg bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 hover:bg-stone-900 font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
              >
                <span>{t('dashboard.ielts_step3_btn')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Mission Control Banner */}
      <div className="bg-washi-50 dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-xl p-5 sm:p-8 shadow-sm relative overflow-hidden transition-colors">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2 space-y-3">
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
              isJLPT
                ? 'bg-vermilion-500/10 text-vermilion-600 dark:text-vermilion-500'
                : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isJLPT ? 'bg-vermilion-500' : 'bg-indigo-600'}`} />
              <span>
                {isJLPT
                  ? `JLPT ${levelUpper} ${t('dashboard.hero_track_prefix')}`
                  : activeTrack === 'ielts_academic'
                  ? 'IELTS Academic Track (Band 7.5+ Target)'
                  : 'IELTS General Training Track (Band 7.5+ Target)'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
              {isJLPT
                ? t('dashboard.hero_jlpt_title', { level: levelUpper })
                : t('dashboard.hero_ielts_title')}
            </h1>

            <p className="text-stone-600 dark:text-stone-400 text-xs sm:text-sm max-w-xl leading-relaxed">
              {isJLPT
                ? t('dashboard.hero_jlpt_desc')
                : t('dashboard.hero_ielts_desc')}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('curriculum')}
                className={`px-4 py-2 rounded-lg text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm ${
                  isJLPT ? 'bg-vermilion-500 hover:bg-vermilion-600' : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                <span>{t('dashboard.btn_explore_curriculum')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onNavigate('srs')}
                className="px-4 py-2 rounded-lg border border-washi-300 dark:border-sumi-700 bg-washi-100 dark:bg-sumi-800 text-stone-800 dark:text-stone-200 text-xs font-medium hover:border-vermilion-500 transition-colors flex items-center gap-1.5"
              >
                <span>{t('dashboard.btn_fsrs_queue')}</span>
                {srsDue > 0 && (
                  <span className={`px-1.5 py-0.2 rounded-full text-white text-[10px] font-bold ${
                    isJLPT ? 'bg-vermilion-500' : 'bg-indigo-600'
                  }`}>
                    {srsDue}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Readiness Gauge */}
          <div className="bg-washi-100/70 dark:bg-sumi-850/70 p-5 rounded-xl border border-washi-200 dark:border-sumi-750 text-center space-y-2">
            <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
              {isJLPT ? t('dashboard.readiness_title') : 'Tingkat Kesiapan IELTS'}
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-100 font-mono tracking-tight">
              {hasActivity ? `${progressPct}%` : '0%'}
            </div>
            <div className="w-full bg-washi-200 dark:bg-sumi-750 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isJLPT ? 'bg-vermilion-500' : 'bg-indigo-600'
                }`}
                style={{ width: `${hasActivity ? progressPct : 0}%` }}
              />
            </div>
            <p className="text-[11px] text-stone-500">
              {hasActivity ? t('dashboard.readiness_active') : t('dashboard.readiness_empty')}
            </p>
          </div>
        </div>
      </div>

      {/* Recommended Lessons Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wider flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isJLPT ? 'bg-vermilion-500' : 'bg-indigo-600'}`} />
            <span>{t('dashboard.recommended_title')}</span>
          </h2>
          <button
            onClick={() => onNavigate('curriculum')}
            className={`text-xs font-semibold hover:underline flex items-center gap-1 ${
              isJLPT ? 'text-vermilion-600 dark:text-vermilion-500' : 'text-indigo-600 dark:text-indigo-400'
            }`}
          >
            <span>{t('dashboard.view_all_lessons')}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendedLessons.map((lesson: any) => (
            <div
              key={lesson.id}
              onClick={() => onNavigate('curriculum')}
              className={`bg-washi-50 dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 hover:border-${accentColor}-500/60 rounded-xl p-5 cursor-pointer transition-all hover:bg-washi-100 dark:hover:bg-sumi-850 group shadow-sm flex flex-col justify-between space-y-3`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    isJLPT
                      ? 'bg-vermilion-500/10 text-vermilion-600 dark:text-vermilion-400'
                      : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                  }`}>
                    {lesson.estimatedMinutes} {t('dashboard.mins_suffix')}
                  </span>
                  <span className="text-[11px] text-stone-400">{t('dashboard.lesson_prefix')} {lesson.orderIndex}</span>
                </div>
                <h3 className={`font-bold text-sm text-stone-800 dark:text-stone-200 group-hover:text-${accentColor}-600 dark:group-hover:text-${accentColor}-500 transition-colors`}>
                  {isJLPT
                    ? renderFurigana(localizeLessonTitle(lesson.title, language))
                    : localizeLessonTitle(lesson.title, language)}
                </h3>
              </div>
              <div className="flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-washi-200 dark:border-sumi-800">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {t('dashboard.start_lesson')}
                </span>
                <span className={`group-hover:translate-x-1 transition-transform text-${accentColor}-500`}>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
