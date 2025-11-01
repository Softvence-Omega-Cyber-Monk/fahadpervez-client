import { Order } from '@/types/OrderTypes';
import { Check, Package, Truck, Home, X } from 'lucide-react';

interface OrderStatusTrackerProps {
  data?: Order;
}

export default function OrderStatusTracker({ data }: OrderStatusTrackerProps) {
  if (!data) {
    return (
      <div className="w-full bg-white p-6 sm:p-8 border border-gray-100 rounded-md">
        <h2 className="text-2xl font-medium text-gray-900">Recent order status</h2>
        <p className="mt-4 text-gray-600">No recent orders found.</p>
      </div>
    );
  }

  const { status, createdAt, updatedAt, estimatedDeliveryDate, actualDeliveryDate } = data;

  // Helper to format dates
  const formatDate = (dateStr?: string | null) =>
    dateStr
      ? new Date(dateStr).toLocaleString('en-US', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
      : '—';

  // Steps configuration
  const steps = [
    { icon: Check, title: 'Order placed', date: formatDate(createdAt) },
    { icon: Package, title: 'Preparing for shipment', date: formatDate(updatedAt) },
    { icon: Truck, title: 'Out for delivery', date: formatDate(estimatedDeliveryDate) },
    { icon: Home, title: 'Delivered', date: formatDate(actualDeliveryDate) },
  ];

  // Determine current step index based on status
  let currentStepIndex: number;
  if (status === 'Cancelled') {
    currentStepIndex = -1; // Special: all steps gray/red
  } else {
    const statusMapping: Record<string, number> = {
      Pending: 0,
      Processing: 1,
      Shipped: 2,
      Delivered: 3,
    };
    currentStepIndex = statusMapping[status] ?? 0;
  }

  // Add status to steps
  const stepsWithStatus = steps.map((step, index) => {
    let stepStatus: 'completed' | 'active' | 'pending' | 'cancelled';
    if (status === 'Cancelled') {
      stepStatus = 'cancelled';
    } else if (index < currentStepIndex) {
      stepStatus = 'completed';
    } else if (index === currentStepIndex) {
      stepStatus = 'active';
    } else {
      stepStatus = 'pending';
    }
    return { ...step, status: stepStatus };
  });

  return (
    <div className="w-full bg-white p-6 sm:p-8 mt-6 border border-gray-100 rounded-md">
      <h2 className="text-2xl font-medium text-gray-900 mb-4 sm:mb-8">Order Status</h2>

      {/* Show Cancelled badge */}
      {status === 'Cancelled' && (
        <div className="text-red-600 font-semibold mb-4 text-center flex items-center justify-center gap-2">
          <X className="w-5 h-5" /> Order Cancelled
        </div>
      )}

      <div className="border-t border-gray-200 mb-8 sm:mb-12"></div>

      {/* Desktop view */}
      <div className="hidden sm:block">
        <div className="flex items-start justify-between relative">
          <div className={`absolute top-[30px] left-[30px] right-[30px] h-1.5 ${status === 'Cancelled' ? 'bg-gray-200' : 'bg-blue-400'}`}></div>
          {stepsWithStatus.map((step, idx) => {
            const Icon = step.icon;
            let bgColor = 'bg-gray-400';
            if (step.status === 'completed') bgColor = 'bg-purple-600';
            if (step.status === 'active') bgColor = 'bg-orange-400';
            if (step.status === 'cancelled') bgColor = 'bg-gray-300';

            return (
              <div key={idx} className="flex flex-col items-center flex-1 relative z-10">
                <div className={`w-[50px] h-[50px] rounded-full flex items-center justify-center mb-4 ${bgColor}`}>
                  <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <div className="text-center text-lg font-sm text-gray-900 mb-2">{step.title}</div>
                <div className="text-center text-sm lg:text-md text-gray-600">{step.date}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile view */}
      <div className="sm:hidden relative pl-10">
        <div className={`absolute left-[30px] top-[30px] bottom-[30px] w-0.5 ${status === 'Cancelled' ? 'bg-red-300' : 'bg-gray-300'}`}></div>
        {stepsWithStatus.map((step, idx) => {
          const Icon = step.icon;
          let bgColor = 'bg-gray-400';
          if (step.status === 'completed') bgColor = 'bg-purple-600';
          if (step.status === 'active') bgColor = 'bg-orange-400';
          if (step.status === 'cancelled') bgColor = 'bg-red-600';

          return (
            <div key={idx} className={`flex items-start gap-4 relative ${idx !== steps.length - 1 ? 'mb-8' : ''}`}>
              <div className={`w-[60px] h-[60px] rounded-full flex items-center justify-center flex-shrink-0 relative z-10 ${bgColor}`}>
                <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <div className="flex-1 pt-2">
                <div className="font-semibold text-gray-900 mb-1">{step.title}</div>
                <div className="text-gray-600 text-sm">{step.date}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}











// import { Order } from '@/types/OrderTypes';
// import { Check, Package, Truck, Home } from 'lucide-react';

// interface OrderStatusTrackerProps {
//   data?: Order;
// }

// export default function OrderStatusTracker({ data }: 

//   OrderStatusTrackerProps) {

//     console.log(data)
//   if (!data) {
//     return (
//       <div className="w-full bg-white p-6 sm:p-8 border border-gray-100 rounded-md">
//         <h2 className="text-2xl font-medium text-gray-900">Recent order status</h2>
//         <p className="mt-4 text-gray-600">No recent orders found.</p>
//       </div>
//     );
//   }

//   const { status, createdAt, updatedAt, estimatedDeliveryDate, actualDeliveryDate } = data;

//   // Helper to format dates
//   const formatDate = (dateStr?: string | null) =>
//     dateStr
//       ? new Date(dateStr).toLocaleString('en-US', {
//           day: '2-digit',
//           month: 'short',
//           year: 'numeric',
//           hour: '2-digit',
//           minute: '2-digit',
//           hour12: true,
//         })
//       : '—';

//   // Steps configuration
//   const steps = [
//     { icon: Check, title: 'Order placed', date: formatDate(createdAt) },
//     { icon: Package, title: 'Preparing for shipment', date: formatDate(updatedAt) },
//     { icon: Truck, title: 'Out for delivery', date: formatDate(estimatedDeliveryDate) },
//     { icon: Home, title: 'Delivered', date: formatDate(actualDeliveryDate) },
//   ];

//   // Determine current step index based on status
//   let currentStepIndex: number;

//   if (status === 'Cancelled') {
//     currentStepIndex = -1; // Special: all steps gray
//   } else if (status === 'Pending') {
//     currentStepIndex = 0; // Only first step colored
//   } else {
//     // Normal mapping
//     const statusMapping: Record<string, number> = {
//       Pending: 0,
//       Processing: 1,
//       Shipped: 2,
//       Delivered: 3,
//     };
//     currentStepIndex = statusMapping[status] ?? 0;
//   }

//   const stepsWithStatus = steps.map((step, index) => {
//     let stepStatus: 'completed' | 'active' | 'pending';

//     if (status === 'Cancelled') {
//       stepStatus = 'pending'; // all gray
//     } else if (status === 'Pending') {
//       stepStatus = index === 0 ? 'active' : 'pending'; // only first colored
//     } else {
//       stepStatus =
//         index < currentStepIndex ? 'completed' : index === currentStepIndex ? 'active' : 'pending';
//     }

//     return { ...step, status: stepStatus };
//   });

//   return (
//     <div className="w-full bg-white p-6 sm:p-8 mt-6 border border-gray-100 rounded-md">
//       <h2 className="text-2xl font-medium text-gray-900 mb-4 sm:mb-8">Order status</h2>
//       <div className="border-t border-gray-200 mb-8 sm:mb-12"></div>

//       {/* Desktop view */}
//       <div className="hidden sm:block">
//         <div className="flex items-start justify-between relative">
//           <div className="absolute top-[30px] left-[30px] right-[30px] h-1.5 bg-gray-200"></div>
//           {stepsWithStatus.map((step, idx) => {
//             const Icon = step.icon;
//             const isCompleted = step.status === 'completed';
//             const isActive = step.status === 'active';
//             return (
//               <div key={idx} className="flex flex-col items-center flex-1 relative z-10">
//                 <div
//                   className={`w-[50px] h-[50px] rounded-full flex items-center justify-center mb-4 ${
//                     isCompleted ? 'bg-purple-600' : isActive ? 'bg-orange-400' : 'bg-gray-400'
//                   }`}
//                 >
//                   <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
//                 </div>
//                 <div className="text-center text-lg font-sm text-gray-900 mb-2">{step.title}</div>
//                 <div className="text-center text-sm lg:text-md text-gray-600">{step.date}</div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Mobile view */}
//       <div className="sm:hidden relative pl-10">
//         <div className="absolute left-[30px] top-[30px] bottom-[30px] w-0.5 bg-gray-300"></div>
//         {stepsWithStatus.map((step, idx) => {
//           const Icon = step.icon;
//           const isCompleted = step.status === 'completed';
//           const isActive = step.status === 'active';
//           return (
//             <div key={idx} className={`flex items-start gap-4 relative ${idx !== steps.length - 1 ? 'mb-8' : ''}`}>
//               <div
//                 className={`w-[60px] h-[60px] rounded-full flex items-center justify-center flex-shrink-0 relative z-10 ${
//                   isCompleted ? 'bg-purple-600' : isActive ? 'bg-orange-400' : 'bg-gray-400'
//                 }`}
//               >
//                 <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
//               </div>
//               <div className="flex-1 pt-2">
//                 <div className="font-semibold text-gray-900 mb-1">{step.title}</div>
//                 <div className="text-gray-600 text-sm">{step.date}</div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }












// import { Order } from '@/types/OrderTypes';
// import { Check, Package, Truck, Home } from 'lucide-react';

// interface OrderStatusTrackerProps {
//   data?: Order;
// }

// export default function OrderStatusTracker({ data }: OrderStatusTrackerProps) {
//   if (!data) {
//     return (
//       <div className="w-full bg-white p-6 sm:p-8 border border-gray-100 rounded-md">
//         <h2 className="text-2xl font-medium text-gray-900">Recent order status</h2>
//         <p className="mt-4 text-gray-600">No recent orders found.</p>
//       </div>
//     );
//   }

//   const { status, createdAt, updatedAt, estimatedDeliveryDate, actualDeliveryDate } = data;

//   // Helper to format dates
//   const formatDate = (dateStr?: string | null) =>
//     dateStr
//       ? new Date(dateStr).toLocaleString('en-US', {
//           day: '2-digit',
//           month: 'short',
//           year: 'numeric',
//           hour: '2-digit',
//           minute: '2-digit',
//           hour12: true,
//         })
//       : '—';

//   // Map backend statuses to step index
//   const statusMapping: Record<string, number> = {
//     Pending: 0,
//     Processing: 1,
//     Shipped: 2,
//     Delivered: 3,
//   };
//   const currentStepIndex = statusMapping[status] ?? 0;

//   // Steps configuration
//   const steps = [
//     { icon: Check, title: 'Order placed', date: formatDate(createdAt) },
//     { icon: Package, title: 'Preparing for shipment', date: formatDate(updatedAt) },
//     { icon: Truck, title: 'Out for delivery', date: formatDate(estimatedDeliveryDate) },
//     { icon: Home, title: 'Delivered', date: formatDate(actualDeliveryDate) },
//   ].map((step, index) => ({
//     ...step,
//     status: index < currentStepIndex ? 'completed' : index === currentStepIndex ? 'active' : 'pending',
//   }));

//   return (
//     <div className="w-full bg-white p-6 sm:p-8 mt-6 border border-gray-100 rounded-md">
//       <h2 className="text-2xl font-medium text-gray-900 mb-4 sm:mb-8">Order status</h2>
//       <div className="border-t border-gray-200 mb-8 sm:mb-12"></div>

//       {/* Desktop view */}
//       <div className="hidden sm:block">
//         <div className="flex items-start justify-between relative">
//            <div className="absolute top-[30px] left-[30px] right-[30px] h-1.5 bg-gray-200"></div>

//           {steps.map((step, idx) => {
//             const Icon = step.icon;
//             const isCompleted = step.status === 'painding';
//             const isActive = step.status === 'active';

//             return (
//               <div key={idx} className="flex flex-col items-center flex-1 relative z-10">
//                 <div
//                   className={`w-[50px] h-[50px] rounded-full flex items-center justify-center mb-4 ${
//                     isCompleted ? 'bg-purple-600' : isActive ? 'bg-orange-400' : 'bg-gray-400'
//                   }`}
//                 >
//                   <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
//                 </div>
//                 <div className="text-center text-lg font-sm text-gray-900 mb-2">{step.title}</div>
//                 <div className="text-center text-sm lg:text-md text-gray-600">{step.date}</div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Mobile view */}
//       <div className="sm:hidden relative pl-10">
//         <div className="absolute left-[30px] top-[30px] bottom-[30px] w-0.5 bg-gray-300"></div>
//         {steps.map((step, idx) => {
//           const Icon = step.icon;
//           const isCompleted = step.status === 'completed';
//           const isActive = step.status === 'active';

//           return (
//             <div key={idx} className={`flex items-start gap-4 relative ${idx !== steps.length - 1 ? 'mb-8' : ''}`}>
//               <div
//                 className={`w-[60px] h-[60px] rounded-full flex items-center justify-center flex-shrink-0 relative z-10 ${
//                   isCompleted ? 'bg-purple-600' : isActive ? 'bg-orange-400' : 'bg-gray-400'
//                 }`}
//               >
//                 <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
//               </div>
//               <div className="flex-1 pt-2">
//                 <div className="font-semibold text-gray-900 mb-1">{step.title}</div>
//                 <div className="text-gray-600 text-sm">{step.date}</div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
















// import { Order } from '@/types/OrderTypes';
// import { Check, Package, Truck, Home } from 'lucide-react';
// // import { format } from 'date-fns';

// export default function OrderStatusTracker({ data }: { data?: Order }) {
//   if (!data) {
//     return (
//       <div className="w-full bg-white p-6 sm:p-8 border-gray-100 border-1 rounded-md">
//         <h2 className="text-2xl sm:text-2xl font-medium text-gray-900">
//           Recent order status
//         </h2>
//         <p className="mt-4 text-gray-600">No recent orders found.</p>
//       </div>
//     );
//   }

//   // Destructure main order data
//   const {
//     // _id,
//     status,
//     // orderNumber,
//     createdAt,
//     actualDeliveryDate,
//     // grandTotal,
//     // products,
//     // shippingMethodId,
//     estimatedDeliveryDate,
//     // paymentStatus,
//     // totalPrice,
//     // discount,
//     // tax,
//     // promoCode,
//     // orderNotes,
//     // shippingFee,
//     // statusHistory,
//     // trackingNumber,
//     updatedAt,
//     // userId,
//     // shippingAddress,
//   } = data;

//   // Nested destructuring
//   // const {
//   //   code: shippingCode,
//   //   name: shippingName,
//   //   trackingUrl,
//   // } = shippingMethodId || {};

//   // const {
//   //   fullName,
//   //   mobileNumber,
//   //   addressSpecific,
//   //   city,
//   //   state,
//   //   zipCode,
//   //   country,
//   // } = shippingAddress || {};

//   // const {
//   //   email,
//   //   name: userName,
//   //   phone,
//   //   profileImage,
//   // } = userId || {};

//   // Date formatting helper
//  const formatDate = (dateStr?: string | null) =>
//   dateStr
//     ? new Date(dateStr).toLocaleString('en-US', {
//         day: '2-digit',
//         month: 'short',
//         year: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit',
//         hour12: true,
//       })
//     : '—';
//   // Build dynamic steps based on order data
//   const steps = [
//     {
//       icon: Check,
//       title: 'Order placed',
//       date: formatDate(createdAt),
//       status: 'completed',
//       color: 'purple',
//     },
//     {
//       icon: Package,
//       title: 'Preparing for shipment',
//       date: formatDate(updatedAt),
//       status:
//         status === 'Pending' || status === 'Processing'
//           ? 'active'
//           : status === 'Shipped' || status === 'Delivered'
//           ? 'completed'
//           : 'pending',
//       color: 'orange',
//     },
//     {
//       icon: Truck,
//       title: 'Out for delivery',
//       date: formatDate(estimatedDeliveryDate),
//       status:
//         status === 'Shipped' || status === 'Delivered'
//           ? 'active'
//           : 'pending',
//       color: 'gray',
//     },
//     {
//       icon: Home,
//       title: 'Delivered',
//       date: formatDate(actualDeliveryDate),
//       status: status === 'Delivered' ? 'completed' : 'pending',
//       color: 'gray',
//     },
//   ];

//   return (
//     <div className="w-full bg-white p-6 sm:p-8 mt-6 border-gray-100 border-1 rounded-md">
//       {/* Title */}
//       <h2 className="text-2xl font-medium text-gray-900 mb-4 sm:mb-8">
//         Order status
//       </h2>

//       {/* Border line */}
//       <div className="border-t border-gray-200 mb-8 sm:mb-12 border-1"></div>

//       {/* Status Timeline */}
//       <div className="relative">
//         {/* Desktop View */}
//         <div className="hidden sm:block">
//           <div className="flex items-start justify-between relative">
//             {/* Connecting Line */}
//             <div className="absolute top-[30px] left-[30px] right-[30px] h-1.5 bg-gray-200"></div>

//             {steps.map((step, index) => {
//               const Icon = step.icon;
//               const isCompleted = step.status === 'completed';
//               const isActive = step.status === 'active';

//               return (
//                 <div
//                   key={index}
//                   className="flex flex-col items-center flex-1 relative z-10"
//                 >
//                   <div
//                     className={`w-[50px] h-[50px] rounded-full flex items-center justify-center mb-4 ${
//                       isCompleted
//                         ? 'bg-purple-600'
//                         : isActive
//                         ? 'bg-orange-400'
//                         : 'bg-gray-400'
//                     }`}
//                   >
//                     <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
//                   </div>

//                   <div className="text-center font-sm text-gray-900 mb-2 text-lg lg:text-lg">
//                     {step.title}
//                   </div>

//                   <div className="text-center text-gray-600 text-sm lg:text-md">
//                     {step.date}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Mobile View */}
//         <div className="sm:hidden">
//           <div className="relative pl-10">
//             <div className="absolute left-[30px] top-[30px] bottom-[30px] w-0.5 bg-gray-300"></div>

//             {steps.map((step, index) => {
//               const Icon = step.icon;
//               const isCompleted = step.status === 'completed';
//               const isActive = step.status === 'active';

//               return (
//                 <div
//                   key={index}
//                   className={`flex items-start gap-4 relative ${
//                     index !== steps.length - 1 ? 'mb-8' : ''
//                   }`}
//                 >
//                   <div
//                     className={`w-[60px] h-[60px] rounded-full flex items-center justify-center flex-shrink-0 relative z-10 ${
//                       isCompleted
//                         ? 'bg-purple-600'
//                         : isActive
//                         ? 'bg-orange-400'
//                         : 'bg-gray-400'
//                     }`}
//                   >
//                     <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
//                   </div>

//                   <div className="flex-1 pt-2">
//                     <div className="font-semibold text-gray-900 mb-1">
//                       {step.title}
//                     </div>
//                     <div className="text-gray-600 text-sm">{step.date}</div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }














// // import { Order } from "@/types/OrderTypes";
// // import { Check, Package, Truck, Home } from "lucide-react";

// // export default function OrderStatusTracker({ data }: { data?: Order }) {
// //   if (!data) return null;

// //   const steps = [
// //     { icon: Check, title: "Order placed", date: new Date(data.createdAt).toLocaleString(), status: data.status === "placed" ? "active" : "completed" },
// //     { icon: Package, title: "Preparing for shipment", date: "", status: data.status === "preparing" ? "active" : "pending" },
// //     { icon: Truck, title: "Out for delivery", date: "", status: data.status === "shipped" ? "active" : "pending" },
// //     { icon: Home, title: "Delivered", date: data.actualDeliveryDate ? new Date(data.actualDeliveryDate).toLocaleDateString() : "", status: data.status === "delivered" ? "completed" : "pending" },
// //   ];

// //   return (
// //     <div className="w-full bg-white p-6 sm:p-8 mt-6 border-gray-100 border rounded-md">
// //       <h2 className="text-2xl font-medium text-gray-900 mb-4">Order status</h2>
// //       <div className="border-t border-gray-200 mb-8"></div>

// //       <div className="hidden sm:flex justify-between relative">
// //         <div className="absolute top-[30px] left-[30px] right-[30px] h-1.5 bg-gray-200"></div>
// //         {steps.map((step, i) => {
// //           const Icon = step.icon;
// //           const isCompleted = step.status === "completed";
// //           const isActive = step.status === "active";
// //           return (
// //             <div key={i} className="flex flex-col items-center relative z-10">
// //               <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${isCompleted ? "bg-purple-600" : isActive ? "bg-orange-400" : "bg-gray-400"}`}>
// //                 <Icon className="w-6 h-6 text-white" />
// //               </div>
// //               <div className="text-center font-sm text-gray-900">{step.title}</div>
// //               <div className="text-center text-gray-600 text-sm">{step.date}</div>
// //             </div>
// //           );
// //         })}
// //       </div>
// //     </div>
// //   );
// // }




// import { Order } from '@/types/OrderTypes';
// import { Check, Package, Truck, Home } from 'lucide-react';

// export default function OrderStatusTracker({data}: {data?:Order}) {
//   if(!data){
//   return <div className="w-full bg-white p-6 sm:p-8 border-gray-100 border-1 rounded-md">
//     <h2 className="text-2xl sm:text-2xl font-medium text-gray-900">
//       Recent order status
//     </h2>
//     <p className="mt-4 text-gray-600">No recent orders found.</p>
//   </div>
// }
// //   const {_id,status,
// // orderNumber,
// // createdAt,
// // actualDeliveryDate,
// // grandTotal,
// // products,
// // shippingMethodId} = data
  
//   const {
   
//   status,
//   orderNumber,
  
//   grandTotal,
//   products,
//   shippingMethodId,
 
//   shippingAddress,
// } = data;

// // You can also destructure nested fields if needed:
// const {
   
//   name: shippingName,
   
// } = shippingMethodId || {};

// const {
//   fullName,
  
// } = shippingAddress || {};

 

// // Example usage
// console.log({
//   orderNumber,
//   status,
//   grandTotal,
//   shippingName,
//   fullName,
//   productsCount: products?.length,
// });

  
//   const steps = [
//     {
//       icon: Check,
//       title: 'Order placed',
//       date: '17 june, 2025  3:50 pm',
//       status: 'completed',
//       color: 'purple'
//     },
//     {
//       icon: Package,
//       title: 'Preparing for shipment',
//       date: '17 june, 2025  9:00 pm',
//       status: 'active',
//       color: 'orange'
//     },
//     {
//       icon: Truck,
//       title: 'Out of delivery',
//       date: 'Estimate 21 june, 2025',
//       status: 'pending',
//       color: 'gray'
//     },
//     {
//       icon: Home,
//       title: 'Delivered',
//       date: 'Estimate 21 june, 25',
//       status: 'pending',
//       color: 'gray'
//     }
//   ];

//   return (
//     <div className="w-full bg-white p-6 sm:p-8 mt-6 border-gray-100 border-1 rounded-md">
//       {/* Title */}
//       <h2 className="text-2xl font-medium text-gray-900 mb-4 sm:mb-8">Order status</h2>
      
//       {/* Border line */}
//       <div className="border-t border-gray-200 mb-8 sm:mb-12 border-1"></div>

//       {/* Status Timeline */}
//       <div className="relative">
//         {/* Desktop/Tablet View */}
//         <div className="hidden sm:block">
//           <div className="flex items-start justify-between relative">
//             {/* Connecting Line */}
//             <div className="absolute top-[30px] left-[30px] right-[30px] h-1.5 bg-gray-200"></div>
            
//             {steps.map((step, index) => {
//               const Icon = step.icon;
//               const isCompleted = step.status === 'completed';
//               const isActive = step.status === 'active';
              
//               return (
//                 <div key={index} className="flex flex-col items-center flex-1 relative z-10">
//                   {/* Icon Circle */}
//                   <div className={`w-[50px] h-[50px] rounded-full flex items-center justify-center mb-4 ${
//                     isCompleted 
//                       ? 'bg-purple-600' 
//                       : isActive 
//                       ? 'bg-orange-400' 
//                       : 'bg-gray-400'
//                   }`}>
//                     <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
//                   </div>
                  
//                   {/* Title */}
//                   <div className="text-center font-sm text-gray-900 mb-2 text-lg lg:text-lg">
//                     {step.title}
//                   </div>
                  
//                   {/* Date */}
//                   <div className="text-center text-gray-600 text-sm lg:text-md">
//                     {step.date}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Mobile View */}
//         <div className="sm:hidden">
//           <div className="relative pl-10">
//             {/* Vertical Connecting Line */}
//             <div className="absolute left-[30px] top-[30px] bottom-[30px] w-0.5 bg-gray-300"></div>
            
//             {steps.map((step, index) => {
//               const Icon = step.icon;
//               const isCompleted = step.status === 'completed';
//               const isActive = step.status === 'active';
              
//               return (
//                 <div key={index} className={`flex items-start gap-4 relative ${index !== steps.length - 1 ? 'mb-8' : ''}`}>
//                   {/* Icon Circle */}
//                   <div className={`w-[60px] h-[60px] rounded-full flex items-center justify-center flex-shrink-0 relative z-10 ${
//                     isCompleted 
//                       ? 'bg-purple-600' 
//                       : isActive 
//                       ? 'bg-orange-400' 
//                       : 'bg-gray-400'
//                   }`}>
//                     <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
//                   </div>
                  
//                   {/* Content */}
//                   <div className="flex-1 pt-2">
//                     <div className="font-semibold text-gray-900 mb-1">
//                       {step.title}
//                     </div>
//                     <div className="text-gray-600 text-sm">
//                       {step.date}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }