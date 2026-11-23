import React, { useState, useEffect } from 'react';
import { fetchLesson, startSession, submitSession } from '../api';
import { LevelCode } from '../../../shared/types';
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
  ChevronRight
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

// Canonical practice exam options organized by tier with English and Indonesian titles & subtitles
export const BILINGUAL_EXAM_PRESETS: Record<string, ExamPresetItem[]> = {
  jlpt_n5: [
    {
      id: 'les_n5_gram_1',
      titleEn: 'N5 Grammar Drill 1: Copula & Demonstratives',
      titleId: 'Tata Bahasa N5 Latihan 1: Kopula & Kata Tunjuk',
      subEn: 'Polite assertion (です/ではありません) & ko-so-a-do pronouns',
      subId: 'Bentuk sopan (です/ではありません) & kata ganti ko-so-a-do',
      estMin: 15,
      itemsCount: 3
    },
    {
      id: 'les_n5_gram_2',
      titleEn: 'N5 Grammar Drill 2: Case Particles & Action Verbs',
      titleId: 'Tata Bahasa N5 Latihan 2: Partikel Kasus & Kata Kerja Tindakan',
      subEn: 'Transitive actions with を, time with に, locations with で',
      subId: 'Objek langsung dengan を, penanda waktu に, tempat tindakan で',
      estMin: 20,
      itemsCount: 3
    },
    {
      id: 'les_n5_gram_3',
      titleEn: 'N5 Grammar Drill 3: Adjectives & Te-Form Requests',
      titleId: 'Tata Bahasa N5 Latihan 3: Kata Sifat & Permohonan Bentuk-Te',
      subEn: 'Adjective conjugations and polite requests (~てください)',
      subId: 'Konjugasi kata sifat & permohonan sopan (~てください)',
      estMin: 20,
      itemsCount: 2
    },
    {
      id: 'les_n5_read_1',
      titleEn: 'N5 Reading: Campus Tea Party & Schedules',
      titleId: 'Membaca N5: Pengumuman Acara Minum Teh Kampus & Jadwal',
      subEn: 'Authentic information retrieval from international student notices',
      subId: 'Pengambilan informasi autentik dari pengumuman mahasiswa internasional',
      estMin: 15,
      itemsCount: 2
    },
    {
      id: 'les_n5_listen_1',
      titleEn: 'N5 Listening: Movie Meetup & Station Appointment',
      titleId: 'Menyimak N5: Dialog Janji Nonton Film & Janji Temu Stasiun',
      subEn: 'Pinpointing meeting times, venues, and schedule adjustments',
      subId: 'Menentukan waktu pertemuan, lokasi, dan penyesuaian jadwal',
      estMin: 15,
      itemsCount: 2
    },
    {
      id: 'les_n5_exam_star',
      titleEn: 'N5 Star Exam: Syntax Reordering & Case Particle Master',
      titleId: 'Ujian Bintang N5: Rekonstruksi Urutan Kata & Penguasaan Partikel',
      subEn: 'Official JLPT Star reordering drills under simulated exam timer',
      subId: 'Latihan susun kalimat bintang resmi JLPT dalam simulasi ujian berwaktu',
      estMin: 25,
      itemsCount: 2
    }
  ],
  jlpt_n4: [
    {
      id: 'les_n4_gram_1',
      titleEn: 'N4 Grammar Drill 1: Potential Verbs (可能動詞)',
      titleId: 'Tata Bahasa N4 Latihan 1: Bentuk Potensial (可能動詞)',
      subEn: 'Expressing capabilities and particle transformation (を → が)',
      subId: 'Mengekspresikan kemampuan dan perubahan partikel (を → が)',
      estMin: 20,
      itemsCount: 3
    },
    {
      id: 'les_n4_gram_2',
      titleEn: 'N4 Grammar Drill 2: Benefactives (授受動詞)',
      titleId: 'Tata Bahasa N4 Latihan 2: Ungkapan Memberi & Menerima (授受動詞)',
      subEn: 'Direction of favors (~てあげる, ~てもらう, ~てくれる)',
      subId: 'Arah pemberian budi baik (~てあげる, ~てもらう, ~てくれる)',
      estMin: 20,
      itemsCount: 2
    },
    {
      id: 'les_n4_read_1',
      titleEn: 'N4 Reading: Apartment Garbage Disposal Rules',
      titleId: 'Membaca N4: Petunjuk Pembuangan Sampah Apartemen',
      subEn: 'Practical municipal sorting guidelines and penalty rules',
      subId: 'Pedoman pemilahan sampah warga dan aturan larangan malam',
      estMin: 20,
      itemsCount: 2
    },
    {
      id: 'les_n4_listen_1',
      titleEn: 'N4 Listening: Workplace Preparation & Priorities',
      titleId: 'Menyimak N4: Persiapan Tugas Kerja & Urutan Prioritas',
      subEn: 'Sequential task comprehension and office instruction dialogues',
      subId: 'Pemahaman tugas kerja berurutan dan dialog instruksi kantor',
      estMin: 20,
      itemsCount: 1
    },
    {
      id: 'les_n4_exam_star',
      titleEn: 'N4 Star Exam: Complex Sentences & Conditionals',
      titleId: 'Ujian Bintang N4: Kalimat Majemuk & Bentuk Pengandaian',
      subEn: 'Official JLPT N4 Star syntax puzzles and conditional connectors',
      subId: 'Latihan bintang resmi JLPT N4 dan kata hubung pengandaian',
      estMin: 30,
      itemsCount: 1
    }
  ],
  jlpt_n3: [
    {
      id: 'les_n3_gram_1',
      titleEn: 'N3 Grammar Drill 1: Contrast Patterns (に対して vs 反面)',
      titleId: 'Tata Bahasa N3 Latihan 1: Pola Kontras (に対して vs 反面)',
      subEn: 'Distinguishing binary contrast vs dual-nature aspects',
      subId: 'Membedakan kontras dua subjek vs dua sisi berlawanan satu subjek',
      estMin: 25,
      itemsCount: 2
    },
    {
      id: 'les_n3_gram_2',
      titleEn: 'N3 Grammar Drill 2: Conjectural Modality (わけがない・に違いない)',
      titleId: 'Tata Bahasa N3 Latihan 2: Modalitas Dugaan (わけがない・に違いない)',
      subEn: 'Logical impossibility and strong subjective conviction',
      subId: 'Kemustahilan logis dan keyakinan subjektif yang kuat',
      estMin: 25,
      itemsCount: 2
    },
    {
      id: 'les_n3_read_1',
      titleEn: 'N3 Reading: Flextime & Worker Autonomy Editorial',
      titleId: 'Membaca N3: Opini Jam Kerja Fleksibel & Otonomi Pekerja',
      subEn: 'Analyzing editorial arguments on corporate work-life balance',
      subId: 'Menganalisis argumen opini tentang keseimbangan kerja dan kehidupan',
      estMin: 25,
      itemsCount: 1
    },
    {
      id: 'les_n3_listen_1',
      titleEn: 'N3 Listening: Marketing Campaign Negotiations',
      titleId: 'Menyimak N3: Negosiasi Jadwal Kampanye Pemasaran',
      subEn: 'Tracking conflicting viewpoints and consensus in meetings',
      subId: 'Melacak perbedaan sudut pandang dan pencapaian kesepakatan rapat',
      estMin: 20,
      itemsCount: 1
    },
    {
      id: 'les_n3_exam_star',
      titleEn: 'N3 Star Exam: Intermediate Discourse & Sentence Synthesis',
      titleId: 'Ujian Bintang N3: Sintesis Kalimat & Wacana Tingkat Menengah',
      subEn: 'Official JLPT N3 star reordering drills and conjunction validation',
      subId: 'Latihan resmi susun kalimat bintang JLPT N3 dan validasi konjungsi',
      estMin: 30,
      itemsCount: 1
    }
  ],
  jlpt_n2: [
    {
      id: 'les_n2_gram_1',
      titleEn: 'N2 Grammar Drill 1: High Modality (にほかならない・余儀なくされる)',
      titleId: 'Tata Bahasa N2 Latihan 1: Modalitas Tingkat Tinggi (にほかならない・余儀なくされる)',
      subEn: 'Authoritative assertion and compelled actions',
      subId: 'Pernyataan tegas otoritatif dan tindakan yang terpaksa dilakukan',
      estMin: 30,
      itemsCount: 2
    },
    {
      id: 'les_n2_gram_2',
      titleEn: 'N2 Grammar Drill 2: Discourse Prepositions (を契機に・に基づいて)',
      titleId: 'Tata Bahasa N2 Latihan 2: Preposisi Wacana Formal (を契機に・に基づいて)',
      subEn: 'Connecting policy catalysts, statutory criteria, and public debates',
      subId: 'Menghubungkan momentum pemicu kebijakan, kriteria hukum, dan perdebatan publik',
      estMin: 30,
      itemsCount: 2
    },
    {
      id: 'les_n2_read_1',
      titleEn: 'N2 Reading: Tacit Knowledge Transfer in Remote Organizations',
      titleId: 'Membaca N2: Pewarisan Pengetahuan Tak Berwujud dalam Organisasi Jarak Jauh',
      subEn: 'Critical management essay on Polanyi\'s tacit knowledge transmission',
      subId: 'Esai manajemen kritis mengenai transmisi pengetahuan tacit Polanyi',
      estMin: 30,
      itemsCount: 1
    },
    {
      id: 'les_n2_listen_1',
      titleEn: 'N2 Listening: Enterprise Cloud Modernization Strategy',
      titleId: 'Menyimak N2: Strategi Modernisasi Cloud Sistem Korporasi',
      subEn: 'Executive board discussion on phased ERP migration and data integrity',
      subId: 'Diskusi dewan direksi mengenai migrasi bertahap ERP dan integritas data',
      estMin: 25,
      itemsCount: 1
    },
    {
      id: 'les_n2_exam_star',
      titleEn: 'N2 Star Exam: Business Sentence Composition & Clause Embedding',
      titleId: 'Ujian Bintang N2: Komposisi Kalimat Bisnis & Penyusunan Klausa Majemuk',
      subEn: 'Mastering advanced business clause subordination under timed conditions',
      subId: 'Menguasai struktur klausa bertingkat bahasa Jepang bisnis berwaktu',
      estMin: 35,
      itemsCount: 1
    }
  ],
  jlpt_n1: [
    {
      id: 'les_n1_gram_1',
      titleEn: 'N1 Grammar Drill 1: Extreme Registers (極まりない・皮切りに)',
      titleId: 'Tata Bahasa N1 Latihan 1: Ragam Bahasa Ekstrem (極まりない・皮切りに)',
      subEn: 'Insurmountable extremes and dramatic inaugural announcements',
      subId: 'Puncak situasi tanpa batas dan pengumuman pembukaan resmi bersejarah',
      estMin: 35,
      itemsCount: 2
    },
    {
      id: 'les_n1_gram_2',
      titleEn: 'N1 Grammar Drill 2: Normative Restraint (を禁じ得ない・であれ)',
      titleId: 'Tata Bahasa N1 Latihan 2: Pengekangan Normatif (を禁じ得ない・であれ)',
      subEn: 'Uncontrollable emotional overflow and universal conditionality',
      subId: 'Luapan emosi yang tak terbendung dan syarat mutlak universal',
      estMin: 35,
      itemsCount: 2
    },
    {
      id: 'les_n1_read_1',
      titleEn: 'N1 Reading: Linguistic Determinism & Structural Semiotics',
      titleId: 'Membaca N1: Determinisme Linguistik & Semiotika Struktural',
      subEn: 'Scholarly critique evaluating Saussurean arbitrariness against cognition',
      subId: 'Kritik ilmiah mengevaluasi konsep arbitrer Saussure terhadap sains kognitif',
      estMin: 35,
      itemsCount: 1
    },
    {
      id: 'les_n1_listen_1',
      titleEn: 'N1 Listening: AI Ethics & Epistemic Agency Symposium',
      titleId: 'Menyimak N1: Simposium Etika AI & Agensi Epistemik',
      subEn: 'Keynote debate on explainability and strict liability in autonomous systems',
      subId: 'Debat utama mengenai transparansi model dan pertanggungjawaban hukum sistem otonom',
      estMin: 30,
      itemsCount: 1
    },
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
      id: 'les_ia_read_1',
      titleEn: 'Section 1 Reading: Cognitive Architecture of Bilingualism',
      titleId: 'Membaca Bagian 1: Arsitektur Kognitif Kedwibahasaan',
      subEn: 'Matching Headings, True/False/Not Given, and Sentence Completion',
      subId: 'Mencocokkan Judul Bagian, Benar/Salah/Tidak Disebutkan, dan Melengkapi Kalimat',
      estMin: 25,
      itemsCount: 3
    },
    {
      id: 'les_ia_read_2',
      titleEn: 'Section 2 Reading: Passive Cooling & Urban Microclimates',
      titleId: 'Membaca Bagian 2: Pendinginan Pasif & Iklim Mikro Perkotaan',
      subEn: 'Multiple Choice, True/False/Not Given, and Environmental Engineering',
      subId: 'Pilihan Ganda, Benar/Salah/Tidak Disebutkan, dan Rekayasa Lingkungan',
      estMin: 25,
      itemsCount: 3
    },
    {
      id: 'les_ia_read_3',
      titleEn: 'Section 3 Reading: Epistemology & Archaeological Stratigraphy',
      titleId: 'Membaca Bagian 3: Epistemologi & Stratigrafi Arkeologi',
      subEn: 'Harris Matrix paradigms, taphonomic disruption, and chronological dating',
      subId: 'Paradigma Matriks Harris, gangguan tafonomik, dan penanggalan kronologis',
      estMin: 30,
      itemsCount: 3
    },
    {
      id: 'les_ia_listen_1',
      titleEn: 'Section 1 Listening: Central Lab Facility Registration',
      titleId: 'Menyimak Bagian 1: Pendaftaran Fasilitas Laboratorium Terpusat',
      subEn: 'Booking dialogues, safety induction prerequisites, and equipment codes',
      subId: 'Dialog pemesanan fasilitas, sertifikasi keselamatan kerja, dan kode peralatan',
      estMin: 15,
      itemsCount: 3
    },
    {
      id: 'les_ia_listen_2',
      titleEn: 'Section 4 Listening: Marine Biomimetics & Hydrodynamics',
      titleId: 'Menyimak Bagian 4: Biomimetika Laut & Hidrodinamika Perkapalan',
      subEn: 'Academic lecture on shark dermal denticles and drag reduction riblets',
      subId: 'Kuliah akademik mengenai struktur kulit hiu dan alur mikro pengurang hambatan air',
      estMin: 20,
      itemsCount: 2
    }
  ],
  ielts_general: [
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
    },
    {
      id: 'les_ig_read_3',
      titleEn: 'Section 3 Reading: Renaissance of Inland Navigable Canals',
      titleId: 'Membaca Bagian 3: Kebangkitan Kembali Jaringan Kanal Air Pedalaman',
      subEn: 'Industrial revolution canal heritage, railway competition, and ecological revival',
      subId: 'Warisan kanal era revolusi industri, persaingan kereta api, dan restorasi ekologis',
      estMin: 25,
      itemsCount: 2
    },
    {
      id: 'les_ig_listen_1',
      titleEn: 'Section 1 Listening: Community Sports Center Membership',
      titleId: 'Menyimak Bagian 1: Keanggotaan Pusat Kebugaran & Olahraga Komunitas',
      subEn: 'Membership tiers, monthly fee inclusions, and early bird pool schedules',
      subId: 'Tingkatan keanggotaan, cakupan biaya bulanan, dan jadwal kolam renang pagi',
      estMin: 15,
      itemsCount: 2
    }
  ]
};

