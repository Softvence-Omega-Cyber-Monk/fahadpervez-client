export default function OrderStats() {
  const stats = [
    {
      title: 'Order Complete',
      value: '122 order complete total',
      bgColor: 'bg-gray-50'
    },
    {
      title: 'Cancel Order',
      value: '25 order cancel',
      bgColor: 'bg-gray-50'
    },
    {
      title: 'Buy Amount',
      value: '$6,000 USD total buy',
      bgColor: 'bg-gray-50'
    }
  ];

  return (
    <div className="w-full mt-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.bgColor} rounded-lg p-4 sm:p-5 bg-white`}
          >
            <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-1">
              {stat.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}