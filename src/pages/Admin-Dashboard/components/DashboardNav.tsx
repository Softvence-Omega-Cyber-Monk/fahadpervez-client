import { useState } from "react";
import { FaBell, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/logo.png";

interface DashboardNavProps {
  onMenuToggle?: (open: boolean) => void;
}

const DashboardNav: React.FC<DashboardNavProps> = ({ onMenuToggle }) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const handleToggle = () => {
    const newState = !menuOpen;
    setMenuOpen(newState);
    if (onMenuToggle) onMenuToggle(newState);
  };

  return (
    <div className="w-full bg-white shadow-sm flex items-center px-4 md:px-6 py-2 fixed top-0 left-0 z-50">
      {/* Left: Hamburger + Logo */}
      <div className="flex items-center space-x-3 w-64">
        {/* Hamburger Menu (Mobile Only) */}
        <button
          className="md:hidden text-gray-700 text-2xl focus:outline-none"
          onClick={handleToggle}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Logo */}
          <NavLink to="/">
        <img src={logo} alt="Logo" className="h-8 sm:h-10 w-auto" />
          </NavLink>
      </div>

      {/* Center: Notification + Cart (Always Visible) */}
    <div className="flex items-center justify-between w-full px-4 md:px-6 ">
         <div className="flex items-center space-x-3 pl-4">
        <Link to="/buyer-dashboard/buyer-profile">
          <img
            src="https://i.pravatar.cc/40?img=12"
            alt="User"
            className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover cursor-pointer"
          />
        </Link>
        <div className="hidden sm:block">
          <p className="text-sm font-medium text-gray-900">Marvin McKinney</p>
          <p className="text-xs text-gray-500">Buyer</p>
        </div>
      </div>
      <div className="flex items-center space-x-4 md:space-x-6">
        <FaBell className="text-gray-600 text-lg cursor-pointer" />
        <div className="relative">
          <FaShoppingCart className="text-gray-600 text-lg cursor-pointer" />
          <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-3 h-3 p-1 rounded-full flex items-center justify-center">
            3
          </span>
        </div>
      </div>
    </div>
   
    </div>
  );
};

export default DashboardNav;


