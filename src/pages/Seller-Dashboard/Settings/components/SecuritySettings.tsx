import React from 'react';
import { RiErrorWarningLine } from 'react-icons/ri';

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

const SecuritySettings = () => {
  return (
    <div className="space-y-6">
      <SectionTitle>Account Security</SectionTitle>
      <div>
        <label className="block text-sm text-gray-700 mb-2">Current password</label>
        <input
          type="password"
          placeholder="Enter current password"
          className="w-full p-3 bg-blue-50 border-0 rounded-lg text-gray-900"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-700 mb-2">New password</label>
          <input
            type="password"
            placeholder="Enter new password"
            className="w-full p-3 bg-blue-50 border-0 rounded-lg text-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-2">Confirm new password</label>
          <input
            type="password"
            placeholder="Confirm new password"
            className="w-full p-3 bg-blue-50 border-0 rounded-lg text-gray-900"
          />
        </div>
      </div>
      <SaveButton type="primary">Save changes</SaveButton>

      <hr className="my-8 border-gray-200" />

      <div>
        <SectionTitle>Deactivate Account</SectionTitle>
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
          <div className="flex items-start">
            <RiErrorWarningLine className="text-red-600 text-2xl mr-3 mt-1"
            />
            <div>
              <p className="text-sm font-semibold text-red-800 mb-1">Warning</p>
              <p className="text-xs text-red-700">
                Deactivating your account will remove all your products from the marketplace and suspend your ability to sell.
                This action can be reversed by contacting support.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm text-gray-700 mb-2">Reason for deactivation (optional)</label>
          <textarea
            rows={3}
            placeholder="Enter reason for deactivation..."
            className="w-full p-3 bg-blue-50 border-0 rounded-lg text-gray-900 resize-y"
          />
        </div>
        <SaveButton type="danger">Deactivate Account</SaveButton>
      </div>
    </div>
  );
};

export default SecuritySettings;
