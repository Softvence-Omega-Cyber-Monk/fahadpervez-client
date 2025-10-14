import { MediaData } from "@/types/SellerDashboardTypes/MediaUpload";
import { ProductFormValues } from "./ProductForm";

export const buildFormData = (
  data: Partial<ProductFormValues>,
  media: MediaData | null | undefined,
  categoryId: string,
  isEdit: boolean = false
): FormData => {
  const formData = new FormData();

  // For new products, validate required fields
  if (!isEdit) {
    const requiredFields = [
      'productName', 'productSKU', 'productDescription', 
      'stock', 'currency', 'pricePerUnit', 'weight'
    ];
    
    for (const field of requiredFields) {
      if (!data[field as keyof ProductFormValues]) {
        throw new Error(`${field} is required`);
      }
    }
    
    if (!categoryId) throw new Error("productCategory is required");
  }

  // Only append fields that have values (for updates) or all required fields (for creates)
  if (data.productName) formData.append("productName", data.productName);
  if (categoryId) formData.append("productCategory", categoryId);
  if (data.productSKU) formData.append("productSKU", data.productSKU);
  if (data.productDescription) formData.append("productDescription", data.productDescription);
  
  if (data.stock !== undefined) formData.append("stock", String(data.stock));
  if (data.currency) formData.append("currency", data.currency);
  if (data.pricePerUnit !== undefined) formData.append("pricePerUnit", String(data.pricePerUnit));
  if (data.weight !== undefined) formData.append("weight", String(data.weight));

  // Optional text fields - only append if they exist in data
  if (data.companyName) formData.append("companyName", data.companyName);
  if (data.gender) formData.append("gender", data.gender);
  if (data.availableSize) formData.append("availableSize", data.availableSize);

  // Special pricing - use undefined check since 0 is valid
  if (data.specialPrice !== undefined && data.specialPrice !== null)
    formData.append("specialPrice", String(data.specialPrice));
  if (data.specialPriceStartingDate)
    formData.append("specialPriceStartingDate", data.specialPriceStartingDate);
  if (data.specialPriceEndingDate)
    formData.append("specialPriceEndingDate", data.specialPriceEndingDate);

  // Dimensions
  if (data.length !== undefined) formData.append("length", String(data.length));
  if (data.width !== undefined) formData.append("width", String(data.width));
  if (data.height !== undefined) formData.append("height", String(data.height));

  // Media files - only append if new files are provided
  if (media?.images?.mainImage) formData.append("mainImage", media.images.mainImage);
  if (media?.images?.sideImage) formData.append("sideImage", media.images.sideImage);
  if (media?.images?.sideImage2) formData.append("sideImage2", media.images.sideImage2);
  if (media?.images?.lastImage) formData.append("lastImage", media.images.lastImage);
  if (media?.video) formData.append("video", media.video);

  return formData;
};