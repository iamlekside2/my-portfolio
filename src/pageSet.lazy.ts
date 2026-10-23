import { lazy } from "react";
import type { PageSet } from "./pageSet";

/**
 * Browser page set: one chunk per route, fetched on demand.
 *
 * Safe for the first paint because the client hydrates prerendered markup
 * (see `main.tsx`). React keeps the server HTML on screen while a suspended
 * boundary waits, so a route chunk still in flight delays interactivity
 * rather than delaying paint.
 */
export const lazyPages: PageSet = {
  Home: lazy(() => import("./pages/Home")),
  Services: lazy(() => import("./pages/ServicesPage")),
  Portfolio: lazy(() => import("./pages/PortfolioPage")),
  CaseStudy: lazy(() => import("./pages/CaseStudyPage")),
  About: lazy(() => import("./pages/AboutPage")),
  Contact: lazy(() => import("./pages/ContactPage")),
  NotFound: lazy(() => import("./pages/NotFoundPage")),
};
