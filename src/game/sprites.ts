const pal = {
  ink: "#0c0c10",
  hood: "#1c1c24",
  hoodL: "#2c2c38",
  skin: "#d7c4a8",
  skinD: "#b39474",
  cloth: "#2a2430",
  clothL: "#3c3444",
  blood: "#c41c3c",
  bloodL: "#e84860",
  steel: "#c8d0d8",
  steelD: "#7a8490",
  cyan: "#5ad4e0",
  gold: "#d4b45c",
  bone: "#e8e0d0",
  green: "#5a9a58",
  greenD: "#3a6a38",
  purple: "#6a5a98",
  orange: "#d47838",
  red: "#b03030",
};

function make(w: number, h: number, draw: (ctx: CanvasRenderingContext2D) => void) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;
  ctx.imageSmoothingEnabled = false;
  draw(ctx);
  return c;
}

function px(ctx: CanvasRenderingContext2D, x: number, y: number, color: string, s = 1) {
  ctx.fillStyle = color;
  ctx.fillRect(x * s, y * s, s, s);
}

function blitMap(ctx: CanvasRenderingContext2D, map: string[], legend: Record<string, string>, s = 1) {
  for (let y = 0; y < map.length; y++) {
    const row = map[y]!;
    for (let x = 0; x < row.length; x++) {
      const ch = row[x]!;
      if (ch === "." || ch === " ") continue;
      const col = legend[ch];
      if (col) px(ctx, x, y, col, s);
    }
  }
}

const ZERO_IDLE = [
  "..hhhhhh..",
  ".hhHHHHHh.",
  ".hHssssHh.",
  "..HsiiHs..",
  "..cccccc..",
  ".cCTTTCCc.",
  "b.cTTTT.c.b",
  "B.cTTTT.c.B",
  "..ll..ll..",
  "..ll..ll..",
  "..dd..dd..",
];

const ZERO_RUN = [
  "..hhhhhh..",
  ".hhHHHHHh.",
  ".hHssssHh.",
  "..HsiiHs..",
  "..cccccc..",
  ".cCTTTCCc.",
  "b..CTTT..b",
  "B..CTTT..B",
  "...ll.ll..",
  "..ll...ll.",
  "..dd...dd.",
];

const heroLegend = (accent: string): Record<string, string> => ({
  h: pal.hood,
  H: pal.hoodL,
  s: pal.skin,
  i: pal.ink,
  c: accent,
  C: pal.cloth,
  T: pal.clothL,
  l: pal.cloth,
  d: pal.hood,
  b: pal.steel,
  B: pal.cyan,
});

export interface Atlas {
  heroes: Record<string, { idle: HTMLCanvasElement; run: HTMLCanvasElement; attack: HTMLCanvasElement }>;
  enemies: Record<string, HTMLCanvasElement>;
  tiles: Record<string, HTMLCanvasElement>;
  fx: Record<string, HTMLCanvasElement>;
  chest: { shut: HTMLCanvasElement; open: HTMLCanvasElement };
  portal: HTMLCanvasElement;
  altar: HTMLCanvasElement;
}

let cached: Atlas | null = null;

function heroSheet(accent: string, extra?: string[]) {
  const legend = heroLegend(accent);
  const idle = make(16, 16, (ctx) => blitMap(ctx, ZERO_IDLE, legend, 1));
  const run = make(16, 16, (ctx) => blitMap(ctx, extra ?? ZERO_RUN, legend, 1));
  const attack = make(18, 16, (ctx) => {
    blitMap(ctx, ZERO_IDLE, legend, 1);
    ctx.fillStyle = pal.steel;
    ctx.fillRect(14, 6, 4, 1);
    ctx.fillStyle = pal.cyan;
    ctx.fillRect(17, 6, 1, 1);
  });
  return { idle, run, attack };
}

function blob(color: string, eye: string, horns = false, wings = false) {
  return make(16, 16, (ctx) => {
    ctx.fillStyle = pal.ink;
    ctx.fillRect(3, 4, 10, 10);
    ctx.fillStyle = color;
    ctx.fillRect(4, 5, 8, 8);
    ctx.fillStyle = eye;
    ctx.fillRect(6, 7, 2, 2);
    ctx.fillRect(10, 7, 2, 2);
    ctx.fillStyle = pal.ink;
    ctx.fillRect(6, 11, 5, 1);
    if (horns) {
      ctx.fillStyle = pal.bone;
      ctx.fillRect(4, 2, 2, 3);
      ctx.fillRect(10, 2, 2, 3);
    }
    if (wings) {
      ctx.fillStyle = color;
      ctx.fillRect(1, 6, 3, 5);
      ctx.fillRect(12, 6, 3, 5);
    }
  });
}

