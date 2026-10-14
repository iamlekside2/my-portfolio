import { motion } from "framer-motion";

import { SectionWrapper } from "../../hoc";
import { projects } from "../../constants";
import { fadeIn } from "../../utils/motion";
import { config } from "../../constants/config";
import { Header } from "../atoms/Header";
import { TProject } from "../../types";
import MadridCrest from "../layout/MadridCrest";
import EagleMark from "../layout/EagleMark";

const ProjectCard: React.FC<{ index: number } & TProject> = ({
  index,
  name,
  description,
  tags,
  image,
  sourceCodeLink,
}) => {
  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.5, 0.75)}
      className="perspective-container"
    >
      <div className="glass-card group w-full overflow-hidden sm:w-[340px]">
        {/* Image section */}
        <div className="relative h-[230px] w-full overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center"
              style={{ background: "var(--color-tertiary)" }}
            >
              <span
                className="text-[48px] font-black opacity-20"
                style={{ color: "var(--color-accent)" }}
              >
                {name.charAt(0)}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)] via-transparent to-transparent opacity-60" />
          {/* Gold top accent line */}
          <div
            className="absolute left-0 right-0 top-0 h-[2px]"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--color-accent), transparent)",
            }}
          />
          {sourceCodeLink && (
            <div className="absolute inset-0 m-3 flex justify-end">
              <a
                href={sourceCodeLink}
                target="_blank"
                rel="noopener noreferrer"
                title={`Visit ${name}`}
                className="glass flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-[18px] font-bold no-underline transition-all duration-300 hover:scale-110 hover:shadow-glow"
                style={{ color: "var(--color-accent)" }}
              >
                ↗
              </a>
            </div>
          )}
          {/* Personality watermark in bottom-left of image */}
          <div className="absolute bottom-2 left-3 opacity-25 group-hover:opacity-50 transition-opacity duration-300">
            {index % 3 === 0 ? (
              <MadridCrest size={18} />
            ) : index % 3 === 1 ? (
              <EagleMark size={20} />
            ) : (
              <span
                className="font-mono text-[14px] font-black"
                style={{ color: "var(--color-accent)" }}
              >
                7
              </span>
            )}
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-[22px] font-bold text-[var(--text-primary)]">
            {name}
          </h3>
          <p className="mt-2 text-[14px] leading-[22px] text-secondary">
            {description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag.name}
                className="rounded-full px-3 py-1 text-[12px] font-medium"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(26, 86, 219, 0.1))",
                  border: "1px solid var(--glass-border)",
                  color: "var(--color-accent)",
                }}
              >
                #{tag.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      <Header useMotion={true} {...config.sections.works} />

      <div className="flex w-full">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="text-secondary mt-3 max-w-3xl text-[17px] leading-[30px]"
        >
          {config.sections.works.content}
        </motion.p>
      </div>

      {[...new Set(projects.map((p) => p.category))].map((category) => (
        <div key={category} className="mt-16">
          <motion.div
            variants={fadeIn("", "", 0.1, 1)}
            className="flex items-center gap-4"
          >
            <h3
              className="text-[20px] font-bold uppercase tracking-wider"
              style={{ color: "var(--color-accent)" }}
            >
              {category}
            </h3>
            <div
              className="h-[1px] flex-1"
              style={{
                background:
                  "linear-gradient(90deg, var(--color-accent), transparent)",
                opacity: 0.35,
              }}
            />
          </motion.div>
          <div className="mt-8 flex flex-wrap gap-7">
            {projects
              .filter((p) => p.category === category)
              .map((project, index) => (
                <ProjectCard
                  key={`project-${project.name}`}
                  index={index}
                  {...project}
                />
              ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default SectionWrapper(Works, "");
