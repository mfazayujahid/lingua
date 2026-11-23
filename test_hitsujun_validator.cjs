const assert = require('assert');

// Test suite for Hitsujun stroke validation
// We can test the mathematical logic directly
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
  return (rad * 180) / Math.PI;
}

function angularDiffDeg(a1, a2) {
  let diff = (a1 - a2) % 360;
  if (diff < -180) diff += 360;
  if (diff > 180) diff -= 360;
  return Math.abs(diff);
}

function validateDrawnStroke(drawnPoints, currentExpectedIndex, allStrokes) {
  if (drawnPoints.length < 2) {
    return {
      isValid: false,
      status: 'shape_mismatch',
      message: 'Stroke was too short. Trace with confidence.',
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
      message: 'Character already completed.',
      geometryScore: 100
    };
  }

  const targetAngle = computeTrajectoryAngleDeg(
    { x: targetStroke.startPoint[0], y: targetStroke.startPoint[1] },
    { x: targetStroke.endPoint[0], y: targetStroke.endPoint[1] }
  );

  const angleDiff = angularDiffDeg(drawnAngle, targetAngle);
  const distStartToStart = Math.hypot(pStart.x - targetStroke.startPoint[0], pStart.y - targetStroke.startPoint[1]);
  const distEndToEnd = Math.hypot(pEnd.x - targetStroke.endPoint[0], pEnd.y - targetStroke.endPoint[1]);
  const distStartToEnd = Math.hypot(pStart.x - targetStroke.endPoint[0], pStart.y - targetStroke.endPoint[1]);
  const distEndToStart = Math.hypot(pEnd.x - targetStroke.startPoint[0], pEnd.y - targetStroke.startPoint[1]);

  if (distStartToEnd < 150 && distEndToStart < 150 && angleDiff > 120) {
    return {
      isValid: false,
      status: 'reversed',
      message: `Reverse Direction! In Japanese hitsujun, this stroke flows ${targetStroke.directionalHint || 'from top to bottom'}.`,
      geometryScore: 40
    };
  }

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
        message: `Out of Order! You drew Stroke ${j} early. ${targetStroke.pedagogicalRule || `Please complete Stroke ${currentExpectedIndex} first.`}`,
        matchedStrokeIndex: j,
        geometryScore: 60
      };
    }
  }

  const isStartClose = distStartToStart < 160;
  const isEndClose = distEndToEnd < 180;
  const isAngleAligned = angleDiff < 55;

  if (isStartClose && isEndClose && isAngleAligned) {
    const avgDist = (distStartToStart + distEndToEnd) / 2;
    const geometryScore = Math.max(70, Math.round(100 - avgDist * 0.2 - angleDiff * 0.3));
    return {
      isValid: true,
      status: 'accepted',
      message: `Stroke ${currentExpectedIndex} accepted! Good stroke flow.`,
      matchedStrokeIndex: currentExpectedIndex,
      geometryScore
    };
  }

  if (targetStroke.strokeType === 'dot' && (distStartToStart < 180 || distEndToEnd < 180)) {
    return {
      isValid: true,
      status: 'accepted',
      message: `Stroke ${currentExpectedIndex} accepted!`,
      matchedStrokeIndex: currentExpectedIndex,
      geometryScore: 80
    };
  }

  return {
    isValid: false,
    status: 'shape_mismatch',
    message: `Stroke deviated in position or shape. Follow the grid guides.`,
    geometryScore: 30
  };
}

console.log('=== RUNNING KANJI HITSUJUN & STROKE VALIDATOR SUITE ===\n');

// Mock stroke metadata for Kanji 対 (7 strokes)
const strokesTai = [
  {
    strokeIndex: 1,
    strokeType: 'dot',
    startPoint: [280, 180],
    endPoint: [310, 260],
    directionalHint: 'downward and inward',
    pedagogicalRule: 'Left component: Top dot comes first.'
  },
  {
    strokeIndex: 2,
    strokeType: 'horizontal',
    startPoint: [180, 320],
    endPoint: [440, 310],
    directionalHint: 'left to right',
    pedagogicalRule: 'Horizontal bar precedes diagonal sweeps.'
  },
  {
    strokeIndex: 3,
    strokeType: 'diagonal_left',
    startPoint: [360, 330],
    endPoint: [160, 680],
    directionalHint: 'top-right to bottom-left',
    pedagogicalRule: 'Left diagonal sweep.'
  },
  {
    strokeIndex: 4,
    strokeType: 'diagonal_right',
    startPoint: [220, 440],
    endPoint: [430, 680],
    directionalHint: 'top-left to bottom-right',
    pedagogicalRule: 'Cross diagonal completes left radical.'
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
  // Drawn from bottom (310, 260) to top (280, 180)
  const drawn = [
    { x: 310, y: 260 },
    { x: 295, y: 220 },
    { x: 280, y: 180 }
  ];
  const result = validateDrawnStroke(drawn, 1, strokesTai);
  assert.strictEqual(result.isValid, false);
  assert.strictEqual(result.status, 'reversed');
  assert(result.message.includes('Reverse Direction'));
});

runTest('Hitsujun: Out-of-order stroke (drew stroke 2 when expecting stroke 1) is rejected', () => {
  // Draw stroke 2 (horizontal bar from [180, 320] to [440, 310])
  const drawn = [
    { x: 185, y: 320 },
    { x: 300, y: 315 },
    { x: 435, y: 310 }
  ];
  const result = validateDrawnStroke(drawn, 1, strokesTai);
  assert.strictEqual(result.isValid, false);
  assert.strictEqual(result.status, 'out_of_order');
  assert.strictEqual(result.matchedStrokeIndex, 2);
  assert(result.message.includes('Out of Order'));
});

runTest('Hitsujun: Malformed / misplaced stroke is rejected with SHAPE_MISMATCH', () => {
  // Drawn in completely random coordinates
  const drawn = [
    { x: 800, y: 800 },
    { x: 900, y: 900 }
  ];
  const result = validateDrawnStroke(drawn, 1, strokesTai);
  assert.strictEqual(result.isValid, false);
  assert.strictEqual(result.status, 'shape_mismatch');
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
