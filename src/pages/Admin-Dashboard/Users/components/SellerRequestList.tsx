
import React from 'react';
import { SellerRequest } from '../types';
import Badge from './Badge';
import Card from './Card';

interface SellerRequestListProps {
  requests: SellerRequest[];
  onBack: () => void;
  onReview: (id: string) => void;
}

const SellerRequestList: React.FC<SellerRequestListProps> = ({ requests, onBack, onReview }) => {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <nav className="text-sm text-gray-500 mb-6">
        <span className="cursor-pointer hover:text-indigo-600" onClick={onBack}>Users</span> &gt; Sellers &gt; New Seller Profile Requests
      </nav>

      <Card title="New Seller Profile Requests">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['Applicant Name', 'Business Name', 'Submission Date', 'Status', ''].map((header) => (
                  <th
                    key={header}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.applicantName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.businessName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.submissionDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Badge status={request.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => onReview(request.applicationDetailsId)}
                      className="text-indigo-600 hover:text-indigo-900 font-semibold"
                    >
                      Review Application
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default SellerRequestList;
