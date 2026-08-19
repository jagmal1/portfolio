import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

interface Props { isDark: boolean }

function Counter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
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
      setCount(Math.round(eased * target));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);
  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

const stats = [
  { icon: "📱", value: 100, suffix: "K+", label: "App Downloads", desc: "Across Play Store & App Store" },
  { icon: "⭐", value: 4.8, suffix: "★", label: "Play Store Rating", desc: "Average user rating" },
  { icon: "💬", value: 9, suffix: "K+", label: "App Reviews", desc: "User feedback collected" },
  { icon: "🚀", value: 3, suffix: "+", label: "Production Apps", desc: "Live and in use by thousands" },
  { icon: "📦", value: 10, suffix: "+", label: "Total Projects", desc: "Web, mobile and APIs" },
  { icon: "📝", value: 500, suffix: "+", label: "Git Commits", desc: "Across all repositories" },
];

export function StatsSection({ isDark }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const textC = isDark ? "#e4e8f0" : "#0a0a14";
  const subC = isDark ? "#8892a4" : "#6b7280";
  const cardBg = isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.75)";
  const cardBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.8)";

  return (
    <section ref={ref} className="relative py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -4, scale: 1.03 }}
              className="relative flex flex-col items-center text-center p-5 rounded-2xl border group overflow-hidden"
              style={{
                background: cardBg,
                backdropFilter: "blur(20px)",
                borderColor: cardBorder,
                boxShadow: isDark ? "0 4px 20px rgba(0,0,0,0.3)" : "0 4px 20px rgba(0,0,0,0.05)",
              }}
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.05), rgba(167,139,250,0.05))" }}
              />
              <span className="text-2xl mb-2">{s.icon}</span>
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "1.75rem",
                  fontWeight: 800,
                  backgroundImage: isDark
                    ? "linear-gradient(135deg, #e4e8f0, #a5b4fc)"
                    : "linear-gradient(135deg, #0a0a14, #6366f1)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent",
                  lineHeight: 1.1,
                }}
              >
                {s.label === "Play Store Rating" ? (
                  <Counter target={48} suffix="★" prefix="" />
                ) : (
                  <Counter target={s.value} suffix={s.suffix} />
                )}
              </div>
              <p className="text-xs font-semibold mt-1 mb-0.5" style={{ color: textC, fontFamily: "'Space Grotesk', sans-serif" }}>
                {s.label}
              </p>
              <p className="text-xs leading-tight" style={{ color: subC }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
