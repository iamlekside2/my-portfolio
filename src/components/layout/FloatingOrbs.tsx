import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

const FloatingOrbs = () => {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Gold orb — top left */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -80, 60, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full"
        style={{
          background: "#d4af37",
          filter: "blur(100px)",
          opacity: isLight ? 0.1 : 0.06,
        }}
      />
      {/* Blue orb — right */}
      <motion.div
        animate={{
          x: [0, -120, 80, 0],
          y: [0, 100, -60, 0],
          scale: [1, 0.8, 1.3, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-32 top-1/3 h-[400px] w-[400px] rounded-full"
        style={{
          background: "#1a56db",
          filter: "blur(100px)",
          opacity: isLight ? 0.08 : 0.05,
        }}
      />
      {/* Gold orb — bottom center */}
      <motion.div
        animate={{
          x: [0, 60, -80, 0],
          y: [0, -50, 100, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-1/3 h-[350px] w-[350px] rounded-full"
        style={{
          background: "#d4af37",
          filter: "blur(120px)",
          opacity: isLight ? 0.08 : 0.05,
        }}
      />
    </div>
  );
};

export default FloatingOrbs;
