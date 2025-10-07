import React from 'react';
import { Message } from '@/types/messageTypes';

interface MessageListItemProps extends Message {
  isSelected?: boolean;
  onClick: () => void;
}

const MessageListItem: React.FC<MessageListItemProps> = ({
  name,
  description,
  date,
  isSelected = false,
  unread = false,
  onClick,
}) => (
  <div
    className={`flex items-center p-3 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors duration-200 ${
      isSelected ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
    }`}
    onClick={onClick}
  >
    <div className="relative">
      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mr-2 sm:mr-3 flex-shrink-0 flex items-center justify-center text-white font-semibold text-sm">
        {name.charAt(0).toUpperCase()}
      </div>
      {unread && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
      )}
    </div>

    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-start">
        <span className={`font-semibold text-xs sm:text-sm ${isSelected ? 'text-blue-700' : 'text-gray-900'}`}>
          {name}
        </span>
        <span className="text-xs text-gray-500 ml-2 flex-shrink-0">{date}</span>
      </div>
      <p className={`text-xs truncate ${isSelected ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
        {description}
      </p>
    </div>
  </div>
);

export default MessageListItem;
