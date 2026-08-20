import type { ReactNode } from "react";

export function Panel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        "rounded-xl border border-line bg-panel/90 shadow-[0_12px_40px_rgba(0,0,0,0.45)] " + className
      }
    >
      {children}
    </div>
  );
}

export function Btn({
  children,
  onClick,
  variant = "ghost",
  disabled,
  className = "",
  wide,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "danger" | "gold";
  disabled?: boolean;
  className?: string;
  wide?: boolean;
}) {
  const v =
    variant === "primary"
      ? "bg-blood text-bone hover:bg-blood/90 border-blood-dim"
      : variant === "danger"
        ? "bg-blood-deep text-bone border-blood-dim"
        : variant === "gold"
          ? "bg-gold/15 text-gold border-gold/40 hover:bg-gold/25"
          : "bg-raised text-bone border-line hover:border-line-strong hover:bg-panel";
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={
        "rounded-md border px-4 py-2.5 font-cond text-[15px] font-semibold tracking-wide transition-colors duration-150 disabled:opacity-40 " +
        (wide ? "w-full " : "") +
        v +
        " " +
        className
      }
    >
      {children}
    </button>
  );
}

export function Tag({ children, color }: { children: ReactNode; color?: string }) {
  return (
    <span
      className="rounded-sm border px-1.5 py-0.5 font-cond text-[11px] font-semibold uppercase tracking-[0.14em]"
      style={{
        color: color ?? "#8c877e",
        borderColor: color ? color + "66" : "#2c2c38",
      }}
    >
      {children}
    </span>
  );
}

export function Bar({
  value,
  max,
  color,
  className = "",
}: {
  value: number;
  max: number;
  color: string;
  className?: string;
}) {
  const p = max <= 0 ? 0 : Math.max(0, Math.min(1, value / max));
  return (
    <div className={"h-2 overflow-hidden rounded-full bg-void " + className}>
      <div className="h-full rounded-full transition-[width] duration-150" style={{ width: `${p * 100}%`, background: color }} />
    </div>
  );
}

export function Currency({ gold, gems }: { gold: number; gems: number }) {
  return (
    <div className="flex items-center gap-3 font-cond text-sm tabular">
      <span className="text-gold">{gold} G</span>
      <span className="text-cyan">{gems} ◆</span>
    </div>
  );
}

export function Back({ onClick, label = "Back" }: { onClick: () => void; label?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="font-cond text-sm font-semibold uppercase tracking-[0.16em] text-mute hover:text-bone"
    >
      ← {label}
    </button>
  );
}
