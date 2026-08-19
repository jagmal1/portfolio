const fs = require('fs');
const file = '/Users/jagmalinikhiya/Downloads/Create-Portfolio /src/app/components/HeroSection.tsx';
let content = fs.readFileSync(file, 'utf8');

const lines = content.split('\n');
const startLine = 200; // index 200 is line 201
const endLine = 491; // index 491 is line 492

// Save the left part (lines 203 to 361) to put inside false && (...)
const leftPart = lines.slice(203, 362).join('\n');
const rightPartStats = lines.slice(471, 490).join('\n');

const newLayout = `      <div className="relative z-10 max-w-5xl w-full mx-auto flex flex-col items-center text-center pt-8 lg:pt-16">
        {/* Background decorative elements (frosted glass) */}
        <div className="absolute top-10 right-10 md:right-32 w-24 h-24 rounded-3xl rotate-12 backdrop-blur-md bg-white/20 border border-white/40 shadow-xl hidden md:block" style={{ zIndex: 0 }} />
        <div className="absolute bottom-20 left-10 md:left-32 w-32 h-32 rounded-full backdrop-blur-md bg-white/20 border border-white/40 shadow-xl hidden md:block" style={{ zIndex: 0 }} />

        {/* ─── LEFT: Photo + Orbiting Logos ─── */}
        {false && (
          <div className="hidden">
${leftPart}
          </div>
        )}

        {/* ─── CENTER: Text Content ─── */}
        <motion.div
          className="flex flex-col items-center gap-5 w-full relative z-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border shadow-sm"
            style={{
              background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
              borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
            }}
          >
            <span className="text-base text-purple-500">✨</span>
            <span className="text-sm font-medium" style={{ color: isDark ? "#d1d5db" : "#4b5563", fontFamily: "'Inter',sans-serif" }}>
              Available for freelance work
            </span>
          </motion.div>

          {/* Heading */}
          <div className="mt-6 flex flex-col items-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              style={{
                fontFamily: "'Space Grotesk',sans-serif",
                fontSize: "clamp(3.5rem,8vw,6.5rem)",
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: textColor,
              }}
            >
              Hi, I'm Jagmal
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              style={{
                fontFamily: "'Space Grotesk',sans-serif",
                fontSize: "clamp(3.5rem,8vw,6.5rem)",
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                backgroundImage: "linear-gradient(90deg, #6366f1, #a78bfa, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
                paddingBottom: "0.1em",
              }}
            >
              Creative Developer
            </motion.h1>
          </div>

          {/* Description */}
          <motion.p
            className="max-w-2xl leading-relaxed text-base lg:text-xl mt-4"
            style={{ color: subColor, fontFamily: "'Inter',sans-serif" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Specializing in Computer Science and Engineering. I craft beautiful, high-performance websites and applications with modern 3D interactions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mt-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <MagBtn primary isDark={isDark} onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
              View Work <span className="ml-2">→</span>
            </MagBtn>
            <MagBtn isDark={isDark} onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
              Contact Me
            </MagBtn>
          </motion.div>

          {/* Original Stats (Hidden) */}
          {false && (
            <div className="hidden">
${rightPartStats}
            </div>
          )}
        </motion.div>
      </div>`;

lines.splice(startLine, endLine - startLine + 1, newLayout);
fs.writeFileSync(file, lines.join('\n'), 'utf8');
console.log('Done!');
