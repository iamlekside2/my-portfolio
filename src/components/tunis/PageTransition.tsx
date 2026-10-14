import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useNavDirection } from "./direction";

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
  return (
    <motion.main
      custom={dir}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      className="min-h-screen"
    >
      {children}
    </motion.main>
  );
};

export default PageTransition;
