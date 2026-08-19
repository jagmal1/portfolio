import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
const resumePDF = "/Jagmal-Resume.pdf";

/* ── Tech logos that orbit the photo ── */
const ORBIT_RINGS = [
  {
    radius: 118,
    tilt: 68,
    speed: 0.55,
    duration: "14s",
    logos: [
      { icon: "⚛️", name: "React", color: "#61DAFB" },
      { icon: "▲", name: "Next.js", color: "#E2E8F0" },
      { icon: "🔷", name: "TypeScript", color: "#3178C6" },
    ],
  },
  {
    radius: 165,
    tilt: 50,
    speed: 0.38,
    duration: "20s",
    logos: [
      { icon: "🟢", name: "Node.js", color: "#68A063" },
      { icon: "🔥", name: "Firebase", color: "#FFCA28" },
      { icon: "📱", name: "RN", color: "#61DAFB" },
    ],
  },
  {
    radius: 212,
    tilt: 78,
    speed: 0.24,
    duration: "28s",
    logos: [
      { icon: "🐘", name: "PG", color: "#336791" },
      { icon: "🐳", name: "Docker", color: "#2496ED" },
      { icon: "⑂", name: "Git", color: "#F05032" },
    ],
  },
];

/* ── Roles cycling ── */
const ROLES = ["Software Engineer", "Full Stack Developer", "A Creative Developer"];

/* ── Orbital logo item (JS-driven 3D position) ── */
interface OrbLogoProps {
  logo: { icon: string; name: string; color: string };
  elRef: (el: HTMLDivElement | null) => void;
  isDark: boolean;
}
function OrbLogo({ logo, elRef, isDark }: OrbLogoProps) {
  return (
    <div
      ref={elRef}
      className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-xl text-xl border"
      style={{
        background: isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.85)",
        borderColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.9)",
        backdropFilter: "blur(12px)",
        boxShadow: `0 4px 16px ${logo.color}30, 0 2px 8px rgba(0,0,0,0.15)`,
        left: 0, top: 0,
        willChange: "transform, opacity",
      }}
      title={logo.name}
    >
      {logo.icon}
    </div>
  );
}

interface Props { isDark: boolean }

