
import CommonForm from "@/common/CommonForm";
import { z } from "zod";
import PrimaryButton from "@/common/PrimaryButton";
import { useCreateProductMutation } from "@/store/Slices/productApi";

interface ProductFormProps {
  categories: any[];
  areCategoriesLoading: boolean;
}

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

const ProductForm = ({ categories, areCategoriesLoading }: ProductFormProps) => {
  const [createProduct, { isLoading: isProductCreating }] = useCreateProductMutation();

  const productFields = [
    { name: "productName", label: "Product Name*", type: "text", placeholder: "Your product name" },
    {
      name: "productCategory",
      label: "Product Category*",
      type: "select",
      placeholder: areCategoriesLoading ? "Loading categories..." : "Select a category",
      options: categories.map((cat) => cat.name),
      disabled: areCategoriesLoading,
    },
    { name: "sku", label: "SKU*", type: "text", placeholder: "Enter SKU no" },
    { name: "brandName", label: "Brand/Company Name*", type: "text", placeholder: "Brand name" },
    { name: "gender", label: "Gender", type: "select", placeholder: "Select gender", options: ["Male", "Female", "Unisex"] },
    { name: "availableSize", label: "Select Available Size (If available)", type: "badge", placeholder: "Choose size", options: ["5mg", "10mg", "20mg", "50mg"] },
    { name: "description", label: "Product Description*", type: "description", placeholder: "About product" },
  ];
  const quantityFields = [
    // Quantity & Pricing Section
    { name: "quantity", label: "Total Product Quantity*", type: "number", placeholder: "00" },
    { name: "currency", label: "Select Currency*", type: "select", placeholder: "Select currency", options: ["USD", "EUR", "BDT"] },
    { name: "pricePerUnit", label: "Price Per Unit*", type: "number", placeholder: "$0.00" },
    { name: "specialPrice", label: "Special Price", type: "number", placeholder: "$0.00" },
    { name: "specialPriceFrom", label: "Special Price From", type: "date" },
    { name: "specialPriceTo", label: "Special Price To", type: "date" },
  ];

  const handleFormSubmit = async (data: ProductFormValues) => {
    console.log("handleFormSubmit called");
    console.log("Form submitted:", data);
    try {
      const productData = {
        name: data.productName,
        description: data.description,
        price: parseFloat(data.pricePerUnit),
        category: data.productCategory,
        stock: parseInt(data.quantity),
      };
      console.log("Sending product data:", productData);
      const response = await createProduct(productData).unwrap();
      console.log("Product created successfully:", response);
      alert("Product created successfully!");
    } catch (error: any) {
      console.error("Error creating product:", error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error request:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", error.message);
      }
      alert("Error creating product. Please try again.");
    }
  };

  return (
    <div className="  bg-white shadow rounded-lg p-6 space-y-6">
      <h3 className="border-b-2 border-b-border pb-2">Product Information</h3>
      <CommonForm fields={productFields} schema={productSchema} onSubmitRedux={handleFormSubmit} />
      <h3 className=" border-b-2 border-b-border pb-2">Quantity & Pricing</h3>
      <CommonForm fields={quantityFields} schema={productSchema} onSubmitRedux={handleFormSubmit} />
      <div className="flex gap-6 justify-end">
        <PrimaryButton type="Outline" title="Cancel" className="" />
        <PrimaryButton type="Primary" title="Save & Changes" disabled={isProductCreating} />
      </div>
    </div>
  );
};

export default ProductForm;
