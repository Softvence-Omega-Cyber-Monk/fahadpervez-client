import { ArrowDownToLine } from "lucide-react"
import { useState } from "react"
import BuyersTable from "./components/BuyersTable";
import SellersTable from "./components/SellersTable";
import { ApiResponse, useGetAllBuyersQuery, useGetAllSellersQuery } from "@/Redux/Features/user/user.api";
import { UserFormData } from "@/types/SellerDashboardTypes/SettingsTypes";

const Users = () => {
  const [currentUser, setCurrentUser] = useState<"buyers" | "sellers">("buyers");

  const { data: sellersData, isLoading: sellersLoading, isError: sellersError } = useGetAllSellersQuery(null);
  const { data: buyersData, isLoading: buyersLoading, isError: buyersError } = useGetAllBuyersQuery(null);
  if (!sellersData || !buyersData) return null;

  // Export functionality
  const handleExport = () => {
    const dataToExport = currentUser === "buyers" ? buyersData?.data   : sellersData?.data;
    if (!dataToExport || dataToExport.length === 0) {
      alert("No data to export");
      return;
    }
    // Convert to CSV
    const headers = ["Name", "Email", "Phone", "Status", "Join Date"];
    const csvContent = [
      headers.join(","),
      ...dataToExport.map((user: UserFormData) => 
        [
          user.name,
          user.email,
          user.phone || "N/A",
          user.isActive ? "Active" : "Inactive",
          new Date(user.createdAt as string).toLocaleDateString()
        ].join(",")
      )
    ].join("\n");

    // Create and download file
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${currentUser}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Get current data and loading state
  const isLoading = currentUser === "buyers" ? buyersLoading : sellersLoading;
  const isError = currentUser === "buyers" ? buyersError : sellersError;
  const currentData = currentUser === "buyers" ? buyersData : sellersData;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-6 md:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">User Management Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage and monitor all {currentUser} in the system
            </p>
          </div>
          
          {/* Stats Summary */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Total {currentUser}</p>
              <p className="text-2xl font-bold text-gray-900">
                {currentData?.data?.length || 0}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 md:px-8 md:py-8">
        {/* Tabs and Export Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          {/* Tabs */}
          <div className="flex gap-2 bg-white p-1 rounded-lg shadow-sm border border-gray-200">
            <button 
              onClick={() => setCurrentUser("buyers")} 
              className={`px-6 py-2.5 font-medium rounded-md transition-all ${
                currentUser === "buyers"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Buyers
              {(buyersData as ApiResponse).data?.length  > 0 && (
                <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                  currentUser === "buyers" 
                    ? "bg-white/20 text-white" 
                    : "bg-gray-100 text-gray-600"
                }`}>
                  {buyersData?.data.length}
                </span>
              )}
            </button>
            <button 
              onClick={() => setCurrentUser("sellers")} 
              className={`px-6 py-2.5 font-medium rounded-md transition-all ${
                currentUser === "sellers"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Sellers
              {(sellersData as ApiResponse).data?.length > 0 && (
                <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                  currentUser === "sellers" 
                    ? "bg-white/20 text-white" 
                    : "bg-gray-100 text-gray-600"
                }`}>
                  {sellersData?.data.length}
                </span>
              )}
            </button>
          </div>

          {/* Export Button */}
          <button 
            onClick={handleExport}
            disabled={!currentData?.data || currentData.data.length === 0}
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg shadow-sm hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowDownToLine size={20} />
            Export to CSV
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
              <p className="text-gray-600">Loading {currentUser}...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600 font-medium">Failed to load {currentUser}</p>
            <p className="text-red-500 text-sm mt-1">Please try refreshing the page</p>
          </div>
        )}

        {/* Table Content */}
        {!isLoading && !isError && (
          <>
            {currentUser === "buyers" ? (
              <BuyersTable data={buyersData as {data: UserFormData[] | []}} />
            ) : (
              <SellersTable data={sellersData as {data: UserFormData[] | []}} />
            )}
          </>
        )}
      </main>
    </div>
  )
}

export default Users