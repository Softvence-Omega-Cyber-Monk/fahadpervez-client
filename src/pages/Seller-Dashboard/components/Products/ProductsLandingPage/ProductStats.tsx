import Statistics from "@/common/Statistics";
import fileAnalysisData from "@/utils/SellerDashboardData/ProductStatsCard.json";

const ProductStats = () => {
  return (
    <div className="">
      <Statistics items={fileAnalysisData}/>
    </div>
  );
};

export default ProductStats;
