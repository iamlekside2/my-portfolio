import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

import App from "./App";
import { lazyPages } from "./pageSet.lazy";
import "./globals.css";

const container = document.getElementById("root")!;

/*
  Analytics is mounted here rather than inside `App` because `App` is shared
  with `entry-server.tsx`, and the prerender has no business reporting a
  pageview for a route nobody visited. The component renders nothing, so the
  markup it hydrates against is unchanged; it only attaches the reporter and
  follows client-side navigation from there.
*/
const tree = (
  <React.StrictMode>
    <BrowserRouter>
      <App pages={lazyPages} />
      <Analytics />
    </BrowserRouter>
  </React.StrictMode>
);

// Production serves prerendered markup, so hydrate it. `vite dev` serves an
// empty root, so fall back to a plain client render there.
if (container.hasChildNodes()) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
