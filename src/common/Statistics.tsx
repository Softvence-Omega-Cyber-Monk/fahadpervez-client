import { StatCardTypes } from "@/types/SellerDashboardTypes/StatsCardTypes";
import StatsCard from "./StatsCard";

interface StatisticsProps {
  items: StatCardTypes[];
}

const Statistics: React.FC<StatisticsProps> = (props) => {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      {props?.items?.map((item, idx) => (
        <StatsCard item={item} key={item.id || idx} />
      ))}
    </div>
  );
};

export default Statistics;
