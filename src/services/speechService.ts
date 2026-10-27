// Speech synthesis service configured strictly for Portuguese (pt-BR)

class SpeechService {
  private isSpeaking: boolean = false;
  private listeners: Set<(speaking: boolean) => void> = new Set();
  private ptBrVoice: SpeechSynthesisVoice | null = null;

  constructor() {
    this.initVoices();
  }

  private initVoices(): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const findVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices || voices.length === 0) return;

      // Prioritize Brazilian Portuguese voices
      // 1. Exact pt-BR locale
      // 2. Names containing "Brazil", "Brasil", "Luciana", "Felipe", "Maria", "Daniel", "Google português do Brasil"
      // 3. Fallback to any 'pt'
      const exactPtBr = voices.find(v => v.lang === 'pt-BR' || v.lang === 'pt_BR');
      const nameBrazil = voices.find(v => (v.name.toLowerCase().includes('brazil') || v.name.toLowerCase().includes('brasil')) && v.lang.startsWith('pt'));
      const anyPt = voices.find(v => v.lang.startsWith('pt'));

      this.ptBrVoice = exactPtBr || nameBrazil || anyPt || null;
    };

    findVoice();

    // In most modern browsers, voices are loaded asynchronously
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = findVoice;
    }
  }

  public isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  public subscribe(listener: (speaking: boolean) => void): () => void {
    this.listeners.add(listener);
    listener(this.isSpeaking);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach(cb => cb(this.isSpeaking));
  }

  public stop(): void {
    if (!this.isSupported()) return;
    try {
      window.speechSynthesis.cancel();
    } catch (e) {
      console.warn("Speech cancel error:", e);
    }
    this.isSpeaking = false;
    this.notify();
  }

  public speak(text: string, rate: number = 0.95): Promise<void> {
    return new Promise((resolve) => {
      if (!this.isSupported()) {
        console.warn("Web Speech API não suportada.");
        resolve();
        return;
      }

      this.stop();

      // Clean text for speech synthesis (strip emojis and weird symbols for cleaner pt-BR pronunciation)
      const cleanText = text
        .replace(/[\u{1F300}-\u{1F9FF}]/gu, '') // Emojis
        .replace(/🔊|⭐|🎯|🎨|🧭|🏆|🚩|💡|🎉|⚠️/g, '')
        .trim();

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'pt-BR';
      utterance.rate = rate; // Slight decrease for clearer educational comprehension
      utterance.pitch = 1.0;

      // Re-check pt-BR voice if not yet selected
      if (!this.ptBrVoice) {
        const voices = window.speechSynthesis.getVoices();
        this.ptBrVoice = voices.find(v => v.lang === 'pt-BR' || v.lang === 'pt_BR' || v.lang.startsWith('pt')) || null;
      }

      if (this.ptBrVoice) {
        utterance.voice = this.ptBrVoice;
      }

      utterance.onstart = () => {
        this.isSpeaking = true;
        this.notify();
      };

      utterance.onend = () => {
        this.isSpeaking = false;
        this.notify();
        resolve();
      };

      utterance.onerror = (e) => {
        console.warn("SpeechSynthesis error:", e);
        this.isSpeaking = false;
        this.notify();
        resolve();
      };

      window.speechSynthesis.speak(utterance);
    });
  }

  public toggle(text: string, rate: number = 0.95): void {
    if (this.isSpeaking) {
      this.stop();
    } else {
      this.speak(text, rate);
    }
  }

  public getStatus(): boolean {
    return this.isSpeaking;
  }

  public getVoiceName(): string {
    return this.ptBrVoice ? `${this.ptBrVoice.name} (${this.ptBrVoice.lang})` : 'Padrão do Sistema (pt-BR)';
  }
}

export const speechService = new SpeechService();
