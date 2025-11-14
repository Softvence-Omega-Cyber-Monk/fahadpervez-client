import { Check, Package, Truck, Home, X } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { Spinner } from '@/components/ui/spinner';
import { useGetOrderByIdAdminQuery } from '@/Redux/Features/Order/Order.api';

export default function OrderSteps() {
  const { id } = useParams();
  const { data, isLoading } = useGetOrderByIdAdminQuery({ id });

  if (isLoading)
    return (
      <p className="text-center min-h-20 grid place-content-center">
        <Spinner />
      </p>
    );

  const orderData = data?.data;
  const status: string = orderData?.status;

  // Define steps
  const baseSteps = [
    { icon: Check, title: 'Order placed', key: 'placed', date: new Date(orderData?.createdAt).toLocaleString() },
    { icon: Package, title: 'Preparing for shipment', key: 'preparing', date: orderData?.statusDate?.preparingForShipment || 'N/A' },
    { icon: Truck, title: 'Out for delivery', key: 'outForDelivery', date: orderData?.statusDate?.outForDelivery || 'Estimate TBD' },
    { icon: Home, title: 'Delivered', key: 'delivered', date: orderData?.statusDate?.delivered || 'Estimate TBD' },
  ];

  // If cancelled, add cancelled step
  if (status === 'Cancelled') {
    baseSteps.push({ icon: X, title: 'Cancelled', key: 'cancelled', date: orderData?.statusDate?.cancelled || new Date().toLocaleString() });
  }

  // Map status to step display
  const steps = baseSteps.map((step) => {
    if (status === 'Cancelled') {
      // All previous steps disabled, last step cancelled
      if (step.key === 'cancelled') return { ...step, displayStatus: 'cancelled', color: 'red' };
      return { ...step, displayStatus: 'disabled', color: 'gray' };
    } else {
      // Normal flow
      let displayStatus: 'completed' | 'active' | 'pending' = 'pending';
      if (step.key === 'placed') displayStatus = 'completed';
      if (step.key === 'preparing') displayStatus = ['Preparing for Shipment', 'Out for Delivery', 'Delivered'].includes(status) ? 'completed' : status === 'Confirmed' ? 'active' : 'pending';
      if (step.key === 'outForDelivery') displayStatus = ['Out for Delivery', 'Delivered'].includes(status) ? 'completed' : status === 'Out for Delivery' ? 'active' : 'pending';
      if (step.key === 'delivered') displayStatus = status === 'Delivered' ? 'completed' : 'pending';
      return { ...step, displayStatus, color: displayStatus === 'completed' ? 'purple' : displayStatus === 'active' ? 'orange' : 'gray' };
    }
  });

  return (
    <div className="w-full bg-white p-6 sm:p-8 mt-6 border border-gray-100 rounded-2xl">
      <h2 className="text-2xl font-medium text-gray-900 mb-4 sm:mb-8">Order status</h2>
      <div className="border-t border-gray-200 mb-8 sm:mb-12"></div>

      {/* Desktop / Tablet */}
      <div className="hidden sm:block">
        <div className="flex items-start justify-between relative">
          <div className={`absolute top-[30px] left-[30px] right-[30px] h-1.5 bg-gray-200`}></div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = step.displayStatus === 'completed';
            const isActive = step.displayStatus === 'active';
            const isCancelled = step.displayStatus === 'cancelled';
            const isDisabled = step.displayStatus === 'disabled';

            return (
              <div key={index} className="flex flex-col items-center flex-1 relative z-10">
                <div
                  className={`w-[50px] h-[50px] rounded-full flex items-center justify-center mb-4 ${
                    isCancelled
                      ? 'bg-red-500'
                      : isCompleted
                      ? 'bg-purple-600'
                      : isActive
                      ? 'bg-orange-400'
                      : 'bg-gray-300'
                  }`}
                >
                  <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <div className={`text-center mb-2 text-lg ${isDisabled ? 'text-gray-400' : 'text-gray-900'}`}>{step.title}</div>
                <div className={`text-center text-sm ${isDisabled ? 'text-gray-400' : 'text-gray-600'}`}>{step.date}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile */}
      <div className="sm:hidden">
        <div className="relative pl-10">
          <div className="absolute left-[30px] top-[30px] bottom-[30px] w-0.5 bg-gray-300"></div>
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = step.displayStatus === 'completed';
            const isActive = step.displayStatus === 'active';
            const isCancelled = step.displayStatus === 'cancelled';
            const isDisabled = step.displayStatus === 'disabled';

            return (
              <div
                key={index}
                className={`flex items-start gap-4 relative ${index !== steps.length - 1 ? 'mb-8' : ''}`}
              >
                <div
                  className={`w-[60px] h-[60px] rounded-full flex items-center justify-center flex-shrink-0 relative z-10 ${
                    isCancelled
                      ? 'bg-red-500'
                      : isCompleted
                      ? 'bg-purple-600'
                      : isActive
                      ? 'bg-orange-400'
                      : 'bg-gray-300'
                  }`}
                >
                  <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <div className="flex-1 pt-2">
                  <div className={`mb-1 font-semibold ${isDisabled ? 'text-gray-400' : 'text-gray-900'}`}>{step.title}</div>
                  <div className={`text-sm ${isDisabled ? 'text-gray-400' : 'text-gray-600'}`}>{step.date}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
