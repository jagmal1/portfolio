import { useRef } from "react";
import { motion, useInView } from "motion/react";

interface Props { isDark: boolean }

const experiences = [
  {
    year: "2026",
    period: "2026 — Present",
    role: "React Native Developer",
    company: "Crazinos",
    type: "Full-time",
    location: "Remote, India",
    description:
      "Contributed and maintained a mobile applications and a web-based admin panel for a multi-service platform integrating Quiz, E-commerce, Short Videos, and Gaming. Built scalable frontend and backend systems using React Native, React.js, TypeScript, Node.js, Express.js, Firebase, Zustand, SQL databases, REST APIs, and cloud services, delivering real-time updates, efficient state management, secure authentication, media management, and optimized application performance.",
    stack: ["React Native",
    "React.js",
    "TypeScript",
    "Node.js",
    "Express.js",
    "Firebase",
    "Zustand",
    "PostgreSQL",
    "REST APIs",
    "Git"],
    accent: "#8b5cf6",
    highlight: "100K+ Users",
    icon: "📱",
  },
  {
    year: "2026",
    period: "2026",
    role: "Software Developer",
    company: "DWF India",
    type: "Full-time",
    location: "Jodhpur,Rajasthan,India",
    description:
    "Designed, developed, and deployed the official digital platform for the Doctor Welfare Federation of India, including a public-facing website and an administrative portal. Built scalable REST APIs, implemented secure role-based authentication, automated membership management, certificate generation, media management, and dynamic content publishing using Next.js, Node.js, Firebase, and PostgreSQL. Optimized application performance, SEO, and responsive user experience while deploying production services on Vercel and Railway.",
    stack: [ "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Express.js",
    "Firebase",
    "Firestore",
    "Firebase Storage",
    "PostgreSQL",
    "Tailwind CSS",
    "Vercel",
    "Railway"],
    accent: "#6366f1",
    highlight: "Production Scale",
    icon: "🚀",
  },
  {
    year: "2024",
    period: "2024",
    role: "Frontend Developer Intern",
    company: "Hfactor",
    type: "Internship",
    location: "India",
    description:
    "Developed and maintained Refur, a refer-and-earn platform enabling users to invite friends, track referrals, and earn rewards. Implemented reusable React Native components,  developed referral and rewards workflows and performance optimizations to deliver a seamless mobile experience.",
    stack: ["React", "JavaScript", "Tailwind CSS"],
    accent: "#10b981", 
    highlight: "Healthcare Tech",
    icon: "💊",
  },
];

export function ExperienceSection({ isDark }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const textC = isDark ? "#e4e8f0" : "#0a0a14";
  const subC = isDark ? "#8892a4" : "#6b7280";
  const accentC = isDark ? "#a5b4fc" : "#6366f1";
  const cardBg = isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.8)";
  const cardBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.9)";
  const cardShadow = isDark ? "0 8px 32px rgba(0,0,0,0.4)" : "0 8px 32px rgba(0,0,0,0.06)";
  const tagBg = isDark ? "rgba(99,102,241,0.1)" : "rgba(99,102,241,0.06)";
  const tagBorder = isDark ? "rgba(99,102,241,0.2)" : "rgba(99,102,241,0.12)";

  return (
    <section ref={ref} id="experience" className="relative py-32 px-4">
      <div className="max-w-5xl mx-auto">
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
            Experience
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
            My Career{" "}
            <span style={{ backgroundImage: "linear-gradient(135deg, #6366f1, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", color: "transparent" }}>
              Timeline
            </span>
          </h2>
        </motion.div>

        <div className="relative">
          <div
            className="absolute left-[27px] top-4 bottom-4 w-px hidden md:block"
            style={{ background: "linear-gradient(180deg, #6366f1 0%, #a78bfa 60%, transparent 100%)" }}
          />

          <div className="flex flex-col gap-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.18, ease: [0.76, 0, 0.24, 1] }}
                className="relative md:pl-20 group"
              >
                <div className="absolute left-0 top-6 hidden md:flex flex-col items-center">
                  <motion.div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl border-2"
                    style={{
                      background: `${exp.accent}15`,
                      borderColor: exp.accent,
                      boxShadow: `0 0 0 4px ${exp.accent}15`,
                    }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {exp.icon}
                  </motion.div>
                  <span
                    className="text-xs font-bold mt-1"
                    style={{ color: exp.accent, fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {exp.year}
                  </span>
                </div>

                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="relative p-7 rounded-3xl border overflow-hidden"
                  style={{
                    background: cardBg,
                    backdropFilter: "blur(20px)",
                    borderColor: cardBorder,
                    boxShadow: cardShadow,
                    transition: "all 0.3s ease",
                  }}
                  data-cursor="card"
                >
                  <div
                    className="absolute top-0 left-0 w-1 h-full rounded-l-3xl"
                    style={{ background: exp.accent }}
                  />
                  <div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                    style={{ background: `linear-gradient(135deg, ${exp.accent}06, transparent)` }}
                  />

                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3
                          style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.15rem", fontWeight: 700, color: textC }}
                        >
                          {exp.role}
                        </h3>
                        <span
                          className="px-2 py-0.5 rounded-full text-xs font-medium"
                          style={{ background: `${exp.accent}18`, color: exp.accent, fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          {exp.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm" style={{ color: exp.accent, fontFamily: "'Space Grotesk', sans-serif" }}>
                          {exp.company}
                        </span>
                        <span style={{ color: isDark ? "#4b5563" : "#d1d5db" }}>·</span>
                        <span className="text-sm" style={{ color: subC, fontFamily: "'Space Grotesk', sans-serif" }}>{exp.location}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span
                        className="px-3 py-1 rounded-lg text-xs font-bold border"
                        style={{
                          background: `${exp.accent}10`,
                          color: exp.accent,
                          borderColor: `${exp.accent}22`,
                          fontFamily: "'Space Grotesk', sans-serif",
                        }}
                      >
                        {exp.highlight}
                      </span>
                      <span className="text-xs" style={{ color: subC, fontFamily: "'Space Grotesk', sans-serif" }}>
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  <p className="leading-relaxed mb-5 text-sm" style={{ color: subC, fontFamily: "'Inter', sans-serif" }}>
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium"
                        style={{
                          background: tagBg,
                          color: accentC,
                          border: `1px solid ${tagBorder}`,
                          fontFamily: "'Space Grotesk', sans-serif",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
