import Statistics from "@/common/Statistics";
import ConfirmUploadData from "@/utils/SellerDashboardData/ConfirmUpload.json"
import BulkUploadSummary from "./BulkUploadSummary";


const ConfirmUpload = () => {

  return (
    <div className="space-y-10">
      <Statistics items={ConfirmUploadData}/>
      <BulkUploadSummary/>
    </div>
  );
};

export default ConfirmUpload;