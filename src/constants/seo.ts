/**
 * Per-route metadata. Used in two places:
 *  - `scripts/prerender.mjs` bakes it into each route's static HTML at build
 *  - `useRouteMeta` in App.tsx keeps it correct during client-side navigation
 *
 * Case-study routes are derived from the project list rather than listed by
 * hand, so adding a project adds its page, its metadata and its sitemap entry.
 */
import { caseStudies } from './projects';

export const SITE_URL = 'https://lekside.vercel.app';
export const BRAND = 'LeksIDE';
export const BRAND_TAGLINE = 'Technology Studio';
export const BRAND_PROMISE =
  'We build digital solutions that move businesses forward.';

export type TRouteMeta = {
  path: string;
  title: string;
  description: string;
};

export const STATIC_ROUTES: TRouteMeta[] = [
  {
    path: '/',
    title: 'LeksIDE — Technology Studio | Web Apps, Websites & Custom Software',
    description:
      'LeksIDE is a founder-led technology studio building web applications, dashboards, business websites and custom software for startups and growing businesses.',
  },
  {
    path: '/services',
    title: 'Services — Web Apps, Websites, Mobile & Automation | LeksIDE',
    description:
      'Business websites and WordPress, web applications and dashboards, mobile apps, custom software, API integration and workflow automation — delivered end to end.',
  },
  {
    path: '/portfolio',
    title: 'Selected Work — Dashboards, Platforms & Websites | LeksIDE',
    description:
      'Selected LeksIDE projects: HR and KPI platforms, a patient referral tracker, admin dashboards, a family-tree product, and websites for clients in Nigeria and the US.',
  },
  {
    path: '/about',
    title: 'About the Studio & Founder — Olamilekan Olakunle | LeksIDE',
    description:
      'LeksIDE is led by Olamilekan Olakunle. Capabilities across React, TypeScript, Node.js, WordPress and React Native, and the delivery record behind them.',
  },
  {
    path: '/contact',
    title: 'Start a Project — Contact LeksIDE',
    description:
      'Tell us what you are building. Project enquiries for web applications, dashboards, business websites, mobile apps and custom software.',
  },
];

/** `/portfolio/<slug>` for every project with enough verified detail. */
export const caseStudyRoutes = (): TRouteMeta[] =>
  caseStudies.map((p) => ({
    path: `/portfolio/${p.slug}`,
    title: `${p.name} — Case Study | LeksIDE`,
    description: p.description.slice(0, 180),
  }));

/** Everything the prerenderer and the sitemap should cover. */
export const ROUTE_META: TRouteMeta[] = [...STATIC_ROUTES, ...caseStudyRoutes()];

export const metaForPath = (path: string): TRouteMeta => {
  const exact = ROUTE_META.find((m) => m.path === path);
  if (exact) return exact;
  return {
    path,
    title: `Page not found — ${BRAND}`,
    description: 'That page does not exist. Browse the studio’s work and services instead.',
  };
};
