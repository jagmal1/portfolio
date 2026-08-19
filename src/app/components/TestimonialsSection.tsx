import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";

interface Props { isDark: boolean }

const testimonials = [
  {
    name: "Dr. Ishwar Panwar",
    role: "National President, Doctors Welfare Federation India",
    avatar: "IP",
    text: "Jagmal did an excellent job designing and developing the DWF India website. He understood our requirements and transformed them into a modern, professional, and user-friendly digital platform. He handled the UI/UX design, development, Firebase integration, content and media management, testing, bug fixing, and deployment with great attention to detail. His ability to independently handle both technical and design aspects of the project made the entire development process smooth and efficient. We appreciate his dedication, responsiveness, and commitment to delivering a reliable platform that represents DWF India and supports our growing medical community.",
    stars: 5,
    accent: "#10b981",
  },
  {
    name: "Devichand",
    role: "Project Lead, Crazinos",
    avatar: "DC",
    text: "Jagmal was a dependable and skilled developer on the Crazinos project. As a Project Lead, I appreciated his ability to take ownership of assigned features, collaborate effectively with the team, and solve complex technical issues with a practical approach. He contributed across React Native development, API integration, testing, performance improvements, and production bug fixing, consistently delivering stable and high-quality work. His commitment, problem-solving mindset, and attention to detail made him a valuable contributor to the project.",
    stars: 5,
    accent: "#8b5cf6",
  },
  {
    name: "Amit Sharma",
    role: "Crazinos Team",
    avatar: "AS",
    text: "Jagmal was a reliable developer who made significant contributions to the Crazinos app. He worked on React Native features, API integrations, performance optimization, testing, and production bug fixing across Android and iOS. He was proactive in solving technical issues, maintained high code quality, and consistently delivered features on time. His ability to understand requirements and turn them into stable, user-friendly features made him a valuable member of the development team.",
    stars: 5,
    accent: "#6366f1",
  },
];

function TestimonialCard({ t, isDark }: { t: typeof testimonials[0]; isDark: boolean }) {
  const textC = isDark ? "#e4e8f0" : "#111827";
  const subC = isDark ? "#8892a4" : "#6b7280";
  const cardBg = isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.8)";
  const cardBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.9)";

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.25 }}
      className="flex-shrink-0 w-[400px] p-6 rounded-3xl border mx-3 flex flex-col justify-between"
      style={{
        background: cardBg,
        backdropFilter: "blur(20px)",
        borderColor: cardBorder,
        boxShadow: isDark ? "0 8px 32px rgba(0,0,0,0.4)" : "0 8px 32px rgba(0,0,0,0.07)",
      }}
      data-cursor="card"
    >
      <div>
        <div className="flex items-center gap-1 mb-4">
          {Array.from({ length: t.stars }).map((_, i) => (
            <span key={i} className="text-yellow-400 text-sm">★</span>
          ))}
        </div>
        <p className="text-sm leading-relaxed mb-6" style={{ color: subC, fontFamily: "'Inter', sans-serif" }}>
          "{t.text}"
        </p>
      </div>
      <div className="flex items-center gap-3 pt-4 border-t border-black/5 dark:border-white/5">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${t.accent}, ${t.accent}88)`, fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {t.avatar}
        </div>
        <div>
          <p className="font-semibold text-sm" style={{ color: textC, fontFamily: "'Space Grotesk', sans-serif" }}>
            {t.name}
          </p>
          <p className="text-xs" style={{ color: subC }}>{t.role}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function TestimonialsSection({ isDark }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [isPaused, setIsPaused] = useState(false);

  const textC = isDark ? "#e4e8f0" : "#0a0a14";
  const accentC = isDark ? "#a5b4fc" : "#6366f1";
  const tagBg = isDark ? "rgba(99,102,241,0.08)" : "rgba(99,102,241,0.08)";
  const tagBorder = isDark ? "rgba(99,102,241,0.18)" : "rgba(99,102,241,0.2)";
  const fadeL = isDark ? "rgba(8,9,16," : "rgba(247,248,250,";

  const doubled = [...testimonials, ...testimonials, ...testimonials];
  const itemWidth = 400 + 24; // 400px width + 24px total horizontal margin

  return (
    <section ref={ref} id="testimonials" className="relative py-32 overflow-hidden">
      <style>{`
        @keyframes marqueeTestimonials {
          0% { transform: translateX(0); }
          100% { transform: translateX(-${testimonials.length * itemWidth}px); }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center flex flex-col items-center"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4 border"
            style={{ background: tagBg, borderColor: tagBorder, color: accentC, fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Testimonials
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
            Real{" "}
            <span style={{ backgroundImage: "linear-gradient(135deg, #6366f1, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", color: "transparent" }}>
              Testimonials
            </span>
          </h2>

          <button
            onClick={() => setIsPaused((prev) => !prev)}
            className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-medium transition-all hover:scale-105"
            style={{
              background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
              borderColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)",
              color: isDark ? "#a5b4fc" : "#6366f1",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            <span>{isPaused ? "▶ Click to Resume" : "⏸ Click to Stop"}</span>
          </button>
        </motion.div>
      </div>

      <div
        className="relative cursor-pointer"
        onClick={() => setIsPaused((prev) => !prev)}
        title={isPaused ? "Click to resume scrolling" : "Click to stop scrolling"}
      >
        <div
          className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: `linear-gradient(90deg, ${fadeL}1), transparent)` }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: `linear-gradient(-90deg, ${fadeL}1), transparent)` }}
        />

        <div className="overflow-hidden">
          <div
            className="flex"
            style={{
              width: "max-content",
              animation: "marqueeTestimonials 30s linear infinite",
              animationPlayState: isPaused ? "paused" : "running",
            }}
          >
            {doubled.map((t, i) => (
              <TestimonialCard key={i} t={t} isDark={isDark} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
