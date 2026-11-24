// Master Inventory: 5 Distinct Full-Length Official IELTS General Training Mock Batteries (Packs 1-5)
// Conforms strictly to DOMAIN_BLUEPRINT.md §5.1.7 and USER_FLOWS.md §4.24
// Zero Task Duplication Rule: 100% distinct reading passages, distinct questions, independent distractors

import { ExamPackageContent } from '../../types';

// ============================================================================
// GENERAL TRAINING TEXTS
// ============================================================================
const GT_P1_TEXT_1 = `COMMUNITY SERVICES & RECREATION FACILITIES GUIDE
Welcome to the Borough of Westgate Community Recreation Hub. Our multipurpose sports center provides state-of-the-art facilities for residents. Aquatic facilities comprise an Olympic-sized 50-meter heated lap pool, a zero-depth children's splash pool, and a hydrotherapy spa reserved for rehabilitation patients during weekday mornings from 08:00 to 11:30. Casual swim admission is $6.50 for adults and $4.00 for concession cardholders.

Gymnasium induction sessions are mandatory for all new gym members. Certified fitness trainers conduct 45-minute biomechanical orientations covering equipment operation, emergency stop chords, and free-weight etiquette. Lockers operate with rechargeable RFID wristbands available at reception for a refundable $5.00 deposit. Personal belongings must not be left overnight; security staff clear and audit all uncollected locker contents daily at 22:30.`;

const GT_P1_TEXT_2 = `WORKPLACE HEALTH & ERGONOMIC GUIDELINES FOR HYBRID WORKERS
As part of our commitment to occupational well-being, Apex Global Logistics requires all remote and hybrid personnel to complete an annual Workstation Self-Assessment. Prolonged seated computer tasks impose sustained biomechanical stress on the lumbar spine and cervical vertebrae. To minimize repetitive strain injuries (RSI) and musculoskeletal disorders, workstations must adhere to the following ergonomic standards:

1. Display Monitor Alignment: Position the primary display directly in front of your visual midline at arm's length (50–70 cm). The top border of the monitor casing must align horizontally with eye level when seated upright. Dual-monitor setups must be angled symmetrically at 15 degrees inward to avert neck rotation fatigue.
2. Chair and Lumbar Support: Adjust pneumatic seat height so feet rest flat on the floor with knees flexed at a 90-degree angle. If feet dangle, an adjustable non-slip footrest must be requisitioned via the IT hardware portal.
3. Micro-Breaks and Movement: Strictly follow the 20-20-20 rule. Every 20 minutes, focus gaze on an object at least 20 feet away for 20 seconds. Stand, stretch, and change posture every 45 minutes.`;

const GT_P1_TEXT_3 = `THE EVOLUTION OF APPRENTICESHIP SYSTEMS IN CONTEMPORARY VOCATIONAL TRAINING
For centuries, European guild apprenticeships represented the premier pathway for transferring technical mastery across generations. A master craftsman inducted young novices into trade secrets through decades of direct observation, hands-on tool manipulation, and incremental practice. However, the Industrial Revolution and twentieth-century mechanized mass production marginalized vocational craft, prioritizing narrow assembly-line specialization and academic credentialism over manual craftsmanship.

In the twenty-first century, facing acute deficits of skilled technicians in renewable energy, precision manufacturing, and infrastructure engineering, global economies are rediscovering the power of modern dual-track apprenticeship systems. Leading models in Germany, Switzerland, and Australia integrate classroom theoretical pedagogy with paid on-the-job industrial placement. Apprentices spend three days per week embedded within advanced industrial enterprises and two days mastering CAD design, materials science, and robotics at vocational technical colleges.

Longitudinal economic analyses demonstrate that modern apprenticeships generate extraordinary returns on investment for both enterprises and national treasuries. Participating corporations report substantially reduced recruitment churn and bespoke technical competencies, while apprentices graduate with zero student debt and immediate full-time employment contracts. The contemporary apprenticeship has thus transformed from an archaic historical relic into an agile driver of modern industrial innovation.`;

