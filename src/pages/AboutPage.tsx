import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import PageShell from "../components/tunis/PageShell";
import CountUp from "../components/tunis/CountUp";
import Socials from "../components/tunis/Socials";
import { personalInfo, stats, capabilities, founder } from "../constants/profile";
import { experiences } from "../constants";

const AboutPage = () => (
  <PageShell ghost="Studio" first="The Studio &" second="Founder">
    {/* Founder + studio facts */}
    <div className="grid gap-12 lg:grid-cols-2">
      <div>
        <div className="mb-8 flex justify-center sm:justify-start">
          <div className="relative">
            <div
              aria-hidden
              className="absolute -left-3 -top-3 h-full w-full rounded-3xl"
              style={{ background: "var(--color-accent)" }}
            />
            <img
              src="/about.jpg"
              alt={founder.name}
              width={180}
              height={210}
              loading="lazy"
              decoding="async"
              className="relative h-[210px] w-[180px] rounded-3xl object-cover object-top"
              onError={(e) => {
                const parent = (e.currentTarget as HTMLImageElement).parentElement;
                if (parent) parent.style.display = "none";
              }}
            />
          </div>
        </div>

        <h2 className="mb-5 text-[18px] font-bold uppercase tracking-wider">
          Studio facts
        </h2>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-5">
          {personalInfo.map((f) => (
            <div key={f.label} className="text-[14px]">
              <dt className="inline text-secondary">{f.label} : </dt>
              <dd
                className="inline font-semibold"
                style={f.accent ? { color: "var(--color-accent)" } : undefined}
              >
                {f.value}
              </dd>
            </div>
          ))}
        </dl>

        {founder.bio.map((para) => (
          <p
            key={para.slice(0, 32)}
            className="mt-6 max-w-lg text-[14.5px] leading-[1.95] text-secondary"
          >
            {para}
          </p>
        ))}

        <div className="mt-7">
          <Socials />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 self-start">
        {stats.map((s) => (
          <div key={s.label} className="info-chip">
            <div
              className="text-[38px] font-extrabold leading-none"
              style={{ color: "var(--color-accent)" }}
            >
              <CountUp target={s.value} suffix={s.suffix} />
            </div>
            <div className="mt-3 text-[12px] uppercase tracking-wider text-secondary">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Capabilities — grouped, not scored */}
    <h2 className="mb-3 mt-20 text-center text-[18px] font-bold uppercase tracking-wider">
      Technology & Capability
    </h2>
    <p className="mx-auto mb-10 max-w-xl text-center text-[14px] leading-[1.9] text-secondary">
      Grouped by what the studio actually builds with, rather than scored out of
      a hundred — a self-assigned percentage tells you nothing useful.
    </p>
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {capabilities.map((c) => (
        <div
          key={c.group}
          className="rounded-2xl p-5"
          style={{
            background: "var(--color-surface-elevated)",
            border: "1px solid var(--glass-border)",
          }}
        >
          <h3 className="text-[15px] font-bold">{c.group}</h3>
          <p className="mt-1.5 text-[13px] leading-relaxed text-secondary">
            {c.summary}
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {c.items.map((i) => (
              <li
                key={i}
                className="rounded-full px-2.5 py-1 text-[11.5px] font-semibold"
                style={{
                  border: "1px solid var(--glass-border)",
                  color: "var(--color-accent)",
                }}
              >
                {i}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    {/* Experience */}
    <h2 className="mb-10 mt-20 text-center text-[18px] font-bold uppercase tracking-wider">
      Delivery Record
    </h2>
    <div
      className="mx-auto max-w-3xl border-l-2 pl-8"
      style={{ borderColor: "var(--glass-border)" }}
    >
      {experiences.map((e) => (
        <div key={`${e.companyName}-${e.date}`} className="relative mb-10">
          <span
            aria-hidden
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
          <ul className="mt-2 flex list-none flex-col gap-1.5">
            {e.points.map((point) => (
              <li
                key={point}
                className="relative pl-4 text-[13.5px] leading-relaxed text-secondary"
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-[0.65em] h-[5px] w-[5px] rounded-full"
                  style={{ background: "var(--color-accent)" }}
                />
                {point}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <div className="mt-14 text-center">
      <Link to="/contact" className="tunis-btn h-[48px]">
        Work with the studio
        <span className="tunis-btn-arrow">
          <FiArrowRight />
        </span>
      </Link>
    </div>
  </PageShell>
);

export default AboutPage;
