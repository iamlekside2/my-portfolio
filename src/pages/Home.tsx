import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { config } from "../constants/config";
import PageTransition from "../components/tunis/PageTransition";

const Home = () => {
  const [hasPortrait, setHasPortrait] = useState(true);

  return (
    <PageTransition>
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-12 px-6 pb-28 pt-16 md:flex-row md:gap-16 md:pl-10 md:pr-28 2xl:pr-10">
        {/* Portrait card with yellow offset block */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative w-[240px] shrink-0 md:w-[330px] lg:w-[380px]"
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
        </motion.div>

        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="max-w-xl text-center md:text-left"
        >
          <h1 className="text-[32px] font-extrabold uppercase leading-tight md:text-[44px]">
            <span style={{ color: "var(--color-accent)" }}>
              I'm {config.html.fullName}.
            </span>
            <br />
            Frontend & WordPress Developer
          </h1>
          <p className="mt-6 text-[15px] leading-[1.9] text-secondary md:text-[16px]">
            {config.hero.p.join(" ")}. I build efficient, scalable and
            user-friendly web apps, dashboards and WordPress sites — and I
            collaborate closely with clients to bring their ideas to life.
          </p>
          <div className="mt-10 flex justify-center md:justify-start">
            <Link to="/about" className="tunis-btn h-[46px]">
              More about me
              <span className="tunis-btn-arrow">
                <FiArrowRight />
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Home;
