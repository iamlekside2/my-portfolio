import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiExternalLink, FiX } from "react-icons/fi";
import PageShell from "../components/tunis/PageShell";
import { projects } from "../constants";
import { TProject } from "../types";

// Screenshots generated from the live sites (src/assets/projects/<slug>.png)
const shots = import.meta.glob("../assets/projects/*.png", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const SLUGS: Record<string, string> = {
  "COMCIN Project": "comcin",
  "UrCalls Admin Dashboard": "urcalls",
  "Nexalife Care (Patient Tracker)": "nexalife",
  HRRP: "hrrp",
  "KPI Platform": "kpi",
  AfricanProverbs: "africanproverbs",
  "AeroCruise Travels": "aerocruise",
  RostrumSec: "rostrumsec",
  "Tyndale Securities": "tyndale",
  "TomilTrust Limited": "tomiltrust",
  "Oladele Oyelola Foundation": "oladele",
  "Raya Elite Cleaning": "rayaelite",
  RealCousins: "realcousins",
};

const tileImage = (p: TProject) =>
  shots[`../assets/projects/${SLUGS[p.name]}.png`] || p.image || "";

const PortfolioPage = () => {
  const categories = ["All", ...new Set(projects.map((p) => p.category))];
  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState<TProject | null>(null);
  const shown = projects.filter((p) => active === "All" || p.category === active);

  return (
    <PageShell ghost="Works" first="My" second="Portfolio">
      {/* Filter tabs */}
      <div className="mb-12 flex flex-wrap justify-center gap-3">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className="rounded-full px-5 py-2 text-[12px] font-bold uppercase tracking-wider transition-all duration-300"
            style={{
              background: active === c ? "var(--color-accent)" : "var(--color-tertiary)",
              color: active === c ? "#111" : "var(--text-primary)",
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((p) => {
            const img = tileImage(p);
            return (
              <motion.button
                layout
                key={p.name}
                type="button"
                onClick={() => setSelected(p)}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.3 }}
                className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl text-left"
                style={{ background: "var(--color-tertiary)" }}
              >
                {img ? (
                  <img
                    src={img}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-2">
                    <span
                      className="text-[52px] font-extrabold opacity-30"
                      style={{ color: "var(--color-accent)" }}
                    >
                      {p.name.charAt(0)}
                    </span>
                    <span className="px-4 text-center text-[13px] font-semibold text-secondary">
                      {p.name}
                    </span>
                  </div>
                )}
                <div className="tile-overlay p-5 text-center">
                  <span className="text-[17px] font-extrabold uppercase tracking-wide">
                    {p.name}
                  </span>
                  <span className="text-[12px] font-bold uppercase tracking-widest">
                    View details
                  </span>
                </div>
                {/* Always-visible name bar on touch devices (no hover) */}
                <div
                  className="absolute inset-x-0 bottom-0 px-4 py-2 text-[12px] font-bold uppercase tracking-wider md:hidden"
                  style={{ background: "rgba(17,17,17,0.82)", color: "#fff" }}
                >
                  {p.name}
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="glass-card max-h-[90vh] w-full max-w-lg overflow-y-auto"
              style={{ background: "var(--color-surface-elevated)" }}
              onClick={(e) => e.stopPropagation()}
            >
              {tileImage(selected) && (
                <img
                  src={tileImage(selected)}
                  alt={selected.name}
                  className="max-h-[260px] w-full rounded-t-[20px] object-cover object-top"
                />
              )}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-[20px] font-bold">{selected.name}</h3>
                  <button
                    aria-label="Close"
                    onClick={() => setSelected(null)}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                    style={{ background: "var(--color-tertiary)" }}
                  >
                    <FiX />
                  </button>
                </div>
                <div
                  className="mt-1 text-[11px] font-bold uppercase tracking-widest"
                  style={{ color: "var(--color-accent)" }}
                >
                  {selected.category}
                </div>
                <p className="mt-4 text-[14px] leading-relaxed text-secondary">
                  {selected.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {selected.tags.map((t) => (
                    <span
                      key={t.name}
                      className="rounded-full px-3 py-1 text-[11px] font-semibold"
                      style={{
                        border: "1px solid var(--glass-border)",
                        color: "var(--color-accent)",
                      }}
                    >
                      #{t.name}
                    </span>
                  ))}
                </div>
                {selected.sourceCodeLink && (
                  <a
                    href={selected.sourceCodeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 flex items-center justify-center gap-2 rounded-xl py-3 text-[13px] font-bold uppercase tracking-wider transition-transform duration-200 hover:scale-[1.02]"
                    style={{ background: "var(--color-accent)", color: "#111" }}
                  >
                    Visit site <FiExternalLink size={15} />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  );
};

export default PortfolioPage;
