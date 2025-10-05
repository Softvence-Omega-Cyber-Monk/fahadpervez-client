import { Link, useLocation } from "react-router-dom";
import React, { ReactElement } from "react";
import { sellerRoutes } from "@/routes/SellerRoutes";

interface SidebarItemProps {
  icon:ReactElement;
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

const SideBar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  return (
    <>
      {/* Overlay (Mobile) */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300 min-h-screen ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } md:hidden`}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 z-50 bg-white w-64 h-full md:h-[calc(100vh-64px)] min-h-screen rounded-none md:rounded-lg shadow-md p-4 flex flex-col transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } `}
      >
        <nav className="flex flex-col gap-3 mt-2">
           {sellerRoutes.map((item) => (
                      <Link key={item.path} to={item.path}>
                        <SidebarItem
                          icon={item.icon}
                          label={item.name}
                          active={location.pathname === item.path}
                          onClick={onClose}
                        />
                      </Link>
                    ))}
        </nav>
      </div>
    </>
  );
};

export default SideBar;
