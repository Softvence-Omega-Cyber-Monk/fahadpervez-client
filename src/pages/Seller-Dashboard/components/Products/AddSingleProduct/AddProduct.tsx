import ProductForm, { ProductFormValues, ProductFormRef } from "./ProductForm";
import PrimaryButton from "@/common/PrimaryButton";
import { FaPlus } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import ProductPreview from "./ProductPreview";
import MediaUpload from "./MediaUpload";
import {
  useAddProductMutation,
  useGetProductByIdQuery,
} from "@/Redux/Features/products/products.api";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { useGetAllCategoriesQuery } from "@/Redux/Features/categories/categories.api";
import { buildFormData } from "./buildFormData";
import { MediaData } from "@/types/SellerDashboardTypes/MediaUpload";
import { Product } from "@/types/Product";

const AddProduct = () => {
  const { id } = useParams();
  const { data: categories } = useGetAllCategoriesQuery({});
  const [defaultProduct, setDefaultProduct] = useState<Product | null>(null);
  const [defaultMedia, setDefaultMedia] = useState<MediaData | null>(null);
  useEffect(() => {
    if (id) {
      console.log(product, id);
    }
  });
  const { data: product } = useGetProductByIdQuery(
    { id: id as string },
    { skip: !id }
  );
  console.log(defaultProduct);
  useEffect(() => {
    if (product) {
      setDefaultProduct(product.data);
      setDefaultMedia({
        images: {
          mainImageUrl: defaultProduct?.mainImageUrl,
          sideImageUrl: defaultProduct?.sideImageUrl,
          sideImage2Url: defaultProduct?.sideImage2Url,
          lastImageUrl: defaultProduct?.lastImageUrl,
        },
        videoUrl: defaultProduct?.videoUrl,
      });
    }
  }, [product, defaultProduct]);
  console.log(defaultMedia?.images?.mainImageUrl);
  const [addProduct] = useAddProductMutation();
  const [mediaData, setMediaData] = useState<MediaData | null>();
  const productFormRef = useRef<ProductFormRef>(null);
  const navigate = useNavigate();
  const handleSaveChanges = async () => {
    if (productFormRef.current) {
      await productFormRef.current.submit();
    }
  };

  const handleFormSubmit = async (data: ProductFormValues) => {
    if (!mediaData || !mediaData.images.mainImage) {
      toast.error("Please select at least a main image.");
      return;
    }
    const category = categories?.data?.find(
      (item: { _id: string; categoryName: string }) =>
        item.categoryName === data.productCategory
    );

    const formData = buildFormData(data, mediaData, category?._id as string);
    try {
      toast.loading("Adding product...", { id: "addProduct" });
      const res = await addProduct(formData).unwrap();
      if (res.success) {
        toast.success("Product added successfully!", { id: "addProduct" });
        navigate("/seller-dashboard/products");
      } else {
        toast.error(res.message || "Failed to add product.", {
          id: "addProduct",
        });
      }
    } catch (error) {
      console.error("Failed to add product:", error);
      toast.error("An unexpected error occurred.", { id: "addProduct" });
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between ">
        <div className=""></div>
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
        <div className="flex-1">
          <ProductPreview
            file={mediaData?.images.mainImage as File}
            // defaultMedia={defaultMedia as MediaData}
          />
        </div>

        <div className="space-y-10 flex-2">
          <MediaUpload onMediaChange={setMediaData} defaultMedia={defaultMedia} />
          <ProductForm ref={productFormRef} onSubmit={handleFormSubmit} />
          <div className="flex gap-6 justify-end">
            <PrimaryButton type="Outline" title="Cancel" className="" />
            <PrimaryButton
              type="Primary"
              title="Save Changes"
              onClick={handleSaveChanges}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
