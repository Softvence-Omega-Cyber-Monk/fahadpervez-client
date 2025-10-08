import { Link } from "react-router-dom";



export default function OrderTable() {
  const orders = [
    {
      id: 'ORD-2025-347',
      seller: 'TechSupplies Inc.',
      product: 'Cimetidine',
      productIcon: '💊',
      quantity: 5,
      date: '17/06/25',
      status: 'Order placed',
      statusColor: 'purple',
      amount: '$6.48'
    },
    {
      id: 'ORD-2025-482',
      seller: 'ShopSphere',
      product: 'Ranitidine',
      productIcon: '🏢',
      quantity: 2,
      date: '15/08/23',
      status: 'Out of delivery',
      statusColor: 'cyan',
      amount: '$11.70'
    },
    {
      id: 'ORD-2025-763',
      seller: 'MarketMingle',
      product: 'Omeprazole',
      productIcon: '🎯',
      quantity: 4,
      date: '22/11/24',
      status: 'Cancelled',
      statusColor: 'red',
      amount: '$8.99'
    },
    {
      id: 'ORD-2025-159',
      seller: 'CartCraze',
      product: 'Pirenzepine',
      productIcon: '💉',
      quantity: 3,
      date: '03/05/25',
      status: 'Delivered',
      statusColor: 'green',
      amount: '$11.70'
    },
    {
      id: 'ORD-2025-159',
      seller: 'EcoHaven',
      product: 'Famotidine',
      productIcon: '🧪',
      quantity: 6,
      date: '09/12/22',
      status: 'Order placed',
      statusColor: 'purple',
      amount: '$14.81'
    },
    {
      id: 'ORD-2025-159',
      seller: 'ShopSphere',
      product: 'Sodium bicarbon',
      productIcon: '🧂',
      quantity: 7,
      date: '09/12/22',
      status: 'Out of delivery',
      statusColor: 'cyan',
      amount: '$17.84'
    },
    {
      id: 'ORD-2025-159',
      seller: 'TrendNest',
      product: 'Misoprostol',
      productIcon: '💊',
      quantity: 3,
      date: '09/12/22',
      status: 'Delivered',
      statusColor: 'green',
      amount: '$5.22'
    },
    {
      id: 'ORD-2025-159',
      seller: 'MarketMingle',
      product: 'Magaldrate',
      productIcon: '🧴',
      quantity: 12,
      date: '09/12/22',
      status: 'Delivered',
      statusColor: 'green',
      amount: '$17.84'
    },
    {
      id: 'ORD-2025-159',
      seller: 'GadgetGrove',
      product: 'Sucralfate',
      productIcon: '💧',
      quantity: 4,
      date: '09/12/22',
      status: 'Cancelled',
      statusColor: 'red',
      amount: '$5.22'
    },
    {
      id: 'ORD-2025-159',
      seller: 'StyleHub',
      product: 'Amoxicillin',
      productIcon: '💊',
      quantity: 2,
      date: '09/12/22',
      status: 'Delivered',
      statusColor: 'green',
      amount: '$11.70'
    }
  ];

  const getStatusClasses = (color: string): string => {
    const classes: Record<string, string> = {
      purple: 'bg-purple-100 text-purple-700',
      cyan: 'bg-cyan-100 text-cyan-600',
      red: 'bg-red-100 text-red-600',
      green: 'bg-green-100 text-green-600'
    };
    return classes[color] || '';
  };

  return (
    <div className="w-full mt-5">
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-300">
        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto p-6">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200 rounded-lg p-2">
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm lg:text-md">Order ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm lg:text-md">Seller</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm lg:text-md">Product</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm lg:text-md">Quantity</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm lg:text-md">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm lg:text-md">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm lg:text-md">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm lg:text-md">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="py-4 px-4 text-sm lg:text-md text-gray-900">{order.id}</td>
                  <td className="py-4 px-4 text-sm lg:text-md text-gray-900">{order.seller}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-base lg:text-lg">{order.productIcon}</span>
                      <span className="text-sm lg:text-md text-gray-900">{order.product}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm lg:text-md text-gray-900">{order.quantity}</td>
                  <td className="py-4 px-4 text-sm lg:text-md text-gray-900">{order.date}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm lg:text-md font-medium ${getStatusClasses(order.statusColor)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm lg:text-md text-gray-900 font-medium">{order.amount}</td>
                  <td className="py-4 px-4">
                  <Link to='/buyer-dashboard/product-details/1'>
                    <button className="text-sm lg:text-md text-blue-500 hover:text-blue-600 font-medium">
                      View
                    </button>
                  </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tablet View */}
        <div className="hidden md:block lg:hidden overflow-x-auto p-6">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="text-left py-3 px-3 font-medium text-gray-700 text-xs md:text-sm">Order ID</th>
                <th className="text-left py-3 px-3 font-medium text-gray-700 text-xs md:text-sm">Seller</th>
                <th className="text-left py-3 px-3 font-medium text-gray-700 text-xs">Product</th>
                <th className="text-left py-3 px-3 font-medium text-gray-700 text-xs">Date</th>
                <th className="text-left py-3 px-3 font-medium text-gray-700 text-xs">Status</th>
                <th className="text-left py-3 px-3 font-medium text-gray-700 text-xs">Amount</th>
                <th className="text-left py-3 px-3 font-medium text-gray-700 text-xs">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-3 text-xs text-gray-900">{order.id}</td>
                  <td className="py-3 px-3 text-xs text-gray-900">{order.seller}</td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{order.productIcon}</span>
                      <span className="text-xs text-gray-900">{order.product}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-xs text-gray-900">{order.date}</td>
                  <td className="py-3 px-3">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusClasses(order.statusColor)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-xs text-gray-900 font-medium">{order.amount}</td>
                  <td className="py-3 px-3">
                   <Link to='/buyer-dashboard/product-details/1'>
                    <button className="text-xs text-blue-500 hover:text-blue-600 font-medium">
                      View
                    </button>
                   </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden p-6">
          <div className="bg-gray-200 py-3 px-4 font-medium text-gray-700 text-sm">
            Orders
          </div>
          {orders.map((order, index) => (
            <div key={index} className="border-t border-gray-200 p-4 hover:bg-gray-50">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="text-sm font-medium text-gray-900 mb-1">{order.id}</div>
                  <div className="text-xs text-gray-600">{order.seller}</div>
                </div>
                <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${getStatusClasses(order.statusColor)}`}>
                  {order.status}
                </span>
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">{order.productIcon}</span>
                <span className="text-sm text-gray-900">{order.product}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                <div>
                  <span className="text-gray-500">Quantity:</span>
                  <span className="text-gray-900 ml-1">{order.quantity}</span>
                </div>
                <div>
                  <span className="text-gray-500">Date:</span>
                  <span className="text-gray-900 ml-1">{order.date}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-900">{order.amount}</span>
               <Link to='/buyer-dashboard/product-details/1'>
                <button className="text-sm text-blue-500 hover:text-blue-600 font-medium">
                  View
                </button>
               </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}