import CommonForm  from "@/common/CommonForm";
import { z } from "zod";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useGetAllCategoriesQuery } from "@/Redux/Features/categories/categories.api";
import { productSchema, productUpdateSchema } from "@/utils/productFormZodSchema";
import { Product } from "@/types/Product";
import { CommonFormRef } from "@/types/CommonForm";
import { Spinner } from "@/components/ui/spinner";

export type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  onSubmit: (data: ProductFormValues) => void;
  defaultValue?: Product;
  isEditMode?: boolean; // new prop
}

export interface ProductFormRef {
  submit: () => Promise<void>;
}

const ProductForm = forwardRef<ProductFormRef, ProductFormProps>(({ onSubmit, defaultValue, isEditMode }, ref) => {
  const { data: categories, isLoading: categoriesLoading } = useGetAllCategoriesQuery({});
  const formRef = useRef<CommonFormRef>(null);

   const [isReady, setIsReady] = useState(false);
  
  useImperativeHandle(ref, () => ({
    submit: async () => {
      if (formRef.current) {
        await formRef.current.submit();
      }
    },
  }));

  useEffect(() => {
    if (!categoriesLoading && categories) {
      setIsReady(true);
    }
  }, [categoriesLoading, categories]);

  // For edit mode, wait for both categories and default values
  if (isEditMode && (!isReady || !defaultValue)) {
    return <div><Spinner /></div>;
  }

  // For create mode, just wait for categories
  if (!isEditMode && categoriesLoading) {
    return <div><Spinner /></div>;
  }

  const getCategoryNameFromId = (categoryId: string) => {
    const category = categories?.data?.find((item :{ _id: string })  => item._id === categoryId);
    return category?.categoryName;
  };

  

  const fields = [
    {
      name: "productName",
      label: "Product Name*",
      type: "text",
      placeholder: "Your product name",
      defaultValue: defaultValue?.productName,
    },
    {
      name: "productCategory",
      label: "Product Category*",
      type: "select",
      placeholder: "Select a category",
     options: categories?.data?.map(
        (category: { categoryName: string }) => category?.categoryName
      ),
      // Convert category ID to category name for display
      defaultValue: defaultValue?.productCategory 
        ? getCategoryNameFromId(defaultValue.productCategory)
        : undefined, 
    },
    {
      name: "productSKU",
      label: "SKU*",
      type: "text",
      placeholder: "Enter SKU no",
      defaultValue: defaultValue?.productSKU,
    },
    {
      name: "companyName",
      label: "Brand/Company Name*",
      type: "text",
      placeholder: "Brand name",
      defaultValue: defaultValue?.companyName,
    },
    {
      name: "gender",
      label: "Gender",
      type: "select",
      placeholder: "Select gender",
      options: ["Male", "Female", "Unisex"],
      defaultValue: defaultValue?.gender,
    },
    {
      name: "availableSize",
      label: "Select Available Size (If available)",
      type: "badge",
      placeholder: "Choose size",
      options: ["5mg", "10mg", "20mg", "50mg"],
      defaultValue: defaultValue?.availableSize,
    },
    {
      name: "productDescription",
      label: "Product Description*",
      type: "description",
      placeholder: "About product",
      defaultValue: defaultValue?.productDescription,
    },
    {
      name: "stock",
      label: "Total Product Quantity*",
      type: "number",
      placeholder: "00",
      defaultValue: defaultValue?.stock,
    },
    { 
      name: "weight", 
      label: "Weight*", 
      type: "number", 
      placeholder: "00", 
      defaultValue: defaultValue?.weight 
    },
    {
      name: "currency",
      label: "Select Currency*",
      type: "select",
      placeholder: "Select currency",
      options: ["USD", "EUR", "BDT"],
      defaultValue: defaultValue?.currency,
    },
    {
      name: "pricePerUnit",
      label: "Price Per Unit*",
      type: "number",
      placeholder: "$0.00",
      defaultValue: defaultValue?.pricePerUnit,
    },
    {
      name: "specialPrice",
      label: "Special Price",
      type: "number",
      placeholder: "$0.00",
      defaultValue: defaultValue?.specialPrice,
    },
    {
      name: "specialPriceStartingDate",
      label: "Special Price From",
      type: "date",
      defaultValue: defaultValue?.specialPriceStartingDate 
        ? new Date(defaultValue.specialPriceStartingDate).toISOString().split('T')[0]
        : undefined,
    },
    {
      name: "specialPriceEndingDate",
      label: "Special Price To",
      type: "date",
      defaultValue: defaultValue?.specialPriceEndingDate 
        ? new Date(defaultValue.specialPriceEndingDate).toISOString().split('T')[0]
        : undefined,
    },
  ];

  

  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-6">
      <h3 className="border-b-2 border-b-border pb-2">Product Information</h3>
      <CommonForm
        ref={formRef}
        fields={fields}
        schema={isEditMode ? productUpdateSchema : productSchema}
        onSubmit={onSubmit}
      />
    </div>
  );
});

export default ProductForm;