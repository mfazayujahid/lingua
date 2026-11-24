import React, { useState, useEffect } from 'react';
import { LevelCode } from '../../../shared/types';
import { fetchCurriculum } from '../api';
import { useFurigana } from '../context/FuriganaContext';
import { useLanguage } from '../context/LanguageContext';
import {
  Layers,
  GraduationCap,
  BookOpen,
  Clock,
  ArrowRight,
  Sparkles,
  Compass,
  Check,
  ChevronRight,
  Feather,
  CheckCircle2,
  PlayCircle
} from 'lucide-react';

interface CurriculumViewProps {
  activeTrack: LevelCode;
  onLaunchLesson: (lessonType: string, lessonId: string, mode?: 'lecture' | 'drill') => void;
  onTrackChange?: (track: LevelCode) => void;
}

interface GuidedStageDef {
  stage: number;
  badgeEn: string;
  badgeId: string;
  titleEn: string;
  titleId: string;
  japaneseSub?: string;
  descEn: string;
  descId: string;
  targetEn: string;
  targetId: string;
  actionEn: string;
  actionId: string;
  lessonType: string;
  lessonId: string;
}

const DYNAMIC_ROADMAPS: Record<string, GuidedStageDef[]> = {
  jlpt_n5: [
    {
      stage: 1,
      badgeEn: 'Stage 1 • Writing Foundation',
      badgeId: 'Tahap 1 • Fondasi Huruf',
      titleEn: 'Kana Literacy: Hiragana & Katakana (92 Characters)',
      titleId: 'Literasi Kana: Hiragana & Katakana (92 Huruf)',
            descEn: 'Master the 46 Hiragana and 46 Katakana syllables with official KanjiVG vector stroke tracing. Absolute foundation for all reading and grammar.',
      descId: 'Kuasai 46 Hiragana dan 46 Katakana dengan guratan vektor kaligrafi KanjiVG standar. Fondasi mutlak untuk membaca dan tata bahasa Jepang.',
      targetEn: '46 Hiragana + 46 Katakana reading, writing & correct stroke order',
      targetId: '46 Hiragana + 46 Katakana: membaca, menulis & urutan goresan benar',
      actionEn: 'Launch Kana Studio (平仮名・片仮名)',
      actionId: 'Buka Studio Kana (平仮名・片仮名)',
      lessonType: 'kanji_writing',
      lessonId: 'kana_a_h'
    },
    {
      stage: 2,
      badgeEn: 'Stage 2 • Core Grammar & Vocab',
      badgeId: 'Tahap 2 • Tata Bahasa Dasar & Kosakata',
      titleEn: 'Core Sentence Patterns: Topic Particle は & Polite Copula です',
      titleId: 'Pola Kalimat Dasar: Partikel Topik は & Kopula Sopan です',
            descEn: 'Learn the fundamental sentence structure (Topic Particle は + Polite Copula です/ではありません) with core survival words in natural context.',
      descId: 'Pelajari struktur kalimat paling mendasar (Partikel Topik は + Kopula Sopan です/ではありません) dengan kosakata bertahan hidup dalam konteks alami.',
      targetEn: 'Topic Particle は, Copula です/ではありません + 15 core survival words',
      targetId: 'Partikel Topik は, Kopula です/ではありません + 15 kosakata inti',
      actionEn: 'Start Lesson 1: Copula & Demonstratives',
      actionId: 'Mulai Latihan 1: Kopula & Kata Tunjuk',
      lessonType: 'grammar_lesson',
      lessonId: 'les_n5_gram_1'
    },
    {
      stage: 3,
      badgeEn: 'Stage 3 • Daily Kanji',
      badgeId: 'Tahap 3 • Kanji Harian',
      titleEn: 'Foundational Daily Kanji (日, 本, 人, etc.)',
      titleId: 'Kanji Kehidupan Dasar (日, 本, 人, dll.)',
            descEn: 'Learn common daily kanji with the 4-step formula: Radicals → Mnemonics → Native Compounds → FSRS Spaced Repetition.',
      descId: 'Pelajari kanji harian frekuensi tinggi dengan formula 4 langkah: Radikal → Mnemonik → Kata Majemuk → Pengulangan Berjarak FSRS.',
      targetEn: 'Foundational Kanji (日, 本, 人...) + 25 high-frequency compound words',
      targetId: 'Kanji Dasar (日, 本, 人...) + 25 kata majemuk frekuensi tinggi',
      actionEn: 'Practice Kanji Strokes (基本漢字)',
      actionId: 'Latihan Goresan Kanji (基本漢字)',
      lessonType: 'kanji_writing',
      lessonId: 'kanji_n5_01_nichi'
    },
    {
      stage: 4,
      badgeEn: 'Stage 4 • Action Verbs & Particles',
      badgeId: 'Tahap 4 • Kata Kerja Tindakan & Partikel Kasus',
      titleEn: 'Action Verbs & Key Case Particles (を・に・で・へ・から)',
      titleId: 'Kata Kerja Tindakan & Partikel Kasus Utama (を・に・で・へ・から)',
            descEn: 'Master daily action verbs in their polite form (~ます) combined with essential case particles: Direct Object を, Time/Destination に, Location で.',
      descId: 'Kuasai kata kerja tindakan dalam bentuk sopan (~ます) digabungkan dengan partikel kasus esensial: Objek Langsung を, Waktu/Tujuan に, Tempat で.',
      targetEn: 'Polite verbs (~ます) & Case particles (を, に, で, へ, から)',
      targetId: 'Kata kerja sopan (~ます) & Partikel kasus (を, に, で, へ, から)',
      actionEn: 'Start Lesson 2: Particles & Verbs',
      actionId: 'Mulai Latihan 2: Partikel Kasus & Verba',
      lessonType: 'grammar_lesson',
      lessonId: 'les_n5_gram_2'
    },
    {
      stage: 5,
      badgeEn: 'Stage 5 • Contextual Reading',
      badgeId: 'Tahap 5 • Pemahaman Membaca Kontekstual',
      titleEn: 'Short Life Notices: Campus Tea Party & Schedules',
      titleId: 'Pengumuman Singkat: Acara Minum Teh Kampus & Jadwal',
            descEn: 'Apply your vocabulary and grammar to real-world scenarios. Extract key dates, deadlines, and requirements from authentic Japanese bulletin notices.',
      descId: 'Terapkan kosakata dan tata bahasa Anda ke situasi nyata. Temukan tanggal, tenggat, dan syarat penting dari papan pengumuman kampus autentik.',
      targetEn: 'Authentic flyer notices, schedule comprehension & condition extraction',
      targetId: 'Pengumuman selebaran autentik, pemahaman jadwal & ekstraksi syarat',
      actionEn: 'Start Reading Drill (実戦読解)',
      actionId: 'Mulai Latihan Membaca (実戦読解)',
      lessonType: 'reading_drill',
      lessonId: 'les_n5_read_1'
    },
    {
      stage: 6,
      badgeEn: 'Stage 6 • Star Drills & Exam Simulation',
      badgeId: 'Tahap 6 • Latihan Bintang & Simulasi Ujian',
      titleEn: 'Official JLPT Star Reordering & Syntax Verification',
      titleId: 'Ujian Bintang Resmi JLPT: Urutan Kata & Verifikasi Sintaksis',
            descEn: 'Test your understanding of Japanese sentence structure with JLPT-style Star Reordering Drills (identify the option that fits into the ★ position).',
      descId: 'Uji pemahaman urutan struktur kalimat bahasa Jepang dengan latihan resmi Bintang JLPT (tentukan pilihan yang menempati posisi ★).',
      targetEn: 'Sentence ordering star drills (＿＿ ＿＿ ★ ＿＿) under exam timer',
      targetId: 'Latihan susun urutan kata bintang (＿＿ ＿＿ ★ ＿＿) berwaktu ujian',
      actionEn: 'Take Star Practice Exam (語順総合演習)',
      actionId: 'Mulai Ujian Simulasi Bintang (語順総合演習)',
      lessonType: 'practice_exam',
      lessonId: 'les_n5_exam_star'
    }
  ],
  jlpt_n4: [
    {
      stage: 1,
      badgeEn: 'Stage 1 • Potential Verbs',
      badgeId: 'Tahap 1 • Bentuk Potensial',
      titleEn: 'Potential Form Transformations (書ける・話せる・泳げる)',
      titleId: 'Transformasi Bentuk Potensial (書ける・話せる・泳げる)',
            descEn: 'Master potential verb morphology across all 3 verb groups and the critical object particle shift from を to が.',
      descId: 'Kuasai perubahan morfologi kata kerja potensial pada ketiga kelompok kata kerja dan pergeseran partikel objek dari を menjadi が.',
      targetEn: 'Potential verb conjugations (読める, 食べられる, 来られる) & particle が',
      targetId: 'Konjugasi kata kerja potensial (読める, 食べられる, 来られる) & partikel が',
      actionEn: 'Start N4 Potential Drill',
      actionId: 'Mulai Latihan Potensial N4',
      lessonType: 'grammar_lesson',
      lessonId: 'les_n4_gram_1'
    },
    {
      stage: 2,
      badgeEn: 'Stage 2 • Benefactives',
      badgeId: 'Tahap 2 • Ungkapan Memberi & Menerima',
      titleEn: 'Benefactive Verbs of Giving & Receiving (てあげる・てもらう・てくれる)',
      titleId: 'Verba Budi Baik Memberi & Menerima (てあげる・てもらう・てくれる)',
            descEn: 'Navigate relational deference and the direction of favors between speaker, in-group members, and third parties.',
      descId: 'Pahami arah budi baik dan kesopanan relasional antara pembicara, kelompok sendiri, dan pihak ketiga.',
      targetEn: 'Correct usage of てくれる vs てもらう vs てあげる in social contexts',
      targetId: 'Penggunaan tepat てくれる vs てもらう vs てあげる dalam konteks sosial',
      actionEn: 'Start N4 Benefactives Drill',
      actionId: 'Mulai Latihan Memberi & Menerima N4',
      lessonType: 'grammar_lesson',
      lessonId: 'les_n4_gram_2'
    },
    {
      stage: 3,
      badgeEn: 'Stage 3 • Society Kanji',
      badgeId: 'Tahap 3 • Kanji Kehidupan Sosial',
      titleEn: 'Everyday Society Kanji (会, 社, 言, 食)',
      titleId: 'Kanji Masyarakat Sehari-hari (会, 社, 言, 食)',
            descEn: 'Learn essential kanji for work and society with full vector stroke order and high-frequency compound vocabulary.',
      descId: 'Pelajari kanji penting untuk dunia kerja dan masyarakat lengkap dengan urutan goresan vektor dan kata majemuk umum.',
      targetEn: 'Writing and recognition of 会社, 計画, 言葉, 飲食',
      targetId: 'Penulisan dan pengenalan kata 会社, 計画, 言葉, 飲食',
      actionEn: 'Practice N4 Kanji (会社・言)',
      actionId: 'Latihan Kanji N4 (会社・言)',
      lessonType: 'kanji_writing',
      lessonId: 'les_n4_vocab_1'
    },
    {
      stage: 4,
      badgeEn: 'Stage 4 • Life Rules Reading',
      badgeId: 'Tahap 4 • Membaca Peraturan Tempat Tinggal',
      titleEn: 'Apartment Garbage Rules & Clinic Notices',
      titleId: 'Aturan Pembuangan Sampah Apartemen & Jadwal Klinik',
            descEn: 'Extract specific operational rules, time constraints, and warnings from authentic Japanese apartment directives.',
      descId: 'Ekstraksi aturan operasional spesifik, batasan waktu, dan peringatan dari pengumuman apartemen Jepang autentik.',
      targetEn: 'Interpreting sorting categories, collection mornings, and bulky waste rules',
      targetId: 'Memahami kategori pemilahan, jadwal pengangkutan, dan limbah besar',
      actionEn: 'Start N4 Reading Drill',
      actionId: 'Mulai Latihan Membaca N4',
      lessonType: 'reading_drill',
      lessonId: 'les_n4_read_1'
    },
    {
      stage: 5,
      badgeEn: 'Stage 5 • Workplace Listening',
      badgeId: 'Tahap 5 • Menyimak Instruksi Kerja',
      titleEn: 'Office Meeting Preparation & Priority Sequencing',
      titleId: 'Persiapan Rapat Kantor & Urutan Prioritas Tugas',
            descEn: 'Listen to supervisor-subordinate dialogue and pinpoint immediate first actions versus deferred tasks.',
      descId: 'Dengarkan dialog atasan-bawahan dan tentukan tindakan prioritas pertama dibandingkan tugas yang ditunda.',
      targetEn: 'Discerning sequential priority commands (先に〜する, 〜の前に)',
      targetId: 'Membedakan perintah prioritas berurutan (先に〜する, 〜の前に)',
      actionEn: 'Start N4 Listening Drill',
      actionId: 'Mulai Latihan Menyimak N4',
      lessonType: 'listening_comprehension',
      lessonId: 'les_n4_listen_1'
    },
    {
      stage: 6,
      badgeEn: 'Stage 6 • Complex Sentence Exam',
      badgeId: 'Tahap 6 • Ujian Kalimat Majemuk Bintang',
      titleEn: 'N4 Star Exam: Conditional Clauses & Complex Synthesis',
      titleId: 'Ujian Bintang N4: Klausa Pengandaian & Sintesis Kalimat',
            descEn: 'Complete official N4 syntax puzzles with conditional connectors (〜たら, 〜ば, 〜ても) under timed exam conditions.',
      descId: 'Selesaikan teka-teki sintaksis N4 resmi dengan kata hubung pengandaian (〜たら, 〜ば, 〜ても) dalam ujian berwaktu.',
      targetEn: 'Mastery of N4 star position puzzles and multi-clause word order',
      targetId: 'Penguasaan teka-teki posisi bintang N4 dan urutan kata multi-klausa',
      actionEn: 'Take N4 Star Exam',
      actionId: 'Mulai Ujian Bintang N4',
      lessonType: 'practice_exam',
      lessonId: 'les_n4_exam_star'
    }
  ],
  jlpt_n3: [
    {
      stage: 1,
      badgeEn: 'Stage 1 • Contrast Patterns',
      badgeId: 'Tahap 1 • Pola Kontras',
      titleEn: 'Contrast Markers: に対して vs 反面 vs に比べて',
      titleId: 'Pola Kontras: に対して vs 反面 vs に比べて',
            descEn: 'Differentiate between comparing two separate entities (に対して) and balancing two contradictory aspects of the same subject (反面).',
      descId: 'Bedakan perbandingan antara dua subjek terpisah (に対して) dan dua aspek kontradiktif dari subjek yang sama (反面).',
      targetEn: 'Precision in nuanced intermediate contrast connectors',
      targetId: 'Ketepatan dalam memilih kata hubung kontras tingkat menengah',
      actionEn: 'Start N3 Contrast Drill',
      actionId: 'Mulai Latihan Kontras N3',
      lessonType: 'grammar_lesson',
      lessonId: 'les_n3_gram_1'
    },
    {
      stage: 2,
      badgeEn: 'Stage 2 • Conjectural Modality',
      badgeId: 'Tahap 2 • Modalitas Dugaan & Kepastian',
      titleEn: 'Logical Impossibility & Certainty (わけがない・に違いない)',
      titleId: 'Kemustahilan Logis & Kepastian (わけがない・に違いない)',
            descEn: 'Express strong logical deductions, impossibility based on character, and inevitable outcomes.',
      descId: 'Ekspresikan deduksi logis yang kuat, kemustahilan berdasarkan alasan logis, dan kepastian tak terelakkan.',
      targetEn: 'Evaluating logical modality markers under varying degrees of certainty',
      targetId: 'Mengevaluasi penanda modalitas logis dalam berbagai tingkat kepastian',
      actionEn: 'Start N3 Modality Drill',
      actionId: 'Mulai Latihan Modalitas N3',
      lessonType: 'grammar_lesson',
      lessonId: 'les_n3_gram_2'
    },
    {
      stage: 3,
      badgeEn: 'Stage 3 • Intermediate Kanji',
      badgeId: 'Tahap 3 • Kanji Tingkat Menengah',
      titleEn: 'Abstract Concepts Kanji (対, 面, 政, 策)',
      titleId: 'Kanji Konsep Abstrak (対, 面, 政, 策)',
            descEn: 'Master stroke order and native collocations for abstract intermediate kanji: 政策, 契約, 改善, 傾向.',
      descId: 'Kuasai urutan goresan dan kolokasi alami untuk kanji abstrak tingkat menengah: 政策, 契約, 改善, 傾向.',
      targetEn: 'Vector stroke precision and compound jukugo mastery for N3',
      targetId: 'Presisi goresan vektor dan penguasaan kata majemuk jukugo N3',
      actionEn: 'Practice N3 Kanji',
      actionId: 'Latihan Kanji N3',
      lessonType: 'kanji_writing',
      lessonId: 'les_n3_vocab_1'
    },
    {
      stage: 4,
      badgeEn: 'Stage 4 • Opinion Editorial',
      badgeId: 'Tahap 4 • Membaca Opini & Editorial',
      titleEn: 'Flextime Work Reform & Employee Autonomy',
      titleId: 'Reformasi Jam Kerja Fleksibel & Otonomi Pekerja',
            descEn: 'Analyze an expository corporate article evaluating the benefits and organizational productivity risks of flextime.',
      descId: 'Analisis artikel opini perusahaan yang mengevaluasi manfaat dan risiko produktivitas dari sistem jam kerja fleksibel.',
      targetEn: 'Grasping the author\'s thesis, supporting caveats, and necessary solutions',
      targetId: 'Memahami tesis penulis, sanggahan pendukung, dan solusi esensial',
      actionEn: 'Start N3 Reading Drill',
      actionId: 'Mulai Latihan Membaca N3',
      lessonType: 'reading_drill',
      lessonId: 'les_n3_read_1'
    },
    {
      stage: 5,
      badgeEn: 'Stage 5 • Negotiation Listening',
      badgeId: 'Tahap 5 • Menyimak Negosiasi Jadwal',
      titleEn: 'Marketing Launch Negotiation & Schedule Adjustments',
      titleId: 'Negosiasi Peluncuran Pemasaran & Penyesuaian Jadwal',
            descEn: 'Track multi-speaker dialogue between department head and project lead resolving delays in promotional materials.',
      descId: 'Lacak dialog banyak pihak antara kepala bagian dan pimpinan proyek menyelesaikan keterlambatan materi promosi.',
      targetEn: 'Isolating which milestone changes versus which remains on schedule',
      targetId: 'Menentukan jadwal mana yang berubah versus yang tetap sesuai rencana',
      actionEn: 'Start N3 Listening Drill',
      actionId: 'Mulai Latihan Menyimak N3',
      lessonType: 'listening_comprehension',
      lessonId: 'les_n3_listen_1'
    },
    {
      stage: 6,
      badgeEn: 'Stage 6 • Intermediate Star Exam',
      badgeId: 'Tahap 6 • Ujian Bintang Tingkat Menengah',
      titleEn: 'N3 Star Exam: Discourse Connectors & Clause Synthesis',
      titleId: 'Ujian Bintang N3: Kata Hubung Wacana & Sintesis Klausa',
            descEn: 'Validate your grasp of nuanced intermediate connectors under standard timed JLPT N3 conditions.',
      descId: 'Validasi penguasaan konjungsi tingkat menengah bernuansa dalam simulasi resmi ujian berwaktu JLPT N3.',
      targetEn: 'Correct sentence ordering across complex compound sentences',
      targetId: 'Urutan kalimat benar pada kalimat majemuk tingkat menengah',
      actionEn: 'Take N3 Star Exam',
      actionId: 'Mulai Ujian Bintang N3',
      lessonType: 'practice_exam',
      lessonId: 'les_n3_exam_star'
    }
  ],
  jlpt_n2: [
    {
      stage: 1,
      badgeEn: 'Stage 1 • High Modality',
      badgeId: 'Tahap 1 • Modalitas Tingkat Tinggi',
      titleEn: 'Definitive Assertion & Compulsion (にほかならない・余儀なくされる)',
      titleId: 'Penegasan Otoritatif & Tindakan Terpaksa (にほかならない・余儀なくされる)',
            descEn: 'Master formal literary markers expressing absolute attribution of cause and actions forced by severe circumstances.',
      descId: 'Kuasai penanda ragam bahasa formal untuk menegaskan sebab mutlak dan tindakan yang terpaksa dilakukan karena keadaan genting.',
      targetEn: 'Precision in authoritative written Japanese grammatical modalities',
      targetId: 'Ketepatan dalam modalitas tata bahasa tulisan formal tingkat tinggi',
      actionEn: 'Start N2 Modality Drill',
      actionId: 'Mulai Latihan Modalitas N2',
      lessonType: 'grammar_lesson',
      lessonId: 'les_n2_gram_1'
    },
    {
      stage: 2,
      badgeEn: 'Stage 2 • Discourse Frameworks',
      badgeId: 'Tahap 2 • Kerangka Kerja Wacana Formal',
      titleEn: 'Policy Catalysts & Statutory Criteria (を契機に・に基づいて)',
      titleId: 'Pemicu Kebijakan & Landasan Hukum (を契機に・に基づいて)',
            descEn: 'Connect corporate milestones and legal frameworks with sophisticated prepositional structures.',
      descId: 'Hubungkan momentum korporasi dan landasan hukum dengan struktur preposisi formal tingkat lanjut.',
      targetEn: 'Mastery of を契機に, に基づいて, and をめぐって in business prose',
      targetId: 'Penguasaan を契機に, に基づいて, dan をめぐって dalam teks bisnis',
      actionEn: 'Start N2 Discourse Drill',
      actionId: 'Mulai Latihan Wacana N2',
      lessonType: 'grammar_lesson',
      lessonId: 'les_n2_gram_2'
    },
    {
      stage: 3,
      badgeEn: 'Stage 3 • Analytical Kanji',
      badgeId: 'Tahap 3 • Kanji Analitis Bisnis',
      titleEn: 'Corporate & Legal Kanji (把, 握, 契, 約)',
      titleId: 'Kanji Bisnis & Hukum (把, 握, 契, 約)',
            descEn: 'Master complex stroke paths and professional idioms for 把握, 概況, 遵守.',
      descId: 'Kuasai goresan rumit dan idiom profesional untuk 把握, 概況, 遵守.',
      targetEn: 'Precision stroke execution for N2 business Joyo kanji',
      targetId: 'Eksekusi goresan presisi untuk kanji Joyo bisnis N2',
      actionEn: 'Practice N2 Kanji',
      actionId: 'Latihan Kanji N2',
      lessonType: 'kanji_writing',
      lessonId: 'les_n2_vocab_1'
    },
    {
      stage: 4,
      badgeEn: 'Stage 4 • Management Thesis',
      badgeId: 'Tahap 4 • Tesis Manajemen & Organisasi',
      titleEn: 'Tacit Knowledge Transfer in Remote Organizations',
      titleId: 'Pewarisan Pengetahuan Tak Berwujud dalam Kerja Jarak Jauh',
            descEn: 'Read Polanyi\'s epistemological theory applied to digital communication in modern enterprises.',
      descId: 'Pelajari teori epistemologi Polanyi yang diterapkan pada komunikasi digital di korporasi modern.',
      targetEn: 'Synthesizing abstract academic prose on tacit knowledge loss',
      targetId: 'Menganalisis wacana akademis abstrak mengenai hambatan transfer pengetahuan',
      actionEn: 'Start N2 Reading Drill',
      actionId: 'Mulai Latihan Membaca N2',
      lessonType: 'reading_drill',
      lessonId: 'les_n2_read_1'
    },
    {
      stage: 5,
      badgeEn: 'Stage 5 • Strategy Dialogue',
      badgeId: 'Tahap 5 • Menyimak Diskusi Strategi',
      titleEn: 'Enterprise Cloud Modernization Executive Meeting',
      titleId: 'Rapat Direksi Modernisasi Cloud Sistem Korporasi',
            descEn: 'Listen to C-level discussions on legacy ERP deprecation, data integrity, and phased migration.',
      descId: 'Dengarkan diskusi dewan direksi mengenai penonaktifan ERP lama, integritas data, dan migrasi bertahap.',
      targetEn: 'Tracking strategic decisions and compromise technical roadmaps',
      targetId: 'Melacak keputusan strategis dan peta jalan teknis kompromi',
      actionEn: 'Start N2 Listening Drill',
      actionId: 'Mulai Latihan Menyimak N2',
      lessonType: 'listening_comprehension',
      lessonId: 'les_n2_listen_1'
    },
    {
      stage: 6,
      badgeEn: 'Stage 6 • Business Star Exam',
      badgeId: 'Tahap 6 • Ujian Bintang Kalimat Bisnis',
      titleEn: 'N2 Star Exam: Business Syntax & Subordination',
      titleId: 'Ujian Bintang N2: Sintaksis Bisnis & Klausa Bertingkat',
            descEn: 'Solve complex clause embedding puzzles representing actual N2 examination standard questions.',
      descId: 'Selesaikan teka-teki penyusunan klausa majemuk bertingkat yang mencerminkan standar asli ujian JLPT N2.',
      targetEn: 'Advanced multi-phrase sentence ordering under exam conditions',
      targetId: 'Urutan kalimat multi-frasa tingkat tinggi dalam simulasi ujian',
      actionEn: 'Take N2 Star Exam',
      actionId: 'Mulai Ujian Bintang N2',
      lessonType: 'practice_exam',
      lessonId: 'les_n2_exam_star'
    }
  ],
  jlpt_n1: [
    {
      stage: 1,
      badgeEn: 'Stage 1 • Extreme Registers',
      badgeId: 'Tahap 1 • Ragam Bahasa Formal Ekstrem',
      titleEn: 'Classical Residues: 極まりない & 皮切りに',
      titleId: 'Warisan Ragam Klasik: 極まりない & 皮切りに',
            descEn: 'Command literary nuances expressing insurmountable limits and prominent ceremonial inaugurations.',
      descId: 'Kuasai nuansa sastra tinggi yang menyatakan batas puncak tanpa tara dan pembukaan seremoni bersejarah.',
      targetEn: 'Flawless distinction between 極まりない, 皮切りに, and んばかりに',
      targetId: 'Ketepatan mutlak membedakan 極まりない, 皮切りに, dan んばかりに',
      actionEn: 'Start N1 Extreme Registers',
      actionId: 'Mulai Latihan Ragam Ekstrem N1',
      lessonType: 'grammar_lesson',
      lessonId: 'les_n1_gram_1'
    },
    {
      stage: 2,
      badgeEn: 'Stage 2 • Normative Restraint',
      badgeId: 'Tahap 2 • Pengekangan Emosional & Syarat Mutlak',
      titleEn: 'Uncontrollable Affect & Universality (を禁じ得ない・であれ)',
      titleId: 'Luapan Afektif & Syarat Universal (を禁じ得ない・であれ)',
            descEn: 'Express profound uncontrollable emotional responses and categorical imperative principles.',
      descId: 'Ekspresikan luapan perasaan mendalam yang tak terbendung dan prinsip imperatif kategoris.',
      targetEn: 'Complex rhetorical syntax in prestigious formal discourse',
      targetId: 'Sintaksis retorika formal tingkat tertinggi dalam wacana bergengsi',
      actionEn: 'Start N1 Restraint Drill',
      actionId: 'Mulai Latihan Pengekangan N1',
      lessonType: 'grammar_lesson',
      lessonId: 'les_n1_gram_2'
    },
    {
      stage: 3,
      badgeEn: 'Stage 3 • Scholarly Kanji',
      badgeId: 'Tahap 3 • Kanji Ilmiah Puncak',
      titleEn: 'Scholarly Nuance Kanji (示, 唆, 緻, 密)',
      titleId: 'Kanji Nuansa Ilmiah (示, 唆, 緻, 密)',
            descEn: 'Master intricate stroke calligraphy for sophisticated analytical kanji: 示唆, 緻密, 脆弱, 俯瞰.',
      descId: 'Kuasai kaligrafi goresan rumit untuk kanji analitis canggih: 示唆, 緻密, 脆弱, 俯瞰.',
      targetEn: 'Exemplary vector handwriting for N1 academic Joyo kanji',
      targetId: 'Penulisan vektor kaligrafi sempurna untuk kanji Joyo akademis N1',
      actionEn: 'Practice N1 Kanji',
      actionId: 'Latihan Kanji N1',
      lessonType: 'kanji_writing',
      lessonId: 'les_n1_vocab_1'
    },
    {
      stage: 4,
      badgeEn: 'Stage 4 • Epistemology Reading',
      badgeId: 'Tahap 4 • Membaca Filsafat & Epistemologi',
      titleEn: 'Linguistic Determinism & Structural Semiotics',
      titleId: 'Determinisme Linguistik & Semiotika Struktural',
            descEn: 'Critically analyze Saussurean arbitrariness and cognitive linguistic evidence on grammatical worldview framing.',
      descId: 'Analisis kritis konsep arbitrer Saussure dan bukti sains kognitif mengenai pengaruh tata bahasa pada persepsi realitas.',
      targetEn: 'Comprehending dense, high-level philosophical discourse',
      targetId: 'Memahami teks filosofis padat berbobot tinggi tanpa distorsi',
      actionEn: 'Start N1 Reading Drill',
      actionId: 'Mulai Latihan Membaca N1',
      lessonType: 'reading_drill',
      lessonId: 'les_n1_read_1'
    },
    {
      stage: 5,
      badgeEn: 'Stage 5 • Symposium Listening',
      badgeId: 'Tahap 5 • Menyimak Debat Simposium',
      titleEn: 'AI Ethics & Epistemic Agency Symposium',
      titleId: 'Simposium Etika AI & Agensi Epistemik Otonom',
            descEn: 'Follow an unscripted keynote academic debate discussing model explainability and strict legal liability.',
      descId: 'Ikuti debat akademis tingkat tinggi membahas transparansi model kecerdasan buatan dan pertanggungjawaban hukum.',
      targetEn: 'Discerning nuanced philosophical arguments under rapid delivery',
      targetId: 'Menangkap argumen filosofis bernuansa dalam tuturan cepat berbobot',
      actionEn: 'Start N1 Listening Drill',
      actionId: 'Mulai Latihan Menyimak N1',
      lessonType: 'listening_comprehension',
      lessonId: 'les_n1_listen_1'
    },
    {
      stage: 6,
      badgeEn: 'Stage 6 • Supreme Star Exam',
      badgeId: 'Tahap 6 • Ujian Bintang Puncak N1',
      titleEn: 'N1 Supreme Star Exam: Historical Syntax & Rhetoric',
      titleId: 'Ujian Bintang Puncak N1: Sintaksis Sastra & Retorika Klasik',
            descEn: 'Solve supreme-level sentence puzzles demanding mastery of classical grammatical remnants.',
      descId: 'Pecahkan teka-teki kalimat tingkat tertinggi yang menuntut penguasaan tuntas sisa-sisa sintaksis klasik.',
      targetEn: 'Perfect syntax execution for N1 Star examination questions',
      targetId: 'Eksekusi urutan kalimat sempurna untuk soal Bintang ujian resmi N1',
      actionEn: 'Take N1 Supreme Exam',
      actionId: 'Mulai Ujian Puncak N1',
      lessonType: 'practice_exam',
      lessonId: 'les_n1_exam_star'
    }
  ],
  ielts_academic: [
    {
      stage: 1,
      badgeEn: 'Stage 1 • Section 1 Reading',
      badgeId: 'Tahap 1 • Membaca Bagian 1',
      titleEn: 'Cognitive Architecture of Bilingualism',
      titleId: 'Arsitektur Kognitif Kedwibahasaan',
            descEn: 'Analyze a 700-word neuroscience text on executive function, inhibitory control, and delay of degenerative dementia.',
      descId: 'Analisis teks neurosains 700 kata tentang fungsi eksekutif, kontrol inhibisi, dan penundaan demensia degeneratif.',
      targetEn: 'Matching Headings, True/False/Not Given, and Sentence Completion',
      targetId: 'Mencocokkan Judul Bagian, Benar/Salah/Tidak Disebutkan, dan Melengkapi Kalimat',
      actionEn: 'Start Passage 1 Drill',
      actionId: 'Mulai Latihan Teks 1',
      lessonType: 'reading_drill',
      lessonId: 'les_ia_read_1'
    },
    {
      stage: 2,
      badgeEn: 'Stage 2 • Section 2 Reading',
      badgeId: 'Tahap 2 • Membaca Bagian 2',
      titleEn: 'Passive Cooling & Urban Microclimates',
      titleId: 'Pendinginan Pasif & Iklim Mikro Perkotaan',
            descEn: 'Evaluate engineering literature on urban heat island mitigation, high-albedo coatings, and Mean Radiant Temperature.',
      descId: 'Evaluasi literatur rekayasa teknik tentang mitigasi pulau panas perkotaan, pelapis albedo tinggi, dan suhu radiasi rata-rata.',
      targetEn: 'Multiple Choice, True/False/Not Given, and Cause-Effect deductions',
      targetId: 'Pilihan Ganda, Benar/Salah/Tidak Disebutkan, dan Deduksi Sebab-Akibat',
      actionEn: 'Start Passage 2 Drill',
      actionId: 'Mulai Latihan Teks 2',
      lessonType: 'reading_drill',
      lessonId: 'les_ia_read_2'
    },
    {
      stage: 3,
      badgeEn: 'Stage 3 • Section 3 Reading',
      badgeId: 'Tahap 3 • Membaca Bagian 3',
      titleEn: 'Epistemology & Archaeological Stratigraphy',
      titleId: 'Epistemologi & Stratigrafi Arkeologi',
            descEn: 'Master complex historical argumentation examining the Harris Matrix, bioturbation hazards, and human intentionality.',
      descId: 'Kuasai argumentasi sejarah rumit yang meneliti Matriks Harris, gangguan bioturbasi, dan rekonstruksi intensi manusia.',
      targetEn: 'Advanced epistemological question batteries with zero ambiguity',
      targetId: 'Baterai soal epistemologi tingkat lanjut dengan ketepatan mutlak',
      actionEn: 'Start Passage 3 Drill',
      actionId: 'Mulai Latihan Teks 3',
      lessonType: 'reading_drill',
      lessonId: 'les_ia_read_3'
    },
    {
      stage: 4,
      badgeEn: 'Stage 4 • Academic Listening',
      badgeId: 'Tahap 4 • Menyimak Akademik',
      titleEn: 'Laboratory Facility Booking & Safety Inductions',
      titleId: 'Pemesanan Fasilitas Lab & Sertifikasi Keselamatan',
            descEn: 'Track detailed technical requirements, safety induction prerequisite codes, and cryogenic calibration schedules.',
      descId: 'Lacak syarat teknis terperinci, kode prasyarat induksi keselamatan, dan jadwal kalibrasi kriogenik.',
      targetEn: 'Accurate note completion, numeric times, and alpha-numeric codes',
      targetId: 'Pencatatan informasi akurat, jam angka, dan kode alfanumerik',
      actionEn: 'Start Lab Listening Drill',
      actionId: 'Mulai Latihan Menyimak Lab',
      lessonType: 'listening_comprehension',
      lessonId: 'les_ia_listen_1'
    },
    {
      stage: 5,
      badgeEn: 'Stage 5 • Task 1 Synthesis',
      badgeId: 'Tahap 5 • Penulisan Sintesis Data Task 1',
      titleEn: 'Comparative Renewable Energy Matrix Report',
      titleId: 'Laporan Perbandingan Matriks Energi Terbarukan',
            descEn: 'Compose a 150-word synthesis contrasting multi-regional gigawatt output across solar, wind, and hydroelectric infrastructure.',
      descId: 'Susun laporan sintesis 150 kata yang membandingkan kapasitas gigawatt energi surya, angin, dan hidro lintas kawasan.',
      targetEn: 'Band 7.5+ criteria: Overview, factual grouping, zero personal bias',
      targetId: 'Kriteria Band 7.5+: Ikhtisar jelas, pengelompokan data, tanpa opini pribadi',
      actionEn: 'Open Task 1 Studio',
      actionId: 'Buka Studio Task 1',
      lessonType: 'writing_task',
      lessonId: 'les_ia_write_1'
    },
    {
      stage: 6,
      badgeEn: 'Stage 6 • Task 2 Argumentation',
      badgeId: 'Tahap 6 • Penulisan Esai Argumen Task 2',
      titleEn: 'AI Autonomy in Higher Education Discursive Essay',
      titleId: 'Esai Wacana Otonomi AI dalam Pendidikan Tinggi',
            descEn: 'Write a comprehensive 250-word argumentative essay evaluated across all 4 official IELTS assessment criteria.',
      descId: 'Tulis esai argumentatif 250 kata berbobot yang dievaluasi berdasarkan 4 kriteria penilaian resmi IELTS.',
      targetEn: 'Coherence, lexical resource, grammatical range, task response',
      targetId: 'Koherensi, kekayaan leksikal, rentang tata bahasa, pemenuhan tugas',
      actionEn: 'Open Task 2 Studio',
      actionId: 'Buka Studio Task 2',
      lessonType: 'writing_task',
      lessonId: 'les_ia_write_2'
    },
    {
      stage: 7,
      badgeEn: 'Stage 7 • Official Computer-Delivered Mock Exam',
      badgeId: 'Tahap 7 • Ujian Simulasi Resmi Computer-Delivered',
      titleEn: 'Official Computer-Delivered IELTS Academic Mock Exam (Full 40 Questions)',
      titleId: 'Ujian Resmi Computer-Delivered IELTS Akademik (Simulasi Lengkap 40 Soal)',
      descEn: 'Take the full 40-question official computer-delivered IELTS simulation under strict 60-minute time constraints and proctoring.',
      descId: 'Ikuti simulasi resmi computer-delivered IELTS 40 soal penuh dengan batas waktu 60 menit ketat dan sistem pengawasan.',
      targetEn: 'Official 9-Band scale calculation, 3 passages, anti-cheat proctoring',
      targetId: 'Penghitungan skor skala 9-Band resmi, 3 teks panjang, pengawasan anti-curang',
      actionEn: 'Launch Official Mock Exam',
      actionId: 'Mulai Ujian Simulasi Resmi',
      lessonType: 'mock_exam',
      lessonId: 'les_ia_mock_full_1'
    }
  ],
  ielts_general: [
    {
      stage: 1,
      badgeEn: 'Stage 1 • Section 1 Survival Reading',
      badgeId: 'Tahap 1 • Membaca Bertahan Hidup Bagian 1',
      titleEn: 'Workplace Ergonomics & Tenant Heating Protocols',
      titleId: 'Ergonomi Tempat Kerja & Protokol Pemanas Penyewa',
            descEn: 'Retrieve operational instructions from occupational health directives and emergency heating procedures.',
      descId: 'Temukan instruksi operasional dari standar keselamatan kerja DSE dan prosedur darurat pemanas gedung.',
      targetEn: 'Short-answer extraction and factual condition verification',
      targetId: 'Ekstraksi jawaban singkat dan verifikasi kondisi faktual',
      actionEn: 'Start Section 1 Drill',
      actionId: 'Mulai Latihan Bagian 1',
      lessonType: 'reading_drill',
      lessonId: 'les_ig_read_1'
    },
    {
      stage: 2,
      badgeEn: 'Stage 2 • Section 2 Workplace Policies',
      badgeId: 'Tahap 2 • Membaca Kebijakan Tempat Kerja Bagian 2',
      titleEn: 'Statutory Parental Leave & Grievance Procedures',
      titleId: 'Cuti Orang Tua Resmi & Prosedur Pengaduan HR',
            descEn: 'Navigate corporate handbook clauses detailing statutory service qualifications, leave notices, and formal dispute timetables.',
      descId: 'Pahami aturan buku panduan perusahaan mengenai kualifikasi masa kerja, pemberitahuan cuti, dan jadwal pengaduan resmi.',
      targetEn: 'True/False/Not Given and advance notice period calculations',
      targetId: 'Benar/Salah/Tidak Disebutkan dan perhitungan masa pemberitahuan awal',
      actionEn: 'Start Section 2 Drill',
      actionId: 'Mulai Latihan Bagian 2',
      lessonType: 'reading_drill',
      lessonId: 'les_ig_read_2'
    },
    {
      stage: 3,
      badgeEn: 'Stage 3 • Section 3 Extended Prose',
      badgeId: 'Tahap 3 • Membaca Wacana Luas Bagian 3',
      titleEn: 'The Industrial Heritage & Revival of Inland Canals',
      titleId: 'Warisan Industri & Kebangkitan Kanal Air Pedalaman',
            descEn: 'Read extended descriptive prose tracing historical freight corridors, railway obsolescence, and volunteer restoration.',
      descId: 'Baca wacana deskriptif panjang mengenai koridor transportasi revolusi industri, kemunduran akibat kereta api, dan restorasi relawan.',
      targetEn: 'Chronological tracking and reading comprehension across extended text',
      targetId: 'Pemahaman kronologis dan analisis wacana pada teks panjang',
      actionEn: 'Start Section 3 Drill',
      actionId: 'Mulai Latihan Bagian 3',
      lessonType: 'reading_drill',
      lessonId: 'les_ig_read_3'
    },
    {
      stage: 4,
      badgeEn: 'Stage 4 • Social Listening',
      badgeId: 'Tahap 4 • Menyimak Situasi Sosial',
      titleEn: 'Community Leisure Centre Membership Dialogue',
      titleId: 'Keanggotaan Pusat Olahraga Komunitas',
            descEn: 'Extract subscription tier prices, locker inclusions, and early bird swimming schedules from natural conversational English.',
      descId: 'Dengarkan harga tingkatan langganan, fasilitas loker, dan jadwal renang pagi dari percakapan bahasa Inggris alami.',
      targetEn: 'Accurate identification of prices, schedules, and membership tiers',
      targetId: 'Identifikasi akurat biaya langganan, jadwal, dan kategori anggota',
      actionEn: 'Start Leisure Listening Drill',
      actionId: 'Mulai Latihan Menyimak Komunitas',
      lessonType: 'listening_comprehension',
      lessonId: 'les_ig_listen_1'
    },
    {
      stage: 5,
      badgeEn: 'Stage 5 • Task 1 Formal Letter',
      badgeId: 'Tahap 5 • Penulisan Surat Resmi Task 1',
      titleEn: 'Formal Appliance Complaint & Redress Letter',
      titleId: 'Surat Pengaduan Resmi & Tuntutan Ganti Rugi',
            descEn: 'Compose a structured, formal business letter articulating purchase defects, past repair failures, and demanded remedies.',
      descId: 'Tulis surat bisnis formal yang menguraikan cacat produk, kegagalan perbaikan terdahulu, dan tuntutan ganti rugi yang sah.',
      targetEn: 'Register calibration, professional tone, and complete bullet coverage',
      targetId: 'Kesesuaian ragam bahasa, nada profesional, dan pemenuhan seluruh poin',
      actionEn: 'Open Letter Studio',
      actionId: 'Buka Studio Surat Resmi',
      lessonType: 'writing_task',
      lessonId: 'les_ig_write_1'
    },
    {
      stage: 6,
      badgeEn: 'Stage 6 • Task 2 Social Essay',
      badgeId: 'Tahap 6 • Penulisan Esai Sosial Task 2',
      titleEn: 'Public Transit Subsidies vs Highway Expansion Essay',
      titleId: 'Esai Subsidi Transportasi Umum vs Ekspansi Jalan Tol',
            descEn: 'Write a persuasive essay comparing government subsidies for public rail against spending on private vehicle highways.',
      descId: 'Tulis esai persuasif membandingkan subsidi pemerintah untuk kereta api umum melawan pengeluaran ekspansi jalan raya pribadi.',
      targetEn: 'Structured argumentation, real-world examples, and clear personal stance',
      targetId: 'Argumen terstruktur, contoh dunia nyata, dan sikap pribadi yang tegas',
      actionEn: 'Open Social Essay Studio',
      actionId: 'Buka Studio Esai Sosial',
      lessonType: 'writing_task',
      lessonId: 'les_ig_write_2'
    },
    {
      stage: 7,
      badgeEn: 'Stage 7 • Full General Training Mock Exam',
      badgeId: 'Tahap 7 • Ujian Simulasi Lengkap General Training',
      titleEn: 'Complete 40-Question General Training Simulation (60 Mins)',
      titleId: 'Simulasi Lengkap 40 Soal General Training (60 Menit)',
      descEn: 'Experience the full timed General Training examination measuring workplace and general literacy across all 3 sections.',
      descId: 'Rasakan simulasi ujian General Training berwaktu penuh yang mengukur literasi kerja dan umum di 3 bagian.',
      targetEn: 'Strict timed assessment with automated band score calculation',
      targetId: 'Penilaian waktu ketat dengan kalkulasi skor band otomatis',
      actionEn: 'Launch General Mock Exam',
      actionId: 'Mulai Ujian General',
      lessonType: 'mock_exam',
      lessonId: 'les_ia_mock_full_1'
    }
  ]
};

