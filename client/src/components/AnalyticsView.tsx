import React, { useState, useEffect } from 'react';
import { fetchAnalytics, fetchExamTrajectory } from '../api';
import { DiagnosticAnalytics, LevelCode, ExamBatteryTrajectoryResult } from '../../../shared/types';
import {
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Brain,
  ShieldAlert,
  ArrowRight,
  Award,
  CheckCircle2,
  Target
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AnalyticsViewProps {
  activeTrack?: LevelCode;
  onPracticeWeakSpot?: (tag: string) => void;
  onNavigateToExam?: (packageId?: string) => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  activeTrack = 'jlpt_n5',
  onPracticeWeakSpot,
  onNavigateToExam
}) => {
  const { t, language } = useLanguage();
  const [data, setData] = useState<DiagnosticAnalytics | null>(null);
  const [trajectory, setTrajectory] = useState<ExamBatteryTrajectoryResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    Promise.all([
      fetchAnalytics().catch(err => {
        console.error('Failed to load analytics', err);
        return null;
      }),
      fetchExamTrajectory(activeTrack).catch(err => {
        console.error('Failed to load exam trajectory', err);
        return null;
      })
    ]).then(([analyticsRes, trajectoryRes]) => {
      if (analyticsRes) setData(analyticsRes);
      if (trajectoryRes) setTrajectory(trajectoryRes);
      setLoading(false);
    });
  }, [activeTrack]);

  if (loading || !data) {
    return (
      <div className="py-20 text-center space-y-2">
        <div className="w-6 h-6 border-2 border-vermilion-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-stone-500">
          {language === 'id' ? 'Memuat telemetri diagnostik...' : 'Loading diagnostic telemetry...'}
        </p>
      </div>
    );
  }

  const isJLPT = (activeTrack || data.activeTrack).startsWith('jlpt');
  const hasHistory = data.history && data.history.length > 0;

  // Coordinate mapper for SVG Trajectory Chart
  const getY = (score: number) => {
    if (isJLPT) {
      // Map 0 - 180 score to Y (170 to 30)
      const clamped = Math.max(0, Math.min(180, score));
      return 170 - (clamped / 180) * 140;
    } else {
      // Map Band 4.0 - 9.0 to Y (170 to 30)
      const clamped = Math.max(4.0, Math.min(9.0, score));
      return 170 - ((clamped - 4.0) / 5.0) * 140;
    }
  };

  const targetThreshold = trajectory?.targetThreshold ?? (isJLPT ? 80 : 7.0);
  const targetY = getY(targetThreshold);

  const points = (trajectory?.attempts || []).map(att => {
    const x = 70 + (att.packNumber - 1) * 115;
    const y = getY(att.scaledScore);
    return { x, y, attempt: att };
  });

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="border-b border-washi-300 dark:border-sumi-800 pb-4">
        <div className="flex items-center gap-1.5 text-vermilion-600 dark:text-vermilion-500 text-xs font-semibold mb-0.5">
          <BarChart3 className="w-3.5 h-3.5" />
          <span>{t('analytics.cockpit_badge')}</span>
        </div>
        <h1 className="text-xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
          {t('analytics.cockpit_title')}
        </h1>
        <p className="text-stone-600 dark:text-stone-400 text-xs mt-0.5">
          {t('analytics.cockpit_desc')}
        </p>
      </div>

      {/* Screen 6: Multi-Mock Progression Trajectory Card */}
      <div className="bg-washi-50 dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-xl p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-washi-200 dark:border-sumi-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-vermilion-600 dark:text-vermilion-500 text-xs font-bold uppercase tracking-wider mb-1">
              <TrendingUp className="w-4 h-4" />
              <span>{t('analytics.trajectory_title')}</span>
            </div>
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              {isJLPT ? 'Perkembangan Skor Simulasi Baterai 1–5' : 'Packs 1–5 Mock Progression Trajectory'}
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              {t('analytics.trajectory_desc')}
            </p>
          </div>

          {trajectory && trajectory.attempts.length > 0 && (
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                trajectory.progressionTrend === 'ascending'
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                  : trajectory.progressionTrend === 'needs_reinforcement'
                  ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                  : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                {trajectory.progressionTrend === 'ascending'
                  ? t('analytics.trend_ascending')
                  : trajectory.progressionTrend === 'needs_reinforcement'
                  ? t('analytics.trend_reinforcement')
                  : t('analytics.trend_stable')}
              </span>
            </div>
          )}
        </div>

        {/* If No Attempts Logged Yet: True Empty State */}
        {(!trajectory || trajectory.attempts.length === 0) ? (
          <div className="py-12 px-4 text-center space-y-4 border border-dashed border-washi-300 dark:border-sumi-800 rounded-xl bg-white/40 dark:bg-sumi-950/40">
            <div className="w-12 h-12 rounded-full bg-vermilion-500/10 text-vermilion-600 dark:text-vermilion-400 flex items-center justify-center mx-auto">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div className="max-w-md mx-auto space-y-1">
              <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                {t('analytics.no_trajectory_title')}
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                {t('analytics.no_trajectory_desc')}
              </p>
            </div>
            {onNavigateToExam && (
              <button
                onClick={() => onNavigateToExam()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-vermilion-500 hover:bg-vermilion-600 text-white font-bold text-xs shadow-md transition-colors"
              >
                <span>{t('analytics.launch_pack')} (Paket 1)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {/* 3 Metric Badges: WRI, Margin, and Attempts */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl border border-washi-200 dark:border-sumi-800 bg-white dark:bg-sumi-950 space-y-1">
                <span className="text-[11px] font-semibold text-stone-500 block">
                  {t('analytics.wri_title')}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-vermilion-600 dark:text-vermilion-500">
                    {isJLPT ? `${trajectory.weightedReadinessIndex} / 180` : `Band ${trajectory.weightedReadinessIndex.toFixed(1)}`}
                  </span>
                  <span className="text-[10px] text-stone-400 font-mono">
                    e^0.5(k-1)
                  </span>
                </div>
                <p className="text-[10px] text-stone-400 line-clamp-1">
                  {t('analytics.wri_desc')}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-washi-200 dark:border-sumi-800 bg-white dark:bg-sumi-950 space-y-1">
                <span className="text-[11px] font-semibold text-stone-500 block">
                  {t('analytics.readiness_margin')}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className={`text-2xl font-black ${
                    trajectory.readinessMargin >= 0
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-rose-600 dark:text-rose-400'
                  }`}>
                    {trajectory.readinessMargin >= 0 ? `+${trajectory.readinessMargin}` : trajectory.readinessMargin}
                    <span className="text-xs font-normal ml-1">{isJLPT ? 'Pts' : 'Band'}</span>
                  </span>
                  <span className="text-[10px] text-stone-400 font-mono">
                    {language === 'id' ? 'vs Target' : 'vs Target'} ({trajectory.targetThreshold})
                  </span>
                </div>
                <p className="text-[10px] text-stone-400 line-clamp-1">
                  {trajectory.readinessMargin >= 0
                    ? (language === 'id' ? 'Melebihi target ambang batas kelulusan' : 'Above target passing threshold')
                    : (language === 'id' ? 'Di bawah target ambang batas kelulusan' : 'Below target passing threshold')}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-washi-200 dark:border-sumi-800 bg-white dark:bg-sumi-950 space-y-1">
                <span className="text-[11px] font-semibold text-stone-500 block">
                  {language === 'id' ? 'Paket Selesai / Total' : 'Completed Packs'}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-stone-900 dark:text-stone-100">
                    {trajectory.attempts.length} <span className="text-xs text-stone-400 font-normal">/ 5 Packs</span>
                  </span>
                </div>
                <p className="text-[10px] text-stone-400 line-clamp-1">
                  {language === 'id' ? 'Riwayat ujian longitudinal terverifikasi' : 'Verified longitudinal attempt dataset'}
                </p>
              </div>
            </div>

            {/* Interactive SVG Growth Chart */}
            <div className="p-4 rounded-xl border border-washi-200 dark:border-sumi-800 bg-white dark:bg-sumi-950">
              <div className="flex items-center justify-between text-xs text-stone-500 mb-2 font-mono">
                <span>{language === 'id' ? 'Grafik Progresi Paket 1 → Paket 5' : 'Pack 1 → Pack 5 Growth Trajectory'}</span>
                <span className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-0.5 bg-vermilion-500" />
                    <span>{language === 'id' ? 'Skor Nyata' : 'Actual Score'}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-0.5 border-t border-dashed border-amber-500" />
                    <span>{language === 'id' ? 'Ambang Target' : 'Target Threshold'}</span>
                  </span>
                </span>
              </div>

              {/* Render Responsive SVG Chart */}
              <div className="w-full overflow-x-auto">
                <svg viewBox="0 0 600 200" className="w-full h-48 select-none">
                  {/* Grid Lines */}
                  <line x1="50" y1="30" x2="570" y2="30" stroke="currentColor" className="text-stone-200 dark:text-sumi-800" strokeDasharray="3 3" />
                  <line x1="50" y1="85" x2="570" y2="85" stroke="currentColor" className="text-stone-200 dark:text-sumi-800" strokeDasharray="3 3" />
                  <line x1="50" y1="140" x2="570" y2="140" stroke="currentColor" className="text-stone-200 dark:text-sumi-800" strokeDasharray="3 3" />
                  <line x1="50" y1="170" x2="570" y2="170" stroke="currentColor" className="text-stone-300 dark:text-sumi-700" />

                  {/* Target Threshold Line */}
                  <line
                    x1="50"
                    y1={targetY}
                    x2="570"
                    y2={targetY}
                    stroke="#f59e0b"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                  <text x="575" y={targetY + 4} fill="#f59e0b" fontSize="9" fontWeight="bold">
                    Target ({trajectory.targetThreshold})
                  </text>

                  {/* Data Polyline and Area */}
                  {points.length > 0 && (
                    <>
                      <defs>
                        <linearGradient id="trajectoryGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#e11d48" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#e11d48" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <polygon
                        points={`${points[0].x},170 ${points.map(p => `${p.x},${p.y}`).join(' ')} ${points[points.length - 1].x},170`}
                        fill="url(#trajectoryGrad)"
                      />
                      <polyline
                        points={points.map(p => `${p.x},${p.y}`).join(' ')}
                        fill="none"
                        stroke="#e11d48"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </>
                  )}

                  {/* X Axis Pack Markers */}
                  {[1, 2, 3, 4, 5].map((packNum, i) => {
                    const x = 70 + i * 115;
                    const attempt = trajectory.attempts.find(a => a.packNumber === packNum);
                    const y = attempt ? getY(attempt.scaledScore) : null;
                    return (
                      <g key={packNum}>
                        <text
                          x={x}
                          y="188"
                          textAnchor="middle"
                          fill="currentColor"
                          className="text-stone-500 dark:text-stone-400 font-mono text-[10px]"
                        >
                          {language === 'id' ? `Paket ${packNum}` : `Pack ${packNum}`}
                        </text>
                        {attempt && y !== null ? (
                          <g>
                            <circle cx={x} cy={y} r="6" fill="#e11d48" className="transition-all" />
                            <circle cx={x} cy={y} r="3" fill="#ffffff" />
                            <rect
                              x={x - 22}
                              y={y - 24}
                              width="44"
                              height="18"
                              rx="4"
                              fill="#1c1917"
                              className="dark:fill-stone-100"
                            />
                            <text
                              x={x}
                              y={y - 12}
                              textAnchor="middle"
                              fill="#ffffff"
                              className="dark:fill-stone-900 font-bold font-mono text-[9px]"
                            >
                              {isJLPT ? `${attempt.scaledScore}p` : `B ${attempt.scaledScore.toFixed(1)}`}
                            </text>
                          </g>
                        ) : (
                          <circle cx={x} cy="170" r="3" fill="currentColor" className="text-stone-300 dark:text-sumi-800" />
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Longitudinal History Table */}
            <div className="border border-washi-200 dark:border-sumi-800 rounded-xl overflow-hidden bg-white dark:bg-sumi-950">
              <div className="p-3 bg-washi-100 dark:bg-sumi-900 border-b border-washi-200 dark:border-sumi-800 flex items-center justify-between">
                <span className="text-xs font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-vermilion-500" />
                  <span>{t('analytics.history_table_title')}</span>
                </span>
                <span className="text-[10px] text-stone-400 font-mono">
                  {trajectory.attempts.length} {language === 'id' ? 'percobaan tersimpan' : 'logged attempts'}
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-washi-200 dark:border-sumi-800 text-[11px] text-stone-500 font-semibold bg-washi-50 dark:bg-sumi-900/50">
                      <th className="py-2.5 px-3">{t('analytics.pack_col')}</th>
                      <th className="py-2.5 px-3">{t('analytics.score_col')}</th>
                      <th className="py-2.5 px-3">{t('analytics.target_delta_col')}</th>
                      <th className="py-2.5 px-3">{t('analytics.time_col')}</th>
                      <th className="py-2.5 px-3">{t('analytics.date_col')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-washi-200 dark:divide-sumi-800 text-stone-700 dark:text-stone-300">
                    {trajectory.attempts.map((att, idx) => {
                      const delta = isJLPT
                        ? att.scaledScore - trajectory.targetThreshold
                        : Math.round((att.scaledScore - trajectory.targetThreshold) * 10) / 10;
                      const mins = Math.floor(att.timeSpentSeconds / 60);
                      const secs = att.timeSpentSeconds % 60;
                      return (
                        <tr key={att.id || idx} className="hover:bg-washi-50 dark:hover:bg-sumi-900/40 transition-colors">
                          <td className="py-2.5 px-3 font-semibold">
                            {language === 'id' ? `Paket ${att.packNumber}` : `Pack ${att.packNumber}`}
                          </td>
                          <td className="py-2.5 px-3 font-mono font-bold text-vermilion-600 dark:text-vermilion-400">
                            {isJLPT ? `${att.scaledScore} / 180` : `Band ${att.scaledScore.toFixed(1)}`}
                          </td>
                          <td className="py-2.5 px-3 font-mono font-semibold">
                            <span className={delta >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}>
                              {delta >= 0 ? `+${delta}` : delta}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 font-mono text-stone-500">
                            {mins}m {secs}s
                          </td>
                          <td className="py-2.5 px-3 text-stone-400 text-[11px]">
                            {new Date(att.completedAt).toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-washi-50 dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-lg p-5 space-y-1.5 shadow-sm">
          <span className="text-xs text-stone-500 font-medium">{t('analytics.projected_score')}</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-stone-900 dark:text-stone-100">
              {hasHistory ? `${data.projectedScore} / 180` : '0%'}
            </span>
            <span className="text-xs text-stone-500 font-medium">
              {hasHistory ? (language === 'id' ? 'Aktif' : 'Active') : (language === 'id' ? 'Belum Terkalibrasi' : 'Uncalibrated')}
            </span>
          </div>
          <span className="text-[11px] text-stone-400 block">
            {hasHistory
              ? `${language === 'id' ? 'Rentang Keyakinan' : 'Confidence'}: [${data.confidenceInterval[0]} – ${data.confidenceInterval[1]}]`
              : t('analytics.calibrate_prompt')}
          </span>
        </div>

        <div className="bg-washi-50 dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-lg p-5 space-y-1.5 shadow-sm">
          <span className="text-xs text-stone-500 font-medium">
            {isJLPT ? t('analytics.pass_mark') : (language === 'id' ? 'Target Pascasarjana' : 'Postgraduate Target')}
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-vermilion-600 dark:text-vermilion-500">
              {isJLPT ? (data.activeTrack === 'jlpt_n5' ? '80 Pts' : '90 Pts') : `${data.targetScore} Band`}
            </span>
            <span className="text-xs text-stone-500">{t('analytics.target_label')}</span>
          </div>
          <span className="text-[11px] text-stone-400 block">
            {isJLPT
              ? (language === 'id' ? 'Batas kelulusan minimum per bagian berlaku.' : 'Combined sectional minimums apply.')
              : (language === 'id' ? 'Syarat minimum untuk penerimaan masuk.' : 'Minimum requirement for admissions.')}
          </span>
        </div>

        <div className="bg-washi-50 dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-lg p-5 space-y-1.5 shadow-sm">
          <span className="text-xs text-stone-500 font-medium">{t('analytics.srs_retention')}</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-stone-900 dark:text-stone-100">
              {data.srsMemoryHealth?.retentionProbabilityPct}%
            </span>
            <span className="text-xs text-stone-500">{t('analytics.stability_label')}</span>
          </div>
          <span className="text-[11px] text-stone-400 block">
            {data.srsMemoryHealth?.dueToday} {language === 'id' ? 'kartu perlu diulang hari ini.' : 'items due for recall today.'}
          </span>
        </div>
      </div>

      {/* JLPT Sectional Safeguard (True State) */}
      {data.jlptSectionalGauges && (
        <div className="bg-washi-50 dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-lg p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-washi-200 dark:border-sumi-800 pb-2.5">
            <div>
              <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-sm flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-stone-700 dark:text-stone-300" />
                <span>{language === 'id' ? 'Perlindungan Batas Kelulusan Bagian JLPT' : 'JLPT Sectional Cutoff Safeguard'}</span>
              </h3>
              <p className="text-[11px] text-stone-500 mt-0.5">
                {language === 'id'
                  ? 'Memantau skor masing-masing bagian terhadap ambang batas kelulusan wajib.'
                  : 'Tracks individual section scores against mandatory minimum thresholds.'}
              </p>
            </div>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-washi-200 dark:bg-sumi-800 text-stone-600 dark:text-stone-400">
              {language === 'id' ? 'Proteksi Ambang Batas Aktif' : 'Cutoff Protection Active'}
            </span>
          </div>

          <div className="space-y-3 pt-1">
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-stone-700 dark:text-stone-300">
                <span>{language === 'id' ? 'Pengetahuan Bahasa & Membaca' : 'Language Knowledge & Reading'}</span>
                <span>{data.jlptSectionalGauges.languageKnowledge.score} / {data.jlptSectionalGauges.languageKnowledge.max} ({language === 'id' ? 'Batas' : 'Cutoff'}: {data.jlptSectionalGauges.languageKnowledge.cutoff})</span>
              </div>
              <div className="w-full bg-washi-200 dark:bg-sumi-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-vermilion-500 h-1.5"
                  style={{ width: `${(data.jlptSectionalGauges.languageKnowledge.score / data.jlptSectionalGauges.languageKnowledge.max) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs text-stone-700 dark:text-stone-300">
                <span>{language === 'id' ? 'Pemahaman Mendengarkan' : 'Listening Comprehension'}</span>
                <span>{data.jlptSectionalGauges.listening.score} / 60 ({language === 'id' ? 'Batas' : 'Cutoff'}: 19)</span>
              </div>
              <div className="w-full bg-washi-200 dark:bg-sumi-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-stone-500 h-1.5"
                  style={{ width: `${(data.jlptSectionalGauges.listening.score / 60) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

