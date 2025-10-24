// src/components/Admin/SalesReports/data.ts

export const statsCards = [
  { label: 'Total Sales', value: '$247,850', change: 13.65, isPositive: true },
  { label: 'Total Orders', value: '1,247', change: 13.65, isPositive: true },
  { label: 'Avg. Order Value', value: '$38.41', change: 13.65, isPositive: false },
  { label: 'Product Sold', value: '2,156', change: 13.65, isPositive: true },
  { label: 'Active Users', value: '892', change: 13.65, isPositive: false },
];

export const orderSummary = [
  { status: 'Preparing for Shipment', count: 75, percentage: '10%', color: 'bg-orange-100 text-orange-700' },
  { status: 'Delivered', count: 150, percentage: '15%', color: 'bg-green-100 text-green-700' },
  { status: 'Order placed', count: 100, percentage: '20%', color: 'bg-purple-100 text-purple-700' },
  { status: 'Cancelled', count: 125, percentage: '10%', color: 'bg-red-100 text-red-700' },
  { status: 'Delivered', count: 180, percentage: '25%', color: 'bg-green-100 text-green-700' },
  { status: 'Out of delivery', count: 90, percentage: '20%', color: 'bg-cyan-100 text-cyan-700' },
];

export const lowStockAlerts = [
  { name: 'Aspirin', stock: 80, color: 'bg-green-500' },
  { name: 'Metformin', stock: 80, color: 'bg-green-500' },
  { name: 'Lisinopril', stock: 40, color: 'bg-orange-500' },
  { name: 'Amoxicillin', stock: 0, color: 'bg-gray-300' },
  { name: 'Simvastatin', stock: 80, color: 'bg-green-500' },
  { name: 'Ibuprofen', stock: 80, color: 'bg-green-500' },
];

export const salesByTimePeriod = [
  { date: 'Jan 15, 2025', orders: 75, revenue: '$1,075', aov: '$38.41', growth: '10%', isPositive: true },
  { date: 'Jan 15, 2025', orders: 150, revenue: '$1,150', aov: '$38.41', growth: '15%', isPositive: true },
  { date: 'Jan 15, 2025', orders: 100, revenue: '$1,100', aov: '$38.41', growth: '20%', isPositive: true },
  { date: 'Jan 15, 2025', orders: 125, revenue: '$1,125', aov: '$38.41', growth: '-10%', isPositive: false },
  { date: 'Jan 15, 2025', orders: 180, revenue: '$1,180', aov: '$38.41', growth: '25%', isPositive: true },
  { date: 'Jan 15, 2025', orders: 90, revenue: '$1,090', aov: '$38.41', growth: '20%', isPositive: true },
];
