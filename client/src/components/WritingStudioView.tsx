import React, { useState, useEffect, useRef } from 'react';
import {
  fetchWritingPrompts,
  evaluateWritingSubmission
} from '../api';
import {
  LevelCode,
  IELTSWritingTaskType,
  IELTSWritingPromptStimulus,
  DiagnosticScorecardResult,
  SentenceAnnotation
} from '../../../shared/types';
import {
  PenTool,
  Sparkles,
  Clock,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  FileText,
  Award,
  BarChart3,
  Layers,
  ShieldAlert,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Check,
  Eye,
  BookOpen,
  TrendingUp,
  X
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface WritingStudioViewProps {
  activeTrack?: LevelCode;
  onNavigateBack?: () => void;
}

export const WritingStudioView: React.FC<WritingStudioViewProps> = ({
  activeTrack = 'ielts_academic',
  onNavigateBack
}) => {
  const { t, language } = useLanguage();

  // Task selection & Prompts
  const [taskType, setTaskType] = useState<IELTSWritingTaskType>(
    activeTrack === 'ielts_general' ? 'task1_general' : 'task1_academic'
  );
  const [prompts, setPrompts] = useState<IELTSWritingPromptStimulus[]>([]);
  const [currentPrompt, setCurrentPrompt] = useState<IELTSWritingPromptStimulus | null>(null);
  const [loadingPrompts, setLoadingPrompts] = useState<boolean>(true);

  // Editor State
  const [essayContent, setEssayContent] = useState<string>('');
  const [isTimedMode, setIsTimedMode] = useState<boolean>(true);
  const [timeRemaining, setTimeRemaining] = useState<number>(1200); // 20m for T1, 40m for T2
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [lastSavedAt, setLastSavedAt] = useState<string>('');

  // Modals & Evaluation
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [scorecard, setScorecard] = useState<DiagnosticScorecardResult | null>(null);
  const [showUnderlengthModal, setShowUnderlengthModal] = useState<boolean>(false);
  const [showResetModal, setShowResetModal] = useState<boolean>(false);

  // Scorecard View State
  const [activeAccordion, setActiveAccordion] = useState<string>('ta');
  const [activeDiffTab, setActiveDiffTab] = useState<'annotated' | 'model'>('annotated');
  const [activeAnnotation, setActiveAnnotation] = useState<SentenceAnnotation | null>(null);
  const [popoverPos, setPopoverPos] = useState<{ top: number; left: number } | null>(null);
  const [previewReplacements, setPreviewReplacements] = useState<Record<string, boolean>>({});

  const essayEditorRef = useRef<HTMLTextAreaElement>(null);

  // 1. Fetch prompts on mount & task type change
  useEffect(() => {
    setLoadingPrompts(true);
    fetchWritingPrompts(taskType)
      .then(res => {
        setPrompts(res.prompts);
        if (res.prompts.length > 0) {
          const selected = res.prompts.find(p => p.taskType === taskType) || res.prompts[0];
          setCurrentPrompt(selected);
          const initialSecs = selected.suggestedMinutes * 60;
          setTimeRemaining(initialSecs);
        }
        setLoadingPrompts(false);
      })
      .catch(err => {
        console.error('Failed to load prompts', err);
        setLoadingPrompts(false);
      });
  }, [taskType]);

  // 2. Load cached draft from localStorage on prompt change
  useEffect(() => {
    if (!currentPrompt) return;
    const cacheKey = `lingua_writing_draft_${currentPrompt.promptId}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      setEssayContent(cached);
      setLastSavedAt(new Date().toLocaleTimeString());
    } else {
      setEssayContent('');
    }
    setScorecard(null);
    setPreviewReplacements({});
    setActiveAnnotation(null);
  }, [currentPrompt?.promptId]);

  // 3. Autosave heartbeat every 15 seconds
  useEffect(() => {
    if (!currentPrompt || scorecard) return;
    const interval = setInterval(() => {
      if (essayContent.trim().length > 0) {
        const cacheKey = `lingua_writing_draft_${currentPrompt.promptId}`;
        localStorage.setItem(cacheKey, essayContent);
        setLastSavedAt(new Date().toLocaleTimeString());
      }
    }, 15000);
    return () => clearInterval(interval);
  }, [essayContent, currentPrompt, scorecard]);

  // 4. Timer Countdown (Timed Mode) vs Elapsed (Untimed)
  useEffect(() => {
    if (scorecard || isEvaluating) return;
    const interval = setInterval(() => {
      if (isTimedMode) {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            handleAutoSubmitOnTimeExpiry();
            return 0;
          }
          return prev - 1;
        });
      } else {
        setElapsedSeconds(prev => prev + 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimedMode, scorecard, isEvaluating]);

  const handleAutoSubmitOnTimeExpiry = () => {
    handleExecuteSubmission();
  };

  // Metrics computation
  const words = essayContent.trim().length > 0 ? essayContent.trim().split(/\s+/).filter(Boolean) : [];
  const wordCount = words.length;
  const targetMin = currentPrompt?.minimumWords || 150;
  const isCompliant = wordCount >= targetMin;
  const wordsRemaining = Math.max(0, targetMin - wordCount);
  const characterCount = essayContent.length;
  const paragraphCount = essayContent.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;

  // Format MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleTaskTypeSwitch = (type: IELTSWritingTaskType) => {
    if (type === taskType) return;
    setTaskType(type);
  };

  const handlePromptSelect = (prompt: IELTSWritingPromptStimulus) => {
    setCurrentPrompt(prompt);
    setTimeRemaining(prompt.suggestedMinutes * 60);
    setElapsedSeconds(0);
  };

  const handlePreSubmissionCheck = () => {
    if (wordCount < 100) {
      setShowUnderlengthModal(true);
    } else {
      handleExecuteSubmission();
    }
  };

  const handleExecuteSubmission = async () => {
    if (!currentPrompt || isEvaluating) return;
    setIsEvaluating(true);
    setShowUnderlengthModal(false);

    const totalSeconds = isTimedMode
      ? (currentPrompt.suggestedMinutes * 60) - timeRemaining
      : elapsedSeconds;

    try {
      const result = await evaluateWritingSubmission({
        promptId: currentPrompt.promptId,
        taskType: currentPrompt.taskType,
        essayContent,
        durationSeconds: Math.max(1, totalSeconds),
        isTimedMode,
        locale: language === 'id' ? 'id' : 'en'
      });
      setScorecard(result);
      setIsEvaluating(false);
    } catch (err) {
      console.error('Submission evaluation failed', err);
      setIsEvaluating(false);
    }
  };

  const handleClearDraft = () => {
    setEssayContent('');
    if (currentPrompt) {
      localStorage.removeItem(`lingua_writing_draft_${currentPrompt.promptId}`);
    }
    setShowResetModal(false);
  };

  // 1-Click Replacement preview in diff review
  const togglePreviewReplace = (annId: string) => {
    setPreviewReplacements(prev => ({
      ...prev,
      [annId]: !prev[annId]
    }));
  };

  // Coordinates calculation for 4-axis SVG radar chart
  const getRadarCoordinates = (scores: { ta: number; cc: number; lr: number; gra: number }) => {
    const cx = 130;
    const cy = 130;
    const maxR = 90;
    const normalize = (val: number) => (Math.min(9.0, Math.max(0, val)) / 9.0) * maxR;

    // 4 axes: Top (TA), Right (CC), Bottom (LR), Left (GRA)
    const pTA = { x: cx, y: cy - normalize(scores.ta) };
    const pCC = { x: cx + normalize(scores.cc), y: cy };
    const pLR = { x: cx, y: cy + normalize(scores.lr) };
    const pGRA = { x: cx - normalize(scores.gra), y: cy };

    return `${pTA.x},${pTA.y} ${pCC.x},${pCC.y} ${pLR.x},${pLR.y} ${pGRA.x},${pGRA.y}`;
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 animate-fadeIn">
      {/* Top Header & Task Switcher */}
      <div className="bg-washi-50 dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-washi-200 dark:border-sumi-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-vermilion-600 dark:text-vermilion-400 text-xs font-bold uppercase tracking-wider mb-1">
              <PenTool className="w-4 h-4" />
              <span>{t('writing.studio_badge')}</span>
            </div>
            <h1 className="text-xl font-bold text-stone-900 dark:text-stone-100">
              {t('writing.studio_title')}
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              {t('writing.studio_subtitle')}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-vermilion-500/10 text-vermilion-600 dark:text-vermilion-400 border border-vermilion-500/20">
              {activeTrack.toUpperCase()}
            </span>
            {onNavigateBack && (
              <button
                onClick={onNavigateBack}
                className="text-xs text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 font-semibold px-2 py-1"
              >
                {t('exam.back_curriculum')}
              </button>
            )}
          </div>
        </div>

        {/* 3-Task Type Selector Ribbon */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => handleTaskTypeSwitch('task1_academic')}
            className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
              taskType === 'task1_academic'
                ? 'bg-vermilion-500 text-white border-vermilion-600 shadow-md ring-2 ring-vermilion-500/20'
                : 'bg-white dark:bg-sumi-850 border-washi-200 dark:border-sumi-800 text-stone-700 dark:text-stone-300 hover:border-vermilion-500/40'
            }`}
          >
            <div>
              <div className="flex items-center justify-between text-[11px] mb-1 font-mono font-bold">
                <span className={taskType === 'task1_academic' ? 'text-white' : 'text-stone-500'}>
                  150w • 20 min
                </span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                  taskType === 'task1_academic' ? 'bg-white/20 text-white' : 'bg-washi-100 dark:bg-sumi-800 text-stone-600 dark:text-stone-400'
                }`}>
                  {t('writing.task1_weight')}
                </span>
              </div>
              <h4 className="font-bold text-xs">
                {t('writing.task1_academic')}
              </h4>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleTaskTypeSwitch('task1_general')}
            className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
              taskType === 'task1_general'
                ? 'bg-vermilion-500 text-white border-vermilion-600 shadow-md ring-2 ring-vermilion-500/20'
                : 'bg-white dark:bg-sumi-850 border-washi-200 dark:border-sumi-800 text-stone-700 dark:text-stone-300 hover:border-vermilion-500/40'
            }`}
          >
            <div>
              <div className="flex items-center justify-between text-[11px] mb-1 font-mono font-bold">
                <span className={taskType === 'task1_general' ? 'text-white' : 'text-stone-500'}>
                  150w • 20 min
                </span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                  taskType === 'task1_general' ? 'bg-white/20 text-white' : 'bg-washi-100 dark:bg-sumi-800 text-stone-600 dark:text-stone-400'
                }`}>
                  {t('writing.task1_weight')}
                </span>
              </div>
              <h4 className="font-bold text-xs">
                {t('writing.task1_general')}
              </h4>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleTaskTypeSwitch('task2_discursive')}
            className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
              taskType === 'task2_discursive'
                ? 'bg-vermilion-500 text-white border-vermilion-600 shadow-md ring-2 ring-vermilion-500/20'
                : 'bg-white dark:bg-sumi-850 border-washi-200 dark:border-sumi-800 text-stone-700 dark:text-stone-300 hover:border-vermilion-500/40'
            }`}
          >
            <div>
              <div className="flex items-center justify-between text-[11px] mb-1 font-mono font-bold">
                <span className={taskType === 'task2_discursive' ? 'text-white' : 'text-stone-500'}>
                  250w • 40 min
                </span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                  taskType === 'task2_discursive' ? 'bg-white/20 text-white' : 'bg-washi-100 dark:bg-sumi-800 text-stone-600 dark:text-stone-400'
                }`}>
                  {t('writing.task2_weight')}
                </span>
              </div>
              <h4 className="font-bold text-xs">
                {t('writing.task2_discursive')}
              </h4>
            </div>
          </button>
        </div>
      </div>

      {/* Main Studio Viewport (Editor or Scorecard) */}
      {!scorecard ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Pane: Prompt Stimulus & Visual Data (5 Columns) */}
          <div className="lg:col-span-5 bg-white dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-2xl p-5 shadow-sm space-y-5 lg:sticky lg:top-20">
            {loadingPrompts || !currentPrompt ? (
              <div className="py-16 text-center space-y-2">
                <div className="w-6 h-6 border-2 border-vermilion-500 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs text-stone-500">{t('writing.evaluating')}</p>
              </div>
            ) : (
              <>
                {/* Prompt Header */}
                <div className="space-y-1.5 border-b border-washi-200 dark:border-sumi-800 pb-3">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-stone-500">
                    <span>{currentPrompt.suggestedMinutes} MIN</span>
                    <span>MIN {currentPrompt.minimumWords} WORDS</span>
                  </div>
                  <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 leading-snug">
                    {language === 'id' ? currentPrompt.titleId : currentPrompt.title}
                  </h3>
                </div>

                {/* Visual Stimulus for Task 1 Academic */}
                {currentPrompt.visualType === 'line_graph' && currentPrompt.visualDataPoints && (
                  <div className="bg-washi-50 dark:bg-sumi-950 p-4 rounded-xl border border-washi-200 dark:border-sumi-800 space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-stone-500 font-mono">
                      <span>{language === 'id' ? 'Visualisasi Data Garis (2000–2030)' : 'Data Line Graph (2000–2030)'}</span>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">● High Fidelity</span>
                    </div>

                    {/* High-Resolution SVG Line Graph */}
                    <div className="w-full overflow-x-auto">
                      <svg viewBox="0 0 420 180" className="w-full h-44 select-none">
                        {/* Grid lines */}
                        <line x1="40" y1="20" x2="400" y2="20" stroke="currentColor" className="text-stone-200 dark:text-sumi-800" strokeDasharray="3 3" />
                        <line x1="40" y1="60" x2="400" y2="60" stroke="currentColor" className="text-stone-200 dark:text-sumi-800" strokeDasharray="3 3" />
                        <line x1="40" y1="100" x2="400" y2="100" stroke="currentColor" className="text-stone-200 dark:text-sumi-800" strokeDasharray="3 3" />
                        <line x1="40" y1="140" x2="400" y2="140" stroke="currentColor" className="text-stone-200 dark:text-sumi-800" strokeDasharray="3 3" />
                        <line x1="40" y1="150" x2="400" y2="150" stroke="currentColor" className="text-stone-400 dark:text-sumi-700" />

                        {/* Y-axis Labels */}
                        <text x="32" y="24" textAnchor="end" fill="currentColor" className="text-stone-400 text-[9px] font-mono">80%</text>
                        <text x="32" y="64" textAnchor="end" fill="currentColor" className="text-stone-400 text-[9px] font-mono">60%</text>
                        <text x="32" y="104" textAnchor="end" fill="currentColor" className="text-stone-400 text-[9px] font-mono">40%</text>
                        <text x="32" y="144" textAnchor="end" fill="currentColor" className="text-stone-400 text-[9px] font-mono">20%</text>

                        {/* Series lines */}
                        {currentPrompt.visualDataPoints.series.map((s: any) => {
                          const points = s.values.map((v: number, i: number) => {
                            const x = 50 + i * 55;
                            const y = 150 - (v / 100) * 140;
                            return `${x},${y}`;
                          }).join(' ');

                          return (
                            <g key={s.country}>
                              <polyline
                                points={points}
                                fill="none"
                                stroke={s.color}
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              {s.values.map((v: number, i: number) => {
                                const x = 50 + i * 55;
                                const y = 150 - (v / 100) * 140;
                                return (
                                  <circle key={i} cx={x} cy={y} r="3" fill={s.color} stroke="#ffffff" strokeWidth="1" />
                                );
                              })}
                            </g>
                          );
                        })}

                        {/* X-axis labels */}
                        {currentPrompt.visualDataPoints.years.map((yr: string, i: number) => (
                          <text
                            key={yr}
                            x={50 + i * 55}
                            y="166"
                            textAnchor="middle"
                            fill="currentColor"
                            className="text-stone-500 dark:text-stone-400 text-[8px] font-mono"
                          >
                            {yr}
                          </text>
                        ))}
                      </svg>
                    </div>

                    {/* Series Legend */}
                    <div className="flex flex-wrap items-center gap-3 pt-1 border-t border-washi-200 dark:border-sumi-800 text-[10px]">
                      {currentPrompt.visualDataPoints.series.map((s: any) => (
                        <div key={s.country} className="flex items-center gap-1.5 font-medium text-stone-700 dark:text-stone-300">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                          <span>{s.country}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Prompt Directives Text */}
                <div className="bg-washi-50 dark:bg-sumi-950 p-4 rounded-xl border border-washi-200 dark:border-sumi-800 space-y-2 text-xs leading-relaxed text-stone-800 dark:text-stone-200">
                  <div className="font-bold text-[11px] text-stone-500 uppercase font-mono tracking-wider">
                    {language === 'id' ? 'Instruksi Tugas Resmi' : 'Official Prompt Directive'}
                  </div>
                  <p className="whitespace-pre-line">
                    {language === 'id' ? currentPrompt.promptTextId : currentPrompt.promptText}
                  </p>
                </div>

                {/* Guidance Notes Accordion */}
                <div className="space-y-2">
                  <div className="text-[11px] font-bold text-stone-500 uppercase font-mono tracking-wider">
                    {language === 'id' ? 'Panduan Penulisan Cambridge' : 'Cambridge Guidance Notes'}
                  </div>
                  <ul className="space-y-1.5 text-xs text-stone-600 dark:text-stone-400">
                    {(language === 'id' ? currentPrompt.guidanceNotesId : currentPrompt.guidanceNotes).map((note, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-vermilion-500 font-bold">•</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>

          {/* Right Pane: Distraction-Free Text Canvas & Editor (7 Columns) */}
          <div className="lg:col-span-7 bg-white dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-2xl p-5 shadow-sm space-y-4">
            {/* Toolbar Ribbon */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-washi-200 dark:border-sumi-800 pb-3">
              {/* Mode Toggle: Timed vs Untimed */}
              <div className="flex items-center rounded-xl bg-washi-100 dark:bg-sumi-800 p-1 border border-washi-200 dark:border-sumi-700">
                <button
                  type="button"
                  onClick={() => setIsTimedMode(true)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    isTimedMode
                      ? 'bg-amber-500 text-white shadow-sm'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>{t('writing.timed_mode')}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsTimedMode(false)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    !isTimedMode
                      ? 'bg-vermilion-500 text-white shadow-sm'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{t('writing.untimed_mode')}</span>
                </button>
              </div>

              {/* Digital Timer / Autosave status */}
              <div className="flex items-center gap-3">
                <div className={`flex items-center gap-1.5 font-mono font-bold text-sm px-3 py-1.5 rounded-xl border ${
                  isTimedMode && timeRemaining <= 60
                    ? 'bg-red-500 text-white border-red-600 animate-pulse'
                    : isTimedMode && timeRemaining <= 300
                    ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                    : 'bg-washi-100 dark:bg-sumi-800 text-stone-800 dark:text-stone-200 border-washi-300 dark:border-sumi-700'
                }`}>
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>{isTimedMode ? formatTime(timeRemaining) : formatTime(elapsedSeconds)}</span>
                </div>

                {lastSavedAt && (
                  <span className="text-[10px] text-stone-400 hidden sm:inline">
                    {t('writing.autosave_status')} ({lastSavedAt})
                  </span>
                )}
              </div>
            </div>

            {/* Real-time Word Counter with Threshold Compliance State Machine */}
            <div className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
              isCompliant
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-200'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-800 dark:text-amber-200'
            }`}>
              <div className="flex items-center gap-2">
                {isCompliant ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                )}
                <span className="text-xs font-bold">
                  {isCompliant
                    ? t('writing.compliant_success', { count: wordCount })
                    : t('writing.underlength_warning', { target: targetMin, diff: wordsRemaining })}
                </span>
              </div>

              <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-stone-500 dark:text-stone-400">
                <span>{wordCount} / {targetMin}w</span>
                <span>•</span>
                <span>{characterCount} chars</span>
                <span>•</span>
                <span>{paragraphCount} para</span>
              </div>
            </div>

            {/* Ergonomic Monospace/Sans Text Area */}
            <div className="relative">
              <textarea
                ref={essayEditorRef}
                value={essayContent}
                onChange={e => setEssayContent(e.target.value)}
                placeholder={t('writing.editor_placeholder')}
                rows={16}
                className="w-full p-4 rounded-xl border border-washi-300 dark:border-sumi-800 bg-washi-50 dark:bg-sumi-950 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-vermilion-500/30 font-sans text-sm leading-relaxed resize-y transition-colors"
              />
            </div>

            {/* Action Footer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowResetModal(true)}
                  className="px-3 py-2 rounded-xl border border-washi-300 dark:border-sumi-800 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 text-xs font-semibold hover:bg-washi-100 dark:hover:bg-sumi-800 transition-colors"
                >
                  {t('writing.reset_draft')}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (currentPrompt) {
                      localStorage.setItem(`lingua_writing_draft_${currentPrompt.promptId}`, essayContent);
                      setLastSavedAt(new Date().toLocaleTimeString());
                    }
                  }}
                  className="px-3 py-2 rounded-xl border border-washi-300 dark:border-sumi-800 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 text-xs font-semibold hover:bg-washi-100 dark:hover:bg-sumi-800 transition-colors"
                >
                  {t('writing.save_draft')}
                </button>
              </div>

              <button
                type="button"
                onClick={handlePreSubmissionCheck}
                disabled={isEvaluating || essayContent.trim().length === 0}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all ${
                  isEvaluating || essayContent.trim().length === 0
                    ? 'bg-stone-300 dark:bg-sumi-800 text-stone-500 cursor-not-allowed'
                    : 'bg-vermilion-500 hover:bg-vermilion-600 text-white shadow-vermilion-500/20'
                }`}
              >
                {isEvaluating ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{t('writing.evaluating')}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>{t('writing.submit_eval')}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Screen 5A.2: Diagnostic Scorecard & Interactive Diff Review */
        <div className="space-y-6 animate-fadeIn">
          {/* 1. Master Band Hero Banner */}
          <div className="bg-stone-900 text-white rounded-2xl p-6 shadow-md border border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-vermilion-400 text-xs font-bold uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>{t('writing.scorecard_title')}</span>
              </div>
              <h2 className="text-2xl font-black tracking-tight">
                {currentPrompt ? (language === 'id' ? currentPrompt.titleId : currentPrompt.title) : 'Writing Diagnostic Assessment'}
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-xs text-stone-400 font-mono">
                <span className="px-2.5 py-0.5 rounded bg-stone-800 text-stone-300">
                  {currentPrompt?.taskType === 'task2_discursive' ? t('writing.task2_weight') : t('writing.task1_weight')}
                </span>
                <span>•</span>
                <span>{scorecard.wordCountMetrics.totalWords} words ({scorecard.wordCountMetrics.isUnderlength ? 'Underlength' : 'Compliant'})</span>
                <span>•</span>
                <span>Duration: {formatTime(scorecard.durationSeconds)}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-stone-850 p-4 rounded-xl border border-stone-700">
              <div className="text-center">
                <span className="text-[10px] text-stone-400 uppercase tracking-widest font-mono block">
                  {t('writing.overall_band')}
                </span>
                <span className="text-4xl font-black text-vermilion-500 font-mono">
                  {scorecard.overallBand.toFixed(1)}
                </span>
              </div>
              <div className="h-10 w-px bg-stone-700" />
              <div className="text-center">
                <span className="text-[10px] text-stone-400 uppercase tracking-widest font-mono block">
                  {t('writing.cefr_level')}
                </span>
                <span className="text-2xl font-black text-emerald-400 font-mono">
                  {scorecard.cefrLevel}
                </span>
              </div>
            </div>
          </div>

          {/* 2. Cambridge 4-Criteria Radar Chart & Accordion Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* 4-Axis Interactive SVG Radar Chart (5 Columns) */}
            <div className="lg:col-span-5 bg-white dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-washi-200 dark:border-sumi-800 pb-2.5">
                <h3 className="font-bold text-xs uppercase tracking-wider text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                  <BarChart3 className="w-3.5 h-3.5 text-vermilion-500" />
                  <span>{t('writing.radar_title')}</span>
                </h3>
                <span className="text-[10px] text-stone-400 font-mono">0.0 – 9.0 Band</span>
              </div>

              <div className="flex items-center justify-center p-2">
                <svg viewBox="0 0 260 260" className="w-64 h-64 select-none">
                  {/* Concentric Reference Rings */}
                  {[30, 50, 70, 90].map(r => (
                    <circle
                      key={r}
                      cx="130"
                      cy="130"
                      r={r}
                      fill="none"
                      stroke="currentColor"
                      className="text-stone-200 dark:text-sumi-800"
                      strokeDasharray="3 3"
                    />
                  ))}

                  {/* 4 Axis Lines */}
                  <line x1="130" y1="40" x2="130" y2="220" stroke="currentColor" className="text-stone-300 dark:text-sumi-700" />
                  <line x1="40" y1="130" x2="220" y2="130" stroke="currentColor" className="text-stone-300 dark:text-sumi-700" />

                  {/* Reference Band 7.5 Polygon (Emerald Ring) */}
                  <polygon
                    points={getRadarCoordinates({ ta: 7.5, cc: 7.5, lr: 7.5, gra: 7.5 })}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />

                  {/* Candidate Score Polygon */}
                  <polygon
                    points={getRadarCoordinates({
                      ta: scorecard.criteriaScores.taskAchievementOrResponse.score,
                      cc: scorecard.criteriaScores.coherenceAndCohesion.score,
                      lr: scorecard.criteriaScores.lexicalResource.score,
                      gra: scorecard.criteriaScores.grammaticalRangeAndAccuracy.score
                    })}
                    fill="rgba(225, 29, 72, 0.25)"
                    stroke="#e11d48"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />

                  {/* Axis Labels */}
                  <text x="130" y="25" textAnchor="middle" fill="currentColor" className="text-[9px] font-bold text-stone-700 dark:text-stone-300">
                    TA/TR ({scorecard.criteriaScores.taskAchievementOrResponse.score.toFixed(1)})
                  </text>
                  <text x="235" y="133" textAnchor="start" fill="currentColor" className="text-[9px] font-bold text-stone-700 dark:text-stone-300">
                    CC ({scorecard.criteriaScores.coherenceAndCohesion.score.toFixed(1)})
                  </text>
                  <text x="130" y="240" textAnchor="middle" fill="currentColor" className="text-[9px] font-bold text-stone-700 dark:text-stone-300">
                    LR ({scorecard.criteriaScores.lexicalResource.score.toFixed(1)})
                  </text>
                  <text x="25" y="133" textAnchor="end" fill="currentColor" className="text-[9px] font-bold text-stone-700 dark:text-stone-300">
                    GRA ({scorecard.criteriaScores.grammaticalRangeAndAccuracy.score.toFixed(1)})
                  </text>
                </svg>
              </div>

              {/* Radar Legend */}
              <div className="flex items-center justify-center gap-4 text-[10px] text-stone-500 pt-1 border-t border-washi-200 dark:border-sumi-800">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-vermilion-500" />
                  <span>{language === 'id' ? 'Skor Esai Anda' : 'Your Essay'}</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-0.5 border-t border-dashed border-emerald-500" />
                  <span>{language === 'id' ? 'Tolok Ukur Band 7.5' : 'Band 7.5 Target'}</span>
                </span>
              </div>
            </div>

            {/* Criteria Deep-Dive Accordion (7 Columns) */}
            <div className="lg:col-span-7 space-y-3">
              {[
                { key: 'ta', data: scorecard.criteriaScores.taskAchievementOrResponse },
                { key: 'cc', data: scorecard.criteriaScores.coherenceAndCohesion },
                { key: 'lr', data: scorecard.criteriaScores.lexicalResource },
                { key: 'gra', data: scorecard.criteriaScores.grammaticalRangeAndAccuracy }
              ].map(crit => {
                const isOpen = activeAccordion === crit.key;
                return (
                  <div
                    key={crit.key}
                    className="bg-white dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-xl overflow-hidden shadow-sm"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveAccordion(isOpen ? '' : crit.key)}
                      className="w-full p-4 text-left flex items-center justify-between hover:bg-washi-50 dark:hover:bg-sumi-850 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-base font-black font-mono text-vermilion-600 dark:text-vermilion-400">
                          {crit.data.score.toFixed(1)}
                        </span>
                        <div>
                          <h4 className="font-bold text-xs text-stone-900 dark:text-stone-100">
                            {language === 'id' ? crit.data.nameId : crit.data.nameEn}
                          </h4>
                          <span className="text-[10px] text-stone-500 font-mono">
                            Cambridge Criterion Benchmark
                          </span>
                        </div>
                      </div>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
                    </button>

                    {isOpen && (
                      <div className="p-4 pt-0 border-t border-washi-200 dark:border-sumi-800 space-y-3 text-xs">
                        {/* Descriptor Citation */}
                        <div className="p-2.5 rounded-lg bg-washi-50 dark:bg-sumi-950 border border-washi-200 dark:border-sumi-800 italic text-stone-600 dark:text-stone-300 text-[11px]">
                          "{crit.data.cambridgeBandDescriptorCitation}"
                        </div>

                        {/* Strengths */}
                        <div className="space-y-1">
                          <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{t('writing.strengths_label')}</span>
                          </span>
                          <ul className="space-y-1 pl-4 text-stone-600 dark:text-stone-300 text-[11px]">
                            {(language === 'id' ? crit.data.strengthsId : crit.data.strengthsEn).map((s, i) => (
                              <li key={i} className="list-disc">{s}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Growth Vectors */}
                        <div className="space-y-1">
                          <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                            <TrendingUp className="w-3.5 h-3.5" />
                            <span>{t('writing.growth_label')}</span>
                          </span>
                          <ul className="space-y-1 pl-4 text-stone-600 dark:text-stone-300 text-[11px]">
                            {(language === 'id' ? crit.data.weaknessesId : crit.data.weaknessesEn).map((w, i) => (
                              <li key={i} className="list-disc">{w}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Quantitative Linguistic Telemetry Panel */}
          <div className="bg-white dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-2xl p-5 shadow-sm space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-vermilion-500" />
              <span>{t('writing.metrics_title')}</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl border border-washi-200 dark:border-sumi-800 bg-washi-50 dark:bg-sumi-950 space-y-0.5">
                <span className="text-[10px] text-stone-500 font-semibold">{t('writing.awl_density')}</span>
                <div className="text-xl font-bold font-mono text-stone-900 dark:text-stone-100">
                  {scorecard.linguisticMetrics.awlDensityPercentage}%
                </div>
                <span className="text-[10px] text-stone-400 block">{t('writing.awl_desc')}</span>
              </div>

              <div className="p-3 rounded-xl border border-washi-200 dark:border-sumi-800 bg-washi-50 dark:bg-sumi-950 space-y-0.5">
                <span className="text-[10px] text-stone-500 font-semibold">{t('writing.efsr_label')}</span>
                <div className="text-xl font-bold font-mono text-stone-900 dark:text-stone-100">
                  {scorecard.linguisticMetrics.errorFreeSentenceRatio}%
                </div>
                <span className="text-[10px] text-stone-400 block">{t('writing.efsr_desc')}</span>
              </div>

              <div className="p-3 rounded-xl border border-washi-200 dark:border-sumi-800 bg-washi-50 dark:bg-sumi-950 space-y-0.5">
                <span className="text-[10px] text-stone-500 font-semibold">{t('writing.ttr_label')}</span>
                <div className="text-xl font-bold font-mono text-stone-900 dark:text-stone-100">
                  {scorecard.linguisticMetrics.typeTokenRatio}
                </div>
                <span className="text-[10px] text-stone-400 block">{t('writing.ttr_desc')}</span>
              </div>

              <div className="p-3 rounded-xl border border-washi-200 dark:border-sumi-800 bg-washi-50 dark:bg-sumi-950 space-y-0.5">
                <span className="text-[10px] text-stone-500 font-semibold">{t('writing.csr_label')}</span>
                <div className="text-xl font-bold font-mono text-stone-900 dark:text-stone-100">
                  {scorecard.linguisticMetrics.complexSentenceRatio}%
                </div>
                <span className="text-[10px] text-stone-400 block">{t('writing.csr_desc')}</span>
              </div>
            </div>
          </div>

          {/* 4. Interactive Annotated Essay Canvas & Diff Review (Screen 5A.2) */}
          <div className="bg-white dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-washi-200 dark:border-sumi-800 pb-3">
              <div>
                <h3 className="font-bold text-xs uppercase tracking-wider text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-vermilion-500" />
                  <span>{t('writing.diff_title')}</span>
                </h3>
                <p className="text-[11px] text-stone-500">
                  {t('writing.diff_subtitle')}
                </p>
              </div>

              {/* View Switcher: Annotated Essay vs Model Answer */}
              <div className="flex items-center rounded-xl bg-washi-100 dark:bg-sumi-800 p-1 border border-washi-200 dark:border-sumi-700">
                <button
                  type="button"
                  onClick={() => setActiveDiffTab('annotated')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    activeDiffTab === 'annotated'
                      ? 'bg-vermilion-500 text-white shadow-sm'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                  }`}
                >
                  {language === 'id' ? 'Esai Beranotasi Anda' : 'Your Annotated Essay'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDiffTab('model')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    activeDiffTab === 'model'
                      ? 'bg-vermilion-500 text-white shadow-sm'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                  }`}
                >
                  {t('writing.model_benchmark')}
                </button>
              </div>
            </div>

            {/* 4-Color Category Legend */}
            <div className="flex flex-wrap items-center gap-4 text-[11px] p-2.5 rounded-xl bg-washi-50 dark:bg-sumi-950 border border-washi-200 dark:border-sumi-800">
              <span className="flex items-center gap-1 text-red-600 dark:text-red-400 font-semibold">
                <span className="w-3 h-1 bg-red-500 rounded" />
                <span>{t('writing.cat_grammar')}</span>
              </span>
              <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold">
                <span className="w-3 h-2 bg-amber-400/40 rounded border border-amber-500" />
                <span>{t('writing.cat_collocation')}</span>
              </span>
              <span className="flex items-center gap-1 text-purple-600 dark:text-purple-400 font-semibold">
                <span className="w-3 h-1 border-t-2 border-dashed border-purple-500" />
                <span>{t('writing.cat_vocab')}</span>
              </span>
              <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-semibold">
                <span className="w-3 h-1 border-t-2 border-dotted border-blue-500" />
                <span>{t('writing.cat_cohesion')}</span>
              </span>
            </div>

            {/* Essay Content Display with Interactive Highlights */}
            {activeDiffTab === 'annotated' ? (
              <div className="relative p-5 rounded-xl bg-washi-50 dark:bg-sumi-950 border border-washi-200 dark:border-sumi-800 text-sm leading-relaxed whitespace-pre-wrap font-sans text-stone-800 dark:text-stone-200">
                {scorecard.annotations.length === 0 ? (
                  <p>{essayContent}</p>
                ) : (
                  <div>
                    {/* Render annotated essay with clickable spans */}
                    {(() => {
                      const text = essayContent;
                      const parts: React.ReactNode[] = [];
                      let lastIndex = 0;

                      // Sort annotations by charStart
                      const sorted = [...scorecard.annotations].sort((a, b) => a.charStart - b.charStart);

                      sorted.forEach((ann, idx) => {
                        if (ann.charStart > lastIndex) {
                          parts.push(text.substring(lastIndex, ann.charStart));
                        }

                        const isPreviewed = previewReplacements[ann.id];
                        const displayText = isPreviewed ? ann.suggestedReplacement : ann.originalText;

                        const categoryStyles: Record<string, string> = {
                          grammar_error: 'underline decoration-red-500 decoration-2 underline-offset-4 cursor-pointer hover:bg-red-500/10 font-medium',
                          collocation_suggestion: 'bg-amber-300/40 dark:bg-amber-500/20 text-stone-900 dark:text-amber-200 cursor-pointer hover:bg-amber-400/50 px-0.5 rounded',
                          vocabulary_enhancement: 'underline decoration-dashed decoration-purple-500 decoration-2 underline-offset-4 cursor-pointer hover:bg-purple-500/10 font-medium',
                          cohesive_marker_feedback: 'underline decoration-dotted decoration-blue-500 decoration-2 underline-offset-4 cursor-pointer hover:bg-blue-500/10 font-medium'
                        };

                        parts.push(
                          <span
                            key={ann.id || idx}
                            onClick={e => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              setPopoverPos({ top: rect.top - 120, left: rect.left });
                              setActiveAnnotation(ann);
                            }}
                            className={`transition-all ${isPreviewed ? 'bg-emerald-400/30 text-emerald-900 dark:text-emerald-200 font-bold px-1 rounded' : categoryStyles[ann.category] || 'underline'}`}
                          >
                            {displayText}
                          </span>
                        );

                        lastIndex = Math.max(lastIndex, ann.charEnd);
                      });

                      if (lastIndex < text.length) {
                        parts.push(text.substring(lastIndex));
                      }

                      return parts;
                    })()}
                  </div>
                )}

                {/* Floating Interactive Inline Feedback Popover (Scenario 67) */}
                {activeAnnotation && (
                  <div className="mt-4 p-4 rounded-xl border-2 border-vermilion-500/50 bg-white dark:bg-sumi-900 shadow-2xl space-y-3 animate-scaleUp">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                          activeAnnotation.category === 'grammar_error'
                            ? 'bg-red-500/10 text-red-600 border border-red-500/20'
                            : activeAnnotation.category === 'collocation_suggestion'
                            ? 'bg-amber-500/10 text-amber-600 border border-amber-500/20'
                            : activeAnnotation.category === 'vocabulary_enhancement'
                            ? 'bg-purple-500/10 text-purple-600 border border-purple-500/20'
                            : 'bg-blue-500/10 text-blue-600 border border-blue-500/20'
                        }`}>
                          {activeAnnotation.subCategory}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveAnnotation(null)}
                        className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Original vs Suggested Diff */}
                    <div className="flex items-center gap-3 text-xs bg-washi-100 dark:bg-sumi-850 p-2.5 rounded-lg">
                      <span className="line-through text-red-600 dark:text-red-400 font-mono">
                        {activeAnnotation.originalText}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold font-mono">
                        {activeAnnotation.suggestedReplacement}
                      </span>
                    </div>

                    {/* Pedagogical Explanation */}
                    <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                      {language === 'id' ? activeAnnotation.explanationId : activeAnnotation.explanationEn}
                    </p>

                    {/* 1-Click Preview Replacement Button */}
                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => togglePreviewReplace(activeAnnotation.id)}
                        className="px-3 py-1.5 rounded-lg bg-vermilion-500 hover:bg-vermilion-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>
                          {previewReplacements[activeAnnotation.id]
                            ? t('writing.revert_preview')
                            : t('writing.preview_replace')}
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Model Answer Comparison Tab */
              <div className="space-y-4">
                <div className="p-5 rounded-xl bg-washi-50 dark:bg-sumi-950 border border-washi-200 dark:border-sumi-800 text-sm leading-relaxed whitespace-pre-wrap font-sans text-stone-800 dark:text-stone-200">
                  {scorecard.modelAnswerComparison.modelText}
                </div>

                <div className="p-4 rounded-xl border border-washi-200 dark:border-sumi-800 bg-white dark:bg-sumi-900 space-y-2">
                  <h4 className="font-bold text-xs text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-emerald-500" />
                    <span>{t('writing.model_strengths')}</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-stone-600 dark:text-stone-400">
                    {(language === 'id' ? scorecard.modelAnswerComparison.modelKeyStrengthsId : scorecard.modelAnswerComparison.modelKeyStrengthsEn).map((st, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{st}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setScorecard(null);
                  setEssayContent('');
                }}
                className="px-4 py-2 rounded-xl bg-vermilion-500 hover:bg-vermilion-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t('writing.retake_btn')}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Underlength Warning Pre-Submission Modal */}
      {showUnderlengthModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-sumi-900 border-2 border-amber-500 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-scaleUp">
            <div className="flex items-center gap-3 text-amber-600 dark:text-amber-400">
              <AlertTriangle className="w-8 h-8 shrink-0" />
              <div>
                <h3 className="font-bold text-base text-stone-900 dark:text-stone-100">
                  {t('writing.underlength_modal_title')}
                </h3>
                <span className="text-xs font-mono font-bold">
                  {wordCount} / {targetMin} Words
                </span>
              </div>
            </div>
            <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
              {t('writing.underlength_modal_desc', { words: wordCount, target: targetMin })}
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowUnderlengthModal(false)}
                className="px-4 py-2 rounded-xl bg-washi-200 dark:bg-sumi-800 text-stone-800 dark:text-stone-200 font-bold text-xs hover:bg-washi-300 transition-all"
              >
                {t('writing.underlength_modal_cancel')}
              </button>
              <button
                type="button"
                onClick={handleExecuteSubmission}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-sm transition-all"
              >
                {t('writing.underlength_modal_confirm')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clear Draft Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl animate-scaleUp">
            <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">
              {language === 'id' ? 'Bersihkan Draf Tulisan?' : 'Reset Essay Draft?'}
            </h3>
            <p className="text-xs text-stone-500">
              {language === 'id' ? 'Tindakan ini akan menghapus teks esai yang telah Anda ketik secara permanen.' : 'This action will discard your currently typed essay text permanently.'}
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-600 dark:text-stone-400"
              >
                {language === 'id' ? 'Batal' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={handleClearDraft}
                className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs"
              >
                {language === 'id' ? 'Bersihkan' : 'Clear'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
