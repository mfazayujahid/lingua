// Authentic 5-Tier JLPT Official Mock Exam Bank & Scoring Utilities (N5 to N1)
// Conforms to docs/SPEC.md §1-6 and docs/USER_FLOWS.md Scenarios 69-75

export type JLPTLevelTier = 'n5' | 'n4' | 'n3' | 'n2' | 'n1';

export interface JLPTSessionSpec {
  sessionNumber: number;
  titleJp: string;
  titleEn: string;
  titleId: string;
  durationMinutes: number;
  categories: ('language_knowledge' | 'reading' | 'listening')[];
}

export interface JLPTLevelMetadata {
  tier: JLPTLevelTier;
  levelCode: `jlpt_${JLPTLevelTier}`;
  label: string;
  subtitleId: string;
  subtitleEn: string;
  passThreshold: number;
  totalScale: number;
  sectionalCutoff: number;
  combinedLangReadCutoff?: number; // 38/120 for N4 & N5
  totalDurationMinutes: number;
  furiganaRuleId: string;
  furiganaRuleEn: string;
  furiganaPolicy: 'full' | 'partial' | 'none';
  sessions: JLPTSessionSpec[];
  colorAccent: string;
}

export interface JLPTPassageItem {
  id: string;
  partNumber: number;
  passageType: 'short' | 'medium' | 'long' | 'comparative' | 'information_retrieval';
  titleJp: string;
  titleEn: string;
  titleId: string;
  textJp: string;
  textB?: string; // For comparative dual-text in N2/N1
}

export interface JLPTQuestionItem {
  id: string;
  questionNumber: number;
  sessionNumber: number;
  mondaiNumber: number;
  mondaiTitleJp: string;
  mondaiTitleId: string;
  mondaiTitleEn: string;
  sectionCategory: 'language_knowledge' | 'reading' | 'listening';
  itemType: 'mcq' | 'star_sentence' | 'cloze' | 'chokai_audio';
  prompt: string;
  stimulusText?: string;
  passageId?: string;
  audioScriptJp?: string;
  audioSpeakers?: string;
  audioDurationSec?: number;
  scrambledChunks?: [string, string, string, string];
  starPosition?: 1 | 2 | 3 | 4;
  options: string[];
  correctAnswer: string;
  explanation: string;
  explanationId: string;
  trapType?: string;
  trapNoteId?: string;
  trapNoteEn?: string;
}

export interface JLPTFullExamPackage {
  id: string;
  levelCode: `jlpt_${JLPTLevelTier}`;
  tier: JLPTLevelTier;
  packNumber: number;
  titleEn: string;
  titleId: string;
  titleJp: string;
  thematicFocusEn: string;
  thematicFocusId: string;
  totalDurationMinutes: number;
  passThresholdScore: number;
  furiganaPolicy: 'full' | 'partial' | 'none';
  sessions: JLPTSessionSpec[];
  passages: JLPTPassageItem[];
  questions: JLPTQuestionItem[];
}

export interface JLPTDetailedScoreResult {
  attemptId: string;
  packageId: string;
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  packNumber: number;
  rawScore: number;
  totalQuestions: number;
  accuracyPct: number;
  scaledScore: number;
  passThreshold: number;
  overallPassed: boolean;
  sectionalCutoffFailed: boolean;
  verdictJp: '合格' | '不合格';
  verdictId: 'LULUS' | 'TIDAK LULUS';
  verdictEn: 'PASSED' | 'FAILED';
  cutoffAlertId?: string;
  cutoffAlertEn?: string;
  isLowerTier: boolean;
  sectionalScores: {
    languageKnowledge: { raw: number; total: number; scaled: number; maxScaled: number; cutoff: number; cutoffPassed: boolean };
    reading: { raw: number; total: number; scaled: number; maxScaled: number; cutoff: number; cutoffPassed: boolean };
    listening: { raw: number; total: number; scaled: number; maxScaled: number; cutoff: number; cutoffPassed: boolean };
    combinedLangRead?: { raw: number; total: number; scaled: number; maxScaled: number; cutoff: number; cutoffPassed: boolean };
  };
  radarCriteria: {
    kanjiVocabPct: number;
    grammarPct: number;
    readingPct: number;
    listeningPct: number;
  };
  questionEvaluations: {
    questionNumber: number;
    sessionNumber: number;
    sectionCategory: 'language_knowledge' | 'reading' | 'listening';
    itemType: string;
    prompt: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    explanation: string;
    explanationId: string;
    trapNoteId?: string;
    trapNoteEn?: string;
    scrambledChunks?: [string, string, string, string];
    starPosition?: 1 | 2 | 3 | 4;
  }[];
  timeSpentSeconds: number;
  completedAt: string;
}

export const JLPT_LEVEL_SPECS: Record<JLPTLevelTier, JLPTLevelMetadata> = {
  n5: {
    tier: 'n5',
    levelCode: 'jlpt_n5',
    label: 'JLPT N5',
    subtitleId: 'Tingkat Dasar Fondasional (Pemula)',
    subtitleEn: 'Foundational Beginner Level',
    passThreshold: 80,
    totalScale: 180,
    sectionalCutoff: 19,
    combinedLangReadCutoff: 38,
    totalDurationMinutes: 90,
    furiganaRuleId: '100% Penuh (Seluruh Kanji dilengkapi Furigana)',
    furiganaRuleEn: '100% Full Furigana on all Kanji',
    furiganaPolicy: 'full',
    colorAccent: 'emerald',
    sessions: [
      { sessionNumber: 1, titleJp: '言語知識（文字・語彙）', titleEn: 'Language Knowledge (Kanji/Vocab)', titleId: 'Sesi 1: Huruf & Kosakata', durationMinutes: 20, categories: ['language_knowledge'] },
      { sessionNumber: 2, titleJp: '言語知識（文法）・読解', titleEn: 'Grammar & Reading (Dokkai)', titleId: 'Sesi 2: Tata Bahasa & Membaca', durationMinutes: 40, categories: ['language_knowledge', 'reading'] },
      { sessionNumber: 3, titleJp: '聴解（ちょうかい）', titleEn: 'Listening Comprehension (Chokai)', titleId: 'Sesi 3: Menyimak (Chokai)', durationMinutes: 30, categories: ['listening'] }
    ]
  },
  n4: {
    tier: 'n4',
    levelCode: 'jlpt_n4',
    label: 'JLPT N4',
    subtitleId: 'Komunikasi Sehari-hari Dasar',
    subtitleEn: 'Basic Everyday Communication',
    passThreshold: 90,
    totalScale: 180,
    sectionalCutoff: 19,
    combinedLangReadCutoff: 38,
    totalDurationMinutes: 115,
    furiganaRuleId: '100% Penuh (Seluruh Kanji dilengkapi Furigana)',
    furiganaRuleEn: '100% Full Furigana on all Kanji',
    furiganaPolicy: 'full',
    colorAccent: 'teal',
    sessions: [
      { sessionNumber: 1, titleJp: '言語知識（文字・語彙）', titleEn: 'Language Knowledge (Kanji/Vocab)', titleId: 'Sesi 1: Huruf & Kosakata', durationMinutes: 25, categories: ['language_knowledge'] },
      { sessionNumber: 2, titleJp: '言語知識（文法）・読解', titleEn: 'Grammar & Reading (Dokkai)', titleId: 'Sesi 2: Tata Bahasa & Membaca', durationMinutes: 55, categories: ['language_knowledge', 'reading'] },
      { sessionNumber: 3, titleJp: '聴解（ちょうかい）', titleEn: 'Listening Comprehension (Chokai)', titleId: 'Sesi 3: Menyimak (Chokai)', durationMinutes: 35, categories: ['listening'] }
    ]
  },
  n3: {
    tier: 'n3',
    levelCode: 'jlpt_n3',
    label: 'JLPT N3',
    subtitleId: 'Jembatan Menuju Tingkat Menengah',
    subtitleEn: 'Bridge to Intermediate Fluency',
    passThreshold: 95,
    totalScale: 180,
    sectionalCutoff: 19,
    totalDurationMinutes: 140,
    furiganaRuleId: 'Parsial (Kanji N5/N4 polos, Kanji N3+ ber-Furigana)',
    furiganaRuleEn: 'Partial (No Furigana on N5/N4, kept on N3+)',
    furiganaPolicy: 'partial',
    colorAccent: 'amber',
    sessions: [
      { sessionNumber: 1, titleJp: '言語知識（文字・語彙）', titleEn: 'Language Knowledge (Kanji/Vocab)', titleId: 'Sesi 1: Huruf & Kosakata', durationMinutes: 30, categories: ['language_knowledge'] },
      { sessionNumber: 2, titleJp: '言語知識（文法）・読解', titleEn: 'Grammar & Reading (Dokkai)', titleId: 'Sesi 2: Tata Bahasa & Membaca', durationMinutes: 70, categories: ['language_knowledge', 'reading'] },
      { sessionNumber: 3, titleJp: '聴解（ちょうかい）', titleEn: 'Listening Comprehension (Chokai)', titleId: 'Sesi 3: Menyimak (Chokai)', durationMinutes: 40, categories: ['listening'] }
    ]
  },
  n2: {
    tier: 'n2',
    levelCode: 'jlpt_n2',
    label: 'JLPT N2',
    subtitleId: 'Kefasihan Bisnis & Akademik',
    subtitleEn: 'Business & Academic Proficiency',
    passThreshold: 90,
    totalScale: 180,
    sectionalCutoff: 19,
    totalDurationMinutes: 155,
    furiganaRuleId: 'Nol pada 2.136 Kanji Jōyō Standar',
    furiganaRuleEn: 'Zero Furigana on Jōyō Kanji',
    furiganaPolicy: 'none',
    colorAccent: 'indigo',
    sessions: [
      { sessionNumber: 1, titleJp: '言語知識（文字・語彙・文法）・読解', titleEn: 'Integrated Language Knowledge & Reading', titleId: 'Sesi 1: Pengetahuan Bahasa & Membaca', durationMinutes: 105, categories: ['language_knowledge', 'reading'] },
      { sessionNumber: 2, titleJp: '聴解（ちょうかい）', titleEn: 'Listening Comprehension (Chokai)', titleId: 'Sesi 2: Menyimak (Chokai)', durationMinutes: 50, categories: ['listening'] }
    ]
  },
  n1: {
    tier: 'n1',
    levelCode: 'jlpt_n1',
    label: 'JLPT N1',
    subtitleId: 'Kemahiran Tertinggi & Nuansa Kompleks',
    subtitleEn: 'Mastery & High Literary Nuance',
    passThreshold: 100,
    totalScale: 180,
    sectionalCutoff: 19,
    totalDurationMinutes: 170,
    furiganaRuleId: 'Nol (Hanya Kanji Non-Jōyō langka)',
    furiganaRuleEn: 'None (Only rare Non-Jōyō Kanji)',
    furiganaPolicy: 'none',
    colorAccent: 'vermilion',
    sessions: [
      { sessionNumber: 1, titleJp: '言語知識（文字・語彙・文法）・読解', titleEn: 'Integrated Language Knowledge & Reading', titleId: 'Sesi 1: Pengetahuan Bahasa & Membaca', durationMinutes: 110, categories: ['language_knowledge', 'reading'] },
      { sessionNumber: 2, titleJp: '聴解（ちょうかい）', titleEn: 'Listening Comprehension (Chokai)', titleId: 'Sesi 2: Menyimak (Chokai)', durationMinutes: 60, categories: ['listening'] }
    ]
  }
};

