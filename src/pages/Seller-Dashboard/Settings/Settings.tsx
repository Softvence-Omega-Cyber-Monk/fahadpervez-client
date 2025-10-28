import { useState } from 'react';
import AccountInformation from './components/AccountInformation';
import StorePreference from './components/StorePreference';
import PaymentSettings from './components/PaymentSettings';
import NotificationSettings from './components/NotificationSettings';
import SecuritySettings from './components/SecuritySettings';
import { Spinner } from '@/components/ui/spinner';
import { useGetMeQuery } from '@/Redux/Features/auth/auth.api';

type Tab = 'Account Information' | 'Store Preference' | 'Payment Settings' | 'Notification' | 'Security';

const Settings = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Account Information');
  const {data , isLoading} = useGetMeQuery({})
  if(isLoading) return <div className='flex items-center justify-center min-h-[70vh]'><Spinner /></div>
const {
  orderNotification,
  promotionNotification,
  communicationAlert,
  newReviewsNotification,
  profileImage,
  storeBanner,
  language,
  _id,
  name,
  email,
  // password,
  role,
  // isActive,
  // isVerified,
  businessName,
  // businessCRNumber,
  // CRDocuments,
  businessType,
  businessDescription,
  country,
  productCategory,
  shippingLocation,
  storeDescription,
  paymentMethod,
  bankAccountHolderName,
  bankAccountNumber,
  bankRoutingNumber,
  taxId,
  currency,
  // isPrivacyPolicyAccepted,
  // vendorSignature,
  // vendorContract,
  // isSellerPolicyAccepted,
  holdingTime,
  address,
  phone,
} = data.data;


const basicInformation = {
    name ,
    phone ,
    profileImage,
    email ,
    country, 
    language,
    role ,
    address
  }
const businessInformation = {
  businessName,
  businessType,
  phone,
  businessDescription,
};

const currencyAndShippingInformation = {
  currency, 
  shippingLocation,
  country, 
  storeBanner,
  holdingTime, 
  storeDescription,
  productCategory,
};

const paymentMethodInfo = {
  defaultPaymentMethod: paymentMethod,
  bankAccountHolderName,
  bankAccountNumber,
  bankRoutingNumber,
};

const taxInformation = {
  taxId,
};

const notifications = {
  orderNotification,
  promotionNotification,
  communicationAlert,
  newReviewsNotification,
};

// const security = {
//   isActive,
//   isVerified,
//   isPrivacyPolicyAccepted,
//   isSellerPolicyAccepted,
//   vendorSignature,
//   vendorContract,
// };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Account Information':
        return <AccountInformation basicInformation={basicInformation} businessInformation={businessInformation} />;
      case 'Store Preference':
        return <StorePreference currencyAndShippingInformation={currencyAndShippingInformation} />;
      case 'Payment Settings':
        return <PaymentSettings  paymentMethodInfo={paymentMethodInfo} taxInformation={taxInformation}/>;
      case 'Notification':
        return <NotificationSettings notifications={notifications} />;
      case 'Security':
        return <SecuritySettings userId = {_id}/>;
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