/**
 * Soft fairy-garden music-box loop (Web Audio).
 * No MP3 needed — magical pentatonic chimes.
 */

const NOTES = [
  523.25, // C5
  587.33, // D5
  659.25, // E5
  783.99, // G5
  880.0, // A5
  1046.5, // C6
];

/** Simple looping motif indices into NOTES */
const MOTIF = [0, 2, 4, 2, 3, 1, 0, 4, 2, 5, 4, 2, 0, 2, 1, 0];

export class FairyMusic {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private timer: number | null = null;
  private step = 0;
  private playing = false;
  private targetVol = 0.22;

  get isPlaying() {
    return this.playing;
  }

  async start() {
    if (this.playing) return;

    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!this.ctx) this.ctx = new AC();
    if (this.ctx.state === "suspended") await this.ctx.resume();

    this.master = this.ctx.createGain();
    this.master.gain.value = 0;
    this.master.connect(this.ctx.destination);

    // Soft pad drone
    this.playPad();

    this.playing = true;
    this.step = 0;
    this.scheduleNext();

    const now = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(0, now);
    this.master.gain.linearRampToValueAtTime(this.targetVol, now + 1.2);
  }

  stop() {
    if (!this.ctx || !this.master) {
      this.playing = false;
      return;
    }
    const now = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(this.master.gain.value, now);
    this.master.gain.linearRampToValueAtTime(0, now + 0.6);

    window.setTimeout(() => {
      if (this.timer != null) {
        window.clearTimeout(this.timer);
        this.timer = null;
      }
      this.playing = false;
      try {
        void this.ctx?.suspend();
      } catch {
        /* noop */
      }
    }, 650);
  }

  private scheduleNext() {
    if (!this.playing || !this.ctx || !this.master) return;

    const idx = MOTIF[this.step % MOTIF.length]!;
    this.playChime(NOTES[idx]!);
    this.step += 1;

    // Gentle uneven rhythm — music-box feel
    const gap = this.step % 4 === 0 ? 520 : this.step % 2 === 0 ? 380 : 300;
    this.timer = window.setTimeout(() => this.scheduleNext(), gap);
  }

  private playChime(freq: number) {
    if (!this.ctx || !this.master) return;
    const t = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, t);

    // Soft harmonic overtone
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(freq * 2, t);
    gain2.gain.setValueAtTime(0.12, t);
    gain2.gain.exponentialRampToValueAtTime(0.001, t + 1.4);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(2400, t);

    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.55, t + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 1.6);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.master);
    osc2.connect(gain2);
    gain2.connect(this.master);

    osc.start(t);
    osc.stop(t + 1.7);
    osc2.start(t);
    osc2.stop(t + 1.5);
  }

  private playPad() {
    if (!this.ctx || !this.master) return;
    const t = this.ctx.currentTime;

    for (const f of [261.63, 329.63, 392.0]) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = f;
      gain.gain.value = 0.04;
      osc.connect(gain);
      gain.connect(this.master);
      osc.start(t);
      // Keep pad for a long time; restarting on next start() is fine
      osc.stop(t + 600);
    }
  }
}
