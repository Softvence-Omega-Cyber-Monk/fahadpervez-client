import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline'; // Assumes you have Heroicons installed
import { PaymentMethodInfo } from '@/types/SellerDashboardTypes/SettingsTypes';
import useUpdateProfile from '@/hooks/useUpdateProfile';
import { toast } from 'sonner';

interface BillingSettingsProps {
  billingData: PaymentMethodInfo;
}

const BillingSettings: React.FC<BillingSettingsProps> = (props) => {
  const { billingData } = props;

  // State to handle updates
  const [defaultPaymentMethod, setDefaultPaymentMethod] = useState(billingData.defaultPaymentMethod || 'Bank account');
  const [bankAccountHolderName, setBankAccountHolderName] = useState(billingData.bankAccountHolderName || '');
  const [bankName, setBankName] = useState(billingData.bankName || '');
  const [bankAccountNumber, setBankAccountNumber] = useState(billingData.bankAccountNumber || '');
  const [bankRoutingNumber, setBankRoutingNumber] = useState(billingData.bankRoutingNumber || '');
  const {handleUpdate} = useUpdateProfile();

  // Save handler
  const handleSave = async() => {
    const updatedBilling = {
      defaultPaymentMethod,
      bankAccountHolderName,
      bankName,
      bankAccountNumber,
      bankRoutingNumber,
    };
    console.log('Updated Billing Data:', updatedBilling);
    try {
      await handleUpdate(updatedBilling);
    } catch (error) {
      toast.error("An unexpected error occurred" + error );
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Billing Information (default)</h2>
        <div className="space-x-3">
          <button
            className="px-4 py-2 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition duration-200"
            onClick={handleSave}
          >
            Update default
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-200">
            Add new
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Payment Method */}
        <div className="space-y-2">
          <label htmlFor="defaultPaymentMethod" className="block text-sm font-medium text-gray-700">Payment Method</label>
          <div className="relative">
            <select
              id="defaultPaymentMethod"
              value={defaultPaymentMethod}
              onChange={(e) => setDefaultPaymentMethod(e.target.value)}
              className="appearance-none w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white pr-10"
            >
              <option>Bank account</option>
              <option>Credit Card</option>
              <option>PayPal</option>
            </select>
            <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Legal Name */}
          <div className="space-y-2">
            <label htmlFor="legalName" className="block text-sm font-medium text-gray-700">Legal Name</label>
            <input
              type="text"
              id="bankAccountHolderName"
              value={bankAccountHolderName}
              onChange={(e) => setBankAccountHolderName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* Bank Name */}
          <div className="space-y-2">
            <label htmlFor="bankName" className="block text-sm font-medium text-gray-700">Bank Name</label>
            <input
              type="text"
              id="bankName"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* Banking Number */}
          <div className="space-y-2">
            <label htmlFor="bankAccountNumber" className="block text-sm font-medium text-gray-700">Banking Number</label>
            <input
              type="password"
              id="bankAccountNumber"
              value={bankAccountNumber}
              onChange={(e) => setBankAccountNumber(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* Routing Number */}
          <div className="space-y-2">
            <label htmlFor="routingNumber" className="block text-sm font-medium text-gray-700">Routing Number</label>
            <input
              type="password"
              id="routingNumber"
              value={bankRoutingNumber}
              onChange={(e) => setBankRoutingNumber(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingSettings;
