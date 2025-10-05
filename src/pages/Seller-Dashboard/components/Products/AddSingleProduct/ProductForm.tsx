
import CommonForm from "@/common/CommonForm";
import { z } from "zod";

const productSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  productCategory: z.string().min(1, "Category is required"),
  sku: z.string().min(1, "SKU is required"),
  brandName: z.string().optional(),
  gender: z.string().optional(),
  availableSize: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  quantity: z.string().min(1, "Quantity is required"),
  currency: z.string().min(1, "Currency is required"),
  pricePerUnit: z.string().min(1, "Price per unit is required"),
  specialPrice: z.string().optional(),
  specialPriceFrom: z.string().optional(),
  specialPriceTo: z.string().optional(),
});
type ProductFormValues = z.infer<typeof productSchema>;

const productFields = [
  { name: "productName", label: "Product Name*", type: "text", placeholder: "Your product name" },
  { name: "productCategory", label: "Product Category*", type: "select", placeholder: "Select a category", options: ["Medicine", "Supplements", "Personal Care"] },
  { name: "sku", label: "SKU*", type: "text", placeholder: "Enter SKU no" },
  { name: "brandName", label: "Brand/Company Name*", type: "text", placeholder: "Brand name" },
  { name: "gender", label: "Gender", type: "select", placeholder: "Select gender", options: ["Male", "Female", "Unisex"] },
  { name: "availableSize", label: "Select Available Size (If available)", type: "badge", placeholder: "Choose size", options: ["5mg", "10mg", "20mg", "50mg"] },
  { name: "description", label: "Product Description*", type: "description", placeholder: "About product" },
]
const quantityFields =[
  // Quantity & Pricing Section
  { name: "quantity", label: "Total Product Quantity*", type: "number", placeholder: "00" },
  { name: "currency", label: "Select Currency*", type: "select", placeholder: "Select currency", options: ["USD", "EUR", "BDT"] },
  { name: "pricePerUnit", label: "Price Per Unit*", type: "number", placeholder: "$0.00" },
  { name: "specialPrice", label: "Special Price", type: "number", placeholder: "$0.00" },
  { name: "specialPriceFrom", label: "Special Price From", type: "date" },
  { name: "specialPriceTo", label: "Special Price To", type: "date" },
];

const ProductForm = () => {
  const handleFormSubmit = (data:ProductFormValues) => {
    console.log("Form submitted:", data);
};

  return (
    <div className="  bg-white shadow rounded-lg p-6 space-y-6">
      <h3 className="border-b-2 border-b-border pb-2">Product Information</h3>
      <CommonForm fields={productFields} schema={productSchema} onSubmitRedux={handleFormSubmit} />
      <h3 className=" border-b-2 border-b-border pb-2">Quantity & Pricing</h3>
      <CommonForm fields={quantityFields} schema={productSchema} onSubmitRedux={handleFormSubmit} />
    </div>
  );
};

export default ProductForm;
