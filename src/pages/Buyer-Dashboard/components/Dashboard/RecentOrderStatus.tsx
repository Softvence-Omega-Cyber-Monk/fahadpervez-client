

import { useCancelOrderByIdMutation } from "@/Redux/Features/Order/Order.api";
import { Order } from "@/types/OrderTypes";
import { toast } from "sonner";
import { useState } from "react";

interface RecentOrderStatusProps {
  data?: Order;
}

export default function RecentOrderStatus({ data }: RecentOrderStatusProps) {
  const [cancelOrderById] = useCancelOrderByIdMutation();
  const [orderStatus, setOrderStatus] = useState(data?.status);

  if (!data) {
    return (
      <div className="w-full bg-white p-6 sm:p-8 border border-gray-100 rounded-md text-center text-gray-500">
        No order data available
      </div>
    );
  }

  const {
    _id,
    orderNumber,
    createdAt,
    actualDeliveryDate,
    grandTotal,
    products,
    shippingMethodId,
  } = data;

  const handleDelete = async ({ id }: { id: string }) => {
    const toastId = toast.loading("Cancelling order...");
    try {
      const result = await cancelOrderById({ orderId: id, reason: "Cancelled by user" }).unwrap();
      if (result?.success) {
        toast.success("Order cancelled successfully!", { id: toastId });
        setOrderStatus("Cancelled"); // update local state to reflect the change
      } else {
        toast.error("Order cancellation failed. Please try again.", { id: toastId });
      }
    } catch (err) {
      toast.error("An unexpected error occurred: " + err, { id: toastId });
    }
  };

  return (
    <div className="w-full bg-white p-6 sm:p-8 border border-gray-100 rounded-md">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h2 className="text-2xl font-medium text-gray-900">Recent order status</h2>
            <span className={`inline-block px-4 pt-1.5 text-sm rounded-md ${
              orderStatus === "Pending"
                ? "bg-orange-50 text-orange-300"
                : "bg-red-50 text-red-400"
            }`}>
              {orderStatus}
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">
            Last order id: {orderNumber}
          </h3>
        </div>

        {/* Cancel Button */}
        {orderStatus === "Pending" && (
          <div>
            <button
              onClick={() => handleDelete({ id: _id })}
              className="flex items-center gap-2 text-white px-4 py-px rounded-md bg-red-500 hover:bg-red-400 transition-colors self-start sm:self-auto"
            >
              <span className="text-sm sm:text-base font-medium">Cancel Order</span>
            </button>
          </div>
        )}
      </div>

      {/* Dates Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-6 text-md text-gray-700">
        <div>
          Placed on{" "}
          {new Date(createdAt).toLocaleString("en-us", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </div>
        <div className="sm:text-right">
          Estimate delivery time:{" "}
          {new Date(actualDeliveryDate as string).toLocaleDateString("en-us", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="border border-gray-200 rounded-lg p-8 text-center">
          <div className="text-lg text-gray-600 mb-2">Total amount</div>
          <div className="text-3xl font-bold text-gray-900">{grandTotal}</div>
        </div>

        <div className="border border-gray-200 rounded-lg p-8 text-center">
          <div className="text-lg text-gray-600 mb-2">Total product</div>
          <div className="text-3xl font-bold text-gray-900">{products.length}</div>
        </div>

        <div className="border border-gray-200 rounded-lg p-8 text-center sm:col-span-2 lg:col-span-1">
          <div className="text-lg text-gray-600 mb-2">Shipping method</div>
          <div className="text-xl sm:text-2xl text-[#FFA600]">{shippingMethodId?.name}</div>
        </div>
      </div>
    </div>
  );
}













// import { useCancelOrderByIdMutation } from "@/Redux/Features/Order/Order.api";
// import { Order } from "@/types/OrderTypes";
// import { toast } from "sonner";

// interface RecentOrderStatusProps {
//   data?: Order;
  
// }

// export default function RecentOrderStatus({ data }: RecentOrderStatusProps) {
//   const [cancelOrderById,Refetch] = useCancelOrderByIdMutation();

//   // Early return if data is missing
//   if (!data) {
//     return (
//       <div className="w-full bg-white p-6 sm:p-8 border border-gray-100 rounded-md text-center text-gray-500">
//         No order data available
//       </div>
//     );
//   }
// console.log(data)
//   const {
//     _id,
//     status,
//     orderNumber,
//     createdAt,
//     actualDeliveryDate,
//     grandTotal,
//     products,
//     shippingMethodId,
//   } = data;
 
//   const handleDelete = async ({ id }: { id: string }) => {
//     const toastId = toast.loading("Cancelling order...");
//     try {
//       const result = await cancelOrderById({ orderId: id, reason: "Cancelled by user" }).unwrap();
//       if (result?.success) {
//         toast.success("Order cancelled successfully!", { id: toastId });
//       } else {
//         toast.error("Order cancellation failed. Please try again.", { id: toastId });
//       }
//     } catch (err) {
//       toast.error("An unexpected error occurred: " + err, { id: toastId });
//     }
//   };

//   return (
//     <div className="w-full bg-white p-6 sm:p-8 border border-gray-100 rounded-md">
//       {/* Header Section */}
//       <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
//         <div className="flex-1">
//           <div className="flex flex-wrap items-center gap-3 mb-3">
//             <h2 className="text-2xl font-medium text-gray-900">Recent order status</h2>
//             <span className="inline-block px-4 pt-1.5 bg-orange-50 text-orange-300 text-sm rounded-md">
//              {status === "Pending" ? <span>{status}</span > :<span> canceled</span >}
             
//             </span>
//           </div>
//           <h3 className="text-base sm:text-lg font-semibold text-gray-900">
//             Last order id: {orderNumber}
//           </h3>
//         </div>

//         {/* Cancel Button */}
//         <div>
//           <button
//             onClick={() => handleDelete({ id: _id })}
//             className="flex items-center gap-2 text-white px-4 py-px rounded-md bg-red-500 hover:bg-red-400 transition-colors self-start sm:self-auto"
//           >
//             <span className="text-sm sm:text-base font-medium">Cancel Order</span>
//           </button>
//         </div>
//       </div>

//       {/* Dates Section */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-6 text-md text-gray-700">
//         <div>
//           Placed on{" "}
//           {new Date(createdAt).toLocaleString("en-us", {
//             day: "2-digit",
//             month: "short",
//             year: "numeric",
//           })}
//         </div>
//         <div className="sm:text-right">
//           Estimate delivery time:{" "}
//           {new Date(actualDeliveryDate as string).toLocaleDateString("en-us", {
//             day: "2-digit",
//             month: "short",
//             year: "numeric",
//           })}
//         </div>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {/* Total Amount Card */}
//         <div className="border border-gray-200 rounded-lg p-8 text-center">
//           <div className="text-lg text-gray-600 mb-2">Total amount</div>
//           <div className="text-3xl font-bold text-gray-900">{grandTotal}</div>
//         </div>

//         {/* Total Product Card */}
//         <div className="border border-gray-200 rounded-lg p-8 text-center">
//           <div className="text-lg text-gray-600 mb-2">Total product</div>
//           <div className="text-3xl font-bold text-gray-900">{products.length}</div>
//         </div>

//         {/* Shipping Method Card */}
//         <div className="border border-gray-200 rounded-lg p-8 text-center sm:col-span-2 lg:col-span-1">
//           <div className="text-lg text-gray-600 mb-2">Shipping method</div>
//           <div className="text-xl sm:text-2xl text-[#FFA600]">{shippingMethodId?.name}</div>
//         </div>
//       </div>
//     </div>
//   );
// }
