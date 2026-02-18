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
      {/* Text content */}
      <div
        className={`absolute inset-0 top-[120px] z-[3] mx-auto max-w-7xl ${styles.paddingX} flex flex-row items-start gap-5 pointer-events-none`}
      >
        <motion.div
          className="mt-5 flex flex-col items-center justify-center"
          {...fadeUp(0.1)}
        >
          {/* Gold accent dot — like a star */}
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

          {/* Typewriter — gold code brackets */}
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

          {/* Personality motifs — Madrid Crest + Eagle */}
          <motion.div
            {...fadeUp(0.6)}
            className="mt-6 flex items-center gap-4"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="opacity-60 hover:opacity-100 transition-opacity duration-300"
              title="Hala Madrid"
            >
              <MadridCrest size={32} />
            </motion.div>
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="opacity-60 hover:opacity-100 transition-opacity duration-300"
              title="Starboy"
            >
              <EagleMark size={36} />
            </motion.div>
            <motion.span
              className="font-mono text-[22px] font-black"
              style={{ color: "var(--color-accent)" }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              title="CR7"
            >
              CR7
            </motion.span>
          </motion.div>

          {/* CTAs — Gold primary, glass secondary */}
          <motion.div {...fadeUp(0.75)} className="mt-6 flex gap-4">
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

      {/* 3D Canvas */}
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
