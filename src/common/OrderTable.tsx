

import { Order } from "@/types/OrderTypes";
import { Link } from "react-router-dom";

export default function OrderTable({data}:{data:Order[]}) {

  const orders  = data;

  const getStatusClasses = (color: string) => {
    const classes: Record<string, string> = {
      Confirmed: "bg-purple-100 text-purple-700",
      Pending: "bg-cyan-100 text-cyan-600",
      Delivered: "bg-green-100 text-green-600",
      "Out for Delivery" : "bg-red-100 text-red-600",
      Cancelled : "bg-red-100 text-red-600",
    };
    return classes[color] || "";
  };

  const getProductsQuantity = (order: Order) =>
    order.products.reduce((total, item) => total + item.quantity, 0);

  const renderDesktopTable = () => (
    <div className="hidden lg:block overflow-x-auto p-6">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200 rounded-lg p-2">
            {["Order ID", "Seller", "Product", "Quantity", "Date", "Status", "Amount", "Action"].map(
              (header) => (
                <th
                  key={header}
                  className="text-left py-3 px-4 font-medium text-gray-700 text-sm lg:text-md"
                >
                  {header}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const productsQuantity = getProductsQuantity(order);
            return (
              <tr
                key={order._id}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <td className="py-4 px-4 text-sm lg:text-md text-gray-900">{order.orderNumber}</td>
                <td className="py-4 px-4 text-sm lg:text-md text-gray-900">{order.userId.name}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    {/* <span className="text-base lg:text-lg">{order.productIcon}</span>
                    <span className="text-sm lg:text-md text-gray-900">{order.product}</span> */}
                  </div>
                </td>
                <td className="py-4 px-4 text-sm lg:text-md text-gray-900">{productsQuantity}</td>
                <td className="py-4 px-4 text-sm lg:text-md text-gray-900">{order.createdAt}</td>
                <td className="py-4 px-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm lg:text-md font-medium ${getStatusClasses(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm lg:text-md text-gray-900 font-medium">{order.grandTotal}</td>
                <td className="py-4 px-4">
                  <Link to="/buyer-dashboard/product-details/1">
                    <button className="text-sm lg:text-md text-blue-500 hover:text-blue-600 font-medium">
                      View
                    </button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderTabletTable = () => (
    <div className="hidden md:block lg:hidden overflow-x-auto p-6">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200">
            {["Order ID", "Seller", "Product", "Date", "Status", "Amount", "Action"].map((header) => (
              <th
                key={header}
                className="text-left py-3 px-3 font-medium text-gray-700 text-xs md:text-sm"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-t border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-3 text-xs md:text-sm text-gray-900">{order._id}</td>
              <td className="py-3 px-3 text-xs text-gray-900">{order.userId.name}</td>
              <td className="py-3 px-3">
                <div className="flex items-center gap-2">
                  {/* <span className="text-base">{order.productIcon}</span>
                  <span className="text-xs text-gray-900">{order.product}</span> */}
                </div>
              </td>
              <td className="py-3 px-3 text-xs text-gray-900">{order.createdAt}</td>
              <td className="py-3 px-3">
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusClasses(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </td>
              <td className="py-3 px-3 text-xs text-gray-900 font-medium">{order.grandTotal}</td>
              <td className="py-3 px-3">
                <Link to="/buyer-dashboard/product-details/1">
                  <button className="text-xs md:text-sm text-blue-500 hover:text-blue-600 font-medium">
                    View
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderMobileCards = () => (
    <div className="md:hidden p-6">
      <div className="bg-gray-200 py-3 px-4 font-medium text-gray-700 text-sm">Orders</div>
      {orders.map((order) => {
        const productsQuantity = getProductsQuantity(order);
        return (
          <div key={order._id} className="border-t border-gray-200 p-4 hover:bg-gray-50">
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="text-sm font-medium text-gray-900 mb-1">{order.orderNumber}</div>
                <div className="text-xs text-gray-600">{order.userId.name}</div>
              </div>
              <span
                className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${getStatusClasses(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>

            <div className="flex items-center gap-2 mb-3">
              {/* <span className="text-lg">{order.productIcon}</span>
              <span className="text-sm text-gray-900">{order.product}</span> */}
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs mb-3">
              <div>
                <span className="text-gray-500">Quantity:</span>
                <span className="text-gray-900 ml-1">{productsQuantity}</span>
              </div>
              <div>
                <span className="text-gray-500">Date:</span>
                <span className="text-gray-900 ml-1">{order.createdAt}</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-900">{order.grandTotal}</span>
              <Link to="/seller-dashboard">
                <button className="text-sm text-blue-500 hover:text-blue-600 font-medium">View</button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="w-full mt-5">
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-300">
        {renderDesktopTable()}
        {renderTabletTable()}
        {renderMobileCards()}
      </div>
    </div>
  );
}
