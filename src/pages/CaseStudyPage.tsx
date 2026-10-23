import { Link, useParams, Navigate } from "react-router-dom";
import { FiArrowLeft, FiArrowRight, FiExternalLink } from "react-icons/fi";
import PageTransition from "../components/tunis/PageTransition";
import { projectBySlug, caseStudies } from "../constants";
import { projectImage } from "../utils/projectImage";

/**
 * A case study page states only what is known: who the client is, what was
 * built, and the stack. No outcome metrics appear anywhere — none have been
 * independently verified, and invented numbers would undermine the rest.
 */
const CaseStudyPage = () => {
  const { slug = "" } = useParams();
  const project = projectBySlug(slug);
  const hasCaseStudy =
    project && caseStudies.some((p) => p.slug === project.slug);

  // Projects without enough verified detail have no page of their own; send
  // the visitor to the list rather than rendering a near-empty study.
  if (!project || !hasCaseStudy) return <Navigate to="/portfolio" replace />;

  const img = projectImage(project.slug);
  const index = caseStudies.findIndex((p) => p.slug === project.slug);
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <PageTransition>
      <article className="mx-auto max-w-4xl px-6 pb-28 pt-28 md:pl-10 md:pr-28 2xl:pr-10">
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-secondary hover:text-[var(--color-accent)]"
        >
          <FiArrowLeft aria-hidden /> All work
        </Link>

        <header className="mt-7">
          {project.sector && (
            <span
              className="text-[12px] font-bold uppercase tracking-[0.25em]"
              style={{ color: "var(--color-accent)" }}
            >
              {project.sector}
            </span>
          )}
          <h1 className="mt-3 text-[32px] font-extrabold leading-tight md:text-[44px]">
            {project.name}
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-[1.95] text-secondary">
            {project.description}
          </p>
        </header>

        {img && (
          <figure className="mt-10">
            <img
              src={img}
              alt={`${project.name} interface`}
              loading="lazy"
              decoding="async"
              className="w-full rounded-2xl object-cover object-top"
              style={{ border: "1px solid var(--glass-border)" }}
            />
            <figcaption className="mt-3 text-[12.5px] text-secondary">
              {project.imageCaption ??
                `${project.name} — captured from the live ${
                  project.category === "Mobile" ? "product" : "site"
                }.`}
            </figcaption>
          </figure>
        )}

        {/* The brief, where it is actually known. Absent on projects where it
            would have to be reconstructed from the finished product. */}
        {project.problem && (
          <section className="mt-14">
            <h2 className="text-[13px] font-bold uppercase tracking-[0.2em] text-secondary">
              The problem
            </h2>
            <p className="mt-5 max-w-2xl text-[15.5px] leading-[1.95]">
              {project.problem}
            </p>
          </section>
        )}

        <div className="mt-12 grid gap-10 md:grid-cols-[1fr_260px]">
          <div>
            <h2 className="text-[13px] font-bold uppercase tracking-[0.2em] text-secondary">
              What LeksIDE built
            </h2>
            <ul className="mt-5 flex flex-col gap-3.5">
              {project.contribution?.map((c) => (
                <li key={c} className="relative pl-5 text-[15px] leading-[1.8]">
                  <span
                    aria-hidden
                    className="absolute left-0 top-[0.62em] h-[6px] w-[6px] rounded-full"
                    style={{ background: "var(--color-accent)" }}
                  />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <aside className="flex flex-col gap-7">
            {project.audience && (
              <div>
                <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-secondary">
                  Built for
                </h2>
                <p className="mt-2 text-[14px] leading-relaxed">{project.audience}</p>
              </div>
            )}
            {project.stack && (
              <div>
                <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-secondary">
                  Stack
                </h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <li
                      key={s}
                      className="rounded-full px-3 py-1 text-[12px] font-semibold"
                      style={{
                        border: "1px solid var(--glass-border)",
                        color: "var(--color-accent)",
                      }}
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {project.sourceCodeLink && (
              <a
                href={project.sourceCodeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="tunis-btn h-[44px] w-fit"
              >
                Visit site
                <span className="tunis-btn-arrow">
                  <FiExternalLink size={15} />
                </span>
              </a>
            )}
          </aside>
        </div>

        {/* Implementation decisions: the part of a build a prospective client
            cannot read off a screenshot. */}
        {project.decisions && project.decisions.length > 0 && (
          <section className="mt-16">
            <h2 className="text-[13px] font-bold uppercase tracking-[0.2em] text-secondary">
              Decisions that shaped it
            </h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {project.decisions.map((d) => (
                <div
                  key={d.title}
                  className="rounded-2xl p-5"
                  style={{
                    background: "var(--color-surface-elevated)",
                    border: "1px solid var(--glass-border)",
                  }}
                >
                  <h3 className="text-[15px] font-bold">{d.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-[1.9] text-secondary">
                    {d.detail}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        <nav
          className="mt-16 flex flex-wrap items-center justify-between gap-5 border-t pt-8"
          style={{ borderColor: "var(--glass-border)" }}
          aria-label="More work"
        >
          <Link
            to={`/portfolio/${next.slug}`}
            className="group inline-flex items-center gap-3"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-secondary">
              Next project
            </span>
            <span className="text-[16px] font-bold group-hover:text-[var(--color-accent)]">
              {next.name}
            </span>
            <FiArrowRight aria-hidden style={{ color: "var(--color-accent)" }} />
          </Link>
          <Link to="/contact" className="tunis-btn h-[44px]">
            Start a project
            <span className="tunis-btn-arrow">
              <FiArrowRight />
            </span>
          </Link>
        </nav>
      </article>
    </PageTransition>
  );
};

export default CaseStudyPage;
