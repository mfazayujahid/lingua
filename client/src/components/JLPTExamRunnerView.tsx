import React, { useState, useEffect, useRef } from 'react';
import {
  JLPTFullExamPackage,
  JLPTQuestionItem,
  JLPTDetailedScoreResult,
  evaluateJLPTSubmissionLocally
} from '../data/jlptMockBank';
import { submitExamAttempt } from '../api';
import { playJLPTChimeSound } from '../lib/sound';
import { JLPTScorecardModal } from './JLPTScorecardModal';
import {
  Clock,
  Flag,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Star,
  Volume2,
  Play,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  FileText,
  Highlighter,
  X,
  Send,
  Eye,
  Sparkles,
  Grid,
  Lock
} from 'lucide-react';
import { useFurigana } from '../context/FuriganaContext';
import { useLanguage } from '../context/LanguageContext';

interface JLPTExamRunnerViewProps {
  examPackage: JLPTFullExamPackage;
  mode: 'strict' | 'practice';
  onExitToHub: () => void;
}

export const JLPTExamRunnerView: React.FC<JLPTExamRunnerViewProps> = ({
  examPackage,
  mode,
  onExitToHub
}) => {
  const { furiganaEnabled, toggleFurigana, renderFurigana } = useFurigana();
  const { t, language } = useLanguage();

  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});
  const [markSheetOpen, setMarkSheetOpen] = useState<boolean>(false);

  // Star Reordering slots per questionNumber: array of 4 (string | null)
  const [starSlotsMap, setStarSlotsMap] = useState<Record<number, (string | null)[]>>({});
  const [draggedChunk, setDraggedChunk] = useState<{ qNum: number; chunk: string; fromSlot?: number } | null>(null);

  // Dokkai Mobile tab & highlighter
  const [mobileDokkaiTab, setMobileDokkaiTab] = useState<'passage' | 'question'>('question');
  const [highlighterColor, setHighlighterColor] = useState<'none' | 'yellow' | 'green'>('none');
  const [highlightedSnippets, setHighlightedSnippets] = useState<Record<string, { text: string; color: 'yellow' | 'green' }[]>>({});

  // Chokai Listening Audio state
  const [chokaiStatus, setChokaiStatus] = useState<Record<number, 'idle' | 'chime' | 'playing' | 'played'>>({});
  const [audioCountdown, setAudioCountdown] = useState<number>(0);
  const [showTranscriptMap, setShowTranscriptMap] = useState<Record<number, boolean>>({});

  // Practice mode explanation peek
  const [revealedExplanation, setRevealedExplanation] = useState<Record<number, boolean>>({});

  // Timers
  const [activeSessionNum, setActiveSessionNum] = useState<number>(examPackage.sessions[0]?.sessionNumber || 1);
  const initialSessionSec = (examPackage.sessions[0]?.durationMinutes || examPackage.totalDurationMinutes) * 60;
  const [sessionSecondsLeft, setSessionSecondsLeft] = useState<number>(initialSessionSec);
  const [totalElapsedSec, setTotalElapsedSec] = useState<number>(0);

  // Modals & Result
  const [showSubmitConfirm, setShowSubmitConfirm] = useState<boolean>(false);
  const [showExitConfirm, setShowExitConfirm] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [scoreResult, setScoreResult] = useState<JLPTDetailedScoreResult | null>(null);

  const audioTimerRef = useRef<number | null>(null);

  const questions = examPackage.questions;
  const currentQuestion: JLPTQuestionItem | undefined = questions[currentIdx];

  // Reset audio on question change
  useEffect(() => {
    stopSpeechSynthesis();
    if (audioTimerRef.current) {
      window.clearInterval(audioTimerRef.current);
      audioTimerRef.current = null;
    }
    setAudioCountdown(0);
  }, [currentIdx]);

  // Cleanup speechSynthesis on unmount
  useEffect(() => {
    return () => {
      stopSpeechSynthesis();
      if (audioTimerRef.current) window.clearInterval(audioTimerRef.current);
    };
  }, []);

  // Main Timer Effect
  useEffect(() => {
    if (scoreResult) return;

    const timer = window.setInterval(() => {
      setTotalElapsedSec(prev => prev + 1);
      if (mode === 'strict') {
        setSessionSecondsLeft(prev => {
          if (prev <= 1) {
            handleFinalSubmit(true);
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => window.clearInterval(timer);
  }, [mode, scoreResult, activeSessionNum]);

  const stopSpeechSynthesis = () => {
    try {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    } catch {}
  };

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const rem = sec % 60;
    return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
  };

  const renderText = (txt: string) => {
    if (!txt) return '';
    // Apply Furigana if global furigana toggle is active
    return furiganaEnabled ? renderFurigana(txt) : txt;
  };

  const handleSelectOption = (qNum: number, optionValue: string) => {
    setAnswers(prev => ({
      ...prev,
      [qNum]: optionValue
    }));
  };

  const handleMarkSheetBubbleClick = (qIdx: number, qNum: number, optionValue: string) => {
    handleSelectOption(qNum, optionValue);
    setCurrentIdx(qIdx);
    const targetQ = questions[qIdx];
    if (targetQ && targetQ.sessionNumber !== activeSessionNum) {
      setActiveSessionNum(targetQ.sessionNumber);
    }
  };

  const handleJumpToQuestion = (qIdx: number) => {
    setCurrentIdx(qIdx);
    const targetQ = questions[qIdx];
    if (targetQ && targetQ.sessionNumber !== activeSessionNum) {
      setActiveSessionNum(targetQ.sessionNumber);
    }
  };

  const handleSessionSwitch = (sessNum: number) => {
    const firstIdxInSession = questions.findIndex(q => q.sessionNumber === sessNum);
    if (firstIdxInSession !== -1) {
      setActiveSessionNum(sessNum);
      setCurrentIdx(firstIdxInSession);
      const sessSpec = examPackage.sessions.find(s => s.sessionNumber === sessNum);
      if (sessSpec && mode === 'strict') {
        setSessionSecondsLeft(sessSpec.durationMinutes * 60);
      }
    }
  };

  const toggleFlag = (qNum: number) => {
    setFlagged(prev => ({ ...prev, [qNum]: !prev[qNum] }));
  };

  // Star Reordering Helpers
  const getSlotsForQuestion = (qNum: number): (string | null)[] => {
    return starSlotsMap[qNum] || [null, null, null, null];
  };

  const updateStarSlots = (q: JLPTQuestionItem, nextSlots: (string | null)[]) => {
    setStarSlotsMap(prev => ({ ...prev, [q.questionNumber]: nextSlots }));
    const starIdx = (q.starPosition || 3) - 1;
    const starValue = nextSlots[starIdx];
    if (starValue) {
      handleSelectOption(q.questionNumber, starValue);
    } else {
      setAnswers(prev => {
        const copy = { ...prev };
        delete copy[q.questionNumber];
        return copy;
      });
    }
  };

  const handleTapChunk = (q: JLPTQuestionItem, chunk: string) => {
    const slots = [...getSlotsForQuestion(q.questionNumber)];
    const existingIdx = slots.indexOf(chunk);
    if (existingIdx !== -1) {
      // Remove from slot back to tray
      slots[existingIdx] = null;
      updateStarSlots(q, slots);
      return;
    }
    const firstEmpty = slots.findIndex(s => s === null);
    if (firstEmpty !== -1) {
      slots[firstEmpty] = chunk;
      updateStarSlots(q, slots);
    }
  };

  const handleClearSlot = (q: JLPTQuestionItem, slotIdx: number) => {
    const slots = [...getSlotsForQuestion(q.questionNumber)];
    if (!slots[slotIdx]) return;
    slots[slotIdx] = null;
    updateStarSlots(q, slots);
  };

  const handleDropOnSlot = (q: JLPTQuestionItem, targetSlotIdx: number) => {
    if (!draggedChunk || draggedChunk.qNum !== q.questionNumber) return;
    const slots = [...getSlotsForQuestion(q.questionNumber)];

    if (draggedChunk.fromSlot !== undefined) {
      // Swap or move between slots
      const prevContent = slots[targetSlotIdx];
      slots[targetSlotIdx] = draggedChunk.chunk;
      slots[draggedChunk.fromSlot] = prevContent;
    } else {
      // From unassigned tray
      const prevIdx = slots.indexOf(draggedChunk.chunk);
      if (prevIdx !== -1) slots[prevIdx] = null;
      slots[targetSlotIdx] = draggedChunk.chunk;
    }
    updateStarSlots(q, slots);
    setDraggedChunk(null);
  };

  const handleResetStar = (q: JLPTQuestionItem) => {
    updateStarSlots(q, [null, null, null, null]);
  };

  // Chokai Audio Player with Official Chime
  const handlePlayChokai = (q: JLPTQuestionItem) => {
    const currentStatus = chokaiStatus[q.questionNumber] || 'idle';
    if (mode === 'strict' && (currentStatus === 'played' || currentStatus === 'playing' || currentStatus === 'chime')) {
      return;
    }

    stopSpeechSynthesis();
    if (audioTimerRef.current) window.clearInterval(audioTimerRef.current);

    setChokaiStatus(prev => ({ ...prev, [q.questionNumber]: 'chime' }));
    playJLPTChimeSound();

    const duration = q.audioDurationSec || 24;
    setAudioCountdown(duration);

    // Start speech 1.4s after official chime completes
    window.setTimeout(() => {
      setChokaiStatus(prev => ({ ...prev, [q.questionNumber]: 'playing' }));

      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        const utter = new SpeechSynthesisUtterance(q.audioScriptJp || q.prompt);
        utter.lang = 'ja-JP';
        utter.rate = 0.92;
        const voices = window.speechSynthesis.getVoices();
        const jpVoice = voices.find(v => v.lang.startsWith('ja'));
        if (jpVoice) utter.voice = jpVoice;

        utter.onend = () => {
          setChokaiStatus(prev => ({ ...prev, [q.questionNumber]: 'played' }));
          if (audioTimerRef.current) {
            window.clearInterval(audioTimerRef.current);
            audioTimerRef.current = null;
          }
          setAudioCountdown(0);
        };
        utter.onerror = () => {
          setChokaiStatus(prev => ({ ...prev, [q.questionNumber]: 'played' }));
        };
        window.speechSynthesis.speak(utter);
      }

      // Countdown fallback/visual sync
      audioTimerRef.current = window.setInterval(() => {
        setAudioCountdown(prev => {
          if (prev <= 1) {
            if (audioTimerRef.current) {
              window.clearInterval(audioTimerRef.current);
              audioTimerRef.current = null;
            }
            setChokaiStatus(st => ({ ...st, [q.questionNumber]: 'played' }));
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 1450);
  };

  // Text Highlighter Handler in Dokkai Passage
  const handlePassageMouseUp = (passageId: string) => {
    if (highlighterColor === 'none') return;
    const sel = window.getSelection()?.toString().trim();
    if (sel && sel.length >= 2 && sel.length <= 140) {
      setHighlightedSnippets(prev => {
        const list = prev[passageId] || [];
        if (list.some(item => item.text === sel)) return prev;
        return {
          ...prev,
          [passageId]: [...list, { text: sel, color: highlighterColor }]
        };
      });
      try {
        window.getSelection()?.removeAllRanges();
      } catch {}
    }
  };

  const renderHighlightedPassageText = (passageId: string, rawText: string) => {
    const snippets = highlightedSnippets[passageId] || [];
    if (snippets.length === 0) {
      return renderText(rawText);
    }

    // Split text on matched highlighted snippets for non-destructive highlight display
    let segments: { text: string; color?: 'yellow' | 'green' }[] = [{ text: rawText }];
    snippets.forEach(snip => {
      const nextSegments: { text: string; color?: 'yellow' | 'green' }[] = [];
      segments.forEach(seg => {
        if (seg.color || !seg.text.includes(snip.text)) {
          nextSegments.push(seg);
        } else {
          const parts = seg.text.split(snip.text);
          parts.forEach((p, idx) => {
            if (p) nextSegments.push({ text: p });
            if (idx < parts.length - 1) {
              nextSegments.push({ text: snip.text, color: snip.color });
            }
          });
        }
      });
      segments = nextSegments;
    });

    return (
      <>
        {segments.map((seg, i) =>
          seg.color ? (
            <mark
              key={i}
              className={`px-0.5 rounded ${
                seg.color === 'yellow'
                  ? 'bg-amber-200/80 dark:bg-amber-500/40 text-stone-900 dark:text-stone-100'
                  : 'bg-emerald-200/80 dark:bg-emerald-500/40 text-stone-900 dark:text-stone-100'
              }`}
            >
              {renderText(seg.text)}
            </mark>
          ) : (
            <React.Fragment key={i}>{renderText(seg.text)}</React.Fragment>
          )
        )}
      </>
    );
  };

  const handleFinalSubmit = async (autoSubmitted = false) => {
    if (submitting) return;
    setSubmitting(true);
    setShowSubmitConfirm(false);
    stopSpeechSynthesis();

    const localEval = evaluateJLPTSubmissionLocally(examPackage, answers, totalElapsedSec);

    // Build payload compatible with POST /api/exams/submit
    const sectionalPayload: Record<string, { correct: number; total: number; percentage: number }> = {
      languageKnowledge: {
        correct: localEval.sectionalScores.languageKnowledge.raw,
        total: localEval.sectionalScores.languageKnowledge.total,
        percentage:
          localEval.sectionalScores.languageKnowledge.total > 0
            ? Math.round(
                (localEval.sectionalScores.languageKnowledge.raw /
                  localEval.sectionalScores.languageKnowledge.total) *
                  100
              )
            : 0
      },
      reading: {
        correct: localEval.sectionalScores.reading.raw,
        total: localEval.sectionalScores.reading.total,
        percentage:
          localEval.sectionalScores.reading.total > 0
            ? Math.round(
                (localEval.sectionalScores.reading.raw / localEval.sectionalScores.reading.total) * 100
              )
            : 0
      },
      listening: {
        correct: localEval.sectionalScores.listening.raw,
        total: localEval.sectionalScores.listening.total,
        percentage:
          localEval.sectionalScores.listening.total > 0
            ? Math.round(
                (localEval.sectionalScores.listening.raw / localEval.sectionalScores.listening.total) * 100
              )
            : 0
      }
    };

    try {
      await submitExamAttempt({
        packageId: examPackage.id,
        levelCode: examPackage.levelCode,
        packNumber: examPackage.packNumber,
        rawScore: localEval.rawScore,
        totalQuestions: localEval.totalQuestions,
        scaledScore: localEval.scaledScore,
        passed: localEval.overallPassed,
        sectionalBreakdown: sectionalPayload,
        timeSpentSeconds: totalElapsedSec
      });
    } catch (err) {
      console.warn('Exam submission remote sync notice:', err);
    } finally {
      setSubmitting(false);
      setScoreResult(localEval);
    }
  };

  const handleRetake = () => {
    setScoreResult(null);
    setAnswers({});
    setFlagged({});
    setStarSlotsMap({});
    setChokaiStatus({});
    setRevealedExplanation({});
    setCurrentIdx(0);
    setTotalElapsedSec(0);
    setActiveSessionNum(examPackage.sessions[0]?.sessionNumber || 1);
    setSessionSecondsLeft(initialSessionSec);
  };

  // If completed, render the Official JLPT Score Report (合否結果通知書)
  if (scoreResult) {
    return (
      <JLPTScorecardModal
        result={scoreResult}
        onCloseToHub={onExitToHub}
        onRetake={handleRetake}
      />
    );
  }

  const answeredCount = Object.keys(answers).length;
  const flaggedCount = Object.values(flagged).filter(Boolean).length;
  const currentPassage = currentQuestion?.passageId
    ? examPackage.passages.find(p => p.id === currentQuestion.passageId)
    : undefined;
  const isDokkaiSplit = Boolean(currentPassage);

  return (
    <div className="max-w-7xl mx-auto pb-16 space-y-4 animate-fadeIn relative">
      {/* Sticky Examination Top Bar */}
      <div className="sticky top-14 sm:top-16 z-30 bg-washi-50/95 dark:bg-sumi-900/95 backdrop-blur border border-washi-300 dark:border-sumi-800 rounded-xl p-2.5 sm:p-3.5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3">
          {/* Left: Level Badge + Session Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowExitConfirm(true)}
              className="p-1.5 rounded-lg border border-washi-300 dark:border-sumi-700 hover:bg-washi-200 dark:hover:bg-sumi-800 text-stone-600 dark:text-stone-300 transition-colors"
              title={language === 'id' ? 'Keluar ke Pusat JLPT' : 'Exit to Hub'}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="px-2.5 py-1 rounded-lg bg-vermilion-500 text-white text-xs font-extrabold tracking-wide">
              JLPT {examPackage.tier.toUpperCase()}
            </span>

            {/* Session Switcher Pills */}
            <div className="hidden md:flex items-center gap-1 bg-washi-200 dark:bg-sumi-800 p-1 rounded-lg">
              {examPackage.sessions.map(sess => (
                <button
                  key={sess.sessionNumber}
                  onClick={() => handleSessionSwitch(sess.sessionNumber)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                    activeSessionNum === sess.sessionNumber
                      ? 'bg-white dark:bg-sumi-900 text-vermilion-600 dark:text-vermilion-400 shadow-sm'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                  }`}
                >
                  {language === 'id' ? `Sesi ${sess.sessionNumber}` : `Sec ${sess.sessionNumber}`} ({sess.durationMinutes}m)
                </button>
              ))}
            </div>
          </div>

          {/* Right: Question Counter, Furigana Toggle, Timer, Mark Sheet Drawer, Submit */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5">
            {/* Question Progress Counter */}
            <span className="px-2.5 py-1 rounded-lg bg-washi-200 dark:bg-sumi-800 text-stone-800 dark:text-stone-200 text-xs font-bold">
              {language === 'id'
                ? `Soal ${currentIdx + 1}/${questions.length}`
                : `Q${currentIdx + 1}/${questions.length}`}
            </span>

            {/* Furigana Toggle */}
            <button
              onClick={toggleFurigana}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors ${
                furiganaEnabled
                  ? 'bg-vermilion-500/10 border-vermilion-500/40 text-vermilion-600 dark:text-vermilion-400'
                  : 'bg-washi-100 dark:bg-sumi-850 border-washi-300 dark:border-sumi-700 text-stone-500'
              }`}
              title={t('topbar.furigana_tooltip')}
            >
              ふりがな
            </button>

            {/* Timer Display */}
            <div
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 border ${
                mode === 'strict' && sessionSecondsLeft < 300
                  ? 'bg-red-50 dark:bg-red-950/40 border-red-300 text-red-600 dark:text-red-400 animate-pulse'
                  : 'bg-washi-100 dark:bg-sumi-850 border-washi-300 dark:border-sumi-700 text-stone-800 dark:text-stone-200'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-vermilion-500" />
              <span>{mode === 'strict' ? formatTimer(sessionSecondsLeft) : formatTimer(totalElapsedSec)}</span>
            </div>

            {/* Optical Mark Sheet Drawer Trigger */}
            <button
              onClick={() => setMarkSheetOpen(true)}
              className="px-2.5 py-1.5 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-bold flex items-center gap-1.5 shadow-sm hover:opacity-90 transition-opacity"
            >
              <Grid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t('jlpt_exam.marksheet_toggle')}</span>
              <span className="px-1.5 py-0.2 rounded bg-vermilion-500 text-white text-[10px]">
                {answeredCount}/{questions.length}
              </span>
            </button>

            {/* Submit Button */}
            <button
              onClick={() => setShowSubmitConfirm(true)}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t('jlpt_exam.submit_exam')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Question Workspace (Booklet Typography + Optional Split-Pane Dokkai) */}
      {currentQuestion && (
        <div className="space-y-4">
          {/* Mobile Tab Toggle for Dokkai Split-Screen */}
          {isDokkaiSplit && (
            <div className="flex md:hidden rounded-xl bg-washi-200 dark:bg-sumi-850 p-1 border border-washi-300 dark:border-sumi-800">
              <button
                onClick={() => setMobileDokkaiTab('passage')}
                className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  mobileDokkaiTab === 'passage'
                    ? 'bg-white dark:bg-sumi-900 text-vermilion-600 shadow-sm'
                    : 'text-stone-600 dark:text-stone-400'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{t('jlpt_exam.tab_passage')}</span>
              </button>
              <button
                onClick={() => setMobileDokkaiTab('question')}
                className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  mobileDokkaiTab === 'question'
                    ? 'bg-white dark:bg-sumi-900 text-vermilion-600 shadow-sm'
                    : 'text-stone-600 dark:text-stone-400'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{t('jlpt_exam.tab_question')}</span>
              </button>
            </div>
          )}

          <div className={`grid grid-cols-1 ${isDokkaiSplit ? 'md:grid-cols-12' : ''} gap-5 items-start`}>
            {/* Left Split Pane: Dokkai Reading Passage */}
            {isDokkaiSplit && currentPassage && (
              <div
                className={`md:col-span-6 bg-washi-50 dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4 ${
                  mobileDokkaiTab === 'passage' ? 'block' : 'hidden md:block'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-washi-200 dark:border-sumi-800 pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-vermilion-500">
                      読解 • {language === 'id' ? 'Naskah Bacaan' : 'Reading Passage'}
                    </span>
                    <h3 className="font-jp text-base font-bold text-stone-900 dark:text-stone-100">
                      {renderText(currentPassage.titleJp)}
                    </h3>
                  </div>

                  {/* Highlighter Tool */}
                  <div className="flex items-center gap-1 bg-washi-100 dark:bg-sumi-850 p-1 rounded-lg border border-washi-200 dark:border-sumi-800">
                    <Highlighter className="w-3.5 h-3.5 text-stone-400 ml-1" />
                    {(['none', 'yellow', 'green'] as const).map(col => (
                      <button
                        key={col}
                        onClick={() => setHighlighterColor(col)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${
                          highlighterColor === col
                            ? col === 'yellow'
                              ? 'bg-amber-300 text-stone-900'
                              : col === 'green'
                                ? 'bg-emerald-300 text-stone-900'
                                : 'bg-stone-800 text-white dark:bg-stone-200 dark:text-stone-900'
                            : 'text-stone-500 hover:text-stone-800'
                        }`}
                        title={
                          col === 'yellow'
                            ? t('jlpt_exam.highlight_yellow')
                            : col === 'green'
                              ? t('jlpt_exam.highlight_green')
                              : 'Off'
                        }
                      >
                        {col === 'none' ? 'Off' : col === 'yellow' ? 'Kuning' : 'Hijau'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Passage Body (Select text to highlight when active) */}
                <div
                  onMouseUp={() => handlePassageMouseUp(currentPassage.id)}
                  className={`font-jp text-[15px] sm:text-base leading-[2.1] text-stone-900 dark:text-stone-100 whitespace-pre-line select-text ${
                    highlighterColor !== 'none' ? 'cursor-text' : ''
                  }`}
                >
                  {renderHighlightedPassageText(currentPassage.id, currentPassage.textJp)}
                </div>

                {currentPassage.textB && (
                  <div
                    onMouseUp={() => handlePassageMouseUp(currentPassage.id)}
                    className="pt-4 border-t border-dashed border-washi-300 dark:border-sumi-700 font-jp text-[15px] sm:text-base leading-[2.1] text-stone-900 dark:text-stone-100 whitespace-pre-line select-text"
                  >
                    {renderHighlightedPassageText(currentPassage.id, currentPassage.textB)}
                  </div>
                )}
              </div>
            )}

            {/* Right Pane (or Full Width): Question Card */}
            <div
              className={`${isDokkaiSplit ? 'md:col-span-6' : 'max-w-4xl mx-auto w-full'} bg-washi-50 dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-2xl p-5 sm:p-7 shadow-sm space-y-5 ${
                isDokkaiSplit && mobileDokkaiTab !== 'question' ? 'hidden md:block' : 'block'
              }`}
            >
              {/* Mondai Header & Flag Button */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-washi-200 dark:border-sumi-800 pb-3.5">
                <div>
                  <div className="font-jp text-xs font-bold text-vermilion-600 dark:text-vermilion-400">
                    {renderText(currentQuestion.mondaiTitleJp)}
                  </div>
                  <div className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                    {language === 'id' ? currentQuestion.mondaiTitleId : currentQuestion.mondaiTitleEn}
                  </div>
                </div>

                <button
                  onClick={() => toggleFlag(currentQuestion.questionNumber)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border flex items-center gap-1.5 transition-all ${
                    flagged[currentQuestion.questionNumber]
                      ? 'bg-amber-100 dark:bg-amber-950/50 border-amber-400 text-amber-800 dark:text-amber-300'
                      : 'bg-washi-100 dark:bg-sumi-850 border-washi-300 dark:border-sumi-700 text-stone-600 dark:text-stone-400 hover:border-amber-400'
                  }`}
                >
                  <Flag className={`w-3.5 h-3.5 ${flagged[currentQuestion.questionNumber] ? 'fill-amber-500 text-amber-500' : ''}`} />
                  <span>{flagged[currentQuestion.questionNumber] ? t('jlpt_exam.flagged_btn') : t('jlpt_exam.flag_btn')}</span>
                </button>
              </div>

              {/* Chokai Listening Audio Stimulus Player */}
              {(currentQuestion.itemType === 'chokai_audio' || currentQuestion.sectionCategory === 'listening') && (
                <div className="bg-indigo-50/70 dark:bg-sumi-850 border border-indigo-200 dark:border-indigo-800/40 rounded-xl p-4 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-indigo-800 dark:text-indigo-300">
                      <Volume2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      <span>
                        {language === 'id' ? 'Pemutar Audio Chokai Resmi' : 'Official Chokai Audio Stimulus'}
                        {currentQuestion.audioSpeakers ? ` • ${currentQuestion.audioSpeakers}` : ''}
                      </span>
                    </div>
                    {audioCountdown > 0 && (
                      <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        -{audioCountdown}s
                      </span>
                    )}
                  </div>

                  {mode === 'strict' && (
                    <div className="text-[11px] text-amber-700 dark:text-amber-400 flex items-center gap-1.5 font-medium">
                      <Lock className="w-3.5 h-3.5 shrink-0" />
                      <span>{t('jlpt_exam.chokai_strict_notice')}</span>
                    </div>
                  )}

                  {/* Waveform Indicator + Play Control */}
                  <div className="flex flex-wrap items-center gap-3">
                    {(() => {
                      const st = chokaiStatus[currentQuestion.questionNumber] || 'idle';
                      const locked = mode === 'strict' && (st === 'chime' || st === 'playing' || st === 'played');
                      return (
                        <button
                          onClick={() => handlePlayChokai(currentQuestion)}
                          disabled={locked}
                          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                            locked
                              ? 'bg-stone-300 dark:bg-sumi-800 text-stone-500 cursor-not-allowed'
                              : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
                          }`}
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>
                            {st === 'chime'
                              ? language === 'id' ? 'Bel Resmi JLPT...' : 'Official JLPT Chime...'
                              : st === 'playing'
                                ? t('jlpt_exam.chokai_playing')
                                : st === 'played' && mode === 'strict'
                                  ? t('jlpt_exam.chokai_played')
                                  : t('jlpt_exam.chokai_play_btn')}
                          </span>
                        </button>
                      );
                    })()}

                    {/* Animated Waveform Bars */}
                    <div className="flex items-center gap-1 h-6">
                      {[3, 6, 9, 5, 8, 10, 4, 7, 5, 3].map((h, idx) => {
                        const isPlaying = chokaiStatus[currentQuestion.questionNumber] === 'playing';
                        return (
                          <span
                            key={idx}
                            className={`w-1 rounded-full transition-all ${
                              isPlaying ? 'bg-indigo-500 animate-pulse' : 'bg-indigo-300/60 dark:bg-sumi-700'
                            }`}
                            style={{ height: isPlaying ? `${h * 2 + 4}px` : '6px' }}
                          />
                        );
                      })}
                    </div>

                    {/* Practice Mode Script Toggle */}
                    {mode === 'practice' && currentQuestion.audioScriptJp && (
                      <button
                        onClick={() =>
                          setShowTranscriptMap(prev => ({
                            ...prev,
                            [currentQuestion.questionNumber]: !prev[currentQuestion.questionNumber]
                          }))
                        }
                        className="ml-auto text-xs font-semibold text-indigo-600 dark:text-indigo-400 underline"
                      >
                        {showTranscriptMap[currentQuestion.questionNumber]
                          ? language === 'id' ? 'Sembunyikan Transkrip' : 'Hide Script'
                          : language === 'id' ? 'Tampilkan Transkrip Audio' : 'Show Script'}
                      </button>
                    )}
                  </div>

                  {mode === 'practice' && showTranscriptMap[currentQuestion.questionNumber] && currentQuestion.audioScriptJp && (
                    <div className="p-3 rounded-lg bg-white/80 dark:bg-sumi-900 font-jp text-xs leading-relaxed text-stone-800 dark:text-stone-200 border border-indigo-200 dark:border-sumi-700">
                      {renderText(currentQuestion.audioScriptJp)}
                    </div>
                  )}
                </div>
              )}

              {/* Question Prompt */}
              <div className="space-y-2">
                <div className="flex items-start gap-2.5">
                  <span className="px-2 py-0.5 rounded bg-stone-900 dark:bg-stone-200 text-white dark:text-stone-900 text-xs font-extrabold shrink-0 mt-1">
                    {language === 'id' ? `No. ${currentQuestion.questionNumber}` : `Q${currentQuestion.questionNumber}`}
                  </span>
                  <div className="font-jp text-base sm:text-lg font-semibold leading-[1.9] text-stone-900 dark:text-stone-100 whitespace-pre-line">
                    {renderText(currentQuestion.prompt)}
                  </div>
                </div>
              </div>

              {/* Interactive Star Reordering Widget (★ 文の組み立て) */}
              {currentQuestion.itemType === 'star_sentence' && (currentQuestion.scrambledChunks || currentQuestion.options) ? (
                <div className="bg-amber-50/50 dark:bg-amber-950/20 border border-amber-300/70 dark:border-amber-800/50 rounded-xl p-4 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 dark:text-amber-300">
                      <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                      <span>{t('jlpt_exam.star_instruction')}</span>
                    </div>
                    <button
                      onClick={() => handleResetStar(currentQuestion)}
                      className="px-2.5 py-1 rounded-lg bg-white dark:bg-sumi-850 border border-amber-300 dark:border-amber-700 text-xs font-bold text-amber-800 dark:text-amber-300 hover:bg-amber-100 transition-colors flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>{t('jlpt_exam.reset_star')}</span>
                    </button>
                  </div>

                  {/* 4 Target Sentence Slots */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {getSlotsForQuestion(currentQuestion.questionNumber).map((slotVal, slotIdx) => {
                      const isStarTarget = slotIdx + 1 === (currentQuestion.starPosition || 3);
                      return (
                        <div
                          key={slotIdx}
                          onDragOver={e => e.preventDefault()}
                          onDrop={() => handleDropOnSlot(currentQuestion, slotIdx)}
                          onClick={() => slotVal && handleClearSlot(currentQuestion, slotIdx)}
                          className={`min-h-[3.5rem] rounded-xl border-2 p-2.5 flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                            isStarTarget
                              ? slotVal
                                ? 'border-amber-500 bg-amber-400/20 shadow-md ring-2 ring-amber-400/30'
                                : 'border-amber-500 border-dashed bg-amber-100/50 dark:bg-amber-900/20'
                              : slotVal
                                ? 'border-stone-700 dark:border-stone-400 bg-white dark:bg-sumi-850 shadow-sm'
                                : 'border-washi-400 dark:border-sumi-700 border-dashed bg-white/50 dark:bg-sumi-900/40'
                          }`}
                          draggable={Boolean(slotVal)}
                          onDragStart={() =>
                            slotVal &&
                            setDraggedChunk({ qNum: currentQuestion.questionNumber, chunk: slotVal, fromSlot: slotIdx })
                          }
                        >
                          <div className="text-[10px] font-extrabold uppercase tracking-wider mb-0.5 flex items-center gap-1">
                            {isStarTarget ? (
                              <span className="text-amber-600 dark:text-amber-400 flex items-center gap-0.5">
                                <Star className="w-3 h-3 fill-amber-500" /> ★ TARGET
                              </span>
                            ) : (
                              <span className="text-stone-400">Slot {slotIdx + 1}</span>
                            )}
                          </div>
                          <div className="font-jp text-sm font-bold text-stone-900 dark:text-stone-100">
                            {slotVal ? renderText(slotVal) : '＿＿＿'}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Unassigned / Draggable Chunk Tray */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wide">
                      {language === 'id' ? 'Pilihan Potongan Kalimat (Ketuk atau Seret):' : 'Grammatical Chunks (Tap or Drag):'}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {(currentQuestion.scrambledChunks || currentQuestion.options).map((chunk, idx) => {
                        const slots = getSlotsForQuestion(currentQuestion.questionNumber);
                        const isPlaced = slots.includes(chunk);
                        return (
                          <button
                            key={idx}
                            draggable={!isPlaced}
                            onDragStart={() =>
                              setDraggedChunk({ qNum: currentQuestion.questionNumber, chunk })
                            }
                            onClick={() => handleTapChunk(currentQuestion, chunk)}
                            className={`px-3 py-2.5 rounded-xl border font-jp text-sm font-bold transition-all text-center ${
                              isPlaced
                                ? 'bg-stone-200/70 dark:bg-sumi-800/60 border-stone-300 dark:border-sumi-700 text-stone-400 line-through'
                                : 'bg-white dark:bg-sumi-850 border-washi-300 dark:border-sumi-700 text-stone-900 dark:text-stone-100 hover:border-vermilion-500 hover:shadow-sm'
                            }`}
                          >
                            {renderText(chunk)}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : null}

              {/* Standard Options List [1][2][3][4] (Synced with Mark Sheet & Star Slot) */}
              <div className="space-y-2.5">
                {currentQuestion.options.map((opt, idx) => {
                  const isSelected = answers[currentQuestion.questionNumber] === opt;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(currentQuestion.questionNumber, opt)}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all flex items-center gap-3 ${
                        isSelected
                          ? 'border-vermilion-500 bg-vermilion-500/5 ring-2 ring-vermilion-500/20 shadow-sm'
                          : 'border-washi-300 dark:border-sumi-800 bg-white dark:bg-sumi-850 hover:border-stone-400 dark:hover:border-sumi-600'
                      }`}
                    >
                      <span
                        className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-extrabold shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-stone-900 dark:bg-stone-100 border-stone-900 dark:border-stone-100 text-white dark:text-stone-900'
                            : 'border-stone-400 dark:border-stone-600 text-stone-600 dark:text-stone-400'
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <span className="font-jp text-sm sm:text-base font-medium text-stone-900 dark:text-stone-100">
                        {renderText(opt)}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Practice Mode Instant Explanation Reveal */}
              {mode === 'practice' && (
                <div className="pt-2">
                  <button
                    onClick={() =>
                      setRevealedExplanation(prev => ({
                        ...prev,
                        [currentQuestion.questionNumber]: !prev[currentQuestion.questionNumber]
                      }))
                    }
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>
                      {revealedExplanation[currentQuestion.questionNumber]
                        ? language === 'id' ? 'Tutup Pembahasan' : 'Hide Explanation'
                        : language === 'id' ? 'Lihat Pembahasan & Kunci Jawaban' : 'Reveal Explanation & Answer'}
                    </span>
                  </button>

                  {revealedExplanation[currentQuestion.questionNumber] && (
                    <div className="mt-2.5 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800/50 text-xs space-y-1.5">
                      <div className="font-bold text-emerald-800 dark:text-emerald-300">
                        {language === 'id' ? 'Kunci Resmi:' : 'Answer Key:'}{' '}
                        <span className="font-jp">{currentQuestion.correctAnswer}</span>
                      </div>
                      <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                        {language === 'id'
                          ? currentQuestion.explanationId || currentQuestion.explanation
                          : currentQuestion.explanation}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Bottom Question Navigation Strip */}
              <div className="flex items-center justify-between pt-4 border-t border-washi-200 dark:border-sumi-800">
                <button
                  onClick={() => handleJumpToQuestion(Math.max(0, currentIdx - 1))}
                  disabled={currentIdx === 0}
                  className="px-4 py-2 rounded-xl border border-washi-300 dark:border-sumi-700 bg-white dark:bg-sumi-850 disabled:opacity-40 text-xs font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1.5 hover:bg-washi-200 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{language === 'id' ? 'Sebelumnya' : 'Previous'}</span>
                </button>

                {currentIdx < questions.length - 1 ? (
                  <button
                    onClick={() => handleJumpToQuestion(currentIdx + 1)}
                    className="px-5 py-2 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-bold flex items-center gap-1.5 hover:opacity-90 transition-opacity"
                  >
                    <span>{language === 'id' ? 'Soal Berikutnya' : 'Next Question'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setShowSubmitConfirm(true)}
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{t('jlpt_exam.submit_exam')}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Digital Optical Mark Sheet (マークシート) Slide-Out Drawer */}
      {markSheetOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setMarkSheetOpen(false)}
          />
          <aside className="relative z-10 w-full max-w-sm bg-washi-50 dark:bg-sumi-900 border-l border-washi-300 dark:border-sumi-800 h-full flex flex-col shadow-2xl">
            <div className="p-4 border-b border-washi-300 dark:border-sumi-800 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
                  {t('jlpt_exam.marksheet_title')}
                </h3>
                <p className="text-[11px] text-stone-500">
                  {answeredCount}/{questions.length} {language === 'id' ? 'terjawab' : 'answered'} • {flaggedCount}{' '}
                  {language === 'id' ? 'ragu-ragu' : 'flagged'}
                </p>
              </div>
              <button
                onClick={() => setMarkSheetOpen(false)}
                className="p-1.5 rounded-lg hover:bg-washi-200 dark:hover:bg-sumi-800 text-stone-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Interactive Numbered Bubble Grid */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {questions.map((q, qIdx) => {
                const chosenAns = answers[q.questionNumber];
                const isFlagged = Boolean(flagged[q.questionNumber]);
                const isActive = qIdx === currentIdx;

                return (
                  <div
                    key={q.id}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl border transition-all ${
                      isActive
                        ? 'border-vermilion-500 bg-vermilion-500/5'
                        : 'border-washi-200 dark:border-sumi-800 bg-white/70 dark:bg-sumi-850/70'
                    }`}
                  >
                    <button
                      onClick={() => {
                        handleJumpToQuestion(qIdx);
                        setMarkSheetOpen(false);
                      }}
                      className="flex items-center gap-2 text-left min-w-[4.5rem]"
                    >
                      <span
                        className={`text-xs font-extrabold w-6 text-right ${
                          isActive ? 'text-vermilion-600 dark:text-vermilion-400' : 'text-stone-700 dark:text-stone-300'
                        }`}
                      >
                        {q.questionNumber}.
                      </span>
                      {!chosenAns ? (
                        <span
                          className="w-2 h-2 rounded-full bg-stone-300 dark:bg-sumi-700"
                          title={language === 'id' ? 'Belum dijawab' : 'Unanswered'}
                        />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      )}
                      {isFlagged && (
                        <Flag className="w-3 h-3 fill-amber-500 text-amber-500" />
                      )}
                    </button>

                    {/* 4 Interactive Optical Bubbles [1][2][3][4] */}
                    <div className="flex items-center gap-2">
                      {q.options.slice(0, 4).map((opt, bIdx) => {
                        const isBubbleFilled = chosenAns === opt;
                        return (
                          <button
                            key={bIdx}
                            onClick={() => handleMarkSheetBubbleClick(qIdx, q.questionNumber, opt)}
                            className={`w-7 h-5 rounded-full border text-[11px] font-bold flex items-center justify-center transition-all ${
                              isBubbleFilled
                                ? 'bg-stone-900 dark:bg-stone-100 border-stone-900 dark:border-stone-100 text-white dark:text-stone-900 shadow-xs'
                                : 'border-stone-400 dark:border-sumi-600 text-stone-500 hover:border-vermilion-500'
                            }`}
                            title={opt}
                          >
                            {bIdx + 1}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 border-t border-washi-300 dark:border-sumi-800">
              <button
                onClick={() => {
                  setMarkSheetOpen(false);
                  setShowSubmitConfirm(true);
                }}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-colors"
              >
                {t('jlpt_exam.submit_exam')} ({answeredCount}/{questions.length})
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Submit Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-washi-50 dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-xl">
            <h3 className="text-lg font-extrabold text-stone-900 dark:text-stone-100">
              {language === 'id' ? 'Kumpulkan Lembar Jawab JLPT?' : 'Submit JLPT Optical Mark Sheet?'}
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              {language === 'id'
                ? `Anda telah menjawab ${answeredCount} dari ${questions.length} soal (${questions.length - answeredCount} belum dijawab). Setelah dikumpulkan, sistem akan menghitung skor skala 0–180 beserta validasi batas minimum seksi 19/60.`
                : `You answered ${answeredCount} of ${questions.length} questions. Upon submission, your official 180-point scaled score and 19/60 sectional cutoff evaluation will be generated.`}
            </p>
            <div className="flex justify-end gap-2.5 pt-2">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="px-4 py-2 rounded-xl border border-washi-300 dark:border-sumi-700 text-xs font-bold text-stone-700 dark:text-stone-300"
              >
                {language === 'id' ? 'Periksa Kembali' : 'Keep Reviewing'}
              </button>
              <button
                onClick={() => handleFinalSubmit(false)}
                disabled={submitting}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm"
              >
                {submitting
                  ? language === 'id' ? 'Menghitung Skor...' : 'Evaluating...'
                  : language === 'id' ? 'Ya, Kumpulkan Sekarang' : 'Yes, Submit Exam'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-washi-50 dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-xl">
            <h3 className="text-lg font-extrabold text-stone-900 dark:text-stone-100">
              {language === 'id' ? 'Keluar dari Simulasi Ujian?' : 'Leave Exam Simulation?'}
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              {language === 'id'
                ? 'Progres lembar jawab saat ini belum dikumpulkan dan akan dibatalkan jika Anda kembali ke Pusat Ujian JLPT.'
                : 'Current progress is not submitted yet and will be discarded if you exit to the JLPT Hub.'}
            </p>
            <div className="flex justify-end gap-2.5 pt-2">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="px-4 py-2 rounded-xl border border-washi-300 dark:border-sumi-700 text-xs font-bold text-stone-700 dark:text-stone-300"
              >
                {language === 'id' ? 'Lanjutkan Ujian' : 'Stay in Exam'}
              </button>
              <button
                onClick={() => {
                  stopSpeechSynthesis();
                  onExitToHub();
                }}
                className="px-5 py-2 rounded-xl bg-vermilion-500 hover:bg-vermilion-600 text-white text-xs font-bold shadow-sm"
              >
                {language === 'id' ? 'Ya, Keluar' : 'Yes, Exit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
