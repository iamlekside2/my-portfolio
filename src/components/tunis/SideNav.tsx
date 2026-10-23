import { NavLink } from "react-router-dom";
import { FiHome, FiGrid, FiBriefcase, FiUser, FiMail } from "react-icons/fi";

const items = [
  { to: "/", label: "Home", icon: FiHome },
  { to: "/services", label: "Services", icon: FiGrid },
  { to: "/portfolio", label: "Work", icon: FiBriefcase },
  { to: "/about", label: "Studio", icon: FiUser },
  { to: "/contact", label: "Contact", icon: FiMail },
];

const SideNav = () => (
  <>
    {/* Desktop: right-edge dots */}
    <nav
      aria-label="Primary"
      className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-4 md:flex"
    >
      {items.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/"}
          title={label}
          className="group relative flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300"
          style={({ isActive }) => ({
            background: isActive ? "var(--color-accent)" : "var(--color-tertiary)",
            color: isActive ? "#111" : "var(--text-primary)",
          })}
        >
          {({ isActive }) => (
            <>
              <Icon size={18} aria-hidden />
              <span className="sr-only">
                {label}
                {isActive ? " (current page)" : ""}
              </span>
              <span
                aria-hidden
                className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-widest opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                style={{ background: "var(--color-accent)", color: "#111" }}
              >
                {label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>

    {/* Mobile: bottom bar */}
    <nav
      aria-label="Primary, mobile"
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-around border-t py-2.5 backdrop-blur-md md:hidden"
      style={{ background: "var(--nav-bg)", borderColor: "var(--glass-border)" }}
    >
      {items.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/"}
          className="flex h-11 w-11 flex-col items-center justify-center rounded-full"
          style={({ isActive }) => ({
            background: isActive ? "var(--color-accent)" : "transparent",
            color: isActive ? "#111" : "var(--text-primary)",
          })}
        >
          {({ isActive }) => (
            <>
              <Icon size={18} aria-hidden />
              <span className="sr-only">
                {label}
                {isActive ? " (current page)" : ""}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  </>
);

export default SideNav;
