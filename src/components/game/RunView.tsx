import { useEffect, useRef, useState, type PointerEvent as PE } from "react";
import { Game, WORLD_H, WORLD_W } from "@/game/engine";
import { renderGame } from "@/game/render";
import { BIOMES } from "@/game/data/catalog";
import { RARITY_COLOR, RARITY_LABEL } from "@/game/data/catalog";
import { Sfx } from "@/game/audio";
import { t } from "@/game/i18n";
import { shouldShowTouch, type DeviceInfo } from "@/game/device";
import { Btn, Panel, Tag } from "./ui";
import type { RunOverlay } from "@/game/types";

const TIPS = [
  "",
  "Move — WASD or left stick",
  "Attack — click / J / right button",
  "Dash — Space / dash button. I-frames.",
  "Skill — Q E T · Parry Shift",
  "Pick a blessing. Build the night.",
  "Walk into the cyan gate to continue.",
];

export function RunView({
  game,
  onExit,
  onRetry,
  device,
}: {
  game: Game;
  onExit: () => void;
  onRetry: () => void;
  device: DeviceInfo;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [overlay, setOverlay] = useState<RunOverlay>(game.overlay);
  const [tick, setTick] = useState(0);
  const showTouch = shouldShowTouch(game.meta.settings.showTouch) || device.kind === "phone";

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    game.input.attach(wrap);
    let raf = 0;
    let last = performance.now();
    let acc = 0;
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      game.update(dt);
      const dpr = Math.min(2.25, window.devicePixelRatio || 1);
      const cssW = wrap.clientWidth;
      const cssH = wrap.clientHeight;
      if (canvas.width !== Math.floor(cssW * dpr) || canvas.height !== Math.floor(cssH * dpr)) {
        canvas.width = Math.floor(cssW * dpr);
        canvas.height = Math.floor(cssH * dpr);
        canvas.style.width = cssW + "px";
        canvas.style.height = cssH + "px";
      }
      const ctx = canvas.getContext("2d");
      if (ctx) renderGame(ctx, game, cssW, cssH, dpr);
      if (game.overlay !== overlay) setOverlay(game.overlay);
      acc += dt;
      if (acc > 0.08) {
        acc = 0;
        setTick((n) => n + 1);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const w = window as unknown as { __controlsTest?: object };
    w.__controlsTest = {
      getYaw: () => game.aim,
      getSpeed: () => Math.hypot(game.pvx, game.pvy),
      getPos: () => ({ x: game.px, y: game.py }),
      setKeys: (codes: string[]) => {
        game.input.qaKeys = new Set(codes);
      },
      setSteer: (v: number) => {
        game.input.qaKeys = new Set(v > 0.2 ? ["KeyA"] : v < -0.2 ? ["KeyD"] : []);
      },
    };

    return () => {
      cancelAnimationFrame(raf);
      game.input.detach();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game]);

  const hpP = game.maxHp > 0 ? game.hp / game.maxHp : 0;
  const biome = BIOMES[game.biome];
  const boss = game.enemies.find((e) => e.alive && (e.kind === "gatekeeper" || e.kind === "widow" || e.kind === "knight"));
  const lang = game.meta.settings.language;
  void tick;
  void WORLD_W;
  void WORLD_H;

  return (
    <div ref={wrapRef} className="relative h-full w-full overflow-hidden bg-void" style={{ touchAction: "none" }}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      <div className="pointer-events-none absolute inset-x-0 top-0 p-3 pr-14">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 overflow-hidden rounded-md border border-line bg-ink" style={{ background: game.hero.accent + "33" }} />
              <div>
                <p className="font-cond text-[11px] uppercase tracking-[0.16em] text-mute">{game.hero.name}</p>
                <p className="font-cond text-xs tabular text-bone">
                  {Math.ceil(game.hp)}/{Math.ceil(game.maxHp)}
                  {game.shield > 0 ? ` +${Math.ceil(game.shield)}` : ""}
                </p>
              </div>
            </div>
            <div className="mt-1 h-2.5 overflow-hidden rounded-full bg-blood-deep">
              <div className="h-full bg-blood" style={{ width: `${hpP * 100}%` }} />
            </div>
            {game.shield > 0 && (
              <div className="mt-0.5 h-1 overflow-hidden rounded-full bg-ink">
                <div className="h-full bg-cyan" style={{ width: `${Math.min(100, (game.shield / game.maxHp) * 100)}%` }} />
              </div>
            )}
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-ink">
              <div className="h-full bg-cyan" style={{ width: `${game.energy}%` }} />
            </div>
          </div>
          <div className="text-right font-cond text-xs tabular text-mute">
            <p className="text-gold">{game.gold} G</p>
            <p>{biome.name}</p>
            <p>
              {game.roomType} · {game.floor + 1}
            </p>
            {game.technique && <p className="text-cyan">{game.technique.name}</p>}
          </div>
        </div>
        {boss && (
          <div className="mt-3">
            <p className="text-center font-display text-[12px] tracking-[0.2em] text-bone">
              {boss.kind === "widow" ? "THE IRON WIDOW" : boss.kind === "knight" ? "BLOOD KNIGHT" : "THE GATEKEEPER"}
            </p>
            <div className="mx-auto mt-1 h-2 max-w-[240px] overflow-hidden rounded-full bg-ink">
              <div className="h-full bg-blood" style={{ width: `${(boss.hp / boss.maxHp) * 100}%` }} />
            </div>
          </div>
        )}
        {game.combo >= 3 && (
          <p className="mt-2 text-center font-cond text-lg font-bold tabular text-bone">
            {game.combo} <span className="text-xs tracking-[0.2em] text-mute">COMBO</span>
          </p>
        )}
      </div>

      {game.tutorial && game.tutorialStep > 0 && game.tutorialStep < 7 && overlay === "none" && (
        <div className="pointer-events-none absolute inset-x-0 bottom-36 px-6 text-center">
          <p className="rounded-md border border-line bg-ink/80 px-3 py-2 font-cond text-sm text-bone">{TIPS[game.tutorialStep]}</p>
          <button
            type="button"
            className="pointer-events-auto mt-2 font-cond text-xs uppercase tracking-widest text-mute"
            onClick={() => {
              game.skipTutorial();
              setTick((n) => n + 1);
            }}
          >
            Skip
          </button>
        </div>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3">
        <div className="mb-2 flex justify-center gap-1">
          {game.blessings.slice(0, 10).map((b, i) => (
            <span key={b.id + i} className="h-1.5 w-1.5 rounded-full" style={{ background: RARITY_COLOR[b.rarity] }} />
          ))}
        </div>
      </div>

      {showTouch && overlay === "none" && <TouchPad game={game} leftHanded={game.meta.settings.leftHanded} lang={lang} />}

      {!showTouch && overlay === "none" && (
        <p className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 font-cond text-[11px] uppercase tracking-[0.18em] text-faint">
          WASD · Click/J ATK · Space dash · Q E T skills · Shift parry · R ult · Esc
        </p>
      )}

      <button
        type="button"
        className="absolute right-3 top-3 z-10 min-h-11 min-w-11 rounded-md border border-line bg-ink/80 px-2 py-1 font-cond text-[11px] uppercase tracking-widest text-mute"
        onClick={() => {
          game.overlay = game.overlay === "pause" ? "none" : "pause";
          setOverlay(game.overlay);
        }}
      >
        II
      </button>

      {overlay !== "none" && (
        <Overlay
          game={game}
          overlay={overlay}
          lang={lang}
          onClose={() => {
            if (overlay === "pause") game.overlay = "none";
            setOverlay(game.overlay);
          }}
          onExit={onExit}
          onRetry={onRetry}
          bump={() => setTick((n) => n + 1)}
        />
      )}
    </div>
  );
}

function cdRing(ready: boolean, ratio: number): string {
  if (ready) return "conic-gradient(#2ec4d6 0deg, #2ec4d6 360deg)";
  const deg = Math.max(0, Math.min(360, ratio * 360));
  return `conic-gradient(#e11d48 ${deg}deg, #2c2c38 ${deg}deg)`;
}

function TouchPad({ game, leftHanded, lang }: { game: Game; leftHanded: boolean; lang: "en" | "pl" }) {
  const stick = useRef<{ id: number; ox: number; oy: number } | null>(null);
  const [knob, setKnob] = useState({ x: 0, y: 0, on: false, lx: 72, ly: 0 });

  const onDown = (e: PE<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    stick.current = { id: e.pointerId, ox: e.clientX, oy: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
    setKnob({ x: 0, y: 0, on: true, lx: e.clientX - r.left, ly: e.clientY - r.top });
  };
  const onMove = (e: PE<HTMLDivElement>) => {
    if (!stick.current || stick.current.id !== e.pointerId) return;
    const dx = e.clientX - stick.current.ox;
    const dy = e.clientY - stick.current.oy;
    const max = 48;
    const len = Math.hypot(dx, dy);
    const k = len > max ? max / len : 1;
    const x = (dx * k) / max;
    const y = (dy * k) / max;
    game.input.move = { x, y, active: true };
    setKnob((s) => ({ ...s, x: dx * k, y: dy * k }));
  };
  const onUp = (e: PE<HTMLDivElement>) => {
    if (stick.current && stick.current.id !== e.pointerId) return;
    stick.current = null;
    game.input.move = { x: 0, y: 0, active: false };
    setKnob((s) => ({ ...s, on: false, x: 0, y: 0 }));
  };

  const skillBtn = (label: string, sub: string, ready: boolean, ratio: number, onClick: () => void) => (
    <button
      type="button"
      onPointerDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
        Sfx.click();
      }}
      className={
        "relative flex h-14 w-14 flex-col items-center justify-center rounded-full border text-[10px] font-cond uppercase tracking-wider " +
        (ready ? "border-line-strong bg-raised text-bone" : "border-line bg-ink text-faint")
      }
      style={{ minHeight: 56, minWidth: 56 }}
    >
      <span className="absolute inset-0 rounded-full opacity-40" style={{ background: cdRing(ready, ratio), mask: "radial-gradient(farthest-side, transparent 62%, #000 64%)", WebkitMask: "radial-gradient(farthest-side, transparent 62%, #000 64%)" }} />
      <span className="relative">{label}</span>
      <span className="relative text-[9px] text-mute">{sub}</span>
    </button>
  );

  const sk1Max = game.hero.skill1.cooldown;
  const sk2Max = game.hero.skill2.cooldown;
  const sk3Max = (game.technique ?? game.hero.skill3).cooldown;
  const tName = (game.technique ?? game.hero.skill3).name.split(" ")[0] ?? "T";

  const stickEl = (
    <div
      className="relative h-40 w-40 touch-none"
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
    >
      <div className="absolute inset-5 rounded-full border border-line bg-ink/50" />
      {knob.on && (
        <div
          className="absolute h-14 w-14 rounded-full border border-bone/40 bg-bone/20"
          style={{ left: 80 - 28 + knob.x, top: 80 - 28 + knob.y }}
        />
      )}
    </div>
  );

  const actions = (
    <div className="mb-2 mr-1 flex flex-col items-end gap-2 pb-[env(safe-area-inset-bottom)]">
      <div className="flex gap-2">
        {skillBtn("Q", game.hero.skill1.name.split(" ")[0] ?? "S1", game.sk1 <= 0, 1 - game.sk1 / sk1Max, () => {
          game.input.skill1Pressed = true;
          game.input.sk1Buf = 0.14;
        })}
        {skillBtn("E", game.hero.skill2.name.split(" ")[0] ?? "S2", game.sk2 <= 0, 1 - game.sk2 / sk2Max, () => {
          game.input.skill2Pressed = true;
          game.input.sk2Buf = 0.14;
        })}
        {skillBtn("T", tName, game.sk3 <= 0, 1 - game.sk3 / sk3Max, () => {
          game.input.skill3Pressed = true;
          game.input.sk3Buf = 0.14;
        })}
      </div>
      <div className="flex items-end gap-2">
        {skillBtn(t(lang, "parry"), "Shift", game.parryCd <= 0, 1 - game.parryCd / 1.55, () => {
          game.input.parryPressed = true;
          game.input.parryBuf = 0.14;
        })}
        {skillBtn(t(lang, "dash"), String(game.dashCharges), game.dashCharges > 0, game.dashCharges / Math.max(1, game.dashMax), () => {
          game.input.dashPressed = true;
          game.input.dashBuf = 0.14;
        })}
        <button
          type="button"
          onPointerDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            e.currentTarget.setPointerCapture(e.pointerId);
            game.input.attackHeld = true;
            game.input.attackPressed = true;
            game.input.atkBuf = 0.1;
          }}
          onPointerUp={(e) => {
            e.preventDefault();
            game.input.attackHeld = false;
          }}
          onPointerCancel={() => {
            game.input.attackHeld = false;
          }}
          className="flex h-[76px] w-[76px] items-center justify-center rounded-full border border-blood/60 bg-blood text-sm font-cond font-bold uppercase tracking-wider text-bone"
        >
          {t(lang, "attack")}
        </button>
        {skillBtn("R", t(lang, "ult"), game.energy >= 100, game.energy / 100, () => {
          game.input.ultPressed = true;
        })}
      </div>
    </div>
  );

  return (
    <div
      className={
        "absolute inset-x-0 bottom-0 flex items-end justify-between px-2 pb-2 " + (leftHanded ? "flex-row-reverse" : "")
      }
      style={{ paddingBottom: "max(8px, env(safe-area-inset-bottom))" }}
    >
      {stickEl}
      {actions}
    </div>
  );
}

