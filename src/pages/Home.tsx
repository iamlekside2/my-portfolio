import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import Tilt from "react-parallax-tilt";
import { config } from "../constants/config";
import PageTransition from "../components/tunis/PageTransition";
import Socials from "../components/tunis/Socials";
import Typewriter from "../components/tunis/Typewriter";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.25 } },
};
const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const Home = () => {
  const [hasPortrait, setHasPortrait] = useState(true);

  return (
    <PageTransition>
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-12 px-6 pb-28 pt-16 md:flex-row md:gap-16 md:pl-10 md:pr-28 2xl:pr-10">
        {/* Portrait card with yellow offset block + 3D tilt */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="w-[240px] shrink-0 md:w-[330px] lg:w-[380px]"
        >
          <Tilt
            tiltMaxAngleX={7}
            tiltMaxAngleY={7}
            transitionSpeed={1800}
            scale={1.02}
            className="relative"
          >
            <div
              className="absolute -left-4 -top-4 h-full w-full rounded-[28px]"
              style={{ background: "var(--color-accent)" }}
            />
            <div
              className="relative aspect-[4/5] overflow-hidden rounded-[28px]"
              style={{ background: "var(--color-tertiary)" }}
            >
              {hasPortrait ? (
                <img
                  src="/portrait.jpg"
                  alt={config.html.fullName}
                  className="h-full w-full object-cover"
                  onError={() => setHasPortrait(false)}
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-3">
                  <span
                    className="text-[72px] font-extrabold"
                    style={{ color: "var(--color-accent)" }}
                  >
                    OO
                  </span>
                </div>
              )}
            </div>
          </Tilt>
        </motion.div>

        {/* Intro — staggered entrance */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-xl text-center md:text-left"
        >
          <motion.h1
            variants={item}
            className="text-[32px] font-extrabold uppercase leading-tight md:text-[42px]"
          >
            <span style={{ color: "var(--color-accent)" }}>
              I'm {config.html.fullName}.
            </span>
            <br />
            <span className="block min-h-[1.3em]">
              <Typewriter
                words={[
                  "Frontend Developer",
                  "WordPress Developer",
                  "Mobile App Developer",
                ]}
              />
            </span>
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-6 text-[15px] leading-[1.9] text-secondary md:text-[16px]"
          >
            {config.hero.p.join(" ")}. I build efficient, scalable and
            user-friendly web apps, dashboards and WordPress sites — known for
            very fast delivery, and I collaborate closely with clients to bring
            their ideas to life.
          </motion.p>
          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center justify-center gap-6 md:justify-start"
          >
            <Link to="/about" className="tunis-btn h-[46px]">
              More about me
              <span className="tunis-btn-arrow">
                <FiArrowRight />
              </span>
            </Link>
            <Socials />
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Home;
