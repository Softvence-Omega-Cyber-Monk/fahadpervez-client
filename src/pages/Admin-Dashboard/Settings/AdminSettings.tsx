import React, { useState, useMemo, JSX } from "react";
import ProfileInfoSettings from "./components/ProfileInfoSettings";
import SecuritySettings from "./components/SecuritySettings";
import BillingSettings from "./components/BillingSettings";
import PlatformSettings from "./components/PlatformSettings";
import PrivacySettings from "./components/PrivacySettings";
import NotificationSettings from "./components/NotificationSettings";
import { useGetMeQuery } from "@/Redux/Features/auth/auth.api";
import { Spinner } from "@/components/ui/spinner";

const AdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Profile Info");
  const { data, isLoading } = useGetMeQuery({});
  const userData = data?.data || {};
  const {
    orderNotification,
    promotionNotification,
    communicationAlert,
    newReviewsNotification,
    name,
    email,
    language,
    profileImage,
    phone,
    defaultPaymentMethod,
    bankAccountHolderName,
    // bankName,
    bankAccountNumber,
    bankRoutingNumber,
  } = userData;

  const profileInfo = useMemo(
    () => ({
      name: name ,
      phone: phone,
      email: email,
      profileImage: profileImage,
    }),
    [name, phone, email, profileImage]
  );

  const billing = {
    defaultPaymentMethod,
    bankAccountHolderName,
    bankName : "",
    bankAccountNumber,
    bankRoutingNumber,
  };

  const platformSettings = {
    siteName: name || "",
    websiteLanguage: language || "",
    timeZone: "",
    currency: "",
    logo: profileImage || "",
  };

  const privacy = {
    privacyPolicy: "",
    termsAndConditions: "",
  };

  const notification = {
    orderNotification: orderNotification || "",
    promotionNotification: promotionNotification || "",
    communicationAlert: communicationAlert || "",
    newReviewsNotification: newReviewsNotification || "",
  };

  const tabComponents: Record<string, JSX.Element> = {
    "Profile Info": <ProfileInfoSettings profileData={profileInfo} />,
    Security: <SecuritySettings />,
    Billing: <BillingSettings billingData={billing} />,
    "Platform Settings": (
      <PlatformSettings platformData={platformSettings} />
    ),
    Privacy: <PrivacySettings privacyData={privacy} />,
    Notification: <NotificationSettings notificationData={notification} />,
  };

  const tabs = Object.keys(tabComponents);
  const ActiveComponent = tabComponents[activeTab];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
       <Spinner/>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-10">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500">
          Manage and configure essential platform settings.
        </p>
      </header>

      {/* Tabs Navigation */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="flex space-x-8 -mb-px overflow-x-auto px-4 sm:px-0">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200
                ${
                  activeTab === tab
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      {/* Active Tab Content */}
      <main className="mt-8 max-w-4xl mx-auto lg:mx-0">
        {ActiveComponent || (
          <p className="text-gray-500 text-center">Select a tab to view.</p>
        )}
      </main>
    </div>
  );
};

export default AdminSettings;
