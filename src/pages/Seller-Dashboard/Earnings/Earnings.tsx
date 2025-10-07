import React, { DragEvent, ChangeEvent, useState } from "react";
import { RiDeleteBin7Line } from "react-icons/ri";
import { MdOutlineModeEditOutline } from "react-icons/md";
import RevenueOverviewChart from "../components/Dashboard/RevenueOverviewChart";

// --- Mock Data ---
interface EarningSummaryType {
  title: string;
  amount: string;
  subtitle?: string;
  action?: string;
  color?: string;
  bgColor?: string;
  titleColor?: string;
}

const earningsSummary: EarningSummaryType[] = [
  { title: "Total Earning", amount: "$50,000", subtitle: "This month", titleColor: "text-primary-yellow" },
  { title: "Pending Earning", amount: "$12,000", subtitle: "Needs attention", titleColor: "text-primary-purple-new" },
  { title: "Available Balance", amount: "$6,500", action: "Withdraw Fund", titleColor: "text-primary-orange" },
];

interface TransactionType {
  id: string;
  date: string;
  amount: string;
}

const transactions: TransactionType[] = [
  { id: "INQ-235345", date: "17/06/2025", amount: "$89.99" },
  { id: "INQ-235346", date: "15/08/2025", amount: "$79.99" },
  { id: "INQ-235347", date: "22/11/2024", amount: "$59.99" },
  { id: "INQ-235348", date: "03/05/2025", amount: "$69.99" },
  { id: "INQ-235349", date: "09/12/2022", amount: "$49.99" },
  { id: "INQ-235350", date: "09/12/2022", amount: "$99.99" },
];

interface PaymentMethodType {
  type: string;
  lastFour: string;
  issuer: string;
  expiry: string;
  isDefault: boolean;
}

const paymentMethods: PaymentMethodType[] = [
  { type: "VISA", lastFour: "2241", issuer: "Emperies", expiry: "07/2027", isDefault: true },
  { type: "Mastercard", lastFour: "1234", issuer: "Emperies", expiry: "05/2026", isDefault: false },
];

// --- Sub-Components ---
const EarningCard: React.FC<EarningSummaryType> = ({ title, amount, subtitle, action, color, bgColor, titleColor }) => (
  <div className={`p-4 rounded-lg shadow flex flex-col justify-between ${bgColor || ""}`}>
    <div>
      <p className={`text-sm font-medium ${titleColor || "text-gray-500"}`}>{title}</p>
      <h2 className={`text-3xl font-bold mt-1 ${color || ""}`}>{amount}</h2>
    </div>
    {subtitle && <p className="text-sm text-gray-400 mt-2">{subtitle}</p>}
    {action && (
      <button className="mt-4 w-full sm:w-[183px] bg-[#0082FA] text-white py-2 px-4 rounded-lg text-[18px] font-medium">
        {action}
      </button>
    )}
  </div>
);

const PaymentCard: React.FC<PaymentMethodType> = ({ type, lastFour, issuer, expiry, isDefault }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 mb-3 bg-white border border-gray-200 rounded-lg">
    <div className="flex items-center mb-2 sm:mb-0">
      <div
        className={`p-2 rounded mr-3 w-8 h-8 flex items-center justify-center font-bold text-sm ${
          type === "VISA" ? "bg-indigo-100 text-indigo-600" : "bg-red-100 text-red-600"
        }`}
      >
        {type[0]}
      </div>
      <div>
        <p className="font-semibold text-gray-800">{type} ****{lastFour}</p>
        <p className="text-xs text-gray-500">Exp: {expiry} ({issuer})</p>
      </div>
    </div>
    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:space-y-2">
      <div className="flex space-x-2 order-2 sm:order-1">
        <button className="text-red-500 hover:text-red-700" title="Delete">
          <RiDeleteBin7Line className="text-lg" />
        </button>
        <button className="text-green-500 hover:text-green-700" title="Edit">
          <MdOutlineModeEditOutline className="text-lg" />
        </button>
      </div>
      {isDefault ? (
        <span className="ml-2 px-2 py-0.5 text-xs font-semibold bg-gray-200 text-gray-700 rounded-full order-1 sm:order-2">
          Default
        </span>
      ) : (
        <button className="ml-2 px-3 py-1 text-xs font-semibold text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition duration-150 order-1 sm:order-2">
          Set as Default
        </button>
      )}
    </div>
  </div>
);

// --- Main Component ---
const Earnings: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-10">
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">EARNING</h1>

      {/* Earnings Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10">
        {earningsSummary.map((card, i) => (
          <EarningCard key={i} {...card} />
        ))}
      </div>

      <hr className="my-6 sm:my-8 border-gray-200" />

      <div className="mb-6">
        <RevenueOverviewChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Transactions */}
        <div>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-0">Transaction History</h2>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium self-start sm:self-auto">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {["Transaction ID", "Date", "Amount", "Action"].map((header) => (
                      <th key={header} className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transactions.map((tx, i) => (
                    <tr key={i}>
                      <td className="px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium text-gray-900 truncate max-w-[120px] sm:max-w-none">
                        {tx.id}
                      </td>
                      <td className="px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-gray-500">{tx.date}</td>
                      <td className="px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-gray-700 font-semibold">{tx.amount}</td>
                      <td className="px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-blue-600 cursor-pointer hover:text-blue-800">View</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center items-center mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs sm:text-sm text-gray-500">Showing 1 to 10 of 24 transactions</p>
            </div>
          </div>
        </div>

        {/* Payment Methods + Drag & Drop */}
        <div>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow border border-gray-100 sticky top-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Payment Methods</h2>

            <div className="space-y-3">
              {paymentMethods.map((m, i) => (
                <PaymentCard key={i} {...m} />
              ))}
            </div>

            {/* Drag & Drop Upload */}
            <div
              className={`mt-6 border-2 ${
                isDragging ? "border-blue-400 bg-blue-50" : "border-dashed border-gray-300"
              } p-4 rounded-lg flex flex-col items-center justify-center cursor-pointer transition duration-150`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById("fileInput")?.click()}
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-lg mb-2" />
              ) : (
                <>
                  <div className="text-3xl text-gray-400 font-light">+</div>
                  <p className="text-xs sm:text-sm text-gray-500 text-center mt-2">
                    Drag & drop or click to upload payment proof / card image
                  </p>
                </>
              )}
              <input type="file" id="fileInput" accept="image/*" className="hidden" onChange={handleFileSelect} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Earnings;