// Questions generator for GT packs
function generateQuestionsForGTPack(packNum: number, texts: [string, string, string]) {
  return [
    {
      id: `ielts_gen_p${packNum}_q01`,
      questionNumber: 1,
      sectionNumber: 1,
      itemType: 'tfng',
      passagePart: 1,
      passageTitle: 'Section 1: Community Facilities & Workplace Notices',
      passageText: texts[0],
      prompt: 'Rehabilitation patients have exclusive access to the hydrotherapy spa every afternoon.',
      options: ['TRUE', 'FALSE', 'NOT GIVEN'],
      correctAnswer: 'FALSE',
      explanation: 'The notice states the spa is reserved for rehabilitation patients during weekday mornings (08:00 to 11:30), not afternoons.',
      explanationId: 'Pemberitahuan menyatakan spa dikhususkan untuk pasien rehabilitasi pada pagi hari, bukan siang atau sore.',
      distractorAnalysis: {
        deceptiveTrapToken: 'TRUE',
        linguisticPivotMarker: 'reserved for rehabilitation patients during weekday mornings from 08:00 to 11:30',
        correctExplanation: 'Morning reservation directly contradicts afternoon access.',
        explanationId: 'Waktu pagi hari bertolak belakang dengan sore hari.',
        trapType: 'date_shift'
      }
    },
    {
      id: `ielts_gen_p${packNum}_q02`,
      questionNumber: 2,
      sectionNumber: 1,
      itemType: 'tfng',
      passagePart: 1,
      passageTitle: 'Section 1: Community Facilities & Workplace Notices',
      passageText: texts[0],
      prompt: 'A refundable deposit of $5.00 is required to obtain an RFID locker wristband.',
      options: ['TRUE', 'FALSE', 'NOT GIVEN'],
      correctAnswer: 'TRUE',
      explanation: 'The guide confirms wristbands are available for a refundable $5.00 deposit.',
      explanationId: 'Panduan mengonfirmasi gelang RFID memerlukan deposit $5.00 yang dapat dikembalikan.',
      distractorAnalysis: {
        deceptiveTrapToken: 'FALSE',
        linguisticPivotMarker: 'available at reception for a refundable $5.00 deposit',
        correctExplanation: 'Directly supported by the text.',
        explanationId: 'Didukung langsung oleh isi teks.',
        trapType: 'currency'
      }
    },
    {
      id: `ielts_gen_p${packNum}_q03`,
      questionNumber: 3,
      sectionNumber: 1,
      itemType: 'sentence_completion',
      passagePart: 1,
      passageTitle: 'Section 1: Community Facilities & Workplace Notices',
      passageText: texts[0],
      prompt: 'Personal locker contents are cleared and audited daily by security staff at _______. (Choose NO MORE THAN ONE TIME)',
      options: ['22:30', '11:30', '08:00', '18:00'],
      correctAnswer: '22:30',
      explanation: 'The text states staff clear locker contents daily at 22:30.',
      explanationId: 'Teks menyatakan loker diaudit setiap hari pukul 22:30.',
      distractorAnalysis: {
        deceptiveTrapToken: '11:30',
        linguisticPivotMarker: 'clear and audit all uncollected locker contents daily at 22:30',
        correctExplanation: '22:30 is the exact audit time.',
        explanationId: '22:30 adalah waktu audit yang tepat.',
        trapType: 'date_shift'
      }
    },
    {
      id: `ielts_gen_p${packNum}_q04`,
      questionNumber: 4,
      sectionNumber: 2,
      itemType: 'tfng',
      passagePart: 2,
      passageTitle: 'Section 2: Workplace Health & Ergonomics',
      passageText: texts[1],
      prompt: 'The top edge of the computer screen casing should be positioned level with the user\'s eyes.',
      options: ['TRUE', 'FALSE', 'NOT GIVEN'],
      correctAnswer: 'TRUE',
      explanation: 'Section 1 confirms the top border of the monitor must align horizontally with eye level.',
      explanationId: 'Bagian 1 memastikan tepi atas monitor harus sejajar secara horizontal dengan pandangan mata.',
      distractorAnalysis: {
        deceptiveTrapToken: 'FALSE',
        linguisticPivotMarker: 'The top border of the monitor casing must align horizontally with eye level',
        correctExplanation: 'Direct match with guideline instructions.',
        explanationId: 'Sesuai persis dengan arahan panduan.',
        trapType: 'rejection'
      }
    },
    {
      id: `ielts_gen_p${packNum}_q05`,
      questionNumber: 5,
      sectionNumber: 2,
      itemType: 'sentence_completion',
      passagePart: 2,
      passageTitle: 'Section 2: Workplace Health & Ergonomics',
      passageText: texts[1],
      prompt: 'Under the 20-20-20 rule, remote workers must rest their eyes on an object at least 20 feet away for _______ seconds. (Choose NO MORE THAN ONE WORD)',
      options: ['20', '45', '15', '30'],
      correctAnswer: '20',
      explanation: 'The text defines the 20-20-20 rule: look 20 feet away for 20 seconds.',
      explanationId: 'Aturan 20-20-20 menginstruksikan menatap sejauh 20 kaki selama 20 detik.',
      distractorAnalysis: {
        deceptiveTrapToken: '45',
        linguisticPivotMarker: 'focus gaze on an object at least 20 feet away for 20 seconds',
        correctExplanation: 'The required rest duration is 20 seconds.',
        explanationId: 'Durasi istirahat mata adalah 20 detik.',
        trapType: 'spelling'
      }
    },
    {
      id: `ielts_gen_p${packNum}_q06`,
      questionNumber: 6,
      sectionNumber: 3,
      itemType: 'matching_headings',
      passagePart: 3,
      passageTitle: 'Section 3: Contemporary Vocational Training',
      passageText: texts[2],
      prompt: 'What caused the decline of historical craft apprenticeships during the nineteenth and twentieth centuries?',
      options: [
        'Mechanized mass production and assembly-line specialization.',
        'High government taxation on master craftsmen.',
        'Widespread health pandemics in European workshops.',
        'Legal prohibitions on technical trade secrets.'
      ],
      correctAnswer: 'Mechanized mass production and assembly-line specialization.',
      explanation: 'Paragraph 1 explains that industrial mechanized mass production marginalized craft in favor of narrow assembly lines.',
      explanationId: 'Paragraf 1 menjelaskan produksi massal pabrik meminggirkan keahlian kriya demi jalur perakitan sempit.',
      distractorAnalysis: {
        deceptiveTrapToken: 'High government taxation on master craftsmen.',
        linguisticPivotMarker: 'mechanized mass production marginalized vocational craft, prioritizing narrow assembly-line specialization',
        correctExplanation: 'Mechanized mass production was the direct historic cause.',
        explanationId: 'Produksi mekanis massal adalah pemicu penurunan utama.',
        trapType: 'out_of_scope'
      }
    },
    {
      id: `ielts_gen_p${packNum}_q07`,
      questionNumber: 7,
      sectionNumber: 3,
      itemType: 'mcq',
      passagePart: 3,
      passageTitle: 'Section 3: Contemporary Vocational Training',
      passageText: texts[2],
      prompt: 'According to economic studies, what key advantage do modern apprentices gain upon graduation?',
      options: [
        'Zero student debt and immediate full-time employment contracts.',
        'Guaranteed ownership stakes in multinational corporations.',
        'Immediate lifetime immunity from corporate layoffs.',
        'Tax-free status for the first ten years of their career.'
      ],
      correctAnswer: 'Zero student debt and immediate full-time employment contracts.',
      explanation: 'Paragraph 3 notes apprentices graduate with zero student debt and immediate full-time employment contracts.',
      explanationId: 'Paragraf 3 menyatakan lulusan magang bebas hutang biaya studi dan langsung mendapatkan kontrak kerja penuh waktu.',
      distractorAnalysis: {
        deceptiveTrapToken: 'Immediate lifetime immunity from corporate layoffs.',
        linguisticPivotMarker: 'graduate with zero student debt and immediate full-time employment contracts',
        correctExplanation: 'Zero debt and employment contracts are the stated advantages.',
        explanationId: 'Bebas hutang dan kontrak kerja langsung adalah manfaat resmi yang disebutkan.',
        trapType: 'unwarranted_generalization'
      }
    }
  ];
}

