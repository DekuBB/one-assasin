import { BIOMES, Game, TILE, WORLD_H, WORLD_W } from "./engine";
import { getAtlas } from "./sprites";
import { ENEMIES } from "./data/catalog";

export function renderGame(
  ctx: CanvasRenderingContext2D,
  game: Game,
  cssW: number,
  cssH: number,
  dpr: number,
) {
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.imageSmoothingEnabled = false;

  const biome = BIOMES[game.biome];
  ctx.fillStyle = biome.fog;
  ctx.fillRect(0, 0, cssW, cssH);

  const trauma = game.trauma * game.trauma;
  const shakeX = game.shakeOn ? (Math.random() - 0.5) * 18 * trauma : 0;
  const shakeY = game.shakeOn ? (Math.random() - 0.5) * 18 * trauma : 0;

  const zoom = cssW < 520 ? 1.6 : 1.4;
  const viewW = cssW / zoom;
  const viewH = cssH / zoom;
  let camX = game.camX + shakeX / zoom;
  let camY = game.camY + shakeY / zoom;
  camX = WORLD_W > viewW ? Math.max(viewW / 2 - 16, Math.min(WORLD_W - viewW / 2 + 16, camX)) : WORLD_W / 2;
  camY = WORLD_H > viewH ? Math.max(viewH / 2 - 16, Math.min(WORLD_H - viewH / 2 + 24, camY)) : WORLD_H / 2;

  ctx.save();
  ctx.translate(cssW / 2, cssH * 0.42);
  ctx.scale(zoom, zoom);
  ctx.translate(-camX, -camY);

  drawFloor(ctx, game, biome);
  drawTraps(ctx, game);
  drawDecor(ctx, game, biome);
  if (game.chest) drawChest(ctx, game);
  drawExit(ctx, game);
  drawHazards(ctx, game);
  drawEnemies(ctx, game);
  drawClones(ctx, game);
  drawPlayer(ctx, game);
  drawOrbs(ctx, game);
  drawProjectiles(ctx, game);
  drawSlashes(ctx, game);
  drawParticles(ctx, game);
  drawFloats(ctx, game);
  drawTelegraphs(ctx, game);

  ctx.restore();

  const g = ctx.createRadialGradient(cssW / 2, cssH * 0.42, cssW * 0.18, cssW / 2, cssH * 0.45, cssW * 0.78);
  g.addColorStop(0, "rgba(0,0,0,0)");
  g.addColorStop(1, "rgba(0,0,0,0.5)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, cssW, cssH);

  if (game.flash > 0 && game.meta.settings.flash) {
    ctx.fillStyle = `rgba(225,29,72,${game.flash * 0.18})`;
    ctx.fillRect(0, 0, cssW, cssH);
  }
}

function drawFloor(
  ctx: CanvasRenderingContext2D,
  game: Game,
  biome: (typeof BIOMES)[keyof typeof BIOMES],
) {
  for (let r = 0; r < game.cells.length; r++) {
    const row = game.cells[r]!;
    for (let c = 0; c < row.length; c++) {
      const x = c * TILE;
      const y = r * TILE;
      const cell = row[c]!;
      if (cell === 1) {
        ctx.fillStyle = biome.wall;
        ctx.fillRect(x, y, TILE, TILE);
        ctx.fillStyle = biome.wallTop;
        ctx.fillRect(x, y, TILE, 10);
        ctx.fillStyle = "rgba(255,255,255,0.07)";
        ctx.fillRect(x + 2, y + 2, TILE - 6, 2);
        ctx.fillStyle = "rgba(0,0,0,0.28)";
        ctx.fillRect(x, y + TILE - 5, TILE, 5);
        if ((c + r) % 3 === 0) {
          ctx.fillStyle = biome.accent;
          ctx.globalAlpha = 0.35;
          ctx.fillRect(x + 12, y + 12, 3, 9);
          ctx.globalAlpha = 1;
        }
      } else {
        ctx.fillStyle = (c + r) % 2 === 0 ? biome.floor : biome.floorAlt;
        ctx.fillRect(x, y, TILE, TILE);
        ctx.fillStyle = "rgba(255,255,255,0.06)";
        ctx.fillRect(x + 2, y + 2, 8, 1);
        if ((c * 13 + r * 7) % 11 === 0) {
          ctx.fillStyle = "rgba(0,0,0,0.16)";
          ctx.fillRect(x + 8, y + 10, 10, 1);
        }
      }
    }
  }
}

function drawTraps(ctx: CanvasRenderingContext2D, game: Game) {
  for (const t of game.traps) {
    const x = t.x * TILE;
    const y = t.y * TILE;
    const on = Math.sin(t.t * 2.2) > 0.35;
    ctx.fillStyle = "#2a1a16";
    ctx.fillRect(x + 6, y + 6, TILE - 12, TILE - 12);
    if (on) {
      ctx.fillStyle = "#e11d48";
      ctx.fillRect(x + 10, y + 8, 3, 16);
      ctx.fillRect(x + 16, y + 8, 3, 16);
      ctx.fillStyle = "rgba(225,29,72,0.25)";
      ctx.fillRect(x + 4, y + 4, TILE - 8, TILE - 8);
    }
  }
}

function drawDecor(
  ctx: CanvasRenderingContext2D,
  game: Game,
  biome: (typeof BIOMES)[keyof typeof BIOMES],
) {
  ctx.strokeStyle = biome.accent + "33";
  ctx.strokeRect(TILE, TILE, WORLD_W - TILE * 2, WORLD_H - TILE * 2);
}

function drawChest(ctx: CanvasRenderingContext2D, game: Game) {
  const atlas = getAtlas();
  const ch = game.chest!;
  const img = ch.open ? atlas.chest.open : atlas.chest.shut;
  ctx.drawImage(img, ch.x * TILE + 6, ch.y * TILE + 6, 20, ch.open ? 20 : 18);
}

function drawExit(ctx: CanvasRenderingContext2D, game: Game) {
  if (combatRoom(game) && !game.roomCleared) return;
  const atlas = getAtlas();
  const x = game.exit.x * TILE + 6;
  const y = game.exit.y * TILE + 4;
  const pulse = 0.6 + Math.sin(game.time * 4) * 0.4;
  ctx.globalAlpha = pulse;
  ctx.drawImage(atlas.portal, x, y, 20, 24);
  ctx.globalAlpha = 1;
  ctx.fillStyle = `rgba(46,196,214,${0.15 + pulse * 0.15})`;
  ctx.beginPath();
  ctx.arc(x + 10, y + 12, 16, 0, Math.PI * 2);
  ctx.fill();
}

function combatRoom(game: Game) {
  return game.roomType === "combat" || game.roomType === "elite" || game.roomType === "boss" || game.roomType === "trap";
}

function drawHazards(ctx: CanvasRenderingContext2D, game: Game) {
  for (const h of game.hazards) {
    ctx.fillStyle = "rgba(224,122,58,0.18)";
    ctx.beginPath();
    ctx.arc(h.x, h.y, h.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(224,122,58,0.55)";
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

function drawEnemies(ctx: CanvasRenderingContext2D, game: Game) {
  const atlas = getAtlas();
  for (const e of game.enemies) {
    if (!e.alive && e.flash <= 0) continue;
    const def = ENEMIES[e.kind];
    const sprite = atlas.enemies[e.kind] ?? atlas.enemies.goblin;
    const scale = def.isBoss ? 3.1 : def.isElite ? 2.2 : 1.9;
    const sw = 16 * scale;
    const sh = 16 * scale;
    ctx.save();
    ctx.translate(e.x, e.y);
    ctx.fillStyle = "rgba(0,0,0,0.4)";
    ctx.beginPath();
    ctx.ellipse(0, sh * 0.38, sw * 0.35, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    if (e.flash > 0) ctx.filter = "brightness(2.4)";
    if (!e.alive) ctx.globalAlpha = Math.max(0, e.flash);
    ctx.drawImage(sprite!, -sw / 2, -sh / 2, sw, sh);
    ctx.filter = "none";
    ctx.globalAlpha = 1;
    ctx.restore();

    if (e.alive) {
      const bw = Math.max(22, sw);
      ctx.fillStyle = "#1a1014";
      ctx.fillRect(e.x - bw / 2, e.y - sh / 2 - 8, bw, 3);
      ctx.fillStyle = def.isBoss ? "#e11d48" : "#3dba7a";
      ctx.fillRect(e.x - bw / 2, e.y - sh / 2 - 8, bw * Math.max(0, e.hp / e.maxHp), 3);
    }
    if (e.burn > 0) {
      ctx.fillStyle = "rgba(224,122,58,0.7)";
      ctx.fillRect(e.x - 3, e.y - 20, 6, 6);
    }
  }
}

function drawTelegraphs(ctx: CanvasRenderingContext2D, game: Game) {
  for (const e of game.enemies) {
    if (!e.alive || e.telegraph <= 0) continue;
    const p = 1 - e.telegraph / e.telMax;
    ctx.save();
    ctx.translate(e.x, e.y);
    ctx.rotate(e.telAng);
    ctx.globalAlpha = 0.28 + p * 0.5;
    ctx.fillStyle = "#e11d48";
    ctx.strokeStyle = "#fb7185";
    ctx.lineWidth = 2;
    if (e.telKind === "ranged") {
      ctx.fillRect(0, -3, 220, 6);
    } else if (e.telKind === "aoe" || e.telKind === "slam") {
      ctx.beginPath();
      ctx.arc(30, 0, 36 + p * 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    } else if (e.telKind === "dash") {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(80, 0);
      ctx.stroke();
      ctx.fillRect(60, -5, 20, 10);
    } else {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, e.range + 6, -0.7, 0.7);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();
  }
}

function drawPlayer(ctx: CanvasRenderingContext2D, game: Game) {
  const atlas = getAtlas();
  const set = atlas.heroes[game.hero.id] ?? atlas.heroes.zero;
  const moving = Math.hypot(game.pvx, game.pvy) > 12;
  const img = game.dashing > 0 ? set!.run : moving && ((game.time * 8) | 0) % 2 === 0 ? set!.run : set!.idle;
  const scale = 3;
  const w = img.width * scale;
  const h = img.height * scale;
  ctx.save();
  ctx.translate(game.px, game.py);
  ctx.fillStyle = "rgba(225,29,72,0.22)";
  ctx.beginPath();
  ctx.arc(0, 2, 16, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(0,0,0,0.45)";
  ctx.beginPath();
  ctx.ellipse(0, h * 0.34, 11, 4, 0, 0, Math.PI * 2);
  ctx.fill();
  if (game.invuln > 0) ctx.globalAlpha = 0.55 + Math.sin(game.time * 40) * 0.3;
  ctx.scale(game.facing, 1);
  if (game.flash > 0) ctx.filter = "brightness(2.5)";
  ctx.drawImage(img, -w / 2, -h / 2 - 6, w, h);
  ctx.restore();

  ctx.save();
  ctx.translate(game.px + Math.cos(game.aim) * 26, game.py + Math.sin(game.aim) * 26);
  ctx.fillStyle = "#ece6dc";
  ctx.fillRect(-2, -2, 4, 4);
  ctx.restore();
}

function drawClones(ctx: CanvasRenderingContext2D, game: Game) {
  const atlas = getAtlas();
  const set = atlas.heroes[game.hero.id] ?? atlas.heroes.zero;
  for (const c of game.clones) {
    ctx.globalAlpha = Math.min(0.55, c.t);
    ctx.drawImage(set!.idle, c.x - 16, c.y - 16, 32, 32);
    ctx.globalAlpha = 1;
  }
}

function drawOrbs(ctx: CanvasRenderingContext2D, game: Game) {
  for (const o of game.orbs) {
    const x = game.px + Math.cos(o.ang) * 36;
    const y = game.py + Math.sin(o.ang) * 36;
    ctx.fillStyle = "#7dd3e8";
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(125,211,232,0.25)";
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawProjectiles(ctx: CanvasRenderingContext2D, game: Game) {
  for (const p of game.projectiles) {
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r + 1, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(p.x, p.y, Math.max(1.5, p.r * 0.4), 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawSlashes(ctx: CanvasRenderingContext2D, game: Game) {
  for (const s of game.slashes) {
    ctx.save();
    ctx.translate(s.x, s.y);
    ctx.rotate(s.ang);
    ctx.globalAlpha = Math.max(0, s.life * 5);
    ctx.strokeStyle = s.color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, 24, -0.9, 0.9);
    ctx.stroke();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(0, 0, 18, -0.7, 0.7);
    ctx.stroke();
    ctx.restore();
  }
}

function drawParticles(ctx: CanvasRenderingContext2D, game: Game) {
  for (const p of game.particles) {
    ctx.globalAlpha = Math.max(0, p.life / 0.5);
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, p.size, p.size);
  }
  ctx.globalAlpha = 1;
}

function drawFloats(ctx: CanvasRenderingContext2D, game: Game) {
  ctx.textAlign = "center";
  for (const f of game.floats) {
    ctx.globalAlpha = Math.max(0, f.life / 0.8);
    ctx.fillStyle = f.color;
    const size = f.crit ? 14 : 11;
    ctx.font = `700 ${size}px Barlow Condensed, sans-serif`;
    ctx.fillText(f.text, f.x, f.y);
  }
  ctx.globalAlpha = 1;
}

export function worldSize() {
  return { w: WORLD_W, h: WORLD_H };
}
