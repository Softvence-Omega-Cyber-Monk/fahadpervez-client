import { StatCardProps } from "@/types/SellerDashboardTypes/StatsCardTypes";
import { ReactNode } from "react";
import { BiTrendingUp } from "react-icons/bi";
import { BiTrendingDown } from "react-icons/bi";
import { AiFillWarning } from "react-icons/ai";



const StatsCard: React.FC<StatCardProps> = (props) => {
  const { title, value, status, type, currency } = props.item;

  const cardStyle: Record<string, string> = {
    up: "text-primary-green",
    warning: "text-primary-yellow",
    down: "text-primary-red",
  };
  const cardIcon: Record<string, ReactNode> = {
    up:<BiTrendingUp className="size-6"/>,
    warning:<AiFillWarning className="size-6"/>,
    down:<BiTrendingDown className="size-6"/>,
  };

  return (
    <div className="w-full pl-8 pr-10 py-6 flex flex-col space-y-4 border border-border rounded-2xl bg-light-background">
      <p className="text-light-gray">{title}</p>
      <h5 className="text-3xl font-semibold">
        {currency && "$"}
        {value.toLocaleString("en-US")}
      </h5>
      <p className={` ${cardStyle[type as string]} flex items-center gap-1`}>{cardIcon[type as string]}{status}</p>
    </div>
  );
};

export default StatsCard;
