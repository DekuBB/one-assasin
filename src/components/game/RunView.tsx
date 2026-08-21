import { useEffect, useRef, useState, type PointerEvent as PE } from "react";
import { Game, WORLD_H, WORLD_W } from "@/game/engine";
import { renderGame } from "@/game/render";
import { BIOMES } from "@/game/data/catalog";
import { RARITY_COLOR, RARITY_LABEL } from "@/game/data/catalog";
import { Sfx } from "@/game/audio";
import { Btn, Panel, Tag } from "./ui";
import type { RunOverlay } from "@/game/types";

const TIPS = [
  "",
  "Move — WASD or left stick",
  "Attack — click / J / right button",
  "Dash — Space / dash button. I-frames.",
  "Skill — Q and E",
  "Pick a blessing. Build the night.",
  "Walk into the cyan gate to continue.",
];

export function RunView({
  game,
  onExit,
  onRetry,
}: {
  game: Game;
  onExit: () => void;
  onRetry: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [overlay, setOverlay] = useState<RunOverlay>(game.overlay);
  const [tick, setTick] = useState(0);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    game.input.attach(wrap);
    let raf = 0;
    let last = performance.now();
    let acc = 0;
    const loop = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      game.update(dt);
      const dpr = Math.min(2, window.devicePixelRatio || 1);
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
    // overlay in deps would restart loop; we sync via setOverlay inside rAF
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game]);

  const st = game.statsCache;
  const hpP = game.maxHp > 0 ? game.hp / game.maxHp : 0;
  const biome = BIOMES[game.biome];
  const boss = game.enemies.find((e) => e.alive && (e.kind === "gatekeeper" || e.kind === "widow" || e.kind === "knight"));
  void tick;
  void WORLD_W;
  void WORLD_H;

  return (
    <div ref={wrapRef} className="relative h-full w-full overflow-hidden bg-void" style={{ touchAction: "none" }}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      <div className="pointer-events-none absolute inset-x-0 top-0 p-3">
        <div className="flex items-start justify-between gap-2 pr-10">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 overflow-hidden rounded-md border border-line bg-ink" style={{ background: game.hero.accent + "33" }} />
              <div>
                <p className="font-cond text-[11px] uppercase tracking-[0.16em] text-mute">{game.hero.name}</p>
                <p className="font-cond text-xs tabular text-bone">
                  {Math.ceil(game.hp)}/{Math.ceil(game.maxHp)}
                </p>
              </div>
            </div>
            <div className="mt-1 h-2.5 overflow-hidden rounded-full bg-blood-deep">
              <div className="h-full bg-blood" style={{ width: `${hpP * 100}%` }} />
            </div>
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
          </div>
        </div>
        {boss && (
          <div className="mt-3">
            <p className="text-center font-display text-[12px] tracking-[0.2em] text-bone">{boss.kind === "widow" ? "THE IRON WIDOW" : boss.kind === "knight" ? "BLOOD KNIGHT" : "THE GATEKEEPER"}</p>
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
        <div className="pointer-events-none absolute inset-x-0 bottom-24 px-6 text-center">
          <p className="rounded-md border border-line bg-ink/80 px-3 py-2 font-cond text-sm text-bone">
            {TIPS[game.tutorialStep]}
          </p>
        </div>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3">
        <div className="mb-2 flex justify-center gap-1">
          {game.blessings.slice(0, 8).map((b) => (
            <span key={b.id + b.name} className="h-1.5 w-1.5 rounded-full" style={{ background: RARITY_COLOR[b.rarity] }} />
          ))}
        </div>
      </div>

      {isTouch && overlay === "none" && <TouchPad game={game} leftHanded={game.meta.settings.leftHanded} />}

      {!isTouch && overlay === "none" && (
        <p className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 font-cond text-[11px] uppercase tracking-[0.18em] text-faint">
          WASD move · Click attack · Space dash · Q E skills · R ult · Esc pause
        </p>
      )}

      <button
        type="button"
        className="absolute right-3 top-3 z-10 rounded-md border border-line bg-ink/80 px-2 py-1 font-cond text-[11px] uppercase tracking-widest text-mute"
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

function TouchPad({ game, leftHanded }: { game: Game; leftHanded: boolean }) {
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
    const max = 42;
    const len = Math.hypot(dx, dy);
    const k = len > max ? max / len : 1;
    const x = (dx * k) / max;
    const y = (dy * k) / max;
    game.input.move = { x, y, active: true };
    setKnob((s) => ({ ...s, x: dx * k, y: dy * k }));
  };
  const onUp = () => {
    stick.current = null;
    game.input.move = { x: 0, y: 0, active: false };
    setKnob((s) => ({ ...s, on: false, x: 0, y: 0 }));
  };

  const skillBtn = (label: string, sub: string, ready: boolean, onClick: () => void) => (
    <button
      type="button"
      onPointerDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!ready) return;
        onClick();
        Sfx.click();
      }}
      className={
        "flex h-14 w-14 flex-col items-center justify-center rounded-full border text-[10px] font-cond uppercase tracking-wider " +
        (ready ? "border-line-strong bg-raised text-bone" : "border-line bg-ink text-faint")
      }
    >
      {label}
      <span className="text-[9px] text-mute">{sub}</span>
    </button>
  );

  const stickEl = (
    <div
      className="relative h-36 w-36"
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
    >
      <div className="absolute inset-4 rounded-full border border-line bg-ink/50" />
      {knob.on && (
        <div
          className="absolute h-12 w-12 rounded-full border border-bone/40 bg-bone/20"
          style={{ left: 72 - 24 + knob.x, top: 72 - 24 + knob.y }}
        />
      )}
    </div>
  );

  const actions = (
    <div className="mb-2 mr-2 flex flex-col items-end gap-2">
      <div className="flex gap-2">
        {skillBtn("Q", game.hero.skill1.name.split(" ")[0] ?? "S1", game.sk1 <= 0, () => {
          game.input.skill1Pressed = true;
        })}
        {skillBtn("E", game.hero.skill2.name.split(" ")[0] ?? "S2", game.sk2 <= 0, () => {
          game.input.skill2Pressed = true;
        })}
      </div>
      <div className="flex items-end gap-2">
        {skillBtn("Dash", String(game.dashCharges), game.dashCharges > 0, () => {
          game.input.dashPressed = true;
        })}
        <button
          type="button"
          onPointerDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            game.input.attackHeld = true;
            game.input.attackPressed = true;
            e.currentTarget.setPointerCapture(e.pointerId);
          }}
          onPointerUp={(e) => {
            e.preventDefault();
            game.input.attackHeld = false;
          }}
          onPointerCancel={() => {
            game.input.attackHeld = false;
          }}
          onPointerLeave={(e) => {
            if (e.currentTarget.hasPointerCapture(e.pointerId)) return;
            game.input.attackHeld = false;
          }}
          className="flex h-20 w-20 items-center justify-center rounded-full border border-blood/60 bg-blood text-sm font-cond font-bold uppercase tracking-wider text-bone"
        >
          ATK
        </button>
        {skillBtn("R", "Ult", game.energy >= 100, () => {
          game.input.ultPressed = true;
        })}
      </div>
    </div>
  );

  return (
    <div className={"absolute inset-x-0 bottom-0 flex items-end justify-between px-2 pb-2 " + (leftHanded ? "flex-row-reverse" : "")}>
      {stickEl}
      {actions}
    </div>
  );
}

