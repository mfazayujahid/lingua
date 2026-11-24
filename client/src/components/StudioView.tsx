import React, { useState, useEffect } from 'react';
import { evaluateWritingEssay, fetchModelAnswer, fetchWritingPrompt } from '../api';
import { LevelCode, WritingEvaluationResult } from '../../../shared/types';
import {
  PenTool,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FileText,
  Award
} from 'lucide-react';
import { useFurigana } from '../context/FuriganaContext';
import { useLanguage } from '../context/LanguageContext';
import { WritingStudioView } from './WritingStudioView';

interface StudioViewProps {
  activeTrack?: LevelCode;
}

// Full Indonesian localizations for writing prompts and criteria across all tracks
const LOCALIZED_STUDIO_PROMPTS: Record<string, {
  promptId: string;
  guidelinesId: string;
  rubricLabelsId: { c1: string; c2: string; c3: string; c4: string };
  modelRationaleId: string;
}> = {
  jlpt_n5: {
    promptId: '【Tugas Menulis】Tulis karangan singkat untuk memperkenalkan diri: sebutkan nama, asal negara, pekerjaan/jurusan kuliah, dan bagaimana Anda menghabiskan hari biasa (waktu bangun tidur, aktivitas di kampus atau tempat kerja, dan kegiatan malam hari). Gunakan partikel kasus dasar yang telah dipelajari (は, が, を, に, で) dan bentuk sopan (〜です, 〜ます).',
    guidelinesId: 'Panjang: 150–250 karakter • Waktu Disarankan: 20 menit • Partikel Wajib: は, が, を, に, で',
    rubricLabelsId: {
      c1: 'Tata Bahasa & Partikel Kasus (助詞と文法)',
      c2: 'Tingkat Kesopanan & Huruf (です・ます調と文字)',
      c3: 'Kosakata & Kolokasi Alami (語彙とコロケーション)',
      c4: 'Koherensi & Alur Logis (構成と一貫性)'
    },
    modelRationaleId: 'Partikel waktu に, tempat kegiatan で, arah tujuan へ, dan objek langsung を digunakan dengan tepat. Gaya bahasa konsisten sopan です/ます dengan urutan kalimat yang logis.'
  },
  jlpt_n4: {
    promptId: '【Tugas Menulis】Tulis email atau surat singkat kepada guru atau senior (先輩). Jelaskan pengalaman menarik yang Anda alami akhir pekan lalu dan rencana untuk minggu depan. Masukkan bentuk kata kerja potensial (書ける, 行くことができる) dan ungkapan budi baik (〜てもらう, 〜てくれる).',
    guidelinesId: 'Panjang: 200–350 karakter • Waktu Disarankan: 25 menit • Wajib: Kata kerja potensial & ungkapan budi baik',
    rubricLabelsId: {
      c1: 'Tata Bahasa Kompleks & Ungkapan Budi Baik (複文と授受表現)',
      c2: 'Ragam Bahasa Sopan & Kesantunan Sosial (待遇表現・敬意伝達)',
      c3: 'Ketepatan Kanji & Pemilihan Kosakata (漢字と語彙選定)',
      c4: 'Koherensi Tugas & Tujuan Komunikasi (段落展開と伝達明確性)'
    },
    modelRationaleId: 'Ungkapan budi baik sopan (〜てくださる, 〜ていただく) dan kemampuan potensial (行くことができない) terintegrasi secara alami dalam konteks sosial yang santun.'
  },
  jlpt_n3: {
    promptId: '【Tugas Menulis】Tulis esai opini analitis yang membandingkan kerja jarak jauh (telework) dan kerja di kantor. Bandingkan kelebihan dan kekurangan masing-masing menggunakan pola tata bahasa kontras (〜に対して, 〜反面, 〜一方で), lalu sampaikan kesimpulan logis Anda sendiri.',
    guidelinesId: 'Panjang: 300–450 karakter • Waktu Disarankan: 30 menit • Wajib: Pola tata bahasa perbandingan kontras',
    rubricLabelsId: {
      c1: 'Penghubung Kontras Logis (対比・接続表現の運用)',
      c2: 'Koherensi & Argumentasi (論理的一貫性と根拠)',
      c3: 'Kosakata Menengah & Kanji Majemuk (中級語彙と漢字熟語)',
      c4: 'Ragam Bahasa Objektif Formal (客観的常体表現の維持)'
    },
    modelRationaleId: 'Kata hubung kontras logis (反面, これに対して, 一方で) diterapkan dengan presisi struktural menuju rekomendasi objektif yang jelas dalam ragam formal Da/Dewa.'
  },
  jlpt_n2: {
    promptId: '【Tugas Menulis】Tulis esai bisnis formal yang menganalisis bagaimana perusahaan dapat melestarikan pengetahuan tak berwujud (暗黙知) di tengah pesatnya digitalisasi tempat kerja. Masukkan pola modalitas tingkat lanjut (〜にほかならない, 〜を余儀なくされる) dan uraikan solusi strategis organisasi.',
    guidelinesId: 'Panjang: 400–600 karakter • Waktu Disarankan: 35 menit • Wajib: Penanda modalitas tingkat lanjut',
    rubricLabelsId: {
      c1: 'Modalitas & Sintaksis Tingkat Lanjut (上級モダリティと構文)',
      c2: 'Penalaran Konseptual Kritis (概念展開と批判的論理力)',
      c3: 'Kosakata Praktik Bisnis & Abstrak (実務・抽象語彙の網羅度)',
      c4: 'Ragam Bahasa Ilmiah Formal (論文体文末・格調の統制)'
    },
    modelRationaleId: 'Penegasan modalitas tinggi (にほかならない, 余儀なくされる) dipadukan dengan wacana strategis korporat dan terminologi organisasi yang mendalam.'
  },
  jlpt_n1: {
    promptId: '【Tugas Menulis】Tulis esai filosofis tingkat tinggi dengan tema "Munculnya Sistem AI Otonom dan Krisis Epistemik Subjek Manusia". Analisis bagaimana optimalisasi algoritmik memengaruhi pengambilan keputusan mandiri dan pemikiran kritis dari sudut pandang filsafat.',
    guidelinesId: 'Panjang: 500–800 karakter • Waktu Disarankan: 40 menit • Wajib: Wacana akademis ragam formal tinggi',
    rubricLabelsId: {
      c1: 'Wacana Epistemologis Ilmiah (学術・認識論的言説の洗練度)',
      c2: 'Kritik Konseptual Dialektis (弁証法的批判と概念操作力)',
      c3: 'Ragam Bahasa Formal Puncak (最高度論文体・文末格調の統制)',
      c4: 'Ketelitian Filosofis & Orisinalitas Pemikiran (哲学的論証の厳密性と独自性)'
    },
    modelRationaleId: 'Kritik filosofis yang terintegrasi mendalam berdasarkan semiotika dan epistemologi, dengan eksekusi sempurna penanda ragam bahasa puncak.'
  },
  ielts_academic: {
    promptId: '[Writing Task 1 & 2]Present a reasoned argument or analysis on academic trends, organizing your response with formal register, appropriate cohesive devices, and varied lexical resource.',
    guidelinesId: 'Length: 250+ words • Recommended Time: 40 minutes • Formal academic register required',
    rubricLabelsId: {
      c1: 'Respon Tugas (Task Achievement / Response)',
      c2: 'Koherensi & Keterpaduan (Coherence & Cohesion)',
      c3: 'Kekayaan Leksikal (Lexical Resource)',
      c4: 'Rentang Gramatikal & Akurasi (Grammatical Range)'
    },
    modelRationaleId: 'Logika argumen yang tertata dengan piranti kohesi yang bervariasi dan struktur kalimat kompleks yang akurat.'
  },
  ielts_general: {
    promptId: '[Writing Task 1 & 2]Write a formal or semi-formal letter explaining a situation and requesting appropriate action from the relevant authority or organization.',
    guidelinesId: 'Length: 150+ words for Task 1, 250+ words for Task 2 • Recommended Time: 40 minutes',
    rubricLabelsId: {
      c1: 'Pemenuhan Tujuan Komunikasi (Task Achievement)',
      c2: 'Koherensi & Alur Surat (Coherence & Cohesion)',
      c3: 'Ketepatan Kosakata Formal (Lexical Resource)',
      c4: 'Akurasi Tata Bahasa & Format (Grammatical Accuracy)'
    },
    modelRationaleId: 'Nada surat formal yang konsisten dengan rincian poin tugas yang tersampaikan secara jelas dan santun.'
  }
};


