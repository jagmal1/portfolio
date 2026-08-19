import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import Image from "../../assets";
interface Props { isDark: boolean }

const projects = [
  {
    title: "DWF India",
    tagline: "Doctor Welfare Federation of India Platform",
    
  desc: "A full-stack healthcare organization platform for managing memberships, events, media, and digital operations for the Doctor Welfare Federation of India.",
    longDesc: "Designed and developed the official website and administrative portal for the Doctor Welfare Federation of India. Built a scalable content management system with role-based authentication, membership management, automated certificate generation, media gallery, event management, dynamic news publishing, and team management. Integrated Firebase services for media storage and real-time data while deploying the platform on Vercel and Railway.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop&auto=format",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Firebase", "Tailwind CSS"],
    live: "https://www.dwfindia.com", github: "#",
    metrics: ["Production Live", "Scalable Arch", "REST APIs"],
    accent: "#6366f1", tag: "Healthacre · Full Stack",
    features: ["Role-based authentication and admin portal", "Digital membership registration and approval", "Automated certificate generation", "Media gallery and video management", "Events, news, and announcements management", "Team, council, and organizational management","Responsive SEO-optimized website"],
  challenges: "Designed a scalable CMS capable of managing dynamic healthcare organization data, media assets, membership workflows, and role-based permissions while ensuring responsive performance and maintainability.",
    timeline: "3 months", icon: "🏥",
  },
  {
    title: "Crazinos",
    tagline: "Multi-Service Entertainment Platform",
    desc: "Cross-platform React Native multi-service app with 100K+ downloads and 4.8★ rating on Play Store.",
   longDesc: "Contributed to the development and maintenance of a production-scale React Native application and its web-based admin panel. Implemented secure authentication, quiz engine, e-commerce workflows, short video feeds, gaming modules, real-time notifications, content management, media uploads, payment integration, and performance optimizations. Collaborated with backend teams to integrate REST APIs, Firebase services, and scalable state management for a seamless cross-platform experience.",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=500&fit=crop&auto=format",
    stack: ["React Native",
    "TypeScript",
    "React.js",
    "Node.js",
    "Express.js",
    "Firebase",
    "Zustand",
    "REST APIs",
    "PostgreSQL",
    "Git"],
    live: "https://play.google.com/store/apps/details?id=com.kidzniosw.app&hl=en_IN", github: "#",
    metrics: ["100K+ Downloads", "4.8★ Rating", "9K+ Reviews"],
    accent: "#8b5cf6", tag: "Mobile · Full stack",
    features: ["Cross-platform iOS & Android", "Quiz and reward management system",   "Short video feed and media management", "E-commerce and order management", "Secure authentication and user profiles", "Payment gateway integration","Web-based admin dashboard"],
    challenges: "Built and optimized scalable mobile features while maintaining smooth performance across multiple modules, main challenge was handling users while quiz because at that time traffic load beacme high and integrating real-time data, media-rich content, and backend APIs in a production environment.",
    timeline: "Ongoing", icon: "🎮",
  },
  {
    title: "CollageWala",
    tagline: "College Student Platform",
    desc: "A platform for college students to discover, compare, and apply to colleges. Features AI-powered college recommendations, community forums, and admission guidance.",
    longDesc: "Built a full-stack platform connecting students with their ideal colleges. Includes AI-based recommendation engine, interactive college comparison tools, user communities, Q&A forums, and a comprehensive admin panel for college management.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=500&fit=crop&auto=format",
    stack: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS", "OpenAI"],
    live: "#", github: "#",
    metrics: ["AI Powered", "Student Focused", "Community Built"],
    accent: "#10b981", tag: "Web · EdTech",
    features: ["AI college recommendations", "College comparison tool", "Community forums & Q&A", "Admission tracker", "College admin panel", "Mobile responsive"],
    challenges: "Building an accurate recommendation algorithm that matches students based on multiple criteria.",
    timeline: "2 months", icon: "🎓",
  },
  {
    title: "This Portfolio",
    tagline: "Personal Portfolio Website",
    desc: "This very portfolio — built with React, Vite, TypeScript, Tailwind CSS, and Motion. Features a 3D tech sphere, interactive command palette, particle loading screen, and premium animations.",
    longDesc: "Designed and developed from scratch with a focus on premium aesthetics and micro-interactions. Custom cursor with trailing particles, loading screen with canvas particles, 3D rotating tech sphere, scroll progress indicator, command palette, and full dark/light mode.",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=500&fit=crop&auto=format",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Motion", "Canvas API"],
    live: "#", github: "#",
    metrics: ["100 Lighthouse", "Custom Animations", "Interactive 3D"],
    accent: "#06b6d4", tag: "Web · Portfolio",
    features: ["3D rotating tech sphere", "Custom cursor + particles", "Canvas particle loader", "Command palette (⌘K)", "Scroll progress bar", "Dark/Light mode"],
    challenges: "Achieving 60 FPS for the 3D sphere animation while keeping the bundle size minimal and Lighthouse score high.",
    timeline: "1 month", icon: "💼",
  },
];

