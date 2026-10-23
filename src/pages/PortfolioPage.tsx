import { useMemo, useState } from "react";
import PageShell from "../components/tunis/PageShell";
import ProjectCard from "../components/work/ProjectCard";
import { projects } from "../constants";

/**
 * Replaces the old auto-advancing carousel with a grid.
 *
 * A carousel hid most of the work behind a timer and gave keyboard and screen
 * reader users a moving target; a filtered grid shows everything at once and
 * lets the visitor scan the category they actually care about.
 */
const PortfolioPage = () => {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.category)))],
    []
  );
  const [active, setActive] = useState("All");

  const shown = projects.filter(
    (p) =>
      active === "All" ||
      p.category === active ||
      p.extraCategories?.includes(active)
  );

  return (
    <PageShell ghost="Works" first="Selected" second="Work">
      <p className="mx-auto mb-10 max-w-2xl text-center text-[15px] leading-[1.95] text-secondary">
        Platforms, dashboards and websites built for clients in Nigeria and the
        US. Projects with enough detail to be worth reading about link through
        to a case study; the rest link straight to the live site.
      </p>

      <div
        className="mb-8 flex flex-wrap justify-center gap-3"
        role="group"
        aria-label="Filter work by category"
      >
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            aria-pressed={active === c}
            className="rounded-full px-5 py-2 text-[12px] font-bold uppercase tracking-wider transition-all duration-300"
            style={{
              background:
                active === c ? "var(--color-accent)" : "var(--color-tertiary)",
              color: active === c ? "#111" : "var(--text-primary)",
            }}
          >
            {c}
          </button>
        ))}
      </div>

      <p
        className="mb-8 text-center text-[12px] uppercase tracking-widest text-secondary"
        aria-live="polite"
      >
        {shown.length} project{shown.length === 1 ? "" : "s"}
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </PageShell>
  );
};

export default PortfolioPage;
