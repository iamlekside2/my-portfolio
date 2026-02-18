/* Simplified Real Madrid-inspired crest SVG — used as decorative motif */
const MadridCrest = ({ size = 40, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size * 1.15}
    viewBox="0 0 80 92"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="crestGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="var(--gold, #d4af37)" />
        <stop offset="100%" stopColor="var(--gold-light, #f0d060)" />
      </linearGradient>
    </defs>
    {/* Shield outline */}
    <path
      d="M40 2 L76 18 L76 52 Q76 78 40 90 Q4 78 4 52 L4 18 Z"
      stroke="url(#crestGold)"
      strokeWidth="2.5"
      fill="none"
    />
    {/* Crown at top */}
    <path
      d="M28 16 L32 10 L36 16 L40 6 L44 16 L48 10 L52 16 L52 22 L28 22 Z"
      fill="url(#crestGold)"
    />
    {/* Horizontal stripe — Madrid signature */}
    <line x1="12" y1="38" x2="68" y2="38" stroke="url(#crestGold)" strokeWidth="1.5" />
    <line x1="12" y1="54" x2="68" y2="54" stroke="url(#crestGold)" strokeWidth="1.5" />
    {/* Central letter M */}
    <text
      x="40"
      y="49"
      textAnchor="middle"
      dominantBaseline="middle"
      fontFamily="'Space Grotesk', serif"
      fontWeight="800"
      fontSize="20"
      fill="url(#crestGold)"
    >
      M
    </text>
    {/* Star above crown — Champions League star */}
    <polygon
      points="40,0 41.5,3.5 45,3.5 42.2,5.5 43.2,9 40,7 36.8,9 37.8,5.5 35,3.5 38.5,3.5"
      fill="url(#crestGold)"
      transform="translate(0,-1) scale(0.7) translate(17,0)"
    />
  </svg>
);

export default MadridCrest;
