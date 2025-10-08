import { PaymentStatsCards } from "./PaymentStatsCards";
import { OrdersTable } from "./OrdersTable";
import { HoldingAmountCards } from "./HoldingAmountCards";
import { ShippingCostTable } from "./ShippingCostTable";
import { PlatformCommissionTable } from "./PlatformCommissionTable";

export default function PaymentsDasbord() {
  return (
    <div className="min-h-screen pl-4">
  <h2 className="text-3xl font-bold text-[#1C2A33] mb-6">Payment</h2>

      <div className=" mx-auto space-y-8">
        <PaymentStatsCards />
        <HoldingAmountCards />
       
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
          <ShippingCostTable />
          <PlatformCommissionTable />
        </div>
         <OrdersTable />
      </div>
    </div>
  );
}
