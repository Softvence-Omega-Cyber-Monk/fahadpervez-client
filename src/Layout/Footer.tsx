import React from "react";
import { SendHorizontal } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#212a31] text-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-15">
        <div className="flex justify-between">
          {/* About Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-5 font-montserrat text-gray-100">Exclusive</h2>
            <h3 className="text-xl font-medium mb-6 font-montserrat text-gray-100">Subscribe</h3>
            <p className="text-sm font-montserrat mb-4 text-gray-300">
              Get 10% off your first order
            </p>
            <div className="relative">
              <input type="text" placeholder="Enter your email" className="border border-white py-3 px-4 rounded-md"/>
              <SendHorizontal className="absolute top-3 right-6 text-blue-500"/>
            </div>
          </div>

          {/* Support Media Section */}
          <div className="w-[15%]">
            <h2 className="text-2xl font-medium mb-6 font-montserrat text-gray-100">Support</h2>
            <div className="flex flex-col gap-4 font-montserrat">
              <p className="text-gray-300">456 Maple Avenue, Springfield, IL 62704, USA.</p>
              <p className="text-gray-300">exclusive@gmail.com</p>
              <p className="text-gray-300">+88015-88888-9999</p> 
            </div>
          </div>

          {/* Account Section */}
          <div>
            <h2 className="text-2xl font-medium mb-6 font-montserrat text-gray-100">Account</h2>
            <ul className="space-y-4 text-gray-300 font-montserrat">
              <li>
                <a href="/shop" className="hover:text-gray-300">
                  My Account
                </a>
              </li>
              <li>
                <a href="/cart" className="hover:text-gray-300">
                  Login / Register
                </a>
              </li>
              <li>
                <a href="/myprofile" className="hover:text-gray-300">
                  Cart 
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-gray-300">
                  Wishlist
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-gray-300">
                  Shop
                </a>
              </li>
            </ul>
          </div>
          {/* Quick Links Section */}
          <div>
            <h2 className="text-2xl font-medium mb-6 font-montserrat text-gray-100">Quick Link</h2>
            <ul className="space-y-4 text-gray-300 font-montserrat">
              <li>
                <a href="/shop" className="hover:text-gray-300">
                  Shop
                </a>
              </li>
              <li>
                <a href="/cart" className="hover:text-gray-300">
                  Cart
                </a>
              </li>
              <li>
                <a href="/myprofile" className="hover:text-gray-300">
                  My Profile
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-gray-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-sm font-montserrat text-gray-400">
            &copy; Copyright Rimel {new Date().getFullYear()}. All right reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
