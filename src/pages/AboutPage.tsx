import { motion } from "framer-motion";
import PageShell from "../components/tunis/PageShell";
import CountUp from "../components/tunis/CountUp";
import { personalInfo, stats, skills } from "../constants/profile";
import { experiences } from "../constants";
import { config } from "../constants/config";

const AboutPage = () => (
  <PageShell ghost="Resume" first="About" second="Me">
    {/* Personal infos + stats */}
    <div className="grid gap-12 lg:grid-cols-2">
      <div>
        <h2 className="mb-6 text-[18px] font-bold uppercase tracking-wider">
          Personal Infos
        </h2>
        <div className="mb-8 flex justify-center sm:justify-start">
          <div className="relative">
            <div
              className="absolute -left-3 -top-3 h-full w-full rounded-3xl"
              style={{ background: "var(--color-accent)" }}
            />
            <img
              src="/about.jpg"
              alt="Olamilekan Olakunle"
              className="relative h-[210px] w-[180px] rounded-3xl object-cover object-top"
              onError={(e) => {
                (e.target as HTMLImageElement).parentElement!.style.display =
                  "none";
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-5">
          {personalInfo.map((f) => (
            <div key={f.label} className="text-[14px]">
              <span className="text-secondary">{f.label} : </span>
              <span
                className="font-semibold"
                style={f.accent ? { color: "var(--color-accent)" } : undefined}
              >
                {f.value}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-lg text-[14px] leading-[1.9] text-secondary">
          {config.sections.about.content}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-5 self-start">
        {stats.map((s) => (
          <div key={s.label} className="info-chip">
            <div
              className="text-[38px] font-extrabold leading-none"
              style={{ color: "var(--color-accent)" }}
            >
              <CountUp target={parseInt(s.value, 10)} suffix={s.suffix} />
            </div>
            <div className="mt-3 text-[12px] uppercase tracking-wider text-secondary">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Skills */}
    <h2 className="mb-8 mt-20 text-center text-[18px] font-bold uppercase tracking-wider">
      My Skills
    </h2>
    <div className="grid gap-x-10 gap-y-7 md:grid-cols-2">
      {skills.map((s, i) => (
        <div key={s.name}>
          <div className="mb-2 flex justify-between text-[13px] font-semibold">
            <span>{s.name}</span>
            <span className="text-secondary">{s.level}%</span>
          </div>
          <div className="skill-track">
            <motion.div
              className="skill-fill"
              initial={{ width: 0 }}
              whileInView={{ width: `${s.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: i * 0.05, ease: "easeOut" }}
            />
          </div>
        </div>
      ))}
    </div>

    {/* Experience timeline */}
    <h2 className="mb-10 mt-20 text-center text-[18px] font-bold uppercase tracking-wider">
      Experience
    </h2>
    <div
      className="mx-auto max-w-3xl border-l-2 pl-8"
      style={{ borderColor: "var(--glass-border)" }}
    >
      {experiences.map((e) => (
        <div key={`${e.companyName}-${e.date}`} className="relative mb-10">
          <span
            className="absolute -left-[41px] top-1 h-4 w-4 rounded-full border-2"
            style={{
              background: "var(--color-primary)",
              borderColor: "var(--color-accent)",
            }}
          />
          <span
            className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider"
            style={{ background: "var(--color-tertiary)", color: "var(--color-accent)" }}
          >
            {e.date}
          </span>
          <h3 className="mt-3 text-[16px] font-bold">
            {e.title}{" "}
            <span className="font-normal text-secondary">— {e.companyName}</span>
          </h3>
          <p className="mt-2 text-[13.5px] leading-relaxed text-secondary">
            {e.points[0]}
          </p>
        </div>
      ))}
    </div>
  </PageShell>
);

export default AboutPage;
