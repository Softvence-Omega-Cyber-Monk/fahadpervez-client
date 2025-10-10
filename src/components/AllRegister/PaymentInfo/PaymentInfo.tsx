import React, { useState } from 'react';

interface FormData {
  paymentMethod: 'bank' | 'paypal' | 'stripe';
  accountHolderName: string;
  accountNumber: string;
  roughingNumber: string;
  taxId: string;
  acceptPrivacy: boolean;
}

interface PaymentInfoProps {
  onPrevious: () => void;
  onNext: () => void;
}

const PaymentInfo: React.FC<PaymentInfoProps> = ({onPrevious, onNext}) => {
  const [formData, setFormData] = useState<FormData>({
    paymentMethod: 'stripe',
    accountHolderName: '',
    accountNumber: '',
    roughingNumber: '',
    taxId: '',
    acceptPrivacy: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handlePaymentMethodChange = (method: 'bank' | 'paypal' | 'stripe') => {
    setFormData(prev => ({
      ...prev,
      paymentMethod: method
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      acceptPrivacy: e.target.checked
    }));

    if (errors.acceptPrivacy) {
      setErrors(prev => ({
        ...prev,
        acceptPrivacy: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (formData.paymentMethod === 'bank') {
      if (!formData.accountHolderName.trim()) {
        newErrors.accountHolderName = 'Account holder name is required';
      }

      if (!formData.accountNumber.trim()) {
        newErrors.accountNumber = 'Account number is required';
      }

      if (!formData.roughingNumber.trim()) {
        newErrors.roughingNumber = 'Roughing number is required';
      }
    }

    if (!formData.acceptPrivacy) {
      newErrors.acceptPrivacy = 'You must accept the privacy policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Form submitted:', formData);
      onNext();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-30">
      <div className="bg-white border border-gray-100 rounded-lg shadow-sm w-full max-w-3xl p-8">

        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">LET'S SETUP YOUR PROFILE</h1>
        <p className="text-gray-500 text-sm mb-8 text-center">
          Lorem ipsum dolor sit amet consectetur. Diam fermentum fusce in magna est fusce tellus vitae malesuada. A enim convallis eros gravida at id arcu venenatis.
        </p>

        {/* Section Title */}
        <h2 className="text-lg font-bold text-gray-900 mb-6">PAYMENT SETUP</h2>

        {/* Payment Method */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-900 mb-4">
            Payment Method
          </label>
          
          {/* Bank Account Option */}
          <label className="flex items-center justify-between p-4 border border-gray-300 rounded-md mb-3 cursor-pointer hover:bg-gray-50">
            <div className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                checked={formData.paymentMethod === 'bank'}
                onChange={() => handlePaymentMethodChange('bank')}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-3 text-sm text-gray-900">Bank account</span>
            </div>
            <div className="bg-gray-700 text-white text-xs px-3 py-1 rounded">
              <svg className="w-8 h-6" fill="currentColor" viewBox="0 0 32 24">
                <rect width="32" height="24" rx="2" fill="#374151"/>
                <rect x="2" y="8" width="28" height="3" fill="#9CA3AF"/>
                <rect x="2" y="14" width="10" height="2" fill="#9CA3AF"/>
              </svg>
            </div>
          </label>

          {/* PayPal Option */}
          <label className="flex items-center justify-between p-4 border border-gray-300 rounded-md mb-3 cursor-pointer hover:bg-gray-50">
            <div className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                checked={formData.paymentMethod === 'paypal'}
                onChange={() => handlePaymentMethodChange('paypal')}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-3 text-sm text-gray-900">Paypal</span>
            </div>
            <svg className="h-6" viewBox="0 0 100 32" fill="none">
              <text x="0" y="24" fill="#003087" fontSize="20" fontWeight="bold" fontFamily="Arial">Pay</text>
              <text x="35" y="24" fill="#009cde" fontSize="20" fontWeight="bold" fontFamily="Arial">Pal</text>
            </svg>
          </label>

          {/* Stripe Option */}
          <label className="flex items-center justify-between p-4 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
            <div className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                checked={formData.paymentMethod === 'stripe'}
                onChange={() => handlePaymentMethodChange('stripe')}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-3 text-sm text-gray-900">Stripe</span>
            </div>
            <div className="bg-indigo-600 text-white text-sm font-bold px-3 py-1 rounded">
              stripe
            </div>
          </label>
        </div>

        {/* Bank Account Details - Only show if Bank is selected */}
        {formData.paymentMethod === 'bank' && (
          <div className="mb-8">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Bank account Details</h3>

            {/* Account Holder Name */}
            <div className="mb-4">
              <label htmlFor="accountHolderName" className="block text-sm font-medium text-gray-700 mb-2">
                Account Holder Name
              </label>
              <input
                type="text"
                id="accountHolderName"
                name="accountHolderName"
                value={formData.accountHolderName}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className={`w-full px-4 py-2.5 border ${
                  errors.accountHolderName ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
              {errors.accountHolderName && (
                <p className="text-red-500 text-xs mt-1">{errors.accountHolderName}</p>
              )}
            </div>

            {/* Account Number */}
            <div className="mb-4">
              <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Account Number
              </label>
              <input
                type="text"
                id="accountNumber"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleInputChange}
                placeholder="Enter your number"
                className={`w-full px-4 py-2.5 border ${
                  errors.accountNumber ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
              {errors.accountNumber && (
                <p className="text-red-500 text-xs mt-1">{errors.accountNumber}</p>
              )}
            </div>

            {/* Roughing Number */}
            <div className="mb-4">
              <label htmlFor="roughingNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Roughing Number
              </label>
              <input
                type="text"
                id="roughingNumber"
                name="roughingNumber"
                value={formData.roughingNumber}
                onChange={handleInputChange}
                placeholder="Enter your number"
                className={`w-full px-4 py-2.5 border ${
                  errors.roughingNumber ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
              {errors.roughingNumber && (
                <p className="text-red-500 text-xs mt-1">{errors.roughingNumber}</p>
              )}
            </div>
          </div>
        )}

        {/* TAX ID (Optional) */}
        <div className="mb-6">
          <label htmlFor="taxId" className="block text-sm font-medium text-gray-900 mb-2">
            TAX ID (Optional)
          </label>
          <input
            type="text"
            id="taxId"
            name="taxId"
            value={formData.taxId}
            onChange={handleInputChange}
            placeholder="TAX ID or business registration number"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Privacy Policy Checkbox */}
        <div className="mb-8">
          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              checked={formData.acceptPrivacy}
              onChange={handleCheckboxChange}
              className={`w-4 h-4 mt-0.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 ${
                errors.acceptPrivacy ? 'border-red-500' : ''
              }`}
            />
            <span className="ml-3 text-xs text-gray-600 leading-relaxed">
              I accept the privacy policy. We value your personal information and outline how we collect, use, and protect your data. By using our services, you agree to these terms.
            </span>
          </label>
          {errors.acceptPrivacy && (
            <p className="text-red-500 text-xs mt-1 ml-7">{errors.acceptPrivacy}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="button"
            className="flex-1 bg-white border border-gray-300 text-gray-700 font-medium py-3 rounded-md hover:bg-gray-50 transition-colors duration-200"
            onClick={onPrevious}
          >
            Previous
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-md transition-colors duration-200"
          >
            Save & Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentInfo;