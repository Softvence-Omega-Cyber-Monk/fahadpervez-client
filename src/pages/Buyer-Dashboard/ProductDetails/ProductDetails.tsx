import HelpCard from "../DashboardProductDetails/ProductDetails/HelpCard"
import OrderStatusTracker from "../DashboardProductDetails/ProductDetails/OrderStatusTracker"
import PaymentInformation from "../DashboardProductDetails/ProductDetails/PaymentInformation"
import RecentOrderStatus from "../DashboardProductDetails/ProductDetails/RecentOrderStatus"
import ShippingInformation from "../DashboardProductDetails/ProductDetails/ShippingInformation"

const ProductDetails = () => {
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

export default ProductDetails