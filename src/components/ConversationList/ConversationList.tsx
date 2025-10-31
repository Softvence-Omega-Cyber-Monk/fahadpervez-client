// ConversationsList.tsx
// Display all conversations for a user with search and filtering

import { useState } from 'react';
import { Search, MessageSquare, Loader2 } from 'lucide-react';
import { useGetConversationsQuery } from '@/Redux/Features/chat/chat.api';
import ChatModal from '../ChatModal/ChatModal';

interface ConversationsListProps {
  userId: string;
  userType: 'CUSTOMER' | 'VENDOR';
}

const ConversationsList = ({ userId, userType }: ConversationsListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useGetConversationsQuery({
    userId,
    userType,
    page,
    limit: 20,
  });

  const conversations = data?.data || [];
  const pagination = data?.pagination;

  // Filter conversations based on search
  const filteredConversations = conversations.filter((conv) => {
    const search = searchQuery.toLowerCase();
    const otherUser = userType === 'CUSTOMER' 
      ? (conv.vendorId as any)?.name 
      : (conv.customerId as any)?.name;
    const productName = (conv.productId as any)?.productName || '';
    
    return (
      otherUser?.toLowerCase().includes(search) ||
      productName.toLowerCase().includes(search) ||
      conv.lastMessage.toLowerCase().includes(search)
    );
  });

  const formatTime = (date: Date) => {
    const now = new Date();
    const messageDate = new Date(date);
    const diffMs = now.getTime() - messageDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return messageDate.toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-600">
        Failed to load conversations. Please try again.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
        <p className="text-gray-600">
          {conversations.length} conversation{conversations.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Conversations List */}
      {filteredConversations.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            {searchQuery ? 'No conversations found' : 'No conversations yet'}
          </h3>
          <p className="text-gray-500">
            {searchQuery 
              ? 'Try searching with different keywords' 
              : 'Start chatting with vendors about their products'}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredConversations.map((conv) => {
            const otherUser = userType === 'CUSTOMER' 
              ? (conv.vendorId as any)
              : (conv.customerId as any);
            const product = conv.productId as any;
            const unreadCount = userType === 'CUSTOMER'
              ? conv.unreadCount.customer
              : conv.unreadCount.vendor;

            return (
              <button
                key={conv._id}
                onClick={() => setSelectedConversation(conv)}
                className="w-full bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-semibold text-lg">
                      {otherUser?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {otherUser?.name || 'Unknown User'}
                      </h3>
                      <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                        {formatTime(conv.lastMessageTime)}
                      </span>
                    </div>

                    {product && (
                      <p className="text-xs text-blue-600 mb-1 truncate">
                        About: {product.productName}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600 truncate flex-1">
                        {conv.lastMessage}
                      </p>
                      {unreadCount > 0 && (
                        <span className="ml-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0">
                          {unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.total > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-gray-700">
            Page {page} of {pagination.total}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === pagination.total}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}

      {/* Chat Modal */}
      {selectedConversation && (
        <ChatModal
          isOpen={!!selectedConversation}
          onClose={() => setSelectedConversation(null)}
          vendorId={
            userType === 'CUSTOMER'
              ? (selectedConversation.vendorId as any)._id
              : (selectedConversation.customerId as any)._id
          }
          vendorName={
            userType === 'CUSTOMER'
              ? (selectedConversation.vendorId as any).name
              : (selectedConversation.customerId as any).name
          }
          productId={(selectedConversation.productId as any)?._id}
          productName={(selectedConversation.productId as any)?.productName}
          customerId={userId}
        />
      )}
    </div>
  );
};

export default ConversationsList;