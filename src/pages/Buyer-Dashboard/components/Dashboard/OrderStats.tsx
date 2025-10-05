
import { Package, CheckCircle, Truck, DollarSign } from 'lucide-react';

export default function OrderStats() {
  const stats = [
    {
      icon: Package,
      title: 'Total Orders',
      value: '16',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      valueColor: 'text-purple-600'
    },
    {
      icon: CheckCircle,
      title: 'Complete Orders',
      value: '11',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      valueColor: 'text-green-600'
    },
    {
      icon: Truck,
      title: 'Pending Orders',
      value: '3',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-500',
      valueColor: 'text-orange-500'
    },
    {
      icon: DollarSign,
      title: 'Total Spending',
      value: '$135',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
      valueColor: 'text-red-600'
    }
  ];

  return (
    <div className="w-full bg-gray-50 mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className={`${stat.bgColor} rounded-xl p-6`}>
                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
              <h3 className="text-gray-700 text-sm font-medium">
                {stat.title}
              </h3>
            </div>
            <p className={`text-4xl font-bold ${stat.valueColor}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}