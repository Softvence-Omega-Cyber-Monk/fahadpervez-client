


// --- TYPE DEFINITIONS & MOCK DATA ---

export type OrderStatus = 'placed' | 'delivery' | 'cancelled' | 'preparing' | 'delivered';
export type Tab = 'All Order' | 'Pending order' | 'Complete Order' | 'Cancel Order';
export type View = 'list' | 'details';

export interface Product {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  pricePerUnit: number;
}

export interface Order {
  id: string;
  buyer: { name: string; phone: string; email: string; location: string };
  seller: { name: string; phone: string; email: string; location: string };
  date: string;
  status: OrderStatus;
  amount: number;
  products: Product[];
  shipping: {
    payment: string;
    carrier: string;
    location: string;
    method: string;
    phone: string;
  };
  details: {
    time: string;
    date: string;
    delivery: number;
    total: number;
    paymentStatus: string;
  };
  timeline: { step: string; status: 'complete' | 'active' | 'pending'; date: string; time?: string; estimate?: string }[];
}

export const mockOrders: Order[] = [
  {
    id: 'ORD-2025-547',
    buyer: { name: 'Cody Fisher', phone: '(319) 555-0115', email: 'codyf@gmail.com', location: '6391 Elgin St. Celina, Delaware 10299' },
    seller: { name: 'Besile Cooper', phone: '(256) 359-0153', email: 'besileco@gmail.com', location: '6391 Elgin St. Celina, Delaware 10299' },
    date: '5/21/19',
    status: 'placed',
    amount: 11.70,
    shipping: { payment: 'Visa card **** 0115', carrier: 'DHL Express', location: '3517 W. Gray St. Utica, Pennsylvania 57867', method: 'DHL Express', phone: '(219) 555-0114' },
    details: { time: '1:45 PM', date: 'Wed, Sep 12, 2025', delivery: 2.00, total: 96.00, paymentStatus: 'Paid' },
    products: [
      { id: '1', name: 'Climatidine', sku: 'SKU_SP-A0025-BLK', quantity: 9, pricePerUnit: 8 },
      { id: '2', name: 'Paracetamol', sku: 'SKU_SP-A0025-BLK', quantity: 6, pricePerUnit: 6 },
      { id: '3', name: 'Omeprazole', sku: 'SKU_SP-A0025-BLK', quantity: 3, pricePerUnit: 2 },
    ],
    timeline: [
      { step: 'Order placed', status: 'complete', date: '17 June, 2025', time: '3:50 pm' },
      { step: 'Preparing for shipment', status: 'active', date: '17 June, 2025', time: '9:00 pm' },
      { step: 'Out of delivery', status: 'pending', date: '21 June, 2025', estimate: 'Estimate' },
      { step: 'Delivered', status: 'pending', date: '21 June, 2025', estimate: 'Estimate' },
    ]
  },
  {
    id: 'ORD-2025-482',
    buyer: { name: 'Ronald Richards', phone: '(39) 555-0155', email: 'ronald@gmail.com', location: '6391 Elgin St. Celina, Delaware 10299' },
    seller: { name: 'Cameron', phone: '(25) 359-0533', email: 'cameron@gmail.com', location: '6391 Elgin St. Celina, Delaware 10299' },
    date: '7/18/17',
    status: 'delivery',
    amount: 5.22,
    products: [{ id: '4', name: 'Banitidine', sku: 'SKU_SP-A0025-BLK', quantity: 2, pricePerUnit: 2.61 }],
    shipping: { payment: 'Visa card **** 0155', carrier: 'DHL Express', location: '3517 W. Gray St. Utica, Pennsylvania 57867', method: 'DHL Express', phone: '(218) 555-0114' },
    details: { time: '2:55 PM', date: 'Wed, Sep 12, 2025', delivery: 2.00, total: 7.22, paymentStatus: 'Paid' },
    timeline: []
  },
  {
    id: 'ORD-2025-763',
    buyer: { name: 'Brooklyn Simmons', phone: '(319) 555-0115', email: 'brooklyn@gmail.com', location: '6391 Elgin St. Celina, Delaware 10299' },
    seller: { name: 'Arlene McCoy', phone: '(256) 359-0153', email: 'arlene@gmail.com', location: '6391 Elgin St. Celina, Delaware 10299' },
    date: '2/1/12',
    status: 'cancelled',
    amount: 14.81,
    products: [{ id: '5', name: 'Omeprazole', sku: 'SKU_SP-A0025-BLK', quantity: 3, pricePerUnit: 4.94 }],
    shipping: { payment: 'Visa card **** 0115', carrier: 'DHL Express', location: '3517 W. Gray St. Utica, Pennsylvania 57867', method: 'DHL Express', phone: '(219) 555-0114' },
    details: { time: '1:45 PM', date: 'Wed, Sep 12, 2025', delivery: 2.00, total: 16.81, paymentStatus: 'Refunded' },
    timeline: []
  },
  {
    id: 'ORD-2025-159',
    buyer: { name: 'Courtney Henry', phone: '(319) 555-0115', email: 'courtney@gmail.com', location: '6391 Elgin St. Celina, Delaware 10299' },
    seller: { name: 'Theresa Webb', phone: '(256) 359-0153', email: 'theresa@gmail.com', location: '6391 Elgin St. Celina, Delaware 10299' },
    date: '7/27/13',
    status: 'delivered',
    amount: 6.48,
    products: [{ id: '6', name: 'Piterraegine', sku: 'SKU_SP-A0025-BLK', quantity: 1, pricePerUnit: 6.48 }],
    shipping: { payment: 'Visa card **** 0115', carrier: 'DHL Express', location: '3517 W. Gray St. Utica, Pennsylvania 57867', method: 'DHL Express', phone: '(219) 555-0114' },
    details: { time: '1:45 PM', date: 'Wed, Sep 12, 2025', delivery: 2.00, total: 8.48, paymentStatus: 'Paid' },
    timeline: []
  },
];
