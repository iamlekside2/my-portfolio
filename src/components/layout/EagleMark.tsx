/* Wizkid / Starboy eagle silhouette — used as decorative motif */
const EagleMark = ({
  size = 40,
  className = "",
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={size * 0.85}
    viewBox="0 0 100 85"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="eagleGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="var(--gold, #d4af37)" />
        <stop offset="100%" stopColor="var(--gold-light, #f0d060)" />
      </linearGradient>
    </defs>
    {/* Eagle wings spread — stylized V-shape with feather detail */}
    <path
      d="M50 28 L15 5 L8 2 L12 12 L5 18 L10 22 L3 30 L14 28 L22 38 L30 34 L38 42 L50 38 L62 42 L70 34 L78 38 L86 28 L97 30 L90 22 L95 18 L88 12 L92 2 L85 5 L50 28Z"
      stroke="url(#eagleGold)"
      strokeWidth="1.5"
      fill="none"
      strokeLinejoin="round"
    />
    {/* Eagle head */}
    <circle cx="50" cy="38" r="6" stroke="url(#eagleGold)" strokeWidth="1.5" fill="none" />
    {/* Beak */}
    <path
      d="M50 44 L47 50 L50 53 L53 50 Z"
      fill="url(#eagleGold)"
    />
    {/* Tail feathers */}
    <path
      d="M38 52 L30 70 L38 65 L44 78 L50 68 L56 78 L62 65 L70 70 L62 52"
      stroke="url(#eagleGold)"
      strokeWidth="1.5"
      fill="none"
      strokeLinejoin="round"
    />
    {/* Star on chest — Starboy */}
    <polygon
      points="50,55 51.5,58 55,58.5 52.5,60.5 53,64 50,62.5 47,64 47.5,60.5 45,58.5 48.5,58"
      fill="url(#eagleGold)"
    />
  </svg>
);

export default EagleMark;
