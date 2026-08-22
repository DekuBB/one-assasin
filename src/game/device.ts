export type DeviceKind = "phone" | "tablet" | "desktop";

export interface DeviceInfo {
  kind: DeviceKind;
  coarse: boolean;
  touch: boolean;
  width: number;
  height: number;
  portrait: boolean;
}

export function readDevice(): DeviceInfo {
  if (typeof window === "undefined") {
    return { kind: "desktop", coarse: false, touch: false, width: 1280, height: 720, portrait: false };
  }
  const width = window.innerWidth;
  const height = window.innerHeight;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const maxTouch = navigator.maxTouchPoints || 0;
  const kind: DeviceKind = width < 640 ? "phone" : width < 1100 ? "tablet" : "desktop";
  const touch = coarse || (maxTouch > 0 && width < 1100);
  return { kind, coarse, touch, width, height, portrait: height >= width };
}

export function shouldShowTouch(force?: boolean): boolean {
  if (force) return true;
  const d = readDevice();
  return d.coarse || (d.touch && d.kind !== "desktop");
}
