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
 * Human-Friendly Multi-Factor Hitsujun Stroke Validator
 * Reliable, forgiving of touch/mouse imprecision, zero false rejections for natural strokes
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
  // Strictly for straight strokes (horizontal, vertical, slashes); NEVER for cursive loops/hooks
  const isStraightStroke = ['horizontal', 'vertical', 'left_fall', 'right_fall'].includes(targetStroke.strokeType);
  if (isStraightStroke && distStartToEnd < 200 && distEndToStart < 200 && angleDiff > 125) {
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
  // Only trigger if current stroke is NOT 1, and drawn stroke is unmistakably matching a future stroke
  if (currentExpectedIndex > 1 && currentExpectedIndex < allStrokes.length) {
    for (let j = currentExpectedIndex + 1; j <= allStrokes.length; j++) {
      const futureStroke = allStrokes.find(s => s.strokeIndex === j);
      if (!futureStroke) continue;

      const fStartDist = Math.hypot(pStart.x - futureStroke.startPoint[0], pStart.y - futureStroke.startPoint[1]);
      const fEndDist = Math.hypot(pEnd.x - futureStroke.endPoint[0], pEnd.y - futureStroke.endPoint[1]);

      if (fStartDist < 140 && fEndDist < 140) {
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

  // 3. DIRECTIONAL COMPLIANCE
  const dx = pEnd.x - pStart.x;
  const dy = pEnd.y - pStart.y;
  let isDirectionCompliant = false;

  switch (targetStroke.strokeType) {
    case 'horizontal':
      // Left-to-right flow
      isDirectionCompliant = dx > 20 && (angleDiff < 55 || Math.abs(dy) < Math.abs(dx) * 2.2);
      break;
    case 'vertical':
      // Top-to-bottom flow
      isDirectionCompliant = dy > 20 && (angleDiff < 55 || Math.abs(dx) < Math.abs(dy) * 2.2);
      break;
    case 'left_fall':
      isDirectionCompliant = dy > 15 && dx < 40;
      break;
    case 'right_fall':
      isDirectionCompliant = dy > 15 && dx > -40;
      break;
    case 'hook':
    case 'dot':
    default:
      // Broad tolerance for curves, loops, and hooks
      isDirectionCompliant = distStartToStart < 440 || distEndToEnd < 440 || angleDiff < 85;
      break;
  }

  // 4. HUMAN-FRIENDLY ACCURACY VERIFICATION:
  // Generous human tolerance in 1000-space (up to 420 units)
  const startThreshold = 420;
  const endThreshold = 420;

  const isStartClose = distStartToStart < startThreshold;
  const isEndClose = distEndToEnd < endThreshold;

  const passesHumanThreshold =
    (isStartClose && isEndClose) ||
    (isStartClose && isDirectionCompliant) ||
    (isEndClose && isDirectionCompliant) ||
    (distStartToStart < 460 && distEndToEnd < 460 && angleDiff < 55) ||
    // For stroke 1, if drawn left-to-right across upper half:
    (currentExpectedIndex === 1 && targetStroke.strokeType === 'horizontal' && dx > 30 && pStart.y < 550);

  if (passesHumanThreshold) {
    const avgDist = (distStartToStart + distEndToEnd) / 2;
    const geometryScore = Math.min(100, Math.max(82, Math.round(100 - avgDist * 0.08)));

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

  return {
    isValid: false,
    status: 'shape_mismatch',
    message: isId
      ? `Goresan ${currentExpectedIndex}: ${targetStroke.directionalHint || 'Tarik sesuai panduan'}.`
      : `Stroke ${currentExpectedIndex}: ${targetStroke.directionalHint || 'Follow guide'}.`,
    geometryScore: 45,
    animatedGuide: {
      start: targetStroke.startPoint,
      end: targetStroke.endPoint,
      pedagogicalRule: targetStroke.pedagogicalRule
    }
  };
}
