/* Real Madrid-inspired crest SVG — closer to the actual badge */
const MadridCrest = ({
  size = 40,
  className = "",
  id = "crest",
}: {
  size?: number;
  className?: string;
  id?: string;
}) => (
  <svg
    width={size}
    height={size * 1.25}
    viewBox="0 0 80 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id={`${id}Gold`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="var(--gold, #d4af37)" />
        <stop offset="100%" stopColor="var(--gold-light, #f0d060)" />
      </linearGradient>
      <linearGradient id={`${id}Purple`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#5b2d8e" />
        <stop offset="100%" stopColor="#7b3fbd" />
      </linearGradient>
    </defs>

    {/* Shield body — rounded bottom, flat top */}
    <path
      d="M40 8 L72 18 L72 52 Q72 82 40 96 Q8 82 8 52 L8 18 Z"
      stroke={`url(#${id}Gold)`}
      strokeWidth="2.5"
      fill="none"
    />

    {/* Crown — 3 pointed crown on top */}
    <path
      d="M24 18 L28 8 L34 15 L40 3 L46 15 L52 8 L56 18 Z"
      fill={`url(#${id}Gold)`}
    />
    {/* Crown base band */}
    <rect x="24" y="18" width="32" height="4" rx="1" fill={`url(#${id}Gold)`} />

    {/* Horizontal band across shield (Madrid purple stripe) */}
    <path
      d="M12 44 L68 44 L68 52 Q67 55 65 56 L15 56 Q12 55 12 52 Z"
      fill={`url(#${id}Purple)`}
      opacity="0.6"
    />

    {/* Vertical stripe down the middle — Madrid's diagonal */}
    <line
      x1="40"
      y1="24"
      x2="40"
      y2="70"
      stroke={`url(#${id}Gold)`}
      strokeWidth="1.2"
      opacity="0.5"
    />

    {/* Cross at center — like the MCF cross */}
    <line x1="40" y1="28" x2="40" y2="42" stroke={`url(#${id}Gold)`} strokeWidth="2" />
    <line x1="33" y1="34" x2="47" y2="34" stroke={`url(#${id}Gold)`} strokeWidth="2" />

    {/* Lower decorative lines */}
    <line x1="20" y1="60" x2="60" y2="60" stroke={`url(#${id}Gold)`} strokeWidth="1" opacity="0.4" />
    <line x1="25" y1="70" x2="55" y2="70" stroke={`url(#${id}Gold)`} strokeWidth="1" opacity="0.3" />

    {/* Small circle at bottom — ball motif */}
    <circle cx="40" cy="78" r="4" stroke={`url(#${id}Gold)`} strokeWidth="1.2" fill="none" opacity="0.5" />
  </svg>
);

export default MadridCrest;
