import { useEffect, useRef } from "react";
import { useMeta } from "@/game/store";
import { getAtlas } from "@/game/sprites";
import { HEROES } from "@/game/data/heroes";
import {
  ACHIEVEMENTS,
  BLESSINGS,
  EQUIP_BY_ID,
  EQUIPMENT,
  LEGACY,
  MISSIONS,
  RARITY_COLOR,
  RARITY_LABEL,
  SYNERGIES,
} from "@/game/data/catalog";
import { TECHNIQUES } from "@/game/data/techniques";
import { Sfx, setMusic, unlockAudio } from "@/game/audio";
import { t } from "@/game/i18n";
import { Back, Btn, Currency, Panel, Tag } from "./ui";
import type { ChallengeId, HeroId, Settings } from "@/game/types";

function HeroMark() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const atlas = getAtlas();
    const spr = atlas.heroes.zero.idle;
    const scale = 5;
    c.width = spr.width * scale;
    c.height = spr.height * scale;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(spr, 0, 0, c.width, c.height);
  }, []);
  return <canvas ref={ref} className="mb-2 h-[72px] w-[72px]" style={{ imageRendering: "pixelated" }} />;
}

export function MainMenu({ onPlay }: { onPlay: () => void }) {
  const save = useMeta((s) => s.save);
  const setScreen = useMeta((s) => s.setScreen);
  const claimLogin = useMeta((s) => s.claimLogin);
  const hero = HEROES.find((h) => h.id === save.selectedHero)!;

  return (
    <div className="flex h-full flex-col px-5 pb-8 pt-6">
      <div className="flex items-center justify-between">
        <Currency gold={save.gold} gems={save.gems} />
        <button
          type="button"
          className="font-cond text-xs uppercase tracking-[0.18em] text-mute"
          onClick={() => setScreen("settings")}
        >
          Settings
        </button>
      </div>

      <div className="mt-6 flex flex-1 flex-col items-center justify-center text-center">
        <HeroMark />
        <p className="font-cond text-[11px] uppercase tracking-[0.42em] text-mute">Dark fantasy roguelike</p>
        <h1 className="font-display mt-3 text-[34px] font-bold leading-none text-bone">
          ONE
          <span className="block text-blood">ASSASIN</span>
        </h1>
        <p className="mt-4 font-cond text-[13px] uppercase tracking-[0.28em] text-mute">
          One life. One blade. One chance.
        </p>
        <div className="mt-8 h-px w-24 bg-blood/70" />
        <p className="mt-5 max-w-[260px] text-[13px] leading-relaxed text-mute">
          {hero.name} — {hero.title}. {save.runs} descents. Best {save.bestScore}.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {!save.claimedLogin && (
          <Btn variant="gold" wide className="min-h-12" onClick={() => { unlockAudio(); Sfx.ui(); claimLogin(); }}>
            {t(save.settings.language, "daily")}
          </Btn>
        )}
        <Btn
          variant="primary"
          wide
          className="py-3.5 text-[17px] min-h-12"
          onClick={() => {
            unlockAudio();
            Sfx.ui();
            setMusic("menu");
            onPlay();
          }}
        >
          {t(save.settings.language, "descend")}
        </Btn>
        <div className="grid grid-cols-2 gap-2">
          <Btn onClick={() => { Sfx.click(); setScreen("heroes"); }}>Assassins</Btn>
          <Btn onClick={() => { Sfx.click(); setScreen("equipment"); }}>Armory</Btn>
          <Btn onClick={() => { Sfx.click(); setScreen("legacy"); }}>Legacy</Btn>
          <Btn onClick={() => { Sfx.click(); setScreen("missions"); }}>Bounties</Btn>
          <Btn onClick={() => { Sfx.click(); setScreen("codex"); }}>Codex</Btn>
          <Btn onClick={() => { Sfx.click(); setScreen("collection"); }}>Marks</Btn>
        </div>
      </div>
    </div>
  );
}

export function Hub({ onRun }: { onRun: (challenge?: ChallengeId) => void }) {
  const save = useMeta((s) => s.save);
  const setScreen = useMeta((s) => s.setScreen);
  const hero = HEROES.find((h) => h.id === save.selectedHero)!;
  const lang = save.settings.language;

  const spots: { title: string; sub: string; go: () => void }[] = [
    { title: "Campfire", sub: "Change assassin", go: () => setScreen("heroes") },
    { title: "Blacksmith", sub: "Temper steel", go: () => setScreen("equipment") },
    { title: "Mystic", sub: "Blessing memory", go: () => setScreen("codex") },
    { title: "Altar", sub: "Assassin Legacy", go: () => setScreen("legacy") },
    { title: "Bounty board", sub: "Daily vows", go: () => setScreen("missions") },
  ];

  return (
    <div className="flex h-full min-h-0 flex-col px-5 pb-6 pt-5">
      <div className="flex items-center justify-between">
        <Back onClick={() => setScreen("menu")} label="Menu" />
        <Currency gold={save.gold} gems={save.gems} />
      </div>
      <h2 className="font-display mt-4 text-2xl text-bone">The Threshold</h2>
      <p className="mt-1 text-sm text-mute">A ruined camp above the citadel. The portal waits.</p>

      <Panel className="mt-5 p-4">
        <p className="font-cond text-[11px] uppercase tracking-[0.2em] text-mute">Ready</p>
        <p className="mt-1 font-display text-lg text-bone">{hero.name}</p>
        <p className="text-sm text-mute">
          {hero.role} · Lv {save.heroLevels[hero.id]} · {hero.title}
        </p>
        <Btn variant="primary" wide className="mt-4 min-h-12 py-3" onClick={() => { unlockAudio(); Sfx.ui(); onRun("none"); }}>
          {t(lang, "enter")}
        </Btn>
        <div className="mt-2 grid grid-cols-3 gap-2">
          <Btn className="min-h-11 px-2 py-2 text-xs" onClick={() => { unlockAudio(); Sfx.ui(); onRun("daily"); }}>
            Daily
          </Btn>
          <Btn className="min-h-11 px-2 py-2 text-xs" onClick={() => { unlockAudio(); Sfx.ui(); onRun("glass"); }}>
            Glass
          </Btn>
          <Btn className="min-h-11 px-2 py-2 text-xs" onClick={() => { unlockAudio(); Sfx.ui(); onRun("speed"); }}>
            Speed
          </Btn>
        </div>
      </Panel>

      <div className="mt-4 flex flex-1 flex-col gap-2 overflow-auto">
        {spots.map((s) => (
          <button
            type="button"
            key={s.title}
            onClick={() => { Sfx.click(); s.go(); }}
            className="flex min-h-12 items-center justify-between rounded-lg border border-line bg-ink px-4 py-3 text-left hover:border-line-strong"
          >
            <span>
              <span className="block font-cond text-[15px] font-semibold text-bone">{s.title}</span>
              <span className="text-xs text-mute">{s.sub}</span>
            </span>
            <span className="text-mute">→</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function HeroesScreen() {
  const save = useMeta((s) => s.save);
  const setScreen = useMeta((s) => s.setScreen);
  const selectHero = useMeta((s) => s.selectHero);
  const unlockHero = useMeta((s) => s.unlockHero);

  return (
    <div className="flex h-full flex-col px-5 pb-6 pt-5">
      <div className="flex items-center justify-between">
        <Back onClick={() => setScreen("hub")} />
        <Currency gold={save.gold} gems={save.gems} />
      </div>
      <h2 className="font-display mt-4 text-2xl">Assassins</h2>
      <div className="mt-3 flex-1 space-y-3 overflow-auto pr-1">
        {HEROES.map((h) => {
          const locked = !save.unlockedHeroes.includes(h.id);
          const selected = save.selectedHero === h.id;
          return (
            <Panel key={h.id} className={"p-4 " + (selected ? "border-blood/60" : "")}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-lg" style={{ color: h.accent }}>
                    {h.name}
                  </p>
                  <p className="font-cond text-xs uppercase tracking-[0.16em] text-mute">{h.title}</p>
                </div>
                <Tag color={h.accent}>{h.role}</Tag>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-mute">{h.blurb}</p>
              <p className="mt-2 font-cond text-xs text-faint">
                HP {h.hp} · ATK {h.attack} · {h.skill1.name} / {h.skill2.name} / {h.skill3.name}
              </p>
              {locked ? (
                <Btn
                  wide
                  className="mt-3"
                  variant="gold"
                  onClick={() => {
                    const ok = unlockHero(h.id as HeroId);
                    Sfx.ui();
                    if (!ok) Sfx.hurt();
                  }}
                >
                  Unlock · {h.unlockGold} G · {h.unlockGems} ◆
                </Btn>
              ) : (
                <Btn
                  wide
                  className="mt-3"
                  variant={selected ? "primary" : "ghost"}
                  onClick={() => { selectHero(h.id); Sfx.click(); }}
                >
                  {selected ? "Selected" : "Take the blade"}
                </Btn>
              )}
            </Panel>
          );
        })}
      </div>
    </div>
  );
}

export function EquipmentScreen() {
  const save = useMeta((s) => s.save);
  const setScreen = useMeta((s) => s.setScreen);
  const equipItem = useMeta((s) => s.equipItem);
  const upgradeItem = useMeta((s) => s.upgradeItem);
  const sellItem = useMeta((s) => s.sellItem);
  const mergeItems = useMeta((s) => s.mergeItems);

  return (
    <div className="flex h-full min-h-0 flex-col px-5 pb-6 pt-5">
      <div className="flex items-center justify-between">
        <Back onClick={() => setScreen("hub")} />
        <Currency gold={save.gold} gems={save.gems} />
      </div>
      <h2 className="font-display mt-4 text-2xl">Armory</h2>
      <div className="mt-3 flex-1 space-y-2 overflow-auto pr-1">
        {save.inventory.map((it) => {
          const def = EQUIP_BY_ID[it.defId];
          if (!def) return null;
          const equipped = save.equipped[def.slot] === it.uid;
          const cost = it.level * 80 + 50;
          const twin = save.inventory.find((o) => o.uid !== it.uid && o.defId === it.defId);
          return (
            <Panel key={it.uid} className={"p-3 " + (equipped ? "border-gold/40" : "")}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-cond text-[15px] font-semibold text-bone">{def.name}</p>
                  <p className="text-xs text-mute">
                    {def.slot} · Lv {it.level}
                  </p>
                </div>
                <Tag color={RARITY_COLOR[def.rarity]}>{RARITY_LABEL[def.rarity]}</Tag>
              </div>
              <p className="mt-1 font-cond text-xs text-faint">
                {def.attack ? `ATK ${Math.round((def.attack ?? 0) * (1 + (it.level - 1) * 0.15))} ` : ""}
                {def.hp ? `HP ${Math.round((def.hp ?? 0) * (1 + (it.level - 1) * 0.15))} ` : ""}
                {def.perk ?? ""}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Btn className="min-h-11 flex-1 py-2 text-sm" variant={equipped ? "primary" : "ghost"} onClick={() => equipItem(it.uid)}>
                  {equipped ? "Worn" : "Equip"}
                </Btn>
                <Btn className="min-h-11 flex-1 py-2 text-sm" onClick={() => upgradeItem(it.uid)}>
                  Temper {cost} G
                </Btn>
                {twin && (
                  <Btn className="min-h-11 py-2 text-sm" variant="gold" onClick={() => mergeItems(it.uid, twin.uid)}>
                    Merge
                  </Btn>
                )}
                {!equipped && (
                  <Btn className="min-h-11 py-2 text-sm" variant="danger" onClick={() => sellItem(it.uid)}>
                    Sell
                  </Btn>
                )}
              </div>
            </Panel>
          );
        })}
        <p className="pb-4 pt-2 text-center text-xs text-faint">Find new steel in treasure rooms and boss chests. Merge twins to raise level.</p>
      </div>
    </div>
  );
}

export function LegacyScreen() {
  const save = useMeta((s) => s.save);
  const setScreen = useMeta((s) => s.setScreen);
  const buyLegacy = useMeta((s) => s.buyLegacy);
  return (
    <div className="flex h-full flex-col px-5 pb-6 pt-5">
      <div className="flex items-center justify-between">
        <Back onClick={() => setScreen("hub")} />
        <Currency gold={save.gold} gems={save.gems} />
      </div>
      <h2 className="font-display mt-4 text-2xl">Assassin Legacy</h2>
      <p className="mt-1 text-sm text-mute">Permanent strength paid in blood-gold.</p>
      <div className="mt-3 flex-1 space-y-2 overflow-auto">
        {LEGACY.map((l) => {
          const lv = save.legacy[l.id] ?? 0;
          const cost = l.base + lv * l.step;
          return (
            <Panel key={l.id} className="p-3">
              <div className="flex items-center justify-between">
                <p className="font-cond font-semibold text-bone">{l.name}</p>
                <span className="font-cond text-xs text-mute">
                  {lv}/{l.max}
                </span>
              </div>
              <p className="text-xs text-mute">{l.desc}</p>
              <Btn wide className="mt-2 py-2 text-sm" disabled={lv >= l.max} onClick={() => buyLegacy(l.id)}>
                {lv >= l.max ? "Maxed" : `Raise · ${cost} G`}
              </Btn>
            </Panel>
          );
        })}
      </div>
    </div>
  );
}

export function MissionsScreen() {
  const save = useMeta((s) => s.save);
  const setScreen = useMeta((s) => s.setScreen);
  const claimMission = useMeta((s) => s.claimMission);
  const claimAchievement = useMeta((s) => s.claimAchievement);
  return (
    <div className="flex h-full flex-col px-5 pb-6 pt-5">
      <div className="flex items-center justify-between">
        <Back onClick={() => setScreen("hub")} />
        <Currency gold={save.gold} gems={save.gems} />
      </div>
      <h2 className="font-display mt-4 text-2xl">Bounties</h2>
      <div className="mt-3 flex-1 space-y-2 overflow-auto">
        {MISSIONS.map((m) => {
          const st = save.missions[m.id] ?? { count: 0, claimed: false, day: "" };
          const done = st.count >= m.target;
          return (
            <Panel key={m.id} className="p-3">
              <p className="font-cond font-semibold text-bone">{m.title}</p>
              <p className="text-xs text-mute">{m.desc}</p>
              <p className="mt-1 font-cond text-xs tabular text-faint">
                {Math.min(st.count, m.target)}/{m.target} · {m.gold} G · {m.gems} ◆
              </p>
              <Btn
                wide
                className="mt-2 py-2 text-sm"
                variant={done && !st.claimed ? "gold" : "ghost"}
                disabled={!done || st.claimed}
                onClick={() => claimMission(m.id)}
              >
                {st.claimed ? "Claimed" : done ? "Claim" : "In progress"}
              </Btn>
            </Panel>
          );
        })}
        <h3 className="font-display pt-2 text-lg">Marks of the Guild</h3>
        {ACHIEVEMENTS.map((a) => {
          const st = save.achievements[a.id] ?? { count: 0, claimed: false };
          const done = st.count >= a.target;
          return (
            <Panel key={a.id} className="p-3">
              <p className="font-cond font-semibold text-bone">{a.title}</p>
              <p className="text-xs text-mute">{a.desc}</p>
              <p className="mt-1 font-cond text-xs text-faint">
                {Math.min(st.count, a.target)}/{a.target}
              </p>
              <Btn
                wide
                className="mt-2 py-2 text-sm"
                disabled={!done || st.claimed}
                variant={done && !st.claimed ? "gold" : "ghost"}
                onClick={() => claimAchievement(a.id)}
              >
                {st.claimed ? "Sealed" : done ? `Claim ${a.gems} ◆` : "Locked"}
              </Btn>
            </Panel>
          );
        })}
      </div>
    </div>
  );
}

export function CodexScreen() {
  const save = useMeta((s) => s.save);
  const setScreen = useMeta((s) => s.setScreen);
  return (
    <div className="flex h-full flex-col px-5 pb-6 pt-5">
      <Back onClick={() => setScreen("hub")} />
      <h2 className="font-display mt-4 text-2xl">Blessing Codex</h2>
      <p className="text-sm text-mute">
        {save.discoveredBlessings.length}/{BLESSINGS.length} witnessed
      </p>
      <div className="mt-3 flex-1 space-y-2 overflow-auto">
        {BLESSINGS.map((b) => {
          const known = save.discoveredBlessings.includes(b.id);
          return (
            <Panel key={b.id} className="p-3">
              <div className="flex items-center justify-between">
                <p className="font-cond font-semibold text-bone">{known ? b.name : "????"}</p>
                <Tag color={RARITY_COLOR[b.rarity]}>{RARITY_LABEL[b.rarity]}</Tag>
              </div>
              <p className="text-xs text-mute">{known ? b.desc : "Not yet found in the dark."}</p>
            </Panel>
          );
        })}
        <h3 className="font-display pt-2 text-lg">Forbidden combinations</h3>
        {SYNERGIES.map((s) => (
          <Panel key={s.id} className="p-3">
            <p className="font-cond font-semibold text-forbidden">{s.name}</p>
            <p className="text-xs text-mute">{s.desc}</p>
          </Panel>
        ))}
        <h3 className="font-display pt-2 text-lg">Techniques</h3>
        {TECHNIQUES.map((tech) => {
          const known = save.discoveredTechniques?.includes(tech.id);
          return (
            <Panel key={tech.id} className="p-3">
              <div className="flex items-center justify-between">
                <p className="font-cond font-semibold text-bone">{known ? tech.name : "????"}</p>
                <Tag color={tech.color}>{tech.rarity}</Tag>
              </div>
              <p className="text-xs text-mute">{known ? tech.desc : "Not yet chosen on a descent."}</p>
            </Panel>
          );
        })}
      </div>
    </div>
  );
}

export function CollectionScreen() {
  const save = useMeta((s) => s.save);
  const setScreen = useMeta((s) => s.setScreen);
  return (
    <div className="flex h-full flex-col px-5 pb-6 pt-5">
      <Back onClick={() => setScreen("menu")} />
      <h2 className="font-display mt-4 text-2xl">Collection</h2>
      <Panel className="mt-4 p-4">
        <p className="font-cond text-sm text-mute">Descents</p>
        <p className="font-display text-2xl tabular">{save.runs}</p>
        <div className="mt-3 grid grid-cols-2 gap-3 font-cond text-sm">
          <div>
            <p className="text-mute">Victories</p>
            <p className="text-lg text-bone">{save.victories}</p>
          </div>
          <div>
            <p className="text-mute">Kills</p>
            <p className="text-lg text-bone">{save.kills}</p>
          </div>
          <div>
            <p className="text-mute">Best score</p>
            <p className="text-lg text-gold">{save.bestScore}</p>
          </div>
          <div>
            <p className="text-mute">Assassins</p>
            <p className="text-lg text-bone">{save.unlockedHeroes.length}/6</p>
          </div>
        </div>
      </Panel>
      <p className="mt-4 text-sm text-mute">Steel in vault: {save.inventory.length} pieces. Catalog {EQUIPMENT.length}.</p>
    </div>
  );
}

export function SettingsScreen() {
  const save = useMeta((s) => s.save);
  const setScreen = useMeta((s) => s.setScreen);
  const setSettings = useMeta((s) => s.setSettings);
  const s = save.settings;
  const toggle = (k: keyof Settings) => setSettings({ [k]: !s[k] } as Partial<Settings>);
  return (
    <div className="flex h-full flex-col px-5 pb-6 pt-5">
      <Back onClick={() => setScreen("menu")} />
      <h2 className="font-display mt-4 text-2xl">Settings</h2>
      <div className="mt-4 space-y-4">
        <Slider label="Master" value={s.master} onChange={(v) => setSettings({ master: v })} />
        <Slider label="Music" value={s.music} onChange={(v) => setSettings({ music: v })} />
        <Slider label="Effects" value={s.sfx} onChange={(v) => setSettings({ sfx: v })} />
        <Slider label="UI scale" value={s.uiScale} onChange={(v) => setSettings({ uiScale: Math.max(0.85, Math.min(1.15, v * 0.3 + 0.85)) })} />
        <Toggle label="Screen shake" on={s.shake} onClick={() => toggle("shake")} />
        <Toggle label="Damage numbers" on={s.numbers} onClick={() => toggle("numbers")} />
        <Toggle label="Haptics" on={s.haptics} onClick={() => toggle("haptics")} />
        <Toggle label="Flash effects" on={s.flash} onClick={() => toggle("flash")} />
        <Toggle label="Auto aim" on={s.autoAim} onClick={() => toggle("autoAim")} />
        <Toggle label="Low effects" on={s.lowFx} onClick={() => toggle("lowFx")} />
        <Toggle label="Left-handed" on={s.leftHanded} onClick={() => toggle("leftHanded")} />
        <Toggle label="Always show touch controls" on={s.showTouch} onClick={() => toggle("showTouch")} />
        <div className="flex gap-2">
          <Btn className="flex-1" variant={s.language === "en" ? "primary" : "ghost"} onClick={() => setSettings({ language: "en" })}>
            English
          </Btn>
          <Btn className="flex-1" variant={s.language === "pl" ? "primary" : "ghost"} onClick={() => setSettings({ language: "pl" })}>
            Polski
          </Btn>
        </div>
      </div>
    </div>
  );
}

function Slider({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <label className="block">
      <span className="font-cond text-xs uppercase tracking-[0.16em] text-mute">
        {label} {Math.round(value * 100)}
      </span>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1 w-full accent-blood"
      />
    </label>
  );
}

function Toggle({ label, on, onClick }: { label: string; on: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="flex w-full items-center justify-between rounded-md border border-line bg-ink px-3 py-2">
      <span className="text-sm text-bone">{label}</span>
      <span className={"font-cond text-xs uppercase tracking-widest " + (on ? "text-ok" : "text-mute")}>
        {on ? "On" : "Off"}
      </span>
    </button>
  );
}
