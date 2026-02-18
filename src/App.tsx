import { BrowserRouter } from "react-router-dom";

import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
} from "./components";
import { useEffect } from "react";
import { config } from "./constants/config";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/ThemeContext";
import FloatingOrbs from "./components/layout/FloatingOrbs";
import HeroBackground from "./components/layout/HeroBackground";
import MadridCrest from "./components/layout/MadridCrest";
import EagleMark from "./components/layout/EagleMark";

const App = () => {
  useEffect(() => {
    if (document.title !== config.html.title) {
      document.title = config.html.title;
    }
  }, []);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <FloatingOrbs />

        <div className="bg-primary relative z-0 transition-colors duration-500">
          <div className="relative">
            <HeroBackground />
            <Navbar />
            <Hero />
          </div>
          <div className="section-divider mx-auto max-w-7xl" />
          <About />
          <div className="section-divider mx-auto max-w-7xl" />
          <Experience />
          <div className="section-divider mx-auto max-w-7xl" />
          <Tech />
          <div className="section-divider mx-auto max-w-7xl" />
          <Works />
          <div className="section-divider mx-auto max-w-7xl" />
          <Feedbacks />
          <div className="section-divider mx-auto max-w-7xl" />
          <div className="relative z-0">
            <Contact />
            <StarsCanvas />
          </div>

          <footer className="glass relative z-10 py-8 text-center">
            <div className="flex items-center justify-center gap-4 mb-3">
              <MadridCrest size={20} className="opacity-40 hover:opacity-80 transition-opacity duration-300" />
              <EagleMark size={22} className="opacity-40 hover:opacity-80 transition-opacity duration-300" />
              <span
                className="font-mono text-[16px] font-black opacity-40 hover:opacity-80 transition-opacity duration-300"
                style={{ color: "var(--color-accent)" }}
              >
                CR7
              </span>
            </div>
            <p className="text-secondary text-[14px]">
              Built with passion by{" "}
              <span className="accent-text-gradient font-semibold">
                {config.html.fullName}
              </span>
            </p>
            <div className="neon-line mx-auto mt-4 max-w-xs" />
          </footer>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
