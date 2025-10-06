import { ChevronRight } from "lucide-react";

import ProductDetailsTab from "@/components/ProductDetails/ProductDetailsTab";
import ProductCard from "@/components/ProductDetails/ProductCart";
import ProductGalary from "@/components/ProductDetails/ProductGalary";

export default function ProductDetail() {


  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-[1120px] mx-auto">
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
          <span className="text-gray-900 font-semibold text-sm sm:text-base">Supplements</span>
        </nav>

        {/* Main Content */}
        <ProductGalary />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-[60px] gap-5">
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>

        <ProductDetailsTab />

      </div>

    </div>
  )
}
