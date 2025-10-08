import { StatCardTypes } from "@/types/SellerDashboardTypes/StatsCardTypes";
import StatsCard from "./StatsCard";

interface StatisticsProps {
  items: StatCardTypes[];
}

const Statistics: React.FC<StatisticsProps> = (props) => {
  return (
<<<<<<< HEAD
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
=======
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
>>>>>>> 693d731ea218717a87176e3d022116ddb03a6f14
      {props?.items?.map((item) => (
        <StatsCard item={item}  />
      ))}
    </div>
  );
};

export default Statistics;
