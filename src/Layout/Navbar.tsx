/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Search, CircleUserRound, HeartIcon, X, Menu, ChevronDown } from "lucide-react";
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
import { TfiWallet } from "react-icons/tfi";


const Navbar: React.FC = () => {  
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  const { data: categoryData } = useGetAllCategoriesQuery({});
  const { data } = useGetMeQuery({});
  const { data: wishlistProducts } = useGetAllWishListQuery({});
  const [userLogout] = useUserLogoutMutation();

  const dispatch = useAppDispatch();
  const user = data?.data;
  const role = useAppSelector((state) => state?.auth?.user?.role);
  const cartItems = useAppSelector((state) => state.cart.items);

  const moreMenuRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);

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

  // Split categories for desktop
  const [visibleCategories, setVisibleCategories] = useState<any[]>([]);
  const [overflowCategories, setOverflowCategories] = useState<any[]>([]);

useEffect(() => {
  if (!categoryData?.data) return;

  const calculateVisibleCategories = () => {
    if (typeof window === "undefined") return;

    let maxVisible=7; // default for large screens

    const width = window.innerWidth;

    if (width >= 1280) {
      maxVisible = 6; // xl screens
    } else if (width >= 1150) {
      maxVisible = 5; // lg screens
    } else if (width >= 1024) {
      maxVisible = 4; // lg screens
    } else if (width >= 900) {
      maxVisible = 4;  
    } else if (width >= 768) {
      maxVisible = 3; // md screens
    } else {
      maxVisible = 2; // sm screens
    }

    setVisibleCategories(categoryData.data.slice(0, maxVisible));
    setOverflowCategories(categoryData.data.slice(maxVisible));
  };

  calculateVisibleCategories();

  window.addEventListener("resize", calculateVisibleCategories);
  return () => window.removeEventListener("resize", calculateVisibleCategories);
}, [categoryData]);


  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setMoreMenuOpen(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-md">
      {/* Top bar */}
      <div className="bg-primary-blue text-white min-h-8 flex items-center">
        <CommonWrapper className="w-full">
          <div className=" flex justify-between items-center px-4 py-1 text-sm">
            <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
              <div className="bg-white text-primary-blue px-2 sm:px-3 md:px-4 py-1 rounded-full flex items-center gap-1 md:gap-2 font-medium text-[10px] sm:text-xs md:text-sm">
                <span className="hidden sm:inline">20% off Beauty, Bath & Personal Care</span>
                <span className="sm:hidden">20% off Beauty</span>
                <span>›</span>
              </div>
              <span className="hidden md:block text-xs lg:text-sm">Black Friday Month</span>
            </div>
            <GoogleTranslate />
          </div>
        </CommonWrapper>
      </div>
      {/* Main navbar */}
      <CommonWrapper>
        <div className="flex items-center justify-between px-4 py-2 md:py-3 min-h-[60px] md:min-h-[70px]">
          {/* Logo */}
          <Link to="/" className="transition-transform duration-300 hover:scale-105 shrink-0">
            <img src={logo} alt="Logo" className="h-7 sm:h-8 md:h-10 w-auto" />
          </Link>

          {/* Desktop search */}
          <div className="relative hidden sm:flex w-full max-w-1/2 mx-auto">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full border border-gray-300 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-blue-600 transition-colors" size={20} />
          </div>

          {/* Desktop icons */}
          <div className="hidden sm:flex items-center gap-5">
            <Link to="/my-cart" className="relative group">
              <FaShoppingCart className="text-gray-700 size-5 cursor-pointer group-hover:scale-110 transition-transform" />
              {cartItems?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-semibold">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {role === "CUSTOMER" && (
              <Link to="/buyer-dashboard/wishlist" className="relative group">
                <HeartIcon className="text-gray-700 size-5 cursor-pointer group-hover:scale-110 transition-transform" />
                {wishlistProducts?.data?.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-semibold">
                    {wishlistProducts.data.length}
                  </span>
                )}
              </Link>
            )}

            {/* Profile dropdown */}
            <div className="relative" ref={profileMenuRef}>
              <CircleUserRound
                className="text-gray-700 size-6 cursor-pointer hover:scale-110 transition-transform"
                onClick={() => setMenuOpen((prev) => !prev)}
              />
              {menuOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white border border-gray-200 rounded-xl shadow-2xl z-9999 overflow-hidden">
                  {user && (
                    <div className="px-4 py-3 bg-linear-to-r from-blue-50 to-purple-50 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <img src={user.profileImage} alt="" className="size-12 rounded-full object-cover border-2 border-white shadow" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                          {user.role && (
                            <span className="inline-block mt-1 text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full uppercase font-medium">
                              {user.role}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  <ul className="py-1">
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
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setMenuOpen(false)}
                      >
                        My Account
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/customer-support"
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setMenuOpen(false)}
                      >
                        Customer Support
                      </Link>
                    </li>
                    {role && (
                      <li>
                        <button
                          onClick={() => {
                            handleUserLogout();
                            setMenuOpen(false);
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          Logout
                        </button>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            <TfiWallet className="text-gray-700 size-6 cursor-pointer hover:scale-110 transition-transform" />

          </div>

          {/* Hamburger for md and below */}
          <button className="sm:hidden p-1" onClick={() => setSidebarOpen(true)}>
            <Menu className="text-gray-700 size-6 hover:text-blue-600 transition-colors" />
          </button>
        </div>
      </CommonWrapper>

      {/* Desktop categories */}
      <div className="bg-gray-50 border-t border-gray-200 hidden sm:block">
        <CommonWrapper>
          <div className="flex items-center justify-between gap-1 ">
            {visibleCategories.map((category: any) => (
              <Link
                key={category._id}
                to={`/shop?category=${category._id}`}
                className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all whitespace-nowrap"
              >
                {category.categoryName}
              </Link>
            ))}
            
            {overflowCategories.length > 0 && (
              <div className="relative" ref={moreMenuRef}>
                <button
                  onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                  className="flex items-center gap-1 px-4 py-3 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                >
                  More
                  <ChevronDown className={`w-4 h-4 transition-transform ${moreMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                {moreMenuOpen && (
                  <div className="absolute left-0 mt-1 w-56 bg-white border border-gray-200 rounded-xl shadow-2xl max-h-80 overflow-y-auto z-9999">
                    <div className="py-1">
                      {overflowCategories.map((category: any) => (
                        <Link
                          key={category._id}
                          to={`/shop?category=${category._id}`}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          onClick={() => setMoreMenuOpen(false)}
                        >
                          {category.categoryName}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </CommonWrapper>
      </div>
      {/* Mobile/Tablet Sidebar */}
      <div
        className={`fixed top-0 left-0 w-80 sm:w-96 h-full bg-white shadow-2xl z-9999 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="overflow-y-auto h-[calc(100%-64px)]">
          {/* Profile Section */}
          <div className="flex items-center justify-between w-full">
          {user && (
            <div className="p-4">
              <div className="flex items-center gap-3">
                <img src={user.profileImage} alt="" className="w-12 h-12 rounded-full object-cover border-2 border-blue-500" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  {user.role && (
                    <span className="inline-block mt-1 text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full uppercase font-medium">
                      {user.role}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
          <TfiWallet className="text-gray-700 size-6 cursor-pointer hover:scale-110 transition-transform" />
          <button onClick={() => setSidebarOpen(false)} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
            <X className="" size={24} />
          </button>
          </div>

          {/* Search */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
          {/* Categories */}
          <div className="p-4 border-b border-gray-200">
            <button
              onClick={() => setCatOpen(!catOpen)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="text-sm font-semibold text-gray-900">Categories</span>
              <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${catOpen ? 'rotate-180' : ''}`} />
            </button>
            {catOpen && (
              <div className="mt-2 space-y-1 max-h-96 overflow-y-auto">
                {categoryData?.data?.map((category: any) => (
                  <Link
                    key={category._id}
                    to={`/shop?category=${category._id}`}
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                    onClick={() => setSidebarOpen(false)}
                  >
                    {category.categoryName}
                  </Link>
                ))}
              </div>
            )}
          </div>
          {/* Quick Links */}
          <div className="p-4 space-y-1 border-b border-gray-200">
            <Link
              to="/my-cart"
              className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              <div className="flex items-center gap-3">
                <FaShoppingCart className="text-gray-600" size={18} />
                <span className="text-sm font-medium text-gray-700">Shopping Cart</span>
              </div>
              {cartItems?.length > 0 && (
                <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full font-semibold">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {role === "CUSTOMER" && (
              <Link
                to="/buyer-dashboard/wishlist"
                className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <HeartIcon className="text-gray-600" size={18} />
                  <span className="text-sm font-medium text-gray-700">Wishlist</span>
                </div>
                {wishlistProducts?.data?.length > 0 && (
                  <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full font-semibold">
                    {wishlistProducts.data.length}
                  </span>
                )}
              </Link>
            )}

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
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              <CircleUserRound className="text-gray-600" size={18} />
              <span className="text-sm font-medium text-gray-700">My Account</span>
            </Link>

            <Link
              to="/customer-support"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="text-sm font-medium text-gray-700">Customer Support</span>
            </Link>

            {role && (
              <button
                onClick={() => {
                  handleUserLogout();
                  setSidebarOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
              >
                <span className="text-sm font-medium">Logout</span>
              </button>
            )}
          </div>
            
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-9998 transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;