import React from 'react';

interface DetailCardProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const DetailCard: React.FC<DetailCardProps> = ({ title, children, icon }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
      <h3 className="text-base font-semibold text-gray-900">{title}</h3>
      {icon && <div className="text-blue-600">{icon}</div>}
    </div>
    <div className="space-y-3 text-sm text-gray-700">
      {children}
    </div>
  </div>
);

export default DetailCard;
