import { motion } from "framer-motion";
import { BallCanvas } from "../canvas";
import { SectionWrapper } from "../../hoc";
import { technologies } from "../../constants";

const Tech = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-10 text-center"
      >
        <p className="text-secondary text-[14px] uppercase tracking-wider sm:text-[18px]">
          My toolkit
        </p>
        <h2 className="text-[30px] font-black xs:text-[40px] sm:text-[50px] md:text-[60px]" style={{ color: "var(--text-primary)" }}>
          Technologies.
        </h2>
      </motion.div>

      <div className="flex flex-row flex-wrap justify-center gap-10">
        {technologies.map((technology, index) => (
          <motion.div
            key={technology.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group relative h-28 w-28"
          >
            <BallCanvas icon={technology.icon} />
            <div
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: "var(--glass-bg)",
                backdropFilter: "blur(10px)",
                border: "1px solid var(--glass-border)",
                color: "var(--text-primary)",
              }}
            >
              {technology.name}
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "tech");
