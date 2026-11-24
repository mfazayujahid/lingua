import React, { useState, useEffect } from 'react';
import { LevelCode } from '../../shared/types';
import { fetchDashboard, switchUserTrack } from './api';
import { ThemeProvider } from './context/ThemeContext';
import { FuriganaProvider } from './context/FuriganaContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { CurriculumView } from './components/CurriculumView';
import { SRSReviewerView } from './components/SRSReviewerView';
import { ExamRunnerView } from './components/ExamRunnerView';
import { StudioView } from './components/StudioView';
import { SpeakingStudioView } from './components/SpeakingStudioView';
import { ListeningStudioView } from './components/ListeningStudioView';
import { LectureView } from './components/LectureView';
import { KanjiCanvasView } from './components/KanjiCanvasView';
import { AnalyticsView } from './components/AnalyticsView';

export const AppContent: React.FC = () => {
  const { t } = useLanguage();
  const [activeView, setActiveView] = useState<string>('dashboard');
  const [activeTrack, setActiveTrack] = useState<LevelCode>(() => {
    try {
      const saved = localStorage.getItem('lingua_active_track');
      if (saved && (saved.startsWith('jlpt_') || saved.startsWith('ielts_'))) {
        return saved as LevelCode;
      }
    } catch (e) {}
    return 'jlpt_n5';
  });
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [srsDueCount, setSrsDueCount] = useState<number>(0);
  const [currentExamLessonId, setCurrentExamLessonId] = useState<string>("les_n5_gram_1");
  const [currentLectureLessonId, setCurrentLectureLessonId] = useState<string | undefined>();

  // Initial load
  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await fetchDashboard();
      setDashboardData(data);
      if (data?.user?.activeTrack) {
        setActiveTrack(data.user.activeTrack);
        const DEFAULT_EXAMS: Record<string, string> = {
          jlpt_n5: 'les_n5_gram_1',
          jlpt_n4: 'les_n4_gram_1',
          jlpt_n3: 'les_n3_gram_1',
          jlpt_n2: 'les_n2_gram_1',
          jlpt_n1: 'les_n1_gram_1',
          ielts_academic: 'les_ia_mock_full_1',
          ielts_general: 'les_ia_mock_full_1'
        };
        if (DEFAULT_EXAMS[data.user.activeTrack]) {
          setCurrentExamLessonId(DEFAULT_EXAMS[data.user.activeTrack]);
        }
      }
      setSrsDueCount(data?.srsDueCount || 0);
    } catch (err) {
      console.error('Failed to load dashboard data', err);
    }
  };

  const handleTrackChange = async (newTrack: LevelCode) => {
    if (newTrack.startsWith('ielts_') && activeView === 'kanji') {
      setActiveView('dashboard');
    }
    if (newTrack.startsWith('jlpt_') && (activeView === 'speaking' || activeView === 'listening')) {
      setActiveView('dashboard');
    }
    setActiveTrack(newTrack);
    try {
      localStorage.setItem('lingua_active_track', newTrack);
    } catch (e) {}

    const DEFAULT_EXAMS: Record<string, string> = {
      jlpt_n5: 'les_n5_gram_1',
      jlpt_n4: 'les_n4_gram_1',
      jlpt_n3: 'les_n3_gram_1',
      jlpt_n2: 'les_n2_gram_1',
      jlpt_n1: 'les_n1_gram_1',
      ielts_academic: 'les_ia_mock_full_1',
      ielts_general: 'les_ia_mock_full_1'
    };
    if (DEFAULT_EXAMS[newTrack]) {
      setCurrentExamLessonId(DEFAULT_EXAMS[newTrack]);
    }

    setDashboardData((prev: any) => ({
      ...(prev || {}),
      user: { ...(prev?.user || {}), activeTrack: newTrack }
    }));

    try {
      await switchUserTrack(newTrack);
      const data = await fetchDashboard();
      if (data) {
        setDashboardData(data);
        setSrsDueCount(data?.srsDueCount || 0);
      }
    } catch (err) {
      console.warn('Track switch remote sync notice:', err);
    }
  };

  const handleLaunchLesson = (lessonType: string, lessonId?: string, mode: 'lecture' | 'drill' = 'lecture') => {
    if (lessonId) {
      setCurrentExamLessonId(lessonId);
      setCurrentLectureLessonId(lessonId);
    }
    if (lessonType === 'kanji_writing') {
      setActiveView('kanji');
    } else if (lessonType === 'listening_task' || lessonType === 'listening') {
      setActiveView('listening');
    } else if (lessonType === 'speaking_task' || lessonType === 'speaking') {
      setActiveView('speaking');
    } else if (lessonType === 'writing_task') {
      setActiveView('studio');
    } else if (lessonType === 'flashcard_review' || lessonType === 'srs') {
      setActiveView('srs');
    } else if (mode === 'drill') {
      setActiveView('exam');
    } else {
      setActiveView('lecture');
    }
  };

  return (
    <div className="min-h-screen bg-washi-100 dark:bg-sumi-950 text-stone-900 dark:text-stone-100 flex flex-col selection:bg-vermilion-500 selection:text-white transition-colors duration-200">
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        activeTrack={activeTrack}
        onTrackChange={handleTrackChange}
        srsDueCount={srsDueCount}
        streakDays={dashboardData?.user?.streakDays || 0}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-8 pb-24 md:pb-8">
        {activeView === 'dashboard' && (
          <DashboardView
            data={dashboardData}
            activeTrack={activeTrack}
            onNavigate={setActiveView}
            onTrackChange={handleTrackChange}
          />
        )}

        {activeView === 'curriculum' && (
          <CurriculumView
            activeTrack={activeTrack}
            onLaunchLesson={handleLaunchLesson}
            onTrackChange={handleTrackChange}
          />
        )}

        {activeView === 'srs' && (
          <SRSReviewerView
            activeTrack={activeTrack}
            onSessionComplete={loadDashboard}
            onNavigate={setActiveView}
          />
        )}

        {activeView === 'lecture' && (
          <LectureView
            activeTrack={activeTrack}
            initialLessonId={currentLectureLessonId}
            onStartDrill={(lessonId) => {
              setCurrentExamLessonId(lessonId);
              setActiveView('exam');
            }}
            onNavigateToWriting={() => setActiveView('studio')}
            onNavigateToSRS={() => setActiveView('srs')}
          />
        )}

        {activeView === 'exam' && (
          <ExamRunnerView
            lessonId={currentExamLessonId}
            activeTrack={activeTrack}
            onNavigateBack={() => setActiveView('curriculum')}
            onSelectExam={(id) => setCurrentExamLessonId(id)}
          />
        )}

        {activeView === 'studio' && (
          <StudioView activeTrack={activeTrack} />
        )}

        {activeView === 'speaking' && (
          <SpeakingStudioView activeTrack={activeTrack} />
        )}

        {activeView === 'listening' && (
          <ListeningStudioView activeTrack={activeTrack} />
        )}

        {activeView === 'kanji' && (
          <KanjiCanvasView />
        )}

        {activeView === 'analytics' && (
          <AnalyticsView
            activeTrack={activeTrack}
            onPracticeWeakSpot={() => setActiveView('exam')}
            onNavigateToExam={(packageId) => {
              if (packageId) setCurrentExamLessonId(packageId);
              setActiveView('exam');
            }}
          />
        )}
      </main>

      {/* Footer (Visible & Non-Occluded across Mobile and Desktop) */}
      <footer className="border-t border-washi-300 dark:border-sumi-850 bg-washi-50 dark:bg-sumi-900 py-6 pb-24 lg:pb-6 text-center text-xs text-stone-500 transition-colors">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-jp text-vermilion-500 font-bold">文</span>
            <span>{t('footer.brand_desc')}</span>
          </div>
          <div className="flex gap-3 text-stone-400">
            <span>{t('footer.theme_label')}</span>
            <span>•</span>
            <span>{t('footer.zero_synthetic')}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <FuriganaProvider>
          <AppContent />
        </FuriganaProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
