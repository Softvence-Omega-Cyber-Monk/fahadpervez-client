import { useState } from 'react';
import PersonalInfo from '../../PersonalInfo/PersonalInfo';
import ShippingAddress from '../../ShippingAddress/ShippingAddress';
import AccountSettings from '../../AccountSettings/AccountSettings';
import PaymentMethods from '../../PaymentMethods/PaymentMethods';

export default function AccountTabs() {
  const [activeTab, setActiveTab] = useState('personal');

  const tabs = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'shipping', label: 'Shipping Addresses' },
    { id: 'account', label: 'Account Settings' },
    { id: 'payment', label: 'Payment Methods' }
  ];

  return (
    <div className="w-full p-4 sm:p-6">
      {/* Tabs Container */}
      <div className="flex flex-wrap justify-between gap-2 sm:gap-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-4 sm:px-6 py-3 text-sm sm:text-base font-medium transition-colors whitespace-nowrap`}
          >
            {tab.label}
            
            {/* Active Tab Indicator */}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0082FA] -mb-0.5" />
            )}
            
            {/* Dashed Border for Account Settings */}
            {tab.id === 'account' && activeTab === tab.id && (
              <span 
                className="absolute inset-0 border-2 border-dashed border-teal-600 rounded pointer-events-none"
                style={{ bottom: '-2px' }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'personal' && (
          <PersonalInfo/>
        )}
        {activeTab === 'shipping' && (
          <ShippingAddress/>
        )}
        {activeTab === 'account' && (
          <AccountSettings/>
        )}
        {activeTab === 'payment' && (
         <PaymentMethods/>
        )}
      </div>
    </div>
  );
}