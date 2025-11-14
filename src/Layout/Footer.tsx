import React from "react";
import { SendHorizontal } from "lucide-react";
import CommonWrapper from "@/common/CommonWrapper";
import logo from "@/assets/mditems.svg";
import { useAppSelector } from "@/hooks/useRedux";

const Footer: React.FC = () => {
  const role = useAppSelector((state) => state?.auth?.user?.role);
  return (
    <footer className="bg-website-color-black text-white py-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <CommonWrapper className="flex flex-col lg:flex-row lg:justify-between gap-10 lg:gap-20">
          {/* Logo & Description */}
          <div className="w-full lg:w-1/3 space-y-4">
            <img src={logo} alt="MDItems" className="w-40 sm:w-44 lg:w-full" />
            <p className="text-sm text-gray-300">
              MDItems is your go-to online destination for authentic quality
              health and wellness products. We specialize in providing a wide
              range of products that cater to your unique needs and lifestyle.
            </p>
          </div>

          {/* Support Section */}
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 space-y-4">
            <h2 className="text-xl sm:text-2xl font-medium mb-4 text-gray-100">
              Support
            </h2>
            <p className="text-gray-300 text-sm">
              456 Maple Avenue, Springfield, IL 62704, USA.
            </p>
            <p className="text-gray-300 text-sm">exclusive@gmail.com</p>
            <p className="text-gray-300 text-sm">+88015-88888-9999</p>
          </div>

          {/* Account Section */}
          <div className="w-full sm:w-1/2 md:w-1/4 space-y-4">
            <h2 className="text-xl sm:text-2xl font-medium mb-4 text-gray-100">
              Account
            </h2>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <a
                  href={
                    role === "ADMIN"
                      ? "/admin-dashboard"
                      : role === "VENDOR"
                      ? "/seller-dashboard"
                      : role === "CUSTOMER"
                      ? "/buyer-dashboard"
                      : "/login"
                  }
                  className="hover:text-gray-100 transition-colors"
                >
                  My Account
                </a>
              </li>
              <li>
                <a
                  href="/cart"
                  className="hover:text-gray-100 transition-colors"
                >
                  Cart
                </a>
              </li>
              <li>
                <a
                  href="/shop"
                  className="hover:text-gray-100 transition-colors"
                >
                  Shop
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div className="w-full sm:w-1/2 md:w-1/4 space-y-4">
            <h2 className="text-xl sm:text-2xl font-medium mb-4 text-gray-100">
              Quick Links
            </h2>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <a
                  href="/shop"
                  className="hover:text-gray-100 transition-colors"
                >
                  Shop
                </a>
              </li>
              <li>
                <a
                  href="/cart"
                  className="hover:text-gray-100 transition-colors"
                >
                  Cart
                </a>
              </li>
              {/* <li><a href="/myprofile" className="hover:text-gray-100 transition-colors">My Profile</a></li> */}
              
            </ul>
          </div>

          {/* Subscribe Section */}
          <div className="w-full lg:w-1/3 space-y-4 mt-6 lg:mt-0">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-100">
              Exclusive
            </h2>
            <h3 className="text-lg sm:text-xl font-medium text-gray-100">
              Subscribe
            </h3>
            <p className="text-sm text-gray-300">
              Get 10% off your first order
            </p>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Enter your email"
                className="w-full border border-white py-3 pl-4 pr-12 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <SendHorizontal
                className="absolute top-1/2 right-4 -translate-y-1/2 text-blue-500 cursor-pointer"
                size={20}
              />
            </div>
          </div>
        </CommonWrapper>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} MDItems. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
