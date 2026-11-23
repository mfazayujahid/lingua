import React, { useState, useEffect } from 'react';
import { fetchAnalytics } from '../api';
import { DiagnosticAnalytics } from '../../../shared/types';
import {
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Brain,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AnalyticsViewProps {
  onPracticeWeakSpot?: (tag: string) => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ onPracticeWeakSpot }) => {
  const { t, language } = useLanguage();
  const [data, setData] = useState<DiagnosticAnalytics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchAnalytics()
      .then(res => {
        setData(res);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load analytics', err);
        setLoading(false);
      });
  }, []);

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

  const isJLPT = data.activeTrack.startsWith('jlpt');
  const hasHistory = data.history && data.history.length > 0;

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
