// src/components/AdminSettings/PlatformSettings.tsx

import React from 'react';
import { CloudArrowUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline'; // Assumes you have Heroicons installed

const PlatformSettings: React.FC = () => (
  <div className="p-6 bg-white rounded-lg shadow-sm">
    <h2 className="text-xl font-semibold text-gray-800 mb-6">General settings</h2>

    <div className="space-y-6">
      {/* Platform/Site Name */}
      <div className="space-y-2">
        <label htmlFor="platformName" className="block text-sm font-medium text-gray-700">Platform/Site Name</label>
        <input type="text" id="platformName" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Website Language */}
        <div className="space-y-2">
          <label htmlFor="language" className="block text-sm font-medium text-gray-700">Website Language</label>
          <div className="relative">
            <select id="language" defaultValue="English" className="appearance-none w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white pr-10">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
            <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Timezone */}
        <div className="space-y-2">
          <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">Timezone</label>
          <div className="relative">
            <select id="timezone" defaultValue="UTC" className="appearance-none w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white pr-10">
              <option>UTC</option>
              <option>EST</option>
              <option>PST</option>
            </select>
            <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Currency */}
      <div className="space-y-2">
        <label htmlFor="currency" className="block text-sm font-medium text-gray-700">Currency</label>
        <div className="relative">
          <select id="currency" defaultValue="$USD" className="appearance-none w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white pr-10">
            <option>$USD</option>
            <option>€EUR</option>
            <option>£GBP</option>
          </select>
          <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
        </div>
      </div>
      
      {/* Logo Upload */}
      <div className="space-y-2">
        <label htmlFor="logoUpload" className="block text-sm font-medium text-gray-700">Logo upload</label>
        <div className="flex flex-col items-center justify-center p-12 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 transition duration-200">
          <CloudArrowUpIcon className="h-8 w-8 text-gray-400" />
          <p className="mt-2 text-sm text-gray-500">Add photo</p>
          <input id="logoUpload" type="file" className="sr-only" />
        </div>
      </div>
    </div>

    <div className="mt-8 text-right">
      <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200">
        Update
      </button>
    </div>
  </div>
);

export default PlatformSettings;