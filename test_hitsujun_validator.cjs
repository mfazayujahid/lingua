const assert = require('assert');

// Test suite for Hitsujun stroke validation
function resampleStroke(points, targetCount = 64) {
  if (points.length <= 1) return points;
  let totalLength = 0;
  const cumulativeLengths = [0];
  for (let i = 1; i < points.length; i++) {
    const dx = points[i].x - points[i - 1].x;
    const dy = points[i].y - points[i - 1].y;
    totalLength += Math.hypot(dx, dy);
    cumulativeLengths.push(totalLength);
  }
  if (totalLength === 0) return points;
  const segmentLength = totalLength / (targetCount - 1);
  const resampled = [points[0]];
  let srcIndex = 0;
  for (let i = 1; i < targetCount - 1; i++) {
    const targetDist = i * segmentLength;
    while (srcIndex < cumulativeLengths.length - 1 && cumulativeLengths[srcIndex + 1] < targetDist) {
      srcIndex++;
    }
    const t0 = cumulativeLengths[srcIndex];
    const t1 = cumulativeLengths[srcIndex + 1];
    const ratio = t1 === t0 ? 0 : (targetDist - t0) / (t1 - t0);
    const p0 = points[srcIndex];
    const p1 = points[srcIndex + 1];
    resampled.push({
      x: p0.x + ratio * (p1.x - p0.x),
      y: p0.y + ratio * (p1.y - p0.y)
    });
  }
  resampled.push(points[points.length - 1]);
  return resampled;
}

function normalizeTo1000Space(points, canvasWidth, canvasHeight) {
  const scaleX = 1000 / Math.max(1, canvasWidth);
  const scaleY = 1000 / Math.max(1, canvasHeight);
  return points.map(p => ({
    x: p.x * scaleX,
    y: p.y * scaleY,
    t: p.t
  }));
}

function computeTrajectoryAngleDeg(p1, p2) {
  const rad = Math.atan2(p2.y - p1.y, p2.x - p1.x);
  let deg = (rad * 180) / Math.PI;
  if (deg < 0) deg += 360;
  return deg;
}

function angularDiffDeg(a1, a2) {
  let diff = Math.abs(a1 - a2) % 360;
  if (diff > 180) diff = 360 - diff;
  return diff;
}

function sampleSvgPathPoints(d) {
  let currX = 0, currY = 0;
  const points = [];
  const regex = /([MmLlCcSsHhVvZz])([^MmLlCcSsHhVvZz]*)/g;
  let match;
  while ((match = regex.exec(d)) !== null) {
    const cmd = match[1];
    const rawArgs = match[2].match(/-?[0-9]+(?:\.[0-9]+)?/g);
    if (!rawArgs && cmd !== 'Z' && cmd !== 'z') continue;
    const args = (rawArgs || []).map(Number);
    if (cmd === 'M') { currX = args[0]; currY = args[1]; points.push({ x: currX, y: currY }); }
    else if (cmd === 'm') { currX += args[0]; currY += args[1]; points.push({ x: currX, y: currY }); }
    else if (cmd === 'L') { currX = args[0]; currY = args[1]; points.push({ x: currX, y: currY }); }
    else if (cmd === 'l') { currX += args[0]; currY += args[1]; points.push({ x: currX, y: currY }); }
    else if (cmd === 'H') { currX = args[0]; points.push({ x: currX, y: currY }); }
    else if (cmd === 'h') { currX += args[0]; points.push({ x: currX, y: currY }); }
    else if (cmd === 'V') { currY = args[0]; points.push({ x: currX, y: currY }); }
    else if (cmd === 'v') { currY += args[0]; points.push({ x: currX, y: currY }); }
    else if (cmd === 'C') {
      for (let i = 0; i < args.length; i += 6) {
        const p0x = currX, p0y = currY, p1x = args[i], p1y = args[i + 1], p2x = args[i + 2], p2y = args[i + 3], p3x = args[i + 4], p3y = args[i + 5];
        for (let t = 0.2; t <= 1; t += 0.2) {
          const u = 1 - t;
          points.push({
            x: u * u * u * p0x + 3 * u * u * t * p1x + 3 * u * t * t * p2x + t * t * t * p3x,
            y: u * u * u * p0y + 3 * u * u * t * p1y + 3 * u * t * t * p2y + t * t * t * p3y
          });
        }
        currX = p3x; currY = p3y;
      }
    } else if (cmd === 'c') {
      for (let i = 0; i < args.length; i += 6) {
        const p0x = currX, p0y = currY;
        const p1x = currX + args[i], p1y = currY + args[i + 1];
        const p2x = currX + args[i + 2], p2y = currY + args[i + 3];
        const p3x = currX + args[i + 4], p3y = currY + args[i + 5];
        for (let t = 0.2; t <= 1; t += 0.2) {
          const u = 1 - t;
          points.push({
            x: u * u * u * p0x + 3 * u * u * t * p1x + 3 * u * t * t * p2x + t * t * t * p3x,
            y: u * u * u * p0y + 3 * u * u * t * p1y + 3 * u * t * t * p2y + t * t * t * p3y
          });
        }
        currX = p3x; currY = p3y;
      }
    }
  }
  return points;
}