function localizeExamTitle(title: string, lang: string): string {
  if (lang !== 'id' || !title) return title;
  return title
    .replace(/Grammar Drill 1:s*Copula & Demonstratives/i, 'Latihan Tata Bahasa 1: Kopula & Kata Tunjuk')
    .replace(/Grammar Drill 2:s*Case Particles & Verb Predicates/i, 'Latihan Tata Bahasa 2: Partikel Kasus & Predikat Kata Kerja')
    .replace(/Grammar Drill 3:s*Adjectives & Polite Requests/i, 'Latihan Tata Bahasa 3: Kata Sifat & Permohonan Sopan')
    .replace(/Reading Drill:s*Campus Tea Party & Library Schedule Notices/i, 'Latihan Membaca: Pengumuman Acara Minum Teh & Jadwal Perpustakaan')
    .replace(/Listening Drill:s*Movie Meetup & Station Appointment Dialogue/i, 'Latihan Menyimak: Dialog Janji Nonton Film & Janji Temu Stasiun')
    .replace(/N5 Star Exam:s*Syntax Reordering & Case Particle Master/i, 'Ujian Bintang N5: Rekonstruksi Urutan Kata & Partikel Kasus')
    .replace(/Grammar Drill 1:s*Potential Verbs/i, 'Latihan Tata Bahasa 1: Bentuk Potensial')
    .replace(/Grammar Drill 2:s*Benefactives/i, 'Latihan Tata Bahasa 2: Ungkapan Memberi & Menerima')
    .replace(/Reading Drill:s*Residential Garbage Rules & Clinic Hours/i, 'Latihan Membaca: Aturan Pembuangan Sampah & Jadwal Klinik')
    .replace(/Listening Drill:s*Office Presentation Preparation Tasks/i, 'Latihan Menyimak: Persiapan Presentasi Kantor')
    .replace(/N4 Star Exam:s*Complex Sentences & Conditional Connectors/i, 'Ujian Bintang N4: Kalimat Majemuk & Konjungsi Pengandaian')
    .replace(/Grammar Drill 1:s*Contrast Markers/i, 'Latihan Tata Bahasa 1: Pola Kontras')
    .replace(/Grammar Drill 2:s*Conjectural Modality/i, 'Latihan Tata Bahasa 2: Modalitas Dugaan')
    .replace(/Reading Drill:s*Flextime Reform & Worker Autonomy Editorial/i, 'Latihan Membaca: Opini Jam Kerja Fleksibel & Otonomi Pekerja')
    .replace(/Listening Drill:s*Marketing Campaign Deadline Negotiation/i, 'Latihan Menyimak: Negosiasi Tenggat Kampanye Pemasaran')
    .replace(/N3 Star Exam:s*Intermediate Discourse & Sentence Synthesis/i, 'Ujian Bintang N3: Wacana Menengah & Sintesis Kalimat')
    .replace(/Grammar Drill 1:s*High Modality/i, 'Latihan Tata Bahasa 1: Modalitas Tingkat Tinggi')
    .replace(/Grammar Drill 2:s*Discourse Prepositions/i, 'Latihan Tata Bahasa 2: Preposisi Wacana Formal')
    .replace(/Reading Drill:s*Tacit Knowledge Transfer in Remote Organizations/i, 'Latihan Membaca: Transmisi Pengetahuan Tak Berwujud')
    .replace(/Listening Drill:s*Enterprise Cloud Modernization Strategy/i, 'Latihan Menyimak: Strategi Modernisasi Cloud Korporasi')
    .replace(/N2 Star Exam:s*Business Sentence Composition & Clause Embedding/i, 'Ujian Bintang N2: Komposisi Kalimat Bisnis')
    .replace(/Grammar Drill 1:s*Extreme Registers/i, 'Latihan Tata Bahasa 1: Ragam Bahasa Ekstrem')
    .replace(/Grammar Drill 2:s*Normative Restraint/i, 'Latihan Tata Bahasa 2: Pengekangan Normatif')
    .replace(/Reading Drill:s*Linguistic Determinism & Structural Semiotics/i, 'Latihan Membaca: Determinisme Linguistik & Semiotika Struktural')
    .replace(/Listening Drill:s*AI Ethics & Epistemic Agency Symposium/i, 'Latihan Menyimak: Simposium Etika AI & Agensi Epistemik')
    .replace(/N1 Star Exam:s*Supreme Literary & Syntactic Reordering/i, 'Ujian Bintang N1: Rekonstruksi Kalimat Sastra Puncak')
    .replace(/Passage 1:s*Cognitive Architecture & Executive Function/i, 'Teks 1: Arsitektur Kognitif & Fungsi Eksekutif')
    .replace(/Passage 2:s*Passive Cooling & Urban Microclimates/i, 'Teks 2: Pendinginan Pasif & Iklim Mikro Perkotaan')
    .replace(/Passage 3:s*Epistemology & Archaeological Typology/i, 'Teks 3: Epistemologi & Tipologi Arkeologi')
    .replace(/Section 1:s*Laboratory Equipment Booking Dialogue/i, 'Bagian 1: Dialog Pemesanan Peralatan Laboratorium')
    .replace(/Section 4:s*Marine Engineering Biomimicry Lecture/i, 'Bagian 4: Kuliah Biomimetika Rekayasa Laut')
    .replace(/Section 1:s*Ergonomics Protocol & HVAC Emergency Notice/i, 'Bagian 1: Protokol Ergonomi & Pengumuman Darurat HVAC')
    .replace(/Section 2:s*Employee Grievance Procedure & Parental Leave/i, 'Bagian 2: Prosedur Pengaduan Karyawan & Cuti Orang Tua')
    .replace(/Section 3:s*The Industrial History of Navigable Canals/i, 'Bagian 3: Sejarah Industri Kanal Air Pedalaman')
    .replace(/Section 1:s*Sports Center Membership & Timetable Dialogue/i, 'Bagian 1: Dialog Keanggotaan Pusat Kebugaran & Jadwal');
}

