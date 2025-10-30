import { useState } from "react";
import { FaBell, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { useGetMeQuery } from "@/Redux/Features/auth/auth.api";
import { Spinner } from "@/components/ui/spinner";
import { useAppDispatch } from "@/hooks/useRedux";
import { logout } from "@/store/Slices/AuthSlice/authSlice";

interface DashboardNavProps {
  onMenuToggle?: (open: boolean) => void;
}

const DashboardNav: React.FC<DashboardNavProps> = ({ onMenuToggle }) => {
   const [menuOpen, setMenuOpen] = useState<boolean>(false);
   const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
   const {data} = useGetMeQuery({})
   const dispatch = useAppDispatch()
  const user = data?.data
  const handleToggle = () => {
    const newState = !menuOpen;
    setMenuOpen(newState);
    if (onMenuToggle) onMenuToggle(newState);
  };

  return (
    <div className="w-full bg-white shadow-sm flex  items-center px-4 md:px-6 py-2 fixed top-0 left-0 z-50">
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
      <div className="flex items-center justify-between w-full px-4 md:px-6">
        {
          user ? ( <div className="flex items-center space-x-3 pl-4 relative">
        <button onClick={()=>setDropdownOpen(!dropdownOpen)}>
          <img
            src={ user.profileImage ? user.profileImage : "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"}
            alt="User"
            className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover cursor-pointer"
          />
        </button>

             {/* Dropdown menu */}
                    {dropdownOpen && (
                      <div className="absolute top-10 w-56 bg-white border border-gray-100 rounded-lg shadow-lg z-50 animate-fadeIn ">
                        <ul className="py-2">
                          <li>
                            {
                              user.role ? <Link
                              to={`${user.role === "ADMIN" ? '/admin-dashboard' : user.role === "VENDOR" ? '/seller-dashboard' : user.role === "CUSTOMER" ? '/buyer-dashboard' : '/login'}`}
                              className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 transition-colors"
                              onClick={() => setDropdownOpen(!dropdownOpen)}
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
                              onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                              Customer Support
                            </Link>
                          </li>
                          {
                            user.role && <li>
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

        <div className="hidden sm:block">
          <p className="text-sm font-medium text-gray-900">{user.name}</p>
          <p className="text-xs text-gray-500">{user.role}</p>
        </div>
      </div> ) : <Spinner  />
        }
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



