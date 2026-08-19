import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

interface Props {
  isDark: boolean;
  onToggleTheme: () => void;
}

export function Navigation({ isDark, onToggleTheme }: Props) {
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showThemeTooltip, setShowThemeTooltip] = useState(true);
  const { scrollY } = useScroll();
  const navPadding = useTransform(scrollY, [0, 80], [18, 10]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navItems.map((n) => n.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.4 }
    );
    sections.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const bg = isDark
    ? scrolled ? "rgba(10,11,20,0.88)" : "rgba(10,11,20,0.5)"
    : scrolled ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.55)";
  const borderC = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";
  const textC = isDark ? "#c8d0e0" : "#374151";
  const activeC = isDark ? "#a5b4fc" : "#6366f1";

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4"
        style={{ paddingTop: navPadding, paddingBottom: navPadding }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
      >
        <nav
          className="flex items-center gap-1 rounded-2xl border px-4 w-full max-w-4xl"
          style={{
            background: bg,
            borderColor: borderC,
            backdropFilter: "blur(28px)",
            boxShadow: isDark
              ? "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)"
              : "0 8px 32px rgba(15,20,50,0.1), inset 0 1px 0 rgba(255,255,255,0.9)",
            transition: "all 0.3s ease",
          }}
        >
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mr-4 flex items-center gap-2 py-2.5 group flex-shrink-0"
          >
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-sm font-bold"
              style={{ background: "linear-gradient(135deg,#6366f1,#a78bfa)", boxShadow: "0 2px 8px rgba(99,102,241,0.4)", fontFamily: "'Space Grotesk',sans-serif" }}
            >
              J
            </div>
            <span
              className="text-sm font-semibold hidden sm:block transition-colors"
              style={{ fontFamily: "'Space Grotesk',sans-serif", color: isDark ? "#e4e8f0" : "#0B0C14" }}
            >
              Jagmal Ram
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex flex-1 items-center">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className="relative px-3 py-2.5 text-sm font-medium transition-colors group"
                  style={{
                    color: isActive ? activeC : textC,
                    fontFamily: "'Space Grotesk',sans-serif",
                  }}
                >
                  {item.label}
                  <motion.span
                    className="absolute bottom-1.5 left-3 right-3 h-px rounded-full"
                    style={{ background: `linear-gradient(90deg,${activeC},#a78bfa)` }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isActive ? 1 : 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </button>
              );
            })}
          </div>

          {/* Right side: theme toggle + hire btn */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Theme toggle container */}
            <div className="relative">
              <motion.button
                onClick={() => {
                  setShowThemeTooltip(false);
                  onToggleTheme();
                }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="w-9 h-9 rounded-xl flex items-center justify-center border text-base transition-all"
                style={{
                  background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
                  borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
                  boxShadow: isDark ? "0 0 12px rgba(129,140,248,0.2)" : "none",
                }}
                title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                <motion.span
                  key={isDark ? "moon" : "sun"}
                  initial={{ rotate: -45, opacity: 0, scale: 0.7 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 45, opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.25 }}
                >
                  {isDark ? "☀️" : "🌙"}
                </motion.span>
              </motion.button>

              {/* Custom Popup Tooltip */}
              <AnimatePresence>
                {showThemeTooltip && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.9 }}
                    transition={{ delay: 0.6, duration: 0.3 }}
                    className="absolute top-full right-0 mt-3.5 whitespace-nowrap z-50 flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold"
                    style={{
                      background: isDark ? "rgba(18, 19, 31, 0.96)" : "rgba(255, 255, 255, 0.96)",
                      borderColor: isDark ? "rgba(99,102,241,0.4)" : "rgba(99,102,241,0.35)",
                      color: isDark ? "#a5b4fc" : "#4f46e5",
                      boxShadow: isDark ? "0 10px 30px rgba(0,0,0,0.5)" : "0 10px 30px rgba(99,102,241,0.15)",
                      backdropFilter: "blur(12px)",
                      fontFamily: "'Space Grotesk', sans-serif"
                    }}
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                    </span>
                    <span>Change theme from here</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowThemeTooltip(false);
                      }}
                      className="ml-1 text-xs opacity-60 hover:opacity-100 transition-opacity"
                      aria-label="Close tooltip"
                    >
                      ✕
                    </button>

                    {/* Arrow pointer */}
                    <div
                      className="absolute -top-1.5 right-3 w-3 h-3 rotate-45 border-t border-l"
                      style={{
                        background: isDark ? "#12131F" : "#ffffff",
                        borderColor: isDark ? "rgba(99,102,241,0.4)" : "rgba(99,102,241,0.35)",
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Hire Me button */}
            <button
              onClick={() => scrollTo("#contact")}
              className="hidden sm:flex px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                boxShadow: "0 2px 12px rgba(99,102,241,0.4)",
                fontFamily: "'Space Grotesk',sans-serif",
              }}
            >
              Hire Me
            </button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden w-9 h-9 rounded-xl flex flex-col items-center justify-center gap-1.5 border"
              style={{
                background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                borderColor: borderC,
              }}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="block w-4 h-0.5 rounded-full"
                  style={{ background: textC }}
                  animate={mobileOpen
                    ? i === 1 ? { opacity: 0 } : i === 0 ? { rotate: 45, y: 6 } : { rotate: -45, y: -6 }
                    : { rotate: 0, y: 0, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              ))}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <motion.div
        className="fixed inset-x-4 z-40 rounded-2xl border overflow-hidden md:hidden"
        style={{
          top: "80px",
          background: isDark ? "rgba(12,13,26,0.97)" : "rgba(255,255,255,0.97)",
          backdropFilter: "blur(24px)",
          borderColor: borderC,
          boxShadow: isDark ? "0 20px 60px rgba(0,0,0,0.6)" : "0 20px 60px rgba(0,0,0,0.12)",
          transformOrigin: "top",
        }}
        initial={{ opacity: 0, y: -16, scaleY: 0.9 }}
        animate={mobileOpen ? { opacity: 1, y: 0, scaleY: 1 } : { opacity: 0, y: -16, scaleY: 0.9 }}
        transition={{ duration: 0.25, ease: [0.76, 0, 0.24, 1] }}
        aria-hidden={!mobileOpen}
      >
        {navItems.map((item, i) => (
          <motion.button
            key={item.href}
            onClick={() => scrollTo(item.href)}
            className="w-full text-left px-5 py-4 text-sm font-medium border-b transition-colors"
            style={{
              color: activeSection === item.href.slice(1) ? activeC : textC,
              borderColor: borderC,
              fontFamily: "'Space Grotesk',sans-serif",
            }}
            initial={{ opacity: 0, x: -12 }}
            animate={mobileOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
            transition={{ delay: i * 0.04 }}
          >
            {item.label}
          </motion.button>
        ))}
        <div className="flex items-center gap-3 px-5 py-4">
          <button
            onClick={() => { scrollTo("#contact"); }}
            className="flex-1 py-2.5 rounded-xl text-white text-sm font-semibold text-center"
            style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", fontFamily: "'Space Grotesk',sans-serif" }}
          >
            Hire Me
          </button>
        </div>
      </motion.div>
    </>
  );
}
