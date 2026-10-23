import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";

import App from "./App";
import "./globals.css";

/** Renders one route to an HTML string for `scripts/prerender.mjs`. */
export const render = (url: string): string =>
  renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </React.StrictMode>
  );

export { ROUTE_META, SITE_URL } from "./constants/seo";
