import ProductForm, { ProductFormValues, ProductFormRef } from "./ProductForm";
import PrimaryButton from "@/common/PrimaryButton";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom"; // useParams is no longer needed
import ProductPreview from "./ProductPreview";
import MediaUpload from "./MediaUpload";
import { useAddProductMutation } from "@/Redux/Features/products/products.api"; // Removed update and fetch
import { useState, useRef } from "react"; // Removed useEffect
import { toast } from "sonner";
import { useGetAllCategoriesQuery } from "@/Redux/Features/categories/categories.api";
import { buildFormData } from "./buildFormData";
import { MediaData } from "@/types/SellerDashboardTypes/MediaUpload";

const AddProductPage = () => {
  const navigate = useNavigate();
  const { data: categories } = useGetAllCategoriesQuery({});
  const [addProduct] = useAddProductMutation();
  const [mediaData, setMediaData] = useState<MediaData | null>(null);
  const productFormRef = useRef<ProductFormRef>(null);

  // Trigger form submission
  const handleSaveChanges = async () => {
    if (productFormRef.current) {
      await productFormRef.current.submit();
    }
  };
  // Handle actual form submit (Simplified for creation)
  const handleFormSubmit = async (data: Partial<ProductFormValues>) => {
    // 1. Ensure main image is uploaded for the new product
    if (!mediaData || !mediaData.images.mainImage) {
      toast.error("Please select at least a main image.");
      return;
    }
    // 2. Handle category lookup
    const categoryNameOrId = data.productCategory;
    if (!categoryNameOrId) {
      toast.error("Please select a product category.");
      return;
    }
    const category = categories?.data?.find(
      (item: { _id: string; categoryName: string }) =>
        item._id === categoryNameOrId || item.categoryName === categoryNameOrId
    );
    if (!category || !category._id) {
      toast.error("Invalid category selected.");
      return;
    }
    const categoryId = category._id;
    const formData = buildFormData(
      data,
      mediaData,
      categoryId,
      false 
    );
    try {
      toast.loading("Adding product...", { id: "productAction" });
      const res = await addProduct(formData).unwrap();
      if (res.success) {
        toast.success("Product added successfully!", { id: "productAction" });
        navigate("/seller-dashboard/products");
      } else {
        toast.error(res.message || "Failed to add product.", {
          id: "productAction",
        });
      }
    } catch (error) {
      console.error("Failed to add product:", error);
      toast.error("An unexpected error occurred.", { id: "productAction" });
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div></div>
        <PrimaryButton
          type="Primary"
          title="Bulk Upload"
          rightIcon={<FaPlus />}
          className="px-12"
          onClick={() =>
            navigate("/seller-dashboard/products/add-bulk-product")
          }
        />
      </div>

      <div className="flex gap-10">
        {/* Left: Preview */}
        <div className="flex-1">
          <ProductPreview file={mediaData?.images.mainImage} />
        </div>

        {/* Right: Form + Media */}
        <div className="space-y-10 flex-2">
          <MediaUpload
            onMediaChange={setMediaData}
          />

          <ProductForm
            ref={productFormRef}
            onSubmit={handleFormSubmit}
            isEditMode={false}
          />

          <div className="flex gap-6 justify-end">
            <PrimaryButton
              type="Outline"
              title="Cancel"
              onClick={() => navigate("/seller-dashboard/products")}
            />
            <PrimaryButton
              type="Primary"
              title="Create Product" // Title is fixed
              onClick={handleSaveChanges}
              className="w-full sm:w-auto min-w-[120px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
