// src/components/AdminSettings/NotificationSettings.tsx

import { Notifications } from '@/types/SellerDashboardTypes/SettingsTypes';
import React from 'react';

// Helper component for a group of notification settings
interface NotificationGroupProps {
  title: string;
  options: { label: string; description: string; name: string }[];
}

const NotificationGroup: React.FC<NotificationGroupProps> = ({ title, options }) => (
  <div>
    <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
    <div className="p-4 space-y-4 bg-gray-50 rounded-lg">
      {options.map((option, index) => (
        <label key={index} className="flex items-start space-x-3 cursor-pointer">
          <input
            type="radio"
            name={option.name}
            defaultChecked={index === 0} // Default first option checked as seen in screenshot
            className="mt-1 h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <div>
            <p className="text-sm font-medium text-gray-700">{option.label}</p>
            <p className="text-xs text-gray-500">{option.description}</p>
          </div>
        </label>
      ))}
    </div>
  </div>
);

export interface NotificationSettingsProps {
  notificationData : Notifications
}

const NotificationSettings: React.FC<NotificationSettingsProps> = (props) => {
  const { orderNotification, promotionNotification, communicationAlert, newReviewsNotification } = props.notificationData
  console.log( orderNotification, promotionNotification, communicationAlert, newReviewsNotification)
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-8">Notification settings</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order notification */}
        <NotificationGroup
          title="Order notification"
          options={[
            { label: 'New order', description: 'Receive notifications when a customer places a new order.', name: 'order_notification' },
            { label: 'Shipped order', description: 'Receive notifications when an order is shipped.', name: 'order_notification' },
            { label: 'Completed order', description: 'Receive notifications when complete a order.', name: 'order_notification' },
          ]}
        />

        {/* Promotions notification */}
        <NotificationGroup
          title="Promotions notification"
          options={[
            { label: 'Sale alert', description: 'Receive notifications about sales and promotions.', name: 'promotions_notification' },
            { label: 'Coupon usages', description: 'Receive notifications when a coupon code is used.', name: 'promotions_notification' },
          ]}
        />

        {/* Communications alerts */}
        <NotificationGroup
          title="Communications alerts"
          options={[
            { label: 'New messages', description: 'Receive notifications when get a new messages.', name: 'communications_alerts' },
            { label: 'Customers inquiries', description: 'Receive notifications about customer inquires about product.', name: 'communications_alerts' },
          ]}
        />

        {/* New Reviews */}
        <NotificationGroup
          title="New Reviews"
          options={[
            { label: 'New reviews', description: 'Receive notifications when a customer leaves a review on your product.', name: 'new_reviews' },
          ]}
        />
      </div>

      <div className="mt-10 text-right">
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200">
          Save changes
        </button>
      </div>
    </div>
  );
};

export default NotificationSettings;