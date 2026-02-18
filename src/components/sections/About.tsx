import React from "react";
import { motion } from "framer-motion";

import { services } from "../../constants";
import { SectionWrapper } from "../../hoc";
import { fadeIn } from "../../utils/motion";
import { config } from "../../constants/config";
import { Header } from "../atoms/Header";
import MadridCrest from "../layout/MadridCrest";
import EagleMark from "../layout/EagleMark";

interface IServiceCard {
  index: number;
  title: string;
  icon: string;
}

const ServiceCard: React.FC<IServiceCard> = ({ index, title, icon }) => (
  <motion.div
    variants={fadeIn("right", "spring", index * 0.5, 0.75)}
    className="w-full xs:w-[250px] max-w-[250px]"
  >
    <div className="perspective-container">
      <div className="glass-card group relative overflow-hidden p-[1px]">
        {/* Gold gradient border on hover */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(135deg, var(--color-accent), var(--color-accent-secondary))",
          }}
        />
        <div
          className="relative flex min-h-[280px] flex-col items-center justify-evenly rounded-[20px] px-12 py-5"
          style={{ background: "var(--color-tertiary)" }}
        >
          {/* Alternating motif badge — crest or eagle */}
          <div className="absolute right-3 top-3 opacity-30 group-hover:opacity-60 transition-opacity duration-300">
            {index % 2 === 0 ? (
              <MadridCrest size={20} />
            ) : (
              <EagleMark size={22} />
            )}
          </div>

          <motion.img
            src={icon}
            alt={title}
            className="h-16 w-16 object-contain"
            whileHover={{ scale: 1.2, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          />

          <h3 className="text-center text-[20px] font-bold text-[var(--text-primary)]">
            {title}
          </h3>

          {/* Gold accent line at bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1 scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
            style={{
              background:
                "linear-gradient(90deg, var(--color-accent), var(--color-accent-secondary))",
            }}
          />
        </div>
      </div>
    </div>
  </motion.div>
);

const About = () => {
  return (
    <>
      <Header useMotion={true} {...config.sections.about} />

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="text-secondary mt-4 max-w-3xl text-[17px] leading-[30px]"
      >
        {config.sections.about.content}
      </motion.p>

      {/* Personality strip — subtle motifs between text and cards */}
      <motion.div
        variants={fadeIn("", "", 0.3, 1)}
        className="mt-8 flex items-center gap-6 opacity-40"
      >
        <div className="neon-line flex-1" />
        <MadridCrest size={24} />
        <EagleMark size={28} />
        <span
          className="font-mono text-[16px] font-black"
          style={{ color: "var(--color-accent)" }}
        >
          7
        </span>
        <div className="neon-line flex-1" />
      </motion.div>

      <div className="mt-12 flex flex-wrap gap-10 max-sm:justify-center">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
