import { Check, Package, Truck, Home } from 'lucide-react';

export default function OrderSteps() {
  const steps = [
    {
      icon: Check,
      title: 'Order placed',
      date: '17 june, 2025  3:50 pm',
      status: 'completed',
      color: 'purple'
    },
    {
      icon: Package,
      title: 'Preparing for shipment',
      date: '17 june, 2025  9:00 pm',
      status: 'active',
      color: 'orange'
    },
    {
      icon: Truck,
      title: 'Out of delivery',
      date: 'Estimate 21 june, 2025',
      status: 'pending',
      color: 'gray'
    },
    {
      icon: Home,
      title: 'Delivered',
      date: 'Estimate 21 june, 25',
      status: 'pending',
      color: 'gray'
    }
  ];

  return (
    <div className="w-full bg-white p-6 sm:p-8 mt-6 border-gray-100 border-1 rounded-2xl">
      {/* Title */}
      <h2 className="text-2xl font-medium text-gray-900 mb-4 sm:mb-8">Order status</h2>
      
      {/* Border line */}
      <div className="border-t border-gray-200 mb-8 sm:mb-12 border-1"></div>

      {/* Status Timeline */}
      <div className="relative">
        {/* Desktop/Tablet View */}
        <div className="hidden sm:block">
          <div className="flex items-start justify-between relative">
            {/* Connecting Line */}
            <div className="absolute top-[30px] left-[30px] right-[30px] h-1.5 bg-gray-200"></div>
            
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = step.status === 'completed';
              const isActive = step.status === 'active';
              
              return (
                <div key={index} className="flex flex-col items-center flex-1 relative z-10">
                  {/* Icon Circle */}
                  <div className={`w-[50px] h-[50px] rounded-full flex items-center justify-center mb-4 ${
                    isCompleted 
                      ? 'bg-purple-600' 
                      : isActive 
                      ? 'bg-orange-400' 
                      : 'bg-gray-400'
                  }`}>
                    <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>
                  
                  {/* Title */}
                  <div className="text-center font-sm text-gray-900 mb-2 text-lg lg:text-lg">
                    {step.title}
                  </div>
                  
                  {/* Date */}
                  <div className="text-center text-gray-600 text-sm lg:text-md">
                    {step.date}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile View */}
        <div className="sm:hidden">
          <div className="relative pl-10">
            {/* Vertical Connecting Line */}
            <div className="absolute left-[30px] top-[30px] bottom-[30px] w-0.5 bg-gray-300"></div>
            
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = step.status === 'completed';
              const isActive = step.status === 'active';
              
              return (
                <div key={index} className={`flex items-start gap-4 relative ${index !== steps.length - 1 ? 'mb-8' : ''}`}>
                  {/* Icon Circle */}
                  <div className={`w-[60px] h-[60px] rounded-full flex items-center justify-center flex-shrink-0 relative z-10 ${
                    isCompleted 
                      ? 'bg-purple-600' 
                      : isActive 
                      ? 'bg-orange-400' 
                      : 'bg-gray-400'
                  }`}>
                    <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <div className="font-semibold text-gray-900 mb-1">
                      {step.title}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {step.date}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}