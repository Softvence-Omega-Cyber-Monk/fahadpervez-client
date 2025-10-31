export type userId = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

export interface Product {
  userId: any;
  _id?: string;
  productName: string;
  productCategory: string;
  productSKU: string;
  companyName: string;
  gender: string;
  availableSize: string;
  productDescription: string;
  stock: number;
  currency: string;
  pricePerUnit: number;
  specialPrice?: number;
  specialPriceStartingDate?: string;
  specialPriceEndingDate?: string;
  mainImage?: string;
  seller?: {
    name: string;
    phone: string;
    email: string;
    location: string;
  };
  userId: userId;
  sideImage?: string;
  sideImage2?: string;
  lastImage?: string;
  mainImageUrl?: string;
  sideImageUrl?: string;
  sideImage2Url?: string;
  lastImageUrl?: string;
  video?: string;
  videoUrl?: string;
  length?: number;
  width?: number;
  height?: number;
  weight: number;
  status?: string;
  issues?: { type: "error" | "warning" | "valid"; message: string }[];
}
