import React from "react";
import { Link} from "react-router-dom";
import { Search, ShoppingCart,CircleUserRound } from 'lucide-react';

const Navbar: React.FC = () => {



  return (
    <nav className="mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-white text-2xl font-bold">
              <img src="Logo.png" alt="Logo" />
            </Link>
          </div>

          {/* nav icon */}
           <div className="flex items-baseline gap-4">
            <Search className="text-[#455058]"/>
            <ShoppingCart  className="text-[#455058]"/>
            <CircleUserRound  className="text-[#455058]"/>
           </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
