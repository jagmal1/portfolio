import { useRef, useMemo } from "react";
import { motion, useInView } from "motion/react";

interface Props { isDark: boolean }

function generateHeatmap() {
  const weeks: number[][] = [];
  for (let w = 0; w < 52; w++) {
    const days: number[] = [];
    for (let d = 0; d < 7; d++) {
      const isWeekend = d === 0 || d === 6;
      const base = isWeekend ? 0.25 : 0.6;
      const r = Math.random();
      if (r < 1 - base) days.push(0);
      else if (r < 0.85) days.push(Math.floor(Math.random() * 3) + 1);
      else if (r < 0.95) days.push(Math.floor(Math.random() * 5) + 3);
      else days.push(Math.floor(Math.random() * 6) + 6);
    }
    weeks.push(days);
  }
  return weeks;
}

function GitHubCard({ isDark }: { isDark: boolean }) {
  const heatmap = useMemo(() => generateHeatmap(), []);
  const totalContributions = heatmap.flat().reduce((a, b) => a + b, 0);
  const textC = isDark ? "#e4e8f0" : "#111827";
  const subC = isDark ? "#8892a4" : "#6b7280";
  const borderC = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)";
  const lightColors = ["#eef3ff", "#c7d2fe", "#818cf8", "#6366f1", "#4338ca"];
  const darkColors = ["rgba(255,255,255,0.06)", "#312e81", "#4338ca", "#6366f1", "#818cf8"];
  const heatColors = isDark ? darkColors : lightColors;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-sm"
            style={{ background: isDark ? "#1c1c2e" : "#0a0a14", fontFamily: "'Space Grotesk', sans-serif", border: isDark ? "1px solid rgba(255,255,255,0.1)" : "none" }}
          >
            GH
          </div>
          <div>
            <p className="font-bold text-sm" style={{ color: textC, fontFamily: "'Space Grotesk', sans-serif" }}>jagmal1</p>
            <a href="https://github.com/jagimal1" target="_blank" rel="noreferrer" className="text-indigo-500 text-xs hover:text-indigo-400 transition-colors">
              github.com/jagmal1 ↗
            </a>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs" style={{ color: subC, fontFamily: "'Space Grotesk', sans-serif" }}>Contributions</p>
          <p className="font-bold" style={{ color: textC, fontFamily: "'Space Grotesk', sans-serif" }}>{totalContributions}+</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="flex gap-0.5 min-w-0">
          {heatmap.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-0.5">
              {week.map((count, di) => {
                const idx = count === 0 ? 0 : count <= 2 ? 1 : count <= 4 ? 2 : count <= 7 ? 3 : 4;
                return (
                  <div
                    key={di}
                    title={`${count} contributions`}
                    className="w-2.5 h-2.5 rounded-sm transition-transform hover:scale-125"
                    style={{ background: heatColors[idx], cursor: "default" }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 pt-2 border-t" style={{ borderColor: borderC }}>
        {[
          { label: "Repos", value: "20+" },
          { label: "Commits", value: "500+" },
          { label: "Stars", value: "45+" },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <p className="font-bold text-sm" style={{ color: textC, fontFamily: "'Space Grotesk', sans-serif" }}>{s.value}</p>
            <p className="text-xs" style={{ color: subC }}>{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function LeetCodeCard({ isDark }: { isDark: boolean }) {
  const solved = { easy: 47, medium: 41, hard: 3 };
  const total = solved.easy + solved.medium + solved.hard;
  const textC = isDark ? "#e4e8f0" : "#111827";
  const subC = isDark ? "#8892a4" : "#6b7280";
  const borderC = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)";
  const trackBg = isDark ? "rgba(255,255,255,0.08)" : "#f3f4f6";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-xs"
            style={{ background: "#f89f1b", fontFamily: "'Space Grotesk', sans-serif" }}
          >
            LC
          </div>
          <div>
            <p className="font-bold text-sm" style={{ color: textC, fontFamily: "'Space Grotesk', sans-serif" }}>jagmalinikhiya</p>
            <a href="https://leetcode.com/u/jagmalinikhiya/" target="_blank" rel="noreferrer" className="text-yellow-500 text-xs hover:text-yellow-400 transition-colors">
              leetcode.com ↗
            </a>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold" style={{ color: textC, fontFamily: "'Space Grotesk', sans-serif" }}>{total}</p>
          <p className="text-xs" style={{ color: subC }}>Problems Solved</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {[
          { label: "Easy", count: solved.easy, color: "#22c55e", total: 100 },
          { label: "Medium", count: solved.medium, color: "#f59e0b", total: 80 },
          { label: "Hard", count: solved.hard, color: "#ef4444", total: 30 },
        ].map((d) => (
          <div key={d.label}>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium" style={{ color: d.color, fontFamily: "'Space Grotesk', sans-serif" }}>{d.label}</span>
              <span style={{ color: subC, fontFamily: "'Space Grotesk', sans-serif" }}>{d.count}/{d.total}</span>
            </div>
            <div className="h-2 rounded-full" style={{ background: trackBg }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: d.color }}
                initial={{ width: 0 }}
                animate={{ width: `${(d.count / d.total) * 100}%` }}
                transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3 pt-2 border-t" style={{ borderColor: borderC }}>
        {[
          { label: "Ranking", value: "Top 20%" },
          { label: "Streak", value: "12 days" },
          { label: "Acceptance", value: "63%" },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <p className="font-bold text-xs" style={{ color: textC, fontFamily: "'Space Grotesk', sans-serif" }}>{s.value}</p>
            <p className="text-xs" style={{ color: subC }}>{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function GFGCard({ isDark }: { isDark: boolean }) {
  const textC = isDark ? "#e4e8f0" : "#111827";
  const subC = isDark ? "#8892a4" : "#6b7280";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-xs"
            style={{ background: "#2f8d46", fontFamily: "'Space Grotesk', sans-serif" }}
          >
            GFG
          </div>
          <div>
            <p className="font-bold text-sm" style={{ color: textC, fontFamily: "'Space Grotesk', sans-serif" }}>jagmalctpdy</p>
            <a href="https://www.geeksforgeeks.org/profile/jagmalctpdy/" target="_blank" rel="noreferrer" className="text-green-500 text-xs hover:text-green-400 transition-colors">
              geeksforgeeks.org ↗
            </a>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold" style={{ color: textC, fontFamily: "'Space Grotesk', sans-serif" }}>450+</p>
          <p className="text-xs" style={{ color: subC }}>Problems Solved</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "School", count: 120, color: "#a3e635" },
          { label: "Basic", count: 95, color: "#86efac" },
          { label: "Easy", count: 140, color: "#4ade80" },
          { label: "Medium", count: 80, color: "#22c55e" },
          { label: "Hard", count: 15, color: "#16a34a" },
          { label: "Score", count: 890, color: "#2f8d46", suffix: "pts" },
        ].map((d) => (
          <div
            key={d.label}
            className="flex items-center justify-between px-3 py-2 rounded-xl"
            style={{ background: `${d.color}${isDark ? "18" : "12"}`, border: `1px solid ${d.color}${isDark ? "28" : "25"}` }}
          >
            <span className="text-xs font-medium" style={{ color: isDark ? "#9ca3af" : "#6b7280", fontFamily: "'Space Grotesk', sans-serif" }}>{d.label}</span>
            <span className="text-xs font-bold" style={{ color: d.color, fontFamily: "'Space Grotesk', sans-serif" }}>
              {d.count}{d.suffix ?? ""}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: "rgba(47,141,70,0.08)", border: "1px solid rgba(47,141,70,0.15)" }}>
        <span className="text-sm">🔥</span>
        <span className="text-xs" style={{ color: subC, fontFamily: "'Space Grotesk', sans-serif" }}>
          Current streak: <span className="font-bold text-green-500">8 days</span>
        </span>
      </div>
    </div>
  );
}

function LinkedInCard({ isDark }: { isDark: boolean }) {
  const textC = isDark ? "#e4e8f0" : "#111827";
  const subC = isDark ? "#8892a4" : "#6b7280";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-sm"
          style={{ background: "#0a66c2", fontFamily: "'Space Grotesk', sans-serif" }}
        >
          in
        </div>
        <div>
          <p className="font-bold text-sm" style={{ color: textC, fontFamily: "'Space Grotesk', sans-serif" }}>Jagmal Ram</p>
          <a href="https://linkedin.com/in/jagmal-ram-6a9524247" target="_blank" rel="noreferrer" className="text-blue-400 text-xs hover:text-blue-300 transition-colors">
            linkedin.com/in/jagmal-ram ↗
          </a>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {[
          { icon: "🎓", label: "Education", value: "B.Tech CSE · NIT Jalandhar" },
          { icon: "💼", label: "Current", value: "React Native Dev · Crazinos" },
          { icon: "📍", label: "Location", value: "India · Open to Remote" },
          { icon: "👥", label: "Connections", value: "500+" },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
            style={{
              background: isDark ? "rgba(10,102,194,0.08)" : "rgba(10,102,194,0.04)",
              border: `1px solid ${isDark ? "rgba(10,102,194,0.18)" : "rgba(10,102,194,0.08)"}`,
            }}
          >
            <span className="text-base">{item.icon}</span>
            <div className="min-w-0">
              <p className="text-xs" style={{ color: subC, fontFamily: "'Space Grotesk', sans-serif" }}>{item.label}</p>
              <p className="text-xs font-semibold truncate" style={{ color: textC, fontFamily: "'Space Grotesk', sans-serif" }}>{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      <a
        href="https://linkedin.com/in/jagmal-ram-6a9524247"
        target="_blank"
        rel="noreferrer"
        className="w-full py-2.5 rounded-xl text-white text-xs font-semibold text-center transition-all hover:opacity-90"
        style={{ background: "#0a66c2", fontFamily: "'Space Grotesk', sans-serif" }}
      >
        View Profile →
      </a>
    </div>
  );
}

export function CodingProfiles({ isDark }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const textC = isDark ? "#e4e8f0" : "#0a0a14";
  const accentC = isDark ? "#a5b4fc" : "#6366f1";
  const tagBg = isDark ? "rgba(99,102,241,0.08)" : "rgba(99,102,241,0.08)";
  const tagBorder = isDark ? "rgba(99,102,241,0.18)" : "rgba(99,102,241,0.2)";
  const cardBg = isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.8)";
  const cardBorder = isDark ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.9)";

  const profileCards = [
    { title: "GitHub", accent: "#0a0a14", component: () => <GitHubCard isDark={isDark} /> },
    { title: "LeetCode", accent: "#f89f1b", component: () => <LeetCodeCard isDark={isDark} /> },
    { title: "GeeksforGeeks", accent: "#2f8d46", component: () => <GFGCard isDark={isDark} /> },
    { title: "LinkedIn", accent: "#0a66c2", component: () => <LinkedInCard isDark={isDark} /> },
  ];

  return (
    <section ref={ref} id="profiles" className="relative py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4 border"
            style={{ background: tagBg, borderColor: tagBorder, color: accentC, fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Coding Profiles
          </span>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(2.2rem, 4vw, 3rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: textC,
            }}
          >
            Find Me{" "}
            <span style={{ backgroundImage: "linear-gradient(135deg, #6366f1, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", color: "transparent" }}>
              Online
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {profileCards.map(({ title, accent, component: Card }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -4, boxShadow: `0 24px 60px rgba(0,0,0,${isDark ? 0.5 : 0.1}), 0 0 0 1px ${accent}22` }}
              className="group p-6 rounded-3xl border overflow-hidden relative"
              style={{
                background: cardBg,
                backdropFilter: "blur(20px)",
                borderColor: cardBorder,
                boxShadow: isDark ? "0 8px 32px rgba(0,0,0,0.4)" : "0 8px 32px rgba(0,0,0,0.06)",
                transition: "all 0.3s ease",
              }}
              data-cursor="card"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-3xl"
                style={{ background: `linear-gradient(135deg, ${accent}${isDark ? "10" : "06"}, transparent)` }}
              />
              <div className="relative">
                <Card />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
