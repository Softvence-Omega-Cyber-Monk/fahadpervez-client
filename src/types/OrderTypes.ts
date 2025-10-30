export interface Order {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  orderNumber: string;
  shippingAddress: {
    fullName: string;
    mobileNumber: string;
    country: string;
    addressSpecific: string;
    city: string;
    state: string;
    zipCode: string;
  };
  products: {
    productId: {
      _id: string;
      productName: string;
      pricePerUnit: number;
      specialPrice?: number;
      mainImageUrl: string;
    };
    quantity: number;
    price: number;
    total: number;
  }[];
  totalPrice: number;
  shippingFee: number;
  discount: number;
  tax: number;
  grandTotal: number;
  promoCode?: string;
  estimatedDeliveryDate: string; // ISO date string
  actualDeliveryDate?: string | null;
  status: string;
  paymentStatus: string;
  shippingMethodId: {
    _id: string;
    name: string;
    code: string;
    trackingUrl: string;
  };
  transactionId: string;
  orderNotes?: string;
  trackingNumber?: string | null;
  statusHistory: {
    status: string;
    timestamp: string;
    note: string;
  }[];
  createdAt: string;
  updatedAt: string;
  __v?: number;
}
