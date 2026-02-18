import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

import { styles } from "../../constants/styles";
import { ComputersCanvas } from "../canvas";
import { config } from "../../constants/config";
import MadridCrest from "../layout/MadridCrest";
import EagleMark from "../layout/EagleMark";

const useTypewriter = (texts: string[], speed = 50, pause = 2000) => {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const current = texts[textIndex];
    if (!isDeleting) {
      setDisplayText(current.substring(0, charIndex + 1));
      setCharIndex((prev) => prev + 1);
      if (charIndex + 1 === current.length) {
        setTimeout(() => setIsDeleting(true), pause);
        return;
      }
    } else {
      setDisplayText(current.substring(0, charIndex - 1));
      setCharIndex((prev) => prev - 1);
      if (charIndex - 1 === 0) {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }
    }
  }, [texts, textIndex, charIndex, isDeleting, pause]);

  useEffect(() => {
    const timer = setTimeout(tick, isDeleting ? speed / 2 : speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting, speed]);

  return displayText;
};

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut", delay },
});

const Hero = () => {
  const roles = [
    "Frontend Developer",
    "React Specialist",
    "3D Web Creator",
    "UI/UX Enthusiast",
  ];
  const typedText = useTypewriter(roles, 80, 1500);

  return (
    <section className="relative z-[3] mx-auto h-screen w-full overflow-hidden">
      {/* Text content — with dark backdrop for readability */}
      <div
        className={`absolute inset-0 top-[120px] z-[3] mx-auto max-w-7xl ${styles.paddingX} flex flex-row items-start gap-5 pointer-events-none`}
      >
        <motion.div
          className="mt-5 flex flex-col items-center justify-center"
          {...fadeUp(0.1)}
        >
          {/* Gold accent dot */}
          <motion.div
            className="h-5 w-5 rounded-full"
            style={{
              background: "var(--color-accent)",
              boxShadow:
                "0 0 20px var(--color-accent), 0 0 60px var(--color-accent)",
            }}
            animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Gold gradient line */}
          <div
            className="h-40 w-1 sm:h-80"
            style={{
              background:
                "linear-gradient(180deg, var(--color-accent) 0%, transparent 100%)",
            }}
          />
        </motion.div>

        <div className="pointer-events-auto max-w-2xl">
          {/* Semi-transparent backdrop behind text so it's always readable */}
          <div
            className="rounded-2xl px-6 py-5 -mx-6 -my-2"
            style={{
              background: "var(--color-surface)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            <motion.h1 className={`${styles.heroHeadText}`} {...fadeUp(0.2)}>
              Hi, I'm{" "}
              <span className="accent-text-gradient">{config.hero.name}</span>
            </motion.h1>
            <motion.p
              className={`${styles.heroSubText} mt-2`}
              {...fadeUp(0.35)}
            >
              {config.hero.p[0]} <br className="hidden sm:block" />
              {config.hero.p[1]}
            </motion.p>

            {/* Typewriter */}
            <motion.div
              {...fadeUp(0.5)}
              className="mt-6 flex items-center gap-2"
            >
              <span
                className="font-mono text-[18px] sm:text-[22px]"
                style={{ color: "var(--color-accent)" }}
              >
                {"<"}
              </span>
              <span
                className="font-mono text-[16px] sm:text-[20px]"
                style={{ color: "var(--text-primary)" }}
              >
                {typedText}
              </span>
              <span className="typewriter-cursor" />
              <span
                className="font-mono text-[18px] sm:text-[22px]"
                style={{ color: "var(--color-accent)" }}
              >
                {"/>"}
              </span>
            </motion.div>

            {/* Personality icons — small, clean, below typewriter */}
            <motion.div
              {...fadeUp(0.6)}
              className="mt-5 flex items-center gap-3"
            >
              <MadridCrest size={24} id="heroCrest" className="opacity-50 hover:opacity-100 transition-opacity duration-300" />
              <EagleMark size={26} className="opacity-50 hover:opacity-100 transition-opacity duration-300" />
              <span
                className="h-[1px] w-8"
                style={{ background: "var(--glass-border)" }}
              />
              <span
                className="text-[11px] font-medium tracking-widest uppercase"
                style={{ color: "var(--color-muted)" }}
              >
                Hala Madrid &bull; Starboy
              </span>
            </motion.div>

            {/* CTAs */}
            <motion.div {...fadeUp(0.7)} className="mt-6 flex gap-4">
              <a
                href="#contact"
                className="group relative overflow-hidden rounded-full px-8 py-3 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-glow"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-accent), var(--gold-light, #f0d060))",
                  color: "#0a0e1a",
                }}
              >
                <span className="relative z-10 font-bold">Let's Talk</span>
                <span
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--gold-light, #f0d060), var(--color-accent))",
                  }}
                />
              </a>
              <a
                href="#about"
                className="glass rounded-full px-8 py-3 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-glow"
                style={{ color: "var(--text-primary)" }}
              >
                Explore
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 3D Canvas — elements are pushed right so they don't overlap text */}
      <ComputersCanvas />

      {/* Scroll indicator */}
      <motion.div
        className="xs:bottom-10 absolute bottom-32 z-[4] flex w-full items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <a href="#about" className="group">
          <div
            className="flex h-[64px] w-[35px] items-start justify-center rounded-3xl border-4 p-2 transition-colors duration-300"
            style={{ borderColor: "var(--color-secondary)" }}
          >
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="mb-1 h-3 w-3 rounded-full"
              style={{
                background: "var(--color-accent)",
                boxShadow: "0 0 8px var(--color-accent)",
              }}
            />
          </div>
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