function localizePromptText(prompt: string, lang: string): string {
  if (lang !== 'id' || !prompt) return prompt;
  return prompt
    .replace(/Choose the most appropriate word to fill in the blank/gi, 'Pilihlah kata yang paling tepat untuk mengisi bagian yang kosong')
    .replace(/Choose the most appropriate particle to fill in the blank/gi, 'Pilihlah partikel yang paling tepat untuk mengisi bagian yang kosong')
    .replace(/Choose the correct negative polite form to complete the sentence/gi, 'Pilihlah bentuk sopan negatif yang benar untuk melengkapi kalimat')
    .replace(/Choose the correct past form of the i-adjective/gi, 'Pilihlah bentuk lampau yang benar dari kata sifat-i')
    .replace(/Choose the correct form to make a polite request/gi, 'Pilihlah bentuk yang benar untuk membuat permohonan sopan')
    .replace(/Choose the correct potential verb form/gi, 'Pilihlah bentuk kata kerja potensial yang benar')
    .replace(/Choose the correct potential form of the irregular verb/gi, 'Pilihlah bentuk potensial yang benar dari kata kerja tidak beraturan')
    .replace(/Choose the most natural particle with the potential verb/gi, 'Pilihlah partikel yang paling alami bersama kata kerja potensial')
    .replace(/Choose the correct benefactive expression/gi, 'Pilihlah ungkapan memberi dan menerima yang benar')
    .replace(/Choose the correct benefactive auxiliary verb/gi, 'Pilihlah kata kerja bantu memberi dan menerima yang benar')
    .replace(/Choose the most appropriate expression to fill in the blank/gi, 'Pilihlah ungkapan yang paling tepat untuk mengisi bagian yang kosong')
    .replace(/Choose the most appropriate expression to complete the sentence/gi, 'Pilihlah ungkapan yang paling tepat untuk melengkapi kalimat')
    .replace(/Choose the most appropriate grammar pattern to express two contrasting sides of the SAME object/gi, 'Pilihlah pola tata bahasa yang paling tepat untuk menyatakan dua sisi berlawanan dari objek yang SAMA')
    .replace(/Choose the most appropriate expression to indicate strong conviction/gi, 'Pilihlah ungkapan yang paling tepat untuk menyatakan keyakinan kuat')
    .replace(/Choose the most appropriate formal condition marker/gi, 'Pilihlah penanda syarat formal yang paling tepat')
    .replace(/Choose the correct heading for Paragraph A from the list of headings below/gi, 'Pilihlah judul yang benar untuk Paragraf A dari daftar judul di bawah ini')
    .replace(/Do the following statement agree with the information given in the text?/gi, 'Apakah pernyataan berikut sesuai dengan informasi yang diberikan dalam teks?')
    .replace(/Do the following statement agree with the information in Paragraph B?/gi, 'Apakah pernyataan berikut sesuai dengan informasi dalam Paragraf B?')
    .replace(/Do the following statement agree with the text?/gi, 'Apakah pernyataan berikut sesuai dengan teks?')
    .replace(/Complete the sentence with NO MORE THAN TWO WORDS from the text:/gi, 'Lengkapilah kalimat berikut dengan TIDAK LEBIH DARI DUA KATA dari teks:')
    .replace(/According to Paragraph A, what is a primary consequence of the urban heat island effect in dense metropolitan areas?/gi, 'Menurut Paragraf A, apa akibat utama dari efek pulau panas perkotaan di daerah metropolitan yang padat?')
    .replace(/According to Paragraph C, why must urban planners avoid installing excessively reflective materials on vertical building facades?/gi, 'Menurut Paragraf C, mengapa perencana kota harus menghindari pemasangan material yang terlalu reflektif pada fasad bangunan vertikal?')
    .replace(/What constitutes the primary hazard to linear chronological dating in stratigraphic excavation according to the text?/gi, 'Apa yang menjadi bahaya utama terhadap penanggalan kronologis linier dalam ekskavasi stratigrafi menurut teks?')
    .replace(/What prerequisite must Dr. Jensen's team fulfill before accessing the Level 3 Electron Microscope?/gi, 'Prasyarat apa yang harus dipenuhi oleh tim Dr. Jensen sebelum mengakses Mikroskop Elektron Lantai 3?')
    .replace(/At what time does Dr. Jensen plan to log in to ensure nitrogen stabilization is ready for the 09:00 observation?/gi, 'Pada jam berapa Dr. Jensen berencana untuk masuk sistem guna memastikan stabilisasi nitrogen siap untuk observasi pukul 09.00?')
    .replace(/What is the group project code provided by Dr. Jensen?/gi, 'Apa kode proyek kelompok yang diberikan oleh Dr. Jensen?')
    .replace(/According to Section 1, under what condition must an employee request a formal workstation re-audit within 48 hours?/gi, 'Menurut Bagian 1, dalam kondisi apa seorang karyawan harus meminta audit ulang stasiun kerja resmi dalam waktu 48 jam?')
    .replace(/According to Section 2, what action is strictly prohibited for tenants during a central heating failure?/gi, 'Menurut Bagian 2, tindakan apa yang dilarang keras bagi penyewa saat terjadi kerusakan sistem pemanas pusat?')
    .replace(/What is the advance notification notice required when applying for parental leave under Sub-clause A?/gi, 'Berapa lama pemberitahuan awal yang diperlukan saat mengajukan cuti orang tua berdasarkan Sub-klausul A?')
    .replace(/What is the monthly fee for the Silver membership tier at Riverside Community Centre?/gi, 'Berapa biaya bulanan untuk tingkat keanggotaan Silver di Pusat Komunitas Riverside?')
    .replace(/At what time does weekday early bird lane swimming open?/gi, 'Pada jam berapa sesi renang jalur pagi hari kerja dibuka?')
    .replace(/Rearrange the numbered words to form a correct sentence, then choose the word that goes into the ★ position:/gi, 'Susun kembali kata-kata bernomor untuk membentuk kalimat yang benar, lalu pilihlah kata yang menempati posisi ★:')
    .replace(/What must an international student do if they want to participate in the tea party?/gi, 'Apa yang harus dilakukan mahasiswa internasional jika ingin berpartisipasi dalam acara minum teh?')
    .replace(/Which statement is true according to the notice?/gi, 'Pernyataan mana yang benar menurut pengumuman tersebut?')
    .replace(/Where will the woman and man meet?/gi, 'Di mana wanita dan pria tersebut akan bertemu?')
    .replace(/What time does the movie start?/gi, 'Jam berapa film tersebut dimulai?')
    .replace(/When and how should recyclable PET bottles and glass bottles be disposed of?/gi, 'Kapan dan bagaimana botol PET dan botol kaca daur ulang harus dibuang?')
    .replace(/Why is putting out garbage the night before prohibited?/gi, 'Mengapa membuang sampah pada malam sebelumnya dilarang?')
    .replace(/What will Sato do first?/gi, 'Apa yang akan dilakukan Sato terlebih dahulu?')
    .replace(/What condition does the author state is indispensable for the flextime system to succeed?/gi, 'Kondisi apa yang menurut penulis sangat diperlukan agar sistem jam kerja fleksibel berhasil?')
    .replace(/According to the passage, what specific aspect of organizational knowledge is impeded by complete telework?/gi, 'Menurut bacaan, aspek spesifik apa dari pengetahuan organisasi yang terhambat oleh kerja jarak jauh total?')
    .replace(/According to the author, how does Saussure's concept of arbitrariness overturn the naive realist view of language?/gi, 'Menurut penulis, bagaimana konsep kesewenang-wenangan (arbitrer) Saussure meruntuhkan pandangan realis naif tentang bahasa?')
    .replace(/According to the lecture, by what maximum percentage can biomimetic riblet surface textures reduce frictional drag?/gi, 'Menurut kuliah tersebut, berapa persentase maksimum tekstur permukaan alur mikro biomimetik dapat mengurangi gaya gesek?')
    .replace(/What technological development initially precipitated the obsolescence of narrow commercial canals in the mid-19th century?/gi, 'Perkembangan teknologi apa yang awalnya memicu keusangan kanal komersial sempit pada pertengahan abad ke-19?')
    .replace(/What will be delayed according to the manager?/gi, 'Apa yang akan ditunda menurut manajer?')
    .replace(/What strategy did the technical director recommend to minimize transition risks?/gi, 'Strategi apa yang direkomendasikan direktur teknis untuk meminimalkan risiko transisi?')
    .replace(/What conclusion did the speaker express regarding liability when an autonomous AI causes irreversible damage?/gi, 'Kesimpulan apa yang disampaikan pembicara mengenai tanggung jawab hukum ketika AI otonom menyebabkan kerugian permanen?');
}

export const ExamRunnerView: React.FC<ExamRunnerViewProps> = ({
  lessonId,
  activeTrack = 'jlpt_n5',
  onNavigateBack,
  onSelectExam
}) => {
  const { renderFurigana } = useFurigana();
  const isJapaneseTrack = (activeTrack || 'jlpt_n5').startsWith('jlpt_');
  const renderWithFuriganaIfJapanese = (txt: string) => isJapaneseTrack ? renderFurigana(txt) : txt;
  const { t, language } = useLanguage();

  const trackKey = activeTrack || 'jlpt_n5';
  const presetsForLevel = BILINGUAL_EXAM_PRESETS[trackKey] || BILINGUAL_EXAM_PRESETS.jlpt_n5;
  const defaultLessonId = presetsForLevel[0]?.id || 'les_n5_gram_1';
  const targetLessonId = lessonId && lessonId !== 'les_n5_grammar_1' ? lessonId : defaultLessonId;

  const [currentLessonId, setCurrentLessonId] = useState<string>(targetLessonId);
  const [lessonInfo, setLessonInfo] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [passageText, setPassageText] = useState<string>('');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [sessionId, setSessionId] = useState<string>('');
  const [timeRemaining, setTimeRemaining] = useState<number>(1200); // 20 mins
  const [loading, setLoading] = useState<boolean>(true);
  const [result, setResult] = useState<any>(null);

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

  const initExam = async (idToLoad: string) => {
    setLoading(true);
    setResult(null);
    setAnswers({});
    setCurrentIdx(0);
    setTimeRemaining(1200);

    try {
      const lessonData = await fetchLesson(idToLoad);
      setLessonInfo(lessonData.lesson);
      setItems(lessonData.items || []);
      if (lessonData.items?.[0]?.passageText) {
        setPassageText(lessonData.items[0].passageText);
      } else {
        setPassageText('');
      }

      const isJLPT = idToLoad.includes('n5') || idToLoad.includes('n4') || idToLoad.includes('n3') || idToLoad.includes('n2') || idToLoad.includes('n1');
      const trackCode = isJLPT ? 'jlpt' : 'ielts';
      const levelCode = idToLoad.includes('n5') ? 'n5' : idToLoad.includes('n4') ? 'n4' : idToLoad.includes('n3') ? 'n3' : idToLoad.includes('n2') ? 'n2' : idToLoad.includes('n1') ? 'n1' : idToLoad.includes('gen') ? 'general' : 'academic';

      const session = await startSession({
        userId: 'user_001',
        trackCode,
        levelCode,
        sessionType: 'exam_simulation'
      });
      setSessionId(session.sessionId);
      setLoading(false);
    } catch (err) {
      console.error('Failed to init exam session', err);
      setLoading(false);
    }
  };

  // Timer countdown
  useEffect(() => {
    if (loading || result || timeRemaining <= 0) return;
    const timer = setInterval(() => {
      setTimeRemaining(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [loading, result, timeRemaining]);

  const handleSelectAnswer = (itemId: string, opt: string) => {
    if (result) return;
    setAnswers(prev => ({ ...prev, [itemId]: opt }));
  };

  const handleSubmit = async () => {
    if (!sessionId || result) return;
    try {
      const timeSpent = Math.max(1, 1200 - timeRemaining);
      const submissionResult = await submitSession(sessionId, answers, timeSpent);
      setResult(submissionResult);
    } catch (err) {
      console.error('Failed to submit exam', err);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentItem = items[currentIdx];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12 animate-fadeIn">
      {/* Top Level Preset Switcher Header */}
      <div className="bg-washi-50 dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-washi-200 dark:border-sumi-800 pb-3">
          <div>
            <div className="flex items-center gap-2 text-vermilion-600 dark:text-vermilion-400 text-xs font-bold mb-0.5">
              <Layers className="w-4 h-4" />
              <span>{t('exam.select_module', { track: trackKey.toUpperCase() })}</span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              {language === 'id' ? 'Pilihlah salah satu modul latihan berstandar internasional berikut untuk memulai evaluasi:' : 'Select any official standardized practice module below to begin testing:'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-vermilion-500/10 text-vermilion-600 dark:text-vermilion-400 border border-vermilion-500/20">
              {trackKey.toUpperCase()}
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

        {/* Carousel / Grid of Available Exam Presets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
          {presetsForLevel.map(preset => {
            const isSelected = preset.id === currentLessonId;
            return (
              <button
                key={preset.id}
                onClick={() => {
                  setCurrentLessonId(preset.id);
                  if (onSelectExam) onSelectExam(preset.id);
                }}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-vermilion-500 text-white border-vermilion-600 shadow-md ring-2 ring-vermilion-500/20'
                    : 'bg-white dark:bg-sumi-850 border-washi-200 dark:border-sumi-800 text-stone-700 dark:text-stone-300 hover:border-vermilion-500/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 text-[11px] mb-1">
                    <span className={`font-mono font-bold px-1.5 py-0.5 rounded text-[10px] ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-washi-200 dark:bg-sumi-800 text-stone-600 dark:text-stone-400'
                    }`}>
                      {preset.estMin} min • {preset.itemsCount} {language === 'id' ? 'soal' : 'items'}
                    </span>
                    {isSelected && (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-white text-vermilion-600">
                        {language === 'id' ? 'Aktif' : 'Active'}
                      </span>
                    )}
                  </div>
                  <h4 className={`font-bold text-xs line-clamp-1 ${isSelected ? 'text-white' : 'text-stone-900 dark:text-stone-100 font-jp'}`}>
                    {renderFurigana(language === 'id' ? preset.titleId : preset.titleEn)}
                  </h4>
                  <p className={`text-[11px] line-clamp-2 mt-1 ${isSelected ? 'text-white/90' : 'text-stone-500 dark:text-stone-400'}`}>
                    {language === 'id' ? preset.subId : preset.subEn}
                  </p>
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
          <p className="text-xs text-stone-500">{language === 'id' ? 'Memuat materi ujian...' : 'Loading examination battery...'}</p>
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-2xl p-8 text-center space-y-3">
          <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
          <h3 className="text-sm font-bold">{t('exam.no_items')}</h3>
          <p className="text-xs text-stone-500">{t('exam.no_items_desc')}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Header Bar: Status & Timer */}
          <div className="bg-white dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-2xl p-4 sm:p-5 shadow-sm flex items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold text-vermilion-600 dark:text-vermilion-400 uppercase tracking-wider block">
                {t('exam.question_header', { current: currentIdx + 1, total: items.length })}
              </span>
              <h2 className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100 font-jp">
                {renderFurigana(localizeExamTitle(lessonInfo?.title || '', language))}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-washi-100 dark:bg-sumi-850 border border-washi-200 dark:border-sumi-800 text-stone-800 dark:text-stone-200 font-mono text-xs font-bold">
                <Clock className="w-3.5 h-3.5 text-stone-500" />
                <span>{formatTime(timeRemaining)}</span>
              </div>

              {!result && (
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 rounded-xl bg-vermilion-500 hover:bg-vermilion-600 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t('exam.submit_all')}</span>
                </button>
              )}
            </div>
          </div>

          {/* Reference Passage if present */}
          {currentItem?.passageText && (
            <div className="bg-washi-50 dark:bg-sumi-900/70 border border-washi-300 dark:border-sumi-800 rounded-2xl p-5 sm:p-6 space-y-2">
              <div className="flex items-center gap-2 text-stone-500 text-xs font-bold uppercase tracking-wider">
                <BookOpen className="w-4 h-4 text-vermilion-500" />
                <span>{t('exam.reference_title')}</span>
              </div>
              <div className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed font-jp whitespace-pre-line border-t border-washi-200 dark:border-sumi-800 pt-3">
                {renderWithFuriganaIfJapanese(currentItem.passageText)}
              </div>
            </div>
          )}

          {/* Question Card */}
          <div className="bg-white dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5">
            <div className="space-y-2">
              <span className="text-xs font-bold text-stone-400">
                {t('exam.question_label', { idx: currentIdx + 1 })}
              </span>
              <p className="text-sm sm:text-base font-medium text-stone-900 dark:text-stone-100 font-jp leading-relaxed whitespace-pre-line">
                {renderFurigana(localizePromptText(currentItem.prompt, language))}
              </p>
            </div>

            {/* Answer Options */}
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
                      className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm font-jp transition-all flex items-center gap-3 ${optStyle}`}
                    >
                      <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] shrink-0 font-mono">
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span className="flex-1">{renderFurigana(opt)}</span>
                    </button>
                  );
                });
              })()}
            </div>

            {/* Explanation when submitted */}
            {result && currentItem.explanation && (
              <div className="bg-washi-100 dark:bg-sumi-850 p-4 rounded-xl border border-washi-200 dark:border-sumi-800 space-y-1.5 text-xs text-stone-700 dark:text-stone-300 font-jp animate-fadeIn">
                <span className="font-bold text-vermilion-600 dark:text-vermilion-400 block">
                  {language === 'id' ? 'Penjelasan Pedagogis:' : 'Pedagogical Explanation:'}
                </span>
                <p className="leading-relaxed">
                  {renderWithFuriganaIfJapanese(currentItem.explanation)}
                </p>
              </div>
            )}

            {/* Stepper Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-washi-200 dark:border-sumi-800">
              <button
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
                className="px-3.5 py-2 rounded-lg border border-washi-300 dark:border-sumi-800 text-xs font-semibold disabled:opacity-40 hover:bg-washi-100 dark:hover:bg-sumi-850 transition-all"
              >
                {t('exam.previous')}
              </button>

              <div className="flex items-center gap-1.5">
                {items.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setCurrentIdx(dotIdx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      dotIdx === currentIdx
                        ? 'bg-vermilion-500 scale-125'
                        : answers[items[dotIdx].id]
                        ? 'bg-stone-400 dark:bg-stone-500'
                        : 'bg-washi-300 dark:bg-sumi-800'
                    }`}
                  />
                ))}
              </div>

              <button
                disabled={currentIdx === items.length - 1}
                onClick={() => setCurrentIdx(prev => Math.min(items.length - 1, prev + 1))}
                className="px-3.5 py-2 rounded-lg border border-washi-300 dark:border-sumi-800 text-xs font-semibold disabled:opacity-40 hover:bg-washi-100 dark:hover:bg-sumi-850 transition-all flex items-center gap-1"
              >
                <span>{t('exam.next')}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Results Summary Modal / Card */}
          {result && (
            <div className="bg-emerald-50 dark:bg-sumi-900 border-2 border-emerald-500/30 rounded-2xl p-6 text-center space-y-4 shadow-md animate-fadeIn">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
              <div>
                <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100">
                  {t('exam.completed_title')}
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
                  {language === 'id' ? 'Nilai dan kesiapan Anda telah diperbarui pada dasbor dan analitik diagnostik.' : 'Your proficiency metrics have been updated in your diagnostic cockpit.'}
                </p>
              </div>

              {/* Task Done Confirmation Banner */}
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 text-xs text-emerald-800 dark:text-emerald-300 font-bold flex items-center justify-center gap-2 max-w-lg mx-auto">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>
                  {language === 'id'
                    ? `TUGAS INI BERHASIL DISELESAIKAN! Jawaban benar: ${result.score ?? result.correctCount ?? 0} dari ${result.maxScore ?? result.totalQuestions ?? items.length} soal. Kemajuan materi telah ditambahkan.`
                    : `TASK MARKED AS COMPLETED! Correct answers: ${result.score ?? result.correctCount ?? 0} of ${result.maxScore ?? result.totalQuestions ?? items.length} questions. Progress has been updated.`}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-md mx-auto">
                <div className="bg-white dark:bg-sumi-850 p-3 rounded-xl border border-washi-200 dark:border-sumi-800">
                  <span className="text-[10px] text-stone-400 block">{t('exam.raw_score')}</span>
                  <span className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100 font-mono">
                    {result.score ?? result.correctCount ?? 0} / {result.maxScore ?? result.totalQuestions ?? items.length}
                  </span>
                </div>
                <div className="bg-white dark:bg-sumi-850 p-3 rounded-xl border border-washi-200 dark:border-sumi-800">
                  <span className="text-[10px] text-stone-400 block">{t('exam.est_score')}</span>
                  <span className="text-sm sm:text-base font-bold text-vermilion-600 dark:text-vermilion-400 font-mono">
                    {result.scaledScore || result.score}
                  </span>
                </div>
                <div className="bg-white dark:bg-sumi-850 p-3 rounded-xl border border-washi-200 dark:border-sumi-800 col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-stone-400 block">{t('exam.verdict')}</span>
                  <span className="text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    {result.passed ? (language === 'id' ? 'LULUS (Memuaskan)' : 'PASS (On Track)') : (language === 'id' ? 'PERLU LATIHAN' : 'NEEDS PRACTICE')}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => initExam(currentLessonId)}
                  className="px-4 py-2 rounded-xl bg-washi-200 dark:bg-sumi-800 text-stone-700 dark:text-stone-300 font-bold text-xs hover:bg-washi-300 dark:hover:bg-sumi-750 transition-all flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t('exam.retake')}</span>
                </button>
                {onNavigateBack && (
                  <button
                    onClick={onNavigateBack}
                    className="px-4 py-2 rounded-xl bg-vermilion-500 text-white font-bold text-xs hover:bg-vermilion-600 transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <span>{t('exam.back_curriculum')}</span>
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
