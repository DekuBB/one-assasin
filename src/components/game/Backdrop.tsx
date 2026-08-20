import { useEffect, useRef } from "react";
import { getAtlas } from "@/game/sprites";

export function Backdrop({ showHero = false }: { showHero?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let raf = 0;
    let t = 0;
    const loop = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        canvas.style.width = w + "px";
        canvas.style.height = h + "px";
      }
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = false;
      ctx.fillStyle = "#08080c";
      ctx.fillRect(0, 0, w, h);
      t += 0.008;
      // bricks
      const tw = 28;
      const th = 14;
      for (let y = 0; y < h + th; y += th) {
        const off = ((y / th) | 0) % 2 ? tw / 2 : 0;
        for (let x = -tw; x < w + tw; x += tw) {
          const n = Math.sin((x + y) * 0.05) * 0.5 + 0.5;
          ctx.fillStyle = n > 0.55 ? "#14141c" : "#101018";
          ctx.fillRect(x + off, y, tw - 1, th - 1);
        }
      }
      // crimson wash
      const g = ctx.createRadialGradient(w * 0.5, h * 0.35, 20, w * 0.5, h * 0.4, Math.max(w, h) * 0.7);
      g.addColorStop(0, "rgba(225,29,72,0.10)");
      g.addColorStop(0.45, "rgba(8,8,12,0.2)");
      g.addColorStop(1, "rgba(8,8,12,0.92)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
      // motes
      ctx.fillStyle = "rgba(236,230,220,0.18)";
      for (let i = 0; i < 18; i++) {
        const mx = ((i * 97 + t * 30) % (w + 40)) - 20;
        const my = (i * 53 + Math.sin(t + i) * 20) % h;
        ctx.fillRect(mx, my, 2, 2);
      }
      if (showHero) {
        try {
          const atlas = getAtlas();
          const spr = atlas.heroes.zero.idle;
          const scale = Math.min(8, Math.floor(Math.min(w, h) / 42));
          const sw = spr.width * scale;
          const sh = spr.height * scale;
          ctx.globalAlpha = 0.95;
          ctx.drawImage(spr, (w - sw) / 2, h * 0.28, sw, sh);
          ctx.globalAlpha = 1;
        } catch {
          /* atlas needs DOM */
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [showHero]);
  return <canvas ref={ref} className="pointer-events-none absolute inset-0 h-full w-full" />;
}
