import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./Sidebar";
import DashboardNav from "./SellerDashboardNav";
const SellerDashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <div className="flex min-h-screen bg-[#F1F5F8]">
      <SideBar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col bg-gray-50 min-h-screen">
        <DashboardNav onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        <div className="p-4 md:p-8 mt-20 md:mt-16">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SellerDashboardLayout;