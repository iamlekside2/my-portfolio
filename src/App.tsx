import { useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { NavDirectionContext } from "./components/tunis/direction";

import { SITE_URL, BRAND, metaForPath } from "./constants/seo";
import { ThemeProvider } from "./context/ThemeContext";
import SiteHeader from "./components/layout/SiteHeader";
import SideNav from "./components/tunis/SideNav";
import FloatingMessage from "./components/tunis/FloatingMessage";
import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import AboutPage from "./pages/AboutPage";
import PortfolioPage from "./pages/PortfolioPage";
import CaseStudyPage from "./pages/CaseStudyPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";

/** Drives the direction of the page-slide transition. */
const ROUTE_ORDER = ["/", "/services", "/portfolio", "/about", "/contact"];

/** Keeps head tags in step with client-side navigation. The prerendered HTML
 *  already carries the correct tags for the first load. */
const setTag = (selector: string, attr: string, value: string) => {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
};

const useRouteMeta = (pathname: string) => {
  useEffect(() => {
    const meta = metaForPath(pathname);
    const url = `${SITE_URL}${pathname}`;
    document.title = meta.title;
    setTag('meta[name="description"]', "content", meta.description);
    setTag('meta[property="og:title"]', "content", meta.title);
    setTag('meta[property="og:description"]', "content", meta.description);
    setTag('meta[property="og:url"]', "content", url);
    setTag('link[rel="canonical"]', "href", url);
  }, [pathname]);
};

const AnimatedRoutes = () => {
  const location = useLocation();
  const prevIndex = useRef(0);
  const index = Math.max(0, ROUTE_ORDER.indexOf(location.pathname));
  const direction = index >= prevIndex.current ? 1 : -1;

  useRouteMeta(location.pathname);

  useEffect(() => {
    prevIndex.current = index;
    window.scrollTo(0, 0);
  }, [index, location.pathname]);

  return (
    <NavDirectionContext.Provider value={direction}>
      <AnimatePresence mode="wait" custom={direction}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/portfolio/:slug" element={<CaseStudyPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
    </NavDirectionContext.Provider>
  );
};

/**
 * Everything below the router. The router itself comes from the entry point:
 * BrowserRouter in the browser (`main.tsx`), StaticRouter when the pages are
 * prerendered (`entry-server.tsx`).
 */
const App = () => (
  <ThemeProvider>
    <MotionConfig reducedMotion="user">
      <div
        className="relative z-0 min-h-screen transition-colors duration-500"
        style={{ background: "var(--color-primary)", color: "var(--text-primary)" }}
      >
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <SideNav />
        <FloatingMessage />
        <div id="main">
          <AnimatedRoutes />
        </div>
        <footer
          className="border-t pb-24 pt-8 text-center text-[12px] text-secondary md:pb-8"
          style={{ borderColor: "var(--glass-border)" }}
        >
          © {new Date().getFullYear()} {BRAND} — Technology Studio. All rights
          reserved.
        </footer>
      </div>
    </MotionConfig>
  </ThemeProvider>
);

export default App;
