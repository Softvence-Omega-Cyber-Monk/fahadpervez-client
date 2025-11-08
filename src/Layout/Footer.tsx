import React from "react";
import { SendHorizontal } from 'lucide-react';
import CommonWrapper from "@/common/CommonWrapper";
import logo from "@/assets/mditems.svg"

const Footer: React.FC = () => {
  return (
    <footer className="bg-website-color-black text-white py-8">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 pt-15">
        <CommonWrapper className="flex flex-col md:flex-row md:justify-between gap-10 md:gap-20">
        
          {/* Exclusive Section */}
          <div className="w-full md:w-1/2 space-y-4 md:space-y-0">
            <img src={logo} className="w-44 md:w-full " alt="" />
            <div className="relative w-full ">
              <p className="text-sm font-montserrat mb-4 text-gray-300">MDItems is your go-to online destination for authentic quality health and wellness products. We specialize in providing a wide range of products that cater to your unique needs and lifestyle.</p>
            </div>
          </div>

          {/* Support Media Section */}
          <div className="w-full md:w-1/4">
            <h2 className="text-2xl font-medium mb-6 font-montserrat text-gray-100">Support</h2>
            <div className="flex flex-col gap-4 font-montserrat">
              <p className="text-gray-300">456 Maple Avenue, Springfield, IL 62704, USA.</p>
              <p className="text-gray-300">exclusive@gmail.com</p>
              <p className="text-gray-300">+88015-88888-9999</p> 
            </div>
          </div>

          {/* Account Section */}
          <div className="w-full md:w-1/4">
            <h2 className="text-2xl font-medium mb-6 font-montserrat text-gray-100">Account</h2>
            <ul className="space-y-4 text-gray-300 font-montserrat">
              <li><a href="/shop" className="hover:text-gray-300">My Account</a></li>
              <li><a href="/cart" className="hover:text-gray-300">Login / Register</a></li>
              <li><a href="/myprofile" className="hover:text-gray-300">Cart</a></li>
              <li><a href="/contact" className="hover:text-gray-300">Wishlist</a></li>
              <li><a href="/contact" className="hover:text-gray-300">Shop</a></li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div className="w-full md:w-1/4">
            <h2 className="text-2xl font-medium mb-6 font-montserrat text-gray-100">Quick Link</h2>
            <ul className="space-y-4 text-gray-300 font-montserrat">
              <li><a href="/shop" className="hover:text-gray-300">Shop</a></li>
              <li><a href="/cart" className="hover:text-gray-300">Cart</a></li>
              <li><a href="/myprofile" className="hover:text-gray-300">My Profile</a></li>
              <li><a href="/contact" className="hover:text-gray-300">Contact</a></li>
            </ul>
          </div>

                    {/* Exclusive Section */}
          <div className="w-full md:w-1/3">
            <h2 className="text-2xl font-semibold mb-5 font-montserrat text-gray-100">Exclusive</h2>
            <h3 className="text-xl font-medium mb-6 font-montserrat text-gray-100">Subscribe</h3>
            <p className="text-sm font-montserrat mb-4 text-gray-300">
              Get 10% off your first order
            </p>
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Enter your email" 
                className="w-full border border-white py-3 pl-4 pr-12 rounded-md text-gray-200 focus:outline-none"
              />
              <SendHorizontal className="absolute top-1/2 right-4 -translate-y-1/2 text-blue-500 cursor-pointer"/>
            </div>
          </div>
        </CommonWrapper>

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
