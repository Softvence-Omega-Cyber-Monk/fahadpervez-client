export interface Product {
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
  sideImage?: string;  
  sideImage2?: string; 
  lastImage?: string;  
  video?: string;      
  length?: number;
  width?: number;
  height?: number;
  weight: number;
}