function getLocalizedLevelTitle(title: string, lang: string, track: string): string {
  if (lang !== 'id') return title;
  const LEVEL_NAMES_ID: Record<string, string> = {
    jlpt_n5: 'JLPT N5 (Pemula Dasar)',
    jlpt_n4: 'JLPT N4 (Komunikasi Dasar)',
    jlpt_n3: 'JLPT N3 (Jembatan Menuju Menengah)',
    jlpt_n2: 'JLPT N2 (Kelancaran Bisnis & Akademik)',
    jlpt_n1: 'JLPT N1 (Tingkat Mahir & Nuansa Tinggi)',
    ielts_academic: 'IELTS Jalur Akademik (Target 7.5+)',
    ielts_general: 'IELTS Pelatihan Umum (Target 7.0+)'
  };
  return LEVEL_NAMES_ID[track] || title;
}

function localizePillarTitle(title: string, lang: string): string {
  if (lang !== 'id' || !title) return title;
  return title
    .replace(/Academic Reading Comprehension/i, 'Pemahaman Membaca Akademik')
    .replace(/Academic Writing Studio/i, 'Studio Menulis Akademik')
    .replace(/Academic Listening Comprehension/i, 'Pemahaman Menyimak Akademik')
    .replace(/General Training Reading Comprehension/i, 'Pemahaman Membaca Pelatihan Umum')
    .replace(/General Practical Correspondence/i, 'Korespondensi Praktis Pelatihan Umum')
    .replace(/General Workplace & Social Listening/i, 'Menyimak Sosial & Tempat Kerja Pelatihan Umum')
    .replace(/Language Knowledge:s*Kanji & Vocabulary/i, 'Pengetahuan Bahasa: Kanji & Kosakata')
    .replace(/Language Knowledge:s*Grammar & Reading/i, 'Pengetahuan Bahasa: Tata Bahasa & Membaca')
    .replace(/Listening Comprehension/i, 'Pemahaman Menyimak');
}

