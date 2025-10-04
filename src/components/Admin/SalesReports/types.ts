export interface StatCardType {
  label: string;
  value: string;
  change: number;
  isPositive: boolean;
}

export interface OrderSummaryType {
  status: string;
  count: number;
  percentage: string;
  color: string;
}

export interface LowStockType {
  name: string;
  stock: number;
  color: string;
}

export interface SalesTimePeriodType {
  date: string;
  orders: number;
  revenue: string;
  aov: string;
  growth: string;
  isPositive: boolean;
}
