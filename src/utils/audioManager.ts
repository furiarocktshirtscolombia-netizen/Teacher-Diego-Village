export type BGMType = 'menu' | 'level' | 'victory';
export type SFXType = 'correct' | 'wrong' | 'treasure' | 'complete';

class AudioManager {
  ctx: AudioContext | null = null;
  isMusicOn = true;
  isSoundOn = true;
  
  // Sequencer state
  nextNoteTime = 0;
  currentNote = 0;
  timerID: number | null = null;
  currentBGM: BGMType | null = null;
  
  sequences = {
    menu: { notes: [261.63, 329.63, 392.00, 493.88, 392.00, 329.63], speed: 350 }, // C Major 7 arpeggio (Calm)
    level: { notes: [220.00, 261.63, 329.63, 440.00, 329.63, 261.63], speed: 250 }, // A Minor arpeggio (Adventure)
    victory: { notes: [261.63, 329.63, 392.00, 523.25, 0, 523.25, 0, 0], speed: 200 } // Triumphant
  };

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      // If a BGM was queued before interaction, start it now
      if (this.currentBGM && this.isMusicOn && !this.timerID) {
        this.nextNoteTime = this.ctx.currentTime + 0.1;
        this.scheduleBGM();
      }
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playSFX(type: SFXType) {
    if (!this.isSoundOn) return;
    this.init();
    if (!this.ctx) return;
    
    const now = this.ctx.currentTime;
    
    switch (type) {
      case 'correct':
        this._playTone(600, 'square', 0.1, 0.05, now);
        this._playTone(800, 'square', 0.15, 0.05, now + 0.1);
        break;
      case 'wrong':
        this._playTone(200, 'sawtooth', 0.2, 0.05, now);
        this._playTone(150, 'sawtooth', 0.3, 0.05, now + 0.15);
        break;
      case 'treasure':
        [300, 400, 500, 600, 800].forEach((f, i) => {
          this._playTone(f, 'square', 0.1, 0.05, now + i * 0.05);
        });
        break;
      case 'complete':
        [400, 500, 600, 800, 1000, 1200].forEach((f, i) => {
          this._playTone(f, 'square', 0.15, 0.05, now + i * 0.1);
        });
        break;
    }
  }

  scheduleBGM = () => {
    if (!this.ctx || !this.isMusicOn || !this.currentBGM) return;
    
    const seq = this.sequences[this.currentBGM];
    
    while (this.nextNoteTime < this.ctx.currentTime + 0.1) {
      const freq = seq.notes[this.currentNote % seq.notes.length];
      if (freq > 0) {
        this._playTone(freq, 'sine', seq.speed / 1000 * 0.8, 0.03, this.nextNoteTime);
      }
      this.nextNoteTime += seq.speed / 1000;
      this.currentNote++;
    }
    this.timerID = window.setTimeout(this.scheduleBGM, 25);
  }

  _playTone(freq: number, type: OscillatorType, duration: number, vol: number, startTime: number) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);
    
    gain.gain.setValueAtTime(vol, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  setBGM(type: BGMType | null) {
    if (this.currentBGM === type) return;
    this.currentBGM = type;
    this.currentNote = 0;
    
    if (this.timerID) {
      window.clearTimeout(this.timerID);
      this.timerID = null;
    }
    
    if (type && this.isMusicOn && this.ctx) {
      this.nextNoteTime = this.ctx.currentTime + 0.1;
      this.scheduleBGM();
    }
  }

  toggleMusic() {
    this.isMusicOn = !this.isMusicOn;
    if (this.isMusicOn && this.currentBGM && this.ctx) {
      this.nextNoteTime = this.ctx.currentTime + 0.1;
      this.scheduleBGM();
    } else if (!this.isMusicOn && this.timerID) {
      window.clearTimeout(this.timerID);
      this.timerID = null;
    }
    return this.isMusicOn;
  }

  toggleSound() {
    this.isSoundOn = !this.isSoundOn;
    return this.isSoundOn;
  }
}

export const audioManager = new AudioManager();
