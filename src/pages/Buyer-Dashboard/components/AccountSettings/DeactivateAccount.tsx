import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useDeActivateAccountMutation } from '@/Redux/Features/user/user.api';
import { useGetMeQuery } from '@/Redux/Features/auth/auth.api';
import { useNavigate } from 'react-router-dom';

export default function DeactivateAccount() {
  const [reason, setReason] = useState('');
  const navigate = useNavigate();
  const { data } = useGetMeQuery(null);
  const [deActivateAccount] = useDeActivateAccountMutation();

  const userId = data?.data?._id;

  const handleDeactivate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("Loading...");

    const payload = {
      reason: reason,
      userId: userId
    }

    try {
      await deActivateAccount(payload);
      toast.success("Your Deactivate Successfully.", { id: toastId });
      navigate("/");
    } catch {
      toast.error("Account De-Activation faild", { id: toastId });
    }
  };

  return (
    <div className='mb-5'>
      <div className="w-full bg-white p-4 sm:p-6 lg:p-8 mt-6 rounded-lg">
        <div>
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
            <h2 className="text-xl sm:text-2xl font-normal text-gray-900">
              Deactivate Account
            </h2>
            <p className="text-sm text-gray-500">
              *Temporary or permanently deactivate your account
            </p>
          </div>

          {/* Warning Box */}
          <div className="bg-red-50 border border-red-100 rounded-lg p-4 sm:p-6 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex shrink-0 mt-0.5" />
              <div>
                <h3 className="text-red-600 font-medium text-base sm:text-lg mb-2">
                  Warning
                </h3>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  Deactivating your account will remove all your products from the marketplace and suspend your ability to sell. This action can be reversed by contacting support.
                </p>
              </div>
            </div>
          </div>

          {/* Reason Textarea */}
          <form onSubmit={handleDeactivate} className="mb-6">
            <label className="block text-sm sm:text-base text-gray-900 mb-2">
              Reason for deactivation (optional)
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={6}
              className="w-full px-4 py-3 bg-blue-50 text-gray-700 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <div className="flex justify-end mt-6">
              <button
                className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white text-base sm:text-lg font-medium rounded-lg transition-colors"
              >
                Deactivate Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}