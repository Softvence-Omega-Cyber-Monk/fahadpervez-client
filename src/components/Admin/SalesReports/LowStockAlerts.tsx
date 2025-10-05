interface LowStockAlertsProps {
  data: { name: string; stock: number; color: string }[];
}

const LowStockAlerts: React.FC<LowStockAlertsProps> = ({ data }) => (
  <div className="bg-white rounded-lg   overflow-hidden">
    <h2 className="text-xl font-bold text-gray-900 px-6 py-4 border-b border-gray-200">
      Low Stock Alerts
    </h2>
    <div className="p-4 md:p-6 overflow-x-auto">
      <table className="w-full min-w-[400px]">
        <thead>
          <tr className="bg-[#e8eaeb]">
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Product Name</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Stock</th>
          </tr>
        </thead>
        <tbody>
          {data.map((product, idx) => (
            <tr key={idx} className="border-t border-gray-100">
              <td className="py-4 px-4 text-sm text-gray-900">{product.name}</td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-900 w-8">{product.stock}</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${product.color}`}
                      style={{ width: `${product.stock}%` }}
                    />
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default LowStockAlerts;
