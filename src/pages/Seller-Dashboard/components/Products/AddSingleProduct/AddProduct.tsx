import ProductForm from "./ProductForm";
import PrimaryButton from "@/common/PrimaryButton";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductPreview";
import MediaUpload from "./MediaUpload";

const AddProduct = () => {
  const navigate = useNavigate();
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
          <ProductCard />
        </div>
        <div className=" space-y-10 flex-2">
          <MediaUpload/>
          <ProductForm />
          <div className="flex gap-6 justify-end">
            <PrimaryButton type="Outline" title="Cancel" className="" />
            <PrimaryButton type="Primary" title="Save & Changes" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
