import React, { useState } from 'react';
import ProgressBar from '../Progressbar/ProgressBar';

interface FormData {
  yourName: string;
  businessName: string;
  businessCRNumber: string;
  businessType: string;
  businessDescription: string;
  country: string;
  document: File | null;
}

interface Country {
  code: string;
  name: string;
  flag: string;
}

const countries: Country[] = [
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴' },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰' },
  { code: 'FI', name: 'Finland', flag: '🇫🇮' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
  { code: 'AT', name: 'Austria', flag: '🇦🇹' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪' },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
  { code: 'CN', name: 'China', flag: '🇨🇳' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷' },
  { code: 'RU', name: 'Russia', flag: '🇷🇺' },
  { code: 'PL', name: 'Poland', flag: '🇵🇱' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
  { code: 'GR', name: 'Greece', flag: '🇬🇷' },
  { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿' },
  { code: 'HU', name: 'Hungary', flag: '🇭🇺' },
  { code: 'RO', name: 'Romania', flag: '🇷🇴' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳' },
  { code: 'BD', name: 'Bangladesh', flag: '🇧🇩' },
  { code: 'PK', name: 'Pakistan', flag: '🇵🇰' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪' },
];

interface BusinessInfoProps {
  onPrevious: () => void;
  onNext: () => void;
}

const BusinessInfo: React.FC<BusinessInfoProps> = ({ onPrevious, onNext }) => {
  const [formData, setFormData] = useState<FormData>({
    yourName: '',
    businessName: '',
    businessCRNumber: '',
    businessType: '',
    businessDescription: '',
    country: '',
    document: null
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      document: file
    }));
    if (errors.document) {
      setErrors(prev => ({
        ...prev,
        document: ''
      }));
    }
  };

  const handleCountrySelect = (countryCode: string) => {
    setFormData(prev => ({
      ...prev,
      country: countryCode
    }));
    setIsDropdownOpen(false);
    setSearchTerm('');
    if (errors.country) {
      setErrors(prev => ({
        ...prev,
        country: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.yourName.trim()) {
      newErrors.yourName = 'Your name is required';
    }

    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business name is required';
    }

    if (!formData.businessCRNumber.trim()) {
      newErrors.businessCRNumber = 'Business CR number is required';
    }

    if (!formData.businessType.trim()) {
      newErrors.businessType = 'Business type is required';
    }

    if (!formData.businessDescription.trim()) {
      newErrors.businessDescription = 'Business description is required';
    }

    if (!formData.country) {
      newErrors.country = 'Country is required';
    }

    if (!formData.document) {
      newErrors.document = 'Document upload is required';
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

  const selectedCountry = countries.find(c => c.code === formData.country);
  const filteredCountries = countries.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex items-center justify-center pt-30">
      <div className="bg-white border border-gray-100 rounded-lg shadow-sm w-full max-w-6xl p-8">

        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">LET'S SETUP YOUR PROFILE</h1>
        <p className="text-gray-500 text-sm mb-8 text-center">
          Lorem ipsum dolor sit amet consectetur. Diam fermentum fusce in magna est fusce tellus vitae malesuada. A enim convallis eros gravida at id arcu venenatis.
        </p>

        {/* Progress Bar inside form */}
        <ProgressBar
          steps={[
            { number: 1, label: "Basic Info" },
            { number: 2, label: "Business Info" },
            { number: 3, label: "Shipping Info" },
            { number: 4, label: "Payment Info" },
            { number: 5, label: "Contract Info" },
          ]}
          currentStep={2} // dynamically pass step from parent
        />

        {/* Section Title */}
        <h2 className="text-lg font-bold text-gray-900 mb-6">BUSINESS INFORMATION</h2>

        {/* Your Name */}
        <div className="mb-4">
          <label htmlFor="yourName" className="block text-sm font-medium text-gray-700 mb-2">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="yourName"
            name="yourName"
            value={formData.yourName}
            onChange={handleChange}
            placeholder="Enter your name"
            className={`w-full px-4 py-2.5 border ${
              errors.yourName ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:outline-none `}
          />
          {errors.yourName && <p className="text-red-500 text-xs mt-1">{errors.yourName}</p>}
        </div>

        {/* Business Name */}
        <div className="mb-4">
          <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
            Business Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="businessName"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            placeholder="Enter your business name"
            className={`w-full px-4 py-2.5 border ${
              errors.businessName ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:outline-none  `}
          />
          {errors.businessName && <p className="text-red-500 text-xs mt-1">{errors.businessName}</p>}
        </div>

        {/* Business CR Number and Upload Documents */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="businessCRNumber" className="block text-sm font-medium text-gray-700 mb-2">
              Business CR Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="businessCRNumber"
              name="businessCRNumber"
              value={formData.businessCRNumber}
              onChange={handleChange}
              placeholder="Enter your business name"
              className={`w-full px-4 py-2.5 border ${
                errors.businessCRNumber ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none  `}
            />
            {errors.businessCRNumber && <p className="text-red-500 text-xs mt-1">{errors.businessCRNumber}</p>}
          </div>

          <div>
            <label htmlFor="document" className="block text-sm font-medium text-gray-700 mb-2">
              Upload CR Documents <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="file"
                id="document"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="document"
                className={`w-full px-4 py-2.5 border ${
                  errors.document ? 'border-red-500' : 'border-gray-300'
                } rounded-md bg-white cursor-pointer flex items-center justify-between hover:bg-gray-50`}
              >
                <span className="text-gray-500 text-sm">
                  {formData.document ? formData.document.name : 'Upload Attachment'}
                </span>
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </label>
            </div>
            {errors.document && <p className="text-red-500 text-xs mt-1">{errors.document}</p>}
          </div>
        </div>

        {/* Business Type */}
        <div className="mb-4">
          <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-2">
            Business Type <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="businessType"
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
            placeholder="Enter your business type"
            className={`w-full px-4 py-2.5 border ${
              errors.businessType ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:outline-none  `}
          />
          {errors.businessType && <p className="text-red-500 text-xs mt-1">{errors.businessType}</p>}
        </div>

        {/* Business Description */}
        <div className="mb-4">
          <label htmlFor="businessDescription" className="block text-sm font-medium text-gray-700 mb-2">
            Business Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="businessDescription"
            name="businessDescription"
            value={formData.businessDescription}
            onChange={handleChange}
            placeholder="Business description"
            rows={4}
            className={`w-full px-4 py-2.5 border ${
              errors.businessDescription ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:outline-none   resize-none`}
          />
          {errors.businessDescription && <p className="text-red-500 text-xs mt-1">{errors.businessDescription}</p>}
        </div>

        {/* Country Dropdown */}
        <div className="mb-6">
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
            Country <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`w-full px-4 py-2.5 border ${
                errors.country ? 'border-red-500' : 'border-gray-300'
              } rounded-md bg-white text-left flex items-center justify-between focus:outline-none `}
            >
              <span className="flex items-center">
                {selectedCountry ? (
                  <>
                    <span className="text-xl mr-2">{selectedCountry.flag}</span>
                    <span className="text-gray-900">{selectedCountry.name}</span>
                  </>
                ) : (
                  <span className="text-gray-500">Select a country</span>
                )}
              </span>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-hidden">
                <div className="p-2 border-b border-gray-200">
                  <input
                    type="text"
                    placeholder="Search country..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none "
                  />
                </div>
                <div className="overflow-y-auto max-h-48">
                  {filteredCountries.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => handleCountrySelect(country.code)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center"
                    >
                      <span className="text-xl mr-3">{country.flag}</span>
                      <span className="text-gray-900">{country.name}</span>
                    </button>
                  ))}
                  {filteredCountries.length === 0 && (
                    <div className="px-4 py-2 text-gray-500 text-sm">No countries found</div>
                  )}
                </div>
              </div>
            )}
          </div>
          {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
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

export default BusinessInfo;