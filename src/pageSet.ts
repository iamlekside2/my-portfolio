import type { ComponentType } from "react";

/**
 * The seven page components, supplied to `App` rather than imported by it.
 *
 * The browser wants these split per route, so a visitor downloads the page
 * they asked for instead of all seven. The prerenderer wants the opposite:
 * `renderToString` is synchronous, so a `React.lazy` component that has not
 * resolved renders its Suspense fallback and the built HTML would contain a
 * placeholder where the page should be — which is exactly the prerender
 * regression this codebase has already paid for once.
 *
 * Rather than reconcile those with streaming or by poking at lazy internals,
 * each entry point supplies its own set: `pageSet.lazy` in the browser,
 * `pageSet.eager` when prerendering. `App` neither knows nor cares which it
 * was handed.
 */
export type PageSet = {
  Home: ComponentType;
  Services: ComponentType;
  Portfolio: ComponentType;
  CaseStudy: ComponentType;
  About: ComponentType;
  Contact: ComponentType;
  NotFound: ComponentType;
};
