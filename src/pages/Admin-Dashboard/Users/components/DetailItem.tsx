
import React from 'react';

interface DetailItemProps {
  label: string;
  value: string | React.ReactNode;
  isWide?: boolean;
}

const DetailItem: React.FC<DetailItemProps> = ({ label, value, isWide = false }) => (
  <div className={`py-2 ${isWide ? 'md:col-span-2' : ''}`}>
    <p className="text-sm font-medium text-gray-500 mb-0.5">{label}</p>
    {/* CHANGED FROM <p> TO <div> to fix nesting error when value is complex */}
    <div className="text-gray-900">{value}</div>
  </div>
);

export default DetailItem;
