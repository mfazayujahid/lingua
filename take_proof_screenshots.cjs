const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function captureProof() {
  const proofDir = path.join(__dirname, 'docs', 'proof');
  if (!fs.existsSync(proofDir)) {
    fs.mkdirSync(proofDir, { recursive: true });
  }

  const edgePaths = [
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
  ];
  let executablePath = null;
  for (const p of edgePaths) {
    if (fs.existsSync(p)) {
      executablePath = p;
      break;
    }
  }

  if (!executablePath) {
    throw new Error('Could not find Edge browser executable.');
  }

  console.log(`Using browser executable: ${executablePath}`);

  const browser = await chromium.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 960 },
    deviceScaleFactor: 2
  });

  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
      console.error('[BROWSER CONSOLE ERROR]:', msg.text());
    }
  });

  page.on('pageerror', err => {
    consoleErrors.push(err.message);
    console.error('[BROWSER UNCAUGHT PAGE ERROR]:', err.message);
  });

  console.log('Navigating to http://localhost:5173 ...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1000);

  // 1. Dashboard View
  console.log('Capturing 01_dashboard.png ...');
  await page.screenshot({ path: path.join(proofDir, '01_dashboard.png'), fullPage: false });

  // 2. Curriculum View
  console.log('Navigating to Curriculum ...');
  await page.click('button:has-text("Curriculum")');
  await page.waitForTimeout(1000);
  console.log('Capturing 02_curriculum.png ...');
  await page.screenshot({ path: path.join(proofDir, '02_curriculum.png'), fullPage: false });

  // 3. SRS Flashcards
  console.log('Navigating to SRS Flashcards ...');
  await page.click('button:has-text("SRS Flashcards")');
  await page.waitForTimeout(1000);
  const flipButton = await page.$('button:has-text("Show Answer")');
  if (flipButton) {
    await flipButton.click();
    await page.waitForTimeout(600);
  }
  console.log('Capturing 03_srs_flashcards.png ...');
  await page.screenshot({ path: path.join(proofDir, '03_srs_flashcards.png'), fullPage: false });

  // 4. Kana & Kanji Handwriting Studio
  console.log('Navigating to Kana & Kanji Handwriting Studio ...');
  await page.click('header button:has-text("Kana & Kanji")');
  await page.waitForSelector('canvas', { timeout: 10000 });
  await page.waitForTimeout(800);

  // Trigger smooth calligraphic demonstration
  const demoBtn = await page.$('button:has-text("Demonstrate")');
  if (demoBtn) {
    await demoBtn.click();
    await page.waitForTimeout(2200); // Allow smooth strokes to render
  }

  console.log('Capturing 04_kanji_canvas_writing.png ...');
  await page.screenshot({ path: path.join(proofDir, '04_kanji_canvas_writing.png'), fullPage: false });

  // 5. Writing Studio & Evaluation
  console.log('Navigating to Writing Studio ...');
  await page.click('button:has-text("Writing Studio")');
  await page.waitForTimeout(1000);

  const loadDraftBtn = await page.$('button:has-text("Load Sample Student Essay")');
  if (loadDraftBtn) {
    await loadDraftBtn.click();
    await page.waitForTimeout(500);
  }

  const evalBtn = await page.$('button:has-text("Evaluate 4 Criteria")');
  if (evalBtn) {
    await evalBtn.click();
    await page.waitForTimeout(2000);
  }

  console.log('Capturing 05_writing_studio_evaluation.png ...');
  await page.screenshot({ path: path.join(proofDir, '05_writing_studio_evaluation.png'), fullPage: false });

  // 6. Timed Practice Exam
  console.log('Navigating to Practice Exam ...');
  await page.click('button:has-text("Practice Exam")');
  await page.waitForTimeout(1500);

  const optionButton = await page.$('button:has-text("A.")');
  if (optionButton) {
    await optionButton.click();
    await page.waitForTimeout(400);
  }

  console.log('Capturing 06_timed_exam_simulation.png ...');
  await page.screenshot({ path: path.join(proofDir, '06_timed_exam_simulation.png'), fullPage: false });

  // 7. Readiness & Analytics
  console.log('Navigating to Analytics ...');
  await page.click('button:has-text("Analytics")');
  await page.waitForTimeout(1200);

  console.log('Capturing 07_readiness_analytics.png ...');
  await page.screenshot({ path: path.join(proofDir, '07_readiness_analytics.png'), fullPage: false });

  // 8. Mobile-First Viewport Verification (iPhone 14 standard: 390x844)
  console.log('Testing Mobile-First Responsive Viewport (390x844) ...');
  const mobilePage = await context.newPage();
  await mobilePage.setViewportSize({ width: 390, height: 844 });
  await mobilePage.goto('http://localhost:5173', { waitUntil: 'networkidle', timeout: 30000 });
  await mobilePage.waitForTimeout(800);

  // Navigate to Kana & Kanji via mobile bottom bar
  const mobileHandwritingBtn = await mobilePage.$('nav.safe-bottom button:has-text("Handwriting")');
  if (mobileHandwritingBtn) {
    await mobileHandwritingBtn.click();
    await mobilePage.waitForTimeout(800);
  }

  console.log('Capturing 08_mobile_first_viewport.png ...');
  await mobilePage.screenshot({ path: path.join(proofDir, '08_mobile_first_viewport.png'), fullPage: false });

  await mobilePage.close();
  await browser.close();

  console.log('\n--- PROOF CAPTURE SUMMARY ---');
  console.log(`Console Errors: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.error('Console error log:', consoleErrors);
  }

  const expectedFiles = [
    '01_dashboard.png',
    '02_curriculum.png',
    '03_srs_flashcards.png',
    '04_kanji_canvas_writing.png',
    '05_writing_studio_evaluation.png',
    '06_timed_exam_simulation.png',
    '07_readiness_analytics.png',
    '08_mobile_first_viewport.png'
  ];

  let verifiedCount = 0;
  for (const f of expectedFiles) {
    const filePath = path.join(proofDir, f);
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      console.log(`Verified [${f}] - Size: ${stats.size} bytes`);
      verifiedCount++;
    } else {
      console.error(`Missing [${f}]!`);
    }
  }

  console.log(`Verification: ${verifiedCount}/${expectedFiles.length} screenshots successfully captured.`);
  if (consoleErrors.length > 0) {
    process.exit(1);
  }
}

captureProof().catch(err => {
  console.error('Capture script error:', err);
  process.exit(1);
});

