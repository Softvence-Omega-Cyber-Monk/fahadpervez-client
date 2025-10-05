import { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardNav from "./SellerDashboardNav";
import SideBar from "./Sidebar";

const SellerDashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <div className="flex w-full min-h-screen bg-[#F1F5F8]">
      {/* Sidebar */}
      <SideBar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <DashboardNav onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

        {/* Page content */}
        <div className="flex-1 p-4 md:p-8 mt-20 md:mt-16">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SellerDashboardLayout;
