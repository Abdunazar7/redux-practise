import { NavLink } from "react-router-dom";

function Navbar() {
  const linkClass = ({ isActive }) =>
    `text-lg font-medium transition ${
      isActive ? "text-amber-300" : "text-white hover:text-amber-200"
    }`;

  return (
    <nav className="flex items-center gap-8 h-16 bg-amber-700 px-10">
      <NavLink to="/users" className={linkClass}>
        Users
      </NavLink>

      <NavLink to="/flights" className={linkClass}>
        Flights
      </NavLink>
    </nav>
  );
}

export default Navbar;
