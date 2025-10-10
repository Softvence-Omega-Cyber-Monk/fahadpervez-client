import ProductForm from "./ProductForm";
import PrimaryButton from "@/common/PrimaryButton";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductPreview";
import MediaUpload from "./MediaUpload";
import CategoryManager from "@/pages/Seller-Dashboard/components/Products/CategoryManager/CategoryManager.tsx";
import { useGetCategoriesQuery } from "@/store/Slices/categoryApi";
const AddProduct = () => {
  const navigate = useNavigate();
  const { data: categories, isLoading: areCategoriesLoading } = useGetCategoriesQuery();

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
          <MediaUpload/>
          <CategoryManager />
          <ProductForm 
            categories={categories || []} 
            areCategoriesLoading={areCategoriesLoading} 
          />
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
