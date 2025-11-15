/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import ProgressBar from "../Progressbar/ProgressBar";

interface ProductTypeProps {
  onPrevious: () => void;
  onNext: () => void;
}

const LikeToSell: React.FC<ProductTypeProps> = ({ onPrevious, onNext }) => {
  const [productType, setProductType] = useState("");
  const [isHighRisk, setIsHighRisk] = useState("");
  const [formData, setFormData] = useState<any>({
    medicalDeviceReg: null,
    arLicense: null,
    iso13485: null,
    freeSaleCert: null,
    importLicense: null,
    isoCert: null,
    importExportCert: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFileChange = (field: string, file: File | null) => {
    setFormData((prev: any) => ({ ...prev, [field]: file }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!productType) newErrors.productType = "Please select a product category.";

    if (productType === "Consumables") {
      if (!isHighRisk) newErrors.isHighRisk = "Please confirm if the product is high-risk.";
      if (isHighRisk === "yes") {
        if (!formData.arLicense) newErrors.arLicense = "AR License/Registration is required.";
      }
    }

    if (productType === "Medical Devices" || productType === "Both") {
      if (!formData.medicalDeviceReg) newErrors.medicalDeviceReg = "Medical Device Registration is required.";
      if (!formData.arLicense) newErrors.arLicense = "AR License/Registration is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Step 3 Data:", { productType, isHighRisk, formData });
      onNext();
    }
  };

  const renderFileUpload = (label: string, field: string, required?: boolean) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        <input
          type="file"
          id={field}
          onChange={(e) => handleFileChange(field, e.target.files?.[0] || null)}
          className="hidden"
        />
        <label
          htmlFor={field}
          className={`w-full px-4 py-2.5 border ${
            errors[field] ? "border-red-500" : "border-gray-300"
          } rounded-md bg-white cursor-pointer flex items-center justify-between hover:bg-gray-50`}
        >
          <span className="text-gray-500 text-sm">
            {formData[field] ? formData[field].name : "Upload Attachment"}
          </span>
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
        </label>
      </div>

      {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center pt-30">
      <div className="bg-white border border-gray-100 rounded-lg shadow-sm w-full max-w-6xl p-8">
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          LET'S SETUP YOUR PROFILE
        </h1>
        <p className="text-gray-500 text-sm mb-8 text-center">
          Please provide additional details regarding the type of products you want to sell.
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
          currentStep={3}
        />

        <h2 className="text-lg font-bold text-gray-900 mb-6">PRODUCT CATEGORY INFORMATION</h2>

        {/* Question: What would you like to sell? */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What Would You Like to Sell? <span className="text-red-500">*</span>
          </label>

          <div className="space-y-2">
            {["Consumables", "Medical Devices", "Both"].map((option) => (
              <label key={option} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="productType"
                  value={option}
                  checked={productType === option}
                  onChange={(e) => setProductType(e.target.value)}
                />
                <span className="text-gray-900">{option}</span>
              </label>
            ))}
          </div>

          {errors.productType && (
            <p className="text-red-500 text-xs mt-1">{errors.productType}</p>
          )}
        </div>

        {/* If consumables, ask high-risk */}
        {productType === "Consumables" && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Is this product considered high-risk? <span className="text-red-500">*</span>
            </label>

            <div className="space-y-2">
              {["yes", "no"].map((opt) => (
                <label key={opt} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="isHighRisk"
                    value={opt}
                    checked={isHighRisk === opt}
                    onChange={(e) => setIsHighRisk(e.target.value)}
                  />
                  <span className="text-gray-900">{opt === "yes" ? "Yes" : "No"}</span>
                </label>
              ))}
            </div>

            {errors.isHighRisk && (
              <p className="text-red-500 text-xs mt-1">{errors.isHighRisk}</p>
            )}
          </div>
        )}

        {/* HIGH-RISK CONSUMABLES REQUIRE AR LICENSE */}
        {productType === "Consumables" && isHighRisk === "yes" && (
          <>
            {renderFileUpload("AR License / Registration Number", "arLicense", true)}
            {renderFileUpload("ISO Certifications (if applicable)", "isoCert")}
            {renderFileUpload("Import/Export Certificates (if applicable)", "importExportCert")}
          </>
        )}

        {/* NON HIGH-RISK CONSUMABLES → OPTIONAL ONLY */}
        {productType === "Consumables" && isHighRisk === "no" && (
          <>
            {renderFileUpload("Import/Export Certificates (optional)", "importExportCert")}
            {renderFileUpload("ISO Certifications (optional)", "isoCert")}
          </>
        )}

        {/* MEDICAL DEVICES */}
        {(productType === "Medical Devices" || productType === "Both") && (
          <>
            {renderFileUpload("Medical Device Registration Number", "medicalDeviceReg", true)}
            {renderFileUpload("Authorized Representative (AR) License/Registration", "arLicense", true)}
            {renderFileUpload("ISO 13485 Certification (if applicable)", "iso13485")}
            {renderFileUpload("Free Sale Certificate (if applicable)", "freeSaleCert")}
            {renderFileUpload("Import License (if required)", "importLicense")}
          </>
        )}

        {/* BOTH → Also show consumable optional docs */}
        {productType === "Both" && (
          <>
            {renderFileUpload("Import/Export Certificates (Consumables)", "importExportCert")}
            {renderFileUpload("ISO Certifications (Consumables)", "isoCert")}
          </>
        )}

        {/* Buttons */}
        <div className="flex gap-4 mt-8">
          <button
            type="button"
            className="flex-1 bg-white border border-gray-300 text-gray-700 font-medium py-3 rounded-md hover:bg-gray-50"
            onClick={onPrevious}
          >
            Previous
          </button>

          <button
            type="button"
            className="flex-1 bg-blue-600 text-white font-medium py-3 rounded-md hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Save & Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default LikeToSell;
