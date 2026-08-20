import { useEffect, useRef, useState } from "react";
import { useMeta } from "@/game/store";
import { Game } from "@/game/engine";
import { applyAudioSettings, setMusic, unlockAudio } from "@/game/audio";
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
    return () => {
      window.removeEventListener("pointerdown", boot);
      window.removeEventListener("keydown", boot);
    };
  }, []);

  const startRun = () => {
    applied.current = false;
    const g = new Game(useMeta.getState().save);
    g.startRun();
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
      startRun();
      return;
    }
    setGame(null);
    setScreen("hub");
    setMusic("menu");
  };

  const inRun = screen === "run" && game;

  return (
    <div className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-void">
      {!inRun && <Backdrop showHero={screen === "menu"} />}
      <div className="relative z-10 flex h-[100dvh] w-full max-w-[480px] flex-col overflow-hidden border-x border-line/80 bg-ink/80 shadow-[0_0_80px_rgba(0,0,0,0.65)] backdrop-blur-[1px] max-[480px]:border-x-0">
        <div className="relative h-full">
          {screen === "menu" && <MainMenu onPlay={() => setScreen("hub")} />}
          {screen === "hub" && <Hub onRun={startRun} />}
          {screen === "heroes" && <HeroesScreen />}
          {screen === "equipment" && <EquipmentScreen />}
          {screen === "legacy" && <LegacyScreen />}
          {screen === "missions" && <MissionsScreen />}
          {screen === "codex" && <CodexScreen />}
          {screen === "collection" && <CollectionScreen />}
          {screen === "settings" && <SettingsScreen />}
          {inRun && game && <RunView game={game} onExit={() => endRun(false)} onRetry={() => endRun(true)} />}
        </div>
      </div>
    </div>
  );
}
