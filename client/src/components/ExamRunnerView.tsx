import React, { useState, useEffect, useRef } from 'react';
import {
  fetchLesson,
  startSession,
  submitSession,
  fetchExamPackages,
  fetchExamPackageById,
  submitExamAttempt,
  DEFAULT_EXAM_PACKAGES
} from '../api';
import { LevelCode, MasterExamPackageSummary } from '../../../shared/types';
import { generateIeltsAcademicPackItems, generateJlptN5PackItems } from '../data/multiMockExamPacks';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  BookOpen,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Layers,
  ChevronRight,
  ChevronLeft,
  Flag,
  ShieldAlert,
  ZoomIn,
  ZoomOut,
  AlertTriangle,
  X,
  Check,
  Award
} from 'lucide-react';
import { useFurigana } from '../context/FuriganaContext';
import { useLanguage } from '../context/LanguageContext';

interface ExamRunnerViewProps {
  lessonId?: string;
  activeTrack?: LevelCode;
  onNavigateBack?: () => void;
  onSelectExam?: (lessonId: string) => void;
}

interface ExamPresetItem {
  id: string;
  titleEn: string;
  titleId: string;
  subEn: string;
  subId: string;
  estMin: number;
  itemsCount: number;
}

const BILINGUAL_EXAM_PRESETS: Record<string, ExamPresetItem[]> = {
  jlpt_n5: [
    {
      id: 'les_n5_gram_1',
      titleEn: 'N5 Star Exam: Essential Grammar Particles & Predicates',
      titleId: 'Ujian Bintang N5: Partikel Tata Bahasa & Predikat Inti',
      subEn: 'Syntax reordering drills with ★ position mastery',
      subId: 'Latihan susunan kalimat sintaksis dengan penguasaan posisi bintang ★',
      estMin: 20,
      itemsCount: 1
    },
    {
      id: 'les_n5_read_1',
      titleEn: 'N5 Star Exam: Short Notices & Timetable Information',
      titleId: 'Ujian Bintang N5: Pengumuman Pendek & Informasi Jadwal',
      subEn: 'Real-world information retrieval and comprehension',
      subId: 'Pengambilan informasi dunia nyata dan pemahaman bacaan praktis',
      estMin: 20,
      itemsCount: 1
    }
  ],
  jlpt_n4: [
    {
      id: 'les_n4_gram_1',
      titleEn: 'N4 Star Exam: Complex Clause Connectors & Modality',
      titleId: 'Ujian Bintang N4: Penghubung Klausa Majemuk & Modalitas',
      subEn: 'Conditionals (〜たら, 〜ば), giving/receiving directionality',
      subId: 'Bentuk pengandaian (〜たら, 〜ば) dan arah ungkapan memberi/menerima',
      estMin: 25,
      itemsCount: 1
    },
    {
      id: 'les_n4_read_1',
      titleEn: 'N4 Star Exam: Daily Practical & Workplace Reading',
      titleId: 'Ujian Bintang N4: Bacaan Praktis Sehari-hari & Dunia Kerja',
      subEn: 'Waste sorting protocols, medical clinic schedules, and circulars',
      subId: 'Protokol pemilahan sampah, jadwal klinik dokter, dan surat edaran',
      estMin: 25,
      itemsCount: 1
    }
  ],
  jlpt_n3: [
    {
      id: 'les_n3_gram_1',
      titleEn: 'N3 Star Exam: Nuanced Discourse & Contrastive Patterns',
      titleId: 'Ujian Bintang N3: Wacana Bernuansa & Pola Kontras',
      subEn: 'Nuanced grammar contrasts (〜に対して vs 〜反面)',
      subId: 'Perbandingan tata bahasa bernuansa (〜に対して vs 〜反面)',
      estMin: 30,
      itemsCount: 1
    },
    {
      id: 'les_n3_exam_star',
      titleEn: 'N3 Star Exam: Sentence Synthesis & Clause Structuring',
      titleId: 'Ujian Bintang N3: Sintesis Kalimat & Struktur Klausa',
      subEn: 'Formal written expressions and cohesive sentence ordering',
      subId: 'Ungkapan ragam tulis formal dan susunan kalimat kohesif',
      estMin: 30,
      itemsCount: 1
    }
  ],
  jlpt_n2: [
    {
      id: 'les_n2_exam_star',
      titleEn: 'N2 Star Exam: Advanced Argumentative Syntax',
      titleId: 'Ujian Bintang N2: Sintaksis Argumentatif Tingkat Lanjut',
      subEn: 'Advanced modality, structural coherence, and editorial expressions',
      subId: 'Modalitas tingkat lanjut, koherensi struktural, dan ungkapan tajuk rencana',
      estMin: 35,
      itemsCount: 1
    }
  ],
  jlpt_n1: [
    {
      id: 'les_n1_exam_star',
      titleEn: 'N1 Star Exam: Supreme Literary & Syntactic Reordering',
      titleId: 'Ujian Bintang N1: Rekonstruksi Kalimat Sastra & Sintaksis Puncak',
      subEn: 'Highest level JLPT syntax puzzles demanding complete structural mastery',
      subId: 'Teka-teki sintaksis JLPT tingkat tertinggi yang menuntut penguasaan struktural mutlak',
      estMin: 40,
      itemsCount: 1
    }
  ],
  ielts_academic: [
    {
      id: 'les_ia_mock_full_1',
      titleEn: 'Official Computer-Delivered IELTS Academic Practice Exam (Full 40 Questions)',
      titleId: 'Ujian Resmi Computer-Delivered IELTS Akademik (Simulasi Lengkap 40 Soal)',
      subEn: 'Full 40 Questions • 3 Academic Reading Passages • Strict 60-Minute Countdown',
      subId: '40 Soal Penuh • 3 Teks Akademik • Timer 60 Menit Ketat & Mode Pengawasan',
      estMin: 60,
      itemsCount: 40
    },
    {
      id: 'les_ia_read_1',
      titleEn: 'Section 1 Reading Drill: Cognitive Architecture of Bilingualism',
      titleId: 'Latihan Membaca Bagian 1: Arsitektur Kognitif Kedwibahasaan',
      subEn: 'Matching Headings, True/False/Not Given, and Sentence Completion',
      subId: 'Mencocokkan Judul Bagian, Benar/Salah/Tidak Disebutkan, dan Melengkapi Kalimat',
      estMin: 20,
      itemsCount: 13
    },
    {
      id: 'les_ia_read_2',
      titleEn: 'Section 2 Reading Drill: Passive Cooling & Urban Microclimates',
      titleId: 'Latihan Membaca Bagian 2: Pendinginan Pasif & Iklim Mikro Perkotaan',
      subEn: 'Multiple Choice, True/False/Not Given, and Environmental Engineering',
      subId: 'Pilihan Ganda, Benar/Salah/Tidak Disebutkan, dan Rekayasa Lingkungan',
      estMin: 20,
      itemsCount: 13
    },
    {
      id: 'les_ia_read_3',
      titleEn: 'Section 3 Reading Drill: Epistemology & Archaeological Stratigraphy',
      titleId: 'Latihan Membaca Bagian 3: Epistemologi & Stratigrafi Arkeologi',
      subEn: 'Harris Matrix paradigms, taphonomic disruption, and chronological dating',
      subId: 'Paradigma Matriks Harris, gangguan tafonomik, dan penanggalan kronologis',
      estMin: 20,
      itemsCount: 14
    }
  ],
  ielts_general: [
    {
      id: 'les_ia_mock_full_1',
      titleEn: 'Official Computer-Delivered IELTS General Practice Exam (Full 40 Questions)',
      titleId: 'Ujian Resmi Computer-Delivered IELTS General (Simulasi Lengkap 40 Soal)',
      subEn: 'Full 40 Questions • 3 Sections • Strict 60-Minute Timed Simulation',
      subId: '40 Soal Penuh • 3 Bagian Teks • Timer 60 Menit Ketat & Mode Pengawasan',
      estMin: 60,
      itemsCount: 40
    },
    {
      id: 'les_ig_read_1',
      titleEn: 'Section 1 Reading: Ergonomics Protocol & Tenant Notices',
      titleId: 'Membaca Bagian 1: Protokol Ergonomi & Pemberitahuan Penyewa Gedung',
      subEn: 'Occupational health standards and 24/7 HVAC heating emergency protocols',
      subId: 'Standar keselamatan kerja DSE dan protokol darurat pemanas gedung 24 jam',
      estMin: 20,
      itemsCount: 2
    },
    {
      id: 'les_ig_read_2',
      titleEn: 'Section 2 Reading: Statutory Parental Leave & HR Disputes',
      titleId: 'Membaca Bagian 2: Cuti Orang Tua Resmi & Prosedur Pengaduan HR',
      subEn: 'Statutory leave entitlements, advance notice rules, and formal grievance steps',
      subId: 'Hak cuti orang tua resmi, aturan pemberitahuan awal, dan tahap pengaduan resmi',
      estMin: 20,
      itemsCount: 2
    }
  ]
};

