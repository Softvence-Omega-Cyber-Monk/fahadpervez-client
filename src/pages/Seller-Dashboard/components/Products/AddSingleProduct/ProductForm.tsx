import CommonForm, { CommonFormRef } from "@/common/CommonForm";
import { z } from "zod";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useGetAllCategoriesQuery } from "@/Redux/Features/categories/categories.api";
import { Product } from "@/types/Product";

const productSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  productCategory: z.string().min(1, "Category is required"),
  productSKU: z.string().min(1, "SKU is required"),
  companyName: z.string().optional(),
  gender: z.string().optional(),
  availableSize: z.string().optional(),
  productDescription: z.string().min(1, "Description is required"),
  stock: z.coerce.number().min(1, "Stock is required"),
  currency: z.string().min(1, "Currency is required"),
  pricePerUnit: z.coerce.number().min(1, "Price per unit is required"),
  specialPrice: z.coerce.number().optional(),
  specialPriceStartingDate: z.string().optional(),
  specialPriceEndingDate: z.string().optional(),
  length: z.coerce.number().optional(),
  width: z.coerce.number().optional(),
  height: z.coerce.number().optional(),
  weight: z.coerce.number().min(1, "Weight is required"),
  mainImage: z.string().optional(),
  sideImage: z.string().optional(),
  sideImage2: z.string().optional(),
  lastImage: z.string().optional(),
  video: z.string().optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  onSubmit: (data: ProductFormValues) => void;
  defaultProduct?: Product;
}

export interface ProductFormRef {
  submit: () => Promise<void>;
}

const ProductForm = forwardRef<ProductFormRef, ProductFormProps>(
  ({ onSubmit, defaultProduct }, ref) => {
    const { data: categories, isLoading } = useGetAllCategoriesQuery({});
    console.log(categories)
    const formRef = useRef<CommonFormRef>(null);

    useImperativeHandle(ref, () => ({
      submit: async () => {
        if (formRef.current) {
          await formRef.current.submit();
        }
      },
    }));

    if (isLoading) return <div>Loading...</div>;

    const fields = [
      {
        name: "productName",
        label: "Product Name*",
        type: "text",
        placeholder: "Your product name",
        defaultValue: defaultProduct?.productName,
      },
      {
        name: "productCategory",
        label: "Product Category*",
        type: "select",
        placeholder: "Select a category",
        options: categories?.data?.map((c: {categoryName:string}) => c.categoryName) || [],
        defaultValue: defaultProduct?.productCategory,
      },
      {
        name: "productSKU",
        label: "SKU*",
        type: "text",
        placeholder: "Enter SKU",
        defaultValue: defaultProduct?.productSKU,
      },
      {
        name: "companyName",
        label: "Company/Brand Name",
        type: "text",
        placeholder: "Brand name",
        defaultValue: defaultProduct?.companyName,
      },
      {
        name: "gender",
        label: "Gender",
        type: "select",
        placeholder: "Select gender",
        options: ["Male", "Female", "Unisex"],
        defaultValue: defaultProduct?.gender,
      },
      {
        name: "availableSize",
        label: "Available Size",
        type: "badge",
        options: ["5mg", "10mg", "20mg", "50mg"],
        defaultValue: defaultProduct?.availableSize,
      },
      {
        name: "productDescription",
        label: "Product Description*",
        type: "description",
        placeholder: "About product",
        defaultValue: defaultProduct?.productDescription,
      },
      {
        name: "stock",
        label: "Stock*",
        type: "number",
        placeholder: "0",
        defaultValue: defaultProduct?.stock?.toString(),
      },
      {
        name: "currency",
        label: "Currency*",
        type: "select",
        placeholder: "Select currency",
        options: ["USD", "EUR", "BDT"],
        defaultValue: defaultProduct?.currency,
      },
      {
        name: "pricePerUnit",
        label: "Price Per Unit*",
        type: "number",
        placeholder: "0.00",
        defaultValue: defaultProduct?.pricePerUnit?.toString(),
      },
      {
        name: "specialPrice",
        label: "Special Price",
        type: "number",
        placeholder: "0.00",
        defaultValue: defaultProduct?.specialPrice?.toString(),
      },
      {
        name: "specialPriceStartingDate",
        label: "Special Price From",
        type: "date",
        defaultValue: defaultProduct?.specialPriceStartingDate,
      },
      {
        name: "specialPriceEndingDate",
        label: "Special Price To",
        type: "date",
        defaultValue: defaultProduct?.specialPriceEndingDate,
      },
      {
        name: "length",
        label: "Length",
        type: "number",
        defaultValue: defaultProduct?.length?.toString(),
      },
      {
        name: "width",
        label: "Width",
        type: "number",
        defaultValue: defaultProduct?.width?.toString(),
      },
      {
        name: "height",
        label: "Height",
        type: "number",
        defaultValue: defaultProduct?.height?.toString(),
      },
      {
        name: "weight",
        label: "Weight*",
        type: "number",
        defaultValue: defaultProduct?.weight?.toString(),
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
