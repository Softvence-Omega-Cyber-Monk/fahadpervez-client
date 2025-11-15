import React, { useState } from 'react';
import ProgressBar from '../Progressbar/ProgressBar';

interface FormData {
  signature: File | null;
  contract: File | null;
  acceptPrivacy: boolean;
}

interface ContractInfoProps {
  onPrevious: () => void;
  onNext: () => void;
}

const ContractInfo: React.FC<ContractInfoProps> = ({onPrevious, onNext}) => {
  const [formData, setFormData] = useState<FormData>({
    signature: null,
    contract: null,
    acceptPrivacy: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dragActiveSignature, setDragActiveSignature] = useState(false);
  const [dragActiveContract, setDragActiveContract] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'signature' | 'contract') => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      const validTypes = type === 'signature' 
        ? ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf']
        : ['application/pdf'];
      
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          [type]: type === 'signature' 
            ? 'Please upload an image (PNG, JPG) or PDF file'
            : 'Please upload a PDF file'
        }));
        return;
      }

      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setErrors(prev => ({
          ...prev,
          [type]: 'File size must be less than 10MB'
        }));
        return;
      }
    }

    setFormData(prev => ({
      ...prev,
      [type]: file
    }));

    if (errors[type]) {
      setErrors(prev => ({
        ...prev,
        [type]: ''
      }));
    }
  };

  const handleDrag = (e: React.DragEvent, type: 'signature' | 'contract', active: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (type === 'signature') {
      setDragActiveSignature(active);
    } else {
      setDragActiveContract(active);
    }
  };

  const handleDrop = (e: React.DragEvent, type: 'signature' | 'contract') => {
    e.preventDefault();
    e.stopPropagation();
    
    if (type === 'signature') {
      setDragActiveSignature(false);
    } else {
      setDragActiveContract(false);
    }

    const file = e.dataTransfer.files?.[0];
    if (file) {
      const validTypes = type === 'signature' 
        ? ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf']
        : ['application/pdf'];
      
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          [type]: type === 'signature' 
            ? 'Please upload an image (PNG, JPG) or PDF file'
            : 'Please upload a PDF file'
        }));
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          [type]: 'File size must be less than 10MB'
        }));
        return;
      }

      setFormData(prev => ({
        ...prev,
        [type]: file
      }));

      if (errors[type]) {
        setErrors(prev => ({
          ...prev,
          [type]: ''
        }));
      }
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

    if (!formData.signature) {
      newErrors.signature = 'Signature upload is required';
    }

    if (!formData.contract) {
      newErrors.contract = 'Contract upload is required';
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

  const downloadContract = () => {
    // Simulated download
    alert('Downloading contract...');
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-30">
      <div className="bg-white border border-gray-100 rounded-lg shadow-sm w-full max-w-6xl p-8">

        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">LET'S SETUP YOUR PROFILE</h1>
        <p className="text-gray-500 text-sm mb-8 text-center">
          Lorem ipsum dolor sit amet consectetur. Diam fermentum fusce in magna est fusce tellus vitae malesuada. A enim convallis eros gravida at id arcu venenatis.
        </p>

        <ProgressBar
          steps={[
            { number: 1, label: "Basic Info" },
            { number: 2, label: "Business Info" },
            { number: 3, label: "What Would You Like to Sell" },
            { number: 4, label: "Product Type" },
            { number: 5, label: "Shipping Info" },
            { number: 6, label: "Payment Info" },
          ]}
          currentStep={5} // dynamically pass step from parent
        />

        {/* Section Title */}
        <h2 className="text-lg font-bold text-gray-900 mb-6">CONTRACT</h2>

        {/* Buyer and owner business contract */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-900">Buyer and owner business contract.</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={downloadContract}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded transition-colors duration-200"
              >
                View Contract
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>
              <button
                type="button"
                onClick={downloadContract}
                className="p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors duration-200"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
            </div>
          </div>

          {/* Warning Message */}
          <div className="bg-red-50 border border-red-200 rounded-md p-3 flex items-start">
            <svg className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-red-700">
              Download the contract form. Read carefully and upload it with text, signature and stamp.
            </p>
          </div>
        </div>

        {/* Upload Signature */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-900 mb-3">
            Upload your Signature<span className="text-red-500">*</span>
          </label>
          <div
            onDragEnter={(e) => handleDrag(e, 'signature', true)}
            onDragLeave={(e) => handleDrag(e, 'signature', false)}
            onDragOver={(e) => handleDrag(e, 'signature', true)}
            onDrop={(e) => handleDrop(e, 'signature')}
            className={`relative border-2 border-dashed ${
              dragActiveSignature ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            } ${errors.signature ? 'border-red-500' : ''} rounded-lg p-8 text-center transition-colors duration-200`}
          >
            <input
              type="file"
              id="signature"
              accept="image/*,.pdf"
              onChange={(e) => handleFileChange(e, 'signature')}
              className="hidden"
            />
            <label htmlFor="signature" className="cursor-pointer">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
              {formData.signature ? (
                <p className="text-sm text-gray-700 mb-1">
                  <span className="font-medium">{formData.signature.name}</span>
                </p>
              ) : (
                <>
                  <p className="text-sm text-blue-600 mb-1">
                    <span className="font-medium underline">Upload an image or pdf</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, up to 10 MB recommended</p>
                </>
              )}
            </label>
          </div>
          {errors.signature && (
            <p className="text-red-500 text-xs mt-1">{errors.signature}</p>
          )}
        </div>

        {/* Upload Contract */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-900 mb-3">
            Upload the contract with seal, signature and stamp<span className="text-red-500">*</span>
          </label>
          <div
            onDragEnter={(e) => handleDrag(e, 'contract', true)}
            onDragLeave={(e) => handleDrag(e, 'contract', false)}
            onDragOver={(e) => handleDrag(e, 'contract', true)}
            onDrop={(e) => handleDrop(e, 'contract')}
            className={`relative border-2 border-dashed ${
              dragActiveContract ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            } ${errors.contract ? 'border-red-500' : ''} rounded-lg p-8 text-center transition-colors duration-200`}
          >
            <input
              type="file"
              id="contract"
              accept=".pdf"
              onChange={(e) => handleFileChange(e, 'contract')}
              className="hidden"
            />
            <label htmlFor="contract" className="cursor-pointer">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
              {formData.contract ? (
                <p className="text-sm text-gray-700 mb-1">
                  <span className="font-medium">{formData.contract.name}</span>
                </p>
              ) : (
                <>
                  <p className="text-sm text-blue-600 mb-1">
                    <span className="font-medium underline">Upload an pdf</span> or drag and drop pdf up to 10 recommended
                  </p>
                </>
              )}
            </label>
          </div>
          {errors.contract && (
            <p className="text-red-500 text-xs mt-1">{errors.contract}</p>
          )}
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

export default ContractInfo;