import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";

import { config } from "./constants/config";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeToggle from "./components/layout/ThemeToggle";
import SideNav from "./components/tunis/SideNav";
import FloatingMessage from "./components/tunis/FloatingMessage";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import PortfolioPage from "./pages/PortfolioPage";
import ContactPage from "./pages/ContactPage";

const AnimatedRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </AnimatePresence>
  );
};

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
        <div
          className="relative z-0 min-h-screen transition-colors duration-500"
          style={{ background: "var(--color-primary)", color: "var(--text-primary)" }}
        >
          <div className="fixed left-5 top-5 z-50">
            <ThemeToggle />
          </div>
          <SideNav />
          <FloatingMessage />
          <AnimatedRoutes />
          <footer className="pb-24 pt-4 text-center text-[12px] text-secondary md:pb-8">
            © {new Date().getFullYear()} {config.html.fullName}. All rights
            reserved.
          </footer>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