function validateDrawnStroke(drawnPoints, currentExpectedIndex, allStrokes, lang = 'id') {
  const isId = lang === 'id';
  if (drawnPoints.length < 2) {
    return {
      isValid: false,
      status: 'shape_mismatch',
      message: 'Goresan terlalu pendek.',
      geometryScore: 0
    };
  }

  const pStart = drawnPoints[0];
  const pEnd = drawnPoints[drawnPoints.length - 1];
  const drawnAngle = computeTrajectoryAngleDeg(pStart, pEnd);

  const targetStroke = allStrokes.find(s => s.strokeIndex === currentExpectedIndex);
  if (!targetStroke) {
    return {
      isValid: false,
      status: 'shape_mismatch',
      message: 'Karakter sudah selesai.',
      geometryScore: 100
    };
  }

  const tStart = { x: targetStroke.startPoint[0], y: targetStroke.startPoint[1] };
  const tEnd = { x: targetStroke.endPoint[0], y: targetStroke.endPoint[1] };

  const targetAngle = computeTrajectoryAngleDeg(tStart, tEnd);
  const angleDiff = angularDiffDeg(drawnAngle, targetAngle);

  const distStartToStart = Math.hypot(pStart.x - tStart.x, pStart.y - tStart.y);
  const distEndToEnd = Math.hypot(pEnd.x - tEnd.x, pEnd.y - tEnd.y);
  const distStartToEnd = Math.hypot(pStart.x - tEnd.x, pStart.y - tEnd.y);
  const distEndToStart = Math.hypot(pEnd.x - tStart.x, pEnd.y - tStart.y);

  // 1. REVERSE STROKE
  const isStraight = ['horizontal', 'vertical', 'left_fall', 'right_fall', 'diagonal_left', 'diagonal_right'].includes(targetStroke.strokeType);
  if ((isStraight && distStartToEnd < 180 && distEndToStart < 180 && angleDiff > 120) ||
      (distStartToEnd < 140 && distEndToStart < 140 && angleDiff > 130)) {
    return {
      isValid: false,
      status: 'reversed',
      message: `Arah Terbalik! In Japanese hitsujun, this stroke flows ${targetStroke.directionalHint || 'from left to right'}.`,
      geometryScore: 40
    };
  }

  // 2. OUT OF ORDER
  for (let j = currentExpectedIndex + 1; j <= allStrokes.length; j++) {
    const futureStroke = allStrokes.find(s => s.strokeIndex === j);
    if (!futureStroke) continue;

    const fStartDist = Math.hypot(pStart.x - futureStroke.startPoint[0], pStart.y - futureStroke.startPoint[1]);
    const fEndDist = Math.hypot(pEnd.x - futureStroke.endPoint[0], pEnd.y - futureStroke.endPoint[1]);
    const fTargetAngle = computeTrajectoryAngleDeg(
      { x: futureStroke.startPoint[0], y: futureStroke.startPoint[1] },
      { x: futureStroke.endPoint[0], y: futureStroke.endPoint[1] }
    );
    const fAngleDiff = angularDiffDeg(drawnAngle, fTargetAngle);

    if (fStartDist < 140 && fEndDist < 140 && fAngleDiff < 45) {
      return {
        isValid: false,
        status: 'out_of_order',
        message: `Out of Order! You drew Stroke ${j} early.`,
        matchedStrokeIndex: j,
        geometryScore: 60
      };
    }
  }

  // 3. STRICT ENDPOINTS PROXIMITY (start <= 160, end <= 180)
  const isDot = targetStroke.strokeType === 'dot';
  const isStartClose = distStartToStart <= 160;
  const isEndClose = distEndToEnd <= 180;

  if (isDot) {
    const dotPassed = (isStartClose && isEndClose) || (distStartToStart <= 180 && distEndToEnd <= 200);
    if (!dotPassed) {
      return {
        isValid: false,
        status: 'shape_mismatch',
        message: 'Dot stroke deviated from target position.',
        geometryScore: 35
      };
    }
  } else {
    // Both endpoints MUST be close. No single endpoint bypass!
    if (!isStartClose || !isEndClose) {
      return {
        isValid: false,
        status: 'shape_mismatch',
        message: 'Stroke endpoints deviated.',
        geometryScore: 30
      };
    }
  }

  // 4. TRAJECTORY ANGLE
  const maxAllowedAngleDiff = ['hook'].includes(targetStroke.strokeType) ? 65 : (isDot ? 85 : 45);
  if (angleDiff > maxAllowedAngleDiff) {
    return {
      isValid: false,
      status: 'shape_mismatch',
      message: 'Stroke angle misaligned.',
      geometryScore: 40
    };
  }

  // 5. CURVATURE / MIDPOINT FIDELITY
  if (targetStroke.svgPath && !isDot) {
    const chordMidX = (tStart.x + tEnd.x) / 2;
    const chordMidY = (tStart.y + tEnd.y) / 2;
    const targetPoints = sampleSvgPathPoints(targetStroke.svgPath);
    if (targetPoints.length >= 5) {
      const targetMid = targetPoints[Math.floor(targetPoints.length / 2)];
      const targetCurvature = Math.hypot(targetMid.x - chordMidX, targetMid.y - chordMidY);

      if (targetCurvature >= 120) {
        const drawnMid = drawnPoints[Math.floor(drawnPoints.length / 2)];
        const distDrawnToTargetMid = Math.hypot(drawnMid.x - targetMid.x, drawnMid.y - targetMid.y);
        const distDrawnToChordMid = Math.hypot(drawnMid.x - chordMidX, drawnMid.y - chordMidY);

        if (distDrawnToTargetMid > 220 || (distDrawnToChordMid < 75 && distDrawnToTargetMid > 160)) {
          return {
            isValid: false,
            status: 'shape_mismatch',
            message: `Goresan ${currentExpectedIndex} harus melengkung sesuai bentuk karakter, bukan garis lurus.`,
            geometryScore: 40
          };
        }
      }
    }
  }

  const avgDist = (distStartToStart + distEndToEnd) / 2;
  const geometryScore = Math.min(100, Math.max(70, Math.round(100 - avgDist * 0.15 - angleDiff * 0.2)));

  return {
    isValid: true,
    status: 'accepted',
    message: `Stroke ${currentExpectedIndex} accepted!`,
    matchedStrokeIndex: currentExpectedIndex,
    geometryScore
  };
}

