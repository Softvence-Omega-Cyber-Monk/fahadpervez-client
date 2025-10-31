import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, CircleUserRound, Menu, X } from "lucide-react";
import CommonWrapper from "@/common/CommonWrapper";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { logout } from "@/store/Slices/AuthSlice/authSlice";
import logo from "../assets/logo.png"

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const role = useAppSelector(state=> state?.auth?.user?.role)
  const dispatch = useAppDispatch()
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
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
    <nav className="">
      <div
        className={`px-4 sm:px-8 xl:px-0  not-first: h-22 flex items-center  justify-center fixed top-0 z-50 w-full  transition-all duration-300 ${
          scrolled ? "backdrop-blur-md bg-white/30 shadow-sm" : "bg-transparent"
        }`}
      >
        <div className=" w-full">
        <CommonWrapper>
        <div className="w-full flex items-center justify-between ">
          {/* Logo */}
          <div className="">
            <Link to="/" className="">
              <img src={logo} alt="Logo" className="h-8 sm:h-10 w-auto" />
            </Link>
          </div>

          {/* Right icons (desktop only) */}
          <div className="hidden sm:flex items-center gap-4 relative ">
            <Search className="text-[#455058] cursor-pointer" />
            <Link to={`/my-cart`}>
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
                <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-100 rounded-lg shadow-lg z-50 animate-fadeIn ">
                  <ul className="py-2">
                    <li>
                      {
                        role ? <Link
                        to={`${role === "ADMIN" ? '/admin-dashboard' : role === "VENDOR" ? '/seller-dashboard' : role === "CUSTOMER" ? '/buyer-dashboard' : '/login'}`}
                        className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 transition-colors"
                        onClick={() => setMenuOpen(false)}
                      >
                        My Account
                      </Link> : <Link
                        to="/login"
                        className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 transition-colors"
                      >
                        Login
                      </Link>
                      }
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
                    {
                      role && <li>
                      <li
                        className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 transition-colors"
                        onClick={() => dispatch(logout())}
                      >
                        Logout
                      </li>
                      </li>
                    }
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Hamburger */}
          <div className="sm:hidden">
            {mobileOpen ? (
              <X
                className="text-[#455058] cursor-pointer"
                onClick={() => setMobileOpen(false)}
              />
            ) : (
              <Menu
                className="text-[#455058] cursor-pointer"
                onClick={() => setMobileOpen(true)}
              />
            )}
          </div>
        </div>
        </CommonWrapper>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="sm:hidden absolute top-22 left-0 w-full bg-white shadow-md z-40">
          <ul className="flex flex-col py-6 space-y-2 fixed bg-white w-full ">
            <li className="px-4">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-3 pr-28 border border-gray-300 bg-white shadow-md rounded-lg focus:outline-none"
              />
            </li>
            <li className="px-6 py-2">
              <Link to={`/my-cart`} onClick={() => setMobileOpen(false)}>
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
      )}
    </nav>
  );
};

export default Navbar;
