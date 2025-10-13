import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { FaPlus } from "react-icons/fa6";

import ProductForm, { ProductFormValues, ProductFormRef } from "./ProductForm";
import ProductPreview from "./ProductPreview";
import MediaUpload from "./MediaUpload";
import PrimaryButton from "@/common/PrimaryButton";

import {
  useAddProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "@/Redux/Features/products/products.api";
import { useGetAllCategoriesQuery } from "@/Redux/Features/categories/categories.api";
import { Product } from "@/types/Product";
import { MediaData } from "@/types/SellerDashboardTypes/MediaUpload";

// Types
export interface DefaultPreviewData {
  mainImage: string;
  name: string;
  productSKU: string;
  pricePerUnit: number;
  availableSize: string;
}

interface Category {
  _id: string;
  categoryName: string;
}

const AddProduct = () => {
  const { id: productId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const productFormRef = useRef<ProductFormRef>(null);

  // State Management
  const [mediaData, setMediaData] = useState<MediaData | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [defaultPreview, setDefaultPreview] = useState<DefaultPreviewData | undefined>();

  // API Queries
  const { data: productData, isLoading: isProductLoading } = useGetProductByIdQuery(
    { id: productId! },
    { skip: !productId }
  );
  const { data: categoriesData, isLoading: isCategoriesLoading } = useGetAllCategoriesQuery({});

  // API Mutations
  const [addProduct, { isLoading: isAdding }] = useAddProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const isSubmitting = isAdding || isUpdating;

  // Load product data for editing
  useEffect(() => {
    if (productData?.data) {
      const fetchedProduct = productData.data;
      setProduct(fetchedProduct);
      setDefaultPreview({
        mainImage: fetchedProduct.mainImageUrl,
        name: fetchedProduct.productName,
        productSKU: fetchedProduct.productSKU,
        pricePerUnit: fetchedProduct.pricePerUnit,
        availableSize: fetchedProduct.availableSize,
      });
    }
  }, [productData]);

  // Find category ID by name
  const findCategoryId = useCallback(
    (categoryName: string): string => {
      const category = categoriesData?.data?.find(
        (cat: Category) => cat.categoryName === categoryName
      );
      return category?._id || "";
    },
    [categoriesData]
  );

  // Build FormData from product values and media
  const buildFormData = useCallback(
    (data: ProductFormValues, media: MediaData): FormData => {
      const formData = new FormData();

      // Required fields
      formData.append("productName", data.productName);
      formData.append("productCategory", findCategoryId(data.productCategory));
      formData.append("productSKU", data.productSKU);
      formData.append("productDescription", data.productDescription);
      formData.append("stock", String(data.stock));
      formData.append("currency", data.currency);
      formData.append("pricePerUnit", String(data.pricePerUnit));
      formData.append("weight", String(data.weight));

      // Optional text fields
      if (data.companyName) formData.append("companyName", data.companyName);
      if (data.gender) formData.append("gender", data.gender);
      if (data.availableSize) formData.append("availableSize", data.availableSize);

      // Special pricing
      if (data.specialPrice !== undefined) {
        formData.append("specialPrice", String(data.specialPrice));
      }
      if (data.specialPriceStartingDate) {
        formData.append("specialPriceStartingDate", data.specialPriceStartingDate);
      }
      if (data.specialPriceEndingDate) {
        formData.append("specialPriceEndingDate", data.specialPriceEndingDate);
      }

      // Dimensions
      if (data.length !== undefined) formData.append("length", String(data.length));
      if (data.width !== undefined) formData.append("width", String(data.width));
      if (data.height !== undefined) formData.append("height", String(data.height));

      // Media files
      if (media.images.mainImage) formData.append("mainImage", media.images.mainImage);
      if (media.images.sideImage) formData.append("sideImage", media.images.sideImage);
      if (media.images.sideImage2) formData.append("sideImage2", media.images.sideImage2);
      if (media.images.lastImage) formData.append("lastImage", media.images.lastImage);
      if (media.video) formData.append("video", media.video);

      // Removed default images
      if (media.removedDefaultImageIds && media.removedDefaultImageIds.length > 0) {
        formData.append("removedDefaultImageIds", JSON.stringify(media.removedDefaultImageIds));
      }

      return formData;
    },
    [findCategoryId]
  );

  // Handle form submission
  const handleFormSubmit = useCallback(
    async (data: ProductFormValues) => {
      // Validation
      if (!mediaData?.images.mainImage && !product?.mainImageUrl) {
        toast.error("Please upload at least a main image.");
        return;
      }

      try {
        const formData = buildFormData(data, mediaData || { images: {}, video: undefined, removedDefaultImageIds: [] });
        const toastId = "product-operation";

        toast.loading(
          productId ? "Updating product..." : "Creating product...",
          { id: toastId }
        );

        const result = productId
          ? await updateProduct({ id: productId, data: formData }).unwrap()
          : await addProduct(formData).unwrap();

        if (result.success) {
          toast.success(
            productId ? "Product updated successfully!" : "Product created successfully!",
            { id: toastId }
          );
          navigate("/seller-dashboard/products");
        } else {
          toast.error(result.message || "Failed to save product.", { id: toastId });
        }
      } catch (error) {
        console.error("Product operation failed:", error);
        toast.error("An unexpected error occurred. Please try again.", {
          id: "product-operation",
        });
      }
    },
    [mediaData, product, productId, buildFormData, addProduct, updateProduct, navigate]
  );

  // Trigger form submission programmatically
  const handleSaveChanges = useCallback(async () => {
    if (productFormRef.current) {
      await productFormRef.current.submit();
    }
  }, []);

  // Navigation handlers
  const handleCancel = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleBulkUpload = useCallback(() => {
    navigate("/seller-dashboard/products/add-bulk-product");
  }, [navigate]);

  // Loading state
  if (isProductLoading || isCategoriesLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 lg:space-y-10">
      {/* Header with Bulk Upload Button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {productId ? "Edit Product" : "Add New Product"}
          </h1>
          {productId && product && (
            <p className="text-sm text-gray-600 mt-1">
              Product ID: {product._id}
            </p>
          )}
        </div>
        <PrimaryButton
          type="Primary"
          title="Bulk Upload"
          rightIcon={<FaPlus />}
          className="px-8 sm:px-12"
          onClick={handleBulkUpload}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
        {/* Product Preview - Left Column */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <ProductPreview
              file={mediaData?.images.mainImage as File}
              defaultPreview={defaultPreview}
            />
          </div>
        </div>

        {/* Form Section - Right Column */}
        <div className="lg:col-span-2 space-y-8 lg:space-y-10">
          {/* Media Upload */}
          <MediaUpload 
            onMediaChange={setMediaData}
              defaultImages={product ? {
              mainImage: product.mainImageUrl,
              sideImage: product.sideImageUrl,
              sideImage2: product.sideImage2Url,
              lastImage: product.lastImageUrl,
            } : undefined}
            defaultVideo={product?.videoUrl}
          />

          {/* Product Form */}
          <ProductForm
            ref={productFormRef}
            onSubmit={handleFormSubmit}
            defaultProduct={product || undefined}
          />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end pt-6 border-t border-gray-200">
            <PrimaryButton
              type="Outline"
              title="Cancel"
              onClick={handleCancel}
              className="w-full sm:w-auto min-w-[120px]"
              disabled={isSubmitting}
            />
            <PrimaryButton
              type="Primary"
              title={productId ? "Update Product" : "Create Product"}
              onClick={handleSaveChanges}
              className="w-full sm:w-auto min-w-[120px]"
              disabled={isSubmitting}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;