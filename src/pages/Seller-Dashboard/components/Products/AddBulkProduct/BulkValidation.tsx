import OrderTable from "@/common/OrderTable";
import PrimaryButton from "@/common/PrimaryButton";
import Statistics from "@/common/Statistics";
import BulkValidationData from "@/utils/SellerDashboardData/BulkValidation.json"
import { useNavigate } from "react-router-dom";


const BulkValidation = () => {
const navigate = useNavigate()
  return (
    <div className="space-y-10">
      <Statistics items={BulkValidationData}/>
      <div className="space-y-6">
        <h2 className="font-medium">Fix Products Issue</h2>
        <OrderTable/>
      <div className="flex items-center justify-start gap-6">
        <PrimaryButton type="Primary" title="Fix Warnings" className="bg-primary-yellow text-light-background px-10"/>
        <PrimaryButton type="Primary" title="Fix Critical Errors" className="bg-primary-red text-light-background px-10"/>
      </div>
      </div>
      <div className="flex items-center justify-end">
      <PrimaryButton type="Primary" title="Review & Confirm Upload" onClick={()=> navigate("/seller-dashboard/products/confirm-upload")}/>
      </div>
    </div>
  );
};

export default BulkValidation;