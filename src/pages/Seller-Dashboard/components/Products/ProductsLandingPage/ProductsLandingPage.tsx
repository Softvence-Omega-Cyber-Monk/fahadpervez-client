import OrderTabs from "@/common/OrderTabs";
import ProductsHeader from "./ProductsHeader";
import ProductStats from "./ProductStats";
import OrderSearchBar from "@/common/OrderSearchBar";
import ProductTable from "./ProductTable";



const ProductsLandingPage = () => {

  return (
    <div className="space-y-10">
      <ProductsHeader/>
      <ProductStats/>
      <OrderTabs/>
      <OrderSearchBar tableType="Button"/>
      <ProductTable/>
    </div>
  );
};

export default ProductsLandingPage;