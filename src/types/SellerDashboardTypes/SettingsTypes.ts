// Additional types needed for complete data structure

type PaymentMethod = "BANK_TRANSFER" | "CREDIT_CARD" | "PAYPAL" | "STRIPE";

export interface CategoryType {
  _id?: string;
  categoryName: string;
  imageUrl?: string;
  cloudinaryId?: string;
}


export interface BasicInformation {
  name: string;
  phone: string;
  email: string;
  country: string;
  language: string;
  address: string;
  role: "ADMIN" | "VENDOR" | "CUSTOMER";
}

export interface BusinessInformation {
  businessName: string;
  businessType: string;
  phone: string;
  businessDescription: string;
}

export interface CurrencyAndShippingInformation {
  currency: string;
  shippingLocation: string[];
  country: string;
  holdingTime: number;
  storeDescription: string;
  productCategory: string[];
}

export interface PaymentMethodInfo {
  defaultPaymentMethod: PaymentMethod;
  bankAccountHolderName: string;
  bankAccountNumber: string;
  bankRoughingNumber: string;
}

export interface TaxInformation {
  taxId: string;
}

export interface Notifications {
  orderNotification: string;
  promotionNotification: string;
  communicationAlert: string;
  newReviewsNotification: string;
}

export interface Security {
  isActive: boolean;
  isVerified: boolean;
  isPrivacyPolicyAccepted: boolean;
  isSellerPolicyAccepted: boolean;
  vendorSignature: string;
  vendorContract: string;
}


export interface UserFormData extends BasicInformation, BusinessInformation, CurrencyAndShippingInformation, PaymentMethodInfo, TaxInformation, Notifications {
  // Currency & Shipping
  currency: string;
  storeDescription: string;
}


