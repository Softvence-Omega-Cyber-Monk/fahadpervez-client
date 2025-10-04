import { RiDeleteBin7Line } from 'react-icons/ri';
import RevenueOverviewChart from '../components/Dashboard/RevenueOverviewChart';
import { MdOutlineModeEditOutline } from 'react-icons/md';

// --- Mock Data ---
const earningsSummary = [
  { title: "Total Earning", amount: "$50,000", subtitle: "This month", titleColor: "text-primary-yellow", },
  { title: "Pending Earning", amount: "$12,000", subtitle: "Needs attention",  titleColor: "text-primary-purple-new", },
  { title: "Available Balance", amount: "$6,500", action: "Withdraw Fund", titleColor: "text-primary-orange", },
];

const transactions = [
  { id: "INQ-235345", date: "17/06/2025", amount: "$89.99" },
  { id: "INQ-235346", date: "15/08/2025", amount: "$79.99" },
  { id: "INQ-235347", date: "22/11/2024", amount: "$59.99" },
  { id: "INQ-235348", date: "03/05/2025", amount: "$69.99" },
  { id: "INQ-235349", date: "09/12/2022", amount: "$49.99" },
  { id: "INQ-235350", date: "09/12/2022", amount: "$99.99" },
  { id: "INQ-235351", date: "09/12/2022", amount: "$89.99" },
  { id: "INQ-235352", date: "09/12/2022", amount: "$79.99" },
  { id: "INQ-235353", date: "09/12/2022", amount: "$69.99" },
  { id: "INQ-235354", date: "09/12/2022", amount: "$89.99" },
];

const paymentMethods = [
  { type: "VISA", lastFour: "2241", issuer: "Emperies", expiry: "07/2027", isDefault: true },
  { type: "Mastercard", lastFour: "1234", issuer: "Emperies", expiry: "05/2026", isDefault: false },
];

// --- Sub-Components ---

interface EarningCardProps {
  title: string;
  amount: string;
  subtitle?: string;
  action?: string;
  color?: string;
  bgColor?: string;
  titleColor?: string;
}

const EarningCard = ({ title, amount, subtitle, action, color, bgColor, titleColor }: EarningCardProps) => (
  <div className={`p-4 rounded-lg shadow flex flex-col justify-between ${bgColor}`}>
    <div>
        <p className={`text-sm font-medium ${titleColor ? titleColor : 'text-gray-500'}`}>{title}</p>
        <h2 className={`text-3xl font-bold mt-1 ${color}`}>{amount}</h2>
    </div>
    {subtitle && <p className="text-sm text-gray-400 mt-2">{subtitle}</p>}
    {action && (
      <button className="mt-4 w-[183px] bg-[#0082FA] text-white py-2 px-4 rounded-lg text-[18px] font-medium ">
        {action}
      </button>
    )}
  </div>
);

interface PaymentCardProps {
  type: string;
  lastFour: string;
  issuer: string;
  expiry: string;
  isDefault: boolean;
}

const PaymentCard = ({ type, lastFour, issuer, expiry, isDefault }: PaymentCardProps) => (
  <div className="flex items-center justify-between p-3 mb-3 bg-white border border-gray-200 rounded-lg">
    <div className="flex items-center">
      {/* Icon Placeholder for Card Type (using first letter and color) */}
      <div className={`p-2 rounded mr-3 w-8 h-8 flex items-center justify-center font-bold text-sm 
        ${type === 'VISA' ? 'bg-indigo-100 text-indigo-600' : 'bg-red-100 text-red-600'}`}>
        {type[0]}
      </div>
      <div>
        <p className="font-semibold text-gray-800">{type} in ****{lastFour}</p>
        <p className="text-xs text-gray-500">Exp: {expiry} ({issuer})</p>
      </div>
    </div>
    <div className="flex flex-col space-y-2">
      <div className='flex space-x-2'>
      <button className="text-red-500 hover:text-red-700" title="Delete">
        {/* Trash Icon Placeholder */}
        <span className="text-lg">
          {/* <ClipboardEdit /> */}
          <RiDeleteBin7Line />
        </span>
      </button>
      <button className="text-green-500 hover:text-green-700" title="Delete">
        {/* Trash Icon Placeholder */}
        <span className="text-lg">
          {/* <RiDeleteBin7Line /> */}
          <MdOutlineModeEditOutline  />
        </span>
      </button>
      </div>
      {isDefault ? (
        <span className="ml-2 px-2 py-0.5 text-xs font-semibold bg-gray-200 text-gray-700 rounded-full">Default</span>
      ) : (
        <button className="ml-2 px-3 py-1 text-xs font-semibold text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition duration-150">
          Set as Default
        </button>
      )}
    </div>
  </div>
);


// --- Main Component ---
const Earnings = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">EARNING</h1>

      {/* 1. Earnings Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {earningsSummary.map((card, index) => (
          <EarningCard key={index} {...card} />
        ))}
      </div>

      {/* --- Horizontal Line Separator --- */}
      <hr className="my-8 border-gray-200" />
      
      {/* 2. Revenue Overview Chart */}
      <div className="mb-6">
        <RevenueOverviewChart />
      </div>

      {/* 3. Transaction History & Payment Methods */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          {/* Transaction History */}
          <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
            <div className="flex justify-between items-center mb-4">
                 <h2 className="text-xl font-semibold text-gray-800">Transaction History</h2>
                 <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View All
                 </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {['Transaction ID', 'Date', 'Amount', 'Action'].map((header) => (
                      <th key={header} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transactions.slice(0, 10).map((tx, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{tx.id}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{tx.date}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 font-semibold">{tx.amount}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-600 font-medium cursor-pointer hover:text-blue-800">
                        View
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Placeholder */}
            <div className="flex justify-center items-center mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">Showing 1 to 10 of 24 transactions</p>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white p-6 rounded-lg shadow border border-gray-100 sticky top-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Methods</h2>
            
            <div className="space-y-3">
              {paymentMethods.map((method, index) => (
                <PaymentCard key={index} {...method} />
              ))}
            </div>

            {/* Add New Payment Method Button */}
            <div className="mt-6 border border-dashed border-gray-300 p-4 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition duration-150">
              <div className="text-3xl text-gray-400 font-light">+</div>
              <p className="text-sm text-gray-500 text-center">
               Add new payment method (Credit card , Bank account or Paypal)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Earnings;