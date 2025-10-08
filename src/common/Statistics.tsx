import { StatCardTypes } from "@/types/SellerDashboardTypes/StatsCardTypes";
import StatsCard from "./StatsCard";

interface StatisticsProps {
  items: StatCardTypes[];
}

const Statistics: React.FC<StatisticsProps> = (props) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {props?.items?.map((item) => (
        <StatsCard item={item}  />
      ))}
    </div>
  );
};

export default Statistics;
