import { motion } from "framer-motion";

import { styles } from "../../constants/styles";
import { fadeIn } from "../../utils/motion";
import { testimonials } from "../../constants";
import { Header } from "../atoms/Header";
import { TTestimonial } from "../../types";
import { config } from "../../constants/config";
import MadridCrest from "../layout/MadridCrest";
import EagleMark from "../layout/EagleMark";

const FeedbackCard: React.FC<{ index: number } & TTestimonial> = ({
  index,
  testimonial,
  name,
  designation,
  company,
}) => (
  <motion.div
    variants={fadeIn("", "spring", index * 0.5, 0.75)}
    className="glass-card xs:w-[320px] w-full p-8 relative"
  >
    {/* Personality watermark top-right */}
    <div className="absolute right-4 top-4 opacity-15">
      {index % 2 === 0 ? (
        <MadridCrest size={28} />
      ) : (
        <EagleMark size={30} />
      )}
    </div>

    {/* Gold quote mark */}
    <div className="mb-4 inline-block text-[48px] font-black leading-none accent-text-gradient">
      "
    </div>

    <div>
      <p
        className="text-[16px] leading-[26px] tracking-wider"
        style={{ color: "var(--text-primary)" }}
      >
        {testimonial}
      </p>

      <div className="mt-7 flex items-center gap-3">
        {/* Gold gradient avatar */}
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full text-[16px] font-bold"
          style={{
            background:
              "linear-gradient(135deg, var(--color-accent), var(--color-accent-secondary))",
            color: "#ffffff",
          }}
        >
          {name.charAt(0)}
        </div>
        <div className="flex flex-1 flex-col">
          <p
            className="text-[14px] font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            <span className="accent-text-gradient">@</span> {name}
          </p>
          <p className="text-secondary mt-1 text-[12px]">
            {designation} of {company}
          </p>
        </div>
      </div>
    </div>
  </motion.div>
);

const Feedbacks = () => {
  return (
    <div
      className="mt-12 rounded-[20px]"
      style={{ background: "var(--color-black-100)" }}
    >
      <div
        className={`${styles.padding} min-h-[300px] rounded-2xl`}
        style={{ background: "var(--color-tertiary)" }}
      >
        <Header useMotion={true} {...config.sections.feedbacks} />
      </div>
      <div
        className={`${styles.paddingX} -mt-20 flex flex-wrap gap-7 pb-14 max-sm:justify-center`}
      >
        {testimonials.map((testimonial, index) => (
          <FeedbackCard
            key={testimonial.name}
            index={index}
            {...testimonial}
          />
        ))}
      </div>
    </div>
  );
};

export default Feedbacks;
