import React, { useState, useRef, useEffect } from 'react';
import { LevelCode } from '../../../shared/types';
import { useTheme } from '../context/ThemeContext';
import { useFurigana } from '../context/FuriganaContext';
import { useLanguage } from '../context/LanguageContext';
import {
  Flame,
  GraduationCap,
  BookOpen,
  Layers,
  Clock,
  PenTool,
  BarChart3,
  Feather,
  CheckCircle2,
  Sun,
  Moon,
  Languages,
  ArrowLeftRight,
  Mic,
  Headphones,
  Scale,
  ChevronDown,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  activeTrack: LevelCode;
  onTrackChange: (track: LevelCode) => void;
  srsDueCount: number;
  streakDays: number;
  onOpenDisclaimer?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  activeTrack,
  onTrackChange,
  srsDueCount,
  streakDays,
  onOpenDisclaimer
}) => {
  const { theme, toggleTheme } = useTheme();
  const { furiganaEnabled, toggleFurigana } = useFurigana();
  const { language, toggleLanguage, t } = useLanguage();
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isJapaneseTrack = activeTrack.startsWith('jlpt_') || activeTrack.startsWith('ja_');

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMoreMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Toggle between Japanese and English tracks
  const handleToggleTrackLanguage = () => {
    if (isJapaneseTrack) {
      onTrackChange('ielts_academic');
      if (activeView === 'kanji') setActiveView('dashboard');
    } else {
      onTrackChange('jlpt_n5');
    }
  };

  // Primary links visible directly in the desktop top header
  const primaryNavItems = [
    { id: 'dashboard', label: t('nav.dashboard'), icon: BookOpen },
    { id: 'curriculum', label: t('nav.curriculum'), icon: Layers },
    { id: 'exam', label: language === 'id' ? 'Simulasi' : 'Mock Exam', icon: Clock },
    { id: 'srs', label: 'SRS', icon: CheckCircle2, badge: srsDueCount }
  ];

  // Secondary practice studio links grouped in "Studios" dropdown on desktop
  const studioItems = isJapaneseTrack
    ? [
        { id: 'lecture', label: t('nav.lecture'), icon: GraduationCap, desc: language === 'id' ? 'Materi Pelajaran' : 'Grammar Lessons' },
        { id: 'kanji', label: t('nav.kanji'), icon: Feather, desc: language === 'id' ? 'Studio Tulis Kanji & Kana' : 'Kana & Kanji Canvas' },
        { id: 'studio', label: t('nav.studio'), icon: PenTool, desc: language === 'id' ? 'Studio Menulis Komposisi' : 'Writing Studio' },
        { id: 'analytics', label: t('nav.analytics'), icon: BarChart3, desc: language === 'id' ? 'Analitik Kemampuan' : 'Readiness Analytics' }
      ]
    : [
        { id: 'listening', label: t('nav.ielts_listening'), icon: Headphones, desc: language === 'id' ? 'Studio Menyimak CD-IELTS' : 'IELTS Listening Studio' },
        { id: 'speaking', label: t('nav.ielts_speaking'), icon: Mic, desc: language === 'id' ? 'Wawancara Speaking AI' : 'IELTS Speaking Studio' },
        { id: 'studio', label: t('nav.ielts_studio'), icon: PenTool, desc: language === 'id' ? 'Studio Esai Task 1 & 2' : 'Academic Writing Studio' },
        { id: 'lecture', label: t('nav.lecture'), icon: GraduationCap, desc: language === 'id' ? 'Modul Pelajaran' : 'Study Modules' },
        { id: 'analytics', label: t('nav.ielts_analytics'), icon: BarChart3, desc: language === 'id' ? 'Analisis Band Score' : 'Band Diagnostics' }
      ];

  // Full item list for mobile bottom bar
  const mobileNavItems = isJapaneseTrack
    ? [
        { id: 'dashboard', label: t('nav.dashboard'), shortLabel: t('nav.short.dashboard'), icon: BookOpen },
        { id: 'curriculum', label: t('nav.curriculum'), shortLabel: t('nav.short.curriculum'), icon: Layers },
        { id: 'kanji', label: t('nav.kanji'), shortLabel: t('nav.short.kanji'), icon: Feather },
        { id: 'srs', label: t('nav.srs'), shortLabel: t('nav.short.srs'), icon: CheckCircle2, badge: srsDueCount },
        { id: 'exam', label: t('nav.exam'), shortLabel: t('nav.short.exam'), icon: Clock },
        { id: 'analytics', label: t('nav.analytics'), shortLabel: t('nav.short.analytics'), icon: BarChart3 }
      ]
    : [
        { id: 'dashboard', label: t('nav.dashboard'), shortLabel: t('nav.short.dashboard'), icon: BookOpen },
        { id: 'curriculum', label: t('nav.curriculum'), shortLabel: t('nav.short.curriculum'), icon: Layers },
        { id: 'listening', label: t('nav.ielts_listening'), shortLabel: t('nav.short.listening'), icon: Headphones },
        { id: 'speaking', label: t('nav.ielts_speaking'), shortLabel: t('nav.short.speaking'), icon: Mic },
        { id: 'studio', label: t('nav.ielts_studio'), shortLabel: t('nav.short.studio'), icon: PenTool },
        { id: 'exam', label: t('nav.ielts_exam'), shortLabel: t('nav.short.exam'), icon: Clock }
      ];

  const isStudioActive = studioItems.some(item => item.id === activeView);

  return (
    <>
      {/* Top Header Bar - Strictly Contained for 360px+ Mobile Viewports */}
      <header className="bg-washi-50 dark:bg-sumi-900 border-b border-washi-300 dark:border-sumi-800 sticky top-0 z-50 transition-colors duration-200 w-full max-w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-1.5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-1 sm:gap-3">
            
            {/* Left: Brand Identity */}
            <div
              className="flex items-center space-x-1 sm:space-x-2 cursor-pointer shrink-0 min-w-0"
              onClick={() => setActiveView('dashboard')}
            >
              <div className={`w-7 h-7 sm:w-9 sm:h-9 rounded-xl ${isJapaneseTrack ? 'bg-vermilion-500' : 'bg-indigo-600'} text-white flex items-center justify-center font-bold text-xs sm:text-base shadow-sm shrink-0`}>
                {isJapaneseTrack ? '文' : 'EN'}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs sm:text-base font-bold tracking-tight text-stone-900 dark:text-stone-100 flex items-center gap-0.5 truncate">
                  Lingua<span className={isJapaneseTrack ? 'text-vermilion-500 font-extrabold' : 'text-indigo-600 dark:text-indigo-400 font-extrabold'}>Mastery</span>
                </span>
                <span className="text-[10px] text-stone-400 font-medium hidden md:block -mt-1">
                  {isJapaneseTrack ? 'JLPT Prep Hub' : 'IELTS Prep Hub'}
                </span>
              </div>
            </div>

            {/* Center: Streamlined Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1.5">
              {primaryNavItems.map(item => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveView(item.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 relative ${
                      isActive
                        ? isJapaneseTrack
                          ? 'bg-vermilion-500/10 text-vermilion-600 dark:text-vermilion-400 border border-vermilion-500/30 shadow-xs'
                          : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 shadow-xs'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-washi-200 dark:hover:bg-sumi-800'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                    {item.badge && item.badge > 0 ? (
                      <span className={`ml-0.5 px-1.5 py-0.2 rounded-full ${isJapaneseTrack ? 'bg-vermilion-500' : 'bg-indigo-600'} text-white text-[10px] font-bold`}>
                        {item.badge}
                      </span>
                    ) : null}
                  </button>
                );
              })}

              {/* Studios Dropdown Menu */}
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMoreMenuOpen(prev => !prev)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    isStudioActive
                      ? isJapaneseTrack
                        ? 'bg-vermilion-500/10 text-vermilion-600 dark:text-vermilion-400 border border-vermilion-500/30 shadow-xs'
                        : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 shadow-xs'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-washi-200 dark:hover:bg-sumi-800'
                  }`}
                  aria-expanded={moreMenuOpen}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>{language === 'id' ? 'Studio & Latihan' : 'More Practice'}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {moreMenuOpen && (
                  <div className="absolute left-0 mt-2 w-60 bg-washi-50 dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-2xl shadow-xl p-2 z-50 animate-fadeIn">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400 px-2.5 py-1">
                      {language === 'id' ? 'Modul Spesialis' : 'Specialized Modules'}
                    </div>
                    {studioItems.map(item => {
                      const Icon = item.icon;
                      const isActive = activeView === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveView(item.id);
                            setMoreMenuOpen(false);
                          }}
                          className={`w-full text-left px-2.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors ${
                            isActive
                              ? isJapaneseTrack
                                ? 'bg-vermilion-500/10 text-vermilion-600 dark:text-vermilion-400'
                                : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                              : 'text-stone-700 dark:text-stone-300 hover:bg-washi-200 dark:hover:bg-sumi-800'
                          }`}
                        >
                          <div className={`p-1.5 rounded-lg ${isActive ? 'bg-vermilion-500 text-white' : 'bg-stone-100 dark:bg-sumi-800 text-stone-600 dark:text-stone-400'}`}>
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="font-bold">{item.label}</div>
                            <div className="text-[10px] text-stone-400 font-normal">{item.desc}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </nav>

            {/* Right: Consolidated Controls (Responsive & Mobile-Optimized) */}
            <div className="flex items-center space-x-1 sm:space-x-2 shrink-0">
              
              {/* Program & Level Pill Selector */}
              <div className="flex items-center bg-stone-100 dark:bg-sumi-850 p-0.5 rounded-xl border border-washi-300 dark:border-sumi-700 shadow-inner">
                <button
                  onClick={handleToggleTrackLanguage}
                  className={`flex items-center gap-0.5 sm:gap-1 px-1 sm:px-2 py-0.5 sm:py-1 rounded-lg text-xs font-bold transition-all shadow-sm ${
                    isJapaneseTrack
                      ? 'bg-vermilion-500 text-white shadow-vermilion-500/20'
                      : 'bg-indigo-600 text-white shadow-indigo-600/20'
                  }`}
                  title={isJapaneseTrack ? t('topbar.switch_to_en') : t('topbar.switch_to_jp')}
                  aria-label="Toggle Learning Track"
                >
                  <span className="text-[11px] sm:text-xs leading-none">{isJapaneseTrack ? 'JP' : 'EN'}</span>
                  <ArrowLeftRight className="w-2.5 h-2.5 opacity-80" />
                </button>

                <select
                  value={activeTrack}
                  onChange={(e) => onTrackChange(e.target.value as LevelCode)}
                  className="bg-transparent text-stone-800 dark:text-stone-200 text-xs font-semibold px-0.5 sm:px-2 py-0.5 sm:py-1 rounded-lg focus:outline-none cursor-pointer max-w-[50px] sm:max-w-none"
                  aria-label="Select Target Level"
                >
                  <optgroup label="🇯🇵 JLPT (Japanese)">
                    <option value="jlpt_n5" className="bg-white dark:bg-sumi-850 text-stone-900 dark:text-stone-100">N5</option>
                    <option value="jlpt_n4" className="bg-white dark:bg-sumi-850 text-stone-900 dark:text-stone-100">N4</option>
                    <option value="jlpt_n3" className="bg-white dark:bg-sumi-850 text-stone-900 dark:text-stone-100">N3</option>
                    <option value="jlpt_n2" className="bg-white dark:bg-sumi-850 text-stone-900 dark:text-stone-100">N2</option>
                    <option value="jlpt_n1" className="bg-white dark:bg-sumi-850 text-stone-900 dark:text-stone-100">N1</option>
                  </optgroup>
                  <optgroup label="🇬🇧 IELTS (English)">
                    <option value="ielts_academic" className="bg-white dark:bg-sumi-850 text-stone-900 dark:text-stone-100">Academic</option>
                    <option value="ielts_general" className="bg-white dark:bg-sumi-850 text-stone-900 dark:text-stone-100">General</option>
                  </optgroup>
                </select>
              </div>

              {/* Japanese Furigana Toggle */}
              {isJapaneseTrack && (
                <button
                  onClick={toggleFurigana}
                  className={`flex items-center gap-0.5 sm:gap-1 px-1 sm:px-2 py-0.5 sm:py-1 rounded-xl text-xs font-semibold border transition-all ${
                    furiganaEnabled
                      ? 'bg-vermilion-500/10 border-vermilion-500 text-vermilion-600 dark:text-vermilion-400 shadow-xs'
                      : 'bg-washi-100 dark:bg-sumi-800 border-washi-300 dark:border-sumi-700 text-stone-500 hover:text-stone-800'
                  }`}
                  title={t('topbar.furigana_tooltip')}
                >
                  <Languages className="w-3.5 h-3.5 text-vermilion-500 shrink-0" />
                  <span className="hidden sm:inline font-jp text-[11px]">ふりがな</span>
                  <span className={`px-1 py-0.2 rounded text-[9px] font-bold ${
                    furiganaEnabled ? 'bg-vermilion-500 text-white' : 'bg-stone-300 dark:bg-stone-700 text-stone-600 dark:text-stone-300'
                  }`}>
                    {furiganaEnabled ? 'ON' : 'OFF'}
                  </span>
                </button>
              )}

              {/* Preferences Group: Language, Theme, & Legal in a clean pill */}
              <div className="flex items-center bg-stone-100 dark:bg-sumi-850 p-0.5 rounded-xl border border-washi-300 dark:border-sumi-700">
                {/* Language Toggle */}
                <button
                  onClick={toggleLanguage}
                  className="px-1 sm:px-2 py-0.5 sm:py-1 rounded-lg text-[11px] sm:text-xs font-bold text-stone-700 dark:text-stone-300 hover:text-vermilion-500 hover:bg-white dark:hover:bg-sumi-800 transition-all font-mono"
                  title={t('topbar.lang_tooltip')}
                  aria-label="Toggle Language"
                >
                  {language === 'id' ? 'ID' : 'EN'}
                </button>

                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="p-1 sm:p-1.5 rounded-lg text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-white dark:hover:bg-sumi-800 transition-colors"
                  title={theme === 'light' ? t('topbar.theme_tooltip_dark') : t('topbar.theme_tooltip_light')}
                  aria-label="Toggle Theme"
                >
                  {theme === 'light' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
                </button>

                {/* Legal Disclaimer Modal */}
                {onOpenDisclaimer && (
                  <button
                    onClick={onOpenDisclaimer}
                    className="p-1 sm:p-1.5 rounded-lg text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-white dark:hover:bg-sumi-800 transition-colors"
                    title={language === 'id' ? 'Penafian Hukum & Merek (Fair Use)' : 'Legal Disclaimer & Fair Use'}
                    aria-label="Legal Disclaimer"
                  >
                    <Scale className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Streak Badge (Desktop only) */}
              <div className="hidden xl:flex items-center gap-1 px-2 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300/60 dark:border-amber-800/40 text-amber-800 dark:text-amber-300 text-xs font-bold shrink-0">
                <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>{streakDays}d</span>
              </div>

            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-washi-50/95 dark:bg-sumi-900/95 backdrop-blur-md border-t border-washi-300 dark:border-sumi-800 px-1 py-1 flex items-center justify-around shadow-lg safe-bottom">
        {mobileNavItems.map(item => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`flex flex-col items-center justify-center flex-1 min-w-0 py-1 px-0.5 rounded-xl transition-colors relative ${
                isActive
                  ? isJapaneseTrack
                    ? 'text-vermilion-600 dark:text-vermilion-400 font-bold'
                    : 'text-indigo-600 dark:text-indigo-400 font-bold'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
                {item.badge && item.badge > 0 ? (
                  <span className={`absolute -top-1 -right-2 px-1 rounded-full ${isJapaneseTrack ? 'bg-vermilion-500' : 'bg-indigo-600'} text-white text-[8px] font-bold`}>
                    {item.badge}
                  </span>
                ) : null}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-[56px] text-center">
                {item.shortLabel || item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
