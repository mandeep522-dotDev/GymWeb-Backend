import { NavLink } from "react-router-dom";

export default function Sidebar({ admin }) {
  const linkClass =
    "block px-4 py-2 rounded hover:bg-gray-700 hover:text-white transition";

    const gymAdmin = admin.toUpperCase() || "Gym Admin";
  return (
    <aside className="w-64 bg-gray-400 min-h-screen p-4">
      <h1 className="text-xl font-bold mb-8 text-center font-serif">
        🏋️ {gymAdmin}(admin)
      </h1>

      <nav className="space-y-2 font-bold">
        <NavLink to="/admin" className={linkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/admin/classes" className={linkClass}>
          Classes
        </NavLink>
        <NavLink to="/admin/manageplans" className={linkClass}>Plans</NavLink>

        <NavLink to="/admin/subscribers" className={linkClass}>
          Subscriber
        </NavLink>
      </nav>
    </aside>
  );
}
