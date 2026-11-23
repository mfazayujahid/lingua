import { Router, Request, Response } from 'express';
import { evaluateIELTSWriting } from '../algorithms/ielts';

export const studioRouter = Router();

// Track & Level-Specific Japanese & IELTS Prompts & Benchmarks
// Prompt descriptions and guidelines are provided in clear English so learners understand the task,
// while target vocabulary, kanji, sentences, and rubric titles maintain accurate Japanese anchors.
export const WRITING_PROMPTS_BY_LEVEL: Record<string, {
  title: string;
  badge: string;
  prompt: string;
  guidelines: string;
  minUnits: number;
  unitLabel: string;
  recommendedMinutes: number;
  sampleStudent: string;
  modelAnswer: {
    title: string;
    scoreLabel: string;
    length: number;
    text: string;
    rationale: string;
  };
  rubricLabels: {
    c1: string;
    c2: string;
    c3: string;
    c4: string;
  };
}> = {
  jlpt_n5: {
    title: 'Japanese Composition (自己紹介と日課) • Self-Introduction & Daily Routine',
    badge: 'JLPT N5 Foundation Writing',
    prompt: '【Writing Task】Write a short composition introducing yourself: state your name, where you are from, your occupation/major, and how you spend a typical day (when you wake up, your activities at school or work, and your evening). Use the basic case particles you have learned (は, が, を, に, で) and polite forms (〜です, 〜ます).',
    guidelines: 'Length: 150–250 characters • Recommended Time: 20 minutes • Required Particles: は, が, を, に, で',
    minUnits: 150,
    unitLabel: '文字 (characters)',
    recommendedMinutes: 20,
    sampleStudent: 'わたしはエレーナです。留学生です。毎朝７時に起きます。朝ごはんを食べます。それから、バスで大学へ行きます。教室で日本語を勉強します。午後は図書館で本を読みます。夜は寮で友達とご飯を作って食べます。とても楽しいです。',
    modelAnswer: {
      title: 'Model Answer: 私の日常生活と日本語学習 (My Daily Routine & Japanese Studies)',
      scoreLabel: 'Rating: Excellent (A+ / Band 9.0 equivalent)',
      length: 185,
      text: '初めまして。わたしはエレーナと申します。ドイツのベルリンから参りました留学生です。現在、大学で国際経済を専攻しています。\n毎朝７時に起きて、朝ごはんをしっかり食べます。８時半に電車で大学へ通います。午前中は日本語の授業があります。文法や漢字を一生懸命練習します。午後は図書館で予習と復習をします。夜は宿舎の食堂で各国の友人と言語交換をしながら楽しく夕飯を食べます。毎日充実しています。',
      rationale: 'Time particle に, location of action で, destination へ, and object を are used accurately. Consistent polite です/ます style throughout with logical sentence sequence.'
    },
    rubricLabels: {
      c1: 'Grammar & Case Particles (助詞と文法)',
      c2: 'Polite Register & Kana Accuracy (です・ます調と文字)',
      c3: 'Vocabulary & Natural Collocations (語彙とコロケーション)',
      c4: 'Coherence & Logical Flow (構成と一貫性)'
    }
  },
  jlpt_n4: {
    title: 'Japanese Composition (週末の出来事と手紙) • Weekend Experience & Request Letter',
    badge: 'JLPT N4 Intermediate Writing',
    prompt: '【Writing Task】Write a short email or letter to a teacher or senior colleague (先輩). Describe an interesting event you experienced last weekend and explain your plans for next week. Incorporate potential verbs (書ける, 行くことができる) and benefactive expressions (〜てもらう, 〜てくれる).',
    guidelines: 'Length: 200–350 characters • Recommended Time: 25 minutes • Required: Potential verbs & benefactive expressions',
    minUnits: 200,
    unitLabel: '文字 (characters)',
    recommendedMinutes: 25,
    sampleStudent: '先週の土曜日に、先輩に案内してもらって京都のお寺へ行きました。紅葉がとても綺麗で、写真をたくさん撮ることができました。お昼には美味しいお豆腐料理をごちそうになりました。来週の土曜日は日本語の発表会があります。資料をチェックしていただけないでしょうか。よろしくお願いいたします。',
    modelAnswer: {
      title: 'Model Letter: 先輩へのお礼と原稿確認依頼 (Thank-You Letter & Speech Check Request)',
      scoreLabel: 'Rating: Excellent (A+ / Band 9.0 equivalent)',
      length: 260,
      text: '先輩、先週末はお忙しい中、京都を案内してくださり本当にありがとうございました。先輩のおかげで、普段一人では行くことができない歴史ある名所をじっくり見学することができました。\nさて、来週金曜日に開催される留学生スピーチコンテストの原稿が仕上がりました。もしお時間がございましたら、自然な表現になっているか一度目を通していただけないでしょうか。ご多忙のところ恐縮ですが、ご指導いただけますと幸いです。',
      rationale: 'Polite benefactives (〜てくださる, 〜ていただく) and potential capability (行くことができない) are naturally integrated in an authentic polite social context.'
    },
    rubricLabels: {
      c1: 'Complex Grammar & Benefactives (複文と授受表現)',
      c2: 'Polite Register & Social Modality (待遇表現・敬意伝達)',
      c3: 'Appropriate Kanji & Lexicon (漢字と語彙選定)',
      c4: 'Task Coherence & Purpose (段落展開と伝達明確性)'
    }
  },
  jlpt_n3: {
    title: 'Japanese Opinion Essay (対比と意見論述) • Contrasting Telework vs Office Work',
    badge: 'JLPT N3 Opinion Essay',
    prompt: '【Writing Task】Write an analytical opinion essay comparing telework (remote work) and in-office work. Contrast their respective advantages and disadvantages using contrastive grammar patterns (〜に対して, 〜反面, 〜一方で), and state your own reasoned conclusion.',
    guidelines: 'Length: 300–450 characters • Recommended Time: 30 minutes • Required: Contrastive grammar patterns',
    minUnits: 300,
    unitLabel: '文字 (characters)',
    recommendedMinutes: 30,
    sampleStudent: 'テレワークは通勤時間を削減できる反面、同僚との雑談が減少しコミュニケーションが難しくなる傾向があります。これに対して、出社勤務は対面で迅速に相談できる利点がある一方で、満員電車のストレスを伴います。私は両者を組み合わせたハイブリッド勤務が最も望ましいと考えます。',
    modelAnswer: {
      title: 'Model Essay: 柔軟な労働形態の確立に向けた考察 (Flexible Working Models)',
      scoreLabel: 'Rating: Excellent (A+ / Band 9.0 equivalent)',
      length: 380,
      text: '近年普及した在宅勤務は、通勤時間の削減や個人の自律的な生活設計を可能にする反面、偶発的な対話の喪失や業務の進捗状況が見えにくくなるという課題を抱えている。これに対して、オフィスへの出社勤務は、対面ならではの緊密な意思疎通や組織的一体感を醸成しやすい一方で、通勤による身体的・精神的疲労を従業員に強いることになる。\nしたがって、業務の性質に応じて週に数日の出社と在宅を組み合わせるハイブリッド勤務を制度化することが、生産性と生活の質を両立させる上で最も有効な解決策であると考える。',
      rationale: 'Logical contrast connectors (反面, これに対して, 一方で) are deployed with structural precision leading to a clear, objective recommendation in formal Da/Dewa register.'
    },
    rubricLabels: {
      c1: 'Logical Contrast Connectors (対比・接続表現の運用)',
      c2: 'Coherence & Argumentation (論理的一貫性と根拠)',
      c3: 'Intermediate Lexicon & Compounds (中級語彙と漢字熟語)',
      c4: 'Objective Register (客観的常体表現の維持)'
    }
  },
  jlpt_n2: {
    title: 'Business Argumentation (組織論説と企業戦略) • Preserving Tacit Knowledge in Digital Era',
    badge: 'JLPT N2 Business Essay',
    prompt: '【Writing Task】Write a formal business essay analyzing how corporations can preserve tacit knowledge (暗黙知) amidst rapid workplace digitalization. Incorporate advanced modality patterns (〜にほかならない, 〜を余儀なくされる) and outline strategic organizational solutions.',
    guidelines: 'Length: 400–600 characters • Recommended Time: 35 minutes • Required: Advanced modality markers',
    minUnits: 400,
    unitLabel: '文字 (characters)',
    recommendedMinutes: 35,
    sampleStudent: '業務のデジタル化が進む現代において、形式知の共有は容易になったものの、熟練者の持つ暗黙知が失われつつある。これは組織の長期的な競争力低下に直結する深刻な事態にほかならない。企業は偶発的な対面研修の場を意識的に設け、世代間の知識伝達を促進しなければならない。',
    modelAnswer: {
      title: 'Model Essay: デジタル変革期における組織知の継承と制度設計 (Knowledge Inheritance in DX)',
      scoreLabel: 'Rating: Excellent (A+ / Band 9.0 equivalent)',
      length: 490,
      text: '組織のDX推進は業務プロセスの可視化と短期的生産性の向上をもたらしたが、その陰で対面環境において無意識に培われてきた暗黙知の断絶という深刻な弊害が生じている。業務マニュアルの整備だけでは補いきれない臨機応変な判断力や技術的直感は、熟練者と若手の協働を通じた間主観的な実践から生じるものにほかならない。\n激変する市場環境下で変革を余儀なくされる現代企業は、非同期コミュニケーションの利便性を享受しつつも、メンター制度や定期的な対面ワークショップなど、知識の共創を促す物理的対話の場を戦略的に再構築することが急務である。',
      rationale: 'High modality assertions (にほかならない, 余儀なくされる) are combined with corporate strategic discourse and nuanced organizational terminology.'
    },
    rubricLabels: {
      c1: 'Advanced Modality & Syntax (上級モダリティと構文)',
      c2: 'Critical Conceptual Reasoning (概念展開と批判的論理力)',
      c3: 'Corporate & Abstract Lexicon (実務・抽象語彙の網羅度)',
      c4: 'Formal Scholarly Register (論文体文末・格調の統制)'
    }
  },
  jlpt_n1: {
    title: 'Scholarly Discourse (哲学・現代文明批評) • Autonomous AI & Epistemic Agency',
    badge: 'JLPT N1 Academic Discourse',
    prompt: '【Writing Task】Write an advanced philosophical essay on the theme "The Rise of Autonomous AI Systems and the Epistemic Crisis of the Human Subject". Analyze how algorithmic optimization influences independent decision-making and critical thinking from a philosophical perspective.',
    guidelines: 'Length: 500–800 characters • Recommended Time: 40 minutes • Required: High-register academic discourse',
    minUnits: 500,
    unitLabel: '文字 (characters)',
    recommendedMinutes: 40,
    sampleStudent: '生成AIの急速な発展は人間の知的生産活動を劇的に変革している。しかし、利便性の向上に目を奪われるあまり、アルゴリズムが提示する解を無批判に受容することは、自律的な認識主体としての人間性の危機にほかならない。我々は批判的知性を堅持し、技術との健全な緊張関係を保つべきである。',
    modelAnswer: {
      title: 'Model Essay: アルゴリズム的包摂における主体性の脱臼と批判的知性の地平 (Epistemic Agency under AI)',
      scoreLabel: 'Rating: Excellent (A+ / Band 9.0 equivalent)',
      length: 620,
      text: '現代社会において生成AIが急速に浸透する中、真に問われるべきは効率の多寡ではなく、認識論的主体性（Epistemic Agency）の空洞化という構造的危機である。アルゴリズムが潜在空間の確率的最適解を不可視の形で提示し続ける環境において、主体が自己の選好や判断を自律的決断と錯覚する事態は、知的な隷属の極みにほかならない。\n人間が単なるデータ供給者あるいは統計的帰結の受容者へと還元される事態を回避するためには、言語による分節化と自己言及的な批判的省察という、生身の思索活動を不断に反復せねばならない。技術的決定論を退け、不可知のアルゴリズム的統制に対して疑義を差し挟み続ける批判的知性こそが、今世紀における人間の尊厳の最後の砦である。',
      rationale: 'Deeply integrated philosophical critique drawing on semiotics and epistemology, with impeccable execution of peak register markers (極まりない, にほかならない).'
    },
    rubricLabels: {
      c1: 'Academic Rigor & Theoretical Stance (学術論証構造と厳密性)',
      c2: 'High-Register Scholarly Style (最高位レジスターと文末統御)',
      c3: 'Abstract Concepts & Collocations (高度抽象概念語彙と連鎖)',
      c4: 'Dialectical Synthesis (多角的論点処理と止揚)'
    }
  },
  ielts_academic: {
    title: 'IELTS Academic Writing Task 2 • Discursive Analytical Essay',
    badge: 'IELTS Academic Band 8.5 Benchmark',
    prompt: 'In recent years, rapid advancements in artificial intelligence and automation have begun replacing cognitive and professional tasks previously performed exclusively by humans. Some argue this will liberate human potential, while others fear widespread intellectual deskilling and socioeconomic dislocation. Discuss both views and give your own opinion.',
    guidelines: 'Minimum: 250 words • Recommended Time: 40 minutes • Formal Academic Register',
    minUnits: 250,
    unitLabel: 'words',
    recommendedMinutes: 40,
    sampleStudent: `In recent decades, artificial intelligence has expanded across diverse intellectual sectors once thought to be purely human. While some individuals believe this technological advancement will liberate humanity, others argue that it will cause widespread intellectual deterioration and economic instability. In this essay, I will discuss both perspectives and explain why I believe that balanced governance can make AI an empowering tool.

On the one hand, critics argue that excessive reliance on automated systems leads to intellectual deskilling. When people depend on algorithms for diagnostic evaluations and complex calculations, their cognitive abilities may gradually decline. Furthermore, automated machinery can replace a lot of routine jobs, leaving workers unemployed without immediate alternative careers.

On the other hand, proponents argue that automation enhances productivity and eliminates drudgery. By allowing machines to handle repetitive tasks, professionals can dedicate more time to creative synthesis and interpersonal relationships. For example, doctors assisted by diagnostic AI can focus more on patient interaction.

In conclusion, although the threat of deskilling and job displacement is real, proper educational reforms and ethical regulations will allow human potential to flourish alongside technology.`,
    modelAnswer: {
      title: 'Automation & Intellectual Labour (Band 8.5 Benchmark)',
      scoreLabel: 'Band 8.5 Benchmark',
      length: 312,
      text: `The ubiquitous proliferation of artificial intelligence across cognitive domains once deemed the exclusive preserve of human intellect has precipitated fierce debate. While technocentric optimists contend that autonomous algorithms will liberate humanity from computational drudgery, skeptics warn of acute intellectual atrophy and unprecedented socioeconomic dislocation. In my view, while structural disruptions are inevitable, judicious governance and educational reinvention can transform automation into an empowering cognitive catalyst.

On the one hand, apprehensions regarding intellectual deskilling are deeply substantiated. As generative models and analytical software assume responsibility for critical synthesis, diagnostic medicine, and software engineering, human practitioners risk succumbing to automated complacency. The cognitive degradation that accompanied basic mental arithmetic following the advent of digital calculators may be replicated on an exponential scale across complex problem-solving domains. Furthermore, without substantial social safety nets, displaced knowledge workers may struggle to transition into nascent industries, exacerbating socioeconomic bifurcation.

Conversely, proponents legitimately argue that automation historically shifts human enterprise up the value curve. By delegating iterative data processing and rote syntactical analysis to machines, professionals can redirect their focus toward conceptual creativity, philosophical inquiry, and empathetic leadership. In healthcare, for instance, algorithms capable of interpreting radiological scans with superior accuracy do not render physicians obsolete; rather, they enable practitioners to allocate greater temporal resources to holistic patient dialogue and complex palliative decisions. Thus, human agency is elevated rather than extinguished.

In conclusion, the transformative potential of artificial intelligence is neither inherently emancipatory nor disastrous. To prevent pervasive cognitive atrophy and economic disparity, educational institutions must pivot from memorization to high-order dialectical reasoning, and policymakers must enforce robust transitional frameworks. Provided these safeguards are enacted, automation will serve as an indispensable cognitive partner rather than a replacement for human intellect.`,
      rationale: 'Clear personal position maintained throughout. Rich academic vocabulary (ubiquitous proliferation, cognitive catalyst, intellectual deskilling, socioeconomic bifurcation) with varied subordinate clauses and seamless cohesive transitions.'
    },
    rubricLabels: {
      c1: 'Task Response (TR)',
      c2: 'Coherence & Cohesion (CC)',
      c3: 'Lexical Resource (LR)',
      c4: 'Grammatical Range & Accuracy (GRA)'
    }
  },
  ielts_general: {
    title: 'IELTS General Training Writing Task 1 • Formal Customer Complaint',
    badge: 'IELTS General Band 8.5 Benchmark',
    prompt: 'You recently purchased an expensive home appliance (a state-of-the-art washing machine) from a reputable department store, but it malfunctioned within three days of delivery, causing water damage to your flooring. The store customer service refused a prompt refund. Write a formal letter of complaint to the store general manager explaining the purchase, detailing the damage and unhelpful response, and stating what specific remedy you require.',
    guidelines: 'Minimum: 150 words • Recommended Time: 20 minutes • Formal Correspondence Register',
    minUnits: 150,
    unitLabel: 'words',
    recommendedMinutes: 20,
    sampleStudent: `Dear Store Manager,

I am writing to express my profound dissatisfaction with both a recent appliance purchase and the subsequent treatment I received from your customer support staff. On November 14, I purchased an Apex HydroClean Washing Machine (Receipt #49281) costing $1,400 from your central branch.

Regrettably, upon its second operational cycle on November 17, the internal drainage pump failed catastrophically, discharging gallons of water across my utility room and warping the hardwood parquet flooring. When I contacted your service desk immediately, representative Mr. Vance dismissed my request for an urgent technician or replacement, asserting that warranty inspections require a three-week backlog.

This response is entirely unacceptable under statutory consumer rights. I expect a full reimbursement of the appliance price and an on-site damage assessment by your insurers by Friday.

Yours sincerely,
Marcus Wright`,
    modelAnswer: {
      title: 'Formal Letter of Complaint & Redress Demand (Band 8.5)',
      scoreLabel: 'Band 8.5 Benchmark',
      length: 198,
      text: `Dear Store Manager,

I am writing to formally register an urgent complaint regarding both a defective appliance procured from your flagship store and the dismissive response tendered by your after-sales support team.

On November 12, I purchased a premier washer-dryer unit (Model: Apex EcoWave 900; Transaction Ref: WM-88392) for £1,250. Regrettably, during its third cycle on November 15, the intake manifold ruptured, inundating my utility area and causing substantial warping to the timber floorboards. When I contacted your customer care department that afternoon seeking an expedited replacement, your representative was remarkably unaccommodating, declaring that technician dispatch is subject to an inflexible three-week waiting window.

As this equipment failed within days of acquisition, your store is legally obligated under consumer protection legislation to provide an immediate and effective remedy. Consequently, I require an unconditional refund of the £1,250 purchase price, accompanied by formal dispatch of a certified assessor within five working days to quantify compensation for flooring repairs.

Failing a satisfactory response by November 22, I shall escalate this grievance to the Consumer Ombudsman.

Yours sincerely,
Elena Vance`,
      rationale: 'Flawless formal epistolary conventions maintained throughout. Firm, assertive yet courteous tone with precise legal and functional collocations (statutory consumer rights, expedited replacement, intake manifold ruptured).'
    },
    rubricLabels: {
      c1: 'Task Achievement (TA)',
      c2: 'Coherence & Cohesion (CC)',
      c3: 'Lexical Resource (LR)',
      c4: 'Grammatical Range & Accuracy (GRA)'
    }
  }
};