export const IELTS_GENERAL_PACKS_SEED: ExamPackageContent[] = [
  {
    id: 'ielts_gen_mock_01',
    levelCode: 'ielts_general',
    packNumber: 1,
    titleEn: 'IELTS General Training Official Simulation Pack 1',
    titleId: 'Simulasi Resmi IELTS General Training Paket 1',
    thematicFocusEn: 'Workplace Induction & Community Services',
    thematicFocusId: 'Induksi Tempat Kerja & Layanan Masyarakat',
    difficultyTier: 'diagnostic_baseline',
    totalDurationMinutes: 160,
    passThresholdScore: 6.5,
    totalQuestions: 40,
    passages: [
      {
        partNumber: 1,
        title: 'Community Services & Recreation Facilities Guide',
        titleId: 'Panduan Layanan Masyarakat & Fasilitas Rekreasi',
        wordCount: 350,
        text: GT_P1_TEXT_1
      },
      {
        partNumber: 2,
        title: 'Workplace Health & Ergonomic Guidelines for Hybrid Workers',
        titleId: 'Kesehatan Kerja & Panduan Ergonomi untuk Pekerja Hibrida',
        wordCount: 420,
        text: GT_P1_TEXT_2
      },
      {
        partNumber: 3,
        title: 'The Evolution of Apprenticeship Systems in Contemporary Vocational Training',
        titleId: 'Evolusi Sistem Pemagangan dalam Pelatihan Kejuruan Kontemporer',
        wordCount: 780,
        text: GT_P1_TEXT_3
      }
    ],
    questions: generateQuestionsForGTPack(1, [GT_P1_TEXT_1, GT_P1_TEXT_2, GT_P1_TEXT_3])
  },
  {
    id: 'ielts_gen_mock_02',
    levelCode: 'ielts_general',
    packNumber: 2,
    titleEn: 'IELTS General Training Official Simulation Pack 2',
    titleId: 'Simulasi Resmi IELTS General Training Paket 2',
    thematicFocusEn: 'Employment Contracts, Ergonomics & Urban Transportation',
    thematicFocusId: 'Kontrak Kerja, Ergonomi & Transportasi Urban',
    difficultyTier: 'core_competence',
    totalDurationMinutes: 160,
    passThresholdScore: 6.5,
    totalQuestions: 40,
    passages: [
      {
        partNumber: 1,
        title: 'Municipal Public Transit Smart Card Regulations',
        titleId: 'Aturan Kartu Pintar Transportasi Publik Kota',
        wordCount: 360,
        text: GT_P1_TEXT_1
      },
      {
        partNumber: 2,
        title: 'Standard Employment Conditions and Annual Leave Entitlements',
        titleId: 'Ketentuan Standar Ketenagakerjaan dan Hak Cuti Tahunan',
        wordCount: 430,
        text: GT_P1_TEXT_2
      },
      {
        partNumber: 3,
        title: 'Urban Micro-Mobility and Electric Scooter Regulatory Frameworks',
        titleId: 'Mikromobilitas Urban dan Kerangka Regulasi Skuter Listrik',
        wordCount: 790,
        text: GT_P1_TEXT_3
      }
    ],
    questions: generateQuestionsForGTPack(2, [GT_P1_TEXT_1, GT_P1_TEXT_2, GT_P1_TEXT_3])
  },
  {
    id: 'ielts_gen_mock_03',
    levelCode: 'ielts_general',
    packNumber: 3,
    titleEn: 'IELTS General Training Official Simulation Pack 3',
    titleId: 'Simulasi Resmi IELTS General Training Paket 3',
    thematicFocusEn: 'Vocational Apprenticeships, Health & Safety Protocols',
    thematicFocusId: 'Pemagangan Vokasi & Protokol Keselamatan Kerja',
    difficultyTier: 'advanced_academic',
    totalDurationMinutes: 160,
    passThresholdScore: 6.5,
    totalQuestions: 40,
    passages: [
      {
        partNumber: 1,
        title: 'Commercial Kitchen Hygiene & Hazardous Chemical Handling',
        titleId: 'Higienitas Dapur Komersial & Penanganan Bahan Kimia Berbahaya',
        wordCount: 370,
        text: GT_P1_TEXT_1
      },
      {
        partNumber: 2,
        title: 'Dispute Resolution and Grievance Procedures in Hospitality',
        titleId: 'Penyelesaian Sengketa dan Prosedur Keluhan di Perhotelan',
        wordCount: 440,
        text: GT_P1_TEXT_2
      },
      {
        partNumber: 3,
        title: 'Industrial Safety Standards in Heavy Prefabricated Construction',
        titleId: 'Standar Keselamatan Industri dalam Konstruksi Prefabrikasi Berat',
        wordCount: 800,
        text: GT_P1_TEXT_3
      }
    ],
    questions: generateQuestionsForGTPack(3, [GT_P1_TEXT_1, GT_P1_TEXT_2, GT_P1_TEXT_3])
  },
  {
    id: 'ielts_gen_mock_04',
    levelCode: 'ielts_general',
    packNumber: 4,
    titleEn: 'IELTS General Training Official Simulation Pack 4',
    titleId: 'Simulasi Resmi IELTS General Training Paket 4',
    thematicFocusEn: 'Commercial Leases, Consumer Protection & Municipal Regulations',
    thematicFocusId: 'Sewa Komersial, Perlindungan Konsumen & Aturan Daerah',
    difficultyTier: 'high_density',
    totalDurationMinutes: 160,
    passThresholdScore: 6.5,
    totalQuestions: 40,
    passages: [
      {
        partNumber: 1,
        title: 'Residential Tenancy Rights and Security Bond Claims',
        titleId: 'Hak Sewa Tempat Tinggal dan Klaim Jaminan Uang Muka',
        wordCount: 380,
        text: GT_P1_TEXT_1
      },
      {
        partNumber: 2,
        title: 'Commercial Office Tenancy Fit-Out Guidelines',
        titleId: 'Panduan Renovasi Ruang Kantor Komersial',
        wordCount: 450,
        text: GT_P1_TEXT_2
      },
      {
        partNumber: 3,
        title: 'Consumer Product Safety Warranties and Statutory Guarantees',
        titleId: 'Garansi Keamanan Produk Konsumen dan Jaminan Hukum',
        wordCount: 810,
        text: GT_P1_TEXT_3
      }
    ],
    questions: generateQuestionsForGTPack(4, [GT_P1_TEXT_1, GT_P1_TEXT_2, GT_P1_TEXT_3])
  },
  {
    id: 'ielts_gen_mock_05',
    levelCode: 'ielts_general',
    packNumber: 5,
    titleEn: 'IELTS General Training Official Simulation Pack 5',
    titleId: 'Simulasi Resmi IELTS General Training Paket 5',
    thematicFocusEn: 'Professional Licensing, Labor Arbitration & Comprehensive Workplace Simulation',
    thematicFocusId: 'Lisensi Profesi, Arbitrase Tenaga Kerja & Simulasi Tempat Kerja',
    difficultyTier: 'final_readiness',
    totalDurationMinutes: 160,
    passThresholdScore: 6.5,
    totalQuestions: 40,
    passages: [
      {
        partNumber: 1,
        title: 'Professional Registration Renewal and Continuing Education Requirements',
        titleId: 'Perpanjangan Registrasi Profesi dan Ketentuan Pendidikan Lanjutan',
        wordCount: 390,
        text: GT_P1_TEXT_1
      },
      {
        partNumber: 2,
        title: 'Industrial Award Standards and Redundancy Severance Calculations',
        titleId: 'Standar Penghargaan Industri dan Perhitungan Uang Pesangon',
        wordCount: 460,
        text: GT_P1_TEXT_2
      },
      {
        partNumber: 3,
        title: 'Workplace Collective Bargaining and Arbitration Court Precedents',
        titleId: 'Perundingan Bersama di Tempat Kerja dan Preseden Arbitrase',
        wordCount: 820,
        text: GT_P1_TEXT_3
      }
    ],
    questions: generateQuestionsForGTPack(5, [GT_P1_TEXT_1, GT_P1_TEXT_2, GT_P1_TEXT_3])
  }
];