export function HeroSection({ isDark }: Props) {
  const [roleIdx, setRoleIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);

  /* Mouse parallax for whole orbital system */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 18 });
  const tiltX = useTransform(springY, [-300, 300], [12, -12]);
  const tiltY = useTransform(springX, [-400, 400], [-14, 14]);

  /* Orbiting logo refs — flat array [ring0logo0, ring0logo1, ..., ring2logo2] */
  const logoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const totalLogos = ORBIT_RINGS.reduce((s, r) => s + r.logos.length, 0);
  if (logoRefs.current.length !== totalLogos) {
    logoRefs.current = Array(totalLogos).fill(null);
  }

  /* Roles cycling */
  useEffect(() => {
    const id = setInterval(() => setRoleIdx((i) => (i + 1) % ROLES.length), 3400);
    return () => clearInterval(id);
  }, []);

  /* Mouse parallax listener */
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set(e.clientX - rect.left - rect.width / 2);
      mouseY.set(e.clientY - rect.top - rect.height / 2);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  /* ── JS-driven 3D orbit animation ── */
  useEffect(() => {
    let raf: number;
    const startTime = performance.now();

    const animate = (now: number) => {
      const t = (now - startTime) / 1000;
      let idx = 0;

      ORBIT_RINGS.forEach((ring) => {
        ring.logos.forEach((_, li) => {
          const el = logoRefs.current[idx++];
          if (!el) return;

          const angleOffset = (li / ring.logos.length) * Math.PI * 2;
          const angle = t * ring.speed + angleOffset;

          /* Orbit on XZ plane, then apply tilt around X axis */
          const x = Math.cos(angle) * ring.radius;
          const flatZ = Math.sin(angle) * ring.radius;
          const tiltRad = (ring.tilt * Math.PI) / 180;
          const y = flatZ * Math.sin(tiltRad);
          const z = flatZ * Math.cos(tiltRad);

          /* Perspective projection */
          const fov = 520;
          const scale = fov / (fov + z + 240);
          const opacity = Math.max(0.07, 0.45 + scale * 0.65);

          el.style.transform = `translate(${x}px, ${y}px) scale(${scale.toFixed(3)})`;
          el.style.opacity = String(opacity.toFixed(3));
          el.style.zIndex = String(Math.round(scale * 100));
        });
      });

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* ── Mouse-following gradient blob ── */
  const blobX = useTransform(springX, [-400, 400], ["25%", "75%"]);
  const blobY = useTransform(springY, [-300, 300], ["15%", "85%"]);

  const cardBg = isDark
    ? "rgba(255,255,255,0.04)"
    : "rgba(255,255,255,0.82)";
  const cardBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.9)";
  const textColor = isDark ? "#e4e8f0" : "#0B0C14";
  const subColor = isDark ? "#8892A4" : "#64748B";
  const accentC = isDark ? "#a5b4fc" : "#6366f1";

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-24 pb-12"
    >
      {/* Mouse-following gradient */}
      <motion.div
        className="absolute pointer-events-none rounded-full opacity-[0.18]"
        style={{
          width: 700, height: 700,
          left: blobX, top: blobY,
          translateX: "-50%", translateY: "-50%",
          background: isDark
            ? "radial-gradient(circle, rgba(129,140,248,0.6), rgba(139,92,246,0.3), transparent 70%)"
            : "radial-gradient(circle, rgba(99,102,241,0.5), rgba(139,92,246,0.25), transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      {/* Aurora sweep */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/3 left-1/2 w-[900px] h-[320px] rounded-full opacity-10"
          style={{
            transform: "translate(-50%, -50%)",
            background: "conic-gradient(from 0deg, #6366f1, #a78bfa, #06b6d4, #6366f1)",
            filter: "blur(90px)",
            animation: "auroraHero 26s linear infinite",
          }}
        />
        <style>{`@keyframes auroraHero { from { transform: translate(-50%,-50%) rotate(0deg); } to { transform: translate(-50%,-50%) rotate(360deg); } }`}</style>
      </div>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* LAYOUT: [IMAGE LEFT] [TEXT RIGHT] */}
      {/* ─────────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl w-full mx-auto flex flex-col items-center justify-center text-center pt-24 pb-16 px-4">

        {/* ─── LEFT: Photo + Orbiting Logos (Hidden) ─── */}
        {false && (
        <motion.div
          className="flex items-center justify-center order-2 lg:order-1"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            ref={sphereRef}
            style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d", width: 480, height: 480 }}
            className="relative"
            /* orbit canvas: size determined by largest ring radius + icon */
          >
            {/* 480×480 container so orbits have room */}
            <div className="relative" style={{ width: 480, height: 480 }}>

              {/* Subtle orbit ring guides */}
              {ORBIT_RINGS.map((ring, ri) => (
                <div
                  key={ri}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: ring.radius * 2,
                    height: ring.radius * 2,
                    top: "50%",
                    left: "50%",
                    transform: `translate(-50%,-50%) rotateX(${ring.tilt}deg)`,
                    border: isDark ? "1px solid rgba(129,140,248,0.08)" : "1px solid rgba(99,102,241,0.06)",
                    transformStyle: "preserve-3d",
                  }}
                />
              ))}

              {/* Orbiting logos — positioned from center */}
              <div className="absolute" style={{ top: "50%", left: "50%", width: 0, height: 0 }}>
                {ORBIT_RINGS.map((ring, ri) =>
                  ring.logos.map((logo, li) => {
                    const flatIdx = ORBIT_RINGS.slice(0, ri).reduce((s, r) => s + r.logos.length, 0) + li;
                    return (
                      <OrbLogo
                        key={`${ri}-${li}`}
                        logo={logo}
                        isDark={isDark}
                        elRef={(el) => { logoRefs.current[flatIdx] = el; }}
                      />
                    );
                  })
                )}
              </div>

              {/* ── Central Photo ── */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {/* Animated gradient ring */}
                <motion.div
                  className="absolute -inset-3 rounded-full"
                  style={{
                    background: "conic-gradient(from 0deg, #6366f1, #a78bfa, #06b6d4, #10b981, #6366f1)",
                    filter: "blur(3px)",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                {/* Outer glow */}
                <div
                  className="absolute -inset-4 rounded-full"
                  style={{
                    background: isDark
                      ? "radial-gradient(circle, rgba(129,140,248,0.3) 0%, transparent 70%)"
                      : "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)",
                    filter: "blur(16px)",
                    animation: "photoGlow 3s ease-in-out infinite alternate",
                  }}
                />
                <style>{`
                  @keyframes photoGlow {
                    from { opacity: 0.6; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1.05); }
                  }
                `}</style>

                {/* Photo frame */}
                <motion.div
                  className="relative w-44 h-44 rounded-full overflow-hidden"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    border: "3px solid rgba(255,255,255,0.6)",
                    boxShadow: isDark
                      ? "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)"
                      : "0 20px 60px rgba(99,102,241,0.25), 0 0 0 1px rgba(255,255,255,0.8)",
                  }}
                >
                  {/* Glass sheen overlay */}
                  <div
                    className="absolute inset-0 rounded-full z-10 pointer-events-none"
                    style={{
                      background: "linear-gradient(135deg, rgba(255,255,255,0.22) 0%, transparent 60%)",
                    }}
                  />
                  {/* Photo placeholder — swap with real <img src="..." /> */}
                  <div
                    className="w-full h-full flex items-center justify-center text-white text-5xl font-black"
                    style={{
                      background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 40%, #0EA5E9 100%)",
                      fontFamily: "'Space Grotesk', sans-serif",
                      letterSpacing: "-0.04em",
                    }}
                  >
                    JR
                  </div>
                </motion.div>

                {/* Reflection bar */}
                <div
                  className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-4 rounded-full"
                  style={{
                    background: "radial-gradient(ellipse, rgba(99,102,241,0.3), transparent 70%)",
                    filter: "blur(6px)",
                  }}
                />
              </div>

              {/* Floating status badge */}
              <motion.div
                className="absolute top-8 right-6 flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium"
                style={{
                  background: isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.9)",
                  borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(16,185,129,0.2)",
                  color: isDark ? "#34d399" : "#059669",
                  backdropFilter: "blur(12px)",
                  fontFamily: "'Space Grotesk', sans-serif",
                  boxShadow: isDark ? "0 4px 16px rgba(0,0,0,0.3)" : "0 4px 16px rgba(16,185,129,0.12)",
                }}
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Open to Work
              </motion.div>

              {/* Floating stats badge */}
              <motion.div
                className="absolute bottom-12 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium"
                style={{
                  background: isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.9)",
                  borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(99,102,241,0.2)",
                  color: isDark ? "#a5b4fc" : "#6366f1",
                  backdropFilter: "blur(12px)",
                  fontFamily: "'Space Grotesk', sans-serif",
                  boxShadow: isDark ? "0 4px 16px rgba(0,0,0,0.3)" : "0 4px 16px rgba(99,102,241,0.12)",
                }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, delay: 1, repeat: Infinity, ease: "easeInOut" }}
              >
                ⭐ 4.8★ · 100K+ Downloads
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
        )}
        {/* ─── RIGHT: Text Content ─── */}
        <motion.div
          className="flex flex-col items-center gap-5 max-w-4xl"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="inline-flex items-center gap-2 w-fit px-4 py-2 rounded-full border"
            style={{
              background: isDark ? "rgba(129,140,248,0.1)" : "rgba(99,102,241,0.07)",
              borderColor: isDark ? "rgba(129,140,248,0.25)" : "rgba(99,102,241,0.18)",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm font-medium" style={{ color: accentC, fontFamily: "'Space Grotesk',sans-serif" }}>
              Open to Full-time SDE Roles
            </span>
          </motion.div>

          {/* Name */}
          <div>
            {/* <motion.p
              className="text-xl mb-1"
              style={{ color: subColor, fontFamily: "'Space Grotesk',sans-serif" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
               Hi, I'm 
            </motion.p> */}
            <MagneticText strength={0.03}>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                style={{
                  fontFamily: "'Space Grotesk',sans-serif",
                  fontSize: "clamp(2.8rem,7vw,5.5rem)",
                  fontWeight: 800,
                  lineHeight: 1.15,
                  letterSpacing: "-0.03em",
                  backgroundImage: isDark
                    ? "linear-gradient(135deg,#e4e8f0 0%,#a5b4fc 60%,#818cf8 100%)"
                    : "linear-gradient(135deg,#0B0C14 0%,#2d2d4e 55%,#6366f1 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Hi, I'm Jagmal
              </motion.h1>
            </MagneticText>
          </div>

          {/* Cycling role */}
          <div className="h-14 ">
            <MagneticText strength={0.1}>
              <motion.div
                key={roleIdx}
                initial={{ y: 40, opacity: 0, filter: "blur(6px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                style={{
                  fontFamily: "'Space Grotesk',sans-serif",
                  fontSize: "clamp(2rem,3.2vw,2.4rem)",
                  fontWeight: 600,
                  background: "linear-gradient(90deg,#6366f1,#a78bfa,#06b6d4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  lineHeight: 1.2,
                  padding: "0.1em 0",
                }}
              >
                {ROLES[roleIdx]}
              </motion.div>
            </MagneticText>
          </div>

          {/* Description */}
          <motion.p
            className="max-w-2xl leading-relaxed text-sm lg:text-base text-center"
            style={{ color: subColor, fontFamily: "'Inter',sans-serif" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            Building scalable digital experiences with modern web and mobile technologies. Passionate about creating high-performance products with exceptional user experiences.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 mt-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
          >
            <MagBtn primary isDark={isDark} onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
              View Projects
            </MagBtn>
            <MagBtn isDark={isDark} onClick={() => {
              const a = document.createElement("a");
              a.href = resumePDF;
              a.download = "Jagmal-Resume.pdf";
              a.click();
            }}>
              Download Resume ↓
            </MagBtn>
            <MagBtn isDark={isDark} onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
              Contact Me
            </MagBtn>
          </motion.div>

          {/* Quick stats row */}
          {/* <motion.div
            className="flex flex-wrap items-center justify-center gap-8 pt-8 border-t w-full max-w-2xl mt-4"
            style={{ borderColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            {[
              { v: "100K+", l: "Downloads" },
              { v: "4.8★", l: "Rating" },
              { v: "3+", l: "Live Apps" },
              { v: "NIT JLD", l: "Education" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-bold" style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "1.25rem", color: textColor }}>{s.v}</div>
                <div className="text-xs" style={{ color: subColor }}>{s.l}</div>
              </div>
            ))}
          </motion.div> */}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        <span className="text-xs tracking-widest uppercase" style={{ color: subColor, fontFamily: "'Space Grotesk',sans-serif" }}>Scroll</span>
        <div className="w-5 h-8 rounded-full border-2 flex items-start justify-center p-1" style={{ borderColor: isDark ? "rgba(255,255,255,0.2)" : "#d1d5db" }}>
          <motion.div
            className="w-1 h-2 rounded-full"
            style={{ background: accentC }}
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}

/* ── Magnetic button ── */
function MagBtn({ children, onClick, primary, isDark }: { children: React.ReactNode; onClick?: () => void; primary?: boolean; isDark: boolean }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 22 });
  const sy = useSpring(y, { stiffness: 300, damping: 22 });

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
        y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      className={`relative px-5 py-2.5 rounded-xl font-semibold text-sm overflow-hidden ${
        primary ? "text-white" : ""
      }`}
      style={{
        x: sx,
        y: sy,
        ...(primary
          ? {
              background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
              boxShadow: "0 4px 20px rgba(99,102,241,0.45)",
              fontFamily: "'Space Grotesk',sans-serif",
            }
          : {
              background: isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.8)",
              backdropFilter: "blur(8px)",
              border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"}`,
              color: isDark ? "#c8d0e0" : "#374151",
              fontFamily: "'Space Grotesk',sans-serif",
            })
      }}
    >
      {primary && (
        <span
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{ background: "linear-gradient(135deg,rgba(255,255,255,0.15),transparent)" }}
        />
      )}
      {children}
    </motion.button>
  );
}

/* ── Magnetic text wrapper ── */
function MagneticText({ children, strength = 0.3 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy, display: "inline-block", cursor: "default" }}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((e.clientX - rect.left - rect.width / 2) * strength);
        y.set((e.clientY - rect.top - rect.height / 2) * strength);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}
