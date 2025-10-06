import AdminDashboardHeader from "../../components/Admin/Dashboard/AdminDashboardHeader";
import AdminDashboardStats from "../../components/Admin/Dashboard/AdminDashboardStats";
import AdminDashboardRecentOrders from "../../components/Admin/Dashboard/AdminDashboardRecentOrders";
import AdminDashboardTopProducts from "../../components/Admin/Dashboard/AdminDashboardTopProducts";

const AdminDashboard = () => {
  return (
    <div className="p-5">
      <AdminDashboardHeader />
      <AdminDashboardStats />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AdminDashboardRecentOrders />
        <AdminDashboardTopProducts />
      </div>
    </div>
  );
};

export default AdminDashboard;