function tile(fill: string, grout: string, crack = false) {
  return make(16, 16, (ctx) => {
    ctx.fillStyle = fill;
    ctx.fillRect(0, 0, 16, 16);
    ctx.fillStyle = grout;
    ctx.fillRect(0, 0, 16, 1);
    ctx.fillRect(0, 0, 1, 16);
    if (crack) {
      ctx.fillStyle = grout;
      ctx.fillRect(4, 6, 7, 1);
      ctx.fillRect(10, 6, 1, 5);
    }
    ctx.fillStyle = "rgba(255,255,255,0.05)";
    ctx.fillRect(2, 2, 3, 1);
  });
}

export function getAtlas(): Atlas {
  if (cached) return cached;
  cached = {
    heroes: {
      zero: heroSheet("#c41c3c"),
      lyra: heroSheet("#2a8aa0"),
      vex: heroSheet("#8a2040"),
      kael: heroSheet("#c06a32"),
      nyx: heroSheet("#5a4a88"),
      sol: heroSheet("#d47838"),
    },
    enemies: {
      goblin: blob(pal.green, pal.gold, true),
      skeleton: blob(pal.bone, pal.blood, false),
      bat: blob(pal.purple, pal.cyan, false, true),
      cultist: blob(pal.red, pal.gold, true),
      spider: blob(pal.orange, pal.blood, false),
      berserker: blob("#a02828", pal.gold, true),
      knight: blob("#701828", pal.steel, true),
      gatekeeper: blob("#4a3a78", pal.cyan, true),
      widow: blob("#8a3a18", pal.gold, true),
      wraith: blob("#5ad4e0", pal.cyan, false, true),
      golem: blob("#6a7388", pal.gold, true),
    },
    tiles: {
      floor: tile("#1a1c24", "#12141a"),
      floor2: tile("#16181f", "#101218", true),
      wall: tile("#2a2d38", "#1a1c24"),
      wallTop: tile("#3a3e4c", "#2a2d38"),
    },
    fx: {
      slash: make(24, 16, (ctx) => {
        ctx.strokeStyle = "#f2f0ea";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(12, 8, 9, -0.6, 1.2);
        ctx.stroke();
        ctx.strokeStyle = pal.cyan;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(12, 8, 7, -0.5, 1.1);
        ctx.stroke();
      }),
    },
    chest: {
      shut: make(16, 14, (ctx) => {
        ctx.fillStyle = pal.ink;
        ctx.fillRect(2, 5, 12, 8);
        ctx.fillStyle = "#6a4a24";
        ctx.fillRect(3, 6, 10, 6);
        ctx.fillStyle = pal.gold;
        ctx.fillRect(7, 8, 2, 3);
        ctx.fillStyle = "#8a6230";
        ctx.fillRect(3, 6, 10, 2);
      }),
      open: make(16, 16, (ctx) => {
        ctx.fillStyle = pal.ink;
        ctx.fillRect(2, 8, 12, 6);
        ctx.fillStyle = "#6a4a24";
        ctx.fillRect(3, 9, 10, 4);
        ctx.fillStyle = pal.gold;
        ctx.fillRect(5, 10, 6, 2);
        ctx.fillStyle = "#8a6230";
        ctx.fillRect(3, 4, 10, 5);
      }),
    },
    portal: make(20, 24, (ctx) => {
      ctx.fillStyle = pal.ink;
      ctx.fillRect(2, 2, 16, 20);
      ctx.fillStyle = "#2a3a4a";
      ctx.fillRect(4, 4, 12, 16);
      ctx.fillStyle = pal.cyan;
      ctx.globalAlpha = 0.7;
      ctx.fillRect(7, 6, 6, 12);
      ctx.globalAlpha = 1;
    }),
    altar: make(16, 16, (ctx) => {
      ctx.fillStyle = pal.ink;
      ctx.fillRect(2, 8, 12, 7);
      ctx.fillStyle = "#3a3a44";
      ctx.fillRect(3, 9, 10, 5);
      ctx.fillStyle = pal.blood;
      ctx.fillRect(7, 4, 2, 6);
      ctx.fillStyle = pal.gold;
      ctx.fillRect(6, 3, 4, 2);
    }),
  };
  return cached;
}

export function tintTile(base: HTMLCanvasElement, hex: string) {
  const c = make(base.width, base.height, (ctx) => {
    ctx.drawImage(base, 0, 0);
    ctx.globalCompositeOperation = "multiply";
    ctx.fillStyle = hex;
    ctx.fillRect(0, 0, base.width, base.height);
    ctx.globalCompositeOperation = "source-over";
  });
  return c;
}
