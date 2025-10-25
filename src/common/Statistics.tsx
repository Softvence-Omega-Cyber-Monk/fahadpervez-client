import { StatCardTypes } from "@/types/SellerDashboardTypes/StatsCardTypes";
import StatsCard from "./StatsCard";
import { useGetMyOrdersQuery, useGetMyOrderStatsQuery } from "@/Redux/Features/Order/Order";
import { useGetMeQuery } from "@/Redux/Features/auth/auth.api";

interface StatisticsProps {
  items: StatCardTypes[];
}

const Statistics: React.FC<StatisticsProps> = (props) => {
  const {data} = useGetMyOrderStatsQuery({});
  const {data:order} = useGetMyOrdersQuery({});
  const {data:user} = useGetMeQuery({});

  console.log(data,order,user)
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      {props?.items?.map((item, idx) => (
        <StatsCard item={item} key={item.id || idx} />
      ))}
    </div>
  );
};

export default Statistics;
