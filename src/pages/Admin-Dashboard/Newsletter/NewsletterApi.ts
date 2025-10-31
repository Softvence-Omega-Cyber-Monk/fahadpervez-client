// import React, { useState, useMemo } from 'react';
// import { 
//   Mail, 
//   Trash2, 
//   Search, 
//   Users, 
//   UserCheck, 
//   UserX, 
//   Download,
//   Upload,
//   Filter,
//   RefreshCw
// } from 'lucide-react';

// // Mock API hooks - replace with your actual newsletterApi hooks
// const useGetAllSubscribersQuery = (params) => ({
//   data: {
//     success: true,
//     count: 150,
//     data: Array.from({ length: 150 }, (_, i) => ({
//       _id: `sub_${i}`,
//       email: `user${i}@example.com`,
//       status: i % 3 === 0 ? 'unsubscribed' : 'active',
//       subscribedAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
//       unsubscribedAt: i % 3 === 0 ? new Date().toISOString() : null,
//       createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
//       updatedAt: new Date().toISOString(),
//     }))
//   },
//   isLoading: false,
//   refetch: () => console.log('Refetching...'),
// });

// const useGetNewsletterStatsQuery = () => ({
//   data: {
//     success: true,
//     data: {
//       total: 150,
//       active: 100,
//       unsubscribed: 50,
//     }
//   },
//   isLoading: false,
// });

// const useDeleteSubscriberMutation = () => [
//   async (email) => {
//     console.log('Deleting:', email);
//     return { data: { success: true } };
//   },
//   { isLoading: false }
// ];

// const useBulkSubscribeMutation = () => [
//   async (data) => {
//     console.log('Bulk subscribe:', data);
//     return { 
//       data: { 
//         success: true, 
//         data: { 
//           success: data.emails.length, 
//           failed: 0, 
//           errors: [] 
//         } 
//       } 
//     };
//   },
//   { isLoading: false }
// ];

// const NewsletterAdmin = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showBulkModal, setShowBulkModal] = useState(false);
//   const [bulkEmails, setBulkEmails] = useState('');
//   const itemsPerPage = 10;

//   const { data: subscribersData, isLoading, refetch } = useGetAllSubscribersQuery(
//     statusFilter !== 'all' ? { status: statusFilter } : undefined
//   );
//   const { data: statsData } = useGetNewsletterStatsQuery();
//   const [deleteSubscriber] = useDeleteSubscriberMutation();
//   const [bulkSubscribe, { isLoading: isBulkLoading }] = useBulkSubscribeMutation();

//   const subscribers = subscribersData?.data || [];
//   const stats = statsData?.data;

//   // Filter and search
//   const filteredSubscribers = useMemo(() => {
//     return subscribers.filter(sub => {
//       const matchesSearch = sub.email.toLowerCase().includes(searchQuery.toLowerCase());
//       const matchesStatus = statusFilter === 'all' || sub.status === statusFilter;
//       return matchesSearch && matchesStatus;
//     });
//   }, [subscribers, searchQuery, statusFilter]);

//   // Pagination
//   const totalPages = Math.ceil(filteredSubscribers.length / itemsPerPage);
//   const paginatedSubscribers = filteredSubscribers.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handleDelete = async (email) => {
//     if (window.confirm(`Are you sure you want to delete ${email}?`)) {
//       try {
//         await deleteSubscriber(email);
//         refetch();
//       } catch (error) {
//         console.error('Error deleting subscriber:', error);
//       }
//     }
//   };

//   const handleBulkSubscribe = async () => {
//     const emails = bulkEmails
//       .split('\n')
//       .map(e => e.trim())
//       .filter(e => e && e.includes('@'));
    
//     if (emails.length === 0) {
//       alert('Please enter valid email addresses');
//       return;
//     }

//     try {
//       const result = await bulkSubscribe({ emails });
//       alert(`Success: ${result.data.data.success} emails subscribed`);
//       setShowBulkModal(false);
//       setBulkEmails('');
//       refetch();
//     } catch (error) {
//       console.error('Error bulk subscribing:', error);
//     }
//   };

//   const exportToCSV = () => {
//     const csv = [
//       ['Email', 'Status', 'Subscribed At', 'Unsubscribed At'],
//       ...filteredSubscribers.map(sub => [
//         sub.email,
//         sub.status,
//         new Date(sub.subscribedAt).toLocaleString(),
//         sub.unsubscribedAt ? new Date(sub.unsubscribedAt).toLocaleString() : 'N/A'
//       ])
//     ].map(row => row.join(','))
//      .join('\n');
    
