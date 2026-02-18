import { FC } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import { experiences } from "../../constants";
import { SectionWrapper } from "../../hoc";
import { Header } from "../atoms/Header";
import { TExperience } from "../../types";
import { config } from "../../constants/config";
import MadridCrest from "../layout/MadridCrest";
import EagleMark from "../layout/EagleMark";

const VerticalTimelineAny = VerticalTimeline as unknown as FC<any>;
const VerticalTimelineElementAny =
  VerticalTimelineElement as unknown as FC<any>;

const ExperienceCard: FC<TExperience & { index: number }> = (props) => {
  const { index, ...experience } = props;
  return (
    <VerticalTimelineElementAny
      contentStyle={{
        background: "var(--glass-bg)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid var(--glass-border)",
        color: "var(--text-primary)",
        borderRadius: "20px",
        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.1)",
        borderTop: "2px solid var(--color-accent)",
      }}
      contentArrowStyle={{ borderRight: "7px solid var(--glass-border)" }}
      date={experience.date}
      iconStyle={{
        background: experience.iconBg,
        boxShadow:
          "0 0 0 4px var(--color-accent), inset 0 2px 0 rgba(0,0,0,.08), 0 3px 0 4px rgba(0,0,0,.05)",
      }}
      icon={
        <div className="flex h-full w-full items-center justify-center">
          <img
            src={experience.icon}
            alt={experience.companyName}
            className="h-[60%] w-[60%] object-contain"
          />
        </div>
      }
    >
      <div className="relative">
        {/* Personality motif in top-right corner */}
        <div className="absolute -right-2 -top-2 opacity-20">
          {index % 3 === 0 ? (
            <MadridCrest size={22} />
          ) : index % 3 === 1 ? (
            <EagleMark size={24} />
          ) : (
            <span
              className="font-mono text-[18px] font-black"
              style={{ color: "var(--color-accent)" }}
            >
              7
            </span>
          )}
        </div>
        <h3 className="text-[24px] font-bold text-[var(--text-primary)]">
          {experience.title}
        </h3>
        <p
          className="text-[16px] font-semibold"
          style={{ margin: 0, color: "var(--color-accent)" }}
        >
          {experience.companyName}
        </p>
      </div>

      <ul className="ml-5 mt-5 list-disc space-y-2">
        {experience.points.map((point, pointIndex) => (
          <li
            key={`experience-point-${pointIndex}`}
            className="pl-1 text-[14px] tracking-wider"
            style={{ color: "var(--text-secondary)" }}
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElementAny>
  );
};

const Experience: FC = () => {
  return (
    <>
      <Header useMotion={true} {...config.sections.experience} />

      <div className="mt-20 flex flex-col">
        <VerticalTimelineAny>
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} index={index} {...experience} />
          ))}
        </VerticalTimelineAny>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
