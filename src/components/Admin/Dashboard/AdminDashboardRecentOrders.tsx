import OrderTable from "../../../common/OrderTable";
import PrimaryButton from "../../../common/PrimaryButton";

const AdminDashboardRecentOrders = () => {
  return (
    <div className="mt-5">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Recent Orders</h2>
        <PrimaryButton
          type="button"
          title="View All"
          className="px-5 py-2 rounded-md"
        />
      </div>
      <div className="mt-3">
        <OrderTable />
      </div>
    </div>
  );
};

export default AdminDashboardRecentOrders;
