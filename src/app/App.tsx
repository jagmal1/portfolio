import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

import { CustomCursor } from "./components/CustomCursor";
import { LoadingScreen } from "./components/LoadingScreen";
import { Navigation } from "./components/Navigation";
import { BackgroundEffects } from "./components/BackgroundEffects";
import { ScrollProgress } from "./components/ScrollProgress";
import { CommandPalette } from "./components/CommandPalette";

import { HeroSection } from "./components/HeroSection";
import { StatsSection } from "./components/StatsSection";
import { AboutSection } from "./components/AboutSection";
import { CodingProfiles } from "./components/CodingProfiles";
import { SkillsSection } from "./components/SkillsSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { ServicesSection } from "./components/ServicesSection";
import { AchievementsSection } from "./components/AchievementsSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";

/* ── Dark mode helpers ── */
function getInitialTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem("jr-theme") as "light" | "dark" | null;
  if (stored) return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);

  /* Apply theme class to <html> so CSS variables and Tailwind dark: work */
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("jr-theme", theme);
  }, [theme]);

  /* Track system preference changes */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("jr-theme")) {
        setTheme(e.matches ? "dark" : "light");
      }
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  const handleLoadComplete = useCallback(() => setLoaded(true), []);

  /* ⌘K / Ctrl+K command palette */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isDark = theme === "dark";

  return ( 
    <div
      className="relative min-h-screen"
      style={{
        background: isDark
          ? "linear-gradient(160deg,#080910 0%,#0C0D1A 50%,#0E0F1E 100%)"
          : "linear-gradient(160deg,#FFFCF7 0%,#F3F5FA 45%,#EEF2FF 100%)",
          //  : "linear-gradient(160deg,#FFFCF7 0%,#F6F3EB 45%,#EBE5D6 100%)",

        fontFamily: "'Inter', sans-serif",
        cursor: "none",
        transition: "background 0.4s ease",
      }}
    >
      <CustomCursor isDark={isDark} />

      <AnimatePresence>
        {!loaded && <LoadingScreen key="loader" onComplete={handleLoadComplete} />}
      </AnimatePresence>

      <AnimatePresence>
        {loaded && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <ScrollProgress />
            <BackgroundEffects isDark={isDark} />
            <Navigation isDark={isDark} onToggleTheme={toggleTheme} />
            <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />

            {/* ⌘K hint */}
            <motion.button
              className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2 px-3 py-2 rounded-xl border text-xs"
              style={{
                background: isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.85)",
                backdropFilter: "blur(12px)",
                borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
                color: isDark ? "#8892A4" : "#6b7280",
                fontFamily: "'Space Grotesk', sans-serif",
                boxShadow: isDark ? "0 4px 16px rgba(0,0,0,0.3)" : "0 4px 16px rgba(0,0,0,0.06)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              onClick={() => setCmdOpen(true)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <kbd
                className="px-1.5 py-0.5 rounded text-xs border"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  borderColor: isDark ? "rgba(255,255,255,0.15)" : "#e5e7eb",
                  background: isDark ? "rgba(255,255,255,0.06)" : "#fff",
                  color: isDark ? "#c8d0e0" : "#374151",
                }}
              >
                ⌘K
              </kbd>
              <span>Command Palette</span>
            </motion.button>

            <main className="relative z-10">
              <HeroSection isDark={isDark} />
              {/* <StatsSection isDark={isDark} /> */}
              <AboutSection isDark={isDark} />
              <CodingProfiles isDark={isDark} />
              <SkillsSection isDark={isDark} />
              <ExperienceSection isDark={isDark} />
              <ProjectsSection isDark={isDark} />
              <ServicesSection isDark={isDark} />
              <AchievementsSection isDark={isDark} />
              <TestimonialsSection isDark={isDark} />
              <ContactSection isDark={isDark} />
            </main>

            <Footer isDark={isDark} />
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        * { cursor: none !important; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb {
          background: ${isDark ? "rgba(129,140,248,0.25)" : "rgba(99,102,241,0.18)"};
          border-radius: 9999px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: ${isDark ? "rgba(129,140,248,0.5)" : "rgba(99,102,241,0.42)"};
        }
        html { scroll-behavior: smooth; }
        ::selection {
          background: rgba(99,102,241,0.18);
          color: ${isDark ? "#a5b4fc" : "#6366f1"};
        }
      `}</style>
    </div>
  );
}
