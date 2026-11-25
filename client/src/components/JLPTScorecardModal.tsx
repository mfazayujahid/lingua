import React, { useState } from 'react';
import { JLPTDetailedScoreResult } from '../data/jlptMockBank';
import {
  Award,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowLeft,
  Star,
  ShieldAlert,
  TrendingUp,
  BookOpen
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface JLPTScorecardModalProps {
  result: JLPTDetailedScoreResult;
  onCloseToHub: () => void;
  onRetake: () => void;
}

export const JLPTScorecardModal: React.FC<JLPTScorecardModalProps> = ({
  result,
  onCloseToHub,
  onRetake
}) => {
  const { t, language } = useLanguage();
  const [filterMode, setFilterMode] = useState<'all' | 'wrong' | 'correct'>('all');

  const filteredQuestions = result.questionEvaluations.filter(q => {
    if (filterMode === 'wrong') return !q.isCorrect;
    if (filterMode === 'correct') return q.isCorrect;
    return true;
  });

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remSec = sec % 60;
    return `${mins}m ${remSec}s`;
  };

  // 4-Axis SVG Radar Calculations (center 110, 110, max radius 78)
  const cx = 110;
  const cy = 110;
  const rMax = 75;
  const { kanjiVocabPct, grammarPct, readingPct, listeningPct } = result.radarCriteria;

  const toPt = (angleDeg: number, pct: number) => {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    const dist = (Math.max(12, pct) / 100) * rMax;
    return `${(cx + dist * Math.cos(rad)).toFixed(1)},${(cy + dist * Math.sin(rad)).toFixed(1)}`;
  };

  const userPolygon = [
    toPt(0, kanjiVocabPct),
    toPt(90, grammarPct),
    toPt(180, readingPct),
    toPt(270, listeningPct)
  ].join(' ');

  const benchmarkPolygon = [
    toPt(0, 75),
    toPt(90, 75),
    toPt(180, 75),
    toPt(270, 75)
  ].join(' ');

  const renderSectionBar = (
    titleJp: string,
    titleLocal: string,
    scaled: number,
    maxScaled: number,
    cutoff: number,
    cutoffPassed: boolean,
    raw: number,
    total: number
  ) => {
    const fillPct = Math.min(100, Math.round((scaled / maxScaled) * 100));
    const cutoffPct = Math.round((cutoff / maxScaled) * 100);

    return (
      <div
        className={`p-3.5 rounded-xl border ${
          cutoffPassed
            ? 'bg-washi-100 dark:bg-sumi-850 border-washi-300 dark:border-sumi-800'
            : 'bg-red-50/70 dark:bg-red-950/30 border-red-300 dark:border-red-800/60'
        } space-y-2`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="font-jp text-xs font-bold text-stone-900 dark:text-stone-100 mr-2">{titleJp}</span>
            <span className="text-xs font-semibold text-stone-600 dark:text-stone-400">{titleLocal}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-stone-500">
              ({raw}/{total} {language === 'id' ? 'benar' : 'correct'})
            </span>
            <span className={`text-sm font-extrabold ${cutoffPassed ? 'text-stone-900 dark:text-stone-100' : 'text-red-600 dark:text-red-400'}`}>
              {scaled} / {maxScaled}
            </span>
          </div>
        </div>

        {/* Score Bar with Cutoff Marker Line */}
        <div className="relative h-3 bg-washi-200 dark:bg-sumi-800 rounded-full overflow-visible">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              cutoffPassed ? 'bg-emerald-500' : 'bg-red-500'
            }`}
            style={{ width: `${fillPct}%` }}
          />
          {/* Strict Cutoff Threshold Marker */}
          <div
            className="absolute -top-1 -bottom-1 w-0.5 bg-stone-900 dark:bg-white z-10"
            style={{ left: `${cutoffPct}%` }}
            title={`${language === 'id' ? 'Batas Minimum' : 'Minimum Cutoff'}: ${cutoff}/${maxScaled}`}
          />
        </div>

        <div className="flex items-center justify-between text-[11px]">
          <span className="text-stone-500 font-medium">
            {t('jlpt_exam.cutoff_threshold_label', { min: cutoff, max: maxScaled })}
          </span>
          {cutoffPassed ? (
            <span className="inline-flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {t('jlpt_exam.cutoff_passed')}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 font-bold text-red-600 dark:text-red-400">
              <XCircle className="w-3.5 h-3.5" />
              {language === 'id' ? `Nilai di bawah ambang batas minimum seksi (${cutoff}/${maxScaled})` : t('jlpt_exam.cutoff_failed', { min: cutoff })}
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16 animate-fadeIn">
      {/* Official JLPT Certificate Report Header Card */}
      <div className="bg-washi-50 dark:bg-sumi-900 border-2 border-stone-800 dark:border-stone-600 rounded-2xl p-5 sm:p-8 shadow-md relative overflow-hidden">
        {/* Authentic Top Corner Japanese Seal Watermark */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-washi-300 dark:border-sumi-800 pb-6">
          <div className="space-y-1.5">
            <div className="text-[11px] font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400">
              JEES • JAPAN EDUCATIONAL EXCHANGES AND SERVICES
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-stone-100">
              {t('jlpt_exam.score_report_title')}
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-xs text-stone-600 dark:text-stone-400">
              <span className="px-2 py-0.5 rounded bg-washi-200 dark:bg-sumi-800 font-bold text-stone-900 dark:text-stone-100">
                JLPT {result.level}
              </span>
              <span>•</span>
              <span>
                {language === 'id' ? `Paket ${result.packNumber}` : `Pack ${result.packNumber}`}
              </span>
              <span>•</span>
              <span>
                {language === 'id' ? 'Durasi Pengerjaan:' : 'Time Spent:'} {formatTime(result.timeSpentSeconds)}
              </span>
            </div>
          </div>

          {/* Official Verdict Hanko Seal Stamp */}
          <div
            className={`px-6 py-4 rounded-2xl border-2 flex items-center gap-4 shrink-0 ${
              result.overallPassed
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                : 'bg-red-50 dark:bg-red-950/40 border-vermilion-500 text-vermilion-600 dark:text-red-400'
            }`}
          >
            <div
              className={`w-14 h-14 rounded-full border-2 flex items-center justify-center font-jp text-lg font-extrabold tracking-tighter ${
                result.overallPassed
                  ? 'border-emerald-600 bg-emerald-600 text-white'
                  : 'border-vermilion-600 bg-vermilion-600 text-white'
              }`}
            >
              {result.verdictJp}
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider opacity-80">
                {language === 'id' ? 'Hasil Akhir Resmi' : 'Official Verdict'}
              </div>
              <div className="text-xl sm:text-2xl font-black tracking-tight">
                {result.verdictJp} ({language === 'id' ? result.verdictId : result.verdictEn})
              </div>
            </div>
          </div>
        </div>

        {/* Strict 19-Point Sectional Cutoff Alert Banner */}
        {result.sectionalCutoffFailed && (
          <div className="mt-5 p-4 rounded-xl bg-red-50 dark:bg-red-950/50 border-2 border-red-500/70 flex items-start gap-3">
            <ShieldAlert className="w-6 h-6 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="text-sm font-extrabold text-red-700 dark:text-red-300">
                {language === 'id'
                  ? '不合格 (TIDAK LULUS) — Nilai di bawah ambang batas minimum seksi (19/60)'
                  : '不合格 (FAILED) — Sectional Score Below 19/60 Minimum Cutoff'}
              </div>
              <p className="text-xs text-red-700/90 dark:text-red-300/90 leading-relaxed">
                {language === 'id' ? result.cutoffAlertId : result.cutoffAlertEn}
              </p>
            </div>
          </div>
        )}

        {/* Composite 180-Point Gauge & Radar Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-center">
          {/* Left: Total 180-Point Scaled Score + Sectional Bars */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-washi-100 dark:bg-sumi-850 border border-washi-200 dark:border-sumi-800 rounded-xl p-4 space-y-3">
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    {t('jlpt_exam.total_scaled_score')}
                  </span>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-4xl font-black text-stone-900 dark:text-stone-100">
                      {result.scaledScore}
                    </span>
                    <span className="text-sm font-bold text-stone-500">/ 180</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-semibold text-stone-500">
                    {t('jlpt_exam.pass_mark_label')}:{' '}
                    <strong className="text-stone-800 dark:text-stone-200">{result.passThreshold} / 180</strong>
                  </span>
                  <div className="text-xs font-bold text-stone-600 dark:text-stone-400 mt-0.5">
                    {language === 'id' ? 'Akurasi Mentah:' : 'Raw Accuracy:'} {result.rawScore}/{result.totalQuestions} ({result.accuracyPct}%)
                  </div>
                </div>
              </div>

              {/* 180-point Gauge with Threshold Line */}
              <div className="relative h-4 bg-washi-200 dark:bg-sumi-800 rounded-full">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    result.overallPassed ? 'bg-emerald-500' : 'bg-vermilion-500'
                  }`}
                  style={{ width: `${Math.min(100, Math.round((result.scaledScore / 180) * 100))}%` }}
                />
                <div
                  className="absolute -top-1.5 -bottom-1.5 w-1 bg-stone-900 dark:bg-white rounded"
                  style={{ left: `${Math.round((result.passThreshold / 180) * 100)}%` }}
                  title={`${t('jlpt_exam.pass_mark_label')}: ${result.passThreshold}/180`}
                />
              </div>
            </div>

            {/* Sectional Score Breakdown Bars */}
            <div className="space-y-2.5">
              <div className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-vermilion-500" />
                <span>{t('jlpt_exam.sectional_breakdown')}</span>
              </div>

              {result.isLowerTier && result.sectionalScores.combinedLangRead ? (
                <>
                  {renderSectionBar(
                    '言語知識（文字・語彙・文法）・読解',
                    language === 'id' ? 'Pengetahuan Bahasa & Membaca' : 'Language Knowledge & Reading',
                    result.sectionalScores.combinedLangRead.scaled,
                    120,
                    38,
                    result.sectionalScores.combinedLangRead.cutoffPassed,
                    result.sectionalScores.combinedLangRead.raw,
                    result.sectionalScores.combinedLangRead.total
                  )}
                  {renderSectionBar(
                    '聴解（ちょうかい）',
                    language === 'id' ? 'Pemahaman Menyimak (Chokai)' : 'Listening Comprehension',
                    result.sectionalScores.listening.scaled,
                    60,
                    19,
                    result.sectionalScores.listening.cutoffPassed,
                    result.sectionalScores.listening.raw,
                    result.sectionalScores.listening.total
                  )}
                </>
              ) : (
                <>
                  {renderSectionBar(
                    '言語知識（文字・語彙・文法）',
                    language === 'id' ? 'Pengetahuan Bahasa' : 'Language Knowledge',
                    result.sectionalScores.languageKnowledge.scaled,
                    60,
                    19,
                    result.sectionalScores.languageKnowledge.cutoffPassed,
                    result.sectionalScores.languageKnowledge.raw,
                    result.sectionalScores.languageKnowledge.total
                  )}
                  {renderSectionBar(
                    '読解（どっかい）',
                    language === 'id' ? 'Pemahaman Membaca (Dokkai)' : 'Reading Comprehension',
                    result.sectionalScores.reading.scaled,
                    60,
                    19,
                    result.sectionalScores.reading.cutoffPassed,
                    result.sectionalScores.reading.raw,
                    result.sectionalScores.reading.total
                  )}
                  {renderSectionBar(
                    '聴解（ちょうかい）',
                    language === 'id' ? 'Pemahaman Menyimak (Chokai)' : 'Listening Comprehension',
                    result.sectionalScores.listening.scaled,
                    60,
                    19,
                    result.sectionalScores.listening.cutoffPassed,
                    result.sectionalScores.listening.raw,
                    result.sectionalScores.listening.total
                  )}
                </>
              )}
            </div>
          </div>

          {/* Right: 4-Axis SVG Diagnostic Radar Chart */}
          <div className="lg:col-span-5 bg-washi-100 dark:bg-sumi-850 border border-washi-200 dark:border-sumi-800 rounded-xl p-4 flex flex-col items-center">
            <div className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
              {language === 'id' ? 'Profil Diagnostik 4 Kompetensi' : '4-Axis Diagnostic Radar'}
            </div>
            <svg viewBox="0 0 220 220" className="w-52 h-52">
              {/* Grid Rings */}
              {[25, 50, 75, 100].map(pct => (
                <polygon
                  key={pct}
                  points={[toPt(0, pct), toPt(90, pct), toPt(180, pct), toPt(270, pct)].join(' ')}
                  fill="none"
                  stroke="currentColor"
                  className="text-stone-300 dark:text-sumi-700"
                  strokeWidth="1"
                />
              ))}
              {/* Axes */}
              <line x1={cx} y1={cy - rMax} x2={cx} y2={cy + rMax} stroke="currentColor" className="text-stone-300 dark:text-sumi-700" strokeWidth="1" />
              <line x1={cx - rMax} y1={cy} x2={cx + rMax} y2={cy} stroke="currentColor" className="text-stone-300 dark:text-sumi-700" strokeWidth="1" />
              {/* Benchmark 75% Polygon */}
              <polygon
                points={benchmarkPolygon}
                fill="none"
                stroke="#10b981"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              {/* Student Polygon */}
              <polygon
                points={userPolygon}
                fill="rgba(200, 60, 35, 0.22)"
                stroke="#C83C23"
                strokeWidth="2.5"
              />
              {/* Axis Labels */}
              <text x={cx} y={18} textAnchor="middle" className="fill-stone-700 dark:fill-stone-300 text-[10px] font-bold">
                {language === 'id' ? `Kanji/Goi ${kanjiVocabPct}%` : `Kanji/Vocab ${kanjiVocabPct}%`}
              </text>
              <text x={cx + rMax + 8} y={cy + 3} textAnchor="start" className="fill-stone-700 dark:fill-stone-300 text-[10px] font-bold">
                {language === 'id' ? `Gram ${grammarPct}%` : `Gram ${grammarPct}%`}
              </text>
              <text x={cx} y={210} textAnchor="middle" className="fill-stone-700 dark:fill-stone-300 text-[10px] font-bold">
                {language === 'id' ? `Dokkai ${readingPct}%` : `Read ${readingPct}%`}
              </text>
              <text x={cx - rMax - 6} y={cy + 3} textAnchor="end" className="fill-stone-700 dark:fill-stone-300 text-[10px] font-bold">
                {language === 'id' ? `Chokai ${listeningPct}%` : `List ${listeningPct}%`}
              </text>
            </svg>
            <div className="flex items-center gap-4 text-[10px] text-stone-500 mt-1">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-vermilion-500 inline-block" />
                {language === 'id' ? 'Skor Anda' : 'Your Score'}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 border-b-2 border-dashed border-emerald-500 inline-block" />
                {language === 'id' ? 'Target Aman 75%' : '75% Benchmark'}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="flex flex-wrap items-center justify-end gap-3 pt-6 mt-6 border-t border-washi-300 dark:border-sumi-800">
          <button
            onClick={onRetake}
            className="px-4 py-2.5 rounded-xl border border-washi-300 dark:border-sumi-700 bg-white dark:bg-sumi-850 hover:bg-washi-200 dark:hover:bg-sumi-800 text-stone-800 dark:text-stone-200 font-bold text-xs flex items-center gap-2 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t('jlpt_exam.retake_exam')}</span>
          </button>
          <button
            onClick={onCloseToHub}
            className="px-5 py-2.5 rounded-xl bg-vermilion-500 hover:bg-vermilion-600 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t('jlpt_exam.close_report')}</span>
          </button>
        </div>
      </div>

      {/* Detailed Question-by-Question Review & Star Reconstruction */}
      <div className="bg-washi-50 dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-washi-200 dark:border-sumi-800 pb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-vermilion-500" />
            <h2 className="text-base font-extrabold text-stone-900 dark:text-stone-100">
              {t('jlpt_exam.question_analysis')}
            </h2>
          </div>

          <div className="flex items-center gap-1.5">
            {(['all', 'wrong', 'correct'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilterMode(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  filterMode === f
                    ? 'bg-stone-900 text-white dark:bg-stone-200 dark:text-stone-900'
                    : 'bg-washi-200 dark:bg-sumi-800 text-stone-600 dark:text-stone-400'
                }`}
              >
                {f === 'all'
                  ? language === 'id' ? `Semua (${result.questionEvaluations.length})` : `All (${result.questionEvaluations.length})`
                  : f === 'wrong'
                    ? language === 'id' ? 'Salah' : 'Incorrect'
                    : language === 'id' ? 'Benar' : 'Correct'}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3.5">
          {filteredQuestions.map(q => (
            <div
              key={q.questionNumber}
              className={`p-4 rounded-xl border space-y-2.5 ${
                q.isCorrect
                  ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/40'
                  : 'bg-red-50/40 dark:bg-red-950/20 border-red-200 dark:border-red-800/40'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 text-xs font-bold">
                    {language === 'id' ? `Soal ${q.questionNumber}` : `Q${q.questionNumber}`}
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-stone-500">
                    {q.sectionCategory === 'language_knowledge'
                      ? language === 'id' ? 'Pengetahuan Bahasa' : 'Language Knowledge'
                      : q.sectionCategory === 'reading'
                        ? 'Dokkai (Membaca)'
                        : 'Chokai (Menyimak)'}
                  </span>
                </div>
                {q.isCorrect ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    {language === 'id' ? 'Benar' : 'Correct'}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-red-600 dark:text-red-400">
                    <XCircle className="w-4 h-4" />
                    {language === 'id' ? 'Kurang Tepat' : 'Incorrect'}
                  </span>
                )}
              </div>

              <p className="font-jp text-sm font-medium text-stone-900 dark:text-stone-100 whitespace-pre-line">
                {q.prompt}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-white/80 dark:bg-sumi-850 border border-washi-200 dark:border-sumi-800">
                  <span className="text-stone-500 block text-[10px] uppercase font-bold">
                    {language === 'id' ? 'Jawaban Anda:' : 'Your Answer:'}
                  </span>
                  <span className={`font-jp font-bold ${q.isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                    {q.userAnswer || (language === 'id' ? '(Tidak dijawab)' : '(Unanswered)')}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/80 dark:bg-sumi-850 border border-washi-200 dark:border-sumi-800">
                  <span className="text-stone-500 block text-[10px] uppercase font-bold">
                    {language === 'id' ? 'Kunci Jawaban Resmi:' : 'Official Key:'}
                  </span>
                  <span className="font-jp font-bold text-emerald-700 dark:text-emerald-300">
                    {q.correctAnswer}
                  </span>
                </div>
              </div>

              {/* Star Sentence Reconstruction Preview if applicable */}
              {q.itemType === 'star_sentence' && q.scrambledChunks && (
                <div className="p-3 rounded-lg bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-800 dark:text-amber-300">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{language === 'id' ? 'Rekonstruksi Kalimat Bintang (★):' : 'Star Sentence Reconstruction (★):'}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 text-xs font-jp">
                    {q.scrambledChunks.map((chunk, i) => (
                      <span
                        key={i}
                        className={`px-2 py-0.5 rounded border ${
                          chunk === q.correctAnswer
                            ? 'bg-amber-400/30 border-amber-500 font-bold text-amber-900 dark:text-amber-200'
                            : 'bg-white dark:bg-sumi-800 border-washi-300 dark:border-sumi-700 text-stone-700 dark:text-stone-300'
                        }`}
                      >
                        {chunk === q.correctAnswer ? `★ ${chunk}` : chunk}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Explanation Box */}
              <div className="p-3 rounded-lg bg-washi-100 dark:bg-sumi-850 border border-washi-200 dark:border-sumi-800 text-xs text-stone-700 dark:text-stone-300 space-y-1">
                <div className="font-bold text-stone-900 dark:text-stone-100">
                  {language === 'id' ? 'Pembahasan Linguistik:' : 'Linguistic Explanation:'}
                </div>
                <p className="leading-relaxed">
                  {language === 'id' ? q.explanationId || q.explanation : q.explanation}
                </p>
                {(q.trapNoteId || q.trapNoteEn) && (
                  <p className="text-[11px] text-amber-700 dark:text-amber-400 font-medium pt-1">
                    {language === 'id' ? `Catatan Jebakan: ${q.trapNoteId}` : `Distractor Trap: ${q.trapNoteEn}`}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
