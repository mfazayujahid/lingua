import { Database as DatabaseType } from 'better-sqlite3';

export interface WritingPromptSeedItem {
  id: string;
  task_type: string;
  category: string;
  prompt_title: string;
  prompt_text: string;
  visual_asset_url: string | null;
  visual_data_points: Record<string, any> | null;
  time_limit_minutes: number;
  target_word_count: number;
  model_band_8_response: string;
  guidance_notes: string[];
  title_id: string;
  prompt_text_id: string;
  guidance_notes_id: string[];
  model_strengths_en: string[];
  model_strengths_id: string[];
  benchmark_band: number;
}

export const WRITING_PROMPTS_SEEDS: WritingPromptSeedItem[] = [
  // 1. Academic Task 1 Line Graph (Renewable Energy Consumption Trends 2010-2025)
  {
    id: 'ielts_write_t1_acad_seed01',
    task_type: 'task_1',
    category: 'Academic Task 1: Line Graph & Comparative Data Synthesis',
    prompt_title: 'Academic Task 1: Renewable Energy Consumption Trends (2010–2025)',
    prompt_text: 
      'The line graph and table show the proportion of electricity generated from renewable sources (wind, solar, hydroelectric) versus fossil fuels (coal, gas) in four European countries (Germany, the UK, Spain, and Poland) between 2010 and 2025, with projections extending to 2030.\n\n' +
      'Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
    visual_asset_url: '/assets/diagrams/ielts_t1_renewable_energy.svg',
    visual_data_points: {
      chartType: 'line_graph_and_table',
      unit: '% of total domestic electricity generation',
      years: [2010, 2015, 2020, 2025, 2030],
      countries: {
        Germany: {
          renewable: [18, 28, 41, 51, 65],
          fossilFuel: [82, 72, 59, 49, 35]
        },
        UnitedKingdom: {
          renewable: [9, 21, 35, 42, 55],
          fossilFuel: [91, 79, 65, 58, 45]
        },
        Spain: {
          renewable: [24, 33, 39, 46, 52],
          fossilFuel: [76, 67, 61, 54, 48]
        },
        Poland: {
          renewable: [7, 10, 15, 22, 28],
          fossilFuel: [93, 90, 85, 78, 72]
        }
      },
      keyTrends: [
        'Germany and the UK witnessed the steepest acceleration in renewable adoption (+33 percentage points each).',
        'Germany established itself as the leading renewable producer by 2025 at 51%.',
        'Poland retained overwhelming hydrocarbon dominance (78% fossil fuel in 2025; 72% forecast in 2030).'
      ]
    },
    time_limit_minutes: 20,
    target_word_count: 150,
    model_band_8_response:
      'The provided line graph and table delineate the transition in electricity generation from renewable and fossil fuel sources across four European nations between 2010 and 2025, with projections extending to 2030.\n\n' +
      'Overall, it is manifest that Germany, the United Kingdom, and Spain experienced substantial expansions in their renewable energy shares over the fifteen-year period, concomitant with a pronounced retreat in fossil fuel reliance. Conversely, Poland maintained an overwhelmingly fossil-dominant matrix throughout, displaying only marginal renewable adoption.\n\n' +
      'Examining the Western European nations, the United Kingdom witnessed the most dramatic trajectory; renewable output surged from a modest 9% in 2010 to 42% by 2025, and is forecast to attain 55% by 2030. Germany exhibited comparably robust momentum, climbing steadily from 18% to 51% in 2025, establishing itself as the leading renewable generator. In Spain, renewable generation demonstrated an initial surge followed by a moderate plateau, rising from 24% to 46% by 2025.\n\n' +
      'In stark contrast, Poland remained heavily reliant on conventional hydrocarbons. In 2010, coal and natural gas accounted for an overwhelming 93% of Polish power generation, declining only marginally to 78% by 2025. While Germany and the UK are projected to restrict fossil fuel reliance to beneath 30% by 2030, Poland\'s fossil fuel share is predicted to persist above 70%, highlighting an enduring regional divergence in green energy transition.',
    guidance_notes: [
      'Structure into 4 distinct paragraphs: Introduction, Overview, Western European Surge, and Poland Contrast.',
      'Ensure the Overview encapsulates the broad contrast without specific numeric figures; save data points for body paragraphs.',
      'Employ high-register trend lexical items (e.g. "delineate", "substantial expansions", "concomitant with", "dramatic trajectory", "in stark contrast").',
      'Maintain an objective expository register with zero speculation regarding environmental policy causes.'
    ],
    title_id: 'Tugas Akademik 1: Tren Konsumsi Energi Terbarukan (2010–2025)',
    prompt_text_id:
      'Grafik garis dan tabel menunjukkan proporsi listrik yang dihasilkan dari sumber energi terbarukan (angin, surya, hidro) dibandingkan bahan bakar fosil (batu bara, gas) di empat negara Eropa (Jerman, Inggris, Spanyol, dan Polandia) antara tahun 2010 dan 2025, beserta proyeksi hingga tahun 2030.\n\n' +
      'Ringkas informasi tersebut dengan memilih dan melaporkan fitur-fitur utama, serta buatlah perbandingan yang relevan. Tulis minimal 150 kata.',
    guidance_notes_id: [
      'Bagi esai menjadi 4 paragraf: Pendahuluan, Ringkasan Umum (Overview), Lonjakan Eropa Barat, dan Kontras Polandia.',
      'Pastikan Overview merangkum tren besar tanpa angka spesifik; simpan persentase untuk paragraf isi.',
      'Gunakan kosakata variatif untuk tren akademis (seperti "delineate", "substantial expansions", "concomitant with", "stark contrast").',
      'Pertahankan nada laporan objektif tanpa menduga-duga alasan kebijakan di balik data tersebut.'
    ],
    model_strengths_en: [
      'Exemplary overview capturing macroeconomic divergent trajectories',
      'Accurate data point selection illustrating contrast without unnecessary enumeration',
      'Advanced grammatical range with concessive and participial clauses (> 80% CSR)'
    ],
    model_strengths_id: [
      'Gambaran umum (overview) sempurna yang menangkap tren makro yang kontras',
      'Pemilihan data akurat yang menonjolkan perbandingan tanpa pengulangan berlebih',
      'Rentang tata bahasa tingkat tinggi dengan klausa konsesif dan partisipial (> 80% CSR)'
    ],
    benchmark_band: 8.5
  },

  // 2. General Training Task 1 Semi-Formal Letter (Community Library Weekend Opening Request)
  {
    id: 'ielts_write_t1_gt_seed01',
    task_type: 'task_1',
    category: 'General Training Task 1: Semi-Formal Letter',
    prompt_title: 'General Training Task 1: Community Library Weekend Opening Request',
    prompt_text:
      'You are a resident in a local community. The local community library is currently closed on weekends, which prevents many working residents and students from using its facilities and study spaces.\n\n' +
      'Write a semi-formal letter to the Head Librarian.\n\n' +
      'In your letter:\n' +
      '• Explain why the current weekday-only opening hours are inconvenient for you and other residents\n' +
      '• Describe the benefits that weekend opening would bring to the local community\n' +
      '• Suggest feasible arrangements for staffing or trial operating hours\n\n' +
      'Write at least 150 words. You do NOT need to write any addresses. Begin your letter with: Dear Head Librarian,',
    visual_asset_url: null,
    visual_data_points: {
      letterType: 'semi_formal',
      recipient: 'Head Librarian, Oakridge Community Library',
      bulletPoints: [
        'Explain weekday inconvenience for working residents and secondary/university students',
        'Detail community benefits: quiet study zones, digital literacy access, family reading sessions',
        'Propose feasible staffing: volunteer community rota and a 4-hour trial period on Saturday mornings'
      ]
    },
    time_limit_minutes: 20,
    target_word_count: 150,
    model_band_8_response:
      'Dear Head Librarian,\n\n' +
      'I am writing to respectfully request that the library committee consider extending the operating hours of Oakridge Community Library to include weekend openings.\n\n' +
      'Under the current schedule, the facility operates exclusively from Monday to Friday between 9:00 AM and 5:00 PM. While this timetable accommodates retirees and young children, it poses significant inconvenience for working professionals and secondary students who commute outside the borough during standard business hours. Consequently, those who could benefit most from the quiet reference archives and specialized digital collections are effectively disenfranchised from utilizing them.\n\n' +
      'Reopening on weekends, even on a modified schedule, would confer substantial educational and social dividends upon our neighborhood. It would provide students with a secure, distraction-free environment for collaborative revision and exam preparation, while allowing working parents to introduce younger children to literacy initiatives and weekend borrowing services.\n\n' +
      'To address staffing constraints, I suggest inaugurating a three-month trial period focusing solely on Saturday mornings from 10:00 AM to 2:00 PM. Operating during this compressed window could be sustained by partnering with trained community volunteers and local university interns alongside a single permanent staff supervisor, thereby minimizing municipal budgetary impact.\n\n' +
      'I trust you will give this proposal favorable consideration, and I welcome the opportunity to discuss this initiative further.\n\n' +
      'Yours sincerely,\n' +
      'Alexander Campbell',
    guidance_notes: [
      'Maintain a consistent respectful, constructive semi-formal register throughout.',
      'Address all three prompt bullet points in dedicated, well-developed body paragraphs.',
      'Use proper salutation ("Dear Head Librarian,") and standard formal sign-off ("Yours sincerely,").',
      'Offer concrete, realistic suggestions (e.g. volunteer partnerships, trial period) to maximize Task Achievement.'
    ],
    title_id: 'Tugas General Training 1: Permohonan Pembukaan Perpustakaan Komunitas di Akhir Pekan',
    prompt_text_id:
      'Anda adalah seorang warga di komunitas lokal. Perpustakaan komunitas setempat saat ini tutup pada akhir pekan, sehingga banyak warga yang bekerja dan pelajar tidak dapat memanfaatkan fasilitas dan ruang belajarnya.\n\n' +
      'Tulis surat semi-formal kepada Kepala Perpustakaan.\n\n' +
      'Dalam surat Anda:\n' +
      '• Jelaskan mengapa jam buka hari kerja saja saat ini menyulitkan Anda dan warga lainnya\n' +
      '• Deskripsikan manfaat yang akan diberikan oleh pembukaan akhir pekan bagi masyarakat setempat\n' +
      '• Sarankan pengaturan yang memungkinkan untuk staf atau jam operasional uji coba\n\n' +
      'Tulis minimal 150 kata. Anda TIDAK perlu menuliskan alamat apa pun. Awali surat Anda dengan: Dear Head Librarian,',
    guidance_notes_id: [
      'Pertahankan nada semi-formal yang sopan dan konstruktif dari awal hingga akhir surat.',
      'Tuntaskan ketiga poin instruksi dalam paragraf-paragraf isi yang terstruktur rapi.',
      'Gunakan salam pembuka ("Dear Head Librarian,") dan salam penutup standar formal ("Yours sincerely,").',
      'Berikan solusi yang realistis dan aplikatif (seperti relawan komunitas dan uji coba jam buka) untuk meraih skor Task Achievement optimal.'
    ],
    model_strengths_en: [
      'Comprehensive, highly persuasive coverage of all 3 required bullet points',
      'Flawless semi-formal register and diplomatic administrative vocabulary',
      'Seamless coherence with organic paragraph transitions'
    ],
    model_strengths_id: [
      'Cakupan komprehensif dan sangat persuasif untuk ketiga butir instruksi',
      'Laras bahasa semi-formal yang sempurna dengan kosakata administratif diplomatik',
      'Koherensi yang sangat mulus dengan transisi antarparagraf yang alami'
    ],
    benchmark_band: 8.5
  },

  // 3. Academic & GT Task 2 Essay (AI in Healthcare Diagnosis: Autonomous vs Physician-in-the-Loop)
  {
    id: 'ielts_write_t2_discursive_seed01',
    task_type: 'task_2',
    category: 'Academic & GT Task 2: Discursive Essay (Discussion & Opinion)',
    prompt_title: 'Task 2 Discursive Essay: AI in Healthcare Diagnosis (Autonomous vs Physician-in-the-Loop)',
    prompt_text:
      'In recent years, artificial intelligence systems have demonstrated remarkable accuracy in diagnosing complex medical conditions from medical imaging and clinical data, often matching or exceeding human specialists.\n\n' +
      'Some people believe that AI diagnostics should operate autonomously to eliminate diagnostic backlogs and human diagnostic error, while others argue that medical decisions must always require a licensed physician-in-the-loop to ensure ethical oversight and empathetic patient care.\n\n' +
      'Discuss both views and give your own opinion.\n\n' +
      'Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
    visual_asset_url: null,
    visual_data_points: {
      essayType: 'discussion_and_opinion',
      theme: 'Artificial Intelligence in Clinical Diagnostics & Medical Ethics',
      perspectives: {
        viewA_autonomousAI: [
          'Rapid algorithmic throughput eliminating chronic healthcare bottlenecks',
          'Algorithmic pattern recognition exceeding human visual fatigue in radiology and oncology',
          'Democratization of expert-level diagnostic screening in underserved rural clinics'
        ],
        viewB_physicianInTheLoop: [
          'Uninterpretable "black-box" deep learning models lacking transparent clinical accountability',
          'Inability of algorithms to assess holistic patient psychosomatic context and moral nuance',
          'The critical requirement for human empathy and bedside communication during terminal prognoses'
        ]
      }
    },
    time_limit_minutes: 40,
    target_word_count: 250,
    model_band_8_response:
      'The deployment of artificial intelligence in clinical diagnostics has prompted a profound debate regarding the future of healthcare delivery. While proponents argue that fully autonomous diagnostic algorithms can eliminate human diagnostic fatigue and bridge critical specialist shortages, critics contend that the practice of medicine is fundamentally human, requiring physician oversight to preserve ethical accountability and empathetic care. This essay will examine both perspectives before arguing that while autonomous systems offer unprecedented analytical precision, AI must strictly function as a clinical co-pilot within a physician-in-the-loop paradigm.\n\n' +
      'On the one hand, advocates of autonomous AI diagnostics highlight the formidable speed and diagnostic accuracy that machine learning models bring to bear on vast medical datasets. Deep learning neural networks trained on millions of radiograms and histopathological biopsies can detect microscopic malignancies long before they become discernible to the human eye, substantially attenuating diagnostic error rates. Furthermore, in resource-constrained developing nations and remote clinics where oncologists and radiologists are severely deficient, autonomous screening platforms can process backlogs instantaneously, enabling timely triage and life-saving interventions that would otherwise be deferred indefinitely.\n\n' +
      'Conversely, opponents mount compelling arguments regarding clinical liability, the opacity of algorithmic reasoning, and the indispensability of human bedside empathy. Artificial neural networks frequently operate as inscrutable "black boxes", generating probabilistic classifications without explicating the pathophysiological rationale. In catastrophic misdiagnoses, establishing legal liability becomes deeply problematic. More importantly, healing transcends statistical probability; it demands empathetic communication, moral discernment, and personalized consideration of a patient\'s emotional vulnerabilities when delivering life-altering prognoses—qualities that silicon processors fundamentally cannot emulate.\n\n' +
      'In conclusion, although autonomous diagnostic algorithms possess extraordinary diagnostic acumen that should be vigorously harnessed, delegating unchecked decision-making to machines jeopardizes patient safety and ethical integrity. I firmly believe the optimal paradigm is one of symbiotic intelligence, where AI provides rapid empirical insight while licensed physicians retain ultimate clinical authority and deliver compassionate human care.',
    guidance_notes: [
      'Dedicate one body paragraph to View A (Autonomous AI) and another to View B (Physician-in-the-Loop) before concluding with your explicit personal stance.',
      'Provide deep thematic development using domain-relevant academic terminology (e.g. "pathophysiological rationale", "symbiotic intelligence", "diagnostic triage").',
      'Ensure clear paragraph topic sentences that logically forecast the argumentation within.',
      'Deliver an unequivocal conclusion that harmonizes the competing perspectives without introducing brand-new arguments.'
    ],
    title_id: 'Tugas 2 Esai Diskursif: AI dalam Diagnosis Medis (Otonom vs Dokter Pendamping)',
    prompt_text_id:
      'Dalam beberapa tahun terakhir, sistem kecerdasan buatan telah menunjukkan akurasi luar biasa dalam mendiagnosis kondisi medis kompleks dari pencitraan medis dan data klinis, sering kali menyamai atau melampaui dokter spesialis manusia.\n\n' +
      'Sebagian orang meyakini bahwa diagnostik AI harus beroperasi secara otonom untuk mengeliminasi antrean medis dan kesalahan diagnosis manusia, sementara yang lain berpendapat bahwa keputusan medis harus selalu melibatkan dokter berlisensi (physician-in-the-loop) untuk memastikan pengawasan etis dan perawatan pasien yang empatik.\n\n' +
      'Diskusikan kedua pandangan tersebut dan berikan pendapat Anda sendiri.\n\n' +
      'Berikan alasan untuk jawaban Anda dan sertakan contoh yang relevan dari pengetahuan atau pengalaman Anda. Tulis minimal 250 kata.',
    guidance_notes_id: [
      'Alokasikan satu paragraf tubuh untuk Sudut Pandang A (AI Otonom) dan satu paragraf untuk Sudut Pandang B (Dokter Pendamping) sebelum menyimpulkan dengan posisi pribadi yang tegas.',
      'Kembangkan ide secara mendalam menggunakan terminologi akademis medis (seperti "pathophysiological rationale", "symbiotic intelligence", "diagnostic triage").',
      'Gunakan kalimat topik yang jelas di awal setiap paragraf untuk memandu alur logika pembaca.',
      'Sajikan kesimpulan konklusif yang memadukan argumen tanpa menambahkan topik perdebatan baru.'
    ],
    model_strengths_en: [
      'Deep, balanced philosophical and practical evaluation of both perspectives',
      'Sophisticated Academic Word List deployment and medical-ethical collocations (> 11% AWL density)',
      'Impeccable structural progression and clear personal thesis from introduction to conclusion'
    ],
    model_strengths_id: [
      'Evaluasi mendalam dan seimbang dari sisi filosofis dan praktis untuk kedua perspektif',
      'Penerapan Academic Word List yang canggih dan kolokasi medis-etis tinggi (> 11% AWL)',
      'Alur struktural tanpa celah dengan tesis pribadi yang konsisten dari pembuka hingga penutup'
    ],
    benchmark_band: 8.5
  },

  // 4. Complementary Alias: General Training Task 1 Bus Schedule Complaint Letter (§5.1.8)
  {
    id: 'ielts_write_t1_gen_seed01',
    task_type: 'task_1',
    category: 'General Training Task 1: Formal Complaint Letter',
    prompt_title: 'General Training Task 1: Municipal Transit Timetable Complaint',
    prompt_text:
      'You regularly use a public bus service to commute to work. Recently, the bus schedule was altered without notice, causing major delays for commuters.\n\n' +
      'Write a formal letter to the Transit Manager.\n\n' +
      'In your letter:\n' +
      '• Explain the situation and how you were affected\n' +
      '• Describe how this disruption impacts your daily commute\n' +
      '• Propose constructive changes to the timetable\n\n' +
      'Write at least 150 words. Begin your letter with: Dear Sir or Madam,',
    visual_asset_url: null,
    visual_data_points: {
      letterType: 'formal_complaint',
      busRoute: '42B',
      disruption: 'Departure moved from 8:15 AM to 8:40 AM without prior announcement'
    },
    time_limit_minutes: 20,
    target_word_count: 150,
    model_band_8_response:
      'Dear Sir or Madam,\n\n' +
      'I am writing to formally register my concern regarding the abrupt alteration to the 42B bus timetable, which was implemented last Monday without prior notification to commuters.\n\n' +
      'For the past three years, I have relied on this scheduled service for my daily commute to my city-centre office. Previously, the bus arrived promptly at 8:15 AM, allowing sufficient margin to arrive at work before 9:00 AM. However, under the revised schedule, the departure has been postponed to 8:40 AM. Consequently, due to severe morning traffic congestion, I have arrived late on three occasions this week, causing considerable friction with my employer.\n\n' +
      'To remediate this unacceptable disruption, I urge the transit authority to reinstate the 8:15 AM departure or alternatively introduce an additional shuttle between 8:00 AM and 8:30 AM. Furthermore, it would be highly advantageous if the department posted advance notices at major transit stops prior to future modifications.\n\n' +
      'I look forward to your prompt response and constructive resolution.\n\n' +
      'Yours faithfully,\n' +
      'John Davies',
    guidance_notes: [
      'Maintain an uncompromisingly formal, respectful complaint tone.',
      'Cover all bullet points systematically.',
      'Use "Dear Sir or Madam," and conclude with "Yours faithfully,".'
    ],
    title_id: 'Tugas General Training 1: Pengaduan Jadwal Bus Kota',
    prompt_text_id:
      'Anda rutin menggunakan layanan bus umum untuk berangkat kerja. Baru-baru ini, jadwal bus diubah tanpa pemberitahuan, menyebabkan keterlambatan besar bagi para komuter.\n\n' +
      'Tulis surat resmi kepada Manajer Transit.\n\n' +
      'Dalam surat Anda:\n' +
      '• Jelaskan situasi dan dampaknya terhadap Anda\n' +
      '• Jelaskan bagaimana gangguan ini memengaruhi perjalanan harian Anda\n' +
      '• Usulkan perubahan konstruktif pada jadwal tersebut\n\n' +
      'Tulis minimal 150 kata. Awali surat Anda dengan: Dear Sir or Madam,',
    guidance_notes_id: [
      'Pertahankan nada pengaduan formal yang tegas namun tetap sopan.',
      'Bahas semua poin instruksi secara runtut.',
      'Gunakan salam pembuka "Dear Sir or Madam," dan penutup "Yours faithfully,".'
    ],
    model_strengths_en: [
      'Flawless formal administrative register',
      'Logical grievance progression with clear remedial requests'
    ],
    model_strengths_id: [
      'Laras bahasa administratif resmi tanpa cela',
      'Alur pengaduan logis dengan permintaan perbaikan yang jelas'
    ],
    benchmark_band: 8.5
  },

  // 5. Complementary Alias: Academic & GT Task 2 Essay: AI in Education (§5.1.8)
  {
    id: 'ielts_write_t2_disc_seed01',
    task_type: 'task_2',
    category: 'Academic & GT Task 2: Discursive Essay (Discussion & Opinion)',
    prompt_title: 'Task 2 Discursive Essay: Artificial Intelligence in Education',
    prompt_text:
      'In secondary and higher education, automated artificial intelligence tools are increasingly utilized to evaluate essays, generate curriculum materials, and tutor students.\n\n' +
      'While some believe this optimizes pedagogical efficiency, others argue it undermines critical thinking and irreplaceable human mentorship.\n\n' +
      'Discuss both views and give your own opinion.\n\n' +
      'Write at least 250 words.',
    visual_asset_url: null,
    visual_data_points: {
      essayType: 'discussion_and_opinion',
      topic: 'AI in Pedagogy & Mentorship'
    },
    time_limit_minutes: 40,
    target_word_count: 250,
    model_band_8_response:
      'The integration of artificial intelligence into secondary and higher educational settings has ignited an intense philosophical debate regarding the future of pedagogy. While technological advocates argue that automated systems democratize access to customized learning, skeptics fear that delegating intellectual cultivation to algorithms compromises cognitive depth and human connection. This essay will examine both perspectives before arguing that while AI serves as an exceptional analytical supplement, it must never supersede the foundational human mentor.\n\n' +
      'On the one hand, proponents highlight the profound efficiency and personalized scaffolding that algorithmic tutoring provides. In traditional classrooms burdened by elevated student-to-teacher ratios, instructors inevitably struggle to tailor instruction to heterogeneous learning velocities. Intelligent adaptive platforms can instantaneously diagnose micro-deficiencies in syntactic mastery or mathematical conceptualization, delivering targeted remedial modules at an individualized pace. Furthermore, the automation of administrative grading liberates educators from tedious marking duties, enabling institutions to allocate resources toward research and experiential workshops. For students in impoverished or remote communities lacking access to elite academies, high-caliber AI tutors undeniably democratize high-level academic guidance.\n\n' +
      'Conversely, detractors present compelling concerns regarding the erosion of critical intellectual autonomy and pastoral care. True scholarship does not merely consist of acquiring factual data or executing formulaic algorithms; it requires challenging orthodoxy, tolerating ambiguity, and internalizing ethical nuance—capacities honed exclusively through spirited dialogical engagement with passionate human scholars. If students habitually outsource conceptual synthesis to generative engines, cognitive atrophy and intellectual passivity will inevitably ensue. Furthermore, an algorithm remains inherently incapable of providing emotional encouragement during personal crises or discerning the unspoken anxieties of a struggling pupil.\n\n' +
      'In conclusion, while artificial intelligence undeniably provides transformative instructional efficiency, it should be regarded as a powerful cognitive prosthesis rather than an educator replacement. The ideal pedagogical paradigm combines algorithmic precision with the compassionate, morally grounded guidance of dedicated human teachers.',
    guidance_notes: [
      'Structure into 4 paragraphs with clear topic sentences.',
      'Explore both efficiency arguments and humanistic mentorship arguments before giving a definitive synthesis.',
      'Deploy rich academic vocabulary (> 10% AWL).'
    ],
    title_id: 'Tugas 2 Esai Diskursif: Kecerdasan Buatan dalam Pendidikan',
    prompt_text_id:
      'Di pendidikan menengah dan tinggi, alat kecerdasan buatan otomatis semakin banyak digunakan untuk menilai esai, membuat materi kurikulum, dan membimbing siswa.\n\n' +
      'Meskipun sebagian orang percaya bahwa ini mengoptimalkan efisiensi pedagogis, yang lain berpendapat bahwa hal ini merusak pemikiran kritis dan bimbingan manusia yang tak tergantikan.\n\n' +
      'Diskusikan kedua pandangan tersebut dan berikan pendapat Anda sendiri.\n\n' +
      'Tulis minimal 250 kata.',
    guidance_notes_id: [
      'Bagi esai menjadi 4 paragraf dengan kalimat topik yang jelas.',
      'Ulas argumen efisiensi dan bimbingan humanistik sebelum memberikan sintesis pribadi.',
      'Gunakan kosakata akademis tingkat tinggi (> 10% AWL).'
    ],
    model_strengths_en: [
      'Masterful discursive balance between technological utility and pedagogical ethics',
      'Sophisticated lexical register (e.g. "cognitive prosthesis", "heterogeneous learning velocities")',
      'Exceptional cohesion and syntactic variety'
    ],
    model_strengths_id: [
      'Keseimbangan diskursif luar biasa antara kegunaan teknologi dan etika pedagogis',
      'Laras leksikal tingkat tinggi',
      'Kohesi dan variasi sintaksis yang luar biasa'
    ],
    benchmark_band: 8.5
  }
];

