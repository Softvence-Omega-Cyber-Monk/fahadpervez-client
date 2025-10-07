import { useState } from 'react';
import Filters from './Filters';
import StatsCards from './StatsCards';
import OrderSummary from './OrderSummary';
import LowStockAlerts from './LowStockAlerts';
import SalesByTimePeriod from './SalesByTimePeriod';
import { statsCards, orderSummary, lowStockAlerts, salesByTimePeriod } from './data';

const SalesReportCard = () => {
  const [dateRange, setDateRange] = useState('Last 7 Days');
  const [orderStatus, setOrderStatus] = useState('All Statuses');
  const [category, setCategory] = useState('All Category');

  const handleApplyFilters = () =>
    console.log('Filters applied', { dateRange, orderStatus, category });

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-8 lg:px-12 py-6">
      <div className="flex flex-col gap-8">
        <Filters
          dateRange={dateRange}
          orderStatus={orderStatus}
          category={category}
          setDateRange={setDateRange}
          setOrderStatus={setOrderStatus}
          setCategory={setCategory}
          onApply={handleApplyFilters}
        />
      </div>

      <div className="mt-6">
        <StatsCards stats={statsCards} />
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <OrderSummary data={orderSummary} />
        <LowStockAlerts data={lowStockAlerts} />
      </div>

      <div className="mt-6">
        <SalesByTimePeriod data={salesByTimePeriod} />
      </div>
    </div>
  );
};

export default SalesReportCard;
