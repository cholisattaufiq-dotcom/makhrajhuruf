import { HurufItem } from '../types';

class MakharijAudioPlayer {
  private audioContext: AudioContext | null = null;
  private currentAudio: HTMLAudioElement | null = null;

  private getAudioContext(): AudioContext {
    if (!this.audioContext) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioContext = new AudioContextClass();
    }
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
    return this.audioContext;
  }

  /**
   * Main function to play audio for a letter:
   * 1. First tries to load the dedicated MP3 file (e.g. from /audio/qaf.mp3)
   * 2. If the MP3 file is not found (404) or fails to play, smoothly falls back to
   *    Arabic SpeechSynthesis with harmonic acoustic vocal resonance modeling.
   */
  public async playLetter(
    huruf: HurufItem,
    onStart?: () => void,
    onEnded?: () => void
  ): Promise<void> {
    // Stop any currently playing audio
    this.stop();

    if (onStart) onStart();

    // 1. Check if an MP3 file exists and attempt to play it
    if (huruf.audio) {
      try {
        const audio = new Audio(huruf.audio);
        this.currentAudio = audio;

        const playPromise = new Promise<boolean>((resolve) => {
          audio.onended = () => {
            this.currentAudio = null;
            if (onEnded) onEnded();
            resolve(true);
          };

          audio.onerror = () => {
            // Failed to load MP3 (e.g. file doesn't exist yet) -> fallback to synthesized speech
            resolve(false);
          };
        });

        audio.play().catch(() => {
          // Auto-play blocked or source not found -> fallback
        });

        const success = await playPromise;
        if (success) {
          return;
        }
      } catch {
        // Fallback below
      }
    }

    // 2. High-quality Web Speech API fallback with Arabic locale
    this.playSynthesizedArabic(huruf, onEnded);
  }

  private playSynthesizedArabic(huruf: HurufItem, onEnded?: () => void) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      // Utterance text: read with example or name + letter
      const textToSpeak = huruf.kategoriId === 'jauf'
        ? `${huruf.huruf} مَدْ`
        : huruf.huruf;

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.85; // slightly slower for clear articulation
      utterance.pitch = 1.0;

      // Find an Arabic voice if available
      const voices = window.speechSynthesis.getVoices();
      const arabicVoice = voices.find(v => v.lang.startsWith('ar'));
      if (arabicVoice) {
        utterance.voice = arabicVoice;
      }

      utterance.onend = () => {
        if (onEnded) onEnded();
      };

      utterance.onerror = () => {
        // Play acoustic resonant tone as final fallback
        this.playAnatomyResonance(huruf.kategoriId);
        if (onEnded) onEnded();
      };

      // Play soft acoustic tone simultaneously for rich sound
      this.playAnatomyResonance(huruf.kategoriId);
      window.speechSynthesis.speak(utterance);
    } else {
      this.playAnatomyResonance(huruf.kategoriId);
      if (onEnded) onEnded();
    }
  }

  /**
   * Plays an acoustic resonance tone designed for each makhraj category:
   * - Jauf: open, airy, melodic resonance (320Hz + 640Hz)
   * - Halqi: deep throat guttural resonance (190Hz)
   * - Lisan: crisp dental/lingual pitch (440Hz + 880Hz)
   * - Syafatain: soft labial tone (260Hz)
   * - Khaisyum: nasal buzzing resonance with harmonic modulation (350Hz with 12Hz tremolo)
   */
  public playAnatomyResonance(kategoriId: string) {
    try {
      const ctx = this.getAudioContext();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      let freq = 440;
      let duration = 0.45;

      switch (kategoriId) {
        case 'jauf':
          freq = 330;
          osc.type = 'sine';
          duration = 0.8;
          break;
        case 'halqi':
          freq = 196;
          osc.type = 'triangle';
          duration = 0.5;
          break;
        case 'lisan':
          freq = 493.88;
          osc.type = 'sine';
          duration = 0.4;
          break;
        case 'syafatain':
          freq = 261.63;
          osc.type = 'sine';
          duration = 0.4;
          break;
        case 'khaisyum':
          freq = 349.23;
          osc.type = 'sawtooth';
          duration = 0.7;
          break;
      }

      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.2, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch {
      // Audio context might be restricted before interaction
    }
  }

  /**
   * Sound effect for Quiz correct / incorrect answer feedback
   */
  public playFeedback(correct: boolean) {
    try {
      const ctx = this.getAudioContext();
      const now = ctx.currentTime;

      if (correct) {
        // Joyful ascending arpeggio (C5 -> E5 -> G5)
        const notes = [523.25, 659.25, 783.99];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.09);

          gain.gain.setValueAtTime(0.001, now + idx * 0.09);
          gain.gain.exponentialRampToValueAtTime(0.18, now + idx * 0.09 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.18);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.09);
          osc.stop(now + idx * 0.09 + 0.2);
        });
      } else {
        // Gentle lower buzz (two downward notes: Eb -> C)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(311.13, now);
        osc.frequency.linearRampToValueAtTime(261.63, now + 0.25);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.15, now + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.32);
      }
    } catch {
      // Ignore audio error
    }
  }

  public stop() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const audioPlayer = new MakharijAudioPlayer();
