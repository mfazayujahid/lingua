// 60 FPS Vector Mathematics, Arc-Length Resampling & Human-Friendly Hitsujun Validation Engine
import { StrokeDefinition, StrokePoint } from '../../../shared/types';

export interface ValidationOutcome {
  isValid: boolean;
  status: 'accepted' | 'reversed' | 'out_of_order' | 'shape_mismatch';
  message: string;
  matchedStrokeIndex?: number;
  geometryScore: number; // 0 - 100
  animatedGuide?: {
    start: [number, number];
    end: [number, number];
    pedagogicalRule?: string;
  };
}

/**
 * Resamples raw drawn points to N equidistant points along arc length
 */
export function resampleStroke(points: StrokePoint[], targetCount = 64): StrokePoint[] {
  if (points.length <= 1) return points;

  // Calculate cumulative arc length
  let totalLength = 0;
  const cumulativeLengths: number[] = [0];

  for (let i = 1; i < points.length; i++) {
    const dx = points[i].x - points[i - 1].x;
    const dy = points[i].y - points[i - 1].y;
    totalLength += Math.hypot(dx, dy);
    cumulativeLengths.push(totalLength);
  }

  if (totalLength === 0) return points;

  const segmentLength = totalLength / (targetCount - 1);
  const resampled: StrokePoint[] = [points[0]];

  let srcIndex = 0;
  for (let i = 1; i < targetCount - 1; i++) {
    const targetDist = i * segmentLength;

    while (srcIndex < cumulativeLengths.length - 1 && cumulativeLengths[srcIndex + 1] < targetDist) {
      srcIndex++;
    }

    const segStartDist = cumulativeLengths[srcIndex];
    const segEndDist = cumulativeLengths[srcIndex + 1] || totalLength;
    const segDist = segEndDist - segStartDist;

    const t = segDist === 0 ? 0 : (targetDist - segStartDist) / segDist;
    const p1 = points[srcIndex];
    const p2 = points[srcIndex + 1] || p1;

    resampled.push({
      x: p1.x + t * (p2.x - p1.x),
      y: p1.y + t * (p2.y - p1.y),
      t: (p1.t ?? Date.now()) + (p2.t && p1.t ? t * (p2.t - p1.t) : 0)
    });
  }

  resampled.push(points[points.length - 1]);
  return resampled;
}

/**
 * Computes the angle of trajectory from point 1 to point 2 in degrees [0, 360)
 */
export function computeTrajectoryAngleDeg(p1: StrokePoint, p2: StrokePoint): number {
  const rad = Math.atan2(p2.y - p1.y, p2.x - p1.x);
  let deg = (rad * 180) / Math.PI;
  if (deg < 0) deg += 360;
  return deg;
}

/**
 * Calculates shortest angular difference between two angles in degrees (0 to 180)
 */
export function angularDiffDeg(a1: number, a2: number): number {
  let diff = Math.abs(a1 - a2) % 360;
  if (diff > 180) diff = 360 - diff;
  return diff;
}

/**
 * Samples SVG path commands into discrete points [0, 1000] for curvature analysis
 */
