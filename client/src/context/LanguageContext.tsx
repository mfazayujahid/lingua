import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'id';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, replacements?: Record<string, string | number>) => string;
}

const DICTIONARY: Record<Language, Record<string, string>> = {
  en: {
    // Nav Items
    'nav.dashboard': 'Dashboard',
    'nav.lecture': 'Learning Hub',
    'nav.ielts_lecture': 'Learning Hub',
    'nav.jlpt_lecture': 'Learning Hub',
    'nav.curriculum': 'Curriculum',
    'nav.srs': 'SRS Flashcards',
    'nav.kanji': 'Kana & Kanji',
    'nav.studio': 'Writing Studio',
    'nav.exam': 'Practice Exam',
    'nav.analytics': 'Analytics',
    'nav.short.dashboard': 'Dashboard',
    'nav.short.lecture': 'Learn',
    'nav.short.curriculum': 'Curriculum',
    'nav.short.srs': 'SRS',
    'nav.short.kanji': 'Kanji',
    'nav.short.studio': 'Studio',
    'nav.short.exam': 'Exam',
    'nav.short.analytics': 'Stats',

    // Top Bar
    'topbar.furigana': 'ふりがな',
    'topbar.furigana_tooltip': 'Toggle Hiragana reading subtext below all Kanji across the application',
    'topbar.theme_tooltip_light': 'Switch to Light Mode',
    'topbar.theme_tooltip_dark': 'Switch to Dark Mode',
    'topbar.lang_tooltip': 'Ganti ke Bahasa Indonesia (Switch to Indonesian)',
    'topbar.streak_suffix': 'd',
    'topbar.track.jp_group': 'Japanese (JLPT)',
    'topbar.track.en_group': 'English (IELTS)',

    // Footer
    'footer.brand_desc': 'LinguaMastery • IELTS Academic/General & JLPT N5–N1 Standardized Architecture',
    'footer.theme_label': 'Minimalist Washi & Sumi Theme',
    'footer.zero_synthetic': 'Zero Synthetic Data State',

    // Dashboard Track Selector
    
    // IELTS Guide & Navigation
    'nav.ielts_speaking': 'Speaking Studio',
    'nav.short.speaking': 'Speaking',
    'nav.ielts_studio': 'Writing Studio',
    'nav.ielts_vocab': 'Vocabulary SRS',
    'nav.ielts_exam': 'IELTS Mock Exam',
    'nav.ielts_analytics': 'Band Analytics',
    'topbar.switch_to_en': 'Switch to English (IELTS)',
    'topbar.switch_to_jp': 'Switch to Japanese (JLPT)',
    'topbar.track_jp_btn': 'Japanese (JLPT)',
    'topbar.track_en_btn': 'English (IELTS)',

    // IELTS Speaking Studio
    'speaking.header_badge': 'Official IELTS Voice Interview Simulation • Band 9 Matrix',
    'speaking.header_title': 'Interactive IELTS Speaking Studio',
    'speaking.header_desc': 'Practice authentic oral interviews with real-time voice recognition, automated 120s timing gauge, and official 4-criteria diagnostic scoring.',
    'speaking.battery_a_title': 'Battery A (Mentorship)',
    'speaking.battery_b_title': 'Battery B (Urban Heritage)',
    'speaking.mode_full': 'Full 3-Part Simulation (11–14 min)',
    'speaking.mode_cue_card': 'Cue Card Only (Part 2 Practice)',
    'speaking.calib_title': 'Microphone Calibration & Ambient Check',
    'speaking.calib_desc': 'Please allow microphone access to enable real-time speech-to-text transcription and audio analysis.',
    'speaking.btn_grant_mic': 'Allow Microphone Access',
    'speaking.mic_ready': 'Microphone Calibrated & Ready',
    'speaking.btn_start_sim': 'Start Speaking Interview',
    'speaking.part1_title': 'Part 1 • Introduction & Familiar Topics',
    'speaking.part2_title': 'Part 2 • Individual Long Turn (Cue Card)',
    'speaking.part3_title': 'Part 3 • Analytical Two-Way Discussion',
    'speaking.prep_time_left': 'Preparation Time Left',
    'speaking.scratchpad_label': 'Virtual Scratchpad (Keywords & Mind-Mapping)',
    'speaking.scratchpad_placeholder': 'Jot down key words here: Past -> Present -> Future...',
    'speaking.btn_start_speaking_now': "I'm Ready, Start Speaking Now",
    'speaking.zone_undertime': 'Under-time (<60s) - Penalty Risk',
    'speaking.zone_adequate': 'Adequate (60–90s)',
    'speaking.zone_optimal': 'Optimal (90–120s) - Band 7.5+ Target',
    'speaking.evaluating': 'Evaluating Speech Diagnostics...',
    'speaking.scorecard_title': 'Official 9-Band Diagnostic Scorecard',
    'speaking.criteria_fc': 'Fluency & Coherence',
    'speaking.criteria_lr': 'Lexical Resource',
    'speaking.criteria_gra': 'Grammatical Range & Accuracy',
    'speaking.criteria_pr': 'Pronunciation',
    'speaking.model_answer_title': 'Band 8.5 Model Answer Comparison',
    'speaking.retake_btn': 'Practice Another Session',
    'dashboard.ielts_guide_badge': 'IELTS Preparation Guide • Structured Roadmap',
    'dashboard.ielts_guide_title': 'Target Band 7.5+: Recommended Learning Path',
    'dashboard.ielts_guide_faq': '"How to achieve Band 7.5+?" → Balance Task 1/2 Writing with Reading & Listening mastery.',
    'dashboard.ielts_guide_body': 'Prepare for IELTS Academic or General Training with Cambridge-aligned practice. Master analytical essay structure, complex sentence cohesion, academic vocabulary, and authentic timed reading passages with instant band rubric scoring.',
    'dashboard.ielts_step1_badge': 'Step 1 • Writing Studio',
    'dashboard.ielts_step1_title': 'Task 1 & Task 2 Essay Evaluation',
    'dashboard.ielts_step1_desc': 'Write essays with deterministic assessment across all 4 official criteria: Task Response, Coherence & Cohesion, Lexical Resource, and Grammatical Range & Accuracy.',
    'dashboard.ielts_step1_btn': 'Open IELTS Writing Studio',
    'dashboard.ielts_step2_badge': 'Step 2 • Core Curriculum',
    'dashboard.ielts_step2_title': 'Reading & Listening Modules',
    'dashboard.ielts_step2_desc': 'Practice authentic multi-paragraph reading passages with true/false/not given and passage analysis matching Cambridge standards.',
    'dashboard.ielts_step2_btn': 'Study IELTS Modules',
    'dashboard.ielts_step3_badge': 'Step 3 • Full Simulation',
    'dashboard.ielts_step3_title': 'Timed Official Mock Exam',
    'dashboard.ielts_step3_desc': 'Test your endurance under authentic timed exam conditions to evaluate your projected Band score before test day.',
    'dashboard.ielts_step3_btn': 'Start Timed Mock Exam',
    'dashboard.jp_track': 'Japanese Track:',
    'dashboard.ielts_track': 'IELTS Track:',
    'dashboard.academic': 'Academic',
    'dashboard.general': 'General Training',

    // Dashboard Hero Beginner Guide
    'dashboard.guide_badge': 'Beginner Guide • Where to Start & How to Learn',
    'dashboard.guide_title': 'Recommended Learning Order: Start Here!',
    'dashboard.guide_faq': '"Do I have to learn all words first?" → No! Learn grammar and words together.',
    'dashboard.guide_body': 'You do not need to memorize thousands of vocabulary words or all 2,136 kanji in isolation before starting. Following proven methodology (from Genki and Minna no Nihongo), start by learning Kana (Hiragana & Katakana), then acquire vocabulary and grammar together in natural sentence patterns, with daily kanji learned in parallel.',
    
    // Dashboard 3 Steps
    'dashboard.step1_badge': 'Step 1 • Writing Foundation',
    'dashboard.step1_title': 'Kana Literacy (Hiragana & Katakana)',
    'dashboard.step1_desc': 'Stop using Romaji. Practice the 46 Hiragana and 46 Katakana characters with correct stroke order and stroke animations.',
    'dashboard.step1_btn': 'Start Learning Kana (平仮名・片仮名)',
    
    'dashboard.step2_badge': 'Step 2 • Grammar & Vocabulary',
    'dashboard.step2_title': 'Core Sentence Patterns (~です & は)',
    'dashboard.step2_desc': 'Learn topic particle は and polite copula です together with your first 15 essential survival words in natural sentences.',
    'dashboard.step2_btn': 'Start Lesson 1 Grammar (基本文型)',
    
    'dashboard.step3_badge': 'Step 3 • Daily Kanji',
    'dashboard.step3_title': 'First 10 Daily Kanji in Compounds',
    'dashboard.step3_desc': 'Learn everyday kanji (日, 本, 人, 一, 二, 三, 月, 木, 水, 火) in compound words using mnemonics and FSRS reviews.',
    'dashboard.step3_btn': 'Practice First 10 Kanji (基本漢字)',

    // Dashboard Hero Mission
    'dashboard.hero_track_prefix': 'Track',
    'dashboard.hero_jlpt_title': 'JLPT {level} Mastery Roadmap',
    'dashboard.hero_ielts_title': 'IELTS Academic 7.5+ Target Mission',
    'dashboard.hero_jlpt_desc': 'Master Language Knowledge (Grammar, Vocabulary & Kanji), Reading Comprehension, Listening, and Productive Writing with spaced repetition.',
    'dashboard.hero_ielts_desc': 'Master Academic Reading, Analytical Writing Tasks, and Listening with real test items and deterministic scoring.',
    'dashboard.btn_explore_curriculum': 'Explore Curriculum',
    'dashboard.btn_fsrs_queue': 'FSRS Review Queue',
    'dashboard.readiness_title': 'Estimated Readiness',
    'dashboard.readiness_active': 'Active syllabus progress recorded',
    'dashboard.readiness_empty': 'No recorded activity yet. Start with Step 1!',
    'dashboard.recommended_title': 'Recommended Modules for You',
    'dashboard.view_all_lessons': 'View All Lessons',
    'dashboard.lesson_prefix': 'Lesson',
    'dashboard.mins_suffix': 'mins',
    'dashboard.start_lesson': 'Start Lesson',

    // Curriculum
    'curriculum.nav_title': 'Curriculum Navigator',
    'curriculum.default_title': 'Standardized Curriculum',
    'curriculum.subtitle': 'Structured learning paths, progressive difficulty stages, and verified competency units.',
    'curriculum.roadmap_badge': '6-Stage Guided Progressive Roadmap',
    'curriculum.roadmap_title': 'Pedagogical Learning Corridor: How to Progress',
    'curriculum.roadmap_desc': 'Follow this step-by-step path designed to eliminate beginner anxiety. Move systematically from writing foundations to authentic test simulation.',
    'curriculum.stage_focus_badge': 'Stage {stage} Focus Unit',
    'curriculum.target_competency': 'Target Competency:',
    'curriculum.all_modules_title': 'Complete Curriculum Modules & Pillars',
    'curriculum.pillar1': 'Pillar 1: Language Knowledge',
    'curriculum.pillar2': 'Pillar 2: Reading Comprehension',
    'curriculum.pillar3': 'Pillar 3: Listening & Practical Application',
    'curriculum.unit_prefix': 'Unit',
    'curriculum.launch_unit': 'Launch Unit',
    'curriculum.completed': 'Completed',

    // Curriculum 6 Stages
    'curriculum.s1_badge': 'Stage 1 • Writing Foundation',
    'curriculum.s1_title': 'Kana Literacy: Hiragana & Katakana (92 Characters)',
    'curriculum.s1_desc': 'Stop relying on Romaji. Master the 46 Hiragana and 46 Katakana syllables with animated stroke order and vector canvas tracing. This is the absolute foundation for all Japanese reading and grammar.',
    'curriculum.s1_target': '46 Hiragana + 46 Katakana reading, writing & correct stroke order',
    'curriculum.s1_action': 'Launch Kana Studio (平仮名・片仮名)',

    'curriculum.s2_badge': 'Stage 2 • Core Grammar & Vocab',
    'curriculum.s2_title': 'Core Sentence Patterns: Topic Particle は & Polite Copula です',
    'curriculum.s2_desc': 'Do not memorize isolated vocabulary lists! Learn the fundamental sentence structure (Topic Particle は + Polite Copula です/ではありません) alongside your first 15 survival words (私, 学生, 先生, 日本, これ) in natural context.',
    'curriculum.s2_target': 'Topic Particle は, Copula です/ではありません + 15 core survival words',
    'curriculum.s2_action': 'Start Lesson 1 (基本文型と助詞)',

    'curriculum.s3_badge': 'Stage 3 • Daily Kanji',
    'curriculum.s3_title': 'Foundational Daily Kanji (10 High-Frequency Characters)',
    'curriculum.s3_desc': 'Do not attempt to memorize all 2,136 Joyo kanji at once. Learn the 10 most common daily kanji (日, 本, 人, 一, 二, 三, 月, 木, 水, 火) in parallel with grammar using the 4-step formula: Radicals → Mnemonics → Native Compounds → FSRS Spaced Repetition.',
    'curriculum.s3_target': 'First 10 Kanji (日, 本, 人...) + 25 high-frequency compound words (jukugo)',
    'curriculum.s3_action': 'Practice First 10 Kanji (基本漢字)',

    'curriculum.s4_badge': 'Stage 4 • Action Verbs & Particles',
    'curriculum.s4_title': 'Action Verbs & Key Case Particles (を・に・で・へ)',
    'curriculum.s4_desc': 'Master daily action verbs in their polite form (~ます / ~ません) combined with essential case particles: Direct Object を, Time/Destination に, Location of Action で, and Direction へ.',
    'curriculum.s4_target': 'Polite verbs (~ます) & Case particles (を, に, で, へ)',
    'curriculum.s4_action': 'Practice Particles & Verbs (格助詞演習)',

    'curriculum.s5_badge': 'Stage 5 • Contextual Reading & Listening',
    'curriculum.s5_title': 'Short Reading Comprehension & Real-Life Dialogues',
    'curriculum.s5_desc': 'Apply your vocabulary, kanji, and grammar to real-world scenarios. Practice extracting key information from everyday notices (bulletin boards, event flyers) and following natural dialogues (meetups, appointments).',
    'curriculum.s5_target': 'Everyday life notices reading & audio dialogue comprehension',
    'curriculum.s5_action': 'Start Reading & Listening (実戦読解・聴解)',

    'curriculum.s6_badge': 'Stage 6 • Star Drills & Exam Simulation',
    'curriculum.s6_title': 'Star Reordering Drills & Simulated Test Environment',
    'curriculum.s6_desc': 'Test your understanding of Japanese sentence structure with JLPT-style Star Reordering Drills (identify the option that fits into the ★ position). Verify grammatical mechanics under timed test conditions.',
    'curriculum.s6_target': 'Sentence ordering star drills (＿＿ ＿＿ ★ ＿＿) & timed practice exam scoring',
    'curriculum.s6_action': 'Take Practice Exam (実戦模擬試験)',

    // Exam Runner
    'exam.select_module': 'Select Practice Module ({track}):',
    'exam.question_header': 'Question {current} of {total}',
    'exam.time_remaining': 'Time Remaining',
    'exam.submit_all': 'Submit All',
    'exam.reference_title': 'Reference Passage & Context',
    'exam.question_label': 'Question {idx}',
    'exam.previous': 'Previous',
    'exam.next': 'Next',
    'exam.no_items': 'No test items found for this module.',
    'exam.no_items_desc': 'Please select one of the practice modules above or browse the curriculum.',
    'exam.completed_title': 'Exam Completed!',
    'exam.raw_score': 'Raw Score',
    'exam.est_score': 'Estimated Score / Band',
    'exam.verdict': 'Verdict',
    'exam.retake': 'Retake Drill',
    'exam.back_curriculum': 'Back to Curriculum',
    'exam.explanations_title': 'Pedagogical Explanations & Answer Analysis',
    'exam.item_prefix': 'Item',
    'exam.your_answer': 'Your answer:',
    'exam.correct_answer': 'Correct:',
    'exam.explanation_label': 'Explanation:',

    // Writing Studio
    'studio.header_badge': 'Productive Evaluation Studio',
    'studio.header_title': 'Writing Composition Studio',
    'studio.header_desc': 'Diagnostic evaluation against criterion descriptors, grammatical range, lexical collocations, and formal coherence.',
    'studio.tab_editor': 'My Composition Editor',
    'studio.tab_model': 'Model Benchmark Answer',
    'studio.prompt_header': 'Target Prompt & Pedagogical Instructions',
    'studio.unit_count': 'Count: {count} {unit}',
    'studio.unit_min': '/ {min} min',
    'studio.load_sample': 'Load Sample Draft',
    'studio.placeholder_jp': 'Write your composition here in polite です・ます style or formal essay style...',
    'studio.placeholder_en': 'Type or paste your formal essay here...',
    'studio.needs_more': 'Needs {diff} more {unit} to meet length standard.',
    'studio.length_satisfied': 'Target length satisfied.',
    'studio.evaluating': 'Evaluating Rubrics...',
    'studio.evaluate_btn': 'Evaluate 4 Criteria',
    'studio.predicted_score': 'Predicted Score / Band',
    'studio.diagnostic_improvements': 'Targeted Diagnostic Improvements',
    'studio.rubric_ready_title': 'Criterion Breakdown Ready',
    'studio.rubric_ready_desc': 'Write at least {min} {unit} and click "Evaluate 4 Criteria" to generate your assessment diagnostic report.',
    'studio.official_benchmark': 'Official Benchmark',
    'studio.pedagogical_justification': 'Pedagogical Justification:',

    // Kanji Studio
    'kanji.header_badge': 'Vector Handwriting & Joyo Catalog',
    'kanji.header_title': 'Kana & Kanji Studio',
    'kanji.header_desc': 'Master stroke order with vector tracing, Kangxi radicals, memory mnemonics, native compounds, and FSRS spaced repetition.',
    'kanji.tab_hiragana': 'Hiragana',
    'kanji.tab_katakana': 'Katakana',
    'kanji.tab_joyo': '2,136 Joyo Kanji (常用漢字)',
    'kanji.search_placeholder': 'Search kanji, meaning, reading...',
    'kanji.jlpt_level': 'JLPT Level:',
    'kanji.step1_tab': '1. Radicals (部首)',
    'kanji.step2_tab': '2. Mnemonic (記憶術)',
    'kanji.step3_tab': '3. Compounds (熟語)',
    'kanji.step4_tab': '4. FSRS Review (復習)',
    'kanji.step1_title': 'Step 1: Deconstruct Radicals & Primitives (部首分解)',
    'kanji.step1_desc': 'Never memorize a complex character as arbitrary lines. Deconstruct it into its semantic Kangxi radical and constituent building blocks:',
    'kanji.step2_title': 'Step 2: Link Meanings & Readings with Vivid Mnemonics',
    'kanji.step3_title': 'Step 3: Learn Readings Inside Real Vocabulary Compounds (熟語)',
    'kanji.step3_desc': 'Never study characters in isolation. Anchor the On\'yomi and Kun\'yomi inside high-frequency Jukugo compounds:',
    'kanji.step4_title': 'Step 4: Review with Adaptive Spaced Repetition (FSRS)',
    'kanji.step4_desc': 'Consolidate memory just before the forgetting curve triggers. Choose your sustainable daily pace:',
    'kanji.pacing_sustainable_title': 'Sustainable Habit Mode',
    'kanji.pacing_sustainable_desc': '• 3–6 New Kanji/day (~15–20 Mins)\n• Steady long-term retention without review backlog panic.',
    'kanji.pacing_sprint_title': 'Intensive Sprint Mode',
    'kanji.pacing_sprint_desc': '• 10–25 New Kanji/day (~45–60 Mins)\n• Accelerated recognition pass for imminent exam targets.',
    'kanji.schedule_fsrs_btn': 'Enroll 「{char}」 into FSRS Review Deck Now',
    'kanji.stroke_progress': 'Stroke {curr} of {total}',
    'kanji.toggle_ghost': 'Toggle Ghost Guides',
    'kanji.reset_canvas': 'Reset Canvas',
    'kanji.draw_instruction': 'Draw stroke {curr} inside the calligraphic grid.',
    'kanji.meaning_story': 'Meaning Story (意味の記憶術)',
    'kanji.reading_mnemonic': 'Reading Mnemonic (音訓の記憶術)',

    // SRS Reviewer
    'srs.header_title': 'Spaced Repetition Review Queue (FSRS)',
    'srs.due_count': '{count} cards due for retention consolidation today.',
    'srs.completed_title': 'Review Session Completed!',
    'srs.completed_desc': 'You have cleared all pending cards for today. Your memory traces have been reinforced according to the FSRS model.',
    'srs.btn_dashboard': 'Back to Dashboard',
    'srs.show_answer': 'Show Answer (Space)',
    'srs.hide_answer': 'Hide Answer',
    'srs.grade_again': 'Again (1)',
    'srs.grade_hard': 'Hard (2)',
    'srs.grade_good': 'Good (3)',
    'srs.grade_easy': 'Easy (4)',
    'srs.example_sentence': 'Context Example Sentence:',

    // Analytics
    'analytics.cockpit_badge': 'Diagnostic Readiness Cockpit',
    'analytics.cockpit_title': 'Proficiency Forecast & Analytics',
    'analytics.cockpit_desc': 'True state diagnostic indicators without synthetic simulations.',
    'analytics.projected_score': 'Projected Score',
    'analytics.pass_mark': 'Official Pass Mark',
    'analytics.srs_retention': 'SRS Memory Retention',
    'analytics.target_label': 'Target',
    'analytics.stability_label': 'Stability',
    'analytics.calibrate_prompt': 'Complete an exam to establish baseline.'
  },

  id: {
    // Nav Items (100% Indonesian)
    'nav.dashboard': 'Dasbor',
    'nav.lecture': 'Pusat Belajar',
    'nav.ielts_lecture': 'Pusat Belajar',
    'nav.jlpt_lecture': 'Pusat Belajar',
    'nav.curriculum': 'Kurikulum',
    'nav.srs': 'Kartu Kilas SRS',
    'nav.kanji': 'Huruf & Kanji',
    'nav.studio': 'Studio Menulis',
    'nav.exam': 'Ujian Latihan',
    'nav.analytics': 'Analisis',
    'nav.short.dashboard': 'Dasbor',
    'nav.short.lecture': 'Belajar',
    'nav.short.curriculum': 'Kurikulum',
    'nav.short.srs': 'SRS',
    'nav.short.kanji': 'Kanji',
    'nav.short.studio': 'Studio',
    'nav.short.exam': 'Ujian',
    'nav.short.analytics': 'Analisis',

    // Top Bar (100% Indonesian)
    'topbar.furigana': 'ふりがな',
    'topbar.furigana_tooltip': 'Aktifkan subteks cara baca Hiragana di bawah semua Kanji di seluruh aplikasi',
    'topbar.theme_tooltip_light': 'Ganti ke Mode Terang',
    'topbar.theme_tooltip_dark': 'Ganti ke Mode Gelap',
    'topbar.lang_tooltip': 'Switch to English (Beralih ke Bahasa Inggris)',
    'topbar.streak_suffix': ' hari',
    'topbar.track.jp_group': 'Bahasa Jepang (JLPT)',
    'topbar.track.en_group': 'Bahasa Inggris (IELTS)',

    // Footer (100% Indonesian)
    'footer.brand_desc': 'LinguaMastery • Arsitektur Standar IELTS Academic/General & JLPT N5–N1',
    'footer.theme_label': 'Tema Washi & Sumi Minimalis',
    'footer.zero_synthetic': 'Bebas Data Sintetis',

    // Dashboard Track Selector (100% Indonesian)
    
    // IELTS Guide & Navigation (100% Indonesian)
    'nav.ielts_speaking': 'Studio Berbicara',
    'nav.short.speaking': 'Bicara',
    'nav.ielts_studio': 'Studio Esai',
    'nav.ielts_vocab': 'Kosa Kata SRS',
    'nav.ielts_exam': 'Ujian IELTS',
    'nav.ielts_analytics': 'Prediksi Skor Band',
    'topbar.switch_to_en': 'Beralih ke Bahasa Inggris (IELTS)',
    'topbar.switch_to_jp': 'Beralih ke Bahasa Jepang (JLPT)',
    'topbar.track_jp_btn': 'Bahasa Jepang (JLPT)',
    'topbar.track_en_btn': 'Bahasa Inggris (IELTS)',

    // IELTS Speaking Studio (100% Indonesian)
    'speaking.header_badge': 'Simulasi Wawancara Lisan Resmi IELTS • Matriks Band 9',
    'speaking.header_title': 'Studio Berbicara Interaktif IELTS',
    'speaking.header_desc': 'Latihan wawancara lisan resmi dengan pengenalan suara langsung, pengukur durasi 120 detik terstandarisasi, dan evaluasi diagnostik 4 kriteria.',
    'speaking.battery_a_title': 'Paket A (Pembimbing & AI)',
    'speaking.battery_b_title': 'Paket B (Warisan Kota & Alam)',
    'speaking.mode_full': 'Simulasi Lengkap 3 Bagian (11–14 Menit)',
    'speaking.mode_cue_card': 'Khusus Cue Card (Latihan Part 2)',
    'speaking.calib_title': 'Kalibrasi Mikrofon & Uji Kebisingan Ruangan',
    'speaking.calib_desc': 'Izinkan akses mikrofon untuk mengaktifkan transkripsi ucapan langsung dan analisis vokal audio.',
    'speaking.btn_grant_mic': 'Izinkan Akses Mikrofon',
    'speaking.mic_ready': 'Mikrofon Siap & Terkalibrasi',
    'speaking.btn_start_sim': 'Mulai Wawancara Bicara',
    'speaking.part1_title': 'Bagian 1 • Pengenalan & Topik Keseharian',
    'speaking.part2_title': 'Bagian 2 • Monolog Cue Card 1–2 Menit',
    'speaking.part3_title': 'Bagian 3 • Diskusi Analitis Dua Arah',
    'speaking.prep_time_left': 'Waktu Persiapan Tersisa',
    'speaking.scratchpad_label': 'Catatan Virtual (Kata Kunci & Peta Pikiran)',
    'speaking.scratchpad_placeholder': 'Tulis kata kunci di sini: Masa Lalu -> Masa Sekarang -> Masa Depan...',
    'speaking.btn_start_speaking_now': 'Saya Siap, Mulai Bicara Sekarang',
    'speaking.zone_undertime': 'Durasi Kurang (<60 dtk) - Risiko Penalti Band',
    'speaking.zone_adequate': 'Durasi Memadai (60–90 dtk)',
    'speaking.zone_optimal': 'Durasi Optimal (90–120 dtk) - Standar Band 7.5+',
    'speaking.evaluating': 'Menganalisis Diagnostik Suara...',
    'speaking.scorecard_title': 'Laporan Evaluasi Diagnostik 9-Band Resmi',
    'speaking.criteria_fc': 'Kelancaran & Koherensi',
    'speaking.criteria_lr': 'Kekayaan Kosakata',
    'speaking.criteria_gra': 'Rentang & Akurasi Tata Bahasa',
    'speaking.criteria_pr': 'Pelafalan & Intonasi',
    'speaking.model_answer_title': 'Komparasi Jawaban Ideal Band 8.5',
    'speaking.retake_btn': 'Latihan Sesi Baru',
    'dashboard.ielts_guide_badge': 'Panduan Persiapan IELTS • Peta Jalan Terstruktur',
    'dashboard.ielts_guide_title': 'Target Band 7.5+: Urutan Belajar yang Disarankan',
    'dashboard.ielts_guide_faq': '"Bagaimana meraih Band 7.5+?" → Kuasai struktur esai Task 1/2 bersama pemahaman membaca & menyimak.',
    'dashboard.ielts_guide_body': 'Persiapkan diri untuk IELTS Akademik atau Pelatihan Umum dengan latihan berstandar Cambridge. Kuasai struktur penulisan esai analitis, kohesi kalimat kompleks, kosakata akademis, dan teks bacaan otentik berwaktu dengan penilaian rubrik band instan.',
    'dashboard.ielts_step1_badge': 'Langkah 1 • Studio Esai',
    'dashboard.ielts_step1_title': 'Evaluasi Esai Task 1 & Task 2',
    'dashboard.ielts_step1_desc': 'Tulis esai dengan penilaian objektif berdasarkan 4 kriteria resmi: Pencapaian Tugas, Koherensi & Kohesi, Variasi Kosakata, serta Akurasi Tata Bahasa.',
    'dashboard.ielts_step1_btn': 'Buka Studio Esai IELTS',
    'dashboard.ielts_step2_badge': 'Langkah 2 • Kurikulum Inti',
    'dashboard.ielts_step2_title': 'Modul Membaca & Menyimak',
    'dashboard.ielts_step2_desc': 'Latih pemahaman membaca teks multi-paragraf otentik dengan tipe soal benar/salah/tidak disebutkan yang sesuai standar Cambridge.',
    'dashboard.ielts_step2_btn': 'Pelajari Modul IELTS',
    'dashboard.ielts_step3_badge': 'Langkah 3 • Simulasi Ujian',
    'dashboard.ielts_step3_title': 'Simulasi Ujian Resmi Berwaktu',
    'dashboard.ielts_step3_desc': 'Uji ketahanan mental dan ketepatan Anda dalam simulasi berwaktu nyata untuk mengetahui estimasi skor Band sebelum hari ujian.',
    'dashboard.ielts_step3_btn': 'Mulai Ujian Simulasi',
    'dashboard.jp_track': 'Jalur Jepang:',
    'dashboard.ielts_track': 'Jalur IELTS:',
    'dashboard.academic': 'Akademik',
    'dashboard.general': 'Pelatihan Umum',

    // Dashboard Hero Beginner Guide (100% Indonesian)
    'dashboard.guide_badge': 'Panduan Pemula • Dari Mana Memulai & Cara Belajar',
    'dashboard.guide_title': 'Urutan Belajar yang Disarankan: Mulai di Sini!',
    'dashboard.guide_faq': '"Apakah saya harus menghafal semua kata dulu?" → Tidak! Pelajari tata bahasa dan kata bersamaan.',
    'dashboard.guide_body': 'Anda tidak perlu menghafal ribuan kosakata atau seluruh 2.136 kanji terpisah sebelum mulai. Mengikuti metodologi terbukti (dari Genki dan Minna no Nihongo), mulailah dengan mempelajari Kana (Hiragana & Katakana), kemudian kuasai kosakata dan tata bahasa bersama-sama dalam pola kalimat alami, dengan kanji harian dipelajari secara paralel.',
    
    // Dashboard 3 Steps (100% Indonesian)
    'dashboard.step1_badge': 'Langkah 1 • Fondasi Huruf',
    'dashboard.step1_title': 'Kemampuan Membaca Kana (Hiragana & Katakana)',
    'dashboard.step1_desc': 'Hentikan penggunaan Romaji. Latihlah 46 huruf Hiragana dan 46 huruf Katakana dengan urutan goresan yang benar dan animasi goresan.',
    'dashboard.step1_btn': 'Mulai Belajar Kana',
    
    'dashboard.step2_badge': 'Langkah 2 • Tata Bahasa & Kosakata',
    'dashboard.step2_title': 'Pola Kalimat Dasar (~です & は)',
    'dashboard.step2_desc': 'Pelajari partikel topik は dan kopula sopan です bersama 15 kata penting pertahanan hidup pertama Anda dalam kalimat alami.',
    'dashboard.step2_btn': 'Mulai Pelajaran 1 Tata Bahasa',
    
    'dashboard.step3_badge': 'Langkah 3 • Kanji Sehari-hari',
    'dashboard.step3_title': '10 Kanji Harian Pertama dalam Kata Majemuk',
    'dashboard.step3_desc': 'Pelajari kanji sehari-hari (日, 本, 人, 一, 二, 三, 月, 木, 水, 火) dalam kata majemuk menggunakan mnemonik dan ulasan FSRS.',
    'dashboard.step3_btn': 'Latihan 10 Kanji Pertama',

    // Dashboard Hero Mission (100% Indonesian)
    'dashboard.hero_track_prefix': 'Jalur',
    'dashboard.hero_jlpt_title': 'Peta Jalan Penguasaan JLPT {level}',
    'dashboard.hero_ielts_title': 'Misi Target IELTS Akademik 7.5+',
    'dashboard.hero_jlpt_desc': 'Kuasai Pengetahuan Bahasa (Tata Bahasa, Kosakata & Kanji), Pemahaman Membaca, Pendengaran, dan Menulis Produktif dengan pengulangan berjeda.',
    'dashboard.hero_ielts_desc': 'Kuasai Membaca Akademik, Tugas Menulis Analitis, dan Menyimak dengan butir soal ujian nyata serta penilaian deterministik.',
    'dashboard.btn_explore_curriculum': 'Jelajahi Kurikulum',
    'dashboard.btn_fsrs_queue': 'Antrean Ulasan FSRS',
    'dashboard.readiness_title': 'Perkiraan Kesiapan',
    'dashboard.readiness_active': 'Kemajuan silabus aktif tercatat',
    'dashboard.readiness_empty': 'Belum ada aktivitas tercatat. Mulai dari Langkah 1!',
    'dashboard.recommended_title': 'Modul yang Disarankan untuk Anda',
    'dashboard.view_all_lessons': 'Lihat Semua Pelajaran',
    'dashboard.lesson_prefix': 'Pelajaran',
    'dashboard.mins_suffix': 'mnt',
    'dashboard.start_lesson': 'Mulai Pelajaran',

    // Curriculum (100% Indonesian)
    'curriculum.nav_title': 'Navigator Kurikulum',
    'curriculum.default_title': 'Kurikulum Terstandarisasi',
    'curriculum.subtitle': 'Jalur pembelajaran terstruktur, tahapan kesulitan bertahap, dan unit kompetensi terverifikasi.',
    'curriculum.roadmap_badge': 'Peta Jalan Progresif Terpandu 6 Tahap',
    'curriculum.roadmap_title': 'Koridor Pembelajaran Pedagogis: Cara Maju Selangkah Demi Selangkah',
    'curriculum.roadmap_desc': 'Ikuti alur bertahap ini yang dirancang untuk mengikis kecemasan pemula. Maju secara sistematis mulai dari fondasi huruf hingga simulasi ujian nyata.',
    'curriculum.stage_focus_badge': 'Unit Fokus Tahap {stage}',
    'curriculum.target_competency': 'Target Kompetensi:',
    'curriculum.all_modules_title': 'Semua Modul & Pilar Kurikulum',
    'curriculum.pillar1': 'Pilar 1: Pengetahuan Bahasa (Tata Bahasa & Kosakata)',
    'curriculum.pillar2': 'Pilar 2: Pemahaman Membaca',
    'curriculum.pillar3': 'Pilar 3: Menyimak & Penerapan Praktis',
    'curriculum.unit_prefix': 'Unit',
    'curriculum.launch_unit': 'Mulai Unit',
    'curriculum.completed': 'Selesai',

    // Curriculum 6 Stages (100% Indonesian)
    'curriculum.s1_badge': 'Tahap 1 • Fondasi Huruf',
    'curriculum.s1_title': 'Kemampuan Membaca Kana: Hiragana & Katakana (92 Karakter)',
    'curriculum.s1_desc': 'Hentikan ketergantungan pada Romaji. Kuasai 46 suku kata Hiragana dan 46 suku kata Katakana dengan animasi urutan goresan dan penelusuran kanvas vektor. Ini adalah fondasi mutlak untuk seluruh pembacaan dan tata bahasa Jepang.',
    'curriculum.s1_target': 'Membaca, menulis & urutan goresan benar 46 Hiragana + 46 Katakana',
    'curriculum.s1_action': 'Buka Studio Kana',

    'curriculum.s2_badge': 'Tahap 2 • Tata Bahasa & Kosakata Inti',
    'curriculum.s2_title': 'Pola Kalimat Inti: Partikel Topik は & Kopula Sopan です',
    'curriculum.s2_desc': 'Jangan menghafal daftar kata terpisah! Pelajari struktur kalimat mendasar (Partikel Topik は + Kopula Sopan です/ではありません) bersama 15 kata pertahanan hidup pertama Anda dalam konteks alami.',
    'curriculum.s2_target': 'Partikel Topik は, Kopula です/ではありません + 15 kata penting',
    'curriculum.s2_action': 'Mulai Pelajaran 1 (基本文型と助詞)',

    'curriculum.s3_badge': 'Tahap 3 • Kanji Sehari-hari',
    'curriculum.s3_title': 'Kanji Harian Mendasar (10 Karakter Frekuensi Tinggi)',
    'curriculum.s3_desc': 'Jangan mencoba menghafal semua 2.136 kanji Joyo sekaligus. Pelajari 10 kanji harian paling umum (日, 本, 人, 一, 二, 三, 月, 木, 水, 火) secara paralel dengan tata bahasa menggunakan rumus 4 langkah: Radikal → Mnemonik → Kata Majemuk Alami → Pengulangan Berjeda FSRS.',
    'curriculum.s3_target': '10 Kanji Pertama (日, 本, 人...) + 25 kata majemuk (jukugo) frekuensi tinggi',
    'curriculum.s3_action': 'Latihan 10 Kanji Pertama',

    'curriculum.s4_badge': 'Tahap 4 • Kata Kerja Aksi & Partikel Kasus',
    'curriculum.s4_title': 'Kata Kerja Aksi & Partikel Kasus Kunci (を・に・で・へ)',
    'curriculum.s4_desc': 'Kuasai kata kerja tindakan sehari-hari dalam bentuk sopan (~ます / ~ません) dipadukan dengan partikel kasus esensial: Objek Langsung を, Waktu/Tujuan に, Tempat Tindakan で, dan Arah へ.',
    'curriculum.s4_target': 'Kata kerja sopan (~ます) & Partikel kasus (を, に, で, へ)',
    'curriculum.s4_action': 'Latihan Partikel & Kata Kerja (格助詞演習)',

    'curriculum.s5_badge': 'Tahap 5 • Membaca Kontekstual & Mendengarkan',
    'curriculum.s5_title': 'Pemahaman Membaca Singkat & Dialog Kehidupan Nyata',
    'curriculum.s5_desc': 'Terapkan kosakata, kanji, dan tata bahasa Anda ke dalam situasi dunia nyata. Latihlah mengekstraksi informasi penting dari pengumuman sehari-hari (papan buletin, selebaran acara) dan menyimak percakapan alami (pertemuan, janji temu).',
    'curriculum.s5_target': 'Membaca pengumuman kehidupan nyata & pemahaman dialog audio',
    'curriculum.s5_action': 'Mulai Membaca & Menyimak (実戦読解・聴解)',

    'curriculum.s6_badge': 'Tahap 6 • Latihan Bintang & Simulasi Ujian',
    'curriculum.s6_title': 'Latihan Penyusunan Kalimat Bintang & Lingkungan Ujian Simulasi',
    'curriculum.s6_desc': 'Uji pemahaman Anda tentang struktur kalimat bahasa Jepang dengan latihan penyusunan bintang bergaya JLPT (temukan opsi yang mengisi posisi bintang ★). Ujilah ketepatan gramatikal di bawah kondisi ujian berbatas waktu.',
    'curriculum.s6_target': 'Latihan penyusunan kalimat bintang (＿＿ ＿＿ ★ ＿＿) & penilaian ujian latihan berbatas waktu',
    'curriculum.s6_action': 'Ikuti Ujian Latihan (実戦模擬試験)',

    // Exam Runner (100% Indonesian)
    'exam.select_module': 'Pilih Modul Latihan ({track}):',
    'exam.question_header': 'Pertanyaan {current} dari {total}',
    'exam.time_remaining': 'Sisa Waktu',
    'exam.submit_all': 'Kumpulkan Semua',
    'exam.reference_title': 'Referensi Bacaan & Konteks',
    'exam.question_label': 'Pertanyaan {idx}',
    'exam.previous': 'Sebelumnya',
    'exam.next': 'Berikutnya',
    'exam.no_items': 'Tidak ada butir soal ditemukan untuk modul ini.',
    'exam.no_items_desc': 'Silakan pilih salah satu modul latihan di atas atau jelajahi kurikulum.',
    'exam.completed_title': 'Ujian Selesai!',
    'exam.raw_score': 'Nilai Mentah',
    'exam.est_score': 'Perkiraan Nilai / Band',
    'exam.verdict': 'Hasil Akhir',
    'exam.retake': 'Ulangi Latihan',
    'exam.back_curriculum': 'Kembali ke Kurikulum',
    'exam.explanations_title': 'Penjelasan Pedagogis & Analisis Jawaban',
    'exam.item_prefix': 'Soal',
    'exam.your_answer': 'Jawaban Anda:',
    'exam.correct_answer': 'Jawaban Benar:',
    'exam.explanation_label': 'Penjelasan:',

    // Writing Studio (100% Indonesian)
    'studio.header_badge': 'Studio Evaluasi Produktif',
    'studio.header_title': 'Studio Menulis Karangan',
    'studio.header_desc': 'Evaluasi diagnostik terhadap deskriptor kriteria, rentang tata bahasa, kolokasi kosakata alami, dan koherensi tulisan.',
    'studio.tab_editor': 'Editor Karangan Saya',
    'studio.tab_model': 'Contoh Jawaban Acuan',
    'studio.prompt_header': 'Topik Tugas & Petunjuk Pedagogis',
    'studio.unit_count': 'Jumlah: {count} {unit}',
    'studio.unit_min': '/ {min} min',
    'studio.load_sample': 'Muat Draf Contoh',
    'studio.placeholder_jp': 'Tuliskan karangan Anda di sini dengan bentuk sopan です・ます atau gaya esai formal...',
    'studio.placeholder_en': 'Ketik atau tempelkan karangan formal Anda di sini...',
    'studio.needs_more': 'Perlu {diff} {unit} lagi untuk memenuhi standar panjang minimum.',
    'studio.length_satisfied': 'Target panjang karangan terpenuhi.',
    'studio.evaluating': 'Menilai Kriteria...',
    'studio.evaluate_btn': 'Nilai 4 Kriteria',
    'studio.predicted_score': 'Perkiraan Nilai / Band',
    'studio.diagnostic_improvements': 'Peningkatan Diagnostik Bertarget',
    'studio.rubric_ready_title': 'Rincian Kriteria Siap',
    'studio.rubric_ready_desc': 'Tulis minimal {min} {unit} dan klik "Nilai 4 Kriteria" untuk menghasilkan laporan diagnostik penilaian Anda.',
    'studio.official_benchmark': 'Jawaban Acuan Resmi',
    'studio.pedagogical_justification': 'Justifikasi Pedagogis:',

    // Kanji Studio (100% Indonesian)
    'kanji.header_badge': 'Penulisan Huruf Vektor & Katalog Joyo',
    'kanji.header_title': 'Studio Huruf & Kanji',
    'kanji.header_desc': 'Kuasai urutan goresan dengan penelusuran vektor, radikal Kangxi, mnemonik memori, kata majemuk alami, dan pengulangan berjeda FSRS.',
    'kanji.tab_hiragana': 'Hiragana',
    'kanji.tab_katakana': 'Katakana',
    'kanji.tab_joyo': '2.136 Kanji Joyo',
    'kanji.search_placeholder': 'Cari kanji, arti, cara baca...',
    'kanji.jlpt_level': 'Tingkat JLPT:',
    'kanji.step1_tab': '1. Radikal',
    'kanji.step2_tab': '2. Mnemonik',
    'kanji.step3_tab': '3. Kata Majemuk',
    'kanji.step4_tab': '4. Ulasan FSRS',
    'kanji.step1_title': 'Langkah 1: Dekonstruksi Radikal & Komponen Dasar',
    'kanji.step1_desc': 'Jangan pernah menghafal karakter rumit sebagai garis-garis acak. Uraikan menjadi radikal semantik Kangxi dan blok penyusun dasarnya:',
    'kanji.step2_title': 'Langkah 2: Hubungkan Makna & Cara Baca dengan Mnemonik',
    'kanji.step3_title': 'Langkah 3: Pelajari Cara Baca dalam Kata Majemuk Alami',
    'kanji.step3_desc': 'Jangan pernah mempelajari karakter secara terisolasi. Tautkan bacaan On\'yomi dan Kun\'yomi dalam kata majemuk Jukugo frekuensi tinggi:',
    'kanji.step4_title': 'Langkah 4: Ulas dengan Pengulangan Berjeda Adaptif (FSRS)',
    'kanji.step4_desc': 'Perkuat memori tepat sebelum kurva lupa terjadi. Pilih kecepatan belajar harian yang nyaman untuk Anda:',
    'kanji.pacing_sustainable_title': 'Mode Kebiasaan Berkelanjutan',
    'kanji.pacing_sustainable_desc': '• 3–6 Kanji Baru/hari (~15–20 Menit)\n• Retensi jangka panjang yang stabil tanpa beban ulasan menumpuk.',
    'kanji.pacing_sprint_title': 'Mode Akselerasi Intensif',
    'kanji.pacing_sprint_desc': '• 10–25 Kanji Baru/hari (~45–60 Menit)\n• Pemahaman kilat untuk mengejar target ujian terdekat.',
    'kanji.schedule_fsrs_btn': 'Daftarkan 「{char}」 ke Dek Ulasan FSRS Sekarang',
    'kanji.stroke_progress': 'Goresan {curr} dari {total}',
    'kanji.toggle_ghost': 'Panduan Bayangan',
    'kanji.reset_canvas': 'Reset Kanvas',
    'kanji.draw_instruction': 'Tarik goresan {curr} di dalam kisi kaligrafi.',
    'kanji.meaning_story': 'Kisah Makna',
    'kanji.reading_mnemonic': 'Mnemonik Cara Baca',

    // SRS Reviewer (100% Indonesian)
    'srs.header_title': 'Antrean Kartu Kilas Pengulangan Berjeda (FSRS)',
    'srs.due_count': '{count} kartu siap untuk penguatan memori hari ini.',
    'srs.completed_title': 'Sesi Ulasan Selesai!',
    'srs.completed_desc': 'Anda telah menyelesaikan seluruh kartu untuk hari ini. Jejak memori Anda telah diperkuat sesuai model FSRS.',
    'srs.btn_dashboard': 'Kembali ke Dasbor',
    'srs.show_answer': 'Tampilkan Jawaban (Spasi)',
    'srs.hide_answer': 'Sembunyikan Jawaban',
    'srs.grade_again': 'Ulangi (1)',
    'srs.grade_hard': 'Sulit (2)',
    'srs.grade_good': 'Baik (3)',
    'srs.grade_easy': 'Mudah (4)',
    'srs.example_sentence': 'Contoh Kalimat Kontekstual:',

    // Analytics (100% Indonesian)
    'analytics.cockpit_badge': 'Kokpit Kesiapan Diagnostik',
    'analytics.cockpit_title': 'Prakiraan Kemahiran & Analisis',
    'analytics.cockpit_desc': 'Indikator diagnostik status nyata tanpa simulasi sintetis.',
    'analytics.projected_score': 'Proyeksi Nilai',
    'analytics.pass_mark': 'Nilai Kelulusan Resmi',
    'analytics.srs_retention': 'Retensi Memori SRS',
    'analytics.target_label': 'Target',
    'analytics.stability_label': 'Stabilitas',
    'analytics.calibrate_prompt': 'Selesaikan ujian untuk menetapkan tolok ukur.'
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (key: string) => key
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('lingua_instruction_lang') as Language;
    return saved === 'id' ? 'id' : 'en';
  });

  useEffect(() => {
    localStorage.setItem('lingua_instruction_lang', language);
    document.documentElement.setAttribute('data-instruction-lang', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState(prev => (prev === 'en' ? 'id' : 'en'));
  };

  const t = (key: string, replacements?: Record<string, string | number>): string => {
    const langDict = DICTIONARY[language] || DICTIONARY.en;
    let text = langDict[key] || DICTIONARY.en[key] || key;

    if (replacements) {
      Object.entries(replacements).forEach(([placeholder, val]) => {
        text = text.replace(new RegExp(`\\{${placeholder}\\}`, 'g'), String(val));
      });
    }

    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
