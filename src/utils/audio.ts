import { SignalAudioScenario } from '../types/mission';

class SpaceAudio {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private activeNodes: { stop: () => void; timeoutIds: number[]; intervalIds: number[] } | null = null;

  private initCtx(): AudioContext | null {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopCurrentSignal();
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public playTelemetryBeep(freq = 1200, duration = 0.05, type: OscillatorType = 'sine') {
    if (this.isMuted) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.8, ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.035, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  public stopCurrentSignal() {
    if (this.activeNodes) {
      try {
        this.activeNodes.stop();
        this.activeNodes.timeoutIds.forEach(id => clearTimeout(id));
        this.activeNodes.intervalIds.forEach(id => clearInterval(id));
      } catch {
        // Safe cleanup
      }
      this.activeNodes = null;
    }
  }

  /**
   * Universal audio scenario synthesizer driven by exact parameters
   * Supports unique acoustic profiles: Opportunity, Spirit, InSight, Apollo 17, Ingenuity
   */
  public playSignalScenario(
    scenario: SignalAudioScenario,
    onProgress?: (progress: number) => void
  ): () => void {
    this.stopCurrentSignal();
    if (this.isMuted) {
      // Simulate progress even if muted for visualizer
      const startTime = Date.now();
      const interval = window.setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        const progress = Math.min(1, elapsed / scenario.duration);
        onProgress?.(progress);
        if (progress >= 1) {
          clearInterval(interval);
          this.activeNodes = null;
        }
      }, 50);
      this.activeNodes = { stop: () => clearInterval(interval), timeoutIds: [], intervalIds: [interval] };
      return () => this.stopCurrentSignal();
    }

    try {
      const ctx = this.initCtx();
      if (!ctx) return () => {};

      const now = ctx.currentTime;
      const totalDur = scenario.duration;
      const stopCallbacks: Array<() => void> = [];
      const timeouts: number[] = [];
      const intervals: number[] = [];

      // 1. Noise Generator (Atmospheric / Dust / Background)
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(1100, now);
      noiseFilter.Q.setValueAtTime(2.5, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(scenario.noiseBaseLevel, now);

      whiteNoise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      whiteNoise.start(now);
      stopCallbacks.push(() => {
        try {
          whiteNoise.stop();
          whiteNoise.disconnect();
          noiseGain.disconnect();
        } catch { /* noop */ }
      });

      // 2. Main Carrier Wave Oscillator
      const carrierOsc = ctx.createOscillator();
      const carrierGain = ctx.createGain();
      carrierOsc.type = 'sine';

      carrierOsc.connect(carrierGain);
      carrierGain.connect(ctx.destination);

      carrierOsc.start(now);
      stopCallbacks.push(() => {
        try {
          carrierOsc.stop();
          carrierOsc.disconnect();
          carrierGain.disconnect();
        } catch { /* noop */ }
      });

      // 3. Scenario Specific Logic
      switch (scenario.fadeType) {
        case 'jerky_noise_burst': {
          // OPPORTUNITY: Erratic signal dropouts in dust storm, noise rises, then silence
          carrierOsc.frequency.setValueAtTime(scenario.carrierFreq, now);

          // Stuttering amplitude envelope
          carrierGain.gain.setValueAtTime(0.045, now);
          carrierGain.gain.setValueAtTime(0.045, now + 1.2);
          carrierGain.gain.linearRampToValueAtTime(0.012, now + 1.6); // 1st dropout
          carrierGain.gain.linearRampToValueAtTime(0.038, now + 2.1);
          carrierGain.gain.linearRampToValueAtTime(0.004, now + 2.9); // 2nd severe dropout
          carrierGain.gain.linearRampToValueAtTime(0.022, now + 3.4);
          carrierGain.gain.linearRampToValueAtTime(0.002, now + 4.2); // 3rd dropout
          carrierGain.gain.linearRampToValueAtTime(0.012, now + 4.7);
          carrierGain.gain.exponentialRampToValueAtTime(0.00001, now + 5.6); // Total loss of carrier

          // Noise increases drastically as dust storm obscures transmission
          noiseGain.gain.setValueAtTime(0.003, now);
          noiseGain.gain.linearRampToValueAtTime(0.015, now + 2.5);
          noiseGain.gain.linearRampToValueAtTime(0.042, now + 4.8);
          noiseGain.gain.exponentialRampToValueAtTime(0.00001, now + totalDur);

          // Irregular telemetry packet blips that get further apart
          const packetTimes = [0.4, 0.9, 1.5, 2.3, 3.4, 4.8];
          packetTimes.forEach((t) => {
            const blipOsc = ctx.createOscillator();
            const blipGain = ctx.createGain();
            blipOsc.type = 'triangle';
            blipOsc.frequency.setValueAtTime(scenario.carrierFreq * 1.5, now + t);
            blipGain.gain.setValueAtTime(0.025 * Math.max(0.2, 1 - t / 5.5), now + t);
            blipGain.gain.exponentialRampToValueAtTime(0.0001, now + t + 0.08);

            blipOsc.connect(blipGain);
            blipGain.connect(ctx.destination);
            blipOsc.start(now + t);
            blipOsc.stop(now + t + 0.08);
            stopCallbacks.push(() => {
              try { blipOsc.stop(); blipOsc.disconnect(); } catch { /* noop */ }
            });
          });
          break;
        }

        case 'smooth_drift_freeze': {
          // SPIRIT: Smooth downward frequency drift as oscillator freezes in Martian winter (-55°C)
          carrierOsc.frequency.setValueAtTime(scenario.carrierFreq, now);
          // Frequency sags down as local crystal cools
          carrierOsc.frequency.exponentialRampToValueAtTime(scenario.carrierFreq * 0.35, now + totalDur - 0.5);

          carrierGain.gain.setValueAtTime(0.045, now);
          carrierGain.gain.linearRampToValueAtTime(0.038, now + 2.0);
          carrierGain.gain.exponentialRampToValueAtTime(0.00001, now + totalDur);

          // Constant cold hiss
          noiseGain.gain.setValueAtTime(0.004, now);
          noiseGain.gain.linearRampToValueAtTime(0.007, now + 3.0);
          noiseGain.gain.exponentialRampToValueAtTime(0.00001, now + totalDur);

          // Very sparse weak packets
          [0.8, 2.4, 4.2].forEach((t) => {
            const blipOsc = ctx.createOscillator();
            const blipGain = ctx.createGain();
            blipOsc.type = 'sine';
            const curFreq = scenario.carrierFreq * (1 - (t / totalDur) * 0.6);
            blipOsc.frequency.setValueAtTime(curFreq * 1.3, now + t);
            blipGain.gain.setValueAtTime(0.015, now + t);
            blipGain.gain.exponentialRampToValueAtTime(0.0001, now + t + 0.06);

            blipOsc.connect(blipGain);
            blipGain.connect(ctx.destination);
            blipOsc.start(now + t);
            blipOsc.stop(now + t + 0.06);
            stopCallbacks.push(() => {
              try { blipOsc.stop(); blipOsc.disconnect(); } catch { /* noop */ }
            });
          });
          break;
        }

        case 'stable_then_click': {
          // INSIGHT: Rock-stable crystal frequency, gentle short fade, and crisp relay shutoff click
          carrierOsc.frequency.setValueAtTime(scenario.carrierFreq, now);

          const fadeStart = totalDur - 1.6;
          const clickTime = totalDur - 0.7;

          carrierGain.gain.setValueAtTime(0.042, now);
          carrierGain.gain.setValueAtTime(0.040, now + fadeStart);
          carrierGain.gain.linearRampToValueAtTime(0.008, now + clickTime);
          carrierGain.gain.setValueAtTime(0.00001, now + clickTime + 0.01);

          noiseGain.gain.setValueAtTime(0.003, now);
          noiseGain.gain.setValueAtTime(0.00001, now + clickTime);

          // Clean rhythmic spaced packets
          const packetInterval = 0.85;
          for (let t = 0.5; t < fadeStart; t += packetInterval) {
            const blipOsc = ctx.createOscillator();
            const blipGain = ctx.createGain();
            blipOsc.type = 'sine';
            blipOsc.frequency.setValueAtTime(scenario.carrierFreq + 350, now + t);
            blipGain.gain.setValueAtTime(0.018, now + t);
            blipGain.gain.exponentialRampToValueAtTime(0.0001, now + t + 0.05);

            blipOsc.connect(blipGain);
            blipGain.connect(ctx.destination);
            blipOsc.start(now + t);
            blipOsc.stop(now + t + 0.05);
            stopCallbacks.push(() => {
              try { blipOsc.stop(); blipOsc.disconnect(); } catch { /* noop */ }
            });
          }

          // Distinct mechanical Relay Shutoff Click at clickTime
          const clickOsc = ctx.createOscillator();
          const clickGain = ctx.createGain();
          clickOsc.type = 'square';
          clickOsc.frequency.setValueAtTime(320, now + clickTime);
          clickOsc.frequency.exponentialRampToValueAtTime(80, now + clickTime + 0.04);
          clickGain.gain.setValueAtTime(0.06, now + clickTime);
          clickGain.gain.exponentialRampToValueAtTime(0.0001, now + clickTime + 0.04);

          clickOsc.connect(clickGain);
          clickGain.connect(ctx.destination);
          clickOsc.start(now + clickTime);
          clickOsc.stop(now + clickTime + 0.04);
          stopCallbacks.push(() => {
            try { clickOsc.stop(); clickOsc.disconnect(); } catch { /* noop */ }
          });
          break;
        }

        case 'instant_cutoff': {
          // APOLLO 17 ALSEP: Steady flat analog transmission, zero gradual fade, sharp instant shutoff by Houston command
          carrierOsc.frequency.setValueAtTime(scenario.carrierFreq, now);

          const cutoffRatio = scenario.cutoffTimeRatio ?? 0.72;
          const cutoffAt = totalDur * cutoffRatio;

          carrierGain.gain.setValueAtTime(0.045, now);
          carrierGain.gain.setValueAtTime(0.045, now + cutoffAt);
          carrierGain.gain.setValueAtTime(0.00001, now + cutoffAt + 0.002); // Abrupt instantaneous cutoff

          noiseGain.gain.setValueAtTime(0.005, now);
          noiseGain.gain.setValueAtTime(0.005, now + cutoffAt);
          noiseGain.gain.setValueAtTime(0.00001, now + cutoffAt + 0.002);

          // Rapid 1970s analog multiplexer pulses
          const multiplexRate = 0.5;
          for (let t = 0.3; t < cutoffAt; t += multiplexRate) {
            const blipOsc = ctx.createOscillator();
            const blipGain = ctx.createGain();
            blipOsc.type = 'sawtooth';
            blipOsc.frequency.setValueAtTime(scenario.carrierFreq * 1.4, now + t);
            blipGain.gain.setValueAtTime(0.012, now + t);
            blipGain.gain.exponentialRampToValueAtTime(0.0001, now + t + 0.04);

            blipOsc.connect(blipGain);
            blipGain.connect(ctx.destination);
            blipOsc.start(now + t);
            blipOsc.stop(now + t + 0.04);
            stopCallbacks.push(() => {
              try { blipOsc.stop(); blipOsc.disconnect(); } catch { /* noop */ }
            });
          }
          break;
        }

        case 'active_pause_note': {
          // INGENUITY: Does NOT fade out to silence! Bright, healthy chirps, transitions into a steady active pause chime
          carrierOsc.frequency.setValueAtTime(scenario.carrierFreq, now);
          carrierGain.gain.setValueAtTime(0.04, now);

          const transitionTime = totalDur * 0.65;
          carrierGain.gain.setValueAtTime(0.04, now + transitionTime);
          carrierGain.gain.linearRampToValueAtTime(0.02, now + totalDur);

          // Fast aviation telemetry packets
          for (let t = 0.2; t < transitionTime; t += 0.3) {
            const blipOsc = ctx.createOscillator();
            const blipGain = ctx.createGain();
            blipOsc.type = 'triangle';
            blipOsc.frequency.setValueAtTime(scenario.carrierFreq + 240, now + t);
            blipGain.gain.setValueAtTime(0.015, now + t);
            blipGain.gain.exponentialRampToValueAtTime(0.0001, now + t + 0.04);

            blipOsc.connect(blipGain);
            blipGain.connect(ctx.destination);
            blipOsc.start(now + t);
            blipOsc.stop(now + t + 0.04);
            stopCallbacks.push(() => {
              try { blipOsc.stop(); blipOsc.disconnect(); } catch { /* noop */ }
            });
          }

          // At transitionTime, play the clean "Stationary Standby Note" (Dual chord confirming healthy sleep mode)
          const chordOsc1 = ctx.createOscillator();
          const chordOsc2 = ctx.createOscillator();
          const chordGain = ctx.createGain();

          chordOsc1.type = 'sine';
          chordOsc2.type = 'sine';
          const baseNote = scenario.pauseNoteFreq || 880;
          chordOsc1.frequency.setValueAtTime(baseNote, now + transitionTime);
          chordOsc2.frequency.setValueAtTime(baseNote * 1.5, now + transitionTime); // Perfect fifth harmonic

          chordGain.gain.setValueAtTime(0.0001, now + transitionTime);
          chordGain.gain.linearRampToValueAtTime(0.035, now + transitionTime + 0.1);
          chordGain.gain.setValueAtTime(0.035, now + totalDur - 0.4);
          chordGain.gain.linearRampToValueAtTime(0.01, now + totalDur);

          chordOsc1.connect(chordGain);
          chordOsc2.connect(chordGain);
          chordGain.connect(ctx.destination);

          chordOsc1.start(now + transitionTime);
          chordOsc2.start(now + transitionTime);
          chordOsc1.stop(now + totalDur);
          chordOsc2.stop(now + totalDur);

          stopCallbacks.push(() => {
            try {
              chordOsc1.stop(); chordOsc2.stop();
              chordOsc1.disconnect(); chordOsc2.disconnect();
              chordGain.disconnect();
            } catch { /* noop */ }
          });
          break;
        }
      }

      // Schedule final stop for persistent nodes
      whiteNoise.stop(now + totalDur);
      carrierOsc.stop(now + totalDur);

      // Track progress timer
      const startTime = Date.now();
      const progressInterval = window.setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        const progress = Math.min(1, elapsed / totalDur);
        onProgress?.(progress);
        if (progress >= 1) {
          clearInterval(progressInterval);
          this.activeNodes = null;
        }
      }, 40);
      intervals.push(progressInterval);

      const stopAll = () => {
        clearInterval(progressInterval);
        stopCallbacks.forEach(cb => cb());
        this.activeNodes = null;
      };

      this.activeNodes = {
        stop: stopAll,
        timeoutIds: timeouts,
        intervalIds: intervals
      };

      return stopAll;
    } catch {
      return () => {};
    }
  }
}

export const spaceAudio = new SpaceAudio();
