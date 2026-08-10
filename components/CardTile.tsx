"use client";

import { useState, useEffect } from "react";
import { Unit } from "@/data/units";
import { RARITY_META } from "@/data/rarity";

function hash(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function initials(name: string) {
  const clean = name.replace(/\(.*?\)/g, "").trim();
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function Emblem({ unit, hex }: { unit: Unit; hex: string }) {
  const seed = hash(unit.id);
  const rotate = seed % 360;
  const points = 5 + (seed % 3);
  const radius = 30;
  const cx = 40;
  const cy = 40;
  const path = Array.from({ length: points })
    .map((_, i) => {
      const angle = (Math.PI * 2 * i) / points - Math.PI / 2;
      const r = radius * (0.75 + ((seed >> i) % 5) / 16);
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 80 80" className="h-14 w-14" aria-hidden="true">
      <polygon
        points={path}
        fill={`${hex}33`}
        stroke={hex}
        strokeWidth="1.25"
        transform={`rotate(${rotate} ${cx} ${cy})`}
      />
      <circle cx={cx} cy={cy} r="3" fill={hex} />
    </svg>
  );
}

export default function CardTile({ unit, onOpen, compact = false }: { unit: Unit & { imageCandidates?: string[] }; onOpen?: (u: Unit) => void; compact?: boolean }) {
  const meta = RARITY_META[unit.rarity];
  const imageCandidates = unit.imageCandidates ?? (unit.image ? [unit.image] : []);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPressed, setIsPressed] = useState(false);
  const currentImage = imageCandidates[currentImageIndex];
  const showImage = Boolean(currentImage);
  const isMythic = unit.rarity === "Mythic";
  const isAldedo = unit.name === "Aldedo";

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [unit.id]);

  const cardClasses = `group relative flex ${compact ? "h-full w-full" : "flex-col"} overflow-hidden rounded-[1.35rem] border border-white/10 bg-gradient-to-b from-ink-surface/95 via-ink-surface/90 to-ink-surface2/95 shadow-[0_16px_40px_-18px_rgba(0,0,0,0.8)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_24px_50px_-18px_rgba(0,0,0,0.85)] ${meta.border} cursor-pointer ${isPressed ? "scale-[0.97] -translate-y-0.5 shadow-[0_12px_24px_-14px_rgba(0,0,0,0.7)]" : ""}`;
  const innerCardClasses = `relative flex ${compact ? "h-full w-full" : "flex-col"} overflow-hidden rounded-2xl bg-transparent`;
  const imageAreaClasses = compact ? "relative flex aspect-[4/5] items-center justify-center overflow-hidden" : "relative flex h-28 items-center justify-center overflow-hidden";
  const bodyClasses = compact ? "flex flex-1 flex-col justify-end gap-1 p-2.5" : "flex flex-1 flex-col gap-1.5 p-2.5";
  const titleClasses = compact ? "truncate font-body text-[10px] font-semibold text-text sm:text-xs" : "truncate font-body text-xs font-semibold text-text sm:text-sm";
  const badgeClasses = compact ? "w-fit rounded-full border px-2 py-0.5 font-mono text-[8px] font-bold uppercase tracking-wider" : "w-fit rounded-full border px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider";

  return (
    <div
      onClick={() => onOpen?.(unit)}
      onPointerDown={() => setIsPressed(true)}
      onPointerUp={() => setIsPressed(false)}
      onPointerLeave={() => setIsPressed(false)}
      onPointerCancel={() => setIsPressed(false)}
      role="button"
      tabIndex={0}
      className={cardClasses}
      style={isMythic ? {
        borderColor: "rgba(244, 114, 182, 0.7)",
        boxShadow: "0 0 0 1px rgba(192, 132, 252, 0.15) inset",
      } : undefined}
      onKeyDown={(e) => {
        if (e.key === "Enter") onOpen?.(unit);
      }}
    >
      <div
        className={innerCardClasses}
      >
        <div
          className={imageAreaClasses}
          style={isMythic ? {
            background: `linear-gradient(135deg, ${meta.hex}26 0%, rgba(255,255,255,0.06) 100%)`,
          } : { background: `linear-gradient(135deg, ${meta.hex}16 0%, rgba(255,255,255,0.05) 100%)` }}
      >
        {showImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={currentImage}
            alt={unit.name}
            className={`h-full w-full ${isAldedo ? "object-contain object-center scale-[0.9]" : "object-contain"}`}
            loading="lazy"
            onError={() => {
              if (currentImageIndex + 1 < imageCandidates.length) {
                setCurrentImageIndex(currentImageIndex + 1);
              }
            }}
          />
        ) : (
          <>
            <Emblem unit={unit} hex={meta.hex} />
            <span
              className="absolute bottom-1.5 right-2 font-display text-lg tracking-wide"
              style={isMythic ? {
                backgroundImage: "linear-gradient(90deg, #ef4444, #f59e0b, #eab308, #22c55e, #06b6d4, #6366f1, #c026d3)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
                opacity: 1,
                textShadow: "0 0 10px rgba(255,255,255,0.25)",
              } : { color: meta.hex }}
            >
              {initials(unit.name)}
            </span>
          </>
        )}

        <span className="absolute left-0 top-0 h-full w-1" style={isMythic ? { background: "linear-gradient(180deg, #f472b6, #a78bfa, #22d3ee)" } : { backgroundColor: meta.hex }} />
        <span className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/45 to-transparent" />
      </div>

      <div className={bodyClasses}>
        <h3 className={titleClasses}>{unit.name}</h3>
        <span
          className={badgeClasses}
          style={isMythic ? { color: meta.hex, borderColor: `${meta.hex}66`, backgroundColor: `${meta.hex}14` } : { color: meta.hex, borderColor: `${meta.hex}66`, backgroundColor: `${meta.hex}14` }}
        >
          {unit.rarity}
        </span>
      </div>
    </div>
  </div>
  );
}
