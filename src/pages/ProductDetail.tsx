// ProductDetail.tsx
import { ChevronRight } from "lucide-react";
import { useParams } from "react-router-dom";
import ProductDetailsTab from "@/components/ProductDetails/ProductDetailsTab";
import ProductCard from "@/components/ProductDetails/ProductCart";
import ProductGalary from "@/components/ProductDetails/ProductGalary";
import { useGetProductByIdQuery, useGetAllProductsQuery } from "@/Redux/Features/products/products.api";
import { Spinner } from "@/components/ui/spinner";
import CommonWrapper from "@/common/CommonWrapper";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetProductByIdQuery({ id });
  const { data: allProductsData } = useGetAllProductsQuery({});

  if (isLoading) {
    return (
      <div className="min-h-screen grid place-content-center">
        <Spinner />
      </div>
    );
  }

  const product = data?.data;
  if (!product) {
    return (
      <div className="min-h-screen grid place-content-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Product not found</h2>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  // Filter products by same category, limit to 3
  const relatedProducts = allProductsData?.data
    ?.filter((p: any) => p.productCategory === product.productCategory && p._id !== product._id)
    .slice(0, 3) || [];

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8 mt-20 pt-[50px]">
      <CommonWrapper>
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-6 flex-wrap">
          <a
            href="/"
            className="text-gray-600 hover:text-gray-900 text-sm sm:text-base"
          >
            Shop
          </a>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <a
            href="/categories"
            className="text-gray-600 hover:text-gray-900 text-sm sm:text-base"
          >
            Categories
          </a>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <span className="text-gray-900 text-sm sm:text-base font-medium">
            {product?.productName}
          </span>
        </nav>

        {/* Main Content */}
        <ProductGalary product={product} />

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="py-[60px] mt-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
              {relatedProducts.map((relatedProduct: any) => (
                <ProductCard key={relatedProduct._id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}

        <ProductDetailsTab productId={product._id} />
      </CommonWrapper>
    </div>
  );
}