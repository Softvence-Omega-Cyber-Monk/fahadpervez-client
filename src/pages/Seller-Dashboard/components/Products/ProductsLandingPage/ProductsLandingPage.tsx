import ProductsHeader from "./ProductsHeader";
import ProductStats from "./ProductStats";
import OrderSearchBar from "@/common/OrderSearchBar";
import ProductTable from "./ProductTable";
import { useGetMyProductsQuery } from "@/Redux/Features/products/products.api";
import { useEffect, useState } from "react";
import { Product } from "@/types/Product";
import { Spinner } from "@/components/ui/spinner";




const ProductsLandingPage = () => {
  const {data,refetch,isLoading} = useGetMyProductsQuery({})
  const [products,setProducts] = useState<Product[]>([])
  const [totalProduct,setTotalProduct] = useState<number>(0)
  const [selectedProduct, setSelectedProduct] = useState<string[]>([]);
  
  useEffect(()=>{
    if(data?.data){
      setProducts(data?.data)
      setTotalProduct(data?.data.length)
      setSelectedProduct([])
    }
  },[data,refetch])
  
  if(isLoading){
    return <div><Spinner /></div>
  }

  return (
    <div className="space-y-10">
      <ProductsHeader/>
      <ProductStats />
      <OrderSearchBar tableType="Button" selectedProduct={selectedProduct} refetch={refetch} />
      <ProductTable products={products} totalProduct={totalProduct} setSelectedProduct={setSelectedProduct} selectedProduct={selectedProduct}/>
    </div>
  );
};

export default ProductsLandingPage;