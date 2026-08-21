import type {
  BiomeId,
  BlessingDef,
  DungeonNode,
  EnemyKind,
  EquipSlot,
  EventDef,
  MetaSave,
  ProjectileKind,
  RoomType,
  RunOverlay,
  RunStats,
} from "./types";
import { HERO_BY_ID } from "./data/heroes";
import {
  ACHIEVEMENTS,
  BLESSING_BY_ID,
  BLESSINGS,
  BIOMES,
  CURSES,
  ENEMIES,
  EQUIP_BY_ID,
  EVENTS,
  SYNERGIES,
} from "./data/catalog";
import { COLS, generateGraph, generateRoom, Rng, ROWS, TILE, worldOf, type Cell, type RoomMap } from "./dungeon";
import { Input } from "./input";
import { Sfx } from "./audio";
import type { HeroDef } from "./types";

let nid = 1;
const id = () => nid++;

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  color: string;
  size: number;
}

export interface FloatN {
  x: number;
  y: number;
  vy: number;
  text: string;
  color: string;
  life: number;
  crit: boolean;
}

export interface Projectile {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  dmg: number;
  r: number;
  life: number;
  friendly: boolean;
  kind: ProjectileKind;
  color: string;
  pierce: number;
}

export interface Enemy {
  id: number;
  kind: EnemyKind;
  x: number;
  y: number;
  vx: number;
  vy: number;
  hp: number;
  maxHp: number;
  attack: number;
  speed: number;
  range: number;
  r: number;
  cd: number;
  telegraph: number;
  telMax: number;
  telAng: number;
  telKind: "melee" | "ranged" | "dash" | "aoe" | "slam";
  flash: number;
  facing: number;
  phase: number;
  burn: number;
  chill: number;
  marks: number;
  alive: boolean;
  elite: boolean;
}

interface Pickup {
  x: number;
  y: number;
  vx: number;
  vy: number;
  gold: number;
  life: number;
}

interface Slash {
  x: number;
  y: number;
  ang: number;
  life: number;
  color: string;
}

export interface ShopOffer {
  kind: "blessing" | "heal" | "item";
  blessingId?: string;
  cost: number;
  title: string;
  desc: string;
}

export interface Stats {
  maxHp: number;
  attack: number;
  defense: number;
  move: number;
  atkSpd: number;
  crit: number;
  critDmg: number;
  range: number;
  skillDmg: number;
  cdr: number;
  lifesteal: number;
  dashCharges: number;
  dashCd: number;
  goldPct: number;
  onKillHeal: number;
  thorns: number;
  ignite: number;
  lightning: boolean;
  supernova: number;
  voidEcho: number;
  phantom: boolean;
  bloodRage: boolean;
  glass: boolean;
}

export class Game {
  input = new Input();
  rng: Rng;
  hero: HeroDef;
  biome: BiomeId = "citadel";
  act = 1;
  overlay: RunOverlay = "none";
  tutorialStep = 0;
  tutorial = false;

  cells: Cell[][] = [];
  spawn = { x: 0, y: 0 };
  exit = { x: 0, y: 0 };
  roomType: RoomType = "combat";
  roomCleared = false;
  chest?: { x: number; y: number; open: boolean };
  traps: { x: number; y: number; t: number }[] = [];

  px = 0;
  py = 0;
  pvx = 0;
  pvy = 0;
  aim = 0;
  hp = 100;
  maxHp = 100;
  energy = 0;
  combo = 0;
  comboT = 0;
  invuln = 0;
  flash = 0;
  atkCd = 0;
  dashCd = 0;
  dashCharges = 1;
  dashMax = 1;
  dashing = 0;
  dashAng = 0;
  sk1 = 0;
  sk2 = 0;
  facing = 1;
  hitstop = 0;
  trauma = 0;
  camX = 0;
  camY = 0;
  time = 0;
  roomTime = 0;
  stillBlood = false;
  usedStill = false;
  usedCheatDeath = false;

  enemies: Enemy[] = [];
  projectiles: Projectile[] = [];
  particles: Particle[] = [];
  floats: FloatN[] = [];
  pickups: Pickup[] = [];
  slashes: Slash[] = [];
  clones: { x: number; y: number; t: number; ang: number }[] = [];
  orbs: { ang: number; t: number }[] = [];
  hazards: { x: number; y: number; r: number; t: number; dmg: number }[] = [];

  blessings: BlessingDef[] = [];
  synergies: string[] = [];
  curses: string[] = [];
  blessingChoices: BlessingDef[] = [];
  event?: EventDef;
  shop: ShopOffer[] = [];
  chestRewards: { title: string; desc: string; apply: () => void }[] = [];

  graph: DungeonNode[][] = [];
  floor = 0;
  node = 0;
  karma = 0;
  gold = 0;
  runGems = 0;
  stats: RunStats = emptyStats();
  paused = false;
  statsCache!: Stats;
  meta: MetaSave;
  shakeOn = true;
  numbersOn = true;
  lowFx = false;
  haptics = true;
  autoAim = true;
  lastPos = { x: 0, y: 0 };

  constructor(meta: MetaSave) {
    this.meta = meta;
    this.rng = new Rng((Math.random() * 1e9) | 0);
    this.hero = HERO_BY_ID[meta.selectedHero] ?? HERO_BY_ID.zero;
    this.shakeOn = meta.settings.shake;
    this.numbersOn = meta.settings.numbers;
    this.lowFx = meta.settings.lowFx;
    this.haptics = meta.settings.haptics;
    this.autoAim = meta.settings.autoAim;
  }

  startRun(opts?: { tutorial?: boolean; challenge?: string }) {
    this.rng = new Rng((Math.random() * 1e9) | 0);
    this.hero = HERO_BY_ID[this.meta.selectedHero] ?? HERO_BY_ID.zero;
    this.act = 1;
    this.biome = "citadel";
    this.blessings = [];
    this.synergies = [];
    this.curses = [];
    this.gold = 0;
    this.runGems = 0;
    this.karma = 0;
    this.energy = 0;
    this.combo = 0;
    this.stats = emptyStats();
    this.tutorial = !!opts?.tutorial || !this.meta.tutorialDone;
    this.tutorialStep = this.tutorial ? 1 : 0;
    this.graph = generateGraph(this.rng, this.tutorial ? 5 : 8);
    this.floor = 0;
    this.node = 0;
    this.recompute();
    this.hp = this.maxHp;
    this.dashCharges = this.statsCache.dashCharges;
    this.dashMax = this.statsCache.dashCharges;
    this.usedCheatDeath = false;
    this.usedStill = false;
    this.enterNode();
    this.overlay = "none";
    if (this.tutorial) this.tutorialStep = 1;
  }

