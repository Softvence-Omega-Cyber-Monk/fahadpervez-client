import { Outlet } from "react-router-dom";
import DashboardNav from "../components/DashboardNav";
import SideBar from "../components/Sidebar";


const AdminDashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar on the left */}
      <SideBar/>

      {/* Right side: full width from Sidebar's end */}
      <div className="flex-1 flex flex-col bg-gray-50 min-h-screen">
        {/* Topbar */}
        <DashboardNav />

        {/* Main content below the topbar */}
        <div className="p-6">
          <Outlet/>
          {/* Add more content here */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
