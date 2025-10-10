import React, { useState } from 'react';
import ReviewInfoPopup from './ReviewInfoPopup';

interface BusinessInfo {
  businessName: string;
  businessType: string;
  country: string;
}

interface StoreBranding {
  shopName: string;
  shopDescription: string;
  shopLogo: string;
}

interface ShippingInfo {
  productCategory: string;
  shippingRegions: string;
  storeDescription: string;
}

interface PaymentSetup {
  paymentMethod: string;
  accountHolderName: string;
  accountNumber: string;
}

interface FormData {
  businessInfo: BusinessInfo;
  storeBranding: StoreBranding;
  shippingInfo: ShippingInfo;
  paymentSetup: PaymentSetup;
}

type EditSection = 'businessInfo' | 'storeBranding' | 'shippingInfo' | 'paymentSetup' | null;

const Review: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    businessInfo: {
      businessName: 'ABC Business',
      businessType: 'FMCG',
      country: 'USA'
    },
    storeBranding: {
      shopName: 'Shop Name',
      shopDescription: 'Lorem ipsum dolor sit amet consectetur.',
      shopLogo: 'https://via.placeholder.com/60'
    },
    shippingInfo: {
      productCategory: 'Antibiotics',
      shippingRegions: 'International',
      storeDescription: 'Pharmacy'
    },
    paymentSetup: {
      paymentMethod: 'Stripe',
      accountHolderName: 'Maecen Nam Finay',
      accountNumber: '**** **** **** 1234'
    }
  });

  const [editingSection, setEditingSection] = useState<EditSection>(null);
  const [tempData, setTempData] = useState<any>({});

  const handleEdit = (section: EditSection) => {
    if (section) {
      setTempData({ ...formData[section] });
    }
    setEditingSection(section);
  };


  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Profile setup completed successfully!');
  };

  return (
    <div className="min-h-screen pt-30">

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-15">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">LET'S SETUP YOUR PROFILE</h1>
          <p className="text-gray-500 text-sm">
            Lorem ipsum dolor sit amet consectetur. Diam fermentum fusce in magna est fusce tellus vitae malesuada. A enim convallis eros gravida at id arcu venenatis.
          </p>
        </div>

        {/* Review & Confirm Section */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">REVIEW & CONFIRM</h2>
        <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-6 mb-6">

          {/* Business Information */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900">Business Information</h3>
              <button
                onClick={() => handleEdit('businessInfo')}
                className="text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Business Name</span>
                <span className="text-gray-900 font-medium">{formData.businessInfo.businessName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Business Type</span>
                <span className="text-gray-900 font-medium">{formData.businessInfo.businessType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Country</span>
                <span className="text-gray-900 font-medium">{formData.businessInfo.country}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 my-6"></div>

          {/* Store Branding */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900">Store Branding</h3>
              <button
                onClick={() => handleEdit('storeBranding')}
                className="text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            </div>
            <div className="flex items-start gap-4">
              <img
                src={formData.storeBranding.shopLogo}
                alt="Shop Logo"
                className="w-14 h-14 rounded-lg object-cover border border-gray-200"
              />
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-gray-900 mb-1">{formData.storeBranding.shopName}</h4>
                <p className="text-sm text-gray-600">{formData.storeBranding.shopDescription}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 my-6"></div>

          {/* Business Information (Shipping) */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900">Business Information</h3>
              <button
                onClick={() => handleEdit('shippingInfo')}
                className="text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Product Category</span>
                <span className="text-gray-900 font-medium">{formData.shippingInfo.productCategory}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping Regions</span>
                <span className="text-gray-900 font-medium">{formData.shippingInfo.shippingRegions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Store Description</span>
                <span className="text-gray-900 font-medium">{formData.shippingInfo.storeDescription}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 my-6"></div>

          {/* Payment Setup */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900">Payment Setup</h3>
              <button
                onClick={() => handleEdit('paymentSetup')}
                className="text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method</span>
                <span className="text-gray-900 font-medium">{formData.paymentSetup.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Account Holder Name</span>
                <span className="text-gray-900 font-medium">{formData.paymentSetup.accountHolderName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Account Number</span>
                <span className="text-gray-900 font-medium">{formData.paymentSetup.accountNumber}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className='flex justify-end'>
            <button
            onClick={handleSubmit}
            className="w-70  bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-md transition-colors duration-200 cursor-pointer"
            >
            Request To Admin
            </button>
        </div>
      </div>

      {/* Edit Modal */}
      <ReviewInfoPopup
        editingSection={editingSection}
        tempData={tempData}
        setTempData={setTempData}
        handleCancel={() => setEditingSection(null)}
        handleSave={() => {
            if (editingSection) {
            setFormData((prev) => ({
                ...prev,
                [editingSection]: { ...tempData },
            }));
            }
            setEditingSection(null);
            setTempData({});
        }}
        formData={formData}
        />
    </div>
  );
};

export default Review;