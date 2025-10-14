import ProductForm, { ProductFormValues, ProductFormRef } from "./ProductForm";
import PrimaryButton from "@/common/PrimaryButton";
import { FaPlus } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import ProductPreview from "./ProductPreview";
import MediaUpload from "./MediaUpload";
import {
  useAddProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "@/Redux/Features/products/products.api";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { useGetAllCategoriesQuery } from "@/Redux/Features/categories/categories.api";
import { buildFormData } from "./buildFormData";
import { MediaData } from "@/types/SellerDashboardTypes/MediaUpload";
import { Product } from "@/types/Product";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [productId, setProductId] = useState<string | null>(null);
  const [defaultProduct, setDefaultProduct] = useState<Product | null>(null);
  const [defaultMedia, setDefaultMedia] = useState<MediaData | null>(null);
  const [mediaData, setMediaData] = useState<MediaData | null>(null);

  const productFormRef = useRef<ProductFormRef>(null);

  // Sync route ID
  useEffect(() => {
    if (id) setProductId(id);
  }, [id]);

  // Fetch product
  const { data: product, refetch } = useGetProductByIdQuery(
    { id: productId as string },
    { skip: !productId, refetchOnMountOrArgChange: true }
  );

  // Fetch categories
  const { data: categories } = useGetAllCategoriesQuery({});

  // Populate default product and media
  useEffect(() => {
    if (product) {
      setDefaultProduct(product.data);
      setDefaultMedia({
        images: {
          mainImageUrl: product.data.mainImageUrl,
          sideImageUrl: product.data.sideImageUrl,
          sideImage2Url: product.data.sideImage2Url,
          lastImageUrl: product.data.lastImageUrl,
        },
        videoUrl: product.data.videoUrl,
      });
    }
  }, [product]);

  const [updateProduct] = useUpdateProductMutation();
  const [addProduct] = useAddProductMutation();

  // Form submission trigger
  const handleSaveChanges = async () => {
    if (productFormRef.current) {
      await productFormRef.current.submit();
    }
  };

  // Handle actual form submit
  const handleFormSubmit = async (data: Partial<ProductFormValues>) => {
    console.log("Form Submit Data:", data);

    // Ensure main image for new products
    if (!productId && (!mediaData || !mediaData.images.mainImage)) {
      toast.error("Please select at least a main image.");
      return;
    }

    // Only include changed fields
    let changedData: Partial<ProductFormValues> = {};
    if (productId && defaultProduct) {
   changedData = Object.entries(data).reduce((acc, [key, value]) => {
  const formKey = key as keyof ProductFormValues;

  const currentValue = value;
  const originalValue = defaultProduct[formKey];

  // Skip if values are the same or currentValue is undefined
  if (currentValue === originalValue || currentValue === undefined) {
    return acc;
  }

  // Handle date comparison
  if (formKey.toString().includes("Date") && originalValue) {
    try {
      const currentDate = new Date(currentValue as string).toISOString().split("T")[0];
      const originalDate = new Date(originalValue as string).toISOString().split("T")[0];
      
      if (currentDate !== originalDate) {
        return { ...acc, [formKey]: currentValue };
      }
    } catch{
      // If date parsing fails, treat as regular field
      return { ...acc, [formKey]: currentValue };
    }
    return acc;
  }

  // For all other fields
  return { ...acc, [formKey]: currentValue };
}, {} as Partial<ProductFormValues>);

      if (Object.keys(changedData).length === 0 && !mediaData) {
        toast.info("No changes detected.");
        return;
      }
    }

    // Determine category ID
    let categoryId = defaultProduct?.productCategory;
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
      !!productId
    );

    try {
      toast.loading(productId ? "Updating product..." : "Adding product...", {
        id: "productAction",
      });

      const res = productId
        ? await updateProduct({ id: productId, data: formData }).unwrap()
        : await addProduct(formData).unwrap();

      if (res.success) {
        toast.success(
          `Product ${productId ? "updated" : "added"} successfully!`,
          { id: "productAction" }
        );
        if (productId) await refetch();
        navigate("/seller-dashboard/products");
      } else {
        toast.error(
          res.message || `Failed to ${productId ? "update" : "add"} product.`,
          { id: "productAction" }
        );
      }
    } catch (err) {
      console.error("Product mutation error:", err);
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
          <ProductPreview file={mediaData?.images.mainImage as File} />
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
            defaultValue={defaultProduct || undefined}
            isEditMode={!!productId}
          />

          <div className="flex gap-6 justify-end">
            <PrimaryButton type="Outline" title="Cancel" />
            <PrimaryButton
              type="Primary"
              title={productId ? "Update Product" : "Create Product"}
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