console.log('=== RUNNING KANJI HITSUJUN & STROKE VALIDATOR SUITE ===\n');

// Mock stroke metadata for Kanji 対 (4 strokes)
const strokesTai = [
  {
    strokeIndex: 1,
    strokeType: 'dot',
    startPoint: [280, 180],
    endPoint: [310, 260],
    directionalHint: 'downward and inward',
    pedagogicalRule: 'Left component: Top dot comes first.',
    svgPath: 'M280,180 L310,260'
  },
  {
    strokeIndex: 2,
    strokeType: 'horizontal',
    startPoint: [180, 320],
    endPoint: [440, 310],
    directionalHint: 'left to right',
    pedagogicalRule: 'Horizontal bar precedes diagonal sweeps.',
    svgPath: 'M180,320 L440,310'
  },
  {
    strokeIndex: 3,
    strokeType: 'diagonal_left',
    startPoint: [360, 330],
    endPoint: [160, 680],
    directionalHint: 'top-right to bottom-left',
    pedagogicalRule: 'Left diagonal sweep.',
    svgPath: 'M360,330 L160,680'
  },
  {
    strokeIndex: 4,
    strokeType: 'diagonal_right',
    startPoint: [220, 440],
    endPoint: [430, 680],
    directionalHint: 'top-left to bottom-right',
    pedagogicalRule: 'Cross diagonal completes left radical.',
    svgPath: 'M220,440 L430,680'
  }
];

