import type { Settings } from "./types";

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let musicBus: GainNode | null = null;
let sfxBus: GainNode | null = null;
let unlocked = false;
let musicTimer: number | null = null;
let musicMode: "menu" | "dungeon" | "boss" | "none" = "none";

function ac(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const C = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!C) return null;
    ctx = new C({ latencyHint: "interactive" });
    master = ctx.createGain();
    musicBus = ctx.createGain();
    sfxBus = ctx.createGain();
    musicBus.connect(master);
    sfxBus.connect(master);
    master.connect(ctx.destination);
    master.gain.value = 0.8;
    musicBus.gain.value = 0.4;
    sfxBus.gain.value = 0.8;
  }
  return ctx;
}

export function unlockAudio() {
  const c = ac();
  if (!c) return;
  if (c.state === "suspended") void c.resume();
  unlocked = true;
}

export function applyAudioSettings(s: Settings) {
  if (!master || !musicBus || !sfxBus) return;
  const t = ac()?.currentTime ?? 0;
  master.gain.setTargetAtTime(s.master * s.master, t, 0.02);
  musicBus.gain.setTargetAtTime(s.music * s.music, t, 0.02);
  sfxBus.gain.setTargetAtTime(s.sfx * s.sfx, t, 0.02);
}

function env(g: GainNode, a: number, d: number, v: number) {
  const c = ac();
  if (!c) return;
  const now = c.currentTime;
  g.gain.cancelScheduledValues(now);
  g.gain.setValueAtTime(0.0001, now);
  g.gain.exponentialRampToValueAtTime(v, now + a);
  g.gain.exponentialRampToValueAtTime(0.0001, now + a + d);
}

function tone(freq: number, dur: number, type: OscillatorType, vol: number, bus: GainNode, slide?: number) {
  const c = ac();
  if (!c || !unlocked) return;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.value = freq;
  if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(40, freq * slide), c.currentTime + dur);
  o.connect(g);
  g.connect(bus);
  env(g, 0.01, dur, vol);
  o.start();
  o.stop(c.currentTime + dur + 0.05);
}

function noise(dur: number, vol: number, bus: GainNode, hp = 400) {
  const c = ac();
  if (!c || !unlocked) return;
  const n = c.createBufferSource();
  const buf = c.createBuffer(1, c.sampleRate * dur, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  n.buffer = buf;
  const f = c.createBiquadFilter();
  f.type = "highpass";
  f.frequency.value = hp;
  const g = c.createGain();
  n.connect(f);
  f.connect(g);
  g.connect(bus);
  env(g, 0.005, dur, vol);
  n.start();
}

export const Sfx = {
  ui() {
    if (!sfxBus) return;
    tone(520, 0.06, "square", 0.08, sfxBus);
  },
  click() {
    if (!sfxBus) return;
    tone(640, 0.05, "square", 0.07, sfxBus);
  },
  slash() {
    if (!sfxBus) return;
    noise(0.07, 0.18, sfxBus, 900);
    tone(240 + Math.random() * 80, 0.08, "sawtooth", 0.09, sfxBus, 0.4);
  },
  crit() {
    if (!sfxBus) return;
    tone(880, 0.12, "square", 0.12, sfxBus, 1.4);
    noise(0.1, 0.2, sfxBus, 600);
  },
  hit() {
    if (!sfxBus) return;
    tone(140, 0.1, "sawtooth", 0.12, sfxBus, 0.5);
    noise(0.08, 0.16, sfxBus, 200);
  },
  dash() {
    if (!sfxBus) return;
    noise(0.09, 0.14, sfxBus, 1200);
    tone(420, 0.1, "triangle", 0.07, sfxBus, 1.8);
  },
  skill() {
    if (!sfxBus) return;
    tone(300, 0.18, "sawtooth", 0.1, sfxBus, 2.2);
    tone(600, 0.14, "square", 0.06, sfxBus, 1.6);
  },
  ult() {
    if (!sfxBus) return;
    tone(110, 0.4, "sawtooth", 0.16, sfxBus, 3);
    tone(220, 0.35, "square", 0.1, sfxBus, 2.4);
  },
  kill() {
    if (!sfxBus) return;
    tone(180, 0.16, "triangle", 0.1, sfxBus, 0.5);
  },
  pickup() {
    if (!sfxBus) return;
    tone(720, 0.1, "square", 0.08, sfxBus, 1.5);
  },
  chest() {
    if (!sfxBus) return;
    tone(200, 0.2, "triangle", 0.1, sfxBus, 2);
    tone(400, 0.16, "square", 0.06, sfxBus, 1.8);
  },
  hurt() {
    if (!sfxBus) return;
    tone(90, 0.18, "sawtooth", 0.16, sfxBus, 0.6);
  },
  die() {
    if (!sfxBus) return;
    tone(80, 0.5, "sawtooth", 0.18, sfxBus, 0.3);
  },
  win() {
    if (!sfxBus) return;
    tone(330, 0.2, "square", 0.1, sfxBus, 1.2);
    tone(490, 0.25, "square", 0.08, sfxBus, 1.3);
    tone(660, 0.3, "triangle", 0.08, sfxBus, 1.2);
  },
  bless() {
    if (!sfxBus) return;
    tone(520, 0.18, "triangle", 0.1, sfxBus, 1.6);
    tone(780, 0.22, "sine", 0.08, sfxBus, 1.4);
  },
};

function note(freq: number, t: number, dur: number, vol: number) {
  const c = ac();
  if (!c || !musicBus || !unlocked) return;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = "triangle";
  o.frequency.value = freq;
  o.connect(g);
  g.connect(musicBus);
  const now = c.currentTime + t;
  g.gain.setValueAtTime(0.0001, now);
  g.gain.exponentialRampToValueAtTime(vol, now + 0.03);
  g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
  o.start(now);
  o.stop(now + dur + 0.05);
}

const DORIAN = [110, 123, 131, 147, 165, 175, 196, 220];

function playPhrase(mode: typeof musicMode) {
  if (!unlocked || mode === "none") return;
  const root = mode === "boss" ? 98 : mode === "menu" ? 82 : 110;
  const scale = DORIAN.map((n) => n * (root / 110));
  const bars = mode === "boss" ? 8 : 6;
  for (let i = 0; i < bars; i++) {
    const f = scale[i % scale.length]!;
    note(f, i * 0.55, 0.5, mode === "boss" ? 0.05 : 0.035);
    if (i % 2 === 0) note(f * 1.5, i * 0.55 + 0.18, 0.28, 0.02);
    if (mode === "boss" && i % 3 === 0) note(f * 0.5, i * 0.55, 0.7, 0.04);
  }
  const wait = bars * 550 + 200;
  musicTimer = window.setTimeout(() => playPhrase(musicMode), wait);
}

export function setMusic(mode: typeof musicMode) {
  if (musicMode === mode) return;
  musicMode = mode;
  if (musicTimer != null) {
    clearTimeout(musicTimer);
    musicTimer = null;
  }
  if (mode === "none") return;
  playPhrase(mode);
}

if (typeof window !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    const c = ac();
    if (!c) return;
    if (document.hidden) void c.suspend();
    else if (unlocked) void c.resume();
  });
}
