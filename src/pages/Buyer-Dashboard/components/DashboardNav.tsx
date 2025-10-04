import { FaBell, FaShoppingCart } from 'react-icons/fa';

const DashboardNav = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-sm w-full">
      {/* Left Side: User Info */}
      <div className="flex items-center space-x-3">
        <img
          src="https://i.pravatar.cc/40?img=12" // Replace with your own image
          alt="User"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-medium text-gray-900">Marvin McKinney</p>
          <p className="text-xs text-gray-500">Buyer</p>
        </div>
      </div>

      {/* Right Side: Icons */}
      <div className="flex items-center space-x-6">
        {/* Notification Icon */}
        <FaBell className="text-gray-600 text-lg cursor-pointer" />

        {/* Cart Icon with Badge */}
        <div className="relative">
          <FaShoppingCart className="text-gray-600 text-lg cursor-pointer" />
          <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            3
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;