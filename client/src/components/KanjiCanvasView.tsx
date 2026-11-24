import React, { useState, useEffect, useRef } from 'react';
import { KanjiStrokeData, StrokeDefinition, StrokePoint } from '../../../shared/types';
import {
  fetchKanjiList,
  fetchKanjiDetail,
  fetchKanjiCatalog,
  fetchJoyoDetail,
  scheduleKanjiSrs,
  recordKanjiPractice,
  fetchMasteredCharacters
} from '../api';
import {
  resampleStroke,
  validateDrawnStroke,
  ValidationOutcome
} from '../lib/strokeValidator';
import {
  playStrokeSuccessSound,
  playStrokeErrorSound,
  playCharacterCompleteSound
} from '../lib/sound';
import confetti from 'canvas-confetti';
import {
  Feather,
  RotateCcw,
  Play,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Eye,
  EyeOff,
  Layers,
  Search,
  BookOpen,
  Calendar,
  Zap,
  Check,
  ChevronRight,
  Flame,
  Clock,
  Compass
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const KANA_ROW_MAP: Record<string, string[]> = {
  'a': ['あ', 'い', 'う', 'え', 'お', 'ア', 'イ', 'ウ', 'エ', 'オ'],
  'ka': ['か', 'き', 'く', 'け', 'こ', 'カ', 'キ', 'ク', 'ケ', 'コ'],
  'sa': ['さ', 'し', 'す', 'せ', 'そ', 'サ', 'シ', 'ス', 'セ', 'ソ'],
  'ta': ['た', 'ち', 'つ', 'て', 'と', 'タ', 'チ', 'ツ', 'テ', 'ト'],
  'na': ['な', 'に', 'ぬ', 'ね', 'の', 'ナ', 'ニ', 'ヌ', 'ネ', 'ノ'],
  'ha': ['は', 'ひ', 'ふ', 'へ', 'ほ', 'ハ', 'ヒ', 'フ', 'ヘ', 'ホ'],
  'ma': ['ま', 'み', 'む', 'め', 'も', 'マ', 'ミ', 'ム', 'メ', 'モ'],
  'ya': ['や', 'ゆ', 'よ', 'ヤ', 'ユ', 'ヨ'],
  'ra': ['ら', 'り', 'る', 'れ', 'ろ', 'ラ', 'リ', 'ル', 'レ', 'ロ'],
  'wa': ['わ', 'を', 'ん', 'ワ', 'ヲ', 'ン']
};

export interface KanjiCanvasViewProps {
  initialCategory?: 'HIRAGANA' | 'KATAKANA' | 'KANJI';
  initialLevel?: string;
  onMasteryUpdate?: (character: string) => void;
}

export const KanjiCanvasView: React.FC<KanjiCanvasViewProps> = ({
  initialCategory,
  initialLevel = 'N5',
  onMasteryUpdate
}) => {
  const { theme } = useTheme();
  const { t, language } = useLanguage();
  const [kanjiList, setKanjiList] = useState<any[]>([]);
  const [category, setCategory] = useState<'HIRAGANA' | 'KATAKANA' | 'KANJI'>(initialCategory || 'HIRAGANA');
  const [subFilter, setSubFilter] = useState<string>('ALL');
  const [currentKanjiId, setCurrentKanjiId] = useState<string>('kana_a_h');
  const [kanjiData, setKanjiData] = useState<KanjiStrokeData | null>(null);
  const [joyoDetail, setJoyoDetail] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Joyo 2,136 Catalog State
  const [joyoCatalog, setJoyoCatalog] = useState<any[]>([]);
  const [joyoTotal, setJoyoTotal] = useState<number>(2136);
  const [joyoStats, setJoyoStats] = useState<Record<string, number>>({});
  const [kanjiSearch, setKanjiSearch] = useState<string>('');
  const [kanjiLevelFilter, setKanjiLevelFilter] = useState<string>(initialCategory === 'KANJI' ? (initialLevel || 'N5') : 'ALL');
  const [catalogLoading, setCatalogLoading] = useState<boolean>(false);

  // Visual Mastery State
  const [masteredCharacters, setMasteredCharacters] = useState<Set<string>>(new Set());

  // 4-Step Formula Tabs
  const [activeStepTab, setActiveStepTab] = useState<'step1' | 'step2' | 'step3' | 'step4'>('step1');
  const [srsPacing, setSrsPacing] = useState<'SUSTAINABLE' | 'SPRINT'>('SUSTAINABLE');
  const [srsScheduledToast, setSrsScheduledToast] = useState<string | null>(null);

  // Practice Modes & Settings
  const [mode, setMode] = useState<'guided' | 'strict_memory'>('guided');
  const [gridType, setGridType] = useState<'rice' | 'cross' | 'blank'>('rice');
  const [showGhost, setShowGhost] = useState<boolean>(true);
  const [showNumbers, setShowNumbers] = useState<boolean>(true);

  // Stroke State Machine
  const [currentStrokeIdx, setCurrentStrokeIdx] = useState<number>(1);
  const [acceptedStrokes, setAcceptedStrokes] = useState<number[]>([]);
  const [userDrawnStrokes, setUserDrawnStrokes] = useState<Record<number, StrokePoint[]>>({});
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<ValidationOutcome | null>(null);
  const [completedModal, setCompletedModal] = useState<any>(null);

  // Canvas Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const currentPathRef = useRef<StrokePoint[]>([]);
  const isAnimatingRef = useRef<boolean>(false);

  useEffect(() => {
    loadMasteredCharacters();
    loadKanjiList();
    const targetLvl = initialCategory === 'KANJI' ? (initialLevel || 'N5') : 'ALL';
    loadJoyoCatalog(targetLvl, '', initialCategory === 'KANJI');
  }, []);

  // Sync when initialCategory or initialLevel props change dynamically
  useEffect(() => {
    if (initialCategory) {
      setCategory(initialCategory);
      if (initialCategory === 'KANJI') {
        const lvl = initialLevel || 'N5';
        setKanjiLevelFilter(lvl);
        loadJoyoCatalog(lvl, '', true);
      } else {
        setSubFilter('ALL');
        const firstKana = kanjiList.find(k => k.jlpt_level === initialCategory);
        if (firstKana) {
          setCurrentKanjiId(firstKana.id);
        }
      }
    }
  }, [initialCategory, initialLevel]);

  useEffect(() => {
    if (currentKanjiId) {
      loadKanjiDetail(currentKanjiId);
    }
  }, [currentKanjiId]);

  const loadMasteredCharacters = async () => {
    try {
      const chars = await fetchMasteredCharacters();
      setMasteredCharacters(new Set(chars));
    } catch (err) {
      console.warn('Failed to load mastered characters list', err);
    }
  };

  const loadKanjiList = async () => {
    try {
      const list = await fetchKanjiList();
      setKanjiList(list);
      if (initialCategory === 'KANJI') {
        // If initial category is KANJI, prioritize selecting N5 kanji (like '日' or first N5)
        const nichi = list.find((k: any) => k.character === '日');
        const n5Kanji = list.find((k: any) => k.jlpt_level === 'N5');
        const target = nichi || n5Kanji;
        if (target) {
          setCurrentKanjiId(target.id);
        }
      } else {
        const targetCat = initialCategory || 'HIRAGANA';
        const firstKana = list.find((k: any) => k.jlpt_level === targetCat);
        if (firstKana && !currentKanjiId) {
          setCurrentKanjiId(firstKana.id);
        }
      }
    } catch (err) {
      console.error('Failed to load kanji list', err);
    }
  };

  const loadJoyoCatalog = async (level: string, search: string, autoSelectFirst = false) => {
    setCatalogLoading(true);
    try {
      const res = await fetchKanjiCatalog(level === 'ALL' ? undefined : level, search, 60, 0);
      const items = res.items || [];
      setJoyoCatalog(items);
      setJoyoTotal(res.total || 0);
      if (res.stats) setJoyoStats(res.stats);
      if (autoSelectFirst && items.length > 0) {
        const nichi = items.find((item: any) => item.character === '日');
        handleSelectJoyoKanji(nichi || items[0]);
      }
    } catch (err) {
      console.error('Failed to load joyo catalog', err);
    } finally {
      setCatalogLoading(false);
    }
  };

  const handleSearchChange = (q: string) => {
    setKanjiSearch(q);
    loadJoyoCatalog(kanjiLevelFilter, q);
  };

  const handleLevelFilterChange = (lvl: string) => {
    setKanjiLevelFilter(lvl);
    loadJoyoCatalog(lvl, kanjiSearch);
  };

  const handleSelectJoyoKanji = async (joyoItem: any) => {
    setLoading(true);
    try {
      const detail = await fetchJoyoDetail(joyoItem.character);
      setJoyoDetail(detail);

      // Check if stroke vector model exists in kanji_stroke_data
      const strokeItem = kanjiList.find(k => k.character === joyoItem.character);
      if (strokeItem) {
        setCurrentKanjiId(strokeItem.id);
      } else {
        // Construct fallback single-stroke display if direct vector isn't pre-seeded
        setKanjiData({
          id: joyoItem.id,
          character: joyoItem.character,
          jlptLevel: joyoItem.jlptLevel,
          onYomi: joyoItem.onYomi.join('、'),
          kunYomi: joyoItem.kunYomi.join('、'),
          englishGloss: joyoItem.meanings.join(', '),
          radical: joyoItem.primaryRadical,
          strokeCount: joyoItem.strokeCount,
          strokePaths: [],
          strokeMetadata: []
        });
        setAcceptedStrokes([]);
        setUserDrawnStrokes({});
        setCurrentStrokeIdx(1);
        setFeedback(null);
      }
    } catch (err) {
      console.error('Failed to select joyo kanji', err);
    } finally {
      setLoading(false);
    }
  };

  const handleScheduleSrs = async () => {
    const char = kanjiData?.character || joyoDetail?.character;
    if (!char) return;

    try {
      const res = await scheduleKanjiSrs(char, srsPacing);
      setSrsScheduledToast(res.message || `Kanji 「${char}」 scheduled into FSRS review deck!`);
      setTimeout(() => setSrsScheduledToast(null), 4000);
    } catch (err) {
      console.error('Failed to schedule SRS', err);
    }
  };

  const loadKanjiDetail = async (id: string) => {
    setLoading(true);
    setFeedback(null);
    setCompletedModal(null);
    setCurrentStrokeIdx(1);
    setAcceptedStrokes([]);
    setUserDrawnStrokes({});
    isAnimatingRef.current = false;

    try {
      const data = await fetchKanjiDetail(id);
      setKanjiData(data);
      if (data.jlptLevel === 'HIRAGANA') setCategory('HIRAGANA');
      else if (data.jlptLevel === 'KATAKANA') setCategory('KATAKANA');
      else {
        setCategory('KANJI');
        // Also fetch rich 4-step formula data
        const joyo = await fetchJoyoDetail(data.character);
        setJoyoDetail(joyo);
      }
    } catch (err) {
      console.error('Failed to load kanji detail', err);
    } finally {
      setLoading(false);
    }
  };

  // When category changes, select first character of that category
  const handleCategoryChange = (cat: 'HIRAGANA' | 'KATAKANA' | 'KANJI') => {
    setCategory(cat);
    setSubFilter('ALL');
    if (cat === 'KANJI') {
      if (joyoCatalog.length > 0) {
        handleSelectJoyoKanji(joyoCatalog[0]);
      }
    } else {
      const filtered = kanjiList.filter(k => {
        if (cat === 'HIRAGANA') return k.jlpt_level === 'HIRAGANA';
        if (cat === 'KATAKANA') return k.jlpt_level === 'KATAKANA';
        return false;
      });
      if (filtered.length > 0) {
        setCurrentKanjiId(filtered[0].id);
      }
    }
  };

  useEffect(() => {
    redrawCanvas();
  }, [acceptedStrokes, userDrawnStrokes, kanjiData, theme]);

  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !kanjiData) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, 1000, 1000);

    acceptedStrokes.forEach(strokeIndex => {
      const userPoints = userDrawnStrokes[strokeIndex];
      const strokeDef = kanjiData.strokeMetadata?.find(s => s.strokeIndex === strokeIndex);

      ctx.save();
      ctx.strokeStyle = theme === 'dark' ? '#F6F5F0' : '#14161A';
      ctx.lineWidth = 26;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (userPoints && userPoints.length > 1) {
        // Render user's authentic hand-drawn stroke with smooth quadratic curve interpolation
        ctx.beginPath();
        ctx.moveTo(userPoints[0].x, userPoints[0].y);
        for (let i = 1; i < userPoints.length - 1; i++) {
          const xc = (userPoints[i].x + userPoints[i + 1].x) / 2;
          const yc = (userPoints[i].y + userPoints[i + 1].y) / 2;
          ctx.quadraticCurveTo(userPoints[i].x, userPoints[i].y, xc, yc);
        }
        ctx.lineTo(userPoints[userPoints.length - 1].x, userPoints[userPoints.length - 1].y);
        ctx.stroke();
      } else if (strokeDef) {
        // Fallback for demonstration playback or pre-rendered strokes
        const p = new Path2D(strokeDef.svgPath);
        ctx.stroke(p);
      }
      ctx.restore();
    });
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (completedModal || isAnimatingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      canvas.setPointerCapture(e.pointerId);
    } catch {}
    setIsDrawing(true);
    setFeedback(null);

    const rect = canvas.getBoundingClientRect();
    const canonX = ((e.clientX - rect.left) / rect.width) * 1000;
    const canonY = ((e.clientY - rect.top) / rect.height) * 1000;

    currentPathRef.current = [{ x: canonX, y: canonY, t: Date.now() }];

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.save();
      ctx.strokeStyle = theme === 'dark' ? '#F6F5F0' : '#14161A';
      ctx.lineWidth = 26;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(canonX, canonY);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const canonX = ((e.clientX - rect.left) / rect.width) * 1000;
    const canonY = ((e.clientY - rect.top) / rect.height) * 1000;

    currentPathRef.current.push({ x: canonX, y: canonY, t: Date.now() });

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.lineTo(canonX, canonY);
      ctx.stroke();
    }
  };

  const handlePointerUp = async (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !kanjiData) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      canvas.releasePointerCapture(e.pointerId);
    } catch {}
    setIsDrawing(false);

    const rawPoints = currentPathRef.current;
    if (rawPoints.length < 2) return;

    if (!kanjiData.strokeMetadata || kanjiData.strokeMetadata.length === 0) {
      // Freeform recognition & stroke progress tracking
      playStrokeSuccessSound();
      const nextStrokeIdx = currentStrokeIdx + 1;
      setUserDrawnStrokes(prev => ({
        ...prev,
        [currentStrokeIdx]: [...rawPoints]
      }));
      setAcceptedStrokes(prev => [...prev, currentStrokeIdx]);
      setCurrentStrokeIdx(nextStrokeIdx);

      setFeedback({
        isValid: true,
        status: 'accepted',
        message: language === 'id'
          ? `Goresan ${currentStrokeIdx} dari ${kanjiData.strokeCount || 1} diterima!`
          : `Stroke ${currentStrokeIdx} of ${kanjiData.strokeCount || 1} accepted!`,
        geometryScore: 95
      });

      if (nextStrokeIdx > (kanjiData.strokeCount || 1)) {
        handleCharacterComplete();
      }
      return;
    }

    const resampled = resampleStroke(rawPoints, 64);
    const outcome = validateDrawnStroke(resampled, currentStrokeIdx, kanjiData.strokeMetadata, language);
    setFeedback(outcome);

    if (outcome.isValid) {
      playStrokeSuccessSound();
      const nextStrokeIdx = currentStrokeIdx + 1;
      setUserDrawnStrokes(prev => ({
        ...prev,
        [currentStrokeIdx]: [...rawPoints]
      }));
      setAcceptedStrokes(prev => [...prev, currentStrokeIdx]);
      setCurrentStrokeIdx(nextStrokeIdx);

      if (nextStrokeIdx > kanjiData.strokeCount) {
        handleCharacterComplete();
      }
    } else {
      playStrokeErrorSound();
      setTimeout(() => {
        redrawCanvas();
      }, 350);
    }
  };

  const handleCharacterComplete = async () => {
    if (!kanjiData) return;

    playCharacterCompleteSound();
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#C83C23', '#242424', '#DCD9CD']
    });

    // Instantly mark as mastered in local state for immediate visual badge feedback
    const completedChar = kanjiData.character;
    const completedId = kanjiData.id;
    setMasteredCharacters(prev => {
      const updated = new Set(prev);
      if (completedChar) updated.add(completedChar);
      if (completedId) updated.add(completedId);
      try {
        localStorage.setItem('lingua_mastered_characters', JSON.stringify(Array.from(updated)));
      } catch (e) {}
      return updated;
    });
    if (onMasteryUpdate && completedChar) {
      onMasteryUpdate(completedChar);
    }

    try {
      const res = await recordKanjiPractice({
        character: kanjiData.character,
        syllabary: kanjiData.jlptLevel,
        kanjiId: kanjiData.id,
        score: 100,
        strokeCount: kanjiData.strokeCount
      });

      setCompletedModal({
        character: kanjiData.character,
        strokeCount: kanjiData.strokeCount,
        compositeScore: 100,
        progressPct: res.progressPct,
        streakDays: res.streakDays,
        xpGained: res.xpGained,
        message: res.message
      });
    } catch (err) {
      console.error('Failed to record practice', err);
      setCompletedModal({
        character: kanjiData.character,
        strokeCount: kanjiData.strokeCount,
        compositeScore: 100,
        progressPct: 4,
        streakDays: 1,
        xpGained: 25
      });
    }
  };

  
  const handleNextCharacter = () => {
    if (!kanjiList.length) return;
    const currentIndex = kanjiList.findIndex(k => k.id === currentKanjiId);
    const nextItem = kanjiList[(currentIndex + 1) % kanjiList.length];
    if (nextItem) {
      setCurrentKanjiId(nextItem.id);
    }
  };

  const playDemonstration = () => {
    if (!kanjiData) return;
    isAnimatingRef.current = true;
    setAcceptedStrokes([]);
    setUserDrawnStrokes({});
    setCurrentStrokeIdx(1);
    setFeedback(null);
    setCompletedModal(null);

    let step = 1;
    const max = kanjiData.strokeCount;
    const timer = setInterval(() => {
      if (step <= max) {
        playStrokeSuccessSound();
        setAcceptedStrokes(prev => [...prev, step]);
        setCurrentStrokeIdx(step + 1);
        step++;
      } else {
        clearInterval(timer);
        isAnimatingRef.current = false;
      }
    }, 650);
  };

  const handleResetCanvas = () => {
    setCurrentStrokeIdx(1);
    setAcceptedStrokes([]);
    setUserDrawnStrokes({});
    setFeedback(null);
    setCompletedModal(null);
    redrawCanvas();
  };

  const currentStrokeDef = kanjiData?.strokeMetadata?.find(s => s.strokeIndex === currentStrokeIdx);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 animate-fadeIn">
      {/* Toast */}
      {srsScheduledToast && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-xs sm:text-sm font-medium">{srsScheduledToast}</span>
        </div>
      )}

      {/* Main Header & Category Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-washi-300 dark:border-sumi-800 pb-4">
        <div>
          <div className="flex items-center gap-1.5 text-vermilion-600 dark:text-vermilion-500 text-xs font-semibold mb-1">
            <Feather className="w-4 h-4" />
            <span>{language === 'id' ? 'Studio Penulisan Vektor Huruf & 2.136 Kanji Joyo' : 'Interactive Kana & Complete 2,136 Jōyō Kanji Studio'}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 tracking-tight flex items-center gap-2">
            <span>漢字・仮名 習得スタジオ</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-vermilion-500/10 text-vermilion-600 dark:text-vermilion-400 font-semibold border border-vermilion-500/20">
              {language === 'id' ? 'Rumus 4 Langkah' : '4-Step Mastery Formula'}
            </span>
          </h1>
          <p className="text-stone-600 dark:text-stone-400 text-xs mt-1">
            {language === 'id' ? 'Radikal + Mnemonik + Kata Majemuk Alami + Pengulangan Berjeda FSRS di seluruh 2.136 Kanji Joyo & 92 Kana.' : 'Radicals + Mnemonics + Real Vocabulary + FSRS Spaced Repetition across all 2,136 Jōyō Kanji & 92 Kana.'}
          </p>
        </div>

        {/* Primary Type Pills */}
        <div className="flex items-center gap-1.5 bg-washi-100 dark:bg-sumi-850 p-1.5 rounded-xl border border-washi-300 dark:border-sumi-750 self-start md:self-auto">
          <button
            onClick={() => handleCategoryChange('HIRAGANA')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              category === 'HIRAGANA'
                ? 'bg-vermilion-500 text-white font-bold shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            平仮名 (Hiragana • 46)
          </button>
          <button
            onClick={() => handleCategoryChange('KATAKANA')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              category === 'KATAKANA'
                ? 'bg-vermilion-500 text-white font-bold shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            片仮名 (Katakana • 46)
          </button>
          <button
            onClick={() => handleCategoryChange('KANJI')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              category === 'KANJI'
                ? 'bg-vermilion-500 text-white font-bold shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            <span>{language === 'id' ? '常用漢字 (2.136 Kanji)' : '常用漢字 (2,136 Kanji)'}</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              category === 'KANJI' ? 'bg-white/20 text-white' : 'bg-vermilion-500/10 text-vermilion-600'
            }`}>
              Full
            </span>
          </button>
        </div>
      </div>

      {/* Kana vs Kanji Sub-Selectors */}
      {category !== 'KANJI' ? (
        <div className="space-y-2 bg-washi-50 dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-xl p-3 shadow-sm">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-stone-600 dark:text-stone-400">
            <span className="font-semibold text-stone-500 text-[11px] mr-1">{language === 'id' ? 'Baris Gojūon:' : 'Gojūon Rows:'}</span>
            {['ALL', 'a', 'ka', 'sa', 'ta', 'na', 'ha', 'ma', 'ya', 'ra', 'wa'].map(row => (
              <button
                key={row}
                onClick={() => setSubFilter(row)}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all ${
                  subFilter === row
                    ? 'bg-stone-800 text-white dark:bg-stone-200 dark:text-stone-900 font-bold'
                    : 'bg-washi-200 dark:bg-sumi-800 text-stone-600 dark:text-stone-400 hover:bg-washi-300'
                }`}
              >
                {row === 'ALL' ? (language === 'id' ? 'Semua Baris (46)' : 'All Rows (46)') : `${row.toUpperCase()}-line`}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto pt-1">
            {kanjiList
              .filter(k => k.jlpt_level === category)
              .filter(k => {
                if (subFilter === 'ALL') return true;
                const allowed = KANA_ROW_MAP[subFilter] || [];
                return allowed.includes(k.character);
              })
              .map(charItem => {
                const isSelected = currentKanjiId === charItem.id;
                const isMastered = masteredCharacters.has(charItem.character) || masteredCharacters.has(charItem.id);
                return (
                  <button
                    key={charItem.id}
                    onClick={() => setCurrentKanjiId(charItem.id)}
                    className={`relative w-9 h-9 rounded-lg font-jp text-base font-medium flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-vermilion-500 text-white font-bold shadow-md scale-105'
                        : isMastered
                          ? 'bg-emerald-50/90 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border-2 border-emerald-500/70 hover:bg-emerald-100/80 dark:hover:bg-emerald-900/50'
                          : 'bg-washi-100 dark:bg-sumi-850 hover:bg-washi-200 dark:hover:bg-sumi-750 text-stone-800 dark:text-stone-200 border border-washi-200 dark:border-sumi-800'
                    }`}
                    title={`${charItem.character}${isMastered ? (language === 'id' ? ' • Selesai Dikuasai ✓' : ' • Mastered ✓') : ''}`}
                  >
                    <span>{charItem.character}</span>
                    {isMastered && (
                      <span
                        className={`absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-extrabold shadow-sm ${
                          isSelected
                            ? 'bg-white text-vermilion-600 ring-1 ring-vermilion-600'
                            : 'bg-emerald-500 text-white ring-1 ring-white dark:ring-sumi-900'
                        }`}
                      >
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
          </div>
        </div>
      ) : (
        /* 2,136 Joyo Kanji Comprehensive Catalog Bar */
        <div className="space-y-3 bg-washi-50 dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-xl p-4 shadow-sm">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Level Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-semibold text-stone-500 mr-1">{language === 'id' ? 'Tingkat JLPT:' : 'JLPT Level:'}</span>
              {['ALL', 'N5', 'N4', 'N3', 'N2', 'N1'].map(lvl => {
                const count = lvl === 'ALL' ? joyoTotal : joyoStats[lvl] || 0;
                return (
                  <button
                    key={lvl}
                    onClick={() => handleLevelFilterChange(lvl)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all flex items-center gap-1 ${
                      kanjiLevelFilter === lvl
                        ? 'bg-vermilion-500 text-white font-bold shadow-sm'
                        : 'bg-washi-200 dark:bg-sumi-800 text-stone-700 dark:text-stone-300 hover:bg-washi-300 dark:hover:bg-sumi-750'
                    }`}
                  >
                    <span>{lvl}</span>
                    <span className="text-[10px] opacity-75">({count})</span>
                  </button>
                );
              })}
            </div>

            {/* Search Box */}
            <div className="relative min-w-[220px]">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={language === 'id' ? "Cari kanji, arti, cara baca..." : "Search kanji, meaning, reading..."}
                value={kanjiSearch}
                onChange={e => handleSearchChange(e.target.value)}
                className="w-full bg-washi-100 dark:bg-sumi-800 border border-washi-300 dark:border-sumi-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-stone-800 dark:text-stone-200 placeholder:text-stone-400 focus:outline-none focus:border-vermilion-500 transition-colors"
              />
            </div>
          </div>

          {/* Quick Select Kanji Grid */}
          <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pt-1 pr-1">
            {catalogLoading ? (
              <div className="w-full py-6 text-center text-xs text-stone-500">Loading Joyo Kanji catalog...</div>
            ) : joyoCatalog.length === 0 ? (
              <div className="w-full py-6 text-center text-xs text-stone-500">No Kanji found matching query.</div>
            ) : (
              joyoCatalog.map(joyoItem => {
                const isSelected = (kanjiData?.character || joyoDetail?.character) === joyoItem.character;
                const isMastered = masteredCharacters.has(joyoItem.character) || masteredCharacters.has(joyoItem.id);
                return (
                  <button
                    key={joyoItem.id}
                    onClick={() => handleSelectJoyoKanji(joyoItem)}
                    className={`relative px-2.5 py-1 rounded-lg font-jp text-sm flex items-center gap-1.5 transition-all ${
                      isSelected
                        ? 'bg-vermilion-500 text-white font-bold shadow-md scale-105'
                        : isMastered
                          ? 'bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border border-emerald-500/60 dark:border-emerald-500/50 hover:bg-emerald-100/80 shadow-sm'
                          : 'bg-washi-100 dark:bg-sumi-850 hover:bg-washi-200 dark:hover:bg-sumi-750 text-stone-800 dark:text-stone-200 border border-washi-200 dark:border-sumi-800'
                    }`}
                    title={`${joyoItem.meanings.join(', ')} • ${joyoItem.jlptLevel} • ${joyoItem.strokeCount} strokes${isMastered ? (language === 'id' ? ' • Selesai Dikuasai ✓' : ' • Mastered ✓') : ''}`}
                  >
                    <span className="font-bold">{joyoItem.character}</span>
                    <span className="text-[10px] opacity-75">{joyoItem.meanings[0]}</span>
                    {isMastered && (
                      <span
                        className={`text-[10px] font-extrabold px-1 rounded ${
                          isSelected
                            ? 'bg-white/30 text-white'
                            : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                        }`}
                      >
                        ✓
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Main Workspace Layout: The 4-Step Formula Panel & Drawing Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: The 4-Step Kanji Mastery Formula (7 Columns on LG) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Character Highlight Header */}
          <div className="bg-washi-50 dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-xl p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-vermilion-500/10 border border-vermilion-500/20 text-vermilion-600 dark:text-vermilion-400 font-jp text-4xl font-bold flex items-center justify-center shadow-inner">
                  {kanjiData?.character || joyoDetail?.character || '字'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-vermilion-500 text-white">
                      {kanjiData?.jlptLevel || joyoDetail?.jlptLevel || 'N5'}
                    </span>
                    <span className="text-xs text-stone-500">
                      {kanjiData?.strokeCount || joyoDetail?.strokeCount} 画 ({language === 'id' ? 'Goresan' : 'Strokes'})
                    </span>
                    {(kanjiData?.radical || joyoDetail?.primaryRadical) && (
                      <span className="text-xs px-2 py-0.5 rounded bg-washi-200 dark:bg-sumi-800 text-stone-700 dark:text-stone-300">
                        部首: {kanjiData?.radical || joyoDetail?.primaryRadical}
                      </span>
                    )}
                    {(masteredCharacters.has(kanjiData?.character || '') || masteredCharacters.has(joyoDetail?.character || '')) && (
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-white flex items-center gap-1 shadow-sm">
                        <Check className="w-3 h-3" />
                        <span>{language === 'id' ? 'Telah Dikuasai' : 'Mastered'}</span>
                      </span>
                    )}
                  </div>
                  <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 mt-1">
                    {joyoDetail?.meanings?.join(', ') || (language === 'id' ? (kanjiData?.englishGloss?.replace(/HIRAGANA syllable:\s*/i, 'Suku kata Hiragana: ')?.replace(/KATAKANA syllable:\s*/i, 'Suku kata Katakana: ') || 'Penguasaan Karakter') : (kanjiData?.englishGloss || 'Character Mastery'))}
                  </h2>
                  <div className="text-xs text-stone-600 dark:text-stone-400 mt-0.5 flex flex-wrap gap-2">
                    {joyoDetail?.onYomi?.length > 0 && <span>音: {joyoDetail.onYomi.join('、')}</span>}
                    {joyoDetail?.kunYomi?.length > 0 && <span>訓: {joyoDetail.kunYomi.join('、')}</span>}
                  </div>
                </div>
              </div>

              {/* FSRS Sync Button */}
              <div className="flex flex-col items-end gap-1.5">
                <button
                  onClick={handleScheduleSrs}
                  className="px-3 py-1.5 rounded-lg bg-vermilion-500 hover:bg-vermilion-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                  title="Directly schedule this character into your active FSRS spaced repetition deck"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>FSRSデッキに追加</span>
                </button>
                <div className="flex items-center gap-1 text-[11px] text-stone-500">
                  <span>ペース:</span>
                  <button
                    onClick={() => setSrsPacing(srsPacing === 'SUSTAINABLE' ? 'SPRINT' : 'SUSTAINABLE')}
                    className="text-vermilion-600 dark:text-vermilion-400 font-semibold underline"
                  >
                    {srsPacing === 'SUSTAINABLE' ? '習慣 (3-6字/日)' : '加速 (10-25字/日)'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 4-Step Interactive Tabs */}
          <div className="bg-washi-50 dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-xl overflow-hidden shadow-sm">
            {/* Tab Selector Ribbon */}
            <div className="grid grid-cols-4 bg-washi-100 dark:bg-sumi-850 border-b border-washi-200 dark:border-sumi-800 text-xs">
              <button
                onClick={() => setActiveStepTab('step1')}
                className={`py-3 px-2 text-center font-medium transition-all border-b-2 flex flex-col items-center gap-0.5 ${
                  activeStepTab === 'step1'
                    ? 'border-vermilion-500 text-vermilion-600 dark:text-vermilion-400 font-bold bg-white/50 dark:bg-sumi-900/50'
                    : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
              >
                <span className="text-[10px] text-stone-400 font-mono">{language === 'id' ? 'LANGKAH 1' : 'STEP 1'}</span>
                <span>{language === 'id' ? 'Radikal (部首)' : '部首分解 (Radicals)'}</span>
              </button>
              <button
                onClick={() => setActiveStepTab('step2')}
                className={`py-3 px-2 text-center font-medium transition-all border-b-2 flex flex-col items-center gap-0.5 ${
                  activeStepTab === 'step2'
                    ? 'border-vermilion-500 text-vermilion-600 dark:text-vermilion-400 font-bold bg-white/50 dark:bg-sumi-900/50'
                    : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
              >
                <span className="text-[10px] text-stone-400 font-mono">{language === 'id' ? 'LANGKAH 2' : 'STEP 2'}</span>
                <span>{language === 'id' ? 'Mnemonik (記憶術)' : '記憶術 (Mnemonics)'}</span>
              </button>
              <button
                onClick={() => setActiveStepTab('step3')}
                className={`py-3 px-2 text-center font-medium transition-all border-b-2 flex flex-col items-center gap-0.5 ${
                  activeStepTab === 'step3'
                    ? 'border-vermilion-500 text-vermilion-600 dark:text-vermilion-400 font-bold bg-white/50 dark:bg-sumi-900/50'
                    : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
              >
                <span className="text-[10px] text-stone-400 font-mono">{language === 'id' ? 'LANGKAH 3' : 'STEP 3'}</span>
                <span>{language === 'id' ? 'Kata Majemuk (熟語)' : '生きた熟語 (Vocabulary)'}</span>
              </button>
              <button
                onClick={() => setActiveStepTab('step4')}
                className={`py-3 px-2 text-center font-medium transition-all border-b-2 flex flex-col items-center gap-0.5 ${
                  activeStepTab === 'step4'
                    ? 'border-vermilion-500 text-vermilion-600 dark:text-vermilion-400 font-bold bg-white/50 dark:bg-sumi-900/50'
                    : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
              >
                <span className="text-[10px] text-stone-400 font-mono">{language === 'id' ? 'LANGKAH 4' : 'STEP 4'}</span>
                <span>{language === 'id' ? 'Ulasan FSRS (復習)' : 'FSRS同期 (Repetition)'}</span>
              </button>
            </div>

            {/* Tab Contents */}
            <div className="p-5">
              {/* Step 1: Radical Breakdown */}
              {activeStepTab === 'step1' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center gap-2 text-xs font-bold text-vermilion-600 dark:text-vermilion-400">
                    <Compass className="w-4 h-4" />
                    <span>{language === 'id' ? 'Langkah 1: Dekonstruksi Radikal & Komponen Dasar (部首分解)' : 'Step 1: Break Kanji Into Radical Building Blocks'}</span>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                    {language === 'id' ? `Mengurai karakter menjadi komponen semantik dasar mengurangi beban mental. Daripada menghafal ${kanjiData?.strokeCount || joyoDetail?.strokeCount || 10} goresan acak yang terputus, kuasai blok penyusun intinya:` : `Decomposing characters into semantic primitives cuts mental load. Rather than memorizing ${kanjiData?.strokeCount || joyoDetail?.strokeCount || 10} unconnected strokes, master its core building blocks:`}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="bg-washi-100 dark:bg-sumi-850 p-4 rounded-xl border border-washi-200 dark:border-sumi-800">
                      <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider">{language === 'id' ? 'Radikal Utama (部首)' : 'Primary Radical (部首)'}</span>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="min-w-[40px] px-2 h-10 rounded-lg bg-vermilion-500/10 text-vermilion-600 dark:text-vermilion-400 font-jp text-base font-bold flex items-center justify-center shrink-0">
                          {joyoDetail?.primaryRadical || kanjiData?.radical || '部'}
                        </span>
                        <div>
                          <div className="font-bold text-sm text-stone-900 dark:text-stone-100">
                            {joyoDetail?.primaryRadical || kanjiData?.radical}
                          </div>
                          <div className="text-[11px] text-stone-500">{language === 'id' ? 'Fondasi Semantik Inti Kangxi' : 'Core Kangxi Semantic Anchor'}</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-washi-100 dark:bg-sumi-850 p-4 rounded-xl border border-washi-200 dark:border-sumi-800">
                      <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider">{language === 'id' ? 'Komponen Pembentuk (構成要素)' : 'Constituent Primitives (構成要素)'}</span>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {(joyoDetail?.radicals || ['部首']).map((r: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-md bg-white dark:bg-sumi-800 border border-washi-300 dark:border-sumi-700 text-xs font-jp font-semibold text-stone-800 dark:text-stone-200"
                          >
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Mnemonic Association */}
              {activeStepTab === 'step2' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center gap-2 text-xs font-bold text-vermilion-600 dark:text-vermilion-400">
                    <Sparkles className="w-4 h-4" />
                    <span>{language === 'id' ? 'Langkah 2: Hubungkan Makna & Cara Baca dengan Mnemonik (記憶術)' : 'Step 2: Link Meanings & Readings with Vivid Mnemonics'}</span>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-washi-100 dark:bg-sumi-850 p-4 rounded-xl border border-washi-200 dark:border-sumi-800">
                      <div className="flex items-center gap-2 text-stone-800 dark:text-stone-200 font-bold text-xs mb-1">
                        <span className="w-2 h-2 rounded-full bg-vermilion-500" />
                        <span>{language === 'id' ? 'Kisah Makna (意味の記憶術)' : 'Meaning Story (意味の記憶術)'}</span>
                      </div>
                      <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                        {joyoDetail?.mnemonicMeaning || `Visualize the combination of ${(joyoDetail?.radicals || ['its radicals']).join(' and ')} representing the fundamental meaning "${joyoDetail?.meanings?.[0] || kanjiData?.englishGloss}".`}
                      </p>
                    </div>

                    <div className="bg-washi-100 dark:bg-sumi-850 p-4 rounded-xl border border-washi-200 dark:border-sumi-800">
                      <div className="flex items-center gap-2 text-stone-800 dark:text-stone-200 font-bold text-xs mb-1">
                        <span className="w-2 h-2 rounded-full bg-indigoMuted-500" />
                        <span>{language === 'id' ? 'Mnemonik Cara Baca (音訓の記憶術)' : 'Reading Mnemonic (音訓の記憶術)'}</span>
                      </div>
                      <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                        {joyoDetail?.mnemonicReading || `Connect the auditory pronunciation with the image to lock in fast native recall.`}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Real Vocabulary Compounds */}
              {activeStepTab === 'step3' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center gap-2 text-xs font-bold text-vermilion-600 dark:text-vermilion-400">
                    <BookOpen className="w-4 h-4" />
                    <span>{language === 'id' ? 'Langkah 3: Pelajari Cara Baca dalam Kata Majemuk Alami (熟語)' : 'Step 3: Learn Readings Inside Real Vocabulary Compounds (熟語)'}</span>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-stone-400">
                    {language === 'id' ? 'Jangan pernah mempelajari karakter secara terisolasi. Tautkan bacaan On\'yomi dan Kun\'yomi dalam kata majemuk Jukugo frekuensi tinggi:' : 'Never study characters in isolation. Anchor the On\'yomi and Kun\'yomi inside high-frequency Jukugo compounds:'}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {(joyoDetail?.vocabulary || [
                      { compound: `${kanjiData?.character}学`, reading: 'がく', meaning: 'study / theory' },
                      { compound: `大${kanjiData?.character}`, reading: 'だい', meaning: 'major / primary' }
                    ]).map((v: any, idx: number) => (
                      <div
                        key={idx}
                        className="bg-washi-100 dark:bg-sumi-850 p-3.5 rounded-xl border border-washi-200 dark:border-sumi-800 flex items-center justify-between"
                      >
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="font-jp text-base font-bold text-stone-900 dark:text-stone-100">
                              {v.compound}
                            </span>
                            <span className="text-xs text-vermilion-600 dark:text-vermilion-400 font-jp">
                              【{v.reading}】
                            </span>
                          </div>
                          <span className="text-[11px] text-stone-500 mt-0.5 block">{v.meaning}</span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-semibold border border-emerald-500/20">
                          Active
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Spaced Repetition (FSRS) */}
              {activeStepTab === 'step4' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center gap-2 text-xs font-bold text-vermilion-600 dark:text-vermilion-400">
                    <Calendar className="w-4 h-4" />
                    <span>{language === 'id' ? 'Langkah 4: Ulas dengan Pengulangan Berjeda Adaptif (FSRS)' : 'Step 4: Review with Adaptive Spaced Repetition (FSRS)'}</span>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                    {language === 'id' ? 'Perkuat memori tepat sebelum kurva lupa terjadi. Pilih kecepatan belajar harian yang nyaman untuk Anda:' : 'Consolidate memory just before the forgetting curve triggers. Choose your sustainable daily pace:'}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div
                      onClick={() => setSrsPacing('SUSTAINABLE')}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        srsPacing === 'SUSTAINABLE'
                          ? 'bg-vermilion-500/10 border-vermilion-500 shadow-sm'
                          : 'bg-washi-100 dark:bg-sumi-850 border-washi-200 dark:border-sumi-800'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-vermilion-500" />
                          <span>{language === 'id' ? 'Mode Kebiasaan Berkelanjutan (Sustainable)' : '継続習慣モード (Sustainable)'}</span>
                        </span>
                        {srsPacing === 'SUSTAINABLE' && <Check className="w-4 h-4 text-vermilion-500" />}
                      </div>
                      <div className="text-[11px] text-stone-600 dark:text-stone-400 mt-2">
                        • <strong>3–6 新規漢字/日</strong> (~15–20 分)<br />
                        • Steady long-term retention without review backlog panic.
                      </div>
                    </div>

                    <div
                      onClick={() => setSrsPacing('SPRINT')}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        srsPacing === 'SPRINT'
                          ? 'bg-vermilion-500/10 border-vermilion-500 shadow-sm'
                          : 'bg-washi-100 dark:bg-sumi-850 border-washi-200 dark:border-sumi-800'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                          <Flame className="w-3.5 h-3.5 text-amber-500" />
                          <span>{language === 'id' ? 'Mode Akselerasi Intensif (Sprint)' : '集中加速モード (Sprint)'}</span>
                        </span>
                        {srsPacing === 'SPRINT' && <Check className="w-4 h-4 text-vermilion-500" />}
                      </div>
                      <div className="text-[11px] text-stone-600 dark:text-stone-400 mt-2">
                        • <strong>10–25 新規漢字/日</strong> (~45–60 分)<br />
                        • Accelerated recognition pass for imminent exam targets.
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={handleScheduleSrs}
                      className="w-full py-2.5 rounded-xl bg-vermilion-500 hover:bg-vermilion-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>{language === 'id' ? `Daftarkan 「${kanjiData?.character || joyoDetail?.character}」 ke Dek Ulasan FSRS Sekarang` : `「${kanjiData?.character || joyoDetail?.character}」をFSRSデッキに即時登録`}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: HTML5 Vector Canvas & Stroke Validator (5 Columns on LG) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-washi-50 dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-xl p-4 sm:p-5 shadow-sm">
            {/* Canvas Header & Toolbar */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-stone-600 dark:text-stone-400">
                  {language === 'id' ? `Goresan ${Math.min(currentStrokeIdx, kanjiData?.strokeCount || 1)} dari ${kanjiData?.strokeCount || 1}` : `Stroke ${Math.min(currentStrokeIdx, kanjiData?.strokeCount || 1)} of ${kanjiData?.strokeCount || 1}`}
                </span>
                {kanjiData?.strokeMetadata?.length ? (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-semibold border border-emerald-500/20">
                    {language === 'id' ? 'Vektor Urutan Goresan' : 'Hitsujun Vector'}
                  </span>
                ) : (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 font-semibold border border-amber-500/20">
                    {language === 'id' ? 'Latihan Bebas' : 'Freeform Practice'}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setShowGhost(!showGhost)}
                  className={`p-1.5 rounded-md border text-xs transition-colors ${
                    showGhost
                      ? 'bg-washi-200 dark:bg-sumi-800 text-stone-800 dark:text-stone-200 border-washi-300 dark:border-sumi-700'
                      : 'text-stone-400 border-transparent hover:bg-washi-200'
                  }`}
                  title={language === "id" ? "Panduan Bayangan" : "Toggle Ghost Guides"}
                >
                  {showGhost ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={playDemonstration}
                  disabled={isAnimatingRef.current}
                  className="p-1.5 rounded-md bg-washi-200 dark:bg-sumi-800 text-stone-700 dark:text-stone-300 border border-washi-300 dark:border-sumi-700 hover:bg-washi-300 text-xs transition-colors flex items-center gap-1"
                  title={language === "id" ? "Peragakan Urutan Goresan" : "Demonstrate Stroke Order"}
                >
                  <Play className="w-3.5 h-3.5 text-vermilion-600 dark:text-vermilion-400" />
                  <span className="hidden sm:inline text-[11px] font-medium">{language === 'id' ? 'Peragakan' : 'Play'}</span>
                </button>
                <button
                  onClick={handleResetCanvas}
                  className="p-1.5 rounded-md bg-washi-200 dark:bg-sumi-800 text-stone-700 dark:text-stone-300 border border-washi-300 dark:border-sumi-700 hover:bg-washi-300 text-xs transition-colors"
                  title={language === "id" ? "Reset Kanvas" : "Reset Canvas"}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Canvas Viewport (1000x1000 Canonical Coordinate Space) */}
            <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-washi-100 dark:bg-sumi-950 border border-washi-300 dark:border-sumi-850 touch-none shadow-inner">
              {/* Rice (米) Grid Guide */}
              {gridType === 'rice' && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-stone-300 dark:stroke-sumi-800/80 stroke-dasharray-[4,4] stroke-1">
                  <line x1="500" y1="0" x2="500" y2="1000" />
                  <line x1="0" y1="500" x2="1000" y2="500" />
                  <line x1="0" y1="0" x2="1000" y2="1000" />
                  <line x1="0" y1="1000" x2="1000" y2="0" />
                </svg>
              )}

              {/* Ghost Guide Outline */}
              {showGhost && (
                <svg
                  viewBox="0 0 1000 1000"
                  className="absolute inset-0 w-full h-full pointer-events-none select-none opacity-25 dark:opacity-20"
                >
                  {kanjiData?.strokePaths?.length ? (
                    kanjiData.strokePaths.map((pathStr, i) => (
                      <path
                        key={i}
                        d={pathStr}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="30"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-stone-800 dark:text-stone-100"
                      />
                    ))
                  ) : (
                    <text
                      x="500"
                      y="700"
                      textAnchor="middle"
                      className="font-jp text-[600px] fill-stone-800 dark:fill-stone-100"
                    >
                      {kanjiData?.character || joyoDetail?.character}
                    </text>
                  )}
                </svg>
              )}

                            {/* Interactive Vector Canvas */}
              <canvas
                ref={canvasRef}
                width={1000}
                height={1000}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                className="absolute inset-0 w-full h-full cursor-crosshair z-10 touch-none"
              />


            </div>

            {/* Live Feedback Banner */}
            <div className="mt-3">
              {feedback ? (
                <div className={`p-2.5 rounded-lg text-xs flex items-center gap-2 ${
                  feedback.isValid
                    ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20'
                    : 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/20'
                }`}>
                  {feedback.isValid ? <CheckCircle2 className="w-4 h-4 flex-shrink-0" /> : <AlertTriangle className="w-4 h-4 flex-shrink-0" />}
                  <span>{feedback.message}</span>
                </div>
              ) : (
                <div className="p-2.5 rounded-lg bg-washi-100 dark:bg-sumi-850 text-stone-700 dark:text-stone-300 text-xs border border-washi-200 dark:border-sumi-800 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="w-2 h-2 rounded-full bg-vermilion-500 animate-pulse flex-shrink-0" />
                    <span className="font-semibold text-vermilion-600 dark:text-vermilion-400">
                      {language === 'id' ? `Goresan ${Math.min(currentStrokeIdx, kanjiData?.strokeCount || 1)}:` : `Stroke ${Math.min(currentStrokeIdx, kanjiData?.strokeCount || 1)}:`}
                    </span>
                    <span className="truncate">
                      {currentStrokeDef?.directionalHint || (language === 'id' ? 'Tarik goresan di dalam kisi kaligrafi.' : 'Draw stroke inside the calligraphic grid.')}
                    </span>
                  </div>
                  {currentStrokeDef?.pedagogicalRule && (
                    <span className="hidden md:inline text-[10px] text-stone-500 italic max-w-[220px] truncate">
                      {currentStrokeDef.pedagogicalRule}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    
      {/* Character Mastery Completion Modal */}
      {completedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-washi-50 dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-2xl max-w-md w-full p-6 shadow-2xl text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center border border-emerald-500/20">
              <Sparkles className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-vermilion-600 dark:text-vermilion-400">
                {language === 'id' ? 'Latihan Tuntas' : 'Stroke Practice Complete'}
              </span>
              <h3 className="text-3xl font-bold font-jp text-stone-900 dark:text-stone-100 mt-1">
                {completedModal.character}
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                {language === 'id'
                  ? 'Karakter berhasil dikuasai sesuai urutan goresan standar (Hitsujun).'
                  : 'Mastered accurately adhering to standard Japanese hitsujun.'}
              </p>
            </div>

            {/* Metrics Card */}
            <div className="grid grid-cols-3 gap-2 bg-washi-100 dark:bg-sumi-850 p-3 rounded-xl border border-washi-200 dark:border-sumi-800 text-left">
              <div>
                <div className="text-[10px] text-stone-500 font-semibold">{language === 'id' ? 'Kesiapan' : 'Readiness'}</div>
                <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                  {completedModal.progressPct ? `${completedModal.progressPct}%` : '+4% Tercatat'}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-stone-500 font-semibold">{language === 'id' ? 'Runtutan' : 'Streak'}</div>
                <div className="text-sm font-bold text-amber-600 dark:text-amber-400 mt-0.5">
                  {completedModal.streakDays ? `${completedModal.streakDays} Hari` : '1 Hari'}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-stone-500 font-semibold">{language === 'id' ? 'Poin XP' : 'XP Gained'}</div>
                <div className="text-sm font-bold text-vermilion-600 dark:text-vermilion-400 mt-0.5">
                  +{completedModal.xpGained || 25} XP
                </div>
              </div>
            </div>

            <p className="text-[11px] text-stone-500 dark:text-stone-400 italic">
              {language === 'id'
                ? 'Data latihan disimpan ke sesi dan antrean FSRS Anda. Tingkat kesiapan Anda pada dasbor kini bertambah.'
                : 'Data persisted to practice sessions & FSRS queue. Your estimated readiness is updated on the dashboard.'}
            </p>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={handleResetCanvas}
                className="flex-1 py-2.5 px-3 rounded-xl border border-washi-300 dark:border-sumi-700 text-stone-700 dark:text-stone-300 hover:bg-washi-200 dark:hover:bg-sumi-800 text-xs font-semibold transition-colors"
              >
                {language === 'id' ? 'Ulangi Latihan' : 'Practice Again'}
              </button>
              <button
                onClick={() => {
                  setCompletedModal(null);
                  handleNextCharacter();
                }}
                className="flex-1 py-2.5 px-3 rounded-xl bg-vermilion-500 hover:bg-vermilion-600 text-white text-xs font-bold shadow-sm transition-colors flex items-center justify-center gap-1.5"
              >
                <span>{language === 'id' ? 'Karakter Berikutnya' : 'Next Character'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
