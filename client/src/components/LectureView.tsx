import React, { useState, useEffect } from 'react';
import { LevelCode } from '../../../shared/types';
import { useLanguage } from '../context/LanguageContext';
import {
  GraduationCap,
  BookOpen,
  Sparkles,
  Layers,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  FileText,
  AlignLeft,
  ListChecks,
  Languages,
  PenTool,
  Clock,
  PlayCircle,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';

interface LectureModule {
  id: string;
  lessonId: string;
  trackType: 'ielts' | 'japanese';
  level: string;
  skill: 'reading' | 'grammar' | 'writing' | 'listening';
  title: string;
  titleId: string;
  subtitle: string;
  estimatedMinutes: number;
  cefrLevel: string;
  strategyOverview: {
    coreObjective: string;
    keyTechniques: { title: string; desc: string; tip: string }[];
    commonPitfalls: string[];
  };
  grammarSpotlight: {
    topic: string;
    pattern: string;
    explanationId: string;
    examples: { englishOrJp: string; indonesian: string; breakdown: string }[];
    pitfallNote: string;
  }[];
  vocabularyBank: {
    term: string;
    phonetic: string;
    partOfSpeech: string;
    definitionId: string;
    collocation: string;
    exampleSentence: string;
    translationId: string;
  }[];
  annotatedText?: {
    title: string;
    paragraphs: {
      label: string;
      text: string;
      translationId: string;
      mainIdeaId: string;
      keywords: string[];
      questionMappingId: string;
    }[];
  };
}

const LECTURE_MODULES: LectureModule[] = [
  // --- IELTS ACADEMIC MODULE 1: Reading & Cognitive Architecture ---
  {
    id: 'lec_ia_read_1',
    lessonId: 'les_ia_read_1',
    trackType: 'ielts',
    level: 'ielts_academic',
    skill: 'reading',
    title: 'IELTS Academic Reading: Cognitive Architecture & Executive Control',
    titleId: 'Membaca Akademik IELTS: Arsitektur Kognitif & Kontrol Eksekutif',
    subtitle: 'Strategi Skimming Cepat, Bedah Heading Matching, & Validasi Fakta True/False/Not Given',
    estimatedMinutes: 20,
    cefrLevel: 'C1 / Band 7.5–9.0',
    strategyOverview: {
      coreObjective: 'Menguasai kemampuan membaca analitis teks ilmiah kedokteran/psikolinguistik, membedakan klaim penulis dari fakta penelitian, dan menghindari jebakan parafrase.',
      keyTechniques: [
        {
          title: 'Arsitektur Skimming 60 Detik',
          desc: 'Baca judul, kalimat pertama (topic sentence), dan kalimat penutup tiap paragraf untuk memetakan alur argumen tanpa tersangkut kosakata teknis.',
          tip: 'Abaikan istilah teknis seperti "dorsal anterior cingulate cortex" pada pembacaan pertama; fokus pada hubungan sebab-akibat argumen.'
        },
        {
          title: 'Heuristik Matching Headings',
          desc: 'Cocokkan ide pokok (main idea) paragraf secara utuh, bukan sekadar mencocokkan kata yang sama (detail trap).',
          tip: 'Jika sebuah heading hanya menyebut contoh pendukung dari kalimat ke-3, heading tersebut salah karena terlalu spesifik.'
        },
        {
          title: 'Logika Ketat True / False / Not Given',
          desc: 'TRUE: Makna teks dan pernyataan identik (100% cocok). FALSE: Teks secara eksplisit membantah pernyataan. NOT GIVEN: Informasi tidak disebutkan atau tidak dapat diverifikasi secara pasti.',
          tip: 'Jangan berasumsi dengan pengetahuan umummu. Hanya simpulkan apa yang tertulis hitam di atas putih.'
        }
      ],
      commonPitfalls: [
        'Membaca kata demi kata secara lambat seperti membaca novel sehingga kehabisan waktu.',
        'Memilih FALSE padahal teks sama sekali tidak membahas topik tersebut (seharusnya NOT GIVEN).',
        'Terkecoh kata-kata ekstrem seperti "always", "never", "exclusively" yang sering mengubah status kalimat menjadi FALSE.'
      ]
    },
    grammarSpotlight: [
      {
        topic: '1. Nominalisasi Akademik (Nominalisation)',
        pattern: 'Kata Kerja / Sifat ➔ Kata Benda Abstrak (Noun Phrase)',
        explanationId: 'Dalam teks akademik IELTS, kalimat tidak ditulis secara personal ("Orang bilingual bisa mengendalikan otak lebih baik"), melainkan diubah menjadi konsep abstrak terstruktur untuk menunjukkan bobot ilmiah tinggi.',
        examples: [
          {
            englishOrJp: 'Bilingual individuals navigate multiple lexicons -> The navigation of multiple lexicons fortifies neural control networks.',
            indonesian: 'Navigasi berbagai leksikon memperkuat jaringan kendali saraf.',
            breakdown: 'Verba "navigate" dinominalisasi menjadi subjek formal "The navigation of multiple lexicons".'
          },
          {
            englishOrJp: 'Bilingual older adults manifest symptoms 4.5 years later.',
            indonesian: 'Lansia bilingual menunjukkan gejala klinis 4,5 tahun lebih lambat.',
            breakdown: 'Penggunaan kata kerja formal "manifest" daripada kata percakapan "show" atau "have".'
          }
        ],
        pitfallNote: 'Dalam menulis Writing Task 2, gunakan nominalisasi untuk menaikkan nilai Grammatical Range & Accuracy ke Band 8+.'
      },
      {
        topic: '2. Inversi Negatif & Adverbial Penekan (Subject-Auxiliary Inversion)',
        pattern: 'Negative Adverbial + Auxiliary Verb + Subject + Main Verb',
        explanationId: 'Pola pembalikan posisi subjek dan kata kerja bantu setelah kata keterangan negatif/pembatas untuk memberikan penekanan retoris formal.',
        examples: [
          {
            englishOrJp: 'Not only does bilingualism attenuate cognitive interference, but it also fortifies frontoparietal networks.',
            indonesian: 'Bilingualisme tidak hanya meredam interferensi kognitif, tetapi juga memperkuat jaringan frontoparietal.',
            breakdown: 'Not only + does (auxiliary) + bilingualism (subject) + attenuate (verb).'
          },
          {
            englishOrJp: 'Rarely have epidemiological cohorts demonstrated such pronounced neuroplastic resilience.',
            indonesian: 'Jarang sekali kohort epidemiologis menunjukkan ketahanan neuroplastik yang begitu nyata.',
            breakdown: 'Rarely + have (auxiliary) + cohorts (subject) + demonstrated (main verb).'
          }
        ],
        pitfallNote: 'Jangan lupa menyertakan kata kerja bantu (do/does/did/have/is). Menulis "Not only bilingualism attenuates..." adalah kesalahan tata bahasa fatal.'
      },
      {
        topic: '3. Pasif Impersonal & Sikap Penulis (Impersonal Passive Register)',
        pattern: 'It is + Past Participle + that-clause (atau Subject + is believed/observed to + Verb)',
        explanationId: 'Digunakan oleh akademisi untuk melaporkan temuan tanpa bersikap subjektif atau memakai kata "I" atau "We".',
        examples: [
          {
            englishOrJp: 'It has been observed that non-target vocabulary competes perpetually for lemma selection.',
            indonesian: 'Telah diamati bahwa kosakata non-target bersaing secara terus-menerus dalam seleksi lema.',
            breakdown: 'Struktur objektif menghindari klaim sepihak peneliti.'
          }
        ],
        pitfallNote: 'Kuasai konstruksi ini untuk membedakan antara "klaim umum" (It is believed) dengan "fakta terbukti" (Data indicates).'
      }
    ],
    vocabularyBank: [
      {
        term: 'Inhibitory Control',
        phonetic: '/ɪnˈhɪb.ɪ.tər.i kənˈtrəʊl/',
        partOfSpeech: 'Noun Phrase',
        definitionId: 'Kemampuan kognitif untuk menekan atau menahan dorongan mental otomatis dan fokus pada target yang relevan.',
        collocation: 'exercise inhibitory control, deploy inhibitory mechanisms',
        exampleSentence: 'Bilingual speakers continuously exercise inhibitory control to suppress the unintended language.',
        translationId: 'Penutur bilingual terus-menerus melatih kontrol inhibisi untuk menekan bahasa yang tidak sedang digunakan.'
      },
      {
        term: 'Neuroplasticity',
        phonetic: '/ˌnjʊə.rəʊ.plæsˈtɪs.ə.ti/',
        partOfSpeech: 'Noun (Uncountable)',
        definitionId: 'Kemampuan jaringan saraf otak untuk berkembang, beradaptasi, dan menyusun ulang struktur sinapsis sepanjang hayat.',
        collocation: 'late-age neuroplasticity, enhance neuroplasticity, structural plasticity',
        exampleSentence: 'Late-age neuroplasticity allows geriatric patients to compensate for neuropathological lesions.',
        translationId: 'Neuroplastisitas di usia lanjut memungkinkan pasien geriatri mengimbangi lesi neuropatologis.'
      },
      {
        term: 'Attenuate',
        phonetic: '/əˈten.ju.eɪt/',
        partOfSpeech: 'Transitive Verb',
        definitionId: 'Mengurangi intensitas, dampak, kekuatan, atau efek dari sesuatu yang mengganggu.',
        collocation: 'attenuate interference, attenuate cognitive decline, attenuate risks',
        exampleSentence: 'Executive attention filters operate dynamically to attenuate linguistic competition.',
        translationId: 'Filter atensi eksekutif bekerja secara dinamis untuk meredam kompetisi linguistik.'
      },
      {
        term: 'Epidemiological Cohort',
        phonetic: '/ˌep.ɪ.diː.mi.əˈlɒdʒ.ɪ.kəl ˈkəʊ.hɔːt/',
        partOfSpeech: 'Noun Phrase',
        definitionId: 'Kelompok partisipan penelitian yang diikuti dalam jangka waktu panjang untuk mengamati pola kesehatan dan penyakit.',
        collocation: 'longitudinal cohort, recruit cohorts, prospective cohort study',
        exampleSentence: 'Epidemiological cohorts followed across European clinics confirmed a delayed onset of dementia.',
        translationId: 'Kohort epidemiologis yang dipantau di berbagai klinik Eropa mengonfirmasi penundaan timbulnya demensia.'
      },
      {
        term: 'Structural Resilience',
        phonetic: '/ˈstrʌk.tʃər.əl rɪˈzɪl.jəns/',
        partOfSpeech: 'Noun Phrase',
        definitionId: 'Ketahanan arsitektur fisik jaringan biologis terhadap kerusakan atau penuaan.',
        collocation: 'foster structural resilience, neural resilience, provide resilience against',
        exampleSentence: 'Bilingualism acts as a buffer that provides cognitive protection through structural resilience.',
        translationId: 'Bilingualisme berfungsi sebagai penyangga yang memberikan perlindungan kognitif melalui ketahanan struktural.'
      }
    ],
    annotatedText: {
      title: 'The Cognitive Architecture of Bilingualism: Executive Function & Neuroplasticity',
      paragraphs: [
        {
          label: 'Paragraf A',
          text: 'Over the past four decades, cognitive psycholinguistics has undergone a profound paradigm shift regarding the neural consequences of multi-language acquisition. Early twentieth-century pedagogical literature routinely warned that bilingualism in young children induced "mental fatigue" and "linguistic confusion." Modern neuroimaging has thoroughly dismantled this deficit model. Current fMRI and event-related potential investigations demonstrate that navigating multiple lexical and syntactic inventories actively fortifies the brain\'s dorsal anterior cingulate cortex and bilateral frontoparietal control networks.',
          translationId: 'Selama empat dekade terakhir, psikolinguistik kognitif mengalami pergeseran paradigma mendalam mengenai konsekuensi neural dari pemerolehan multibahasa. Literatur pedagogis awal abad ke-20 secara rutin memperingatkan bahwa bilingualisme pada anak memicu "kelelahan mental" dan "kebingungan bahasa." Pencitraan saraf modern telah meruntuhkan model defisit ini sepenuhnya. Penelitian fMRI membuktikan bahwa mengelola banyak kosakata dan tata bahasa justru memperkuat jaringan kendali otak.',
          mainIdeaId: 'Pergeseran pandangan ilmiah dari teori kuno (bilingualisme menimbulkan kebingungan) ke bukti modern (bilingualisme memperkuat otak).',
          keywords: ['paradigm shift', 'deficit model', 'fortifies neural networks'],
          questionMappingId: 'Menjawab Soal 1 (Matching Headings: "iii. A historical reversal: From deficit theory to structural advantage").'
        },
        {
          label: 'Paragraf B',
          text: 'The operational core of this cognitive fortification lies in inhibitory control—the conscious suppression of prepotent mental representations. When a bilingual individual communicates, both language systems remain perpetually activated. Even during monolingual interaction, the non-target vocabulary competes for phonological and semantic selection. Consequently, the brain must continuously deploy executive attentional filters to attenuate interference from competing lemmas. This perpetual cognitive mediation functions akin to resistance training for neural circuitry.',
          translationId: 'Inti operasional penguatan kognitif ini terletak pada kontrol inhibisi—yaitu penekanan sadar terhadap representasi mental bawaan. Saat seorang penutur bilingual berkomunikasi, kedua sistem bahasa tetap aktif bersamaan. Bahkan dalam percakapan satu bahasa, kosakata bahasa lain tetap bersaing memperebutkan seleksi fonologis. Akibatnya, otak harus selalu mengerahkan filter atensi untuk meredam interferensi.',
          mainIdeaId: 'Mekanisme biologis kontrol inhibisi: kedua bahasa selalu aktif bersamaan sehingga otak terlatih seperti latihan beban terus-menerus.',
          keywords: ['inhibitory control', 'perpetually activated', 'competing lemmas', 'resistance training'],
          questionMappingId: 'Menjawab Soal 2 (True/False/Not Given: Pernyataan bahwa bahasa kedua dinonaktifkan sepenuhnya adalah FALSE).'
        },
        {
          label: 'Paragraf C',
          text: 'The longitudinal consequences of this sustained neuro-computational exertion become strikingly apparent in geriatric populations. Epidemiological cohorts followed across European and North American clinics indicate that bilingual older adults manifest clinical symptoms of neurodegenerative dementias—including Alzheimer\'s pathology—approximately 4.5 years later than demographically matched monolingual peers, despite displaying comparable or greater neuropathological plaque burden on post-mortem histological examination. Bilingualism provides a cognitive buffer, delaying cognitive decline through structural resilience.',
          translationId: 'Dampak jangka panjang dari latihan saraf berkelanjutan ini terlihat sangat nyata pada populasi lansia. Kohort epidemiologis di klinik-klinik Eropa menunjukkan bahwa lansia bilingual baru memperlihatkan gejala demensia klinis sekitar 4,5 tahun lebih lambat dibanding lansia monolingual, meskipun beban plak patologisnya setara. Bilingualisme memberi perlindungan melalui ketahanan struktural.',
          mainIdeaId: 'Dampak klinis jangka panjang: menunda timbulnya gejala demensia Alzheimer hingga 4,5 tahun melalui ketahanan struktural.',
          keywords: ['geriatric populations', 'delayed 4.5 years', 'cognitive buffer', 'structural resilience'],
          questionMappingId: 'Menjawab Soal 3 (Sentence Completion: Perlindungan kognitif didapatkan melalui "structural resilience").'
        }
      ]
    }
  },

  // --- IELTS ACADEMIC MODULE 2: Passive Cooling & Environmental Engineering ---
  {
    id: 'lec_ia_read_2',
    lessonId: 'les_ia_read_2',
    trackType: 'ielts',
    level: 'ielts_academic',
    skill: 'reading',
    title: 'IELTS Academic Reading: Passive Cooling & Urban Microclimates',
    titleId: 'Membaca Akademik IELTS: Pendinginan Pasif & Iklim Mikro Perkotaan',
    subtitle: 'Teknik Pemindaian Informasi (Scanning), Hubungan Sebab-Akibat, & Analisis Pilihan Ganda',
    estimatedMinutes: 20,
    cefrLevel: 'C1 / Band 7.5–9.0',
    strategyOverview: {
      coreObjective: 'Menguasai pemahaman teks arsitektur dan fisika lingkungan, menganalisis data albedo surya, serta mengeliminasi opsi pengecoh pada soal pilihan ganda 4 opsi.',
      keyTechniques: [
        {
          title: 'Pemindaian Kata Kunci Spesifik (Scanning)',
          desc: 'Gunakan mata Anda untuk mendeteksi angka, persen, istilah teknis (albedo, emissivity, diurnal cycle) tanpa membaca kalimat per kalimat.',
          tip: 'Cari angka desimal atau satuan ilmiah terlebih dahulu karena bentuk fisiknya sangat mudah dikenali.'
        },
        {
          title: 'Eliminasi Pengecoh Pilihan Ganda (Distractor Elimination)',
          desc: 'Soal pilihan ganda IELTS sengaja memasukkan kata yang persis sama dengan teks namun memutarbalikkan maknanya.',
          tip: 'Pilihan yang menyalin kata persis sering kali merupakan perangkap; carilah sinonim atau parafrase dari ide teks.'
        }
      ],
      commonPitfalls: [
        'Tertukar antara radiasi siang hari (solar absorption) dengan radiasi malam hari (nocturnal re-radiation).',
        'Mengasumsikan bahwa material dengan albedo tinggi selalu menyerap lebih banyak panas (kebalikannya: memantulkan panas).'
      ]
    },
    grammarSpotlight: [
      {
        topic: '1. Klausa Sebab-Akibat Kompleks (Causality Markers)',
        pattern: 'Due to / Owing to / As a consequence of + Noun Phrase, Clause',
        explanationId: 'Menghubungkan fenomena fisik perkotaan dengan dampak suhu udara secara formal.',
        examples: [
          {
            englishOrJp: 'Owing to the high thermal mass of concrete canyons, urban centres retain heat into the night.',
            indonesian: 'Karena massa termal yang tinggi dari koridor beton, pusat kota menahan panas hingga malam hari.',
            breakdown: 'Owing to + Noun phrase (the high thermal mass...) + Main clause.'
          }
        ],
        pitfallNote: '"Due to" diikuti oleh kata benda, bukan klausa subjek-kata kerja utuh ("Due to concrete retains heat" adalah salah).'
      },
      {
        topic: '2. Partisipel Pasif sebagai Modifikasi Kata Benda (Reduced Relative Clauses)',
        pattern: 'Noun + Past Participle Phrase (menggantikan Noun + which is/was + Past Participle)',
        explanationId: 'Memadatkan kalimat agar padat informasi tanpa memperbanyak anak kalimat relatif (which/that).',
        examples: [
          {
            englishOrJp: 'Cool coatings engineered with titanium dioxide reflect up to 90% of solar irradiance.',
            indonesian: 'Lapisan sejuk yang dirancang dengan titanium dioksida memantulkan hingga 90% radiasi matahari.',
            breakdown: '"engineered with..." adalah pemadatan dari "which are engineered with...".'
          }
        ],
        pitfallNote: 'Pastikan Anda mengenali apakah verba berakhiran -ed berfungsi sebagai kata kerja utama atau partisipel modifikasi kata benda.'
      }
    ],
    vocabularyBank: [
      {
        term: 'Albedo Coefficient',
        phonetic: '/ælˈbiː.dəʊ kəʊ.ɪˈfɪʃ.ənt/',
        partOfSpeech: 'Noun Phrase',
        definitionId: 'Ukuran fraksi daya pantul radiasi matahari oleh suatu permukaan (skala 0.0 sampai 1.0).',
        collocation: 'high albedo, increase surface albedo, solar reflectance',
        exampleSentence: 'Surfaces with high albedo coefficients reflect incoming radiation back into the atmosphere.',
        translationId: 'Permukaan dengan koefisien albedo tinggi memantulkan kembali radiasi yang datang ke atmosfer.'
      },
      {
        term: 'Nocturnal Re-radiation',
        phonetic: '/nɒkˈtɜː.nəl riːˌreɪ.diˈeɪ.ʃən/',
        partOfSpeech: 'Noun Phrase',
        definitionId: 'Pelepasan kembali energi panas yang terserap pada siang hari ke atmosfer selama malam hari.',
        collocation: 'trap nocturnal re-radiation, delay cooling',
        exampleSentence: 'Dense building geometries inhibit nocturnal re-radiation, creating the urban heat island effect.',
        translationId: 'Geometri bangunan yang rapat menghalangi pelepasan radiasi malam hari, menciptakan efek pulau panas perkotaan.'
      }
    ]
  },

  // --- IELTS ACADEMIC MODULE 3: Writing Masterclass ---
  {
    id: 'lec_ia_write_1',
    lessonId: 'les_ia_write_1',
    trackType: 'ielts',
    level: 'ielts_academic',
    skill: 'writing',
    title: 'IELTS Academic Writing: Arsitektur Task 1 & Task 2 Band 8.0+',
    titleId: 'Studio Menulis IELTS: Arsitektur Laporan Visual & Esai Argumentatif',
    subtitle: 'Paragraf Overview Penentu Skor, Metode PEEL, & Ragam Tata Bahasa Kompleks',
    estimatedMinutes: 25,
    cefrLevel: 'C1 / Band 8.0–9.0',
    strategyOverview: {
      coreObjective: 'Menguasai 4 kriteria penilaian resmi IELTS Writing: Task Achievement (25%), Coherence & Cohesion (25%), Lexical Resource (25%), dan Grammatical Range & Accuracy (25%).',
      keyTechniques: [
        {
          title: 'Kunci Sukses Task 1: Overview Paragraf yang Jelas',
          desc: 'Tanpa paragraf Overview yang mengidentifikasi 2–3 tren utama secara global, nilai Task Achievement Anda otomatis dibatasi maksimal Band 5.0.',
          tip: 'Jangan pernah memasukkan angka data statistik di dalam paragraf Overview. Simpan angka hanya untuk Body Paragraphs!'
        },
        {
          title: 'Struktur Esai Task 2: Metode PEEL',
          desc: 'Setiap paragraf isi (Body Paragraph) harus mengikuti formula PEEL: Point (Kalimat Topik), Explanation (Penjelasan Logis), Evidence/Example (Bukti/Contoh Nyata), Link (Kaitan Kembali ke Pertanyaan).',
          tip: 'Cukup tulis 2 Body Paragraphs yang dibahas secara mendalam daripada 4 paragraf dangkal tanpa elaborasi.'
        }
      ],
      commonPitfalls: [
        'Menghabiskan lebih dari 20 menit pada Task 1 (bobot nilai Task 2 adalah 2 KALI LIPAT lebih besar dari Task 1).',
        'Menghafal kalimat pembuka klise ("Since ancient times, this issue has been debatable...") yang langsung dipotong nilainya oleh penguji IDP/British Council.'
      ]
    },
    grammarSpotlight: [
      {
        topic: '1. Perbandingan Proporsi & Tren (Comparative Language for Task 1)',
        pattern: 'While / Whereas + Clause, Main Clause with Comparative Verb',
        explanationId: 'Menghubungkan dua data yang kontras dalam satu kalimat majemuk elegan.',
        examples: [
          {
            englishOrJp: 'While solar energy generation surged threefold from 2010 to 2020, coal consumption experienced a precipitous decline.',
            indonesian: 'Sementara pembangkitan energi surya melonjak tiga kali lipat dari 2010 ke 2020, konsumsi batu bara mengalami penurunan tajam.',
            breakdown: 'Struktur kontras menunjukkan penguasaan kohesi dan tata bahasa tingkat lanjut.'
          }
        ],
        pitfallNote: 'Hindari repetisi kata "increase" dan "decrease"; gunakan "witnessed a steady upward trajectory" atau "plummeted".'
      }
    ],
    vocabularyBank: [
      {
        term: 'Precipitous',
        phonetic: '/prɪˈsɪp.ɪ.təs/',
        partOfSpeech: 'Adjective',
        definitionId: 'Sangat curam, cepat, atau drastis (biasanya penurunan).',
        collocation: 'precipitous drop, precipitous decline',
        exampleSentence: 'The region witnessed a precipitous drop in carbon emissions following the carbon tax.',
        translationId: 'Wilayah tersebut menyaksikan penurunan drastis dalam emisi karbon menyusul diterapkannya pajak karbon.'
      },
      {
        term: 'Plateau',
        phonetic: '/ˈplæt.əʊ/',
        partOfSpeech: 'Intransitive Verb / Noun',
        definitionId: 'Mencapai titik datar setelah periode kenaikan yang cepat.',
        collocation: 'reach a plateau, plateau at around 40%',
        exampleSentence: 'After a decade of exponential growth, student enrolment numbers plateaued in 2022.',
        translationId: 'Setelah satu dekade pertumbuhan pesat, angka pendaftaran mahasiswa mendatar pada tahun 2022.'
      }
    ]
  },

  // --- JLPT N5 MODULE 1: Grammar & Particles Foundation ---
  {
    id: 'lec_n5_gram_1',
    lessonId: 'les_n5_gram_1',
    trackType: 'japanese',
    level: 'jlpt_n5',
    skill: 'grammar',
    title: 'JLPT N5: Fondasi Tata Bahasa, Partikel Dasar (は・が・を・に・で・へ) & Kopula',
    titleId: 'Pusat Tata Bahasa N5: Master Partikel & Susunan Kalimat SOV',
    subtitle: 'Perbedaan Halus Antara は dan が, Penanda Aksi, Serta Perubahan Kata Sifat',
    estimatedMinutes: 20,
    cefrLevel: 'A1 / JLPT N5',
    strategyOverview: {
      coreObjective: 'Memahami logika struktur kalimat bahasa Jepang (Subjek - Objek - Predikat di akhir kalimat) dan penggunaan partikel yang akurat tanpa kebingungan.',
      keyTechniques: [
        {
          title: 'Perbedaan Partikel は (Topik) vs が (Subjek Spesifik)',
          desc: 'Partikel は memperkenalkan topik umum pembicaraan ("Mengenai saya..."). Partikel が menegaskan pelaku spesifik yang melakukan aksi atau menjawab pertanyaan "siapa/apa".',
          tip: 'Dalam kalimat tanya dengan kata tanya di awal (だれが来ますか), jawabannya selalu menggunakan が (田中さんが来ます).'
        },
        {
          title: 'Lokasi: で (Tempat Melakukan Aksi) vs に (Tempat Keberadaan / Tujuan)',
          desc: 'Gunakan で saat ada aktivitas fisik yang dilakukan (図書館で勉強する - belajar di perpustakaan). Gunakan に untuk keberadaan pasif (部屋にいる - ada di kamar) atau titik waktu pasti.',
          tip: 'Waktu yang tidak menggunakan angka (besok/hari ini/minggu depan) TIDAK memakai partikel に.'
        }
      ],
      commonPitfalls: [
        'Menempatkan kata kerja di tengah kalimat seperti bahasa Indonesia atau Inggris (Bahasa Jepang WAJIB meletakkan kata kerja di paling akhir kalimat).',
        'Menambahkan partikel に setelah kata waktu relatif seperti 今日 (kyou - hari ini) atau あした (ashita - besok).'
      ]
    },
    grammarSpotlight: [
      {
        topic: '1. Susunan Kalimat Dasar Jepang (SOV)',
        pattern: '[Subjek] は [Objek] を [Kata Kerja / Predikat]',
        explanationId: 'Predikat (kata kerja atau kata sifat) selalu berada di urutan terakhir dalam kalimat bahasa Jepang.',
        examples: [
          {
            englishOrJp: 'わたしは 日本語を 勉強します (Watashi wa nihongo o benkyou shimasu).',
            indonesian: 'Saya belajar bahasa Jepang.',
            breakdown: 'わたし (Saya) + は (Topik) + 日本語 (Bahasa Jepang) + を (Penanda Objek) + 勉強します (Belajar).'
          }
        ],
        pitfallNote: 'Objek selalu ditandai dengan partikel を (dibaca "o").'
      },
      {
        topic: '2. Permintaan Sopan (〜てください)',
        pattern: 'Kata Kerja Bentuk-Te (て形) + ください',
        explanationId: 'Pola standar untuk meminta seseorang melakukan sesuatu secara sopan dalam situasi sehari-hari.',
        examples: [
          {
            englishOrJp: 'ここに 名前を 書いてください (Koko ni namae o kaite kudasai).',
            indonesian: 'Tolong tulis nama di sini.',
            breakdown: '書いて (bentuk Te dari 書く/kaku = menulis) + ください (tolong/silakan).'
          }
        ],
        pitfallNote: 'Jangan gunakan pola ini kepada atasan atau dosen karena masih bernuansa instruksi halus; untuk atasan gunakan keigo.'
      }
    ],
    vocabularyBank: [
      {
        term: '勉強 (べんきょう - Benkyou)',
        phonetic: 'ben-kyou',
        partOfSpeech: 'Noun / Suru Verb',
        definitionId: 'Belajar, menuntut ilmu, studi.',
        collocation: '勉強する (belajar), 一生懸命勉強する (belajar sungguh-sungguh)',
        exampleSentence: '毎晩、日本語を2時間勉強します。',
        translationId: 'Setiap malam, saya belajar bahasa Jepang selama 2 jam.'
      },
      {
        term: '図書館 (としょかん - Toshokan)',
        phonetic: 'to-sho-kan',
        partOfSpeech: 'Noun',
        definitionId: 'Perpustakaan tempat membaca dan meminjam buku.',
        collocation: '図書館で本を借りる (meminjam buku di perpustakaan)',
        exampleSentence: '放課後、大学の図書館でレポートを書きます。',
        translationId: 'Setelah kelas selesai, saya menulis laporan di perpustakaan universitas.'
      }
    ]
  },

  // --- JLPT N4 MODULE 2: Potential & Benefactives ---
  {
    id: 'lec_n4_gram_1',
    lessonId: 'les_n4_gram_1',
    trackType: 'japanese',
    level: 'jlpt_n4',
    skill: 'grammar',
    title: 'JLPT N4: Bentuk Potensial (可能形) & Benefaktif (〜てあげる・もらう・くれる)',
    titleId: 'Pusat Tata Bahasa N4: Bentuk Kemampuan & Ekspresi Kebaikan',
    subtitle: 'Perubahan Partikel を Menjadi が Pada Kata Kerja Potensial & Nuansa Psikologis Memberi/Menerima',
    estimatedMinutes: 20,
    cefrLevel: 'A2 / JLPT N4',
    strategyOverview: {
      coreObjective: 'Menguasai konjugasi kata kerja bentuk "bisa/dapat" dan mengekspresikan perbuatan baik antarsesama manusia dengan rasa hormat dan empati.',
      keyTechniques: [
        {
          title: 'Aturan Partikel Bentuk Potensial',
          desc: 'Saat kata kerja diubah ke bentuk potensial (bisa/dapat), partikel objek を biasanya berubah menjadi が.',
          tip: 'Contoh: 漢字を書く (menulis kanji) ➔ 漢字が書ける (bisa menulis kanji).'
        },
        {
          title: 'Tiga Dimensi Kebaikan (Benefactives)',
          desc: 'あげる: Saya melakukan kebaikan untuk orang lain. くれる: Orang lain berinisiatif melakukan kebaikan untuk saya. もらう: Saya meminta/menerima bantuan orang lain atas permintaan saya.',
          tip: 'Gunakan くれる saat seseorang membantu Anda secara sukarela tanpa Anda minta.'
        }
      ],
      commonPitfalls: [
        'Menggunakan あげる kepada atasan atau orang yang lebih tua (dianggap sombong; gunakan 差し上げる).',
        'Lupa mengubah vokal akhir Golongan I ke baris -e saat membentuk potensial (Ik-u ➔ Ik-eru).'
      ]
    },
    grammarSpotlight: [
      {
        topic: '1. Konjugasi Bentuk Potensial (Bisa/Mampu)',
        pattern: 'Gol. I: -u ➔ -eru | Gol. II: -ru ➔ -rareru | Gol. III: する ➔ できる, 来る ➔ こられる',
        explanationId: 'Menyatakan kemampuan internal seseorang atau kemungkinan situasi eksternal.',
        examples: [
          {
            englishOrJp: '日本語の新聞が読めますか (Nihongo no shinbun ga yomemasu ka).',
            indonesian: 'Apakah Anda bisa membaca koran bahasa Jepang?',
            breakdown: '読む (yomu) berubah menjadi 読める (yomeru) dengan partikel が.'
          }
        ],
        pitfallNote: 'Kata kerja できる sudah bermakna bisa, jangan ditambahkan bentuk potensial lagi.'
      }
    ],
    vocabularyBank: [
      {
        term: '案内する (あんないする - Annai suru)',
        phonetic: 'an-nai-su-ru',
        partOfSpeech: 'Suru Verb',
        definitionId: 'Memandu, mengantar, menunjukkan jalan atau informasi.',
        collocation: '街を案内してくれる (memandu jalan di kota untuk saya)',
        exampleSentence: '友達が東京の街を案内してくれました。',
        translationId: 'Teman saya berbaik hati memandu saya berkeliling kota Tokyo.'
      }
    ]
  }
];

interface LectureViewProps {
  activeTrack: LevelCode;
  initialLessonId?: string;
  onStartDrill: (lessonId: string) => void;
  onNavigateToWriting?: () => void;
  onNavigateToSRS?: () => void;
}

export const LectureView: React.FC<LectureViewProps> = ({
  activeTrack,
  initialLessonId,
  onStartDrill,
  onNavigateToWriting,
  onNavigateToSRS
}) => {
  const { language, t } = useLanguage();
  const isJapaneseTrack = activeTrack.startsWith('jlpt_') || activeTrack.startsWith('ja_');

  // Filter modules matching current track
  const availableModules = LECTURE_MODULES.filter(m =>
    isJapaneseTrack ? m.trackType === 'japanese' : m.trackType === 'ielts'
  );

  // Active module state
  const [selectedModuleId, setSelectedModuleId] = useState<string>(() => {
    if (initialLessonId) {
      const found = availableModules.find(m => m.lessonId === initialLessonId);
      if (found) return found.id;
    }
    return availableModules[0]?.id || '';
  });

  // Active tab state: 'overview' | 'grammar' | 'vocab' | 'text'
  const [activeTab, setActiveTab] = useState<'overview' | 'grammar' | 'vocab' | 'text'>('overview');

  // Expanded paragraph accordion in text analysis
  const [expandedParaIndex, setExpandedParaIndex] = useState<number>(0);

  // When activeTrack or initialLessonId changes
  useEffect(() => {
    if (initialLessonId) {
      const match = availableModules.find(m => m.lessonId === initialLessonId);
      if (match) {
        setSelectedModuleId(match.id);
        return;
      }
    }
    if (!availableModules.some(m => m.id === selectedModuleId)) {
      setSelectedModuleId(availableModules[0]?.id || '');
    }
  }, [activeTrack, initialLessonId, availableModules]);

  const activeModule = availableModules.find(m => m.id === selectedModuleId) || availableModules[0];

  if (!activeModule) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 text-center text-stone-500">
        Belum ada modul kuliah tersedia untuk tingkat ini.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-6 sm:py-8 space-y-6">
      
      {/* Top Breadcrumb & Title Hero */}
      <div className="bg-washi-50 dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-2xl p-5 sm:p-7 shadow-sm transition-colors">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
              isJapaneseTrack
                ? 'bg-vermilion-100 dark:bg-vermilion-950 text-vermilion-700 dark:text-vermilion-300 border border-vermilion-200 dark:border-vermilion-800'
                : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800'
            }`}>
              <GraduationCap className="w-3.5 h-3.5" />
              {isJapaneseTrack ? 'Pusat Belajar JLPT' : 'IELTS Academic Learning Center'}
            </span>
            <span className="text-xs text-stone-400 font-mono">
              {activeModule.cefrLevel}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-stone-500">
            <Clock className="w-3.5 h-3.5" />
            <span>Estimasi Belajar: ~{activeModule.estimatedMinutes} menit</span>
          </div>
        </div>

        {/* Module Title */}
        <h1 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
          {language === 'id' ? activeModule.titleId : activeModule.title}
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
          {activeModule.subtitle}
        </p>

        {/* Module Switcher Pills */}
        <div className="mt-5 pt-4 border-t border-washi-200 dark:border-sumi-800 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-medium text-stone-500 dark:text-stone-400 shrink-0 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5" /> Modul Kuliah:
          </span>
          {availableModules.map((mod, idx) => (
            <button
              key={mod.id}
              onClick={() => setSelectedModuleId(mod.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                selectedModuleId === mod.id
                  ? isJapaneseTrack
                    ? 'bg-vermilion-500 text-white shadow-sm'
                    : 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-washi-200/60 dark:bg-sumi-800 text-stone-700 dark:text-stone-300 hover:bg-washi-200'
              }`}
            >
              <span>{idx + 1}.</span>
              <span className="max-w-[200px] truncate">
                {language === 'id' ? mod.titleId.split(':')[0] : mod.title.split(':')[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 4 Deep Study Tabs */}
      <div className="flex border-b border-washi-300 dark:border-sumi-800 space-x-1 sm:space-x-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'overview'
              ? isJapaneseTrack
                ? 'border-vermilion-500 text-vermilion-600 dark:text-vermilion-400'
                : 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>1. Materi & Strategi Utama</span>
        </button>

        <button
          onClick={() => setActiveTab('grammar')}
          className={`pb-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'grammar'
              ? isJapaneseTrack
                ? 'border-vermilion-500 text-vermilion-600 dark:text-vermilion-400'
                : 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
          }`}
        >
          <PenTool className="w-4 h-4" />
          <span>2. Fokus Tata Bahasa ({activeModule.grammarSpotlight.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('vocab')}
          className={`pb-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'vocab'
              ? isJapaneseTrack
                ? 'border-vermilion-500 text-vermilion-600 dark:text-vermilion-400'
                : 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
          }`}
        >
          <Languages className="w-4 h-4" />
          <span>3. Bank Kosakata & Kolokasi ({activeModule.vocabularyBank.length})</span>
        </button>

        {activeModule.annotatedText && (
          <button
            onClick={() => setActiveTab('text')}
            className={`pb-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'text'
                ? isJapaneseTrack
                  ? 'border-vermilion-500 text-vermilion-600 dark:text-vermilion-400'
                  : 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>4. Bedah Teks & Analisis Soal</span>
          </button>
        )}
      </div>

      {/* TAB CONTENT 1: Overview & Strategy */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Core Objective Card */}
          <div className="bg-washi-50 dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-xl p-5 shadow-sm">
            <h2 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Tujuan Pembelajaran Modul (Learning Outcomes)
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              {activeModule.strategyOverview.coreObjective}
            </p>
          </div>

          {/* Key Heuristics & Techniques */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeModule.strategyOverview.keyTechniques.map((tech, idx) => (
              <div
                key={idx}
                className="bg-washi-50 dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-xl p-4 flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded-full bg-washi-200 dark:bg-sumi-800 text-stone-700 dark:text-stone-300 flex items-center justify-center text-xs font-bold font-mono">
                      {idx + 1}
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100">
                      {tech.title}
                    </h3>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                    {tech.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-washi-200 dark:border-sumi-800 bg-amber-50/50 dark:bg-amber-950/20 -mx-4 -mb-4 p-3 rounded-b-xl">
                  <div className="text-[11px] text-amber-800 dark:text-amber-300 flex items-start gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span><strong>Tips Penguji:</strong> {tech.tip}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Common Pitfalls to Avoid */}
          <div className="bg-red-50/60 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 rounded-xl p-5">
            <h3 className="text-xs sm:text-sm font-bold text-red-800 dark:text-red-300 flex items-center gap-2 mb-3">
              <Info className="w-4 h-4 text-red-500 shrink-0" />
              Jebakan Umum Yang Harus Dihindari (Common Traps & Distractors)
            </h3>
            <ul className="space-y-2">
              {activeModule.strategyOverview.commonPitfalls.map((pitfall, pIdx) => (
                <li key={pIdx} className="text-xs text-red-900 dark:text-red-200 flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span>{pitfall}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: Grammar Spotlight */}
      {activeTab === 'grammar' && (
        <div className="space-y-6 animate-fadeIn">
          {activeModule.grammarSpotlight.map((gram, gIdx) => (
            <div
              key={gIdx}
              className="bg-washi-50 dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-xl p-5 shadow-sm space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-washi-200 dark:border-sumi-800 pb-3">
                <h3 className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100">
                  {gram.topic}
                </h3>
                <span className="px-2.5 py-1 rounded bg-stone-100 dark:bg-sumi-800 text-[11px] font-mono text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-sumi-700">
                  Pola: {gram.pattern}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                {gram.explanationId}
              </p>

              {/* Examples Breakdown */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  Contoh Penggunaan & Bedah Kalimat:
                </h4>
                {gram.examples.map((ex, eIdx) => (
                  <div
                    key={eIdx}
                    className="p-3.5 rounded-lg bg-washi-100/70 dark:bg-sumi-850 border border-washi-300/80 dark:border-sumi-750 space-y-1.5"
                  >
                    <div className="text-xs sm:text-sm font-semibold text-stone-900 dark:text-stone-100 font-serif">
                      "{ex.englishOrJp}"
                    </div>
                    <div className="text-xs text-stone-600 dark:text-stone-400">
                      <strong>Arti:</strong> {ex.indonesian}
                    </div>
                    <div className="text-[11px] text-indigo-700 dark:text-indigo-300 font-mono pt-1">
                      ➔ {ex.breakdown}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pitfall Note */}
              <div className="text-xs text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30 p-3 rounded-lg border border-amber-200 dark:border-amber-900/40 flex items-start gap-2">
                <Lightbulb className="w-4 h-4 shrink-0 text-amber-500 mt-0.5" />
                <span><strong>Catatan Penting:</strong> {gram.pitfallNote}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB CONTENT 3: Vocabulary & Collocation Bank */}
      {activeTab === 'vocab' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/40 text-xs text-indigo-900 dark:text-indigo-200 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Languages className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              Daftar kosakata resmi standar Academic Word List (AWL) & domain spesifik untuk modul ini.
            </span>
            {onNavigateToSRS && (
              <button
                onClick={onNavigateToSRS}
                className="px-2.5 py-1 rounded bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shrink-0"
              >
                Latih di Kartu SRS ➔
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeModule.vocabularyBank.map((voc, vIdx) => (
              <div
                key={vIdx}
                className="bg-washi-50 dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-xl p-4 shadow-sm flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100">
                      {voc.term}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-washi-200 dark:bg-sumi-800 text-stone-600 dark:text-stone-400">
                      {voc.partOfSpeech}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-stone-400 dark:text-stone-500 mt-0.5">
                    {voc.phonetic}
                  </div>
                  <p className="mt-2 text-xs text-stone-700 dark:text-stone-300 leading-relaxed font-medium">
                    {voc.definitionId}
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-washi-200 dark:border-sumi-800 text-xs">
                  <div className="text-stone-600 dark:text-stone-400">
                    <span className="font-semibold text-stone-800 dark:text-stone-200">Kolokasi:</span>{' '}
                    <span className="font-mono text-indigo-600 dark:text-indigo-400">{voc.collocation}</span>
                  </div>
                  <div className="bg-washi-100/60 dark:bg-sumi-850 p-2.5 rounded text-[11px] text-stone-700 dark:text-stone-300 italic">
                    "{voc.exampleSentence}"
                  </div>
                  <div className="text-[11px] text-stone-500 dark:text-stone-400">
                    {voc.translationId}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT 4: Annotated Text & Question Breakdown */}
      {activeTab === 'text' && activeModule.annotatedText && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-washi-50 dark:bg-sumi-900 border border-washi-300 dark:border-sumi-800 rounded-xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 mb-1 flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              {activeModule.annotatedText.title}
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Klik pada tiap paragraf untuk membaca teks asli, terjemahan lengkap bahasa Indonesia, ide pokok, dan pemetaan ke soal ujian.
            </p>
          </div>

          <div className="space-y-4">
            {activeModule.annotatedText.paragraphs.map((para, pIdx) => {
              const isExpanded = expandedParaIndex === pIdx;
              return (
                <div
                  key={pIdx}
                  className={`border rounded-xl transition-all ${
                    isExpanded
                      ? 'border-indigo-400 dark:border-indigo-700 bg-washi-50 dark:bg-sumi-900 shadow-md'
                      : 'border-washi-300 dark:border-sumi-800 bg-washi-50/60 dark:bg-sumi-900/60 hover:border-washi-400'
                  }`}
                >
                  {/* Accordion Header */}
                  <button
                    onClick={() => setExpandedParaIndex(isExpanded ? -1 : pIdx)}
                    className="w-full text-left p-4 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="px-2.5 py-1 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-xs">
                        {para.label}
                      </span>
                      <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 line-clamp-1">
                        {para.mainIdeaId}
                      </span>
                    </div>
                    <span className="text-xs text-indigo-600 dark:text-indigo-400 shrink-0 font-medium">
                      {isExpanded ? 'Tutup ▲' : 'Buka Bedah ▼'}
                    </span>
                  </button>

                  {/* Accordion Body */}
                  {isExpanded && (
                    <div className="p-4 pt-0 border-t border-washi-200 dark:border-sumi-800 space-y-4 mt-2">
                      {/* Original English Text */}
                      <div className="space-y-1">
                        <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                          Teks Asli (English Stimulus):
                        </span>
                        <div className="p-3.5 rounded-lg bg-stone-100/70 dark:bg-sumi-950 font-serif text-xs sm:text-sm text-stone-900 dark:text-stone-100 leading-relaxed border border-stone-200 dark:border-sumi-800">
                          {para.text}
                        </div>
                      </div>

                      {/* Indonesian Translation */}
                      <div className="space-y-1">
                        <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                          Terjemahan Akurat Bahasa Indonesia:
                        </span>
                        <div className="p-3.5 rounded-lg bg-washi-100/50 dark:bg-sumi-850 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed border border-washi-300/60 dark:border-sumi-750">
                          {para.translationId}
                        </div>
                      </div>

                      {/* Keywords & Question Mapping */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <div className="p-3 rounded-lg bg-washi-200/40 dark:bg-sumi-800 text-xs">
                          <span className="font-semibold text-stone-800 dark:text-stone-200 block mb-1">
                            Kata Kunci Penting:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {para.keywords.map((kw, kIdx) => (
                              <span
                                key={kIdx}
                                className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 text-[11px] font-mono border border-indigo-200 dark:border-indigo-800"
                              >
                                {kw}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="p-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 text-xs">
                          <span className="font-semibold text-emerald-800 dark:text-emerald-300 block mb-1">
                            Korelasi Soal Ujian:
                          </span>
                          <span className="text-emerald-900 dark:text-emerald-200 text-[11px]">
                            {para.questionMappingId}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Action Footer: Ready to Test Your Understanding? */}
      <div className="bg-gradient-to-r from-stone-900 to-stone-800 dark:from-sumi-950 dark:to-sumi-900 text-white rounded-2xl p-6 sm:p-7 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-5 transition-all">
        <div className="space-y-1.5 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base sm:text-lg font-bold tracking-tight">
              Sudah Memahami Materi & Kosakata Modul Ini?
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
            Terapkan strategi skimming, analisis tata bahasa, dan kosakata yang telah Anda pelajari pada sesi latihan soal interaktif berwaktu.
          </p>
        </div>

        <button
          onClick={() => onStartDrill(activeModule.lessonId)}
          className={`px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm shadow-md flex items-center gap-2.5 transition-all transform active:scale-95 shrink-0 ${
            isJapaneseTrack
              ? 'bg-vermilion-500 hover:bg-vermilion-600 text-white'
              : 'bg-indigo-600 hover:bg-indigo-500 text-white'
          }`}
        >
          <PlayCircle className="w-4 h-4" />
          <span>Mulai Latihan Mandiri (Uji Soal)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