function localizeExamTitle(title: string, lang: string): string {
  if (lang !== 'id') return title;
  return title
    .replace(/Section 1 Reading:s*/i, 'Membaca Bagian 1: ')
    .replace(/Section 2 Reading:s*/i, 'Membaca Bagian 2: ')
    .replace(/Section 3 Reading:s*/i, 'Membaca Bagian 3: ')
    .replace(/Cognitive Architecture & Executive Function/i, 'Arsitektur Kognitif & Fungsi Eksekutif')
    .replace(/Passive Cooling & Urban Microclimates/i, 'Pendinginan Pasif & Iklim Mikro Perkotaan')
    .replace(/Epistemology & Archaeological Typology/i, 'Epistemologi & Tipologi Arkeologi')
    .replace(/Official Computer-Delivered IELTS Academic Practice Exam/i, 'Ujian Resmi Computer-Delivered IELTS Akademik')
    .replace(/\(Full 40 Questions\)/i, '(40 Soal Lengkap)')
    .replace(/Star Exam/i, 'Ujian Bintang');
}

function localizePromptText(prompt: string, lang: string): string {
  if (lang !== 'id' || !prompt) return prompt;
  return prompt
    .replace(/Choose the correct heading for Paragraph ([A-G]) from the list of headings below\.?/gi, 'Pilihlah judul bagian yang tepat untuk Paragraf $1 dari daftar pilihan judul di bawah ini.')
    .replace(/Which paragraph explains the physical phenomenon enabling sub-ambient cooling via an optical transparency window\??/gi, 'Paragraf mana yang menjelaskan fenomena fisik pendinginan sub-ambien melalui celah optik atmosfer?')
    .replace(/Which paragraph discusses the unexpected physiological thermal discomfort pedestrians may experience from reflective pavements\??/gi, 'Paragraf mana yang membahas ketidaknyamanan termal fisiologis pejalan kaki akibat perkerasan jalan reflektif?')
    .replace(/Which paragraph describes the aerodynamic flow regimes that occur when street canyon height-to-width ratios exceed critical thresholds\??/gi, 'Paragraf mana yang mendeskripsikan rezim aliran aerodinamika ketika rasio tinggi-terhadap-lebar ngarai jalan melebihi ambang batas kritis?')
    .replace(/Which paragraph outlines the water resource limitations of maintaining vegetative infrastructure in arid metropolitan areas\??/gi, 'Paragraf mana yang memaparkan keterbatasan sumber daya air dalam pemeliharaan infrastruktur vegetasi di wilayah metropolitan kering?')
    .replace(/According to Paragraph A, what is the primary physical driver of the Urban Heat Island effect\??/gi, 'Berdasarkan Paragraf A, apa pemicu fisik utama dari fenomena Urban Heat Island (Pulau Panas Perkotaan)?')
    .replace(/Why do modern cool roof coatings incorporate titanium dioxide nanoparticles or porous polymers\??/gi, 'Mengapa pelapis atap sejuk modern menyertakan nanopartikel titanium dioksida atau polimer berpori?')
    .replace(/What key optical advantage do retroreflective pavements offer over conventional diffuse reflective pavements\??/gi, 'Apa keunggulan optik utama dari perkerasan retroreflektif dibandingkan perkerasan reflektif baur konvensional?')
    .replace(/What aerodynamic hazard arises when the Height-to-Width ratio of an urban street canyon exceeds 2\.5\??/gi, 'Bahaya aerodinamika apa yang timbul ketika rasio Tinggi-terhadap-Lebar ngarai jalan kota melebihi 2.5?')
    .replace(/Match the stratigraphic principle with its definition:/gi, 'Cocokkan prinsip stratigrafi berikut dengan definisinya:')
    .replace(/Match the stratigraphic concept with its definition:/gi, 'Cocokkan konsep stratigrafi berikut dengan definisinya:')
    .replace(/Choose NO MORE THAN TWO WORDS from the passage/gi, 'Pilih TIDAK LEBIH DARI DUA KATA dari teks bacaan')
    .replace(/Choose NO MORE THAN ONE WORD from the passage/gi, 'Pilih TIDAK LEBIH DARI SATU KATA dari teks bacaan')
    .replace(/Rearrange the numbered words to form a correct sentence, then choose the word that goes into the ★ position:/gi, 'Susun kembali kata-kata bernomor untuk membentuk kalimat yang benar, lalu pilihlah kata yang menempati posisi ★:');
}

