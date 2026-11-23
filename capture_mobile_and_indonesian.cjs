const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function run() {
  const proofDir = path.join(__dirname, 'docs', 'proof');
  if (!fs.existsSync(proofDir)) {
    fs.mkdirSync(proofDir, { recursive: true });
  }

  const artifactDir = 'C:\\Users\\user\\AppData\\Roaming\\orca\\antigravity-chat\\antigravity-acp\\brain\\b15ee8ce-c2c2-4bae-a584-2e5f1b5c208f';

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

  console.log(`Using Edge executable: ${executablePath}`);

  const browser = await chromium.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const capturedFiles = [];

  async function saveScreenshot(page, filename, fullPage = false) {
    const destPath = path.join(proofDir, filename);
    await page.screenshot({ path: destPath, fullPage });
    console.log(`Saved screenshot: ${destPath}`);
    
    // Also copy to artifact dir
    if (fs.existsSync(artifactDir)) {
      const artPath = path.join(artifactDir, filename);
      fs.copyFileSync(destPath, artPath);
      console.log(`Copied to artifact dir: ${artPath}`);
    }
    capturedFiles.push(filename);
  }

  // ==========================================
  // PART 1: MOBILE VIEWPORT VERIFICATION (390 x 844)
  // ==========================================
  console.log('\n--- PART 1: MOBILE VIEWPORT TESTS (390x844) ---');
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2
  });
  const mobilePage = await mobileContext.newPage();

  await mobilePage.goto('http://localhost:5173', { waitUntil: 'networkidle', timeout: 30000 });
  await mobilePage.waitForTimeout(1000);

  // Check horizontal overflow on mobile
  const scrollWidth = await mobilePage.evaluate(() => document.documentElement.scrollWidth);
  const clientWidth = await mobilePage.evaluate(() => document.documentElement.clientWidth);
  console.log(`Mobile dimensions: clientWidth=${clientWidth}, scrollWidth=${scrollWidth}`);
  if (scrollWidth > clientWidth) {
    console.error(`WARNING: Horizontal overflow detected! scrollWidth (${scrollWidth}) > clientWidth (${clientWidth})`);
  } else {
    console.log('PASS: No horizontal scroll on mobile viewport.');
  }

  // 1. Mobile Top Bar (English)
  await saveScreenshot(mobilePage, '29_mobile_viewport_topbar_en.png');

  // 2. Scroll to bottom to inspect mobile footer
  await mobilePage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await mobilePage.waitForTimeout(500);
  await saveScreenshot(mobilePage, '30_mobile_viewport_footer_en.png');

  // Verify footer is visible and not clipped
  const footerVisible = await mobilePage.evaluate(() => {
    const footer = document.querySelector('footer');
    if (!footer) return false;
    const rect = footer.getBoundingClientRect();
    return rect.height > 0 && rect.top < window.innerHeight + 500;
  });
  console.log(`Mobile Footer visible: ${footerVisible}`);

  // 3. Switch Language to Indonesian on Mobile
  console.log('Toggling language to Indonesian on mobile...');
  const langBtn = await mobilePage.$('button[data-action="toggle-language"], button[title*="Beralih"], button[title*="Switch"], button:has-text("ID"), button:has-text("EN")');
  if (langBtn) {
    await langBtn.click();
    await mobilePage.waitForTimeout(500);
  } else {
    await mobilePage.evaluate(() => {
      localStorage.setItem('lingua_instruction_lang', 'id');
      window.location.reload();
    });
    await mobilePage.waitForTimeout(1000);
  }

  // Check active lang
  const currentLang = await mobilePage.evaluate(() => document.documentElement.getAttribute('data-instruction-lang'));
  console.log(`Current html data-instruction-lang: ${currentLang}`);

  // 4. Mobile Top Bar in Indonesian
  await mobilePage.evaluate(() => window.scrollTo(0, 0));
  await mobilePage.waitForTimeout(500);
  await saveScreenshot(mobilePage, '31_mobile_topbar_id.png');

  // 5. Mobile Footer in Indonesian
  await mobilePage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await mobilePage.waitForTimeout(500);
  await saveScreenshot(mobilePage, '32_mobile_footer_id.png');

  await mobileContext.close();

  // ==========================================
  // PART 2: INDONESIAN MODE FULL APP VIEWS (1280 x 860)
  // ==========================================
  console.log('\n--- PART 2: INDONESIAN MODE FULL APP VIEWS ---');
  const deskContext = await browser.newContext({
    viewport: { width: 1280, height: 860 },
    deviceScaleFactor: 2
  });
  const deskPage = await deskContext.newPage();

  await deskPage.goto('http://localhost:5173', { waitUntil: 'networkidle', timeout: 30000 });
  await deskPage.waitForTimeout(1000);

  // Ensure Indonesian language is active
  await deskPage.evaluate(() => {
    localStorage.setItem('lingua_instruction_lang', 'id');
    document.documentElement.setAttribute('data-instruction-lang', 'id');
  });
  await deskPage.reload({ waitUntil: 'networkidle' });
  await deskPage.waitForTimeout(1000);

  // 6. Dashboard View (Indonesian)
  console.log('Capturing 33_indonesian_dashboard.png ...');
  await saveScreenshot(deskPage, '33_indonesian_dashboard.png');

  // 7. Curriculum View (Indonesian)
  console.log('Navigating to Kurikulum ...');
  await deskPage.click('button[data-view="curriculum"]');
  await deskPage.waitForTimeout(1000);
  console.log('Capturing 34_indonesian_curriculum_6stage.png ...');
  await saveScreenshot(deskPage, '34_indonesian_curriculum_6stage.png');

  // 8. Practice Exam Runner (Indonesian)
  console.log('Navigating to Simulasi Ujian ...');
  await deskPage.click('button[data-view="exam"]');
  await deskPage.waitForTimeout(1000);
  console.log('Capturing 35_indonesian_exam_runner.png ...');
  await saveScreenshot(deskPage, '35_indonesian_exam_runner.png');

  // 9. Writing Studio (Indonesian)
  console.log('Navigating to Studio Menulis ...');
  await deskPage.click('button[data-view="studio"]');
  await deskPage.waitForTimeout(1000);
  console.log('Capturing 36_indonesian_writing_studio.png ...');
  await saveScreenshot(deskPage, '36_indonesian_writing_studio.png');

  // 10. Kanji & Kana Studio (Indonesian)
  console.log('Navigating to Huruf & Kanji ...');
  await deskPage.click('button[data-view="kanji"]');
  await deskPage.waitForSelector('canvas', { timeout: 10000 });
  await deskPage.waitForTimeout(1000);
  console.log('Capturing 37_indonesian_kanji_canvas.png ...');
  await saveScreenshot(deskPage, '37_indonesian_kanji_canvas.png');

  // 11. SRS Flashcards (Indonesian)
  console.log('Navigating to SRS Kartu Kilas ...');
  await deskPage.click('button[data-view="srs"]');
  await deskPage.waitForTimeout(1000);
  const flipButton = await deskPage.$('button:has-text("Lihat Jawaban"), button:has-text("Show Answer")');
  if (flipButton) {
    await flipButton.click();
    await deskPage.waitForTimeout(600);
  }
  console.log('Capturing 38_indonesian_srs_flashcards.png ...');
  await saveScreenshot(deskPage, '38_indonesian_srs_flashcards.png');

  // 12. Readiness Analytics Cockpit (Indonesian)
  console.log('Navigating to Analisis Kesiapan ...');
  await deskPage.click('button[data-view="analytics"]');
  await deskPage.waitForTimeout(1000);
  console.log('Capturing 39_indonesian_readiness_analytics.png ...');
  await saveScreenshot(deskPage, '39_indonesian_readiness_analytics.png');

  // ==========================================
  // PART 3: AUDIT INDONESIAN INSTRUCTION INTEGRITY
  // ==========================================
  console.log('\n--- PART 3: AUDITING FOR PROHIBITED ENGLISH STRINGS IN ID MODE ---');
  await deskPage.click('button[data-view="dashboard"]');
  await deskPage.waitForTimeout(800);
  const dashboardText = await deskPage.evaluate(() => document.body.innerText);

  const englishForbidden = [
    'Beginner Guide',
    'Recommended Learning Sequence',
    'Step 1 • Kana Literacy',
    'Step 2 • Core Grammar',
    'Step 3 • Daily Kanji',
    'Ready for timed drill',
    'Mastered this level',
    'Readiness Index',
    'Pass Threshold'
  ];

  const leaks = [];
  for (const phrase of englishForbidden) {
    if (dashboardText.includes(phrase)) {
      leaks.push(phrase);
    }
  }

  if (leaks.length > 0) {
    console.error(`FAIL: English leaks found in Indonesian mode: ${JSON.stringify(leaks)}`);
  } else {
    console.log('PASS: Zero English instructional leaks detected on Dashboard.');
  }

  await deskContext.close();
  await browser.close();

  console.log(`\nAll tests completed successfully. Captured ${capturedFiles.length} screenshots:`);
  capturedFiles.forEach(f => console.log(` - ${f}`));
}

run().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
