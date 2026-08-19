import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";

interface Props { isDark: boolean }

const TECHS = [
  { name: "React", icon: "⚛️", color: "#61dafb", years: 1, projects: 7, level: 90 },
  { name: "React Native", icon: "📱", color: "#61dafb", years: 1, projects: 2, level: 75 },
  { name: "Next.js", icon: "▲", color: "#94a3b8", years: 1, projects: 3, level: 70 },
  { name: "Node.js", icon: "🟢", color: "#68a063", years: 1, projects: 4, level: 70 },
  { name: "TypeScript", icon: "🔷", color: "#3178c6", years: 1, projects: 3, level: 75 },
  { name: "JavaScript", icon: "🟡", color: "#eab308", years: 1, projects: 7, level: 85 },
  { name: "Figma", icon: "🎨", color: "#f24e1e", years: 1, projects: 6, level: 85 },
  { name: "PostgreSQL", icon: "🐘", color: "#336791", years: 1, projects: 3, level: 85 },
  { name: "Firebase", icon: "🔥", color: "#ffca28", years: 1, projects: 2, level: 80 },
  { name: "MongoDB", icon: "🍃", color: "#47a248", years: 1, projects: 2, level: 78 },
  { name: "Tailwind", icon: "🎨", color: "#06b6d4", years: 1, projects: 10, level: 90 },
  // { name: "Docker", icon: "🐳", color: "#2496ed", years: 0.5, projects: 3, level: 65 },
  { name: "Git", icon: "⑂", color: "#f05032", years: 1, projects: 20, level: 90 },
  { name: "Prisma", icon: "◈", color: "#5a67d8", years: 1, projects: 2, level: 72 },
  { name: "Supabase", icon: "⚡", color: "#3ecf8e", years: 0.5, projects: 1, level: 70 },
  { name: "Zustand", icon: "🐻", color: "#8b5cf6", years: 1, projects: 2, level: 78 },
  { name: "React Query", icon: "🔄", color: "#f59e0b", years: 1, projects: 6, level: 76 },
];

const CATEGORIES = [
  { name: "Frontend & UI/UX", techs: ["React", "Next.js", "TypeScript", "Tailwind", "Figma", "JavaScript"], color: "#6366f1" },
  { name: "Mobile", techs: ["React Native", "Expo", "Firebase"], color: "#8b5cf6" },
  { name: "Backend", techs: ["Node.js", "PostgreSQL", "MongoDB", "Prisma", "Supabase"], color: "#06b6d4" },
  { name: "DevOps", techs: ["Git", "AWS"], color: "#10b981" },
];

function fibonacciSphere(n: number) {
  const pts: { x: number; y: number; z: number }[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    pts.push({ x: Math.cos(theta) * r, y, z: Math.sin(theta) * r });
  }
  return pts;
}

const BASE = fibonacciSphere(TECHS.length);

function rotY(p: { x: number; y: number; z: number }, a: number) {
  return { x: p.x * Math.cos(a) + p.z * Math.sin(a), y: p.y, z: -p.x * Math.sin(a) + p.z * Math.cos(a) };
}
function rotX(p: { x: number; y: number; z: number }, a: number) {
  return { x: p.x, y: p.y * Math.cos(a) - p.z * Math.sin(a), z: p.y * Math.sin(a) + p.z * Math.cos(a) };
}

