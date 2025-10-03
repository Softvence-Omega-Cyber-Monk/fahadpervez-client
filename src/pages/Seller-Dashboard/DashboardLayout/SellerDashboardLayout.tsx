import { Outlet } from "react-router-dom";
import SideBar from "./Sidebar";
import SellerDashboardNav from "./SellerDashboardNav";


const SellerDashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar on the left */}
      <SideBar/>

      {/* Right side: full width from Sidebar's end */}
      <div className="flex-1 flex flex-col bg-gray-50 min-h-screen">
        {/* Topbar */}
        <SellerDashboardNav />
        {/* Main content below the topbar */}
        <div className="p-10 bg-primary-background min-h-screen">
        <Outlet/>
          {/* Add more content here */}
        </div>
      </div>
    </div>
  );
};

export default SellerDashboardLayout;
