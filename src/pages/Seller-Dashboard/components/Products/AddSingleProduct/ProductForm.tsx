import CommonForm, { CommonFormRef } from "@/common/CommonForm";
import { z } from "zod";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useGetAllCategoriesQuery } from "@/Redux/Features/categories/categories.api";
import { productSchema } from "@/utils/productFormZodSchema";

export type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  onSubmit: (data: ProductFormValues) => void;
}

export interface ProductFormRef {
  submit: () => Promise<void>;
}

const ProductForm = forwardRef<ProductFormRef, ProductFormProps>(
  ({ onSubmit }, ref) => {
    const { data: categories, isLoading } = useGetAllCategoriesQuery({});
    const formRef = useRef<CommonFormRef>(null);

    useImperativeHandle(ref, () => ({
      submit: async () => {
        if (formRef.current) {
          await formRef.current.submit();
        }
      },
    }));

    if (isLoading) {
      return <div>Loading...</div>;
    }

    const fields = [
      {
        name: "productName",
        label: "Product Name*",
        type: "text",
        placeholder: "Your product name",
      },
      {
        name: "productCategory",
        label: "Product Category*",
        type: "select",
        placeholder: "Select a category",
        options: categories?.data?.map(
          (category: { categoryName: string }) => category?.categoryName
        ),
      },
      {
        name: "productSKU",
        label: "SKU*",
        type: "text",
        placeholder: "Enter SKU no",
      },
      {
        name: "companyName",
        label: "Brand/Company Name*",
        type: "text",
        placeholder: "Brand name",
      },
      {
        name: "gender",
        label: "Gender",
        type: "select",
        placeholder: "Select gender",
        options: ["Male", "Female", "Unisex"],
      },
      {
        name: "availableSize",
        label: "Select Available Size (If available)",
        type: "badge",
        placeholder: "Choose size",
        options: ["5mg", "10mg", "20mg", "50mg"],
      },
      {
        name: "productDescription",
        label: "Product Description*",
        type: "description",
        placeholder: "About product",
      },
      {
        name: "stock",
        label: "Total Product Quantity*",
        type: "number",
        placeholder: "00",
      },
      { name: "weight", label: "Weight*", type: "number", placeholder: "00" },
      {
        name: "currency",
        label: "Select Currency*",
        type: "select",
        placeholder: "Select currency",
        options: ["USD", "EUR", "BDT"],
      },
      {
        name: "pricePerUnit",
        label: "Price Per Unit*",
        type: "number",
        placeholder: "$0.00",
      },
      {
        name: "specialPrice",
        label: "Special Price",
        type: "number",
        placeholder: "$0.00",
      },
      {
        name: "specialPriceStartingDate",
        label: "Special Price From",
        type: "date",
      },
      {
        name: "specialPriceEndingDate",
        label: "Special Price To",
        type: "date",
      },
    ];

    return (
      <div className="bg-white shadow rounded-lg p-6 space-y-6">
        <h3 className="border-b-2 border-b-border pb-2">Product Information</h3>
        <CommonForm
          ref={formRef}
          fields={fields}
          schema={productSchema}
          onSubmit={onSubmit}
        />
      </div>
    );
  }
);

export default ProductForm;