function ProjectModal({ p, onClose, isDark }: { p: typeof projects[0]; onClose: () => void; isDark: boolean }) {
  const textC = isDark ? "#e4e8f0" : "#111827";
  const subC = isDark ? "#8892a4" : "#6b7280";
  const modalBg = isDark ? "rgba(12,13,26,0.97)" : "rgba(255,255,255,0.97)";

  return (
    <motion.div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0" style={{ background: "rgba(5,5,15,0.6)", backdropFilter: "blur(16px)" }} />
      <motion.div
        className="relative w-full max-w-2xl rounded-3xl overflow-hidden"
        style={{ background: modalBg, boxShadow: "0 40px 120px rgba(0,0,0,0.35)" }}
        initial={{ scale: 0.92, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 40 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-52">
          <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 20%, rgba(0,0,0,0.75))" }} />
          <div className="absolute bottom-4 left-6">
            <span className="text-2xl mr-2">{p.icon}</span>
            <span className="text-white font-bold text-xl" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{p.title}</span>
            <p className="text-white/70 text-sm">{p.tagline}</p>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-white text-lg"
            style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)" }}
          >×</button>
        </div>

        <div className="p-7 max-h-[60vh] overflow-y-auto">
          <p className="leading-relaxed mb-5 text-sm" style={{ color: subC, fontFamily: "'Inter', sans-serif" }}>{p.longDesc}</p>

          <div className="grid grid-cols-3 gap-3 mb-5 p-4 rounded-2xl" style={{ background: `${p.accent}08`, border: `1px solid ${p.accent}14` }}>
            {p.metrics.map((m) => (
              <div key={m} className="text-center">
                <p className="text-xs font-bold" style={{ color: textC, fontFamily: "'Space Grotesk', sans-serif" }}>{m}</p>
              </div>
            ))}
          </div>

          <div className="mb-5">
            <p className="text-xs mb-2 font-medium uppercase tracking-wider" style={{ color: subC, fontFamily: "'Space Grotesk', sans-serif" }}>Key Features</p>
            <div className="grid grid-cols-2 gap-1.5">
              {p.features.map((f) => (
                <div key={f} className="flex items-center gap-2 text-xs" style={{ color: subC }}>
                  <span className="w-1 h-1 rounded-full bg-indigo-400 flex-shrink-0" />
                  <span style={{ fontFamily: "'Inter', sans-serif" }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-5 p-4 rounded-2xl" style={{ background: isDark ? "rgba(139,92,246,0.08)" : "rgba(245,243,255,0.6)", border: `1px solid ${isDark ? "rgba(139,92,246,0.15)" : "rgba(139,92,246,0.1)"}` }}>
            <p className="text-xs font-semibold mb-1" style={{ color: "#8b5cf6", fontFamily: "'Space Grotesk', sans-serif" }}>⚡ Key Challenge</p>
            <p className="text-xs leading-relaxed" style={{ color: subC, fontFamily: "'Inter', sans-serif" }}>{p.challenges}</p>
          </div>

          <div className="mb-5">
            <p className="text-xs mb-2 font-medium uppercase tracking-wider" style={{ color: subC, fontFamily: "'Space Grotesk', sans-serif" }}>Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {p.stack.map((t) => (
                <span key={t} className="px-2.5 py-1 rounded-lg text-xs font-medium" style={{ background: `${p.accent}12`, color: p.accent, fontFamily: "'Space Grotesk', sans-serif" }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            {p.live && p.live !== "#" ? (
              <a href={p.live} target="_blank" rel="noreferrer" className="w-full py-3 rounded-xl text-white text-sm font-semibold text-center hover:opacity-90 transition-opacity" style={{ background: `linear-gradient(135deg, ${p.accent}, ${p.accent}bb)`, fontFamily: "'Space Grotesk', sans-serif" }}>
                Live Demo ↗
              </a>
            ) : (
              <div className="w-full py-3 rounded-xl text-white/80 text-sm font-semibold text-center" style={{ background: `linear-gradient(135deg, ${p.accent}, ${p.accent}bb)`, fontFamily: "'Space Grotesk', sans-serif" }}>
                Production Application
              </div>
            )}
            {/* <a href={p.github} className="flex-1 py-3 rounded-xl text-sm font-semibold text-center border transition-all" style={{ color: textC, fontFamily: "'Space Grotesk', sans-serif", borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)", background: isDark ? "rgba(255,255,255,0.04)" : "transparent" }}>
              GitHub →
            </a> */}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({ project, i, inView, isDark, onClick }: {
  project: typeof projects[0]; i: number; inView: boolean; isDark: boolean; onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [lightPos, setLightPos] = useState({ x: 50, y: 50 });
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setLightPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const textC = isDark ? "#e4e8f0" : "#111827";
  const subC = isDark ? "#8892a4" : "#6b7280";
  const cardBg = isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.8)";
  const cardBorder = isDark ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.9)";

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.12 }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="group relative rounded-3xl overflow-hidden border cursor-pointer"
      style={{
        background: cardBg,
        backdropFilter: "blur(20px)",
        borderColor: hovering ? `${project.accent}35` : cardBorder,
        boxShadow: hovering
          ? `0 32px 80px rgba(0,0,0,${isDark ? 0.5 : 0.12}), 0 0 0 1px ${project.accent}28`
          : isDark ? "0 8px 32px rgba(0,0,0,0.4)" : "0 8px 32px rgba(0,0,0,0.06)",
        transition: "border-color 0.25s ease, box-shadow 0.25s ease",
      }}
      whileHover={{ y: -8 }}
      data-cursor="card"
    >
      {/* Mouse-following light */}
      {hovering && (
        <div
          className="absolute inset-0 pointer-events-none z-10 rounded-3xl"
          style={{
            background: `radial-gradient(circle 180px at ${lightPos.x}% ${lightPos.y}%, ${project.accent}${isDark ? "22" : "12"}, transparent 70%)`,
            transition: "background 0.1s ease",
          }}
        />
      )}

      <div className="relative h-52 overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.4 }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.55))" }} />
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="text-xl">{project.icon}</span>
          <span
            className="px-3 py-1 rounded-full text-xs font-medium text-white"
            style={{ background: `${project.accent}cc`, backdropFilter: "blur(8px)", fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {project.tag}
          </span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="px-5 py-2.5 rounded-xl text-white text-sm font-semibold" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", fontFamily: "'Space Grotesk', sans-serif" }}>
            Explore Project →
          </div>
        </div>
      </div>

      <div className="p-6 relative z-20">
        <h3 className="mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.15rem", fontWeight: 700, color: textC }}>
          {project.title}
        </h3>
        <p className="text-sm font-medium mb-2" style={{ color: project.accent, fontFamily: "'Space Grotesk', sans-serif" }}>
          {project.tagline}
        </p>
        <p className="text-sm leading-relaxed mb-4 line-clamp-2" style={{ color: subC, fontFamily: "'Inter', sans-serif" }}>
          {project.desc}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.stack.slice(0, 4).map((t) => (
            <span key={t} className="px-2 py-0.5 rounded-md text-xs font-medium" style={{ background: `${project.accent}12`, color: project.accent, fontFamily: "'Space Grotesk', sans-serif" }}>
              {t}
            </span>
          ))}
          {project.stack.length > 4 && (
            <span className="px-2 py-0.5 rounded-md text-xs" style={{ color: subC, fontFamily: "'Space Grotesk', sans-serif" }}>
              +{project.stack.length - 4}
            </span>
          )}
        </div>

        <div className="flex gap-3 text-xs" style={{ color: subC }}>
          {project.metrics.map((m) => (
            <span key={m} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{m}</span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export function ProjectsSection({ isDark }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [selected, setSelected] = useState<typeof projects[0] | null>(null);

  const textC = isDark ? "#e4e8f0" : "#0a0a14";
  const subC = isDark ? "#8892a4" : "#6b7280";
  const accentC = isDark ? "#a5b4fc" : "#6366f1";
  const tagBg = isDark ? "rgba(99,102,241,0.08)" : "rgba(99,102,241,0.08)";
  const tagBorder = isDark ? "rgba(99,102,241,0.18)" : "rgba(99,102,241,0.2)";

  return (
    <section ref={ref} id="projects" className="relative py-32 px-4">
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
            Work
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
            Featured{" "}
            <span style={{ backgroundImage: "linear-gradient(135deg, #6366f1, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", color: "transparent" }}>
              Projects
            </span>
          </h2>
          <p className="mt-4 max-w-md mx-auto" style={{ color: subC, fontFamily: "'Inter', sans-serif" }}>
            Production-grade applications I've built and shipped. Click to explore architecture, challenges, and tech stack.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              i={i}
              inView={inView}
              isDark={isDark}
              onClick={() => setSelected(project)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal p={selected} onClose={() => setSelected(null)} isDark={isDark} />}
      </AnimatePresence>
    </section>
  );
}
