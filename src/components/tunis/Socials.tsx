import { FaXTwitter, FaLinkedinIn, FaGithub, FaYoutube } from "react-icons/fa6";

const links = [
  { href: "https://github.com/iamlekside2", label: "GitHub", Icon: FaGithub },
  { href: "https://x.com/leksitech1", label: "X (Twitter)", Icon: FaXTwitter },
  {
    href: "https://www.linkedin.com/in/olamilekan-olakunle-07053a164/",
    label: "LinkedIn",
    Icon: FaLinkedinIn,
  },
  {
    href: "https://www.youtube.com/@ostechs",
    label: "YouTube — OS Techs",
    Icon: FaYoutube,
  },
];

const Socials = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    {links.map(({ href, label, Icon }) => (
      <a
        key={label}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        title={label}
        className="flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-1"
        style={{
          background: "var(--color-tertiary)",
          color: "var(--text-primary)",
          border: "1px solid var(--glass-border)",
        }}
      >
        <Icon size={17} />
      </a>
    ))}
  </div>
);

export default Socials;
