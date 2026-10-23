import type { PageSet } from "./pageSet";

import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import PortfolioPage from "./pages/PortfolioPage";
import CaseStudyPage from "./pages/CaseStudyPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";

/**
 * Prerender page set: plain static imports, so `renderToString` emits the
 * real page rather than a Suspense fallback. Only ever reached from
 * `entry-server.tsx`, so none of it lands in the browser bundle.
 */
export const eagerPages: PageSet = {
  Home,
  Services: ServicesPage,
  Portfolio: PortfolioPage,
  CaseStudy: CaseStudyPage,
  About: AboutPage,
  Contact: ContactPage,
  NotFound: NotFoundPage,
};
