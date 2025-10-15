import Statistics from "@/common/Statistics";
import ConfirmUploadData from "@/utils/SellerDashboardData/ConfirmUpload.json"
import BulkUploadSummary from "./BulkUploadSummary";
import { useAppSelector } from "@/hooks/useRedux";


const ConfirmUpload = () => {
  const products = useAppSelector((state) => state.product.bulkProduct)

  const newProducts = products.map(({status, issues, ...rest}) => rest)


  return (
    <div className="space-y-10">
      <Statistics items={ConfirmUploadData}/>
      <BulkUploadSummary data={newProducts}/>
    </div>
  );
};

export default ConfirmUpload;