function localizeLessonType(type: string, lang: string): string {
  if (lang !== 'id') return type;
  const TYPE_MAP_ID: Record<string, string> = {
    grammar_lesson: 'Tata Bahasa',
    reading_drill: 'Latihan Membaca',
    listening_comprehension: 'Latihan Menyimak',
    practice_exam: 'Ujian Simulasi',
    kanji_writing: 'Latihan Menulis Huruf',
    writing_task: 'Tugas Menulis Esai'
  };
  return TYPE_MAP_ID[type] || type;
}

export const CurriculumView: React.FC<CurriculumViewProps> = ({
  activeTrack,
  onLaunchLesson,
  onTrackChange
}) => {
  const { renderFurigana } = useFurigana();
  const isJapaneseTrack = activeTrack.startsWith('jlpt_');
  const { t, language } = useLanguage();
  const [curriculum, setCurriculum] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeRoadmapStage, setActiveRoadmapStage] = useState<number>(1);

  useEffect(() => {
    setLoading(true);
    fetchCurriculum(activeTrack)
      .then(data => {
        setCurriculum(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load curriculum', err);
        setLoading(false);
      });
  }, [activeTrack]);

  // Reset to stage 1 when track changes
  useEffect(() => {
    setActiveRoadmapStage(1);
  }, [activeTrack]);

  const pillars = curriculum?.pillars || [];
  const level = curriculum?.level;

  const completedLessonIds = new Set<string>(curriculum?.completedLessonIds || []);
  pillars.forEach((p: any) => {
    p.units?.forEach((u: any) => {
      u.lessons?.forEach((l: any) => {
        if (l.completed) completedLessonIds.add(l.id);
      });
    });
  });

  const currentStages = DYNAMIC_ROADMAPS[activeTrack] || DYNAMIC_ROADMAPS.jlpt_n5;
  const currentStageObj = currentStages[activeRoadmapStage - 1] || currentStages[0];

  return (
    <div className="space-y-6 animate-fadeIn max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="border-b border-washi-300 dark:border-sumi-800 pb-4">
        <div className="flex items-center gap-1.5 text-vermilion-600 dark:text-vermilion-500 text-xs font-semibold mb-1">
          <Layers className="w-4 h-4" />
          <span>{t('curriculum.nav_title')}</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 tracking-tight flex items-center gap-2">
          <span>{getLocalizedLevelTitle(level?.title ? level.title : t('curriculum.default_title'), language, activeTrack)}</span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-vermilion-500/10 text-vermilion-600 dark:text-vermilion-400 font-bold border border-vermilion-500/20">
            {activeTrack.toUpperCase()}
          </span>
        </h1>
        <p className="text-stone-600 dark:text-stone-400 text-xs mt-1">
          {language === 'id' ? 'Kurikulum berstandar internasional yang disesuaikan secara presisi dengan spesifikasi resmi JLPT (N5–N1) dan IELTS (Academic & General).' : 'Standard-aligned international curriculum tailored to official JLPT (N5–N1) and IELTS (Academic & General) frameworks.'}
        </p>
      </div>

      {/* Level Progress Overview */}
      <div className="bg-washi-50 dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold text-stone-500 dark:text-stone-400 block uppercase tracking-wider">
            {language === 'id' ? 'Kemajuan Materi Level Ini' : 'Active Level Progress'}
          </span>
          <span className="text-lg sm:text-xl font-extrabold text-stone-900 dark:text-stone-100 font-mono">
            {curriculum?.levelProgressPct || 0}%
          </span>
          <span className="text-xs text-stone-500 dark:text-stone-400 ml-2">
            {language === 'id'
              ? `(${curriculum?.completedLessonsCount || 0} dari ${curriculum?.totalLessonsCount || 7} materi telah diselesaikan)`
              : `(${curriculum?.completedLessonsCount || 0} of ${curriculum?.totalLessonsCount || 7} lessons completed)`}
          </span>
        </div>
        <div className="w-full sm:w-72 bg-washi-200 dark:bg-sumi-800 h-3 rounded-full overflow-hidden p-0.5 border border-washi-300 dark:border-sumi-750">
          <div
            className="bg-emerald-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${Math.max(curriculum?.completedLessonsCount ? 5 : 0, curriculum?.levelProgressPct || 0)}%` }}
          />
        </div>
      </div>

      {/* Track & Level Quick Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-washi-50 dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-xl p-3 sm:p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-stone-500">{t('dashboard.jp_track')}</span>
          <div className="flex flex-wrap items-center gap-1.5">
            {(['jlpt_n5', 'jlpt_n4', 'jlpt_n3', 'jlpt_n2', 'jlpt_n1'] as LevelCode[]).map(lvl => (
              <button
                key={lvl}
                onClick={() => onTrackChange && onTrackChange(lvl)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                  activeTrack === lvl
                    ? 'bg-vermilion-500 text-white font-semibold shadow-sm'
                    : 'bg-washi-200 dark:bg-sumi-800 text-stone-700 dark:text-stone-300 hover:bg-washi-300 dark:hover:bg-sumi-750'
                }`}
              >
                {lvl.replace('jlpt_', '').toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-stone-500">{t('dashboard.en_track')}</span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onTrackChange && onTrackChange('ielts_academic')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                activeTrack === 'ielts_academic'
                  ? 'bg-vermilion-500 text-white font-semibold shadow-sm'
                  : 'bg-washi-200 dark:bg-sumi-800 text-stone-700 dark:text-stone-300 hover:bg-washi-300 dark:hover:bg-sumi-750'
              }`}
            >
              {t('dashboard.academic')}
            </button>
            <button
              onClick={() => onTrackChange && onTrackChange('ielts_general')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                activeTrack === 'ielts_general'
                  ? 'bg-vermilion-500 text-white font-semibold shadow-sm'
                  : 'bg-washi-200 dark:bg-sumi-800 text-stone-700 dark:text-stone-300 hover:bg-washi-300 dark:hover:bg-sumi-750'
              }`}
            >
              {t('dashboard.general')}
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic 6-Stage Guided Progressive Roadmap (Adapts to Active Level) */}
      <div className="bg-washi-50 dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-2xl p-6 sm:p-7 shadow-sm space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-vermilion-500/10 text-vermilion-600 dark:text-vermilion-400 text-xs font-bold mb-1.5">
            <Compass className="w-3.5 h-3.5" />
            <span>{language === 'id' ? `Peta Panduan 6 Tahap (${activeTrack.toUpperCase()})` : `6-Stage Guided Corridor (${activeTrack.toUpperCase()})`}</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
            {language === 'id' ? 'Tahapan Progresif Belajar Terstruktur' : 'Structured Progressive Learning Roadmap'}
          </h2>
          <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 max-w-2xl">
            {language === 'id' ? 'Setiap tahap memiliki materi latihan tersendiri yang berbeda, terstruktur mulai dari fondasi hingga simulasi ujian komprehensif.' : 'Each stage features its own dedicated, distinct drill—progressing rigorously from foundational skills to timed exam validation.'}
          </p>
        </div>

        {/* Stepper Tabs Bar (1 to 6) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {currentStages.map(s => {
            const isActive = activeRoadmapStage === s.stage;
            return (
              <button
                key={s.stage}
                onClick={() => setActiveRoadmapStage(s.stage)}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  isActive
                    ? 'bg-vermilion-500/10 border-vermilion-500 text-vermilion-700 dark:text-vermilion-400 shadow-sm ring-1 ring-vermilion-500/30'
                    : 'bg-washi-100/60 dark:bg-sumi-850/60 border-washi-200 dark:border-sumi-800 text-stone-700 dark:text-stone-300 hover:bg-washi-200/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-stone-200 dark:bg-sumi-750 text-stone-800 dark:text-stone-200 font-mono">
                    #{s.stage}
                  </span>
                  <div className="flex items-center gap-1">
                    {completedLessonIds.has(s.lessonId) && (
                      <span className="text-[10px] font-bold px-1 py-0.2 rounded bg-emerald-500 text-white flex items-center">
                        ✓
                      </span>
                    )}
                    {isActive && <span className="w-2 h-2 rounded-full bg-vermilion-500" />}
                  </div>
                </div>
                <span className="text-xs font-bold mt-2 line-clamp-1">
                  {language === 'id' ? s.badgeId : s.badgeEn}
                </span>
                {isJapaneseTrack && s.japaneseSub && (
                  <span className="text-[10px] text-stone-500 dark:text-stone-400 font-jp line-clamp-1 mt-0.5">
                    {renderFurigana(s.japaneseSub)}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Card */}
        <div className="bg-white/80 dark:bg-sumi-950/80 rounded-xl border border-washi-300 dark:border-sumi-800 p-5 sm:p-6 space-y-4 shadow-sm animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-washi-200 dark:border-sumi-850 pb-3">
            <div>
              <span className="text-xs font-bold text-vermilion-600 dark:text-vermilion-400 uppercase tracking-wider block">
                {language === 'id' ? `FOKUS TAHAP ${currentStageObj.stage} • ${currentStageObj.badgeId}` : `STAGE ${currentStageObj.stage} FOCUS • ${currentStageObj.badgeEn}`}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 mt-0.5 font-jp">
                {isJapaneseTrack ? renderFurigana(language === 'id' ? currentStageObj.titleId : currentStageObj.titleEn) : (language === 'id' ? currentStageObj.titleId : currentStageObj.titleEn)}
              </h3>
              {isJapaneseTrack && currentStageObj.japaneseSub && (
                <span className="text-xs font-jp text-stone-500 dark:text-stone-400 block mt-0.5">
                  {renderFurigana(currentStageObj.japaneseSub)}
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={() => onLaunchLesson(currentStageObj.lessonType, currentStageObj.lessonId, 'lecture')}
                className="px-3.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
              >
                <GraduationCap className="w-4 h-4" />
                <span>{language === 'id' ? 'Pelajari Teori' : 'Study Theory'}</span>
              </button>
              <button
                onClick={() => onLaunchLesson(currentStageObj.lessonType, currentStageObj.lessonId, 'drill')}
                className="px-3.5 py-2.5 rounded-xl bg-vermilion-500 hover:bg-vermilion-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
              >
                <span>{language === 'id' ? currentStageObj.actionId : currentStageObj.actionEn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-jp">
            {renderFurigana(language === 'id' ? currentStageObj.descId : currentStageObj.descEn)}
          </p>

          <div className="bg-washi-100 dark:bg-sumi-850 p-3.5 rounded-lg border border-washi-200 dark:border-sumi-800 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div className="text-xs font-jp">
              <span className="font-bold text-stone-800 dark:text-stone-200 mr-1.5">
                {language === 'id' ? 'Target Kompetensi:' : 'Target Competency:'}
              </span>
              <span className="text-stone-600 dark:text-stone-400">
                {renderFurigana(language === 'id' ? currentStageObj.targetId : currentStageObj.targetEn)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Complete Pillars and Units List */}
      <div className="space-y-6 pt-4">
        <h2 className="text-base font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-vermilion-500" />
          <span>{language === 'id' ? 'Seluruh Modul & Materi Pelajaran' : 'All Curriculum Modules & Lessons'}</span>
        </h2>

        {loading ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-8 h-8 border-2 border-vermilion-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-stone-500">{language === 'id' ? 'Memuat modul kurikulum...' : 'Loading curriculum modules...'}</p>
          </div>
        ) : (
          <div className="space-y-6">
            {pillars.map((pillar: any) => (
              <div
                key={pillar.id}
                className="bg-washi-50 dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-xl p-5 shadow-sm space-y-4"
              >
                <div className="border-b border-washi-200 dark:border-sumi-800 pb-3">
                  <h3 className="font-bold text-sm sm:text-base text-stone-900 dark:text-stone-100 flex items-center gap-2 font-jp">
                    {renderFurigana(localizePillarTitle(pillar.title, language))}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pillar.units?.map((unit: any) => (
                    <div
                      key={unit.id}
                      className="bg-white dark:bg-sumi-850 p-4 rounded-xl border border-washi-200 dark:border-sumi-800 hover:border-vermilion-500/50 transition-all flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-[11px] text-stone-400">
                          <span className="font-bold">{language === 'id' ? `Unit ${unit.orderIndex}` : `Unit ${unit.orderIndex}`}</span>
                          <span className="font-mono text-stone-500">{unit.lessons?.length || 1} {language === 'id' ? 'pelajaran' : 'lessons'}</span>
                        </div>
                        <h4 className="font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100 font-jp">
                          {renderFurigana(unit.title)}
                        </h4>
                        <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-2 font-jp">
                          {renderFurigana(unit.description || '')}
                        </p>
                      </div>

                      {/* Explicit List of Lessons inside this Unit */}
                      <div className="pt-3 border-t border-washi-100 dark:border-sumi-800 space-y-2">
                        {unit.lessons?.map((les: any) => (
                          <div
                            key={les.id}
                            className="bg-washi-50 dark:bg-sumi-900 p-2.5 rounded-lg border border-washi-200 dark:border-sumi-800 flex items-center justify-between gap-2"
                          >
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5 text-[10px] mb-0.5">
                                {les.completed ? (
                                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] flex items-center gap-1 border border-emerald-500/20">
                                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                    <span>{language === 'id' ? `SELESAI (${les.score}/${les.maxScore || 3})` : `COMPLETED (${les.score}/${les.maxScore || 3})`}</span>
                                  </span>
                                ) : (
                                  <span className="px-1.5 py-0.2 rounded bg-vermilion-500/10 text-vermilion-600 dark:text-vermilion-400 font-semibold font-mono">
                                    {localizeLessonType(les.lessonType, language)}
                                  </span>
                                )}
                                <span className="text-stone-400">•</span>
                                <span className="font-mono text-stone-500">{les.estimatedMinutes || 20} min</span>
                              </div>
                              <h5 className="font-bold text-xs text-stone-800 dark:text-stone-200 truncate font-jp">
                                {renderFurigana(les.title)}
                              </h5>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                onClick={() => onLaunchLesson(les.lessonType, les.id, 'lecture')}
                                title={language === 'id' ? 'Pelajari Teori & Kosakata' : 'Study Theory & Vocab'}
                                className="px-2 py-1.5 rounded-lg font-bold text-[11px] flex items-center gap-1 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-all"
                              >
                                <GraduationCap className="w-3.5 h-3.5" />
                                <span>{language === 'id' ? 'Materi' : 'Study'}</span>
                              </button>
                              <button
                                onClick={() => onLaunchLesson(les.lessonType, les.id, 'drill')}
                                className={`px-2.5 py-1.5 rounded-lg font-bold text-[11px] flex items-center gap-1 shadow-sm transition-all ${
                                  les.completed
                                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                    : 'bg-vermilion-500 hover:bg-vermilion-600 text-white'
                                }`}
                              >
                                {les.completed ? (
                                  <>
                                    <Check className="w-3.5 h-3.5" />
                                    <span>{language === 'id' ? 'Ulangi' : 'Review'}</span>
                                  </>
                                ) : (
                                  <>
                                    <span>{language === 'id' ? 'Latihan' : 'Drill'}</span>
                                    <ArrowRight className="w-3 h-3" />
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
