import { ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import PageTransition from "./PageTransition";

/** Tunis-style page: huge ghost word behind a two-tone heading. */
const PageShell = ({
  ghost,
  first,
  second,
  children,
}: {
  ghost: string;
  first: string;
  second: string;
  children: ReactNode;
}) => {
  const { scrollY } = useScroll();
  // Ghost word drifts down and fades slightly as the page scrolls
  const ghostY = useTransform(scrollY, [0, 500], [0, 90]);
  const ghostOpacity = useTransform(scrollY, [0, 400], [1, 0.3]);

  return (
    <PageTransition>
      <div className="mx-auto max-w-6xl px-6 pb-28 pt-16 md:pl-10 md:pr-28 md:pt-20 2xl:pr-10">
        <div className="relative mb-14 flex h-[120px] items-center justify-center md:h-[150px]">
          <motion.span
            style={{ y: ghostY, opacity: ghostOpacity }}
            className="ghost-title"
          >
            {ghost}
          </motion.span>
          <h1 className="relative z-10 text-center text-[34px] font-extrabold uppercase tracking-wide md:text-[52px]">
            {first}{" "}
            <span style={{ color: "var(--color-accent)" }}>{second}</span>
          </h1>
        </div>
        {children}
      </div>
    </PageTransition>
  );
};

export default PageShell;
