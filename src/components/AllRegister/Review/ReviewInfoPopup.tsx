import React from 'react'

interface BusinessInfo {
  businessName: string;
  businessType: string;
  country: string;
}

interface StoreBranding {
  shopName: string;
  shopDescription: string;
  shopLogo: string;
}

interface ShippingInfo {
  productCategory: string;
  shippingRegions: string;
  storeDescription: string;
}

interface PaymentSetup {
  paymentMethod: string;
  accountHolderName: string;
  accountNumber: string;
}

interface FormData {
  businessInfo: BusinessInfo;
  storeBranding: StoreBranding;
  shippingInfo: ShippingInfo;
  paymentSetup: PaymentSetup;
}

type EditSection = 'businessInfo' | 'storeBranding' | 'shippingInfo' | 'paymentSetup' | null;

interface ReviewInfoPopupProps {
  editingSection: EditSection;
  tempData: any;
  setTempData: React.Dispatch<React.SetStateAction<any>>;
  handleCancel: () => void;
  handleSave: () => void;
  formData: FormData;
}

const ReviewInfoPopup: React.FC<ReviewInfoPopupProps> = ({
  editingSection,
  tempData,
  setTempData,
  handleCancel,
  handleSave,
  formData
}) => {

  const handleInputChange = (field: string, value: string) => {
    setTempData((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempData((prev: any) => ({
          ...prev,
          shopLogo: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!editingSection) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 sticky top-0 bg-white">
          <h2 className="text-xl font-bold text-gray-900">
            Edit {editingSection === 'businessInfo' ? 'Business Information' :
              editingSection === 'storeBranding' ? 'Store Branding' :
              editingSection === 'shippingInfo' ? 'Shipping Information' :
              'Payment Setup'}
          </h2>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4">
          {editingSection === 'businessInfo' && (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Business Name"
                value={tempData.businessName || ''}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
                className="w-full border rounded-md px-3 py-2"
              />
              <input
                type="text"
                placeholder="Business Type"
                value={tempData.businessType || ''}
                onChange={(e) => handleInputChange('businessType', e.target.value)}
                className="w-full border rounded-md px-3 py-2"
              />
              <input
                type="text"
                placeholder="Country"
                value={tempData.country || ''}
                onChange={(e) => handleInputChange('country', e.target.value)}
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
          )}

          {editingSection === 'storeBranding' && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={tempData.shopLogo || formData.storeBranding.shopLogo}
                  alt="Logo"
                  className="w-16 h-16 rounded-lg border object-cover"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              <input
                type="text"
                placeholder="Shop Name"
                value={tempData.shopName || ''}
                onChange={(e) => handleInputChange('shopName', e.target.value)}
                className="w-full border rounded-md px-3 py-2"
              />
              <textarea
                placeholder="Shop Description"
                value={tempData.shopDescription || ''}
                onChange={(e) => handleInputChange('shopDescription', e.target.value)}
                className="w-full border rounded-md px-3 py-2 resize-none"
              />
            </div>
          )}

          {editingSection === 'shippingInfo' && (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Product Category"
                value={tempData.productCategory || ''}
                onChange={(e) => handleInputChange('productCategory', e.target.value)}
                className="w-full border rounded-md px-3 py-2"
              />
              <input
                type="text"
                placeholder="Shipping Regions"
                value={tempData.shippingRegions || ''}
                onChange={(e) => handleInputChange('shippingRegions', e.target.value)}
                className="w-full border rounded-md px-3 py-2"
              />
              <input
                type="text"
                placeholder="Store Description"
                value={tempData.storeDescription || ''}
                onChange={(e) => handleInputChange('storeDescription', e.target.value)}
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
          )}

          {editingSection === 'paymentSetup' && (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Payment Method"
                value={tempData.paymentMethod || ''}
                onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                className="w-full border rounded-md px-3 py-2"
              />
              <input
                type="text"
                placeholder="Account Holder Name"
                value={tempData.accountHolderName || ''}
                onChange={(e) => handleInputChange('accountHolderName', e.target.value)}
                className="w-full border rounded-md px-3 py-2"
              />
              <input
                type="text"
                placeholder="Account Number"
                value={tempData.accountNumber || ''}
                onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-4 border-t border-gray-200 sticky bottom-0 bg-white">
          <button
            onClick={handleCancel}
            className="flex-1 border border-gray-300 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 bg-blue-600 text-white py-2 rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewInfoPopup;
