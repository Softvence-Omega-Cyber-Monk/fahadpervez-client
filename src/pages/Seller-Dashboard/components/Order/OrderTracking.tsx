import HelpCard from "./HelpCard";
import OrderSteps from "./OrderSteps";
import PaymentInformation from "./PyamentInformation";
import RecentOrderStatus from "./RecentOrderStatus";
import ShippingInformation from "./ShippintInfromation";

const OrderTracking = () => {
  return (
    <div>
      <RecentOrderStatus />
      <OrderSteps/>
      <div className="grid grid-cols-2 gap-6">
        <ShippingInformation/>
        <div className="space-y-6">
            <PaymentInformation/>
            <HelpCard/>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
