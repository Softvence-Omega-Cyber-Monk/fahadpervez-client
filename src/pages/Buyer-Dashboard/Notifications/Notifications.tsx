import { Package, Truck, CreditCard } from 'lucide-react';

export default function Notifications() {
  const timelineData = [
    {
      section: 'Today',
      activities: [
        {
          icon: Package,
          iconBg: 'bg-orange-100',
          iconColor: 'text-orange-500',
          title: 'Your order is placed. Order id is #ORD-2025-347',
          time: '2h ago',
          highlighted: true
        },
        {
          icon: Truck,
          iconBg: 'bg-purple-100',
          iconColor: 'text-purple-600',
          title: 'Your order #ORD-2025-342 has been shipped',
          time: '3h ago',
          highlighted: false
        },
        {
          icon: CreditCard,
          iconBg: 'bg-green-100',
          iconColor: 'text-green-600',
          title: 'Your order #ORD-2025-347 Payment has been complete',
          time: '3h ago',
          highlighted: false
        }
      ]
    },
    {
      section: 'Yesterday',
      activities: [
        {
          icon: Package,
          iconBg: 'bg-orange-100',
          iconColor: 'text-orange-500',
          title: 'Your order is placed. Order id is #ORD-2025-347',
          time: '2h ago',
          highlighted: false
        },
        {
          icon: Truck,
          iconBg: 'bg-purple-100',
          iconColor: 'text-purple-600',
          title: 'The order #ORD-2025-342 has been shipped',
          time: '3h ago',
          highlighted: true
        },
        {
          icon: Package,
          iconBg: 'bg-orange-100',
          iconColor: 'text-orange-500',
          title: 'Your order is placed. Order id is #ORD-2025-347',
          time: '2h ago',
          highlighted: false
        },
        {
          icon: CreditCard,
          iconBg: 'bg-green-100',
          iconColor: 'text-green-600',
          title: 'Your order #ORD-2025-347 Payment has been complete',
          time: '3h ago',
          highlighted: false
        },
        {
          icon: Truck,
          iconBg: 'bg-purple-100',
          iconColor: 'text-purple-600',
          title: '*The order #ORD-2025-342 has been shipped',
          time: '3h ago',
          highlighted: false
        }
      ]
    }
  ];

  return (
    <div>
        <h1 className='mb-6'>NOTIFICATION (4)</h1>
        <div className="w-full p-4 sm:p-6 lg:p-8 shadow-md bg-white rounded-xl mb-5">
      <div className="space-y-8">
        {timelineData.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            {/* Section Header */}
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              {section.section}
            </h2>

            {/* Activities */}
            <div className="space-y-3">
              {section.activities.map((activity, activityIndex) => (
                <div
                  key={activityIndex}
                  className={`flex items-start gap-4 p-4 rounded-xl ${
                    activity.highlighted ? 'bg-blue-50' : 'bg-white'
                  }`}
                >
                  {/* Icon */}
                  <div className={`${activity.iconBg} rounded-lg p-2.5 flex-shrink-0`}>
                    <activity.icon className={`w-5 h-5 ${activity.iconColor}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 pt-0.5">
                    <p className="text-gray-700 text-sm sm:text-base font-medium mb-1">
                      {activity.title}
                    </p>
                    <p className="text-gray-500 text-xs sm:text-sm">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}