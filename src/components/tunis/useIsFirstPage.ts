import { useRef, useEffect } from "react";

/**
 * True for the first page rendered in a visit — on the server, and in the
 * client render that hydrates it. False for every page after that.
 *
 * Entry animations that start from `opacity: 0` write that opacity into the
 * prerendered HTML. The markup is there, correct and complete, and the
 * visitor cannot see any of it until framer-motion has downloaded, parsed and
 * hydrated. Measured on the deployed home page before this existed:
 *
 *   TTFB                      880 ms
 *   first contentful paint   3408 ms
 *   largest contentful paint 3408 ms
 *
 * Two and a half seconds of blank screen on a page whose HTML had already
 * arrived complete — the prerender was paying for crawlers and giving nothing
 * back to people.
 *
 * The animations are worth keeping between routes, where the JavaScript is
 * already loaded and the transition costs nothing. They are not worth keeping
 * on arrival. Components use this to pass `initial={false}` the first time,
 * which renders the animation's end state directly.
 *
 * Module scope rather than context: it is one boolean, every caller on a given
 * page must agree, and the server starts a fresh module per render.
 */
let pending = true;

export const useIsFirstPage = (): boolean => {
  // Captured during render, so every component on the first page agrees —
  // effects do not run until all of them have rendered.
  const isFirst = useRef(pending);

  useEffect(() => {
    pending = false;
  }, []);

  return isFirst.current;
};
