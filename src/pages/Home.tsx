import CommonWrapper from "../common/CommonWrapper";
import StatsCard from "@/components/SellerDashboardComponents/DashboardComponent/StatsCard";

import StatCard from "@/utils/SellerDashboardData/StatsCard.json"

const Home = () => {


  return (
    <CommonWrapper>
      <div className="grid grid-cols-4 gap-10">
      {
        StatCard.map((item)=>(
          <StatsCard item={item}/>
        ))
      }
      </div>
    </CommonWrapper>
  );
};

export default Home;