export function seedWritingPrompts(database: DatabaseType): void {
  const insertStmt = database.prepare(`
    INSERT INTO writing_prompts (
      id, task_type, category, prompt_title, prompt_text,
      visual_asset_url, visual_data_points, time_limit_minutes,
      target_word_count, model_band_8_response, guidance_notes,
      title_id, prompt_text_id, guidance_notes_id,
      model_strengths_en, model_strengths_id, benchmark_band
    ) VALUES (
      ?, ?, ?, ?, ?,
      ?, ?, ?,
      ?, ?, ?,
      ?, ?, ?,
      ?, ?, ?
    )
  `);

  for (const item of WRITING_PROMPTS_SEEDS) {
    insertStmt.run(
      item.id,
      item.task_type,
      item.category,
      item.prompt_title,
      item.prompt_text,
      item.visual_asset_url,
      item.visual_data_points ? JSON.stringify(item.visual_data_points) : null,
      item.time_limit_minutes,
      item.target_word_count,
      item.model_band_8_response,
      JSON.stringify(item.guidance_notes),
      item.title_id,
      item.prompt_text_id,
      JSON.stringify(item.guidance_notes_id),
      JSON.stringify(item.model_strengths_en),
      JSON.stringify(item.model_strengths_id),
      item.benchmark_band
    );
  }
}
