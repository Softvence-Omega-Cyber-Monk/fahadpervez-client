import { Package, Truck, CreditCard, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RecentActivity() {
  const activities = [
    {
      icon: Package,
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-500',
      title: 'You placed an order #ORD-2025-347',
      time: '2h ago'
    },
    {
      icon: Truck,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      title: 'Order #ORD-2025-347 has been shipped',
      time: 'Yesterday'
    },
    {
      icon: CreditCard,
      iconBg: 'bg-red-100',
      iconColor: 'text-red-500',
      title: 'Payment of $934 has been completed',
      time: 'Yesterday'
    },
    {
      icon: MessageSquare,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      title: 'New message from Tecsupplies Inc.',
      time: '17 june, 2025'
    }
  ];

  return (
    <div className="w-full mt-6 mb-5">
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Recent Activity
          </h2>
          <Link to='/buyer-dashboard/notifications'
            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            View all
          </Link>
        </div>

        {/* Activity List */}
        <div className="space-y-5">
          {activities.map((activity, index) => (
            <div key={index} className="flex gap-3">
              {/* Icon */}
              <div className={`${activity.iconBg} rounded-lg p-2 flex-shrink-0 h-fit`}>
                <activity.icon className={`w-5 h-5 ${activity.iconColor}`} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-1">
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
    </div>
  );
}