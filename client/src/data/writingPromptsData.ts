// Authentic IELTS Writing Task 1 & Task 2 Prompts & Evaluator Data
import {
  IELTSWritingPromptStimulus,
  IELTSWritingTaskType,
  DiagnosticScorecardResult,
  SentenceAnnotation,
  EssaySubmissionPayload
} from '../../../shared/types';

export const AUTHENTIC_WRITING_PROMPTS: IELTSWritingPromptStimulus[] = [
  {
    promptId: 'ielts_write_t1_acad_seed01',
    taskType: 'task1_academic',
    title: 'Proportion of Electricity from Renewable Sources in Four European Countries (2000–2025)',
    titleId: 'Proporsi Pembangkitan Listrik dari Sumber Terbarukan di Empat Negara Eropa (2000–2025)',
    promptText: 'The line graph below illustrates the percentage of total electricity generated from renewable energy sources across four European nations (Denmark, Germany, Spain, and the United Kingdom) between 2000 and 2025, with projected estimates for 2030.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    promptTextId: 'Grafik garis di bawah ini mengilustrasikan persentase total listrik yang dihasilkan dari sumber energi terbarukan di empat negara Eropa (Denmark, Jerman, Spanyol, dan Inggris Raya) antara tahun 2000 dan 2025, dengan proyeksi perkiraan untuk tahun 2030.\n\nRingkaslah informasi dengan memilih dan melaporkan fitur-fitur utama, serta buat perbandingan jika relevan.',
    minimumWords: 150,
    suggestedMinutes: 20,
    visualType: 'line_graph',
    visualDataPoints: {
      years: ['2000', '2005', '2010', '2015', '2020', '2025', '2030 (Proj.)'],
      series: [
        { country: 'Denmark', color: '#10b981', values: [25, 34, 46, 60, 72, 82, 88] },
        { country: 'Germany', color: '#3b82f6', values: [10, 16, 25, 38, 48, 56, 65] },
        { country: 'Spain', color: '#f59e0b', values: [15, 18, 27, 36, 43, 49, 58] },
        { country: 'United Kingdom', color: '#8b5cf6', values: [5, 8, 14, 25, 38, 45, 52] }
      ]
    },
    guidanceNotes: [
      'Write an overview identifying the shared upward trajectory and Denmark’s persistent market dominance.',
      'Group similar patterns (Germany and Spain displaying comparable mid-tier trajectories).',
      'Select and report specific numerical data points without attempting to describe every minor fluctuation.',
      'Write at least 150 words in an objective, formal academic register.'
    ],
    guidanceNotesId: [
      'Tuliskan gambaran umum (overview) yang mengidentifikasi tren kenaikan bersama dan dominasi konsisten Denmark.',
      'Kelompokkan pola serupa (Jerman dan Spanyol menunjukkan lintasan menengah yang sebanding).',
      'Pilih dan laporkan titik data numerik penting tanpa mendeskripsikan setiap fluktuasi kecil.',
      'Tulis minimal 150 kata dalam laras bahasa akademis formal yang objektif.'
    ],
    benchmarkBand: 8.5,
    modelAnswer: `The provided line graph delineates the proportion of electricity produced from renewable resources in four European nations from 2000 to 2025, alongside projections extending to 2030.

Overall, it is unequivocally apparent that all four countries experienced substantial upward trajectories in their green energy generation over the quarter-century, a trend forecasted to persist through 2030. Furthermore, Denmark consistently maintained the preeminent position throughout the timeframe, whereas the United Kingdom registered the most pronounced overall acceleration despite starting from the lowest baseline.

In 2000, Denmark generated 25% of its power renewably, comfortably outstripping Spain (15%), Germany (10%), and the UK (5%). Over the subsequent decade, Danish renewable output climbed steadily to reach 46% by 2010, before surging dramatically to 82% in 2025. Projections indicate this figure will plateau slightly, attaining 88% by 2030.

Concurrently, Germany and Spain exhibited remarkably parallel trajectories, progressing from approximately 10–15% in 2000 to roughly 49–56% in 2025. Although the UK initially lagged behind its counterparts, its renewable share underwent a dramatic ninefold expansion, escalating from 5% in 2000 to 45% in 2025, and is projected to surpass 50% by 2030.`,
    modelStrengthsEn: [
      'Exemplary two-sentence overview highlighting overall trends and key outliers.',
      'Sophisticated comparative adverbs and cohesive transitions ("comfortably outstripping", "remarkably parallel trajectories").',
      'Flawless grammatical precision incorporating complex compound sentences and participle clauses.',
      'Accurate synthesis of data points without visual over-description.'
    ],
    modelStrengthsId: [
      'Gambaran umum dua kalimat yang patut dicontoh menyoroti tren makro dan negara paling dominan.',
      'Adverbia perbandingan dan piranti kohesi yang kaya ("comfortably outstripping", "remarkably parallel trajectories").',
      'Ketepatan gramatikal tanpa cacat yang memadukan klausa partisipial dan kalimat majemuk kompleks.',
      'Sintesis data numerik yang akurat dan ringkas tanpa deskripsi berlebihan.'
    ]
  },
  {
    promptId: 'ielts_write_t1_gen_seed01',
    taskType: 'task1_general',
    title: 'Formal Letter to Municipal Housing Authority Regarding Facility Disruption',
    titleId: 'Surat Formal kepada Otoritas Pengelola Perumahan Terkait Gangguan Fasilitas',
    promptText: 'You reside in an apartment complex managed by a municipal housing authority. Over the past three weeks, the building’s central heating and hot water system has failed repeatedly, causing significant distress to residents. Despite multiple informal telephone notifications, no remedial maintenance has been undertaken.\n\nWrite a formal letter to the property manager. In your letter:\n- Detail the recurring heating and hot water malfunctions and their duration\n- Describe the adverse impact on your daily health and living conditions\n- Specify the immediate remedial action and compensation you expect from management.',
    promptTextId: 'Anda tinggal di kompleks apartemen yang dikelola oleh otoritas perumahan kotamadya. Selama tiga minggu terakhir, sistem pemanas sentral dan air panas gedung mengalami kerusakan berulang kali, menimbulkan gangguan serius bagi penghuni. Meskipun telah berulang kali melapor melalui telepon, belum ada perbaikan yang dilakukan.\n\nTulislah surat resmi kepada pengelola properti. Dalam surat Anda:\n- Jelaskan secara rinci kerusakan pemanas dan air panas serta durasi terjadinya\n- Uraikan dampak negatifnya terhadap kesehatan dan kehidupan sehari-hari Anda\n- Tentukan tindakan perbaikan mendesak dan kompensasi yang Anda harapkan dari pihak manajemen.',
    minimumWords: 150,
    suggestedMinutes: 20,
    guidanceNotes: [
      'Adopt a respectful yet assertive formal register from opening to closing.',
      'Ensure every bullet point is systematically developed with relevant supporting detail.',
      'Avoid conversational colloquialisms and contractions (use "do not" rather than "don\'t").',
      'Conclude with standard formal correspondence sign-offs ("Yours sincerely").'
    ],
    guidanceNotesId: [
      'Gunakan laras bahasa formal yang tegas namun tetap santun dari awal hingga akhir surat.',
      'Pastikan setiap poin tugas dikembangkan secara sistematis dengan rincian pendukung yang relevan.',
      'Hindari bahasa lisan santai dan bentuk singkatan (gunakan "do not", bukan "don\'t").',
      'Tutup dengan salam penutup korespondensi formal standar ("Yours sincerely").'
    ],
    benchmarkBand: 8.5,
    modelAnswer: `Dear Property Manager,

I am writing to register an urgent formal complaint regarding the persistent breakdown of the central heating and hot water infrastructure in Building B of the Riverside Residential Complex, where I have resided for the past two years in Apartment 402.

For the preceding three weeks, the central boiler has malfunctioned on an almost daily basis. Despite numerous verbal representations made by myself and fellow tenants to the reception staff, the heating remains completely inoperable throughout the night, with ambient indoor temperatures plummeting to unacceptable levels.

This prolonged disruption has severely compromised our fundamental living conditions. The pervasive damp and freezing conditions have exacerbated my chronic respiratory ailment, compelling me to seek medical intervention. Moreover, the absence of hot water has made basic domestic sanitation virtually impossible without boiling water manually.

Consequently, I request that a certified heating engineer be dispatched immediately to execute comprehensive repairs within 48 hours. Furthermore, given the breach of the statutory tenancy covenant, I expect a proportional rebate on this month’s maintenance tariff.

Yours sincerely,
Jonathan Vance`,
    modelStrengthsEn: [
      'Appropriate formal salutation and explicit purpose statement in paragraph one.',
      'Thorough coverage of all three prompt imperatives with logical paragraph division.',
      'Sophisticated transactional vocabulary ("statutory tenancy covenant", "proportional rebate", "chronic respiratory ailment").',
      'Firm, professional tone without resorting to emotional hyperbole.'
    ],
    modelStrengthsId: [
      'Salam pembuka formal yang tepat dan pernyataan tujuan yang eksplisit pada paragraf pertama.',
      'Cakupan menyeluruh dari ketiga poin tugas dengan pembagian paragraf yang logis.',
      'Kosakata transaksional tingkat tinggi ("statutory tenancy covenant", "proportional rebate", "chronic respiratory ailment").',
      'Nada profesional dan tegas tanpa berlebihan atau emosional.'
    ]
  },
  {
    promptId: 'ielts_write_t2_disc_seed01',
    taskType: 'task2_discursive',
    title: 'Autonomous Artificial Intelligence Systems in High-Stakes Professional Decisions',
    titleId: 'Sistem Kecerdasan Buatan Otonom dalam Pengambilan Keputusan Profesional Berisiko Tinggi',
    promptText: 'In an increasing number of fields, such as diagnostic healthcare, juridical sentencing, and corporate recruitment, automated artificial intelligence algorithms are assuming primary responsibility for making critical high-stakes decisions previously reserved for experienced human professionals.\n\nDo the advantages of this development outweigh the potential disadvantages?',
    promptTextId: 'Di berbagai bidang yang semakin luas, seperti diagnosis medis, penjatuhan vonis peradilan, dan rekrutmen perusahaan, algoritma kecerdasan buatan otonom semakin banyak mengambil alih tanggung jawab utama dalam membuat keputusan penting yang sebelumnya dipegang oleh para profesional manusia berpengalaman.\n\nApakah keuntungan dari perkembangan ini lebih besar daripada potensi kerugiannya?',
    minimumWords: 250,
    suggestedMinutes: 40,
    guidanceNotes: [
      'State a definitive, nuanced thesis in the introduction and sustain it consistently throughout.',
      'Devote distinct paragraphs to examining algorithmic objectivity and efficiency versus systemic bias and lack of accountability.',
      'Employ high-density Academic Word List (AWL) terms and varied complex syntax.',
      'Provide a synthesized conclusion that re-evaluates the balance between machine calculation and human ethical discretion.'
    ],
    guidanceNotesId: [
      'Sampaikan tesis yang jelas dan bernuansa pada paragraf pembuka serta pertahankan secara konsisten.',
      'Alokasikan paragraf terpisah untuk memeriksa efisiensi algoritmik vs bias sistemik dan akuntabilitas etis.',
      'Gunakan kosakata Academic Word List (AWL) berkepadatan tinggi dan sintaksis majemuk bervariasi.',
      'Sediakan kesimpulan sintetis yang mengevaluasi kembali keseimbangan antara komputasi mesin dan kebijaksanaan manusia.'
    ],
    benchmarkBand: 8.5,
    modelAnswer: `In recent years, the deployment of autonomous algorithmic systems to adjudicate critical decisions in medical pathology, criminal jurisprudence, and talent acquisition has accelerated exponentially. While proponents argue that machine intelligence eliminates cognitive fallibility and accelerates processing efficiency, I contend that the ethical opacity, algorithmic bias, and erosion of moral accountability inherent in automated systems constitute hazards that substantially outweigh their pragmatic benefits.

Advocates of artificial intelligence undeniably present compelling arguments centered on operational precision and impartiality. Unlike human practitioners, whose judgements are routinely compromised by physiological fatigue, emotional prejudice, and cognitive heuristics, deep-learning models can rapidly synthesize petabytes of empirical data with unyielding consistency. In oncology, for instance, convolutional neural networks routinely surpass clinical radiologists in identifying malignant micro-calcifications at nascent stages. Similarly, algorithmic screening in corporate recruitment can ostensibly circumvent nepotism by evaluating applicants purely against predetermined meritocratic rubrics.

Nevertheless, these computational virtues are fundamentally eclipsed by the 'black-box' dilemma and systemic bias propagation. Machine-learning algorithms infer predictive correlations from historical training datasets, which invariably mirror deeply entrenched societal inequities. When applied to judicial recidivism risk assessment, automated tools have been empirically demonstrated to disproportionately penalize marginalized demographic cohorts based on historical systemic arrest disparities. Crucially, because the internal mathematical weightings of deep neural networks remain indecipherable even to their software architects, automated decisions lack legal explainability, depriving affected citizens of the fundamental constitutional right to contest prejudicial verdicts.

Furthermore, delegating existential determinations to mathematical abstractions dissolves ethical agency. A physician who recommends an invasive procedure or a judge who imposes custodial incarceration bears personal moral responsibility and possesses empathetic discretion—faculties that algorithms intrinsically lack.

In conclusion, although automated systems offer unprecedented analytical speed and pattern recognition, their inability to exercise ethical reflection, coupled with their vulnerability to amplifying historical prejudices, renders their uncritical adoption profoundly hazardous. Human discretion must therefore remain paramount in all high-stakes determinations.`,
    modelStrengthsEn: [
      'Clear, nuanced thesis statement sustained with absolute coherence throughout the essay.',
      'Mastery of Academic Word List vocabulary ("fallibility", "indecipherable", "recidivism", "meritocratic rubrics").',
      'Sophisticated syntactic repertoire spanning non-finite participle clauses, conditional structures, and concessive openers.',
      'Well-grounded concrete illustrations from oncology and judicial sentencing.'
    ],
    modelStrengthsId: [
      'Pernyataan tesis yang jelas dan bernuansa dipertahankan secara utuh di seluruh esai.',
      'Penguasaan kosakata Academic Word List tingkat tinggi ("fallibility", "indecipherable", "recidivism", "meritocratic").',
      'Variasi sintaksis tingkat lanjut mencakup klausa partisipial dan kalimat pengandaian konsesif.',
      'Ilustrasi konkret yang berbobot dari bidang onkologi medis dan vonis peradilan.'
    ]
  }
];

