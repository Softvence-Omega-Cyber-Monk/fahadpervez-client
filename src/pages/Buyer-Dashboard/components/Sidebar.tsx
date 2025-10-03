import {
  FaTachometerAlt,
  FaClipboardList,
  FaHeart,
  FaCog,
  FaHeadset,
} from 'react-icons/fa';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
type SidebarItemProps = {
  icon: ReactElement;
  label: string;
  active?: boolean;
};

const SidebarItem = ({ icon, label, active = false }: SidebarItemProps) => (
  <div
    className={`flex items-center px-4 py-2 rounded-lg cursor-pointer transition-colors ${
      active
        ? 'bg-blue-600 text-white'
        : 'text-gray-600 hover:bg-gray-200'
    }`}
  >
    <div className="mr-3 text-lg">{icon}</div>
    <span className="text-sm font-medium">{label}</span>
  </div>
);

const SideBar = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 border-r p-4 flex flex-col">
        {/* Logo */}
        <div className="flex items-center space-x-2 mb-10 px-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
            <span>⟳</span>
          </div>
          <h1 className="text-blue-600 font-bold text-xl">Logoipsum</h1>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-3">
          <Link to='/buyer-dashboard'>
          <SidebarItem icon={<FaTachometerAlt />} label="Dashboard" active />
          </Link>
          <Link to='/buyer-dashboard/my-orders'>
          <SidebarItem icon={<FaClipboardList />} label="My Orders" />
          </Link>
          <Link to='/buyer-dashboard/wishlist'>
          <SidebarItem icon={<FaHeart />} label="Wishlist" />
          </Link>
          <Link to='/buyer-dashboard/settings'>
          <SidebarItem icon={<FaCog />} label="Settings" />
          </Link>
          <Link to='/buyer-dashboard/help-support'>
          <SidebarItem icon={<FaHeadset />} label="Help & Support" />
          </Link>
        </nav>
      </div>
     
    </div>
  );
};

export default SideBar;
