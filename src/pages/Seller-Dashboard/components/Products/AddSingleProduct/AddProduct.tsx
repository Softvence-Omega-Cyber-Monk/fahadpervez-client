import ProductForm, { ProductFormValues, ProductFormRef } from "./ProductForm";
import PrimaryButton from "@/common/PrimaryButton";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductPreview";
<<<<<<< HEAD
import MediaUpload from "./MediaUpload";
import CategoryManager from "@/pages/Seller-Dashboard/components/Products/CategoryManager/CategoryManager.tsx";
import { useGetCategoriesQuery } from "@/store/Slices/categoryApi";
=======
import MediaUpload, { MediaData } from "./MediaUpload";
import { useAddProductMutation } from "@/Redux/Features/products/products.api";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { useGetAllCategoriesQuery } from "@/Redux/Features/categories/categories.api";


>>>>>>> 28278fa0cfbe779b04be53faa7f9d32fd1a9845f
const AddProduct = () => {
    const {data:categories} = useGetAllCategoriesQuery({})

  const [addProduct] = useAddProductMutation();
  const [mediaData, setMediaData] = useState<MediaData | null>(null);
  const productFormRef = useRef<ProductFormRef>(null);

  const navigate = useNavigate();
<<<<<<< HEAD
  const { data: categories, isLoading: areCategoriesLoading } = useGetCategoriesQuery();
=======

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

    console.log(mediaData)

    const category= categories?.data?.find((item : {_id:string,categoryName:string})=>item.categoryName === data.productCategory)
    const formData ={
    productName: data.productName,
    productCategory: category?._id,
    productSKU: data.sku,
    companyName: data.brandName,
    gender: data.gender,
    availableSize: data.availableSize,
    productDescription: data.description,
    stock: Number(data.quantity),
    currency: data.currency,
    pricePerUnit: Number(data.pricePerUnit),
    specialPrice: data.specialPrice ? Number(data.specialPrice) : undefined,
    specialPriceStartingDate: data.specialPriceFrom,
    specialPriceEndingDate: data.specialPriceTo,
    mainImageUrl: mediaData.images.mainImage.name || mediaData.images.mainImage,
    sideImageUrl: mediaData.images.sideImage,
    sideImage2Url: mediaData.images.sideImage2,
    lastImageUrl: mediaData.images.lastImage,
    videoUrl: mediaData.video,
    weight: data.weight ? Number(data.weight) : undefined,
    }

console.log(formData)

    try {
      toast.loading("Adding product...", { id: "addProduct" });
      const res = await addProduct(formData).unwrap();
      if (res.success) {
        toast.success("Product added successfully!", { id: "addProduct" });
        navigate("/seller-dashboard/products");
      } else {
        toast.error(res.message || "Failed to add product.", { id: "addProduct" });
      }
    } catch (error) {
      console.error("Failed to add product:", error);
      toast.error("An unexpected error occurred.", { id: "addProduct" });
    }
  };
>>>>>>> 28278fa0cfbe779b04be53faa7f9d32fd1a9845f

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
            navigate("/Products/post_products")
          }
        />
      </div>
      <div className="flex gap-10">
        <div className="flex-1">
          <ProductCard />
        </div>
        <div className=" space-y-10 flex-2">
<<<<<<< HEAD
          <MediaUpload/>
          <CategoryManager />
          <ProductForm 
            categories={categories || []} 
            areCategoriesLoading={areCategoriesLoading} 
          />
=======
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
>>>>>>> 28278fa0cfbe779b04be53faa7f9d32fd1a9845f
        </div>
      </div>
    </div>
  );
};

export default AddProduct;