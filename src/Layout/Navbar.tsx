import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, CircleUserRound } from "lucide-react";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav>
      <div
        className={`flex justify-center fixed z-50 w-full py-8 transition-all duration-300 ${
          scrolled ? "backdrop-blur-md bg-white/30 shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between w-[1120px]">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-white text-2xl font-bold">
              <img src="/Logo.png" alt="Logo" />
            </Link>
          </div>

          {/* nav icon */}
          <div className="flex items-baseline gap-4">
            <Search className="text-[#455058]" />
            <ShoppingCart className="text-[#455058]" />
            <CircleUserRound className="text-[#455058]" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
