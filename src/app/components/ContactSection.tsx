import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";

interface Props { isDark: boolean }

export function ContactSection({ isDark }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", project: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1800));
    setStatus("sent");
  };

  const textC = isDark ? "#e4e8f0" : "#0a0a14";
  const subC = isDark ? "#8892a4" : "#6b7280";
  const accentC = isDark ? "#a5b4fc" : "#6366f1";
  const tagBg = isDark ? "rgba(99,102,241,0.08)" : "rgba(99,102,241,0.08)";
  const tagBorder = isDark ? "rgba(99,102,241,0.18)" : "rgba(99,102,241,0.2)";
  const cardBg = isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.75)";
  const cardBorder = isDark ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.8)";

  const inputStyle = (field: string) => ({
    background: focused === field
      ? isDark ? "rgba(99,102,241,0.08)" : "rgba(99,102,241,0.04)"
      : isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.7)",
    border: `1px solid ${focused === field ? "rgba(99,102,241,0.35)" : isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
    borderRadius: "0.875rem",
    padding: "0.875rem 1.125rem",
    width: "100%",
    color: isDark ? "#e4e8f0" : "#0a0a14",
    outline: "none",
    transition: "all 0.2s ease",
    fontFamily: "'Inter', sans-serif",
    fontSize: "0.925rem",
    backdropFilter: "blur(8px)",
  });

  const contactItems = [
    { icon: "✉️", label: "Email", value: "jagmalinikhiya@gmail.com" },
    { icon: "📱", label: "Phone / WhatsApp", value: "+91-9024456752" },
    { icon: "📍", label: "Location", value: "India · Open to Remote" },
    { icon: "⏰", label: "Response Time", value: "Within 24 hours" },
  ];

  const socials = [
    { icon: "GH", label: "GitHub", href: "https://github.com/jagimal1" },
    { icon: "in", label: "LinkedIn", href: "https://linkedin.com/in/jagmal-ram-6a9524247" },
    { icon: "LC", label: "LeetCode", href: "https://leetcode.com" },
    { icon: "GFG", label: "GFG", href: "https://geeksforgeeks.org" },
  ];

  return (
    <section ref={ref} id="contact" className="relative py-32 px-4">
      <div className="max-w-6xl mx-auto">
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
            Contact
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
            Let's Build Something{" "}
            <span style={{ backgroundImage: "linear-gradient(135deg, #6366f1, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", color: "transparent" }}>
              Great
            </span>
          </h2>
          <p className="mt-4 max-w-md mx-auto" style={{ color: subC, fontFamily: "'Inter', sans-serif" }}>
            Have a project in mind? I'd love to hear about it. Let's talk.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-2">
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.4rem", fontWeight: 700, color: textC }}>
                Available for Projects
              </h3>
              <p className="leading-relaxed" style={{ color: subC, fontFamily: "'Inter', sans-serif" }}>
                Whether it's a startup MVP, enterprise platform, or mobile app — I'm ready to help you ship something exceptional.
              </p>
            </div>

            {contactItems.map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ x: 4 }}
                className="flex items-center gap-4 p-4 rounded-2xl border"
                style={{
                  background: cardBg,
                  backdropFilter: "blur(12px)",
                  borderColor: cardBorder,
                  boxShadow: isDark ? "0 4px 16px rgba(0,0,0,0.3)" : "0 4px 16px rgba(0,0,0,0.04)",
                  cursor: "default",
                }}
              >
                <span className="text-xl w-8 text-center">{item.icon}</span>
                <div>
                  <p className="text-xs" style={{ color: subC, fontFamily: "'Space Grotesk', sans-serif" }}>{item.label}</p>
                  <p className="text-sm font-medium" style={{ color: textC, fontFamily: "'Space Grotesk', sans-serif" }}>{item.value}</p>
                </div>
              </motion.div>
            ))}

            <div className="flex gap-3 pt-2">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xs font-bold border transition-all"
                  style={{
                    background: cardBg,
                    backdropFilter: "blur(8px)",
                    borderColor: cardBorder,
                    color: isDark ? "#8892a4" : "#6b7280",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                  title={s.label}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <AnimatePresence mode="wait">
              {status === "sent" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center p-12 rounded-3xl border"
                  style={{
                    background: cardBg,
                    backdropFilter: "blur(20px)",
                    borderColor: "rgba(16,185,129,0.25)",
                    boxShadow: isDark ? "0 8px 40px rgba(16,185,129,0.1)" : "0 8px 40px rgba(16,185,129,0.08)",
                    minHeight: "400px",
                  }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                    className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-6"
                    style={{ background: "rgba(16,185,129,0.15)" }}
                  >
                    ✓
                  </motion.div>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.3rem", fontWeight: 700, color: textC }} className="mb-3">
                    Message Sent!
                  </h3>
                  <p style={{ color: subC, fontFamily: "'Inter', sans-serif" }}>
                    I'll get back to you within 24 hours. Looking forward to connecting!
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4 p-8 rounded-3xl border"
                  style={{
                    background: cardBg,
                    backdropFilter: "blur(20px)",
                    borderColor: cardBorder,
                    boxShadow: isDark ? "0 8px 40px rgba(0,0,0,0.4)" : "0 8px 40px rgba(0,0,0,0.07)",
                  }}
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs mb-2 font-medium" style={{ color: subC, fontFamily: "'Space Grotesk', sans-serif" }}>
                        Your Name
                      </label>
                      <input
                        type="text"
                        placeholder="Jagmal Singh"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                        required
                        style={inputStyle("name")}
                      />
                    </div>
                    <div>
                      <label className="block text-xs mb-2 font-medium" style={{ color: subC, fontFamily: "'Space Grotesk', sans-serif" }}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="you@company.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                        required
                        style={inputStyle("email")}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs mb-2 font-medium" style={{ color: subC, fontFamily: "'Space Grotesk', sans-serif" }}>
                      Project Type
                    </label>
                    <select
                      value={form.project}
                      onChange={(e) => setForm({ ...form, project: e.target.value })}
                      onFocus={() => setFocused("project")}
                      onBlur={() => setFocused(null)}
                      style={{ ...inputStyle("project"), color: form.project ? (isDark ? "#e4e8f0" : "#0a0a14") : "#9ca3af" }}
                    >
                      <option value="" disabled>Select project type...</option>
                      <option value="web">Web Application</option>
                      <option value="mobile">Mobile App</option>
                      <option value="ai">AI Integration</option>
                      <option value="fullstack">Full Stack Project</option>
                      <option value="consulting">Consulting</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs mb-2 font-medium" style={{ color: subC, fontFamily: "'Space Grotesk', sans-serif" }}>
                      Tell me about your project
                    </label>
                    <textarea
                      placeholder="Describe your project, timeline, and budget..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      required
                      rows={4}
                      style={{ ...inputStyle("message"), resize: "vertical", minHeight: "100px" }}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={status === "sending"}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative w-full py-4 rounded-xl text-white font-semibold overflow-hidden"
                    style={{
                      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                      boxShadow: "0 4px 20px rgba(99,102,241,0.4)",
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                  >
                    {status === "sending" ? (
                      <span className="flex items-center justify-center gap-3">
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Sending...
                      </span>
                    ) : (
                      "Send Message →"
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
