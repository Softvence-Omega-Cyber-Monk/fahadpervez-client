// src/components/AdminSettings/SecuritySettings.tsx

import React, { useState } from 'react';
import { toast } from 'sonner';
import { useChangePasswordMutation } from '@/Redux/Features/user/user.api';

interface SaveButtonProps {
  type: 'primary' | 'danger';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const SaveButton: React.FC<SaveButtonProps> = ({ type, children, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      mt-6 px-6 py-2.5 rounded-lg font-medium text-white text-sm transition-all
      ${type === 'primary' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-red-600 hover:bg-red-700'}
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    `}
  >
    {children}
  </button>
);

const SecuritySettings: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [changePassword] = useChangePasswordMutation();

  const handlePasswordSave = async () => {
    // Basic validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill in all fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('New password and confirm password do not match.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await changePassword({ currentPassword, newPassword, confirmPassword });

      if ('error' in res && res.error) {
        toast.error('Something went wrong while updating password.');
      } else {
        toast.success('Password changed successfully.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
      console.log(res);
    } catch (error) {
      toast.error('Something went wrong while updating password.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Security Settings</h2>
      <p className="text-gray-600">Update your password to keep your account secure.</p>

      <div className="space-y-4">
        {/* Current Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
          <input
            type="password"
            placeholder="Enter current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full p-3 bg-blue-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
          />
        </div>

        {/* New & Confirm Password */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 bg-blue-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 bg-blue-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <SaveButton type="primary" onClick={handlePasswordSave} disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </SaveButton>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