  recompute() {
    const h = this.hero;
    const hl = this.meta.heroLevels[h.id] ?? 1;
    const hs = this.meta.heroStars[h.id] ?? 1;
    const leg = this.meta.legacy;
    let atk = h.attack + (hl - 1) * 2 + (hs - 1) * 4 + (leg.edge ?? 0) * 2.5;
    let hp = h.hp + (hl - 1) * 6 + (hs - 1) * 12 + (leg.vitality ?? 0) * 8;
    let def = h.defense;
    let move = h.moveSpeed;
    let atkSpd = h.attackSpeed;
    let crit = h.crit + (leg.precision ?? 0) * 0.012;
    let critDmg = h.critDmg;
    const range = h.range;
    let skillDmg = 1;
    let cdr = 0;
    let lifesteal = h.id === "vex" ? 0.03 : 0;
    let dashCharges = 1;
    let dashCd = 1.2 * (1 - (leg.swift ?? 0) * 0.03);
    let goldPct = (leg.wealth ?? 0) * 0.06;
    let onKillHeal = 0;
    let thorns = 0;
    let ignite = 0;
    let lightning = false;
    let supernova = 0;
    let voidEcho = 0;
    let phantom = false;
    let bloodRage = false;
    let glass = false;

    for (const slot of Object.keys(this.meta.equipped) as EquipSlot[]) {
      const uid = this.meta.equipped[slot];
      if (!uid) continue;
      const owned = this.meta.inventory.find((i) => i.uid === uid);
      if (!owned) continue;
      const d = EQUIP_BY_ID[owned.defId];
      if (!d) continue;
      const lv = owned.level;
      const sc = 1 + (lv - 1) * 0.15;
      atk += (d.attack ?? 0) * sc;
      def += (d.defense ?? 0) * sc;
      hp += (d.hp ?? 0) * sc;
      crit += d.crit ?? 0;
      atkSpd *= 1 + (d.atkSpd ?? 0);
      move *= 1 + (d.move ?? 0);
      if (d.perk?.includes("lifesteal") || d.id === "wep_crimson_reaper") lifesteal += 0.06;
      if (d.id === "boot_zephyr") dashCd *= 0.75;
      if (d.id === "relic_chrono") cdr += 0.25;
      if (d.id === "relic_coin") goldPct += 0.35;
      if (d.id === "arm_void") {
        /* phase handled in hurt */
      }
    }
    this.stillBlood = false;
    for (const b of this.blessings) {
      atk += b.attack ?? 0;
      atk *= 1 + (b.attackPct ?? 0);
      hp += b.hp ?? 0;
      hp *= 1 + (b.hpPct ?? 0);
      def += b.defense ?? 0;
      move *= 1 + (b.move ?? 0);
      atkSpd *= 1 + (b.atkSpd ?? 0);
      crit += b.crit ?? 0;
      critDmg += b.critDmg ?? 0;
      skillDmg += b.skillDmg ?? 0;
      cdr += b.cdr ?? 0;
      lifesteal += b.lifesteal ?? 0;
      dashCharges += b.dashCharges ?? 0;
      dashCd *= 1 - (b.dashCd ?? 0);
      goldPct += b.goldPct ?? 0;
      onKillHeal += b.onKillHeal ?? 0;
      thorns += b.thorns ?? 0;
      ignite += b.ignite ?? 0;
      if (b.lightning) lightning = true;
      supernova += b.supernova ?? 0;
      voidEcho += b.voidEcho ?? 0;
      if (b.phantom) phantom = true;
      if (b.bloodRage) bloodRage = true;
      if (b.glass) glass = true;
      if (b.id === "still_blood") this.stillBlood = true;
    }
    for (const c of this.curses) {
      const cur = CURSES[c];
      if (!cur) continue;
      if (cur.hpPct) hp *= 1 + cur.hpPct;
      if (cur.attackPct) atk *= 1 + cur.attackPct;
    }
    this.maxHp = Math.max(20, hp);
    this.hp = Math.min(this.hp, this.maxHp);
    this.dashMax = Math.max(1, dashCharges);
    this.statsCache = {
      maxHp: this.maxHp,
      attack: atk,
      defense: def,
      move,
      atkSpd,
      crit: Math.min(0.75, crit),
      critDmg,
      range,
      skillDmg,
      cdr: Math.min(0.45, cdr),
      lifesteal,
      dashCharges: this.dashMax,
      dashCd: Math.max(0.45, dashCd),
      goldPct,
      onKillHeal,
      thorns,
      ignite,
      lightning,
      supernova,
      voidEcho,
      phantom,
      bloodRage,
      glass,
    };
  }

  enterNode() {
    const node = this.graph[this.floor]?.[this.node];
    if (!node) return;
    this.roomType = node.type;
    this.roomCleared = false;
    this.roomTime = 0;
    this.usedStill = false;
    this.enemies = [];
    this.projectiles = [];
    this.particles = [];
    this.pickups = [];
    this.slashes = [];
    this.hazards = [];
    this.orbs = [];
    const map: RoomMap = generateRoom(this.rng, node.type);
    this.cells = map.cells;
    this.spawn = map.spawn;
    this.exit = map.exit;
    const sp = worldOf(map.spawn.x, map.spawn.y);
    this.px = sp.x;
    this.py = sp.y;
    this.pvx = 0;
    this.pvy = 0;
    this.camX = this.px;
    this.camY = this.py;
    this.chest = map.chest ? { x: map.chest.x, y: map.chest.y, open: false } : undefined;
    this.traps = map.traps.map((t) => ({ ...t, t: this.rng.range(0, 2) }));
    this.overlay = "none";

    const hpScale = 1 + (this.floor + (this.act - 1) * 8) * 0.18;
    const atkScale = 1 + (this.floor + (this.act - 1) * 8) * 0.12;
    if (node.type === "combat" || node.type === "trap") {
      const kinds: EnemyKind[] = this.act === 1 ? ["goblin", "skeleton", "bat"] : ["cultist", "spider", "bat"];
      const n = this.tutorial && this.floor === 0 ? 3 : node.enemyCount;
      for (let i = 0; i < n; i++) this.spawnEnemy(this.rng.pick(kinds), hpScale, atkScale);
    } else if (node.type === "elite") {
      this.spawnEnemy(this.floor >= 5 || this.act > 1 ? "berserker" : "knight", hpScale * 1.1, atkScale);
      if (this.floor >= 5) this.spawnEnemy("cultist", hpScale, atkScale);
    } else if (node.type === "boss") {
      this.spawnEnemy(this.act === 1 ? "gatekeeper" : "widow", hpScale, atkScale);
    } else if (node.type === "event") {
      this.event = this.rng.pick(EVENTS);
      this.overlay = "event";
    } else if (node.type === "shop") {
      this.rollShop();
      this.overlay = "shop";
    } else if (node.type === "treasure") {
      this.overlay = "none";
    } else if (node.type === "heal") {
      this.hp = Math.min(this.maxHp, this.hp + this.maxHp * 0.45);
      this.float(this.px, this.py - 20, `+${Math.round(this.maxHp * 0.45)}`, "#3dba7a", false);
    } else if (node.type === "shrine") {
      this.blessingChoices = rollBlessings(this.rng, this.blessings, 3);
      this.overlay = "blessing";
    }
  }

  spawnEnemy(kind: EnemyKind, hpS: number, atkS: number) {
    const def = ENEMIES[kind];
    let pos = { x: COLS - 4, y: 4 };
    for (let i = 0; i < 30; i++) {
      const c = 2 + this.rng.int(COLS - 4);
      const r = 2 + this.rng.int(ROWS - 4);
      if (this.cells[r]![c] !== 0) continue;
      const w = worldOf(c, r);
      if (Math.hypot(w.x - this.px, w.y - this.py) < 90) continue;
      pos = { x: c, y: r };
      break;
    }
    const w = worldOf(pos.x, pos.y);
    const curseDmg = this.curses.includes("vengeance") ? 1.25 : 1;
    this.enemies.push({
      id: id(),
      kind,
      x: w.x,
      y: w.y,
      vx: 0,
      vy: 0,
      hp: def.hp * hpS,
      maxHp: def.hp * hpS,
      attack: def.attack * atkS * curseDmg,
      speed: def.speed,
      range: def.range,
      r: def.radius,
      cd: this.rng.range(0.3, 1.2),
      telegraph: 0,
      telMax: def.telegraph,
      telAng: 0,
      telKind: def.isRanged ? "ranged" : def.isFlying ? "dash" : def.isBoss ? "slam" : "melee",
      flash: 0,
      facing: -1,
      phase: 1,
      burn: 0,
      chill: 0,
      marks: 0,
      alive: true,
      elite: !!def.isElite || !!def.isBoss,
    });
  }

