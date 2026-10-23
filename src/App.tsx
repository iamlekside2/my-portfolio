import { useEffect, useRef, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { NavDirectionContext } from "./components/tunis/direction";

import { SITE_URL, BRAND, metaForPath } from "./constants/seo";
import { ThemeProvider } from "./context/ThemeContext";
import SiteHeader from "./components/layout/SiteHeader";
import SideNav from "./components/tunis/SideNav";
import FloatingMessage from "./components/tunis/FloatingMessage";
import type { PageSet } from "./pageSet";

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

const AnimatedRoutes = ({ pages }: { pages: PageSet }) => {
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
        {/* The fallback holds the viewport height so a route chunk still
            in flight cannot collapse the page and shift what is below it.
            On first load nothing suspends: the markup is prerendered and
            hydration keeps it on screen. */}
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<pages.Home />} />
            <Route path="/services" element={<pages.Services />} />
            <Route path="/portfolio" element={<pages.Portfolio />} />
            <Route path="/portfolio/:slug" element={<pages.CaseStudy />} />
            <Route path="/about" element={<pages.About />} />
            <Route path="/contact" element={<pages.Contact />} />
            <Route path="*" element={<pages.NotFound />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </NavDirectionContext.Provider>
  );
};

/**
 * Everything below the router. The router itself comes from the entry point:
 * BrowserRouter in the browser (`main.tsx`), StaticRouter when the pages are
 * prerendered (`entry-server.tsx`).
 */
const App = ({ pages }: { pages: PageSet }) => (
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
          <AnimatedRoutes pages={pages} />
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
