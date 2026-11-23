import React, { useState, useEffect } from 'react';
import { SRSItem, RecallGrade, LevelCode } from '../../../shared/types';
import { fetchSRSQueue, submitSRSReview } from '../api';
import {
  Volume2,
  CheckCircle2,
  Eye,
  EyeOff,
  RotateCcw
} from 'lucide-react';
import { playStrokeSuccessSound } from '../lib/sound';
import { useFurigana } from '../context/FuriganaContext';
import { useLanguage } from '../context/LanguageContext';

interface SRSReviewerViewProps {
  activeTrack?: LevelCode;
  onSessionComplete?: () => void;
  onNavigate?: (view: string) => void;
}

export const SRSReviewerView: React.FC<SRSReviewerViewProps> = ({
  activeTrack = 'jlpt_n5',
  onSessionComplete,
  onNavigate
}) => {
  const isJapaneseTrack = activeTrack.startsWith('jlpt_');
  const { furiganaEnabled, toggleFurigana, renderFurigana } = useFurigana();
  const { t, language } = useLanguage();

  const [items, setItems] = useState<SRSItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [completed, setCompleted] = useState<boolean>(false);
  const [reviewedCount, setReviewedCount] = useState<number>(0);

  useEffect(() => {
    loadQueue();
  }, []);

  const loadQueue = async () => {
    setLoading(true);
    try {
      const data = await fetchSRSQueue();
      setItems(data.items || []);
      setCurrentIndex(0);
      setIsFlipped(false);
      setCompleted(!data.items || data.items.length === 0);
    } catch (err) {
      console.error('Failed to load SRS queue', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRate = async (grade: RecallGrade) => {
    if (items.length === 0) return;
    const currentItem = items[currentIndex];

    try {
      await submitSRSReview(currentItem.id, grade);
      playStrokeSuccessSound();
      setReviewedCount(prev => prev + 1);

      if (currentIndex + 1 < items.length) {
        setCurrentIndex(prev => prev + 1);
        setIsFlipped(false);
      } else {
        setCompleted(true);
        if (onSessionComplete) onSessionComplete();
      }
    } catch (err) {
      console.error('Failed to submit review', err);
    }
  };

  const speakText = (text: string) => {
    try {
      if ('speechSynthesis' in window) {
        const ut = new SpeechSynthesisUtterance(text);
        ut.lang = items[currentIndex]?.itemType === 'kanji' ? 'ja-JP' : 'en-US';
        window.speechSynthesis.speak(ut);
      }
    } catch (e) {
      console.error('TTS error', e);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (completed || loading) return;

      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped(prev => !prev);
      } else if (isFlipped) {
        if (e.key === '1') handleRate(1);
        if (e.key === '2') handleRate(2);
        if (e.key === '3') handleRate(3);
        if (e.key === '4') handleRate(4);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFlipped, currentIndex, items, completed, loading]);

  if (loading) {
    return (
      <div className="py-20 text-center space-y-3">
        <div className="w-8 h-8 border-2 border-vermilion-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-stone-500 dark:text-stone-400">
          {language === 'id' ? 'Memuat antrean pengulangan berjeda (FSRS)...' : 'Loading Spaced Repetition queue...'}
        </p>
      </div>
    );
  }

  if (completed || items.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-6 animate-fadeIn pb-12">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 tracking-tight">
            {language === 'id' ? 'Antrean SRS Bersih' : 'SRS Queue Clear'}
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed max-w-md mx-auto">
            {reviewedCount > 0 ? (
              language === 'id' ? (
                <>Anda telah mengulas <span className="text-vermilion-600 dark:text-vermilion-500 font-semibold">{reviewedCount}</span> kartu hari ini. Stabilitas memori telah dikalibrasi sesuai model FSRS.</>
              ) : (
                <>You reviewed <span className="text-vermilion-600 dark:text-vermilion-500 font-semibold">{reviewedCount}</span> items today. Stability and ease factors have been calibrated according to the FSRS model.</>
              )
            ) : (
              language === 'id' ? (
                isJapaneseTrack ? (
            <>0 kartu yang jatuh tempo hari ini. Akun baru dimulai dengan status 0%. Latihlah karakter di Studio Huruf & Kanji atau buka kurikulum untuk menambahkan materi ke antrean pengulangan berjeda.</>
          ) : (
            <>0 kartu yang jatuh tempo hari ini. Buka kurikulum modul IELTS atau selesaikan latihan membaca untuk menambahkan kosakata baru ke antrean pengulangan berjeda.</>
          )
              ) : (
                isJapaneseTrack ? (
            <>0 cards due today. Fresh accounts start with a true 0% empty state. Practice characters in the Kanji Studio or explore lessons in Curriculum to add items to your spaced repetition queue.</>
          ) : (
            <>0 cards due today. Explore IELTS curriculum modules or complete reading passages to add vocabulary items to your spaced repetition queue.</>
          )
              )
            )}
          </p>
        </div>
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={loadQueue}
            className="px-4 py-2 rounded-xl bg-washi-200 dark:bg-sumi-800 hover:bg-washi-300 dark:hover:bg-sumi-750 text-stone-700 dark:text-stone-300 text-xs font-medium transition-colors border border-stone-200 dark:border-stone-700 flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{language === 'id' ? 'Segarkan Antrean' : 'Refresh Queue'}</span>
          </button>
        </div>
      </div>
    );
  }

  const current = items[currentIndex];
  const back = current.backContent;

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn pb-12">
      {/* Session Header / Progress */}
      <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 border-b border-stone-200 dark:border-stone-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-vermilion-500/10 text-vermilion-600 dark:text-vermilion-500 border border-vermilion-500/20 uppercase font-semibold text-[10px]">
            {current.itemType}
          </span>
          <span>
            {language === 'id' ? `Kartu ${currentIndex + 1} dari ${items.length}` : `Card ${currentIndex + 1} of ${items.length}`}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {isJapaneseTrack && (
            <button
              onClick={toggleFurigana}
              className="hover:text-stone-900 dark:hover:text-stone-200 flex items-center gap-1 transition-colors"
              title="Toggle Furigana reading hints"
            >
              {furiganaEnabled ? <Eye className="w-3.5 h-3.5 text-vermilion-600 dark:text-vermilion-500" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>ふりがな</span>
            </button>
          )}
          <span>{language === 'id' ? 'Kemudahan' : 'Ease'}: {current.easeFactor}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-washi-200 dark:bg-sumi-800 h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-vermilion-500 h-1.5 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / items.length) * 100}%` }}
        />
      </div>

      {/* Flashcard Body */}
      <div
        onClick={() => setIsFlipped(prev => !prev)}
        className="min-h-[340px] bg-washi-100 dark:bg-sumi-850 border border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 rounded-2xl p-8 flex flex-col justify-between cursor-pointer shadow-sm relative transition-all duration-300 select-none group"
      >
        {/* Card Front */}
        <div className="text-center space-y-4 my-auto">
          {current.itemType === 'kanji' ? (
            <div className="space-y-2">
              <span className="font-jp text-7xl font-bold text-stone-900 dark:text-stone-100 tracking-wide block">
                {current.prompt}
              </span>
              {furiganaEnabled && back.furigana && (
                <span className="text-sm font-jp text-vermilion-600 dark:text-vermilion-500 font-medium">
                  【{back.furigana}】
                </span>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <span className="text-3xl font-bold text-stone-900 dark:text-stone-100 tracking-tight block">
                {isJapaneseTrack ? renderFurigana(current.prompt) : current.prompt}
              </span>
              {back.reading && (
                <span className="text-xs text-stone-500 dark:text-stone-400 font-mono">
                  {back.reading}
                </span>
              )}
            </div>
          )}

          {!isFlipped && (
            <p className="text-xs text-stone-400 dark:text-stone-500 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors pt-4">
              {language === 'id'
                ? 'Ketuk kartu atau tekan Spasi untuk melihat arti'
                : 'Tap card or press Space to reveal meaning'}
            </p>
          )}
        </div>

        {/* Card Back (Revealed Content) */}
        {isFlipped && (
          <div className="space-y-4 pt-6 border-t border-stone-200 dark:border-stone-800 animate-fadeIn text-left">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-bold text-stone-900 dark:text-stone-100">{back.englishMeaning}</h4>
                {back.reading && <span className="text-xs text-stone-500 dark:text-stone-400 font-jp">{back.reading}</span>}
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  speakText(current.prompt);
                }}
                className="p-2 rounded-lg bg-washi-200 dark:bg-sumi-800 hover:bg-washi-300 dark:hover:bg-sumi-750 text-stone-700 dark:text-stone-300 transition-colors"
                title="Audio Pronunciation"
              >
                <Volume2 className="w-4 h-4 text-vermilion-600 dark:text-vermilion-500" />
              </button>
            </div>

            {back.exampleSentence && (
              <div className="bg-washi-200/50 dark:bg-sumi-900/50 border border-stone-200 dark:border-stone-800 rounded-xl p-3.5 space-y-1">
                <p className="text-sm font-jp text-stone-800 dark:text-stone-200 leading-relaxed">
                  {renderFurigana(back.exampleSentence)}
                </p>
                {back.exampleTranslation && (
                  <p className="text-xs text-stone-500 dark:text-stone-400">{back.exampleTranslation}</p>
                )}
              </div>
            )}

            {back.nuanceNotes && (
              <p className="text-xs text-vermilion-600 dark:text-vermilion-500 italic">
                {language === 'id' ? 'Catatan:' : 'Note:'} {renderFurigana(back.nuanceNotes)}
              </p>
            )}

            {back.collocations && back.collocations.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {back.collocations.map((col: string, idx: number) => (
                  <span key={idx} className="text-[11px] px-2 py-0.5 rounded bg-washi-200 dark:bg-sumi-800 text-stone-700 dark:text-stone-300 border border-stone-300 dark:border-stone-700">
                    {renderFurigana(col)}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 4 Recall Rating Buttons (FSRS Scale) */}
      {isFlipped ? (
        <div className="grid grid-cols-4 gap-3 animate-fadeIn">
          <button
            onClick={() => handleRate(1)}
            className="py-3 px-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-semibold text-center transition-all hover:-translate-y-0.5"
          >
            <span className="block font-bold">{language === 'id' ? '1: Ulangi' : '1: Again'}</span>
            <span className="text-[10px] text-stone-400 dark:text-stone-500 mt-0.5 block">&lt; 10 min</span>
          </button>

          <button
            onClick={() => handleRate(2)}
            className="py-3 px-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-semibold text-center transition-all hover:-translate-y-0.5"
          >
            <span className="block font-bold">{language === 'id' ? '2: Sulit' : '2: Hard'}</span>
            <span className="text-[10px] text-stone-400 dark:text-stone-500 mt-0.5 block">1.2x</span>
          </button>

          <button
            onClick={() => handleRate(3)}
            className="py-3 px-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-semibold text-center transition-all hover:-translate-y-0.5"
          >
            <span className="block font-bold">{language === 'id' ? '3: Baik' : '3: Good'}</span>
            <span className="text-[10px] text-stone-400 dark:text-stone-500 mt-0.5 block">+{Math.round(current.easeFactor)}d</span>
          </button>

          <button
            onClick={() => handleRate(4)}
            className="py-3 px-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold text-center transition-all hover:-translate-y-0.5"
          >
            <span className="block font-bold">{language === 'id' ? '4: Mudah' : '4: Easy'}</span>
            <span className="text-[10px] text-stone-400 dark:text-stone-500 mt-0.5 block">+{Math.round(current.easeFactor * 1.3)}d</span>
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsFlipped(true)}
          className="w-full py-3 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-stone-50 dark:text-stone-900 text-sm font-semibold transition-all shadow-sm"
        >
          {language === 'id' ? 'Tampilkan Jawaban (Spasi)' : 'Show Answer (Space)'}
        </button>
      )}
    </div>
  );
};
