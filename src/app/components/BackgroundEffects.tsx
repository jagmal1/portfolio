import { useEffect, useRef } from "react";

interface Props { isDark: boolean }

export function BackgroundEffects({ isDark }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.body.scrollHeight;
    };
    resize();

    type Dot = { x: number; y: number; r: number; vx: number; vy: number; alpha: number };
    const dots: Dot[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    let raf: number;
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.005;
      const dotColor = isDark ? "165,180,252" : "99,102,241";

      dots.forEach((d) => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0) d.x = canvas.width;
        if (d.x > canvas.width) d.x = 0;
        if (d.y < 0) d.y = canvas.height;
        if (d.y > canvas.height) d.y = 0;

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dotColor},${d.alpha * (0.6 + Math.sin(t + d.x * 0.01) * 0.4)})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [isDark]);

  const blob1 = isDark
    ? "radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)"
    : "radial-gradient(circle, rgba(139,92,246,0.28) 0%, transparent 70%)";
  const blob2 = isDark
    ? "radial-gradient(circle, rgba(67,56,202,0.2) 0%, transparent 70%)"
    : "radial-gradient(circle, rgba(99,102,241,0.32) 0%, transparent 70%)";
  const blob3 = isDark
    ? "radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)"
    : "radial-gradient(circle, rgba(6,182,212,0.28) 0%, transparent 70%)";

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      <div
        className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full"
        style={{ background: blob1, filter: "blur(60px)", opacity: isDark ? 0.45 : 0.3, animation: "blob1 12s ease-in-out infinite alternate" }}
      />
      <div
        className="absolute top-[30%] left-[-15%] w-[500px] h-[500px] rounded-full"
        style={{ background: blob2, filter: "blur(80px)", opacity: isDark ? 0.35 : 0.25, animation: "blob2 15s ease-in-out infinite alternate" }}
      />
      <div
        className="absolute bottom-[10%] right-[5%] w-[450px] h-[450px] rounded-full"
        style={{ background: blob3, filter: "blur(70px)", opacity: isDark ? 0.3 : 0.2, animation: "blob3 10s ease-in-out infinite alternate" }}
      />
      <div
        className="absolute top-[60%] left-[30%] w-[350px] h-[350px] rounded-full"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(129,140,248,0.15) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(167,139,250,0.22) 0%, transparent 70%)",
          filter: "blur(90px)",
          opacity: isDark ? 0.4 : 0.15,
          animation: "blob1 18s ease-in-out infinite alternate-reverse",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <canvas ref={canvasRef} className="absolute inset-0 opacity-40" />

      <style>{`
        @keyframes blob1 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(40px, 30px) scale(1.15); }
        }
        @keyframes blob2 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-30px, 50px) scale(1.1); }
        }
        @keyframes blob3 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(20px, -40px) scale(1.2); }
        }
      `}</style>
    </div>
  );
}
