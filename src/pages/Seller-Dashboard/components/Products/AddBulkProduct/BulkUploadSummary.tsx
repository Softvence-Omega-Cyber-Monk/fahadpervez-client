/* eslint-disable @typescript-eslint/no-explicit-any */
import PrimaryButton from "@/common/PrimaryButton";
import { useAddBulkProductMutation } from "@/Redux/Features/products/products.api";
import { Product } from "@/types/Product";
import { Plus, Store } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function BulkUploadSummary({ data }: { data: Product[] }) {
  const navigate = useNavigate();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [error, setError] = useState("")
  const [addBulkProduct] = useAddBulkProductMutation();
  const newProducts = [
    { name: "Analgesics", count: 85 },
    { name: "Antibiotics", count: 85 },
    { name: "Cardiovascular Medications", count: 85 },
  ];

  const inventoryImpact = [
    { label: "Total Units", value: "2,847 units" },
    { label: "Low Stock Alert", value: "12 products" },
    { label: "Out of Stock", value: "3 products" },
  ];

  const handleBulkSubmit = async () => {
    try {
      if (isConfirmed) {
        const res = await addBulkProduct(data).unwrap();
        if (res.success) {
          toast.success("Products added successfully");
          navigate("/seller-dashboard/products");
        }
      }else{
        setError("Please confirm before submitting");
      }
    } catch (error: { data?: { message?: string } } | any) {
      toast.error(error.data.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* New Products Card */}
        <div className="bg-primary-blue/10 rounded-2xl p-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-primary-blue rounded-full flex items-center justify-center">
              <Plus className="w-5 h-5 text-light-background" />
            </div>
            <h3 className="">New Products</h3>
          </div>

          <div className="space-y-3">
            {newProducts.map((product, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2"
              >
                <span className="p2 text-base">{product.name}</span>
                <span className="p1">{product.count} Products</span>
              </div>
            ))}
          </div>
        </div>

        {/* Inventory Impact Card */}
        <div className="bg-primary-green/10 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-primary-green rounded-full flex items-center justify-center">
              <Store className="w-5 h-5 text-light-background" />
            </div>
            <h3 className="">Inventory Impact</h3>
          </div>

          <div className="space-y-3">
            {inventoryImpact.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2"
              >
                <span className="p2 text-base">{item.label}</span>
                <span className="p1">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Confirmation Section */}
      <div className="bg-light-background rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="grid items-start ">
          <label className="flex items-start gap-3 cursor-pointer flex-1">
            <input
              type="checkbox"
              checked={isConfirmed}
              onChange={(e) =>{ setIsConfirmed(e.target.checked); setError("")}}
              className="mt-0.5 w-4 h-4 rounded border-border text-primary-blue focus:ring-primary-blue"
            />
            <span className="p2">
              I confirm that all product information is accurate and complies
              with platform guidelines
            </span>
          </label>
            {error && <span className="text-red-500">{error}</span>}
            </div>


          <div className="flex items-center gap-3">
            <PrimaryButton
              type="Outline"
              title="Cancel Upload"
              className="border-border text-light-gray"
            />

            <PrimaryButton
              type="Primary"
              title="Confirm Upload"
              className="px-5"
              onClick={handleBulkSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
