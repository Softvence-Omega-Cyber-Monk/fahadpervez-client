interface OrderSummaryProps {
  data: { status: string; count: number; percentage: string; color: string }[];
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ data }) => (
  <div className="bg-white rounded-lg   overflow-hidden">
    <h2 className="text-xl font-bold text-gray-900 px-6 py-4  ">
      Order Summary
    </h2>
    <div className="p-4 md:p-6 overflow-x-auto">
      <table className="w-full min-w-[400px]">
        <thead>
          <tr className="bg-[#e8eaeb]   ">
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Count</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Percentage</th>
          </tr>
        </thead>
        <tbody>
          {data.map((order, idx) => (
            <tr key={idx} className="border-t border-gray-100">
              <td className="py-4 px-4">
                <span
                  className={`inline-block px-3 py-1 rounded-md text-sm font-medium ${order.color}`}
                >
                  {order.status}
                </span>
              </td>
              <td className="py-4 px-4 text-sm text-gray-900">{order.count}</td>
              <td className="py-4 px-4 text-sm text-gray-900">{order.percentage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default OrderSummary;
