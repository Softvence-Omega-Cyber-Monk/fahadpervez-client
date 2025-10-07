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
  <h3 className="text-base font-semibold text-gray-900 mb-4 mt-8 first:mt-0">
    {children}
  </h3>
);

const AccountInformation = () => {
  return (
    <div className="space-y-6">
      {/* Profile Picture Section */}
      <div className="pb-8 border-b border-gray-100">
        <SectionTitle>Profile picture</SectionTitle>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-600 font-semibold">JD</span>
            </div>
            <div>
              <p className="font-semibold text-gray-900">John Doe</p>
              <p className="text-sm text-gray-500">Buyer</p>
            </div>
          </div>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Change profile
          </button>
        </div>

        {/* Basic Information */}
        <SectionTitle>Basic information</SectionTitle>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Your name</label>
            <input
              type="text"
              placeholder="Gladys Richards"
              className="w-full p-3 bg-blue-50 border-0 rounded-lg text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              placeholder="(671) 555-0110"
              className="w-full p-3 bg-blue-50 border-0 rounded-lg text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">E-mail</label>
            <input
              type="email"
              placeholder="debra.holt@example.com"
              className="w-full p-3 bg-blue-50 border-0 rounded-lg text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Country</label>
            <select
              defaultValue="USA"
              className="w-full p-3 bg-blue-50 border-0 rounded-lg text-gray-900"
            >
              <option>USA</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className="block text-sm text-gray-700 mb-2">Language</label>
            <select
              defaultValue="English"
              className="w-full p-3 bg-blue-50 border-0 rounded-lg text-gray-900"
            >
              <option>English</option>
            </select>
          </div>
        </div>

        {/* Right aligned button */}
        <div className="flex justify-end">
          <SaveButton type="primary">Save changes</SaveButton>
        </div>
      </div>

      {/* Business Information Section */}
      <div>
        <SectionTitle>Business information</SectionTitle>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm text-gray-700 mb-2">Business name</label>
            <input
              type="text"
              placeholder="The Walt Disney Company"
              className="w-full p-3 bg-blue-50 border-0 rounded-lg text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Business type</label>
            <input
              type="text"
              placeholder="Entertainment"
              className="w-full p-3 bg-blue-50 border-0 rounded-lg text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              placeholder="(671) 555-0110"
              className="w-full p-3 bg-blue-50 border-0 rounded-lg text-gray-900"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm text-gray-700 mb-2">Business Description</label>
            <textarea
              rows={4}
              placeholder="Enter business description"
              className="w-full p-3 bg-blue-50 border-0 rounded-lg text-gray-900 resize-y"
            />
          </div>
        </div>

        {/* Right aligned button */}
        <div className="flex justify-end">
          <SaveButton type="primary">Save changes</SaveButton>
        </div>
      </div>
    </div>
  );
};

export default AccountInformation;
