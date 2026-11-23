# Authentic IELTS Listening Audio Engine & Sections 1–4 Audio Streaming (Phase 2)

## Context & User Problem
In standard web learning applications, listening tests often allow unlimited replays, artificial pause manipulation, single generic accents, and lack authentic question formats such as spatial map labelling or multi-speaker attribution. To ensure a candidate completing this course is genuinely prepared for the official computer-delivered IELTS exam, Phase 2 implements a strict, authentic Listening Audio Engine and Interactive Studio.

## Architecture & Implementation
1. **Official Cambridge CD-IELTS Audio Streaming & Single-Play Constraint**:
   - In **Exam Mode**, audio playback is strictly single-play ($N_{\text{play}}=1$ locked) matching British Council / IDP test conditions. Candidates cannot scrub backward or replay elapsed audio.
   - In **Practice Mode**, speed control is available (`0.8x`, `1.0x`, `1.2x`) with pitch preservation and pause toggles.
   - Synchronized HTML5 Canvas waveform visualizer displays active speech cadence in real time.

2. **Multi-Regional Native Accent Matrix**:
   - **Section 1**: British RP + Australian native accents (Social survival: eco-lodge accommodation booking).
   - **Section 2**: Lowland Scottish accent (Community monologue: Riverside Arts Complex architectural layout plan).
   - **Section 3**: North American + British RP native accents (Academic dialogue: subterranean hydrogen storage colloquium).
   - **Section 4**: British Received Pronunciation (Academic lecture: cetacean bioacoustics & anthropogenic disturbance).
   - Includes dedicated Headphone Calibration & Accent Audition setup stage before starting test streams.

3. **Interactive Spatial Map Labelling & Task Diversity (Sections 1–4)**:
   - **Section 1 (Q1–10)**: Alphanumeric form and note completion with strict word-count validations (`ONE WORD AND/OR A NUMBER`, `NO MORE THAN TWO WORDS`).
   - **Section 2 (Q11–20)**: Interactive SVG Architectural Layout Plan with map pins (A–G) for spatial navigation (River Promenade, Central Lower Atrium, West Gallery Corridor, East Wing Pavilion, North Courtyard, West Lawn).
   - **Section 3 (Q21–30)**: Multi-speaker voice attribution matrix (Dr. Henderson, Mark, Elena, Both) and 3-option multiple choice.
   - **Section 4 (Q31–40)**: Monologue sentence completion covering scientific and academic terminologies without repetition.

4. **Official 9-Band Diagnostic Scoring & Distractor Audit**:
   - Automated conversion mapping Raw Marks (0–40) to Official IELTS Bands:
     - 39–40: Band 9.0 (C2 Mastery)
     - 37–38: Band 8.5
     - 35–36: Band 8.0
     - 32–34: Band 7.5
     - 30–31: Band 7.0
     - 26–29: Band 6.5
     - 23–25: Band 6.0
     - 18–22: Band 5.5
     - 16–17: Band 5.0
     - <16: Band 4.5 and below
   - Multi-regional accent vulnerability diagnostics profiling accuracy across British RP, Australian, Scottish, and North American speech.
   - Sectional performance breakdown (Sections 1–4) and mistake-filtered answer review.

5. **100% Indonesian Localization & Track Isolation**:
   - In Indonesian (`ID`) mode, all UI chrome, instructions, button text, and diagnostic breakdowns are fully localized with zero English leaks outside the authentic listening test prompts and transcripts.
   - Listening Studio is strictly isolated to the IELTS track (`activeTrack === 'ielts_academic' || 'ielts_general'`), ensuring the Japanese JLPT track remains untouched.
