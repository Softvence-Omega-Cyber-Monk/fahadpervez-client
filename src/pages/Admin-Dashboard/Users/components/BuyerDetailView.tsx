
import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { BuyerDetails } from '../types';
import Card from './Card';
import UserAvatar from './UserAvatar';

interface BuyerDetailViewProps {
  buyer: BuyerDetails;
  onBack: () => void;
}

const BuyerDetailView: React.FC<BuyerDetailViewProps> = ({ buyer, onBack }) => {
  const StatCard: React.FC<{ title: string; value: string | number; description: string }> = ({ title, value, description }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <p className="text-sm font-semibold text-gray-500 mb-1">{title}</p>
      <div className="text-2xl font-bold text-gray-900">{typeof value === 'number' ? `$${value.toLocaleString()} USD` : value}</div>
      <p className="text-xs text-gray-400 mt-1">{description}</p>
    </div>
  );

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <nav className="text-sm text-gray-500 mb-6">
        <span className="cursor-pointer hover:text-indigo-600" onClick={onBack}>User</span> &gt; Buyer &gt; Buyer details
      </nav>

      <Card title="Buyer Details" className="mb-8 p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 pb-6 border-b border-gray-100 mb-6">
          <UserAvatar url={buyer.avatarUrl} name={buyer.name} size="lg" />
          <div className="flex-grow">
            <div className="flex justify-between items-start w-full">
              <h2 className="text-2xl font-bold text-gray-800">{buyer.name}</h2>
              <div className="flex items-center text-gray-500 text-sm">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{buyer.location}</span>
              </div>
            </div>
            <p className="text-sm text-gray-500">Join date: {buyer.joinDate}</p>
          </div>
        </div>

        {/* Contact Information */}
        <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-indigo-500" />
            <div>
              <p className="text-sm font-semibold text-gray-500">Email</p>
              <div className="text-gray-900">{buyer.email}</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-indigo-500" />
            <div>
              <p className="text-sm font-semibold text-gray-500">Phone</p>
              <div className="text-gray-900">{buyer.phone}</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-indigo-500" />
            <div>
              <p className="text-sm font-semibold text-gray-500">Address</p>
              <div className="text-gray-900">{buyer.address}</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard title="Order Complete" value={buyer.orderComplete} description={`${buyer.orderComplete} order complete total`} />
        <StatCard title="Cancel Order" value={buyer.orderCancel} description={`${buyer.orderCancel} order cancel`} />
        <StatCard title="Buy Amount" value={buyer.buyAmount} description="Total buy" />
      </div>
    </div>
  );
};

export default BuyerDetailView;
