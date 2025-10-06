import React from 'react';
import { Search } from 'lucide-react';
import MessageListItem from './MessageListItem';
import { Message as MessageType } from '@/types/messageTypes';

interface MessageListProps {
  isMobileChatOpen: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredMessages: MessageType[];
  selectedChat: string | null;
  handleMessageSelect: (messageId: string) => void;
}

const MessageList: React.FC<MessageListProps> = ({
  isMobileChatOpen,
  searchQuery,
  setSearchQuery,
  filteredMessages,
  selectedChat,
  handleMessageSelect,
}) => {
  return (
    <div className={`w-full md:w-[320px] lg:w-1/3 border-r border-gray-200 bg-white flex flex-col flex-shrink-0 transition-all duration-300 ${
      isMobileChatOpen ? 'hidden md:flex' : 'flex'
    }`}>

      {/* Header */}
      <div className="p-4 sm:p-6 sm:pb-2">
        <h1 className="text-lg sm:text-xl font-bold text-gray-700 tracking-wide mb-4">MESSAGES</h1>
      </div>

      {/* Search Bar */}
      <div className="px-4 sm:px-6 pb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2 pl-3 sm:pl-4 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors duration-200"
          />
          <button className="absolute right-0 top-0 h-full w-8 sm:w-10 flex items-center justify-center bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition-colors duration-200">
            <Search className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      {/* List of Messages */}
      <div className="flex-1 overflow-y-auto">
        {filteredMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-gray-500">
            <Search className="w-8 h-8 mb-2 opacity-50" />
            <p className="text-sm">No conversations found</p>
          </div>
        ) : (
          filteredMessages.map((msg) => (
                          <MessageListItem
                            key={msg.id}
                            id={msg.id}
                            name={msg.name}
                            description={msg.description}
                            date={msg.date}
                            isSelected={selectedChat === msg.id}
                            unread={msg.unread}
                            onClick={() => handleMessageSelect(msg.id)}
                          />          ))
        )}
      </div>
    </div>
  );
};

export default MessageList;
