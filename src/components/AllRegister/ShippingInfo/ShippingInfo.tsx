import React, { useState } from 'react';
import ProgressBar from '../Progressbar/ProgressBar';

interface FormData {
  productCategories: string[];
  shippingLocations: string[];
  storeDescription: string;
}

interface CheckboxOption {
  id: string;
  label: string;
}

interface ShippingInfoProps {
  onPrevious: () => void;
  onNext: () => void;
}

const productCategories: CheckboxOption[] = [
  { id: 'analgesics', label: 'Analgesics' },
  { id: 'antibiotics', label: 'Antibiotics' },
  { id: 'cardiovascular', label: 'Cardiovascular Medications' },
  { id: 'antidiabetic', label: 'Antidiabetic Medications' },
  { id: 'cns', label: 'Central Nervous System' },
  { id: 'all', label: 'All' }
];

const shippingLocations: CheckboxOption[] = [
  { id: 'local-city', label: 'Local within city only' },
  { id: 'national', label: 'National within country' },
  { id: 'international', label: 'International' }
];

const ShippingInfo: React.FC<ShippingInfoProps> = ({onPrevious, onNext}) => {
  const [formData, setFormData] = useState<FormData>({
    productCategories: [],
    shippingLocations: [],
    storeDescription: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCategoryChange = (categoryId: string) => {
    setFormData(prev => {
      let newCategories: string[];
      
      if (categoryId === 'all') {
        // If "All" is selected, toggle all categories
        if (prev.productCategories.includes('all')) {
          newCategories = [];
        } else {
          newCategories = productCategories.map(c => c.id);
        }
      } else {
        // Toggle individual category
        if (prev.productCategories.includes(categoryId)) {
          newCategories = prev.productCategories.filter(id => id !== categoryId && id !== 'all');
        } else {
          newCategories = [...prev.productCategories.filter(id => id !== 'all'), categoryId];
          
          // Check if all individual categories are selected
          const allIndividualSelected = productCategories
            .filter(c => c.id !== 'all')
            .every(c => newCategories.includes(c.id) || c.id === categoryId);
          
          if (allIndividualSelected) {
            newCategories = productCategories.map(c => c.id);
          }
        }
      }
      
      return { ...prev, productCategories: newCategories };
    });

    if (errors.productCategories) {
      setErrors(prev => ({ ...prev, productCategories: '' }));
    }
  };

  const handleShippingChange = (locationId: string) => {
    setFormData(prev => ({
      ...prev,
      shippingLocations: prev.shippingLocations.includes(locationId)
        ? prev.shippingLocations.filter(id => id !== locationId)
        : [...prev.shippingLocations, locationId]
    }));

    if (errors.shippingLocations) {
      setErrors(prev => ({ ...prev, shippingLocations: '' }));
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      storeDescription: e.target.value
    }));

    if (errors.storeDescription) {
      setErrors(prev => ({ ...prev, storeDescription: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (formData.productCategories.length === 0) {
      newErrors.productCategories = 'Please select at least one product category';
    }

    if (formData.shippingLocations.length === 0) {
      newErrors.shippingLocations = 'Please select at least one shipping location';
    }

    if (!formData.storeDescription.trim()) {
      newErrors.storeDescription = 'Store description is required';
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
          currentStep={3} // dynamically pass step from parent
        />

        {/* Section Title */}
        <h2 className="text-lg font-bold text-gray-900 mb-6">PRODUCT & SHIPPING</h2>

        {/* Product Category */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Product Category <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {productCategories.map((category) => (
              <label
                key={category.id}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={formData.productCategories.includes(category.id)}
                  onChange={() => handleCategoryChange(category.id)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{category.label}</span>
              </label>
            ))}
          </div>
          {errors.productCategories && (
            <p className="text-red-500 text-xs mt-2">{errors.productCategories}</p>
          )}
        </div>

        {/* Shipping Locations */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Shipping Locations <span className="text-red-500">*</span>
          </label>
          <div className="space-y-3">
            {shippingLocations.map((location) => (
              <label
                key={location.id}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={formData.shippingLocations.includes(location.id)}
                  onChange={() => handleShippingChange(location.id)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{location.label}</span>
              </label>
            ))}
          </div>
          {errors.shippingLocations && (
            <p className="text-red-500 text-xs mt-2">{errors.shippingLocations}</p>
          )}
        </div>

        {/* Store Description */}
        <div className="mb-8">
          <label htmlFor="storeDescription" className="block text-sm font-medium text-gray-700 mb-2">
            Store description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="storeDescription"
            value={formData.storeDescription}
            onChange={handleDescriptionChange}
            placeholder="Tell us about your store"
            rows={5}
            className={`w-full px-4 py-2.5 border ${
              errors.storeDescription ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none`}
          />
          {errors.storeDescription && (
            <p className="text-red-500 text-xs mt-1">{errors.storeDescription}</p>
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

export default ShippingInfo;