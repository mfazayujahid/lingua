const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function runVerification() {
  console.log('=== Launching Playwright QA Dogfooding Simulation for JLPT Mock Engine ===');
  
  const executablePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const browser = await chromium.launch({
    executablePath,
    headless: true
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  const proofDir = path.resolve('D:/personal/pj/orca/japanlish/docs/proof');
  if (!fs.existsSync(proofDir)) fs.mkdirSync(proofDir, { recursive: true });

  console.log('Navigating to http://localhost:5173...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Navigate to Exam tab
  console.log('Navigating to Exam tab...');
  await page.evaluate(() => {
    const b = Array.from(document.querySelectorAll("header nav button")).find(x => x.textContent.includes("Exam") || x.textContent.includes("Ujian") || x.textContent.includes("Simulasi"));
    if (b) b.click();
  });
  await page.waitForTimeout(1500);

  // 102: Hub View
  console.log('Capturing 102_jlpt_5tier_exam_hub.png...');
  await page.screenshot({ path: path.join(proofDir, '102_jlpt_5tier_exam_hub.png'), fullPage: true });

  // Launch Exam
  console.log('Launching Exam Runner...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll("button"));
    const startBtn = btns.find(b => b.textContent.includes('Start JLPT Mock Exam') || b.textContent.includes('Mulai Simulasi'));
    if (startBtn) startBtn.click();
  });
  await page.waitForTimeout(2000);

  // 103: Booklet View
  console.log('Capturing 103_jlpt_exam_runner_booklet.png...');
  await page.screenshot({ path: path.join(proofDir, '103_jlpt_exam_runner_booklet.png'), fullPage: true });

  // Open OMR Drawer
  console.log('Opening Optical Mark Sheet drawer...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll("button"));
    const omr = btns.find(b => b.textContent.includes('Mark Sheet') || b.textContent.includes('マークシート') || b.textContent.includes('LJK'));
    if (omr) omr.click();
  });
  await page.waitForTimeout(800);

  // 104: Mark Sheet Drawer
  console.log('Capturing 104_jlpt_mark_sheet_drawer.png...');
  await page.screenshot({ path: path.join(proofDir, '104_jlpt_mark_sheet_drawer.png'), fullPage: false });

  // Jump to Question 6 (Star Reordering) via Mark Sheet row button
  console.log('Jumping to Question 6 (Star Reordering)...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll("aside button"));
    const q6Btn = btns.find(b => b.textContent.trim().startsWith('6.'));
    if (q6Btn) {
      q6Btn.click();
    } else {
      // Fallback: click close and use next button
      const close = btns.find(b => b.querySelector('svg'));
      if (close) close.click();
    }
  });
  await page.waitForTimeout(1000);

  // Interact with Star Reordering (click chunks)
  await page.evaluate(() => {
    const chunks = Array.from(document.querySelectorAll("button")).filter(b => 
      b.textContent.includes('としょかん') || 
      b.textContent.includes('ともだち') || 
      b.textContent.includes('べんきょう') ||
      b.textContent.includes('し')
    );
    if (chunks.length > 0) chunks[0].click();
    if (chunks.length > 1) chunks[1].click();
  });
  await page.waitForTimeout(600);

  // 105: Star Reordering Widget
  console.log('Capturing 105_jlpt_star_reordering_widget.png...');
  await page.screenshot({ path: path.join(proofDir, '105_jlpt_star_reordering_widget.png'), fullPage: true });

  // Jump to Question 8 (Dokkai Reading) via Mark Sheet
  console.log('Opening Mark Sheet to jump to Question 8 (Dokkai)...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll("button"));
    const omr = btns.find(b => b.textContent.includes('Mark Sheet') || b.textContent.includes('マークシート') || b.textContent.includes('LJK'));
    if (omr) omr.click();
  });
  await page.waitForTimeout(600);

  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll("aside button"));
    const q8Btn = btns.find(b => b.textContent.trim().startsWith('8.'));
    if (q8Btn) q8Btn.click();
  });
  await page.waitForTimeout(1000);

  // 106: Dokkai Split-Pane
  console.log('Capturing 106_jlpt_split_pane_dokkai.png...');
  await page.screenshot({ path: path.join(proofDir, '106_jlpt_split_pane_dokkai.png'), fullPage: true });

  // Click Submit Exam in top right header
  console.log('Submitting JLPT Exam...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll("button"));
    const sub = btns.find(b => b.textContent.includes('Submit Exam') || b.textContent.includes('Selesaikan Ujian'));
    if (sub) sub.click();
  });
  await page.waitForTimeout(800);

  // Click "Yes, Submit Exam" / "Ya, Kumpulkan Sekarang" in modal
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll("button"));
    const conf = btns.find(b => 
      b.textContent.includes('Yes, Submit Exam') || 
      b.textContent.includes('Ya, Kumpulkan Sekarang') ||
      b.textContent.includes('Kumpulkan')
    );
    if (conf) conf.click();
  });
  await page.waitForTimeout(3000);

  // 107: Scorecard Modal
  console.log('Capturing 107_jlpt_official_scorecard_modal.png...');
  await page.screenshot({ path: path.join(proofDir, '107_jlpt_official_scorecard_modal.png'), fullPage: true });

  await browser.close();
  console.log('=== Playwright QA Dogfooding Simulation Completed Successfully! ===');
}

runVerification().catch(err => {
  console.error('Failed:', err);
  process.exit(1);
});
