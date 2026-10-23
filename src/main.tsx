import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { lazyPages } from "./pageSet.lazy";
import "./globals.css";

const container = document.getElementById("root")!;

const tree = (
  <React.StrictMode>
    <BrowserRouter>
      <App pages={lazyPages} />
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
