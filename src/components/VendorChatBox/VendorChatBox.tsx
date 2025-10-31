// VendorChatBox.tsx
// Chat interface for vendors to respond to customers

import { useState, useEffect, useRef } from 'react';
import { Send, Loader2, X, User, Package, Phone, Mail, MessageSquare } from 'lucide-react';
import { useGetConversationByIdQuery } from '@/Redux/Features/chat/chat.api';
import { useSocketContext } from '@/contexts/SocketProvider';
import { toast } from 'sonner';

interface VendorChatBoxProps {
  conversation: any;
  vendorId: string;
  onClose?: () => void;
}

const VendorChatBox = ({ conversation, vendorId, onClose }: VendorChatBoxProps) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const customer = conversation.customerId;
  const product = conversation.productId;

  // Get socket context
  const {
    isConnected,
    joinConversation,
    leaveConversation,
    sendMessage: sendSocketMessage,
    markAsRead,
  } = useSocketContext();

  // Fetch full conversation details
  const { data: conversationData } = useGetConversationByIdQuery(
    {
      conversationId: conversation._id,
      userId: vendorId,
    },
    {
      skip: !conversation._id,
    }
  );

  // Update messages when conversation loads
  useEffect(() => {
    if (conversationData?.data?.messages) {
      setMessages(conversationData.data.messages);
    }
  }, [conversationData]);

  // Join conversation room
  useEffect(() => {
    if (conversation._id && isConnected) {
      joinConversation(conversation._id);
      markAsRead(conversation._id, 'VENDOR');

      return () => {
        leaveConversation(conversation._id);
      };
    }
  }, [conversation._id, isConnected, joinConversation, leaveConversation, markAsRead]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send message
  const handleSendMessage = () => {
    if (!message.trim()) return;

    const messageText = message;
    setMessage('');

    try {
      sendSocketMessage({
        conversationId: conversation._id,
        senderId: vendorId,
        senderType: 'VENDOR',
        message: messageText,
      });

      // Optimistic update
      const optimisticMessage = {
        senderId: vendorId,
        senderType: 'VENDOR',
        message: messageText,
        timestamp: new Date(),
        isRead: false,
      };
      setMessages((prev) => [...prev, optimisticMessage]);
    } catch (error) {
      toast.error('Failed to send message');
      setMessage(messageText);
    }
  };

  // Handle Enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Customer Avatar */}
          <div className="relative">
            {customer?.avatar ? (
              <img
                src={customer.avatar}
                alt={customer.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
            )}
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>

          {/* Customer Info */}
          <div>
            <h2 className="font-semibold text-lg text-gray-900">
              {customer?.name || 'Unknown Customer'}
            </h2>
            {product && (
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Package className="w-4 h-4" />
                <span>Inquiring about: {product.productName}</span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {customer?.email && (
            <a
              href={`mailto:${customer.email}`}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title="Email customer"
            >
              <Mail className="w-5 h-5 text-gray-600" />
            </a>
          )}
          {customer?.phone && (
            <a
              href={`tel:${customer.phone}`}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title="Call customer"
            >
              <Phone className="w-5 h-5 text-gray-600" />
            </a>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors lg:hidden"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          )}
        </div>
      </div>

      {/* Product Card (if applicable) */}
      {product && (
        <div className="bg-blue-50 border-b border-blue-100 p-4">
          <div className="flex items-center gap-4">
            <img
              src={product.mainImageUrl || '/placeholder.png'}
              alt={product.productName}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{product.productName}</h3>
              <p className="text-sm text-gray-600">
                Price: ${product.pricePerUnit || product.specialPrice}
              </p>
            </div>
            <a
              href={`/products/${product._id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View Product →
            </a>
          </div>
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p className="text-sm">No messages yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, index) => {
              const isCurrentUser = msg.senderId === vendorId;

              return (
                <div
                  key={index}
                  className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      isCurrentUser
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-800 border border-gray-200'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">
                      {msg.message}
                    </p>
                    <p
                      className={`text-xs mt-1 ${
                        isCurrentUser ? 'text-blue-100' : 'text-gray-500'
                      }`}
                    >
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex gap-2">
          <textarea
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            rows={3}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          <button
            onClick={handleSendMessage}
            disabled={!message.trim() || !isConnected}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isConnected ? (
              <Send className="w-5 h-5" />
            ) : (
              <Loader2 className="w-5 h-5 animate-spin" />
            )}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Press Enter to send, Shift + Enter for new line
        </p>
      </div>
    </div>
  );
};

export default VendorChatBox;