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

const PaymentSettings = (props) => {
  console.log(props)
  return (
    <div className="space-y-6">
      <SectionTitle>Payment method</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border border-gray-200 bg-white p-4 rounded-lg relative">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-7 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">VISA</div>
              <div>
                <p className="font-semibold text-gray-900">Visa card in 2241</p>
                <p className="text-xs text-gray-500">Expires 07/2027</p>
              </div>
            </div>
            <span className="text-green-600 text-xs font-medium bg-green-50 px-2 py-1 rounded">Default</span>
          </div>
          <div className="flex items-center space-x-2 mt-3">
            <button className="text-gray-400 hover:text-blue-600 text-sm">Edit</button>
            <button className="text-gray-400 hover:text-red-600 text-sm">Remove</button>
          </div>
        </div>

        <div className="border border-gray-200 bg-white p-4 rounded-lg relative">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-7 bg-red-500 rounded flex items-center justify-center text-white text-xs font-bold">MC</div>
              <div>
                <p className="font-semibold text-gray-900">Mastercard in 1234</p>
                <p className="text-xs text-gray-500">Expires 05/2026</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 mt-3">
            <button className="text-gray-400 hover:text-blue-600 text-sm">Edit</button>
            <button className="text-gray-400 hover:text-red-600 text-sm">Remove</button>
          </div>
        </div>

        <div className="border border-gray-200 bg-white p-4 rounded-lg relative">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-7 bg-blue-700 rounded flex items-center justify-center text-white text-xs font-bold">PP</div>
              <div>
                <p className="font-semibold text-gray-900">PayPal</p>
                <p className="text-xs text-gray-500">Connected</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 mt-3">
            <button className="text-gray-400 hover:text-blue-600 text-sm">Edit</button>
            <button className="text-gray-400 hover:text-red-600 text-sm">Remove</button>
          </div>
        </div>

        <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors min-h-[120px]">
          <span className="text-2xl text-gray-400 mb-2">+</span>
          <p className="text-sm text-gray-600">Add new payment method<br />(Credit card, Bank account or Paypal)</p>
        </div>
      </div>

      <SectionTitle>Tax ID</SectionTitle>
      <div>
        <label className="block text-sm text-gray-700 mb-2">Tax id/Business registration number</label>
        <input
          type="text"
          placeholder="Enter tax ID"
          className="w-full p-3 bg-blue-50 border-0 rounded-lg text-gray-900"
        />
      </div>
      <SaveButton type="primary">Save changes</SaveButton>
    </div>
  );
};

export default PaymentSettings;
