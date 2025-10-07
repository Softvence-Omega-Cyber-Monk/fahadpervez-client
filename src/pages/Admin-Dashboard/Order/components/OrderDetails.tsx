import React from 'react';
import { Calendar, Edit3, XCircle, ArrowLeft } from 'lucide-react';
import { Order, OrderStatus } from '../data';
import { formatCurrency } from '../utils';
import DetailCard from './DetailCard';
import Stepper from './Stepper';
import UserIcon from './UserIcon';

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

const OrderDetails: React.FC<{ order: Order, onBack: () => void, onEditShipping: () => void }> = ({ order, onBack, onEditShipping }) => {
  const subtotal = order.products.reduce((acc, p) => acc + (p.quantity * p.pricePerUnit), 0);
  const total = subtotal + order.details.delivery;

  return (
    <div className="min-h-screen bg-gray-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-blue-600 hover:text-blue-700 font-medium mb-4 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Orders
          </button>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
              <p className="text-gray-600 mt-1">Order ID: <span className="font-semibold text-blue-600">{order.id}</span></p>
            </div>
            <div className="mt-4 lg:mt-0">
              <span className={getStatusClasses(order.status)}>
                {getStatusText(order.status)}
              </span>
            </div>
          </div>
        </div>

        {/* Information Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <DetailCard title="Buyer" icon={<UserIcon />}>
            <p className="font-semibold text-gray-900">{order.buyer.name}</p>
            <p>Phone: {order.buyer.phone}</p>
            <p>Email: {order.buyer.email}</p>
            <p className="text-xs text-gray-600 mt-2">{order.buyer.location}</p>
          </DetailCard>

          <DetailCard title="Seller" icon={<UserIcon />}>
            <p className="font-semibold text-gray-900">{order.seller.name}</p>
            <p>Phone: {order.seller.phone}</p>
            <p>Email: {order.seller.email}</p>
            <p className="text-xs text-gray-600 mt-2">{order.seller.location}</p>
          </DetailCard>

          <DetailCard title="Shipping details" icon={<Calendar size={18} />}>
            <p className="font-medium">Payment: {order.shipping.payment}</p>
            <p>Carrier: {order.shipping.carrier}</p>
            <p className="text-xs text-gray-600 mt-2">{order.shipping.location}</p>
            <button
              onClick={onEditShipping}
              className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium mt-3 transition-colors"
            >
              <Edit3 size={14} className="mr-1" /> Edit Shipping
            </button>
          </DetailCard>

          <DetailCard title="Order date">
            <p className="text-lg font-semibold text-gray-900">{order.details.time}</p>
            <p className="text-gray-600">{order.details.date}</p>
            <div className="mt-3 p-2 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs text-blue-700 font-medium">Payment Status</p>
              <p className="text-sm font-semibold text-blue-800">{order.details.paymentStatus}</p>
            </div>
          </DetailCard>
        </div>

        {/* Product Summary */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-8 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Product summary</h2>
              <button className="flex items-center text-red-600 hover:text-red-700 font-medium mt-2 sm:mt-0 transition-colors">
                <XCircle size={16} className="mr-1" />
                Cancel order
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">#</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Product</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Quantity</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Price per unit</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">Sub total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map((product, index) => (
                    <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-4 text-sm text-gray-500">{String(index + 1).padStart(2, '0')}</td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{product.name}</p>
                          <p className="text-xs text-gray-500 mt-1">{product.sku}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">{product.quantity}</td>
                      <td className="py-4 px-4 text-sm text-gray-600">{formatCurrency(product.pricePerUnit)}</td>
                      <td className="py-4 px-4 text-sm font-semibold text-gray-900 text-right">
                        {formatCurrency(product.quantity * product.pricePerUnit)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end mt-6">
              <div className="w-full md:w-1/2 lg:w-1/3 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium text-gray-900">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery:</span>
                  <span className="font-medium text-gray-900">{formatCurrency(order.details.delivery)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-3">
                  <span>Total:</span>
                  <span className="text-blue-600">{formatCurrency(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Progress */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Order Progress</h2>
          </div>

          <div className="p-6">
            <Stepper timeline={order.timeline} />

            <div className="flex justify-end pt-6 border-t border-gray-100">
              <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25">
                Update order status
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
