import { Spinner } from '@/components/ui/spinner';
import { useGetOrderByIdAdminQuery } from '@/Redux/Features/Order/Order.api';
import { Edit2 } from 'lucide-react';
import { useParams } from 'react-router-dom';

export default function ShippingInformation() {
    const { id } = useParams();
    const { data, isLoading } = useGetOrderByIdAdminQuery({ id });

    if (isLoading)
        return (
            <p className="text-center min-h-20 grid place-content-center">
                <Spinner />
            </p>
        );

    const orderData = data?.data;
    const shipping = orderData?.shippingAddress; // assuming your API returns shipping info here

    return (
        <div className="w-full bg-white p-6 sm:p-8 mt-6 border-gray-100 border-1 rounded-2xl">
            {/* Header with Edit Button */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="">Shipping information</h2>
                <button className="w-9 h-9 flex items-center justify-center rounded-2xl hover:bg-blue-50 transition-colors">
                    <Edit2 className="w-5 h-5 text-blue-600" strokeWidth={2} />
                </button>
            </div>

            {/* Delivery Address Section */}
            <div className="mb-8 space-y-4">
                <h3 className="">Delivery Address</h3>
                <p className="">{shipping?.fullName || 'N/A'}</p>
                <p className="p2">
                    {shipping?.addressSpecific}, {shipping?.city}, {shipping?.state}, {shipping?.zipCode}, {shipping?.country}
                </p>
                <p className="p2 text-base">{shipping?.mobileNumber}</p>
            </div>

            {/* Shipping Details Section */}
            <div className='space-y-4'>
                <h3 className="">Shipping Details</h3>

                {/* Carrier */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-1 sm:gap-4">
                    <p className="p2 text-base">Carrier</p>
                    <p className="">{orderData?.carrier || 'DHL Express'}</p>
                </div>

                {/* Tracking Number */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
                    <p className="p2 text-base">Tracking number</p>
                    <p className="text-gray-900 font-medium sm:text-right">{orderData?.trackingNumber || '#98593656'}</p>
                </div>
            </div>
        </div>
    );
}
