
import React from 'react';
import { FileText, X, Check } from 'lucide-react';
import { ApplicationDetails } from '../types';
import DetailItem from './DetailItem';
import DetailSection from './DetailSection';

interface SellerReviewDetailProps {
  application: ApplicationDetails;
  onBack: () => void;
}

const SellerReviewDetail: React.FC<SellerReviewDetailProps> = ({ application, onBack }) => {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <nav className="text-sm text-gray-500 mb-6">
        <span className="cursor-pointer hover:text-indigo-600" onClick={onBack}>Users</span> &gt; Sellers &gt; <span className="cursor-pointer hover:text-indigo-600" onClick={onBack}>New Seller Profile Requests</span> &gt; Seller Application
      </nav>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Seller Application Review</h1>
      </div>
      <p className="text-gray-500 mb-8">Review and manage new seller registration profiles.</p>

      <div className="max-w-4xl mx-auto">
        {/* Basic Information */}
        <DetailSection title="Basic Information">
          <DetailItem label="Full Name" value={application.fullName} />
          <DetailItem label="Email" value={application.email} />
          <DetailItem label="Phone Number" value={application.phoneNumber} />
        </DetailSection>

        {/* Business Information */}
        <DetailSection title="Business Information">
          <DetailItem label="Business Name" value={application.businessName} />
          <DetailItem label="Business Type" value={application.businessType} />
          <DetailItem label="CR Number" value={application.crNumber} />
          <DetailItem label="CR Documents" value={<a href={application.crDocumentsLink} className="text-indigo-600 hover:underline flex items-center">View Document <FileText className="w-4 h-4 ml-1" /></a>} />
          <DetailItem label="Business Description" value={application.description} isWide={true} />
        </DetailSection>

        {/* Product & Shipping */}
        <DetailSection title="Product & Shipping">
          <DetailItem label="Product Categories" value={application.productCategories} />
          <DetailItem label="Shipping Locations" value={application.shippingLocations} />
          <DetailItem label="Store Description" value={application.storeDescription} isWide={true} />
        </DetailSection>

        {/* Payment Setup */}
        <DetailSection title="Payment Setup">
          <DetailItem label="Payment Method" value={application.paymentMethod} />
          <DetailItem label="Bank Account Details" value={
            <div className="space-y-1 text-sm">
              <div className='p'>Name: {application.bankDetails.name}</div>
              <div className='p'>Account Number: {application.bankDetails.account}</div>
              <div className='p'>Routing Number: {application.bankDetails.routing}</div>
            </div>
          } />
        </DetailSection>

        {/* Contract Info */}
        <DetailSection title="Contract Info">
          <DetailItem label="Terms Accepted" value={
            <div className={`font-semibold ${application.termsAccepted ? 'text-green-600' : 'text-red-600'}`}>
              {application.termsAccepted ? 'Yes, the seller has accepted all terms and conditions.' : 'No'}
            </div>
          } />
          <DetailItem label="Signature" value={<a href={application.signatureLink} className="text-indigo-600 hover:underline">View Signature</a>} />
        </DetailSection>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-4 pb-12">
          <button
            onClick={onBack}
            className="flex items-center justify-center px-6 py-3 font-semibold text-white bg-red-600 rounded-lg shadow-md hover:bg-red-700 transition duration-150"
          >
            <X className="w-5 h-5 mr-2" /> Reject
          </button>
          <button
            onClick={onBack}
            className="flex items-center justify-center px-6 py-3 font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 transition duration-150"
          >
            <Check className="w-5 h-5 mr-2" /> Approve
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerReviewDetail;
