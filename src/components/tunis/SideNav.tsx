import { NavLink } from "react-router-dom";
import { FiHome, FiUser, FiBriefcase, FiMail } from "react-icons/fi";

const items = [
  { to: "/", label: "Home", icon: FiHome },
  { to: "/about", label: "About", icon: FiUser },
  { to: "/portfolio", label: "Portfolio", icon: FiBriefcase },
  { to: "/contact", label: "Contact", icon: FiMail },
];

const SideNav = () => (
  <>
    {/* Desktop: right-edge dots */}
    <nav className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-5 md:flex">
      {items.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          title={label}
          className="group relative flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300"
          style={({ isActive }) => ({
            background: isActive ? "var(--color-accent)" : "var(--color-tertiary)",
            color: isActive ? "#111" : "var(--text-primary)",
          })}
        >
          <Icon size={18} />
          <span
            className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-widest opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            style={{ background: "var(--color-accent)", color: "#111" }}
          >
            {label}
          </span>
        </NavLink>
      ))}
    </nav>

    {/* Mobile: bottom bar */}
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-around border-t py-3 backdrop-blur-md md:hidden"
      style={{ background: "var(--nav-bg)", borderColor: "var(--glass-border)" }}
    >
      {items.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          aria-label={label}
          className="flex h-11 w-11 items-center justify-center rounded-full"
          style={({ isActive }) => ({
            background: isActive ? "var(--color-accent)" : "transparent",
            color: isActive ? "#111" : "var(--text-primary)",
          })}
        >
          <Icon size={19} />
        </NavLink>
      ))}
    </nav>
  </>
);

export default SideNav;
