import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform, AnimatePresence } from "motion/react";
import resumePDF from "../../assets/Jagmal-Resume.pdf";

interface Props { isDark: boolean }

function TiltCard({ children, className, isDark }: { children: React.ReactNode; className?: string; isDark: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rX = useSpring(useTransform(y, [-120, 120], [10, -10]), { stiffness: 200, damping: 25 });
  const rY = useSpring(useTransform(x, [-120, 120], [-10, 10]), { stiffness: 200, damping: 25 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX: rX, rotateY: rY, transformStyle: "preserve-3d", perspective: 1000 }}
      className={className}
      data-cursor="card"
    >
      {children}
    </motion.div>
  );
}

/* ── 3D Tilt Resume Viewer Modal ── */
function ResumeModal({ isDark, onClose }: { isDark: boolean; onClose: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rX = useSpring(useTransform(my, [-300, 300], [12, -12]), { stiffness: 150, damping: 25 });
  const rY = useSpring(useTransform(mx, [-400, 400], [-12, 12]), { stiffness: 150, damping: 25 });
  const glowX = useTransform(mx, [-400, 400], [0, 100]);
  const glowY = useTransform(my, [-300, 300], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(e.clientX - rect.left - rect.width / 2);
    my.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = resumePDF;
    a.download = "Jagmal-Resume.pdf";
    a.click();
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: isDark
            ? "rgba(5,7,20,0.88)"
            : "rgba(10,10,30,0.75)",
          backdropFilter: "blur(18px)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Floating ambient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #6366f1, transparent)", top: "10%", left: "5%" }}
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-80 h-80 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #a78bfa, transparent)", bottom: "10%", right: "5%" }}
          animate={{ x: [0, -35, 0], y: [0, 25, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute w-64 h-64 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #06b6d4, transparent)", top: "50%", right: "20%" }}
          animate={{ x: [0, 20, 0], y: [0, -40, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      {/* Modal Content */}
      <motion.div
        ref={cardRef}
        onClick={(e) => e.stopPropagation()}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { mx.set(0); my.set(0); }}
        style={{
          rotateX: rX,
          rotateY: rY,
          transformStyle: "preserve-3d",
          perspective: 1200,
        }}
        initial={{ scale: 0.7, opacity: 0, y: 60 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.7, opacity: 0, y: 60 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="relative z-10 w-full max-w-3xl max-h-[88vh] flex flex-col"
      >
        {/* Dynamic glow that follows mouse */}
        <motion.div
          className="absolute -inset-1 rounded-3xl opacity-40 blur-xl pointer-events-none"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([gx, gy]) =>
                `radial-gradient(circle at ${gx}% ${gy}%, #6366f1 0%, #a78bfa 40%, #06b6d4 100%)`
            ),
          }}
        />

        {/* Card shell */}
        <div
          className="relative rounded-3xl border overflow-hidden flex flex-col max-h-[88vh]"
          style={{
            background: isDark
              ? "rgba(13,15,35,0.95)"
              : "rgba(245,247,255,0.97)",
            borderColor: isDark ? "rgba(129,140,248,0.25)" : "rgba(99,102,241,0.2)",
            boxShadow: isDark
              ? "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(129,140,248,0.1)"
              : "0 32px 80px rgba(15,20,60,0.2), 0 0 0 1px rgba(99,102,241,0.1)",
            backdropFilter: "blur(30px)",
          }}
        >
          {/* Header bar */}
          <div
            className="flex items-center justify-between px-6 py-4 border-b"
            style={{
              borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
              background: isDark
                ? "rgba(99,102,241,0.06)"
                : "rgba(99,102,241,0.04)",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400 opacity-90" />
                <div className="w-3 h-3 rounded-full bg-yellow-400 opacity-90" />
                <div className="w-3 h-3 rounded-full bg-green-400 opacity-90" />
              </div>
              <span
                className="text-sm font-semibold"
                style={{
                  color: isDark ? "#a5b4fc" : "#6366f1",
                  fontFamily: "'Space Grotesk',sans-serif",
                }}
              >
                📄 Jagmal-Resume.pdf
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Download button in header */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-1.5 rounded-xl text-white text-xs font-semibold"
                style={{
                  background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                  boxShadow: "0 4px 14px rgba(99,102,241,0.4)",
                  fontFamily: "'Space Grotesk',sans-serif",
                }}
              >
                ↓ Download
              </motion.button>

              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-lg"
                style={{
                  background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                  color: isDark ? "#8892A4" : "#64748B",
                }}
              >
                ✕
              </motion.button>
            </div>
          </div>

          {/* PDF Iframe */}
          <div className="relative flex-1" style={{ height: "70vh", maxHeight: "650px" }}>
            {/* Corner accent glows */}
            <div
              className="absolute top-0 left-0 w-32 h-32 rounded-br-full opacity-10 pointer-events-none"
              style={{ background: "radial-gradient(circle, #6366f1, transparent)" }}
            />
            <div
              className="absolute bottom-0 right-0 w-32 h-32 rounded-tl-full opacity-10 pointer-events-none"
              style={{ background: "radial-gradient(circle, #a78bfa, transparent)" }}
            />

            <iframe
              src={`${resumePDF}#toolbar=0&navpanes=0&scrollbar=1`}
              className="w-full h-full"
              style={{ border: "none" }}
              title="Jagmal Resume"
            />
          </div>

          {/* Footer with download CTA */}
          <div
            className="flex items-center justify-between px-6 py-4 border-t"
            style={{
              borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
              background: isDark ? "rgba(99,102,241,0.04)" : "rgba(99,102,241,0.02)",
            }}
          >
            <p
              className="text-xs"
              style={{
                color: isDark ? "#6b7280" : "#94a3b8",
                fontFamily: "'Space Grotesk',sans-serif",
              }}
            >
              Jagmal Ram · Software Engineer · Available for Full-time SDE Roles
            </p>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 8px 24px rgba(99,102,241,0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-white text-sm font-semibold"
              style={{
                background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                boxShadow: "0 4px 16px rgba(99,102,241,0.35)",
                fontFamily: "'Space Grotesk',sans-serif",
              }}
            >
              <span>↓</span>
              <span>Download Resume</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

const infoCards = [
  { icon: "🎓", label: "Education", title: "B.Tech CSE", sub: "NIT Jalandhar", accent: "#6366f1" },
  { icon: "💼", label: "Experience", title: "Frontend Dev Intern", sub: "Hfactor", accent: "#8b5cf6" },
  { icon: "📍", label: "Location", title: "India", sub: "Open to Remote", accent: "#06b6d4" },
  { icon: "📧", label: "Email", title: "jagmalinikhiya@gmail.com", sub: "Response < 24h", accent: "#10b981" },
  { icon: "📱", label: "Phone", title: "+91-9024456752", sub: "WhatsApp Available", accent: "#f59e0b" },
  { icon: "💻", label: "Open to", title: "Full-time SDE Roles", sub: "Immediate Joiner", accent: "#ec4899" },
];

const whatIDo = [
  "Full Stack Development", "React Native Development",
  "REST API Development", "Backend Architecture",
  "Database Design", "UI/UX Development",
  "Performance Optimization", "Deployment & DevOps",
];

export function AboutSection({ isDark }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [resumeOpen, setResumeOpen] = useState(false);

  const glass = {
    background: isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.85)",
    backdropFilter: "blur(20px)",
    borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.9)",
    boxShadow: isDark ? "0 8px 32px rgba(0,0,0,0.4)" : "0 8px 32px rgba(15,20,50,0.07)",
  };
  const textC = isDark ? "#e4e8f0" : "#0B0C14";
  const subC = isDark ? "#8892A4" : "#64748B";
  const accentC = isDark ? "#a5b4fc" : "#6366f1";
  const tagBg = isDark ? "rgba(129,140,248,0.1)" : "rgba(99,102,241,0.07)";
  const tagBorder = isDark ? "rgba(129,140,248,0.22)" : "rgba(99,102,241,0.18)";

  return (
    <>
      <section ref={ref} id="about" className="relative py-32 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4 border"
            style={{ background: tagBg, borderColor: tagBorder, color: accentC, fontFamily: "'Space Grotesk',sans-serif" }}
          >
            About Me
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
            Who I Am &{" "}
            <span style={{ backgroundImage: "linear-gradient(135deg,#6366f1,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", color: "transparent" }}>
              What I Build
            </span>
          </h2>
        </motion.div>

        {/* ── [IMAGE LEFT] [TEXT RIGHT] ── */}
        <div className="grid lg:grid-cols-2 gap-14 items-start">

          {/* ─── LEFT: Profile visual + floating badges ─── */}
          <div className="flex flex-col gap-6">
            <TiltCard isDark={isDark} className="rounded-3xl">
              <div
                className="p-8 rounded-3xl border relative overflow-hidden"
                style={glass}
              >
                {/* Corner glow */}
                <div
                  className="absolute top-0 right-0 w-52 h-52 rounded-full opacity-20 pointer-events-none"
                  style={{ background: "radial-gradient(circle, rgba(99,102,241,0.5), transparent)" }}
                />

                {/* Avatar + identity */}
                <div className="flex items-center gap-5 mb-6 relative">
                  <motion.div
                    className="flex-shrink-0 w-24 h-24 rounded-2xl flex items-center justify-center text-white text-3xl font-black"
                    style={{
                      background: "linear-gradient(135deg,#4F46E5,#7C3AED,#0EA5E9)",
                      boxShadow: "0 8px 28px rgba(99,102,241,0.45)",
                      fontFamily: "'Space Grotesk',sans-serif",
                    }}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    JR
                  </motion.div>
                  <div>
                    <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "1.5rem", fontWeight: 800, color: textC, letterSpacing: "-0.02em" }}>
                      Jagmal Ram
                    </h3>
                    <p className="text-sm font-medium mt-0.5" style={{ color: accentC, fontFamily: "'Space Grotesk',sans-serif" }}>
                      Software Engineer
                    </p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-medium" style={{ color: "#34d399", fontFamily: "'Space Grotesk',sans-serif" }}>
                        Open to Opportunities
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-3 text-sm leading-relaxed relative" style={{ color: subC, fontFamily: "'Inter',sans-serif" }}>
                  <p>
                    I'm a Software Engineer specializing in{" "}
                    <strong style={{ color: textC }}>Full Stack Web and Mobile Application Development</strong>.
                    Graduated with a B.Tech in CSE from{" "}
                    <strong style={{ color: accentC }}>NIT Jalandhar</strong>.
                  </p>
                  <p>
                    Built production-grade apps — from healthcare platforms to gaming apps with{" "}
                    <strong style={{ color: textC }}>100K+ downloads and 4.8★ ratings</strong>.
                  </p>
                  <p>
                    Currently focused on modern web, React Native, and AI-powered products. Always open to challenging roles and exciting collaborations.
                  </p>
                </div>
              </div>
            </TiltCard>

            {/* What I Do panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <TiltCard isDark={isDark} className="rounded-2xl">
                <div
                  className="p-5 rounded-2xl border"
                  style={{
                    background: isDark ? "rgba(129,140,248,0.05)" : "rgba(99,102,241,0.04)",
                    borderColor: isDark ? "rgba(129,140,248,0.12)" : "rgba(99,102,241,0.1)",
                  }}
                >
                  <h4 className="text-sm font-bold mb-3" style={{ color: accentC, fontFamily: "'Space Grotesk',sans-serif" }}>
                    ✓ What I Do
                  </h4>
                  <div className="grid grid-cols-2 gap-y-1.5 gap-x-3">
                    {whatIDo.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-xs" style={{ color: subC }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                        <span style={{ fontFamily: "'Inter',sans-serif" }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </div>

          {/* ─── RIGHT: Quick Info Cards + CTAs ─── */}
          <div className="flex flex-col gap-4">
            <motion.h3
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="text-xs font-semibold tracking-widest uppercase mb-1"
              style={{ color: isDark ? "#6b7280" : "#94a3b8", fontFamily: "'Space Grotesk',sans-serif" }}
            >
              Quick Info
            </motion.h3>

            <div className="grid grid-cols-2 gap-3">
              {infoCards.map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.25 + i * 0.07 }}
                >
                  <TiltCard isDark={isDark} className="rounded-2xl">
                    <div
                      className="relative group p-4 rounded-2xl border overflow-hidden"
                      style={{
                        background: isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.8)",
                        backdropFilter: "blur(14px)",
                        borderColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.85)",
                        boxShadow: isDark ? "0 4px 16px rgba(0,0,0,0.3)" : "0 4px 16px rgba(15,20,50,0.05)",
                      }}
                    >
                      <div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none"
                        style={{ background: `linear-gradient(135deg,${card.accent}18,transparent)`, transition: "opacity 0.3s" }}
                      />
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg mb-2.5" style={{ background: `${card.accent}14` }}>
                        {card.icon}
                      </div>
                      <p className="text-xs mb-0.5" style={{ color: isDark ? "#6b7280" : "#94a3b8", fontFamily: "'Space Grotesk',sans-serif" }}>{card.label}</p>
                      <p className="text-sm font-semibold leading-tight truncate" style={{ color: textC, fontFamily: "'Space Grotesk',sans-serif" }}>
                        {card.title}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: card.accent, fontFamily: "'Space Grotesk',sans-serif" }}>{card.sub}</p>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              className="flex gap-3 mt-1"
            >
              <a
                href="mailto:jagmalinikhiya@gmail.com"
                className="flex-1 py-3 rounded-xl text-white text-sm font-semibold text-center transition-all hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", boxShadow: "0 4px 16px rgba(99,102,241,0.35)", fontFamily: "'Space Grotesk',sans-serif" }}
              >
                ✉️ Get in Touch
              </a>
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: isDark ? "0 8px 28px rgba(99,102,241,0.3)" : "0 8px 28px rgba(99,102,241,0.2)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setResumeOpen(true)}
                className="flex-1 py-3 rounded-xl text-sm font-semibold text-center border transition-all"
                style={{
                  background: isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.8)",
                  backdropFilter: "blur(8px)",
                  borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
                  color: isDark ? "#c8d0e0" : "#374151",
                  fontFamily: "'Space Grotesk',sans-serif",
                }}
              >
                📄 Resume
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3D Resume Modal */}
      <AnimatePresence>
        {resumeOpen && (
          <ResumeModal isDark={isDark} onClose={() => setResumeOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