function Overlay({
  game,
  overlay,
  onClose,
  onExit,
  onRetry,
  bump,
}: {
  game: Game;
  overlay: RunOverlay;
  onClose: () => void;
  onExit: () => void;
  onRetry: () => void;
  bump: () => void;
}) {
  if (overlay === "pause") {
    return (
      <Scrim>
        <Panel className="mx-6 w-full max-w-sm p-5">
          <h3 className="font-display text-xl">Paused</h3>
          <div className="mt-4 flex flex-col gap-2">
            <Btn variant="primary" wide onClick={onClose}>
              Resume
            </Btn>
            <Btn wide onClick={onExit}>
              Return to camp
            </Btn>
          </div>
        </Panel>
      </Scrim>
    );
  }
  if (overlay === "blessing") {
    return (
      <Scrim>
        <div className="mx-4 w-full max-w-md">
          <h3 className="mb-3 text-center font-display text-xl">A blessing in the dark</h3>
          <div className="flex flex-col gap-2">
            {game.blessingChoices.map((b) => (
              <button
                type="button"
                key={b.id}
                onClick={() => {
                  game.pickBlessing(b.id);
                  Sfx.bless();
                  bump();
                }}
                className="rounded-lg border bg-panel p-3 text-left hover:border-line-strong"
                style={{ borderColor: RARITY_COLOR[b.rarity] + "66" }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-cond font-semibold text-bone">{b.name}</span>
                  <Tag color={RARITY_COLOR[b.rarity]}>{RARITY_LABEL[b.rarity]}</Tag>
                </div>
                <p className="mt-1 text-sm text-mute">{b.desc}</p>
              </button>
            ))}
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
          <h3 className="mb-1 text-center font-display text-xl">Path of the blade</h3>
          <p className="mb-4 text-center text-sm text-mute">Choose the next chamber.</p>
          <div className="flex flex-col gap-2">
            {next.map((n) => {
              const open = cur?.next.includes(n.index);
              return (
                <Btn
                  key={n.id}
                  wide
                  disabled={!open}
                  variant={n.type === "boss" ? "danger" : n.type === "elite" ? "gold" : "ghost"}
                  onClick={() => {
                    game.pickNode(n.index);
                    Sfx.ui();
                    bump();
                  }}
                >
                  {labelRoom(n.type)} · {n.type}
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
                onClick={() => {
                  game.pickEvent(i);
                  Sfx.ui();
                  bump();
                }}
              >
                {c.label}
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
                onClick={() => {
                  game.pickChest(i);
                  bump();
                }}
              >
                {r.title}
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
          <h3 className="font-display mt-2 text-3xl">{win ? "CLEARED" : "YOU DIED"}</h3>
          <div className="mt-4 grid grid-cols-2 gap-2 font-cond text-sm tabular">
            <Stat k="Time" v={fmtTime(s.time)} />
            <Stat k="Kills" v={String(s.kills)} />
            <Stat k="Combo" v={String(s.maxCombo)} />
            <Stat k="Damage" v={String(Math.round(s.damage))} />
            <Stat k="Gold" v={String(s.gold)} />
            <Stat k="Score" v={String(s.score)} />
          </div>
          <div className="mt-5 flex flex-col gap-2">
            <Btn variant="primary" wide onClick={onRetry}>
              Try again
            </Btn>
            <Btn wide onClick={onExit}>
              Return to camp
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

function labelRoom(t: string) {
  return t.toUpperCase();
}

function fmtTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}
