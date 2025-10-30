import { useParams } from "react-router-dom"
import RecentOrderStatus from "../components/Dashboard/RecentOrderStatus"
import HelpCard from "../components/ProductDetails/HelpCard"
import OrderStatusTracker from "../components/ProductDetails/OrderStatusTracker"
import PaymentInformation from "../components/ProductDetails/PaymentInformation"
import ShippingInformation from "../components/ProductDetails/ShippingInformation"
import { useTrackByOrderNumberQuery } from "@/Redux/Features/Order/Order.api"
import { Spinner } from "@/components/ui/spinner"

const OrderDetails = () => {
    const { id } = useParams()
    console.log(id)
    const {data,isLoading} = useTrackByOrderNumberQuery({id});
    if(isLoading) return <div className="min-h-40 grid place-content-center"><Spinner /></div>
    console.log(data?.data)
    return (
        <div>   
            <RecentOrderStatus />
            <OrderStatusTracker />
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Left side */}
                <div className="w-full lg:w-1/2">
                    <ShippingInformation />
                </div>
                {/* Right side */}
                <div className="w-full lg:w-1/2 space-y-4">
                    <PaymentInformation />
                    <HelpCard />
                </div>
            </div>
        </div>
    )
}

export default OrderDetails