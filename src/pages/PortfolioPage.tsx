import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiExternalLink, FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
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
  "CalmGlobal Technologies": "calmglobal",
  GMBJet: "gmbjet",
  ReinstateBoost: "reinstateboost",
  "Press Featured": "pressfeatured",
  "Eniwo Egbeme": "eniwoegbeme",
  "RCCG Jubilee House": "rccgjubilee",
  "DUMAAC Projects": "dumaac",
  "Xmage Photography": "xmage",
  "St John's Catholic Hospital Kabba": "stjohns",
  "Kanary Ancillaries": "kanary",
  "Great Ife Alumni Canada": "greatife",
  "Okun Development Association": "okundev",
  "Ayetoro Gbede Global Network": "ayetoro",
  "Beyond Healthcare Fertility": "beyondhealth",
  "IASSS Iyara": "iasss",
};

const tileImage = (p: TProject) =>
  shots[`../assets/projects/${SLUGS[p.name]}.png`] || p.image || "";

const PortfolioPage = () => {
  const categories = ["All", ...new Set(projects.map((p) => p.category))];
  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState<TProject | null>(null);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const shown = projects.filter(
    (p) =>
      active === "All" ||
      p.category === active ||
      p.extraCategories?.includes(active)
  );

  useEffect(() => {
    trackRef.current?.scrollTo({ left: 0 });
  }, [active]);

  // Auto-advance the slider; pauses on hover/touch, while the modal is open,
  // and for users who prefer reduced motion.
  useEffect(() => {
    if (paused || selected) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      const track = trackRef.current;
      if (!track || document.hidden) return;
      const max = track.scrollWidth - track.clientWidth;
      if (track.scrollLeft >= max - 10) {
        track.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        track.scrollBy({ left: track.clientWidth * 0.55, behavior: "smooth" });
      }
    }, 3500);
    return () => clearInterval(id);
  }, [paused, selected, active]);

  const nudge = (dir: number) => {
    const track = trackRef.current;
    if (track) track.scrollBy({ left: dir * track.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <PageShell ghost="Works" first="My" second="Portfolio">
      {/* Filter tabs */}
      <div className="mb-10 flex flex-wrap justify-center gap-3">
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

      <div className="mb-4 text-center text-[12px] uppercase tracking-widest text-secondary">
        {shown.length} project{shown.length === 1 ? "" : "s"} — swipe or use the
        arrows
      </div>

      {/* Slider */}
      <div className="relative">
        <button
          aria-label="Previous projects"
          onClick={() => nudge(-1)}
          className="absolute -left-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full shadow-lg md:flex"
          style={{ background: "var(--color-accent)", color: "#111" }}
        >
          <FiChevronLeft size={22} />
        </button>
        <button
          aria-label="Next projects"
          onClick={() => nudge(1)}
          className="absolute -right-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full shadow-lg md:flex"
          style={{ background: "var(--color-accent)", color: "#111" }}
        >
          <FiChevronRight size={22} />
        </button>

        <div
          ref={trackRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4"
        >
          {shown.map((p) => {
            const img = tileImage(p);
            return (
              <motion.button
                key={p.name}
                type="button"
                onClick={() => setSelected(p)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="group relative aspect-[4/3] w-[280px] shrink-0 snap-start cursor-pointer overflow-hidden rounded-2xl text-left sm:w-[340px]"
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
                  </div>
                )}
                {/* Name bar */}
                <div
                  className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 px-4 py-2.5 text-[12px] font-bold uppercase tracking-wider"
                  style={{ background: "rgba(17,17,17,0.85)", color: "#fff" }}
                >
                  <span className="truncate">{p.name}</span>
                  <span style={{ color: "var(--color-accent)" }}>↗</span>
                </div>
                <div className="tile-overlay p-5 text-center">
                  <span className="text-[17px] font-extrabold uppercase tracking-wide">
                    {p.name}
                  </span>
                  <span className="text-[12px] font-bold uppercase tracking-widest">
                    View details
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

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
                  <div className="mt-6 flex justify-center">
                    <a
                      href={selected.sourceCodeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tunis-btn h-[44px]"
                    >
                      Visit site
                      <span className="tunis-btn-arrow">
                        <FiExternalLink size={15} />
                      </span>
                    </a>
                  </div>
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
