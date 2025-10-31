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
  profileImage?: string;
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
  storeBanner: string;
  currency: string;
  shippingLocation: string[];
  country: string;
  holdingTime: number;
  storeDescription: string;
  productCategory: string[];
}

export interface PaymentMethodInfo {
  defaultPaymentMethod: PaymentMethod | string;
  bankAccountHolderName: string;
  bankAccountNumber: string;
  bankRoutingNumber: string;
  bankName?: string;
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

export interface UserFormData
  extends BasicInformation,
    BusinessInformation,
    CurrencyAndShippingInformation,
    PaymentMethodInfo,
    TaxInformation,
    Notifications {
  _id?: string;
  // Currency & Shipping
  currency: string;
  storeDescription: string;
  isActive?: boolean;
  totalBuy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PlatformDataType {
  siteName: string;
  websiteLanguage: string;
  timeZone: string;
  currency: string;
  logo: string;
}

export interface PrivacyTypes {
  privacyPolicy : string;
  termsAndConditions : string;
}
