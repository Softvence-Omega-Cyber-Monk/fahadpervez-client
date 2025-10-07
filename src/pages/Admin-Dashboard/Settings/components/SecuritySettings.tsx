// src/components/AdminSettings/SecuritySettings.tsx

import React from 'react';
import { EyeIcon } from '@heroicons/react/24/outline'; // Assumes you have Heroicons installed

const SecuritySettings: React.FC = () => (
  <div className="p-6 bg-white rounded-lg shadow-sm">
    <h2 className="text-xl font-semibold text-gray-800 mb-6">Security Settings</h2>
    <p className="text-lg font-medium text-gray-700 mb-6">Change password</p>

    <div className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Current password</label>
        <div className="relative">
          <input type="password" id="currentPassword" className="w-full p-3 border border-gray-300 rounded-lg pr-10 focus:ring-blue-500 focus:border-blue-500" />
          <EyeIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 cursor-pointer" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New password</label>
          <div className="relative">
            <input type="password" id="newPassword" className="w-full p-3 border border-gray-300 rounded-lg pr-10 focus:ring-blue-500 focus:border-blue-500" />
            <EyeIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 cursor-pointer" />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700">Confirm new password</label>
          <div className="relative">
            <input type="password" id="confirmNewPassword" className="w-full p-3 border border-gray-300 rounded-lg pr-10 focus:ring-blue-500 focus:border-blue-500" />
            <EyeIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>

    <div className="mt-8 text-right">
      <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200">
        Update password
      </button>
    </div>
  </div>
);

export default SecuritySettings;