export const ExamRunnerView: React.FC<ExamRunnerViewProps> = ({
  lessonId,
  activeTrack = 'jlpt_n5',
  onNavigateBack,
  onSelectExam
}) => {
  const { renderFurigana } = useFurigana();
  const { t, language } = useLanguage();
  const isJapaneseTrack = (activeTrack || 'jlpt_n5').startsWith('jlpt_');
  const renderWithFuriganaIfJapanese = (txt: string) => isJapaneseTrack ? renderFurigana(txt) : txt;

  const trackKey = activeTrack || 'jlpt_n5';
  const presetsForLevel = BILINGUAL_EXAM_PRESETS[trackKey] || BILINGUAL_EXAM_PRESETS.ielts_academic;
  const defaultLessonId = presetsForLevel[0]?.id || (isJapaneseTrack ? 'les_n5_gram_1' : 'les_ia_mock_full_1');
  const targetLessonId = lessonId && lessonId !== 'les_n5_grammar_1' ? lessonId : defaultLessonId;

  const [currentLessonId, setCurrentLessonId] = useState<string>(targetLessonId);
  const [lessonInfo, setLessonInfo] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flaggedItems, setFlaggedItems] = useState<Record<string, boolean>>({});
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [sessionId, setSessionId] = useState<string>('');
  const [timeRemaining, setTimeRemaining] = useState<number>(3600);
  const [initialDuration, setInitialDuration] = useState<number>(3600);
  const [loading, setLoading] = useState<boolean>(true);
  const [result, setResult] = useState<any>(null);

  // Phase 3 Multi-Mock Engine State
  const [packages, setPackages] = useState<MasterExamPackageSummary[]>([]);
  const [selectedPackNumber, setSelectedPackNumber] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [examMode, setExamMode] = useState<'strict' | 'practice'>('strict');

  // CD-IELTS state
  const [fontSizeLevel, setFontSizeLevel] = useState<'sm' | 'base' | 'lg'>('base');
  const [showExitConfirmModal, setShowExitConfirmModal] = useState<boolean>(false);
  const [showFinishConfirmModal, setShowFinishConfirmModal] = useState<boolean>(false);
  const [showTabWarningModal, setShowTabWarningModal] = useState<boolean>(false);
  const [tabViolations, setTabViolations] = useState<number>(0);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'wrong' | 'correct' | 'flagged'>('all');

  const passageScrollRef = useRef<HTMLDivElement>(null);

  const isFullMockExam = currentLessonId.includes('mock') || currentLessonId === 'les_ia_mock_full_1' || items.length >= 40;
  const isIELTSTrack = !isJapaneseTrack;

  const loadPackages = async () => {
    try {
      const res = await fetchExamPackages(activeTrack);
      if (res && res.packages && res.packages.length > 0) {
        setPackages(res.packages);
      } else {
        setPackages(DEFAULT_EXAM_PACKAGES[activeTrack] || DEFAULT_EXAM_PACKAGES.ielts_academic);
      }
    } catch {
      setPackages(DEFAULT_EXAM_PACKAGES[activeTrack] || DEFAULT_EXAM_PACKAGES.ielts_academic);
    }
  };

  useEffect(() => {
    loadPackages();
  }, [activeTrack]);

  useEffect(() => {
    if (lessonId && lessonId !== 'les_n5_grammar_1') {
      setCurrentLessonId(lessonId);
    } else {
      setCurrentLessonId(defaultLessonId);
    }
  }, [lessonId, activeTrack]);

  useEffect(() => {
    initExam(currentLessonId);
  }, [currentLessonId]);

  // Tab switching / Proctoring violation detection (Strict Mode only)
  useEffect(() => {
    if (loading || result || examMode !== 'strict') return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabViolations(prev => {
          const next = prev + 1;
          setShowTabWarningModal(true);
          return next;
        });
      }
    };

    const handleBlur = () => {
      setTabViolations(prev => {
        const next = prev + 1;
        setShowTabWarningModal(true);
        return next;
      });
    };

    window.addEventListener('blur', handleBlur);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('blur', handleBlur);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [loading, result, examMode]);

  const initExam = async (idToLoad: string) => {
    setLoading(true);
    setResult(null);
    setAnswers({});
    setFlaggedItems({});
    setCurrentIdx(0);
    setTabViolations(0);
    setShowExitConfirmModal(false);
    setShowFinishConfirmModal(false);
    setShowTabWarningModal(false);

    try {
      let loadedItems: any[] = [];
      let loadedLessonInfo: any = null;

      const isIeltsMockPack = idToLoad.startsWith('ielts_acad_mock_');
      const isJlptMockPack = idToLoad.startsWith('jlpt_n5_mock_');

      if (isIeltsMockPack) {
        const packNum = (parseInt(idToLoad.replace('ielts_acad_mock_0', '').replace('ielts_acad_mock_', '')) || selectedPackNumber) as 1 | 2 | 3 | 4 | 5;
        setSelectedPackNumber(packNum);
        if (packNum === 1) {
          try {
            const lessonData = await fetchLesson('les_ia_mock_full_1');
            loadedLessonInfo = lessonData.lesson;
            loadedItems = (lessonData.items || []).map((it: any) => ({
              ...it,
              passageText: it.passageText || it.passage_text,
              itemType: it.itemType || it.item_type,
              options: it.options || (typeof it.options_json === 'string' ? JSON.parse(it.options_json) : it.options_json),
              correctAnswer: it.correctAnswer || (typeof it.correct_answer_json === 'string' ? JSON.parse(it.correct_answer_json) : it.correct_answer_json)
            }));
          } catch {
            loadedItems = generateIeltsAcademicPackItems(1);
          }
        } else {
          loadedItems = generateIeltsAcademicPackItems(packNum);
        }
      } else if (isJlptMockPack) {
        const packNum = (parseInt(idToLoad.replace('jlpt_n5_mock_0', '').replace('jlpt_n5_mock_', '')) || selectedPackNumber) as 1 | 2 | 3 | 4 | 5;
        setSelectedPackNumber(packNum);
        if (packNum === 1) {
          try {
            const lessonData = await fetchLesson('les_n5_gram_1');
            loadedLessonInfo = lessonData.lesson;
            loadedItems = (lessonData.items || []).map((it: any) => ({
              ...it,
              passageText: it.passageText || it.passage_text,
              itemType: it.itemType || it.item_type,
              options: it.options || (typeof it.options_json === 'string' ? JSON.parse(it.options_json) : it.options_json),
              correctAnswer: it.correctAnswer || (typeof it.correct_answer_json === 'string' ? JSON.parse(it.correct_answer_json) : it.correct_answer_json)
            }));
          } catch {
            loadedItems = generateJlptN5PackItems(1);
          }
        } else {
          loadedItems = generateJlptN5PackItems(packNum);
        }
      } else {
        try {
          const lessonData = await fetchLesson(idToLoad);
          loadedLessonInfo = lessonData.lesson;
          loadedItems = (lessonData.items || []).map((it: any) => ({
            ...it,
            passageText: it.passageText || it.passage_text,
            itemType: it.itemType || it.item_type,
            options: it.options || (typeof it.options_json === 'string' ? JSON.parse(it.options_json) : it.options_json),
            correctAnswer: it.correctAnswer || (typeof it.correct_answer_json === 'string' ? JSON.parse(it.correct_answer_json) : it.correct_answer_json)
          }));
        } catch {
          if (!isJapaneseTrack) {
            loadedItems = generateIeltsAcademicPackItems(selectedPackNumber);
          } else {
            loadedItems = generateJlptN5PackItems(selectedPackNumber);
          }
        }
      }

      setLessonInfo(loadedLessonInfo);
      setItems(loadedItems);

      const duration = (idToLoad.includes('mock') || loadedItems.length >= 40)
        ? 3600
        : (loadedLessonInfo?.estimatedMinutes || 25) * 60;
      setTimeRemaining(duration);
      setInitialDuration(duration);

      const isJLPT = idToLoad.includes('n5') || idToLoad.includes('n4') || idToLoad.includes('n3') || idToLoad.includes('n2') || idToLoad.includes('n1') || isJapaneseTrack;
      const trackCode = isJLPT ? 'jlpt' : 'ielts';
      const levelCode = isJLPT
        ? (idToLoad.includes('n5') ? 'n5' : idToLoad.includes('n4') ? 'n4' : idToLoad.includes('n3') ? 'n3' : idToLoad.includes('n2') ? 'n2' : 'n1')
        : (idToLoad.includes('gen') ? 'general' : 'academic');

      try {
        const session = await startSession({
          userId: 'user_001',
          trackCode,
          levelCode,
          sessionType: loadedItems.length >= 40 ? 'official_mock_exam' : 'exam_simulation'
        });
        setSessionId(session.sessionId);
      } catch {
        setSessionId(`local_session_${Date.now()}`);
      }
      setLoading(false);
    } catch (err) {
      console.error('Failed to init exam session', err);
      setLoading(false);
    }
  };

  // Timer countdown & Auto-submit
  useEffect(() => {
    if (loading || result || timeRemaining <= 0) return;
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit(false); // auto-submit on time expiry
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [loading, result, timeRemaining]);

  const handleSelectAnswer = (itemId: string, opt: string) => {
    if (result) return;
    setAnswers(prev => ({ ...prev, [itemId]: opt }));
  };

  const handleToggleFlag = (itemId: string) => {
    setFlaggedItems(prev => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const handleSubmit = async (isAbandoned = false) => {
    if (result) return;
    try {
      const timeSpent = Math.max(1, initialDuration - timeRemaining);
      let submissionResult: any = null;
      if (sessionId && !sessionId.startsWith('local_')) {
        try {
          submissionResult = await submitSession(sessionId, answers, timeSpent, isAbandoned);
        } catch (e) {
          console.warn('Backend submitSession failed, computing fallback', e);
        }
      }

      // Local fallback calculation if server failed or offline
      if (!submissionResult) {
        const correctCount = items.filter(it => answers[it.id] === it.correctAnswer).length;
        const totalCount = items.length || 40;
        const pct = Math.round((correctCount / totalCount) * 100);
        let band = 0;
        if (!isJapaneseTrack) {
          if (correctCount >= 39) band = 9.0;
          else if (correctCount >= 37) band = 8.5;
          else if (correctCount >= 35) band = 8.0;
          else if (correctCount >= 32) band = 7.5;
          else if (correctCount >= 30) band = 7.0;
          else if (correctCount >= 26) band = 6.5;
          else if (correctCount >= 23) band = 6.0;
          else if (correctCount >= 19) band = 5.5;
          else if (correctCount >= 15) band = 5.0;
          else band = 4.5;
        } else {
          band = Math.round((correctCount / totalCount) * 180);
        }

        submissionResult = {
          sessionId: sessionId || `session_${Date.now()}`,
          rawScore: correctCount,
          totalQuestions: totalCount,
          percentage: pct,
          estimatedScore: band,
          band: band,
          verdict: (isJapaneseTrack ? band >= 80 : band >= 6.5) ? 'PASSED' : 'NEEDS_REVIEW',
          answers,
          itemAnalyses: items.map(it => ({
            itemId: it.id,
            userAnswer: answers[it.id] || '',
            correctAnswer: it.correctAnswer,
            isCorrect: answers[it.id] === it.correctAnswer,
            explanation: it.explanation
          }))
        };
      }

      setResult(submissionResult);
      setShowFinishConfirmModal(false);
      setShowExitConfirmModal(false);

      // Record to multi-mock exam attempt store
      try {
        const activeList = packages.length > 0 ? packages : (DEFAULT_EXAM_PACKAGES[activeTrack] || DEFAULT_EXAM_PACKAGES.ielts_academic);
        const currentPkg = activeList.find(p => p.packNumber === selectedPackNumber) || activeList[0];
        const rawScore = submissionResult.rawScore || 0;
        const totalQ = items.length || 40;
        const scaled = submissionResult.estimatedScore || submissionResult.band || 0;
        await submitExamAttempt({
          packageId: currentPkg?.id || currentLessonId,
          levelCode: activeTrack || 'ielts_academic',
          packNumber: selectedPackNumber,
          rawScore,
          totalQuestions: totalQ,
          scaledScore: scaled,
          passed: submissionResult.verdict === 'PASSED' || scaled >= (currentPkg?.passThresholdScore || 6.5),
          sectionalBreakdown: {
            reading: { correct: rawScore, total: totalQ, percentage: Math.round((rawScore / totalQ) * 100) }
          },
          timeSpentSeconds: timeSpent
        });
        loadPackages();
      } catch (err) {
        console.warn('Failed to record exam attempt for trajectory', err);
      }
    } catch (err) {
      console.error('Failed to submit exam', err);
    }
  };

  const handleConfirmDisqualificationExit = () => {
    handleSubmit(true); // Abandon test -> Score 0, Band 0.0
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentItem = items[currentIdx];

  // Derive active part for IELTS (Part 1: 1-13, Part 2: 14-26, Part 3: 27-40)
  const currentPart = currentIdx < 13 ? 1 : currentIdx < 26 ? 2 : 3;

  const answeredCount = items.filter(it => answers[it.id] !== undefined && answers[it.id].trim() !== '').length;
  const unansweredCount = items.length - answeredCount;
  const flaggedCount = items.filter(it => flaggedItems[it.id]).length;

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16 animate-fadeIn">
      {/* Tab Switch Warning Modal */}
      {showTabWarningModal && !result && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-sumi-900 border-2 border-amber-500 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-scaleUp">
            <div className="flex items-center gap-3 text-amber-600 dark:text-amber-400">
              <ShieldAlert className="w-8 h-8 shrink-0" />
              <div>
                <h3 className="font-bold text-base text-stone-900 dark:text-stone-100">
                  {language === 'id' ? 'Peringatan Pengawasan Ujian!' : 'Proctoring Integrity Warning!'}
                </h3>
                <span className="text-xs font-mono font-bold text-amber-600">
                  {language === 'id' ? `Pelanggaran Ke-${tabViolations}` : `Violation #${tabViolations}`}
                </span>
              </div>
            </div>
            <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
              {language === 'id'
                ? 'Terdeteksi bahwa Anda berpindah tab atau meninggalkan jendela browser. Pada tes Computer-Delivered IELTS resmi, meninggalkan jendela ujian merupakan pelanggaran protokol yang dapat mengakibatkan diskualifikasi seketika.'
                : 'Navigation away from the exam window was detected. Under official Computer-Delivered IELTS conditions, leaving the test interface is recorded as a serious testing irregularity.'}
            </p>
            <div className="pt-2">
              <button
                onClick={() => setShowTabWarningModal(false)}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition-all shadow-sm"
              >
                {language === 'id' ? 'Saya Mengerti & Kembali ke Ujian' : 'I Understand & Return to Exam'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Disqualification / Abandon Exit Confirmation Modal */}
      {showExitConfirmModal && !result && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-sumi-900 border-2 border-red-500 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-scaleUp">
            <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
              <AlertTriangle className="w-9 h-9 shrink-0" />
              <div>
                <h3 className="font-bold text-base text-stone-900 dark:text-stone-100">
                  {language === 'id' ? 'PERINGATAN DISKUALIFIKASI UJIAN RESMI' : 'OFFICIAL EXAM DISQUALIFICATION WARNING'}
                </h3>
                <span className="text-xs font-mono font-bold text-red-600">
                  {language === 'id' ? 'Konsekuensi: Skor Band 0.0' : 'Consequence: Band Score 0.0'}
                </span>
              </div>
            </div>
            <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed bg-red-50 dark:bg-red-950/40 p-3 rounded-xl border border-red-200 dark:border-red-900">
              {language === 'id'
                ? 'Pada tes IELTS resmi, seorang peserta ujian TIDAK BISA meninggalkan ruang ujian sesuka hati. Jika Anda keluar sekarang sebelum menyelesaikan 40 soal, sesi ini akan dianggap GUGUR / DITINGGALKAN dan dicatat dengan nilai SKOR 0 / BAND 0.0.'
                : 'Under official IELTS test regulations, a candidate cannot freely abandon an active test session. Exiting now will mark this session as ABANDONED/DISQUALIFIED with a recorded Band Score of 0.0.'}
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowExitConfirmModal(false)}
                className="px-4 py-2.5 rounded-xl bg-washi-200 dark:bg-sumi-800 text-stone-800 dark:text-stone-200 font-bold text-xs hover:bg-washi-300 transition-all"
              >
                {language === 'id' ? 'Batalkan & Lanjutkan Ujian' : 'Cancel & Continue Exam'}
              </button>
              <button
                onClick={handleConfirmDisqualificationExit}
                className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-sm transition-all"
              >
                {language === 'id' ? 'Keluar & Terima Skor 0.0' : 'Exit & Forfeit (Band 0.0)'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Finish Test Confirmation Modal */}
      {showFinishConfirmModal && !result && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-scaleUp">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-vermilion-500 shrink-0" />
              <div>
                <h3 className="font-bold text-base text-stone-900 dark:text-stone-100">
                  {language === 'id' ? 'Kumpulkan Lembar Jawaban Ujian?' : 'Submit Examination Responses?'}
                </h3>
                <span className="text-xs text-stone-500">
                  {language === 'id' ? 'Ringkasan Pengerjaan Soal' : 'Response Battery Summary'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 bg-washi-100 dark:bg-sumi-850 p-3 rounded-xl text-center text-xs">
              <div>
                <span className="text-[10px] text-stone-400 block">{language === 'id' ? 'Dijawab' : 'Answered'}</span>
                <span className="font-bold font-mono text-emerald-600 text-sm">{answeredCount}</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 block">{language === 'id' ? 'Kosong' : 'Unanswered'}</span>
                <span className="font-bold font-mono text-stone-500 text-sm">{unansweredCount}</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 block">{language === 'id' ? 'Ditandai' : 'Flagged'}</span>
                <span className="font-bold font-mono text-amber-500 text-sm">{flaggedCount}</span>
              </div>
            </div>

            {unansweredCount > 0 && (
              <p className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 p-2.5 rounded-lg border border-amber-200 dark:border-amber-900">
                {language === 'id'
                  ? `Perhatian: Masih terdapat ${unansweredCount} soal yang belum dijawab. Soal kosong akan dihitung bernilai 0.`
                  : `Notice: There are ${unansweredCount} unanswered questions remaining which will receive zero points.`}
              </p>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowFinishConfirmModal(false)}
                className="px-4 py-2.5 rounded-xl bg-washi-200 dark:bg-sumi-800 text-stone-800 dark:text-stone-200 font-bold text-xs hover:bg-washi-300 transition-all"
              >
                {language === 'id' ? 'Periksa Kembali' : 'Review Again'}
              </button>
              <button
                onClick={() => handleSubmit(false)}
                className="px-4 py-2.5 rounded-xl bg-vermilion-500 hover:bg-vermilion-600 text-white font-bold text-xs shadow-sm transition-all"
              >
                {language === 'id' ? 'Ya, Kumpulkan Final' : 'Confirm Submission'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Master Mock Battery Selector Hub (Screen 4) */}
      <div className="bg-washi-50 dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
        {/* Hub Header & Mode Toggle Ribbon */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-washi-200 dark:border-sumi-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-vermilion-600 dark:text-vermilion-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Layers className="w-4 h-4" />
              <span>{t('exam.hub_title')}</span>
            </div>
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              {language === 'id' ? 'Pusat Baterai Simulasi Ujian Resmi (Paket 1–5)' : 'Official Standardized Mock Batteries (Packs 1–5)'}
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              {t('exam.hub_subtitle')}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Mode Switcher Toggle */}
            <div className="flex items-center rounded-xl bg-washi-200 dark:bg-sumi-800 p-1 border border-washi-300 dark:border-sumi-700">
              <button
                type="button"
                onClick={() => setExamMode('strict')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  examMode === 'strict'
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>{t('exam.strict_mode')}</span>
              </button>
              <button
                type="button"
                onClick={() => setExamMode('practice')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  examMode === 'practice'
                    ? 'bg-vermilion-500 text-white shadow-sm'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{t('exam.practice_mode')}</span>
              </button>
            </div>

            <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-vermilion-500/10 text-vermilion-600 dark:text-vermilion-400 border border-vermilion-500/20">
              {trackKey.toUpperCase()}
            </span>

            {onNavigateBack && (
              <button
                onClick={() => {
                  if (!result && items.length > 0 && answeredCount > 0) {
                    setShowExitConfirmModal(true);
                  } else {
                    onNavigateBack();
                  }
                }}
                className="text-xs text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 font-semibold px-2 py-1"
              >
                {t('exam.back_curriculum')}
              </button>
            )}
          </div>
        </div>

        {/* 5-Pack Carousel / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-1">
          {(packages.length > 0 ? packages : (DEFAULT_EXAM_PACKAGES[activeTrack] || DEFAULT_EXAM_PACKAGES.ielts_academic)).map(pkg => {
            const isSelected = pkg.packNumber === selectedPackNumber;
            const tierColors: Record<string, string> = {
              diagnostic: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
              standard: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
              challenging: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
              advanced: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
              mastery: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
            };
            const tierLabel = t(`exam.difficulty_${pkg.difficultyTier}`) || pkg.difficultyTier;

            return (
              <button
                key={pkg.id || pkg.packNumber}
                type="button"
                onClick={() => {
                  if (!result && items.length > 0 && answeredCount > 0 && pkg.packNumber !== selectedPackNumber) {
                    setShowExitConfirmModal(true);
                    return;
                  }
                  setSelectedPackNumber(pkg.packNumber);
                  const newId = pkg.id || (isJapaneseTrack ? `jlpt_n5_mock_0${pkg.packNumber}` : `ielts_acad_mock_0${pkg.packNumber}`);
                  setCurrentLessonId(newId);
                  if (onSelectExam) onSelectExam(newId);
                }}
                className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between relative group ${
                  isSelected
                    ? 'bg-white dark:bg-sumi-850 border-vermilion-500 shadow-md ring-2 ring-vermilion-500/20'
                    : 'bg-white dark:bg-sumi-850 border-washi-200 dark:border-sumi-800 hover:border-vermilion-500/40'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-1 text-[11px]">
                    <span className="font-mono font-black text-xs text-stone-900 dark:text-stone-100 flex items-center gap-1">
                      <span>{language === 'id' ? `Paket ${pkg.packNumber}` : `Pack ${pkg.packNumber}`}</span>
                      {isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-vermilion-500 animate-ping" />
                      )}
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider ${tierColors[pkg.difficultyTier] || tierColors.standard}`}>
                      {tierLabel}
                    </span>
                  </div>

                  <h4 className="font-bold text-xs text-stone-900 dark:text-stone-100 line-clamp-1">
                    {language === 'id' ? pkg.titleId : pkg.titleEn}
                  </h4>

                  <p className="text-[10px] text-stone-500 dark:text-stone-400 line-clamp-2 leading-relaxed">
                    {language === 'id' ? pkg.thematicFocusId : pkg.thematicFocusEn}
                  </p>
                </div>

                <div className="pt-3 border-t border-washi-200 dark:border-sumi-800 mt-2 space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] text-stone-400 font-mono">
                    <span>{pkg.totalDurationMinutes} min</span>
                    <span>{pkg.questionCount} {language === 'id' ? 'soal' : 'items'}</span>
                  </div>

                  {/* Past Attempt Status Badge */}
                  <div className="flex items-center justify-between">
                    {pkg.completed ? (
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{language === 'id' ? `Selesai: ${pkg.bestScore || pkg.bestBand}` : `Done: ${pkg.bestScore || pkg.bestBand}`}</span>
                      </span>
                    ) : isSelected && answeredCount > 0 ? (
                      <span className="text-[10px] font-bold text-amber-500 flex items-center gap-1">
                        <Clock className="w-3 h-3 animate-spin" />
                        <span>{t('exam.status_in_progress')}</span>
                      </span>
                    ) : (
                      <span className="text-[10px] text-stone-400">
                        {t('exam.status_unattempted')}
                      </span>
                    )}

                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      isSelected
                        ? 'bg-vermilion-500 text-white'
                        : 'bg-washi-100 dark:bg-sumi-800 text-stone-600 dark:text-stone-400'
                    }`}>
                      {isSelected
                        ? (examMode === 'strict' ? t('exam.start_official_exam') : t('exam.start_practice'))
                        : (language === 'id' ? 'Pilih' : 'Select')}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Exam Interface */}
      {loading ? (
        <div className="py-20 text-center space-y-3 bg-white dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-2xl p-8">
          <div className="w-8 h-8 border-2 border-vermilion-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-stone-500">{language === 'id' ? 'Memuat sistem Computer-Delivered IELTS...' : 'Loading Computer-Delivered IELTS environment...'}</p>
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-2xl p-8 text-center space-y-3">
          <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
          <h3 className="text-sm font-bold">{t('exam.no_items')}</h3>
          <p className="text-xs text-stone-500">{t('exam.no_items_desc')}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Top Bar: Official CD-IELTS Header */}
          <div className="bg-stone-900 text-white rounded-2xl p-3.5 sm:p-4 shadow-md flex flex-wrap items-center justify-between gap-3 border border-stone-800">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <span className="text-[10px] font-mono tracking-widest text-emerald-400 font-bold uppercase block">
                  {isFullMockExam ? 'Official Computer-Delivered IELTS Simulation' : 'Standardized Exam Battery'}
                </span>
                <h2 className="text-xs sm:text-sm font-bold text-white tracking-wide">
                  {localizeExamTitle(lessonInfo?.title || '', language)}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              {/* Strict Proctoring Pill */}
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-800 border border-stone-700 text-stone-300 text-[11px] font-mono">
                <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
                <span>{language === 'id' ? 'Pengawasan Aktif' : 'Proctored'}</span>
              </div>

              {/* Countdown Timer */}
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs font-bold border transition-colors ${
                timeRemaining <= 300
                  ? 'bg-red-500/20 border-red-500 text-red-300 animate-pulse'
                  : timeRemaining <= 600
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                  : 'bg-stone-800 border-stone-700 text-white'
              }`}>
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTime(timeRemaining)}</span>
              </div>

              {/* Exit with Penalty Button */}
              {!result && (
                <button
                  onClick={() => setShowExitConfirmModal(true)}
                  className="px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-red-400 text-xs font-semibold border border-stone-700 transition-all flex items-center gap-1"
                  title="Keluar dari ujian (Skor 0.0)"
                >
                  <X className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{language === 'id' ? 'Batal Ujian' : 'Abandon'}</span>
                </button>
              )}

              {/* Finish Test Button */}
              {!result && (
                <button
                  onClick={() => setShowFinishConfirmModal(true)}
                  className="px-3.5 py-1.5 rounded-lg bg-vermilion-500 hover:bg-vermilion-600 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{language === 'id' ? 'Selesaikan Ujian' : 'Finish Test'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Section Part Selector for IELTS (Part 1, Part 2, Part 3) */}
          {isIELTSTrack && items.length >= 13 && (
            <div className="flex items-center justify-between gap-2 bg-washi-100 dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-xl p-2 text-xs">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={() => setCurrentIdx(0)}
                  className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${
                    currentPart === 1
                      ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-900 shadow-sm'
                      : 'bg-washi-200 dark:bg-sumi-800 text-stone-600 dark:text-stone-400 hover:bg-washi-300'
                  }`}
                >
                  Part 1 (Q 1 - 13)
                </button>
                {items.length >= 26 && (
                  <button
                    onClick={() => setCurrentIdx(13)}
                    className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${
                      currentPart === 2
                        ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-900 shadow-sm'
                        : 'bg-washi-200 dark:bg-sumi-800 text-stone-600 dark:text-stone-400 hover:bg-washi-300'
                    }`}
                  >
                    Part 2 (Q 14 - 26)
                  </button>
                )}
                {items.length >= 40 && (
                  <button
                    onClick={() => setCurrentIdx(26)}
                    className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${
                      currentPart === 3
                        ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-900 shadow-sm'
                        : 'bg-washi-200 dark:bg-sumi-800 text-stone-600 dark:text-stone-400 hover:bg-washi-300'
                    }`}
                  >
                    Part 3 (Q 27 - 40)
                  </button>
                )}
              </div>

              {/* Font Resizer */}
              <div className="flex items-center gap-1 text-stone-500">
                <button
                  onClick={() => setFontSizeLevel('sm')}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold ${fontSizeLevel === 'sm' ? 'bg-vermilion-500 text-white' : 'bg-washi-200 dark:bg-sumi-800'}`}
                >
                  A-
                </button>
                <button
                  onClick={() => setFontSizeLevel('base')}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold ${fontSizeLevel === 'base' ? 'bg-vermilion-500 text-white' : 'bg-washi-200 dark:bg-sumi-800'}`}
                >
                  A
                </button>
                <button
                  onClick={() => setFontSizeLevel('lg')}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold ${fontSizeLevel === 'lg' ? 'bg-vermilion-500 text-white' : 'bg-washi-200 dark:bg-sumi-800'}`}
                >
                  A+
                </button>
              </div>
            </div>
          )}

          {/* Two-Pane Reading + Question Layout for IELTS CD-Test */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            {/* Left Pane: Reading Passage / Stimulus */}
            {Boolean(currentItem?.passageText || currentItem?.passage_text) && (
              <div className="lg:col-span-6 bg-white dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-3 h-[560px] flex flex-col">
                <div className="flex items-center justify-between border-b border-washi-200 dark:border-sumi-800 pb-2.5 shrink-0">
                  <div className="flex items-center gap-2 text-stone-600 dark:text-stone-400 text-xs font-bold uppercase tracking-wider">
                    <BookOpen className="w-4 h-4 text-vermilion-500" />
                    <span>{currentItem.passageTitle || t('exam.reference_title')}</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-washi-100 dark:bg-sumi-800 text-stone-500">
                    Part {currentPart} of 3
                  </span>
                </div>

                <div
                  ref={passageScrollRef}
                  className={`overflow-y-auto pr-2 space-y-3.5 text-stone-800 dark:text-stone-200 leading-relaxed font-sans flex-1 ${
                    fontSizeLevel === 'sm' ? 'text-xs leading-normal' : fontSizeLevel === 'lg' ? 'text-base leading-relaxed' : 'text-sm leading-relaxed'
                  }`}
                >
                  {renderWithFuriganaIfJapanese(currentItem.passageText || currentItem.passage_text || "")}
                </div>
              </div>
            )}

            {/* Right Pane: Question Item & Interactive Input */}
            <div className={`${(currentItem?.passageText || currentItem?.passage_text) ? 'lg:col-span-6' : 'lg:col-span-12'} bg-white dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5 h-[560px] flex flex-col justify-between`}>
              <div className="space-y-4 overflow-y-auto pr-1">
                {/* Question Top Metadata */}
                <div className="flex items-center justify-between border-b border-washi-200 dark:border-sumi-800 pb-2.5">
                  <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-md bg-stone-100 dark:bg-sumi-850 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800">
                    Question {currentIdx + 1} of {items.length}
                  </span>

                  <button
                    onClick={() => handleToggleFlag(currentItem.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                      flaggedItems[currentItem.id]
                        ? 'bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400'
                        : 'text-stone-400 hover:text-stone-600 dark:hover:text-stone-200'
                    }`}
                  >
                    <Flag className={`w-3.5 h-3.5 ${flaggedItems[currentItem.id] ? 'fill-amber-500 text-amber-500' : ''}`} />
                    <span>{language === 'id' ? 'Tandai untuk Ditinjau' : 'Review'}</span>
                  </button>
                </div>

                {/* Question Prompt */}
                <p className="text-sm sm:text-base font-semibold text-stone-900 dark:text-stone-100 leading-relaxed whitespace-pre-line">
                  {renderFurigana(localizePromptText(currentItem.prompt, language))}
                </p>

                {/* Input Fields: Multi-choice, Dropdown, or Sentence Completion */}
                <div className="space-y-2.5 pt-2">
                  {(() => {
                    let opts: string[] = [];
                    try {
                      opts = typeof currentItem.options_json === 'string'
                        ? JSON.parse(currentItem.options_json)
                        : currentItem.options || [];
                    } catch {
                      opts = currentItem.options || [];
                    }

                    // Sentence / Summary completion text input if options is empty
                    if (opts.length === 0 || currentItem.itemType === 'sentence_completion' && opts.length <= 1) {
                      return (
                        <div className="space-y-2">
                          <label className="text-xs text-stone-500 font-bold block">
                            {language === 'id' ? 'Ketik Jawaban Anda (Sesuai Batas Kata di Teks):' : 'Type Your Answer (Observe Word Count Limits):'}
                          </label>
                          <input
                            type="text"
                            value={answers[currentItem.id] || ''}
                            onChange={(e) => handleSelectAnswer(currentItem.id, e.target.value)}
                            disabled={!!result}
                            placeholder={language === 'id' ? 'Ketik jawaban di sini...' : 'Type answer here...'}
                            className="w-full p-3 rounded-xl border border-washi-300 dark:border-sumi-800 bg-washi-50 dark:bg-sumi-850 text-stone-900 dark:text-stone-100 text-sm focus:ring-2 focus:ring-vermilion-500 outline-none"
                          />
                        </div>
                      );
                    }

                    return opts.map((opt: string, oIdx: number) => {
                      const isSelected = answers[currentItem.id] === opt;
                      let optStyle = isSelected
                        ? 'bg-vermilion-500/10 border-vermilion-500 text-vermilion-700 dark:text-vermilion-300 font-semibold ring-1 ring-vermilion-500/20'
                        : 'bg-washi-50 dark:bg-sumi-850 border-washi-200 dark:border-sumi-800 text-stone-800 dark:text-stone-200 hover:bg-washi-100 dark:hover:bg-sumi-800';

                      if (result) {
                        const isCorrect = currentItem.correct_answer_json
                          ? JSON.parse(currentItem.correct_answer_json) === opt
                          : currentItem.correctAnswer === opt;
                        if (isCorrect) {
                          optStyle = 'bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-400 font-bold';
                        } else if (isSelected) {
                          optStyle = 'bg-red-500/10 border-red-500 text-red-700 dark:text-red-400';
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleSelectAnswer(currentItem.id, opt)}
                          className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center gap-3 ${optStyle}`}
                        >
                          <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] shrink-0 font-mono">
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span className="flex-1">{renderFurigana(opt)}</span>
                          {isSelected && <Check className="w-4 h-4 shrink-0 text-vermilion-600" />}
                        </button>
                      );
                    });
                  })()}
                </div>

                {/* Explanation when submitted */}
                {result && currentItem.explanation && (
                  <div className="bg-washi-100 dark:bg-sumi-850 p-4 rounded-xl border border-washi-200 dark:border-sumi-800 space-y-1.5 text-xs text-stone-700 dark:text-stone-300 animate-fadeIn">
                    <span className="font-bold text-vermilion-600 dark:text-vermilion-400 block">
                      {language === 'id' ? 'Penjelasan & Kutipan Teks:' : 'Explanation & Text Evidence:'}
                    </span>
                    <p className="leading-relaxed whitespace-pre-line">
                      {renderWithFuriganaIfJapanese(currentItem.explanation)}
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Step Arrows within Right Pane */}
              <div className="flex items-center justify-between pt-3 border-t border-washi-200 dark:border-sumi-800 shrink-0">
                <button
                  disabled={currentIdx === 0}
                  onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
                  className="px-3 py-1.5 rounded-lg border border-washi-300 dark:border-sumi-800 text-xs font-semibold disabled:opacity-40 hover:bg-washi-100 dark:hover:bg-sumi-850 transition-all flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>{t('exam.previous')}</span>
                </button>

                <div className="text-xs font-mono font-bold text-stone-500">
                  {currentIdx + 1} / {items.length}
                </div>

                <button
                  disabled={currentIdx === items.length - 1}
                  onClick={() => setCurrentIdx(prev => Math.min(items.length - 1, prev + 1))}
                  className="px-3 py-1.5 rounded-lg border border-washi-300 dark:border-sumi-800 text-xs font-semibold disabled:opacity-40 hover:bg-washi-100 dark:hover:bg-sumi-850 transition-all flex items-center gap-1"
                >
                  <span>{t('exam.next')}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom 40-Question Navigator Ribbon */}
          <div className="bg-white dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-washi-200 dark:border-sumi-800 pb-2">
              <span className="font-bold text-stone-800 dark:text-stone-200">
                {language === 'id' ? 'Navigasi Nomor Soal Ujian (1–40):' : 'Question Number Navigation (1–40):'}
              </span>

              <div className="flex items-center gap-4 text-[11px] text-stone-500">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-stone-900 dark:bg-white inline-block" />
                  <span>{language === 'id' ? 'Dijawab' : 'Answered'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-washi-100 dark:bg-sumi-800 border border-stone-300 dark:border-stone-700 inline-block" />
                  <span>{language === 'id' ? 'Belum Dijawab' : 'Unanswered'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-amber-400 inline-block" />
                  <span>{language === 'id' ? 'Ditandai (Review)' : 'Flagged'}</span>
                </div>
              </div>
            </div>

            {/* Grid of Number Pills */}
            <div className="grid grid-cols-10 sm:grid-cols-20 gap-1.5">
              {items.map((item, qIdx) => {
                const isSelected = qIdx === currentIdx;
                const isAnswered = answers[item.id] !== undefined && String(answers[item.id]).trim() !== '';
                const isFlagged = flaggedItems[item.id];

                let pillStyle = 'bg-washi-100 dark:bg-sumi-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-750';
                if (isAnswered) {
                  pillStyle = 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-bold border-stone-900';
                }
                if (isSelected) {
                  pillStyle += ' ring-2 ring-vermilion-500 scale-105 z-10';
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentIdx(qIdx)}
                    className={`relative h-8 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center ${pillStyle}`}
                    title={`Question ${qIdx + 1}`}
                  >
                    <span>{qIdx + 1}</span>
                    {isFlagged && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full ring-1 ring-white" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Official Diagnostic Result Card (Score & Band Report) */}
          {result && (
            <div className={`rounded-2xl p-6 sm:p-8 text-center space-y-6 shadow-lg border-2 animate-fadeIn ${
              result.disqualified
                ? 'bg-red-50 dark:bg-sumi-900 border-red-500/40'
                : 'bg-emerald-50 dark:bg-sumi-900 border-emerald-500/30'
            }`}>
              <div className="space-y-2">
                {result.disqualified ? (
                  <AlertTriangle className="w-12 h-12 text-red-500 mx-auto" />
                ) : (
                  <Award className="w-12 h-12 text-emerald-500 mx-auto" />
                )}
                <h3 className="text-lg sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
                  {result.disqualified
                    ? (language === 'id' ? 'UJIAN DIDISKUALIFIKASI / DITINGGALKAN' : 'EXAMINATION DISQUALIFIED / ABANDONED')
                    : (language === 'id' ? 'HASIL SIMULASI KOMPUTER RESMI TELAH KELUAR' : 'OFFICIAL CD-IELTS SIMULATION SCORE REPORT')}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-lg mx-auto">
                  {result.disqualified
                    ? (language === 'id' ? 'Sesi ujian ini dibatalkan secara prematur sebelum batas waktu berakhir. Skor dicatat sebagai Band 0.0.' : 'Test session was prematurely exited before conclusion. Recorded as Band 0.0.')
                    : (language === 'id' ? 'Skor Band dihitung menggunakan matriks konversi resmi Cambridge IELTS Academic (Skala 1.0 – 9.0).' : 'Band Score derived using the official Cambridge IELTS Academic conversion matrix (Scale 1.0 – 9.0).')}
                </p>
              </div>

              {/* Band Score & Metrics Banner */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
                <div className="bg-white dark:bg-sumi-850 p-4 rounded-xl border border-washi-200 dark:border-sumi-800">
                  <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">
                    {language === 'id' ? 'SKOR BAND IELTS' : 'IELTS BAND SCORE'}
                  </span>
                  <span className="text-2xl sm:text-3xl font-bold text-vermilion-600 dark:text-vermilion-400 font-mono mt-0.5 block">
                    {result.disqualified ? '0.0' : `Band ${result.bandEstimate || '6.0'}`}
                  </span>
                </div>

                <div className="bg-white dark:bg-sumi-850 p-4 rounded-xl border border-washi-200 dark:border-sumi-800">
                  <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">
                    {language === 'id' ? 'JAWABAN BENAR' : 'RAW SCORE'}
                  </span>
                  <span className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 font-mono mt-0.5 block">
                    {result.correctCount ?? result.score ?? 0} / {result.totalQuestions ?? result.maxScore ?? items.length}
                  </span>
                </div>

                <div className="bg-white dark:bg-sumi-850 p-4 rounded-xl border border-washi-200 dark:border-sumi-800">
                  <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">
                    {language === 'id' ? 'AKURASI SOAL' : 'ACCURACY'}
                  </span>
                  <span className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 font-mono mt-0.5 block">
                    {result.accuracyPct ?? 0}%
                  </span>
                </div>

                <div className="bg-white dark:bg-sumi-850 p-4 rounded-xl border border-washi-200 dark:border-sumi-800">
                  <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">
                    {language === 'id' ? 'STATUS KELULUSAN' : 'TARGET VERDICT'}
                  </span>
                  <span className={`text-xs sm:text-sm font-bold mt-2 block ${
                    result.disqualified
                      ? 'text-red-600'
                      : result.passed
                      ? 'text-emerald-600'
                      : 'text-amber-600'
                  }`}>
                    {result.disqualified
                      ? 'GUGUR (0.0)'
                      : result.passed
                      ? (language === 'id' ? 'LULUS TARGET (7.5+)' : 'TARGET MET (7.5+)')
                      : (language === 'id' ? 'PERLU LATIHAN' : 'NEEDS PRACTICE')}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => initExam(currentLessonId)}
                  className="px-5 py-2.5 rounded-xl bg-washi-200 dark:bg-sumi-800 text-stone-700 dark:text-stone-300 font-bold text-xs hover:bg-washi-300 transition-all flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{language === 'id' ? 'Ulangi Ujian Ini' : 'Retake Test'}</span>
                </button>
                {onNavigateBack && (
                  <button
                    onClick={onNavigateBack}
                    className="px-5 py-2.5 rounded-xl bg-vermilion-500 hover:bg-vermilion-600 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
                  >
                    <span>{language === 'id' ? 'Kembali ke Kurikulum' : 'Back to Curriculum'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