function Overlay({
  game,
  overlay,
  lang,
  onClose,
  onExit,
  onRetry,
  bump,
}: {
  game: Game;
  overlay: RunOverlay;
  lang: "en" | "pl";
  onClose: () => void;
  onExit: () => void;
  onRetry: () => void;
  bump: () => void;
}) {
  if (overlay === "pause") {
    return (
      <Scrim>
        <Panel className="mx-6 w-full max-w-sm p-5">
          <h3 className="font-display text-xl">{t(lang, "paused")}</h3>
          <p className="mt-2 text-xs leading-relaxed text-mute">
            WASD move · J/click attack · Space dash · Q E T skills · Shift parry · R ult
          </p>
          <div className="mt-4 flex flex-col gap-2">
            <Btn variant="primary" wide className="min-h-12" onClick={onClose}>
              {t(lang, "resume")}
            </Btn>
            <Btn wide className="min-h-12" onClick={onExit}>
              {t(lang, "camp")}
            </Btn>
          </div>
        </Panel>
      </Scrim>
    );
  }
  if (overlay === "technique") {
    return (
      <Scrim>
        <div className="mx-4 w-full max-w-md">
          <h3 className="mb-1 text-center font-display text-xl">{t(lang, "technique")}</h3>
          <p className="mb-3 text-center text-sm text-mute">One extra form for this descent. Bound to T.</p>
          <div className="flex flex-col gap-2">
            {game.techniqueChoices.map((b, i) => (
              <button
                type="button"
                key={b.id}
                onClick={() => {
                  game.pickTechnique(b.id);
                  Sfx.bless();
                  bump();
                }}
                className="min-h-14 rounded-lg border bg-panel p-3 text-left hover:border-line-strong"
                style={{ borderColor: b.color + "66" }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-cond font-semibold text-bone">
                    {i + 1}. {b.name}
                  </span>
                  <Tag color={b.color}>{b.rarity}</Tag>
                </div>
                <p className="mt-1 text-sm text-mute">{b.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </Scrim>
    );
  }
  if (overlay === "blessing") {
    return (
      <Scrim>
        <div className="mx-4 w-full max-w-md">
          <h3 className="mb-3 text-center font-display text-xl">{t(lang, "blessing")}</h3>
          <div className="flex flex-col gap-2">
            {game.blessingChoices.map((b, i) => (
              <button
                type="button"
                key={b.id}
                onClick={() => {
                  game.pickBlessing(b.id);
                  Sfx.bless();
                  bump();
                }}
                className="min-h-14 rounded-lg border bg-panel p-3 text-left hover:border-line-strong"
                style={{ borderColor: RARITY_COLOR[b.rarity] + "66" }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-cond font-semibold text-bone">
                    {i + 1}. {b.name}
                  </span>
                  <Tag color={RARITY_COLOR[b.rarity]}>{RARITY_LABEL[b.rarity]}</Tag>
                </div>
                <p className="mt-1 text-sm text-mute">{b.desc}</p>
              </button>
            ))}
            <Btn
              wide
              className="min-h-11"
              disabled={game.gold < 25}
              onClick={() => {
                if (game.rerollBlessings()) {
                  Sfx.ui();
                  bump();
                }
              }}
            >
              Reroll · 25 G
            </Btn>
          </div>
        </div>
      </Scrim>
    );
  }
  if (overlay === "map") {
    const cur = game.graph[game.floor]?.[game.node];
    const next = game.graph[game.floor + 1] ?? [];
    return (
      <Scrim>
        <div className="mx-4 w-full max-w-md">
          <h3 className="mb-1 text-center font-display text-xl">{t(lang, "path")}</h3>
          <p className="mb-4 text-center text-sm text-mute">Choose the next chamber.</p>
          <div className="flex flex-col gap-2">
            {next.map((n, i) => {
              const open = cur?.next.includes(n.index);
              return (
                <Btn
                  key={n.id}
                  wide
                  className="min-h-12"
                  disabled={!open}
                  variant={n.type === "boss" ? "danger" : n.type === "elite" ? "gold" : "ghost"}
                  onClick={() => {
                    game.pickNode(n.index);
                    Sfx.ui();
                    bump();
                  }}
                >
                  {i + 1}. {labelRoom(n.type)}
                </Btn>
              );
            })}
          </div>
        </div>
      </Scrim>
    );
  }
  if (overlay === "event" && game.event) {
    const ev = game.event;
    return (
      <Scrim>
        <Panel className="mx-4 max-w-md p-5">
          <p className="font-cond text-[11px] uppercase tracking-[0.2em] text-mute">{ev.speaker}</p>
          <h3 className="font-display text-xl text-bone">{ev.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-mute">{ev.dialog}</p>
          <div className="mt-4 flex flex-col gap-2">
            {ev.choices.map((c, i) => (
              <Btn
                key={c.label}
                wide
                className="min-h-12"
                onClick={() => {
                  game.pickEvent(i);
                  Sfx.ui();
                  bump();
                }}
              >
                {i + 1}. {c.label}
              </Btn>
            ))}
          </div>
        </Panel>
      </Scrim>
    );
  }
  if (overlay === "shop") {
    return (
      <Scrim>
        <Panel className="mx-4 max-w-md p-5">
          <h3 className="font-display text-xl">Pale Merchant</h3>
          <p className="text-sm text-gold">{game.gold} gold on you</p>
          <div className="mt-3 flex flex-col gap-2">
            {game.shop.map((o, i) => (
              <Btn
                key={o.title + i}
                wide
                className="min-h-12"
                disabled={game.gold < o.cost}
                onClick={() => {
                  game.buyShop(i);
                  bump();
                }}
              >
                {o.title} · {o.cost} G
                <span className="block text-[11px] font-normal text-mute">{o.desc}</span>
              </Btn>
            ))}
            <Btn
              wide
              variant="primary"
              className="min-h-12"
              onClick={() => {
                game.leaveShop();
                bump();
              }}
            >
              Leave
            </Btn>
          </div>
        </Panel>
      </Scrim>
    );
  }
  if (overlay === "chest") {
    return (
      <Scrim>
        <div className="mx-4 w-full max-w-md">
          <h3 className="mb-3 text-center font-display text-xl">Take one</h3>
          <div className="flex flex-col gap-2">
            {game.chestRewards.map((r, i) => (
              <Btn
                key={r.title + i}
                wide
                variant="gold"
                className="min-h-12"
                onClick={() => {
                  game.pickChest(i);
                  bump();
                }}
              >
                {i + 1}. {r.title}
                <span className="block text-[11px] font-normal text-mute">{r.desc}</span>
              </Btn>
            ))}
          </div>
        </div>
      </Scrim>
    );
  }
  if (overlay === "defeat" || overlay === "victory") {
    const win = overlay === "victory";
    const s = game.stats;
    return (
      <Scrim>
        <Panel className="mx-4 max-w-md p-5 text-center">
          <p className="font-cond text-[11px] uppercase tracking-[0.28em] text-mute">
            {win ? "Dungeon cleared" : "The blade falls"}
          </p>
          <h3 className="font-display mt-2 text-3xl">{win ? t(lang, "cleared") : t(lang, "youDied")}</h3>
          <div className="mt-4 grid grid-cols-2 gap-2 font-cond text-sm tabular">
            <Stat k="Time" v={fmtTime(s.time)} />
            <Stat k="Kills" v={String(s.kills)} />
            <Stat k="Combo" v={String(s.maxCombo)} />
            <Stat k="Damage" v={String(Math.round(s.damage))} />
            <Stat k="Gold" v={String(s.gold)} />
            <Stat k="Score" v={String(s.score)} />
          </div>
          <div className="mt-5 flex flex-col gap-2">
            <Btn variant="primary" wide className="min-h-12" onClick={onRetry}>
              {t(lang, "tryAgain")}
            </Btn>
            <Btn wide className="min-h-12" onClick={onExit}>
              {t(lang, "camp")}
            </Btn>
          </div>
        </Panel>
      </Scrim>
    );
  }
  return null;
}

function Scrim({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-void/75 p-3 backdrop-blur-[2px]">
      {children}
    </div>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-md border border-line bg-ink px-2 py-2">
      <p className="text-[10px] uppercase tracking-widest text-mute">{k}</p>
      <p className="text-bone">{v}</p>
    </div>
  );
}

function labelRoom(tpe: string) {
  return tpe.toUpperCase();
}

function fmtTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}
