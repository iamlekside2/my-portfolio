/**
 * LeksIDE logo system.
 *
 * The mark is a vector trace of the supplied brand artwork: a gold angular "L"
 * whose foot kicks out into an arrowhead, paired with a heavy chevron. Traced
 * from the master PNG (`public/brand/leks-ide-logo-master.png`) rather than
 * redrawn by eye, so the proportions match the original.
 *
 * The gold sampled from that artwork (#feb903) is the site's existing accent,
 * so the logo and the pre-existing palette already agree — no retheming needed.
 *
 * The chevron is the one colour that must flip between themes: off-white on
 * dark, near-black on light. It reads from `--brand-chevron`.
 */
import { MARK_VIEWBOX, MARK_WIDTH, MARK_HEIGHT, GOLD_PATH, CHEVRON_PATH } from "./markPaths";


type MarkProps = {
  size?: number;
  className?: string;
  /** Decorative when adjacent text already names the brand. */
  decorative?: boolean;
};

export const LeksIdeMark = ({ size = 40, className = "", decorative }: MarkProps) => (
  <svg
    viewBox={MARK_VIEWBOX}
    width={(size * MARK_WIDTH) / MARK_HEIGHT}
    height={size}
    className={className}
    role={decorative ? undefined : "img"}
    aria-label={decorative ? undefined : "LeksIDE"}
    aria-hidden={decorative || undefined}
    focusable="false"
  >
    <path d={GOLD_PATH} fill="var(--color-accent)" />
    <path d={CHEVRON_PATH} fill="var(--brand-chevron)" />
  </svg>
);

type WordmarkProps = {
  /** Show the "Technology Studio" descriptor beneath the name. */
  descriptor?: boolean;
  size?: number;
  className?: string;
};

export const LeksIdeWordmark = ({
  descriptor = false,
  size = 34,
  className = "",
}: WordmarkProps) => (
  <span className={`inline-flex items-center gap-2.5 ${className}`}>
    <LeksIdeMark size={size} decorative />
    <span className="flex flex-col leading-none">
      <span
        className="font-extrabold tracking-tight"
        style={{
          fontSize: size * 0.78,
          fontFamily: "'Poppins', 'Space Grotesk', sans-serif",
        }}
      >
        Leks<span style={{ color: "var(--color-accent)" }}>IDE</span>
      </span>
      {descriptor && (
        <span
          className="mt-[5px] font-semibold uppercase text-secondary"
          style={{ fontSize: Math.max(8.5, size * 0.235), letterSpacing: "0.24em" }}
        >
          Technology Studio
        </span>
      )}
    </span>
  </span>
);

export default LeksIdeWordmark;
