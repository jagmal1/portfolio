import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";

interface Props { isDark: boolean }

const services = [
  { icon: "⚡", title: "Full Stack Development", desc: "End-to-end web apps with React, Next.js, Node.js, and PostgreSQL. From design to deployment.", tags: ["React", "Next.js", "Node.js"], accent: "#6366f1" },
  { icon: "📱", title: "React Native Apps", desc: "Production-grade cross-platform mobile apps for iOS and Android.", tags: ["React Native", "Expo"], accent: "#8b5cf6" },
  { icon: "🔌", title: "REST API Development", desc: "Scalable, documented RESTful APIs with authentication and rate limiting.", tags: ["Node.js", "Express"], accent: "#06b6d4" },
  { icon: "🗄️", title: "Database Design", desc: "Efficient schema design for PostgreSQL and MongoDB with Prisma ORM.", tags: ["PostgreSQL", "Prisma"], accent: "#10b981" },
  { icon: "🎨", title: "UI/UX & Design", desc: "Pixel-perfect, accessible interfaces and interactive prototypes designed in Figma and built with Tailwind CSS & Motion.", tags: ["Figma", "Tailwind", "Motion"], accent: "#f59e0b" },
  { icon: "🚀", title: "Deployment & DevOps", desc: "CI/CD pipelines, Docker containers, AWS deployment, and performance monitoring.", tags: ["Docker", "AWS"], accent: "#ec4899" },
];

export function ServicesSection({ isDark }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState<number | null>(null);

  const textC = isDark ? "#e4e8f0" : "#0a0a14";
  const accentC = isDark ? "#a5b4fc" : "#6366f1";
  const tagBg = isDark ? "rgba(99,102,241,0.08)" : "rgba(99,102,241,0.04)";
  const tagBorder = isDark ? "rgba(99,102,241,0.15)" : "rgba(99,102,241,0.08)";

  return (
    <section ref={ref} id="services" className="relative py-32 px-4">
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
            What I Do
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
            Services &{" "}
            <span style={{ backgroundImage: "linear-gradient(135deg, #6366f1, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", color: "transparent" }}>
              Capabilities
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[0, 1, 2].map((i) => (
            <ServiceCard key={i} service={services[i]} i={i} inView={inView} hovered={hovered === i} onHover={() => setHovered(i)} onLeave={() => setHovered(null)} className={i === 0 ? "md:col-span-2" : ""} isDark={isDark} />
          ))}
          {[3, 4, 5].map((i) => (
            <ServiceCard key={i} service={services[i]} i={i} inView={inView} hovered={hovered === i} onHover={() => setHovered(i)} onLeave={() => setHovered(null)} className={i === 5 ? "md:col-span-2" : ""} isDark={isDark} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, i, inView, hovered, onHover, onLeave, className = "", isDark }: {
  service: typeof services[0]; i: number; inView: boolean;
  hovered: boolean; onHover: () => void; onLeave: () => void; className?: string; isDark: boolean;
}) {
  const textC = isDark ? "#e4e8f0" : "#111827";
  const subC = isDark ? "#8892a4" : "#6b7280";
  const cardBg = isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.75)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.1 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`relative group p-7 rounded-3xl border overflow-hidden ${className}`}
      style={{
        background: cardBg,
        backdropFilter: "blur(20px)",
        borderColor: hovered ? `${service.accent}35` : isDark ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.8)",
        boxShadow: hovered
          ? `0 20px 60px rgba(0,0,0,${isDark ? 0.4 : 0.1}), 0 0 0 1px ${service.accent}22`
          : isDark ? "0 8px 32px rgba(0,0,0,0.35)" : "0 8px 32px rgba(0,0,0,0.06)",
        transition: "all 0.3s ease",
        minHeight: 180,
        cursor: "default",
      }}
      data-cursor="card"
    >
      <motion.div
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${service.accent}22, transparent)`, filter: "blur(20px)" }}
        animate={{ scale: hovered ? 2 : 1, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      <motion.div
        className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-5"
        style={{ background: `${service.accent}14` }}
        animate={{ scale: hovered ? 1.12 : 1, rotate: hovered ? 5 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {service.icon}
      </motion.div>

      <h3 className="mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.05rem", fontWeight: 700, color: textC }}>
        {service.title}
      </h3>
      <p className="text-sm leading-relaxed mb-4" style={{ color: subC, fontFamily: "'Inter', sans-serif" }}>
        {service.desc}
      </p>
      <div className="flex flex-wrap gap-2">
        {service.tags.map((t) => (
          <span key={t} className="px-2.5 py-1 rounded-lg text-xs font-medium" style={{ background: `${service.accent}12`, color: service.accent, fontFamily: "'Space Grotesk', sans-serif" }}>
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
