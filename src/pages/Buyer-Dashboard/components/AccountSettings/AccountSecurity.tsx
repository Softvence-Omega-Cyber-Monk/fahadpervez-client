import { useState } from 'react';

export default function AccountSecurity() {
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleChange = (field: string, value: string) => {
    setPasswords(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving changes...');
  };

  return (
    <div className="w-full bg-white p-3 sm:p-6 lg:p-8 rounded-lg">
      <div>
        {/* Heading */}
        <h2 className="text-xl sm:text-2xl font-normal text-gray-900 mb-8">
          Account Security
        </h2>

        {/* Current Password */}
        <div className="mb-6">
          <label className="block text-sm sm:text-base text-gray-900 mb-2">
            Current password
          </label>
          <input
            type="password"
            value={passwords.current}
            onChange={(e) => handleChange('current', e.target.value)}
            placeholder="*******************"
            className="w-full px-4 py-3 bg-blue-50 text-gray-700 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-600"
          />
        </div>

        {/* New Password and Confirm Password Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* New Password */}
          <div>
            <label className="block text-sm sm:text-base text-gray-900 mb-2">
              New password
            </label>
            <input
              type="password"
              value={passwords.new}
              onChange={(e) => handleChange('new', e.target.value)}
              placeholder="*************"
              className="w-full px-4 py-3 bg-blue-50 text-gray-700 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-600"
            />
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-sm sm:text-base text-gray-900 mb-2">
              Confirm new password
            </label>
            <input
              type="password"
              value={passwords.confirm}
              onChange={(e) => handleChange('confirm', e.target.value)}
              placeholder="*************"
              className="w-full px-4 py-3 bg-blue-50 text-gray-700 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-600"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-16 py-3 bg-blue-600 hover:bg-blue-700 text-white text-base sm:text-lg font-medium rounded-lg transition-colors"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}