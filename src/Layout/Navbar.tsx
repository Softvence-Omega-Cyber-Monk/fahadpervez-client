import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, CircleUserRound, Menu, X } from "lucide-react";
import CommonWrapper from "@/common/CommonWrapper";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { logout } from "@/store/Slices/AuthSlice/authSlice";
import logo from "../assets/logo.png";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const role = useAppSelector((state) => state?.auth?.user?.role);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

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
    <nav className="fixed top-0 w-full z-50">
      <div
        className={`px-4 py-2 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-lg bg-white/60 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <CommonWrapper>
          <div
            className={`flex items-center justify-between rounded-full transition-all duration-500 ${
              scrolled
                ? "bg-white/10 px-4 py-3"
                : "bg-white shadow-md px-5 py-4 mt-2"
            }`}
          >
            {/* Logo */}
            <Link to="/" className="transition-transform duration-300 hover:scale-105">
              <img src={logo} alt="Logo" className="h-8 sm:h-10 w-auto" />
            </Link>

            {/* Desktop Icons */}
            <div className="hidden sm:flex items-center gap-4">
              <Search className="text-[#455058] cursor-pointer transition-transform duration-200 hover:scale-110" />
              <Link to={`/my-cart/${10}`}>
                <ShoppingCart className="text-[#455058] cursor-pointer transition-transform duration-200 hover:scale-110" />
              </Link>

              {/* User Dropdown */}
              <div className="relative" ref={menuRef}>
                <CircleUserRound
                  className="text-[#455058] cursor-pointer transition-transform duration-200 hover:scale-110"
                  onClick={() => setMenuOpen((prev) => !prev)}
                />

                {/* Dropdown */}
                <div
                  className={`absolute right-0 mt-3 w-56 bg-white border border-gray-100 rounded-lg shadow-lg transition-all duration-300 origin-top-right transform ${
                    menuOpen
                      ? "opacity-100 scale-100 translate-y-0"
                      : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                  }`}
                >
                  <ul className="py-2">
                    <li>
                      {role ? (
                        <Link
                          to={
                            role === "ADMIN"
                              ? "/admin-dashboard"
                              : role === "VENDOR"
                              ? "/seller-dashboard"
                              : role === "CUSTOMER"
                              ? "/buyer-dashboard"
                              : "/login"
                          }
                          className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 transition-colors"
                          onClick={() => setMenuOpen(false)}
                        >
                          My Account
                        </Link>
                      ) : (
                        <Link
                          to="/login"
                          className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 transition-colors"
                        >
                          Login
                        </Link>
                      )}
                    </li>
                    <li>
                      <Link
                        to="/customer-support"
                        className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 transition-colors"
                        onClick={() => setMenuOpen(false)}
                      >
                        Customer Support
                      </Link>
                    </li>
                    {role && (
                      <li
                        className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 transition-colors"
                        onClick={() => dispatch(logout())}
                      >
                        Logout
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Mobile Hamburger */}
            <div className="sm:hidden">
              {mobileOpen ? (
                <X
                  className="text-[#455058] cursor-pointer transition-transform duration-200 hover:scale-110"
                  onClick={() => setMobileOpen(false)}
                />
              ) : (
                <Menu
                  className="text-[#455058] cursor-pointer transition-transform duration-200 hover:scale-110"
                  onClick={() => setMobileOpen(true)}
                />
              )}
            </div>
          </div>
        </CommonWrapper>
      </div>

      {/* Mobile Menu with Animation */}
      <div
        className={`fixed top-[80px] left-0 w-full bg-white shadow-md z-40 transform transition-all duration-500 ease-in-out ${
          mobileOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col py-6 space-y-2">
          <li className="px-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
            />
          </li>
          <li className="px-6 py-2">
            <Link to={`/my-cart/${10}`} onClick={() => setMobileOpen(false)}>
              My Cart
            </Link>
          </li>
          <li className="px-6 py-2">
            <Link to="/" onClick={() => setMobileOpen(false)}>
              My Account
            </Link>
          </li>
          <li>
            <Link
              to="/customer-support"
              className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Customer Support
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
