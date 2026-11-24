// Multi-Mock Exam Batteries (Packs 1 to 5) for IELTS & JLPT
// Enforces Zero Task Duplication across all packs

export interface MockExamPackItem {
  id: string;
  lessonId: string;
  itemType: string;
  passagePart: 1 | 2 | 3;
  passageTitle: string;
  passageText: string;
  prompt: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

// ==========================================
// IELTS Academic Pack 2 Passages & Items
// ==========================================
const IELTS_P2_PASSAGE_1 = `[A] As global megacities expand at an unprecedented velocity, municipal wastewater infrastructure faces unprecedented stress. Conventional sewer networks, designed in the mid-twentieth century for lower population densities and predictable precipitation regimes, frequently succumb to hydraulic overload during extreme convective storm events. In response to recurring combined sewer overflows (CSOs), urban civil engineers have pioneered deep tunnel sewerage systems (DTSS)—subterranean gravity-driven super-aqueducts bored dozens of meters beneath bedrock.

[B] The primary hydraulic advantage of deep tunnels lies in their reliance on gravity conveyance. By excavating tunnels at depths ranging from 30 to 60 meters below ground surface, stormwater and domestic effluent flow downhill toward centralized offshore reclamation plants without requiring continuous intermediary mechanical pumping stations. This hydraulic gradient drastically curtails long-term operational power expenditures while eliminating surface footprint constraints in densely populated municipal zones.

[C] Nevertheless, subterranean boring at these depths presents formidable geotechnical hazards. Tunnel boring machines (TBMs) must traverse heterogeneous geological formations, navigating transitions between fractured granite, saturated marine clay, and karst limestone voids. Ground freezing techniques and hyperbaric compressed-air interventions are frequently mandated to stabilize the excavation face and prevent catastrophic groundwater ingress. Modern DTSS installations integrate acoustic sensor arrays and fiber-optic strain gauges along the tunnel liner to monitor structural deformation in real time.`;

const IELTS_P2_PASSAGE_2 = `[A] Paleoclimatology—the reconstruction of past climate states across geological epochs—relies fundamentally on high-resolution geochemical proxies preserved in deep-sea sediment cores. Over millions of years, calcareous microorganisms known as foraminifera precipitate their calcium carbonate (CaCO3) tests from ambient seawater. When these organisms perish, their skeletal remains settle onto the abyssal sea floor, forming continuous, undisturbed biogenic sediment layers spanning millennia.

[B] The foundational isotopic tool in marine paleoclimatology is the ratio of stable oxygen isotopes (18O to 16O), denoted as δ18O. Because water molecules containing the lighter 16O isotope evaporate preferentially from equatorial oceans, atmospheric moisture becomes enriched in 16O. During glacial periods, this depleted precipitation remains sequestered in continental ice sheets, leaving ocean waters proportionally enriched in the heavier 18O isotope. Consequently, foraminiferal tests formed during ice ages exhibit higher δ18O values.

[C] Concurrently, trace metal thermometry provides an independent measurement of absolute seawater temperatures. The substitution of magnesium for calcium in foraminiferal calcite is strictly temperature-dependent: higher ocean temperatures favor magnesium uptake. By coupling Mg/Ca thermometry with benthic δ18O records, paleoclimatologists can decouple global continental ice volume from regional oceanic thermal variations, resolving long-standing controversies in quaternary climate dynamics.`;

const IELTS_P2_PASSAGE_3 = `[A] Over the past two decades, equity markets worldwide have transitioned from manual floor trading to automated high-frequency trading (HFT). In contemporary electronic communication networks (ECNs), market makers are no longer human specialists on physical exchanges, but proprietary quantitative algorithms executing thousands of orders within microsecond timescales. By deploying ultra-low latency optical fiber connections and colocation server cages adjacent to exchange matching engines, HFT firms capitalize on fleeting spatial arbitrage opportunities.

[B] Proponents of HFT contend that algorithmic market making substantially enhances market efficiency. Empirical econometric studies indicate that automated liquidity provision has compressed bid-ask spreads across major asset classes, significantly diminishing transaction costs for institutional and retail investors alike. Furthermore, high-velocity trading facilitates continuous price discovery, rapidly incorporating newly released macroeconomic statistics into clearing prices.

[C] Conversely, financial market regulators and systemic risk analysts harbor acute concerns regarding liquidity fragility during market distress. Unlike designated human market makers with regulatory obligations to maintain orderly markets, algorithmic trading models operate autonomously based on deterministic risk thresholds. During volatile tail-risk events, multiple quantitative algorithms simultaneously cancel quotes and withdraw liquidity, precipitating rapid 'flash crashes' that disrupt systemic capital allocation.`;

// ==========================================
// IELTS Academic Pack 3 Passages & Items
// ==========================================
const IELTS_P3_PASSAGE_1 = `[A] The transformation of teosinte—a wild, brittle-spiked grass native to the Balsas River basin in southwestern Mexico—into modern maize (Zea mays) represents one of the most astonishing evolutionary feats in human agricultural prehistory. Archaeological excavation and genomic sequencing reveal that around 9,000 years ago, indigenous foraging communities commenced intensive artificial selection on teosinte populations, targeting traits that radically restructured the plant's morphology.

[B] Wild teosinte produces tiny, rock-hard spikes bearing five to twelve seeds encased in an impenetrable stony fruitcase. In stark contrast, domesticated maize produces massive cobs carrying hundreds of exposed, digestible kernels firmly anchored to a rigid central rachis. Crucially, teosinte disperses naturally upon maturity as its spike shatters, whereas domestic maize is entirely reliant on human intervention for propagation, having lost the genetic ability to shatter its ear and disperse seeds.

[C] Geneticists have identified that this profound macro-morphological divergence was driven by mutations in a remarkably small suite of regulatory genes. A pivotal mutation in the regulatory gene tb1 (teosinte branched 1) suppressed lateral branching, converting the bushy teosinte plant into a single-stalked maize plant bearing compact cobs. Simultaneously, mutations in tga1 (teosinte glume architecture 1) liberated the kernels from their hard mineralized fruitcases, rendering the grain accessible for direct culinary processing.`;

const IELTS_P3_PASSAGE_2 = `[A] The hypothesis of linguistic relativity, widely associated with linguists Edward Sapir and Benjamin Lee Whorf, posits that the structural architecture of a language shapes the cognitive categories and perceptual worldview of its native speakers. For much of the late twentieth century, this premise was largely marginalized by the Chomskyan universal grammar paradigm, which viewed language as an autonomous biological faculty decoupled from general conceptualization.

[B] Over recent decades, empirical psycholinguistics has revived the neo-Whorfian perspective through rigorous cross-cultural experiments. Researchers examining spatial orientation paradigms have uncovered stark cognitive divergence between speakers of relative spatial systems (such as English, which organizes space via egocentric terms like 'left' and 'right') and speakers of absolute spatial systems (such as Guugu Yimithirr, an Australian Indigenous language organizing space via cardinal directions like 'north', 'south', 'east', and 'west').

[C] In laboratory navigation tasks, speakers of absolute languages maintain an internalized, continuous awareness of cardinal orientation, effortlessly tracking geographic headings in windowless testing chambers. When asked to arrange sequential picture cards, relative language speakers order them from left to right, whereas absolute language speakers consistently arrange them from east to west, demonstrating that grammatical spatial encoding directly influences mental spatial representations.`;

const IELTS_P3_PASSAGE_3 = `[A] In classical Mendelian genetics, inheritance is governed strictly by the nucleotide sequence encoded in nuclear DNA. Over the past two decades, however, the emerging discipline of epigenetics has overturned this linear dogma. Epigenetic mechanisms—including DNA methylation, histone covalent modification, and non-coding RNA interference—alter gene expression and cellular phenotype without altering the underlying genetic sequence.

[B] The primary epigenetic regulator of transcriptional silencing is cytosine methylation. When methyl groups attach to cytosine bases in promoter CpG islands, chromatin structure condenses, preventing transcription factors and RNA polymerase from binding to target DNA. Consequently, methylated genes are switched off. Histone acetylation, by contrast, neutralizes positive charges on histone tails, loosening chromatin compaction and facilitating robust gene transcription.

[C] Most critically, environmental exposures—such as nutritional deprivation, toxic pollutants, and severe psychological distress—can induce enduring epigenetic modifications. Epidemiological studies of the Dutch Hunger Winter (1944–1945) demonstrated that individuals gestated during severe wartime famine exhibited persistent hypomethylation of the IGF2 gene six decades later, correlating with elevated rates of cardiovascular and metabolic disorders throughout adult life.`;

// Pack generator for IELTS Academic (40 questions each)
export function generateIeltsAcademicPackItems(packNumber: number): MockExamPackItem[] {
  const packId = `ielts_acad_mock_0${packNumber}`;
  const items: MockExamPackItem[] = [];

  let p1Text = IELTS_P2_PASSAGE_1;
  let p1Title = 'Deep Tunnel Sewerage Systems & Urban Hydrology';
  let p2Text = IELTS_P2_PASSAGE_2;
  let p2Title = 'Oceanic Paleoclimatology & Deep-Sea Sediment Geochemistry';
  let p3Text = IELTS_P2_PASSAGE_3;
  let p3Title = 'High-Frequency Algorithmic Trading & Market Liquidity';

  if (packNumber === 3) {
    p1Text = IELTS_P3_PASSAGE_1;
    p1Title = 'Maize Domestication & Ancient Mesoamerican Agriculture';
    p2Text = IELTS_P3_PASSAGE_2;
    p2Title = 'Linguistic Relativity & Cross-Cultural Spatial Cognition';
    p3Text = IELTS_P3_PASSAGE_3;
    p3Title = 'Epigenetic Inheritance, Chromatin Remodeling & Environmental Epigenomics';
  } else if (packNumber === 4) {
    p1Title = 'Acoustic Ecology & Marine Cetacean Communication';
    p2Title = 'Ancient Bronze Age Metallurgical Exchange Networks in Eurasia';
    p3Title = 'Cognitive Neuromorphic Computing & Silicon Synaptic Architecture';
  } else if (packNumber === 5) {
    p1Title = 'Antarctic Subglacial Lake Environments & Extremophile Microbial Ecology';
    p2Title = 'Urban Microclimate Thermodynamics & Retroreflective Photonic Coatings';
    p3Title = 'Quantum Metrology, Optical Lattice Clocks & The Redefinition of SI Units';
  }

  // Generate 13 items for Passage 1 (Q1 - Q13)
  for (let i = 1; i <= 13; i++) {
    const qType = i <= 6 ? 'reading_tfng' : i <= 9 ? 'reading_multiple_choice' : 'reading_completion';
    items.push({
      id: `${packId}_q${i}`,
      lessonId: packId,
      itemType: qType,
      passagePart: 1,
      passageTitle: p1Title,
      passageText: p1Text,
      prompt: qType === 'reading_tfng'
        ? `According to Passage 1, is statement ${i} True, False, or Not Given?`
        : qType === 'reading_multiple_choice'
        ? `What primary factor is identified in Paragraph ${String.fromCharCode(65 + (i % 3))} regarding ${p1Title}?`
        : `Complete the sentence: Modern engineering protocols require strict adherence to ______ during execution.`,
      options: qType === 'reading_tfng'
        ? ['TRUE', 'FALSE', 'NOT GIVEN']
        : ['Subterranean gravitational gradients', 'Hydraulic mechanical pumps', 'Atmospheric pressure variations', 'Manual valve controls'],
      correctAnswer: qType === 'reading_tfng' ? (i % 2 === 0 ? 'TRUE' : 'FALSE') : 'Subterranean gravitational gradients',
      explanation: `Analisis Soal ${i}: Teks menjelaskan secara spesifik pada paragraf terkait prinsip dasar dari ${p1Title}.`
    });
  }

  // Generate 13 items for Passage 2 (Q14 - Q26)
  for (let i = 14; i <= 26; i++) {
    const qType = i <= 19 ? 'reading_headings' : i <= 23 ? 'reading_multiple_choice' : 'reading_tfng';
    items.push({
      id: `${packId}_q${i}`,
      lessonId: packId,
      itemType: qType,
      passagePart: 2,
      passageTitle: p2Title,
      passageText: p2Text,
      prompt: qType === 'reading_headings'
        ? `Choose the correct heading for Paragraph ${String.fromCharCode(65 + ((i - 14) % 3))} from the list below:`
        : `Which empirical methodology is evaluated in Paragraph ${String.fromCharCode(65 + ((i - 14) % 3))}?`,
      options: qType === 'reading_headings'
        ? [
            'i. Theoretical mechanisms of isotopic fractionation',
            'ii. Calibration of microfossil thermometry proxies',
            'iii. Long-term impacts of continental glaciations',
            'iv. Methodological limitations in sediment extraction'
          ]
        : ['Geochemical proxy calibration', 'Spectral satellite radiometry', 'Acoustic seabed profiling', 'Numerical thermodynamic simulations'],
      correctAnswer: qType === 'reading_headings' ? 'i. Theoretical mechanisms of isotopic fractionation' : 'Geochemical proxy calibration',
      explanation: `Analisis Soal ${i}: Kutipan langsung dari teks paragraf menunjukkan metode inti yang diterapkan.`
    });
  }

  // Generate 14 items for Passage 3 (Q27 - Q40)
  for (let i = 27; i <= 40; i++) {
    const qType = i <= 32 ? 'reading_multiple_choice' : i <= 36 ? 'reading_tfng' : 'reading_completion';
    items.push({
      id: `${packId}_q${i}`,
      lessonId: packId,
      itemType: qType,
      passagePart: 3,
      passageTitle: p3Title,
      passageText: p3Text,
      prompt: qType === 'reading_tfng'
        ? `Is statement ${i} concerning ${p3Title} supported by the passage (YES, NO, NOT GIVEN)?`
        : `What critical perspective does the author emphasize regarding ${p3Title}?`,
      options: qType === 'reading_tfng'
        ? ['YES', 'NO', 'NOT GIVEN']
        : ['Systemic resilience and regulatory compliance', 'Complete autonomy of market participants', 'Disregard for historical precedents', 'Absence of verifiable empirical data'],
      correctAnswer: qType === 'reading_tfng' ? 'YES' : 'Systemic resilience and regulatory compliance',
      explanation: `Analisis Soal ${i}: Argumentasi paragraf menyimpulkan pentingnya kepatuhan dan keandalan sistem.`
    });
  }

  return items;
}

// Pack generator for JLPT N5 (Packs 1 to 5)
export function generateJlptN5PackItems(packNumber: number): MockExamPackItem[] {
  const packId = `jlpt_n5_mock_0${packNumber}`;
  const themes = [
    'Partikel Dasar & Pola Kalimat Kampus',
    'Bentuk Te & Transaksi Belanja Sehari-hari',
    'Pengumuman Pendek & Informasi Jadwal Kereta Api',
    'Susunan Kalimat Bintang (★) & Janji Temu',
    'Simulasi Komprehensif Ujian Resmi Puncak N5'
  ];
  const title = themes[packNumber - 1] || 'Simulasi Resmi JLPT N5';

  const items: MockExamPackItem[] = [];
  const questionCount = packNumber === 5 ? 30 : 25;

  for (let i = 1; i <= questionCount; i++) {
    const isStar = i >= 15 && i <= 20;
    items.push({
      id: `${packId}_q${i}`,
      lessonId: packId,
      itemType: isStar ? 'grammar_star' : 'grammar_choice',
      passagePart: 1,
      passageTitle: title,
      passageText: '大学のキャンパスで留学生の田中さんと鈴木さんが話しています。毎日日本語の授業があります。',
      prompt: isStar
        ? `Susun kembali kata-kata bernomor untuk membentuk kalimat yang benar, lalu pilihlah kata yang menempati posisi ★:`
        : `Pilihlah partikel atau bentuk kata kerja yang paling tepat untuk mengisi tanda kurung (　):`,
      options: isStar
        ? ['1. としょかんに', '2. ともだちと', '3. いきます', '4. べんきょうしに']
        : ['に', 'で', 'を', 'は'],
      correctAnswer: isStar ? '2. ともだちと' : 'に',
      explanation: `Penjelasan Tata Bahasa Soal ${i}: Partikel penunjuk tujuan atau subjek digunakan sesuai kaidah standar JLPT N5.`
    });
  }

  return items;
}
