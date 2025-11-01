

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Package, Clock, Truck, CheckCircle, AlertCircle } from "lucide-react";
import {
  useGetOrderByIdAdminQuery,
  useCancelOrderByIdMutation,
} from "@/Redux/Features/Order/Order.api";
// import { FaArrowRightArrowLeft } from "react-icons/fa6";
import {  FaArrowRight } from "react-icons/fa";

const AdminOrderDetails = () => {
  const { id } = useParams<{ id: string }>();
    console.log(id)
  if (!id)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Invalid order ID in URL</p>
      </div>
    );

  const { data: orderData, isLoading, isError, refetch } =
    useGetOrderByIdAdminQuery({id});
console.log(orderData)
  const [cancelOrder, { isLoading: isCancelling }] = useCancelOrderByIdMutation();
  const [isCancelled, setIsCancelled] = useState(false);

  const order = orderData?.data || orderData;
  const buyer = order?.user || order?.buyer || {};
  const seller = order?.vendor || order?.seller || {};
  const shipping = order?.shippingAddress || order?.shipping || {};
  const products = order?.orderItems || order?.products || [];
  const orderStatus = (order?.status || "PENDING").toUpperCase();
//   const paymentStatus = (order?.paymentStatus || "PENDING").toUpperCase();

  useEffect(() => {
    setIsCancelled(orderStatus === "CANCELLED");
  }, [orderStatus]);

  const handleCancelOrder = async () => {
    try {
      await cancelOrder({ orderId: order._id, reason: "Cancelled by admin" }).unwrap();
      setIsCancelled(true);
      refetch();
    } catch (err) {
      console.error("Cancel order failed:", err);
    }
  };