// Authentic level-calibrated question banks covering all canonical Mondai types
const N5_PASSAGES: JLPTPassageItem[] = [
  {
    id: 'n5_pas_1',
    partNumber: 1,
    passageType: 'short',
    titleJp: '大学の図書館のお知らせ',
    titleEn: 'University Library Notice',
    titleId: 'Pengumuman Perpustakaan Universitas',
    textJp: `[1] さくら大学の図書館は、月曜日から金曜日まで午前九時から午後八時まであいています。土曜日と日曜日は午前十時から午後五時までです。\n\n[2] 毎月第一水曜日は休みです。本は一人五さつまで、二週間かりることができます。テストの前の週はとてもこみますから、早めにかりてください。`
  },
  {
    id: 'n5_pas_2',
    partNumber: 2,
    passageType: 'information_retrieval',
    titleJp: '日本語スピーチ大会の案内',
    titleEn: 'Japanese Speech Contest Flyer',
    titleId: 'Selebaran Lomba Pidato Bahasa Jepang',
    textJp: `【日本語スピーチ大会】\n日　時：11月15日（土）13:00〜16:00\n場　所：市民センター 3階 ホール\n参加費：無料（飲み物は各自でお持ちください）\n※ 発表したい人は、10月31日までに受付で申し込んでください。`
  }
];

const N4_PASSAGES: JLPTPassageItem[] = [
  {
    id: 'n4_pas_1',
    partNumber: 1,
    passageType: 'medium',
    titleJp: 'ゴミの出し方についてのお願い',
    titleEn: 'Apartment Waste Disposal Guidelines',
    titleId: 'Panduan Pemilahan Sampah Apartemen',
    textJp: `[1] 住民のみなさまへ\n最近、ゴミ出しのルールを守らない人が増えています。もえるゴミは火曜日と金曜日の朝八時までに出してください。夜のうちに出すと、カラスがゴミを散らかしてしまいます。\n\n[2] ペットボトルはキャップとラベルをとって、中を水で洗ってから水曜日に出してください。みなさんのご協力をお願いいたします。`
  }
];

const N3_PASSAGES: JLPTPassageItem[] = [
  {
    id: 'n3_pas_1',
    partNumber: 1,
    passageType: 'medium',
    titleJp: '職場におけるデジタル・デトックスの試み',
    titleEn: 'Digital Detox Initiatives in the Workplace',
    titleId: 'Inisiatif Detoks Digital di Tempat Kerja',
    textJp: `[1] スマートフォンの普及により、勤務時間外でも仕事のメールや連絡を確認できる環境が整った。一見すると便利に思えるが、常に仕事から離れられない状態が続くことで、社員の精神的な疲労が蓄積するという問題が指摘されている。\n\n[2] これに対して、午後八時以降の業務連絡を原則として禁止する企業が増えつつある。最初は「急ぎの案件に対応できないのではないか」という懸念の声もあったが、実際には勤務時間内の集中力が高まり、業務効率が向上したという報告が多い。`
  }
];

const N2_PASSAGES: JLPTPassageItem[] = [
  {
    id: 'n2_pas_1',
    partNumber: 1,
    passageType: 'long',
    titleJp: '遠隔勤務における生産性評価と自律的組織運営',
    titleEn: 'Productivity Evaluation & Autonomy in Remote Work',
    titleId: 'Evaluasi Produktivitas Kerja Jarak Jauh & Manajemen Mandiri',
    textJp: `[1] リモートワークの普及に伴い、多くの企業で労働生産性に関する再評価が進められている。従来の対面型勤務では、オフィスに滞在する時間の長さが暗黙のうちに勤務態度の評価基準とされがちであったが、遠隔勤務環境においては、明確な成果物やタスクの達成度に基づく客観的指標の導入が不可欠となった。\n\n[2] しかしながら、業務効率が向上したと感じる社員がいる一方で、非言語的コミュニケーションの減少により、同僚との協調や偶発的なアイデアの創出が妨げられているとの指摘も根強い。企業が真の生産性向上を果たすためには、単に業務ツールをデジタル化するにとどまらず、組織内の信頼関係と自律的な業務遂行を両立させる新たな評価制度の構築が求められているのである。`
  },
  {
    id: 'n2_pas_2',
    partNumber: 2,
    passageType: 'comparative',
    titleJp: '伝統工芸の継承に関する二つの視点（A・B）',
    titleEn: 'Two Perspectives on Preserving Traditional Crafts (Text A & B)',
    titleId: 'Dua Perspektif Pelestarian Kriya Tradisional (Teks A & B)',
    textJp: `【文章A】かつて徒弟制度によって守られてきた高度な職人技は、後継者不足により危機に瀕している。都市部の若者が持つ現代的デザイン感覚を取り入れ、海外市場の開拓や異業種とのコラボレーションを推進することこそが、工芸を生き残らせる唯一の道である。`,
    textB: `【文章B】時代の要請に応じた柔軟な変化は重要だが、単に伝統の形態を現代風・商業的に改変するだけでは、長い歴史の中で培われた技術の本質や精神性が損なわれかねない。素材への敬意と基礎技術の厳格な伝承なくして、真の革新はあり得ないのである。`
  }
];

const N1_PASSAGES: JLPTPassageItem[] = [
  {
    id: 'n1_pas_1',
    partNumber: 1,
    passageType: 'long',
    titleJp: 'アルゴリズム的最適化と人間の認識論的自律性',
    titleEn: 'Algorithmic Optimization and Human Epistemic Autonomy',
    titleId: 'Optimalisasi Algoritmik dan Otonomi Epistemik Manusia',
    textJp: `[1] 人工知能による推薦システムが日常のあらゆる選択を先取りする現代において、我々が「自らの意志で選んだ」と確信している嗜好や判断は、往々にして過去の行動履歴を統計的に再構成した鏡像に過ぎない。快適さと効率性を極限まで追求する最適化の論理は、偶然の出会いや認知的摩擦を排除することで、思考の均質化を静かに進行させる。\n\n[2] 真の知的主体性を回復するためには、アルゴリズムが提示する最適解を無批判に受容するのではなく、あえて非効率な試行錯誤や異質な他者との対話に身を晒し、自らの判断基準そのものを絶えず相対化する批判的省察が不可欠となるのである。`
  },
  {
    id: 'n1_pas_2',
    partNumber: 2,
    passageType: 'comparative',
    titleJp: '言語と思考の相関をめぐる比較読解（文章A・文章B）',
    titleEn: 'Comparative Reading: Language and Cognition (A & B)',
    titleId: 'Membaca Komparatif: Bahasa dan Kognisi (Teks A & B)',
    textJp: `【文章A】言語は単なる情報伝達の道具ではなく、人間の世界認識の枠組みそのものを規定する「思考の鋳型」である。語彙体系や文法構造の違いは、話者が事象のどの側面に注意を向けるかを無意識のうちに方向づけており、異言語の習得は世界観の再構築にほかならない。`,
    textB: `【文章B】言語構造が認知的傾向に影響を及ぼす側面は否定できないものの、言語的決定論は人間の普遍的な概念形成能力を過小評価している。たとえ特定の語彙を欠く言語であっても、話者は文脈や比喩を駆使して同じ論理的・抽象的概念を自在に構築し得るのである。`
  }
];