export function SkillsSection({ isDark }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const angleY = useRef(0);
  const angleX = useRef(0);
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const sphereContainerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const [hovered, setHovered] = useState<(typeof TECHS)[0] | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const RADIUS = 175;

  useEffect(() => {
    const animate = () => {
      if (!isDragging.current) {
        angleY.current += 0.007;
        angleX.current = Math.sin(Date.now() / 6500) * 0.28;
      }
      BASE.forEach((bp, i) => {
        const el = itemRefs.current[i];
        if (!el) return;
        let p = rotY(bp, angleY.current);
        p = rotX(p, angleX.current);
        const scale = (p.z + 2) / 3;
        el.style.transform = `translate(${p.x * RADIUS}px, ${p.y * RADIUS}px)`;
        el.style.opacity = String(Math.max(0.07, scale * 0.9 + 0.04));
        el.style.fontSize = `${0.62 + scale * 0.48}rem`;
        el.style.zIndex = String(Math.round(scale * 100));
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    const el = sphereContainerRef.current;
    if (!el) return;
    const onDown = (e: MouseEvent) => { isDragging.current = true; lastMouse.current = { x: e.clientX, y: e.clientY }; };
    const onMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      angleY.current += (e.clientX - lastMouse.current.x) * 0.009;
      angleX.current += (e.clientY - lastMouse.current.y) * 0.009;
      lastMouse.current = { x: e.clientX, y: e.clientY };
    };
    const onUp = () => { isDragging.current = false; };
    el.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      el.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  const textC = isDark ? "#e4e8f0" : "#0B0C14";
  const subC = isDark ? "#8892A4" : "#64748B";
  const accentC = isDark ? "#a5b4fc" : "#6366f1";
  const glassCard = {
    background: isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.8)",
    backdropFilter: "blur(16px)",
    borderColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.85)",
    boxShadow: isDark ? "0 4px 20px rgba(0,0,0,0.3)" : "0 4px 20px rgba(15,20,50,0.06)",
  };

  return (
    <section ref={sectionRef} id="skills" className="relative py-32 px-4">
      <div className="max-w-7xl mx-auto">
        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-4"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4 border"
            style={{ background: isDark ? "rgba(129,140,248,0.1)" : "rgba(99,102,241,0.07)", borderColor: isDark ? "rgba(129,140,248,0.22)" : "rgba(99,102,241,0.18)", color: accentC, fontFamily: "'Space Grotesk',sans-serif" }}
          >
            Tech Stack
          </span>
          <h2
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: "clamp(2.2rem,4vw,3.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: textC,
            }}
          >
            Interactive{" "}
            <span style={{ backgroundImage: "linear-gradient(135deg,#6366f1,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", color: "transparent" }}>
              Tech Sphere
            </span>
          </h2>
        </motion.div>

        {/* ── Subtitle ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-center text-sm mb-12"
          style={{ color: subC, fontFamily: "'Inter',sans-serif" }}
        >
          Hover to explore · Drag to rotate
        </motion.p>

        {/* ── 3D Rotating Sphere — CENTERED ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="flex justify-center mb-16"
        >
          <div
            ref={sphereContainerRef}
            className="relative"
            style={{ width: 400, height: 400, cursor: "grab", userSelect: "none" }}
          >
            {/* Sphere ambient glow */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: isDark
                  ? "radial-gradient(circle at 35% 35%, rgba(129,140,248,0.14), rgba(167,139,250,0.07) 50%, transparent 70%)"
                  : "radial-gradient(circle at 35% 35%, rgba(99,102,241,0.10), rgba(139,92,246,0.05) 50%, transparent 70%)",
                border: isDark ? "1px solid rgba(129,140,248,0.08)" : "1px solid rgba(99,102,241,0.07)",
              }}
            />
            {/* Outer pulse ring */}
            {/* <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ border: isDark ? "1px solid rgba(129,140,248,0.06)" : "1px solid rgba(99,102,241,0.05)" }}
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            /> */}

            {/* Logos centered at 0,0 */}
            <div className="absolute" style={{ top: "50%", left: "50%", width: 0, height: 0 }}>
              {TECHS.map((tech, i) => (
                <button
                  key={tech.name}
                  ref={(el) => { itemRefs.current[i] = el; }}
                  onMouseEnter={(e) => { setHovered(tech); setTooltipPos({ x: e.clientX, y: e.clientY }); }}
                  onMouseMove={(e) => setTooltipPos({ x: e.clientX, y: e.clientY })}
                  onMouseLeave={() => setHovered(null)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-full font-semibold whitespace-nowrap border"
                  style={{
                    background: isDark
                      ? `${tech.color}14`
                      : `${tech.color}10`,
                    borderColor: isDark ? `${tech.color}28` : `${tech.color}22`,
                    color: tech.color === "#eab308" || tech.color === "#ffca28" ? "#ca8a04" : tech.color === "#94a3b8" ? (isDark ? "#cbd5e1" : "#475569") : tech.color,
                    fontFamily: "'Space Grotesk',sans-serif",
                    boxShadow: `0 2px 10px ${tech.color}20`,
                    backdropFilter: "blur(6px)",
                    left: 0, top: 0,
                  }}
                >
                  {tech.icon} {tech.name}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Technology Cards BELOW sphere ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mb-10"
        >
          <h3
            className="text-center text-xs font-semibold tracking-widest uppercase mb-6"
            style={{ color: isDark ? "#6b7280" : "#94a3b8", fontFamily: "'Space Grotesk',sans-serif" }}
          >
            Proficiency Overview
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {TECHS.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.45 + i * 0.03 }}
                whileHover={{ y: -3, scale: 1.02 }}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border"
                style={glassCard}
              >
                <span className="text-base w-5 text-center flex-shrink-0">{tech.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-semibold truncate" style={{ color: textC, fontFamily: "'Space Grotesk',sans-serif" }}>
                      {tech.name}
                    </span>
                    <span className="text-xs ml-1 flex-shrink-0" style={{ color: subC }}>{tech.level}%</span>
                  </div>
                  <div className="h-1 rounded-full" style={{ background: isDark ? "rgba(255,255,255,0.08)" : "#e5e7eb" }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: tech.color === "#eab308" || tech.color === "#ffca28" ? "#f59e0b"
                          : tech.color === "#94a3b8" ? "#64748b"
                          : tech.color,
                      }}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${tech.level}%` } : {}}
                      transition={{ duration: 1, delay: 0.55 + i * 0.03, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Technology Categories BELOW cards ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <h3
            className="text-center text-xs font-semibold tracking-widest uppercase mb-5"
            style={{ color: isDark ? "#6b7280" : "#94a3b8", fontFamily: "'Space Grotesk',sans-serif" }}
          >
            Technology Categories
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CATEGORIES.map((cat, i) => (
              <motion.button
                key={cat.name}
                onClick={() => setActiveCategory(activeCategory === cat.name ? null : cat.name)}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.65 + i * 0.08 }}
                whileHover={{ y: -4 }}
                className="p-4 rounded-2xl border text-left"
                style={{
                  background: activeCategory === cat.name
                    ? isDark ? `${cat.color}18` : `${cat.color}10`
                    : isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.75)",
                  backdropFilter: "blur(12px)",
                  borderColor: activeCategory === cat.name ? `${cat.color}35` : (isDark ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.85)"),
                  boxShadow: activeCategory === cat.name ? `0 4px 20px ${cat.color}20` : "none",
                  transition: "all 0.25s ease",
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg mb-3 flex items-center justify-center"
                  style={{ background: `${cat.color}18` }}
                >
                  <span className="w-3 h-3 rounded-full" style={{ background: cat.color }} />
                </div>
                <p className="font-bold text-sm mb-2" style={{ color: cat.color, fontFamily: "'Space Grotesk',sans-serif" }}>
                  {cat.name}
                </p>
                <p className="text-xs leading-relaxed" style={{ color: subC, fontFamily: "'Inter',sans-serif" }}>
                  {cat.techs.join(" · ")}
                </p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Hover tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 8 }}
            transition={{ duration: 0.15 }}
            className="fixed pointer-events-none z-[9999] p-4 rounded-2xl border"
            style={{
              left: tooltipPos.x + 16,
              top: tooltipPos.y - 90,
              background: isDark ? "rgba(18,19,31,0.96)" : "rgba(255,255,255,0.97)",
              backdropFilter: "blur(20px)",
              borderColor: isDark ? "rgba(129,140,248,0.18)" : "rgba(99,102,241,0.14)",
              boxShadow: isDark ? "0 12px 40px rgba(0,0,0,0.5)" : "0 12px 40px rgba(0,0,0,0.12)",
              minWidth: 185,
            }}
          >
            <div className="flex items-center gap-2 mb-2.5">
              <span className="text-xl">{hovered.icon}</span>
              <span className="font-bold" style={{ color: textC, fontFamily: "'Space Grotesk',sans-serif" }}>{hovered.name}</span>
            </div>
            <div className="space-y-1.5">
              {[
                { label: "Experience", val: `${hovered.years} yr${hovered.years !== 1 ? "s" : ""}` },
                { label: "Projects", val: `${hovered.projects}+` },
                { label: "Proficiency", val: `${hovered.level}%` },
              ].map((r) => (
                <div key={r.label} className="flex justify-between text-xs">
                  <span style={{ color: subC, fontFamily: "'Space Grotesk',sans-serif" }}>{r.label}</span>
                  <span className="font-semibold" style={{ color: accentC, fontFamily: "'Space Grotesk',sans-serif" }}>{r.val}</span>
                </div>
              ))}
              <div className="mt-2 h-1.5 rounded-full" style={{ background: isDark ? "rgba(255,255,255,0.1)" : "#f1f5f9" }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${hovered.level}%`,
                    background: hovered.color === "#eab308" || hovered.color === "#ffca28" ? "#f59e0b" : hovered.color === "#94a3b8" ? "#64748b" : hovered.color,
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
