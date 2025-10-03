import { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import { sellerRoutes } from "@/routes/SellerRoutes";

type SidebarItemProps = {
  icon: ReactElement;
  label: string;
  path: string;
  active?: boolean;
};

const SidebarItem = ({ icon, label, path }: SidebarItemProps) => (
  <NavLink
    to={path}
    className={({
      isActive,
    }) => `flex items-center px-4 py-2 rounded-lg cursor-pointer transition-colors 
        ${
          isActive
            ? "bg-blue-600 text-white transition-colors duration-300"
            : "text-gray-600 hover:bg-gray-200"
        }`}
  >
    <div className="mr-3 text-lg">{icon}</div>
    <span className="text-sm font-medium">{label}</span>
  </NavLink>
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
        <div className="space-y-5">
          {sellerRoutes.map((item) => {
            return (
              <SidebarItem
                icon={item.icon}
                label={item.name}
                path={item.path}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
