import z from "zod";

export const productSchema = z.object({
  // Required Fields
  productName: z.string().min(1, "Product name is required"),
  productCategory: z.string().min(1, "Category is required"),
  productSKU: z.string().min(1, "SKU is required"),
  productDescription: z.string().min(1, "Description is required"),
  stock: z.coerce.number().min(1, "Stock is required"),
  currency: z.string().min(1, "Currency is required"),
  pricePerUnit: z.coerce.number().min(1, "Price per unit is required"),
  weight: z.coerce.number().min(1, "Weight is required"),

  // Optional Fields
  companyName: z.string().optional(),
  gender: z.string().optional(),
  availableSize: z.string().nullable().optional(),
  specialPrice: z.coerce.number().optional(),
  specialPriceStartingDate: z.string().optional(),
  specialPriceEndingDate: z.string().optional(),

  // Image URLs (Optional)
  mainImage: z.string().url("Must be a valid URL").optional(),
  sideImage: z.string().url("Must be a valid URL").optional(),
  sideImage2: z.string().url("Must be a valid URL").optional(),
  lastImage: z.string().url("Must be a valid URL").optional(),
  // Image URLs (Optional)
  mainImageUrl: z.string().url("Must be a valid URL").optional(),
  sideImageUrl: z.string().url("Must be a valid URL").optional(),
  sideImage2Url: z.string().url("Must be a valid URL").optional(),
  lastImageUrl: z.string().url("Must be a valid URL").optional(),

  // Video URL (Optional)
  videoUrl: z.string().url("Must be a valid URL").optional(),

  // Dimensions (Optional)
  length: z.coerce.number().optional(),
  width: z.coerce.number().optional(),
  height: z.coerce.number().optional(),
});


export const productUpdateSchema = productSchema.partial();
