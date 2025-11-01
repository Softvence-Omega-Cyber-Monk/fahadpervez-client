import { useGetMyOrderStatsQuery } from "@/Redux/Features/Order/Order.api"
import CartSummary from "../components/Dashboard/CartSummary"
import DashboardStats from "../components/Dashboard/OrderStats"
import RecentActivity from "../components/Dashboard/RecentActivity"
import RecentOrderStatus from "../components/Dashboard/RecentOrderStatus"


const Dashboard = () => {

const {data}=useGetMyOrderStatsQuery([])

console.log(data)
  return (
    <div>
     <DashboardStats/>
     <RecentOrderStatus data={data}/>
     <div className="flex gap-x-4">
      <CartSummary/>
     <RecentActivity/>
     </div>
    </div>
  )
}

export default Dashboard