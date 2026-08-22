import { useEffect, useRef, useState } from "react";
import { useMeta } from "@/game/store";
import { Game } from "@/game/engine";
import { applyAudioSettings, setMusic, unlockAudio } from "@/game/audio";
import { readDevice, type DeviceInfo } from "@/game/device";
import type { ChallengeId } from "@/game/types";
import {
  CollectionScreen,
  CodexScreen,
  EquipmentScreen,
  HeroesScreen,
  Hub,
  LegacyScreen,
  MainMenu,
  MissionsScreen,
  SettingsScreen,
} from "./Screens";
import { RunView } from "./RunView";
import { Backdrop } from "./Backdrop";

export function GameApp() {
  const hydrate = useMeta((s) => s.hydrate);
  const screen = useMeta((s) => s.screen);
  const setScreen = useMeta((s) => s.setScreen);
  const save = useMeta((s) => s.save);
  const applyRun = useMeta((s) => s.applyRun);
  const [game, setGame] = useState<Game | null>(null);
  const [device, setDevice] = useState<DeviceInfo>(() => readDevice());
  const applied = useRef(false);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    applyAudioSettings(save.settings);
  }, [save.settings]);

  useEffect(() => {
    const boot = () => unlockAudio();
    window.addEventListener("pointerdown", boot, { once: true });
    window.addEventListener("keydown", boot, { once: true });
    const onResize = () => setDevice(readDevice());
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      window.removeEventListener("pointerdown", boot);
      window.removeEventListener("keydown", boot);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);

  const startRun = (challenge: ChallengeId = "none") => {
    applied.current = false;
    const g = new Game(useMeta.getState().save);
    g.startRun({ challenge });
    setGame(g);
    setScreen("run");
    setMusic("dungeon");
  };

  const endRun = (retry: boolean) => {
    if (game && !applied.current) {
      applied.current = true;
      applyRun(game.stats.gold, game.stats.gems, game.stats.kills, game.stats.score, game.overlay === "victory");
    }
    if (retry) {
      startRun(game?.challenge ?? "none");
      return;
    }
    setGame(null);
    setScreen("hub");
    setMusic("menu");
  };

  const inRun = screen === "run" && game;
  const wide = device.kind === "desktop";
  const scale = save.settings.uiScale || 1;

  return (
    <div className="relative flex min-h-[100dvh] w-full items-stretch justify-center overflow-hidden bg-void">
      {!inRun && <Backdrop showHero={screen === "menu"} />}
      {wide && !inRun && (
        <aside className="relative z-10 hidden w-[220px] shrink-0 flex-col justify-end p-6 lg:flex">
          <p className="font-cond text-[11px] uppercase tracking-[0.28em] text-faint">ONE LIFE</p>
          <p className="mt-2 font-display text-lg text-bone">The Threshold</p>
          <p className="mt-3 text-sm leading-relaxed text-mute">Portrait-first on every screen. Keyboard, touch, and pad share one blade.</p>
        </aside>
      )}
      <div
        className={
          "relative z-10 flex h-[100dvh] w-full flex-col overflow-hidden border-line/80 bg-ink/85 shadow-[0_0_80px_rgba(0,0,0,0.65)] backdrop-blur-[1px] " +
          (wide ? "max-w-[480px] border-x" : "max-w-[560px] max-[560px]:max-w-none max-[560px]:border-x-0")
        }
        style={{
          paddingTop: "env(safe-area-inset-top)",
          paddingBottom: "env(safe-area-inset-bottom)",
          transform: scale !== 1 ? `scale(${scale})` : undefined,
          transformOrigin: "top center",
        }}
      >
        <div className="relative h-full min-h-0">
          {screen === "menu" && <MainMenu onPlay={() => setScreen("hub")} />}
          {screen === "hub" && <Hub onRun={startRun} />}
          {screen === "heroes" && <HeroesScreen />}
          {screen === "equipment" && <EquipmentScreen />}
          {screen === "legacy" && <LegacyScreen />}
          {screen === "missions" && <MissionsScreen />}
          {screen === "codex" && <CodexScreen />}
          {screen === "collection" && <CollectionScreen />}
          {screen === "settings" && <SettingsScreen />}
          {inRun && game && <RunView game={game} onExit={() => endRun(false)} onRetry={() => endRun(true)} device={device} />}
        </div>
      </div>
      {wide && (
        <aside className="relative z-10 hidden w-[240px] shrink-0 flex-col justify-center gap-4 p-6 lg:flex">
          {inRun && game ? (
            <>
              <p className="font-cond text-[11px] uppercase tracking-[0.22em] text-mute">Desktop</p>
              <ul className="space-y-1 font-cond text-sm text-bone">
                <li>WASD / stick — move</li>
                <li>Click / J / A — attack</li>
                <li>Space / B — dash</li>
                <li>Q E T — skills</li>
                <li>R / RB — ultimate</li>
                <li>Shift / LB — parry</li>
                <li>Esc — pause · 1 2 3 — pick</li>
              </ul>
              <div className="rounded-lg border border-line bg-panel/80 p-3">
                <p className="font-cond text-xs uppercase tracking-widest text-mute">Run</p>
                <p className="mt-1 text-sm text-bone">
                  {game.hero.name} · {game.gold} G · {game.combo} combo
                </p>
                {game.technique && <p className="mt-1 text-xs text-cyan">{game.technique.name}</p>}
              </div>
            </>
          ) : (
            <>
              <p className="font-cond text-[11px] uppercase tracking-[0.22em] text-mute">One blade. One chance.</p>
              <p className="text-sm leading-relaxed text-mute">
                Easy to learn. Hard to master. Blessings stack. Techniques rewrite the hunt.
              </p>
            </>
          )}
        </aside>
      )}
    </div>
  );
}
