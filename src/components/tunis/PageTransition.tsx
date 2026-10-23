import { m } from "framer-motion";
import { ReactNode } from "react";
import { useNavDirection } from "./direction";
import { useIsFirstPage } from "./useIsFirstPage";

const variants = {
  enter: (dir: number) => ({ x: dir * 160, opacity: 0 }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (dir: number) => ({
    x: dir * -160,
    opacity: 0,
    transition: { duration: 0.28, ease: [0.76, 0, 0.24, 1] },
  }),
};

/** Directional page slide: forward navigation slides in from the right,
 *  backward navigation from the left. */
const PageTransition = ({ children }: { children: ReactNode }) => {
  const dir = useNavDirection();
  const isFirstPage = useIsFirstPage();
  return (
    <m.main
      custom={dir}
      variants={variants}
      // `false` renders the `center` state directly, so the prerendered HTML
      // is visible the moment it lands instead of waiting on hydration.
      initial={isFirstPage ? false : "enter"}
      animate="center"
      exit="exit"
      className="min-h-screen"
    >
      {children}
    </m.main>
  );
};

export default PageTransition;
