import ProductForm, { ProductFormValues, ProductFormRef } from "./ProductForm";
import PrimaryButton from "@/common/PrimaryButton";
import { FaPlus } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import ProductPreview from "./ProductPreview";
import MediaUpload, { MediaData } from "./MediaUpload";
import { useAddProductMutation, useGetProductByIdQuery } from "@/Redux/Features/products/products.api";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { useGetAllCategoriesQuery } from "@/Redux/Features/categories/categories.api";

const AddProduct = () => {
  const {id} = useParams()
  const { data: categories } = useGetAllCategoriesQuery({});
  useEffect(()=>{
    if(id){
      console.log(product,id)
      
    }
  },)
  const {data : product } = useGetProductByIdQuery({id:id as string})

  const [addProduct] = useAddProductMutation();
  const [mediaData, setMediaData] = useState<MediaData | null>(null);
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

    const formData = new FormData();

    formData.append("productName", data.productName);
    formData.append("productCategory", category?._id);
    formData.append("productSKU", data.sku);
    formData.append("companyName", data?.brandName as string);
    formData.append("gender", data.gender as string);
    formData.append("availableSize", data.availableSize as string);
    formData.append("productDescription", data.description as string);

    if (mediaData.images.mainImage)
      formData.append("mainImage", mediaData.images.mainImage);
    if (mediaData.images.sideImage)
      formData.append("sideImage", mediaData.images.sideImage);
    if (mediaData.images.sideImage2)
      formData.append("sideImage2", mediaData.images.sideImage2);
    if (mediaData.images.lastImage)
      formData.append("lastImage", mediaData.images.lastImage);
    if (mediaData.video) formData.append("video", mediaData.video);

    if (data?.quantity !== undefined && data?.quantity !== null) {
      formData.append("stock", String(Number(data.quantity)));
    }

    if (data?.currency) {
      formData.append("currency", data.currency);
    }

    if (data?.pricePerUnit !== undefined && data?.pricePerUnit !== null) {
      formData.append("pricePerUnit", String(Number(data.pricePerUnit)));
    }

    if (data?.specialPrice !== undefined && data?.specialPrice !== null) {
      formData.append("specialPrice", String(Number(data.specialPrice)));
    }

    if (data?.specialPriceFrom) {
      formData.append("specialPriceStartingDate", data.specialPriceFrom);
    }

    if (data?.specialPriceTo) {
      formData.append("specialPriceEndingDate", data.specialPriceTo);
    }

    if (data?.weight !== undefined && data?.weight !== null) {
      formData.append("weight", String(Number(data.weight)));
    }

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
          onClick={() => navigate("/seller-dashboard/products/add-bulk-product")}
        />
      </div>

      <div className="flex gap-10">
        <div className="flex-1">
          <ProductPreview 
            file={mediaData?.images.mainImage as File}
          />
        </div>

        <div className="space-y-10 flex-2">
          <MediaUpload onMediaChange={setMediaData} />
          <ProductForm
            ref={productFormRef}
            onSubmit={handleFormSubmit}
          />
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