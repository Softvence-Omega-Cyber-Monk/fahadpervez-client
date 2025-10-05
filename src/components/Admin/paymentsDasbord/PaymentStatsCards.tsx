import { TrendingUp, TrendingDown } from "lucide-react";

interface PaymentStat {
  label: string;
  value: string;
  change: number;
  isPositive: boolean;
}

export const PaymentStatsCards: React.FC = () => {
  const stats: PaymentStat[] = [
    { label: "Total earning amount", value: "$45,726", change: 13.65, isPositive: true },
    { label: "Sellers amount", value: "$12,56,250", change: 13.65, isPositive: true },
    { label: "Total shipping cost", value: "$38.41", change: 13.65, isPositive: false },
    { label: "Platform Commission (10%)", value: "$2,156", change: 13.65, isPositive: true },
  ];

  return (
    <div>
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {stats.map(({ label, value, change, isPositive }) => (
          <div key={label} className="bg-white rounded-lg p-6 border border-gray-200">
            <p className="text-bash text-gray-500 mb-3">{label}</p>
            <p className="text-4xl font-semibold text-gray-900 mb-3">{value}</p>
            <div className="flex items-center gap-1">
              {isPositive ? (
                <TrendingUp size={18} className="text-green-600" />
              ) : (
                <TrendingDown size={18} className="text-red-600" />
              )}
              <span className={`text-bash font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}>
                {change}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
