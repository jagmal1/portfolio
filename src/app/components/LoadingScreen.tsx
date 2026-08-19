import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Props {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    type Particle = {
      x: number; y: number;
      tx: number; ty: number;
      vx: number; vy: number;
      alpha: number; size: number;
      color: string;
    };

    const colors = ["#6366f1", "#8b5cf6", "#06b6d4", "#a78bfa", "#ffffff"];

    const particles: Particle[] = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      tx: cx + (Math.random() - 0.5) * 160,
      ty: cy + (Math.random() - 0.5) * 160,
      vx: 0,
      vy: 0,
      alpha: Math.random() * 0.6 + 0.2,
      size: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    let start: number | null = null;
    const duration = 2400;

    const draw = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const t = Math.min(elapsed / duration, 1);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // background
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, canvas.width * 0.7);
      grad.addColorStop(0, "#0a0a14");
      grad.addColorStop(1, "#05050d");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // floating background particles
      for (let i = 0; i < 40; i++) {
        const bx = ((i * 137.5 + elapsed * 0.02) % canvas.width);
        const by = ((i * 89.3 + elapsed * 0.01) % canvas.height);
        ctx.beginPath();
        ctx.arc(bx, by, 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,102,241,${0.15 + Math.sin(elapsed * 0.001 + i) * 0.1})`;
        ctx.fill();
      }

      // logo "J" letter shape target points
      const ease = (x: number) => 1 - Math.pow(1 - x, 3);
      const et = ease(t);

      particles.forEach((p) => {
        p.x += (p.tx - p.x) * et * 0.06;
        p.y += (p.ty - p.y) * et * 0.06;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (0.5 + et * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * et;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Center J monogram
      if (t > 0.5) {
        const letterAlpha = (t - 0.5) * 2;
        ctx.globalAlpha = letterAlpha;
        ctx.font = "bold 120px 'Space Grotesk', 'Inter', sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const textGrad = ctx.createLinearGradient(cx - 60, cy, cx + 60, cy);
        textGrad.addColorStop(0, "#6366f1");
        textGrad.addColorStop(0.5, "#a78bfa");
        textGrad.addColorStop(1, "#06b6d4");
        ctx.fillStyle = textGrad;
        ctx.shadowBlur = 30;
        ctx.shadowColor = "#6366f1";
        ctx.fillText("J", cx, cy);
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }

      setProgress(Math.round(t * 100));

      if (t < 1) {
        animRef.current = requestAnimationFrame(draw);
      } else {
        setTimeout(() => setDone(true), 600);
      }
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  useEffect(() => {
    if (done) {
      const t = setTimeout(onComplete, 800);
      return () => clearTimeout(t);
    }
  }, [done, onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

          <div className="relative z-10 flex flex-col items-center gap-8 mt-52">
            <motion.div
              className="w-64 h-[2px] rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.1)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #6366f1, #a78bfa, #06b6d4)",
                  width: `${progress}%`,
                  boxShadow: "0 0 12px rgba(99,102,241,0.8)",
                }}
                transition={{ duration: 0.1 }}
              />
            </motion.div>

            <motion.p
              className="text-white/40 text-sm tracking-widest uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {progress < 100 ? `Loading ${progress}%` : "Welcome"}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