  update(dt: number) {
    if (this.overlay === "pause" || this.overlay === "defeat" || this.overlay === "victory") {
      this.input.endFrame();
      return;
    }
    if (this.overlay === "blessing" || this.overlay === "event" || this.overlay === "shop" || this.overlay === "chest" || this.overlay === "map" || this.overlay === "tutorial") {
      this.time += dt;
      this.tickFx(dt);
      this.input.endFrame();
      return;
    }
    if (this.hitstop > 0) {
      this.hitstop -= dt;
      this.tickFx(dt * 0.3);
      this.input.endFrame();
      return;
    }
    dt = Math.min(dt, 0.05);
    this.time += dt;
    this.roomTime += dt;
    this.stats.time += dt;

    const st = this.statsCache;
    const axis = this.input.axis();

    if (this.dashing > 0) {
      this.dashing -= dt;
      const sp = 520;
      this.pvx = Math.cos(this.dashAng) * sp;
      this.pvy = Math.sin(this.dashAng) * sp;
      this.invuln = Math.max(this.invuln, this.dashing);
      if (this.lowFx === false) this.burst(this.px, this.py, st.glass ? "#ece6dc" : "#2ec4d6", 3);
    } else {
      let spd = st.move;
      if (st.bloodRage) spd *= 1 + (1 - this.hp / this.maxHp) * 0.35;
      if (this.hero.id === "kael" && this.combo >= 8) spd *= 1.25;
      this.pvx = axis.x * spd;
      this.pvy = axis.y * spd;
    }
    this.moveBody(true, dt);
    if (this.pvx !== 0 || this.pvy !== 0) {
      if (Math.abs(this.pvx) > 4) this.facing = this.pvx > 0 ? 1 : -1;
      this.tutorialAdvance(1);
    }

    const nearest = this.nearestEnemy(280);
    let aimX = Math.cos(this.aim);
    let aimY = Math.sin(this.aim);
    if (this.autoAim && nearest) {
      aimX = nearest.x - this.px;
      aimY = nearest.y - this.py;
      const len = Math.hypot(aimX, aimY) || 1;
      aimX /= len;
      aimY /= len;
      this.aim = Math.atan2(aimY, aimX);
    } else if (axis.x || axis.y) {
      this.aim = Math.atan2(axis.y, axis.x);
      aimX = Math.cos(this.aim);
      aimY = Math.sin(this.aim);
    }

    this.atkCd = Math.max(0, this.atkCd - dt);
    this.sk1 = Math.max(0, this.sk1 - dt);
    this.sk2 = Math.max(0, this.sk2 - dt);
    this.invuln = Math.max(0, this.invuln - dt);
    this.flash = Math.max(0, this.flash - dt * 3);
    this.comboT = Math.max(0, this.comboT - dt);
    if (this.comboT <= 0) this.combo = 0;
    this.dashCd = Math.max(0, this.dashCd - dt);
    if (this.dashCd <= 0 && this.dashCharges < this.dashMax) {
      this.dashCharges++;
      this.dashCd = st.dashCd;
    }

    if (this.input.wantDash() && this.dashing <= 0 && this.dashCharges > 0) {
      this.doDash(axis.x, axis.y);
    }
    if (this.input.wantAttack() && this.atkCd <= 0) this.doAttack(aimX, aimY);
    if (this.input.skill1Pressed && this.sk1 <= 0) this.doSkill(1, nearest);
    if (this.input.skill2Pressed && this.sk2 <= 0) this.doSkill(2, nearest);
    if (this.input.ultPressed && this.energy >= 100) this.doUlt(nearest);
    if (this.input.pausePressed) this.overlay = "pause";

    if (st.supernova > 0 && (axis.x || axis.y) && this.rng.chance(st.supernova * dt * 1.8)) {
      this.nova(this.px, this.py, 70, st.attack * 0.7, "#f0c060");
    }

    if (this.hero.id === "sol" && (axis.x || axis.y)) {
      if (this.rng.chance(dt * 4)) {
        this.hazards.push({ x: this.px, y: this.py, r: 16, t: 1.4, dmg: st.attack * 0.15 });
      }
    }

    this.updateEnemies(dt);
    this.updateProjectiles(dt);
    this.updateHazards(dt);
    this.updateClones(dt);
    this.updateOrbs(dt);
    this.updatePickups(dt);
    this.tickTraps(dt);
    this.tickFx(dt);

    const k = 7;
    this.camX += (this.px - this.camX) * (1 - Math.exp(-k * dt));
    this.camY += (this.py - this.camY) * (1 - Math.exp(-k * dt));
    this.trauma = Math.max(0, this.trauma - dt * 1.8);

    if (!this.roomCleared && this.enemies.every((e) => !e.alive) && combatRoom(this.roomType)) {
      this.onRoomClear();
    }
    if (!combatRoom(this.roomType) && this.roomType !== "treasure") {
      // walk to exit to leave
    }
    this.tryExit();
    this.lastPos = { x: this.px, y: this.py };
    this.input.endFrame();
  }

  moveBody(player: boolean, dt: number) {
    const r = player ? 10 : 10;
    const steps = 1;
    for (let i = 0; i < steps; i++) {
      this.px += this.pvx * dt;
      this.resolve(true, r);
      this.py += this.pvy * dt;
      this.resolve(false, r);
    }
  }

  resolve(xAxis: boolean, r: number) {
    const minC = Math.floor((this.px - r) / TILE);
    const maxC = Math.floor((this.px + r) / TILE);
    const minR = Math.floor((this.py - r) / TILE);
    const maxR = Math.floor((this.py + r) / TILE);
    for (let row = minR; row <= maxR; row++) {
      for (let col = minC; col <= maxC; col++) {
        if (col < 0 || row < 0 || col >= COLS || row >= ROWS) continue;
        if (this.cells[row]![col] === 0) continue;
        const left = col * TILE;
        const top = row * TILE;
        const right = left + TILE;
        const bot = top + TILE;
        const cx = Math.max(left, Math.min(this.px, right));
        const cy = Math.max(top, Math.min(this.py, bot));
        const dx = this.px - cx;
        const dy = this.py - cy;
        const d2 = dx * dx + dy * dy;
        if (d2 >= r * r) continue;
        if (d2 === 0) {
          if (xAxis) this.px = this.pvx > 0 ? left - r : right + r;
          else this.py = this.pvy > 0 ? top - r : bot + r;
          continue;
        }
        const d = Math.sqrt(d2);
        const push = (r - d) / d;
        this.px += dx * push;
        this.py += dy * push;
      }
    }
    this.px = Math.max(r + 2, Math.min(COLS * TILE - r - 2, this.px));
    this.py = Math.max(r + 2, Math.min(ROWS * TILE - r - 2, this.py));
  }

