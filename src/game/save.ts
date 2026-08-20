import type { EquipSlot, HeroId, MetaSave, Settings } from "./types";
import { STARTER_EQUIP_IDS } from "./data/catalog";

const KEY = "one-assasin-save-v1";
export const SAVE_VERSION = 1;

export const DEFAULT_SETTINGS: Settings = {
  master: 0.8,
  music: 0.45,
  sfx: 0.8,
  shake: true,
  numbers: true,
  haptics: true,
  flash: true,
  leftHanded: false,
  autoAim: true,
  lowFx: false,
  language: "en",
  uiScale: 1,
};

function today() {
  return new Date().toISOString().slice(0, 10);
}

export function defaultSave(): MetaSave {
  const inv = STARTER_EQUIP_IDS.map((defId, i) => ({
    uid: `start-${i}-${defId}`,
    defId,
    level: 1,
  }));
  const equipped: MetaSave["equipped"] = {};
  for (const item of inv) {
    equipped[slotOf(item.defId)] = item.uid;
  }
  return {
    version: SAVE_VERSION,
    gold: 120,
    gems: 8,
    souls: 0,
    unlockedHeroes: ["zero"],
    selectedHero: "zero",
    heroLevels: { zero: 1, lyra: 1, vex: 1, kael: 1, nyx: 1, sol: 1 },
    heroStars: { zero: 1, lyra: 1, vex: 1, kael: 1, nyx: 1, sol: 1 },
    inventory: inv,
    equipped,
    legacy: {},
    discoveredBlessings: [],
    achievements: {},
    missions: {},
    bestScore: 0,
    runs: 0,
    victories: 0,
    kills: 0,
    tutorialDone: false,
    settings: { ...DEFAULT_SETTINGS },
    lastLoginDay: today(),
    claimedLogin: false,
  };
}

function slotOf(defId: string): EquipSlot {
  if (defId.startsWith("wep_")) return "weapon";
  if (defId.startsWith("helm_")) return "helmet";
  if (defId.startsWith("arm_")) return "armor";
  if (defId.startsWith("glove_")) return "gloves";
  if (defId.startsWith("boot_")) return "boots";
  if (defId.startsWith("ring_")) return "ring";
  if (defId.startsWith("neck_")) return "necklace";
  if (defId.startsWith("relic_")) return "relic";
  return "weapon";
}

function migrate(raw: Partial<MetaSave>): MetaSave {
  const base = defaultSave();
  const merged: MetaSave = {
    ...base,
    ...raw,
    settings: { ...base.settings, ...(raw.settings ?? {}) },
    heroLevels: { ...base.heroLevels, ...(raw.heroLevels ?? {}) },
    heroStars: { ...base.heroStars, ...(raw.heroStars ?? {}) },
    equipped: { ...base.equipped, ...(raw.equipped ?? {}) },
    inventory: raw.inventory?.length ? raw.inventory : base.inventory,
    unlockedHeroes: raw.unlockedHeroes?.length ? raw.unlockedHeroes : base.unlockedHeroes,
    legacy: { ...base.legacy, ...(raw.legacy ?? {}) },
    discoveredBlessings: raw.discoveredBlessings ?? [],
    achievements: raw.achievements ?? {},
    missions: raw.missions ?? {},
    version: SAVE_VERSION,
  };
  const day = today();
  if (merged.lastLoginDay !== day) {
    merged.lastLoginDay = day;
    merged.claimedLogin = false;
    merged.missions = {};
  }
  return merged;
}

export function loadSave(): MetaSave {
  if (typeof window === "undefined") return defaultSave();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultSave();
    return migrate(JSON.parse(raw) as Partial<MetaSave>);
  } catch {
    return defaultSave();
  }
}

export function writeSave(save: MetaSave) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(save));
  } catch {
    /* quota / private mode */
  }
}

export function uid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

export const ALL_HEROES: HeroId[] = ["zero", "lyra", "vex", "kael", "nyx", "sol"];
