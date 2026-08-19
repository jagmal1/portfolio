import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

interface Props { isDark: boolean }

function Counter({ target, suffix = "", isDecimal = false }: { target: number; suffix?: string; isDecimal?: boolean }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const dur = 2000;
    const tick = () => {
      const t = Math.min((Date.now() - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * target * (isDecimal ? 10 : 1)) / (isDecimal ? 10 : 1));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, isDecimal]);
  return <span ref={ref}>{isDecimal ? count.toFixed(1) : count}{suffix}</span>;
}

const achievements = [
  { icon: "📱", value: 100, suffix: "K+", label: "App Downloads", desc: "Across Play Store & App Store", accent: "#6366f1" },
  { icon: "⭐", value: 4.8, suffix: "★", label: "Play Store Rating", desc: "Average user rating", accent: "#f59e0b", isDecimal: true },
  { icon: "💬", value: 9, suffix: "K+", label: "User Reviews", desc: "Verified app store reviews", accent: "#8b5cf6" },
  { icon: "🚀", value: 3, suffix: "+", label: "Production Apps", desc: "Live and in daily use", accent: "#10b981" },
  { icon: "📦", value: 10, suffix: "+", label: "Total Projects", desc: "Web, mobile and APIs", accent: "#06b6d4" },
  { icon: "📝", value: 500, suffix: "+", label: "Git Commits", desc: "Across all repositories", accent: "#ec4899" },
];

const milestones = [
  { icon: "🏆", title: "100K+ App Downloads", sub: "Crazinos on Play Store" },
  { icon: "⭐", title: "4.8★ Play Store Rating", sub: "From 9K+ verified reviews" },
  { icon: "🎓", title: "B.Tech CSE — NIT Jalandhar", sub: "Dr. B.R. Ambedkar NIT" },
  { icon: "💼", title: "3+ Production Applications", sub: "DWF India, Crazinos, CollageWala" },
  { icon: "🚀", title: "Deployed at Scale", sub: "Scalable web & mobile products" },
  { icon: "🌍", title: "Remote-first Engineer", sub: "Open to global opportunities" },
];

export function AchievementsSection({ isDark }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const textC = isDark ? "#e4e8f0" : "#0a0a14";
  const subC = isDark ? "#8892a4" : "#6b7280";
  const accentC = isDark ? "#a5b4fc" : "#6366f1";
  const cardBg = isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.75)";
  const cardBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.8)";
  const cardShadow = isDark ? "0 8px 32px rgba(0,0,0,0.4)" : "0 8px 32px rgba(0,0,0,0.06)";
  const tagBg = isDark ? "rgba(99,102,241,0.08)" : "rgba(99,102,241,0.04)";
  const tagBorder = isDark ? "rgba(99,102,241,0.15)" : "rgba(99,102,241,0.08)";

  return (
    <section ref={ref} id="achievements" className="relative py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4 border"
            style={{ background: tagBg, borderColor: tagBorder, color: accentC, fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Achievements
          </span>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: textC,
            }}
          >
            Numbers That{" "}
            <span style={{ backgroundImage: "linear-gradient(135deg, #6366f1, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", color: "transparent" }}>
              Speak
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-12">
          {achievements.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.09 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="relative p-6 rounded-3xl border overflow-hidden group"
              style={{ background: cardBg, backdropFilter: "blur(20px)", borderColor: cardBorder, boxShadow: cardShadow }}
            >
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{ background: `linear-gradient(135deg, ${a.accent}08, transparent)` }}
              />
              <span className="text-3xl mb-3 block">{a.icon}</span>
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "2rem",
                  fontWeight: 800,
                  backgroundImage: isDark
                    ? `linear-gradient(135deg, #e4e8f0, ${a.accent})`
                    : `linear-gradient(135deg, #0a0a14, ${a.accent})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent",
                  lineHeight: 1.1,
                }}
              >
                <Counter target={a.value} suffix={a.suffix} isDecimal={a.isDecimal} />
              </div>
              <p className="text-sm font-semibold mt-1 mb-0.5" style={{ color: textC, fontFamily: "'Space Grotesk', sans-serif" }}>{a.label}</p>
              <p className="text-xs" style={{ color: subC }}>{a.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="p-8 rounded-3xl border"
          style={{ background: cardBg, backdropFilter: "blur(20px)", borderColor: cardBorder, boxShadow: cardShadow }}
        >
          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.1rem", fontWeight: 700, color: textC }} className="mb-6">
            🏆 Key Milestones
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
                whileHover={{ x: 3 }}
                className="flex items-center gap-3 p-4 rounded-2xl"
                style={{ background: tagBg, border: `1px solid ${tagBorder}` }}
              >
                <span className="text-2xl flex-shrink-0">{m.icon}</span>
                <div>
                  <p className="font-semibold text-sm" style={{ color: textC, fontFamily: "'Space Grotesk', sans-serif" }}>{m.title}</p>
                  <p className="text-xs" style={{ color: subC }}>{m.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
