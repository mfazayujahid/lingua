import React from 'react';
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
  Globe,
  ArrowLeftRight
} from 'lucide-react';

interface NavbarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  activeTrack: LevelCode;
  onTrackChange: (track: LevelCode) => void;
  srsDueCount: number;
  streakDays: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  activeTrack,
  onTrackChange,
  srsDueCount,
  streakDays
}) => {
  const { theme, toggleTheme } = useTheme();
  const { furiganaEnabled, toggleFurigana } = useFurigana();
  const { language, toggleLanguage, t } = useLanguage();

  const isJapaneseTrack = activeTrack.startsWith('jlpt_') || activeTrack.startsWith('ja_');

  // Toggle between Japanese and English tracks with 1 single button
  const handleToggleTrackLanguage = () => {
    if (isJapaneseTrack) {
      onTrackChange('ielts_academic');
      if (activeView === 'kanji') setActiveView('dashboard');
    } else {
      onTrackChange('jlpt_n5');
    }
  };

  // Nav items strictly split for Japanese vs English IELTS
  const navItems = isJapaneseTrack
    ? [
        { id: 'dashboard', label: t('nav.dashboard'), shortLabel: t('nav.short.dashboard'), icon: BookOpen },
        { id: 'lecture', label: t('nav.lecture'), shortLabel: t('nav.short.lecture'), icon: GraduationCap },
        { id: 'curriculum', label: t('nav.curriculum'), shortLabel: t('nav.short.curriculum'), icon: Layers },
        { id: 'kanji', label: t('nav.kanji'), shortLabel: t('nav.short.kanji'), icon: Feather },
        { id: 'srs', label: t('nav.srs'), shortLabel: t('nav.short.srs'), icon: CheckCircle2, badge: srsDueCount },
        { id: 'studio', label: t('nav.studio'), shortLabel: t('nav.short.studio'), icon: PenTool },
        { id: 'exam', label: t('nav.exam'), shortLabel: t('nav.short.exam'), icon: Clock },
        { id: 'analytics', label: t('nav.analytics'), shortLabel: t('nav.short.analytics'), icon: BarChart3 }
      ]
    : [
        { id: 'dashboard', label: t('nav.dashboard'), shortLabel: t('nav.short.dashboard'), icon: BookOpen },
        { id: 'lecture', label: t('nav.lecture'), shortLabel: t('nav.short.lecture'), icon: GraduationCap },
        { id: 'curriculum', label: t('nav.curriculum'), shortLabel: t('nav.short.curriculum'), icon: Layers },
        { id: 'studio', label: t('nav.ielts_studio'), shortLabel: t('nav.ielts_studio'), icon: PenTool },
        { id: 'srs', label: t('nav.ielts_vocab'), shortLabel: t('nav.short.srs'), icon: CheckCircle2, badge: srsDueCount },
        { id: 'exam', label: t('nav.ielts_exam'), shortLabel: t('nav.short.exam'), icon: Clock },
        { id: 'analytics', label: t('nav.ielts_analytics'), shortLabel: t('nav.short.analytics'), icon: BarChart3 }
      ];

  return (
    <>
      {/* Top Header Bar */}
      <header className="bg-washi-50 dark:bg-sumi-900 border-b border-washi-300 dark:border-sumi-800 sticky top-0 z-50 transition-colors duration-200 overflow-x-clip">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-1 sm:gap-4">
            
            {/* Logo & Brand with Active Mode Indicator */}
            <div
              className="flex items-center space-x-1.5 sm:space-x-2.5 cursor-pointer shrink-0 min-w-0"
              onClick={() => setActiveView('dashboard')}
            >
              <div className={`w-7 h-7 sm:w-9 sm:h-9 rounded-lg ${isJapaneseTrack ? 'bg-vermilion-500' : 'bg-indigo-600'} text-white flex items-center justify-center font-bold text-xs sm:text-base shadow-sm shrink-0`}>
                {isJapaneseTrack ? '文' : 'EN'}
              </div>
              <div className="truncate">
                <span className="text-xs sm:text-base font-semibold tracking-tight text-stone-900 dark:text-stone-100 flex items-center gap-0.5 sm:gap-1">
                  Lingua<span className={isJapaneseTrack ? 'text-vermilion-500 font-bold' : 'text-indigo-600 dark:text-indigo-400 font-bold'}>Mastery</span>
                </span>
                <span className="text-[10px] text-stone-500 dark:text-stone-400 block -mt-1 font-mono hidden sm:block">
                  {isJapaneseTrack ? 'Jalur Bahasa Jepang (JLPT N5–N1)' : 'English Track (IELTS Band 1–9)'}
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    data-view={item.id}
                    onClick={() => setActiveView(item.id)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 relative ${
                      isActive
                        ? isJapaneseTrack
                          ? 'bg-vermilion-500/10 text-vermilion-600 dark:text-vermilion-500 border border-vermilion-500/20 font-semibold'
                          : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 font-semibold'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-washi-200 dark:hover:bg-sumi-800'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                    {item.badge && item.badge > 0 ? (
                      <span className={`ml-1 px-1.5 py-0.2 rounded-full ${isJapaneseTrack ? 'bg-vermilion-500' : 'bg-indigo-600'} text-white text-[10px] font-bold`}>
                        {item.badge}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </nav>

            {/* Right Action Bar */}
            <div className="flex items-center space-x-1 sm:space-x-2 shrink-0">
              
              {/* PRIMARY SINGLE TOGGLE: Switch between Japanese (JLPT) and English (IELTS) */}
              <div className="flex items-center bg-stone-100 dark:bg-sumi-800 p-0.5 rounded-lg border border-washi-300 dark:border-sumi-700 shadow-inner">
                <button
                  onClick={handleToggleTrackLanguage}
                  className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-bold transition-all shadow-sm ${
                    isJapaneseTrack
                      ? 'bg-vermilion-500 text-white shadow-vermilion-500/20'
                      : 'bg-indigo-600 text-white shadow-indigo-600/20'
                  }`}
                  title={isJapaneseTrack ? t('topbar.switch_to_en') : t('topbar.switch_to_jp')}
                  aria-label="Toggle Learning Program between Japanese and English"
                >
                  <span className="text-sm leading-none">{isJapaneseTrack ? '🇯🇵' : '🇬🇧'}</span>
                  <span className="hidden xs:inline">
                    {isJapaneseTrack ? (language === 'id' ? 'Jepang' : 'Japanese') : (language === 'id' ? 'Inggris' : 'English')}
                  </span>
                  <ArrowLeftRight className="w-3 h-3 ml-0.5 opacity-80" />
                </button>

                {/* Sub-level / Sub-track selector */}
                {isJapaneseTrack ? (
                  <select
                    value={activeTrack}
                    onChange={(e) => onTrackChange(e.target.value as LevelCode)}
                    className="bg-transparent text-stone-800 dark:text-stone-200 text-[11px] sm:text-xs font-semibold px-1.5 py-0.5 rounded focus:outline-none cursor-pointer"
                    aria-label="Pilih Tingkat JLPT"
                  >
                    <option value="jlpt_n5" className="bg-white dark:bg-sumi-850 text-stone-900 dark:text-stone-100">N5 (Dasar)</option>
                    <option value="jlpt_n4" className="bg-white dark:bg-sumi-850 text-stone-900 dark:text-stone-100">N4 (Pemula)</option>
                    <option value="jlpt_n3" className="bg-white dark:bg-sumi-850 text-stone-900 dark:text-stone-100">N3 (Menengah)</option>
                    <option value="jlpt_n2" className="bg-white dark:bg-sumi-850 text-stone-900 dark:text-stone-100">N2 (Lanjutan)</option>
                    <option value="jlpt_n1" className="bg-white dark:bg-sumi-850 text-stone-900 dark:text-stone-100">N1 (Mahir)</option>
                  </select>
                ) : (
                  <select
                    value={activeTrack}
                    onChange={(e) => onTrackChange(e.target.value as LevelCode)}
                    className="bg-transparent text-stone-800 dark:text-stone-200 text-[11px] sm:text-xs font-semibold px-1.5 py-0.5 rounded focus:outline-none cursor-pointer"
                    aria-label="Pilih Jalur IELTS"
                  >
                    <option value="ielts_academic" className="bg-white dark:bg-sumi-850 text-stone-900 dark:text-stone-100">Academic</option>
                    <option value="ielts_general" className="bg-white dark:bg-sumi-850 text-stone-900 dark:text-stone-100">General</option>
                  </select>
                )}
              </div>

              {/* Global Furigana Toggle - ONLY DISPLAYED FOR JAPANESE */}
              {isJapaneseTrack && (
                <button
                  onClick={toggleFurigana}
                  className={`flex items-center gap-1 px-1.5 sm:px-2 py-1 rounded-lg text-[11px] sm:text-xs font-semibold border transition-all shrink-0 ${
                    furiganaEnabled
                      ? 'bg-vermilion-500/10 border-vermilion-500 text-vermilion-600 dark:text-vermilion-400 shadow-sm'
                      : 'bg-washi-100 dark:bg-sumi-800 border-washi-300 dark:border-sumi-700 text-stone-600 dark:text-stone-400 hover:border-stone-400'
                  }`}
                  title={t('topbar.furigana_tooltip')}
                >
                  <Languages className="w-3.5 h-3.5 text-vermilion-500 shrink-0" />
                  <span className="hidden sm:inline font-jp text-[11px]">ふりがな</span>
                  <span className={`px-1 py-0.2 rounded text-[9px] font-bold ${
                    furiganaEnabled ? 'bg-vermilion-500 text-white' : 'bg-stone-300 dark:bg-stone-700 text-stone-600 dark:text-stone-300'
                  }`}>
                    {furiganaEnabled ? (language === 'id' ? 'AKTIF' : 'ON') : 'OFF'}
                  </span>
                </button>
              )}

              {/* UI Instruction Language Toggle (ID / EN) */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1 px-1.5 sm:px-2 py-1 rounded-lg text-[11px] sm:text-xs font-bold border border-washi-300 dark:border-sumi-700 bg-washi-100 dark:bg-sumi-800 text-stone-700 dark:text-stone-300 hover:border-vermilion-500 transition-all shrink-0"
                title={t('topbar.lang_tooltip')}
                aria-label="Toggle Instruction Language"
              >
                <Globe className="w-3.5 h-3.5 text-vermilion-500" />
                <span className="font-mono">{language === 'id' ? 'ID' : 'EN'}</span>
              </button>

              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-1 sm:p-1.5 rounded-lg border border-washi-300 dark:border-sumi-800 text-stone-600 dark:text-stone-300 hover:bg-washi-200 dark:hover:bg-sumi-800 transition-colors shrink-0"
                title={theme === 'light' ? t('topbar.theme_tooltip_dark') : t('topbar.theme_tooltip_light')}
              >
                {theme === 'light' ? <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />}
              </button>

              {/* Streak Counter */}
              <div className="hidden xs:flex items-center gap-1 px-1.5 sm:px-2 py-1 rounded-md bg-stone-100 dark:bg-sumi-800 border border-stone-200 dark:border-sumi-700 text-stone-700 dark:text-stone-300 text-[11px] sm:text-xs font-medium shrink-0">
                <Flame className={`w-3.5 h-3.5 ${streakDays > 0 ? (isJapaneseTrack ? 'text-vermilion-500 fill-vermilion-500' : 'text-indigo-500 fill-indigo-500') : 'text-stone-400'}`} />
                <span>{streakDays}{t('topbar.streak_suffix')}</span>
              </div>

            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar (Split and Screen-Fitting) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-washi-50/95 dark:bg-sumi-900/95 backdrop-blur-md border-t border-washi-300 dark:border-sumi-800 px-0.5 py-1 flex items-center justify-around shadow-lg safe-bottom">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              data-view={item.id}
              onClick={() => setActiveView(item.id)}
              className={`flex flex-col items-center justify-center flex-1 min-w-0 py-0.5 px-0.5 rounded-lg transition-colors relative ${
                isActive
                  ? isJapaneseTrack
                    ? 'text-vermilion-600 dark:text-vermilion-500 font-semibold'
                    : 'text-indigo-600 dark:text-indigo-400 font-semibold'
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
              <span className="text-[9px] mt-0.5 tracking-tight truncate max-w-[52px] text-center">
                {item.shortLabel || item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
