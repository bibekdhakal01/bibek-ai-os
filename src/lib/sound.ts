"use client";

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;

  setMuted(muted: boolean) {
    this.isMuted = muted;
    if (!muted && !this.ctx) {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          this.ctx = new AudioContextClass();
        }
      } catch (e) {
        console.error("Failed to initialize AudioContext:", e);
      }
    }
  }

  private initCtx() {
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playBoot() {
    if (this.isMuted) return;
    this.setMuted(false); // Try to initialize if not done
    if (!this.ctx) return;
    this.initCtx();
    
    const ctx = this.ctx;
    const now = ctx.currentTime;

    // Riser Sweep
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(60, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 2.0);
    
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.4);
    gain.gain.linearRampToValueAtTime(0.1, now + 1.6);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 2.2);

    // Chime Sparkle
    setTimeout(() => {
      if (this.isMuted) return;
      this.playNotify();
    }, 1800);
  }

  playClick() {
    if (this.isMuted || !this.ctx) return;
    this.initCtx();
    
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = "triangle";
    osc.frequency.setValueAtTime(1000, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05);
    
    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.06);
  }

  playHover() {
    if (this.isMuted || !this.ctx) return;
    this.initCtx();
    
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(1600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + 0.02);
    
    gain.gain.setValueAtTime(0.012, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.02);
  }

  playError() {
    if (this.isMuted || !this.ctx) return;
    this.initCtx();
    
    const ctx = this.ctx;
    const now = ctx.currentTime;
    
    const playBeep = (time: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(120, time);
      gain.gain.setValueAtTime(0.05, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(time);
      osc.stop(time + 0.15);
    };

    playBeep(now);
    playBeep(now + 0.12);
  }

  playNotify() {
    if (this.isMuted || !this.ctx) return;
    this.initCtx();
    
    const ctx = this.ctx;
    const now = ctx.currentTime;
    
    const playBeep = (freq: number, time: number, dur: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, time);
      gain.gain.setValueAtTime(0.025, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(time);
      osc.stop(time + dur);
    };

    playBeep(880, now, 0.12);
    playBeep(1320, now + 0.08, 0.2);
  }
}

export const soundManager = new SoundManager();
