import { Suspense, lazy } from "react";
import { FiMail, FiGithub } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import PageShell from "../components/tunis/PageShell";
import { config } from "../constants/config";

// Lazy-loaded: pulls in three.js (EarthCanvas), which shouldn't weigh down
// the rest of the site
const Contact = lazy(() => import("../components/sections/Contact"));

const infoCards = [
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    value: "0706 873 6818",
    href: "https://wa.me/2347068736818" as string | undefined,
  },
  {
    icon: FiMail,
    label: "Email",
    value: config.html.email,
    href: `mailto:${config.html.email}`,
  },
  {
    icon: FiGithub,
    label: "GitHub",
    value: "github.com/iamlekside2",
    href: "https://github.com/iamlekside2",
  },
];

const ContactPage = () => (
  <PageShell ghost="Contact" first="Get In" second="Touch">
    <p className="mx-auto mb-10 max-w-2xl text-center text-[15px] leading-[1.9] text-secondary">
      Open to new projects, collaborations and full-time roles. Don't be shy —
      drop a message and I'll get back to you.
    </p>

    <div className="mb-14 grid gap-5 sm:grid-cols-3">
      {infoCards.map(({ icon: Icon, label, value, href }) => (
        <div key={label} className="info-chip flex items-center gap-4">
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
            style={{ background: "var(--color-accent)", color: "#111" }}
          >
            <Icon size={18} />
          </span>
          <div className="min-w-0">
            <div className="text-[11px] uppercase tracking-wider text-secondary">
              {label}
            </div>
            {href ? (
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="block truncate text-[14px] font-semibold hover:underline"
              >
                {value}
              </a>
            ) : (
              <div className="truncate text-[14px] font-semibold">{value}</div>
            )}
          </div>
        </div>
      ))}
    </div>

    {/* The battle-tested contact form (kept from the previous design) */}
    <Suspense
      fallback={
        <div className="py-16 text-center text-[13px] uppercase tracking-widest text-secondary">
          Loading form…
        </div>
      }
    >
      <Contact />
    </Suspense>
  </PageShell>
);

export default ContactPage;
