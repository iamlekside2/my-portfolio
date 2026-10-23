import { Link } from "react-router-dom";
import { FiArrowRight, FiArrowUpRight, FiCheck } from "react-icons/fi";
import PageShell from "../components/tunis/PageShell";
import { servicesWithProof } from "../constants/services";

const ServicesPage = () => (
  <PageShell ghost="Services" first="What We" second="Build">
    <p className="mx-auto mb-14 max-w-2xl text-center text-[15px] leading-[1.95] text-secondary">
      Five ways the studio gets engaged. Most projects begin as one of these and
      grow — a website becomes a booking system, a dashboard grows a mobile app.
      Scope is agreed up front, and so is what happens after launch.
    </p>

    <div className="flex flex-col gap-6">
      {servicesWithProof().map(({ service: s, proof }, i) => (
        <section
          key={s.id}
          id={s.id}
          className="grid gap-6 rounded-2xl p-6 md:grid-cols-[1fr_320px] md:p-8"
          style={{
            background: "var(--color-surface-elevated)",
            border: "1px solid var(--glass-border)",
          }}
        >
          <div>
            <span
              className="text-[12px] font-bold tabular-nums tracking-[0.3em]"
              style={{ color: "var(--color-accent)" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h2 className="mt-2 text-[22px] font-extrabold md:text-[26px]">
              {s.title}
            </h2>
            <p
              className="mt-2 text-[15px] font-semibold"
              style={{ color: "var(--color-accent)" }}
            >
              {s.outcome}
            </p>
            <p className="mt-4 max-w-xl text-[14.5px] leading-[1.9] text-secondary">
              {s.description}
            </p>

            {/* The route from the claim to the work behind it. */}
            {proof.length > 0 && (
              <div className="mt-6">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-secondary">
                  Work that shows it
                </h3>
                <ul className="mt-3 flex flex-wrap gap-2.5">
                  {proof.map((p) => (
                    <li key={p.slug}>
                      <Link
                        to={`/portfolio/${p.slug}`}
                        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12.5px] font-semibold transition-colors hover:text-[var(--color-accent)]"
                        style={{ border: "1px solid var(--glass-border)" }}
                      >
                        {p.name}
                        <FiArrowUpRight size={13} aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div
            className="rounded-xl p-5"
            style={{ background: "var(--color-tertiary)" }}
          >
            <h3 className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-secondary">
              Typically includes
            </h3>
            <ul className="flex flex-col gap-2.5">
              {s.deliverables.map((d) => (
                <li key={d} className="flex gap-2.5 text-[13.5px] leading-snug">
                  <FiCheck
                    className="mt-0.5 shrink-0"
                    style={{ color: "var(--color-accent)" }}
                    aria-hidden
                  />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </div>

    <div className="mt-14 text-center">
      <h2 className="text-[22px] font-extrabold md:text-[28px]">
        Not sure which one you need?
      </h2>
      <p className="mx-auto mt-3 max-w-lg text-[14.5px] leading-[1.9] text-secondary">
        Describe the problem rather than the solution. Part of the job is
        working out what actually needs building — and what does not.
      </p>
      <div className="mt-7 flex justify-center">
        <Link to="/contact" className="tunis-btn h-[48px]">
          Start a project
          <span className="tunis-btn-arrow">
            <FiArrowRight />
          </span>
        </Link>
      </div>
    </div>
  </PageShell>
);

export default ServicesPage;
