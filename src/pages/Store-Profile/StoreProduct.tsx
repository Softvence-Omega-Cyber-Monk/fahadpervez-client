import ProductCard from "@/components/ProductDetails/ProductCart"
import StoreSearchInput from "./StoreSearchInput"

const StoreProduct = () => {
  return (
    <div>
      <StoreSearchInput />
      <div className="grid grid-cols-1 md:grid-cols-3 py-[40px] gap-7">
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
      </div>
    </div>
  )
}

export default StoreProduct