studioRouter.post('/writing/evaluate', (req: Request, res: Response) => {
  const essayText = req.body.essayText || req.body.essay;
  const level = (req.body.level as string) || 'ielts_academic';

  if (!essayText || typeof essayText !== 'string') {
    return res.status(400).json({ error: 'essayText string is required' });
  }

  // Bounds check (max 50,000 characters)
  const boundedText = essayText.slice(0, 50000);

  // If Japanese track, evaluate with Japanese rubric engine
  if (level.startsWith('jlpt_')) {
    const config = WRITING_PROMPTS_BY_LEVEL[level] || WRITING_PROMPTS_BY_LEVEL.jlpt_n5;
    const charCount = boundedText.replace(/\s+/g, '').length;
    const satisfied = charCount >= config.minUnits;

    // Japanese linguistic heuristic checks
    const hasPolite = /です|ます|でした|ました|ではありません/.test(boundedText);
    const particleMatches = boundedText.match(/[はがをにでへともからまで]/g) || [];
    const particleVariety = new Set(particleMatches).size;

    let c1Score = 7.0; // Grammar & Particles
    if (particleVariety >= 4) c1Score = 8.5;
    else if (particleVariety >= 2) c1Score = 7.5;
    else c1Score = 6.0;

    let c2Score = 7.0; // Register & Form
    if (hasPolite) c2Score = 8.5;
    else c2Score = 6.5;

    let c3Score = 7.0; // Vocabulary & Length
    if (satisfied && charCount >= config.minUnits + 50) c3Score = 8.5;
    else if (satisfied) c3Score = 7.5;
    else c3Score = Math.max(5.0, 7.0 - (config.minUnits - charCount) * 0.03);

    let c4Score = 7.5; // Flow & Coherence
    if (boundedText.includes('そして') || boundedText.includes('それから') || boundedText.includes('しかし') || boundedText.includes('したがって') || boundedText.includes('反面')) {
      c4Score = 8.5;
    }

    const avg = (c1Score + c2Score + c3Score + c4Score) / 4;
    const overallBand = Math.round(avg * 2) / 2;

    const annotatedCorrections = [];
    if (!hasPolite && level === 'jlpt_n5') {
      annotatedCorrections.push({
        type: 'grammar' as const,
        originalText: 'だ / である',
        suggestion: 'です / ます',
        reason: 'For N5 foundational writing, polite forms (です・ます調) are expected.'
      });
    }

    if (charCount < config.minUnits) {
      annotatedCorrections.push({
        type: 'vocabulary' as const,
        originalText: `Current Length: ${charCount} characters`,
        suggestion: `Minimum Recommended: ${config.minUnits} characters`,
        reason: `To avoid penalties for insufficient length, describe your daily activities or personal thoughts in more detail.`
      });
    }

    return res.json({
      overallBand,
      wordCount: charCount,
      wordCountSatisfied: satisfied,
      criteria: {
        taskResponseOrAchievement: {
          score: c1Score,
          feedback: `${config.rubricLabels.c1}: Grammatical structures and case particles are correctly deployed.`
        },
        coherenceAndCohesion: {
          score: c2Score,
          feedback: `${config.rubricLabels.c2}: Consistent register and clear transitions between sentences.`
        },
        lexicalResource: {
          score: c3Score,
          feedback: `${config.rubricLabels.c3}: Vocabulary and kanji appropriate for the target level are effectively used.`
        },
        grammaticalRangeAndAccuracy: {
          score: c4Score,
          feedback: `${config.rubricLabels.c4}: Sentence connection and overall meaning clarity are well maintained.`
        }
      },
      annotatedCorrections
    });
  }

  // Otherwise, use English IELTS engine
  const taskType = Number(req.body.taskType) === 1 || level === 'ielts_general' ? 1 : 2;
  const result = evaluateIELTSWriting(taskType, boundedText);
  res.json(result);
});

studioRouter.get('/writing/model-answer', (req: Request, res: Response) => {
  const level = (req.query.level as string) || 'ielts_academic';
  const config = WRITING_PROMPTS_BY_LEVEL[level] || WRITING_PROMPTS_BY_LEVEL.ielts_academic;

  res.json({
    level,
    title: config.modelAnswer.title,
    prompt: config.prompt,
    wordCount: config.modelAnswer.length,
    bandScore: config.modelAnswer.scoreLabel,
    essay: config.modelAnswer.text,
    rationale: config.modelAnswer.rationale,
    config
  });
});

studioRouter.get('/writing/prompt', (req: Request, res: Response) => {
  const level = (req.query.level as string) || 'jlpt_n5';
  const config = WRITING_PROMPTS_BY_LEVEL[level] || WRITING_PROMPTS_BY_LEVEL.jlpt_n5;
  res.json(config);
});
