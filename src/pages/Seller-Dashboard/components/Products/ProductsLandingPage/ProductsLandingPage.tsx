import OrderTabs from "@/common/OrderTabs";
import ProductsHeader from "./ProductsHeader";
import ProductStats from "./ProductStats";
import OrderSearchBar from "@/common/OrderSearchBar";
import OrderTable from "@/common/OrderTable";



const ProductsLandingPage = () => {

  return (
    <div className="space-y-10">
      <ProductsHeader/>
      <ProductStats/>
      <OrderTabs/>
      <OrderSearchBar tableType="Button"/>
      <OrderTable />
    </div>
  );
};

export default ProductsLandingPage;