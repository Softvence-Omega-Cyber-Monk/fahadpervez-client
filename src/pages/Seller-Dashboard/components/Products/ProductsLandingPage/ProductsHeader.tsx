import PrimaryButton from "@/common/PrimaryButton";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const ProductsHeader = () => {
    const navigate = useNavigate()
  return (
    <div className="flex items-center justify-between">
      <h1>Products</h1>
      <PrimaryButton
        type="Primary"
        title="Add new product"
        rightIcon={<FaPlus />}
        className=""
        onClick={()=> navigate('/seller-dashboard/products/add-single-product')}
      />
    </div>
  );
};

export default ProductsHeader;