function buildTierQuestions(tier: JLPTLevelTier, packNumber: number): JLPTQuestionItem[] {
  const isTwoSession = tier === 'n1' || tier === 'n2';
  const sessRead = isTwoSession ? 1 : 2;
  const sessListen = isTwoSession ? 2 : 3;

  if (tier === 'n5') {
    return [
      {
        id: `jlpt_n5_p${packNumber}_q1`, questionNumber: 1, sessionNumber: 1, mondaiNumber: 1,
        mondaiTitleJp: '問題1：漢字読み', mondaiTitleId: 'Mondai 1: Cara Baca Kanji', mondaiTitleEn: 'Mondai 1: Kanji Reading',
        sectionCategory: 'language_knowledge', itemType: 'mcq',
        prompt: 'あしたは 【学校】 へ いきますか。',
        stimulusText: '学校',
        options: ['1: がっこう', '2: がくこう', '3: かっこう', '4: がっこ'],
        correctAnswer: '1: がっこう',
        explanation: '「学校」は「がっこう（gakkou）」と読みます。',
        explanationId: 'Kanji 【学校】 dibaca "gakkou" (sekolah).',
        trapNoteId: 'Hati-hati pada pelafalan geminasi (っ) dan vokal panjang (う).', trapNoteEn: 'Watch out for small tsu and long vowel.'
      },
      {
        id: `jlpt_n5_p${packNumber}_q2`, questionNumber: 2, sessionNumber: 1, mondaiNumber: 1,
        mondaiTitleJp: '問題1：漢字読み', mondaiTitleId: 'Mondai 1: Cara Baca Kanji', mondaiTitleEn: 'Mondai 1: Kanji Reading',
        sectionCategory: 'language_knowledge', itemType: 'mcq',
        prompt: 'まいにち 【時間】 が ありません。',
        stimulusText: '時間',
        options: ['1: じかん', '2: しがん', '3: しかん', '4: じがん'],
        correctAnswer: '1: じかん',
        explanation: '「時間」の正しい読み方は「じかん」です。',
        explanationId: 'Kanji 【時間】 dibaca "jikan" (waktu).'
      },
      {
        id: `jlpt_n5_p${packNumber}_q3`, questionNumber: 3, sessionNumber: 1, mondaiNumber: 2,
        mondaiTitleJp: '問題2：表記（ひらがな→漢字）', mondaiTitleId: 'Mondai 2: Penulisan Kanji', mondaiTitleEn: 'Mondai 2: Orthography',
        sectionCategory: 'language_knowledge', itemType: 'mcq',
        prompt: 'きのうは あめが ふって 【さむかった】 です。',
        stimulusText: 'さむかった',
        options: ['1: 寒かった', '2: 安かった', '3: 高かった', '4: 暑かった'],
        correctAnswer: '1: 寒かった',
        explanation: '「さむい」の漢字は「寒い」です。',
        explanationId: 'Kata sifat "samui" (dingin) ditulis dengan kanji 【寒い】 -> 寒かった.'
      },
      {
        id: `jlpt_n5_p${packNumber}_q4`, questionNumber: 4, sessionNumber: 1, mondaiNumber: 3,
        mondaiTitleJp: '問題3：文脈規定', mondaiTitleId: 'Mondai 3: Kosakata Kontekstual', mondaiTitleEn: 'Mondai 3: Context Vocabulary',
        sectionCategory: 'language_knowledge', itemType: 'mcq',
        prompt: 'へやが くらいですから、でんきを （　　） ください。',
        options: ['1: つけて', '2: けして', '3: あけて', '4: しめて'],
        correctAnswer: '1: つけて',
        explanation: '暗いので「電気をつける（menyalakan lampu）」が自然です。',
        explanationId: 'Karena ruangan gelap (kurai), tindakan yang tepat adalah menyalakan lampu: 【つけて】 (tsukete).'
      },
      {
        id: `jlpt_n5_p${packNumber}_q5`, questionNumber: 5, sessionNumber: 2, mondaiNumber: 1,
        mondaiTitleJp: '問題1：文法形式の判断', mondaiTitleId: 'Mondai 1: Tata Bahasa & Partikel', mondaiTitleEn: 'Mondai 1: Grammar Form',
        sectionCategory: 'language_knowledge', itemType: 'mcq',
        prompt: 'わたしは まいあさ バス（　　） 大学へ いきます。',
        options: ['1: で', '2: を', '3: に', '4: へ'],
        correctAnswer: '1: で',
        explanation: '交通手段を表すときは助詞「で」を使います。',
        explanationId: 'Partikel 【で】 (de) digunakan untuk menunjukkan sarana transportasi.'
      },
      {
        id: `jlpt_n5_p${packNumber}_q6`, questionNumber: 6, sessionNumber: 2, mondaiNumber: 2,
        mondaiTitleJp: '問題2：文の組み立て（★並べ替え）', mondaiTitleId: 'Mondai 2: Susunan Kalimat (★)', mondaiTitleEn: 'Mondai 2: Star Reordering (★)',
        sectionCategory: 'language_knowledge', itemType: 'star_sentence',
        prompt: 'あした _____ _____ _★_ _____ に いきます。',
        scrambledChunks: ['1: としょかんへ', '2: ともだちと', '3: べんきょう', '4: し'],
        starPosition: 3,
        options: ['1: としょかんへ', '2: ともだちと', '3: べんきょう', '4: し'],
        correctAnswer: '3: べんきょう',
        explanation: '正しい語順：ともだちと(2) としょかんへ(1) べんきょう(3★) し(4) に いきます。',
        explanationId: 'Urutan benar: ともだちと (bersama teman) → としょかんへ (ke perpustakaan) → べんきょう (★) → し に いきます (pergi untuk belajar).'
      },
      {
        id: `jlpt_n5_p${packNumber}_q7`, questionNumber: 7, sessionNumber: 2, mondaiNumber: 2,
        mondaiTitleJp: '問題2：文の組み立て（★並べ替え）', mondaiTitleId: 'Mondai 2: Susunan Kalimat (★)', mondaiTitleEn: 'Mondai 2: Star Reordering (★)',
        sectionCategory: 'language_knowledge', itemType: 'star_sentence',
        prompt: 'この みせの _____ _____ _★_ _____ やすいです。',
        scrambledChunks: ['1: とても', '2: ケーキは', '3: おいしくて', '4: しかも'],
        starPosition: 3,
        options: ['1: とても', '2: ケーキは', '3: おいしくて', '4: しかも'],
        correctAnswer: '3: おいしくて',
        explanation: '正しい語順：ケーキは(2) とても(1) おいしくて(3★) しかも(4) やすいです。',
        explanationId: 'Urutan sintaksis: この みせの ケーキは(2) → とても(1) → おいしくて(3★) → しかも(4) → やすいです (Kue toko ini sangat enak dan juga murah).'
      },
      {
        id: `jlpt_n5_p${packNumber}_q8`, questionNumber: 8, sessionNumber: 2, mondaiNumber: 3,
        mondaiTitleJp: '問題3：読解（内容理解）', mondaiTitleId: 'Mondai 3: Pemahaman Bacaan (Dokkai)', mondaiTitleEn: 'Mondai 3: Reading Comprehension',
        sectionCategory: 'reading', itemType: 'mcq', passageId: 'n5_pas_1',
        prompt: '土曜日に図書館は何時から何時まであいていますか。',
        options: ['1: 午前十時から午後五時まで', '2: 午前九時から午後八時まで', '3: 午前十時から午後八時まで', '4: 毎月第一水曜日だけ'],
        correctAnswer: '1: 午前十時から午後五時まで',
        explanation: '本文に「土曜日と日曜日は午前十時から午後五時までです」とあります。',
        explanationId: 'Dalam pengumuman paragraf [1], pada hari Sabtu dan Minggu perpustakaan buka pukul 10:00 pagi hingga 17:00 sore.'
      },
      {
        id: `jlpt_n5_p${packNumber}_q9`, questionNumber: 9, sessionNumber: 2, mondaiNumber: 3,
        mondaiTitleJp: '問題3：読解（内容理解）', mondaiTitleId: 'Mondai 3: Pemahaman Bacaan (Dokkai)', mondaiTitleEn: 'Mondai 3: Reading Comprehension',
        sectionCategory: 'reading', itemType: 'mcq', passageId: 'n5_pas_1',
        prompt: 'この図書館で一度に何さつまで本をかりられますか。また、どのくらいかりられますか。',
        options: ['1: 五さつまで、二週間', '2: 二さつまで、五週間', '3: 五さつまで、一週間', '4: 十さつまで、二週間'],
        correctAnswer: '1: 五さつまで、二週間',
        explanation: '「本は一人五さつまで、二週間かりることができます」と書かれています。',
        explanationId: 'Teks paragraf [2] menjelaskan batas peminjaman adalah maksimal 5 buku per orang selama 2 minggu.'
      },
      {
        id: `jlpt_n5_p${packNumber}_q10`, questionNumber: 10, sessionNumber: 2, mondaiNumber: 4,
        mondaiTitleJp: '問題4：情報検索', mondaiTitleId: 'Mondai 4: Pencarian Informasi (Selebaran)', mondaiTitleEn: 'Mondai 4: Information Retrieval',
        sectionCategory: 'reading', itemType: 'mcq', passageId: 'n5_pas_2',
        prompt: 'スピーチ大会で発表したい人は、いつまでに申し込みますか。',
        options: ['1: 10月31日まで', '2: 11月15日まで', '3: 13時まで', '4: 16時まで'],
        correctAnswer: '1: 10月31日まで',
        explanation: '案内文の※印に「10月31日までに受付で申し込んでください」と記載されています。',
        explanationId: 'Pada catatan selebaran tertulis pendaftaran peserta pidato paling lambat tanggal 31 Oktober.'
      },
      {
        id: `jlpt_n5_p${packNumber}_q11`, questionNumber: 11, sessionNumber: 3, mondaiNumber: 1,
        mondaiTitleJp: '問題1：課題理解（聴解）', mondaiTitleId: 'Mondai 1: Chokai Pemahaman Tugas', mondaiTitleEn: 'Mondai 1: Task-Based Listening',
        sectionCategory: 'listening', itemType: 'chokai_audio',
        audioSpeakers: '先生と留学生', audioDurationSec: 22,
        audioScriptJp: '先生：来週のテストに、えんぴつと消しゴムを持ってきてください。辞書は使ってはいけません。ノートもだめです。質問：学生はテストの時、何を持ってきますか。',
        prompt: '学生は来週のテストに何を持ってきますか。',
        options: ['1: えんぴつと 消しゴム', '2: えんぴつと 辞書', '3: 消しゴムと ノート', '4: 辞書と ノート'],
        correctAnswer: '1: えんぴつと 消しゴム',
        explanation: '先生は「辞書は使ってはいけません。ノートもだめです」と言い、鉛筆と消しゴムだけ持ってくるよう指示しました。',
        explanationId: 'Guru berpesan membawa pensil (enpitsu) dan penghapus (keshigomu). Kamus dan buku catatan dilarang keras.'
      },
      {
        id: `jlpt_n5_p${packNumber}_q12`, questionNumber: 12, sessionNumber: 3, mondaiNumber: 2,
        mondaiTitleJp: '問題2：即時応答（聴解）', mondaiTitleId: 'Mondai 2: Chokai Respon Cepat', mondaiTitleEn: 'Mondai 2: Quick Response',
        sectionCategory: 'listening', itemType: 'chokai_audio',
        audioSpeakers: '同僚の会話', audioDurationSec: 15,
        audioScriptJp: '女の人：あ、雨がふってきましたよ。傘を持っていますか。男の人：……。',
        prompt: '女の人の質問に対する最も適切な返事を選びなさい。',
        options: ['1: いいえ、持っていません。どうしましょう。', '2: はい、昨日は晴れでした。', '3: ええ、傘はあちらに買いました。', '4: いいえ、雨は好きじゃありません。'],
        correctAnswer: '1: いいえ、持っていません。どうしましょう。',
        explanation: '「傘を持っていますか」に対して「いいえ、持っていません」が最も自然な応答です。',
        explanationId: 'Pertanyaan "Apakah kamu membawa payung?" paling tepat dijawab "Tidak, saya tidak membawanya. Bagaimana ya."'
      }
    ];
  }

  if (tier === 'n4') {
    return [
      {
        id: `jlpt_n4_p${packNumber}_q1`, questionNumber: 1, sessionNumber: 1, mondaiNumber: 1,
        mondaiTitleJp: '問題1：漢字読み', mondaiTitleId: 'Mondai 1: Cara Baca Kanji', mondaiTitleEn: 'Mondai 1: Kanji Reading',
        sectionCategory: 'language_knowledge', itemType: 'mcq',
        prompt: 'このきかいは 【特別】 な 使い方をします。',
        options: ['1: とくべつ', '2: どくべつ', '3: とくぺつ', '4: とっべつ'],
        correctAnswer: '1: とくべつ',
        explanation: '「特別」は「とくべつ（khusus/spesial）」と読みます。',
        explanationId: 'Kanji 【特別】 dibaca "tokubetsu" (khusus / spesial).'
      },
      {
        id: `jlpt_n4_p${packNumber}_q2`, questionNumber: 2, sessionNumber: 1, mondaiNumber: 2,
        mondaiTitleJp: '問題2：文脈規定', mondaiTitleId: 'Mondai 2: Kosakata Kontekstual', mondaiTitleEn: 'Mondai 2: Contextual Vocab',
        sectionCategory: 'language_knowledge', itemType: 'mcq',
        prompt: 'えきの まえで 友だちに （　　） と、ちょうど でんしゃが 来ました。',
        options: ['1: 別れた', '2: 出かけた', '3: 始まった', '4: 間に合った'],
        correctAnswer: '1: 別れた',
        explanation: '「友だちに別れる（berpisah dengan teman）」が文脈に合います。',
        explanationId: 'Kata kerja yang tepat setelah partikel に adalah 【別れた】 (berpisah dengan teman tepat saat kereta tiba).'
      },
      {
        id: `jlpt_n4_p${packNumber}_q3`, questionNumber: 3, sessionNumber: 2, mondaiNumber: 1,
        mondaiTitleJp: '問題1：文法（授受表現・敬語）', mondaiTitleId: 'Mondai 1: Tata Bahasa N4', mondaiTitleEn: 'Mondai 1: N4 Grammar',
        sectionCategory: 'language_knowledge', itemType: 'mcq',
        prompt: '先生が わたしの さくぶんを なおして （　　）。',
        options: ['1: くださいました', '2: あげました', '3: いただきました', '4: 差し上げました'],
        correctAnswer: '1: くださいました',
        explanation: '先生が主語（〜が）なので、尊敬語の「くださる→くださいました」が正解です。',
        explanationId: 'Karena subjeknya adalah Sensei (guru yang lebih tinggi statusnya) melakukan aksi untuk pembelajar, wajib memakai 【くださいました】.'
      },
      {
        id: `jlpt_n4_p${packNumber}_q4`, questionNumber: 4, sessionNumber: 2, mondaiNumber: 2,
        mondaiTitleJp: '問題2：文の組み立て（★並べ替え）', mondaiTitleId: 'Mondai 2: Susunan Kalimat (★)', mondaiTitleEn: 'Mondai 2: Star Reordering (★)',
        sectionCategory: 'language_knowledge', itemType: 'star_sentence',
        prompt: 'ねつが あるなら、きょうは _____ _____ _★_ _____ ほうがいいですよ。',
        scrambledChunks: ['1: むりを', '2: はやく', '3: しないで', '4: ねた'],
        starPosition: 3,
        options: ['1: むりを', '2: はやく', '3: しないで', '4: ねた'],
        correctAnswer: '2: はやく',
        explanation: '語順：むりを(1) しないで(3) はやく(2★) ねた(4) ほうがいいですよ。',
        explanationId: 'Urutan benar: むりを (1) しないで (3) [tanpa memaksakan diri] → はやく (2★) [cepat] → ねた (4) ほうがいいですよ.'
      },
      {
        id: `jlpt_n4_p${packNumber}_q5`, questionNumber: 5, sessionNumber: 2, mondaiNumber: 2,
        mondaiTitleJp: '問題2：文の組み立て（★並べ替え）', mondaiTitleId: 'Mondai 2: Susunan Kalimat (★)', mondaiTitleEn: 'Mondai 2: Star Reordering (★)',
        sectionCategory: 'language_knowledge', itemType: 'star_sentence',
        prompt: '日本の _____ _____ _★_ _____ に ついて 調べました。',
        scrambledChunks: ['1: ごみの', '2: 正しい', '3: 分別の', '4: しかた'],
        starPosition: 3,
        options: ['1: ごみの', '2: 正しい', '3: 分別の', '4: しかた'],
        correctAnswer: '3: 分別の',
        explanation: '正しい語順：正しい(2) ごみの(1) 分別の(3★) しかた(4) に ついて 調べました。',
        explanationId: 'Urutan sintaksis: 正しい (2) → ごみの (1) → 分別の (3★) → しかた (4) [cara pemilahan sampah yang benar di Jepang].'
      },
      {
        id: `jlpt_n4_p${packNumber}_q6`, questionNumber: 6, sessionNumber: 2, mondaiNumber: 3,
        mondaiTitleJp: '問題3：読解（生活案内）', mondaiTitleId: 'Mondai 3: Pemahaman Bacaan (Dokkai)', mondaiTitleEn: 'Mondai 3: Reading Comprehension',
        sectionCategory: 'reading', itemType: 'mcq', passageId: 'n4_pas_1',
        prompt: 'なぜ夜のうちにゴミを出してはいけませんか。',
        options: ['1: カラスがゴミを散らかしてしまうから', '2: 火曜日と金曜日だけ回収するから', '3: ペットボトルを洗わないといけないから', '4: 朝八時前に車が通るから'],
        correctAnswer: '1: カラスがゴミを散らかしてしまうから',
        explanation: '本文に「夜のうちに出すと、カラスがゴミを散らかしてしまいます」と明記されています。',
        explanationId: 'Dalam paragraf [1], membuang sampah malam hari dilarang karena burung gagak (karasu) akan mengacak-acak sampah.'
      },
      {
        id: `jlpt_n4_p${packNumber}_q7`, questionNumber: 7, sessionNumber: 2, mondaiNumber: 3,
        mondaiTitleJp: '問題3：読解（生活案内）', mondaiTitleId: 'Mondai 3: Pemahaman Bacaan (Dokkai)', mondaiTitleEn: 'Mondai 3: Reading Comprehension',
        sectionCategory: 'reading', itemType: 'mcq', passageId: 'n4_pas_1',
        prompt: 'ペットボトルを出すとき、何をしなければなりませんか。',
        options: ['1: キャップとラベルをとって、中を水で洗う', '2: 火曜日の朝八時までに出す', '3: もえるゴミと一緒の袋に入れる', '4: 水で洗わずにそのまま出す'],
        correctAnswer: '1: キャップとラベルをとって、中を水で洗う',
        explanation: '「キャップとラベルをとって、中を水で洗ってから水曜日に出してください」と書いてあります。',
        explanationId: 'Paragraf [2] mewajibkan melepas tutup dan label botol plastik lalu mencuci bagian dalamnya dengan air sebelum dibuang pada hari Rabu.'
      },
      {
        id: `jlpt_n4_p${packNumber}_q8`, questionNumber: 8, sessionNumber: 3, mondaiNumber: 1,
        mondaiTitleJp: '問題1：ポイント理解（聴解）', mondaiTitleId: 'Mondai 1: Chokai Pemahaman Poin Utama', mondaiTitleEn: 'Mondai 1: Key Point Listening',
        sectionCategory: 'listening', itemType: 'chokai_audio',
        audioSpeakers: 'アルバイトの店長と店員', audioDurationSec: 25,
        audioScriptJp: '店長：すみません、明日のシフトですが、佐藤さんが風邪で休むことになりました。山田さん、午前中から入れますか。山田：すみません、午前は大学の授業があって…。午後二時からなら大丈夫です。店長：わかりました。じゃあ、それでお願いします。',
        prompt: '山田さんは明日、何時からアルバイトに入りますか。',
        options: ['1: 午後二時から', '2: 午前中から', '3: 風邪のため休み', '4: 大学の授業の前'],
        correctAnswer: '1: 午後二時から',
        explanation: '山田さんは午前中授業があるため「午後二時からなら大丈夫です」と答え、店長が了承しました。',
        explanationId: 'Yamada memiliki kelas pagi sehingga baru bisa masuk kerja paruh waktu mulai pukul 2 siang (午後二時).'
      }
    ];
  }

  if (tier === 'n3') {
    return [
      {
        id: `jlpt_n3_p${packNumber}_q1`, questionNumber: 1, sessionNumber: 1, mondaiNumber: 1,
        mondaiTitleJp: '問題1：漢字読み', mondaiTitleId: 'Mondai 1: Cara Baca Kanji', mondaiTitleEn: 'Mondai 1: Kanji Reading',
        sectionCategory: 'language_knowledge', itemType: 'mcq',
        prompt: '新しいシステムへの 【切り替え】 が無事に完了した。',
        options: ['1: きりかえ', '2: せつりかえ', '3: きりかわり', '4: せつかえ'],
        correctAnswer: '1: きりかえ',
        explanation: '「切り替える」の名詞形「切り替え」は「きりかえ」と読みます。',
        explanationId: 'Nomina 【切り替え】 dibaca "kirikae" (peralihan / pergantian sistem).'
      },
      {
        id: `jlpt_n3_p${packNumber}_q2`, questionNumber: 2, sessionNumber: 1, mondaiNumber: 2,
        mondaiTitleJp: '問題2：言い換え類義', mondaiTitleId: 'Mondai 2: Sinonim & Parafrase', mondaiTitleEn: 'Mondai 2: Paraphrase',
        sectionCategory: 'language_knowledge', itemType: 'mcq',
        prompt: '会議の時間が 【変更】 になったので、連絡してください。',
        options: ['1: 変わった', '2: 決まった', '3: 中止になった', '4: 延びた'],
        correctAnswer: '1: 変わった',
        explanation: '「変更になる」は「変わる（berubah）」とほぼ同じ意味です。',
        explanationId: 'Kata 【変更】 (henkou - perubahan) bersinonim erat dengan 【変わった】 (berubah).'
      },
      {
        id: `jlpt_n3_p${packNumber}_q3`, questionNumber: 3, sessionNumber: 2, mondaiNumber: 1,
        mondaiTitleJp: '問題1：文法判断（対比・逆接）', mondaiTitleId: 'Mondai 1: Tata Bahasa N3', mondaiTitleEn: 'Mondai 1: N3 Grammar',
        sectionCategory: 'language_knowledge', itemType: 'mcq',
        prompt: '兄はいつも計画的に貯金している（　　）、弟はすぐにお金を使ってしまう。',
        options: ['1: のに対して', '2: にしたがって', '3: にくらべて', '4: ばかりか'],
        correctAnswer: '1: のに対して',
        explanation: '二者間の対照的な性格や行動を述べるため「〜のに対して（sedangkan/berbeda dengan）」を使います。',
        explanationId: 'Pola 【〜のに対して】 (no ni taishite) digunakan untuk mengontraskan dua hal yang bertolak belakang.'
      },
      {
        id: `jlpt_n3_p${packNumber}_q4`, questionNumber: 4, sessionNumber: 2, mondaiNumber: 2,
        mondaiTitleJp: '問題2：文の組み立て（★並べ替え）', mondaiTitleId: 'Mondai 2: Susunan Kalimat (★)', mondaiTitleEn: 'Mondai 2: Star Reordering (★)',
        sectionCategory: 'language_knowledge', itemType: 'star_sentence',
        prompt: '大切な約束をしたので、どんなに _____ _____ _★_ _____ いかない。',
        scrambledChunks: ['1: 忙しくても', '2: 今日だけは', '3: 行かない', '4: わけには'],
        starPosition: 3,
        options: ['1: 忙しくても', '2: 今日だけは', '3: 行かない', '4: わけには'],
        correctAnswer: '3: 行かない',
        explanation: '正しい語順：忙しくても(1) 今日だけは(2) 行かない(3★) わけには(4) いかない。',
        explanationId: 'Urutan benar: 忙しくても(1) 今日だけは(2) 行かない(3★) わけには(4) いかない (tidak boleh tidak pergi hari ini).'
      },
      {
        id: `jlpt_n3_p${packNumber}_q5`, questionNumber: 5, sessionNumber: 2, mondaiNumber: 3,
        mondaiTitleJp: '問題3：読解（評論文）', mondaiTitleId: 'Mondai 3: Pemahaman Bacaan (Dokkai)', mondaiTitleEn: 'Mondai 3: Reading Comprehension',
        sectionCategory: 'reading', itemType: 'mcq', passageId: 'n3_pas_1',
        prompt: '午後八時以降の業務連絡を禁止した結果、どのような効果があったと報告されているか。',
        options: ['1: 勤務時間内の集中力が高まり、業務効率が向上した', '2: 社員の残業手当が大幅に増加した', '3: 急ぎの案件に全く対応できなくなった', '4: スマートフォンの支給台数が減少した'],
        correctAnswer: '1: 勤務時間内の集中力が高まり、業務効率が向上した',
        explanation: '第2段落の最後に「勤務時間内の集中力が高まり、業務効率が向上したという報告が多い」とあります。',
        explanationId: 'Paragraf [2] melaporkan bahwa pelarangan pesan kerja setelah jam 8 malam justru meningkatkan konsentrasi di jam kerja dan efisiensi operasional.'
      },
      {
        id: `jlpt_n3_p${packNumber}_q6`, questionNumber: 6, sessionNumber: 3, mondaiNumber: 1,
        mondaiTitleJp: '問題1：概要理解（聴解）', mondaiTitleId: 'Mondai 1: Chokai Pemahaman Garis Besar', mondaiTitleEn: 'Mondai 1: Listening Gist',
        sectionCategory: 'listening', itemType: 'chokai_audio',
        audioSpeakers: 'ラジオ番組のキャスター', audioDurationSec: 28,
        audioScriptJp: 'キャスター：最近、若者の間で「昭和レトロ」と呼ばれる昔ながらの喫茶店や雑貨が人気を集めています。デジタル化が進む一方で、手触りのある温かみや落ち着いた空間に新鮮さを感じる人が増えているようです。質問：この話のテーマは何ですか。',
        prompt: 'この話の最も中心的なテーマは何ですか。',
        options: ['1: 若者の間で昔の文化が再評価されている理由', '2: 若者がスマートフォンを使わなくなった原因', '3: 喫茶店の経営が難しくなっている現状', '4: 最新のデジタル機器の販売動向'],
        correctAnswer: '1: 若者の間で昔の文化が再評価されている理由',
        explanation: '「昭和レトロが人気の理由＝手触りの温かみや落ち着いた空間に新鮮さを感じるから」を説明しています。',
        explanationId: 'Siaran tersebut membahas alasan mengapa budaya retro era Showa kembali diminati kalangan anak muda.'
      }
    ];
  }

  if (tier === 'n2') {
    return [
      {
        id: `jlpt_n2_p${packNumber}_q1`, questionNumber: 1, sessionNumber: 1, mondaiNumber: 1,
        mondaiTitleJp: '問題1：漢字読み', mondaiTitleId: 'Mondai 1: Cara Baca Kanji Bisnis', mondaiTitleEn: 'Mondai 1: Kanji Reading',
        sectionCategory: 'language_knowledge', itemType: 'mcq',
        prompt: 'プロジェクトの現状を正確に 【把握】 する必要がある。',
        options: ['1: はあく', '2: はかく', '3: ばあく', '4: はけん'],
        correctAnswer: '1: はあく',
        explanation: '「把握」の正しい読み方は「はあく」です。',
        explanationId: 'Kanji 【把握】 dibaca "haaku" (memahami secara menyeluruh).'
      },
      {
        id: `jlpt_n2_p${packNumber}_q2`, questionNumber: 2, sessionNumber: 1, mondaiNumber: 2,
        mondaiTitleJp: '問題2：文脈規定', mondaiTitleId: 'Mondai 2: Kosakata Konteks Formal', mondaiTitleEn: 'Mondai 2: Contextual Vocab',
        sectionCategory: 'language_knowledge', itemType: 'mcq',
        prompt: '不公平な待遇を （　　） するために、新たな給与規定が制定された。',
        options: ['1: 是正', '2: 是認', '3: 妥協', '4: 凌駕'],
        correctAnswer: '1: 是正',
        explanation: '不都合や誤りを正しく改めることは「是正（ぜせい）」です。',
        explanationId: 'Kata yang tepat untuk mengoreksi ketidakadilan adalah 【是正】 (zesei - meremediasi/memperbaiki).'
      },
      {
        id: `jlpt_n2_p${packNumber}_q3`, questionNumber: 3, sessionNumber: 1, mondaiNumber: 3,
        mondaiTitleJp: '問題3：文法形式の判断', mondaiTitleId: 'Mondai 3: Tata Bahasa Lanjut N2', mondaiTitleEn: 'Mondai 3: N2 Grammar',
        sectionCategory: 'language_knowledge', itemType: 'mcq',
        prompt: '彼が成功したのは、長年の地道な努力の賜物 （　　）。',
        options: ['1: にほかならない', '2: に過ぎない', '3: に限らない', '4: を余儀なくされる'],
        correctAnswer: '1: にほかならない',
        explanation: '「〜にほかならない」は「まさに〜である（tidak lain adalah）」と強く断定する表現です。',
        explanationId: 'Pola N2 【〜にほかならない】 bermakna penegasan mutlak "tidak lain adalah buah usaha".'
      },
      {
        id: `jlpt_n2_p${packNumber}_q4`, questionNumber: 4, sessionNumber: 1, mondaiNumber: 4,
        mondaiTitleJp: '問題4：文の組み立て（★並べ替え）', mondaiTitleId: 'Mondai 4: Susunan Kalimat (★)', mondaiTitleEn: 'Mondai 4: Star Reordering (★)',
        sectionCategory: 'language_knowledge', itemType: 'star_sentence',
        prompt: '急な予算削減により、新規計画を _____ _____ _★_ _____ ことになった。',
        scrambledChunks: ['1: 縮小', '2: せざるを', '3: 得ない', '4: 大幅に'],
        starPosition: 3,
        options: ['1: 大幅に', '2: 縮小', '3: せざるを', '4: 得ない'],
        correctAnswer: '3: せざるを',
        explanation: '語順：大幅に(4) 縮小(1) せざるを(2★) 得ない(3) → 大幅に 縮小 せざるを得ない ことになった。',
        explanationId: 'Urutan sintaksis benar: 大幅に (secara besar-besaran) → 縮小 (penciutan) → せざるを (★) → 得ない (terpaksa dilakukan).'
      },
      {
        id: `jlpt_n2_p${packNumber}_q5`, questionNumber: 5, sessionNumber: 1, mondaiNumber: 5,
        mondaiTitleJp: '問題5：読解（論説文）', mondaiTitleId: 'Mondai 5: Pemahaman Bacaan Editorial', mondaiTitleEn: 'Mondai 5: Editorial Reading',
        sectionCategory: 'reading', itemType: 'mcq', passageId: 'n2_pas_1',
        prompt: '本文で筆者が最も主張したいことは何か。',
        options: [
          '1: ツール導入にとどまらず、信頼関係と自律性を両立させた新たな評価制度が必要である。',
          '2: リモートワークは生産性が確実に劣るため全面廃止すべきである。',
          '3: 滞在時間の長さのみを基準に評価することが最も客観的である。',
          '4: 職場のコミュニケーションはすべてチャットツールで完全に代替できる。'
        ],
        correctAnswer: '1: ツール導入にとどまらず、信頼関係と自律性を両立させた新たな評価制度が必要である。',
        explanation: '文章末尾の「単に業務ツールをデジタル化するにとどまらず…」に筆者の主張が明示されています。',
        explanationId: 'Paragraf [2] menyimpulkan bahwa sekadar digitalisasi tidak cukup; perlu sistem evaluasi baru yang menyeimbangkan kepercayaan dan otonomi.'
      },
      {
        id: `jlpt_n2_p${packNumber}_q6`, questionNumber: 6, sessionNumber: 1, mondaiNumber: 6,
        mondaiTitleJp: '問題6：統合理解（A・B比較読解）', mondaiTitleId: 'Mondai 6: Membaca Komparatif (Teks A & B)', mondaiTitleEn: 'Mondai 6: Comparative Dual-Text',
        sectionCategory: 'reading', itemType: 'mcq', passageId: 'n2_pas_2',
        prompt: '伝統工芸の継承について、AとBの見解が異なっている点はどれか。',
        options: [
          '1: Aは現代的デザインと市場開拓を優先するのに対し、Bは技術の本質と精神性の厳守を重視している。',
          '2: Aは後継者不足を否定しており、Bは徒弟制度の完全復活を主張している。',
          '3: AとBはともに海外市場への進出を厳しく批判している。',
          '4: Aは伝統形態の保存のみを訴え、Bは全面的な商業化を支持している。'
        ],
        correctAnswer: '1: Aは現代的デザインと市場開拓を優先するのに対し、Bは技術の本質と精神性の厳守を重視している。',
        explanation: 'Aは「現代的デザインや異業種コラボ」を生存の道とし、Bは「単なる現代風・商業的改変」が本質を損なうと警告しています。',
        explanationId: 'Teks A berfokus pada inovasi desain modern dan ekspansi pasar, sementara Teks B memperingatkan agar tidak mengorbankan esensi tradisional demi komersialisasi.'
      },
      {
        id: `jlpt_n2_p${packNumber}_q7`, questionNumber: 7, sessionNumber: 2, mondaiNumber: 1,
        mondaiTitleJp: '問題1：発話表現・総合理解（聴解）', mondaiTitleId: 'Mondai 1: Chokai Negosiasi Bisnis', mondaiTitleEn: 'Mondai 1: Business Listening',
        sectionCategory: 'listening', itemType: 'chokai_audio',
        audioSpeakers: '部長と企画担当', audioDurationSec: 32,
        audioScriptJp: '企画：部長、来月の展示会ですが、予算の関係でブースの規模を縮小するしかないでしょうか。部長：いや、集客効果を考えると規模は維持したい。代わりに配布するパンフレットの印刷部数を減らしてコストを調整できないか。企画：承知しました、すぐに見積もりを取り直します。質問：部長はコスト削減のためにどうすることを提案しましたか。',
        prompt: '部長はコスト削減のためにどうすることを提案しましたか。',
        options: [
          '1: ブースの規模は維持し、パンフレットの印刷部数を減らす',
          '2: 来月の展示会への出展そのものを中止する',
          '3: ブースの規模を半分に縮小して費用を抑える',
          '4: パンフレットの印刷部数を倍増させて宣伝効果を高める'
        ],
        correctAnswer: '1: ブースの規模は維持し、パンフレットの印刷部数を減らす',
        explanation: '部長は「規模は維持したい。代わりにパンフレットの印刷部数を減らして調整できないか」と提案しています。',
        explanationId: 'Kepala divisi meminta mempertahankan ukuran stan pameran, dan menekan biaya dengan mengurangi jumlah cetakan brosur.'
      }
    ];
  }

  // JLPT N1
  return [
    {
      id: `jlpt_n1_p${packNumber}_q1`, questionNumber: 1, sessionNumber: 1, mondaiNumber: 1,
      mondaiTitleJp: '問題1：漢字読み', mondaiTitleId: 'Mondai 1: Kanji Tingkat Lanjut N1', mondaiTitleEn: 'Mondai 1: N1 Kanji Reading',
      sectionCategory: 'language_knowledge', itemType: 'mcq',
      prompt: '両者の見解には埋めがたい 【乖離】 が見られる。',
      options: ['1: かいり', '2: きり', '3: じょうり', '4: ひり'],
      correctAnswer: '1: かいり',
      explanation: '「乖離」は「かいり」と読み、食い違うこと・かけ離れることを意味します。',
      explanationId: 'Kanji N1 【乖離】 dibaca "kairi" (divergensi / kesenjangan pandangan yang lebar).'
    },
    {
      id: `jlpt_n1_p${packNumber}_q2`, questionNumber: 2, sessionNumber: 1, mondaiNumber: 2,
      mondaiTitleJp: '問題2：文法形式の判断', mondaiTitleId: 'Mondai 2: Tata Bahasa Sastra & Akademik N1', mondaiTitleEn: 'Mondai 2: N1 Grammar',
      sectionCategory: 'language_knowledge', itemType: 'mcq',
      prompt: '長年の研究の成果がこの一冊に集約されていると言っても （　　）。',
      options: ['1: 過言ではない', '2: 禁じ得ない', '3: やむを得ない', '4: 余儀なくされる'],
      correctAnswer: '1: 過言ではない',
      explanation: '「〜と言っても過言ではない」は「〜と言っても言い過ぎではない（tidak berlebihan jika dikatakan...）」を表すN1重要表現です。',
      explanationId: 'Ungkapan idiomatik N1 【過言ではない】 (kagon de wa nai) berarti "tidak berlebihan untuk dikatakan".'
    },
    {
      id: `jlpt_n1_p${packNumber}_q3`, questionNumber: 3, sessionNumber: 1, mondaiNumber: 3,
      mondaiTitleJp: '問題3：文の組み立て（★並べ替え）', mondaiTitleId: 'Mondai 3: Susunan Kalimat Puncak (★)', mondaiTitleEn: 'Mondai 3: Star Reordering (★)',
      sectionCategory: 'language_knowledge', itemType: 'star_sentence',
      prompt: 'その画期的な理論は、発表 _____ _____ _★_ _____ 世界中の研究者の注目を集めた。',
      scrambledChunks: ['1: 各地で', '2: を皮切りに', '3: たちまち', '4: 熱い議論を呼び'],
      starPosition: 3,
      options: ['1: 各地で', '2: を皮切りに', '3: たちまち', '4: 熱い議論を呼び'],
      correctAnswer: '4: 熱い議論を呼び',
      explanation: '正しい語順：を皮切りに(2) 各地で(1) 熱い議論を呼び(4★) たちまち(3)。',
      explanationId: 'Urutan sintaksis: 発表 を皮切りに(2) → 各地で(1) → 熱い議論を呼び(4★) → たちまち(3) (dimulai dari presentasi tersebut, memicu diskusi hangat di berbagai tempat).'
    },
    {
      id: `jlpt_n1_p${packNumber}_q4`, questionNumber: 4, sessionNumber: 1, mondaiNumber: 4,
      mondaiTitleJp: '問題4：読解（主張理解）', mondaiTitleId: 'Mondai 4: Membaca Kritis Filosofis', mondaiTitleEn: 'Mondai 4: Critical Essay Reading',
      sectionCategory: 'reading', itemType: 'mcq', passageId: 'n1_pas_1',
      prompt: '筆者がアルゴリズムによる「最適化の論理」に対して抱いている危機感は何か。',
      options: [
        '1: 偶然の出会いや認知的摩擦を排除することで、思考の均質化が進み主体性が損なわれること',
        '2: 統計的計算の速度が遅すぎるため日常の選択に支障が出ること',
        '3: 推薦システムの維持コストが社会全体の経済成長を阻害すること',
        '4: 過去の行動履歴が外部に漏洩して法的紛争が増加すること'
      ],
      correctAnswer: '1: 偶然の出会いや認知的摩擦を排除することで、思考の均質化が進み主体性が損なわれること',
      explanation: '第1段落に「偶然の出会いや認知的摩擦を排除することで、思考の均質化を静かに進行させる」と明確に論じられています。',
      explanationId: 'Paragraf [1] mengkritik bahwa optimalisasi menghilangkan friksi kognitif dan pertemuan tak terduga sehingga menyeragamkan pemikiran.'
    },
    {
      id: `jlpt_n1_p${packNumber}_q5`, questionNumber: 5, sessionNumber: 1, mondaiNumber: 5,
      mondaiTitleJp: '問題5：統合理解（A・B比較読解）', mondaiTitleId: 'Mondai 5: Membaca Komparatif N1 (A & B)', mondaiTitleEn: 'Mondai 5: Comparative Reading',
      sectionCategory: 'reading', itemType: 'mcq', passageId: 'n1_pas_2',
      prompt: '文章Aと文章Bの主張の相違点として最も適切なものはどれか。',
      options: [
        '1: Aは言語構造が思考の枠組みを強く規定すると捉えるが、Bは言語的決定論を退け普遍的思考力を重視している。',
        '2: Aは比喩の重要性を主張しているが、Bは語彙数のみが思考を決めるとしている。',
        '3: Aは異言語学習を無意味だと断じ、Bは多言語教育の義務化を提案している。',
        '4: AとBはともに、言語は単なる客観的伝達ツールに過ぎない点で一致している。'
      ],
      correctAnswer: '1: Aは言語構造が思考の枠組みを強く規定すると捉えるが、Bは言語的決定論を退け普遍的思考力を重視している。',
      explanation: 'Aは相対性・思考の鋳型を主張し、Bは言語的決定論（過小評価）に対して普遍的概念形成能力を強調しています。',
      explanationId: 'Teks A mendukung relativitas bahasa sebagai cetakan pikiran, sedangkan Teks B menolak determinisme linguistik dan menekankan kapasitas kognitif universal.'
    },
    {
      id: `jlpt_n1_p${packNumber}_q6`, questionNumber: 6, sessionNumber: 2, mondaiNumber: 1,
      mondaiTitleJp: '問題1：統合理解（聴解・複数話者）', mondaiTitleId: 'Mondai 1: Chokai Diskusi Kritis', mondaiTitleEn: 'Mondai 1: Multi-Speaker Listening',
      sectionCategory: 'listening', itemType: 'chokai_audio',
      audioSpeakers: '司会者・教授A・教授B', audioDurationSec: 36,
      audioScriptJp: '司会：都市の再開発において、歴史的建造物をどう扱うべきでしょうか。教授A：老朽化した建物の維持費は自治体の財政を圧迫しています。耐震性に優れた最新ビルへ建て替え、経済的活力を生み出すべきです。教授B：しかし一度失われた街の記憶や景観は二度と戻らない。外観を保存しつつ内部を補強するリノベーションこそ、都市のブランド価値を高める投資になります。質問：教授Bの主張として正しいものはどれか。',
      prompt: '歴史的建造物の再開発について、教授Bはどのように主張しているか。',
      options: [
        '1: 外観を保存しながら内部を改修する手法が長期的な都市価値を高める。',
        '2: 財政負担を軽減するためにすべての旧建築物を撤去すべきである。',
        '3: 経済的活力よりも新築高層ビルの建築速度を最優先すべきである。',
        '4: 歴史的景観の保存は自治体の予算上、完全に不可能である。'
      ],
      correctAnswer: '1: 外観を保存しながら内部を改修する手法が長期的な都市価値を高める。',
      explanation: '教授Bは「外観を保存しつつ内部を補強するリノベーションこそ、都市のブランド価値を高める投資になる」と述べています。',
      explanationId: 'Profesor B berargumen bahwa renovasi yang melestarikan fasad eksterior sambil memperkuat interior justru merupakan investasi nilai kota jangka panjang.'
    }
  ];
}

