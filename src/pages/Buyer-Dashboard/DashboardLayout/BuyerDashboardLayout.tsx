import { Outlet } from "react-router-dom";
import DashboardNav from "../components/DashboardNav";
import SideBar from "../components/Sidebar";

const BuyerDashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#F1F5F8]">
      <SideBar/>
      <div className="flex-1 flex flex-col bg-gray-50 min-h-screen">
        <DashboardNav />
        <div className="p-8">
        <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboardLayout;




