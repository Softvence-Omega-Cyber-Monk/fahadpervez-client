interface SalesByTimePeriodProps {
  data: { date: string; orders: number; revenue: string; aov: string; growth: string; isPositive: boolean }[];
}

const SalesByTimePeriod: React.FC<SalesByTimePeriodProps> = ({ data }) => (
  <div className="    py-6">
    <div className="bg-white rounded-lg  p-8 overflow-hidden">
      <h2 className="text-xl font-bold text-gray-700 px-4 md:px-6 py-4   ">
        Sales by Time Period
      </h2>
      <div className="p-4 md:p-6 overflow-x-auto">
        <table className="w-full min-w-[500px]">
          <thead>
            <tr className="bg-[#e8eaeb]">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Orders</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Revenue</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">AOV</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Growth</th>
            </tr>
          </thead>
          <tbody>
            {data.map((sale, idx) => (
              <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4 text-sm text-gray-600">{sale.date}</td>
                <td className="py-4 px-4 text-sm text-gray-600">{sale.orders}</td>
                <td className="py-4 px-4 text-sm text-gray-600">{sale.revenue}</td>
                <td className="py-4 px-4 text-sm text-gray-600">{sale.aov}</td>
                <td className="py-4 px-4">
                  <span className={`text-sm font-medium ${sale.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {sale.growth}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default SalesByTimePeriod;
