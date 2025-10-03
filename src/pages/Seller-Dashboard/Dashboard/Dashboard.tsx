import RecentOrders from "../components/Dashboard/RecentOrders";
import Stats from "../components/Dashboard/Stats";
import TopProducts from "../components/Dashboard/TopProducts";

const Dashboard = () => {
  return (
    <div className=" space-y-15">
      <Stats />
      <div className="flex w-full gap-6 items-start">
        <div className="flex-2">
          <RecentOrders />
        </div>
        <div className="flex-1">
          <TopProducts />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
