import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, CircleUserRound } from "lucide-react";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);

    // Close when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav>
      <div
        className={`flex justify-center fixed z-50 w-full py-8 transition-all duration-300 ${
          scrolled ? "backdrop-blur-md bg-white/30 shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between w-[1120px] px-4 sm:px-6">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-white text-2xl font-bold">
              <img src="/Logo.png" alt="Logo" className="h-8 sm:h-10 w-auto" />
            </Link>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-4 relative">
            <Search className="text-[#455058] cursor-pointer" />
            <Link to={`/my-cart/${10}`}>
              <ShoppingCart className="text-[#455058] cursor-pointer" />
            </Link>

            {/* User icon + dropdown */}
            <div className="relative" ref={menuRef}>
              <CircleUserRound
                className="text-[#455058] cursor-pointer"
                onClick={() => setMenuOpen((prev) => !prev)}
              />

              {/* Dropdown menu */}
              {menuOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-100 rounded-lg shadow-lg z-50 animate-fadeIn">
                  <ul className="py-2">
                    <li>
                      <Link
                        to="/buyer-dashboard"
                        className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 transition-colors"
                        onClick={() => setMenuOpen(false)}
                      >
                        Buyer Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/seller-dashboard/dashboard"
                        className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 transition-colors"
                        onClick={() => setMenuOpen(false)}
                      >
                        Seller Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin-dashboard"
                        className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 transition-colors"
                        onClick={() => setMenuOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
