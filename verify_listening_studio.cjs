const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

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
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--autoplay-policy=no-user-gesture-required']
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

  // Set language to id and track to ielts_academic
  await page.evaluate(() => {
    localStorage.setItem('lingua_instruction_lang', 'id');
    localStorage.setItem('lingua_active_track', 'ielts_academic');
  });

  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Click button[data-view="listening"] in the navigation bar
  console.log('Clicking button[data-view="listening"]...');
  const listeningNav = await page.waitForSelector('button[data-view="listening"]', { timeout: 10000 });
  const navText = await listeningNav.innerText();
  console.log('Found listening nav button with text:', navText);
  await listeningNav.click();
  await page.waitForTimeout(1000);

  console.log('Step 1: In Listening Studio Stage 1 (Battery Selection)');
  await page.waitForSelector('text=Studio Menyimak Interaktif IELTS', { timeout: 10000 });
  
  // Click proceed to audio setup & accent preview
  console.log('Clicking proceed to Audio Setup & Accent Preview...');
  const proceedBtn = await page.waitForSelector('button:has-text("Kalibrasi")');
  await proceedBtn.click();
  await page.waitForTimeout(1000);

  console.log('Step 2: In Stage 2 (Audio Setup & Accent Audition)');
  // Click test stereo chime
  const chimeBtn = await page.waitForSelector('button:has-text("Lonceng")');
  await chimeBtn.click();
  await page.waitForTimeout(500);

  // Audition accents via preview buttons
  const previewBtns = await page.$$('button:has-text("Preview Voice")');
  if (previewBtns.length > 0) {
    console.log(`Found ${previewBtns.length} accent preview buttons, auditioning British RP...`);
    await previewBtns[0].click();
    await page.waitForTimeout(600);
  }

  // Capture Screenshot 87: Listening Studio Battery & Accent Preview
  const shot87 = path.join(proofDir, '87_listening_studio_battery_and_accent_preview.png');
  await page.screenshot({ path: shot87, fullPage: false });
  console.log('Saved proof 87 to', shot87);

  // Click Begin Listening Test & Audio Stream
  console.log('Starting listening stream...');
  const startStreamBtn = await page.waitForSelector('button:has-text("Putar Audio")');
  await startStreamBtn.click();
  await page.waitForTimeout(1500);

  console.log('Step 3: In Stage 3 (Section 1 Audio Streaming & Exam Mode)');
  // Wait for Question 1 item
  await page.waitForSelector('#q_item_1', { timeout: 10000 });
  console.log('Verified Section 1 Question 1 rendered');

  // Fill in answers for Section 1
  const q1Input = await page.$('#q_item_1 input[type="text"]');
  if (q1Input) await q1Input.fill('Heathcote');

  const q2Input = await page.$('#q_item_2 input[type="text"]');
  if (q2Input) await q2Input.fill('35');

  const q3Input = await page.$('#q_item_3 input[type="text"]');
  if (q3Input) await q3Input.fill('tennis');

  // Capture Screenshot 88: Section 1 & Single-Play Player
  const shot88 = path.join(proofDir, '88_listening_studio_section1_and_single_play_player.png');
  await page.screenshot({ path: shot88, fullPage: false });
  console.log('Saved proof 88 to', shot88);

  // Jump to Section 2: Riverside Arts Complex Interactive Spatial Map
  console.log('Jumping to Section 2...');
  const sec2Btn = await page.waitForSelector('button:has-text("Section 2")');
  await sec2Btn.click();
  await page.waitForTimeout(1000);

  // Verify map and click hotspot pin
  await page.waitForSelector('text=Riverside Community Arts Complex', { timeout: 10000 });
  console.log('Interacting with SVG spatial map...');
  const mapHotspot = await page.$('g.cursor-pointer');
  if (mapHotspot) {
    await mapHotspot.click();
    await page.waitForTimeout(500);
  }

  // Fill in Section 2 answer
  const q11Input = await page.$('#q_item_11 input[type="text"]');
  if (q11Input) await q11Input.fill('B');

  // Capture Screenshot 89: Section 2 Spatial Map Labelling
  const shot89 = path.join(proofDir, '89_listening_studio_section2_spatial_map_labelling.png');
  await page.screenshot({ path: shot89, fullPage: false });
  console.log('Saved proof 89 to', shot89);

  // Jump to Section 3 and select options
  console.log('Jumping to Section 3...');
  const sec3Btn = await page.waitForSelector('button:has-text("Section 3")');
  await sec3Btn.click();
  await page.waitForTimeout(800);
  await page.waitForSelector('#q_item_21', { timeout: 10000 });

  const radioButtons = await page.$$('#q_item_21 input[type="radio"]');
  if (radioButtons.length > 0) {
    await radioButtons[0].check();
  }

  // Jump to Section 4
  console.log('Jumping to Section 4...');
  const sec4Btn = await page.waitForSelector('button:has-text("Section 4")');
  await sec4Btn.click();
  await page.waitForTimeout(800);
  await page.waitForSelector('#q_item_31', { timeout: 10000 });

  const q31Input = await page.$('#q_item_31 input[type="text"]');
  if (q31Input) await q31Input.fill('phonic lips');

  const q32Input = await page.$('#q_item_32 input[type="text"]');
  if (q32Input) await q32Input.fill('cultural transmission');

  // Submit test
  console.log('Submitting listening test...');
  const submitBtn = await page.waitForSelector('button[data-testid="submit-listening-test"]');
  await submitBtn.click();
  await page.waitForTimeout(2500);

  console.log('Step 4: In Stage 4 (Official 9-Band Diagnostic Scorecard)');
  await page.waitForSelector('text=Official IELTS Listening Band Assessment', { timeout: 10000 });
  await page.waitForSelector('text=Band', { timeout: 10000 });
  await page.waitForSelector('text=SECTION 1', { timeout: 10000 });
  await page.waitForSelector('text=Multi-Regional Accent Vulnerability Diagnostics:', { timeout: 10000 });

  // Toggle mistakes filter
  const mistakesFilterBtn = await page.$('button:has-text("Mistakes Only")');
  if (mistakesFilterBtn) {
    await mistakesFilterBtn.click();
    await page.waitForTimeout(500);
  }

  // Capture Screenshot 90: 9-Band Diagnostic Scorecard
  const shot90 = path.join(proofDir, '90_listening_studio_9band_diagnostic_scorecard.png');
  await page.screenshot({ path: shot90, fullPage: false });
  console.log('Saved proof 90 to', shot90);

  // Test track isolation: Switch to JLPT N5 via API and reload
  console.log('Testing track isolation...');
  await fetch('http://localhost:5000/api/dashboard/switch-track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ newTrack: 'jlpt_n5' })
  });
  await page.evaluate(() => {
    localStorage.setItem('lingua_active_track', 'jlpt_n5');
    window.location.reload();
  });
  await page.waitForTimeout(2000);

  const listeningInNav = await page.$('button[data-view="listening"]');
  if (listeningInNav) {
    throw new Error('FAIL: Menyimak tab leaked into JLPT track!');
  } else {
    console.log('PASS: Listening Studio correctly isolated from JLPT track.');
  }

  const kanjiInNav = await page.$('button[data-view="kanji"]');
  if (kanjiInNav) {
    console.log('PASS: Kanji Studio properly available in JLPT track.');
  }

  console.log('Console errors count:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.warn('Console error messages:', consoleErrors);
  }

  await browser.close();
  console.log('All verification steps completed successfully!');
}

runVerification().catch(err => {
  console.error('Verification failed with error:', err);
  process.exit(1);
});
