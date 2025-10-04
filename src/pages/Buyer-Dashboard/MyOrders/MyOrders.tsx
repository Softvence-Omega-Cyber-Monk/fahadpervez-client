
import OrderSearchBar from "../components/MyOrders/OrderSearchBar"
import OrderTable from "../components/MyOrders/OrderTable"
import OrderTabs from "../components/MyOrders/OrderTabs"
import Pagination from "../components/MyOrders/Pagination"


const MyOrders = () => {
  return (
     <div>
      <div>
      <OrderTabs />
    </div>
    <OrderSearchBar/>
    <OrderTable/>
    <Pagination/>
     </div>
  )
}

export default MyOrders