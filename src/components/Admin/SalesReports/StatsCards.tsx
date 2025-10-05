import StatCard from './StatCard';

interface StatsCardsProps {
  stats: { label: string; value: string; change: number; isPositive: boolean }[];
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => (
  <div className="py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
    {stats.map((stat, idx) => (
      <StatCard key={idx} {...stat} />
    ))}
  </div>
);

export default StatsCards;
