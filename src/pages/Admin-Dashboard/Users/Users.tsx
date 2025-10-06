import React, { useState, useMemo } from 'react';
import { UserType, View, UserData } from './types';
import { DUMMY_APPLICATION_DETAIL, DUMMY_BUYER_DETAIL, DUMMY_REQUESTS } from './data';
import UserDashboard from './components/UserDashboard';
import BuyerDetailView from './components/BuyerDetailView';
import SellerRequestList from './components/SellerRequestList';
import SellerReviewDetail from './components/SellerReviewDetail';

const Users: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<UserType>('Buyer');
  const [currentView, setCurrentView] = useState<View>('Dashboard');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);

  const handleViewDetails = (user: UserData) => {
    setSelectedUserId(user.id);
    setCurrentView('BuyerDetail'); // We only have a detailed view for a Buyer in the examples
  };

  const handleViewSellerRequests = () => {
    setCurrentView('SellerRequests');
  };

  const handleReviewApplication = (appId: string) => {
    setSelectedAppId(appId);
    setCurrentView('SellerReview');
  };

  const handleBackToDashboard = () => {
    setSelectedUserId(null);
    setSelectedAppId(null);
    setCurrentView('Dashboard');
  };

  const applicationDetail = useMemo(() => {
    if (currentView === 'SellerReview' && selectedAppId) {
      // In a real app, you'd fetch the details by selectedAppId
      return DUMMY_APPLICATION_DETAIL;
    }
    return null;
  }, [currentView, selectedAppId]);

  const buyerDetail = useMemo(() => {
    if (currentView === 'BuyerDetail' && selectedUserId) {
      // In a real app, you'd fetch the details by selectedUserId
      return DUMMY_BUYER_DETAIL;
    }
    return null;
  }, [currentView, selectedUserId]);


  // Conditional Rendering of Views
  let content;
  switch (currentView) {
    case 'Dashboard':
      content = (
        <UserDashboard
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          onViewDetails={handleViewDetails}
          onViewSellerRequests={handleViewSellerRequests}
        />
      );
      break;
    case 'BuyerDetail':
      content = buyerDetail ? <BuyerDetailView buyer={buyerDetail} onBack={handleBackToDashboard} /> : <div>Buyer not found.</div>;
      break;
    case 'SellerRequests':
      content = <SellerRequestList requests={DUMMY_REQUESTS} onBack={handleBackToDashboard} onReview={handleReviewApplication} />;
      break;
    case 'SellerReview':
      content = applicationDetail ? <SellerReviewDetail application={applicationDetail} onBack={handleViewSellerRequests} /> : <div>Application not found.</div>;
      break;
    default:
      content = <div className="p-8 text-center text-xl text-gray-500">View Not Found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      {/* Global Header (Optional, but helps context) */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-gray-900">User Management Dashboard</h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto">
        {content}
      </main>
    </div>
  );
};

export default Users;