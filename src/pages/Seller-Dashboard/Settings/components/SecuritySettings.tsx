import {
  useChangePasswordMutation,
  useDeActivateAccountMutation,
} from "@/Redux/Features/user/user.api";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import { toast } from "sonner";

interface SaveButtonProps {
  type: "primary" | "danger";
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

const SectionTitle = ({ children }: SectionTitleProps) => (
  <h3 className="text-base font-semibold text-gray-900 mb-4 mt-8 first:mt-0">
    {children}
  </h3>
);

interface SecuritySettingsProps {
  userId: string;

}

const SecuritySettings: React.FC<SecuritySettingsProps> = (props) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
   const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
  const [deactivateMessage, setDeactivateMessage] = useState("");
  const [changePassword] = useChangePasswordMutation();
  const [deActivateAccount] = useDeActivateAccountMutation();
  const { userId } = props;
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
      } else {
        toast.success("Password changed successfully.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
      console.log(res);
    } catch (error) {
      toast.error("Something went wrong while updating password." + error);
      console.error(error);
    }
  };
  const handleDeactivate = async () => {
    try {
      const res = await deActivateAccount({
        userId,
        reason: deactivateMessage,
      });
      if (res.error) {
        toast.error("Something went wrong while deactivating account.");
        return;
      } else {
        toast.success("Account deactivated successfully.");
        setDeactivateMessage("");
      }

    } catch (error) {
      toast.error("Something went wrong while deactivating account.");
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
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

      <hr className="my-8 border-gray-200" />

      <div>
        <SectionTitle>Deactivate Account</SectionTitle>
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
          <div className="flex items-start">
            <RiErrorWarningLine className="text-red-600 text-2xl mr-3 mt-1" />
            <div>
              <p className="text-sm font-semibold text-red-800 mb-1">Warning</p>
              <p className="text-xs text-red-700">
                Deactivating your account will remove all your products from the
                marketplace and suspend your ability to sell. This action can be
                reversed by contacting support.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm text-gray-700 mb-2">
            Reason for deactivation (optional)
          </label>
          <textarea
            rows={3}
            onBlur={(e)=>setDeactivateMessage(e.target.value)}
            placeholder="Enter reason for deactivation..."
            className="w-full p-3 bg-blue-50 border-0 rounded-lg text-gray-900 resize-y "
          />
        </div>
        <SaveButton type="danger" onClick={handleDeactivate}>Deactivate Account</SaveButton>
      </div>
    </div>
  );
};

export default SecuritySettings;
