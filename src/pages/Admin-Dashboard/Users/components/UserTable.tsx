
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { UserData, UserType } from '../types';
import Badge from './Badge';
import UserAvatar from './UserAvatar';

interface UserTableProps {
  users: UserData[];
  type: UserType;
  onViewDetails: (user: UserData) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, type, onViewDetails }) => {
  const columnHeaders = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'total', label: type === 'Buyer' ? 'Total Buy' : 'Products' },
    { key: 'totalSell', label: type === 'Seller' ? 'Total Sell' : 'Total Buy' },
    { key: 'status', label: 'Status' },
    { key: 'joinOn', label: 'Join On' },
    { key: 'actions', label: '' },
  ];

  const filteredHeaders = columnHeaders.filter(h => {
    if (type === 'Buyer' && h.key === 'total') return true;
    if (type === 'Seller' && h.key === 'totalSell') return true;
    if (type === 'Seller' && h.key === 'total') return false; // Remove 'Total Buy' for sellers
    if (type === 'Buyer' && h.key === 'totalSell') return false; // Remove 'Total Sell' for buyers
    return true;
  });

  return (
    <div className="mt-6">
      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {filteredHeaders.map((header) => (
                  <th
                    key={header.key}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <UserAvatar url={user.avatarUrl} name={user.name} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.phone}</td>
                  {type === 'Buyer' && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">{user.total}</td>
                  )}
                  {type === 'Seller' && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">{user.products}</td>
                  )}
                  {type === 'Seller' && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">{user.total}</td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge status={user.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joinOn}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => onViewDetails(user)} className="text-indigo-500 hover:text-indigo-700">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination and Summary */}
        <div className="flex items-center justify-between p-4 sm:px-6">
          <div className="text-sm text-gray-600">
            Showing 1 to 10 of 24 orders
          </div>
          <div className="flex items-center space-x-2">
            <button className="w-8 h-8 flex items-center justify-center text-gray-400 border border-gray-300 rounded-lg hover:bg-gray-100">
              &lt;
            </button>
            {[1, 2, 3].map(page => (
              <button
                key={page}
                className={`w-8 h-8 flex items-center justify-center text-sm font-semibold rounded-lg ${page === 1 ? 'bg-indigo-600 text-white' : 'text-gray-600 bg-white border border-gray-300 hover:bg-gray-100'}`}
              >
                {page}
              </button>
            ))}
            <button className="w-8 h-8 flex items-center justify-center text-gray-400 border border-gray-300 rounded-lg hover:bg-gray-100">
              &gt;
            </button>
          </div>
        </div>
      </div>

        {/* Mobile Card View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
        {users.map((user) => (
          <div key={user.id} className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 space-y-4">
            {/* Top section: Avatar, Name, Status */}
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <UserAvatar url={user.avatarUrl} name={user.name} />
                <div>
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">Joined: {user.joinOn}</p>
                </div>
              </div>
              <Badge status={user.status} />
            </div>

            {/* Middle section: Contact Info & Stats */}
            <div className="border-t border-b border-gray-100 py-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div className="truncate">
                <p className="text-xs text-gray-500">Email</p>
                <p className="font-medium text-gray-800 truncate">{user.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Phone</p>
                <p className="font-medium text-gray-800">{user.phone}</p>
              </div>
              {type === 'Buyer' && (
                <div><p className="text-xs text-gray-500">Total Buy</p><p className="font-semibold text-gray-900">{user.total}</p></div>
              )}
              {type === 'Seller' && (
                <div><p className="text-xs text-gray-500">Products</p><p className="font-semibold text-gray-900">{user.products}</p></div>
              )}
              {type === 'Seller' && (
                <div><p className="text-xs text-gray-500">Total Sell</p><p className="font-semibold text-gray-900">{user.total}</p></div>
              )}
            </div>

            {/* Bottom section: Action */}
            <div className="flex justify-end">
              <button onClick={() => onViewDetails(user)} className="text-indigo-600 hover:text-indigo-800 font-medium transition text-sm flex items-center">View Details <ChevronRight className="w-4 h-4 ml-1" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
};

export default UserTable;
