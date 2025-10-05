import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface Order {
  id: string;
  seller: string;
  date: string;
  time: string;
  amount: string;
}

export const OrdersTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
const handleViwe=()=>{
    alert("working on it")
}
  const orders: Order[] = [
    { id: "ORD-2025-347", seller: "Bessie Cooper", date: "6/21/19", time: "05:49 pm", amount: "$11.70" },
    { id: "ORD-2025-482", seller: "Cameron", date: "7/18/17", time: "06:42 am", amount: "$5.22" },
    { id: "ORD-2025-763", seller: "Arlene McCoy", date: "2/11/12", time: "11:23 pm", amount: "$14.81" },
    { id: "ORD-2025-159", seller: "Theresa Webb", date: "7/27/13", time: "07:38 am", amount: "$6.48" },
    { id: "ORD-2025-147", seller: "Guy Hawkins", date: "7/11/19", time: "08:20 pm", amount: "$14.81" },
    { id: "ORD-2025-148", seller: "Eleanor Pena", date: "5/30/14", time: "07:13 pm", amount: "$17.84" },
    { id: "ORD-2025-149", seller: "Devon Lane", date: "12/4/17", time: "01:09 am", amount: "$8.99" },
    { id: "ORD-2025-150", seller: "Jacob Jones", date: "11/7/16", time: "02:10 pm", amount: "$14.81" },
    { id: "ORD-2025-151", seller: "Savannah Nguyen", date: "10/6/13", time: "01:34 pm", amount: "$6.48" },
    { id: "ORD-2025-152", seller: "Annette Black", date: "8/2/19", time: "03:48 am", amount: "$5.22" },
  ];

  return (
    <div>
        <div className="bg-white rounded-lg   border border-gray-200">
      <div className="overflow-x-auto p-4">
        <table className="w-full ">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              {["Order ID", "Seller", "Date", "Time", "Amount", "Action"].map((header) => (
                <th key={header} className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 text-gray-600 px-4 text-sm  ">{order.id}</td>
                <td className="py-4 px-4 font-medium text-sm text-[#0082FA]  ">{order.seller}</td>
                <td className="py-4 px-4 text-sm text-gray-600">{order.date}</td>
                <td className="py-4 px-4 text-sm text-gray-600">{order.time}</td>
                <td className="py-4 px-4 text-sm text-green-600 font-medium">{order.amount}</td>
                <td className="py-4 px-4 text-sm text-[#0082FA] cursor-pointer font-medium"><button className="cursor-pointer" onClick={handleViwe}>View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
    
    </div>
      <div className="flex  items-center justify-between px-4 py-4    ">
        <p className="text-base ">Showing 1 to 10 of 24 orders</p>
        <div className="flex  items-center gap-2">
          <button className="p-2  cursor-pointer border border-[#455058 ] rounded hover:bg-gray-50">
            <ChevronLeft size={16} className="text-gray-600 cursor-pointer" />
          </button  >
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              className={`px-3 py-1 cursor-pointer border border-[#455058 ] rounded text-sm ${
                page === currentPage ? "bg-gray-100 font-medium" : "bg-white hover:bg-gray-50"
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button className="p-2 cursor-pointer border border-[#455058 ] rounded hover:bg-gray-50">
            <ChevronRight size={16} className="text-gray-600" />
          </button>
        </div>
      </div>
    </div>
    
  );
};
