import ProductCard from "@/components/ProductDetails/ProductCart"
import StoreSearchInput from "./StoreSearchInput"
import { mockProducts, ProductData } from "@/pages/Admin-Dashboard/Product/Product";

const StoreProduct = () => {
  return (
    <div>
      <StoreSearchInput />
      <div className="grid grid-cols-1 md:grid-cols-3 py-[40px] gap-7">
        {mockProducts.map((product: ProductData) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default StoreProduct