//   const subtotal = products.reduce((sum:any, item:any) => sum + (item.price * item.quantity || 0), 0);
//   const shippingCost = order?.shippingCost || 40;
//   const discount = order?.discount || 0;
//   const tax = order?.tax || 0;
//   const total = order?.totalAmount || subtotal + shippingCost - discount + tax;

  const getTimeline = () => {
    // Map your status to the required timeline steps.
    // I'm using "Order placed", "Processing" (which corresponds to your image's "Preparing for shipment"), "Shipped" ("Out of delivery"), "Delivered".
    const statuses = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED"];
    const currentIndex = statuses.indexOf(orderStatus);

    return [
      {
        label: "Order placed",
        date: order?.createdAt ? new Date(order.createdAt).toLocaleString("en-US", { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : "N/A",
        status: currentIndex >= 0 ? "completed" : "pending",
        icon: Package,
      },
      {
        // This corresponds to "Preparing for shipment" from the image
        label: "Preparing for shipment", 
        date: order?.processingAt ? new Date(order.processingAt).toLocaleString("en-US", { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : "Pending",
        status: currentIndex > 0 ? "completed" : currentIndex === 0 ? "current" : "pending",
        icon: Clock,
      },
      {
        // This corresponds to "Out of delivery" from the image
        label: "Out of delivery",
        date: order?.shippedAt ? new Date(order.shippedAt).toLocaleString("en-US", { month: '2-digit', day: '2-digit', year: 'numeric' }) : "Estimate 21 june, 2025",
        status: currentIndex > 1 ? "completed" : currentIndex === 1 ? "current" : "pending",
        icon: Truck,
      },
      {
        label: "Delivered",
        date: order?.deliveredAt ? new Date(order.deliveredAt).toLocaleString("en-US", { month: '2-digit', day: '2-digit', year: 'numeric' }) : "Estimate 21 june, 25",
        status: currentIndex > 2 ? "completed" : currentIndex === 2 ? "current" : "pending",
        icon: CheckCircle,
      },
    ];
  };

  const timelineSteps = getTimeline();
  const completedStepsCount = timelineSteps.filter(step => step.status === "completed").length;
  const currentStepIndex = timelineSteps.findIndex(step => step.status === "current");
  // Calculate line progress width based on completed steps (0 to 3) + half of the current step
  const progress = completedStepsCount + (currentStepIndex !== -1 ? 0.5 : 0);
  const totalSteps = timelineSteps.length;
  const progressPercentage = (progress / (totalSteps - 1)) * 100;
  // Clamp the value to 0-100% just in case
  const clampedProgressPercentage = Math.max(0, Math.min(100, progressPercentage));


  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );

  if (isError || !order)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600">Failed to load order details</p>
          <button
            onClick={() => refetch()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto">
    <div className="flex items-center gap-2">
        order <FaArrowRight/> Order Details
    </div>
        <div className="mb-6 flex justify-between items-center">
          {/* <div className="text-sm text-gray-500 mb-2">Orders &gt; Order details</div> */}
          <h1 className="text-2xl font-semibold">Order Details</h1>
           <h3 className="font-semibold mb-4">Order ID: {order?.orderNumber || id}</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols- gap-6">
          {/* Left Column */}
          <div className=" space-y-6">
            {/* Buyer/Seller/Shipping */}
            <div className="bg-white rounded-lg p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className=" p-4 bg-[#E6F3FF] rounded-md">
                <h3 className="font-semibold mb-3 border-b-1 pb-3 text-center border-b-[#a7c4df]">Buyer</h3>
                <div className="space-y-1 text-sm">
                  <div className="font-medium">{buyer.name || "N/A"}</div>
                  <div className="text-gray-600">{buyer.email || "N/A"}</div>
                  <div className="text-gray-600">{buyer.phone || "N/A"}</div>
                </div>
              </div>
              <div className=" p-4 bg-[#E6F3FF] rounded-md">
                <h3 className="font-semibold mb-3 border-b-1 pb-3 text-center border-b-[#a7c4df]">Seller</h3>
                <div className="space-y-1 text-sm">
                  <div className="font-medium">{seller.name || "N/A"}</div>
                  <div className="text-gray-600">{seller.email || "N/A"}</div>
                  <div className="text-gray-600">{seller.phone || "N/A"}</div>
                </div>
              </div>
              <div className=" p-4 bg-[#E6F3FF] rounded-md">
                <h3 className="font-semibold mb-3 border-b-1 pb-3 text-center border-b-[#a7c4df]">Shipping Details</h3>
                <div className="space-y-1 text-sm">
                  <div className="text-gray-600">{shipping.address || "N/A"}</div>
                  <div className="text-gray-600">
                    {shipping.city || "N/A"}, {shipping.country || "N/A"}
                  </div>
                  <div className="text-gray-600">
                    Postal code: {shipping.postalCode || "N/A"}
                  </div>
                </div>
              </div>

 
              <div className="p-4 bg-[#E6F3FF] rounded-md">
                 <h3 className="font-semibold mb-3 border-b-1 pb-3 text-center border-b-[#a7c4df]">Order date</h3>

                  <span className="text-gray-600">Order date:</span>
                  <span>{order?.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}</span>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Product Summary</h3>
                <button
                  onClick={handleCancelOrder}
                  disabled={isCancelling || isCancelled}
                  className={`flex items-center gap-1 text-sm ${
                    isCancelled
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-red-500 hover:text-red-600"
                  }`}
                >
                  <AlertCircle className="w-4 h-4" />
                  {isCancelled ? "Cancelled" : isCancelling ? "Cancelling..." : "Cancel Order"}
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b">
                    <tr className="text-left text-gray-600">
                      <th className="pb-3 font-medium">#</th>
                      <th className="pb-3 font-medium">Product</th>
                      <th className="pb-3 font-medium text-center">Qty</th>
                      <th className="pb-3 font-medium text-right">Price</th>
                      <th className="pb-3 font-medium text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {products.length ? (
                      products.map((p :any, i:any) => (
                        <tr key={p._id || i}>
                          <td className="py-3">{String(i + 1).padStart(2, "0")}</td>
                          <td className="py-3">{p.name || "N/A"}</td>
                          <td className="py-3 text-center">{p.quantity}</td>
                          <td className="py-3 text-right">${p.price}</td>
                          <td className="py-3 text-right">${(p.price * p.quantity).toFixed(2)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-6 text-center text-gray-500">
                          No products found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-lg">
                  Order <span
                    className={`text-sm py-1 px-2 rounded-full font-medium ${
                      orderStatus === "DELIVERED"
                        ? "bg-green-100 text-green-700"
                        : orderStatus === "CANCELLED"
                        ? "bg-red-100 text-red-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {orderStatus}
                  </span>
                </h3>
                <button className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
                  Update order status
                </button>
              </div>


              {/* New Timeline Structure */}
              <div className="flex justify-between w-full relative pt-8">
                {/* Base Line (Gray) - Positioned absolutely under the steps */}
                <div className="absolute top-13 w-6xl left-38 right-0 h-1 bg-gray-300 mx-5" style={{ zIndex: 0 }} />
                
                {/* Progress Line (Purple) - Width based on completed/current steps */}
                <div 
                  className={`absolute top-13 w-6xl left-38 right-0 h-1   bg-purple-500 mx-5 transition-width duration-500 ease-in-out`}
                  style={{ width: `calc(${clampedProgressPercentage}% - 22rem)`, zIndex: 0 }} // Subtracting ~20px for margin/padding
                />

                {timelineSteps.map((step, i) => (
                  <div 
                    key={i} 
                    className="flex flex-col items-center flex-1 relative z-10 min-w-0"
                  >
                    {/* Status Circle - z-10 ensures it sits above the absolute line */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 z-20 ${
                        step.status === "completed"
                          ? "bg-purple-500"
                          : step.status === "current"
                          ? "bg-orange-500"
                          : "bg-gray-300"
                      }`}
                    >
                      <step.icon className="w-5 h-5 text-white" />
                    </div>
                    
                    {/* Status Label and Date */}
                    <div className="text-center w-full max-w-[120px] mx-auto">
                      <div className="font-medium text-sm text-gray-800">{step.label}</div>
                      <div className="text-gray-500 text-xs mt-1">{step.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
           
            
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetails;










// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Package, Clock, Truck, CheckCircle, AlertCircle } from "lucide-react";
// import {
//   useGetOrderByIdAdminQuery,
//   useCancelOrderByIdMutation,
// } from "@/Redux/Features/Order/Order.api";
// import { FaArrowRightArrowLeft } from "react-icons/fa6";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// const AdminOrderDetails = () => {
//   const { id } = useParams<{ id: string }>();
//     console.log(id)
//   if (!id)
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <p className="text-gray-600">Invalid order ID in URL</p>
//       </div>
//     );

//   const { data: orderData, isLoading, isError, refetch } =
//     useGetOrderByIdAdminQuery({id});
// console.log(orderData)
//   const [cancelOrder, { isLoading: isCancelling }] = useCancelOrderByIdMutation();
//   const [isCancelled, setIsCancelled] = useState(false);

//   const order = orderData?.data || orderData;
//   const buyer = order?.user || order?.buyer || {};
//   const seller = order?.vendor || order?.seller || {};
//   const shipping = order?.shippingAddress || order?.shipping || {};
//   const products = order?.orderItems || order?.products || [];
//   const orderStatus = (order?.status || "PENDING").toUpperCase();
//   const paymentStatus = (order?.paymentStatus || "PENDING").toUpperCase();

//   useEffect(() => {
//     setIsCancelled(orderStatus === "CANCELLED");
//   }, [orderStatus]);

//   const handleCancelOrder = async () => {
//     try {
//       await cancelOrder({ orderId: order._id, reason: "Cancelled by admin" }).unwrap();
//       setIsCancelled(true);
//       refetch();
//     } catch (err) {
//       console.error("Cancel order failed:", err);
//     }
//   };

//   const subtotal = products.reduce((sum:any, item:any) => sum + (item.price * item.quantity || 0), 0);
//   const shippingCost = order?.shippingCost || 40;
//   const discount = order?.discount || 0;
//   const tax = order?.tax || 0;
//   const total = order?.totalAmount || subtotal + shippingCost - discount + tax;

//   const getTimeline = () => {
//     const statuses = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED"];
//     const currentIndex = statuses.indexOf(orderStatus);

//     return [
//       {
//         label: "Order placed",
//         date: order?.createdAt ? new Date(order.createdAt).toLocaleString() : "N/A",
//         status: currentIndex >= 0 ? "completed" : "pending",
//         icon: Package,
//       },
//       {
//         label: "Processing",
//         date: order?.processingAt ? new Date(order.processingAt).toLocaleString() : "Pending",
//         status: currentIndex >= 1 ? "completed" : currentIndex === 0 ? "current" : "pending",
//         icon: Clock,
//       },
//       {
//         label: "Shipped",
//         date: order?.shippedAt ? new Date(order.shippedAt).toLocaleString() : "Estimated",
//         status: currentIndex >= 2 ? "completed" : currentIndex === 1 ? "current" : "pending",
//         icon: Truck,
//       },
//       {
//         label: "Delivered",
//         date: order?.deliveredAt ? new Date(order.deliveredAt).toLocaleString() : "Estimated",
//         status: currentIndex >= 3 ? "completed" : currentIndex === 2 ? "current" : "pending",
//         icon: CheckCircle,
//       },
//     ];
//   };

//   if (isLoading)
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading order details...</p>
//         </div>
//       </div>
//     );

//   if (isError || !order)
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
//           <p className="text-gray-600">Failed to load order details</p>
//           <button
//             onClick={() => refetch()}
//             className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="mx-auto">
//     <div className="flex items-center gap-2">
//         order <FaArrowRight/> Order Details
//     </div>
//         <div className="mb-6 flex justify-between items-center">
//           {/* <div className="text-sm text-gray-500 mb-2">Orders &gt; Order details</div> */}
//           <h1 className="text-2xl font-semibold">Order Details</h1>
//            <h3 className="font-semibold mb-4">Order ID: {order?.orderNumber || id}</h3>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols- gap-6">
//           {/* Left Column */}
//           <div className=" space-y-6">
//             {/* Buyer/Seller/Shipping */}
//             <div className="bg-white rounded-lg p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
//               <div className=" p-4 bg-[#E6F3FF] rounded-md">
//                 <h3 className="font-semibold mb-3 border-b-1 pb-3 text-center border-b-[#a7c4df]">Buyer</h3>
//                 <div className="space-y-1 text-sm">
//                   <div className="font-medium">{buyer.name || "N/A"}</div>
//                   <div className="text-gray-600">{buyer.email || "N/A"}</div>
//                   <div className="text-gray-600">{buyer.phone || "N/A"}</div>
//                 </div>
//               </div>
//               <div className=" p-4 bg-[#E6F3FF] rounded-md">
//                 <h3 className="font-semibold mb-3 border-b-1 pb-3 text-center border-b-[#a7c4df]">Seller</h3>
//                 <div className="space-y-1 text-sm">
//                   <div className="font-medium">{seller.name || "N/A"}</div>
//                   <div className="text-gray-600">{seller.email || "N/A"}</div>
//                   <div className="text-gray-600">{seller.phone || "N/A"}</div>
//                 </div>
//               </div>
//               <div className=" p-4 bg-[#E6F3FF] rounded-md">
//                 <h3 className="font-semibold mb-3 border-b-1 pb-3 text-center border-b-[#a7c4df]">Shipping Details</h3>
//                 <div className="space-y-1 text-sm">
//                   <div className="text-gray-600">{shipping.address || "N/A"}</div>
//                   <div className="text-gray-600">
//                     {shipping.city || "N/A"}, {shipping.country || "N/A"}
//                   </div>
//                   <div className="text-gray-600">
//                     Postal code: {shipping.postalCode || "N/A"}
//                   </div>
//                 </div>
//               </div>

 
//               <div className="p-4 bg-[#E6F3FF] rounded-md">
//                  <h3 className="font-semibold mb-3 border-b-1 pb-3 text-center border-b-[#a7c4df]">Order date</h3>

//                   <span className="text-gray-600">Order date:</span>
//                   <span>{order?.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}</span>
               

     
              
           
//           </div>


//             </div>

//             {/* Products Table */}
//             <div className="bg-white rounded-lg p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="font-semibold">Product Summary</h3>
//                 <button
//                   onClick={handleCancelOrder}
//                   disabled={isCancelling || isCancelled}
//                   className={`flex items-center gap-1 text-sm ${
//                     isCancelled
//                       ? "text-gray-400 cursor-not-allowed"
//                       : "text-red-500 hover:text-red-600"
//                   }`}
//                 >
//                   <AlertCircle className="w-4 h-4" />
//                   {isCancelled ? "Cancelled" : isCancelling ? "Cancelling..." : "Cancel Order"}
//                 </button>
//               </div>

//               <div className="overflow-x-auto">
//                 <table className="w-full text-sm">
//                   <thead className="border-b">
//                     <tr className="text-left text-gray-600">
//                       <th className="pb-3 font-medium">#</th>
//                       <th className="pb-3 font-medium">Product</th>
//                       <th className="pb-3 font-medium text-center">Qty</th>
//                       <th className="pb-3 font-medium text-right">Price</th>
//                       <th className="pb-3 font-medium text-right">Subtotal</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y">
//                     {products.length ? (
//                       products.map((p :any, i:any) => (
//                         <tr key={p._id || i}>
//                           <td className="py-3">{String(i + 1).padStart(2, "0")}</td>
//                           <td className="py-3">{p.name || "N/A"}</td>
//                           <td className="py-3 text-center">{p.quantity}</td>
//                           <td className="py-3 text-right">${p.price}</td>
//                           <td className="py-3 text-right">${(p.price * p.quantity).toFixed(2)}</td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan={5} className="py-6 text-center text-gray-500">
//                           No products found
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* Timeline */}
//             <div className="bg-white rounded-lg p-6">
//               <h3 className="font-semibold mb-6">
//                 Order <span
//                   className={`${
//                     orderStatus === "DELIVERED"
//                       ? "text-green-500"
//                       : orderStatus === "CANCELLED"
//                       ? "text-red-500"
//                       : "text-orange-500"
//                   }`}
//                 >
//                   {orderStatus}
//                 </span>
//               </h3>

//               <div className="space-y-4 flex">
//                 {getTimeline().map((step, i) => (
//                   <div key={i} className="flex gap-4">
//                     <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
//                       step.status === "completed"
//                         ? "bg-purple-500"
//                         : step.status === "current"
//                         ? "bg-orange-500"
//                         : "bg-gray-300"
//                     }`}>
//                       <step.icon className="w-5 h-5 text-white" />
//                     </div>
//                     <div>
//                       <div className="font-medium">{step.label}</div>
//                       <div className="text-gray-500 text-sm">{step.date}</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Right Column */}
           
            
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminOrderDetails;

















// import  { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Package, Clock, Truck, CheckCircle, AlertCircle } from "lucide-react";
// import {
//   useGetOrderByIdAdminQuery,
//   useDeleteOrderByIdAdminMutation,
//   useUpdateOrderStatusAdminMutation,
//   useUpdateOrderPaymentStatusAdminMutation,
//   useCancelOrderByIdMutation,
// } from "@/Redux/Features/Order/Order.api";
// import { useGetAllBuyersQuery, useGetAllSellersQuery } from "@/Redux/Features/user/user.api";
  
// const AdminOrderDetails = () => {
//   const { id } = useParams<{ id: string }>();
//    // ✅ Handle missing ID
//   if (!id) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <p className="text-gray-600">Invalid order ID in URL</p>
//       </div>
//     );
//   }

//   // ✅ Fetch order data
//   const {
//     data: orderData,
//     isLoading,
//     isError,
//     error,
//     refetch,
//   } = useGetOrderByIdAdminQuery({ id });

// console.log(orderData?.userId)
// // const  {data:AllBuyers,}=useGetAllBuyersQuery()
// // const {data:AllSellers }= useGetAllSellersQuery()
// // console.log(AllBuyers)
// // console.log(AllSellers) 

//   // ✅ Mutations
//   const [cancelOrder, { isLoading: isCancelling }] = useCancelOrderByIdMutation();
// //   const [deleteOrderByAdmin] = useDeleteOrderByIdAdminMutation();
// //   const [updateOrderStatus] = useUpdateOrderStatusAdminMutation();
// //   const [updateOrderPaymentStatus] = useUpdateOrderPaymentStatusAdminMutation();

//   // ✅ Debug
//   useEffect(() => {
//     console.group("📦 Order Details Debug");
//     console.log("🆔 URL Order ID:", id);
//     console.log("📊 API Response:", orderData);
//     console.log("⏳ Loading:", isLoading);
//     if (isError) console.error("❌ Error details:", error);
//     console.groupEnd();
//   }, [id, orderData, isLoading, isError, error]);

//   // ✅ Normalize order structure
//   const order = orderData?.data || orderData;
//   console.log(order)
//   const buyer = order?.user || order?.buyer;
 
//   const seller = order?.vendor || order?.seller;
//   const shippingDetails = order?.shippingAddress || order?.shipping;
//   console.log(shippingDetails)
//   const products = order?.orderItems || order?.products || [];
//   const orderStatus = order?.status || "PENDING";
//   const paymentStatus = order?.paymentStatus || "PENDING";
 
//   // ✅ Handle Cancel button state
//   const [isCancelled, setIsCancelled] = useState(order?.status === "cancelled");

//   // ✅ Cancel order handler
//   const handleCancelOrder = async (orderId: string) => {
//     try {
//       const res = await cancelOrder({ orderId }).unwrap();
//       console.log("✅ Order cancelled successfully:", res);
//       setIsCancelled(true);
//       refetch();
//     } catch (err) {
//       console.error("❌ Cancel order error:", err);
//     }
//   };

//   // ✅ Download receipt placeholder
//   const handleDownloadReceipt = () => {
//     console.log("📥 Downloading receipt for order:", id);
//     // TODO: implement PDF download logic
//   };

//   // ✅ Loading state
//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading order details...</p>
//         </div>
//       </div>
//     );
//   }

//   // ✅ Error state
//   if (isError || !orderData) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
//           <p className="text-gray-600">Failed to load order details</p>
//           <button
//             onClick={() => refetch()}
//             className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // ✅ Calculations
//   const subtotal = products.reduce(
//     (sum: number, item: any) => sum + (item.price * item.quantity || 0),
//     0
//   );
//   const shipping = order?.shippingCost || 40;
//   const discount = order?.discount || 0;
//   const tax = order?.tax || 0;
//   const total = order?.totalAmount || subtotal + shipping - discount + tax;

//   const getTimeline = () => {
//     const statuses = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED"];
//     const currentIndex = statuses.indexOf(orderStatus);

//     return [
//       {
//         label: "Order placed",
//         date: new Date(order?.createdAt).toLocaleString() || "N/A",
//         status: currentIndex >= 0 ? "completed" : "pending",
//         icon: Package,
//       },
//       {
//         label: "Preparing for shipment",
//         date: order?.processingAt
//           ? new Date(order.processingAt).toLocaleString()
//           : "Pending",
//         status:
//           currentIndex >= 1
//             ? "completed"
//             : currentIndex === 0
//             ? "current"
//             : "pending",
//         icon: Clock,
//       },
//       {
//         label: "Out for delivery",
//         date: order?.shippedAt
//           ? new Date(order.shippedAt).toLocaleString()
//           : "Estimated",
//         status:
//           currentIndex >= 2
//             ? "completed"
//             : currentIndex === 1
//             ? "current"
//             : "pending",
//         icon: Truck,
//       },
//       {
//         label: "Delivered",
//         date: order?.deliveredAt
//           ? new Date(order.deliveredAt).toLocaleString()
//           : "Estimated",
//         status:
//           currentIndex >= 3
//             ? "completed"
//             : currentIndex === 2
//             ? "current"
//             : "pending",
//         icon: CheckCircle,
//       },
//     ];
//   };




//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className=" mx-auto ">
//         {/* Header */}
//         <div className="mb-6">
//           <div className="text-sm text-gray-500 mb-2">
//             Orders &gt; Order details
//           </div>
//           <h1 className="text-2xl font-semibold">Order Details</h1>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Left Column */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Buyer, Seller, Shipping */}
//             <div className="bg-white rounded-lg p-6">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {/* Buyer */}
//                 <div>
//                   <h3 className="font-semibold mb-3">Buyer</h3>
//                   <div className="space-y-1 text-sm">
//                     <div className="font-medium">{buyer?.name || "N/A"}</div>
//                     <div className="text-gray-600">{buyer?.email || "N/A"}</div>
//                     <div className="text-gray-600">{buyer?.phone || "N/A"}</div>
//                   </div>
//                 </div>

//                 {/* Seller */}
//                 <div>
//                   <h3 className="font-semibold mb-3">Seller</h3>
//                   <div className="space-y-1 text-sm">
//                     <div className="font-medium">{seller?.name || "N/A"}</div>
//                     <div className="text-gray-600">{seller?.email || "N/A"}</div>
//                     <div className="text-gray-600">{seller?.phone || "N/A"}</div>
//                   </div>
//                 </div>

//                 {/* Shipping */}
//                 <div>
//                   <h3 className="font-semibold mb-3">Shipping Details</h3>
//                   <div className="space-y-1 text-sm">
//                     <div className="text-gray-600">
//                       {shippingDetails?.address || "N/A"}
//                     </div>
//                     <div className="text-gray-600">
//                       {shippingDetails?.city || "N/A"},{" "}
//                       {shippingDetails?.country || "N/A"}
//                     </div>
//                     <div className="text-gray-600">
//                       Postal code: {shippingDetails?.postalCode || "N/A"}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Products */}
//             <div className="bg-white rounded-lg p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="font-semibold">Product Summary</h3>
//                 <div>
//                   {isCancelled || orderStatus === "CANCELLED" ? (
//                     <button
//                       disabled
//                       className="flex items-center gap-1 text-gray-400 text-sm cursor-not-allowed"
//                     >
//                       <CheckCircle className="w-4 h-4" />
//                       Cancelled
//                     </button>
//                   ) : (
//                     <button
//                       onClick={() => handleCancelOrder(order._id)}
//                       disabled={isCancelling}
//                       className={`flex items-center gap-1 text-red-500 text-sm hover:text-red-600 ${
//                         isCancelling ? "opacity-50 cursor-not-allowed" : ""
//                       }`}
//                     >
//                       <AlertCircle className="w-4 h-4" />
//                       {isCancelling ? "Cancelling..." : "Cancel Order"}
//                     </button>
//                   )}
//                 </div>
//               </div>

//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="border-b">
//                     <tr className="text-left text-sm text-gray-600">
//                       <th className="pb-3 font-medium">#</th>
//                       <th className="pb-3 font-medium">Product</th>
//                       <th className="pb-3 font-medium text-center">Qty</th>
//                       <th className="pb-3 font-medium text-right">Price</th>
//                       <th className="pb-3 font-medium text-right">Subtotal</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y">
//                     {products.length ? (
//                       products.map((p: any, i: number) => (
//                         <tr key={p._id || i} className="text-sm">
//                           <td className="py-3">{String(i + 1).padStart(2, "0")}</td>
//                           <td className="py-3">{p.name || p.productName || "N/A"}</td>
//                           <td className="py-3 text-center">{p.quantity}</td>
//                           <td className="py-3 text-right">${p.price}</td>
//                           <td className="py-3 text-right">
//                             ${(p.price * p.quantity).toFixed(2)}
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan={5} className="py-6 text-center text-gray-500">
//                           No products found
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* Timeline */}
//             <div className="bg-white rounded-lg p-6">
//               <h3 className="font-semibold mb-6">
//                 Order{" "}
//                 <span
//                   className={`${
//                     orderStatus === "DELIVERED"
//                       ? "text-green-500"
//                       : orderStatus === "CANCELLED"
//                       ? "text-red-500"
//                       : "text-orange-500"
//                   }`}
//                 >
//                   {orderStatus}
//                 </span>
//               </h3>

//               <div>
//                 {getTimeline().map((step, i) => (
//                   <div key={i} className="flex gap-4 pb-6 last:pb-0">
//                     <div
//                       className={`w-10 h-10 rounded-full flex items-center justify-center ${
//                         step.status === "completed"
//                           ? "bg-purple-500"
//                           : step.status === "current"
//                           ? "bg-orange-500"
//                           : "bg-gray-300"
//                       }`}
//                     >
//                       <step.icon className="w-5 h-5 text-white" />
//                     </div>
//                     <div>
//                       <div className="font-medium">{step.label}</div>
//                       <div className="text-sm text-gray-500">{step.date}</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Summary */}
//           <div>
//             <div className="bg-white rounded-lg p-6">
//               <h3 className="font-semibold mb-4">
//                 Order ID: {order?.orderNumber || id}
//               </h3>

//               <div className="space-y-3 text-sm mb-6">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Order date:</span>
//                   <span>
//                     {order?.createdAt
//                       ? new Date(order.createdAt).toLocaleDateString()
//                       : "N/A"}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Shipping:</span>
//                   <span>${shipping.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Discount:</span>
//                   <span>-${discount.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Tax:</span>
//                   <span>${tax.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between border-t pt-3">
//                   <span className="text-gray-600">Payment status:</span>
//                   <span
//                     className={`font-medium ${
//                       paymentStatus === "PAID"
//                         ? "text-green-600"
//                         : "text-orange-600"
//                     }`}
//                   >
//                     {paymentStatus}
//                   </span>
//                 </div>
//                 <div className="flex justify-between text-base font-semibold pt-2">
//                   <span>Total:</span>
//                   <span>${total.toFixed(2)}</span>
//                 </div>
//               </div>

//               <button
//                 onClick={handleDownloadReceipt}
//                 className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 rounded-lg transition"
//               >
//                 Download receipt
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminOrderDetails;

















// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Package, Clock, Truck, CheckCircle, AlertCircle } from "lucide-react";
// import {
//   useGetOrderByIdAdminQuery,
//   useDeleteOrderByIdAdminMutation,
//   useUpdateOrderStatusAdminMutation,
//   useUpdateOrderPaymentStatusAdminMutation,
//   useCancelOrderByIdMutation,
// } from "@/Redux/Features/Order/Order.api";

// const AdminOrderDetails = () => {
//   const { id } = useParams<{ id: string }>();

//   // ✅ Handle missing id
//   if (!id) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <p className="text-gray-600">Invalid order ID in URL</p>
//       </div>
//     );
//   }

//   // ✅ Fetch order data
//   const {
//     data: orderData,
//     isLoading,
//     isError,
//     error,
//     refetch,
//   } = useGetOrderByIdAdminQuery({ id });

//   // Mutations
//   const [cancelOrder] = useCancelOrderByIdMutation();
//   const [deleteOrderByAdmin] = useDeleteOrderByIdAdminMutation();
//   const [updateOrderStatus] = useUpdateOrderStatusAdminMutation();
//   const [updateOrderPaymentStatus] = useUpdateOrderPaymentStatusAdminMutation();

//   useEffect(() => {
//     console.group("📦 Order Details Debug");
//     console.log("🆔 URL Order ID:", id);
//     console.log("📊 API Response:", orderData);
//     console.log("⏳ Loading:", isLoading);
//     if (isError) console.error("❌ Error details:", error);
//     console.groupEnd();
//   }, [id, orderData, isLoading, isError, error]);

 
//   // ✅ Now you can safely use order
//   const [isCancelled, setIsCancelled] = useState(order?.status === "cancelled");

//   const handleCancelOrder = async (orderId) => {
//     try {
//       const res = await cancelOrder({ orderId }).unwrap();
//       console.log("✅ Order cancelled successfully:", res);
//       setIsCancelled(true);
//       refetch();
//     } catch (err) {
//       console.error("❌ Cancel order error:", err);
//     }
//   const handleDownloadReceipt = () => {
//     console.log("📥 Downloading receipt for order:", id);
//     // TODO: implement PDF download logic
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading order details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (isError || !orderData) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
//           <p className="text-gray-600">Failed to load order details</p>
//           <button
//             onClick={() => refetch()}
//             className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // ✅ Normalize order structure
//   const order = orderData?.data || orderData;
//   const buyer = order?.user || order?.buyer;
//   const seller = order?.vendor || order?.seller;
//   const shippingDetails = order?.shippingAddress || order?.shipping;
//   const products = order?.orderItems || order?.products || [];
//   const orderStatus = order?.status || "PENDING";
//   const paymentStatus = order?.paymentStatus || "PENDING";

//   const subtotal = products.reduce(
//     (sum: number, item: any) => sum + (item.price * item.quantity || 0),
//     0
//   );
//   const shipping = order?.shippingCost || 40;
//   const discount = order?.discount || 0;
//   const tax = order?.tax || 0;
//   const total = order?.totalAmount || subtotal + shipping - discount + tax;

//   const getTimeline = () => {
//     const statuses = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED"];
//     const currentIndex = statuses.indexOf(orderStatus);

//     return [
//       {
//         label: "Order placed",
//         date: new Date(order?.createdAt).toLocaleString() || "N/A",
//         status: currentIndex >= 0 ? "completed" : "pending",
//         icon: Package,
//       },
//       {
//         label: "Preparing for shipment",
//         date: order?.processingAt
//           ? new Date(order.processingAt).toLocaleString()
//           : "Pending",
//         status:
//           currentIndex >= 1
//             ? "completed"
//             : currentIndex === 0
//             ? "current"
//             : "pending",
//         icon: Clock,
//       },
//       {
//         label: "Out for delivery",
//         date: order?.shippedAt
//           ? new Date(order.shippedAt).toLocaleString()
//           : "Estimated",
//         status:
//           currentIndex >= 2
//             ? "completed"
//             : currentIndex === 1
//             ? "current"
//             : "pending",
//         icon: Truck,
//       },
//       {
//         label: "Delivered",
//         date: order?.deliveredAt
//           ? new Date(order.deliveredAt).toLocaleString()
//           : "Estimated",
//         status:
//           currentIndex >= 3
//             ? "completed"
//             : currentIndex === 2
//             ? "current"
//             : "pending",
//         icon: CheckCircle,
//       },
//     ];
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-6">
//           <div className="text-sm text-gray-500 mb-2">
//             Orders &gt; Order details
//           </div>
//           <h1 className="text-2xl font-semibold">Order Details</h1>
//         </div>

//         {/* Main Content */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Left Column */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Buyer, Seller, Shipping */}
//             <div className="bg-white rounded-lg p-6">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {/* Buyer */}
//                 <div>
//                   <h3 className="font-semibold mb-3">Buyer</h3>
//                   <div className="space-y-1 text-sm">
//                     <div className="font-medium">{buyer?.name || "N/A"}</div>
//                     <div className="text-gray-600">{buyer?.email || "N/A"}</div>
//                     <div className="text-gray-600">{buyer?.phone || "N/A"}</div>
//                   </div>
//                 </div>

//                 {/* Seller */}
//                 <div>
//                   <h3 className="font-semibold mb-3">Seller</h3>
//                   <div className="space-y-1 text-sm">
//                     <div className="font-medium">{seller?.name || "N/A"}</div>
//                     <div className="text-gray-600">{seller?.email || "N/A"}</div>
//                     <div className="text-gray-600">{seller?.phone || "N/A"}</div>
//                   </div>
//                 </div>

//                 {/* Shipping */}
//                 <div>
//                   <h3 className="font-semibold mb-3">Shipping Details</h3>
//                   <div className="space-y-1 text-sm">
//                     <div className="text-gray-600">
//                       {shippingDetails?.address || "N/A"}
//                     </div>
//                     <div className="text-gray-600">
//                       {shippingDetails?.city || "N/A"},{" "}
//                       {shippingDetails?.country || "N/A"}
//                     </div>
//                     <div className="text-gray-600">
//                       Postal code: {shippingDetails?.postalCode || "N/A"}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Products */}
//             <div className="bg-white rounded-lg p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="font-semibold">Product Summary</h3>
//                   <div>
//       {isCancelled ? (
//         <button
//           disabled
//           className="flex items-center gap-1 text-gray-400 text-sm cursor-not-allowed"
//         >
//           <CheckCircle className="w-4 h-4" />
//           Cancelled
//         </button>
//       ) : (
//         <button
//           onClick={() => handleCancelOrder(order._id)}
//           disabled={isLoading}
//           className={`flex items-center gap-1 text-red-500 text-sm hover:text-red-600 ${
//             isLoading ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//         >
//           <AlertCircle className="w-4 h-4" />
//           {isLoading ? "Cancelling..." : "Cancel Order"}
//         </button>
//       )}
//     </div>
//               </div>

//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="border-b">
//                     <tr className="text-left text-sm text-gray-600">
//                       <th className="pb-3 font-medium">#</th>
//                       <th className="pb-3 font-medium">Product</th>
//                       <th className="pb-3 font-medium text-center">Qty</th>
//                       <th className="pb-3 font-medium text-right">Price</th>
//                       <th className="pb-3 font-medium text-right">Subtotal</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y">
//                     {products.length ? (
//                       products.map((p: any, i: number) => (
//                         <tr key={p._id || i} className="text-sm">
//                           <td className="py-3">{String(i + 1).padStart(2, "0")}</td>
//                           <td className="py-3">{p.name || p.productName || "N/A"}</td>
//                           <td className="py-3 text-center">{p.quantity}</td>
//                           <td className="py-3 text-right">${p.price}</td>
//                           <td className="py-3 text-right">
//                             ${(p.price * p.quantity).toFixed(2)}
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan={5} className="py-6 text-center text-gray-500">
//                           No products found
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* Timeline */}
//             <div className="bg-white rounded-lg p-6">
//               <h3 className="font-semibold mb-6">
//                 Order{" "}
//                 <span
//                   className={`${
//                     orderStatus === "DELIVERED"
//                       ? "text-green-500"
//                       : orderStatus === "CANCELLED"
//                       ? "text-red-500"
//                       : "text-orange-500"
//                   }`}
//                 >
//                   {orderStatus}
//                 </span>
//               </h3>

//               <div>
//                 {getTimeline().map((step, i) => (
//                   <div key={i} className="flex gap-4 pb-6 last:pb-0">
//                     <div
//                       className={`w-10 h-10 rounded-full flex items-center justify-center ${
//                         step.status === "completed"
//                           ? "bg-purple-500"
//                           : step.status === "current"
//                           ? "bg-orange-500"
//                           : "bg-gray-300"
//                       }`}
//                     >
//                       <step.icon className="w-5 h-5 text-white" />
//                     </div>
//                     <div>
//                       <div className="font-medium">{step.label}</div>
//                       <div className="text-sm text-gray-500">{step.date}</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Summary */}
//           <div>
//             <div className="bg-white rounded-lg p-6">
//               <h3 className="font-semibold mb-4">
//                 Order ID: {order?.orderNumber || id}
//               </h3>

//               <div className="space-y-3 text-sm mb-6">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Order date:</span>
//                   <span>
//                     {order?.createdAt
//                       ? new Date(order.createdAt).toLocaleDateString()
//                       : "N/A"}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Shipping:</span>
//                   <span>${shipping.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Discount:</span>
//                   <span>-${discount.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Tax:</span>
//                   <span>${tax.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between border-t pt-3">
//                   <span className="text-gray-600">Payment status:</span>
//                   <span
//                     className={`font-medium ${
//                       paymentStatus === "PAID"
//                         ? "text-green-600"
//                         : "text-orange-600"
//                     }`}
//                   >
//                     {paymentStatus}
//                   </span>
//                 </div>
//                 <div className="flex justify-between text-base font-semibold pt-2">
//                   <span>Total:</span>
//                   <span>${total.toFixed(2)}</span>
//                 </div>
//               </div>

//               <button
//                 onClick={handleDownloadReceipt}
//                 className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 rounded-lg transition"
//               >
//                 Download receipt
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };}

// export default AdminOrderDetails;










 







// import React, { useEffect } from "react";
// import DetailCard from "./DetailCard";
// import {
//   useCreateOrderMutation,
//   useGetMyOrdersQuery,
//   useGetMyOrderStatsQuery,
//   useTrackByOrderNumberQuery,
//   useCancelOrderByIdMutation,
//   useGetAllOrdersByAdminAndVendorQuery,
//   useGetOrderStatsAdminQuery,
//   useGetRecentOrdersAdminAndVendorQuery,
//   useGetOrderByIdAdminQuery,
//   useDeleteOrderByIdAdminMutation,
//   useUpdateOrderStatusAdminMutation,
//   useUpdateOrderPaymentStatusAdminMutation,
// } from "@/Redux/Features/Order/Order.api";
// import { useParams } from "react-router-dom";

// const AdminOrderDetails = () => {
//   const { id } = useParams<{ id: string }>();
//   console.log("🆔 useParams ID:", id);

//   // 🔹 Individual API hooks
//   const { data: myOrders, isLoading: loadingMyOrders } = useGetMyOrdersQuery({
//     status: "PENDING",
//   });
//   const { data: myStats } = useGetMyOrderStatsQuery({ id: id! });
//   const { data: trackData } = useTrackByOrderNumberQuery({ id: id! });
//   const { data: adminOrder, isLoading, isError, error, refetch } =
//     useGetOrderByIdAdminQuery({ id: id! });
//   const { data: allOrdersAdmin } = useGetAllOrdersByAdminAndVendorQuery({
//     status: "ALL",
//   });
//   const { data: orderStatsAdmin } = useGetOrderStatsAdminQuery({ id: id! });
//   const { data: recentOrders } = useGetRecentOrdersAdminAndVendorQuery({ id: id! });

//   // 🔹 Mutations
//   const [createOrder] = useCreateOrderMutation();
//   const [cancelOrder] = useCancelOrderByIdMutation();
//   const [deleteOrderByAdmin] = useDeleteOrderByIdAdminMutation();
//   const [updateOrderStatus] = useUpdateOrderStatusAdminMutation();
//   const [updateOrderPaymentStatus] = useUpdateOrderPaymentStatusAdminMutation();

//   // 🔹 Debug logs
//   useEffect(() => {
//     console.group("📦 Order API Debug Logs");

//     console.log("🆔 ID from URL:", id);

//     console.log("✅ useGetMyOrdersQuery:", myOrders);
//     console.log("✅ useGetMyOrderStatsQuery:", myStats);
//     console.log("✅ useTrackByOrderNumberQuery:", trackData);
//     console.log("✅ useGetOrderByIdAdminQuery:", adminOrder);
//     console.log("✅ useGetAllOrdersByAdminAndVendorQuery:", allOrdersAdmin);
//     console.log("✅ useGetOrderStatsAdminQuery:", orderStatsAdmin);
//     console.log("✅ useGetRecentOrdersAdminAndVendorQuery:", recentOrders);

//     if (isError) console.error("❌ Error fetching admin order:", error);
//     console.log("⏳ Loading states => AdminOrder:", isLoading, "MyOrders:", loadingMyOrders);

//     console.groupEnd();
//   }, [
//     id,
//     myOrders,
//     myStats,
//     trackData,
//     adminOrder,
//     allOrdersAdmin,
//     orderStatsAdmin,
//     recentOrders,
//     isLoading,
//     loadingMyOrders,
//     isError,
//     error,
//   ]);

//   // 🔹 Example actions for testing mutations
//   const handleTestMutations = async () => {
//     console.log("🧪 Testing Mutations...");

//     try {
//       const newOrder = await createOrder({ productId: "123", quantity: 1 }).unwrap();
//       console.log("✅ Created order:", newOrder);

//       const cancelled = await cancelOrder({ orderId: id }).unwrap();
//       console.log("🚫 Cancelled order:", cancelled);

//       const updatedStatus = await updateOrderStatus({ id }).unwrap();
//       console.log("⚙️ Updated order status:", updatedStatus);

//       const updatedPayment = await updateOrderPaymentStatus({ id }).unwrap();
//       console.log("💳 Updated payment status:", updatedPayment);

//       const deleted = await deleteOrderByAdmin(id!).unwrap();
//       console.log("🗑️ Deleted order:", deleted);
//     } catch (err) {
//       console.error("❌ Mutation error:", err);
//     }
//   };

//   return (
//     <div className="p-4 space-y-4">
//       <h2 className="text-xl font-semibold">🧾 Admin Order Details Debug</h2>

//       {isLoading && <p>⏳ Loading admin order details...</p>}
//       {adminOrder && <DetailCard order={adminOrder} />}

//       <button
//         onClick={() => refetch()}
//         className="px-4 py-2 bg-blue-500 text-white rounded-md"
//       >
//         🔄 Refetch Admin Order
//       </button>

//       <button
//         onClick={handleTestMutations}
//         className="px-4 py-2 bg-green-600 text-white rounded-md"
//       >
//         🧪 Test All Mutations
//       </button>

//       <div className="mt-6">
//         <h3 className="font-semibold mb-2">📊 Data Snapshots (Console Logs)</h3>
//         <p className="text-gray-500 text-sm">
//           All API responses and states are logged in your browser console (F12 → Console).
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AdminOrderDetails;












// import React from 'react'
// import DetailCard from './DetailCard'
// import {   useCreateOrderMutation,
//   useGetMyOrdersQuery,
//   useGetMyOrderStatsQuery,
//   useTrackByOrderNumberQuery,
//   useCancelOrderByIdMutation,
//   useGetAllOrdersByAdminAndVendorQuery,
//   useGetOrderStatsAdminQuery,
//   useGetRecentOrdersAdminAndVendorQuery,
//   useGetOrderByIdAdminQuery,
//   useDeleteOrderByIdAdminMutation,
//   useUpdateOrderStatusAdminMutation,
//   useUpdateOrderPaymentStatusAdminMutation, } from '@/Redux/Features/Order/Order.api'
// import { useParams } from 'react-router-dom'

// const AdminOrderDetails = () => {
//     const {id } = useParams<{id:string}>()
//     const {data, isLoading} = useGetOrderByIdAdminQuery({id:id!})
//     console.log(data)
//    return (
//     <div>
//       <DetailCard />
//     </div>
//   )
// }

// export default AdminOrderDetails
