import { MediaData } from "@/types/SellerDashboardTypes/MediaUpload";
import { ProductFormValues } from "./ProductForm";


 export const buildFormData = (data: ProductFormValues, media: MediaData,categoryId : string): FormData => {
      const formData = new FormData();
      formData.append("productName", data.productName);
      formData.append("productCategory", categoryId);
      formData.append("productSKU", data.productSKU);
      formData.append("productDescription", data.productDescription);
      formData.append("stock", String(data.stock));
      formData.append("currency", data.currency);
      formData.append("pricePerUnit", String(data.pricePerUnit));
      formData.append("weight", String(data.weight));

      // Optional text fields
      if (data.companyName) formData.append("companyName", data.companyName);
      if (data.gender) formData.append("gender", data.gender);
      if (data.availableSize) formData.append("availableSize", data.availableSize);

      // Special pricing
      if (data.specialPrice !== undefined) {
        formData.append("specialPrice", String(data.specialPrice));
      }
      if (data.specialPriceStartingDate) {
        formData.append("specialPriceStartingDate", data.specialPriceStartingDate);
      }
      if (data.specialPriceEndingDate) {
        formData.append("specialPriceEndingDate", data.specialPriceEndingDate);
      }

      // Dimensions
      if (data.length !== undefined) formData.append("length", String(data.length));
      if (data.width !== undefined) formData.append("width", String(data.width));
      if (data.height !== undefined) formData.append("height", String(data.height));

      // Media files
      if (media.images.mainImage) formData.append("mainImage", media.images.mainImage);
      if (media.images.sideImage) formData.append("sideImage", media.images.sideImage);
      if (media.images.sideImage2) formData.append("sideImage2", media.images.sideImage2);
      if (media.images.lastImage) formData.append("lastImage", media.images.lastImage);
      if (media.video) formData.append("video", media.video);

      // Removed default images
    //   if (media.removedDefaultImageIds && media.removedDefaultImageIds.length > 0) {
    //     formData.append("removedDefaultImageIds", JSON.stringify(media.removedDefaultImageIds));
    //   }

      return formData;
}

