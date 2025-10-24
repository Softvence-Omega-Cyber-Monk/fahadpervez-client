import { Spinner } from "@/components/ui/spinner";
import { useGetAllCategoriesQuery } from "@/Redux/Features/categories/categories.api";
import { CategoryType, CurrencyAndShippingInformation } from "@/types/SellerDashboardTypes/SettingsTypes";
import React, { useEffect, useState, useMemo } from "react";
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
    const storePreferenceUpdate: CurrencyAndShippingInformation = {
      currency: currentCurrency,
      shippingLocation: selectedShippingLocation,
      country: currentShippingRegions,
      holdingTime: currentHoldingTime,
      storeDescription: currentStoreDescription,
      productCategory: selectedCategories,
    };
    try {
      await handleUpdate(storePreferenceUpdate);
    } catch (error) {
      toast.error("Error updating profile: " + error);
    }

    // Call API to save the updated preferences here
  };

  return (
    <div className="space-y-6">
      {/* Store Banner */}
      <SectionTitle>Upload your store banner</SectionTitle>
      <div className="text-center border-2 border-dashed border-gray-300 p-12 rounded-lg bg-gray-50">
        <div className="text-5xl text-gray-400 mb-3">☁️</div>
        <p className="text-sm text-gray-600">
          <button className="text-blue-600 hover:text-blue-700 font-medium">Upload an image</button>{" "}
          or drag and drop PNG, JPG, up to 10 mb (1600 x 1200) recommended
        </p>
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
