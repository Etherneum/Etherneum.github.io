"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/components/LanguageProvider";

type Ripple = {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
};

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { reduceMotion, lowGraphics } = useLanguage();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    let ripples: Ripple[] = [];
    let zoom = 1;
    let targetZoom = 1;
    let rafId = 0;
    let running = true;
    const mouse = { x: -9999, y: -9999, active: false, radius: 140 };

    const createParticle = () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      radius: Math.random() * 1.4 + 0.7,
    });

    const syncParticleCount = () => {
      const targetCount = Math.min(120, Math.max(70, Math.floor((width / 18) * zoom)));
      while (particles.length < targetCount) particles.push(createParticle());
      while (particles.length > targetCount) particles.pop();
    };

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      syncParticleCount();
    };

    const spawnRipple = (x: number, y: number) => {
      ripples.push({
        x,
        y,
        radius: 8,
        maxRadius: Math.max(width, height) * 0.38,
        alpha: 0.95,
      });
    };

    const draw = () => {
      if (!running) return;
      zoom += (targetZoom - zoom) * 0.028;
      syncParticleCount();

      ctx.clearRect(0, 0, width, height);

      const background = ctx.createLinearGradient(0, 0, width, height);
      background.addColorStop(0, "#040711");
      background.addColorStop(0.45, "#080d1d");
      background.addColorStop(1, "#111322");
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, width, height);

      const glow = ctx.createRadialGradient(width * 0.78, height * 0.22, 0, width * 0.78, height * 0.22, Math.max(width, height) * 0.55);
      glow.addColorStop(0, "rgba(248, 113, 113, 0.18)");
      glow.addColorStop(0.45, "rgba(248, 113, 113, 0.08)");
      glow.addColorStop(1, "rgba(248, 113, 113, 0)");
      ctx.beginPath();
      ctx.arc(width * 0.78, height * 0.22, Math.max(width, height) * 0.55, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10 || p.x > width + 10) p.vx *= -1;
        if (p.y < -10 || p.y > height + 10) p.vy *= -1;

        for (const ripple of ripples) {
          const dx = p.x - ripple.x;
          const dy = p.y - ripple.y;
          const dist = Math.hypot(dx, dy);
          const influence = Math.max(0, 1 - dist / (ripple.radius + 90));

          if (influence > 0) {
            const push = influence * 0.011;
            const nx = dx / (dist || 1);
            const ny = dy / (dist || 1);
            p.vx += nx * push;
            p.vy += ny * push;
          }
        }

        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          const influence = Math.max(0, 1 - dist / mouse.radius);

          if (influence > 0) {
            const push = influence * 0.015;
            const nx = dx / (dist || 1);
            const ny = dy / (dist || 1);
            p.vx += nx * push;
            p.vy += ny * push;
          }
        }

        p.vx *= 0.98;
        p.vy *= 0.98;
      }

      const scaledParticles = particles.map((p) => {
        const sx = width / 2 + (p.x - width / 2) * zoom;
        const sy = height / 2 + (p.y - height / 2) * zoom;
        return { ...p, sx, sy, displayRadius: p.radius * (0.8 + zoom * 0.45) };
      });

      if (mouse.active) {
        const tetherTargets = scaledParticles
          .map((p) => ({ ...p, dist: Math.hypot(p.sx - mouse.x, p.sy - mouse.y) }))
          .filter((p) => p.dist < mouse.radius * 0.9)
          .sort((a, b) => a.dist - b.dist)
          .slice(0, 6);

        for (const target of tetherTargets) {
          const alpha = 0.06 + (1 - target.dist / (mouse.radius * 0.9)) * 0.16;
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(target.sx, target.sy);
          ctx.strokeStyle = `rgba(248,113,113,${alpha})`;
          ctx.lineWidth = 0.45 + (1 - target.dist / (mouse.radius * 0.9)) * 0.3;
          ctx.stroke();
        }
      }

      for (const p of scaledParticles) {
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, p.displayRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${0.6 + p.radius * 0.08})`;
        ctx.fill();
      }

      for (let i = 0; i < scaledParticles.length; i++) {
        for (let j = i + 1; j < scaledParticles.length; j++) {
          const a = scaledParticles[i];
          const b = scaledParticles[j];
          const dist = Math.hypot(a.sx - b.sx, a.sy - b.sy);
          if (dist < 95 * zoom) {
            const alpha = 1 - dist / (95 * zoom);
            ctx.beginPath();
            ctx.moveTo(a.sx, a.sy);
            ctx.lineTo(b.sx, b.sy);
            ctx.strokeStyle = `rgba(248,113,113,${alpha * 0.1})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      ripples = ripples
        .map((ripple) => ({ ...ripple, radius: ripple.radius + 2.6, alpha: ripple.alpha * 0.97 }))
        .filter((ripple) => ripple.alpha > 0.03 && ripple.radius < ripple.maxRadius);

      for (const ripple of ripples) {
        if (!lowGraphics) {
          const gradient = ctx.createRadialGradient(ripple.x, ripple.y, 0, ripple.x, ripple.y, ripple.radius + 40);
          gradient.addColorStop(0, `rgba(248,113,113,${ripple.alpha * 0.18})`);
          gradient.addColorStop(1, "rgba(248,113,113,0)");
          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, ripple.radius + 40, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(248,113,113,${ripple.alpha * 0.28})`;
          ctx.lineWidth = 1.4;
          ctx.stroke();
        }
      }

      if (!reduceMotion) {
        rafId = requestAnimationFrame(draw);
      }
    };

    resize();
    draw();

    const handlePointerMove = (event: PointerEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      mouse.active = true;
    };

    const handlePointerLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const handlePointerDown = (event: PointerEvent) => {
      handlePointerMove(event);
      spawnRipple(event.clientX, event.clientY);
    };

    const handleWheel = (event: WheelEvent) => {
      const delta = event.deltaY > 0 ? 0.18 : 0;
      const nextZoom = Math.min(2.6, Math.max(0.95, targetZoom + delta));
      if (Math.abs(nextZoom - targetZoom) > 0.001) {
        targetZoom = nextZoom;
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const drift = (Math.random() - 0.5) * 24;
          p.x = Math.min(width, Math.max(0, p.x + drift));
          p.y = Math.min(height, Math.max(0, p.y + drift));
        }
      }
    };

    window.addEventListener("resize", resize);
    if (!reduceMotion) {
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerdown", handlePointerDown);
      window.addEventListener("pointerleave", handlePointerLeave);
      window.addEventListener("wheel", handleWheel, { passive: true });
    }

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [reduceMotion, lowGraphics]);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0" />;
}