export function getJLPTMockPackage(levelCode: string, packNumber: number = 1): JLPTFullExamPackage {
  const norm = levelCode.toLowerCase();
  let tier: JLPTLevelTier = 'n5';
  if (norm.includes('n1')) tier = 'n1';
  else if (norm.includes('n2')) tier = 'n2';
  else if (norm.includes('n3')) tier = 'n3';
  else if (norm.includes('n4')) tier = 'n4';

  const spec = JLPT_LEVEL_SPECS[tier];
  const passagesMap: Record<JLPTLevelTier, JLPTPassageItem[]> = {
    n5: N5_PASSAGES,
    n4: N4_PASSAGES,
    n3: N3_PASSAGES,
    n2: N2_PASSAGES,
    n1: N1_PASSAGES
  };

  return {
    id: `jlpt_${tier}_mock_pack_0${packNumber}`,
    levelCode: `jlpt_${tier}`,
    tier,
    packNumber,
    titleEn: `${spec.label} Official Simulation Pack ${packNumber}`,
    titleId: `Simulasi Resmi ${spec.label} Paket ${packNumber}`,
    titleJp: `日本語能力試験 ${tier.toUpperCase()} 模擬試験 第${packNumber}回`,
    thematicFocusEn: spec.subtitleEn,
    thematicFocusId: spec.subtitleId,
    totalDurationMinutes: spec.totalDurationMinutes,
    passThresholdScore: spec.passThreshold,
    furiganaPolicy: spec.furiganaPolicy,
    sessions: spec.sessions,
    passages: passagesMap[tier],
    questions: buildTierQuestions(tier, packNumber)
  };
}

