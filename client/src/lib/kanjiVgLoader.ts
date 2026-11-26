// Authentic KanjiVG Vector Loader & Runtime Parser
// High-fidelity [0, 1000]^2 coordinate space
// Pre-bundled with 100% of all 2,136 official Jōyō Kanji
import { StrokeDefinition } from '../../../shared/types';

interface JoyoVectorEntry {
  character: string;
  strokeCount: number;
  strokePaths: string[];
  strokeMetadata: StrokeDefinition[];
}

let joyoVectorsData: Record<string, JoyoVectorEntry> | null = null;
const runtimeMemoryCache = new Map<string, StrokeDefinition[]>();

export async function ensureVectorsLoaded(): Promise<Record<string, JoyoVectorEntry>> {
  if (joyoVectorsData) return joyoVectorsData;
  try {
    const mod = await import('../data/joyoVectors.json');
    joyoVectorsData = (mod.default || mod) as unknown as Record<string, JoyoVectorEntry>;
    return joyoVectorsData;
  } catch (err) {
    console.warn('Failed to load joyoVectors.json chunk', err);
    return {};
  }
}

export function getCachedOrPreloadedVector(char: string): StrokeDefinition[] | null {
  if (!char) return null;
  if (runtimeMemoryCache.has(char)) {
    return runtimeMemoryCache.get(char)!;
  }
  if (joyoVectorsData && joyoVectorsData[char]) {
    const entry = joyoVectorsData[char];
    if (entry && entry.strokeMetadata && entry.strokeMetadata.length > 0) {
      runtimeMemoryCache.set(char, entry.strokeMetadata);
      return entry.strokeMetadata;
    }
  }
  return null;
}

export async function loadKanjiVgVector(char: string): Promise<StrokeDefinition[] | null> {
  if (!char) return null;
  const cached = getCachedOrPreloadedVector(char);
  if (cached) return cached;

  const allVectors = await ensureVectorsLoaded();
  if (allVectors[char]) {
    const entry = allVectors[char];
    if (entry && entry.strokeMetadata && entry.strokeMetadata.length > 0) {
      runtimeMemoryCache.set(char, entry.strokeMetadata);
      return entry.strokeMetadata;
    }
  }

  return null;
}
