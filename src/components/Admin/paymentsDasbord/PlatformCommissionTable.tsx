interface Commission {
  store: string;
  amount: string;
}

export const PlatformCommissionTable: React.FC = () => {
  const commissionData: Commission[] = [
    { store: "General Electric", amount: "$68,320" },
    { store: "Bank of America", amount: "$59,658" },
    { store: "MasterCard", amount: "$52,508" },
    { store: "Gillette", amount: "$48,120" },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Platform Commission</h2>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Store Name</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
          </tr>
        </thead>
        <tbody>
          {commissionData.map(({ store, amount }) => (
            <tr key={store} className="border-b hover:bg-gray-50 border-gray-100 last:border-0">
              <td className="py-4 px-4 text-sm text-gray-600">{store}</td>
              <td className="py-4 px-4 text-sm text-[#08AD36] font-medium">{amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
