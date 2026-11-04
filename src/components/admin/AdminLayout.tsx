import { LayoutDashboard, LogOut, Package, Store, Tags } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { STORE } from "../../config";
import { useAuth } from "../../context/AuthContext";

const LINKS = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/categories", label: "Categories", icon: Tags, end: false },
  { to: "/admin/products", label: "Products", icon: Package, end: false },
];

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
    isActive
      ? "bg-white/10 text-accent"
      : "text-green-100/80 hover:bg-white/10 hover:text-white"
  }`;

// Wraps every admin page: green sidebar on desktop, top menu on mobile.
export function AdminLayout() {
  const { user, logout } = useAuth();
  return (
    <div className="min-h-screen bg-card lg:pl-64">
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col bg-brand p-5 text-white lg:flex">
        <Link
          to="/admin"
          className="mb-8 flex items-center gap-2 text-xl font-extrabold"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-white text-base text-brand">
            R
          </span>
          {STORE.name}{" "}
          <span className="text-xs font-semibold text-accent">Admin</span>
        </Link>
        <nav className="flex flex-col gap-1" aria-label="Admin navigation">
          {LINKS.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={linkClass}>
              <Icon size={18} /> {label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-green-100/80 hover:bg-white/10 hover:text-white"
          >
            <Store size={18} /> View store
          </Link>
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-green-100/80 hover:bg-white/10 hover:text-white"
          >
            <LogOut size={18} /> Sign out
          </button>
          <p className="truncate px-3 pt-2 text-xs text-green-100/60">
            {user?.email}
          </p>
        </div>
      </aside>

      <nav
        className="flex items-center gap-1 overflow-x-auto bg-brand px-3 py-2 lg:hidden"
        aria-label="Admin navigation"
      >
        {LINKS.map(({ to, label, end }) => (
          <NavLink key={to} to={to} end={end} className={linkClass}>
            {label}
          </NavLink>
        ))}
        <Link to="/" className="ml-auto px-3 text-sm text-green-100/80">
          Store
        </Link>
        <button onClick={logout} className="px-3 text-sm text-green-100/80">
          Sign out
        </button>
      </nav>

      <main className=" p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}
