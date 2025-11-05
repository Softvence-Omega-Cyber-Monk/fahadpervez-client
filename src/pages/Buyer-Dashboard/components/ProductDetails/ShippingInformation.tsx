
import { Order } from '@/types/OrderTypes';
import { Edit2 } from 'lucide-react';

export default function ShippingInformation({ data }: { data?: Order }) {
  if (!data) {
    return (
      <div className="w-full bg-white p-6 sm:p-8 border border-gray-100 rounded-md">
        <h2 className="text-2xl font-medium text-gray-900">Recent order status</h2>
        <p className="mt-4 text-gray-600">No recent orders found.</p>
      </div>
    );
  }

  const { shippingAddress, shippingMethodId, trackingNumber } = data;

  if (!shippingAddress) {
    return (
      <div className="w-full bg-white p-6 sm:p-8 border border-gray-100 rounded-md">
        <h2 className="text-2xl font-medium text-gray-900">Shipping information</h2>
        <p className="mt-4 text-gray-600">No shipping address available.</p>
      </div>
    );
  }

  const {
    fullName,
    mobileNumber,
    addressSpecific,
    city,
    state,
    zipCode,
    country,
  } = shippingAddress;

  return (
    <div className="w-full bg-white p-6 sm:p-8 mt-6 border border-gray-100 rounded-md">
      {/* Header with Edit Button */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-medium text-gray-900">Shipping information</h2>
        <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-blue-50 transition-colors">
          <Edit2 className="w-5 h-5 text-blue-600" strokeWidth={2} />
        </button>
      </div>

      {/* Delivery Address Section */}
      <div className="mb-8">
        <h3 className="text-lg text-gray-600 mb-3">Delivery Address</h3>
        <div className="text-gray-900 font-medium">{fullName}</div>
        <div className="text-gray-600 text-sm">
          {addressSpecific}, {city}, {state} {zipCode}, {country}
        </div>
        {mobileNumber && <div className="text-gray-600 text-sm mt-1">Mobile: {mobileNumber}</div>}
      </div>

      {/* Shipping Details Section */}
      <div>
        <h3 className="text-lg text-gray-600 mb-4">Shipping Details</h3>

        {/* Carrier */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-1 sm:gap-4">
          <div className="text-gray-600">Carrier</div>
          <div className="text-gray-900 font-medium sm:text-right">
            {shippingMethodId?.name || "Not available"}
          </div>
        </div>

        {/* Tracking Number */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
          <div className="text-gray-600">Tracking number</div>
          <div className="text-gray-900 font-medium sm:text-right">
            {trackingNumber || "Not available"}
          </div>
        </div>
      </div>
    </div>
  );
}
















// import { Order } from '@/types/OrderTypes';
// import { Edit2 } from 'lucide-react';

// export default function ShippingInformation({ data }: { data?: Order }) {
//   console.log(data)
// if (!data) {
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
//   // const {
//   //   // _id,
//   //   status,
//   //   // orderNumber,
//   //   createdAt,
//   //   actualDeliveryDate,
//   //   // grandTotal,
//   //   // products,
//   //   // shippingMethodId,
//   //   estimatedDeliveryDate,
//   //   // paymentStatus,
//   //   // totalPrice,
//   //   // discount,
//   //   // tax,
//   //   // promoCode,
//   //   // orderNotes,
//   //   // shippingFee,
//   //   // statusHistory,
//   //   // trackingNumber,
//   //   updatedAt,
//   //   // userId,
//   //   // shippingAddress,
//   // } = data;

//  const {
//     fullName,
//     mobileNumber,
//     addressSpecific,
//     city,
//     state,
//     zipCode,
//     country,
//   } = shippingAddress || {};



//    return (
//     <div className="w-full bg-white p-6 sm:p-8 mt-6 border-gray-100 border-1 rounded-md">
//       {/* Header with Edit Button */}
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-2xl font-medium text-gray-900">Shipping information</h2>
//         <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-blue-50 transition-colors">
//           <Edit2 className="w-5 h-5 text-blue-600" strokeWidth={2} />
//         </button>
//       </div>

//       {/* Delivery Address Section */}
//       <div className="mb-8">
//         <h3 className="text-lg text-gray-600 mb-3">Delivery Address</h3>
//         <div className="text-gray-500 mb-2">Marvin McKinney</div>
//         <div className="text-gray-600 text-sm">
//           1234 Business Ave, Suite 567, New York, NY 10001, United States
//         </div>
//       </div>

//       {/* Shipping Details Section */}
//       <div>
//         <h3 className="text-lg text-gray-600 mb-4">Shipping Details</h3>
        
//         {/* Carrier */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-1 sm:gap-4">
//           <div className="text-gray-600">Carrier</div>
//           <div className="text-gray-600 font-medium sm:text-right">DHL Express</div>
//         </div>

//         {/* Tracking Number */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
//           <div className="text-gray-600">Tracking number</div>
//           <div className="text-gray-900 font-medium sm:text-right">#98593656</div>
//         </div>
//       </div>
//     </div>
//   );
// }