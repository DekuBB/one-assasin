export type Stick = { x: number; y: number; active: boolean };

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
  ultPressed = false;
  pausePressed = false;
  leftHanded = false;
  private unbind: Array<() => void> = [];

  attach(el: HTMLElement) {
    this.detach();
    const kd = (e: KeyboardEvent) => {
      this.keys.add(e.code);
      if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) e.preventDefault();
      if (e.code === "KeyP" || e.code === "Escape") this.pausePressed = true;
      if (e.code === "Space") this.dashPressed = true;
      if (e.code === "KeyQ") this.skill1Pressed = true;
      if (e.code === "KeyE") this.skill2Pressed = true;
      if (e.code === "KeyR") this.ultPressed = true;
    };
    const ku = (e: KeyboardEvent) => {
      this.keys.delete(e.code);
    };
    const blur = () => this.keys.clear();
    const md = (e: MouseEvent) => {
      if (e.button === 0 || e.button === 2) {
        this.pointer.down = true;
        this.attackHeld = true;
        this.attackPressed = true;
      }
    };
    const mu = (e: MouseEvent) => {
      if (e.button === 0 || e.button === 2) {
        this.pointer.down = false;
        this.attackHeld = false;
      }
    };
    const mm = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      this.pointer.x = e.clientX - r.left;
      this.pointer.y = e.clientY - r.top;
    };
    const contextmenu = (e: MouseEvent) => e.preventDefault();
    window.addEventListener("keydown", kd);
    window.addEventListener("keyup", ku);
    window.addEventListener("blur", blur);
    el.addEventListener("mousedown", md);
    el.addEventListener("contextmenu", contextmenu);
    window.addEventListener("mouseup", mu);
    el.addEventListener("mousemove", mm);
    this.unbind = [
      () => window.removeEventListener("keydown", kd),
      () => window.removeEventListener("keyup", ku),
      () => window.removeEventListener("blur", blur),
      () => el.removeEventListener("mousedown", md),
      () => el.removeEventListener("contextmenu", contextmenu),
      () => window.removeEventListener("mouseup", mu),
      () => el.removeEventListener("mousemove", mm),
    ];
  }

  detach() {
    for (const u of this.unbind) u();
    this.unbind = [];
  }

  axis(): { x: number; y: number } {
    let x = this.move.x;
    let y = this.move.y;
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
    return this.attackHeld || this.attackPressed || this.mergedKeys().has("KeyJ") || this.pointer.down;
  }

  wantDash(): boolean {
    return this.dashPressed;
  }

  private mergedKeys() {
    if (this.qaKeys.size === 0) return this.keys;
    const s = new Set(this.keys);
    for (const c of this.qaKeys) s.add(c);
    return s;
  }

  endFrame() {
    this.attackPressed = false;
    this.dashPressed = false;
    this.skill1Pressed = false;
    this.skill2Pressed = false;
    this.ultPressed = false;
    this.pausePressed = false;
  }
}