  doDash(ax: number, ay: number) {
    let dx = ax;
    let dy = ay;
    if (!dx && !dy) {
      dx = Math.cos(this.aim);
      dy = Math.sin(this.aim);
    }
    const len = Math.hypot(dx, dy) || 1;
    this.dashAng = Math.atan2(dy / len, dx / len);
    this.dashing = 0.16;
    this.dashCharges--;
    this.dashCd = this.statsCache.dashCd;
    this.invuln = 0.16;
    bumpMission(this.meta, "dash", 1);
    Sfx.dash();
    if (this.statsCache.phantom) {
      this.clones.push({ x: this.px, y: this.py, t: 1.6, ang: this.aim });
    }
    if (this.hero.id === "zero") {
      this.clones.push({ x: this.px, y: this.py, t: 0.4, ang: this.aim });
    }
    this.tutorialAdvance(3);
  }

  doAttack(ax: number, ay: number) {
    const st = this.statsCache;
    let spd = st.atkSpd;
    if (st.bloodRage) spd *= 1 + (1 - this.hp / this.maxHp) * 0.8;
    if (this.hero.id === "kael" && this.combo >= 8) spd *= 1.25;
    this.atkCd = 1 / Math.max(0.4, spd);
    const ang = Math.atan2(ay, ax);
    this.aim = ang;
    this.slashes.push({ x: this.px + ax * 18, y: this.py + ay * 18, ang, life: 0.16, color: this.hero.accent });
    Sfx.slash();
    this.tutorialAdvance(2);

    if (this.hero.id === "lyra" || this.hero.id === "vex" || this.hero.id === "nyx") {
      const speed = this.hero.id === "lyra" ? 380 : 300;
      this.projectiles.push({
        id: id(),
        x: this.px + ax * 14,
        y: this.py + ay * 14,
        vx: ax * speed,
        vy: ay * speed,
        dmg: st.attack,
        r: 5,
        life: 0.9,
        friendly: true,
        kind: "player",
        color: this.hero.accent,
        pierce: this.hero.id === "lyra" ? 1 : 0,
      });
      return;
    }
    this.meleeHit(this.px, this.py, ang, st.range, Math.PI * 0.55, st.attack, false);
  }

  meleeHit(x: number, y: number, ang: number, range: number, arc: number, dmg: number, skill: boolean) {
    const st = this.statsCache;
    for (const e of this.enemies) {
      if (!e.alive) continue;
      const dx = e.x - x;
      const dy = e.y - y;
      const dist = Math.hypot(dx, dy);
      if (dist > range + e.r) continue;
      const a = Math.atan2(dy, dx);
      const da = Math.abs(wrap(a - ang));
      if (da > arc * 0.5 && dist > 18) continue;
      let backstab = false;
      const toMe = Math.atan2(y - e.y, x - e.x);
      if (Math.abs(wrap(toMe - e.facing)) > 2.2) backstab = true;
      this.hurtEnemy(e, dmg, { skill, backstab });
    }
  }

  doSkill(which: 1 | 2, target: Enemy | null) {
    const st = this.statsCache;
    const cdMul = 1 - st.cdr;
    if (which === 1) this.sk1 = this.hero.skill1.cooldown * cdMul;
    else this.sk2 = this.hero.skill2.cooldown * cdMul;
    Sfx.skill();
    this.tutorialAdvance(4);
    const idn = which === 1 ? this.hero.skill1.id : this.hero.skill2.id;
    const dmg = st.attack * st.skillDmg * (which === 1 ? 1.5 : 1.7);
    this.cast(idn, dmg, target);
    if (st.voidEcho > 0) {
      window.setTimeout(() => {
        if (this.overlay === "defeat") return;
        this.cast(idn, dmg * st.voidEcho, this.nearestEnemy(300));
      }, 280);
    }
  }

  cast(sid: string, dmg: number, target: Enemy | null) {
    const st = this.statsCache;
    switch (sid) {
      case "shadow_step": {
        const t = target ?? this.nearestEnemy(260);
        if (t) {
          const ang = Math.atan2(this.py - t.y, this.px - t.x);
          this.px = t.x - Math.cos(ang) * (t.r + 16);
          this.py = t.y - Math.sin(ang) * (t.r + 16);
          this.invuln = 0.2;
          this.hurtEnemy(t, dmg, { skill: true, crit: true });
        } else {
          this.px += Math.cos(this.aim) * 70;
          this.py += Math.sin(this.aim) * 70;
        }
        this.burst(this.px, this.py, "#2ec4d6", 16);
        break;
      }
      case "void_slash": {
        this.slashes.push({ x: this.px, y: this.py, ang: this.aim, life: 0.28, color: "#7dd3e8" });
        this.meleeHit(this.px, this.py, this.aim, 120, Math.PI * 0.7, dmg, true);
        break;
      }
      case "rain": {
        for (let i = -3; i <= 3; i++) {
          const a = this.aim + i * 0.12;
          this.projectiles.push({
            id: id(),
            x: this.px,
            y: this.py,
            vx: Math.cos(a) * 360,
            vy: Math.sin(a) * 360,
            dmg: dmg * 0.45,
            r: 4,
            life: 0.8,
            friendly: true,
            kind: "player",
            color: "#2ec4d6",
            pierce: 0,
          });
        }
        break;
      }
      case "pierce": {
        this.projectiles.push({
          id: id(),
          x: this.px,
          y: this.py,
          vx: Math.cos(this.aim) * 520,
          vy: Math.sin(this.aim) * 520,
          dmg,
          r: 6,
          life: 1,
          friendly: true,
          kind: "player",
          color: "#9bd4e0",
          pierce: 4,
        });
        break;
      }
      case "blood_rush": {
        this.flash = 1;
        this.float(this.px, this.py - 24, "BLOOD RUSH", "#e11d48", true);
        this.atkCd = 0;
        this.invuln = 0.15;
        break;
      }
      case "soul_burst": {
        this.float(this.px, this.py - 20, "ARMED", "#e11d48", false);
        (this as unknown as { nextKillBoom: number }).nextKillBoom = dmg * 1.2;
        break;
      }
      case "flurry": {
        for (let i = 0; i < 4; i++) {
          window.setTimeout(() => {
            this.meleeHit(this.px, this.py, this.aim + (i - 1.5) * 0.2, st.range + 10, Math.PI * 0.7, dmg * 0.45, true);
            this.slashes.push({ x: this.px, y: this.py, ang: this.aim, life: 0.1, color: "#e0b07a" });
          }, i * 70);
        }
        break;
      }
      case "iron_palm": {
        this.meleeHit(this.px, this.py, this.aim, 70, Math.PI * 0.8, dmg, true);
        for (const e of this.enemies) {
          if (!e.alive) continue;
          if (Math.hypot(e.x - this.px, e.y - this.py) < 80) {
            e.chill = 1.2;
            e.telegraph = 0;
          }
        }
        break;
      }
      case "slow": {
        for (const e of this.enemies) if (e.alive) e.chill = 3;
        this.float(this.px, this.py - 20, "TIME BREAK", "#7dd3e8", true);
        break;
      }
      case "orbs": {
        this.orbs = [{ ang: 0, t: 6 }, { ang: 2.09, t: 6 }, { ang: 4.18, t: 6 }];
        break;
      }
      case "sun_strike": {
        const t = target ?? this.nearestEnemy(240);
        const x = t ? t.x : this.px + Math.cos(this.aim) * 80;
        const y = t ? t.y : this.py + Math.sin(this.aim) * 80;
        this.nova(x, y, 56, dmg, "#e07a3a");
        this.hazards.push({ x, y, r: 40, t: 2.2, dmg: st.attack * 0.2 });
        break;
      }
      case "solar_burst": {
        this.nova(this.px, this.py, 90, dmg, "#f0a060");
        for (const e of this.enemies) {
          if (!e.alive) continue;
          const dx = e.x - this.px;
          const dy = e.y - this.py;
          const d = Math.hypot(dx, dy) || 1;
          if (d < 100) {
            e.x += (dx / d) * 40;
            e.y += (dy / d) * 40;
          }
        }
        break;
      }
      default:
        this.nova(this.px, this.py, 60, dmg, this.hero.accent);
    }
  }

