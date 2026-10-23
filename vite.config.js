import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        /**
         * Keeps the third-party code in its own chunks.
         *
         * This saves nobody a single byte on a first visit — the same code is
         * downloaded either way. What it buys is cache survival: React and
         * framer-motion do not change when the case-study copy does, so a
         * returning visitor after a content deploy re-fetches the app chunk
         * and keeps roughly 85KB gzipped of vendor code already in cache.
         * Bundled together with application code, every deploy invalidates
         * the lot.
         *
         * Measured gzip at the time of writing: react+react-dom 49.5KB,
         * framer-motion 35.4KB. Those two are 63% of the bundle and the
         * reason route splitting alone could not do much.
         */
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;
          if (id.includes("framer-motion") || id.includes("popmotion"))
            return "vendor-motion";
          if (id.includes("react-router")) return "vendor-router";
          if (id.includes("react-icons")) return "vendor-icons";
          return "vendor";
        },
      },
    },
  },
});
