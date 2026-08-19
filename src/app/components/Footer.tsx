import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";

interface Props { isDark: boolean }

const techCredit = [
  { name: "React", href: "https://react.dev" },
  { name: "TypeScript", href: "https://typescriptlang.org" },
  { name: "Tailwind CSS", href: "https://tailwindcss.com" },
  { name: "Figma", href: "https://figma.com" },
  { name: "Motion", href: "https://motion.dev" },
  { name: "Vite", href: "https://vitejs.dev" },
];

export function Footer({ isDark }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [copied, setCopied] = useState(false);
  const [rocket, setRocket] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("jagmalinikhiya@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollTop = () => {
    setRocket(true);
    setTimeout(() => { window.scrollTo({ top: 0, behavior: "smooth" }); setTimeout(() => setRocket(false), 800); }, 300);
  };

  const links = [
    { icon: "GH", label: "GitHub", href: "https://github.com/jagimal1" },
    { icon: "in", label: "LinkedIn", href: "https://linkedin.com/in/jagmal-ram-6a9524247" },
    { icon: "LC", label: "LeetCode", href: "https://leetcode.com/u/jagmalinikhiya/" },
    { icon: "GFG", label: "GeeksforGeeks", href: "https://www.geeksforgeeks.org/profile/jagmalctpdy/" },
    { icon: "Fg", label: "Figma", href: "https://www.figma.com" },
  ];

  const textC = isDark ? "#e4e8f0" : "#0a0a14";
  const subC = isDark ? "#8892a4" : "#9ca3af";
  const borderC = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)";
  const cardBg = isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.7)";

  return (
    <footer ref={ref} className="relative pt-20 pb-10 px-4 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 overflow-hidden" style={{ height: 70 }}>
        <svg viewBox="0 0 1440 70" fill="none" className="w-full h-full" preserveAspectRatio="none">
          <motion.path
            d="M0,35 C240,70 480,0 720,35 C960,70 1200,0 1440,35 L1440,70 L0,70 Z"
            fill={isDark ? "rgba(99,102,241,0.06)" : "rgba(99,102,241,0.04)"}
            animate={{
              d: [
                "M0,35 C240,70 480,0 720,35 C960,70 1200,0 1440,35 L1440,70 L0,70 Z",
                "M0,15 C200,55 480,5 720,45 C960,85 1240,5 1440,25 L1440,70 L0,70 Z",
                "M0,35 C240,70 480,0 720,35 C960,70 1200,0 1440,35 L1440,70 L0,70 Z",
              ],
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: textC,
            }}
          >
            Let's build something{" "}
            <span style={{ backgroundImage: "linear-gradient(135deg, #6366f1, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", color: "transparent" }}>
              amazing
            </span>{" "}together.
          </h2>
          <p className="mt-3 text-sm" style={{ color: subC, fontFamily: "'Inter', sans-serif" }}>
            Open to full-time SDE roles and freelance projects.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col items-center gap-6"
        >
          <motion.button
            onClick={copyEmail}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-3 px-6 py-3.5 rounded-2xl border transition-all"
            style={{
              background: cardBg,
              backdropFilter: "blur(12px)",
              borderColor: copied ? "rgba(16,185,129,0.35)" : borderC,
              boxShadow: copied
                ? "0 4px 20px rgba(16,185,129,0.15)"
                : isDark ? "0 4px 16px rgba(0,0,0,0.3)" : "0 4px 16px rgba(0,0,0,0.06)",
            }}
          >
            <span className="text-lg">{copied ? "✓" : "✉️"}</span>
            <span
              className="font-medium"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: copied ? "#10b981" : isDark ? "#c8d0e0" : "#374151", fontSize: "0.95rem" }}
            >
              {copied ? "Copied to clipboard!" : "jagmalinikhiya@gmail.com"}
            </span>
            {!copied && (
              <span
                className="text-xs border rounded px-1.5 py-0.5"
                style={{ color: subC, borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)", fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Click to copy
              </span>
            )}
          </motion.button>

          <div className="flex items-center gap-3">
            {links.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -5, scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className="min-w-[44px] h-11 px-3 rounded-xl flex items-center justify-center font-bold text-xs border transition-colors"
                style={{
                  background: cardBg,
                  backdropFilter: "blur(8px)",
                  borderColor: borderC,
                  color: isDark ? "#8892a4" : "#6b7280",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
                title={s.label}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>

          {/* <motion.a
            href="#resume"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-3 rounded-xl text-white font-semibold text-sm"
            style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              boxShadow: "0 4px 16px rgba(99,102,241,0.35)",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            📄 Download Resume
          </motion.a> */}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: borderC }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
              style={{ background: "linear-gradient(135deg, #6366f1, #a78bfa)", fontFamily: "'Space Grotesk', sans-serif" }}
            >
              J
            </div>
            <span className="text-sm" style={{ color: subC, fontFamily: "'Space Grotesk', sans-serif" }}>
              © 2026 Jagmal Ram. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="text-xs" style={{ color: subC, fontFamily: "'Inter', sans-serif" }}>Made with ❤️ using</span>
            {techCredit.map((t, i) => (
              <span key={t.name}>
                <a
                  href={t.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-medium transition-colors"
                  style={{ color: isDark ? "#818cf8" : "#6366f1", fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {t.name}
                </a>
                {i < techCredit.length - 1 && (
                  <span className="mx-1" style={{ color: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.15)" }}>·</span>
                )}
              </span>
            ))}
          </div>

          <motion.button
            onClick={scrollTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-xl flex items-center justify-center border transition-colors"
            style={{ background: cardBg, backdropFilter: "blur(8px)", borderColor: borderC, overflow: "hidden" }}
            title="Back to top"
          >
            <motion.span
              animate={rocket ? { y: [-0, -50], opacity: [1, 0] } : { y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              🚀
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
}
