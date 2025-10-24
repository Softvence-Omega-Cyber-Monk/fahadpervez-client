import InventoryAlerts from "../components/Dashboard/InventoryAlerts";
import RecentOrders from "../components/Dashboard/RecentOrders";
import RevenueOverview from "../components/Dashboard/RevenueOverview";
import SalesAnalytics from "../components/Dashboard/SalesAnalytics";
import Stats from "../components/Dashboard/Stats";
import TopProducts from "../components/Dashboard/TopProducts";

const Dashboard = () => {
  return (
    <div className=" space-y-15">
      <Stats />
      <div className="flex flex-col md:flex-row w-full gap-6 items-start">
        <div className="flex-2 w-full">
          <RecentOrders />
        </div>
        <div className="flex-1 w-full">
          <TopProducts />
        </div>
      </div>
      <RevenueOverview/>
      <SalesAnalytics/>
      <InventoryAlerts/>
    </div>
  );
};

export default Dashboard;
