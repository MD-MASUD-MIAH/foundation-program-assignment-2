import { Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router";
import logo from "../../public/logo1.png";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Movies", path: "/movies" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-950/90 via-slate-950/95 to-red-950/90 backdrop-blur-md border-b border-red-500/20 shadow-xl shadow-red-950/40">
      <div className="w-11/12 lg:max-w-7xl mx-auto">
        <div className="h-18 lg:h-22 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 select-none">
            <div className="w-16 h-16 lg:w-20 lg:h-20 ">
              <img src={logo} alt="" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `px-5 py-2 rounded-sm text-sm font-medium transition-all ${
                    isActive
                      ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Desktop Button */}
          <div className="hidden md:block">
            <Link
              to="/movies"
              className="flex items-center gap-2 px-5 py-2.5 rounded-sm bg-red-600 hover:bg-red-500 active:scale-95 text-white text-sm font-semibold transition-all shadow-md shadow-red-600/20"
            >
              <Sparkles className="w-4 h-4" />
              Explore Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-sm text-slate-300 hover:bg-white/10 hover:text-white transition"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="bg-gradient-to-b from-slate-900 to-red-950/80 border border-red-500/20 rounded-xl p-3 space-y-2 shadow-xl shadow-red-950/50 backdrop-blur-lg">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `w-full block px-4 py-3 rounded-sm text-sm font-medium transition ${
                      isActive
                        ? "bg-red-600 text-white"
                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}

              <Link
                to="/movies"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-sm bg-red-600 hover:bg-red-500 text-white text-sm font-semibold transition shadow-md shadow-red-600/30"
              >
                <Sparkles className="w-4 h-4" />
                Explore Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
