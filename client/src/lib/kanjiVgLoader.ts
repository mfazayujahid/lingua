// Authentic KanjiVG Vector Loader & Runtime Parser
// High-fidelity [0, 1000]^2 coordinate space with 60 FPS sampling
import { StrokeDefinition } from '../../../shared/types';
import joyoVectorsRaw from '../data/joyoVectors.json';
import { sampleSvgPathPoints } from './strokeValidator';

const joyoVectorsData: Record<string, {
  character: string;
  strokeCount: number;
  strokePaths: string[];
  strokeMetadata: StrokeDefinition[];
}> = joyoVectorsRaw as any;

const runtimeMemoryCache = new Map<string, StrokeDefinition[]>();

// Initialize memory cache with pre-bundled N5 + anchor vectors
for (const [char, entry] of Object.entries(joyoVectorsData)) {
  if (entry && entry.strokeMetadata) {
    runtimeMemoryCache.set(char, entry.strokeMetadata);
  }
}

const SCALE = 1000 / 109;

function scaleSvgPath(d: string): string {
  return d.replace(/([0-9]+\.?[0-9]*)/g, num => {
    const scaled = parseFloat(num) * SCALE;
    return String(Math.round(scaled));
  });
}

function parseKanjiVgSvg(svg: string, char: string): StrokeDefinition[] {
  const pathRegex = /<path[^>]*id="([^"]+)"[^>]*kvg:type="([^"]+)"[^>]*d="([^"]+)"/g;
  let match: RegExpExecArray | null;
  const strokes: StrokeDefinition[] = [];
  let index = 1;

  while ((match = pathRegex.exec(svg)) !== null) {
    const rawType = match[2];
    const rawD = match[3];
    const scaledD = scaleSvgPath(rawD);
    const pts = sampleSvgPathPoints(scaledD, 32);

    const startPoint: [number, number] = pts.length > 0 ? [Math.round(pts[0].x), Math.round(pts[0].y)] : [500, 500];
    const endPoint: [number, number] = pts.length > 0 ? [Math.round(pts[pts.length - 1].x), Math.round(pts[pts.length - 1].y)] : [500, 500];

    const dx = endPoint[0] - startPoint[0];
    const dy = endPoint[1] - startPoint[1];
    let angle = Math.round((Math.atan2(dy, dx) * 180) / Math.PI);
    if (angle < 0) angle += 360;

    let strokeType: StrokeDefinition['strokeType'] = 'horizontal';
    let directionalHint = 'Tarik dari kiri ke kanan';

    if (rawType.includes('㇒') || rawType.includes('slash') || rawType.includes('撇')) {
      strokeType = 'left_fall';
      directionalHint = 'Tarik miring dari kanan-atas ke kiri-bawah (Harai)';
    } else if (rawType.includes('㇏') || rawType.includes('backslash') || rawType.includes('捺')) {
      strokeType = 'right_fall';
      directionalHint = 'Tarik miring dari kiri-atas ke kanan-bawah';
    } else if (rawType.includes('㇑') || rawType.includes('vertical') || rawType.includes('竖')) {
      strokeType = 'vertical';
      directionalHint = 'Tarik vertikal dari atas ke bawah';
    } else if (rawType.includes('㇐') || rawType.includes('horizontal') || rawType.includes('横')) {
      strokeType = 'horizontal';
      directionalHint = 'Tarik horizontal dari kiri ke kanan';
    } else if (rawType.includes('㇔') || rawType.includes('dot') || rawType.includes('点')) {
      strokeType = 'dot';
      directionalHint = 'Titikkan goresan pendek (Ten)';
    } else if (rawType.includes('㇈') || rawType.includes('㇠') || rawType.includes('hook') || rawType.includes('折') || rawType.includes('钩') || rawType.includes('弯')) {
      strokeType = 'hook';
      directionalHint = 'Tarik berbelok dengan kait (Hane/Kagi)';
    } else {
      if (Math.abs(dx) > Math.abs(dy)) strokeType = 'horizontal';
      else strokeType = 'vertical';
    }

    strokes.push({
      strokeIndex: index++,
      svgPath: scaledD,
      startPoint,
      endPoint,
      primaryAngleDeg: angle,
      strokeType,
      directionalHint,
      pedagogicalRule: `Goresan ${rawType} sesuai standar kaligrafi KanjiVG.`
    });
  }
  return strokes;
}

export function getCachedOrPreloadedVector(char: string): StrokeDefinition[] | null {
  if (!char) return null;
  if (runtimeMemoryCache.has(char)) {
    return runtimeMemoryCache.get(char)!;
  }
  const joyo = joyoVectorsData[char];
  if (joyo && joyo.strokeMetadata && joyo.strokeMetadata.length > 0) {
    runtimeMemoryCache.set(char, joyo.strokeMetadata);
    return joyo.strokeMetadata;
  }
  return null;
}

export async function loadKanjiVgVector(char: string): Promise<StrokeDefinition[] | null> {
  const cached = getCachedOrPreloadedVector(char);
  if (cached) return cached;

  try {
    const code = char.charCodeAt(0).toString(16).padStart(5, '0');
    const url = `https://cdn.jsdelivr.net/gh/KanjiVG/kanjivg@master/kanji/${code}.svg`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const svgText = await res.text();
    const strokes = parseKanjiVgSvg(svgText, char);
    if (strokes.length > 0) {
      runtimeMemoryCache.set(char, strokes);
      return strokes;
    }
  } catch (err) {
    console.warn(`Dynamic KanjiVG load failed for ${char}`, err);
  }
  return null;
}
