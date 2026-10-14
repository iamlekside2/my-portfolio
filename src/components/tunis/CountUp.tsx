import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/** Animates a number from 0 to target when it scrolls into view. */
const CountUp = ({ target, suffix }: { target: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

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
