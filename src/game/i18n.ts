import type { Settings } from "./types";

const EN: Record<string, string> = {
  descend: "Descend",
  enter: "Enter the dungeon",
  paused: "Paused",
  resume: "Resume",
  camp: "Return to camp",
  blessing: "A blessing in the dark",
  path: "Path of the blade",
  youDied: "YOU DIED",
  cleared: "CLEARED",
  tryAgain: "Try again",
  technique: "Choose a technique",
  parry: "Parry",
  dash: "Dash",
  ult: "Ult",
  attack: "ATK",
  settings: "Settings",
  daily: "Claim daily vow",
};

const PL: Record<string, string> = {
  descend: "Zstąp",
  enter: "Wejdź do lochu",
  paused: "Pauza",
  resume: "Wznów",
  camp: "Wróć do obozu",
  blessing: "Błogosławieństwo w mroku",
  path: "Ścieżka ostrza",
  youDied: "GINIESZ",
  cleared: "OCZYSZCZONO",
  tryAgain: "Jeszcze raz",
  technique: "Wybierz technikę",
  parry: "Parowanie",
  dash: "Unik",
  ult: "Ult",
  attack: "ATAK",
  settings: "Ustawienia",
  daily: "Odbierz dzienną przysięgę",
};

export function t(lang: Settings["language"], key: string): string {
  const pack = lang === "pl" ? PL : EN;
  return pack[key] ?? EN[key] ?? key;
}