  doUlt(target: Enemy | null) {
    this.energy = 0;
    Sfx.ult();
    this.addTrauma(0.7);
    const st = this.statsCache;
    const dmg = st.attack * 2.4 * st.skillDmg;
    switch (this.hero.ult.id) {
      case "phantom":
        this.clones.push({ x: this.px, y: this.py, t: 6, ang: this.aim });
        this.clones.push({ x: this.px, y: this.py, t: 6, ang: this.aim + 0.4 });
        break;
      case "eclipse":
        for (let i = 0; i < 18; i++) {
          window.setTimeout(() => {
            const a = this.rng.range(0, Math.PI * 2);
            this.projectiles.push({
              id: id(),
              x: this.px + this.rng.range(-40, 40),
              y: this.py - 80,
              vx: Math.cos(a) * 40,
              vy: 280,
              dmg: st.attack * 0.7,
              r: 4,
              life: 1.2,
              friendly: true,
              kind: "player",
              color: "#2ec4d6",
              pierce: 1,
            });
          }, i * 90);
        }
        break;
      case "covenant":
        this.nova(this.px, this.py, 130, dmg, "#e11d48");
        this.hp = Math.min(this.maxHp, this.hp + this.maxHp * 0.2);
        break;
      case "kata":
        this.invuln = 4;
        this.atkCd = 0;
        this.float(this.px, this.py - 24, "FINAL KATA", "#e0b07a", true);
        break;
      case "collapse": {
        const cx = target?.x ?? this.px;
        const cy = target?.y ?? this.py;
        for (const e of this.enemies) {
          if (!e.alive) continue;
          e.x += (cx - e.x) * 0.7;
          e.y += (cy - e.y) * 0.7;
        }
        window.setTimeout(() => this.nova(cx, cy, 90, dmg, "#a78bfa"), 200);
        break;
      }
      case "dawn":
        for (const e of this.enemies) if (e.alive) e.burn = 6;
        this.hazards.push({ x: this.px, y: this.py, r: 220, t: 6, dmg: st.attack * 0.12 });
        break;
    }
  }

  hurtEnemy(e: Enemy, amount: number, opts?: { skill?: boolean; crit?: boolean; backstab?: boolean }) {
    if (!e.alive) return;
    const st = this.statsCache;
    let dmg = amount;
    let crit = !!opts?.crit || this.rng.chance(st.crit);
    if (opts?.backstab) dmg *= 1.5;
    if (this.hero.id === "lyra" && e.marks >= 2) {
      crit = true;
      e.marks = 0;
    } else if (this.hero.id === "lyra") e.marks++;
    if (e.hp / e.maxHp < 0.3 && this.blessings.some((b) => b.id === "executioner")) dmg *= 1.3;
    if (this.hp / this.maxHp < 0.3 && this.blessings.some((b) => b.id === "last_stand")) dmg *= 1.4;
    if (this.synergies.includes("glass_cannon") && e.hp / e.maxHp < 0.15) dmg = e.hp + 1;
    if (crit) dmg *= st.critDmg;
    dmg *= 1 + Math.min(1, this.combo * 0.02);
    e.hp -= dmg;
    e.flash = 1;
    this.combo++;
    this.comboT = 2.1;
    this.stats.maxCombo = Math.max(this.stats.maxCombo, this.combo);
    this.stats.damage += dmg;
    this.energy = Math.min(100, this.energy + dmg * 0.045 + (crit ? 2 : 0.6));
    if (st.lifesteal > 0) this.hp = Math.min(this.maxHp, this.hp + dmg * st.lifesteal);
    if (st.ignite > 0 && this.rng.chance(st.ignite)) e.burn = Math.max(e.burn, 2.4);
    if (st.lightning) {
      let chained = 0;
      for (const o of this.enemies) {
        if (!o.alive || o.id === e.id || chained > 2) continue;
        if (Math.hypot(o.x - e.x, o.y - e.y) < 80) {
          o.hp -= dmg * 0.35;
          o.flash = 1;
          chained++;
          this.burst(o.x, o.y, "#f0e070", 4);
        }
      }
    }
    this.float(e.x, e.y - 16, crit ? `${Math.round(dmg)}!` : `${Math.round(dmg)}`, crit ? "#f0d78c" : "#f4eee6", crit);
    this.burst(e.x, e.y, crit ? "#f0d78c" : "#e11d48", crit ? 12 : 6);
    this.addTrauma(crit ? 0.35 : 0.18);
    this.hitstop = crit ? 0.055 : 0.025;
    if (crit) Sfx.crit();
    if (e.hp <= 0) this.killEnemy(e);
  }

  killEnemy(e: Enemy) {
    e.alive = false;
    e.hp = 0;
    this.stats.kills++;
    const def = ENEMIES[e.kind];
    const g = Math.round(def.gold * (1 + this.statsCache.goldPct) * (e.elite ? 1.6 : 1));
    this.gold += g;
    this.stats.gold += g;
    this.pickups.push({ x: e.x, y: e.y, vx: this.rng.range(-40, 40), vy: this.rng.range(-30, -10), gold: g, life: 4 });
    if (this.statsCache.onKillHeal) this.hp = Math.min(this.maxHp, this.hp + this.maxHp * this.statsCache.onKillHeal);
    const boom = (this as unknown as { nextKillBoom?: number }).nextKillBoom;
    if (boom) {
      this.nova(e.x, e.y, 70, boom, "#e11d48");
      (this as unknown as { nextKillBoom?: number }).nextKillBoom = 0;
    }
    if (this.synergies.includes("blood_inferno")) {
      this.nova(e.x, e.y, 54, this.statsCache.attack * 0.6, "#e11d48");
    }
    if (def.isBoss) {
      this.stats.bosses++;
      bumpMission(this.meta, "boss", 1);
    }
    this.burst(e.x, e.y, def.color, 18);
    Sfx.kill();
    bumpMission(this.meta, "kills", 1);
    bumpAch(this.meta, "first_blood", 1);
    bumpAch(this.meta, "kills", 1);
    bumpAch(this.meta, "combo", this.combo);
  }

  nova(x: number, y: number, r: number, dmg: number, color: string) {
    this.burst(x, y, color, 20);
    this.addTrauma(0.4);
    for (const e of this.enemies) {
      if (!e.alive) continue;
      if (Math.hypot(e.x - x, e.y - y) < r + e.r) this.hurtEnemy(e, dmg, { skill: true });
    }
  }

