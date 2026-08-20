import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

interface Props { isDark: boolean }

export function CustomCursor({ isDark }: Props) {
  const [cursorType, setCursorType] = useState<"default" | "button" | "card">("default");
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 600, damping: 38 });
  const springY = useSpring(mouseY, { stiffness: 600, damping: 38 });
  const trailX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const trailY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  /* Canvas for trailing particles */
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<{ x: number; y: number; life: number; vx: number; vy: number; size: number }[]>([]);
  const lastPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current = particles.current.filter((p) => p.life > 0);
      particles.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.025;
        p.vx *= 0.96;
        p.vy *= 0.96;
        const alpha = p.life;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(165,180,252,${alpha * 0.5})`
          : `rgba(99,102,241,${alpha * 0.4})`;
        ctx.fill();
      });
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [isDark]);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);

      /* Spawn trail particles only when moving significantly */
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      if (Math.abs(dx) + Math.abs(dy) > 4) {
        for (let i = 0; i < 2; i++) {
          particles.current.push({
            x: e.clientX + (Math.random() - 0.5) * 4,
            y: e.clientY + (Math.random() - 0.5) * 4,
            life: 0.6 + Math.random() * 0.4,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5,
            size: 2 + Math.random() * 2,
          });
        }
        lastPos.current = { x: e.clientX, y: e.clientY };
      }
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("button") || t.closest("a")) setCursorType("button");
      else if (t.closest("[data-cursor='card']")) setCursorType("card");
      else setCursorType("default");
    };
    const leave = () => setIsVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.removeEventListener("mouseleave", leave);
    };
  }, [mouseX, mouseY]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null;

  const dotSize = cursorType === "button" ? 44 : cursorType === "card" ? 36 : 9;
  const ringSize = cursorType === "button" ? 0 : cursorType === "card" ? 58 : 32;

  const accentColor = isDark ? "rgba(165,180,252," : "rgba(99,102,241,";

  return (
    <>
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[99997]"
        style={{ mixBlendMode: isDark ? "screen" : "multiply" }}
      />

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999]"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: isVisible ? 1 : 0 }}
      >
        <motion.div
          className="rounded-full"
          animate={{
            width: dotSize,
            height: dotSize,
            background: cursorType === "button"
              ? "radial-gradient(circle, rgba(99,102,241,0.9), rgba(139,92,246,0.7))"
              : cursorType === "card"
              ? "radial-gradient(circle, rgba(99,102,241,0.7), rgba(6,182,212,0.5))"
              : isDark ? "#a5b4fc" : "#0B0C14",
            boxShadow: cursorType !== "default"
              ? "0 0 20px rgba(99,102,241,0.6), 0 0 40px rgba(99,102,241,0.25)"
              : isDark ? "0 0 8px rgba(165,180,252,0.6)" : "none",
          }}
          transition={{ type: "spring", stiffness: 420, damping: 28 }}
        />
      </motion.div>

      {/* Outer ring */}
      {ringSize > 0 && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[99998] rounded-full border"
          style={{ x: trailX, y: trailY, translateX: "-50%", translateY: "-50%" }}
          animate={{
            width: ringSize, height: ringSize,
            borderColor: cursorType === "card" ? `${accentColor}0.45)` : `${accentColor}0.28)`,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ type: "spring", stiffness: 180, damping: 20 }}
        />
      )}
    </>
  );
}
