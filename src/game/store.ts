import { create } from "zustand";
import type { HeroId, MetaSave, OwnedEquip, ScreenId, Settings } from "./types";
import { defaultSave, loadSave, uid, writeSave } from "./save";
import { EQUIP_BY_ID, EQUIPMENT, LEGACY, MISSIONS, ACHIEVEMENTS } from "./data/catalog";
import { HERO_BY_ID, HEROES } from "./data/heroes";

function persist(s: MetaSave) {
  writeSave(s);
  return s;
}

export const useMeta = create<{
  save: MetaSave;
  screen: ScreenId;
  hydrate: () => void;
  setScreen: (s: ScreenId) => void;
  patch: (fn: (s: MetaSave) => void) => void;
  selectHero: (id: HeroId) => void;
  unlockHero: (id: HeroId) => boolean;
  equipItem: (uidStr: string) => void;
  upgradeItem: (uidStr: string) => boolean;
  buyLegacy: (id: string) => boolean;
  claimMission: (id: string) => boolean;
  claimAchievement: (id: string) => boolean;
  claimLogin: () => void;
  applyRun: (gold: number, gems: number, kills: number, score: number, win: boolean) => void;
  grantItem: (defId: string) => void;
  setSettings: (p: Partial<Settings>) => void;
}>((set, get) => ({
  save: defaultSave(),
  screen: "menu",
  hydrate: () => set({ save: loadSave() }),
  setScreen: (screen) => set({ screen }),
  patch: (fn) => {
    const save = structuredClone(get().save);
    fn(save);
    set({ save: persist(save) });
  },
  selectHero: (id) => {
    if (!get().save.unlockedHeroes.includes(id)) return;
    get().patch((s) => {
      s.selectedHero = id;
    });
  },
  unlockHero: (id) => {
    const h = HERO_BY_ID[id];
    const save = get().save;
    if (save.unlockedHeroes.includes(id)) return true;
    if (save.gold < h.unlockGold || save.gems < h.unlockGems) return false;
    get().patch((s) => {
      s.gold -= h.unlockGold;
      s.gems -= h.unlockGems;
      s.unlockedHeroes.push(id);
      const a = s.achievements.roster ?? { count: 0, claimed: false };
      a.count = s.unlockedHeroes.length;
      s.achievements.roster = a;
    });
    return true;
  },
  equipItem: (uidStr) => {
    get().patch((s) => {
      const item = s.inventory.find((i) => i.uid === uidStr);
      if (!item) return;
      const def = EQUIP_BY_ID[item.defId];
      if (!def) return;
      s.equipped[def.slot] = uidStr;
    });
  },
  upgradeItem: (uidStr) => {
    const save = get().save;
    const item = save.inventory.find((i) => i.uid === uidStr);
    if (!item || item.level >= 50) return false;
    const cost = item.level * 80 + 50;
    if (save.gold < cost) return false;
    get().patch((s) => {
      const it = s.inventory.find((i) => i.uid === uidStr);
      if (!it) return;
      s.gold -= cost;
      it.level += 1;
      const a = s.achievements.forge ?? { count: 0, claimed: false };
      a.count = Math.max(a.count, it.level);
      s.achievements.forge = a;
    });
    return true;
  },
  buyLegacy: (id) => {
    const def = LEGACY.find((l) => l.id === id);
    if (!def) return false;
    const save = get().save;
    const lv = save.legacy[id] ?? 0;
    if (lv >= def.max) return false;
    const cost = def.base + lv * def.step;
    if (save.gold < cost) return false;
    get().patch((s) => {
      s.gold -= cost;
      s.legacy[id] = lv + 1;
    });
    return true;
  },
  claimMission: (id) => {
    const def = MISSIONS.find((m) => m.id === id);
    if (!def) return false;
    const st = get().save.missions[id] ?? { count: 0, claimed: false, day: "" };
    if (st.claimed || st.count < def.target) return false;
    get().patch((s) => {
      const m = s.missions[id] ?? { count: 0, claimed: false, day: "" };
      m.claimed = true;
      s.missions[id] = m;
      s.gold += def.gold;
      s.gems += def.gems;
    });
    return true;
  },
  claimAchievement: (id) => {
    const def = ACHIEVEMENTS.find((a) => a.id === id);
    if (!def) return false;
    const st = get().save.achievements[id] ?? { count: 0, claimed: false };
    if (st.claimed || st.count < def.target) return false;
    get().patch((s) => {
      const a = s.achievements[id] ?? { count: 0, claimed: false };
      a.claimed = true;
      s.achievements[id] = a;
      s.gems += def.gems;
    });
    return true;
  },
  claimLogin: () => {
    get().patch((s) => {
      if (s.claimedLogin) return;
      s.claimedLogin = true;
      s.gold += 150;
      s.gems += 10;
      const m = s.missions.login ?? { count: 0, claimed: false, day: s.lastLoginDay };
      m.count = 1;
      s.missions.login = m;
    });
  },
  applyRun: (gold, gems, kills, score, win) => {
    get().patch((s) => {
      s.gold += gold;
      s.gems += gems;
      s.kills += kills;
      s.runs += 1;
      if (win) s.victories += 1;
      s.bestScore = Math.max(s.bestScore, score);
      const a = s.achievements.gold ?? { count: 0, claimed: false };
      a.count = s.gold;
      s.achievements.gold = a;
    });
  },
  grantItem: (defId) => {
    get().patch((s) => {
      s.inventory.push({ uid: uid(), defId, level: 1 });
    });
  },
  setSettings: (p) => {
    get().patch((s) => {
      s.settings = { ...s.settings, ...p };
    });
  },
}));

export function equippedOf(save: MetaSave): OwnedEquip[] {
  return (Object.values(save.equipped).filter(Boolean) as string[])
    .map((u) => save.inventory.find((i) => i.uid === u))
    .filter(Boolean) as OwnedEquip[];
}

export { HEROES, EQUIPMENT };
