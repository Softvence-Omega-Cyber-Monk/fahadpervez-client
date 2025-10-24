import { useState } from 'react';
import AccountInformation from './components/AccountInformation';
import StorePreference from './components/StorePreference';
import PaymentSettings from './components/PaymentSettings';
import NotificationSettings from './components/NotificationSettings';
import SecuritySettings from './components/SecuritySettings';
import { useGetMeQuery } from '@/Redux/Features/auth/auth.api';

type Tab = 'Account Information' | 'Store Preference' | 'Payment Settings' | 'Notification' | 'Security';

const Settings = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Account Information');
  const {data} = useGetMeQuery({})
  console.log(data)
  const renderTabContent = () => {
    switch (activeTab) {
      case 'Account Information':
        return <AccountInformation />;
      case 'Store Preference':
        return <StorePreference />;
      case 'Payment Settings':
        return <PaymentSettings />;
      case 'Notification':
        return <NotificationSettings />;
      case 'Security':
        return <SecuritySettings />;
      default:
        return null;
    }
  };

  const tabs: Tab[] = [
    'Account Information',
    'Store Preference',
    'Payment Settings',
    'Notification',
    'Security',
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">SETTINGS</h1>

      <div className="flex space-x-8 px-4 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              pb-3 text-sm font-medium transition-colors relative whitespace-nowrap
              ${activeTab === tab
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'}
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-0 bg-white p-6 rounded-b-lg shadow-sm">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Settings;