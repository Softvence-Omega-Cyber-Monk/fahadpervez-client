/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Search, CircleUserRound, Menu, X, HeartIcon } from "lucide-react";
import { FaShoppingCart } from "react-icons/fa";
import { toast } from "sonner";
import CommonWrapper from "@/common/CommonWrapper";
import GoogleTranslate from "@/common/GoogleTranslate";
import logo from "@/assets/logo.png";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { logout } from "@/store/Slices/AuthSlice/authSlice";
import { useGetAllWishListQuery } from "@/Redux/Features/wishlist/wishlist.api";
import { useGetMeQuery } from "@/Redux/Features/auth/auth.api";
import { useUserLogoutMutation } from "@/Redux/Features/user/user.api";
import { useGetAllCategoriesQuery } from "@/Redux/Features/categories/categories.api";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const {data:categoryData} = useGetAllCategoriesQuery({});
  const { data } = useGetMeQuery({});
  const { data: wishlistProducts } = useGetAllWishListQuery({});
  const [userLogout] = useUserLogoutMutation();

  const dispatch = useAppDispatch();
  const user = data?.data;
  const role = useAppSelector((state) => state?.auth?.user?.role);
  const cartItems = useAppSelector((state) => state.cart.items);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUserLogout = async () => {
    try {
      const res = await userLogout().unwrap();
      if (res.success) {
        toast.success("Logged out successfully.");
        dispatch(logout());
      }
    } catch {
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <nav className="f w-full bg-white shadow-md">
      {/* Top Bar */}
      <div className="bg-primary-blue text-white">
        <CommonWrapper>
          <div className="flex justify-between items-center px-4 py-2 text-sm">
            <div className="flex items-center gap-6">
              <div className="bg-white text-primary-blue px-4 py-1 rounded-full flex items-center gap-2 font-medium">
                <span>20% off Beauty, Bath & Personal Care</span>
                <span>›</span>
              </div>
              <span>Black Friday Month</span>
            </div>
            <GoogleTranslate />
          </div>
        </CommonWrapper>
      </div>

      {/* Main Navbar */}
      <CommonWrapper>
        <div className="flex items-center justify-between px-4 py-4 md:py-5">
          {/* Logo */}
          <Link to="/" className="transition-transform duration-300 hover:scale-105">
            <img src={logo} alt="Logo" className="h-10 w-auto" />
          </Link>

          {/* Search Bar */}
          <div className="relative hidden md:grid w-1/2 items-center">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full border border-gray-300 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            <Search className="absolute right-4 text-gray-500 cursor-pointer hover:scale-110 transition-transform" />
          </div>

          {/* Desktop Icons */}
          <div className="hidden sm:flex items-center gap-5">
            {/* Cart */}
            <Link to="/my-cart" className="relative">
              <FaShoppingCart className="text-gray-700 size-5 cursor-pointer hover:scale-110 transition-transform" />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {cartItems?.length || 0}
              </span>
            </Link>

            {/* Wishlist */}
            {role === "CUSTOMER" && (
              <Link to="/buyer-dashboard/wishlist" className="relative">
                <HeartIcon className="text-gray-700 size-5 cursor-pointer hover:scale-110 transition-transform" />
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {wishlistProducts?.data?.length || 0}
                </span>
              </Link>
            )}

            {/* User Dropdown */}
            <div className="relative" ref={menuRef}>
              <CircleUserRound
                className="text-gray-700 size-6 cursor-pointer hover:scale-110 transition-transform"
                onClick={() => setMenuOpen((prev) => !prev)}
              />

              {menuOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-[9999]">
                  <ul className="py-2">
                    {user && (
                      <li className="px-4 py-2 flex items-center gap-3 border-b border-gray-100">
                        <img
                          src={user.profileImage}
                          alt=""
                          className="size-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {user.name}
                          </p>
                          {user.role && (
                            <span className="text-[10px] bg-gray-200 px-2 py-[2px] rounded-full uppercase">
                              {user.role}
                            </span>
                          )}
                        </div>
                      </li>
                    )}
                    <li>
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
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                        onClick={() => setMenuOpen(false)}
                      >
                        My Account
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/customer-support"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                        onClick={() => setMenuOpen(false)}
                      >
                        Customer Support
                      </Link>
                    </li>
                    {role && (
                      <li
                        onClick={handleUserLogout}
                        className="block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                      >
                        Logout
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            {mobileOpen ? (
              <X
                className="text-gray-700 size-6 cursor-pointer hover:scale-110 transition-transform"
                onClick={() => setMobileOpen(false)}
              />
            ) : (
              <Menu
                className="text-gray-700 size-6 cursor-pointer hover:scale-110 transition-transform"
                onClick={() => setMobileOpen(true)}
              />
            )}
          </div>
        </div>
      </CommonWrapper>
      <div className="bg-gray-100">
      <CommonWrapper>
        {
          categoryData?.data &&(
            <div className="flex items-center justify-center gap-10 py-2">
          {categoryData?.data?.slice(0,6).map((category : any) => (
            <Link
              to={`/shop?category=${category?._id}`}
              key={category?._id}
              className="flex items-center gap-3 py-3"
            >
              <p className="text-sm font-medium text-gray-700">{category?.categoryName}</p>
            </Link>
          ))}
        </div>
          )
        }
      </CommonWrapper>
      </div>
      {/* Mobile Menu */}
      <div
        className={`fixed top-[90px] left-0 w-full bg-white shadow-lg transition-all duration-500 ease-in-out z-998 ${
          mobileOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col p-6 space-y-4 text-gray-700">
          <li>
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </li>

          {user && (
            <li className="flex items-center gap-3 border-b border-gray-100 pb-3">
              <img
                src={user.profileImage}
                alt=""
                className="size-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-medium">{user.name}</p>
                {user.role && (
                  <span className="text-[10px] bg-gray-200 px-2 py-[2px] rounded-full uppercase">
                    {user.role}
                  </span>
                )}
              </div>
            </li>
          )}

          <li>
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
            <Link to="/customer-support" onClick={() => setMobileOpen(false)}>
              Customer Support
            </Link>
          </li>
          {role && (
            <li onClick={handleUserLogout} className="cursor-pointer">
              Logout
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
