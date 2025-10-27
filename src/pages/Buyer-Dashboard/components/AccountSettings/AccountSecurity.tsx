import { useChangePasswordMutation } from '@/Redux/Features/user/user.api';
import { useState } from 'react';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react'; // 👈 Add Lucide icons

interface SaveButtonProps {
  type: "primary" | "danger";
  children: React.ReactNode;
  onClick?: () => void;
}

const SaveButton = ({ type, children, onClick }: SaveButtonProps) => (
  <button
    onClick={onClick}
    className={`
      mt-6 px-6 py-2.5 rounded-lg font-medium text-white text-sm transition-all
      ${
        type === "primary"
          ? "bg-blue-600 hover:bg-blue-700"
          : "bg-red-600 hover:bg-red-700"
      }
    `}
  >
    {children}
  </button>
);

export default function AccountSecurity() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [changePassword] = useChangePasswordMutation();

  const handlePasswordSave = async () => {
    try {
      if (newPassword !== confirmPassword) {
        toast.error("Password do not match.");
        return;
      }

      if (newPassword === currentPassword) {
        toast.error("Password cannot be the same as the current password.");
        return;
      }


      const res = await changePassword({
        currentPassword,
        newPassword,
        confirmPassword,
      });

      if (res.error) {
        toast.error("Something went wrong while updating password." + res.error);
        return;
      }

      toast.success("Password changed successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error("Something went wrong while updating password." + error);
      console.error(error);
    }
  };

  return (
    <div className="">
      {/* Heading */}
      <h2 className="text-xl sm:text-2xl font-normal text-gray-900 mb-8">
        Account Security
      </h2>

      {/* Current Password */}
      <div className="relative mb-4">
        <label className="block text-sm text-gray-700 mb-2">
          Current password
        </label>
        <input
          type={showCurrent ? "text" : "password"}
          placeholder="Enter current password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full p-3 bg-blue-50 border border-gray-300 rounded-lg text-gray-900 pr-12"
        />
        <button
          type="button"
          className="absolute right-5 top-11 text-gray-600 hover:text-blue-600 transition-colors"
          onClick={() => setShowCurrent(!showCurrent)}
        >
          {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* New and Confirm Password */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* New Password */}
        <div className="relative">
          <label className="block text-sm text-gray-700 mb-2">
            New password
          </label>
          <input
            type={showNew ? "text" : "password"}
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-3 bg-blue-50 border border-gray-300 rounded-lg text-gray-900 pr-12"
          />
          <button
            type="button"
            className="absolute right-5 top-11 text-gray-600 hover:text-blue-600 transition-colors"
            onClick={() => setShowNew(!showNew)}
          >
            {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <label className="block text-sm text-gray-700 mb-2">
            Confirm new password
          </label>
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 bg-blue-50 border border-gray-300 rounded-lg text-gray-900 pr-12"
          />
          <button
            type="button"
            className="absolute right-5 top-11 text-gray-600 hover:text-blue-600 transition-colors"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <SaveButton type="primary" onClick={handlePasswordSave}>
        Save changes
      </SaveButton>
    </div>
  );
}
