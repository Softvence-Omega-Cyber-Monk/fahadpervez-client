import OrderSearchBar from "@/common/OrderSearchBar";
import OrderTable from "@/common/OrderTable";
import OrderTabs from "@/common/OrderTabs";
import Statistics from "@/common/Statistics";
import { Spinner } from "@/components/ui/spinner";
import { useGetAllOrdersByAdminAndVendorQuery } from "@/Redux/Features/Order/Order.api";
import { Order } from "@/types/OrderTypes";
import OrderCardData from "@/utils/SellerDashboardData/OrderCardData.json";
import { useState } from "react";

const OrderLandingPage = () => {
  const [status, setStatus] = useState("");

  const { data, isLoading } = useGetAllOrdersByAdminAndVendorQuery({
    status,
  });

  if (isLoading) return <Spinner />;

  const orders: Order[] = data?.data || [];

  // --- Dynamic Order Counts ---
  const allCount = data?.count || 0;
  const pendingCount = orders.filter((order) => order.status === "Pending").length;
  const completeCount = orders.filter((order) => order.status === "Confirmed").length;
  const cancelCount = orders.filter((order) => order.status === "Cancelled").length;

  // --- Merge Dynamic Values into Static Data ---
  const orderCardData = OrderCardData.map((item) => {
    switch (item.id) {
      case "allCount":
        return { ...item, value: allCount };
      case "pendingCount":
        return { ...item, value: pendingCount };
      case "completeCount":
        return { ...item, value: completeCount };
      case "cancelCount":
        return { ...item, value: cancelCount };
      default:
        return item;
    }
  });

  return (
    <div className="space-y-10">
      <Statistics items={orderCardData} />
      <OrderTabs setStatus={setStatus} status={status} />
      <OrderSearchBar tableType="filter" />
      <OrderTable data={orders} />
    </div>
  );
};

export default OrderLandingPage;