  hurtPlayer(amount: number, srcX: number, srcY: number) {
    if (this.invuln > 0 || this.overlay === "defeat") return;
    if (this.hero.id === "nyx" && this.rng.chance(0.12)) {
      this.float(this.px, this.py - 18, "PHASE", "#7dd3e8", false);
      this.invuln = 0.2;
      return;
    }
    const dmg = Math.max(1, amount - this.statsCache.defense * 0.35);
    if (this.stillBlood && !this.usedStill) {
      this.usedStill = true;
      this.invuln = 0.8;
      this.float(this.px, this.py - 20, "STILL BLOOD", "#22d3ee", true);
      return;
    }
    this.hp -= dmg;
    this.flash = 1;
    this.invuln = 0.45;
    this.combo = 0;
    this.addTrauma(0.55);
    Sfx.hurt();
    this.float(this.px, this.py - 18, `-${Math.round(dmg)}`, "#e11d48", false);
    const dx = this.px - srcX;
    const dy = this.py - srcY;
    const d = Math.hypot(dx, dy) || 1;
    this.px += (dx / d) * 18;
    this.py += (dy / d) * 18;
    if (this.statsCache.thorns > 0) {
      const e = this.nearestEnemy(60);
      if (e) this.hurtEnemy(e, dmg * this.statsCache.thorns, { skill: true });
    }
    if (this.hp <= 0) {
      const neck = this.meta.equipped.necklace;
      const item = this.meta.inventory.find((i) => i.uid === neck);
      if (!this.usedCheatDeath && item?.defId === "neck_abyss") {
        this.usedCheatDeath = true;
        this.hp = this.maxHp * 0.35;
        this.invuln = 1.2;
        this.float(this.px, this.py - 24, "UNDYING", "#c9a227", true);
        return;
      }
      this.hp = 0;
      this.overlay = "defeat";
      Sfx.die();
      this.finishRun(false);
    }
  }

  updateEnemies(dt: number) {
    const alive = this.enemies.filter((e) => e.alive);
    for (const e of alive) {
      e.flash = Math.max(0, e.flash - dt * 4);
      if (e.burn > 0) {
        e.burn -= dt;
        e.hp -= this.statsCache.attack * 0.12 * dt;
        if (e.hp <= 0) this.killEnemy(e);
      }
      if (e.chill > 0) e.chill -= dt;
      const slow = e.chill > 0 ? 0.4 : 1;
      const def = ENEMIES[e.kind];
      if (def.isBoss) this.updateBoss(e, dt, slow);
      const dx = this.px - e.x;
      const dy = this.py - e.y;
      const dist = Math.hypot(dx, dy) || 1;
      e.facing = Math.atan2(e.vy || dy, e.vx || dx);
      e.cd -= dt;
      if (e.telegraph > 0) {
        e.telegraph -= dt;
        if (e.telegraph <= 0) this.enemyFire(e);
        continue;
      }
      if (e.cd <= 0 && dist < e.range + 10) {
        e.telegraph = e.telMax;
        e.telAng = Math.atan2(dy, dx);
        if (def.isRanged) e.telKind = "ranged";
        else if (def.isFlying) e.telKind = "dash";
        else if (def.isBoss) e.telKind = this.rng.chance(0.4) ? "aoe" : "slam";
        else e.telKind = "melee";
        continue;
      }
      let tx = dx / dist;
      let ty = dy / dist;
      if (def.isRanged && dist < e.range * 0.65) {
        tx = -tx;
        ty = -ty;
      }
      for (const o of alive) {
        if (o.id === e.id) continue;
        const ox = e.x - o.x;
        const oy = e.y - o.y;
        const od = Math.hypot(ox, oy) || 1;
        if (od < 28) {
          tx += ox / od;
          ty += oy / od;
        }
      }
      const sl = Math.hypot(tx, ty) || 1;
      const sp = e.speed * slow;
      e.vx = (tx / sl) * sp;
      e.vy = (ty / sl) * sp;
      e.x += e.vx * dt;
      e.y += e.vy * dt;
      this.clampEnemy(e);
      if (dist < e.r + 12 && this.invuln <= 0 && !def.isRanged) {
        // contact chip
      }
    }
    this.enemies = this.enemies.filter((e) => e.alive || e.flash > 0);
  }

  updateBoss(e: Enemy, dt: number, _slow: number) {
    const pct = e.hp / e.maxHp;
    const prev = e.phase;
    e.phase = pct < 0.35 ? 3 : pct < 0.7 ? 2 : 1;
    if (e.phase !== prev) {
      this.float(e.x, e.y - 28, `PHASE ${e.phase}`, "#e11d48", true);
      this.addTrauma(0.6);
      if (e.phase === 2) {
        this.spawnEnemy("goblin", 1.2, 1.1);
        this.spawnEnemy("skeleton", 1.2, 1.1);
      }
    }
    if (e.phase === 3) {
      e.speed = ENEMIES[e.kind].speed * 1.35;
      e.telMax = ENEMIES[e.kind].telegraph * 0.7;
    }
  }

  enemyFire(e: Enemy) {
    const dx = this.px - e.x;
    const dy = this.py - e.y;
    const dist = Math.hypot(dx, dy) || 1;
    const ang = e.telAng;
    if (e.telKind === "ranged") {
      const n = e.kind === "cultist" || e.phase >= 3 ? 3 : 1;
      for (let i = 0; i < n; i++) {
        const a = ang + (i - (n - 1) / 2) * 0.18;
        this.projectiles.push({
          id: id(),
          x: e.x,
          y: e.y,
          vx: Math.cos(a) * 180,
          vy: Math.sin(a) * 180,
          dmg: e.attack,
          r: 5,
          life: 2.2,
          friendly: false,
          kind: e.kind === "cultist" ? "blood" : "arrow",
          color: e.kind === "cultist" ? "#e11d48" : "#d8d0c0",
          pierce: 0,
        });
      }
    } else if (e.telKind === "dash") {
      e.x += Math.cos(ang) * 70;
      e.y += Math.sin(ang) * 70;
      if (Math.hypot(this.px - e.x, this.py - e.y) < e.r + 16) this.hurtPlayer(e.attack, e.x, e.y);
    } else if (e.telKind === "aoe") {
      this.hazards.push({ x: e.x + Math.cos(ang) * 40, y: e.y + Math.sin(ang) * 40, r: 48, t: 0.35, dmg: e.attack * 1.1 });
    } else if (e.telKind === "slam") {
      if (dist < 70) this.hurtPlayer(e.attack * 1.2, e.x, e.y);
      this.burst(e.x, e.y, "#e11d48", 14);
    } else if (dist < e.range + 8) {
      this.hurtPlayer(e.attack, e.x, e.y);
    }
    e.cd = ENEMIES[e.kind].cooldown * (e.phase === 3 ? 0.7 : 1);
  }

  updateProjectiles(dt: number) {
    for (const p of this.projectiles) {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.life -= dt;
      const c = Math.floor(p.x / TILE);
      const r = Math.floor(p.y / TILE);
      if (r < 0 || c < 0 || r >= ROWS || c >= COLS || this.cells[r]![c] === 1) {
        p.life = 0;
        continue;
      }
      if (p.friendly) {
        for (const e of this.enemies) {
          if (!e.alive) continue;
          if (Math.hypot(e.x - p.x, e.y - p.y) < e.r + p.r) {
            this.hurtEnemy(e, p.dmg, { skill: false });
            p.pierce--;
            if (p.pierce < 0) p.life = 0;
          }
        }
      } else if (this.invuln <= 0 && Math.hypot(this.px - p.x, this.py - p.y) < 12 + p.r) {
        this.hurtPlayer(p.dmg, p.x, p.y);
        p.life = 0;
      }
    }
    this.projectiles = this.projectiles.filter((p) => p.life > 0);
  }

  updateHazards(dt: number) {
    for (const h of this.hazards) {
      h.t -= dt;
      if (h.t > 0 && this.invuln <= 0 && Math.hypot(this.px - h.x, this.py - h.y) < h.r + 8) {
        this.hurtPlayer(h.dmg * dt * 3, h.x, h.y);
      }
      for (const e of this.enemies) {
        if (!e.alive) continue;
        if (Math.hypot(e.x - h.x, e.y - h.y) < h.r + e.r) {
          e.burn = Math.max(e.burn, 0.6);
        }
      }
    }
    this.hazards = this.hazards.filter((h) => h.t > 0);
  }

