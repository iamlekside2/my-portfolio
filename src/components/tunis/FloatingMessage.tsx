import { useState } from "react";
import { Link } from "react-router-dom";
import { m, AnimatePresence } from "framer-motion";
import { FiMessageCircle, FiX, FiMail, FiArrowRight } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { config } from "../../constants/config";
import { founder } from "../../constants/profile";

/**
 * Quick-contact launcher.
 *
 * This used to be a second copy of the EmailJS form — a duplicate delivery
 * path that could fail silently in exactly the same way as the contact page.
 * It now routes to channels that cannot silently fail (WhatsApp, mail client)
 * or to the real form, which reports its own outcome honestly.
 */
const FloatingMessage = () => {
  const [open, setOpen] = useState(false);

  const options = [
    {
      icon: FaWhatsapp,
      label: "WhatsApp",
      detail: founder.whatsapp,
      href: founder.whatsappUrl,
      external: true,
    },
    {
      icon: FiMail,
      label: "Email",
      detail: config.html.email,
      href: `mailto:${config.html.email}`,
      external: false,
    },
  ];

  return (
    <div className="fixed bottom-20 right-4 z-50 flex flex-col items-end gap-3 md:bottom-8 md:right-24">
      <AnimatePresence>
        {open && (
          <m.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="w-[270px] rounded-2xl p-4"
            style={{
              background: "var(--color-surface-elevated)",
              border: "1px solid var(--glass-border)",
              backdropFilter: "blur(16px)",
            }}
          >
            <p className="mb-3 text-[13px] font-bold uppercase tracking-wider">
              Talk to the studio
            </p>
            <div className="flex flex-col gap-2">
              {options.map(({ icon: Icon, label, detail, href, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 rounded-xl p-2.5 transition-colors"
                  style={{ background: "var(--color-tertiary)" }}
                >
                  <span
                    aria-hidden
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                    style={{ background: "var(--color-accent)", color: "#111" }}
                  >
                    <Icon size={16} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[13px] font-semibold">{label}</span>
                    <span className="block truncate text-[11.5px] text-secondary">
                      {detail}
                    </span>
                  </span>
                </a>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-1 flex items-center justify-between rounded-xl p-2.5 text-[13px] font-bold"
                style={{ border: "1px dashed var(--glass-border)", color: "var(--color-accent)" }}
              >
                Send a project brief
                <FiArrowRight aria-hidden />
              </Link>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close contact options" : "Open contact options"}
        className="flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105"
        style={{ background: "var(--color-accent)", color: "#111" }}
      >
        {open ? <FiX size={22} aria-hidden /> : <FiMessageCircle size={22} aria-hidden />}
      </button>
    </div>
  );
};

export default FloatingMessage;
