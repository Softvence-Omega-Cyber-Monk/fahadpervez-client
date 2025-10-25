import { Spinner } from "@/components/ui/spinner";
import { useGetAllCategoriesQuery } from "@/Redux/Features/categories/categories.api";
import { CategoryType, CurrencyAndShippingInformation } from "@/types/SellerDashboardTypes/SettingsTypes";
import React, { useEffect, useState, useMemo, DragEvent, ChangeEvent } from "react";
import {toast} from "sonner";
import useUpdateProfile from "../../../../hooks/useUpdateProfile";

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

interface StorePreferenceProps {
  currencyAndShippingInformation: CurrencyAndShippingInformation;
}

const StorePreference: React.FC<StorePreferenceProps> = (props) => {
  const { data, isLoading } = useGetAllCategoriesQuery({});
  const categories = useMemo(() => data?.data || [], [data?.data]);
  const {
    currency,
    storeBanner,
    shippingLocation,
    country,
    holdingTime,
    storeDescription,
    productCategory,
  } = props.currencyAndShippingInformation;

  // State for controlled inputs
  const [currentCurrency, setCurrentCurrency] = useState(currency || "USD");
  const [currentShippingRegions, setCurrentShippingRegions] = useState(country || "United states");
  const [currentHoldingTime, setCurrentHoldingTime] = useState<number>(holdingTime || 3);
  const [currentStoreDescription, setCurrentStoreDescription] = useState(storeDescription || "");
  const [selectedShippingLocation, setSelectedShippingLocation] = useState<string[]>(shippingLocation || "Local within city/state");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(productCategory || []);
  const [selectAll, setSelectAll] = useState(false);
  const {handleUpdate} = useUpdateProfile()
  const [banner, setBanner] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [, setError] = useState<string>("");
  useEffect(() => {
    if (storeBanner) {
      setPreview(storeBanner);
    }
  }, [storeBanner]);

  const handleFileChange = (file: File) => {
    if (!file) return;

    if (!["image/png", "image/jpeg"].includes(file.type)) {
      setError("Only PNG or JPG files are allowed.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be under 10 MB.");
      return;
    }
    setError("");
    setBanner(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileChange(file);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileChange(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => e.preventDefault();
  
  // Handle Select All for categories
  
  useEffect(() => {
    if (selectAll) {
      setSelectedCategories(categories.map((c: CategoryType) => c._id));
    }
  }, [selectAll, categories]);
  
  const handleCheckboxChange = (id: string) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== id));
      setSelectAll(false);
    } else {
      const newSelected = [...selectedCategories, id];
      setSelectedCategories(newSelected);
      if (newSelected.length === categories.length) setSelectAll(true);
    }
  };
  // Save changes handler
  const handleSaveChanges = async () => {
    try {
      console.log(banner)
      const formData = new FormData();
      if (banner) {
        formData.append("storeBanner", banner);
      }
        formData.append("currency", currentCurrency);
        formData.append("shippingLocation", selectedShippingLocation.toString());
        formData.append("country", currentShippingRegions);
        formData.append("holdingTime", currentHoldingTime.toString());
        formData.append("storeDescription", currentStoreDescription);
        formData.append("productCategory", selectedCategories.toString());
      await handleUpdate(formData);
    } catch (error) {
      toast.error("Error updating profile: " + error);
    }
    // Call API to save the updated preferences here
  };

  return (
    <div className="space-y-6">
      {/* Store Banner */}
      <SectionTitle>Upload your store banner</SectionTitle>
     {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="text-center border-2 border-dashed border-gray-300 p-12 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
      >
        {preview ? (
          <div className="relative inline-block">
            <img
              src={preview}
              alt="Banner Preview"
              className="rounded-lg max-h-64 object-cover mx-auto"
            />
            <button
              onClick={() => {
                setBanner(null);
                setPreview(null);
              }}
              className="absolute top-2 right-2 bg-white text-gray-700 border border-gray-300 rounded-full px-2 py-1 text-xs hover:bg-gray-200"
            >
              Remove
            </button>
          </div>
        ) : (
          <>
            <div className="text-5xl text-gray-400 mb-3">☁️</div>
            <p className="text-sm text-gray-600">
              <label className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer">
                Upload an image
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  className="hidden"
                  onChange={handleInputChange}
                />
              </label>{" "}
              or drag and drop PNG, JPG, up to 10 MB (1600 × 1200 recommended)
            </p>
          </>
        )}
      </div>

      {/* Currency & Shipping */}
      <SectionTitle>Currency and shipping information</SectionTitle>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-700 mb-2">Currency</label>
          <select
            value={currentCurrency}
            onChange={(e) => setCurrentCurrency(e.target.value)}
            className="w-full p-3 bg-blue-50 border-0 rounded-lg text-gray-900"
          >
            <option>USD</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-2">Shipping Regions</label>
          <select
            value={currentShippingRegions}
            onChange={(e) => setCurrentShippingRegions(e.target.value)}
            className="w-full p-3 bg-blue-50 border-0 rounded-lg text-gray-900"
          >
            <option>United states</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-2">Shipping Location</label>
          <div className="bg-blue-50 p-4 rounded-lg space-y-2">
            {["Local within city/state", "National within country", "International"].map((loc) => (
              <label key={loc} className="flex items-center text-sm text-gray-800">
                <input
                  type="radio"
                  name="location"
                  value={loc}
                  checked={selectedShippingLocation[0] === loc}
                  onChange={() => setSelectedShippingLocation([loc])}
                  className="appearance-none h-4 w-4 border-2 border-blue-500 rounded-full checked:bg-blue-500 checked:ring-4 checked:ring-blue-200 mr-3 cursor-pointer transition-all duration-200"
                />
                {loc}
              </label>
            ))}
          </div>
        </div>

        <div>
          
          <label className="block text-sm text-gray-700 mb-2">Holding time (days)</label>
          <input
            type="number"
            defaultValue={currentHoldingTime}
            onChange={(e) => setCurrentHoldingTime(Number(e.target.value))}
            className="w-full p-3 bg-blue-50 border-0 rounded-lg text-gray-900"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-700 mb-2">Store description</label>
        <textarea
          rows={4}
          value={currentStoreDescription}
          onChange={(e) => setCurrentStoreDescription(e.target.value)}
          className="w-full p-3 bg-blue-50 border-0 rounded-lg text-gray-900 resize-y"
        />
      </div>

      {/* Product Categories */}
      <SectionTitle>Product Categories</SectionTitle>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-3">
            <label className="flex items-center text-sm text-gray-800 bg-blue-50 px-4 py-2 rounded-full cursor-pointer hover:bg-blue-100 transition-colors">
              <input
                type="checkbox"
                className="custom-checkbox mr-2"
                checked={selectAll}
                onChange={(e) => setSelectAll(e.target.checked)}
              />
              Select All
            </label>

            {categories.map((cat: CategoryType) => (
              <label
                key={cat._id}
                className="flex items-center text-sm text-gray-800 bg-blue-50 px-4 py-2 rounded-full cursor-pointer hover:bg-blue-100 transition-colors"
              >
                <input
                  type="checkbox"
                  className="custom-checkbox mr-2"
                  checked={selectedCategories.includes(cat._id!)}
                  onChange={() => handleCheckboxChange(cat._id!)}
                />
                {cat.categoryName}
              </label>
            ))}
          </div>

          {/* Display selected categories */}
          <div className="mt-4">
            <strong>Selected:</strong>{" "}
            {categories
              .filter((c: CategoryType) => selectedCategories.includes(c._id!))
              .map((c: CategoryType) => c.categoryName)
              .join(", ")}
          </div>
        </div>
      )}

      {/* Save Button */}
      <SaveButton type="primary" onClick={handleSaveChanges}>
        Save changes
      </SaveButton>
    </div>
  );
};

export default StorePreference;
