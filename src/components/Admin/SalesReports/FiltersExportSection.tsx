// import { ChevronDown } from 'lucide-react';
// import { useState } from 'react';

// const FiltersExportSection = ({classname}) => {
//   const [dateRange, setDateRange] = useState('Last 7 Days');
//   const [orderStatus, setOrderStatus] = useState('All Statuses');
//   const [category, setCategory] = useState('All Category');

//  const handleApplyFilters = () => {
//   alert('Filters applied:\n' + JSON.stringify({ dateRange, orderStatus, category }, null, 2));
// };

//   return (
//     <div className={`w-full bg-white rounded-xl  px-6 py-6   ${classname}`}>
//       <h2 className="text-xl font-bold text-gray-900 mb-6">Filters & Export</h2>
      
//       <div className="flex items-end gap-4">
//         {/* Date Range */}
//         <div className="flex-1">
//           <label className="block text-sm text-gray-600 mb-2">
//             Date Range
//           </label>
//           <div className="relative">
//             <select
//               value={dateRange}
//               onChange={(e) => setDateRange(e.target.value)}
//               className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 pr-10 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
//             >
//               <option>Last 7 Days</option>
//               <option>Last 30 Days</option>
//               <option>Last 90 Days</option>
//               <option>This Year</option>
//               <option>Custom Range</option>
//             </select>
//             <ChevronDown 
//               size={20} 
//               className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 pointer-events-none"
//             />
//           </div>
//         </div>

//         {/* Order Status */}
//         <div className="flex-1">
//           <label className="block text-sm text-gray-600 mb-2">
//             Order Status
//           </label>
//           <div className="relative">
//             <select
//               value={orderStatus}
//               onChange={(e) => setOrderStatus(e.target.value)}
//               className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 pr-10 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
//             >
//               <option>All Statuses</option>
//               <option>Pending</option>
//               <option>Processing</option>
//               <option>Completed</option>
//               <option>Cancelled</option>
//             </select>
//             <ChevronDown 
//               size={20} 
//               className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 pointer-events-none"
//             />
//           </div>
//         </div>

//         {/* Category */}
//         <div className="flex-1">
//           <label className="block text-sm text-gray-600 mb-2">
//             Category
//           </label>
//           <div className="relative">
//             <select
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 pr-10 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
//             >
//               <option>All Category</option>
//               <option>Electronics</option>
//               <option>Clothing</option>
//               <option>Food & Beverages</option>
//               <option>Home & Garden</option>
//             </select>
//             <ChevronDown 
//               size={20} 
//               className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 pointer-events-none"
//             />
//           </div>
//         </div>

//         {/* Apply Filters Button */}
//         <button
//           onClick={handleApplyFilters}
//           className="px-8 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors whitespace-nowrap"
//         >
//           Apply Filters
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FiltersExportSection;