// Mock stroke for 'あ' stroke 3 (loop curve)
const strokeA3 = [
  {
    strokeIndex: 1,
    strokeType: 'horizontal',
    startPoint: [284, 303],
    endPoint: [664, 275],
    svgPath: 'M284,303 L664,275'
  },
  {
    strokeIndex: 2,
    strokeType: 'vertical',
    startPoint: [457, 162],
    endPoint: [453, 827],
    svgPath: 'M457,162 L453,827'
  },
  {
    strokeIndex: 3,
    strokeType: 'hook',
    startPoint: [602, 405],
    endPoint: [610, 863],
    directionalHint: 'Loop curve top to bottom',
    svgPath: 'M602.1,404.8c6.9,10.3,10.6,40.3,4.6,56.1c-42.4,112.5-103.1,218-232.8,328.1c-62.9,53.5-145.7,34.4-149.1-76.9c-3.1-99.7,122.8-212.1,297.1-245.3c113.9-21.7,247.7,12.7,279.8,117c37.2,120.9-34.5,241.9-191.6,279.7'
  }
];

let passCount = 0;
let totalTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`[PASS] ${name}`);
    passCount++;
  } catch (err) {
    console.error(`[FAIL] ${name}: ${err.message}`);
  }
}

runTest('Hitsujun: Valid Stroke 1 executed in order is accepted', () => {
  const drawn = [
    { x: 285, y: 185 },
    { x: 295, y: 220 },
    { x: 312, y: 258 }
  ];
  const result = validateDrawnStroke(drawn, 1, strokesTai);
  assert.strictEqual(result.isValid, true);
  assert.strictEqual(result.status, 'accepted');
  assert(result.geometryScore >= 70);
});

runTest('Hitsujun: Reversed direction stroke is rejected with REVERSED status', () => {
  const drawn = [
    { x: 310, y: 260 },
    { x: 295, y: 220 },
    { x: 280, y: 180 }
  ];
  const result = validateDrawnStroke(drawn, 1, strokesTai);
  assert.strictEqual(result.isValid, false);
  assert.strictEqual(result.status, 'reversed');
  assert(result.message.includes('Arah Terbalik') || result.message.includes('Reverse Direction'));
});

runTest('Hitsujun: Out-of-order stroke (drew stroke 2 when expecting stroke 1) is rejected', () => {
  const drawn = [
    { x: 185, y: 320 },
    { x: 300, y: 315 },
    { x: 435, y: 310 }
  ];
  const result = validateDrawnStroke(drawn, 1, strokesTai);
  assert.strictEqual(result.isValid, false);
  assert.strictEqual(result.status, 'out_of_order');
  assert.strictEqual(result.matchedStrokeIndex, 2);
});

runTest('Hitsujun: Malformed / misplaced stroke is rejected with SHAPE_MISMATCH', () => {
  const drawn = [
    { x: 800, y: 800 },
    { x: 900, y: 900 }
  ];
  const result = validateDrawnStroke(drawn, 1, strokesTai);
  assert.strictEqual(result.isValid, false);
  assert.strictEqual(result.status, 'shape_mismatch');
});

runTest('Hitsujun: Random stroke matching only start point is strictly rejected', () => {
  // Starts near [180, 320] for stroke 2, but ends far off at [200, 800]
  const drawn = [
    { x: 185, y: 320 },
    { x: 190, y: 550 },
    { x: 200, y: 800 }
  ];
  const result = validateDrawnStroke(drawn, 2, strokesTai);
  assert.strictEqual(result.isValid, false);
  assert.strictEqual(result.status, 'shape_mismatch');
});

runTest('Hitsujun: Straight chord drawn on curved loop (Stroke 3 of あ) is strictly rejected', () => {
  // Drawn as straight vertical line from [602, 405] to [610, 863]
  const drawn = [
    { x: 602, y: 405 },
    { x: 606, y: 634 },
    { x: 610, y: 863 }
  ];
  const result = validateDrawnStroke(drawn, 3, strokeA3);
  assert.strictEqual(result.isValid, false);
  assert.strictEqual(result.status, 'shape_mismatch');
  assert(result.message.includes('melengkung') || result.message.includes('curve'));
});

runTest('Vector Math: Arc-length resampling produces target N points', () => {
  const rawPoints = [
    { x: 0, y: 0 },
    { x: 100, y: 0 }
  ];
  const resampled = resampleStroke(rawPoints, 64);
  assert.strictEqual(resampled.length, 64);
  assert.strictEqual(resampled[0].x, 0);
  assert.strictEqual(resampled[63].x, 100);
});

runTest('Vector Math: Canonical 1000x1000 space normalization', () => {
  const points = [{ x: 250, y: 250 }];
  const normalized = normalizeTo1000Space(points, 500, 500);
  assert.strictEqual(normalized[0].x, 500);
  assert.strictEqual(normalized[0].y, 500);
});

console.log(`\nHitsujun Tests Summary: ${passCount}/${totalTests} PASSED.\n`);
if (passCount !== totalTests) {
  process.exit(1);
}