/**
 * Evaluates a completed JLPT mock exam using the official 180-point scaled score
 * and strict 19-point (or 38/120 for N4/N5) sectional cutoff safeguard.
 */
export function evaluateJLPTSubmissionLocally(
  pkg: JLPTFullExamPackage,
  answers: Record<number, string>,
  timeSpentSeconds: number
): JLPTDetailedScoreResult {
  const levelUpper = pkg.tier.toUpperCase() as 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  const isLowerTier = levelUpper === 'N5' || levelUpper === 'N4';

  let lkRaw = 0, lkTotal = 0;
  let rdRaw = 0, rdTotal = 0;
  let lsRaw = 0, lsTotal = 0;
  let kvRaw = 0, kvTotal = 0;
  let grRaw = 0, grTotal = 0;

  const evaluations = pkg.questions.map(q => {
    const userAns = answers[q.questionNumber] || '';
    const normUser = userAns.replace(/^[0-9]+[\:\.\s]+/, '').trim();
    const normCorrect = String(q.correctAnswer).replace(/^[0-9]+[\:\.\s]+/, '').trim();
    const isCorrect = Boolean(userAns) && (userAns === q.correctAnswer || normUser === normCorrect);

    if (q.sectionCategory === 'language_knowledge') {
      lkTotal++;
      if (isCorrect) lkRaw++;
      if (q.itemType === 'star_sentence' || q.mondaiTitleId.toLowerCase().includes('tata bahasa')) {
        grTotal++;
        if (isCorrect) grRaw++;
      } else {
        kvTotal++;
        if (isCorrect) kvRaw++;
      }
    } else if (q.sectionCategory === 'reading') {
      rdTotal++;
      if (isCorrect) rdRaw++;
    } else if (q.sectionCategory === 'listening') {
      lsTotal++;
      if (isCorrect) lsRaw++;
    }

    return {
      questionNumber: q.questionNumber,
      sessionNumber: q.sessionNumber,
      sectionCategory: q.sectionCategory,
      itemType: q.itemType,
      prompt: q.prompt,
      userAnswer: userAns,
      correctAnswer: String(q.correctAnswer),
      isCorrect,
      explanation: q.explanation,
      explanationId: q.explanationId,
      trapNoteId: q.trapNoteId,
      trapNoteEn: q.trapNoteEn,
      scrambledChunks: q.scrambledChunks,
      starPosition: q.starPosition
    };
  });

  const rawScore = lkRaw + rdRaw + lsRaw;
  const totalQuestions = pkg.questions.length;
  const accuracyPct = totalQuestions > 0 ? Math.round((rawScore / totalQuestions) * 100) : 0;

  let lkScaled = 0;
  let rdScaled = 0;
  let lsScaled = lsTotal > 0 ? Math.round((lsRaw / lsTotal) * 60) : 0;
  let scaledScore = 0;
  let sectionalCutoffFailed = false;
  let cutoffAlertId: string | undefined;
  let cutoffAlertEn: string | undefined;

  if (isLowerTier) {
    // N4 & N5: Combined Language Knowledge & Reading (0-120, cutoff 38), Listening (0-60, cutoff 19)
    const combinedRaw = lkRaw + rdRaw;
    const combinedTotal = lkTotal + rdTotal;
    const combinedScaled = combinedTotal > 0 ? Math.round((combinedRaw / combinedTotal) * 120) : 0;
    lkScaled = lkTotal > 0 ? Math.round((lkRaw / lkTotal) * 60) : 0;
    rdScaled = rdTotal > 0 ? Math.round((rdRaw / rdTotal) * 60) : 0;
    scaledScore = combinedScaled + lsScaled;

    const combinedPassed = combinedScaled >= 38;
    const lsPassed = lsScaled >= 19;
    sectionalCutoffFailed = !combinedPassed || !lsPassed;

    if (sectionalCutoffFailed) {
      cutoffAlertId = 'Nilai di bawah ambang batas minimum seksi (19/60 Listening atau 38/120 Pengetahuan & Membaca) — Gagal memenuhi batas minimum seksi sehingga ujian dinyatakan Tidak Lulus meskipun skor total mencukupi.';
      cutoffAlertEn = 'Sectional score fell below the strict minimum cutoff (38/120 Combined Lang/Reading or 19/60 Listening) — Automatic Fail regardless of total score.';
    }

    const overallPassed = scaledScore >= pkg.passThresholdScore && !sectionalCutoffFailed;

    return {
      attemptId: `jlpt_att_${Date.now()}`,
      packageId: pkg.id,
      level: levelUpper,
      packNumber: pkg.packNumber,
      rawScore,
      totalQuestions,
      accuracyPct,
      scaledScore,
      passThreshold: pkg.passThresholdScore,
      overallPassed,
      sectionalCutoffFailed,
      verdictJp: overallPassed ? '合格' : '不合格',
      verdictId: overallPassed ? 'LULUS' : 'TIDAK LULUS',
      verdictEn: overallPassed ? 'PASSED' : 'FAILED',
      cutoffAlertId,
      cutoffAlertEn,
      isLowerTier: true,
      sectionalScores: {
        languageKnowledge: { raw: lkRaw, total: lkTotal, scaled: lkScaled, maxScaled: 60, cutoff: 19, cutoffPassed: lkScaled >= 19 },
        reading: { raw: rdRaw, total: rdTotal, scaled: rdScaled, maxScaled: 60, cutoff: 19, cutoffPassed: rdScaled >= 19 },
        listening: { raw: lsRaw, total: lsTotal, scaled: lsScaled, maxScaled: 60, cutoff: 19, cutoffPassed: lsPassed },
        combinedLangRead: { raw: combinedRaw, total: combinedTotal, scaled: combinedScaled, maxScaled: 120, cutoff: 38, cutoffPassed: combinedPassed }
      },
      radarCriteria: {
        kanjiVocabPct: kvTotal > 0 ? Math.round((kvRaw / kvTotal) * 100) : 0,
        grammarPct: grTotal > 0 ? Math.round((grRaw / grTotal) * 100) : 0,
        readingPct: rdTotal > 0 ? Math.round((rdRaw / rdTotal) * 100) : 0,
        listeningPct: lsTotal > 0 ? Math.round((lsRaw / lsTotal) * 100) : 0
      },
      questionEvaluations: evaluations,
      timeSpentSeconds,
      completedAt: new Date().toISOString()
    };
  } else {
    // N1, N2, N3: 3 sections x 60 pts, strict 19/60 cutoff each
    lkScaled = lkTotal > 0 ? Math.round((lkRaw / lkTotal) * 60) : 0;
    rdScaled = rdTotal > 0 ? Math.round((rdRaw / rdTotal) * 60) : 0;
    scaledScore = lkScaled + rdScaled + lsScaled;

    const lkPassed = lkScaled >= 19;
    const rdPassed = rdScaled >= 19;
    const lsPassed = lsScaled >= 19;
    sectionalCutoffFailed = !lkPassed || !rdPassed || !lsPassed;

    if (sectionalCutoffFailed) {
      cutoffAlertId = 'Nilai di bawah ambang batas minimum seksi (19/60) — Gagal memenuhi batas minimum seksi sehingga ujian dinyatakan Tidak Lulus meskipun skor total mencukupi.';
      cutoffAlertEn = 'Sectional score below minimum cutoff (19/60) — Automatic Fail regardless of composite total score.';
    }

    const overallPassed = scaledScore >= pkg.passThresholdScore && !sectionalCutoffFailed;

    return {
      attemptId: `jlpt_att_${Date.now()}`,
      packageId: pkg.id,
      level: levelUpper,
      packNumber: pkg.packNumber,
      rawScore,
      totalQuestions,
      accuracyPct,
      scaledScore,
      passThreshold: pkg.passThresholdScore,
      overallPassed,
      sectionalCutoffFailed,
      verdictJp: overallPassed ? '合格' : '不合格',
      verdictId: overallPassed ? 'LULUS' : 'TIDAK LULUS',
      verdictEn: overallPassed ? 'PASSED' : 'FAILED',
      cutoffAlertId,
      cutoffAlertEn,
      isLowerTier: false,
      sectionalScores: {
        languageKnowledge: { raw: lkRaw, total: lkTotal, scaled: lkScaled, maxScaled: 60, cutoff: 19, cutoffPassed: lkPassed },
        reading: { raw: rdRaw, total: rdTotal, scaled: rdScaled, maxScaled: 60, cutoff: 19, cutoffPassed: rdPassed },
        listening: { raw: lsRaw, total: lsTotal, scaled: lsScaled, maxScaled: 60, cutoff: 19, cutoffPassed: lsPassed }
      },
      radarCriteria: {
        kanjiVocabPct: kvTotal > 0 ? Math.round((kvRaw / kvTotal) * 100) : 0,
        grammarPct: grTotal > 0 ? Math.round((grRaw / grTotal) * 100) : 0,
        readingPct: rdTotal > 0 ? Math.round((rdRaw / rdTotal) * 100) : 0,
        listeningPct: lsTotal > 0 ? Math.round((lsRaw / lsTotal) * 100) : 0
      },
      questionEvaluations: evaluations,
      timeSpentSeconds,
      completedAt: new Date().toISOString()
    };
  }
}
