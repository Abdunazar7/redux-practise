import { NavLink } from "react-router-dom";

function Navbar() {
  const linkClass = ({ isActive }) =>
    `
    relative px-3 py-1 text-base font-semibold transition-all duration-300
    ${
      isActive
        ? "text-amber-300 after:w-full"
        : "text-white hover:text-amber-200 after:w-0 hover:after:w-full"
    }
    after:content-[''] after:absolute after:left-0 after:-bottom-1
    after:h-[2px] after:bg-amber-300 after:transition-all after:duration-300
    `;

  return (
    <nav className="h-16 flex items-center gap-20 px-10 bg-gradient-to-r from-amber-700 to-amber-600 shadow-lg">
      <h1 className="text-xl font-bold text-white tracking-wide">
        Flight Manager
      </h1>

      <div className="flex items-center gap-8">
        <NavLink to="/users" className={linkClass}>
          Users
        </NavLink>

        <NavLink to="/flights" className={linkClass}>
          Flights
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
