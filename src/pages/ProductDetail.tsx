import { ChevronRight } from "lucide-react";
import { useParams } from "react-router-dom";
import ProductDetailsTab from "@/components/ProductDetails/ProductDetailsTab";
import ProductCard from "@/components/ProductDetails/ProductCart";
import ProductGalary from "@/components/ProductDetails/ProductGalary";
import { mockProducts } from "@/pages/Admin-Dashboard/Product/Product";
import { useGetProductByIdQuery } from "@/Redux/Features/products/products.api";
import { Spinner } from "@/components/ui/spinner";
import CommonWrapper from "@/common/CommonWrapper";


export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const {data:product , isLoading} = useGetProductByIdQuery({id});
    if (isLoading) {
    return <div className="min-h-screen grid place-content-center"><Spinner /></div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8 mt-20 pt-[50px]">
      <CommonWrapper>
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-6 flex-wrap">
          <a href="#" className="text-gray-600 hover:text-gray-900 text-sm sm:text-base">
            Shop
          </a>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <a href="#" className="text-gray-600 hover:text-gray-900 text-sm sm:text-base">
            Categorise
          </a>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <span className="text-gray-900 font-semibold text-sm sm:text-base">{product.name}</span>
        </nav>

        {/* Main Content */}
        <ProductGalary product={product.data} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-[60px] gap-5">
          {mockProducts.slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <ProductDetailsTab />

      </CommonWrapper>

    </div>
  )
}
