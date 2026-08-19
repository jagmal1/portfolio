import { useScroll, useSpring, motion } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[99] origin-left"
      style={{
        scaleX,
        height: "2px",
        background: "linear-gradient(90deg, #6366f1, #a78bfa, #06b6d4)",
        boxShadow: "0 0 8px rgba(99,102,241,0.5)",
      }}
    />
  );
}
