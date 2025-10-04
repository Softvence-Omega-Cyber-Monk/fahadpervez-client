import { StatCardProps, StatType } from "@/types/SellerDashboardTypes/StatsCardTypes";
import { BiTrendingUp, BiTrendingDown } from "react-icons/bi";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { AiFillWarning } from "react-icons/ai";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoAlert } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";


const cardStyle: Record<string, string> = {
  up: "text-primary-green",
  warning: "text-primary-yellow",
  down: "text-primary-red",
  box: "text-primary-purple",
  check: "text-primary-green",
  plus: "text-primary-orange",
  alert: "text-primary-red",
};

const iconColor = {
  box: "bg-primary-purple/10 text-primary-purple",
  check: "bg-primary-green/10 text-primary-green",
  error: "bg-primary-red/10 text-primary-red",
  plus: "bg-primary-orange/10 text-primary-orange",
  alert: "bg-primary-red/10 text-primary-red",
};

const cardIcon: Record<string, ReactNode> = {
  up: <BiTrendingUp  />,
  warning: <AiFillWarning  />,
  down: <BiTrendingDown  />,
  box: <BsFillBoxSeamFill />,
  check: <FaCircleCheck />,
  alert: <IoAlert />,
  plus: <FaPlus />,
};

export function StatsCard({ item }: StatCardProps) {
  const {
    title,
    value,
    status,
    type,
    currency,
    buttonText,
    buttonAction,
    icon,
  } = item;

  const formatValue = (val: number, currency?: string) => {
    if (currency) {
      return `$${val.toLocaleString("en-US")}`;
    }
    return val.toLocaleString("en-US");
  };

  return (
    <div className="w-full pl-8 pr-10 py-6 flex flex-col space-y-4 border border-border rounded-2xl bg-light-background">
      {/* Header Row with optional icon */}
      <div className="flex items-center gap-2">
        {icon && <div className={`p-3 rounded-lg text-2xl ${iconColor[icon as "box" | "check" | "alert" | "plus" ]} `}>{cardIcon[icon]}</div>}
        <p className="text-light-gray">{title}</p>
      </div>

      {/* Value */}
      <h5 className={`text-3xl font-semibold ${icon? `${cardStyle[icon]}` :""}`}>{formatValue(value, currency)}</h5>

      {/* Status or Button */}
      {buttonText ? (
        <Button
          className="w-full mt-2 bg-primary-green hover:bg-primary-green/80 text-white text-sm font-medium h-9"
          onClick={buttonAction}
        >
          {buttonText}
        </Button>
      ) : 
      (
        <p className={`${cardStyle[ icon || type as StatType["type"]]} flex items-center gap-1`}>
          <span className="text-2xl">{cardIcon[type as string]}</span>
          {status}
        </p>
      )}
    </div>
  );
}

export default StatsCard;
