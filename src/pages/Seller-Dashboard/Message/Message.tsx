// VendorMessagesPage.tsx
// Complete message center for vendors to see and respond to customer inquiries

import { useState } from 'react';
import { Search, MessageSquare, Loader2, User, Package } from 'lucide-react';
import { useGetConversationsQuery } from '@/Redux/Features/chat/chat.api';
import { useAppSelector } from '@/hooks/useRedux';
import VendorChatBox from '@/components/VendorChatBox/VendorChatBox';

const VendorMessagesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [page, setPage] = useState(1);

  // Get current vendor info
  const currentUser = useAppSelector((state) => state.auth.user);
  const vendorId = currentUser?._id;

  // Fetch vendor's conversations
  const { data, isLoading, error } = useGetConversationsQuery(
    {
      userId: vendorId || '',
      userType: 'VENDOR',
      page,
      limit: 20,
    },
    {
      skip: !vendorId,
      pollingInterval: 5000, // Refresh every 5 seconds
    }
  );

  const conversations = data?.data || [];
  const pagination = data?.pagination;

  // Filter conversations based on search
  const filteredConversations = conversations.filter((conv) => {
    const search = searchQuery.toLowerCase();
    const customerName = (conv.customerId as any)?.name?.toLowerCase() || '';
    const productName = (conv.productId as any)?.productName?.toLowerCase() || '';
    const lastMsg = conv.lastMessage.toLowerCase();

    return (
      customerName.includes(search) ||
      productName.includes(search) ||
      lastMsg.includes(search)
    );
  });

  // Format time helper
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
      <div className="flex items-center justify-center h-screen">
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
    <div className="h-screen flex bg-gray-50">
      {/* Left Sidebar - Conversations List */}
      <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Messages</h1>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Stats */}
          <div className="mt-4 flex gap-4">
            <div className="flex-1 bg-blue-50 rounded-lg p-3">
              <p className="text-xs text-blue-600 font-medium">Total</p>
              <p className="text-2xl font-bold text-blue-900">
                {conversations.length}
              </p>
            </div>
            <div className="flex-1 bg-red-50 rounded-lg p-3">
              <p className="text-xs text-red-600 font-medium">Unread</p>
              <p className="text-2xl font-bold text-red-900">
                {conversations.reduce((acc, conv) => acc + conv.unreadCount.vendor, 0)}
              </p>
            </div>
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.length === 0 ? (
            <div className="text-center py-16 px-4">
              <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                {searchQuery ? 'No conversations found' : 'No messages yet'}
              </h3>
              <p className="text-gray-500 text-sm">
                {searchQuery
                  ? 'Try searching with different keywords'
                  : 'Customer inquiries will appear here'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredConversations.map((conv) => {
                const customer = conv.customerId as any;
                const product = conv.productId as any;
                const unreadCount = conv.unreadCount.vendor;
                const isSelected = selectedConversation?._id === conv._id;

                return (
                  <button
                    key={conv._id}
                    onClick={() => setSelectedConversation(conv)}
                    className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                      isSelected ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        {customer?.avatar ? (
                          <img
                            src={customer.avatar}
                            alt={customer.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-gray-900 truncate">
                            {customer?.name || 'Unknown Customer'}
                          </h3>
                          <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                            {formatTime(conv.lastMessageTime)}
                          </span>
                        </div>

                        {/* Product Info */}
                        {product && (
                          <div className="flex items-center gap-1 mb-1">
                            <Package className="w-3 h-3 text-gray-400" />
                            <p className="text-xs text-gray-600 truncate">
                              {product.productName}
                            </p>
                          </div>
                        )}

                        {/* Last Message */}
                        <div className="flex items-center justify-between">
                          <p
                            className={`text-sm truncate flex-1 ${
                              unreadCount > 0
                                ? 'text-gray-900 font-medium'
                                : 'text-gray-600'
                            }`}
                          >
                            {conv.lastMessage}
                          </p>
                          {unreadCount > 0 && (
                            <span className="ml-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0">
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
        </div>

        {/* Pagination */}
        {pagination && pagination.total > 1 && (
          <div className="p-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">
                Page {page} of {pagination.total}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === pagination.total}
                className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Right Side - Chat Box */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <VendorChatBox
            conversation={selectedConversation}
            vendorId={vendorId!}
            onClose={() => setSelectedConversation(null)}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <MessageSquare className="w-20 h-20 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Select a conversation
              </h3>
              <p className="text-gray-500">
                Choose a conversation from the list to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorMessagesPage;