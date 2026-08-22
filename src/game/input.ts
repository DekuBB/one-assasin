export type Stick = { x: number; y: number; active: boolean };

const GAME_CODES = new Set([
  "Space",
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "KeyW",
  "KeyA",
  "KeyS",
  "KeyD",
  "KeyQ",
  "KeyE",
  "KeyR",
  "KeyT",
  "KeyF",
  "KeyJ",
  "KeyP",
  "ShiftLeft",
  "ShiftRight",
  "Digit1",
  "Digit2",
  "Digit3",
]);

function radialDeadzone(x: number, y: number, dz = 0.18) {
  const m = Math.hypot(x, y);
  if (m < dz) return { x: 0, y: 0 };
  const scale = ((m - dz) / (1 - dz)) / m;
  return { x: x * scale, y: y * scale };
}

export class Input {
  keys = new Set<string>();
  qaKeys = new Set<string>();
  move: Stick = { x: 0, y: 0, active: false };
  aim: Stick = { x: 0, y: 0, active: false };
  pointer = { x: 0, y: 0, down: false };
  attackHeld = false;
  attackPressed = false;
  dashPressed = false;
  skill1Pressed = false;
  skill2Pressed = false;
  skill3Pressed = false;
  ultPressed = false;
  pausePressed = false;
  parryPressed = false;
  pickIndex = -1;
  leftHanded = false;
  padMove = { x: 0, y: 0 };
  padAim = { x: 0, y: 0 };
  usingPad = false;
  dashBuf = 0;
  atkBuf = 0;
  sk1Buf = 0;
  sk2Buf = 0;
  sk3Buf = 0;
  parryBuf = 0;
  private padPrev: boolean[] = [];
  private unbind: Array<() => void> = [];

  attach(el: HTMLElement) {
    this.detach();
    const kd = (e: KeyboardEvent) => {
      if (e.repeat) return;
      this.keys.add(e.code);
      if (GAME_CODES.has(e.code)) e.preventDefault();
      if (e.code === "KeyP" || e.code === "Escape") this.pausePressed = true;
      if (e.code === "Space") {
        this.dashPressed = true;
        this.dashBuf = 0.14;
      }
      if (e.code === "KeyQ") {
        this.skill1Pressed = true;
        this.sk1Buf = 0.14;
      }
      if (e.code === "KeyE") {
        this.skill2Pressed = true;
        this.sk2Buf = 0.14;
      }
      if (e.code === "KeyT" || e.code === "KeyF") {
        this.skill3Pressed = true;
        this.sk3Buf = 0.14;
      }
      if (e.code === "KeyR") this.ultPressed = true;
      if (e.code === "ShiftLeft" || e.code === "ShiftRight") {
        this.parryPressed = true;
        this.parryBuf = 0.14;
      }
      if (e.code === "Digit1") this.pickIndex = 0;
      if (e.code === "Digit2") this.pickIndex = 1;
      if (e.code === "Digit3") this.pickIndex = 2;
      if (e.code === "KeyJ") {
        this.attackPressed = true;
        this.atkBuf = 0.1;
      }
    };
    const ku = (e: KeyboardEvent) => {
      this.keys.delete(e.code);
    };
    const blur = () => {
      this.keys.clear();
      this.attackHeld = false;
      this.pointer.down = false;
      this.move = { x: 0, y: 0, active: false };
    };
    const pd = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      if (e.pointerType === "mouse") {
        this.pointer.down = true;
        this.attackHeld = true;
        this.attackPressed = true;
        this.atkBuf = 0.1;
      }
      const r = el.getBoundingClientRect();
      this.pointer.x = e.clientX - r.left;
      this.pointer.y = e.clientY - r.top;
    };
    const pu = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      this.pointer.down = false;
      if (e.pointerType === "mouse") this.attackHeld = false;
    };
    const pm = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      this.pointer.x = e.clientX - r.left;
      this.pointer.y = e.clientY - r.top;
    };
    const vis = () => {
      if (document.hidden) blur();
    };
    const contextmenu = (e: Event) => e.preventDefault();
    window.addEventListener("keydown", kd);
    window.addEventListener("keyup", ku);
    window.addEventListener("blur", blur);
    document.addEventListener("visibilitychange", vis);
    el.addEventListener("pointerdown", pd);
    window.addEventListener("pointerup", pu);
    window.addEventListener("pointercancel", pu);
    el.addEventListener("pointermove", pm);
    el.addEventListener("contextmenu", contextmenu);
    this.unbind = [
      () => window.removeEventListener("keydown", kd),
      () => window.removeEventListener("keyup", ku),
      () => window.removeEventListener("blur", blur),
      () => document.removeEventListener("visibilitychange", vis),
      () => el.removeEventListener("pointerdown", pd),
      () => window.removeEventListener("pointerup", pu),
      () => window.removeEventListener("pointercancel", pu),
      () => el.removeEventListener("pointermove", pm),
      () => el.removeEventListener("contextmenu", contextmenu),
    ];
  }

  detach() {
    for (const u of this.unbind) u();
    this.unbind = [];
  }

  pollGamepad() {
    if (typeof navigator === "undefined" || !navigator.getGamepads) return;
    const pads = navigator.getGamepads();
    let any = false;
    for (const gp of pads) {
      if (!gp) continue;
      any = true;
      const ls = radialDeadzone(gp.axes[0] ?? 0, gp.axes[1] ?? 0);
      this.padMove = ls;
      const rs = radialDeadzone(gp.axes[2] ?? 0, gp.axes[3] ?? 0, 0.22);
      this.padAim = rs;
      const pressed = gp.buttons.map((b) => b.pressed);
      const edge = (i: number) => pressed[i] && !this.padPrev[i];
      if (pressed[0]) {
        this.attackHeld = true;
        if (edge(0)) {
          this.attackPressed = true;
          this.atkBuf = 0.1;
        }
      }
      if (edge(1)) {
        this.dashPressed = true;
        this.dashBuf = 0.14;
      }
      if (edge(2)) {
        this.skill1Pressed = true;
        this.sk1Buf = 0.14;
      }
      if (edge(3)) {
        this.skill2Pressed = true;
        this.sk2Buf = 0.14;
      }
      if (edge(4)) {
        this.parryPressed = true;
        this.parryBuf = 0.14;
      }
      if (edge(5)) this.ultPressed = true;
      if (edge(6)) {
        this.skill3Pressed = true;
        this.sk3Buf = 0.14;
      }
      if (edge(9) || edge(8)) this.pausePressed = true;
      if (edge(12)) this.padMove.y -= 1;
      if (edge(13)) this.padMove.y += 1;
      if (gp.buttons[14]?.pressed) this.padMove.x -= 1;
      if (gp.buttons[15]?.pressed) this.padMove.x += 1;
      this.padPrev = pressed;
    }
    this.usingPad = any;
    if (!any) {
      this.padMove = { x: 0, y: 0 };
      this.padAim = { x: 0, y: 0 };
    }
  }

  axis(): { x: number; y: number } {
    let x = this.move.x + this.padMove.x;
    let y = this.move.y + this.padMove.y;
    const k = this.mergedKeys();
    if (k.has("KeyA") || k.has("ArrowLeft")) x -= 1;
    if (k.has("KeyD") || k.has("ArrowRight")) x += 1;
    if (k.has("KeyW") || k.has("ArrowUp")) y -= 1;
    if (k.has("KeyS") || k.has("ArrowDown")) y += 1;
    const len = Math.hypot(x, y);
    if (len > 1) {
      x /= len;
      y /= len;
    }
    return { x, y };
  }

  wantAttack(): boolean {
    return this.attackHeld || this.attackPressed || this.atkBuf > 0 || this.mergedKeys().has("KeyJ") || this.pointer.down;
  }

  wantDash(): boolean {
    return this.dashPressed || this.dashBuf > 0;
  }

  wantSkill1(): boolean {
    return this.skill1Pressed || this.sk1Buf > 0;
  }

  wantSkill2(): boolean {
    return this.skill2Pressed || this.sk2Buf > 0;
  }

  wantSkill3(): boolean {
    return this.skill3Pressed || this.sk3Buf > 0;
  }

  wantParry(): boolean {
    return this.parryPressed || this.parryBuf > 0;
  }

  private mergedKeys() {
    if (this.qaKeys.size === 0) return this.keys;
    const s = new Set(this.keys);
    for (const c of this.qaKeys) s.add(c);
    return s;
  }

  tick(dt: number) {
    this.dashBuf = Math.max(0, this.dashBuf - dt);
    this.atkBuf = Math.max(0, this.atkBuf - dt);
    this.sk1Buf = Math.max(0, this.sk1Buf - dt);
    this.sk2Buf = Math.max(0, this.sk2Buf - dt);
    this.sk3Buf = Math.max(0, this.sk3Buf - dt);
    this.parryBuf = Math.max(0, this.parryBuf - dt);
  }

  consumeDash() {
    this.dashPressed = false;
    this.dashBuf = 0;
  }

  consumeSkill(n: 1 | 2 | 3) {
    if (n === 1) {
      this.skill1Pressed = false;
      this.sk1Buf = 0;
    } else if (n === 2) {
      this.skill2Pressed = false;
      this.sk2Buf = 0;
    } else {
      this.skill3Pressed = false;
      this.sk3Buf = 0;
    }
  }

  consumeParry() {
    this.parryPressed = false;
    this.parryBuf = 0;
  }

  endFrame() {
    this.attackPressed = false;
    this.dashPressed = false;
    this.skill1Pressed = false;
    this.skill2Pressed = false;
    this.skill3Pressed = false;
    this.ultPressed = false;
    this.pausePressed = false;
    this.parryPressed = false;
    this.pickIndex = -1;
  }
}
