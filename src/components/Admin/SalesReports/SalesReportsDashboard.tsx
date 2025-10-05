import { useState } from 'react';
import Filters from './Filters';
import StatsCards from './StatsCards';
import OrderSummary from './OrderSummary';
import LowStockAlerts from './LowStockAlerts';
import SalesByTimePeriod from './SalesByTimePeriod';
import { statsCards, orderSummary, lowStockAlerts, salesByTimePeriod } from './data';
import FiltersExport from './FiltersExport';

const SalesReportsDashboard = () => {
  const [dateRange, setDateRange] = useState('Last 7 Days');
  const [orderStatus, setOrderStatus] = useState('All Statuses');
  const [category, setCategory] = useState('All Category');

  const handleExport = () => alert('Export clicked');
  const handleApplyFilters = () => {
    const filters = { dateRange, orderStatus, category };
    alert('Filters applied:\n' + JSON.stringify(filters, null, 2));
    // call the callback if provided
  };

  return (
    <div className="px-4 md:px-8 lg:px-12">
      <div className="flex flex-col gap-12">
        <FiltersExport
          handleExport={handleExport}
          title="Sales & Reports"
          subtitle="Monitor your sales performance and generate reports"
        />
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

      <StatsCards stats={statsCards} />

      <div className="py-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <OrderSummary data={orderSummary} />
        <LowStockAlerts data={lowStockAlerts} />
      </div>

      <div className=" ">
        <SalesByTimePeriod data={salesByTimePeriod} />
      </div>
    </div>
  );
};

export default SalesReportsDashboard;