  updateClones(dt: number) {
    for (const c of this.clones) {
      c.t -= dt;
      const t = this.nearestEnemy(200);
      if (t) {
        const ang = Math.atan2(t.y - c.y, t.x - c.x);
        c.x += Math.cos(ang) * 160 * dt;
        c.y += Math.sin(ang) * 160 * dt;
        c.ang = ang;
        if (Math.hypot(t.x - c.x, t.y - c.y) < t.r + 14 && this.rng.chance(dt * 3)) {
          this.hurtEnemy(t, this.statsCache.attack * 0.4, { skill: true });
        }
      }
    }
    this.clones = this.clones.filter((c) => c.t > 0);
  }

  updateOrbs(dt: number) {
    for (const o of this.orbs) {
      o.t -= dt;
      o.ang += dt * 3.2;
      const x = this.px + Math.cos(o.ang) * 36;
      const y = this.py + Math.sin(o.ang) * 36;
      for (const e of this.enemies) {
        if (!e.alive) continue;
        if (Math.hypot(e.x - x, e.y - y) < e.r + 10 && this.rng.chance(dt * 6)) {
          this.hurtEnemy(e, this.statsCache.attack * 0.35, { skill: true });
        }
      }
    }
    this.orbs = this.orbs.filter((o) => o.t > 0);
  }

  updatePickups(dt: number) {
    for (const p of this.pickups) {
      p.life -= dt;
      const dx = this.px - p.x;
      const dy = this.py - p.y;
      const d = Math.hypot(dx, dy);
      if (d < 90) {
        p.vx += (dx / (d || 1)) * 280 * dt;
        p.vy += (dy / (d || 1)) * 280 * dt;
      }
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vx *= 0.92;
      p.vy *= 0.92;
      if (d < 16) {
        p.life = 0;
        Sfx.pickup();
      }
    }
    this.pickups = this.pickups.filter((p) => p.life > 0);
  }

  tickTraps(dt: number) {
    for (const t of this.traps) {
      t.t += dt;
      const on = Math.sin(t.t * 2.2) > 0.35;
      if (!on) continue;
      const w = worldOf(t.x, t.y);
      if (this.invuln <= 0 && Math.hypot(this.px - w.x, this.py - w.y) < 16) {
        this.hurtPlayer(8, w.x, w.y);
      }
    }
  }

  tickFx(dt: number) {
    for (const p of this.particles) {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.life -= dt;
    }
    this.particles = this.particles.filter((p) => p.life > 0);
    if (this.lowFx && this.particles.length > 80) this.particles.length = 80;
    else if (this.particles.length > 220) this.particles.length = 220;
    for (const f of this.floats) {
      f.y += f.vy * dt;
      f.life -= dt;
    }
    this.floats = this.floats.filter((f) => f.life > 0);
    for (const s of this.slashes) s.life -= dt;
    this.slashes = this.slashes.filter((s) => s.life > 0);
  }

  clampEnemy(e: Enemy) {
    e.x = Math.max(e.r + TILE, Math.min(COLS * TILE - TILE - e.r, e.x));
    e.y = Math.max(e.r + TILE, Math.min(ROWS * TILE - TILE - e.r, e.y));
    const c = Math.floor(e.x / TILE);
    const r = Math.floor(e.y / TILE);
    if (this.cells[r]?.[c] === 1) {
      e.x += -e.vx * 0.05;
      e.y += -e.vy * 0.05;
    }
  }

  tryExit() {
    if (combatRoom(this.roomType) && !this.roomCleared) return;
    const ex = worldOf(this.exit.x, this.exit.y);
    if (Math.hypot(this.px - ex.x, this.py - ex.y) < 22) {
      if (this.roomType === "treasure" && this.chest && !this.chest.open) {
        this.openChest();
        return;
      }
      this.openMap();
    }
    if (this.chest && !this.chest.open) {
      const cw = worldOf(this.chest.x, this.chest.y);
      if (Math.hypot(this.px - cw.x, this.py - cw.y) < 22) this.openChest();
    }
  }

  onRoomClear() {
    this.roomCleared = true;
    this.stats.rooms++;
    if (this.roomTime <= 20) bumpAch(this.meta, "speed", 1);
    this.tutorialAdvance(5);
    if (this.roomType === "boss") {
      const nohit = this.hp >= this.maxHp - 0.5;
      if (nohit) {
        this.stats.noHitBoss = true;
        bumpAch(this.meta, "nohit", 1);
      }
      this.openChest();
      return;
    }
    if (this.roomType === "combat" || this.roomType === "elite" || this.roomType === "trap") {
      this.blessingChoices = rollBlessings(this.rng, this.blessings, 3);
      this.overlay = "blessing";
    }
  }

  openMap() {
    const node = this.graph[this.floor]?.[this.node];
    if (!node) return;
    node.cleared = true;
    if (this.roomType === "boss") {
      if (this.act === 1) {
        this.act = 2;
        this.biome = "forest";
        this.graph = generateGraph(this.rng, 6);
        this.floor = 0;
        this.node = 0;
        this.hp = Math.min(this.maxHp, this.hp + this.maxHp * 0.4);
        this.enterNode();
        this.float(this.px, this.py - 30, "BLOOD FOREST", "#e11d48", true);
        return;
      }
      this.overlay = "victory";
      Sfx.win();
      this.finishRun(true);
      return;
    }
    if (!node.next.length) {
      this.overlay = "victory";
      this.finishRun(true);
      return;
    }
    this.overlay = "map";
  }

  pickNode(index: number) {
    const cur = this.graph[this.floor]?.[this.node];
    if (!cur || !cur.next.includes(index)) return;
    this.floor += 1;
    this.node = index;
    this.enterNode();
  }

  pickBlessing(idStr: string) {
    const b = BLESSING_BY_ID[idStr] ?? this.blessingChoices.find((x) => x.id === idStr);
    if (!b) return;
    this.blessings.push(b);
    this.stats.blessings++;
    if (b.heal) this.hp = Math.min(this.maxHp + (b.hp ?? 0), this.hp + b.heal);
    this.recompute();
    this.hp = Math.min(this.hp + (b.hp ?? 0), this.maxHp);
    if (!this.meta.discoveredBlessings.includes(b.id)) this.meta.discoveredBlessings.push(b.id);
    bumpMission(this.meta, "blessings", 1);
    bumpAch(this.meta, "blessings", this.blessings.length);
    this.checkSynergies();
    Sfx.bless();
    this.overlay = "none";
    if (this.roomCleared) this.openMap();
    this.tutorialAdvance(5);
  }

  checkSynergies() {
    const have = new Set(this.blessings.map((b) => b.id));
    for (const s of SYNERGIES) {
      if (this.synergies.includes(s.id)) continue;
      if (s.requires.every((r) => have.has(r))) {
        this.synergies.push(s.id);
        this.blessings.push(s.grant);
        this.float(this.px, this.py - 36, s.name.toUpperCase(), "#22d3ee", true);
        bumpAch(this.meta, "synergy", 1);
        this.recompute();
      }
    }
  }