//     const blob = new Blob([csv], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
//     a.click();
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Newsletter Management</h1>
//           <p className="text-gray-600">Manage your newsletter subscribers and analytics</p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white rounded-lg shadow p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Total Subscribers</p>
//                 <p className="text-3xl font-bold text-gray-900 mt-2">{stats?.total || 0}</p>
//               </div>
//               <div className="bg-blue-100 p-3 rounded-full">
//                 <Users className="w-8 h-8 text-blue-600" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Active</p>
//                 <p className="text-3xl font-bold text-green-600 mt-2">{stats?.active || 0}</p>
//               </div>
//               <div className="bg-green-100 p-3 rounded-full">
//                 <UserCheck className="w-8 h-8 text-green-600" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Unsubscribed</p>
//                 <p className="text-3xl font-bold text-red-600 mt-2">{stats?.unsubscribed || 0}</p>
//               </div>
//               <div className="bg-red-100 p-3 rounded-full">
//                 <UserX className="w-8 h-8 text-red-600" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Actions and Filters */}
//         <div className="bg-white rounded-lg shadow p-6 mb-6">
//           <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
//             <div className="flex-1 w-full lg:w-auto">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   placeholder="Search by email..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//             </div>

//             <div className="flex flex-wrap gap-3">
//               <div className="flex items-center gap-2">
//                 <Filter className="w-5 h-5 text-gray-600" />
//                 <select
//                   value={statusFilter}
//                   onChange={(e) => setStatusFilter(e.target.value)}
//                   className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   <option value="all">All Status</option>
//                   <option value="active">Active</option>
//                   <option value="unsubscribed">Unsubscribed</option>
//                 </select>
//               </div>

//               <button
//                 onClick={refetch}
//                 className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center gap-2"
//               >
//                 <RefreshCw className="w-4 h-4" />
//                 Refresh
//               </button>

//               <button
//                 onClick={exportToCSV}
//                 className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
//               >
//                 <Download className="w-4 h-4" />
//                 Export CSV
//               </button>

//               <button
//                 onClick={() => setShowBulkModal(true)}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
//               >
//                 <Upload className="w-4 h-4" />
//                 Bulk Subscribe
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Subscribers Table */}
//         <div className="bg-white rounded-lg shadow overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50 border-b border-gray-200">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Email
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Subscribed At
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {paginatedSubscribers.map((subscriber) => (
//                   <tr key={subscriber._id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <Mail className="w-5 h-5 text-gray-400 mr-3" />
//                         <span className="text-sm font-medium text-gray-900">
//                           {subscriber.email}
//                         </span>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span
//                         className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                           subscriber.status === 'active'
//                             ? 'bg-green-100 text-green-800'
//                             : 'bg-red-100 text-red-800'
//                         }`}
//                       >
//                         {subscriber.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {new Date(subscriber.subscribedAt).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                       <button
//                         onClick={() => handleDelete(subscriber.email)}
//                         className="text-red-600 hover:text-red-900 flex items-center gap-1"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
//               <div className="flex-1 flex justify-between sm:hidden">
//                 <button
//                   onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
//                   disabled={currentPage === 1}
//                   className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
//                 >
//                   Previous
//                 </button>
//                 <button
//                   onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
//                   disabled={currentPage === totalPages}
//                   className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
//                 >
//                   Next
//                 </button>
//               </div>
//               <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
//                 <div>
//                   <p className="text-sm text-gray-700">
//                     Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
//                     <span className="font-medium">
//                       {Math.min(currentPage * itemsPerPage, filteredSubscribers.length)}
//                     </span>{' '}
//                     of <span className="font-medium">{filteredSubscribers.length}</span> results
//                   </p>
//                 </div>
//                 <div>
//                   <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
//                     {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//                       <button
//                         key={page}
//                         onClick={() => setCurrentPage(page)}
//                         className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
//                           currentPage === page
//                             ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
//                             : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
//                         }`}
//                       >
//                         {page}
//                       </button>
//                     ))}
//                   </nav>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Bulk Subscribe Modal */}
//       {showBulkModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
//             <h2 className="text-2xl font-bold text-gray-900 mb-4">Bulk Subscribe</h2>
//             <p className="text-gray-600 mb-4">
//               Enter email addresses, one per line. Invalid emails will be skipped.
//             </p>
//             <textarea
//               value={bulkEmails}
//               onChange={(e) => setBulkEmails(e.target.value)}
//               placeholder="user1@example.com&#10;user2@example.com&#10;user3@example.com"
//               rows={10}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
//             />
//             <div className="flex justify-end gap-3 mt-6">
//               <button
//                 onClick={() => {
//                   setShowBulkModal(false);
//                   setBulkEmails('');
//                 }}
//                 className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleBulkSubscribe}
//                 disabled={isBulkLoading}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
//               >
//                 {isBulkLoading ? 'Processing...' : 'Subscribe All'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NewsletterAdmin;