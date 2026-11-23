// Official Cambridge-Standard 40-Question Computer-Delivered IELTS Academic Mock Exam Seed
// Total Questions: 40
// Structure:
// - Passage 1 (Q 1-13): Cognitive Architecture of Bilingualism (~750 words)
// - Passage 2 (Q 14-26): Passive Cooling & Urban Microclimates (~850 words)
// - Passage 3 (Q 27-40): Epistemological Paradigms in Archaeological Stratigraphy (~950 words)

export interface IELTSMockItem {
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

const PASSAGE_1_TEXT = `[A] For much of the twentieth century, prevailing educational orthodoxy considered early childhood bilingualism to be an intellectual handicap. Pedagogical treatises warned that exposing young minds to two distinct lexical and morphological systems would inevitably precipitate linguistic confusion, retard vocabulary acquisition, and overload nascent cognitive capacity. Subsequent empirical investigations spearheaded by modern psycholinguistics and neuroimaging, however, have thoroughly discredited this deficit paradigm. Far from suffering cognitive retardation, individuals who regularly navigate two or more languages demonstrate pronounced enhancements in non-verbal executive control—a suite of domain-general cognitive processes orchestrated by the prefrontal cortex, responsible for selective attention, task switching, working memory updating, and inhibitory control.

[B] The foundational mechanism underlying this cognitive disparity lies in the phenomenon of non-selective lexical access. Contrary to intuitive assumptions that bilinguals simply switch between separate mental lexicons, eye-tracking, event-related potential (ERP), and functional magnetic resonance imaging (fMRI) studies consistently confirm that both linguistic systems remain permanently active, even in strictly monolingual communicative environments. When a bilingual speaker prepares to utter a word, candidate words from both languages are simultaneously activated and compete for articulation. Consequently, speaking even a simple sentence in one language necessitates continuous suppression of the dormant, non-target language. This relentless recruitment of attentional inhibition functions as an intensive, lifelong mental workout, reinforcing the neural pathways mediating cognitive control.

[C] In laboratory environments, this executive advantage is typically manifested through standardized cognitive interference paradigms, such as the Simon task, the Stroop test, and the Flanker task. In the Simon task, participants must respond to visual stimuli (such as colored squares) by pressing left or right keys based solely on color, regardless of whether the stimulus appears on the left or right side of the screen. When the stimulus position conflicts with the required key press (an incongruent trial), response latency increases due to spatial interference. Longitudinal datasets demonstrate that bilingual cohorts consistently exhibit significantly smaller congruency effects—meaning their reaction times degrade far less on conflict trials compared to monolingual peers. Neurofunctional imaging indicates that while monolinguals recruit disproportionate prefrontal and parietal resources to manage conflict, bilinguals demonstrate more streamlined activation of the anterior cingulate cortex and basal ganglia, suggesting optimized neural efficiency.

[D] The practical ramifications of this cognitive optimization extend profoundly into clinical neurology and aging. In pioneering epidemiological research conducted by Ellen Bialystok and colleagues across diverse clinical populations in Toronto, bilingual patients diagnosed with probable Alzheimer's disease manifested the onset of clinical symptoms on average four to five years later than demographically matched monolingual cohorts. Remarkably, post-mortem volumetric analyses and positron emission tomography (PET) scans revealed that at equivalent stages of clinical cognitive impairment, bilingual brains actually exhibited substantially greater neuropathological damage, cerebral atrophy, and amyloid plaque deposition than monolingual brains. This apparent paradox is explained by the cognitive reserve hypothesis: decades of managing competing linguistic representations establish richer, more flexible alternative neural networks, allowing the brain to functionally compensate for neurodegenerative destruction long before overt clinical failure occurs.

[E] Notwithstanding these robust findings, the 'bilingual advantage' hypothesis has attracted rigorous methodological scrutiny and fierce scholarly debate. Critics point out that several large-scale replication attempts fail to replicate executive benefits in healthy young adult cohorts. Skeptics argue that during the peak of cognitive development in university-aged subjects, executive function operates at ceiling capacity, masking subtle inter-individual variations. Furthermore, confounding sociodemographic variables—such as socioeconomic status, parental education, immigrant self-selection bias, and bicultural adaptability—frequently correlate with bilingual populations and may account for observed performance differentials if not meticulously controlled. Current consensus thus views bilingualism not as a panacea that guarantees superior intellect, but rather as an experiential factor that interacts dynamically with age, environmental complexity, and genetic predispositions to sculpt neural plasticity.`;

const PASSAGE_2_TEXT = `[A] The rapid pace of global urbanization, coupled with anthropogenic climate change, has dramatically amplified the Urban Heat Island (UHI) effect—a meteorological phenomenon whereby metropolitan centers register ambient air and surface temperatures several degrees higher than surrounding rural peripheries. This thermal anomaly is driven primarily by the replacement of natural vegetative land cover with impervious engineered materials such as asphalt and concrete, which possess high thermal mass, low solar reflectance (albedo), and negligible evapotranspirative cooling capacity. Furthermore, tall architectural structures form narrow street canyons that trap shortwave and longwave radiation while impeding convective wind dissipation. The resulting thermal load not only inflates summertime building air conditioning energy consumption and strains electrical distribution grids, but also exacerbates tropospheric ozone formation and elevates heat-related mortality among vulnerable demographics.

[B] In response to escalating urban heat stress, civil engineers and bioclimatic architects are deploying passive cooling strategies designed to alter the microclimatic energy balance without continuous operational energy input. Foremost among these interventions are high-albedo 'cool roofs' and retroreflective exterior wall coatings. Traditional dark roofing membranes absorb up to 90% of incoming solar irradiance, heating to temperatures exceeding 65°C. In contrast, advanced cool coatings formulated with titanium dioxide nanoparticles, porous polymers, or hollow glass microspheres achieve solar reflectance values exceeding 0.85 and thermal emittance values above 0.90. Field monitoring campaigns indicate that large-scale cool roof retrofits can depress roof surface temperatures by up to 30°C and curb net building cooling loads by 15% to 35% in Mediterranean and tropical climates.

[C] While cool roofs act directly on solar gain, another breakthrough in passive thermodynamic design is Daytime Radiative Cooling (DRC). Terrestrial objects naturally radiate infrared thermal energy into space; however, the surrounding atmosphere typically reabsorbs and reradiates much of this heat back to earth. Crucially, the atmosphere features an optical transparency window situated between 8 and 13 micrometers wavelength, in which atmospheric greenhouse gases (primarily water vapor and carbon dioxide) exhibit minimal infrared absorption. Specially engineered photonic metamaterials and micro-grooved polymer matrices emit radiation specifically within this 8–13 μm spectral band while completely reflecting solar radiation (0.3–2.5 μm). As a consequence, these surfaces achieve 'sub-ambient cooling'—dropping their surface temperature 5°C to 10°C below ambient air temperatures even under direct midday sun exposure, effectively functioning as passive thermal sinks to the cryogenic void of outer space (3 K).

[D] At street level, however, modifying urban albedo introduces complex thermodynamic trade-offs that require rigorous spatial planning. While retrofitting pavements with high-reflectance coatings reduces pavement surface heat, conventional diffuse reflective materials scatter a substantial fraction of reflected solar photons upward onto pedestrian bodies and opposing vertical building facades. Biometeorological modeling indicates that while high-albedo pavements decrease ambient air temperature marginally (by 0.5°C to 1.5°C), they can inadvertently increase pedestrian Mean Radiant Temperature (Tmrt) by up to 10°C during peak midday hours, inducing acute physiological thermal discomfort and visual glare. To resolve this paradox, researchers are developing retroreflective pavements containing retroreflective prisms or optical beads that reflect incoming sunlight back along its precise angle of incidence—directing the reflected radiation back toward the sky rather than scattering it into the pedestrian zone.

[E] Beyond surface coatings, urban morphological parameters—specifically the Height-to-Width (H/W) ratio and Sky View Factor (SVF) of street canyons—govern microclimate dynamics. High H/W ratios (tall buildings lining narrow streets) provide advantageous self-shading during summer months, drastically cutting direct solar irradiation at pedestrian level. However, if H/W exceeds critical thresholds (typically greater than 2.5), the canyon enters a 'skimming flow' aerodynamic regime, where prevailing synoptic winds bypass the street canyon entirely, trapping anthropogenic heat, vehicular exhaust, and humidity within the canopy layer. Strategic urban ventilation corridors, staggered building heights, and permeable building podiums are therefore essential to balance shading advantages with sufficient nocturnal ventilation.

[F] Integrating biological infrastructure through green roofs and urban tree canopies complements surface engineering by harnessing evapotranspiration. A mature deciduous tree can transpire hundreds of liters of water daily, converting sensible heat into latent heat while providing invaluable canopy shade. Nonetheless, the cooling efficacy of vegetation is fundamentally contingent on soil moisture availability. In arid and semi-arid metropolitan regions suffering chronic water scarcity, maintaining vegetated infrastructure can impose unsustainable burdens on municipal water supplies. Consequently, urban resilience frameworks increasingly prioritize a hybrid paradigm: deploying passive photonic DRC and retroreflective coatings on horizontal rooftops, while concentrating vegetative canopies selectively along pedestrian corridors and public transit interchanges.`;

const PASSAGE_3_TEXT = `[A] Archaeological excavation is inherently an unrepeatable, destructive experiment. The moment an archaeologist dismantles an earth layer, unearths a masonry foundation, or extracts an artifact, the physical context that imbued those remains with historical meaning is permanently obliterated. For centuries, antiquarians and early field excavators attempted to decipher ancient sites by borrowing the foundational principles of geological stratigraphy formulated in the seventeenth and eighteenth centuries by Nicolaus Steno and refined by Charles Lyell. Central among these were the Law of Superposition (which asserts that in undeformed sedimentary layers, older strata lie beneath younger strata) and the Law of Original Horizontality. However, by the mid-twentieth century, acute methodological crises revealed that transposing geological axioms directly into archaeological environments introduced profound epistemological distortions.

[B] The definitive conceptual breakthrough occurred in 1973 when Dr. Edward C. Harris published what is now universally termed the 'Harris Matrix'. Harris recognized that archaeological stratification differs fundamentally from geological sedimentation in its velocity, agency, and structural morphology. Geological strata are formed over vast epochs through natural hydrological, volcanic, or aeolian forces across wide geological basins. In contrast, archaeological stratification is predominantly anthropogenic, characterized by rapid, punctuated human behavior—digging pits, leveling terraces, constructing walls, discarding refuse, and backfilling graves. Crucially, human actions frequently generate what Harris categorized as 'negative stratigraphy' or interfacial boundaries: cuts, trenches, and surface erosions that represent events of excavation rather than deposition. A foundation trench cut into sterile subsoil, for example, is a stratigraphic event of paramount chronological importance, yet it leaves no material deposit of its own.

[C] To formalize archaeological logic, Harris articulated four fundamental laws of archaeological stratigraphy that revised Steno's precepts. The Law of Superposition was amended to state that the upper unit of stratification was created after the lower, provided that each unit is delimited by an original surface boundary. The Law of Original Horizontality was revised to recognize that human deposits do not settle horizontally in natural water basins, but conform to existing topography, often resting on steep slopes, ditches, or vertical revetments. The Law of Original Continuity established that if a stratum's edge is cut by a later intrusive feature, its original continuous extent across the site can be logically reconstructed. Finally, the Law of Stratigraphical Succession postulated that any given unit of stratification exists in a sequential matrix positioned between the earliest unit that lies above it and the latest unit that lies below it, with which it shares physical contact.

[D] By distilling site stratigraphy into an abstract topological flow diagram, the Harris Matrix disengaged chronological sequence from absolute physical elevation. In complex multi-period urban sites—such as Rome, London, or Jerusalem—spatial depth is notoriously misleading. An archaic deep-cut Roman cesspit may penetrate deep into prehistoric geological clay, placing younger ceramic sherds meters physically below older Neolithic strata. By prioritizing relational topological contact (which feature cuts, overlays, or seals another) over absolute depth, the matrix provides a rigorous, objective framework to reconstruct a site's relative chronotopological sequence.

[E] Nevertheless, the operational application of the Harris Matrix has faced substantive critiques from formation theorists, geoarchaeologists, and post-processual theorists. Michael Schiffer and the 'behavioral archaeology' school emphasized that stratigraphic deposits do not represent pristine frozen snapshots of systemic human behavior. Instead, taphonomic processes and site-formation transformations intervene continuously between the deposition of material culture and its archaeological recovery. Cultural formation processes (C-transforms)—such as looting, building reclamation, agricultural plowing, and military earthworks—routinely disturb stratified layers. Concurrently, natural formation processes (N-transforms)—including bioturbation by earthworms and burrowing rodents, freeze-thaw cryoturbation, seismic shaking, and soil chemical leaching—can transport small artifacts across stratigraphic boundaries, inverting apparent chronological associations.

[F] To mitigate taphonomic fallacies, modern excavation methodology integrates micromorphology and Bayesian radiocarbon modeling directly into the stratigraphic workflow. Rather than relying solely on macroscopic visual demarcation of soil layers, geoarchaeologists extract undisturbed sediment cores, impregnate them with synthetic resin, and produce petrographic thin-sections for microscopic analysis under polarizing and scanning electron microscopes. Micromorphology identifies micro-laminations, phytolith orientations, trampled floor crusts, and post-depositional mineral weathering that escape the naked eye, allowing researchers to distinguish pristine primary surfaces from secondary dumping or redeposited backfills. Furthermore, stratigraphic sequences are now encoded as prior probabilities in Bayesian mathematical frameworks, constraining radiocarbon calibrated probability density functions to yield historical dating precisions down to individual decades.

[G] Ultimately, the evolution of archaeological stratigraphy reflects a broader epistemological maturation within the discipline. Excavators have abandoned the naive empiricist delusion that an excavation trench presents a self-evident, unmediated chronicle of antiquity. Stratigraphy is recognized not merely as the passive observation of colored soil lines, but as an active, theoretical process of semiotic interpretation. By combining the topological clarity of the Harris Matrix, the microscopic verification of geoarchaeology, and the probabilistic rigor of Bayesian chronometry, contemporary archaeology navigates the dialectic between the destruction of the physical record and the preservation of historical knowledge.`;

export const IELTS_MOCK_LESSON_ID = 'les_ia_mock_full_1';

export const IELTS_FULL_MOCK_ITEMS: IELTSMockItem[] = [
  // ==========================================
  // SECTION 1: PASSAGE 1 (Questions 1 - 13)
  // ==========================================
  // Q1-Q5: Matching Headings
  {
    id: 'item_mock_q1',
    lessonId: IELTS_MOCK_LESSON_ID,
    itemType: 'matching_headings',
    passagePart: 1,
    passageTitle: 'Reading Passage 1: The Cognitive Architecture of Bilingualism',
    passageText: PASSAGE_1_TEXT,
    prompt: 'Choose the correct heading for Paragraph A from the list of headings below.',
    options: [
      'i: The Lifelong Exercise of Continuous Linguistic Competition',
      'ii: Neuropathological Resilience and the Cognitive Reserve',
      'iii: Historical Misconceptions and the Paradigm Shift',
      'iv: Methodological Criticisms and Replication Controversies',
      'v: Experimental Measurement via Spatial Interference Paradigms',
      'vi: Syntactic Development in Monolingual Early Education',
      'vii: Pharmacological Interventions in Neurodegeneration'
    ],
    correctAnswer: 'iii: Historical Misconceptions and the Paradigm Shift',
    explanation: 'Paragraph A reviews historical beliefs that childhood bilingualism was an "intellectual handicap" causing confusion, and contrasts it with modern research discrediting this deficit view.'
  },
  {
    id: 'item_mock_q2',
    lessonId: IELTS_MOCK_LESSON_ID,
    itemType: 'matching_headings',
    passagePart: 1,
    passageTitle: 'Reading Passage 1: The Cognitive Architecture of Bilingualism',
    passageText: PASSAGE_1_TEXT,
    prompt: 'Choose the correct heading for Paragraph B from the list of headings below.',
    options: [
      'i: The Lifelong Exercise of Continuous Linguistic Competition',
      'ii: Neuropathological Resilience and the Cognitive Reserve',
      'iii: Historical Misconceptions and the Paradigm Shift',
      'iv: Methodological Criticisms and Replication Controversies',
      'v: Experimental Measurement via Spatial Interference Paradigms',
      'vi: Syntactic Development in Monolingual Early Education',
      'vii: Pharmacological Interventions in Neurodegeneration'
    ],
    correctAnswer: 'i: The Lifelong Exercise of Continuous Linguistic Competition',
    explanation: 'Paragraph B explains non-selective lexical access, where candidate words from both languages continuously compete and the brain constantly suppresses the non-target language like an intensive mental workout.'
  },
  {
    id: 'item_mock_q3',
    lessonId: IELTS_MOCK_LESSON_ID,
    itemType: 'matching_headings',
    passagePart: 1,
    passageTitle: 'Reading Passage 1: The Cognitive Architecture of Bilingualism',
    passageText: PASSAGE_1_TEXT,
    prompt: 'Choose the correct heading for Paragraph C from the list of headings below.',
    options: [
      'i: The Lifelong Exercise of Continuous Linguistic Competition',
      'ii: Neuropathological Resilience and the Cognitive Reserve',
      'iii: Historical Misconceptions and the Paradigm Shift',
      'iv: Methodological Criticisms and Replication Controversies',
      'v: Experimental Measurement via Spatial Interference Paradigms',
      'vi: Syntactic Development in Monolingual Early Education',
      'vii: Pharmacological Interventions in Neurodegeneration'
    ],
    correctAnswer: 'v: Experimental Measurement via Spatial Interference Paradigms',
    explanation: 'Paragraph C details how laboratory tests like the Simon, Stroop, and Flanker tasks measure executive advantage through incongruent spatial stimulus interference.'
  },
  {
    id: 'item_mock_q4',
    lessonId: IELTS_MOCK_LESSON_ID,
    itemType: 'matching_headings',
    passagePart: 1,
    passageTitle: 'Reading Passage 1: The Cognitive Architecture of Bilingualism',
    passageText: PASSAGE_1_TEXT,
    prompt: 'Choose the correct heading for Paragraph D from the list of headings below.',
    options: [
      'i: The Lifelong Exercise of Continuous Linguistic Competition',
      'ii: Neuropathological Resilience and the Cognitive Reserve',
      'iii: Historical Misconceptions and the Paradigm Shift',
      'iv: Methodological Criticisms and Replication Controversies',
      'v: Experimental Measurement via Spatial Interference Paradigms',
      'vi: Syntactic Development in Monolingual Early Education',
      'vii: Pharmacological Interventions in Neurodegeneration'
    ],
    correctAnswer: 'ii: Neuropathological Resilience and the Cognitive Reserve',
    explanation: 'Paragraph D focuses on Bialystok\'s clinical Alzheimer\'s findings and the cognitive reserve hypothesis, where bilingual brains withstand greater pathology before manifesting symptoms.'
  },
  {
    id: 'item_mock_q5',
    lessonId: IELTS_MOCK_LESSON_ID,
    itemType: 'matching_headings',
    passagePart: 1,
    passageTitle: 'Reading Passage 1: The Cognitive Architecture of Bilingualism',
    passageText: PASSAGE_1_TEXT,
    prompt: 'Choose the correct heading for Paragraph E from the list of headings below.',
    options: [
      'i: The Lifelong Exercise of Continuous Linguistic Competition',
      'ii: Neuropathological Resilience and the Cognitive Reserve',
      'iii: Historical Misconceptions and the Paradigm Shift',
      'iv: Methodological Criticisms and Replication Controversies',
      'v: Experimental Measurement via Spatial Interference Paradigms',
      'vi: Syntactic Development in Monolingual Early Education',
      'vii: Pharmacological Interventions in Neurodegeneration'
    ],
    correctAnswer: 'iv: Methodological Criticisms and Replication Controversies',
    explanation: 'Paragraph E discusses scholarly debates, replication failures in young adults, ceiling effects, and confounding sociodemographic variables.'
  },

  // Q6-Q9: True / False / Not Given
  {
    id: 'item_mock_q6',
    lessonId: IELTS_MOCK_LESSON_ID,
    itemType: 'true_false_not_given',
    passagePart: 1,
    passageTitle: 'Reading Passage 1: The Cognitive Architecture of Bilingualism',
    passageText: PASSAGE_1_TEXT,
    prompt: 'During the twentieth century, conventional educators believed that learning two languages would accelerate early vocabulary acquisition.',
    options: ['TRUE', 'FALSE', 'NOT GIVEN'],
    correctAnswer: 'FALSE',
    explanation: 'Paragraph A states that pedagogical treatises warned exposing young minds to two systems would "retard vocabulary acquisition", directly contradicting "accelerate".'
  },
  {
    id: 'item_mock_q7',
    lessonId: IELTS_MOCK_LESSON_ID,
    itemType: 'true_false_not_given',
    passagePart: 1,
    passageTitle: 'Reading Passage 1: The Cognitive Architecture of Bilingualism',
    passageText: PASSAGE_1_TEXT,
    prompt: 'Eye-tracking and neuroimaging demonstrate that a bilingual person\'s non-target language is completely deactivated when conversing in a monolingual setting.',
    options: ['TRUE', 'FALSE', 'NOT GIVEN'],
    correctAnswer: 'FALSE',
    explanation: 'Paragraph B explicitly notes that "both linguistic systems remain permanently active, even in strictly monolingual communicative environments".'
  },
  {
    id: 'item_mock_q8',
    lessonId: IELTS_MOCK_LESSON_ID,
    itemType: 'true_false_not_given',
    passagePart: 1,
    passageTitle: 'Reading Passage 1: The Cognitive Architecture of Bilingualism',
    passageText: PASSAGE_1_TEXT,
    prompt: 'Bilingual Alzheimer\'s patients examined by Bialystok exhibited less cerebral atrophy and amyloid plaque than monolinguals at equivalent stages of cognitive impairment.',
    options: ['TRUE', 'FALSE', 'NOT GIVEN'],
    correctAnswer: 'FALSE',
    explanation: 'Paragraph D states that bilingual brains actually exhibited "substantially greater neuropathological damage, cerebral atrophy, and amyloid plaque deposition than monolingual brains".'
  },
  {
    id: 'item_mock_q9',
    lessonId: IELTS_MOCK_LESSON_ID,
    itemType: 'true_false_not_given',
    passagePart: 1,
    passageTitle: 'Reading Passage 1: The Cognitive Architecture of Bilingualism',
    passageText: PASSAGE_1_TEXT,
    prompt: 'Ellen Bialystok received international government awards for her epidemiological research on Alzheimer\'s disease in Toronto.',
    options: ['TRUE', 'FALSE', 'NOT GIVEN'],
    correctAnswer: 'NOT GIVEN',
    explanation: 'The passage mentions Bialystok\'s research in Toronto, but makes no mention of whether she received any government awards.'
  },

  // Q10-Q13: Sentence Completion
  {
    id: 'item_mock_q10',
    lessonId: IELTS_MOCK_LESSON_ID,
    itemType: 'sentence_completion',
    passagePart: 1,
    passageTitle: 'Reading Passage 1: The Cognitive Architecture of Bilingualism',
    passageText: PASSAGE_1_TEXT,
    prompt: 'In laboratory experiments using the Simon task, bilingual cohorts demonstrate significantly smaller _______ when resolving incongruent spatial stimuli. (Choose NO MORE THAN TWO WORDS from the passage)',
    options: ['congruency effects', 'reaction times', 'spatial conflicts', 'interference trials'],
    correctAnswer: 'congruency effects',
    explanation: 'Paragraph C states: "bilingual cohorts consistently exhibit significantly smaller congruency effects—meaning their reaction times degrade far less on conflict trials".'
  },
  {
    id: 'item_mock_q11',
    lessonId: IELTS_MOCK_LESSON_ID,
    itemType: 'sentence_completion',
    passagePart: 1,
    passageTitle: 'Reading Passage 1: The Cognitive Architecture of Bilingualism',
    passageText: PASSAGE_1_TEXT,
    prompt: 'Neurofunctional scans show that bilinguals manage linguistic conflict with streamlined activation in the _______ cortex. (Choose NO MORE THAN TWO WORDS from the passage)',
    options: ['anterior cingulate', 'prefrontal', 'parietal', 'temporal'],
    correctAnswer: 'anterior cingulate',
    explanation: 'Paragraph C states: "bilinguals demonstrate more streamlined activation of the anterior cingulate cortex and basal ganglia".'
  },
  {
    id: 'item_mock_q12',
    lessonId: IELTS_MOCK_LESSON_ID,
    itemType: 'sentence_completion',
    passagePart: 1,
    passageTitle: 'Reading Passage 1: The Cognitive Architecture of Bilingualism',
    passageText: PASSAGE_1_TEXT,
    prompt: 'The cognitive reserve hypothesis argues that managing two languages creates richer alternative _______ that functionally compensate for brain damage. (Choose NO MORE THAN TWO WORDS from the passage)',
    options: ['neural networks', 'lexical systems', 'attentional mechanisms', 'cerebral pathways'],
    correctAnswer: 'neural networks',
    explanation: 'Paragraph D explains that decades of language management "establish richer, more flexible alternative neural networks".'
  },
  {
    id: 'item_mock_q13',
    lessonId: IELTS_MOCK_LESSON_ID,
    itemType: 'sentence_completion',
    passagePart: 1,
    passageTitle: 'Reading Passage 1: The Cognitive Architecture of Bilingualism',
    passageText: PASSAGE_1_TEXT,
    prompt: 'Critics argue that testing young university adults fails to show bilingual gains because their cognitive control is already operating at _______ capacity. (Choose NO MORE THAN ONE WORD from the passage)',
    options: ['ceiling', 'maximum', 'optimal', 'surplus'],
    correctAnswer: 'ceiling',
    explanation: 'Paragraph E states: "in university-aged subjects, executive function operates at ceiling capacity, masking subtle inter-individual variations".'
  },

  // ==========================================
  // SECTION 2: PASSAGE 2 (Questions 14 - 26)
  // ==========================================
  // Q14-Q17: Matching Information
  {
    id: 'item_mock_q14',
    lessonId: IELTS_MOCK_LESSON_ID,
    itemType: 'matching_headings',
    passagePart: 2,
    passageTitle: 'Reading Passage 2: Passive Cooling Architectures and Urban Microclimate Mitigation',
    passageText: PASSAGE_2_TEXT,
    prompt: 'Which paragraph explains the physical phenomenon enabling sub-ambient cooling via an optical transparency window?',
    options: ['Paragraph A', 'Paragraph B', 'Paragraph C', 'Paragraph D', 'Paragraph E', 'Paragraph F'],
    correctAnswer: 'Paragraph C',
    explanation: 'Paragraph C details Daytime Radiative Cooling (DRC) and the atmospheric optical window between 8 and 13 micrometers.'
  },
  {
    id: 'item_mock_q15',
    lessonId: IELTS_MOCK_LESSON_ID,
    itemType: 'matching_headings',
    passagePart: 2,
    passageTitle: 'Reading Passage 2: Passive Cooling Architectures and Urban Microclimate Mitigation',
    passageText: PASSAGE_2_TEXT,
    prompt: 'Which paragraph discusses the unexpected physiological thermal discomfort pedestrians may experience from reflective pavements?',
    options: ['Paragraph A', 'Paragraph B', 'Paragraph C', 'Paragraph D', 'Paragraph E', 'Paragraph F'],
    correctAnswer: 'Paragraph D',
    explanation: 'Paragraph D explains that diffuse high-albedo pavements can increase pedestrian Mean Radiant Temperature (Tmrt) by up to 10°C.'
  },
  {
    id: 'item_mock_q16',
    lessonId: IELTS_MOCK_LESSON_ID,
    itemType: 'matching_headings',
    passagePart: 2,
    passageTitle: 'Reading Passage 2: Passive Cooling Architectures and Urban Microclimate Mitigation',
    passageText: PASSAGE_2_TEXT,
    prompt: 'Which paragraph describes the aerodynamic flow regimes that occur when street canyon height-to-width ratios exceed critical thresholds?',
    options: ['Paragraph A', 'Paragraph B', 'Paragraph C', 'Paragraph D', 'Paragraph E', 'Paragraph F'],
    correctAnswer: 'Paragraph E',
    explanation: 'Paragraph E discusses Height-to-Width ratios and the "skimming flow" aerodynamic regime trapping heat and emissions.'
  },
  {
    id: 'item_mock_q17',
    lessonId: IELTS_MOCK_LESSON_ID,
    itemType: 'matching_headings',
    passagePart: 2,
    passageTitle: 'Reading Passage 2: Passive Cooling Architectures and Urban Microclimate Mitigation',
    passageText: PASSAGE_2_TEXT,
    prompt: 'Which paragraph outlines the water resource limitations of maintaining vegetative infrastructure in arid metropolitan areas?',
    options: ['Paragraph A', 'Paragraph B', 'Paragraph C', 'Paragraph D', 'Paragraph E', 'Paragraph F'],
    correctAnswer: 'Paragraph F',
    explanation: 'Paragraph F highlights that in arid and semi-arid regions suffering water scarcity, vegetative infrastructure imposes unsustainable burdens on municipal water.'
  },

  // Q18-Q21: Multiple Choice
  {
    id: 'item_mock_q18',
    lessonId: IELTS_MOCK_LESSON_ID,
    itemType: 'multiple_choice',
    passagePart: 2,
    passageTitle: 'Reading Passage 2: Passive Cooling Architectures and Urban Microclimate Mitigation',
    passageText: PASSAGE_2_TEXT,
    prompt: 'According to Paragraph A, what is the primary physical driver of the Urban Heat Island effect?',
    options: [
      'A: Excessive industrial combustion of fossil fuels during winter months',
      'B: The replacement of natural vegetative land with high-thermal-mass, low-albedo materials',
      'C: The natural topographical elevation differentials between cities and surrounding valleys',
      'D: The extensive deployment of residential photovoltaic solar arrays'
    ],
    correctAnswer: 'B: The replacement of natural vegetative land with high-thermal-mass, low-albedo materials',
    explanation: 'Paragraph A clarifies the thermal anomaly is driven primarily by "the replacement of natural vegetative land cover with impervious engineered materials such as asphalt and concrete, which possess high thermal mass, low solar reflectance (albedo)".'
  },
  {
    id: 'item_mock_q19',
    lessonId: IELTS_MOCK_LESSON_ID,
    itemType: 'multiple_choice',
    passagePart: 2,
    passageTitle: 'Reading Passage 2: Passive Cooling Architectures and Urban Microclimate Mitigation',
    passageText: PASSAGE_2_TEXT,
    prompt: 'Why do modern cool roof coatings incorporate titanium dioxide nanoparticles or porous polymers?',
    options: [
      'A: To trap incoming solar radiation for subterranean geothermal storage',
      'B: To achieve solar reflectance above 0.85 and thermal emittance above 0.90',
      'C: To prevent structural concrete foundations from absorbing stormwater runoff',
      'D: To chemically neutralize urban sulfur dioxide and nitrogen oxides'
    ],
    correctAnswer: 'B: To achieve solar reflectance above 0.85 and thermal emittance above 0.90',
    explanation: 'Paragraph B states cool coatings with TiO2 nanoparticles or porous polymers "achieve solar reflectance values exceeding 0.85 and thermal emittance values above 0.90".'
  },
  {
    id: 'item_mock_q20',
    lessonId: IELTS_MOCK_LESSON_ID,
    itemType: 'multiple_choice',
    passagePart: 2,
    passageTitle: 'Reading Passage 2: Passive Cooling Architectures and Urban Microclimate Mitigation',
    passageText: PASSAGE_2_TEXT,
    prompt: 'What key optical advantage do retroreflective pavements offer over conventional diffuse reflective pavements?',
    options: [
      'A: They absorb ultraviolet photons to generate auxiliary night-time lighting',
      'B: They direct reflected solar rays directly back toward the sky rather than onto pedestrians',
      'C: They are completely impervious to automotive oil leaks and fuel corrosion',
      'D: They eliminate the necessity for municipal underground stormwater drainage'
    ],
    correctAnswer: 'B: They direct reflected solar rays directly back toward the sky rather than onto pedestrians',
    explanation: 'Paragraph D explains retroreflective pavements reflect incoming sunlight "back along its precise angle of incidence—directing the reflected radiation back toward the sky rather than scattering it into the pedestrian zone".'
  },
  {
    id: 'item_mock_q21',
    lessonId: IELTS_MOCK_LESSON_ID,
    itemType: 'multiple_choice',
    passagePart: 2,
    passageTitle: 'Reading Passage 2: Passive Cooling Architectures and Urban Microclimate Mitigation',
    passageText: PASSAGE_2_TEXT,
    prompt: 'What aerodynamic hazard arises when the Height-to-Width ratio of an urban street canyon exceeds 2.5?',
    options: [
      'A: Downward gust winds cause immediate structural failure of pedestrian glass canopies',
      'B: Prevailing winds bypass the canyon, trapping heat and vehicular emissions inside the canopy layer',
      'C: Ground-level atmospheric pressure drops drastically, causing persistent cloud cover',
      'D: Electrostatic charges accumulate on metallic facade panels during humid weather'
    ],
    correctAnswer: 'B: Prevailing winds bypass the canyon, trapping heat and vehicular emissions inside the canopy layer',
    explanation: 'Paragraph E states that when H/W exceeds critical thresholds, "prevailing synoptic winds bypass the street canyon entirely, trapping anthropogenic heat, vehicular exhaust, and humidity within the canopy layer".'
  },

  // Q22-Q23: True / False / Not Given
  {
    id: 'item_mock_q22',
    lessonId: IELTS_MOCK_LESSON_ID,
    itemType: 'true_false_not_given',
    passagePart: 2,
    passageTitle: 'Reading Passage 2: Passive Cooling Architectures and Urban Microclimate Mitigation',
    passageText: PASSAGE_2_TEXT,
    prompt: 'Daytime Radiative Cooling materials can drop their surface temperatures several degrees below that of the surrounding ambient air even under intense midday sunlight.',
    options: ['TRUE', 'FALSE', 'NOT GIVEN'],
    correctAnswer: 'TRUE',
    explanation: 'Paragraph C confirms these surfaces achieve "sub-ambient cooling—dropping their surface temperature 5°C to 10°C below ambient air temperatures even under direct midday sun exposure".'
  },
  {
    id: 'item_mock_q23',
    lessonId: IELTS_MOCK_LESSON_ID,
    itemType: 'true_false_not_given',
    passagePart: 2,
    passageTitle: 'Reading Passage 2: Passive Cooling Architectures and Urban Microclimate Mitigation',
    passageText: PASSAGE_2_TEXT,
    prompt: 'Field monitoring data indicates that retrofitting roofs with cool coatings completely eliminates the need for mechanical air conditioning in Mediterranean buildings.',
    options: ['TRUE', 'FALSE', 'NOT GIVEN'],
    correctAnswer: 'FALSE',
    explanation: 'Paragraph B states cool roof retrofits "curb net building cooling loads by 15% to 35%", meaning they reduce the load, but do not completely eliminate mechanical AC.'
  },

  // Q24-Q26: Summary Completion
  {
    id: 'item_mock_q24',
    lessonId: IELTS_MOCK_LESSON_ID,
    itemType: 'sentence_completion',
    passagePart: 2,
    passageTitle: 'Reading Passage 2: Passive Cooling Architectures and Urban Microclimate Mitigation',
    passageText: PASSAGE_2_TEXT,
    prompt: 'Daytime Radiative Cooling operates effectively because Earth\'s atmosphere features an optical transparency window situated between 8 and _______ micrometers. (Choose NO MORE THAN TWO WORDS)',
    options: ['13', '15', '20', '25'],
    correctAnswer: '13',
    explanation: 'Paragraph C states: "the atmosphere features an optical transparency window situated between 8 and 13 micrometers wavelength".'
  },
  {
    id: 'item_mock_q25',
    lessonId: IELTS_MOCK_LESSON_ID,
    itemType: 'sentence_completion',
    passagePart: 2,
    passageTitle: 'Reading Passage 2: Passive Cooling Architectures and Urban Microclimate Mitigation',
    passageText: PASSAGE_2_TEXT,
    prompt: 'Deploying diffuse reflective pavements can inadvertently elevate a pedestrian\'s _______ by as much as 10°C during peak midday hours. (Choose NO MORE THAN THREE WORDS)',
    options: ['Mean Radiant Temperature', 'body heat', 'skin irritation', 'perspiration rate'],
    correctAnswer: 'Mean Radiant Temperature',
    explanation: 'Paragraph D states high-albedo pavements "can inadvertently increase pedestrian Mean Radiant Temperature (Tmrt) by up to 10°C".'
  },
  {
    id: 'item_mock_q26',
    lessonId: IELTS_MOCK_LESSON_ID,
    itemType: 'sentence_completion',
    passagePart: 2,
    passageTitle: 'Reading Passage 2: Passive Cooling Architectures and Urban Microclimate Mitigation',
    passageText: PASSAGE_2_TEXT,
    prompt: 'Urban trees provide microclimatic cooling by converting sensible heat into latent heat through the process of _______. (Choose NO MORE THAN ONE WORD)',
    options: ['evapotranspiration', 'photosynthesis', 'respiration', 'radiation'],
    correctAnswer: 'evapotranspiration',
    explanation: 'Paragraph F states: "A mature deciduous tree can transpire hundreds of liters of water daily, converting sensible heat into latent heat... by harnessing evapotranspiration".'
  },

  // ==========================================
  // SECTION 3: PASSAGE 3 (Questions 27 - 40)
  // ==========================================
  // Q27-Q31: Yes / No / Not Given
  {
    id: 'item_mock_q27',
    lessonId: IELTS_MOCK_LESSON_ID,
    itemType: 'true_false_not_given',
    passagePart: 3,
    passageTitle: 'Reading Passage 3: Epistemological Paradigms in Modern Archaeological Stratigraphy',
    passageText: PASSAGE_3_TEXT,
    prompt: 'Edward Harris argued that traditional geological stratification principles were directly applicable to archaeological sites without substantive alteration.',
    options: ['YES', 'NO', 'NOT GIVEN'],
    correctAnswer: 'NO',
    explanation: 'Paragraph B explicitly clarifies: "Harris recognized that archaeological stratification differs fundamentally from geological sedimentation in its velocity, agency, and structural morphology".'
  },
  {
    id: 'item_mock_q28',
    lessonId: IELTS_MOCK_LESSON_ID,
    itemType: 'true_false_not_given',
    passagePart: 3,
    passageTitle: 'Reading Passage 3: Epistemological Paradigms in Modern Archaeological Stratigraphy',
    passageText: PASSAGE_3_TEXT,
    prompt: 'According to Harris, negative stratigraphic features such as foundation trenches possess chronological significance even though they leave no physical deposit of their own.',
    options: ['YES', 'NO', 'NOT GIVEN'],
    correctAnswer: 'YES',
    explanation: 'Paragraph B states: "A foundation trench cut into sterile subsoil, for example, is a stratigraphic event of paramount chronological importance, yet it leaves no material deposit of its own".'
  },
  {
    id: 'item_mock_q29',
    lessonId: IELTS_MOCK_LESSON_ID,
    itemType: 'true_false_not_given',
    passagePart: 3,
    passageTitle: 'Reading Passage 3: Epistemological Paradigms in Modern Archaeological Stratigraphy',
    passageText: PASSAGE_3_TEXT,
    prompt: 'In multi-period urban excavations, artifacts retrieved from deeper physical levels are consistently older than those found near the ground surface.',
    options: ['YES', 'NO', 'NOT GIVEN'],
    correctAnswer: 'NO',
    explanation: 'Paragraph D warns: "In complex multi-period urban sites... spatial depth is notoriously misleading. An archaic deep-cut Roman cesspit may penetrate deep into prehistoric geological clay, placing younger ceramic sherds meters physically below older Neolithic strata".'
  },
  {
    id: 'item_mock_q30',
    lessonId: IELTS_MOCK_LESSON_ID,
    itemType: 'true_false_not_given',
    passagePart: 3,
    passageTitle: 'Reading Passage 3: Epistemological Paradigms in Modern Archaeological Stratigraphy',
    passageText: PASSAGE_3_TEXT,
    prompt: 'Michael Schiffer and his colleagues developed computer algorithms that automatically verify stratigraphic matrix accuracy on excavation tablets.',
    options: ['YES', 'NO', 'NOT GIVEN'],
    correctAnswer: 'NOT GIVEN',
    explanation: 'Paragraph E discusses Schiffer and behavioral archaeology\'s critique of formation processes, but nowhere mentions developing computer algorithms on tablets.'
  },
  {
    id: 'item_mock_q31',
    lessonId: IELTS_MOCK_LESSON_ID,
    itemType: 'true_false_not_given',
    passagePart: 3,
    passageTitle: 'Reading Passage 3: Epistemological Paradigms in Modern Archaeological Stratigraphy',
    passageText: PASSAGE_3_TEXT,
    prompt: 'Post-depositional animal activity, such as rodent burrowing, can physically displace artifacts and invert apparent chronological relationships.',
    options: ['YES', 'NO', 'NOT GIVEN'],
    correctAnswer: 'YES',
    explanation: 'Paragraph E confirms natural formation processes (N-transforms) "including bioturbation by earthworms and burrowing rodents... can transport small artifacts across stratigraphic boundaries, inverting apparent chronological associations".'
  },

  // Q32-Q36: Multiple Choice
  {
    id: 'item_mock_q32',
    lessonId: IELTS_MOCK_LESSON_ID,
    itemType: 'multiple_choice',
    passagePart: 3,
    passageTitle: 'Reading Passage 3: Epistemological Paradigms in Modern Archaeological Stratigraphy',
    passageText: PASSAGE_3_TEXT,
    prompt: 'How did Edward Harris amend the geological Law of Original Horizontality for archaeological sites?',
    options: [
      'A: By stating that all human deposits must be leveled with mechanical rollers during excavation',
      'B: By recognizing that man-made strata conform to existing irregular topography rather than settling flat in water basins',
      'C: By asserting that human occupation layers can only exist on perfectly horizontal floodplains',
      'D: By mandating that vertical walls be recorded as horizontal sedimentary deposits'
    ],
    correctAnswer: 'B: By recognizing that man-made strata conform to existing irregular topography rather than settling flat in water basins',
    explanation: 'Paragraph C explains Harris revised the law to recognize that human deposits "do not settle horizontally in natural water basins, but conform to existing topography, often resting on steep slopes, ditches, or vertical revetments".'
  },
  {
    id: 'item_mock_q33',
    lessonId: IELTS_MOCK_LESSON_ID,
    itemType: 'multiple_choice',
    passagePart: 3,
    passageTitle: 'Reading Passage 3: Epistemological Paradigms in Modern Archaeological Stratigraphy',
    passageText: PASSAGE_3_TEXT,
    prompt: 'What analytical shortcoming of macroscopic visual inspection is resolved by soil micromorphology?',
    options: [
      'A: The high financial expenditure required to rent excavation earthmovers',
      'B: The difficulty of distinguishing intact living surfaces from redeposited backfills with the naked eye',
      'C: The legal ambiguity surrounding museum curation of bronze antiquities',
      'D: The health hazards associated with inhaling radioactive radon gas from deep trenches'
    ],
    correctAnswer: 'B: The difficulty of distinguishing intact living surfaces from redeposited backfills with the naked eye',
    explanation: 'Paragraph F states micromorphology identifies micro-features that "escape the naked eye, allowing researchers to distinguish pristine primary surfaces from secondary dumping or redeposited backfills".'
  },
  {
    id: 'item_mock_q34',
    lessonId: IELTS_MOCK_LESSON_ID,
    itemType: 'multiple_choice',
    passagePart: 3,
    passageTitle: 'Reading Passage 3: Epistemological Paradigms in Modern Archaeological Stratigraphy',
    passageText: PASSAGE_3_TEXT,
    prompt: 'How does the integration of Bayesian statistics enhance radiocarbon dating on stratified sites?',
    options: [
      'A: It mathematically doubles the half-life of Carbon-14 isotopes',
      'B: It uses stratigraphic relationships as prior probabilities to narrow calibrated dating intervals to individual decades',
      'C: It eliminates the requirement for laboratory mass spectrometers',
      'D: It automatically generates 3D architectural reconstructions of decayed timber halls'
    ],
    correctAnswer: 'B: It uses stratigraphic relationships as prior probabilities to narrow calibrated dating intervals to individual decades',
    explanation: 'Paragraph F explains that stratigraphic sequences "are now encoded as prior probabilities in Bayesian mathematical frameworks, constraining radiocarbon calibrated probability density functions to yield historical dating precisions down to individual decades".'
  },
  {
    id: 'item_mock_q35',
    lessonId: IELTS_MOCK_LESSON_ID,
    itemType: 'multiple_choice',
    passagePart: 3,
    passageTitle: 'Reading Passage 3: Epistemological Paradigms in Modern Archaeological Stratigraphy',
    passageText: PASSAGE_3_TEXT,
    prompt: 'Why does the author describe archaeological excavation as an \'unrepeatable, destructive experiment\' in Paragraph A?',
    options: [
      'A: Because field instruments can only be calibrated once before breaking down',
      'B: Because physically dismantling soil context permanently annihilates the physical relationships giving meaning to finds',
      'C: Because modern heritage treaties prohibit archaeologists from revisiting previously published sites',
      'D: Because subterranean tremors routinely alter trench coordinates between field seasons'
    ],
    correctAnswer: 'B: Because physically dismantling soil context permanently annihilates the physical relationships giving meaning to finds',
    explanation: 'Paragraph A begins by stating: "The moment an archaeologist dismantles an earth layer, unearths a masonry foundation, or extracts an artifact, the physical context that imbued those remains with historical meaning is permanently obliterated".'
  },
  {
    id: 'item_mock_q36',
    lessonId: IELTS_MOCK_LESSON_ID,
    itemType: 'multiple_choice',
    passagePart: 3,
    passageTitle: 'Reading Passage 3: Epistemological Paradigms in Modern Archaeological Stratigraphy',
    passageText: PASSAGE_3_TEXT,
    prompt: 'What overarching conclusion does Paragraph G draw regarding modern archaeological stratigraphy?',
    options: [
      'A: It is an active theoretical practice of semiotic interpretation rather than passive empirical observation',
      'B: It has demonstrated that ancient humans had no conscious awareness of foundation construction',
      'C: It should be abandoned completely in favor of satellite remote sensing',
      'D: It proves that seventeenth-century geological axioms require no modification'
    ],
    correctAnswer: 'A: It is an active theoretical practice of semiotic interpretation rather than passive empirical observation',
    explanation: 'Paragraph G concludes: "Stratigraphy is recognized not merely as the passive observation of colored soil lines, but as an active, theoretical process of semiotic interpretation".'
  },

  // Q37-Q40: Sentence Matching
  {
    id: 'item_mock_q37',
    lessonId: IELTS_MOCK_LESSON_ID,
    itemType: 'matching_headings',
    passagePart: 3,
    passageTitle: 'Reading Passage 3: Epistemological Paradigms in Modern Archaeological Stratigraphy',
    passageText: PASSAGE_3_TEXT,
    prompt: 'Match the stratigraphic principle with its definition: "Law of Superposition (Harris Revision)"',
    options: [
      'A: Any stratigraphic unit exists between the earliest unit above and latest unit below with which it has physical contact',
      'B: An upper unit is created after a lower unit, provided each is bounded by an original surface boundary',
      'C: Separated deposits that have been truncated by later cuts can be reconstructed as historically continuous',
      'D: Sedimentary beds settle horizontally in natural marine or lacustrine basins'
    ],
    correctAnswer: 'B: An upper unit is created after a lower unit, provided each is bounded by an original surface boundary',
    explanation: 'Paragraph C states: "The Law of Superposition was amended to state that the upper unit of stratification was created after the lower, provided that each unit is delimited by an original surface boundary".'
  },
  {
    id: 'item_mock_q38',
    lessonId: IELTS_MOCK_LESSON_ID,
    itemType: 'matching_headings',
    passagePart: 3,
    passageTitle: 'Reading Passage 3: Epistemological Paradigms in Modern Archaeological Stratigraphy',
    passageText: PASSAGE_3_TEXT,
    prompt: 'Match the stratigraphic principle with its definition: "Law of Original Continuity"',
    options: [
      'A: Any stratigraphic unit exists between the earliest unit above and latest unit below with which it has physical contact',
      'B: An upper unit is created after a lower unit, provided each is bounded by an original surface boundary',
      'C: Separated deposits that have been truncated by later cuts can be reconstructed as historically continuous',
      'D: Sedimentary beds settle horizontally in natural marine or lacustrine basins'
    ],
    correctAnswer: 'C: Separated deposits that have been truncated by later cuts can be reconstructed as historically continuous',
    explanation: 'Paragraph C states: "The Law of Original Continuity established that if a stratum\'s edge is cut by a later intrusive feature, its original continuous extent across the site can be logically reconstructed".'
  },
  {
    id: 'item_mock_q39',
    lessonId: IELTS_MOCK_LESSON_ID,
    itemType: 'matching_headings',
    passagePart: 3,
    passageTitle: 'Reading Passage 3: Epistemological Paradigms in Modern Archaeological Stratigraphy',
    passageText: PASSAGE_3_TEXT,
    prompt: 'Match the stratigraphic principle with its definition: "Law of Stratigraphical Succession"',
    options: [
      'A: Any stratigraphic unit exists between the earliest unit above and latest unit below with which it has physical contact',
      'B: An upper unit is created after a lower unit, provided each is bounded by an original surface boundary',
      'C: Separated deposits that have been truncated by later cuts can be reconstructed as historically continuous',
      'D: Sedimentary beds settle horizontally in natural marine or lacustrine basins'
    ],
    correctAnswer: 'A: Any stratigraphic unit exists between the earliest unit above and latest unit below with which it has physical contact',
    explanation: 'Paragraph C states: "any given unit of stratification exists in a sequential matrix positioned between the earliest unit that lies above it and the latest unit that lies below it, with which it shares physical contact".'
  },
  {
    id: 'item_mock_q40',
    lessonId: IELTS_MOCK_LESSON_ID,
    itemType: 'matching_headings',
    passagePart: 3,
    passageTitle: 'Reading Passage 3: Epistemological Paradigms in Modern Archaeological Stratigraphy',
    passageText: PASSAGE_3_TEXT,
    prompt: 'Match the stratigraphic concept with its definition: "The Harris Matrix Abstract Topology"',
    options: [
      'A: An automated robot that digs excavation pits without human intervention',
      'B: A diagrammatic flow network disengaging chronological succession from absolute physical depth',
      'C: A chemical formula used to synthesize prehistoric soil matrix layers',
      'D: A legal agreement between archaeological teams and national museums'
    ],
    correctAnswer: 'B: A diagrammatic flow network disengaging chronological succession from absolute physical depth',
    explanation: 'Paragraph D states: "By distilling site stratigraphy into an abstract topological flow diagram, the Harris Matrix disengaged chronological sequence from absolute physical elevation".'
  }
];
