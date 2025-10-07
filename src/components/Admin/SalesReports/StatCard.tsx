import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  change: number;
  isPositive: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, change, isPositive }) => (
  <div className="bg-white rounded-lg p-6 border border-[#E8EAEB] min-w-[180px] flex-shrink-0">
    <p className="text-sm text-gray-600 mb-2">{label}</p>
    <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
    <div className="flex items-center gap-1">
      {isPositive ? (
        <TrendingUp size={16} className="text-green-600" />
      ) : (
        <TrendingDown size={16} className="text-red-600" />
      )}
      <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {change}%
      </span>
    </div>
  </div>
);

export default StatCard;
