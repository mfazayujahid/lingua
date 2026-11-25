// Audio Feedback using Web Audio API Synthesizers

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  } catch {
    return null;
  }
}

/**
 * Gentle calligraphic chime for valid stroke acceptance
 */
export function playStrokeSuccessSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
  osc.frequency.exponentialRampToValueAtTime(880.0, ctx.currentTime + 0.12); // A5

  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.25);
}

/**
 * Soft low alert for out-of-order or reversed strokes
 */
export function playStrokeErrorSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(220.0, ctx.currentTime); // A3
  osc.frequency.linearRampToValueAtTime(164.81, ctx.currentTime + 0.2); // E3

  gain.gain.setValueAtTime(0.18, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.25);
}

/**
 * Harmonious completion chime when entire character is mastered
 */
export function playCharacterCompleteSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 arpeggio
  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    const startTime = ctx.currentTime + idx * 0.08;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.15, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + 0.4);
  });
}

/**
 * Official JLPT Chokai Listening Section Chime Cue (4-note ascending/descending broadcast chime)
 */
export function playJLPTChimeSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const chimeNotes = [
    { freq: 523.25, delay: 0, dur: 0.35 },    // C5
    { freq: 659.25, delay: 0.25, dur: 0.35 }, // E5
    { freq: 783.99, delay: 0.50, dur: 0.35 }, // G5
    { freq: 523.25, delay: 0.75, dur: 0.65 }  // C5 hold
  ];

  chimeNotes.forEach(n => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const t0 = ctx.currentTime + n.delay;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(n.freq, t0);

    gain.gain.setValueAtTime(0.001, t0);
    gain.gain.linearRampToValueAtTime(0.18, t0 + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, t0 + n.dur);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t0);
    osc.stop(t0 + n.dur);
  });
}
