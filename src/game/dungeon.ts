import type { BiomeId, DungeonNode, RoomType } from "./types";

export class Rng {
  s: number;
  constructor(seed: number) {
    this.s = seed >>> 0 || 1;
  }
  next() {
    this.s = (this.s + 0x6d2b79f5) >>> 0;
    let t = this.s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  int(n: number) {
    return Math.floor(this.next() * n);
  }
  range(a: number, b: number) {
    return a + this.next() * (b - a);
  }
  pick<T>(arr: T[]): T {
    return arr[this.int(arr.length)]!;
  }
  chance(p: number) {
    return this.next() < p;
  }
}

export const TILE = 32;
export const COLS = 17;
export const ROWS = 13;

export type Cell = 0 | 1 | 2; // floor, wall, pit

export interface RoomMap {
  cells: Cell[][];
  spawn: { x: number; y: number };
  exit: { x: number; y: number };
  chest?: { x: number; y: number };
  traps: { x: number; y: number }[];
}

function inb(c: number, r: number) {
  return c >= 0 && r >= 0 && c < COLS && r < ROWS;
}

function walkable(cells: Cell[][], c: number, r: number) {
  return inb(c, r) && cells[r]![c] === 0;
}

function reachable(cells: Cell[][], sx: number, sy: number, tx: number, ty: number) {
  const q: number[] = [sy * COLS + sx];
  const seen = new Uint8Array(COLS * ROWS);
  seen[sy * COLS + sx] = 1;
  const dirs = [1, -1, COLS, -COLS];
  while (q.length) {
    const i = q.pop()!;
    if (i === ty * COLS + tx) return true;
    const x = i % COLS;
    const y = (i / COLS) | 0;
    for (const d of dirs) {
      const ni = i + d;
      const nx = ni % COLS;
      const ny = (ni / COLS) | 0;
      if (!inb(nx, ny) || seen[ni] || cells[ny]![nx] !== 0) continue;
      if (Math.abs(nx - x) + Math.abs(ny - y) !== 1) continue;
      seen[ni] = 1;
      q.push(ni);
    }
  }
  return false;
}

export function generateRoom(rng: Rng, type: RoomType): RoomMap {
  let cells: Cell[][] = [];
  const spawn = { x: 2, y: (ROWS / 2) | 0 };
  const exit = { x: COLS - 3, y: (ROWS / 2) | 0 };
  for (let attempt = 0; attempt < 24; attempt++) {
    cells = [];
    for (let r = 0; r < ROWS; r++) {
      const row: Cell[] = [];
      for (let c = 0; c < COLS; c++) {
        if (c === 0 || r === 0 || c === COLS - 1 || r === ROWS - 1) row.push(1);
        else if (rng.chance(type === "boss" ? 0.04 : 0.12)) row.push(1);
        else row.push(0);
      }
      cells.push(row);
    }
    const clear = (x: number, y: number, rad = 1) => {
      for (let r = y - rad; r <= y + rad; r++)
        for (let c = x - rad; c <= x + rad; c++)
          if (inb(c, r) && r > 0 && r < ROWS - 1 && c > 0 && c < COLS - 1) cells[r]![c] = 0;
    };
    spawn.x = 2;
    spawn.y = 2 + rng.int(ROWS - 4);
    exit.x = COLS - 3;
    exit.y = 2 + rng.int(ROWS - 4);
    if (type === "boss") {
      spawn.y = (ROWS / 2) | 0;
      exit.y = (ROWS / 2) | 0;
    }
    clear(spawn.x, spawn.y, 2);
    clear(exit.x, exit.y, 2);
    clear((COLS / 2) | 0, (ROWS / 2) | 0, 2);
    if (reachable(cells, spawn.x, spawn.y, exit.x, exit.y)) break;
  }
  const traps: { x: number; y: number }[] = [];
  const trapN = type === "trap" ? 8 : type === "combat" ? 2 : type === "elite" ? 3 : 0;
  for (let i = 0; i < trapN; i++) {
    for (let t = 0; t < 20; t++) {
      const x = 2 + rng.int(COLS - 4);
      const y = 2 + rng.int(ROWS - 4);
      if (!walkable(cells, x, y)) continue;
      if (Math.abs(x - spawn.x) + Math.abs(y - spawn.y) < 4) continue;
      traps.push({ x, y });
      break;
    }
  }
  let chest: { x: number; y: number } | undefined;
  if (type === "treasure" || type === "elite" || type === "boss") {
    chest = { x: (COLS / 2) | 0, y: (ROWS / 2) | 0 };
    cells[chest.y]![chest.x] = 0;
  }
  return { cells, spawn, exit, chest, traps };
}

export function worldOf(c: number, r: number) {
  return { x: (c + 0.5) * TILE, y: (r + 0.5) * TILE };
}

export function generateGraph(rng: Rng, floors = 8): DungeonNode[][] {
  const tiers: DungeonNode[][] = [];
  const typesFor = (floor: number, i: number, n: number): RoomType => {
    if (floor === 0) return "combat";
    if (floor === floors - 1) return "boss";
    if (floor === 3) return "elite";
    if (floor === 1) return i === 0 ? "combat" : "event";
    if (floor === 2) return i === 0 ? "treasure" : "shrine";
    if (floor === 4) return i === 0 ? "heal" : "shop";
    if (floor === 5) return i === 0 ? "combat" : "trap";
    if (floor === 6) return i === 0 ? "elite" : "shop";
    const bag: RoomType[] = ["combat", "combat", "event", "treasure"];
    return bag[(i + floor) % bag.length]!;
  };
  for (let f = 0; f < floors; f++) {
    const n = f === 0 || f === floors - 1 || f === 3 ? 1 : 2 + (rng.int(2) === 0 ? 0 : 1);
    const nodes: DungeonNode[] = [];
    for (let i = 0; i < n; i++) {
      const type = typesFor(f, i, n);
      nodes.push({
        id: `${f}-${i}`,
        floor: f,
        index: i,
        type,
        next: [],
        enemyCount:
          type === "combat" ? 3 + f : type === "elite" ? 1 : type === "boss" ? 1 : type === "trap" ? 2 : 0,
        cleared: false,
      });
    }
    tiers.push(nodes);
  }
  for (let f = 0; f < floors - 1; f++) {
    const cur = tiers[f]!;
    const nxt = tiers[f + 1]!;
    for (const node of cur) {
      const a = rng.int(nxt.length);
      node.next = [a];
      if (nxt.length > 1 && rng.chance(0.55)) {
        const b = (a + 1) % nxt.length;
        if (b !== a) node.next.push(b);
      }
    }
  }
  return tiers;
}

export function biomeForAct(act: number): BiomeId {
  return act === 1 ? "citadel" : act === 2 ? "forest" : "ember";
}
