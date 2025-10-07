
import React from 'react';
import { UserStatus, RequestStatus } from '../types';

interface BadgeProps {
  status: UserStatus | RequestStatus;
}

const Badge: React.FC<BadgeProps> = ({ status }) => {
  let colorClass = '';
  switch (status) {
    case 'Active':
    case 'Approved':
      colorClass = 'bg-green-100 text-green-700';
      break;
    case 'Pending':
      colorClass = 'bg-amber-100 text-amber-700';
      break;
    case 'Inactive':
    case 'Suspended':
    case 'Rejected':
      colorClass = 'bg-red-100 text-red-700';
      break;
    default:
      colorClass = 'bg-gray-100 text-gray-700';
  }
  return (
    <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${colorClass}`}>
      {status}
    </span>
  );
};

export default Badge;
