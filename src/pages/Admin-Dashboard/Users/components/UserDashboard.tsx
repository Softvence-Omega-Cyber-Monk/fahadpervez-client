
// import React, { useMemo } from 'react';
// import { Search, Download, User, ChevronRight } from 'lucide-react';
// import { UserData, UserType } from '../types';
// import { DUMMY_USERS, DUMMY_REQUESTS } from '../data';
// import UserTable from './UserTable';

// interface UserDashboardProps {
//   currentTab: UserType;
//   setCurrentTab: (tab: UserType) => void;
//   onViewDetails: (user: UserData) => void;
//   onViewSellerRequests: () => void;
// }

// const UserDashboard: React.FC<UserDashboardProps> = ({ currentTab, setCurrentTab, onViewDetails , onViewSellerRequests }) => {

  
//   // console.log(data)
//   // const {createdAt , email , name , isActive } = data?.data;

//   const users = useMemo(() => DUMMY_USERS.filter(u => u.type === currentTab), [currentTab]);
//   const newRequestsCount = DUMMY_REQUESTS.length;

//   const TabButton: React.FC<{ type: UserType }> = ({ type }) => {
//     const isActive = type === currentTab;
//     return (
//       <button
//         onClick={() => setCurrentTab(type)}
//         className={`px-6 py-2.5 text-sm font-semibold transition duration-150 rounded-lg ${
//           isActive
//             ? 'bg-white text-indigo-600 shadow-md'
//             : 'text-gray-500 hover:bg-gray-100'
//         }`}
//       >
//         {type}s
//       </button>
//     );
//   };

//   return (
//     <div className="container mx-auto p-4 sm:p-6 lg:p-8">
//       {/* Top Bar / Navigation */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
//         <div className="flex space-x-2 bg-gray-100 p-1 rounded-xl shadow-inner">
//           <TabButton type="Buyer" />
//           <TabButton type="Seller" />
//         </div>
//         <button className="flex items-center px-4 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-150">
//           <Download className="w-5 h-5 mr-2" /> Export
//         </button>
//       </div>

//       {/* Search and Alerts */}
//       <div className="mb-6 flex flex-col md:flex-row justify-between items-stretch md:items-center space-y-4 md:space-y-0 md:space-x-4">
//         <div className="flex-grow max-w-lg relative">
//           <input
//             type="text"
//             placeholder="Search users..."
//             className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-400 transition duration-150"
//           />
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//           <User className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//         </div>
//         {currentTab === 'Seller' && newRequestsCount > 0 && (
//           <button
//             onClick={onViewSellerRequests}
//             className="flex items-center px-4 py-3 bg-amber-500 text-white font-semibold rounded-xl shadow-lg hover:bg-amber-600 transition duration-150"
//           >
//             <span className="text-lg font-bold mr-2">{newRequestsCount.toString().padStart(2, '0')}</span> New Seller Profile Requests
//             <ChevronRight className="w-5 h-5 ml-2" />
//           </button>
//         )}
//       </div>

//       {/* User Table */}
//       <UserTable users={users} type={currentTab} onViewDetails={onViewDetails} />
//     </div>
//   );
// };

// export default UserDashboard;
