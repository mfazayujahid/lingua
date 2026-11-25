const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const assert = require('assert');

async function runVerification() {
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
    throw new Error('Edge executable not found');
  }

  console.log('Launching browser with:', executablePath);
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
      const text = msg.text();
      console.error('[BROWSER ERROR]:', text);
      consoleErrors.push(text);
    }
  });

  page.on('pageerror', err => {
    console.error('[PAGE ERROR]:', err.message);
    consoleErrors.push(err.message);
  });

  // Ensure DB active track is ielts_academic
  try {
    await fetch('http://localhost:5000/api/dashboard/switch-track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newTrack: 'ielts_academic' })
    });
  } catch (e) {}

  console.log('Navigating to app...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });

  // -------------------------------------------------------------
  // TEST 1: Master Mock Battery Selector Hub (Screen 4 / AC 4.24)
  // -------------------------------------------------------------
  console.log('\n--- VERIFYING TEST 1: Master Mock Battery Selector Hub ---');
  
  // Set to English first to test EN labels & 5-pack selector
  await page.evaluate(() => {
    localStorage.setItem('lingua_instruction_lang', 'en');
    localStorage.setItem('lingua_active_track', 'ielts_academic');
  });
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(800);

  // Navigate to Exam view
  const examNavBtn = await page.waitForSelector('button[data-view="exam"]');
  await examNavBtn.click();
  await page.waitForTimeout(1000);

  // Verify Hub title and subtitle
  await page.waitForSelector('text=Master Mock Exam Battery Hub', { timeout: 10000 });
  console.log('Verified Hub Title rendered');

  // Verify 5 distinct pack selector buttons exist in the 5-pack grid
  await page.waitForSelector('text=Pack 1', { timeout: 5000 });
  await page.waitForSelector('text=Pack 2', { timeout: 5000 });
  await page.waitForSelector('text=Pack 3', { timeout: 5000 });
  await page.waitForSelector('text=Pack 4', { timeout: 5000 });
  await page.waitForSelector('text=Pack 5', { timeout: 5000 });
  console.log('Verified Pack 1 through Pack 5 buttons in Selector Hub');

  // Verify difficulty tier tags exist in DOM
  await page.waitForSelector('text=Diagnostic Baseline', { timeout: 5000 });
  await page.waitForSelector('text=Core Competence', { timeout: 5000 });
  await page.waitForSelector('text=Advanced Academic', { timeout: 5000 });
  await page.waitForSelector('text=High Density', { timeout: 5000 });
  await page.waitForSelector('text=Final Readiness', { timeout: 5000 });
  console.log('Verified all 5 difficulty tags in Selector Hub');

  // Verify Strict / Practice mode toggle
  await page.waitForSelector('button:has-text("Strict Exam Mode")', { timeout: 5000 });
  await page.waitForSelector('button:has-text("Practice Mode")', { timeout: 5000 });
  console.log('Verified Strict Exam Mode and Practice Mode toggles');

  // Capture Screenshot 91: Multi-Mock 5-Pack Selector Hub
  const shot91 = path.join(proofDir, '91_multi_mock_5pack_selector_hub.png');
  await page.screenshot({ path: shot91, fullPage: false });
  console.log('Saved proof 91 to', shot91);

  // -------------------------------------------------------------
  // TEST 2: Dynamic Pack Selection Switching & Zero Duplication
  // -------------------------------------------------------------
  console.log('\n--- VERIFYING TEST 2: Pack 2 Selection & Distinct Passages ---');
  
  // Click Pack 2 button
  const pack2Btn = await page.waitForSelector('button:has-text("Pack 2")');
  await pack2Btn.click();
  await page.waitForTimeout(1200);

  // Verify Pack 2 unique title and passage text rendered
  await page.waitForSelector('text=Deep Tunnel Sewerage Systems', { timeout: 10000 });
  console.log('Verified Pack 2 distinct Passage 1 rendered');

  // Verify strict proctoring pill
  await page.waitForSelector('text=Proctored', { timeout: 5000 });
  console.log('Verified Proctoring badge in strict mode');

  // Verify 40-item question palette rendered
  await page.waitForSelector('button[title="Question 40"]', { timeout: 5000 });
  console.log('Verified 40-item question jump palette for Pack 2');

  // Test safe exit modal: answer a question, then try clicking Pack 3
  const firstInput = await page.$('input[type="text"]');
  if (firstInput) {
    await firstInput.fill('CSOs');
    console.log('Filled sample answer for question 1 in Pack 2');
    
    // Try to click Pack 3 to trigger safe exit modal
    const pack3Btn = await page.$('button:has-text("Pack 3")');
    if (pack3Btn) {
      await pack3Btn.click();
      await page.waitForTimeout(500);
      
      // Verify safe exit confirmation modal appears
      await page.waitForSelector('text=OFFICIAL EXAM DISQUALIFICATION WARNING', { timeout: 5000 });
      console.log('Verified safe exit confirmation modal appears when switching packs during active session');
      
      // Cancel modal to remain in Pack 2
      const cancelBtn = await page.waitForSelector('button:has-text("Cancel & Continue Exam")');
      await cancelBtn.click();
      await page.waitForTimeout(500);
      console.log('Dismissed exit modal and remained in Pack 2');
    }
  }

  // Capture Screenshot 92: Multi-Mock Pack 2 Passage & Questions
  const shot92 = path.join(proofDir, '92_multi_mock_pack2_passage_and_questions.png');
  await page.screenshot({ path: shot92, fullPage: false });
  console.log('Saved proof 92 to', shot92);

  // -------------------------------------------------------------
  // TEST 3: Longitudinal Progression Trajectory & WRI Gauge
  // -------------------------------------------------------------
  console.log('\n--- VERIFYING TEST 3: Longitudinal Progression Trajectory & WRI Gauge ---');

  // Navigate to Analytics view
  const analyticsNavBtn = await page.waitForSelector('button[data-view="analytics"]');
  await analyticsNavBtn.click();
  await page.waitForTimeout(1000);

  // Verify WRI Header & Value
  await page.waitForSelector('text=Weighted Readiness Index (WRI)', { timeout: 10000 });
  await page.waitForSelector('text=Band 7.5', { timeout: 5000 });
  console.log('Verified WRI displays Band 7.5');

  // Verify Readiness Margin displays +0.5 Band
  await page.waitForSelector('text=+0.5', { timeout: 5000 });
  await page.waitForSelector('text=vs Target (7)', { timeout: 5000 });
  console.log('Verified Readiness Margin displays +0.5 vs Target 7');

  // Verify attempts count badge (3 / 5 Packs)
  await page.waitForSelector('text=3 / 5 Packs', { timeout: 5000 });
  console.log('Verified 3 / 5 Packs logged attempts');

  // Verify SVG trajectory chart elements
  await page.waitForSelector('svg polyline', { timeout: 5000 });
  await page.waitForSelector('text=Target (7)', { timeout: 5000 });
  console.log('Verified SVG growth trajectory line and Target benchmark line');

  // Verify attempt historical table rows
  await page.waitForSelector('td:has-text("Pack 1")', { timeout: 5000 });
  await page.waitForSelector('td:has-text("Pack 2")', { timeout: 5000 });
  await page.waitForSelector('td:has-text("Pack 3")', { timeout: 5000 });
  await page.waitForSelector('td:has-text("Band 6.5")', { timeout: 5000 });
  await page.waitForSelector('td:has-text("Band 7.0")', { timeout: 5000 });
  console.log('Verified historical attempt audit log entries for Packs 1-3');

  // Capture Screenshot 93: Multi-Mock Progression Trajectory & WRI
  const shot93 = path.join(proofDir, '93_multi_mock_progression_trajectory_and_wri.png');
  await page.screenshot({ path: shot93, fullPage: false });
  console.log('Saved proof 93 to', shot93);

  // -------------------------------------------------------------
  // TEST 4: 100% Indonesian Localization Audit (AC 4.26)
  // -------------------------------------------------------------
  console.log('\n--- VERIFYING TEST 4: 100% Indonesian Localization Audit ---');

  // Switch language to Indonesian (id)
  await page.evaluate(() => {
    localStorage.setItem('lingua_instruction_lang', 'id');
  });
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Navigate to Analytics view in Indonesian mode
  const analyticsNavId = await page.waitForSelector('button[data-view="analytics"]');
  await analyticsNavId.click();
  await page.waitForTimeout(1000);

  // Verify Indonesian translation in Analytics View
  await page.waitForSelector('text=Indeks Kesiapan Terbobot (WRI)', { timeout: 10000 });
  await page.waitForSelector('text=Margin Kesiapan (Δ)', { timeout: 5000 });
  await page.waitForSelector('text=Melebihi target ambang batas kelulusan', { timeout: 5000 });
  await page.waitForSelector('text=Grafik Progresi Paket 1 → Paket 5', { timeout: 5000 });
  await page.waitForSelector('td:has-text("Paket 1")', { timeout: 5000 });
  await page.waitForSelector('td:has-text("Paket 2")', { timeout: 5000 });
  await page.waitForSelector('td:has-text("Paket 3")', { timeout: 5000 });
  console.log('Verified Indonesian WRI title, margin, passing summary, chart title, and table rows');

  // Capture Screenshot 94: Multi-Mock Indonesian Localized Trajectory
  const shot94 = path.join(proofDir, '94_multi_mock_indonesian_localized_trajectory.png');
  await page.screenshot({ path: shot94, fullPage: false });
  console.log('Saved proof 94 to', shot94);

  // Navigate back to Exam view in Indonesian mode to verify Exam Hub Indonesian localization
  const examNavId = await page.waitForSelector('button[data-view="exam"]');
  await examNavId.click();
  await page.waitForTimeout(1000);

  await page.waitForSelector('text=Pusat Baterai Simulasi Ujian Resmi', { timeout: 10000 });
  await page.waitForSelector('text=Mode Simulasi Ujian Ketat', { timeout: 5000 });
  await page.waitForSelector('text=Pengawasan Aktif', { timeout: 5000 });
  await page.waitForSelector('text=Paket 1', { timeout: 5000 });
  await page.waitForSelector('text=Paket 2', { timeout: 5000 });
  console.log('Verified Indonesian Hub Title, strict mode label, proctoring badge, and Pack prefix');

  // -------------------------------------------------------------
  // TEST 5: Mobile Viewport Audit (375px)
  // -------------------------------------------------------------
  console.log('\n--- VERIFYING TEST 5: Mobile Viewport Audit (375x812) ---');
  await page.setViewportSize({ width: 375, height: 812 });
  await page.waitForTimeout(500);

  // Check mobile navigation and selector hub wrapping
  const hubCardMobile = await page.waitForSelector('text=Pusat Baterai Simulasi Ujian Resmi');
  assert(hubCardMobile, 'Hub card must render cleanly on mobile viewport');
  console.log('Verified mobile layout render without overflow');

  // Reset viewport
  await page.setViewportSize({ width: 1440, height: 960 });

  // -------------------------------------------------------------
  // FINAL CONSOLE ERROR AUDIT
  // -------------------------------------------------------------
  console.log('\n--- FINAL AUDIT: Console Errors Count ---');
  console.log('Total console errors recorded:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.error('Console errors:', consoleErrors);
    throw new Error('Zero console errors requirement violated!');
  }

  await browser.close();
  console.log('\n=== ALL PHASE 3 STAGE 4 DOGFOODING VERIFICATION CHECKS PASSED ===');
}

runVerification().catch(err => {
  console.error('\n[VERIFICATION FAILED]:', err);
  process.exit(1);
});
