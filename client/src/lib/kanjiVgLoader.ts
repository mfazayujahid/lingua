// Authentic KanjiVG Vector Loader & Runtime Parser
// High-fidelity [0, 1000]^2 coordinate space
// Pre-bundled with 100% of all 2,136 official Jōyō Kanji
import { StrokeDefinition } from '../../../shared/types';

interface CompactStrokeEntry {
  p: string; // SVG path
  s: [number, number]; // startPoint [x, y]
  e: [number, number]; // endPoint [x, y]
  a: number; // primaryAngleDeg
  t: string; // type code: h, v, l, r, d, k
}

const TYPE_MAP: Record<string, {
  type: StrokeDefinition['strokeType'];
  hint: string;
  rule: string;
}> = {
  h: {
    type: 'horizontal',
    hint: 'Tarik horizontal dari kiri ke kanan',
    rule: 'Goresan ㇐ sesuai standar kaligrafi KanjiVG.'
  },
  v: {
    type: 'vertical',
    hint: 'Tarik vertikal dari atas ke bawah',
    rule: 'Goresan ㇑ sesuai standar kaligrafi KanjiVG.'
  },
  l: {
    type: 'left_fall',
    hint: 'Tarik miring dari kanan-atas ke kiri-bawah (Harai)',
    rule: 'Goresan ㇒ sesuai standar kaligrafi KanjiVG.'
  },
  r: {
    type: 'right_fall',
    hint: 'Tarik miring dari kiri-atas ke kanan-bawah',
    rule: 'Goresan ㇏ sesuai standar kaligrafi KanjiVG.'
  },
  d: {
    type: 'dot',
    hint: 'Titikkan goresan pendek (Ten)',
    rule: 'Goresan ㇔ sesuai standar kaligrafi KanjiVG.'
  },
  k: {
    type: 'hook',
    hint: 'Tarik berbelok dengan kait (Hane/Kagi)',
    rule: 'Goresan kait sesuai standar kaligrafi KanjiVG.'
  }
};

let joyoCompactData: Record<string, CompactStrokeEntry[]> | null = null;
const runtimeMemoryCache = new Map<string, StrokeDefinition[]>();

export function sanitizeChar(charOrId: string): string {
  if (!charOrId) return '';
  if (charOrId.length === 1) return charOrId;
  const parts = charOrId.split('_');
  const lastPart = parts[parts.length - 1];
  return lastPart.length === 1 ? lastPart : charOrId;
}

function hydrateStrokes(compactStrokes: CompactStrokeEntry[]): StrokeDefinition[] {
  return compactStrokes.map((s, idx) => {
    const meta = TYPE_MAP[s.t] || TYPE_MAP['h'];
    return {
      strokeIndex: idx + 1,
      svgPath: s.p,
      startPoint: s.s,
      endPoint: s.e,
      primaryAngleDeg: s.a,
      strokeType: meta.type,
      directionalHint: meta.hint,
      pedagogicalRule: meta.rule
    };
  });
}

export async function ensureVectorsLoaded(): Promise<Record<string, CompactStrokeEntry[]>> {
  if (joyoCompactData) return joyoCompactData;
  try {
    const mod = await import('../data/joyoVectors.json');
    joyoCompactData = (mod.default || mod) as unknown as Record<string, CompactStrokeEntry[]>;
    return joyoCompactData;
  } catch (err) {
    console.warn('Failed to load joyoVectors.json chunk', err);
    return {};
  }
}

export function getCachedOrPreloadedVector(charOrId: string): StrokeDefinition[] | null {
  const char = sanitizeChar(charOrId);
  if (!char) return null;
  if (runtimeMemoryCache.has(char)) {
    return runtimeMemoryCache.get(char)!;
  }
  if (joyoCompactData && joyoCompactData[char]) {
    const strokes = hydrateStrokes(joyoCompactData[char]);
    runtimeMemoryCache.set(char, strokes);
    return strokes;
  }
  return null;
}

export async function loadKanjiVgVector(charOrId: string): Promise<StrokeDefinition[] | null> {
  const char = sanitizeChar(charOrId);
  if (!char) return null;
  const cached = getCachedOrPreloadedVector(char);
  if (cached) return cached;

  const allVectors = await ensureVectorsLoaded();
  if (allVectors && allVectors[char]) {
    const strokes = hydrateStrokes(allVectors[char]);
    runtimeMemoryCache.set(char, strokes);
    return strokes;
  }

  return null;
}
