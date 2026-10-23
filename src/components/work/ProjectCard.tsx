import { Link } from "react-router-dom";
import { FiArrowUpRight, FiExternalLink } from "react-icons/fi";
import type { TProject } from "../../types";
import { projectImage } from "../../utils/projectImage";

/**
 * One project tile. Links through to the case study when the project has
 * enough verified detail to justify a page; otherwise it links straight to the
 * live site, so a card never promises a page that doesn't exist.
 */
const ProjectCard = ({ project }: { project: TProject }) => {
  const img = projectImage(project.slug);
  const hasCaseStudy = (project.contribution?.length ?? 0) >= 3;
  const to = hasCaseStudy ? `/portfolio/${project.slug}` : project.sourceCodeLink;

  const inner = (
    <>
      <div
        className="relative aspect-[4/3] w-full overflow-hidden rounded-t-2xl"
        style={{ background: "var(--color-tertiary)" }}
      >
        {img ? (
          <img
            src={img}
            alt={`${project.name} website`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <span
            className="flex h-full w-full items-center justify-center text-[52px] font-extrabold opacity-30"
            style={{ color: "var(--color-accent)" }}
            aria-hidden
          >
            {project.name.charAt(0)}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        {project.sector && (
          <span
            className="mb-2 text-[11px] font-bold uppercase tracking-widest"
            style={{ color: "var(--color-accent)" }}
          >
            {project.sector}
          </span>
        )}
        <h3 className="flex items-start justify-between gap-2 text-[17px] font-bold">
          {project.name}
          <span className="mt-1 shrink-0 text-secondary" aria-hidden>
            {hasCaseStudy ? <FiArrowUpRight /> : <FiExternalLink size={15} />}
          </span>
        </h3>
        <p className="mt-2 line-clamp-3 text-[13.5px] leading-relaxed text-secondary">
          {project.description}
        </p>
        {project.stack && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.slice(0, 3).map((s) => (
              <span
                key={s}
                className="rounded-full px-2.5 py-1 text-[11px] font-semibold text-secondary"
                style={{ border: "1px solid var(--glass-border)" }}
              >
                {s}
              </span>
            ))}
          </div>
        )}
        <span
          className="mt-4 text-[12px] font-bold uppercase tracking-widest"
          style={{ color: "var(--color-accent)" }}
        >
          {hasCaseStudy ? "Read the case study" : "Visit the site"}
        </span>
      </div>
    </>
  );

  const className =
    "group flex flex-col overflow-hidden rounded-2xl text-left transition-all duration-300 hover:-translate-y-1.5";
  const style = {
    background: "var(--color-surface-elevated)",
    border: "1px solid var(--glass-border)",
  };

  return hasCaseStudy ? (
    <Link to={to} className={className} style={style}>
      {inner}
    </Link>
  ) : (
    <a
      href={to}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={style}
    >
      {inner}
    </a>
  );
};

export default ProjectCard;
