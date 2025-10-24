
import { UserData, SellerRequest, ApplicationDetails, BuyerDetails } from './types';

export const DUMMY_USERS: UserData[] = [
  { id: 'b1', name: 'Cody Fisher', email: 'john.doe@email.com', phone: '(209) 555-0104', total: 2161, status: 'Active', joinOn: '30/10/2021', type: 'Buyer', avatarUrl: 'https://placehold.co/32x32/1e40af/ffffff?text=CF' },
  { id: 'b2', name: 'Jerome Bell', email: 'sarah.wilson@email.com', phone: '(702) 555-0122', total: 1861, status: 'Active', joinOn: '30/10/2021', type: 'Buyer', avatarUrl: 'https://placehold.co/32x32/166534/ffffff?text=JB' },
  { id: 's1', name: 'Jacob Jones', email: 'admin@store.com', phone: '(808) 555-0111', total: 681, status: 'Active', joinOn: '30/10/2021', type: 'Seller', avatarUrl: 'https://placehold.co/32x32/9d174d/ffffff?text=JJ', products: 74 },
  { id: 'b3', name: 'Albert Flores', email: 'contact@company.com', phone: '(307) 555-0101', total: 1450, status: 'Active', joinOn: '30/10/2021', type: 'Buyer', avatarUrl: 'https://placehold.co/32x32/f97316/ffffff?text=AF' },
  { id: 's2', name: 'Theresa Webb', email: 'info@service.org', phone: '(307) 555-0133', total: 3200, status: 'Active', joinOn: '30/10/2021', type: 'Seller', avatarUrl: 'https://placehold.co/32x32/6d28d9/ffffff?text=TW', products: 58 },
  { id: 'b4', name: 'Devon Lane', email: 'support@helpdesk.net', phone: '(405) 555-0128', total: 1980, status: 'Active', joinOn: '30/10/2021', type: 'Buyer', avatarUrl: 'https://placehold.co/32x32/0891b2/ffffff?text=DL' },
  { id: 's3', name: 'Courtney Henry', email: 'marketing@business.com', phone: '(270) 555-0117', total: 750, status: 'Active', joinOn: '30/10/2021', type: 'Seller', avatarUrl: 'https://placehold.co/32x32/ef4444/ffffff?text=CH', products: 32 },
  { id: 'b5', name: 'Ralph Edwards', email: 'feedback@community.org', phone: '(671) 555-0110', total: 980, status: 'Active', joinOn: '30/10/2021', type: 'Buyer', avatarUrl: 'https://placehold.co/32x32/15803d/ffffff?text=RE' },
  { id: 's4', name: 'Wade Warren', email: 'sales@ecommerce.com', phone: '(302) 555-0107', total: 1120, status: 'Active', joinOn: '30/10/2021', type: 'Seller', avatarUrl: 'https://placehold.co/32x32/c2410c/ffffff?text=WW', products: 29 },
  { id: 'b6', name: 'Arlene McCoy', email: 'hello@website.com', phone: '(252) 555-0126', total: 4020, status: 'Active', joinOn: '30/10/2021', type: 'Buyer', avatarUrl: 'https://placehold.co/32x32/5b21b6/ffffff?text=AM' },
];

export const DUMMY_REQUESTS: SellerRequest[] = [
  { id: 'req1', applicantName: 'Wade Warren', businessName: 'The Cozy Corner', submissionDate: '30/10/2021', status: 'Pending', applicationDetailsId: 'app1' },
  { id: 'req2', applicantName: 'Savannah Nguyen', businessName: 'Leo\'s Tech Store', submissionDate: '30/10/2021', status: 'Pending', applicationDetailsId: 'app2' },
  { id: 'req3', applicantName: 'Marvin McKinney', businessName: 'Smith\'s Essentials', submissionDate: '30/10/2021', status: 'Pending', applicationDetailsId: 'app3' },
  { id: 'req4', applicantName: 'Brooklyn Simmons', businessName: 'Doe\'s Goods & Co.', submissionDate: '30/10/2021', status: 'Pending', applicationDetailsId: 'app4' },
  { id: 'req5', applicantName: 'Albert Flores', businessName: 'Leo\'s Tech Store', submissionDate: '30/10/2021', status: 'Pending', applicationDetailsId: 'app5' },
];

export const DUMMY_APPLICATION_DETAIL: ApplicationDetails = {
  id: 'app4',
  fullName: 'Wade Warren',
  email: 'john.doe@example.com',
  phoneNumber: '+1 555-123-4567',
  businessName: 'Doe\'s Goods & Co.',
  businessType: 'Retail',
  description: 'We sell high-quality, handcrafted goods and accessories. Our products are ethically sourced and designed for long-lasting use.',
  crNumber: '123456789',
  crDocumentsLink: '#',
  productCategories: 'Analgesics, Cardiovascular Medications',
  shippingLocations: 'Local within city state, National within country, International',
  storeDescription: 'Our store specializes in organic and sustainable health products, ensuring our customers receive the best quality. We prioritize eco-friendly packaging and fast, reliable shipping worldwide.',
  paymentMethod: 'Bank Account',
  bankDetails: {
    name: 'John Doe',
    account: '********1234',
    routing: '987654321',
  },
  termsAccepted: true,
  signatureLink: '#',
};

export const DUMMY_BUYER_DETAIL: BuyerDetails = {
  id: 'b1',
  name: 'Jane Cooper',
  joinDate: 'May, 2019',
  location: 'Sunnyvale, California, USA',
  email: 'pangeti@gmail.com',
  phone: '+00 123 456 789',
  address: 'Sunnyvale, California, USA',
  orderComplete: 122,
  orderCancel: 25,
  buyAmount: 6000,
  avatarUrl: 'https://placehold.co/96x96/8b5cf6/ffffff?text=JC',
};
