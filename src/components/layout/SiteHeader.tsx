import { Link } from "react-router-dom";
import { LeksIdeWordmark } from "../brand/LeksIdeLogo";
import ThemeToggle from "./ThemeToggle";

/**
 * Fixed top bar: brand on the left, theme control on the right. The route
 * navigation itself lives in SideNav (dots on desktop, a bottom bar on mobile),
 * so this stays deliberately thin.
 */
const SiteHeader = () => (
  <header
    className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-3 backdrop-blur-md md:px-8"
    style={{
      background: "var(--nav-bg)",
      borderBottom: "1px solid var(--glass-border)",
    }}
  >
    <Link to="/" aria-label="LeksIDE — home" className="shrink-0">
      <LeksIdeWordmark descriptor size={30} />
    </Link>
    <ThemeToggle />
  </header>
);

export default SiteHeader;
