
// import { useParams } from "react-router-dom";
// import RecentOrderStatus from "../components/Dashboard/RecentOrderStatus";
// import OrderStatusTracker from "../components/ProductDetails/OrderStatusTracker";
// import PaymentInformation from "../components/ProductDetails/PaymentInformation";
// import ShippingInformation from "../components/ProductDetails/ShippingInformation";
// import HelpCard from "../components/ProductDetails/HelpCard";
// import { Spinner } from "@/components/ui/spinner";
// import { useTrackByOrderNumberQuery } from "@/Redux/Features/Order/Order.api";

// const OrderDetails = () => {
//   const { id } = useParams<{ id: string }>();

//   const { data: orderData, isLoading } = useTrackByOrderNumberQuery({ id });

//   if (isLoading) {
//     return (
//       <div className="min-h-40 grid place-content-center">
//         <Spinner />
//       </div>
//     );
//   }

//   if (!orderData?.data) {
//     return <p className="text-center mt-10 text-gray-500">Order not found.</p>;
//   }

//   const order = orderData.data;

//   return (
//     <div className="space-y-6">
//       {/* Recent Order Status */}
//       <RecentOrderStatus data={order} />

//       {/* Order Tracker */}
//       <OrderStatusTracker data={order} />

//       {/* Left & Right Sections */}
//       <div className="flex flex-col lg:flex-row gap-4">
//         <div className="w-full lg:w-1/2">
//           <ShippingInformation shippingData={order.shipping} />
//         </div>
//         <div className="w-full lg:w-1/2 space-y-4">
//           <PaymentInformation paymentData={order.payment} />
//           <HelpCard />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderDetails;





// import { useParams } from "react-router-dom";
// import RecentOrderStatus from "../components/Dashboard/RecentOrderStatus";
// import HelpCard from "../components/ProductDetails/HelpCard";
// import OrderStatusTracker from "../components/ProductDetails/OrderStatusTracker";
// import PaymentInformation from "../components/ProductDetails/PaymentInformation";
// import ShippingInformation from "../components/ProductDetails/ShippingInformation";
// import { Spinner } from "@/components/ui/spinner";
// import { useGetRecentOrdersAdminAndVendorQuery, useTrackByOrderNumberQuery } from "@/Redux/Features/Order/Order.api";

// const OrderDetails = () => {
//   const { id } = useParams();
// console.log(id)
//   // Fetch order by ID
//   const { data: orderData, isLoading: isOrderLoading } = useTrackByOrderNumberQuery({ id });
// console.log(orderData)
//   // Fetch recent orders
//   const { data: recentOrdersData } = useGetRecentOrdersAdminAndVendorQuery({id});
// console.log(recentOrdersData)
//   if (isOrderLoading) {
//     return (
//       <div className="min-h-40 grid place-content-center">
//         <Spinner />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Recent Order Status */}
//       <RecentOrderStatus data={orderData?.data} />

//       {/* Order Tracker */}
//       <OrderStatusTracker data={orderData?.data} />

//       {/* Left and Right Sections */}
//       <div className="flex flex-col lg:flex-row gap-4">
//         {/* Left side */}
//         <div className="w-full lg:w-1/2">
//           <ShippingInformation shippingData={orderData?.data?.shipping} />
//         </div>

//         {/* Right side */}
//         <div className="w-full lg:w-1/2 space-y-4">
//           <PaymentInformation paymentData={orderData?.data?.payment} />
//           <HelpCard />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderDetails;









import { useParams } from "react-router-dom"
import RecentOrderStatus from "../components/Dashboard/RecentOrderStatus"
import HelpCard from "./ProductDetails/HelpCard"
import OrderStatusTracker from "./ProductDetails/OrderStatusTracker"
import PaymentInformation from "./ProductDetails/PaymentInformation"
import ShippingInformation from "./ProductDetails/ShippingInformation"
import { useTrackByOrderNumberQuery } from "@/Redux/Features/Order/Order.api"
import { Spinner } from "@/components/ui/spinner"

const OrderDetails = () => {
    const { id } = useParams()
    console.log(id)
    const {data,isLoading} = useTrackByOrderNumberQuery({id});
      
    console.log(data)
    if(isLoading) return <div className="min-h-40 grid place-content-center"><Spinner /></div>
    return (
        <div>   
            <RecentOrderStatus data = {data?.data} />
            <OrderStatusTracker data = {data?.data}/>
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Left side */}
                <div className="w-full lg:w-1/2">
                    <ShippingInformation data = {data?.data}/>
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