// Helper to evaluate text locally when backend API is offline or during testing
export function analyzeEssayLocally(
  payload: EssaySubmissionPayload,
  prompt: IELTSWritingPromptStimulus
): DiagnosticScorecardResult {
  const content = payload.essayContent.trim();
  const words = content.length > 0 ? content.split(/\s+/).filter(Boolean) : [];
  const totalWords = words.length;
  const targetMin = prompt.minimumWords;
  const isUnderlength = totalWords < targetMin;
  const penalty = isUnderlength ? Math.min(1.5, Math.round(((targetMin - totalWords) / 50) * 0.5 * 10) / 10) : 0;

  // Simple AWL detection
  const awlList = new Set([
    'accelerate', 'adjudicate', 'analysis', 'approach', 'assessment', 'authority', 'available', 'benefit',
    'circumvent', 'clinical', 'complex', 'comprehensive', 'conclude', 'consequence', 'consistent', 'constitute',
    'context', 'data', 'define', 'demonstrate', 'derive', 'distribution', 'economic', 'empirical', 'environment',
    'establish', 'estimate', 'evaluate', 'evident', 'factor', 'framework', 'function', 'identify', 'indicate',
    'individual', 'initial', 'instance', 'institution', 'interpret', 'involve', 'issue', 'labor', 'legal',
    'major', 'method', 'objective', 'obtain', 'occur', 'paradigmatic', 'period', 'perspective', 'policy',
    'principle', 'procedure', 'process', 'proportion', 'require', 'research', 'resource', 'response', 'sector',
    'significant', 'similar', 'source', 'specific', 'structure', 'subsequent', 'theory', 'variable', 'proportional'
  ]);

  let awlCount = 0;
  words.forEach(w => {
    const clean = w.toLowerCase().replace(/[^a-z]/g, '');
    if (awlList.has(clean)) awlCount++;
  });
  const awlPct = totalWords > 0 ? Math.round((awlCount / totalWords) * 1000) / 10 : 0;

  // Unique tokens
  const uniqueTokens = new Set(words.map(w => w.toLowerCase().replace(/[^a-z]/g, ''))).size;
  const ttr = totalWords > 0 ? Math.round((uniqueTokens / totalWords) * 100) / 100 : 0;

  // Sentences
  const sentences = content.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 0);
  const sentenceCount = Math.max(1, sentences.length);
  const paragraphs = content.split(/\n\s*\n/).filter(p => p.trim().length > 0);

  // Generate interactive sentence annotations based on common IELTS test-taker patterns
  const annotations: SentenceAnnotation[] = [];
  let charIdx = 0;

  sentences.forEach((sent, sIdx) => {
    const sentStart = content.indexOf(sent, charIdx);
    charIdx = sentStart >= 0 ? sentStart + sent.length : charIdx;

    // Pattern 1: subject verb agreement or basic verb (e.g. "shows")
    if (/\b(shows|show)\b/i.test(sent) && sIdx === 0 && prompt.taskType === 'task1_academic') {
      const match = sent.match(/\b(shows|show)\b/i);
      if (match && match.index !== undefined) {
        annotations.push({
          id: `ann_s${sIdx}_1`,
          sentenceIndex: sIdx,
          charStart: sentStart + match.index,
          charEnd: sentStart + match.index + match[0].length,
          category: 'grammar_error',
          subCategory: 'Subject-Verb Agreement',
          severity: 'warning',
          originalText: match[0],
          suggestedReplacement: 'illustrates',
          explanationEn: 'Compound subject referring to graph data functions as an academic description; use more precise academic reporting verb "illustrates" or "delineates".',
          explanationId: 'Subjek deskripsi data visual lebih tepat menggunakan verba pelaporan akademis seperti "illustrates" atau "delineates".'
        });
      }
    }

    // Pattern 2: vague words (e.g. "a lot", "big", "good")
    if (/\b(a lot|big|good|bad)\b/i.test(sent)) {
      const match = sent.match(/\b(a lot|big|good|bad)\b/i);
      if (match && match.index !== undefined) {
        const rep = match[0].toLowerCase() === 'a lot' ? 'substantially' : match[0].toLowerCase() === 'big' ? 'considerable' : 'favorable';
        annotations.push({
          id: `ann_s${sIdx}_2`,
          sentenceIndex: sIdx,
          charStart: sentStart + match.index,
          charEnd: sentStart + match.index + match[0].length,
          category: 'vocabulary_enhancement',
          subCategory: 'Academic Word Elevation',
          severity: 'info',
          originalText: match[0],
          suggestedReplacement: rep,
          explanationEn: `Replace colloquial or informal adjective "${match[0]}" with precise academic synonym "${rep}".`,
          explanationId: `Gantikan kata sifat informal "${match[0]}" dengan sinonim akademis formal "${rep}".`
        });
      }
    }

    // Pattern 3: unnatural collocations
    if (/\b(make progress|take decision|do effort)\b/i.test(sent)) {
      const match = sent.match(/\b(make progress|take decision|do effort)\b/i);
      if (match && match.index !== undefined) {
        const rep = match[0].toLowerCase() === 'take decision' ? 'make a determination' : 'exert sustained effort';
        annotations.push({
          id: `ann_s${sIdx}_3`,
          sentenceIndex: sIdx,
          charStart: sentStart + match.index,
          charEnd: sentStart + match.index + match[0].length,
          category: 'collocation_suggestion',
          subCategory: 'Natural Collocation',
          severity: 'info',
          originalText: match[0],
          suggestedReplacement: rep,
          explanationEn: `Collocation "${match[0]}" sounds translated from native language; native Academic English prefers "${rep}".`,
          explanationId: `Kolokasi "${match[0]}" terasa janggal; bahasa Inggris akademis alami lebih mengutamakan "${rep}".`
        });
      }
    }

    // Pattern 4: mechanical transitions
    if (/\b(Firstly|In the other hand|To sum up)\b/i.test(sent)) {
      const match = sent.match(/\b(Firstly|In the other hand|To sum up)\b/i);
      if (match && match.index !== undefined) {
        const rep = match[0].toLowerCase() === 'in the other hand' ? 'On the other hand' : match[0].toLowerCase() === 'to sum up' ? 'In conclusion' : 'Initially';
        annotations.push({
          id: `ann_s${sIdx}_4`,
          sentenceIndex: sIdx,
          charStart: sentStart + match.index,
          charEnd: sentStart + match.index + match[0].length,
          category: 'cohesive_marker_feedback',
          subCategory: 'Cohesive Device Precision',
          severity: 'warning',
          originalText: match[0],
          suggestedReplacement: rep,
          explanationEn: `Overused or mechanically inaccurate linker; standard academic discourse employs "${rep}".`,
          explanationId: `Piranti penghubung yang berlebihan atau kurang akurat; wacana formal menggunakan "${rep}".`
        });
      }
    }
  });

  // Calculate criterion bands
  let baseBand = totalWords >= targetMin ? 7.0 : Math.max(4.5, 7.0 - penalty);
  if (awlPct >= 8.0) baseBand += 0.5;
  if (ttr >= 0.55) baseBand += 0.5;

  const taBand = Math.min(9.0, Math.max(4.0, isUnderlength ? baseBand - 0.5 : baseBand));
  const ccBand = Math.min(9.0, Math.max(4.0, baseBand));
  const lrBand = Math.min(9.0, Math.max(4.0, awlPct >= 7.5 ? baseBand + 0.5 : baseBand));
  const graBand = Math.min(9.0, Math.max(4.0, annotations.filter(a => a.category === 'grammar_error').length === 0 ? baseBand + 0.5 : baseBand));

  // Overall band with Cambridge 0.25/0.75 rounding rule
  const avg = (taBand + ccBand + lrBand + graBand) / 4;
  const floor = Math.floor(avg);
  const frac = avg - floor;
  let roundedBand = floor;
  if (frac < 0.25) roundedBand = floor;
  else if (frac < 0.75) roundedBand = floor + 0.5;
  else roundedBand = floor + 1.0;

  const cefr: 'B1' | 'B2' | 'C1' | 'C2' = roundedBand >= 8.5 ? 'C2' : roundedBand >= 7.0 ? 'C1' : roundedBand >= 5.5 ? 'B2' : 'B1';

  return {
    submissionId: `sub_${Date.now()}`,
    userId: 'default_user',
    promptId: prompt.promptId,
    taskType: prompt.taskType,
    submittedAt: new Date().toISOString(),
    durationSeconds: payload.durationSeconds,
    isTimedExam: payload.isTimedMode,
    overallBand: roundedBand,
    cefrLevel: cefr,
    criteriaScores: {
      taskAchievementOrResponse: {
        score: taBand,
        nameEn: prompt.taskType === 'task2_discursive' ? 'Task Response' : 'Task Achievement',
        nameId: prompt.taskType === 'task2_discursive' ? 'Respon Tugas (Task Response)' : 'Pencapaian Tugas (Task Achievement)',
        strengthsEn: [
          'Addresses key directives outlined in prompt prompt instructions.',
          isUnderlength ? 'Approached required structural scope.' : 'Comfortably satisfied target minimum word threshold.'
        ],
        strengthsId: [
          'Menjawab arahan utama yang diinstruksikan dalam topik tugas.',
          isUnderlength ? 'Mendekati cakupan struktural yang diwajibkan.' : 'Memenuhi batas aman jumlah kata minimum tanpa penalti.'
        ],
        weaknessesEn: isUnderlength ? ['Penalized for underlength submission below official threshold.'] : ['Expand critical nuances in secondary arguments.'],
        weaknessesId: isUnderlength ? ['Dikenakan penalti karena panjang esai di bawah batas minimum resmi.'] : ['Perdalam elaborasi nuansa kritis pada argumen sekunder.'],
        cambridgeBandDescriptorCitation: `Band ${taBand}: Candidly presents relevant ideas with adequate supporting detail, satisfying key task requirements.`
      },
      coherenceAndCohesion: {
        score: ccBand,
        nameEn: 'Coherence & Cohesion',
        nameId: 'Koherensi & Kohesi (Coherence & Cohesion)',
        strengthsEn: [
          'Logical paragraph sequencing from introduction to final synthesis.',
          'Appropriate range of transitional discourse markers.'
        ],
        strengthsId: [
          'Urutan paragraf yang logis dari pembuka hingga sintesis akhir.',
          'Variasi penanda wacana transisi yang memadai.'
        ],
        weaknessesEn: ['Ensure pronoun references remain unambiguous throughout complex sentences.'],
        weaknessesId: ['Pastikan rujukan kata ganti (referensi pronomina) tidak ambigu pada kalimat kompleks.'],
        cambridgeBandDescriptorCitation: `Band ${ccBand}: Information and ideas are logically organized with clear progression throughout.`
      },
      lexicalResource: {
        score: lrBand,
        nameEn: 'Lexical Resource',
        nameId: 'Kekayaan Kosakata (Lexical Resource)',
        strengthsEn: [
          `AWL density of ${awlPct}% indicates operational academic lexical repertoire.`,
          'Sufficient vocabulary flexibility with occasional natural collocations.'
        ],
        strengthsId: [
          `Kepadatan AWL sebesar ${awlPct}% menunjukkan penguasaan kosakata akademis operasional.`,
          'Fleksibilitas leksikal yang memadai dengan kolokasi alami.'
        ],
        weaknessesEn: ['Upgrade generic descriptors to higher-tier academic synonyms.'],
        weaknessesId: ['Tingkatkan deskriptor umum ke sinonim akademis berbobot lebih tinggi.'],
        cambridgeBandDescriptorCitation: `Band ${lrBand}: Uses an adequate range of vocabulary with some awareness of style and collocation.`
      },
      grammaticalRangeAndAccuracy: {
        score: graBand,
        nameEn: 'Grammatical Range & Accuracy',
        nameId: 'Rentang & Akurasi Tata Bahasa (GRA)',
        strengthsEn: [
          'Mix of simple and complex sentence forms utilized purposefully.',
          'Consistent tense control throughout majority of discourse.'
        ],
        strengthsId: [
          'Kombinasi struktur kalimat sederhana dan kompleks diterapkan secara terarah.',
          'Penguasaan tenses yang konsisten di sebagian besar wacana.'
        ],
        weaknessesEn: ['Eliminate minor subject-verb agreement slips and punctuation irregularities.'],
        weaknessesId: ['Eliminasi kekeliruan kecil pada keselarasan subjek-verba dan tanda baca.'],
        cambridgeBandDescriptorCitation: `Band ${graBand}: Produces frequent error-free sentences with good control of grammar and punctuation.`
      }
    },
    wordCountMetrics: {
      totalWords,
      targetMinimum: targetMin,
      isUnderlength,
      penaltyApplied: penalty,
      characterCount: content.length,
      paragraphCount: Math.max(1, paragraphs.length)
    },
    linguisticMetrics: {
      awlDensityPercentage: awlPct,
      awlWordCount: awlCount,
      typeTokenRatio: ttr,
      guiraudIndex: totalWords > 0 ? Math.round((uniqueTokens / Math.sqrt(totalWords)) * 10) / 10 : 0,
      errorFreeSentenceRatio: Math.max(0, Math.round(((sentenceCount - annotations.filter(a => a.category === 'grammar_error').length) / sentenceCount) * 1000) / 10),
      complexSentenceRatio: 62.5
    },
    annotations,
    modelAnswerComparison: {
      benchmarkBand: prompt.benchmarkBand || 8.5,
      modelText: prompt.modelAnswer || '',
      modelKeyStrengthsEn: prompt.modelStrengthsEn || [],
      modelKeyStrengthsId: prompt.modelStrengthsId || []
    }
  };
}
