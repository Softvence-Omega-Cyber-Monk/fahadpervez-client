// src/components/AdminSettings/AdminSettings.tsx

import React, { useState } from 'react';
import ProfileInfoSettings from './components/ProfileInfoSettings';
import SecuritySettings from './components/SecuritySettings';
import BillingSettings from './components/BillingSettings';
import PlatformSettings from './components/PlatformSettings';
import PrivacySettings from './components/PrivacySettings';
import NotificationSettings from './components/NotificationSettings';

// Map of tab names to their corresponding components
const tabComponents: Record<string, React.FC> = {
  'Profile Info': ProfileInfoSettings,
  'Security': SecuritySettings,
  'Billing': BillingSettings,
  'Platform Settings': PlatformSettings,
  'Privacy': PrivacySettings,
  'Notification': NotificationSettings,
};

// Array of tab keys to maintain order
const tabs = Object.keys(tabComponents);

const AdminSettings: React.FC = () => {
  // State to track which tab is currently active, defaulting to 'Profile Info'
  const [activeTab, setActiveTab] = useState<string>('Profile Info');

  // Get the component to render for the active tab
  const ActiveComponent = tabComponents[activeTab];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-10">
      {/* Settings Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500">Manage and configure essential platform settings.</p>
      </header>

      {/* Tabs Navigation */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="flex space-x-8 -mb-px overflow-x-auto px-4 sm:px-0">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200
                ${activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      {/* Content Area */}
      <main className="mt-8 max-w-4xl mx-auto lg:mx-0">
        <ActiveComponent />
      </main>
    </div>
  );
};

export default AdminSettings;