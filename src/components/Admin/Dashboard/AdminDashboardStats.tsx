import Statistics from "../../../common/Statistics";
import StatsCard from "../../../common/StatsCard";
import { StatCardTypes } from "@/types/SellerDashboardTypes/StatsCardTypes";

const AdminDashboardStats = () => {
  const mockStats: StatCardTypes[] = [
    {
      id: "1",
      title: "Total Sales",
      value: 12345,
      type: "up",
      status: "2.5% from last month",
      icon: "dollar",
    },
    {
      id: "2",
      title: "Total Orders",
      value: 5678,
      type: "down",
      status: "1.2% from last month",
      icon: "box",
    },
    {
      id: "3",
      title: "Pending Orders",
      value: 123,
      type: "warning",
      status: "Needs attention",
      icon: "alert",
    },
    {
      id: "4",
      title: "New Customers",
      value: 456,
      type: "up",
      status: "5% from last month",
      icon: "plus",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
      {mockStats.map((stat, index) => (
        <StatsCard key={index} item={stat} />
      ))}
      <Statistics items={mockStats} />
    </div>
  );
};

export default AdminDashboardStats;
