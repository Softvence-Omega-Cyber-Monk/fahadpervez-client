import { Product } from "@/types/Product";
import { MediaData } from "@/types/SellerDashboardTypes/MediaUpload";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm, { ProductFormRef, ProductFormValues } from "./ProductForm";
import { useGetProductByIdQuery, useUpdateProductMutation } from "@/Redux/Features/products/products.api";
import { useGetAllCategoriesQuery } from "@/Redux/Features/categories/categories.api";
import { toast } from "sonner";
import { buildFormData } from "./buildFormData";
import PrimaryButton from "@/common/PrimaryButton";
import { FaPlus } from "react-icons/fa";
import ProductPreview from "./ProductPreview";
import MediaUpload from "./MediaUpload";


const UpdateProduct = () => {
  // We assume 'id' is guaranteed to be a string based on the routing structure
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();
  const productId = id as string;

  // State to hold fetched and media data
  const [defaultProduct, setDefaultProduct] = useState<Product | null>(null);
  const [defaultMedia, setDefaultMedia] = useState<MediaData | null>(null);
  const [mediaData, setMediaData] = useState<MediaData | null>(null);
  const [previewDetails,setPreviewDetails] = useState< Partial<Product> | null>(null);
  const productFormRef = useRef<ProductFormRef>(null);

  // Fetch product data
  const { data: productResponse, refetch, isFetching } = useGetProductByIdQuery(
    { id: productId },
    { refetchOnMountOrArgChange: true }
  );
  const defaultProductData = productResponse?.data;
  
  // Fetch categories (still needed for form context and validation)
  const { data: categories } = useGetAllCategoriesQuery({});

  // Populate default product and media state when data is fetched
  useEffect(() => {
    if (defaultProductData) {
      setDefaultProduct(defaultProductData);
      setDefaultMedia({
        images: {
          mainImageUrl: defaultProductData.mainImageUrl,
          sideImageUrl: defaultProductData.sideImageUrl,
          sideImage2Url: defaultProductData.sideImage2Url,
          lastImageUrl: defaultProductData.lastImageUrl,
        },
        videoUrl: defaultProductData.videoUrl,
      });

      setPreviewDetails({
        productName: defaultProductData.productName,
        productSKU: defaultProductData.productSKU,
        pricePerUnit: defaultProductData.pricePerUnit,
        availableSize: defaultProductData.availableSize,
      });
    }
  }, [defaultProductData]);

  const [updateProduct] = useUpdateProductMutation();
  // useAddProductMutation is removed

  // Form submission trigger
  const handleSaveChanges = async () => {
    if (productFormRef.current) {
      await productFormRef.current.submit();
    }
  };

  // Handle actual form submit (Simplified for update ONLY)
  const handleFormSubmit = async (data: Partial<ProductFormValues>) => {
    console.log("Form Submit Data from update product:", data);

    if (!defaultProduct) {
        toast.error("Product data not loaded for update. Please refresh.");
        return;
    }

    // Only include changed fields
    let changedData: Partial<ProductFormValues> = {};
    
    changedData = Object.entries(data).reduce((acc, [key, value]) => {
      const formKey = key as keyof ProductFormValues;
      const originalValue = defaultProduct[formKey as keyof Product]; 

      // Skip if values are the same or value is undefined
      if (value === originalValue || value === undefined) {
        return acc;
      }

      // Handle date comparison
      if (formKey.toString().includes("Date") && originalValue) {
        try {
          const currentDate = new Date(value as string).toISOString().split("T")[0];
          const originalDate = new Date(originalValue as string).toISOString().split("T")[0];
          
          if (currentDate !== originalDate) {
            // Note: TypeScript infers value as the correct type when spread into acc due to Partial<ProductFormValues>
            return { ...acc, [formKey]: value }; 
          }
        } catch{
          // If date parsing fails, treat as changed field
          return { ...acc, [formKey]: value };
        }
        return acc;
      }

      // For all other fields
      // Note: TypeScript infers value as the correct type when spread into acc due to Partial<ProductFormValues>
      return { ...acc, [formKey]: value };
    }, {} as Partial<ProductFormValues>);

    // Check for changes
    if (Object.keys(changedData).length === 0 && !mediaData) {
      toast.info("No changes detected.");
      return;
    }

    // Determine category ID
    let categoryId = defaultProduct.productCategory; // Start with the existing category ID
    if (changedData.productCategory && categories?.data) {
      const category = categories.data.find(
        (item: { _id: string; categoryName: string }) =>
          item._id === changedData.productCategory ||
          item.categoryName === changedData.productCategory
      );
      categoryId = category?._id;
    }

    if (!categoryId) {
      toast.error("Invalid category selected.");
      return;
    }

    // Convert to FormData
    const formData = buildFormData(
      changedData,
      mediaData,
      categoryId,
      true // isEditMode is always true
    );

    try {
      toast.loading("Updating product...", { id: "productAction" });

      // Call ONLY updateProduct mutation
      const res = await updateProduct({ id: productId, data: formData }).unwrap();

      if (res.success) {
        toast.success("Product updated successfully!", { id: "productAction" });
        await refetch();
        navigate("/seller-dashboard/products");
      } else {
        toast.error(
          res.message || "Failed to update product.",
          { id: "productAction" }
        );
      }
    } catch (err) {
      console.error("Product mutation error:", err);
      toast.error("An unexpected error occurred.", { id: "productAction" });
    }
  };

  // 1. Loading State
  if (isFetching && !defaultProduct) {
    return <div className="p-10 text-center text-xl font-medium">Loading product data...</div>
  }
  
  // 2. Error/Missing ID State
  if (!productId || !defaultProduct) {
      // If the product ID is missing or the product data couldn't be fetched
      return <div className="p-10 text-center text-xl font-medium text-red-500">Error: Product ID is missing or product data failed to load.</div>
  }


  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Edit Product: {defaultProduct.productName}</h1>
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
           <ProductPreview 
    file={mediaData?.images.mainImage as File} 
    defaultMedia={defaultMedia as MediaData}  
    mediaData={mediaData} // Add this line
    previewDetails={previewDetails}
  />
        </div>

        {/* Right: Form + Media */}
        <div className="space-y-10 flex-2">
          <MediaUpload
            onMediaChange={setMediaData}
            defaultMedia={defaultMedia!}
          />

          <ProductForm
            ref={productFormRef}
            onSubmit={handleFormSubmit}
            defaultValue={defaultProduct}
            isEditMode={true} // Always true
          />

          <div className="flex gap-6 justify-end">
            <PrimaryButton type="Outline" title="Cancel" onClick={() => navigate("/seller-dashboard/products")} />
            <PrimaryButton
              type="Primary"
              title="Update Product" // Fixed title
              onClick={handleSaveChanges}
              className="w-full sm:w-auto min-w-[120px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