  pickEvent(i: number) {
    const ev = this.event;
    if (!ev) return;
    const c = ev.choices[i];
    if (!c) return;
    this.karma += c.karma ?? 0;
    this.gold += c.gold ?? 0;
    this.stats.gold += Math.max(0, c.gold ?? 0);
    if (c.hpPct) {
      if (c.hpPct > 0) this.hp = Math.min(this.maxHp, this.hp + this.maxHp * c.hpPct);
      else this.hp = Math.max(1, this.hp + this.maxHp * c.hpPct);
    }
    if (c.blessingId) {
      const b = BLESSING_BY_ID[c.blessingId];
      if (b) {
        this.blessings.push(b);
        this.recompute();
      }
    }
    if (c.curseId) this.curses.push(c.curseId);
    if (c.gems) this.runGems += c.gems;
    this.event = undefined;
    this.roomCleared = true;
    this.overlay = "none";
    this.openMap();
  }

  rollShop() {
    const b = rollBlessings(this.rng, this.blessings, 2);
    this.shop = [
      { kind: "heal", cost: 40, title: "Bandage", desc: "Restore 40% HP." },
      ...b.map((x) => ({
        kind: "blessing" as const,
        blessingId: x.id,
        cost: 50 + rarityCost(x.rarity),
        title: x.name,
        desc: x.desc,
      })),
    ];
  }

  buyShop(i: number) {
    const o = this.shop[i];
    if (!o || this.gold < o.cost) return;
    this.gold -= o.cost;
    if (o.kind === "heal") this.hp = Math.min(this.maxHp, this.hp + this.maxHp * 0.4);
    if (o.kind === "blessing" && o.blessingId) {
      const b = BLESSING_BY_ID[o.blessingId];
      if (b) {
        this.blessings.push(b);
        this.recompute();
        this.checkSynergies();
      }
    }
    this.shop.splice(i, 1);
    Sfx.pickup();
  }

  leaveShop() {
    this.roomCleared = true;
    this.overlay = "none";
    this.openMap();
  }

  openChest() {
    if (this.chest) this.chest.open = true;
    Sfx.chest();
    const rolls = this.roomType === "boss" ? 3 : 1;
    this.chestRewards = [];
    for (let i = 0; i < rolls; i++) {
      if (this.rng.chance(0.45)) {
        const b = rollBlessings(this.rng, this.blessings, 1)[0]!;
        this.chestRewards.push({
          title: b.name,
          desc: b.desc,
          apply: () => {
            this.blessings.push(b);
            this.recompute();
            this.checkSynergies();
          },
        });
      } else {
        const g = 40 + this.floor * 12 + this.rng.int(30);
        this.chestRewards.push({
          title: `${g} Gold`,
          desc: "Blood money from the dark.",
          apply: () => {
            this.gold += g;
            this.stats.gold += g;
          },
        });
      }
    }
    this.overlay = "chest";
  }

  pickChest(i: number) {
    const r = this.chestRewards[i];
    if (!r) return;
    r.apply();
    this.chestRewards = [];
    this.overlay = "none";
    this.roomCleared = true;
    if (this.roomType === "boss") this.openMap();
    else this.openMap();
  }

  finishRun(win: boolean) {
    const comboMul = 1 + this.stats.maxCombo * 0.03;
    const speedMul = Math.max(0.6, 2 - this.stats.time / 600);
    this.stats.score = Math.round(
      (this.stats.kills * 12 + this.stats.bosses * 400 + this.stats.damage * 0.08 + this.stats.gold) *
        comboMul *
        speedMul *
        (win ? 1.4 : 1),
    );
    this.stats.gems = this.runGems + (win ? 12 : 3) + (this.stats.bosses > 0 ? 8 : 0);
    bumpMission(this.meta, "run", 1);
    if (win) bumpAch(this.meta, this.act >= 2 ? "widow" : "gatebreaker", 1);
  }

  nearestEnemy(max: number): Enemy | null {
    let best: Enemy | null = null;
    let bd = max;
    for (const e of this.enemies) {
      if (!e.alive) continue;
      const d = Math.hypot(e.x - this.px, e.y - this.py);
      if (d < bd) {
        bd = d;
        best = e;
      }
    }
    return best;
  }

  burst(x: number, y: number, color: string, n: number) {
    const count = this.lowFx ? Math.ceil(n * 0.4) : n;
    for (let i = 0; i < count; i++) {
      const a = this.rng.range(0, Math.PI * 2);
      const s = this.rng.range(30, 140);
      this.particles.push({
        x,
        y,
        vx: Math.cos(a) * s,
        vy: Math.sin(a) * s,
        life: this.rng.range(0.2, 0.55),
        max: 0.5,
        color,
        size: this.rng.range(1.5, 3.5),
      });
    }
  }

  float(x: number, y: number, text: string, color: string, crit: boolean) {
    if (!this.numbersOn && /^\d/.test(text)) return;
    this.floats.push({ x, y, vy: crit ? -50 : -36, text, color, life: crit ? 0.9 : 0.7, crit });
  }

  addTrauma(v: number) {
    if (!this.shakeOn) return;
    this.trauma = Math.min(1, this.trauma + v);
  }

  tutorialAdvance(step: number) {
    if (!this.tutorial) return;
    if (this.tutorialStep === step) this.tutorialStep++;
    if (this.tutorialStep > 6) {
      this.tutorial = false;
      this.meta.tutorialDone = true;
      if (this.overlay === "tutorial") this.overlay = "none";
    }
  }

  skipTutorial() {
    this.tutorial = false;
    this.meta.tutorialDone = true;
    if (this.overlay === "tutorial") this.overlay = "none";
  }
}

function emptyStats(): RunStats {
  return { kills: 0, bosses: 0, damage: 0, gold: 0, gems: 0, blessings: 0, maxCombo: 0, time: 0, score: 0, rooms: 0, noHitBoss: false };
}

function combatRoom(t: RoomType) {
  return t === "combat" || t === "elite" || t === "boss" || t === "trap";
}

function wrap(a: number) {
  while (a > Math.PI) a -= Math.PI * 2;
  while (a < -Math.PI) a += Math.PI * 2;
  return a;
}

function rollBlessings(rng: Rng, have: BlessingDef[], n: number): BlessingDef[] {
  const ids = new Set(have.map((b) => b.id));
  const pool = BLESSINGS.filter((b) => !ids.has(b.id) && b.rarity !== "forbidden");
  const out: BlessingDef[] = [];
  const weighted = [...pool];
  for (let i = 0; i < n && weighted.length; i++) {
    const pick = rng.pick(weighted);
    out.push(pick);
    const idx = weighted.indexOf(pick);
    weighted.splice(idx, 1);
  }
  return out;
}

function rarityCost(r: BlessingDef["rarity"]) {
  return { common: 0, uncommon: 20, rare: 40, epic: 70, legendary: 110, mythic: 160, forbidden: 200 }[r];
}

export function bumpMission(meta: MetaSave, idStr: string, n: number) {
  const m = meta.missions[idStr] ?? { count: 0, claimed: false, day: "" };
  m.count += n;
  meta.missions[idStr] = m;
}

export function bumpAch(meta: MetaSave, idStr: string, n: number) {
  const a = meta.achievements[idStr] ?? { count: 0, claimed: false };
  const def = ACHIEVEMENTS.find((x) => x.id === idStr);
  if (idStr === "combo" || idStr === "blessings" || idStr === "forge" || idStr === "roster") a.count = Math.max(a.count, n);
  else if (idStr === "gold") a.count = n;
  else a.count += n;
  if (def && a.count > def.target) a.count = Math.max(a.count, def.target);
  meta.achievements[idStr] = a;
}

export const WORLD_W = COLS * TILE;
export const WORLD_H = ROWS * TILE;
export { TILE, COLS, ROWS, BIOMES };
