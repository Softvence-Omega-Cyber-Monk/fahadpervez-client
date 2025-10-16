import { useState, useRef, useEffect } from 'react';
import MessageList from '@/components/Message/MessageList';
import ChatWindow from '@/components/Message/ChatWindow';
import { Message as MessageType, ChatMessage as ChatMessageType } from '@/types/messageTypes';

const AdminMessageDashboard = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessageType[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize mock data
  useEffect(() => {
    const mockMessages: MessageType[] = [
      {
        id: '1',
        name: "John Doe",
        description: "I want to order bulk product from you",
        date: "2 Sep, 2025",
        unread: true
      },
      {
        id: '2',
        name: "Floyd Miles",
        description: "Can you send me the product catalog?",
        date: "1 Sep, 2025"
      },
      {
        id: '3',
        name: "Cameron Williamson",
        description: "Lorem ipsum dolor sit amet, consectetur..",
        date: "1 Sep, 2025",
        unread: true
      },
      {
        id: '4',
        name: "Esther Howard",
        description: "My phone number: (277) 555-0113",
        date: "31 Aug, 2025"
      },
      {
        id: '5',
        name: "Leslie Alexander",
        description: "Call me: (503) 555-0105",
        date: "30 Aug, 2025"
      },
      {
        id: '6',
        name: "Darrell Steward",
        description: "Sure sir, I'll get back to you tomorrow",
        date: "29 Aug, 2025"
      },
      {
        id: '7',
        name: "Cody Fisher",
        description: "Pioneering physicist and chemist, cele..",
        date: "28 Aug, 2025"
      },
    ];

    const mockChatMessages: ChatMessageType[] = [
      {
        id: '1',
        message: "I want to order bulk product from you. please help me!",
        time: "14/06/2025 | 2:06 PM",
        isSender: false,
        timestamp: new Date('2025-06-14T14:06:00')
      },
      {
        id: '2',
        message: "Yes. How can I help you? Just tell me your problem",
        time: "14/06/2025 | 2:10 PM",
        isSender: true,
        timestamp: new Date('2025-06-14T14:10:00')
      },
      {
        id: '3',
        message: "Have you more categories available?",
        time: "14/06/2025 | 2:35 PM",
        isSender: false,
        timestamp: new Date('2025-06-14T14:35:00')
      },
      {
        id: '4',
        message: "Yes. Many more categories product available here. We have over 50 different product lines.",
        time: "14/06/2025 | 2:40 PM",
        isSender: true,
        timestamp: new Date('2025-06-14T14:40:00')
      },
    ];

    setMessages(mockMessages);
    setChatMessages(mockChatMessages);
  }, []);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleMessageSelect = (messageId: string) => {
    setSelectedChat(messageId);
    setIsMobileChatOpen(true);

    // Mark as read when selected
    setMessages(prev => prev.map(msg =>
      msg.id === messageId ? { ...msg, unread: false } : msg
    ));
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const newChatMessage: ChatMessageType = {
      id: Date.now().toString(),
      message: newMessage,
      time: new Date().toLocaleDateString('en-GB') + ' | ' + new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      isSender: true,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, newChatMessage]);
    setNewMessage('');

    // Auto-reply after 2 seconds
    setTimeout(() => {
      const autoReply: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        message: "Thank you for your message. We'll get back to you shortly.",
        time: new Date().toLocaleDateString('en-GB') + ' | ' + new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }),
        isSender: false,
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, autoReply]);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Handle file upload logic here
      console.log('File selected:', file.name);
      // You can add file upload functionality here
    }
  };

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  const filteredMessages = messages.filter(message =>
    message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedMessage = messages.find(msg => msg.id === selectedChat);

  return (
    <div className="flex h-screen rounded-2xl antialiased text-gray-900 overflow-hidden gap-5">

      {/* Left Column: Message List */}
      <MessageList
        isMobileChatOpen={isMobileChatOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredMessages={filteredMessages}
        selectedChat={selectedChat}
        handleMessageSelect={handleMessageSelect}
      />

      {/* Right Column: Chat Window */}
      <ChatWindow
        isMobileChatOpen={isMobileChatOpen}
        selectedChat={selectedChat}
        selectedMessage={selectedMessage}
        chatMessages={chatMessages}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSendMessage={handleSendMessage}
        handleKeyPress={handleKeyPress}
        handleFileUpload={handleFileUpload}
        handleAttachmentClick={handleAttachmentClick}
        fileInputRef={fileInputRef}
        setIsMobileChatOpen={setIsMobileChatOpen}
        messagesEndRef={messagesEndRef}
      />

      {/* Mobile Overlay when no chat is selected */}
      {!isMobileChatOpen && !selectedChat && (
        <div className="hidden max-md:flex flex-1 items-center justify-center bg-gray-50 p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Select a conversation</h3>
            <p className="text-sm text-gray-500">Choose a chat from the list to start messaging</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMessageDashboard;
