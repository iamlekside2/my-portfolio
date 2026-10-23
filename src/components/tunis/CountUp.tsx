import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

// useLayoutEffect warns during server rendering; effects never run there anyway.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Animates a number from 0 to target when it scrolls into view.
 *
 * The initial state is the *target*, not 0, so the real figure is present in
 * the prerendered HTML for crawlers and readers without JavaScript. In the
 * browser we drop it back to 0 before the first paint, so the count-up still
 * plays and no one sees the jump.
 */
const CountUp = ({ target, suffix }: { target: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState(target);

  useIsomorphicLayoutEffect(() => {
    setValue(0);
  }, []);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 1300;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {value}
      {suffix && <span className="text-[26px]">{suffix}</span>}
    </span>
  );
};

export default CountUp;