const LEVEL_BADGES_ID: Record<string, string> = {
  jlpt_n5: 'Penulisan Dasar JLPT N5',
  jlpt_n4: 'Penulisan Paragraf JLPT N4',
  jlpt_n3: 'Penulisan Ringkasan JLPT N3',
  jlpt_n2: 'Penulisan Opini JLPT N2',
  jlpt_n1: 'Analisis Diskursif JLPT N1',
  ielts_academic: 'IELTS Esai Akademik Task 2',
  ielts_general: 'IELTS Surat Formal Task 1'
};

export const StudioView: React.FC<StudioViewProps> = ({
  activeTrack = 'jlpt_n5'
}) => {
  if (activeTrack.startsWith('ielts_')) {
    return <WritingStudioView activeTrack={activeTrack} />;
  }

  const { renderFurigana } = useFurigana();
  const { t, language } = useLanguage();

  const [promptConfig, setPromptConfig] = useState<any>(null);
  const [essayText, setEssayText] = useState<string>('');
  const [evaluating, setEvaluating] = useState<boolean>(false);
  const [evaluation, setEvaluation] = useState<WritingEvaluationResult | null>(null);
  const [modelAnswer, setModelAnswer] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'editor' | 'model'>('editor');
  const [loading, setLoading] = useState<boolean>(true);

  const isJapanese = activeTrack.startsWith('jlpt_');

  // Load level-specific prompt configuration whenever activeTrack changes
  useEffect(() => {
    setLoading(true);
    setEvaluation(null);
    setModelAnswer(null);
    setEssayText('');
    setActiveTab('editor');

    fetchWritingPrompt(activeTrack)
      .then(cfg => {
        setPromptConfig(cfg);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load prompt config', err);
        setLoading(false);
      });
  }, [activeTrack]);

  // Compute text units (character count for Japanese, word count for English)
  const currentUnitCount = isJapanese
    ? essayText.replace(/\s+/g, '').length
    : essayText.trim().split(/\s+/).filter(w => w.length > 0).length;

  const minRequiredUnits = promptConfig?.minUnits || (isJapanese ? 150 : 250);
  const unitSatisfied = currentUnitCount >= minRequiredUnits;

  // Resolve localized strings for prompt instructions
  const localizedInfo = LOCALIZED_STUDIO_PROMPTS[activeTrack] || LOCALIZED_STUDIO_PROMPTS.jlpt_n5;
  const promptText = language === 'id' && localizedInfo ? localizedInfo.promptId : promptConfig?.prompt || '';
  const guidelinesText = language === 'id' && localizedInfo ? localizedInfo.guidelinesId : promptConfig?.guidelines || '';
  const rubricLabels = language === 'id' && localizedInfo ? localizedInfo.rubricLabelsId : promptConfig?.rubricLabels || {
    c1: 'Grammar & Case Particles (助詞と文法)',
    c2: 'Polite Register & Kana Accuracy (です・ます調と文字)',
    c3: 'Vocabulary & Natural Collocations (語彙とコロケーション)',
    c4: 'Coherence & Logical Flow (構成と一貫性)'
  };
  const unitLabel = isJapanese ? (language === 'id' ? 'huruf' : '文字') : (language === 'id' ? 'kata' : 'words');

  const handleEvaluate = async () => {
    if (!essayText.trim()) return;
    setEvaluating(true);
    try {
      const res = await evaluateWritingEssay(essayText, 2, activeTrack);
      setEvaluation(res);
    } catch (err) {
      console.error('Failed to evaluate essay', err);
    } finally {
      setEvaluating(false);
    }
  };

  const handleLoadModel = async () => {
    if (!modelAnswer) {
      const res = await fetchModelAnswer(activeTrack);
      setModelAnswer(res);
    }
    setActiveTab('model');
  };

  const insertSampleDraft = () => {
    if (promptConfig?.sampleStudent) {
      setEssayText(promptConfig.sampleStudent);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center space-y-3">
        <div className="w-8 h-8 border-2 border-vermilion-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-stone-500 dark:text-stone-400">
          {language === 'id'
            ? `Memuat petunjuk penulisan untuk ${activeTrack.toUpperCase()}...`
            : `Loading composition prompts for ${activeTrack.toUpperCase()}...`}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn max-w-5xl mx-auto pb-12">
      {/* Studio Header */}
      <div className="border-b border-washi-300 dark:border-sumi-800 pb-4 sm:pb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-vermilion-600 dark:text-vermilion-500 text-xs font-semibold mb-1">
            <PenTool className="w-4 h-4" />
            <span>{t('studio.header_badge')}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 tracking-tight flex items-center gap-2">
            <span>{t('studio.header_title')}</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-vermilion-500/10 text-vermilion-600 dark:text-vermilion-500 border border-vermilion-500/20 font-semibold">
              {language === 'id' ? (LEVEL_BADGES_ID[activeTrack] || promptConfig?.badge || activeTrack.toUpperCase()) : (promptConfig?.badge || activeTrack.toUpperCase())}
            </span>
          </h1>
          <p className="text-stone-600 dark:text-stone-400 text-xs mt-1">
            {t('studio.header_desc')}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('editor')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'editor'
                ? 'bg-vermilion-500 text-white shadow-sm'
                : 'bg-washi-200 dark:bg-sumi-800 text-stone-700 dark:text-stone-300 hover:bg-washi-300 dark:hover:bg-sumi-750'
            }`}
          >
            {t('studio.tab_editor')}
          </button>
          <button
            onClick={handleLoadModel}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === 'model'
                ? 'bg-vermilion-500 text-white shadow-sm'
                : 'bg-washi-200 dark:bg-sumi-800 text-stone-700 dark:text-stone-300 hover:bg-washi-300 dark:hover:bg-sumi-750'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-500" />
            {t('studio.tab_model')}
          </button>
        </div>
      </div>

      {/* Task Prompt Box */}
      <div className="bg-washi-50 dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-xl p-4 sm:p-5 space-y-2 shadow-sm">
        <span className="text-[11px] font-bold text-vermilion-600 dark:text-vermilion-500 uppercase tracking-wider block">
          {t('studio.prompt_header')}
        </span>
        <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 font-medium leading-relaxed font-jp whitespace-pre-line">
          {renderFurigana(promptText)}
        </p>
        <span className="text-[11px] text-stone-500 dark:text-stone-400 block pt-1 border-t border-washi-200 dark:border-sumi-800">
          {renderFurigana(guidelinesText)}
        </span>
      </div>

      {activeTab === 'editor' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Editor Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-washi-50 dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-xl p-4 shadow-sm space-y-3">
              <div className="flex items-center justify-between text-xs text-stone-500 border-b border-washi-200 dark:border-sumi-800 pb-2">
                <div className="flex items-center gap-2">
                  <span className={unitSatisfied ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-amber-600 dark:text-amber-400 font-semibold'}>
                    {t('studio.unit_count', { count: currentUnitCount, unit: unitLabel })}
                  </span>
                  <span>{t('studio.unit_min', { min: minRequiredUnits })}</span>
                </div>
                <button
                  type="button"
                  onClick={insertSampleDraft}
                  className="text-xs text-vermilion-600 dark:text-vermilion-500 hover:underline font-medium"
                >
                  {t('studio.load_sample')}
                </button>
              </div>

              <textarea
                value={essayText}
                onChange={(e) => setEssayText(e.target.value)}
                placeholder={isJapanese ? t('studio.placeholder_jp') : t('studio.placeholder_en')}
                rows={13}
                className="w-full bg-white dark:bg-sumi-950 border border-washi-300 dark:border-sumi-800 rounded-lg p-4 text-stone-900 dark:text-stone-100 text-sm leading-relaxed focus:outline-none focus:ring-1 focus:ring-vermilion-500 font-jp resize-y"
              />

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                {!unitSatisfied && (
                  <span className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {t('studio.needs_more', { diff: minRequiredUnits - currentUnitCount, unit: unitLabel })}
                  </span>
                )}
                {unitSatisfied && (
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {t('studio.length_satisfied')}
                  </span>
                )}

                <button
                  onClick={handleEvaluate}
                  disabled={evaluating || currentUnitCount < (isJapanese ? 15 : 20)}
                  className="ml-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-vermilion-500 hover:bg-vermilion-600 text-white text-xs font-semibold shadow-sm disabled:opacity-40 transition-all"
                >
                  {evaluating ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{t('studio.evaluating')}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>{t('studio.evaluate_btn')}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Diagnostic Rubric Scores Column */}
          <div className="space-y-4">
            {evaluation ? (
              <div className="bg-washi-50 dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-xl p-5 shadow-sm space-y-4 animate-fadeIn">
                <div className="border-b border-washi-200 dark:border-sumi-800 pb-3 flex items-baseline justify-between">
                  <span className="text-xs text-stone-500 font-medium">{t('studio.predicted_score')}</span>
                  <span className="text-3xl font-extrabold text-vermilion-600 dark:text-vermilion-500">
                    {isJapanese ? `${evaluation.overallBand} / 9.0` : `Band ${evaluation.overallBand}`}
                  </span>
                </div>

                {/* 4 Criteria Sub-Scores */}
                <div className="space-y-3">
                  <div className="bg-washi-100 dark:bg-sumi-950 p-3 rounded-lg border border-washi-200 dark:border-sumi-850">
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-stone-800 dark:text-stone-200">
                        {renderFurigana(rubricLabels?.c1 || 'Kriteria 1')}
                      </span>
                      <span className="text-vermilion-600 dark:text-vermilion-500 font-bold">
                        {evaluation.criteria.taskResponseOrAchievement.score}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-normal">
                      {renderFurigana(evaluation.criteria.taskResponseOrAchievement.feedback)}
                    </p>
                  </div>

                  <div className="bg-washi-100 dark:bg-sumi-950 p-3 rounded-lg border border-washi-200 dark:border-sumi-850">
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-stone-800 dark:text-stone-200">
                        {renderFurigana(rubricLabels?.c2 || 'Kriteria 2')}
                      </span>
                      <span className="text-vermilion-600 dark:text-vermilion-500 font-bold">
                        {evaluation.criteria.coherenceAndCohesion.score}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-normal">
                      {renderFurigana(evaluation.criteria.coherenceAndCohesion.feedback)}
                    </p>
                  </div>

                  <div className="bg-washi-100 dark:bg-sumi-950 p-3 rounded-lg border border-washi-200 dark:border-sumi-850">
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-stone-800 dark:text-stone-200">
                        {renderFurigana(rubricLabels?.c3 || 'Kriteria 3')}
                      </span>
                      <span className="text-vermilion-600 dark:text-vermilion-500 font-bold">
                        {evaluation.criteria.lexicalResource.score}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-normal">
                      {renderFurigana(evaluation.criteria.lexicalResource.feedback)}
                    </p>
                  </div>

                  <div className="bg-washi-100 dark:bg-sumi-950 p-3 rounded-lg border border-washi-200 dark:border-sumi-850">
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-stone-800 dark:text-stone-200">
                        {renderFurigana(rubricLabels?.c4 || 'Kriteria 4')}
                      </span>
                      <span className="text-vermilion-600 dark:text-vermilion-500 font-bold">
                        {evaluation.criteria.grammaticalRangeAndAccuracy.score}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-normal">
                      {renderFurigana(evaluation.criteria.grammaticalRangeAndAccuracy.feedback)}
                    </p>
                  </div>
                </div>

                {/* Annotated Suggestions */}
                {evaluation.annotatedCorrections && evaluation.annotatedCorrections.length > 0 && (
                  <div className="pt-2 border-t border-washi-200 dark:border-sumi-800 space-y-2">
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
                      {t('studio.diagnostic_improvements')}
                    </span>
                    <div className="space-y-2">
                      {evaluation.annotatedCorrections.map((corr, i) => (
                        <div key={i} className="text-xs bg-washi-100 dark:bg-sumi-950 p-2.5 rounded border border-washi-200 dark:border-sumi-800 space-y-1">
                          <div className="flex items-center gap-1.5 text-rose-500 font-mono text-[11px]">
                            <span className="line-through">{corr.originalText}</span>
                            <span>→</span>
                            <span className="text-emerald-600 dark:text-emerald-400 font-bold">{corr.suggestion}</span>
                          </div>
                          <p className="text-[11px] text-stone-600 dark:text-stone-400">{renderFurigana(corr.reason)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-washi-50 dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-xl p-6 text-center space-y-3 shadow-sm">
                <FileText className="w-8 h-8 text-stone-400 mx-auto" />
                <h4 className="font-semibold text-stone-800 dark:text-stone-200 text-sm">
                  {t('studio.rubric_ready_title')}
                </h4>
                <p className="text-xs text-stone-500">
                  {t('studio.rubric_ready_desc', { min: minRequiredUnits, unit: unitLabel })}
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Model Benchmark Tab */
        <div className="bg-washi-50 dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-xl p-6 sm:p-8 space-y-5 shadow-sm animate-fadeIn">
          <div className="flex items-center justify-between border-b border-washi-200 dark:border-sumi-800 pb-4">
            <div>
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                {t('studio.official_benchmark')}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 mt-0.5 font-jp">
                {renderFurigana(modelAnswer?.title || promptConfig?.modelAnswer?.title || '')}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-xl sm:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                {modelAnswer?.bandScore || promptConfig?.modelAnswer?.scoreLabel}
              </span>
              <span className="text-xs text-stone-400 block font-mono">
                {modelAnswer?.wordCount || promptConfig?.modelAnswer?.length} {unitLabel}
              </span>
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none text-stone-800 dark:text-stone-200 text-sm font-serif leading-7 whitespace-pre-line bg-white dark:bg-sumi-950 p-6 rounded-xl border border-washi-200 dark:border-sumi-800 font-jp">
            {renderFurigana(modelAnswer?.essay || promptConfig?.modelAnswer?.text || '')}
          </div>

          <div className="bg-vermilion-500/10 border border-vermilion-500/20 rounded-xl p-4 text-xs text-vermilion-700 dark:text-vermilion-400 space-y-1">
            <span className="font-bold">{t('studio.pedagogical_justification')}</span>
            <p>
              {renderFurigana(language === 'id' && localizedInfo ? localizedInfo.modelRationaleId : (modelAnswer?.rationale || promptConfig?.modelAnswer?.rationale || ''))}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
