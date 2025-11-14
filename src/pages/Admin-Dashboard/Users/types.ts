
export type UserType = 'Buyer' | 'Seller';
export type UserStatus = 'Active' | 'Inactive' | 'Suspended';
export type RequestStatus = 'Pending' | 'Approved' | 'Rejected';
export type View = 'Dashboard' | 'BuyerDetail' | 'SellerRequests' | 'SellerReview' | 'NotFound';

export interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  total: number; // Buy or Sell total
  status: UserStatus;
  joinOn: string;
  type: UserType;
  avatarUrl: string;
  products?: number; // Only for sellers
}

export interface IBayersData {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  isActive: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  productCategory: string[];
  shippingLocation: string[];
  __v: number;
}

export interface SellerRequest {
  id: string;
  applicantName: string;
  businessName: string;
  submissionDate: string;
  status: RequestStatus;
  applicationDetailsId: string; // Link to the detailed application
}

export interface ApplicationDetails {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  businessName: string;
  businessType: string;
  description: string;
  crNumber: string;
  crDocumentsLink: string;
  productCategories: string;
  shippingLocations: string;
  storeDescription: string;
  paymentMethod: string;
  bankDetails: {
    name: string;
    account: string;
    routing: string;
  };
  termsAccepted: boolean;
  signatureLink: string;
}

export interface BuyerDetails {
  id: string;
  name: string;
  joinDate: string;
  location: string;
  email: string;
  phone: string;
  address: string;
  orderComplete: number;
  orderCancel: number;
  buyAmount: number;
  avatarUrl: string;
}


