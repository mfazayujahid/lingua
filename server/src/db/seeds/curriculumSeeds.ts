// Comprehensive Standard-Aligned International Curriculum Seeds
// Strictly adheres to:
// - JLPT N5 to N1 official test specifications (Japan Foundation / JEES)
// - IELTS Academic & General Training specifications (Cambridge / British Council)

export interface SeedPillar {
  id: string;
  levelId: string;
  code: string;
  title: string;
  maxScore: number;
}

export interface SeedUnit {
  id: string;
  skillPillarId: string;
  title: string;
  description: string;
  orderIndex: number;
}

export interface SeedLesson {
  id: string;
  unitId: string;
  title: string;
  lessonType: string;
  estimatedMinutes: number;
  orderIndex: number;
}

export interface SeedExerciseItem {
  id: string;
  lessonId: string;
  itemType: string;
  prompt: string;
  passageText?: string;
  audioUrl?: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export const CURRICULUM_PILLARS: SeedPillar[] = [
  {
    "id": "sp_ia_read",
    "levelId": "lvl_ielts_acad",
    "code": "reading",
    "title": "Academic Reading Comprehension",
    "maxScore": 9
  },
  {
    "id": "sp_ia_write",
    "levelId": "lvl_ielts_acad",
    "code": "writing",
    "title": "Academic Writing Studio",
    "maxScore": 9
  },
  {
    "id": "sp_ia_listen",
    "levelId": "lvl_ielts_acad",
    "code": "listening",
    "title": "Academic Listening Comprehension",
    "maxScore": 9
  },
  {
    "id": "sp_ig_read",
    "levelId": "lvl_ielts_gen",
    "code": "reading",
    "title": "General Training Reading Comprehension",
    "maxScore": 9
  },
  {
    "id": "sp_ig_write",
    "levelId": "lvl_ielts_gen",
    "code": "writing",
    "title": "General Practical Correspondence",
    "maxScore": 9
  },
  {
    "id": "sp_ig_listen",
    "levelId": "lvl_ielts_gen",
    "code": "listening",
    "title": "General Workplace & Social Listening",
    "maxScore": 9
  },
  {
    "id": "sp_n5_vocab",
    "levelId": "lvl_jlpt_n5",
    "code": "kanji_vocab",
    "title": "Language Knowledge: Kanji & Vocabulary",
    "maxScore": 120
  },
  {
    "id": "sp_n5_gram",
    "levelId": "lvl_jlpt_n5",
    "code": "grammar",
    "title": "Language Knowledge: Grammar & Reading",
    "maxScore": 120
  },
  {
    "id": "sp_n5_listen",
    "levelId": "lvl_jlpt_n5",
    "code": "listening",
    "title": "Listening Comprehension",
    "maxScore": 60
  },
  {
    "id": "sp_n4_vocab",
    "levelId": "lvl_jlpt_n4",
    "code": "kanji_vocab",
    "title": "Language Knowledge: Kanji & Vocabulary",
    "maxScore": 120
  },
  {
    "id": "sp_n4_gram",
    "levelId": "lvl_jlpt_n4",
    "code": "grammar",
    "title": "Language Knowledge: Grammar & Reading",
    "maxScore": 120
  },
  {
    "id": "sp_n4_listen",
    "levelId": "lvl_jlpt_n4",
    "code": "listening",
    "title": "Listening Comprehension",
    "maxScore": 60
  },
  {
    "id": "sp_n3_vocab",
    "levelId": "lvl_jlpt_n3",
    "code": "kanji_vocab",
    "title": "Language Knowledge: Kanji & Vocabulary",
    "maxScore": 60
  },
  {
    "id": "sp_n3_gram",
    "levelId": "lvl_jlpt_n3",
    "code": "grammar",
    "title": "Language Knowledge: Grammar & Reading",
    "maxScore": 60
  },
  {
    "id": "sp_n3_listen",
    "levelId": "lvl_jlpt_n3",
    "code": "listening",
    "title": "Listening Comprehension",
    "maxScore": 60
  },
  {
    "id": "sp_n2_vocab",
    "levelId": "lvl_jlpt_n2",
    "code": "kanji_vocab",
    "title": "Language Knowledge: Kanji & Vocabulary",
    "maxScore": 60
  },
  {
    "id": "sp_n2_gram",
    "levelId": "lvl_jlpt_n2",
    "code": "grammar",
    "title": "Language Knowledge: Grammar & Reading",
    "maxScore": 60
  },
  {
    "id": "sp_n2_listen",
    "levelId": "lvl_jlpt_n2",
    "code": "listening",
    "title": "Listening Comprehension",
    "maxScore": 60
  },
  {
    "id": "sp_n1_vocab",
    "levelId": "lvl_jlpt_n1",
    "code": "kanji_vocab",
    "title": "Language Knowledge: Kanji & Vocabulary",
    "maxScore": 60
  },
  {
    "id": "sp_n1_gram",
    "levelId": "lvl_jlpt_n1",
    "code": "grammar",
    "title": "Language Knowledge: Grammar & Reading",
    "maxScore": 60
  },
  {
    "id": "sp_n1_listen",
    "levelId": "lvl_jlpt_n1",
    "code": "listening",
    "title": "Listening Comprehension",
    "maxScore": 60
  }
];

export const CURRICULUM_UNITS: SeedUnit[] = [
  {
    "id": "u_ia_read_1",
    "skillPillarId": "sp_ia_read",
    "title": "Unit 1: Section 1 - Cognitive Neuroscience & Language Architecture",
    "description": "Academic prose analysis focusing on executive function, inhibitory control, and neurological adaptability.",
    "orderIndex": 1
  },
  {
    "id": "u_ia_read_2",
    "skillPillarId": "sp_ia_read",
    "title": "Unit 2: Section 2 - Climate Architecture & Urban Heat Islands",
    "description": "Technical reading on passive cooling strategies, urban microclimate engineering, and albedo coefficients.",
    "orderIndex": 2
  },
  {
    "id": "u_ia_read_3",
    "skillPillarId": "sp_ia_read",
    "title": "Unit 3: Section 3 - Epistemology & Historical Archaeology",
    "description": "Complex discursive prose on Saussurean structuralism, linguistic determinism, and archaeological evidence.",
    "orderIndex": 3
  },
  {
    "id": "u_ia_write_1",
    "skillPillarId": "sp_ia_write",
    "title": "Unit 1: Task 1 - Academic Data Synthesis",
    "description": "Comparative report writing for renewable energy matrix, process flowcharts, and multi-variable data charts.",
    "orderIndex": 1
  },
  {
    "id": "u_ia_write_2",
    "skillPillarId": "sp_ia_write",
    "title": "Unit 2: Task 2 - Discursive Argumentative Essay",
    "description": "Rigorous 250-word argumentation on artificial intelligence autonomy, ethics, and university pedagogy.",
    "orderIndex": 2
  },
  {
    "id": "u_ia_listen_1",
    "skillPillarId": "sp_ia_listen",
    "title": "Unit 1: Section 1 - Campus Research Facility Registration",
    "description": "Accurate form completion, schedule reservation, and safety certification dialogues.",
    "orderIndex": 1
  },
  {
    "id": "u_ia_listen_2",
    "skillPillarId": "sp_ia_listen",
    "title": "Unit 2: Section 4 - Marine Engineering Biomimicry Lecture",
    "description": "Academic lecture comprehension tracking hydrodynamic structures and biomimetic hull design.",
    "orderIndex": 2
  },
  {
    "id": "u_ig_read_1",
    "skillPillarId": "sp_ig_read",
    "title": "Unit 1: Section 1 - Workplace Ergonomics & Safety Protocols",
    "description": "Practical information retrieval from occupational health standards and tenancy agreements.",
    "orderIndex": 1
  },
  {
    "id": "u_ig_read_2",
    "skillPillarId": "sp_ig_read",
    "title": "Unit 2: Section 2 - HR Grievance Procedures & Parental Leave",
    "description": "Workplace survival reading on formal employment dispute escalation and statutory leave entitlements.",
    "orderIndex": 2
  },
  {
    "id": "u_ig_read_3",
    "skillPillarId": "sp_ig_read",
    "title": "Unit 3: Section 3 - The Industrial Restoration of Navigable Canals",
    "description": "Extended general prose tracing the historical infrastructure, decline, and recreational revival of inland waterways.",
    "orderIndex": 3
  },
  {
    "id": "u_ig_write_1",
    "skillPillarId": "sp_ig_write",
    "title": "Unit 1: Task 1 - Formal & Semi-Formal Correspondence",
    "description": "Tone calibration, formal redress requests, and structural requirements for customer advocacy letters.",
    "orderIndex": 1
  },
  {
    "id": "u_ig_write_2",
    "skillPillarId": "sp_ig_write",
    "title": "Unit 2: Task 2 - General Social Issues Essay",
    "description": "Structured persuasive essay on urban public transit subsidies versus congestion charging schemes.",
    "orderIndex": 2
  },
  {
    "id": "u_ig_listen_1",
    "skillPillarId": "sp_ig_listen",
    "title": "Unit 1: Section 1 - Community Sports Center Membership",
    "description": "Practical everyday dialogue: membership tier rates, locker fees, and class schedules.",
    "orderIndex": 1
  },
  {
    "id": "u_n5_vocab_1",
    "skillPillarId": "sp_n5_vocab",
    "title": "Unit 1: Foundation Kana & Radical Strokes (仮名と部首)",
    "description": "Hitsujun stroke order, kana calligraphy vectors, and foundational radicals for 日, 本, 人.",
    "orderIndex": 1
  },
  {
    "id": "u_n5_gram_1",
    "skillPillarId": "sp_n5_gram",
    "title": "Unit 1: Copula & Demonstrative Expressions (これ・それ・あれ・です)",
    "description": "Polite assertions (です/ではありません), demonstratives (これ/それ/あれ), and topic particle は.",
    "orderIndex": 1
  },
  {
    "id": "u_n5_gram_2",
    "skillPillarId": "sp_n5_gram",
    "title": "Unit 2: Case Particles & Verb Predicates (格助詞と動詞述語)",
    "description": "Transitive actions with を, destinations with へ/に, action locations with で, and temporal limits から/まで.",
    "orderIndex": 2
  },
  {
    "id": "u_n5_gram_3",
    "skillPillarId": "sp_n5_gram",
    "title": "Unit 3: Adjectives & Requests (形容詞と〜てください)",
    "description": "Past & negative conjugations of い/な adjectives and polite requests with 〜てください.",
    "orderIndex": 3
  },
  {
    "id": "u_n5_read_1",
    "skillPillarId": "sp_n5_gram",
    "title": "Unit 4: Authentic Life Notices & Bulletins (生活通知・掲示)",
    "description": "Short notices for campus tea parties, library hours, and community Japanese language classes.",
    "orderIndex": 4
  },
  {
    "id": "u_n5_listen_1",
    "skillPillarId": "sp_n5_listen",
    "title": "Unit 1: Task-Based Daily Dialogues (課題理解・生活会話)",
    "description": "Extracting essential times, locations, and actions in conversational Japanese.",
    "orderIndex": 1
  },
  {
    "id": "u_n5_exam_1",
    "skillPillarId": "sp_n5_gram",
    "title": "Unit 5: Official Star Reordering & Syntax Verification (語順スター総合実戦演習)",
    "description": "JLPT N5 syntax validation puzzles isolating critical grammar connectors at the star position.",
    "orderIndex": 5
  },
  {
    "id": "u_n4_gram_1",
    "skillPillarId": "sp_n4_gram",
    "title": "Unit 1: Potential Verbs (可能動詞: 書ける・話せる)",
    "description": "Morphological transformation from dictionary verbs into potential form and particle shift (を → が).",
    "orderIndex": 1
  },
  {
    "id": "u_n4_gram_2",
    "skillPillarId": "sp_n4_gram",
    "title": "Unit 2: Benefactives of Giving & Receiving (授受動詞: てあげる・てもらう・てくれる)",
    "description": "Direction of social favors and relational deference in everyday interactions.",
    "orderIndex": 2
  },
  {
    "id": "u_n4_vocab_1",
    "skillPillarId": "sp_n4_vocab",
    "title": "Unit 1: Essential Society Kanji (会社・言葉・食事)",
    "description": "Stroke order and daily compound collocations for 会社, 計画, 言葉, 飲食.",
    "orderIndex": 1
  },
  {
    "id": "u_n4_read_1",
    "skillPillarId": "sp_n4_gram",
    "title": "Unit 3: Daily Life Information Retrieval (生活情報読解)",
    "description": "Extracting rules from residential garbage sorting schedules and dental clinic holiday notices.",
    "orderIndex": 3
  },
  {
    "id": "u_n4_listen_1",
    "skillPillarId": "sp_n4_listen",
    "title": "Unit 1: Workplace Action Instructions (職場の指示と準備)",
    "description": "Sequential task comprehension, meeting room preparation, and priority sequencing.",
    "orderIndex": 1
  },
  {
    "id": "u_n4_exam_1",
    "skillPillarId": "sp_n4_gram",
    "title": "Unit 4: Official N4 Syntax & Star Practice Exam (N4総合実戦演習)",
    "description": "Comprehensive compound sentence ordering and condition clause verification.",
    "orderIndex": 4
  },
  {
    "id": "u_n3_gram_1",
    "skillPillarId": "sp_n3_gram",
    "title": "Unit 1: Contrast Patterns (対比表現: に対して vs 反面 vs に比べて)",
    "description": "Nuanced distinctions between objective comparison (に対して) and dual-sided traits (反面).",
    "orderIndex": 1
  },
  {
    "id": "u_n3_gram_2",
    "skillPillarId": "sp_n3_gram",
    "title": "Unit 2: Conjectural Modality & Causal Relations (わけがない・に違いない・せいで)",
    "description": "Logical certainty, impossibility, and subjective causation.",
    "orderIndex": 2
  },
  {
    "id": "u_n3_vocab_1",
    "skillPillarId": "sp_n3_vocab",
    "title": "Unit 1: Intermediate Kanji Compounds (政策・契約・改善)",
    "description": "Stroke structure and abstract societal vocabulary for 政策, 契約, 改善, 傾向.",
    "orderIndex": 1
  },
  {
    "id": "u_n3_read_1",
    "skillPillarId": "sp_n3_gram",
    "title": "Unit 3: Work Reform Editorial & Autonomy (論説・ワークライフバランス)",
    "description": "Expository text examining flextime systems, telework boundaries, and employee self-regulation.",
    "orderIndex": 3
  },
  {
    "id": "u_n3_listen_1",
    "skillPillarId": "sp_n3_listen",
    "title": "Unit 1: Multi-Speaker Campaign Dialogue (会議と合意形成)",
    "description": "Tracking conflicting viewpoints, compromise solutions, and final promotional deadlines.",
    "orderIndex": 1
  },
  {
    "id": "u_n3_exam_1",
    "skillPillarId": "sp_n3_gram",
    "title": "Unit 4: Official N3 Intermediate Syntax Exam (N3語順・文法検証演習)",
    "description": "Authentic N3 star drills evaluating discourse transitions and evaluative particles.",
    "orderIndex": 4
  },
  {
    "id": "u_n2_gram_1",
    "skillPillarId": "sp_n2_gram",
    "title": "Unit 1: High Modality (にほかならない・余儀なくされる)",
    "description": "Definitive assertion (にほかならない) and forced passive actions (余儀なくされる).",
    "orderIndex": 1
  },
  {
    "id": "u_n2_gram_2",
    "skillPillarId": "sp_n2_gram",
    "title": "Unit 2: Discourse Prepositions (を契機に・に基づいて・をめぐって)",
    "description": "Connecting organizational catalysts, statutory bases, and widespread public debates.",
    "orderIndex": 2
  },
  {
    "id": "u_n2_vocab_1",
    "skillPillarId": "sp_n2_vocab",
    "title": "Unit 1: Business & Analytical Kanji (把握・契約・概況)",
    "description": "Complex analytical stroke paths and professional idioms for 把握, 概況, 遵守.",
    "orderIndex": 1
  },
  {
    "id": "u_n2_read_1",
    "skillPillarId": "sp_n2_gram",
    "title": "Unit 3: Tacit Knowledge & Remote Management (暗黙知と組織論説)",
    "description": "High-level business editorial analyzing Polanyi's tacit knowledge transfer during remote work.",
    "orderIndex": 3
  },
  {
    "id": "u_n2_listen_1",
    "skillPillarId": "sp_n2_listen",
    "title": "Unit 1: Enterprise System Modernization Strategy (基幹システム刷新会議)",
    "description": "Executive dialogue tracking legacy infrastructure deprecation risks and cloud migration milestones.",
    "orderIndex": 1
  },
  {
    "id": "u_n2_exam_1",
    "skillPillarId": "sp_n2_gram",
    "title": "Unit 4: Official N2 Business & Academic Syntax Exam (N2総合実戦演習)",
    "description": "Advanced sentence construction assessing complex subordinate clause embeddings.",
    "orderIndex": 4
  },
  {
    "id": "u_n1_gram_1",
    "skillPillarId": "sp_n1_gram",
    "title": "Unit 1: Extreme Registers (極まりない・皮切りに・んばかりに)",
    "description": "Classical and high-literary nuances expressing insurmountable extremes and dramatic inaugurations.",
    "orderIndex": 1
  },
  {
    "id": "u_n1_gram_2",
    "skillPillarId": "sp_n1_gram",
    "title": "Unit 2: Normative Restraint & Philosophical Modality (を禁じ得ない・であれ・と相まって)",
    "description": "Uncontrollable emotional overflow (を禁じ得ない) and universal conditionality (であれ).",
    "orderIndex": 2
  },
  {
    "id": "u_n1_vocab_1",
    "skillPillarId": "sp_n1_vocab",
    "title": "Unit 1: Advanced Nuance Kanji (示唆・緻密・脆弱)",
    "description": "Stroke dynamics for sophisticated scholarly kanji: 示唆, 緻密, 脆弱, 俯瞰.",
    "orderIndex": 1
  },
  {
    "id": "u_n1_read_1",
    "skillPillarId": "sp_n1_gram",
    "title": "Unit 3: Philosophy of Language & Epistemology (言語決定論と記号論)",
    "description": "Rigorous scholarly critique evaluating the Sapir-Whorf hypothesis against contemporary cognitive science.",
    "orderIndex": 3
  },
  {
    "id": "u_n1_listen_1",
    "skillPillarId": "sp_n1_listen",
    "title": "Unit 1: AI Ethics & Epistemic Agency Symposium (自律的意思決定と認識的主体性)",
    "description": "Unscripted keynote debate analyzing moral responsibility in autonomous agent networks.",
    "orderIndex": 1
  },
  {
    "id": "u_n1_exam_1",
    "skillPillarId": "sp_n1_gram",
    "title": "Unit 4: Official N1 Mastery Syntax Exam (N1最高峰語順総合演習)",
    "description": "Supreme-level sentence structuring demanding mastery of historical and formal Japanese syntax.",
    "orderIndex": 4
  }
];

export const CURRICULUM_LESSONS: SeedLesson[] = [
  {
    "id": "les_ia_read_1",
    "unitId": "u_ia_read_1",
    "title": "Passage 1: Cognitive Architecture & Executive Function",
    "lessonType": "reading_drill",
    "estimatedMinutes": 25,
    "orderIndex": 1
  },
  {
    "id": "les_ia_read_2",
    "unitId": "u_ia_read_2",
    "title": "Passage 2: Passive Cooling & Urban Microclimates",
    "lessonType": "reading_drill",
    "estimatedMinutes": 25,
    "orderIndex": 2
  },
  {
    "id": "les_ia_read_3",
    "unitId": "u_ia_read_3",
    "title": "Passage 3: Epistemology & Archaeological Typology",
    "lessonType": "reading_drill",
    "estimatedMinutes": 30,
    "orderIndex": 3
  },
  {
    "id": "les_ia_write_1",
    "unitId": "u_ia_write_1",
    "title": "Task 1: Renewable Energy Matrix Report",
    "lessonType": "writing_task",
    "estimatedMinutes": 20,
    "orderIndex": 1
  },
  {
    "id": "les_ia_write_2",
    "unitId": "u_ia_write_2",
    "title": "Task 2: AI Autonomy in Higher Education Essay",
    "lessonType": "writing_task",
    "estimatedMinutes": 40,
    "orderIndex": 2
  },
  {
    "id": "les_ia_listen_1",
    "unitId": "u_ia_listen_1",
    "title": "Section 1: Laboratory Equipment Booking Dialogue",
    "lessonType": "listening_comprehension",
    "estimatedMinutes": 15,
    "orderIndex": 1
  },
  {
    "id": "les_ia_listen_2",
    "unitId": "u_ia_listen_2",
    "title": "Section 4: Marine Engineering Biomimicry Lecture",
    "lessonType": "listening_comprehension",
    "estimatedMinutes": 20,
    "orderIndex": 2
  },
  {
    "id": "les_ig_read_1",
    "unitId": "u_ig_read_1",
    "title": "Section 1: Ergonomics Protocol & HVAC Emergency Notice",
    "lessonType": "reading_drill",
    "estimatedMinutes": 20,
    "orderIndex": 1
  },
  {
    "id": "les_ig_read_2",
    "unitId": "u_ig_read_2",
    "title": "Section 2: Employee Grievance Procedure & Parental Leave",
    "lessonType": "reading_drill",
    "estimatedMinutes": 20,
    "orderIndex": 2
  },
  {
    "id": "les_ig_read_3",
    "unitId": "u_ig_read_3",
    "title": "Section 3: The Industrial History of Navigable Canals",
    "lessonType": "reading_drill",
    "estimatedMinutes": 25,
    "orderIndex": 3
  },
  {
    "id": "les_ig_write_1",
    "unitId": "u_ig_write_1",
    "title": "Task 1: Formal Appliance Complaint & Redress Letter",
    "lessonType": "writing_task",
    "estimatedMinutes": 20,
    "orderIndex": 1
  },
  {
    "id": "les_ig_write_2",
    "unitId": "u_ig_write_2",
    "title": "Task 2: Public Transit Subsidies Discursive Essay",
    "lessonType": "writing_task",
    "estimatedMinutes": 40,
    "orderIndex": 2
  },
  {
    "id": "les_ig_listen_1",
    "unitId": "u_ig_listen_1",
    "title": "Section 1: Sports Center Membership & Timetable Dialogue",
    "lessonType": "listening_comprehension",
    "estimatedMinutes": 15,
    "orderIndex": 1
  },
  {
    "id": "les_n5_vocab_1",
    "unitId": "u_n5_vocab_1",
    "title": "Kana & Kanji Foundation: 日・本・人 (Vector Stroke Practice)",
    "lessonType": "kanji_writing",
    "estimatedMinutes": 20,
    "orderIndex": 1
  },
  {
    "id": "les_n5_gram_1",
    "unitId": "u_n5_gram_1",
    "title": "Grammar Drill 1: Copula & Demonstratives (これ・それ・あれ・です)",
    "lessonType": "grammar_lesson",
    "estimatedMinutes": 15,
    "orderIndex": 1
  },
  {
    "id": "les_n5_gram_2",
    "unitId": "u_n5_gram_2",
    "title": "Grammar Drill 2: Case Particles & Verb Predicates (を・に・で・へ・から)",
    "lessonType": "grammar_lesson",
    "estimatedMinutes": 20,
    "orderIndex": 2
  },
  {
    "id": "les_n5_gram_3",
    "unitId": "u_n5_gram_3",
    "title": "Grammar Drill 3: Adjectives & Polite Requests (〜てください・〜てもいい)",
    "lessonType": "grammar_lesson",
    "estimatedMinutes": 20,
    "orderIndex": 3
  },
  {
    "id": "les_n5_read_1",
    "unitId": "u_n5_read_1",
    "title": "Reading Drill: Campus Tea Party & Library Schedule Notices",
    "lessonType": "reading_drill",
    "estimatedMinutes": 15,
    "orderIndex": 1
  },
  {
    "id": "les_n5_listen_1",
    "unitId": "u_n5_listen_1",
    "title": "Listening Drill: Movie Meetup & Station Appointment Dialogue",
    "lessonType": "listening_comprehension",
    "estimatedMinutes": 15,
    "orderIndex": 1
  },
  {
    "id": "les_n5_exam_star",
    "unitId": "u_n5_exam_1",
    "title": "N5 Star Exam: Syntax Reordering & Case Particle Master",
    "lessonType": "practice_exam",
    "estimatedMinutes": 25,
    "orderIndex": 1
  },
  {
    "id": "les_n4_gram_1",
    "unitId": "u_n4_gram_1",
    "title": "Grammar Drill 1: Potential Verbs (書ける・話せる・泳げる)",
    "lessonType": "grammar_lesson",
    "estimatedMinutes": 20,
    "orderIndex": 1
  },
  {
    "id": "les_n4_gram_2",
    "unitId": "u_n4_gram_2",
    "title": "Grammar Drill 2: Benefactives (〜てあげる・〜てもらう・〜てくれる)",
    "lessonType": "grammar_lesson",
    "estimatedMinutes": 20,
    "orderIndex": 2
  },
  {
    "id": "les_n4_vocab_1",
    "unitId": "u_n4_vocab_1",
    "title": "Kanji Writing: 会・社・言 (Stroke Practice)",
    "lessonType": "kanji_writing",
    "estimatedMinutes": 20,
    "orderIndex": 1
  },
  {
    "id": "les_n4_read_1",
    "unitId": "u_n4_read_1",
    "title": "Reading Drill: Residential Garbage Rules & Clinic Hours",
    "lessonType": "reading_drill",
    "estimatedMinutes": 20,
    "orderIndex": 1
  },
  {
    "id": "les_n4_listen_1",
    "unitId": "u_n4_listen_1",
    "title": "Listening Drill: Office Presentation Preparation Tasks",
    "lessonType": "listening_comprehension",
    "estimatedMinutes": 20,
    "orderIndex": 1
  },
  {
    "id": "les_n4_exam_star",
    "unitId": "u_n4_exam_1",
    "title": "N4 Star Exam: Complex Sentences & Conditional Connectors",
    "lessonType": "practice_exam",
    "estimatedMinutes": 30,
    "orderIndex": 1
  },
  {
    "id": "les_n3_gram_1",
    "unitId": "u_n3_gram_1",
    "title": "Grammar Drill 1: Contrast Markers (に対して vs 反面 vs に比べて)",
    "lessonType": "grammar_lesson",
    "estimatedMinutes": 25,
    "orderIndex": 1
  },
  {
    "id": "les_n3_gram_2",
    "unitId": "u_n3_gram_2",
    "title": "Grammar Drill 2: Conjectural Modality (わけがない・に違いない・せいで)",
    "lessonType": "grammar_lesson",
    "estimatedMinutes": 25,
    "orderIndex": 2
  },
  {
    "id": "les_n3_vocab_1",
    "unitId": "u_n3_vocab_1",
    "title": "Kanji Writing: 対・面・政 (Stroke Practice)",
    "lessonType": "kanji_writing",
    "estimatedMinutes": 25,
    "orderIndex": 1
  },
  {
    "id": "les_n3_read_1",
    "unitId": "u_n3_read_1",
    "title": "Reading Drill: Flextime Reform & Worker Autonomy Editorial",
    "lessonType": "reading_drill",
    "estimatedMinutes": 25,
    "orderIndex": 1
  },
  {
    "id": "les_n3_listen_1",
    "unitId": "u_n3_listen_1",
    "title": "Listening Drill: Marketing Campaign Deadline Negotiation",
    "lessonType": "listening_comprehension",
    "estimatedMinutes": 20,
    "orderIndex": 1
  },
  {
    "id": "les_n3_exam_star",
    "unitId": "u_n3_exam_1",
    "title": "N3 Star Exam: Intermediate Discourse & Sentence Synthesis",
    "lessonType": "practice_exam",
    "estimatedMinutes": 30,
    "orderIndex": 1
  },
  {
    "id": "les_n2_gram_1",
    "unitId": "u_n2_gram_1",
    "title": "Grammar Drill 1: High Modality (にほかならない・余儀なくされる)",
    "lessonType": "grammar_lesson",
    "estimatedMinutes": 30,
    "orderIndex": 1
  },
  {
    "id": "les_n2_gram_2",
    "unitId": "u_n2_gram_2",
    "title": "Grammar Drill 2: Discourse Prepositions (を契機に・に基づいて・をめぐって)",
    "lessonType": "grammar_lesson",
    "estimatedMinutes": 30,
    "orderIndex": 2
  },
  {
    "id": "les_n2_vocab_1",
    "unitId": "u_n2_vocab_1",
    "title": "Kanji Writing: 把・握・契 (Stroke Practice)",
    "lessonType": "kanji_writing",
    "estimatedMinutes": 25,
    "orderIndex": 1
  },
  {
    "id": "les_n2_read_1",
    "unitId": "u_n2_read_1",
    "title": "Reading Drill: Tacit Knowledge Transfer in Remote Organizations",
    "lessonType": "reading_drill",
    "estimatedMinutes": 30,
    "orderIndex": 1
  },
  {
    "id": "les_n2_listen_1",
    "unitId": "u_n2_listen_1",
    "title": "Listening Drill: Enterprise Cloud Modernization Strategy",
    "lessonType": "listening_comprehension",
    "estimatedMinutes": 25,
    "orderIndex": 1
  },
  {
    "id": "les_n2_exam_star",
    "unitId": "u_n2_exam_1",
    "title": "N2 Star Exam: Business Sentence Composition & Clause Embedding",
    "lessonType": "practice_exam",
    "estimatedMinutes": 35,
    "orderIndex": 1
  },
  {
    "id": "les_n1_gram_1",
    "unitId": "u_n1_gram_1",
    "title": "Grammar Drill 1: Extreme Registers (極まりない・皮切りに・んばかりに)",
    "lessonType": "grammar_lesson",
    "estimatedMinutes": 35,
    "orderIndex": 1
  },
  {
    "id": "les_n1_gram_2",
    "unitId": "u_n1_gram_2",
    "title": "Grammar Drill 2: Normative Restraint (を禁じ得ない・であれ・と相まって)",
    "lessonType": "grammar_lesson",
    "estimatedMinutes": 35,
    "orderIndex": 2
  },
  {
    "id": "les_n1_vocab_1",
    "unitId": "u_n1_vocab_1",
    "title": "Kanji Writing: 示・唆・緻 (Stroke Practice)",
    "lessonType": "kanji_writing",
    "estimatedMinutes": 30,
    "orderIndex": 1
  },
  {
    "id": "les_n1_read_1",
    "unitId": "u_n1_read_1",
    "title": "Reading Drill: Linguistic Determinism & Structural Semiotics",
    "lessonType": "reading_drill",
    "estimatedMinutes": 35,
    "orderIndex": 1
  },
  {
    "id": "les_n1_listen_1",
    "unitId": "u_n1_listen_1",
    "title": "Listening Drill: AI Ethics & Epistemic Agency Symposium",
    "lessonType": "listening_comprehension",
    "estimatedMinutes": 30,
    "orderIndex": 1
  },
  {
    "id": "les_n1_exam_star",
    "unitId": "u_n1_exam_1",
    "title": "N1 Star Exam: Supreme Literary & Syntactic Reordering",
    "lessonType": "practice_exam",
    "estimatedMinutes": 40,
    "orderIndex": 1
  }
];

export const CURRICULUM_EXERCISE_ITEMS: SeedExerciseItem[] = [
  {
    "id": "item_ia_listen_4",
    "lessonId": "les_ia_listen_2",
    "itemType": "multiple_choice",
    "passageText": "[AUDIO TRANSCRIPT: Academic Lecture - Biomimetics in Naval Engineering]\nProfessor: Today we examine how the dermal denticles of fast-swimming pelagic sharks inspired drag-reduction riblets on commercial ship hulls. Microscopic grooving channels turbulent vortices, preventing flow separation along the hydrodynamic boundary layer and reducing frictional resistance by up to eight percent.",
    "prompt": "According to the lecture, by what maximum percentage can biomimetic riblet surface textures reduce frictional drag?",
    "options": [
      "Up to eight percent (8%)",
      "Approximately fifteen percent (15%)",
      "Exactly two percent (2%)",
      "Over twenty-five percent (25%)"
    ],
    "correctAnswer": "Up to eight percent (8%)",
    "explanation": "The professor specifies: \"...reducing frictional resistance by up to eight percent.\""
  },
  {
    "id": "item_ia_listen_5",
    "lessonId": "les_ia_listen_2",
    "itemType": "sentence_completion",
    "passageText": "See Marine Biomimetics Lecture above.",
    "prompt": "What biological feature inspired the drag-reduction riblet micro-grooves?",
    "options": [
      "Dermal denticles of pelagic sharks",
      "Pectoral fins of humpback whales",
      "Nacre architecture of molluscs",
      "Hydrophobic lotus leaves"
    ],
    "correctAnswer": "Dermal denticles of pelagic sharks",
    "explanation": "The lecture begins: \"dermal denticles of fast-swimming pelagic sharks inspired drag-reduction riblets\"."
  },
  {
    "id": "item_ig_read_5",
    "lessonId": "les_ig_read_3",
    "itemType": "multiple_choice",
    "passageText": "The Renaissance of the Inland Waterways Network\n\nConstructed during the dawn of the Industrial Revolution to transport coal, pottery, and iron between manufacturing hubs, Britain's narrow canal networks fell into steep obsolescence following the expansion of national railway lines in the mid-nineteenth century. Abandoned lock systems deteriorated rapidly until volunteer preservation trusts mobilized in the 1960s. Today, over two thousand miles of navigable inland waterways have been fully restored, functioning as thriving linear ecological reserves and popular recreational cruising destinations.",
    "prompt": "What technological development initially precipitated the obsolescence of narrow commercial canals in the mid-19th century?",
    "options": [
      "The expansion of national railway networks",
      "The introduction of motorized diesel barges",
      "Severe nationwide coal shortages",
      "The privatization of inland toll locks"
    ],
    "correctAnswer": "The expansion of national railway networks",
    "explanation": "The text notes: \"...narrow canal networks fell into steep obsolescence following the expansion of national railway lines in the mid-nineteenth century.\""
  },
  {
    "id": "item_ig_read_6",
    "lessonId": "les_ig_read_3",
    "itemType": "true_false_not_given",
    "passageText": "See The Renaissance of the Inland Waterways Network above.",
    "prompt": "Do the following statement agree with the text?\n\n\"Today, more than two thousand miles of restored canals serve as recreational waterways and ecological corridors.\"",
    "options": [
      "TRUE",
      "FALSE",
      "NOT GIVEN"
    ],
    "correctAnswer": "TRUE",
    "explanation": "The passage explicitly concludes: \"Today, over two thousand miles of navigable inland waterways have been fully restored, functioning as thriving linear ecological reserves and popular recreational cruising destinations.\""
  },
  {
    "id": "item_n3_g2_1",
    "lessonId": "les_n3_gram_2",
    "itemType": "multiple_choice",
    "prompt": "Choose the most appropriate expression to fill in the blank:\n\n「彼のように真面目な学生が無断でテストを休む（　）。絶対に何か事故があったはずだ。」\n(\"There is no way that an earnest student like him would skip a test without permission. There must have been an accident.\")",
    "options": [
      "わけがない",
      "はずがないとは言えない",
      "に決まっている",
      "どころではない"
    ],
    "correctAnswer": "わけがない",
    "explanation": "〜わけがない (wake ga nai) indicates absolute logical impossibility based on strong reasoning (\"there is no reason/way that...\")."
  },
  {
    "id": "item_n3_g2_2",
    "lessonId": "les_n3_gram_2",
    "itemType": "multiple_choice",
    "prompt": "Choose the most appropriate expression to indicate strong conviction:\n\n「窓の外が急に暗くなってきた。午後は大雨になる（　）。」\n(\"The sky outside has suddenly grown dark. It is bound to rain heavily this afternoon.\")",
    "options": [
      "に違いない",
      "にすぎない",
      "わけではない",
      "どころではない"
    ],
    "correctAnswer": "に違いない",
    "explanation": "〜に違いない (ni chigainai) expresses strong, unmistakable subjective conviction (\"it must definitely be...\")."
  },
  {
    "id": "item_n3_l1_1",
    "lessonId": "les_n3_listen_1",
    "itemType": "multiple_choice",
    "passageText": "[AUDIO SCRIPT: マーケティング会議 - Campaign Schedule Negotiations]\n部長：来月の新商品プロモーションだけど、デザインチームからのポスター納品が2日遅れるそうだ。\n担当者：そうしますと、印刷会社へのデータ入稿が金曜日にずれ込みますね。Webサイトの公開日も延期しますか。\n部長：いや、Webサイトの告知は予定通り来週月曜日の午前10時にスタートする。ポスターの店頭配布だけを3日遅らせよう。\n担当者：承知しました。直ちにWeb制作チームと各店舗に連絡します。",
    "prompt": "What will be delayed according to the manager? (部長は何を遅らせると言っていますか。)",
    "options": [
      "The in-store distribution of promotional posters (ポスターの店頭配布)",
      "The launch of the promotional website (Webサイトの公開)",
      "The new product release date (新商品の発売日)",
      "The internal design meeting (デザインチームの会議)"
    ],
    "correctAnswer": "The in-store distribution of promotional posters (ポスターの店頭配布)",
    "explanation": "The department manager explicitly states: 「Webサイトの告知は予定通り...スタートする。ポスターの店頭配布だけを3日遅らせよう。」"
  },
  {
    "id": "item_n2_g2_1",
    "lessonId": "les_n2_gram_2",
    "itemType": "multiple_choice",
    "prompt": "Choose the most appropriate expression to fill in the blank:\n\n「昨年発生した大規模停電（　）、電力網の耐震補強と分散型蓄電池の導入が進められている。」\n(\"Taking last year's major blackout as a catalyst/turning point, earthquake reinforcement of the power grid and adoption of distributed batteries are progressing.\")",
    "options": [
      "を契機に",
      "をよそに",
      "を皮切りに",
      "を経て"
    ],
    "correctAnswer": "を契機に",
    "explanation": "〜を契機に（して） (o keiki ni) indicates that a major past incident serves as an opportunity or catalyst for significant policy changes or new actions."
  },
  {
    "id": "item_n2_g2_2",
    "lessonId": "les_n2_gram_2",
    "itemType": "multiple_choice",
    "prompt": "Choose the most appropriate expression to indicate adherence to principles or criteria:\n\n「最新の気象予測データ（　）、避難指示の発令基準が見直された。」\n(\"Based on the latest meteorological forecast data, evacuation order issuance criteria were revised.\")",
    "options": [
      "に基づいて",
      "に反して",
      "を通じて",
      "をめぐって"
    ],
    "correctAnswer": "に基づいて",
    "explanation": "〜に基づいて (ni motozuite) means \"based upon / in accordance with\", using data, laws, or principles as a foundation."
  },
  {
    "id": "item_n2_l1_1",
    "lessonId": "les_n2_listen_1",
    "itemType": "multiple_choice",
    "passageText": "[AUDIO SCRIPT: 基幹システム刷新役員会 - Cloud Migration Strategy]\n役員A：オンプレミスで運用してきた現行のERPシステムですが、保守期限が来年末に迫っています。全面的なクラウド移行を進めるにあたり、最大のボトルネックは何でしょうか。\n技術担当役員：現行データベースの独自カスタマイズが多岐にわたる点です。移行時のデータ不整合リスクを最小化するため、一括カットオーバーではなく、顧客管理とサプライチェーン管理の2フェーズに分割して段階移行することを推奨します。\n役員A：なるほど。業務停止リスクを避けるためにも、その段階的移行案で進めましょう。",
    "prompt": "What strategy did the technical director recommend to minimize transition risks?",
    "options": [
      "A two-phase phased migration dividing CRM and SCM (顧客管理とサプライチェーンの2フェーズ段階移行)",
      "A total single-day complete cutover during the year-end holidays (年末の一括全面カットオーバー)",
      "Extending the on-premises legacy hardware maintenance contract (オンプレミス保守期限の再延長)",
      "Completely abandoning relational database customization (リレーショナルDBカスタマイズの完全破棄)"
    ],
    "correctAnswer": "A two-phase phased migration dividing CRM and SCM (顧客管理とサプライチェーンの2フェーズ段階移行)",
    "explanation": "The technical executive states: 「一括カットオーバーではなく、顧客管理とサプライチェーン管理の2フェーズに分割して段階移行することを推奨します」."
  },
  {
    "id": "item_n1_g2_1",
    "lessonId": "les_n1_gram_2",
    "itemType": "multiple_choice",
    "prompt": "Choose the most appropriate expression to fill in the blank:\n\n「長年愛された歴史的建造物が取り壊されるニュースを聞き、深い悲哀と喪失感（　）。」\n(\"Hearing the news that the historically cherished architecture was to be demolished, I could not help but feel profound sorrow and loss.\")",
    "options": [
      "を禁じ得ない",
      "にたえない",
      "極まりない",
      "にほかならない"
    ],
    "correctAnswer": "を禁じ得ない",
    "explanation": "〜を禁じ得ない (o kinji enai) expresses uncontrollable emotional reaction (\"cannot suppress/forbid the feeling of...\"), typically pairing with nouns like 怒り, 悲哀, 同情."
  },
  {
    "id": "item_n1_g2_2",
    "lessonId": "les_n1_gram_2",
    "itemType": "multiple_choice",
    "prompt": "Choose the most appropriate formal condition marker:\n\n「いかに過酷な条件（　）、引き受けた任務は全うしなければならない。」\n(\"However severe the conditions may be, the accepted mission must be accomplished completely.\")",
    "options": [
      "であれ",
      "にあれ",
      "ともあれ",
      "とはいえ"
    ],
    "correctAnswer": "であれ",
    "explanation": "〜であれ (de are) is a high formal literary expression signifying \"regardless of whether / no matter how... it is\"."
  },
  {
    "id": "item_n1_l1_1",
    "lessonId": "les_n1_listen_1",
    "itemType": "multiple_choice",
    "passageText": "[AUDIO SCRIPT: AI倫理シンポジウム基調討論 - Algorithmic Agency Debate]\n司会者：自律型AIエージェントが金融取引や自動運転において不可逆的な損害を生じさせた場合、その認識論的責任はどこに帰属するのでしょうか。\n登壇者：問題の本質は「説明可能性のブラックボックス化」にあります。どれほど高度なディープラーニングモデルであっても、判断プロセスの因果的系譜を人間が遡及検証できない限り、法的主体としての免責は認められず、配備した開発者および運用組織が厳格な無過失責任を負うべきです。",
    "prompt": "What conclusion did the speaker express regarding liability when an autonomous AI causes irreversible damage?",
    "options": [
      "The developer and operating organization must bear strict liability unless causal accountability is verifiable (因果関係の遡及検証が不能な限り組織が無過失責任を負うべき)",
      "The algorithm itself should be recognized as an independent legal person (AIアルゴリズム自身を独立した法的主体として認定すべき)",
      "All algorithmic financial trading must be banned by international treaty (すべてのアルゴリズム金融取引を国際条約で禁止すべき)",
      "Users who deployed the software assume all contractual risk (ソフトウェアを購入したエンドユーザーが全責任を負うべき)"
    ],
    "correctAnswer": "The developer and operating organization must bear strict liability unless causal accountability is verifiable (因果関係の遡及検証が不能な限り組織が無過失責任を負うべき)",
    "explanation": "The speaker concludes: 「判断プロセスの因果的系譜を人間が遡及検証できない限り...配備した開発者および運用組織が厳格な無過失責任を負うべきです」."
  },
  {
    "id": "item_ia_read_1",
    "lessonId": "les_ia_read_1",
    "itemType": "matching_headings",
    "passageText": "The Cognitive Architecture of Bilingualism: Executive Function, Inhibitory Control, and Late-Age Neuroplasticity\n\nParagraph A: Over the past four decades, cognitive psycholinguistics has undergone a profound paradigm shift regarding the neural consequences of multi-language acquisition. Early twentieth-century pedagogical literature routinely warned that bilingualism in young children induced \"mental fatigue\" and \"linguistic confusion.\" Modern neuroimaging has thoroughly dismantled this deficit model. Current fMRI and event-related potential investigations demonstrate that navigating multiple lexical and syntactic inventories actively fortifies the brain's dorsal anterior cingulate cortex and bilateral frontoparietal control networks.\n\nParagraph B: The operational core of this cognitive fortification lies in inhibitory control—the conscious suppression of prepotent mental representations. When a bilingual individual communicates, both language systems remain perpetually activated. Even during monolingual interaction, the non-target vocabulary competes for phonological and semantic selection. Consequently, the brain must continuously deploy executive attentional filters to attenuate interference from competing lemmas. This perpetual cognitive mediation functions akin to resistance training for neural circuitry.\n\nParagraph C: The longitudinal consequences of this sustained neuro-computational exertion become strikingly apparent in geriatric populations. Epidemiological cohorts followed across European and North American clinics indicate that bilingual older adults manifest clinical symptoms of neurodegenerative dementias—including Alzheimer's pathology—approximately 4.5 years later than demographically matched monolingual peers, despite displaying comparable or greater neuropathological plaque burden on post-mortem histological examination. Bilingualism provides a cognitive buffer, delaying cognitive decline through structural resilience.",
    "prompt": "Choose the correct heading for Paragraph A from the list of headings below.",
    "options": [
      "i. The operational mechanics of lexical suppression",
      "ii. Epidemiological delays in degenerative onset",
      "iii. A historical reversal: From deficit theory to structural advantage",
      "iv. Neural degeneration and post-mortem histological anomalies"
    ],
    "correctAnswer": "iii. A historical reversal: From deficit theory to structural advantage",
    "explanation": "Paragraph A outlines the paradigm shift from early 20th-century \"mental fatigue/deficit models\" to modern neuroimaging evidence showing cognitive fortification."
  },
  {
    "id": "item_ia_read_2",
    "lessonId": "les_ia_read_1",
    "itemType": "true_false_not_given",
    "passageText": "See Passage 1: Cognitive Architecture of Bilingualism",
    "prompt": "Do the following statement agree with the information given in the text?\n\n\"When a bilingual speaker communicates in one language, lexical items from their secondary language are completely deactivated by the auditory cortex.\"",
    "options": [
      "TRUE",
      "FALSE",
      "NOT GIVEN"
    ],
    "correctAnswer": "FALSE",
    "explanation": "Paragraph B explicitly states: \"When a bilingual individual communicates, both language systems remain perpetually activated... the non-target vocabulary competes for phonological and semantic selection.\""
  },
  {
    "id": "item_ia_read_3",
    "lessonId": "les_ia_read_1",
    "itemType": "sentence_completion",
    "passageText": "See Passage 1: Cognitive Architecture of Bilingualism",
    "prompt": "Complete the sentence with NO MORE THAN TWO WORDS from the text:\n\nBilingualism acts as a cognitive buffer that offers protection through ____________.",
    "options": [
      "structural resilience",
      "pedagogical literature",
      "phonological selection",
      "auditory cortex"
    ],
    "correctAnswer": "structural resilience",
    "explanation": "Paragraph C concludes that bilingualism offers protection against clinical symptoms through \"structural resilience\"."
  },
  {
    "id": "item_ia_read_4",
    "lessonId": "les_ia_read_2",
    "itemType": "multiple_choice",
    "passageText": "Passive Thermal Regulation and Urban Albedo Optimization in Dense Metropolises\n\nParagraph A: The urban heat island (UHI) effect represents one of the most pressing microclimatic challenges of twenty-first-century civil engineering. In high-density agglomerations characterized by dark asphalt surfaces, concrete canyons, and minimal evapotranspirative vegetation, ambient temperatures frequently exceed surrounding rural baselines by 4°C to 9°C. This thermal disparity exacerbates peak electrical grid demand, drives exponential increases in compressor-based refrigeration, and amplifies respiratory mortality during heatwaves.\n\nParagraph B: Mitigating UHI requires a systematic transition from active mechanical cooling toward passive thermodynamic design. Foremost among these interventions is the deployment of high-albedo cool roofs and retroreflective pavements. High-albedo coatings reflect up to 85% of incoming solar irradiance back into the atmosphere, preventing sensible heat absorption in structural building mass. When paired with aerodynamic ventilation corridors that channel prevailing sea breezes through street alignments, localized surface temperatures drop by up to 3.2°C within two seasons of municipal retrofitting.\n\nParagraph C: Nevertheless, urban planners must avoid simplistic monocultures of reflective surfaces. Excessively reflective vertical facades can inadvertently direct reflected solar radiation down to pedestrian eye levels, dramatically degrading Mean Radiant Temperature (MRT) for pedestrians on sidewalks. Hence, contemporary sustainable architecture demands multi-scale microclimate modelling, balancing high-albedo horizontal roofs with high-canopy deciduous foliage at the street tier.",
    "prompt": "According to Paragraph A, what is a primary consequence of the urban heat island effect in dense metropolitan areas?",
    "options": [
      "An exponential increase in compressor-based refrigeration and electrical grid demand",
      "A permanent decrease in rural agricultural yields surrounding cities",
      "The complete elimination of natural convective air currents",
      "A reduction in the durability of high-albedo roofing polymers"
    ],
    "correctAnswer": "An exponential increase in compressor-based refrigeration and electrical grid demand",
    "explanation": "Paragraph A explicitly states that the thermal disparity \"exacerbates peak electrical grid demand, drives exponential increases in compressor-based refrigeration, and amplifies respiratory mortality during heatwaves.\""
  },
  {
    "id": "item_ia_read_5",
    "lessonId": "les_ia_read_2",
    "itemType": "true_false_not_given",
    "passageText": "See Passage 2: Passive Thermal Regulation",
    "prompt": "Do the following statement agree with the information in Paragraph B?\n\n\"High-albedo coatings prevent building materials from storing sensible solar heat by reflecting the vast majority of incoming solar radiation.\"",
    "options": [
      "TRUE",
      "FALSE",
      "NOT GIVEN"
    ],
    "correctAnswer": "TRUE",
    "explanation": "Paragraph B explains that coatings reflect up to 85% of incoming solar irradiance, \"preventing sensible heat absorption in structural building mass.\""
  },
  {
    "id": "item_ia_read_6",
    "lessonId": "les_ia_read_2",
    "itemType": "multiple_choice",
    "passageText": "See Passage 2: Passive Thermal Regulation",
    "prompt": "According to Paragraph C, why must urban planners avoid installing excessively reflective materials on vertical building facades?",
    "options": [
      "They can reflect radiation downward and deteriorate pedestrian Mean Radiant Temperature",
      "They cause structural degradation of deciduous tree root systems",
      "They impede the aerodynamic circulation of sea breeze ventilation corridors",
      "They require daily chemical washing to maintain reflective efficacy"
    ],
    "correctAnswer": "They can reflect radiation downward and deteriorate pedestrian Mean Radiant Temperature",
    "explanation": "Paragraph C explicitly states: \"Excessively reflective vertical facades can inadvertently direct reflected solar radiation down to pedestrian eye levels, dramatically degrading Mean Radiant Temperature (MRT) for pedestrians.\""
  },
  {
    "id": "item_ia_read_7",
    "lessonId": "les_ia_read_3",
    "itemType": "multiple_choice",
    "passageText": "Epistemological Typology in Archaeological Stratigraphy\n\nArchaeological interpretation has historically oscillated between culture-historical taxonomies and processual quantitative models. The foundational challenge of stratigraphic excavation lies in the \"Harris Matrix\" paradigm: distinguishing depositional events from post-depositional taphonomic disturbances. When burrowing fauna (bioturbation) or cryoturbation displaces lithic artifacts across geological strata, strict vertical depth ceases to correlate linearly with chronological age. Epistemologically, the archaeologist must synthesize radiometric dating, micro-wear residue analysis, and spatial clustering to reconstruct human intentionality rather than geological coincidence.",
    "prompt": "What constitutes the primary hazard to linear chronological dating in stratigraphic excavation according to the text?",
    "options": [
      "Post-depositional taphonomic disturbances such as bioturbation and cryoturbation",
      "The inability of the Harris Matrix to model three-dimensional spatial coordinates",
      "Calibration inaccuracies inherent in all radiometric radiocarbon decay equations",
      "Human intentionality confounding lithic micro-wear wear patterns"
    ],
    "correctAnswer": "Post-depositional taphonomic disturbances such as bioturbation and cryoturbation",
    "explanation": "The text states: \"When burrowing fauna (bioturbation) or cryoturbation displaces lithic artifacts across geological strata, strict vertical depth ceases to correlate linearly with chronological age.\""
  },
  {
    "id": "item_ia_read_8",
    "lessonId": "les_ia_read_3",
    "itemType": "true_false_not_given",
    "passageText": "See Passage 3: Epistemological Typology in Archaeological Stratigraphy",
    "prompt": "Do the following statement agree with the text?\n\n\"Vertical depth alone is sufficient to establish the exact sequence of human occupation without requiring radiometric or residue verification.\"",
    "options": [
      "TRUE",
      "FALSE",
      "NOT GIVEN"
    ],
    "correctAnswer": "FALSE",
    "explanation": "The text clarifies that because taphonomic processes displace artifacts, vertical depth alone ceases to correlate linearly, requiring synthesis with radiometric dating and residue analysis."
  },
  {
    "id": "item_ia_read_9",
    "lessonId": "les_ia_read_3",
    "itemType": "sentence_completion",
    "passageText": "See Passage 3: Epistemological Typology in Archaeological Stratigraphy",
    "prompt": "Complete the sentence with NO MORE THAN TWO WORDS from the text:\n\nArchaeologists rely on micro-wear residue analysis and spatial clustering to reconstruct ____________.",
    "options": [
      "human intentionality",
      "cultural taxonomies",
      "Harris Matrix",
      "geological strata"
    ],
    "correctAnswer": "human intentionality",
    "explanation": "The concluding sentence explicitly affirms the goal is to \"reconstruct human intentionality rather than geological coincidence.\""
  },
  {
    "id": "item_ia_listen_1",
    "lessonId": "les_ia_listen_1",
    "itemType": "multiple_choice",
    "passageText": "[AUDIO TRANSCRIPT: University Central Laboratory Registration]\nReceptionist: Good morning, Advanced Research Facilities. How can I assist your team today?\nDr. Jensen: Hello, I am Dr. Jensen from the Nanomaterials Group. We need to book the Transmission Electron Microscope (TEM) on Level 3 for next Tuesday morning.\nReceptionist: Certainly, Dr. Jensen. Level 3 is restricted access. Have all researchers in your party completed the Bio-safety Level 2 induction?\nDr. Jensen: Yes, both myself and my research assistant, Mark Davies, finished the certification last Friday. Our group project code is NM-842.\nReceptionist: Perfect. The TEM is available from 09:00 to 13:00. Please note that high-resolution cryogenic cooling requires a 45-minute calibration buffer before observation begins.\nDr. Jensen: Understood. We will log in at 08:15 so the beam alignment and nitrogen stabilization are completed before our sample run at nine.",
    "prompt": "What prerequisite must Dr. Jensen's team fulfill before accessing the Level 3 Electron Microscope?",
    "options": [
      "Completion of the Bio-safety Level 2 safety induction",
      "Payment of the cryogenic cooling utility deposit",
      "Submission of an ethical peer review declaration",
      "Approval from the Department Dean by Monday noon"
    ],
    "correctAnswer": "Completion of the Bio-safety Level 2 safety induction",
    "explanation": "The receptionist explicitly inquires: \"Have all researchers in your party completed the Bio-safety Level 2 induction?\" and Dr. Jensen confirms both completed it last Friday."
  },
  {
    "id": "item_ia_listen_2",
    "lessonId": "les_ia_listen_1",
    "itemType": "multiple_choice",
    "passageText": "See Lab Registration Transcript above.",
    "prompt": "At what time does Dr. Jensen plan to log in to ensure nitrogen stabilization is ready for the 09:00 observation?",
    "options": [
      "08:15",
      "08:45",
      "09:00",
      "09:45"
    ],
    "correctAnswer": "08:15",
    "explanation": "Dr. Jensen states: \"We will log in at 08:15 so the beam alignment and nitrogen stabilization are completed before our sample run at nine.\""
  },
  {
    "id": "item_ia_listen_3",
    "lessonId": "les_ia_listen_1",
    "itemType": "sentence_completion",
    "passageText": "See Lab Registration Transcript above.",
    "prompt": "What is the group project code provided by Dr. Jensen?",
    "options": [
      "NM-842",
      "TEM-03",
      "BIO-45",
      "RES-2026"
    ],
    "correctAnswer": "NM-842",
    "explanation": "Dr. Jensen explicitly states: \"Our group project code is NM-842.\""
  },
  {
    "id": "item_ig_read_1",
    "lessonId": "les_ig_read_1",
    "itemType": "multiple_choice",
    "passageText": "SECTION 1: WORKPLACE ERGONOMIC ASSESSMENT PROTOCOL (Health & Safety Directive 402)\nAll employees utilizing Display Screen Equipment (DSE) for continuous periods exceeding two hours daily are entitled to a workstation ergonomic evaluation. Initial assessments must be submitted via the Internal Portal within fourteen calendar days of onboarding. If persistent musculoskeletal discomfort arises, employees must notify the departmental safety representative and request a formal re-audit within 48 hours.\n\nSECTION 2: RESIDENTIAL HVAC EMERGENCY PROTOCOLS (Apex Towers Tenancy Notice)\nIn the event of total central heating failure between October 15 and April 30, tenants must contact the 24/7 Facility Hotline on extension 4 immediately. Portable ceramic space heaters will be dispatched within four hours. Do not attempt manual tampering with district heating valves located inside service risers.",
    "prompt": "According to Section 1, under what condition must an employee request a formal workstation re-audit within 48 hours?",
    "options": [
      "Upon experiencing persistent musculoskeletal discomfort",
      "Every fourteen calendar days following onboarding",
      "When changing computer monitors or peripheral equipment",
      "Only after receiving formal medical certification from a physician"
    ],
    "correctAnswer": "Upon experiencing persistent musculoskeletal discomfort",
    "explanation": "Section 1 mandates: \"If persistent musculoskeletal discomfort arises, employees must notify the departmental safety representative and request a formal re-audit within 48 hours.\""
  },
  {
    "id": "item_ig_read_2",
    "lessonId": "les_ig_read_1",
    "itemType": "multiple_choice",
    "passageText": "See HVAC Notice above.",
    "prompt": "According to Section 2, what action is strictly prohibited for tenants during a central heating failure?",
    "options": [
      "Manual tampering with district heating valves in service risers",
      "Accepting ceramic space heaters dispatched by management",
      "Calling the Facility Hotline outside regular business hours",
      "Notifying building management within four hours"
    ],
    "correctAnswer": "Manual tampering with district heating valves in service risers",
    "explanation": "Section 2 explicitly warns: \"Do not attempt manual tampering with district heating valves located inside service risers.\""
  },
  {
    "id": "item_ig_read_3",
    "lessonId": "les_ig_read_2",
    "itemType": "multiple_choice",
    "passageText": "COMPANY HANDBOOK: SECTION 4.2 - STATUTORY PARENTAL LEAVE & FORMAL DISPUTES\n\nSub-clause A: Eligible employees who have completed at least twenty-six weeks of continuous service by the end of the qualifying week are entitled to up to eighteen weeks of unpaid parental leave per child. A maximum of four weeks may be taken in any single calendar year, unless an alternative scheduling agreement has been ratified in writing by the departmental director. Employees must submit written notification at least 21 days prior to the proposed leave commencement date.\n\nSub-clause B: If an employee believes a statutory leave request has been unreasonably obstructed, they may initiate Stage 1 of the Formal Grievance Procedure by lodging an incident memorandum with Human Resources within ten working days. Human Resources is required to convene an evidentiary consultation within five business days of receipt.",
    "prompt": "What is the advance notification notice required when applying for parental leave under Sub-clause A?",
    "options": [
      "At least 21 days prior to the commencement date",
      "Within ten working days of the qualifying week",
      "Exactly four weeks prior to the child's birthday",
      "No advance notice is required for employees with over one year of service"
    ],
    "correctAnswer": "At least 21 days prior to the commencement date",
    "explanation": "Sub-clause A states: \"Employees must submit written notification at least 21 days prior to the proposed leave commencement date.\""
  },
  {
    "id": "item_ig_read_4",
    "lessonId": "les_ig_read_2",
    "itemType": "true_false_not_given",
    "passageText": "See Company Handbook Section 4.2 above.",
    "prompt": "Do the following statement agree with Sub-clause B?\n\n\"Human Resources must convene an evidentiary consultation within five business days after a grievance memorandum is submitted.\"",
    "options": [
      "TRUE",
      "FALSE",
      "NOT GIVEN"
    ],
    "correctAnswer": "TRUE",
    "explanation": "Sub-clause B states: \"Human Resources is required to convene an evidentiary consultation within five business days of receipt.\""
  },
  {
    "id": "item_ig_listen_1",
    "lessonId": "les_ig_listen_1",
    "itemType": "multiple_choice",
    "passageText": "[AUDIO TRANSCRIPT: Riverside Community Leisure Centre]\nStaff: Hello, welcome to Riverside Community Centre. Are you looking to join our fitness suites?\nApplicant: Yes, I just moved to the neighbourhood. I am interested in the swimming pool and evening badminton courts.\nStaff: Excellent. We have three tiers: Bronze for gym only, Silver which includes the Olympic pool, and Gold which grants unlimited court reservations and sauna access.\nApplicant: How much is the Silver tier per month?\nStaff: The Silver membership is £38 monthly with no annual lock-in contract. Locker hire is included free, though there is a one-off £15 smart fob registration fee.\nApplicant: That sounds reasonable. Can I use the pool before 7:00 AM on weekdays?\nStaff: Yes, early bird lane swimming starts at 06:00 AM every Monday through Friday.",
    "prompt": "What is the monthly fee for the Silver membership tier at Riverside Community Centre?",
    "options": [
      "£38 monthly",
      "£15 monthly",
      "£50 monthly",
      "Free for local residents"
    ],
    "correctAnswer": "£38 monthly",
    "explanation": "The staff member states: \"The Silver membership is £38 monthly with no annual lock-in contract.\""
  },
  {
    "id": "item_ig_listen_2",
    "lessonId": "les_ig_listen_1",
    "itemType": "multiple_choice",
    "passageText": "See Community Centre Transcript above.",
    "prompt": "At what time does weekday early bird lane swimming open?",
    "options": [
      "06:00 AM",
      "07:00 AM",
      "08:00 AM",
      "09:00 AM"
    ],
    "correctAnswer": "06:00 AM",
    "explanation": "The staff member confirms: \"early bird lane swimming starts at 06:00 AM every Monday through Friday.\""
  },
  {
    "id": "item_n5_g1_1",
    "lessonId": "les_n5_gram_1",
    "itemType": "multiple_choice",
    "prompt": "Choose the most appropriate word to fill in the blank (　):\n\n「これは（　）の本ですか。」「田中さんの本です。」\n(\"Whose book is this?\" \"It is Mr. Tanaka's book.\")",
    "options": [
      "だれ",
      "どれ",
      "どこ",
      "いつ"
    ],
    "correctAnswer": "だれ",
    "explanation": "When asking who owns an item, use the interrogative pronoun だれ (dare - who) followed by the genitive particle の (whose). Therefore, 「だれの本」 means \"whose book\"."
  },
  {
    "id": "item_n5_g1_2",
    "lessonId": "les_n5_gram_1",
    "itemType": "multiple_choice",
    "prompt": "Choose the most appropriate demonstrative to fill in the blank (　):\n\n（話者から離れていて、聞き手に近い場所を指して）\n「（　）は辞書です。」\n(Pointing to an object near the listener: \"[  ] is a dictionary.\")",
    "options": [
      "それ",
      "これ",
      "あれ",
      "どれ"
    ],
    "correctAnswer": "それ",
    "explanation": "In Japanese ko-so-a-do demonstratives: これ refers to things close to the speaker, それ refers to things close to the listener, and あれ refers to things distant from both."
  },
  {
    "id": "item_n5_g1_3",
    "lessonId": "les_n5_gram_1",
    "itemType": "multiple_choice",
    "prompt": "Choose the correct negative polite form to complete the sentence:\n\n「鈴木さんは会社員（　）。学生です。」\n(\"Mr. Suzuki is not a company employee. He is a student.\")",
    "options": [
      "ではありません",
      "でした",
      "あります",
      "ありませんでした"
    ],
    "correctAnswer": "ではありません",
    "explanation": "The present polite negative form of the copula です is ではありません (or じゃありません)."
  },
  {
    "id": "item_n5_g2_1",
    "lessonId": "les_n5_gram_2",
    "itemType": "multiple_choice",
    "prompt": "Choose the most appropriate particle to fill in the blank (　):\n\n「わたし（　）アメリカからの留学生です。」\n(\"I [  ] an international student from America.\")",
    "options": [
      "は",
      "が",
      "を",
      "に"
    ],
    "correctAnswer": "は",
    "explanation": "When introducing oneself and establishing the sentence topic, use the topic-marking particle は (wa)."
  },
  {
    "id": "item_n5_g2_2",
    "lessonId": "les_n5_gram_2",
    "itemType": "multiple_choice",
    "prompt": "Choose the most appropriate particle to fill in the blank (　):\n\n「毎朝７時（　）起きます。」\n(\"I wake up [  ] 7:00 every morning.\")",
    "options": [
      "に",
      "で",
      "を",
      "へ"
    ],
    "correctAnswer": "に",
    "explanation": "After a specific point in time containing a number (7時 - 7:00), use the specific time-marking particle に (ni)."
  },
  {
    "id": "item_n5_g2_3",
    "lessonId": "les_n5_gram_2",
    "itemType": "multiple_choice",
    "prompt": "Choose the most appropriate particle to fill in the blank (　):\n\n「図書館（　）日本語を勉強します。」\n(\"I study Japanese [  ] the library.\")",
    "options": [
      "で",
      "に",
      "へ",
      "を"
    ],
    "correctAnswer": "で",
    "explanation": "The particle で marks the location where an active event or action (勉強します) takes place."
  },
  {
    "id": "item_n5_g3_1",
    "lessonId": "les_n5_gram_3",
    "itemType": "multiple_choice",
    "prompt": "Choose the correct past form of the i-adjective:\n\n「昨日のテストはとても（　）。」\n(\"Yesterday's test was very difficult.\")",
    "options": [
      "むずかしかったです",
      "むずかしいでした",
      "むずかしくないでした",
      "むずかしいかった"
    ],
    "correctAnswer": "むずかしかったです",
    "explanation": "For i-adjectives, the polite past affirmative form is formed by removing 〜い and adding 〜かったです."
  },
  {
    "id": "item_n5_g3_2",
    "lessonId": "les_n5_gram_3",
    "itemType": "multiple_choice",
    "prompt": "Choose the correct form to make a polite request:\n\n「ここに名前を（　）ください。」\n(\"Please write your name here.\")",
    "options": [
      "書いて",
      "書かないで",
      "書きて",
      "書くで"
    ],
    "correctAnswer": "書いて",
    "explanation": "For polite requests with 〜てください, use the te-form of the verb. For 書く (kaku), the te-form is 書いて (kaite)."
  },
  {
    "id": "item_n5_r1_1",
    "lessonId": "les_n5_read_1",
    "itemType": "multiple_choice",
    "passageText": "留学生センターからのお茶会のお知らせ (Notice: Campus Tea Party)\n\n日時：11月28日（土曜日）午後2時〜午後4時 (Date: Sat, Nov 28, 2:00 PM - 4:00 PM)\n場所：学生会館 2階 日本間 (Location: Student Hall, 2F Japanese Room)\n参加費：無料（お菓子とお茶があります） (Fee: Free - Tea and snacks provided)\n持ち物：特にありません。 (What to bring: Nothing required)\n申し込み：11月25日（水）までに、留学生センターの窓口で名前を書いてください。\n(Registration: Please write your name at the International Student Center desk by Wed, Nov 25)\n※ 定員は20名です。定員になり次第、締め切ります。 (Capacity: 20 participants)",
    "prompt": "What must an international student do if they want to participate in the tea party?",
    "options": [
      "Register at the International Student Center desk by Nov 25 (11月25日までに窓口で申し込む)",
      "Pay a fee for the tea and snacks (参加費を支払う)",
      "Bring their own snacks on the day (お菓子を持参する)",
      "Arrive directly at 4:00 PM on Saturday (午後4時に行く)"
    ],
    "correctAnswer": "Register at the International Student Center desk by Nov 25 (11月25日までに窓口で申し込む)",
    "explanation": "The notice explicitly states: 「11月25日（水）までに、留学生センターの窓口で名前を書いてください」 (Write your name at the International Student Center desk by Nov 25)."
  },
  {
    "id": "item_n5_r1_2",
    "lessonId": "les_n5_read_1",
    "itemType": "multiple_choice",
    "passageText": "See Notice: Campus Tea Party above.",
    "prompt": "Which statement is true according to the notice?",
    "options": [
      "The tea party is free of charge and limited to 20 people (参加費は無料で定員は20名)",
      "Participants must bring their own traditional tea bowl (茶碗を持参しなければならない)",
      "The event is held in the library on the third floor (図書館の3階で開催される)",
      "Registration is accepted until the day of the event (当日まで申し込みを受け付ける)"
    ],
    "correctAnswer": "The tea party is free of charge and limited to 20 people (参加費は無料で定員は20名)",
    "explanation": "The notice states 「参加費：無料」 and 「定員は20名です」."
  },
  {
    "id": "item_n5_l1_1",
    "lessonId": "les_n5_listen_1",
    "itemType": "multiple_choice",
    "passageText": "[AUDIO SCRIPT: 映画の待ち合わせ - Movie Meetup Dialogue]\n男の人：もしもし、田中さん？今どこにいますか。\n女の人：ごめんなさい！電車が少し遅れて、今駅に着きました。南口の改札にいます。\n男の人：わかりました。映画は午後3時からですね。今は2時40分ですから、まだ間に合いますよ。\n女の人：よかったです。どこで会いましょうか。\n男の人：映画館の前の本屋さんにいます。チケットはもう買いましたから、ゆっくり来てください。\n女の人：ありがとうございます。すぐ行きます！",
    "prompt": "Where will the woman and man meet? (女の人はどこで男の人と会いますか。)",
    "options": [
      "In front of the bookstore near the cinema (映画館の前の本屋)",
      "At the South Exit ticket gate (駅の南口の改札)",
      "Inside the train (電車の中)",
      "Inside the cinema theater (映画館の中の座席)"
    ],
    "correctAnswer": "In front of the bookstore near the cinema (映画館の前の本屋)",
    "explanation": "The man explicitly tells the woman: 「映画館の前の本屋さんにいます...ゆっくり来てください」 (I am at the bookstore in front of the cinema)."
  },
  {
    "id": "item_n5_l1_2",
    "lessonId": "les_n5_listen_1",
    "itemType": "multiple_choice",
    "passageText": "See Movie Meetup Dialogue above.",
    "prompt": "What time does the movie start? (映画は何時に始まりますか。)",
    "options": [
      "3:00 PM (午後3時)",
      "2:40 PM (午後2時40分)",
      "2:00 PM (午後2時)",
      "3:40 PM (午後3時40分)"
    ],
    "correctAnswer": "3:00 PM (午後3時)",
    "explanation": "The man states: 「映画は午後3時からですね。今は2時40分ですから、まだ間に合いますよ。」"
  },
  {
    "id": "item_n5_star_1",
    "lessonId": "les_n5_exam_star",
    "itemType": "star_drill",
    "prompt": "Rearrange the numbered words to form a correct sentence, then choose the word that goes into the ★ position:\n\nわたしは　＿＿　＿＿　★　＿＿　食べました。\n(I ate a delicious meal with my friend at a restaurant.)",
    "options": [
      "1: レストランで",
      "2: 友達と",
      "3: おいしい",
      "4: ご飯を"
    ],
    "correctAnswer": "3: おいしい",
    "explanation": "The natural grammatical word order is: 「わたしは 友達と(2) レストランで(1) おいしい(3)★ ご飯を(4) 食べました。」 Therefore, option 3 (おいしい) is in the ★ position."
  },
  {
    "id": "item_n5_star_2",
    "lessonId": "les_n5_exam_star",
    "itemType": "star_drill",
    "prompt": "Rearrange the numbered words to form a correct sentence, then choose the word that goes into the ★ position:\n\n駅まで　＿＿　＿＿　★　＿＿　行きます。\n(I go to the station on foot in about 15 minutes.)",
    "options": [
      "1: 歩いて",
      "2: 15分",
      "3: ぐらいで",
      "4: ここから"
    ],
    "correctAnswer": "2: 15分",
    "explanation": "The natural grammatical order is: 「駅まで ここから(4) 歩いて(1) 15分(2)★ ぐらいで(3) 行きます。」 Therefore, option 2 (15分) is in the ★ position."
  },
  {
    "id": "item_n4_g1_1",
    "lessonId": "les_n4_gram_1",
    "itemType": "multiple_choice",
    "prompt": "Choose the correct potential verb form:\n\n「日本語の漢字が少し（　）。」\n(\"I can read a little Japanese kanji.\")",
    "options": [
      "読めます",
      "読まれます",
      "読ませます",
      "読みたいです"
    ],
    "correctAnswer": "読めます",
    "explanation": "The potential form of the Group 1 verb 読む (yomu) is 読める (yomeru) -> 読めます (yomemasu). Also notice the direct object particle shifts from を to が with potential verbs."
  },
  {
    "id": "item_n4_g1_2",
    "lessonId": "les_n4_gram_1",
    "itemType": "multiple_choice",
    "prompt": "Choose the correct potential form of the irregular verb 来る (kuru):\n\n「明日のパーティーに（　）か。」\n(\"Can you come to tomorrow's party?\")",
    "options": [
      "来られます",
      "来れます",
      "来させます",
      "来ます"
    ],
    "correctAnswer": "来られます",
    "explanation": "The standard potential form of the irregular verb 来る (kuru) is 来られる (korareru) -> 来られます."
  },
  {
    "id": "item_n4_g1_3",
    "lessonId": "les_n4_gram_1",
    "itemType": "multiple_choice",
    "prompt": "Choose the most natural particle with the potential verb:\n\n「わたしは刺身（　）食べられません。」\n(\"I cannot eat sashimi.\")",
    "options": [
      "が",
      "で",
      "に",
      "へ"
    ],
    "correctAnswer": "が",
    "explanation": "In standard Japanese, the ability target of a potential verb takes the subject-marking particle が (or は for contrast/negation)."
  },
  {
    "id": "item_n4_g2_1",
    "lessonId": "les_n4_gram_2",
    "itemType": "multiple_choice",
    "prompt": "Choose the correct benefactive expression:\n\n「誕生日に友達がプレゼントを（　）。」\n(\"A friend gave me a present on my birthday.\")",
    "options": [
      "くれました",
      "あげました",
      "もらいました",
      "やりました"
    ],
    "correctAnswer": "くれました",
    "explanation": "When someone else gives something or performs an action for the speaker, use くれる (kureta/kuremashita)."
  },
  {
    "id": "item_n4_g2_2",
    "lessonId": "les_n4_gram_2",
    "itemType": "multiple_choice",
    "prompt": "Choose the correct benefactive auxiliary verb:\n\n「先生に作文を直して（　）。」\n(\"I had my essay corrected by my teacher.\")",
    "options": [
      "いただきました",
      "さしあげました",
      "くれました",
      "あげました"
    ],
    "correctAnswer": "いただきました",
    "explanation": "When receiving a favor from a person of higher status (先生), use the humble benefactive form いただく (itadakimashita)."
  },
  {
    "id": "item_n4_r1_1",
    "lessonId": "les_n4_read_1",
    "itemType": "multiple_choice",
    "passageText": "アパートのゴミ出しのルール (Apartment Garbage Disposal Guidelines)\n\n1. 燃えるゴミ（生ゴミ・紙くずなど） (Combustible: Food waste, paper)\n   ・毎週 火曜日・金曜日の朝8時までに出してください。\n2. 資源ゴミ（カン・ビン・ペットボトル） (Recyclable: Cans, glass bottles, PET bottles)\n   ・毎週 水曜日の朝8時までに出してください。\n   ・中を水で洗ってから、透明な袋に入れてください。\n3. 粗大ゴミ（家具・自転車など） (Bulky waste: Furniture, bicycles)\n   ・捨てる前に必ず「粗大ゴミ受付センター」に電話して予約してください。有料です。\n※ 前の日の夜にゴミを出すと、カラスや猫が荒らしますので、必ず当日の朝に出してください。",
    "prompt": "When and how should recyclable PET bottles and glass bottles be disposed of?",
    "options": [
      "Washed with water and placed in transparent bags by 8:00 AM on Wednesday (水曜朝8時までに水で洗って透明な袋で出す)",
      "Placed outside on Tuesday evening in blue bags (火曜日の夜に青い袋で出す)",
      "Taken to the bulky waste center on Saturday (土曜日に受付センターへ持参する)",
      "Mixed with combustible food waste on Friday (金曜日に燃えるゴミと一緒に出す)"
    ],
    "correctAnswer": "Washed with water and placed in transparent bags by 8:00 AM on Wednesday (水曜朝8時までに水で洗って透明な袋で出す)",
    "explanation": "Section 2 explicitly specifies: 「毎週 水曜日の朝8時までに出してください。中を水で洗ってから、透明な袋に入れてください」."
  },
  {
    "id": "item_n4_r1_2",
    "lessonId": "les_n4_read_1",
    "itemType": "multiple_choice",
    "passageText": "See Apartment Garbage Disposal Guidelines above.",
    "prompt": "Why is putting out garbage the night before prohibited? (なぜ前日の夜に出してはいけませんか。)",
    "options": [
      "Crows and cats will scatter the garbage (カラスや猫が荒らすため)",
      "The garbage collection truck arrives at midnight (回収車が深夜に来るため)",
      "Tenants must pay an overnight penalty fee (夜間罰金がかかるため)",
      "Combustible waste catches fire in darkness (夜間に燃えやすいため)"
    ],
    "correctAnswer": "Crows and cats will scatter the garbage (カラスや猫が荒らすため)",
    "explanation": "The note states: 「前の日の夜にゴミを出すと、カラスや猫が荒らしますので、必ず当日の朝に出してください」."
  },
  {
    "id": "item_n4_l1_1",
    "lessonId": "les_n4_listen_1",
    "itemType": "multiple_choice",
    "passageText": "[AUDIO SCRIPT: 会議の準備 - Meeting Preparation Tasks]\n課長：佐藤さん、明日の午前10時からの企画会議の準備は進んでいますか。\n佐藤：はい。参加者8名分の資料はコピーが終わりました。\n課長：ありがとう。会議室はどこでしたっけ？\n佐藤：第2会議室です。ただ、プロジェクターの調子が悪いみたいなので、後で確認してきます。\n課長：じゃあ、プロジェクターを確認する前に、先に総務課に行ってホワイトボード用の新しいペンをもらってきてくれる？前回の会議でインクが出なかったから。\n佐藤：承知しました。先に総務課に行ってきます。",
    "prompt": "What will Sato do first? (佐藤さんはまず何をしますか。)",
    "options": [
      "Go to General Affairs to get whiteboard pens (総務課へペンをもらいに行く)",
      "Check the projector in Meeting Room 2 (第2会議室のプロジェクターを確認する)",
      "Copy documents for 8 participants (8名分の資料をコピーする)",
      "Attend the planning meeting (企画会議に出席する)"
    ],
    "correctAnswer": "Go to General Affairs to get whiteboard pens (総務課へペンをもらいに行く)",
    "explanation": "The manager commands: 「プロジェクターを確認する前に、先に総務課に行ってホワイトボード用の新しいペンをもらってきてくれる？」 and Sato replies: 「先に総務課に行ってきます」."
  },
  {
    "id": "item_n4_star_1",
    "lessonId": "les_n4_exam_star",
    "itemType": "star_drill",
    "prompt": "Rearrange the numbered words to form a correct sentence, then choose the word that goes into the ★ position:\n\nいくら　＿＿　＿＿　★　＿＿　覚えられません。\n(No matter how much I study, I cannot memorize kanji easily.)",
    "options": [
      "1: 勉強しても",
      "2: 漢字が",
      "3: なかなか",
      "4: 一生懸命"
    ],
    "correctAnswer": "2: 漢字が",
    "explanation": "The natural grammatical word order is: 「いくら 一生懸命(4) 勉強しても(1) 漢字が(2)★ なかなか(3) 覚えられません。」 Therefore, option 2 (漢字が) is in the ★ position."
  },
  {
    "id": "item_n3_g1_1",
    "lessonId": "les_n3_gram_1",
    "itemType": "multiple_choice",
    "prompt": "Choose the most appropriate expression to fill in the blank:\n\n「兄が社交的で活動的なの（　）、弟は物静かで読書を好む。」\n(\"In contrast to the older brother who is sociable and active, the younger brother is quiet and prefers reading.\")",
    "options": [
      "に対して",
      "反面",
      "にとって",
      "として"
    ],
    "correctAnswer": "に対して",
    "explanation": "〜に対して (ni taishite) directly compares two contrasting entities, subjects, or attitudes."
  },
  {
    "id": "item_n3_g1_2",
    "lessonId": "les_n3_gram_1",
    "itemType": "multiple_choice",
    "prompt": "Choose the most appropriate grammar pattern to express two contrasting sides of the SAME object:\n\n「このマンションは駅から近くて便利な（　）、家賃が非常に高い。」\n(\"While this apartment is convenient and close to the station, on the other hand, the rent is extremely high.\")",
    "options": [
      "反面",
      "に対して",
      "によって",
      "を通じて"
    ],
    "correctAnswer": "反面",
    "explanation": "〜反面 (hanmen - on the other hand) expresses two contradictory aspects of the same single topic (this apartment)."
  },
  {
    "id": "item_n3_r1_1",
    "lessonId": "les_n3_read_1",
    "itemType": "multiple_choice",
    "passageText": "フレックスタイム制の光と影 (The Dual Sides of Flextime Systems)\n\n近年、多くの企業で労働者が始業・終業時刻を自主的に決定できる「フレックスタイム制」の導入が進んでいる。通勤ラッシュを回避でき、育児や介護と仕事の両立が容易になるなど、生活の質の向上に対する効果は疑いようがない。\nしかし一方で、自己管理能力が不十分な社員の場合、業務の進捗が遅延したり、コアタイム外の連絡が滞ることでチーム全体の生産性が低下する懸念も指摘されている。制度が形骸化しないためには、個人の裁量を尊重しつつも、客観的な成果指標に基づく評価体系の整備が不可欠である。",
    "prompt": "What condition does the author state is indispensable for the flextime system to succeed?",
    "options": [
      "Establishing an evaluation system based on objective performance metrics (客観的な成果指標に基づく評価体系の整備)",
      "Abolishing core hours and allowing 100% remote work (コアタイムの完全廃止)",
      "Forcing all employees to arrive before peak commuting rush (全員に時差通勤を義務付けること)",
      "Restricting flextime only to employees with child or elder care needs (育児・介護従事者のみに限定すること)"
    ],
    "correctAnswer": "Establishing an evaluation system based on objective performance metrics (客観的な成果指標に基づく評価体系の整備)",
    "explanation": "The conclusion explicitly states: 「個人の裁量を尊重しつつも、客観的な成果指標に基づく評価体系の整備が不可欠である」."
  },
  {
    "id": "item_n3_star_1",
    "lessonId": "les_n3_exam_star",
    "itemType": "star_drill",
    "prompt": "Rearrange the numbered words to form a correct sentence, then choose the word that goes into the ★ position:\n\n健康のために　＿＿　＿＿　★　＿＿　ようにしている。\n(For my health, I try to walk instead of taking the bus whenever possible.)",
    "options": [
      "1: バスに",
      "2: 歩く",
      "3: 乗らずに",
      "4: できるだけ"
    ],
    "correctAnswer": "2: 歩く",
    "explanation": "The natural grammatical word order is: 「健康のために できるだけ(4) バスに(1) 乗らずに(3) 歩く(2)★ ようにしている。」 Therefore, option 2 (歩く) is in the ★ position."
  },
  {
    "id": "item_n2_g1_1",
    "lessonId": "les_n2_gram_1",
    "itemType": "multiple_choice",
    "prompt": "Choose the most appropriate expression to fill in the blank:\n\n「彼が今回の難関プロジェクトを成功に導くことができたのは、長年の地道な努力の賜物に（　）。」\n(\"That he was able to lead this challenging project to success is nothing other than the fruit of years of steady effort.\")",
    "options": [
      "ほかならない",
      "限らない",
      "相違ない",
      "すぎない"
    ],
    "correctAnswer": "ほかならない",
    "explanation": "〜にほかならない (ni hoka naranai) means \"is nothing other than / is precisely because of\", indicating an emphatic, definitive reason."
  },
  {
    "id": "item_n2_g1_2",
    "lessonId": "les_n2_gram_1",
    "itemType": "multiple_choice",
    "prompt": "Choose the most appropriate expression to complete the sentence:\n\n「台風による記録的な大雨のため、主催者は野外フェスティバルの中止を（　）。」\n(\"Due to the record heavy rain from the typhoon, the organizers were forced to cancel the outdoor festival.\")",
    "options": [
      "余儀なくされた",
      "余儀なくさせた",
      "免れなかった",
      "やむを得なかった"
    ],
    "correctAnswer": "余儀なくされた",
    "explanation": "〜を余儀なくされる (o yoginaku sareru) means being compelled or forced against one's will to do an undesirable action due to external circumstances."
  },
  {
    "id": "item_n2_r1_1",
    "lessonId": "les_n2_read_1",
    "itemType": "multiple_choice",
    "passageText": "リモートワーク環境における「暗黙知」の継承課題\n\nマイケル・ポランニーが提唱した「暗黙知（tacit knowledge）」—すなわち言語や数値として明文化できない職人技や直感的な判断基準は、従来の対面型オフィス環境において、同僚同士の偶発的な雑談や先輩の身振りの観察を通じて自然と継承されてきた。\nしかし、完全リモートワークへの移行に伴い、業務コミュニケーションはアジェンダに基づいた定例オンライン会議に限定されがちである。言語化された「形式知（explicit knowledge）」の共有はデジタルツールで効率化されたものの、文脈依存的なニュアンスや不確実な局面における勘どころの伝達は著しく阻害されている。組織がイノベーション創出力を維持するためには、偶発的なインフォーマル・コミュニケーションを意図的に誘発する仕組みの再設計が急務である。",
    "prompt": "According to the passage, what specific aspect of organizational knowledge is impeded by complete telework?",
    "options": [
      "The transmission of non-verbal, intuitive tacit knowledge dependent on casual observation (偶発的観察に依存する直感的な暗黙知の伝達)",
      "The storage and indexing of explicit digital procedural documentation (明文化された形式知のデジタル保管)",
      "The punctual attendance of scheduled online agenda conferences (定例オンライン会議への出席率)",
      "The calculation of annual employee payroll and leave records (年次有給休暇や給与計算の正確性)"
    ],
    "correctAnswer": "The transmission of non-verbal, intuitive tacit knowledge dependent on casual observation (偶発的観察に依存する直感的な暗黙知の伝達)",
    "explanation": "The text explains that while explicit knowledge sharing became efficient, \"言語や数値として明文化できない...文脈依存的なニュアンスや不確実な局面における勘どころの伝達は著しく阻害されている\"."
  },
  {
    "id": "item_n2_star_1",
    "lessonId": "les_n2_exam_star",
    "itemType": "star_drill",
    "prompt": "Rearrange the numbered words to form a correct sentence, then choose the word that goes into the ★ position:\n\n市民の安全を　＿＿　＿＿　★　＿＿　方針を打ち出した。\n(The municipal government unveiled a policy of conducting thorough inspections prioritizing citizen safety above all else.)",
    "options": [
      "1: 最優先に",
      "2: 考えた",
      "3: 徹底的な点検を行う",
      "4: 上で"
    ],
    "correctAnswer": "4: 上で",
    "explanation": "The natural grammatical word order is: 「市民の安全を 最優先に(1) 考えた(2) 上で(4)★ 徹底的な点検を行う(3) 方針を打ち出した。」 Therefore, option 4 (上で) is in the ★ position."
  },
  {
    "id": "item_n1_g1_1",
    "lessonId": "les_n1_gram_1",
    "itemType": "multiple_choice",
    "prompt": "Choose the most appropriate expression to fill in the blank:\n\n「公的な立場にある者がこのような不正行為に関与するとは、言語道断であり、遺憾（　）。」\n(\"For a person in a public position to be involved in such misconduct is outrageous and regrettable to the utmost extreme.\")",
    "options": [
      "極まりない",
      "極まり",
      "を禁じ得ない",
      "まみれである"
    ],
    "correctAnswer": "極まりない",
    "explanation": "〜極まりない (kiwamarinai) attaches directly to na-adjectives or nouns (遺憾極まりない, 失礼極まりない) to express an insurmountable, ultimate extreme without any limitation."
  },
  {
    "id": "item_n1_g1_2",
    "lessonId": "les_n1_gram_1",
    "itemType": "multiple_choice",
    "prompt": "Choose the most appropriate expression to complete the sentence:\n\n「世界的なピアニストの来日公演は、東京サントリーホールでの演奏を（　）、全国主要5都市で順次開催された。」\n(\"The world-renowned pianist's Japan tour, starting with the performance at Tokyo Suntory Hall, was held sequentially across five major cities.\")",
    "options": [
      "皮切りに",
      "限りに",
      "よそに",
      "先立って"
    ],
    "correctAnswer": "皮切りに",
    "explanation": "〜を皮切りに(して) (o kawakiri ni) expresses that one dynamic event serves as the prominent kickoff leading sequentially to a cascade of subsequent similar actions."
  },
  {
    "id": "item_n1_r1_1",
    "lessonId": "les_n1_read_1",
    "itemType": "multiple_choice",
    "passageText": "言語決定論の再考とソシュール的記号論の現代的射程\n\nソシュールが喝破した言語記号の恣意性（arbitrariness）は、外界の事物が先在し、それに後天的にラベルが付与されるという素朴実在論的言語観を根底から覆した。我々は言語という分節体系（articulation）を通じて初めて、連続的な混沌たる世界を有意味な分節化された現実として知覚する。サピア＝ウォーフの仮説が極端な言語決定論として一時期批判を浴びたものの、近年の認知言語学的実証研究は、文法範疇が空間認識や事象生起の因果帰属に及ぼす微細な無意識的バイアスを再評価しつつある。我々の認識論的主体性は、言語という媒介項から完全に純化された客観的視座を獲得し得るのか。この問いは、単なる形而上学的好奇心にとどまらず、多文化共生社会における相互主観的合意の限界線を規定する極めて実践的なアポリアである。",
    "prompt": "According to the author, how does Saussure's concept of arbitrariness overturn the naive realist view of language?",
    "options": [
      "By demonstrating that language is an articulation system through which perceived reality is meaningfully structured, rather than labels affixed to pre-existing objects (外界の事物が先在するのではなく言語の分節体系を通じて初めて現実が知覚されることを示した点)",
      "By proving that grammatical categories completely imprison the human mind into irreversible solipsism (文法範疇が人間を不可逆的な独我論に幽閉することを証明した点)",
      "By rejecting any practical necessity for intersubjective consensus in multicultural democracies (多文化共生社会における合意形成の必要性を完全に否定した点)",
      "By demonstrating that continuous physical chaos can be measured without cognitive bias (物理的混沌が認知バイアスなしに測定可能であることを示した点)"
    ],
    "correctAnswer": "By demonstrating that language is an articulation system through which perceived reality is meaningfully structured, rather than labels affixed to pre-existing objects (外界の事物が先在するのではなく言語の分節体系を通じて初めて現実が知覚されることを示した点)",
    "explanation": "The passage explicitly clarifies: 「外界の事物が先在し、それに後天的にラベルが付与されるという素朴実在論的言語観を根底から覆した。我々は言語という分節体系（articulation）を通じて初めて、連続的な混沌たる世界を有意味な分節化された現実として知覚する」。"
  },
  {
    "id": "item_n1_star_1",
    "lessonId": "les_n1_exam_star",
    "itemType": "star_drill",
    "prompt": "Rearrange the numbered words to form a correct sentence, then choose the word that goes into the ★ position:\n\nいかなる　＿＿　＿＿　★　＿＿　許されるものではない。\n(Whatever the justification may be, violent acts suppressing human rights cannot be condoned under any circumstances.)",
    "options": [
      "1: 名目の下で",
      "2: 人権を",
      "3: 侵害する行為は",
      "4: あれ"
    ],
    "correctAnswer": "3: 侵害する行為は",
    "explanation": "The natural grammatical word order is: 「いかなる 名目の下で(1) あれ(4) 人権を(2) 侵害する行為は(3)★ 許されるものではない。」 (Pattern: いかなる〜であれ = no matter what... it may be). Therefore, option 3 (侵害する行為は) is in the ★ position."
  }
];
