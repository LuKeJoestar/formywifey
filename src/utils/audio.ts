// Elegant romantic sound synthesis using the browser's Web Audio API.
// Avoids heavy file loading and ensures perfect offline/inline execution.

let audioCtx: AudioContext | null = null;
let musicIntervalId: number | null = null;
let currentOscillators: { osc: OscillatorNode; gain: GainNode }[] = [];

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  // resume context if suspended (browser security policy)
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Plays a sparkling, fairy-like harp chime in a major chord (C Major / F Major progression)
 */
export function playRomanticChime() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Notes of a sparkling major-seventh chord (F4, A4, C5, E5, G5)
    const notes = [349.23, 440.00, 523.25, 659.25, 783.99];
    
    notes.forEach((freq, index) => {
      const delay = index * 0.12; // stagger the notes for a harp strum effect
      
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + delay);
      
      // delicate envelope
      gainNode.gain.setValueAtTime(0, now + delay);
      gainNode.gain.linearRampToValueAtTime(0.12, now + delay + 0.05); // quick soft attack
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + delay + 1.2); // long decaying release
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start(now + delay);
      osc.stop(now + delay + 1.3);
    });
  } catch (err) {
    console.warn("AudioContext block/error", err);
  }
}

/**
 * Plays a cute, organic flower placing/bubble popping sound
 */
export function playFlowerPop() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.type = 'sine';
    
    // Quick rising pitch for a bubbly popping sensation
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(680, now + 0.08);
    
    gainNode.gain.setValueAtTime(0.15, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.16);
  } catch (err) {
    console.warn("AudioContext block/error", err);
  }
}

/**
 * Stars a gentle repeating ambient romantic background loop (C major slow pentatonic progression)
 */
export function startBackgroundMusic() {
  try {
    const ctx = getAudioContext();
    if (musicIntervalId) return; // already playing
    
    const playNote = (freq: number, duration: number, volume: number = 0.04) => {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(volume, now + 0.4); // soft slow attack
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration); // very long smooth release
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start(now);
      osc.stop(now + duration + 0.5);
      
      const record = { osc, gain: gainNode };
      currentOscillators.push(record);
      setTimeout(() => {
        currentOscillators = currentOscillators.filter(o => o !== record);
      }, (duration + 1) * 1000);
    };

    // Ambient loop chords: Cmaj7 - Fmaj7 - Am7 - G
    const melody = [
      // Arpeggio notes
      [261.63, 329.63, 392.00, 493.88], // C, E, G, B
      [349.23, 440.00, 523.25, 659.25], // F, A, C, E
      [220.00, 329.63, 392.00, 440.00], // A, E, G, C
      [196.00, 293.66, 392.00, 493.88], // G, D, G, B
    ];
    
    let step = 0;
    const playMeasure = () => {
      const chord = melody[step % melody.length];
      
      // play arpeggiated bass and treble notes softly
      playNote(chord[0] / 2, 6.0, 0.025); // slow bass root note
      
      setTimeout(() => playNote(chord[1], 4.0, 0.02), 800);
      setTimeout(() => playNote(chord[2], 4.0, 0.02), 1600);
      setTimeout(() => playNote(chord[3], 4.0, 0.015), 2400);
      
      step++;
    };

    playMeasure();
    musicIntervalId = window.setInterval(playMeasure, 4000);
  } catch (err) {
    console.warn("Background music error", err);
  }
}

/**
 * Stops any active background ambient music loop
 */
export function stopBackgroundMusic() {
  if (musicIntervalId !== null) {
    clearInterval(musicIntervalId);
    musicIntervalId = null;
  }
  currentOscillators.forEach(({ osc, gain }) => {
    try {
      osc.stop();
      osc.disconnect();
      gain.disconnect();
    } catch {}
  });
  currentOscillators = [];
}
