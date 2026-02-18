import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { styles } from "../../constants/styles";
import { navLinks } from "../../constants";
import { config } from "../../constants/config";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";

const Navbar = () => {
  const [active, setActive] = useState<string | null>();
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
        setActive("");
      }
    };

    window.addEventListener("scroll", handleScroll);

    const navbarHighlighter = () => {
      const sections = document.querySelectorAll("section[id]");

      sections.forEach((current) => {
        const sectionId = current.getAttribute("id");
        const sectionHeight = (current as HTMLElement).offsetHeight;
        const sectionTop =
          current.getBoundingClientRect().top - sectionHeight * 0.2;

        if (sectionTop < 0 && sectionTop + sectionHeight > 0) {
          setActive(sectionId);
        }
      });
    };

    window.addEventListener("scroll", navbarHighlighter);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", navbarHighlighter);
    };
  }, []);

  return (
    <nav
      className={`${styles.paddingX} fixed top-0 z-20 flex w-full items-center py-4 transition-all duration-500 ${
        scrolled ? "glass shadow-glass" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Logo size={36} />
          </motion.div>
          <p className="flex cursor-pointer text-[18px] font-bold text-[var(--text-primary)]">
            {config.html.fullName}
          </p>
        </Link>

        <div className="hidden items-center gap-8 sm:flex">
          <ul className="flex list-none flex-row gap-8">
            {navLinks.map((nav) => (
              <li key={nav.id} className="relative">
                <a
                  href={`#${nav.id}`}
                  className={`cursor-pointer text-[16px] font-medium transition-colors duration-300 ${
                    active === nav.id
                      ? "text-[var(--text-primary)]"
                      : "text-secondary hover:text-[var(--text-primary)]"
                  }`}
                >
                  {nav.title}
                </a>
                {active === nav.id && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
                    style={{ background: "var(--color-accent)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-3 sm:hidden">
          <ThemeToggle />
          <button
            onClick={() => setToggle(!toggle)}
            className="glass flex h-10 w-10 items-center justify-center rounded-full"
          >
            <motion.div
              animate={{ rotate: toggle ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {toggle ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="15" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </motion.div>
          </button>

          <AnimatePresence>
            {toggle && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                transition={{ duration: 0.2 }}
                className="glass absolute right-4 top-16 z-10 min-w-[180px] rounded-2xl p-6"
              >
                <ul className="flex flex-1 list-none flex-col items-start justify-end gap-4">
                  {navLinks.map((nav) => (
                    <li
                      key={nav.id}
                      className={`cursor-pointer text-[16px] font-medium ${
                        active === nav.id
                          ? "text-[var(--text-primary)]"
                          : "text-secondary"
                      }`}
                      onClick={() => {
                        setToggle(!toggle);
                      }}
                    >
                      <a href={`#${nav.id}`}>{nav.title}</a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {scrolled && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className="neon-line absolute bottom-0 left-0 right-0"
        />
      )}
    </nav>
  );
};

export default Navbar;
