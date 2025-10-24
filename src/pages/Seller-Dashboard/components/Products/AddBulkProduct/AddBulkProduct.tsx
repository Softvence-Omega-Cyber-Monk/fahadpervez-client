/* eslint-disable @typescript-eslint/no-explicit-any */
import PrimaryButton from "@/common/PrimaryButton";
import { MdOutlineFileDownload } from "react-icons/md";
import BulkUploadHeader from "./BulkUploadHeader";
import UploadProductFile from "./UploadProductFile";
import { parseCSV } from "./CSV.utils";
import { useState } from "react";
import { useAppDispatch } from "@/hooks/useRedux";
import { setBulkProduct } from "@/store/Slices/ProductSlice/productSlice";
import { useGetAllCategoriesQuery } from "@/Redux/Features/categories/categories.api";
import { Product } from "@/types/Product";
import { useGetAllProductsQuery } from "@/Redux/Features/products/products.api";

const AddBulkProduct = () => {
  const [, setFile] = useState<File | null>(null);
  const [, setProducts] = useState<(Product & { issues?: any; status?: string })[]>([]);
  const [, setValidationStats] = useState({
    total: 0,
    valid: 0,
    warnings: 0,
    errors: 0,
  });

  const { data: categories } = useGetAllCategoriesQuery({});
  const { data: allProducts } = useGetAllProductsQuery({});
  const dispatch = useAppDispatch();

  const handleFileUpload = (uploadedFile: File) => {
    setFile(uploadedFile);

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;

      try {
        const parsedProducts = parseCSV(
          text,
          categories?.data || [],
          allProducts?.data || []
        );

        setProducts(parsedProducts);
        dispatch(setBulkProduct(parsedProducts));

        setValidationStats({
          total: parsedProducts.length,
          valid: parsedProducts.filter((p) => p.status === "valid").length,
          warnings: parsedProducts.filter((p) => p.status === "warning").length,
          errors: parsedProducts.filter((p) => p.status === "error").length,
        });
      } catch (error: any) {
        console.error("Error during file upload:", error.message);
      }
    };

    reader.readAsText(uploadedFile);
  };

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <h2>Bulk Product Upload</h2>
          <p className="p2 text-base">
            Upload and manage multiple products at once
          </p>
        </div>
        <PrimaryButton
          type="Outline"
          title="Download Template"
          leftIcon={<MdOutlineFileDownload className="size-6" />}
        />
      </div>
      <BulkUploadHeader />
      <UploadProductFile onFileUpload={handleFileUpload} />
    </div>
  );
};

export default AddBulkProduct;
  