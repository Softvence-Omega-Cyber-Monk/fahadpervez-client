import {
  FaTachometerAlt,
  FaClipboardList,
  FaHeart,
  FaCog,
  FaHeadset,
  FaEnvelope,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import React from "react";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active = false, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center px-4 py-2 rounded-lg cursor-pointer transition-colors ${
      active
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"
    }`}
  >
    <div className="mr-3 text-lg">{icon}</div>
    <span className="text-sm font-medium">{label}</span>
  </div>
);

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const routes = [
    { path: "/buyer-dashboard", icon: <FaTachometerAlt />, label: "Dashboard" },
    { path: "/buyer-dashboard/my-orders", icon: <FaClipboardList />, label: "My Orders" },
    { path: "/buyer-dashboard/wishlist", icon: <FaHeart />, label: "Wishlist" },
    { path: "/buyer-dashboard/settings", icon: <FaCog />, label: "Settings" },
    { path: "/buyer-dashboard/help-support", icon: <FaHeadset />, label: "Help & Support" },
    { path: "/buyer-dashboard/message", icon: <FaEnvelope />, label: "Message" },
  ];

  return (
    <>
      {/* Overlay for Mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 z-50 bg-white w-64 rounded-none md:rounded-lg shadow-md p-4 flex flex-col transform transition-transform duration-300 mt-12
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          h-screen md:h-auto overflow-y-auto
        `}
      >
        <nav className="flex flex-col gap-3 mt-2">
          {routes.map(({ path, icon, label }) => (
            <Link key={path} to={path}>
              <SidebarItem
                icon={icon}
                label={label}
                active={location.pathname === path}
                onClick={onClose} // close sidebar on mobile
              />
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
