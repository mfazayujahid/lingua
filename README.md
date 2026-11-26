# LinguaMastery 🌐 文

> **Zero-Server, High-Precision Examination Simulator & Learning Studio for JLPT (N5–N1) and IELTS (Academic & General).**

LinguaMastery is a modern, responsive, privacy-first **Local-First Progressive Web App (PWA)** designed to provide authentic, barrier-free language proficiency examination preparation. Built from the ground up to operate with **$0.00 operational server costs**, all scoring algorithms, exam simulation banks, stroke-order recognizers, and diagnostic rubrics run deterministically and securely directly within the user's browser.

---

## 🌟 Key Highlights

* 🚀 **Zero Server Cost ($0/month Forever)**: No costly LLM API fees or mandatory central databases. The entire platform functions client-side with edge-CDN static delivery.
* 📱 **Local-First Progressive Web App (PWA)**: Installable on iOS, Android, and Desktop with full offline caching via Service Worker (`sw.js`). Practice anywhere, anytime, even with poor or no internet.
* 🔒 **Privacy-First**: No account creation or data collection required. User progress, mock exam histories, and flashcard review queues are stored safely in the user's browser storage.
* 🌐 **100% Bilingual Interface**: Seamless, instant switching between **Indonesian (Bahasa Indonesia 🇮🇩)** and **English (🇬🇧)** across all UI chrome, instructions, and diagnostics.
* 🌓 **Adaptive Japanese Aesthetic**: Inspired by traditional Japanese paper (*Washi*) and ink (*Sumi*) aesthetics, featuring smooth Light and Dark mode transitions with zero visual clutter.

---

## 📚 Core Features & Studios

### 🇯🇵 Japanese Track (JLPT N5 – N1)

1. **Comprehensive Mock Examination Simulator**:
   * Authentic multi-stage examination runner for all five JLPT tiers (**N5, N4, N3, N2, and N1**).
   * **180-Point Scaled Scoring Engine**: Implements the official JLPT scoring distribution with sectional cutoffs (Language Knowledge, Reading, and Listening). A failure in any individual section results in an automatic fail safeguard, replicating real exam rigor.
   * Timed sections with real-time passage viewer, question flags, and answer sheet matrix.

2. **Kana & Kanji Stroke-Order Studio**:
   * Interactive calligraphy canvas with rice-grid (*Genko Yoshi*) and cross-hair guidelines.
   * **KanjiVG Vector Integration**: Smooth stroke-by-stroke animations, stroke number hints, and radical breakdowns.
   * Real-time handwriting recognition and stroke accuracy validation.

3. **Spaced Repetition System (SRS)**:
   * Dynamic flashcard review queue powered by spaced memory intervals (SuperMemo/Leitner algorithms).
   * Automated review scheduling based on user-reported difficulty (*Again, Hard, Good, Easy*).

4. **Dynamic Furigana Display**:
   * One-click toggle in the navigation header to show or hide ruby characters (ふりがな) above Kanji across all exercises and readings.

5. **Grammar & Learning Center Hub**:
   * Structured 6-stage progressive curriculum aligned with international language competency standards.
   * Normalized passage reading, sentence pattern drills, and detailed grammatical explanations.

---

### 🇬🇧 English Track (IELTS Academic & General)

1. **40-Item Computer-Delivered Mock Engine**:
   * Full-length IELTS test simulation adhering to Cambridge exam formats.
   * Raw-score-to-Band calculation mapping across the official **Cambridge 9-Band scale** (Bands 1.0 to 9.0).

2. **IELTS Listening Studio**:
   * Multi-speaker audio player with synthetic Web Audio API generation.
   * Synchronized interactive transcript highlighting in real-time as the audio plays.
   * Variable playback speeds (0.75x, 1.0x, 1.25x) and replay loop controls.

3. **IELTS Speaking Studio**:
   * Full 3-Part structured oral exam simulation:
     * **Part 1**: Introduction & general familiar topics.
     * **Part 2**: Cue card long-turn with an integrated 1-minute preparation countdown and 2-minute response timer.
     * **Part 3**: Two-way in-depth abstract discussion.
   * Browser Speech-to-Text (STT) integration with real-time transcript capture, fluency/coherence diagnostics, lexical resource indicators, and grammatical range analysis.

4. **IELTS Writing Studio (Academic & General)**:
   * Dual-pane environment for **Task 1** (Visual report / Letter) and **Task 2** (Discursive essay).
   * Live word count threshold indicators (150 words for Task 1; 250 words for Task 2).
   * Diagnostic assessment breakdown based on official assessment criteria:
     * *Task Achievement / Task Response (TA/TR)*
     * *Coherence & Cohesion (CC)*
     * *Lexical Resource (LR)*
     * *Grammatical Range & Accuracy (GRA)*

---

## 🛠️ Architecture & Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) | Type-safe declarative reactive user interface |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) | Custom design system (*washi/sumi* palette, responsive layouts) |
| **Bundler** | [Vite 6](https://vitejs.dev/) | Sub-second HMR and optimized production bundle compilation |
| **Icons & FX** | [Lucide React](https://lucide.dev/) & Canvas Confetti | Accessible vector icons and celebratory exam completion states |
| **PWA & Offline** | Service Worker + Manifest v2 | Offline asset caching and standalone home-screen installation |
| **Data Engine** | Embedded Static Database JSON | Local-first synchronous curriculum and question bank delivery |
| **Verification** | [Playwright](https://playwright.dev/) | End-to-end automated dogfooding and responsive layout validation |

---

## 🚀 Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) v18.0.0 or higher
* `npm` or `pnpm`

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mfazayujahid/lingua-mastery.git
   cd lingua-mastery
   ```

2. Install dependencies:
   ```bash
   npm run install:client
   ```

3. Start the local development server:
   ```bash
   npm run client
   ```
   Open your browser at `http://localhost:5173`.

### Production Build

To compile and verify the production bundle:
```bash
cd client
npm run build
```
The compiled static assets will be output to `client/dist/`.

---

## ☁️ Zero-Cost Deployment (Cloudflare Pages / Vercel)

Because LinguaMastery is built as a static Local-First SPA, it can be hosted permanently for **$0.00** on edge CDN platforms:

### Deploying to Cloudflare Pages:
1. Connect your GitHub repository to [Cloudflare Pages](https://pages.cloudflare.com/).
2. Set the build configuration:
   * **Framework Preset**: `Vite`
   * **Root Directory**: `client`
   * **Build Command**: `npm run build`
   * **Output Directory**: `dist`
3. Click **Save and Deploy**.

### Custom Domain / Subdomain:
1. In Cloudflare Pages, navigate to **Custom Domains** and add your subdomain (e.g., `lingua.yourdomain.com`).
2. Add a `CNAME` record in your DNS provider (e.g. IDwebhost):
   * **Type**: `CNAME`
   * **Name**: `lingua`
   * **Target**: `<your-project>.pages.dev`
3. SSL certificates are issued and managed automatically for free.

---

## ⚖️ Legal & Trademarks

* **Independent Project**: LinguaMastery is an independent educational platform and is not affiliated, endorsed, or certified by JEES, The Japan Foundation, Cambridge Assessment English, British Council, or IDP.
* **Nominative Fair Use**: All mentions of "JLPT" and "IELTS" are utilized strictly for descriptive reference to test formats and proficiency standards under nominative fair use.
* **Kanji Stroke Data**: Kanji stroke-order animations and vector paths are derived from [KanjiVG](https://kanjivg.tagaini.net/), created by Ulrich Apel, licensed under [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
