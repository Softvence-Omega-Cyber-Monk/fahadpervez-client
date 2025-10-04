import CartSummary from "../components/Dashboard/CartSummary"
import DashboardStats from "../components/Dashboard/OrderStats"
import RecentActivity from "../components/Dashboard/RecentActivity"
import RecentOrderStatus from "../components/Dashboard/RecentOrderStatus"


const Dashboard = () => {
  return (
    <div>
     <DashboardStats/>
     <RecentOrderStatus/>
     <div className="flex gap-x-4">
      <CartSummary/>
     <RecentActivity/>
     </div>
    </div>
  )
}

export default Dashboard