// src/components/AdminSettings/PrivacySettings.tsx

import { PrivacyTypes } from '@/types/SellerDashboardTypes/SettingsTypes';
import React from 'react';

interface PrivacySettingsProps {
  privacyData: PrivacyTypes
}


const PrivacySettings: React.FC<PrivacySettingsProps> = (props) => {
  const { privacyPolicy, termsAndConditions} = props.privacyData
  console.log(privacyPolicy, termsAndConditions)
  return(
  <div className="p-6 bg-white rounded-lg shadow-sm">
    <h2 className="text-xl font-semibold text-gray-800 mb-6">Privacy Policy</h2>

    <div className="space-y-6">
      {/* Privacy Policy Textarea */}
      <div className="space-y-2">
        <label htmlFor="privacyPolicy" className="block text-sm font-medium text-gray-700">Platform/Site Name</label>
        <textarea
          id="privacyPolicy"
          rows={6}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
      </div>

      {/* Terms & Conditions Textarea */}
      <div className="space-y-2">
        <label htmlFor="terms" className="block text-sm font-medium text-gray-700">Terms & Conditions</label>
        <textarea
          id="terms"
          rows={6}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
      </div>
    </div>

    <div className="mt-8 text-right">
      <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200">
        Update
      </button>
    </div>
  </div>
)};

export default PrivacySettings;