// ChatModal.tsx - Enhanced with Socket.IO
import { useState, useEffect, useRef } from 'react';
import { X, Send, Loader2, MessageSquare } from 'lucide-react';
import { useStartConversationMutation, useGetConversationByIdQuery, IMessage } from '@/Redux/Features/chat/chat.api';
import { useSocket } from '@/hooks/useSocket';
import { toast } from 'sonner';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  vendorId: string;
  vendorName: string;
  productId?: string;
  productName?: string;
  customerId: string;
}

const ChatModal = ({
  isOpen,
  onClose,
  vendorId,
  vendorName,
  productId,
  productName,
  customerId,
}: ChatModalProps) => {
  const [message, setMessage] = useState('');
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [startConversation, { isLoading: isStarting }] = useStartConversationMutation();

  // Fetch conversation
  const { data: conversationData } = useGetConversationByIdQuery(
    { conversationId: conversationId!, userId: customerId },
    { skip: !conversationId }
  );

  const conversation = conversationData?.data;

  // Socket.IO integration
  const {
    joinConversation,
    leaveConversation,
    sendMessage: sendSocketMessage,
    sendTypingIndicator,
    markAsRead,
  } = useSocket({
    userId: customerId,
    onNewMessage: (data) => {
      if (data.conversationId === conversationId) {
        setMessages((prev) => [...prev, data.message]);
        if (isOpen) {
          markAsRead(conversationId!, 'CUSTOMER');
        }
      }
    },
    onUserTyping: (data) => {
      if (data.conversationId === conversationId && data.userId !== customerId) {
        setIsTyping(data.isTyping);
      }
    },
  });

  // Update messages when conversation loads
  useEffect(() => {
    if (conversation?.messages) {
      setMessages(conversation.messages);
    }
  }, [conversation]);

  // Join conversation room
  useEffect(() => {
    if (conversationId && isOpen) {
      joinConversation(conversationId);
      markAsRead(conversationId, 'CUSTOMER');
      
      return () => {
        leaveConversation(conversationId);
      };
    }
  }, [conversationId, isOpen, joinConversation, leaveConversation, markAsRead]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle typing indicator
  const handleTyping = () => {
    if (conversationId) {
      sendTypingIndicator(conversationId, true);

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = setTimeout(() => {
        sendTypingIndicator(conversationId, false);
      }, 2000);
    }
  };

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const messageText = message;
    setMessage('');

    try {
      if (!conversationId) {
        const result = await startConversation({
          customerId,
          vendorId,
          productId,
          initialMessage: messageText,
        }).unwrap();

        setConversationId(result.data._id);
        setMessages(result.data.messages);
      } else {
        sendSocketMessage({
          conversationId,
          senderId: customerId,
          senderType: 'CUSTOMER',
          message: messageText,
        });

        const optimisticMessage: IMessage = {
          senderId: customerId,
          senderType: 'CUSTOMER',
          message: messageText,
          timestamp: new Date(),
          isRead: false,
        };
        setMessages((prev) => [...prev, optimisticMessage]);
      }

      if (conversationId) {
        sendTypingIndicator(conversationId, false);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to send message');
      setMessage(messageText);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-lg shadow-2xl flex flex-col border border-gray-200">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold">{vendorName}</h3>
            {productName && (
              <p className="text-xs text-blue-100 truncate max-w-[200px]">
                About: {productName}
              </p>
            )}
          </div>
        </div>
        <button
          onClick={onClose}
          className="hover:bg-blue-700 p-2 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p className="text-sm">Start a conversation with {vendorName}</p>
            {productName && (
              <p className="text-xs mt-2">Ask about {productName}</p>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((msg, index) => {
              const isCurrentUser = msg.senderId === customerId;

              return (
                <div
                  key={index}
                  className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] rounded-lg p-3 ${
                      isCurrentUser
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-100 border border-gray-200'
                    }`}
                  >
                    <p className="text-sm break-words">{msg.message}</p>
                    <p
                      className={`text-xs mt-1 ${
                        isCurrentUser ? 'text-blue-100' : 'text-gray-100'
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

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-lg p-3 max-w-[75%]">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              handleTyping();
            }}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isStarting}
          />
          <button
            onClick={handleSendMessage}
            disabled={!message.trim() || isStarting}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center min-w-[44px]"
          >
            {isStarting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
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

export default ChatModal;