import OrderSearchBar from "@/common/OrderSearchBar";
import OrderTable from "@/common/OrderTable";
import OrderTabs from "@/common/OrderTabs";
import Statistics from "@/common/Statistics";
import OrderCardData from "@/utils/SellerDashboardData/OrderCardData.json"


const OrderLandingPage = () => {
  return (
    <div className="space-y-10">
      <Statistics items={OrderCardData} />
      <OrderTabs/>
      <OrderSearchBar tableType="filter"/>
      <OrderTable />
    </div>
  )
}

export default OrderLandingPage
