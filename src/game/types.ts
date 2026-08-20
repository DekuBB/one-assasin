export type Rarity =
  | "common"
  | "uncommon"
  | "rare"
  | "epic"
  | "legendary"
  | "mythic"
  | "forbidden";

export type HeroId = "zero" | "lyra" | "vex" | "kael" | "nyx" | "sol";

export type RoomType =
  | "combat"
  | "elite"
  | "treasure"
  | "shop"
  | "shrine"
  | "event"
  | "trap"
  | "heal"
  | "boss";

export type BiomeId =
  | "citadel"
  | "forest"
  | "abyss"
  | "ember"
  | "sanctum"
  | "grave";

export type EquipSlot =
  | "weapon"
  | "helmet"
  | "armor"
  | "gloves"
  | "boots"
  | "ring"
  | "necklace"
  | "relic";

export type ScreenId =
  | "menu"
  | "hub"
  | "heroes"
  | "equipment"
  | "codex"
  | "missions"
  | "legacy"
  | "settings"
  | "run"
  | "collection";

export type RunOverlay =
  | "none"
  | "map"
  | "blessing"
  | "event"
  | "shop"
  | "chest"
  | "pause"
  | "defeat"
  | "victory"
  | "tutorial";

export type EnemyKind =
  | "goblin"
  | "skeleton"
  | "bat"
  | "cultist"
  | "spider"
  | "berserker"
  | "knight"
  | "gatekeeper"
  | "widow";

export type ProjectileKind = "arrow" | "bolt" | "void" | "fire" | "blood" | "boss" | "player";

export interface Vec {
  x: number;
  y: number;
}

export interface HeroDef {
  id: HeroId;
  name: string;
  title: string;
  role: string;
  blurb: string;
  hp: number;
  attack: number;
  defense: number;
  moveSpeed: number;
  attackSpeed: number;
  crit: number;
  critDmg: number;
  range: number;
  color: string;
  accent: string;
  unlockGold: number;
  unlockGems: number;
  skill1: SkillDef;
  skill2: SkillDef;
  ult: SkillDef;
  passive: { name: string; desc: string };
}

export interface SkillDef {
  id: string;
  name: string;
  desc: string;
  cooldown: number;
  energyCost?: number;
}

export interface BlessingDef {
  id: string;
  name: string;
  desc: string;
  rarity: Rarity;
  attack?: number;
  attackPct?: number;
  hp?: number;
  hpPct?: number;
  heal?: number;
  crit?: number;
  critDmg?: number;
  move?: number;
  atkSpd?: number;
  skillDmg?: number;
  cdr?: number;
  lifesteal?: number;
  defense?: number;
  dashCharges?: number;
  dashCd?: number;
  onKillHeal?: number;
  thorns?: number;
  goldPct?: number;
  ignite?: number;
  lightning?: boolean;
  supernova?: number;
  voidEcho?: number;
  glass?: boolean;
  phantom?: boolean;
  bloodRage?: boolean;
}

export interface SynergyDef {
  id: string;
  name: string;
  desc: string;
  requires: string[];
  grant: BlessingDef;
}

export interface EquipDef {
  id: string;
  name: string;
  slot: EquipSlot;
  rarity: Rarity;
  attack?: number;
  defense?: number;
  hp?: number;
  crit?: number;
  atkSpd?: number;
  move?: number;
  perk?: string;
}

export interface OwnedEquip {
  uid: string;
  defId: string;
  level: number;
}

export interface EnemyDef {
  kind: EnemyKind;
  name: string;
  hp: number;
  attack: number;
  speed: number;
  range: number;
  cooldown: number;
  telegraph: number;
  radius: number;
  xp: number;
  gold: number;
  color: string;
  isBoss?: boolean;
  isElite?: boolean;
  isRanged?: boolean;
  isFlying?: boolean;
}

export interface EventChoice {
  label: string;
  outcome: string;
  karma?: number;
  gold?: number;
  hpPct?: number;
  blessingId?: string;
  curseId?: string;
  gems?: number;
}

export interface EventDef {
  id: string;
  title: string;
  speaker: string;
  dialog: string;
  choices: EventChoice[];
}

export interface DungeonNode {
  id: string;
  floor: number;
  index: number;
  type: RoomType;
  next: number[];
  enemyCount: number;
  cleared: boolean;
}

export interface Settings {
  master: number;
  music: number;
  sfx: number;
  shake: boolean;
  numbers: boolean;
  haptics: boolean;
  flash: boolean;
  leftHanded: boolean;
  autoAim: boolean;
  lowFx: boolean;
  language: "en" | "pl";
  uiScale: number;
}

export interface MetaSave {
  version: number;
  gold: number;
  gems: number;
  souls: number;
  unlockedHeroes: HeroId[];
  selectedHero: HeroId;
  heroLevels: Record<HeroId, number>;
  heroStars: Record<HeroId, number>;
  inventory: OwnedEquip[];
  equipped: Partial<Record<EquipSlot, string>>;
  legacy: Record<string, number>;
  discoveredBlessings: string[];
  achievements: Record<string, { count: number; claimed: boolean }>;
  missions: Record<string, { count: number; claimed: boolean; day: string }>;
  bestScore: number;
  runs: number;
  victories: number;
  kills: number;
  tutorialDone: boolean;
  settings: Settings;
  lastLoginDay: string;
  claimedLogin: boolean;
}

export interface RunStats {
  kills: number;
  bosses: number;
  damage: number;
  gold: number;
  gems: number;
  blessings: number;
  maxCombo: number;
  time: number;
  score: number;
  rooms: number;
  noHitBoss: boolean;
}
