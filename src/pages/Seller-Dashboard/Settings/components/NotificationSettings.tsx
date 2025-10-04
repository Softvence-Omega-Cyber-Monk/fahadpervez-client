import React from 'react';

interface SaveButtonProps {
  type: 'primary' | 'danger';
  children: React.ReactNode;
  onClick?: () => void;
}

interface SectionTitleProps {
  children: React.ReactNode;
}

const SaveButton = ({ type, children, onClick }: SaveButtonProps) => (
  <button
    onClick={onClick}
    className={`
      mt-6 px-6 py-2.5 rounded-lg font-medium text-white text-sm transition-all
      ${type === 'primary' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-red-600 hover:bg-red-700'}
    `}
  >
    {children}
  </button>
);

const SectionTitle = ({ children }: SectionTitleProps) => (
  <h3 className="text-base font-semibold text-gray-900 mb-4 mt-8 first:mt-0">{children}</h3>
);

const NotificationSettings = () => {
  return (
    <div className="space-y-6">
      <SectionTitle>Notification settings</SectionTitle>
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Order notification</h4>
          <div className="space-y-3">
            {[
              { label: 'New order', desc: 'Receive notifications when a customer places a new order.', checked: false },
              { label: 'Shipped order', desc: 'Receive notifications when an order is shipped.', checked: true },
              { label: 'Completed order', desc: 'Receive notifications when complete a order.', checked: false }
            ].map((item) => (
              <label key={item.label} className="flex items-start p-3 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors">
                <input
                  type="checkbox"
                  defaultChecked={item.checked}
                  className="appearance-none h-4 w-4 border-2 border-blue-500 rounded-full checked:bg-blue-500 checked:ring-4 checked:ring-blue-200 mr-3 cursor-pointer transition-all duration-200"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{item.label}</p>
                  <p className="text-xs text-gray-600 mt-0.5">{item.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Promotions notification</h4>
          <div className="space-y-3">
            {[
              { label: 'Sale alert', desc: 'Receive notifications about sales and promotions.', checked: true },
              { label: 'Coupon usages', desc: 'Receive notifications when a coupon code is used.', checked: true }
            ].map((item) => (
              <label key={item.label} className="flex items-start p-3 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors">
                <input
                  type="checkbox"
                  defaultChecked={item.checked}
                  className="appearance-none h-4 w-4 border-2 border-blue-500 rounded-full checked:bg-blue-500 checked:ring-4 checked:ring-blue-200 mr-3 cursor-pointer transition-all duration-200"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{item.label}</p>
                  <p className="text-xs text-gray-600 mt-0.5">{item.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Communications alerts</h4>
          <div className="space-y-3">
            {[
              { label: 'New messages', desc: 'Receive notifications when get a new messages.', checked: true },
              { label: 'Customers inquiries', desc: 'Receive notifications about customer inquiries about product.', checked: true }
            ].map((item) => (
              <label key={item.label} className="flex items-start p-3 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors">
                <input
                  type="checkbox"
                  defaultChecked={item.checked}
                  className="appearance-none h-4 w-4 border-2 border-blue-500 rounded-full checked:bg-blue-500 checked:ring-4 checked:ring-blue-200 mr-3 cursor-pointer transition-all duration-200"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{item.label}</p>
                  <p className="text-xs text-gray-600 mt-0.5">{item.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">New Reviews</h4>
          <div className="space-y-3">
            <label className="flex items-start p-3 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors">
              <input
                type="checkbox"
                defaultChecked={true}
                className="appearance-none h-4 w-4 border-2 border-blue-500 rounded-full checked:bg-blue-500 checked:ring-4 checked:ring-blue-200 mr-3 cursor-pointer transition-all duration-200"
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">New reviews</p>
                <p className="text-xs text-gray-600 mt-0.5">Receive notifications when a customer leaves a review on your product.</p>
              </div>
            </label>
          </div>
        </div>
      </div>
      <SaveButton type="primary">Save changes</SaveButton>
    </div>
  );
};

export default NotificationSettings;
