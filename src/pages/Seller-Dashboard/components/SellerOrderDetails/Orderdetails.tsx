
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// Using CheckCircle from lucide-react for the first step (Order Placed)
// and replacing the default icons with unique ones for better distinction (like in the image)
import { Package, Truck, CheckCircle, AlertCircle, Edit2 } from "lucide-react"; 
import {
    useGetOrderByIdAdminQuery,
    useCancelOrderByIdMutation,
    // useGetRecentOrdersAdminAndVendorQuery,
} from "@/Redux/Features/Order/Order.api";
import { Spinner } from "@/components/ui/spinner";
// import { FaArrowDown, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";

const Orderdetails = () => {
    // const { data } = useGetRecentOrdersAdminAndVendorQuery({});
    // console.log(data) // Commented out console logs for cleaner code
    const { id } = useParams<{ id: string }>();

    if (!id)
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-600">Invalid order ID in URL</p>
            </div>
        );

    const { data: orderData, isLoading, isError, refetch } =
        useGetOrderByIdAdminQuery({ id });
    // console.log(orderData) // Commented out console logs for cleaner code
    const [cancelOrder, { isLoading: isCancelling }] = useCancelOrderByIdMutation();
    const [isCancelled, setIsCancelled] = useState(false);

    const order = orderData?.data || orderData;
    // const buyer = order?.user || order?.buyer || {};

    // const seller = order?.vendor || order?.seller || {};
    // console.log(seller, buyer) // Commented out console logs for cleaner code
    const shipping = order?.shippingAddress || order?.shipping || {};

    const products = order?.orderItems || order?.products || [];
    const orderStatus = (order?.status || "PENDING").toUpperCase();
    // const paymentStatus = (order?.paymentStatus || "PENDING").toUpperCase();
    const paymentHistory = order?.paymentHistory || {}; // Ensure paymentHistory is an object for safe access
    // console.log(paymentHistory) // Commented out console logs for cleaner code
    
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

    const subtotal = products.reduce((sum: any, item: any) => sum + (item.price * item.quantity || 0), 0);
    const shippingCost = order?.shippingCost || 40;
    const discount = order?.discount || 0;
    const tax = order?.tax || 0;
    const total = order?.totalAmount || subtotal + shippingCost - discount + tax;

    // --- UPDATED: getStatusColor to use custom colors ---
    const getStatusColor = (status: string, color?: string) => {
        switch (status) {
            case "completed":
                return color || "bg-green-500"; // Use custom color if provided
            case "current":
                return color || "bg-blue-500"; // Use custom color if provided
            default:
                return "bg-gray-200"; // Pending or unknown
        }
    };
    // --- END UPDATED: getStatusColor ---

    // --- UPDATED: getTimeline to include custom colors ---
    const getTimeline = () => {
        const statuses = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED"];
        const currentIndex = statuses.indexOf(orderStatus);

        return [
            {
                label: "Order placed",
                date: order?.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A",
                status: currentIndex >= 0 ? "completed" : "pending",
                icon: CheckCircle, // The first step often uses a check or package icon
                color: 'bg-purple-500' // Custom color 1
            },
            {
                label: "Preparing for shipment",
                // Use a fallback date for visualization purposes
                date: order?.processingAt ? new Date(order.processingAt).toLocaleDateString() : "17 June, 2025 9:00 pm",
                status: currentIndex > 0 ? "completed" : currentIndex === 0 ? "current" : "pending",
                icon: Package, // Icon representing preparation/packing
                color: 'bg-orange-500' // Custom color 2
            },
            {
                label: "Out for delivery",
                // Use a fallback date for visualization purposes
                date: order?.shippedAt ? new Date(order.shippedAt).toLocaleDateString() : "21 June, 2025",
                status: currentIndex > 1 ? "completed" : currentIndex === 1 ? "current" : "pending",
                icon: Truck,
                color: 'bg-cyan-500' // Custom color 3
            },
            {
                label: "Delivered",
                // Use a fallback date for visualization purposes
                date: order?.deliveredAt ? new Date(order.deliveredAt).toLocaleDateString() : "Estimated 21 June, 25",
                status: currentIndex > 2 ? "completed" : currentIndex === 2 ? "current" : "pending",
                icon: CheckCircle, // Final delivered icon
                color: 'bg-green-600' // Custom color 4
            },
        ];
    };
    // --- END UPDATED: getTimeline ---

    // Calculate dynamic progress bar width
    const timeline = getTimeline();
    const completedSteps = timeline.filter(s => s.status === 'completed').length;
    const totalSteps = timeline.length;
    
    // Adjust the visual width: 100% when all completed, or calculated percentage.
    const progressPercentage = (completedSteps / totalSteps) * 100;
    const visualProgress = completedSteps === totalSteps 
                            ? '100%' 
                            : `${progressPercentage}%`;


    if (isLoading)
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <Spinner />
                    <p className="text-gray-600 mt-4">Loading order details...</p>
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
        <div className="min-h-screen p-4 md:p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-xl font-semibold text-gray-900 flex items-center gap-2">my Order<FaArrowRightLong /> <span className="text-orange-500">#{order?.orderNumber || "ORD-2225-347"}</span></h1>
                </div>

                {/* Recent Order Status Card */}
                <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Recent order status</h3>
                            <div className="text-xs text-[#0D1317] my-2">
                                Last order ID: <span className="text-orange-500">#{order?.orderNumber || "ORD-2225-347"}</span>
                            </div>
                            <div className="text-xs text-gray-400">
                                Placed on <span className="text-sm text-gray-600">{order.updatedAt}</span>
                            </div>
                        </div>
                        <button
                            onClick={handleCancelOrder}
                            disabled={isCancelling || isCancelled}
                            className={`text-xs ${isCancelled ? "text-gray-400 cursor-not-allowed" : "text-red-500 hover:text-red-600"
                                }`}
                        >
                            {isCancelling ? "Cancelling..." : isCancelled ? "Order Cancelled" : "Cancel order"}
                        </button>       
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="border border-gray-300 rounded-md py-6 ">
                            <div className="text-base text-[#0D1317] mb-1 ">Last amount</div>
                            <div className="text-lg font-semibold">${total.toFixed(0)}</div>
                        </div>
                        <div className="border border-gray-300 rounded-md py-6">
                            <div className="text-base text-[#0D1317] mb-1">Total product</div>
                            <div className="text-lg font-semibold">{products.length}</div>
                        </div>
                        <div className="border border-gray-300 rounded-md py-6">
                            <div className="text-base text-[#0D1317] mb-1">Shipping method</div>
                            <div className="text-xl font-medium text-orange-500">Pending / Shipping</div>
                        </div>
                    </div>
                </div>

                {/* Order Status Timeline (UPDATED) */}
                <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
                    <h3 className="text-sm font-semibold mb-4">Order status</h3>
                    <div className="flex justify-between items-start relative">
                        {/* Progress Line Track (Gray) */}
                        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10 mx-5" /> 
                        
                        {/* Dynamic Progress Fill (Green) */}
                        <div
                            className="absolute top-5 left-0 h-0.5 bg-green-500 -z-10 transition-all duration-500"
                            // Adjusted style to account for spacing (subtracting roughly the radius of the first circle)
                            style={{ width: `calc(${visualProgress} - 1.25rem)` }}
                        />

                        {/* Map through Timeline Steps (UPDATED) */}
                        {timeline.map((step, i) => {
                            // Determine circle color using the custom color property
                            const circleColor = getStatusColor(step.status, step.color);
                            // Determine icon color
                            const iconColor = step.status === 'pending' ? 'text-gray-400' : 'text-white';

                            return (
                                <div key={i} className="flex flex-col items-center flex-1 min-w-0 px-1">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${circleColor}`}>
                                        {/* Dynamic Icon */}
                                        <step.icon className={`w-5 h-5 ${iconColor}`} />
                                    </div>
                                    <div className="text-xs font-medium text-center whitespace-nowrap">{step.label}</div>
                                    <div className="text-xs text-gray-400 text-center whitespace-nowrap">{step.date}</div>
                                </div>
                            );
                        })}
                        {/* END UPDATED: Timeline Mapping */}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    {/* Shipping Information */}
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-xl font-semibold">Shipping information</h3>
                            <button className="text-blue-500 hover:text-blue-600">
                                <Edit2 className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div>
                                <div className="text-gray-500 text-base">Delivery Address</div>
                                <div className="font-medium">{shipping.state || "N/A"}</div>
                            </div>

                            <div>
                                <div className="font-medium text-gray-500">{shipping.zipCode || "N/A"},{shipping.addressSpecific || "N/A"},{shipping.country}</div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg mt-4 ">
                            <h3 className="text-sm font-semibold mb-3">Shipping Details</h3>
                            <div className=" gap-4 text-sm">
                                <div className="flex justify-between">
                                    <div className="text-gray-500 text-xs mb-1">Carrier</div>
                                    <div className="font-medium">DHL Express</div>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <div className="text-gray-500 text-xs mb-1">Tracking number</div>
                                    <div className="font-medium">{shipping.trackingNumber || "N/A"}</div>
                                </div>
                            </div>
                        </div>


                    </div>

                    {/* Payment Information */}
                    <div>
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-sm font-semibold">Payment information</h3>
                                <button className="text-blue-500 hover:text-blue-600">
                                    <Edit2 className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div>
                                    <div className="flex justify-between">
                                        <div className="font-medium">{paymentHistory.cardType || "Visa"}**** **** **** 1234</div>
                                        <div className="text-gray-500 text-xs">{paymentHistory.paymentStatus || "Completed"}</div>

                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="text-gray-500 text-xs">Payment date</div>
                                    <div className="font-medium">{order?.createdAt ? new Date(order.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : "N/A"}</div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="text-gray-500 text-xs">Transaction ID</div>
                                    <div className="text-gray-500 text-xs">{order.transactionId || "N/A"}</div>

                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg p-4 mt-4 border border-gray-200">
                            <h3 className="text-sm font-semibold mb-3">Need help?</h3>
                            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 rounded-lg transition text-sm">
                                Send message
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Orderdetails;


















// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Package, Clock, Truck, CheckCircle, AlertCircle, Edit2 } from "lucide-react";
// import {
//     useGetOrderByIdAdminQuery,
//     useCancelOrderByIdMutation,
//     useGetRecentOrdersAdminAndVendorQuery,
// } from "@/Redux/Features/Order/Order.api";
// import { Spinner } from "@/components/ui/spinner";
// import { FaArrowDown, FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import { FaArrowRightLong } from "react-icons/fa6";

// const Orderdetails = () => {
//     const { data } = useGetRecentOrdersAdminAndVendorQuery({});
//     console.log(data)
//     const { id } = useParams<{ id: string }>();

//     if (!id)
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-gray-50">
//                 <p className="text-gray-600">Invalid order ID in URL</p>
//             </div>
//         );

//     const { data: orderData, isLoading, isError, refetch } =
//         useGetOrderByIdAdminQuery({ id });
//     console.log(orderData)
//     const [cancelOrder, { isLoading: isCancelling }] = useCancelOrderByIdMutation();
//     const [isCancelled, setIsCancelled] = useState(false);

//     const order = orderData?.data || orderData;
//     const buyer = order?.user || order?.buyer || {};

//     const seller = order?.vendor || order?.seller || {};
//     console.log(seller, buyer)
//     const shipping = order?.shippingAddress || order?.shipping || {};

//     const products = order?.orderItems || order?.products || [];
//     const orderStatus = (order?.status || "PENDING").toUpperCase();
//     const paymentStatus = (order?.paymentStatus || "PENDING").toUpperCase();
//     const paymentHistory = order?.paymentHistory
//     console.log(paymentHistory)
//     useEffect(() => {
//         setIsCancelled(orderStatus === "CANCELLED");
//     }, [orderStatus]);

//     const handleCancelOrder = async () => {
//         try {
//             await cancelOrder({ orderId: order._id, reason: "Cancelled by admin" }).unwrap();
//             setIsCancelled(true);
//             refetch();
//         } catch (err) {
//             console.error("Cancel order failed:", err);
//         }
//     };

//     const subtotal = products.reduce((sum: any, item: any) => sum + (item.price * item.quantity || 0), 0);
//     const shippingCost = order?.shippingCost || 40;
//     const discount = order?.discount || 0;
//     const tax = order?.tax || 0;
//     const total = order?.totalAmount || subtotal + shippingCost - discount + tax;

//     const getStatusColor = (status: string) => {
//         switch (status) {
//             case "completed":
//                 return "bg-green-500";
//             case "current":
//                 return "bg-blue-500";
//             default:
//                 return "bg-gray-200";
//         }
//     };

//     const getTimeline = () => {
//         const statuses = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED"];
//         const currentIndex = statuses.indexOf(orderStatus);

//         return [
//             {
//                 label: "Order placed",
//                 date: order?.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A",
//                 status: currentIndex >= 0 ? "completed" : "pending",
//                 icon: Package,
//             },
//             {
//                 label: "Preparing for shipment",
//                 date: order?.processingAt ? new Date(order.processingAt).toLocaleDateString() : "15 June, 2025",
//                 status: currentIndex >= 1 ? "completed" : currentIndex === 0 ? "current" : "pending",
//                 icon: Clock,
//             },
//             {
//                 label: "Out for delivery",
//                 date: order?.shippedAt ? new Date(order.shippedAt).toLocaleDateString() : "15 June, 2025",
//                 status: currentIndex >= 2 ? "completed" : currentIndex === 1 ? "current" : "pending",
//                 icon: Truck,
//             },
//             {
//                 label: "Delivered",
//                 date: order?.deliveredAt ? new Date(order.deliveredAt).toLocaleDateString() : "Estimated 15 June, 25",
//                 status: currentIndex >= 3 ? "completed" : currentIndex === 2 ? "current" : "pending",
//                 icon: CheckCircle,
//             },
//         ];
//     };

//     if (isLoading)
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-gray-50">
//                 <div className="text-center">
//                     <Spinner />
//                     <p className="text-gray-600 mt-4">Loading order details...</p>
//                 </div>
//             </div>
//         );

//     if (isError || !order)
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-gray-50">
//                 <div className="text-center">
//                     <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
//                     <p className="text-gray-600">Failed to load order details</p>
//                     <button
//                         onClick={() => refetch()}
//                         className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//                     >
//                         Retry
//                     </button>
//                 </div>
//             </div>
//         );

//     return (
//         <div className="min-h-screen   p-4 md:p-6">
//             <div className="max-w-4xl mx-auto">
//                 {/* Header */}
//                 <div className="mb-6">
//                     <h1 className="text-xl font-semibold text-gray-900 flex items-center gap-2">my Order<FaArrowRightLong /> <span className="text-orange-500">#{order?.orderNumber || "ORD-2225-347"}</span></h1>
//                 </div>

//                 {/* Recent Order Status Card */}
//                 <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
//                     <div className="flex justify-between items-start mb-3">
//                         <div>
//                             <h3 className="text-sm font-medium text-gray-500">Recent order status</h3>
//                             <div className="text-xs text-[#0D1317] my-2">
//                                 Last order ID: <span className="text-orange-500">#{order?.orderNumber || "ORD-2225-347"}</span>
//                             </div>
//                             <div className="text-xs text-gray-400">
//                                 Placed on <span className="text-sm text-gray-600">{order.updatedAt}</span>
//                             </div>
//                         </div>
//                         <button
//                             onClick={handleCancelOrder}
//                             disabled={isCancelling || isCancelled}
//                             className={`text-xs ${isCancelled ? "text-gray-400 cursor-not-allowed" : "text-red-500 hover:text-red-600"
//                                 }`}
//                         >
//                             {isCancelling ? "Cancelling..." : isCancelled ? "Order Cancelled" : "Cancel order"}
//                         </button>          </div>

//                     <div className="grid grid-cols-3 gap-4 text-center">
//                         <div className="border border-gray-300 rounded-md py-6 ">
//                             <div className="text-base text-[#0D1317] mb-1 ">Last amount</div>
//                             <div className="text-lg font-semibold">${total.toFixed(0)}</div>
//                         </div>
//                         <div className="border border-gray-300 rounded-md py-6">
//                             <div className="text-base text-[#0D1317] mb-1">Total product</div>
//                             <div className="text-lg font-semibold">{products.length}</div>
//                         </div>
//                         <div className="border border-gray-300 rounded-md py-6">
//                             <div className="text-base text-[#0D1317] mb-1">Shipping method</div>
//                             <div className="text-xl font-medium text-orange-500">Pending / Shipping</div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Order Status Timeline */}
//                 <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
//                     <h3 className="text-sm font-semibold mb-4">Order status</h3>
//                     <div className="flex justify-between items-start relative">
//                         {/* Progress Line */}
//                         <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10" />
//                         <div
//                             className="absolute top-5 left-0 h-0.5 bg-green-500 -z-10 transition-all duration-500"
//                             style={{ width: `${(getTimeline().filter(s => s.status === 'completed').length / getTimeline().length) * 100}%` }}
//                         />

//                         {getTimeline().map((step, i) => (
//                             <div key={i} className="flex flex-col items-center flex-1">
//                                 <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${getStatusColor(step.status)}`}>
//                                     <step.icon className={`w-5 h-5 ${step.status === 'pending' ? 'text-gray-400' : 'text-white'}`} />
//                                 </div>
//                                 <div className="text-xs font-medium text-center">{step.label}</div>
//                                 <div className="text-xs text-gray-400 text-center">{step.date}</div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-4">
//                     {/* Shipping Information */}
//                     <div className="bg-white rounded-lg p-4 border border-gray-200">
//                         <div className="flex justify-between items-center mb-3">
//                             <h3 className="text-xl font-semibold">Shipping information</h3>
//                             <button className="text-blue-500 hover:text-blue-600">
//                                 <Edit2 className="w-4 h-4" />
//                             </button>
//                         </div>
//                         <div className="space-y-2 text-sm">
//                             <div>
//                                 <div className="text-gray-500 text-base">Delivery Address</div>
//                                 <div className="font-medium">{shipping.state || "N/A"}</div>
//                             </div>

//                             <div>
//                                 {/* <div className="text-gray-00 text-xs">Pincode / locality</div> */}
//                                 <div className="font-medium text-gray-500">{shipping.zipCode || "N/A"},{shipping.addressSpecific || "N/A"},{shipping.country}</div>
//                             </div>
//                         </div>

//                         <div className="bg-white rounded-lg  mt-4 ">
//                             <h3 className="text-sm font-semibold mb-3">Shipping Details</h3>
//                             <div className=" gap-4 text-sm">
//                                 <div className="flex justify-between">
//                                     <div className="text-gray-500 text-xs mb-1">Carrier</div>
//                                     <div className="font-medium">DHL Express</div>
//                                 </div>
//                                 <div className="flex justify-between mt-2">
//                                     <div className="text-gray-500 text-xs mb-1">Tracking number</div>
//                                     <div className="font-medium">{shipping.trackingNumber || "N/A"}</div>
//                                 </div>
//                             </div>
//                         </div>


//                     </div>

//                     {/* Payment Information */}
//                    <div>
//                      <div className="bg-white rounded-lg p-4 border border-gray-200">
//                         <div className="flex justify-between items-center mb-3">
//                             <h3 className="text-sm font-semibold">Payment information</h3>
//                             <button className="text-blue-500 hover:text-blue-600">
//                                 <Edit2 className="w-4 h-4" />
//                             </button>
//                         </div>
//                         <div className="space-y-2 text-sm">
//                             <div>
//                                 <div className="flex justify-between">
//                                     <div className="font-medium">{paymentHistory.cardType}**** **** **** 1234</div>
//                                     <div className="text-gray-500 text-xs">{paymentHistory.paymentStatus || "N/A"}</div>

//                                 </div>
//                             </div>
//                             <div className="flex justify-between">
//                                 <div className="text-gray-500 text-xs">Payment date</div>
//                                 <div className="font-medium">{order?.createdAt ? new Date(order.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : "N/A"}</div>
//                             </div>
//                             <div className="flex justify-between">
//                                 <div className="text-gray-500 text-xs">Transaction ID</div>
//                                 <div className="text-gray-500 text-xs">{order.transactionId || "N/A"}</div>

//                             </div>
//                         </div>
//                     </div>
//                      <div className="bg-white rounded-lg p-4 mt-4 border border-gray-200">
//                     <h3 className="text-sm font-semibold mb-3">Need help?</h3>
//                     <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 rounded-lg transition text-sm">
//                         Send message
//                     </button>
//                 </div>
//                    </div>
//                 </div>

//                 {/* Shipping Details */}


//                 {/* Need Help Section */}
               
//             </div>
//         </div>
//     );
// };

// export default Orderdetails;















// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Package, Clock, Truck, CheckCircle, AlertCircle } from "lucide-react";
// import {
//   useGetOrderByIdAdminQuery,
//   useCancelOrderByIdMutation,
//   useGetRecentOrdersAdminAndVendorQuery,
// } from "@/Redux/Features/Order/Order.api";
// import { Spinner } from "@/components/ui/spinner";

// const Orderdetails = () => {
//     const { data } = useGetRecentOrdersAdminAndVendorQuery({});

// // if (isLoading) return (<div><Spinner /></div>);

// // First order object
// const firstOrder = data?.data?.[0] || {};

// // Destructure here
// const { userId, shippingAddress } = firstOrder;

// console.log(userId);
// console.log(shippingAddress)

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
//         {/* Header */}
//         <div className="mb-6">
//           {/* <div className="text-sm text-gray-500 mb-2">Orders &gt; Order details</div> */}
//           <h1 className="text-2xl font-semibold">Order Details</h1>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Left Column */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Buyer/Seller/Shipping */}
//             <div className="bg-white rounded-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div>
//                 <h3 className="font-semibold mb-3">Buyer</h3>
//                 <div className="space-y-1 text-sm">
//                   <div className="font-medium">{buyer.name || "N/A"}</div>
//                   <div className="text-gray-600">{buyer.email || "N/A"}</div>
//                   <div className="text-gray-600">{buyer.phone || "N/A"}</div>
//                 </div>
//               </div>
//               <div>
//                 <h3 className="font-semibold mb-3">Seller</h3>
//                 <div className="space-y-1 text-sm">
//                   <div className="font-medium">{seller.name || "N/A"}</div>
//                   <div className="text-gray-600">{seller.email || "N/A"}</div>
//                   <div className="text-gray-600">{seller.phone || "N/A"}</div>
//                 </div>
//               </div>
//               <div>
//                 <h3 className="font-semibold mb-3">Shipping Details</h3>
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

//               <div className="space-y-4">
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
//           <div>
//             <div className="bg-white rounded-lg p-6">
//               <h3 className="font-semibold mb-4">Order ID: {order?.orderNumber || id}</h3>

//               <div className="space-y-3 text-sm mb-6">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Order date:</span>
//                   <span>{order?.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Shipping:</span>
//                   <span>${shippingCost.toFixed(2)}</span>
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
//                   <span className={`font-medium ${paymentStatus === "PAID" ? "text-green-600" : "text-orange-600"}`}>
//                     {paymentStatus}
//                   </span>
//                 </div>
//                 <div className="flex justify-between text-base font-semibold pt-2">
//                   <span>Total:</span>
//                   <span>${total.toFixed(2)}</span>
//                 </div>
//               </div>

//               <button
//                 onClick={() => console.log("Download receipt")}
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

// export default Orderdetails;



