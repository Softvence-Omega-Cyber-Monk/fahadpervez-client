import { ArrowDownToLine } from "lucide-react"
import { useState } from "react"
import BuyersTable from "./components/BuyersTable";
import SellersTable from "./components/SellersTable";
import { useGetAllBuyersQuery, useGetAllSellersQuery } from "@/Redux/Features/user/aure.api";

const Users = () => {

  const [curentUser, setCurentUser] = useState("buyers");

  const {data : sellersData} = useGetAllSellersQuery(null);
  const {data : buyersData} = useGetAllBuyersQuery(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-6 md:px-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">User Management Dashboard</h1>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 md:px-8 md:py-8">
        {/* Tabs and Export Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex gap-2">
            <button onClick={() => setCurentUser("buyers")} className="px-6 py-2.5 bg-white text-indigo-600 font-medium rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors">
              Buyers
            </button>
            <button onClick={() => setCurentUser("sellers")} className="px-6 py-2.5 bg-white text-gray-600 font-medium rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors">
              Sellers
            </button>
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg shadow-sm hover:bg-indigo-700 transition-colors">
            <ArrowDownToLine size={20} />
            Export
          </button>
        </div>

        {curentUser === "buyers" ? <BuyersTable data={buyersData} /> : <SellersTable data={sellersData} />}

      </main>
    </div>
  )
}

export default Users
