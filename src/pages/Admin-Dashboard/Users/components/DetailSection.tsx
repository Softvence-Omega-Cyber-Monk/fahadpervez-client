
import React from 'react';

interface DetailSectionProps {
  title: string;
  children: React.ReactNode;
}

const DetailSection: React.FC<DetailSectionProps> = ({ title, children }) => (
  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-6">
    <h4 className="text-base font-bold text-gray-800 mb-4">{title}</h4>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
      {children}
    </div>
  </div>
);

export default DetailSection;
