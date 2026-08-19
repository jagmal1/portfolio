import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

const commands = [
  { id: "hero", label: "Go to Home", icon: "🏠", section: "hero" },
  { id: "about", label: "About Me", icon: "👤", section: "about" },
  { id: "skills", label: "Tech Stack", icon: "⚡", section: "skills" },
  { id: "experience", label: "Experience Timeline", icon: "💼", section: "experience" },
  { id: "projects", label: "Featured Projects", icon: "🚀", section: "projects" },
  { id: "services", label: "What I Do", icon: "🛠", section: "services" },
  { id: "achievements", label: "Achievements", icon: "🏆", section: "achievements" },
  { id: "contact", label: "Contact Me", icon: "✉️", section: "contact" },
  { id: "github", label: "Open GitHub", icon: "⌥", href: "https://github.com/jagimal1" },
  { id: "linkedin", label: "Open LinkedIn", icon: "in", href: "https://linkedin.com/in/jagmal-ram-6a9524247" },
  { id: "figma", label: "Open Figma", icon: "🎨", href: "https://www.figma.com" },
  { id: "resume", label: "Download Resume", icon: "📄", href: "#resume" },
  { id: "email", label: "Send Email", icon: "📧", href: "mailto:jagmalinikhiya@gmail.com" },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = commands.filter(
    (c) =>
      c.label.toLowerCase().includes(query.toLowerCase()) ||
      (c.section || "").includes(query.toLowerCase())
  );

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  const execute = (cmd: typeof commands[0]) => {
    if (cmd.href) {
      window.open(cmd.href, "_blank");
    } else if (cmd.section) {
      const el = document.getElementById(cmd.section);
      el?.scrollIntoView({ behavior: "smooth" });
    }
    onClose();
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") setSelected((s) => Math.min(s + 1, filtered.length - 1));
      if (e.key === "ArrowUp") setSelected((s) => Math.max(s - 1, 0));
      if (e.key === "Enter" && filtered[selected]) execute(filtered[selected]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, selected]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9990] flex items-start justify-center pt-[20vh] px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={onClose}
        >
          <div
            className="absolute inset-0"
            style={{ background: "rgba(10,10,20,0.4)", backdropFilter: "blur(12px)" }}
          />

          <motion.div
            className="relative w-full max-w-lg rounded-2xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(40px)",
              boxShadow: "0 40px 120px rgba(0,0,0,0.25), 0 0 0 1px rgba(99,102,241,0.1)",
            }}
            initial={{ scale: 0.95, y: -20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: -20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex items-center gap-3 px-5 py-4 border-b"
              style={{ borderColor: "rgba(0,0,0,0.06)" }}
            >
              <span className="text-lg">⌘</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.95rem" }}
              />
              <kbd
                className="px-2 py-0.5 rounded text-xs text-gray-400 border"
                style={{ fontFamily: "'Space Grotesk', sans-serif", borderColor: "rgba(0,0,0,0.1)" }}
              >
                ESC
              </kbd>
            </div>

            <div className="max-h-72 overflow-y-auto py-2">
              {filtered.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  No results found
                </p>
              ) : (
                filtered.map((cmd, i) => (
                  <button
                    key={cmd.id}
                    onClick={() => execute(cmd)}
                    onMouseEnter={() => setSelected(i)}
                    className="w-full flex items-center gap-3 px-5 py-3 text-left transition-colors"
                    style={{
                      background: i === selected ? "rgba(99,102,241,0.06)" : "transparent",
                      borderLeft: i === selected ? "2px solid #6366f1" : "2px solid transparent",
                    }}
                  >
                    <span
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                      style={{
                        background: i === selected ? "rgba(99,102,241,0.1)" : "rgba(0,0,0,0.04)",
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 700,
                        color: i === selected ? "#6366f1" : "#6b7280",
                      }}
                    >
                      {cmd.icon}
                    </span>
                    <span
                      className="text-sm"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        color: i === selected ? "#0a0a14" : "#374151",
                        fontWeight: i === selected ? 600 : 400,
                      }}
                    >
                      {cmd.label}
                    </span>
                    {cmd.href && (
                      <span className="ml-auto text-xs text-gray-300">↗</span>
                    )}
                  </button>
                ))
              )}
            </div>

            <div
              className="flex items-center gap-4 px-5 py-3 border-t"
              style={{ borderColor: "rgba(0,0,0,0.06)", background: "rgba(0,0,0,0.01)" }}
            >
              {[["↑↓", "Navigate"], ["↵", "Select"], ["ESC", "Close"]].map(([key, label]) => (
                <div key={key} className="flex items-center gap-1.5">
                  <kbd
                    className="px-1.5 py-0.5 rounded text-xs border text-gray-400"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", borderColor: "rgba(0,0,0,0.1)", background: "rgba(0,0,0,0.03)" }}
                  >
                    {key}
                  </kbd>
                  <span className="text-xs text-gray-300" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
