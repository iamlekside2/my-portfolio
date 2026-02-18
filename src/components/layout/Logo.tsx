const Logo = ({ size = 36 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "var(--gold, #d4af37)" }} />
          <stop offset="100%" style={{ stopColor: "var(--gold-light, #f0d060)" }} />
        </linearGradient>
      </defs>
      {/* Shield/crest shape — inspired by royal crests */}
      <path
        d="M50 5 L88 25 L88 60 Q88 80 50 95 Q12 80 12 60 L12 25 Z"
        stroke="url(#logoGrad)"
        strokeWidth="3"
        fill="none"
      />
      {/* Crown star at top */}
      <path
        d="M50 14 L53 20 L59 20 L54 24 L56 30 L50 26 L44 30 L46 24 L41 20 L47 20 Z"
        fill="url(#logoGrad)"
      />
      {/* Code brackets */}
      <text
        x="50"
        y="62"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="'Space Grotesk', sans-serif"
        fontWeight="700"
        fontSize="32"
        fill="url(#logoGrad)"
      >
        {"<O/>"}
      </text>
    </svg>
  );
};

export default Logo;
