interface ShippingCompany {
  company: string;
  amount: string;
}

export const ShippingCostTable: React.FC = () => {
  const shippingData: ShippingCompany[] = [
    { company: "DHL Express", amount: "$320" },
    { company: "Aramax Delivery", amount: "$200" },
    { company: "Elite Shipping", amount: "$122" },
    { company: "Orrem Shipment", amount: "$80" },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping Cost</h2>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Company Name</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
          </tr>
        </thead>     
        <tbody>
          {shippingData.map(({ company, amount }) => (
            <tr key={company} className="border-b hover:bg-gray-50 border-gray-100 last:border-0">
              <td className="py-4 px-4 text-sm text-gray-600">{company}</td>
              <td className="py-4 px-4 text-sm text-red-600 font-medium">{amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
