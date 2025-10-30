import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, Filter } from 'lucide-react';
import { Order, OrderStatus, Tab, mockOrders } from '../data';
import { formatCurrency } from '../utils';
import { useGetAllOrdersByAdminAndVendorQuery } from '@/Redux/Features/Order/Order.api';

const getStatusClasses = (status: OrderStatus) => {
  const base = 'px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap';
  switch (status) {
    case 'placed':
      return `${base} bg-blue-50 text-blue-700 border border-blue-200`;
    case 'delivery':
      return `${base} bg-cyan-50 text-cyan-700 border border-cyan-200`;
    case 'delivered':
      return `${base} bg-green-50 text-green-700 border border-green-200`;
    case 'cancelled':
      return `${base} bg-red-50 text-red-700 border border-red-200`;
    case 'preparing':
      return `${base} bg-amber-50 text-amber-700 border border-amber-200`;
    default:
      return `${base} bg-gray-50 text-gray-700 border border-gray-200`;
  }
};

const getStatusText = (status: OrderStatus) => {
  switch (status) {
    case 'placed': return 'Order placed';
    case 'delivery': return 'Out of delivery';
    case 'delivered': return 'Delivered';
    case 'cancelled': return 'Cancelled';
    case 'preparing': return 'Preparing for Shipment';
    default: return 'Unknown';
  }
};

const OrderList: React.FC<{ onSelectOrder: (order: Order) => void }> = ({ onSelectOrder }) => {
  const [activeTab, setActiveTab] = useState<Tab>('All Order');
  const [searchTerm, setSearchTerm] = useState('');
  const {data} = useGetAllOrdersByAdminAndVendorQuery({});
  console.log(data)
  const filteredOrders = useMemo(() => {
    return mockOrders
      .filter(order => {
        if (activeTab === 'All Order') return true;
        if (activeTab === 'Pending order') return ['placed', 'preparing', 'delivery'].includes(order.status);
        if (activeTab === 'Complete Order') return order.status === 'delivered';
        if (activeTab === 'Cancel Order') return order.status === 'cancelled';
        return true;
      })
      .filter(order => order.id.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [activeTab, searchTerm]);

  const TABS: Tab[] = ['All Order', 'Pending order', 'Complete Order', 'Cancel Order'];

  return (
    <div className="min-h-screen bg-gray-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Orders</h1>
        <p className="text-gray-600 mb-8">Manage and track your orders efficiently</p>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <div className="flex space-x-8 overflow-x-auto">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  py-4 px-1 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap
                  ${activeTab === tab
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by order id"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
            <div className="flex gap-3">
              <button className="flex items-center px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium">
                <Filter size={18} className="mr-2 text-blue-600" />
                Order date
                <ChevronDown size={16} className="ml-2" />
              </button>
              <button className="flex items-center px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium">
                Order Status
                <ChevronDown size={16} className="ml-2" />
              </button>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/80">
                <tr>
                  {['Order ID', 'Buyer', 'Seller', 'Product', 'Date', 'Status', 'Amount', 'Action'].map(header => (
                    <th key={header} className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-semibold text-blue-600">{order.id}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {order.buyer.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-blue-600 font-medium">
                      {order.seller.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                          <span className="text-blue-600 text-sm font-medium">💊</span>
                        </div>
                        <span className="font-medium text-gray-900">{order.products[0]?.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getStatusClasses(order.status)}>
                        {getStatusText(order.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900">
                      {formatCurrency(order.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => onSelectOrder(order)}
                        className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search size={48} className="mx-auto" />
              </div>
              <p className="text-gray-500 text-lg font-medium">No orders found</p>
              <p className="text-gray-400 mt-2">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
          <p className="text-sm text-gray-600">Showing 1 to {filteredOrders.length} of {filteredOrders.length} orders</p>
          <div className="flex items-center space-x-2">
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-500 transition-colors">
              <ChevronDown size={16} className="transform rotate-90" />
            </button>
            <button className="px-3 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow-sm">1</button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors">2</button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors">3</button>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-500 transition-colors">
              <ChevronDown size={16} className="transform -rotate-90" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