export function sampleSvgPathPoints(d: string, samples = 32): StrokePoint[] {
  if (typeof document !== 'undefined') {
    try {
      const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      pathEl.setAttribute('d', d);
      const totalLen = pathEl.getTotalLength();
      if (totalLen > 0) {
        const pts: StrokePoint[] = [];
        for (let i = 0; i < samples; i++) {
          const pt = pathEl.getPointAtLength((i / (samples - 1)) * totalLen);
          pts.push({ x: pt.x, y: pt.y });
        }
        return pts;
      }
    } catch {}
  }

  // Fallback pure JS cubic bezier sampler (works in Node.js & headless environments)
  let currX = 0, currY = 0;
  const points: StrokePoint[] = [];
  const regex = /([MmLlCcSsHhVvZz])([^MmLlCcSsHhVvZz]*)/g;
  let match: RegExpExecArray | null;
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

/**
 * Human-Friendly Multi-Factor Hitsujun Stroke Validator
 * Precise endpoints (<=160/180), directional compliance, and curvature fidelity
 */
export function validateDrawnStroke(
  drawnPoints: StrokePoint[],
  currentExpectedIndex: number, // 1-indexed
  allStrokes: StrokeDefinition[],
  lang: string = 'id'
): ValidationOutcome {
  const isId = lang === 'id';

  if (!drawnPoints || drawnPoints.length === 0) {
    return {
      isValid: false,
      status: 'shape_mismatch',
      message: isId ? 'Goresan terlalu pendek.' : 'Stroke too short.',
      geometryScore: 0
    };
  }

  // Handle single-point tap
  if (drawnPoints.length === 1) {
    drawnPoints = [drawnPoints[0], { x: drawnPoints[0].x + 5, y: drawnPoints[0].y + 5, t: drawnPoints[0].t }];
  }

  const pStart = drawnPoints[0];
  const pEnd = drawnPoints[drawnPoints.length - 1];
  const drawnAngle = computeTrajectoryAngleDeg(pStart, pEnd);

  const targetStroke = allStrokes.find(s => s.strokeIndex === currentExpectedIndex);
  if (!targetStroke) {
    return {
      isValid: false,
      status: 'shape_mismatch',
      message: isId ? 'Karakter sudah selesai.' : 'Character already completed.',
      geometryScore: 100
    };
  }

  // Target start & end coordinates
  const tStart: StrokePoint = { x: targetStroke.startPoint[0], y: targetStroke.startPoint[1] };
  const tEnd: StrokePoint = { x: targetStroke.endPoint[0], y: targetStroke.endPoint[1] };

  const targetAngle = computeTrajectoryAngleDeg(tStart, tEnd);
  const angleDiff = angularDiffDeg(drawnAngle, targetAngle);

  // Proximity to expected start/end points in 1000-space
  const distStartToStart = Math.hypot(pStart.x - tStart.x, pStart.y - tStart.y);
  const distEndToEnd = Math.hypot(pEnd.x - tEnd.x, pEnd.y - tEnd.y);

  // Reverse proximity check
  const distStartToEnd = Math.hypot(pStart.x - tEnd.x, pStart.y - tEnd.y);
  const distEndToStart = Math.hypot(pEnd.x - tStart.x, pEnd.y - tStart.y);

  // 1. REVERSE STROKE DETECTION:
  // Strictly for straight/diagonal strokes; also catch reversed strokes in general
  const isStraightStroke = ['horizontal', 'vertical', 'left_fall', 'right_fall'].includes(targetStroke.strokeType);
  if ((isStraightStroke && distStartToEnd < 180 && distEndToStart < 180 && angleDiff > 120) ||
      (distStartToEnd < 140 && distEndToStart < 140 && angleDiff > 130)) {
    return {
      isValid: false,
      status: 'reversed',
      message: isId
        ? `Arah Terbalik! Dalam urutan goresan Jepang, goresan ini ditarik ${targetStroke.directionalHint || 'dari kiri ke kanan'}.`
        : `Reverse Direction! In Japanese hitsujun, this stroke flows ${targetStroke.directionalHint || 'from left to right'}.`,
      geometryScore: 40,
      animatedGuide: {
        start: targetStroke.startPoint,
        end: targetStroke.endPoint,
        pedagogicalRule: targetStroke.pedagogicalRule
      }
    };
  }

  // 2. OUT OF ORDER DETECTION:
  if (currentExpectedIndex < allStrokes.length) {
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
          message: isId
            ? `Urutan Salah! Tarik Goresan ${currentExpectedIndex} terlebih dahulu.`
            : `Out of Order! Please draw Stroke ${currentExpectedIndex} first.`,
          matchedStrokeIndex: j,
          geometryScore: 50,
          animatedGuide: {
            start: targetStroke.startPoint,
            end: targetStroke.endPoint,
            pedagogicalRule: targetStroke.pedagogicalRule
          }
        };
      }
    }
  }

  // 3. STRICT ENDPOINT PROXIMITY VERIFICATION:
  // Both start and end points MUST be near the target endpoints!
  // Maximum tolerance: start <= 160 units, end <= 180 units.
  const startThreshold = 160;
  const endThreshold = 180;

  const isDotStroke = targetStroke.strokeType === 'dot';
  const isStartClose = distStartToStart <= startThreshold;
  const isEndClose = distEndToEnd <= endThreshold;

  if (isDotStroke) {
    // Dot strokes are small marks where start & end are near identical
    const dotPassed = (isStartClose && isEndClose) || (distStartToStart <= 180 && distEndToEnd <= 200);
    if (!dotPassed) {
      return {
        isValid: false,
        status: 'shape_mismatch',
        message: isId
          ? `Titik goresan menyimpang dari posisi target.`
          : `Dot stroke deviated from target position.`,
        geometryScore: 35,
        animatedGuide: {
          start: targetStroke.startPoint,
          end: targetStroke.endPoint,
          pedagogicalRule: targetStroke.pedagogicalRule
        }
      };
    }
  } else {
    // Non-dot strokes: BOTH start and end MUST satisfy threshold.
    // Zero bypass for single-endpoint matching!
    if (!isStartClose || !isEndClose) {
      return {
        isValid: false,
        status: 'shape_mismatch',
        message: isId
          ? `Posisi goresan menyimpang. Mulai di dekat titik awal dan akhiri di titik akhir yang tepat.`
          : `Stroke endpoints deviated. Start near the start point and end near the expected endpoint.`,
        geometryScore: 30,
        animatedGuide: {
          start: targetStroke.startPoint,
          end: targetStroke.endPoint,
          pedagogicalRule: targetStroke.pedagogicalRule
        }
      };
    }
  }

  // 4. TRAJECTORY ANGLE VERIFICATION:
  // <= 45 degrees for straight/diagonal strokes, <= 65 degrees for curved/hook strokes
  const maxAllowedAngleDiff = ['hook'].includes(targetStroke.strokeType) ? 65 : (isDotStroke ? 85 : 45);
  if (angleDiff > maxAllowedAngleDiff) {
    return {
      isValid: false,
      status: 'shape_mismatch',
      message: isId
        ? `Arah goresan tidak sesuai (${targetStroke.directionalHint || 'Tarik sesuai panduan'}).`
        : `Stroke angle misaligned (${targetStroke.directionalHint || 'Follow guide'}).`,
      geometryScore: 40,
      animatedGuide: {
        start: targetStroke.startPoint,
        end: targetStroke.endPoint,
        pedagogicalRule: targetStroke.pedagogicalRule
      }
    };
  }

  // 5. TRAJECTORY CURVATURE & MIDPOINT FIDELITY:
  // Prevents random straight lines from passing curved strokes (e.g. stroke 3 of 'あ')
  if (targetStroke.svgPath && !isDotStroke) {
    const chordMidX = (tStart.x + tEnd.x) / 2;
    const chordMidY = (tStart.y + tEnd.y) / 2;

    const targetPoints = sampleSvgPathPoints(targetStroke.svgPath, 32);
    if (targetPoints.length >= 5) {
      const targetMid = targetPoints[Math.floor(targetPoints.length / 2)];
      const targetCurvature = Math.hypot(targetMid.x - chordMidX, targetMid.y - chordMidY);

      // If the target stroke is distinctly curved or a loop (curvature >= 120 units from straight chord)
      if (targetCurvature >= 120) {
        const drawnMid = drawnPoints[Math.floor(drawnPoints.length / 2)];
        const distDrawnToTargetMid = Math.hypot(drawnMid.x - targetMid.x, drawnMid.y - targetMid.y);
        const distDrawnToChordMid = Math.hypot(drawnMid.x - chordMidX, drawnMid.y - chordMidY);

        // If the user drew a straight line across (near chord midpoint, far from target curve midpoint)
        if (distDrawnToTargetMid > 220 || (distDrawnToChordMid < 75 && distDrawnToTargetMid > 160)) {
          return {
            isValid: false,
            status: 'shape_mismatch',
            message: isId
              ? `Goresan ${currentExpectedIndex} harus melengkung sesuai bentuk karakter, bukan garis lurus.`
              : `Stroke ${currentExpectedIndex} must curve according to the character shape, not a straight line.`,
            geometryScore: 40,
            animatedGuide: {
              start: targetStroke.startPoint,
              end: targetStroke.endPoint,
              pedagogicalRule: targetStroke.pedagogicalRule
            }
          };
        }
      }
    }
  }

  // 6. STROKE ACCEPTED:
  const avgDist = (distStartToStart + distEndToEnd) / 2;
  const geometryScore = Math.min(100, Math.max(70, Math.round(100 - avgDist * 0.15 - angleDiff * 0.2)));

  return {
    isValid: true,
    status: 'accepted',
    message: isId
      ? `Goresan ${currentExpectedIndex} diterima!`
      : `Stroke ${currentExpectedIndex} accepted!`,
    matchedStrokeIndex: currentExpectedIndex,
    geometryScore
  };
}
