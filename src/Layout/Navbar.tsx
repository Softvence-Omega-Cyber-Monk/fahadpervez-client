import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Search, CircleUserRound, Menu, X, HeartIcon } from "lucide-react";
import CommonWrapper from "@/common/CommonWrapper";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { logout } from "@/store/Slices/AuthSlice/authSlice";
import logo from "../assets/logo.png";
import { toast } from "sonner";
import { FaShoppingCart } from "react-icons/fa";
import GoogleTranslate from "@/common/GoogleTranslate";
import { useGetAllWishListQuery } from "@/Redux/Features/wishlist/wishlist.api";
import { useGetMeQuery } from "@/Redux/Features/auth/auth.api";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { data } = useGetMeQuery({});
  const role = useAppSelector((state) => state?.auth?.user?.role);
  const { data: wishlistProducts } = useGetAllWishListQuery({});
  const user = data?.data;
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 200);
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
          scrolled ? "backdrop-blur-lg bg-white/60 shadow-sm" : "bg-transparent"
        }`}
      >
        <CommonWrapper>
          <div
            className={`flex items-center justify-between rounded-full transition-all duration-500 ${
              scrolled
                ? "bg-transparent px-4 py-3"
                : "bg-white shadow-md px-5 py-4 mt-2"
            }`}
          >
            {/* Logo */}
            <Link
              to="/"
              className="transition-transform duration-300 hover:scale-105"
            >
              <img src={logo} alt="Logo" className="h-8 sm:h-10 w-auto" />
            </Link>

            {/* Desktop Icons */}
            <div className="hidden sm:flex items-center gap-5">
              <Search className="text-[#455058] cursor-pointer transition-transform duration-200 hover:scale-110" />
              {/* Cart */}
              <Link to={`/my-cart`} className="relative">
                <FaShoppingCart className="text-gray-600 text-lg cursor-pointer size-5 hover:scale-110" />
                <span className="absolute -top-3 -right-3 bg-blue-600 text-white text-xs size-4 rounded-full flex items-center justify-center">
                  {cartItems?.length}
                </span>
              </Link>
              {/* wishlist */}
             {
              role === "CUSTOMER" && (
                <Link to={`/buyer-dashboard/wishlist`}>
                 <div className="relative">
                <HeartIcon className="text-gray-600 size-5 cursor-pointer hover:scale-110" />
                <span className="absolute -top-3 -right-3 bg-blue-600 text-white text-xs size-4 rounded-full flex items-center justify-center">
                  {wishlistProducts?.data?.length}
                </span>
              </div>
                </Link>
              )
             }
              {/* User Dropdown */}
              <div className="relative" ref={menuRef}>
                <CircleUserRound
                  className="text-[#455058] cursor-pointer transition-transform duration-200 hover:scale-110 "
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
                    {user && (
                      <li className=" px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 transition-colors flex items-center gap-2">
                        <img
                          src={user.profileImage}
                          alt=""
                          className="size-10 rounded-full"
                        />
                        <div className="grid gap-px">
                          <p className="text-sm font-medium text-gray-900">
                            {user.name}
                          </p>
                          {user.role && (
                            <span className="text-[8px] bg-gray-200 px-2 py-1 rounded-full">
                              {user.role}
                            </span>
                          )}
                        </div>
                      </li>
                    )}
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
                        className="cursor-pointer block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 transition-colors"
                        onClick={() => {
                          dispatch(logout());
                          toast.success("Logged out successfully.");
                        }}
                      >
                        Logout
                      </li>
                    )}
                  </ul>
                </div>
              </div>
              <GoogleTranslate />
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
        className={`fixed top-22 left-0 w-full bg-white shadow-md z-40 transform transition-all duration-500 ease-in-out ${
          mobileOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-10 opacity-0 pointer-events-none"
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
          <div className="flex items-center justify-between">
            {user && (
              <li className=" px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 transition-colors flex items-center gap-2">
                <img
                  src={user.profileImage}
                  alt=""
                  className="size-10 rounded-full"
                />
                <div className="grid gap-px">
                  <p className="text-sm font-medium text-gray-900">
                    {user.name}
                  </p>
                  {user.role && (
                    <span className="text-[8px] bg-gray-200 px-2 py-1 rounded-full">
                      {user.role}
                    </span>
                  )}
                </div>
              </li>
            )}
            <li className="px-6 py-2">
              <Link to={`/my-cart`} className="relative">
                <FaShoppingCart className="text-gray-600 size-6 cursor-pointer" />
                <span className="absolute top-0 left-4 bg-blue-600 text-white text-xs w-3 h-3 p-1 rounded-full flex items-center justify-center">
                  {cartItems?.length}
                </span>
              </Link>
            </li>
          </div>
          <li className="px-4 py-2">
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
              onClick={() => setMobileOpen(false)}
            >
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
