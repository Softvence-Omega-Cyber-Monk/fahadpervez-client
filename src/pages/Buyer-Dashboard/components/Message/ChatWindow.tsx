// ChatWindow.tsx
import { Image, Paperclip, Send, ArrowLeft } from "lucide-react";
import { useState } from "react";

interface ChatWindowProps {
  selectedChat: number | null;
  onBack: () => void;
  isMobile: boolean;
}

const ChatWindow = ({ selectedChat, onBack, isMobile }: ChatWindowProps) => {
  const [message, setMessage] = useState("");

  const messages = [
    {
      id: 1,
      text: "I want to order bulk product from you, please help me !",
      sender: "user",
      time: "2:06 PM",
      date: "14/06/2025",
    },
    {
      id: 2,
      text: "Yes. How can I help you ? Just tell me your problem",
      sender: "admin",
      time: "2:10 PM",
      date: "14/06/2025",
    },
    {
      id: 3,
      text: "Have your more categories available ?",
      sender: "user",
      time: "2:35 PM",
      date: "14/06/2025",
    },
    {
      id: 4,
      text: "Yes. Many more categories product available here.",
      sender: "admin",
      time: "2:40 PM",
      date: "14/06/2025",
    },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle send message logic here
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!selectedChat) {
    return null;
  }

  return (
    <div className="w-full h-full flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Chat Header */}
      <div className="border-b border-gray-200 px-3 xs:px-4 sm:px-6 py-3 xs:py-4">
        <div className="flex items-center gap-2 xs:gap-3">
          {isMobile && (
            <button
              onClick={onBack}
              className="p-1 hover:bg-gray-100 rounded-md transition-colors flex-shrink-0"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
          )}
          <img
            src="https://i.pravatar.cc/40?img=12"
            alt="John Doe"
            className="w-8 h-8 xs:w-10 xs:h-10 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between w-full min-w-0">
            <div className="min-w-0">
              <h3 className="font-semibold text-gray-900 text-sm xs:text-base truncate">
                John Doe
              </h3>
              <p className="text-xs text-gray-500 hidden xs:block">Online</p>
            </div>
            <p className="text-xs text-gray-500 mt-0.5 xs:mt-0 whitespace-nowrap flex-shrink-0">
              Seller ID: CDF-2023452
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 px-3 xs:px-4 sm:px-6 py-3 xs:py-4 overflow-y-auto space-y-3 xs:space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.sender === "user" ? "items-start" : "items-end"
            }`}
          >
            <div
              className={`max-w-[85%] xs:max-w-[75%] sm:max-w-[65%] px-3 xs:px-4 py-2 rounded-2xl text-sm ${
                msg.sender === "user"
                  ? "bg-gray-100 text-gray-800 rounded-tl-none"
                  : "bg-blue-500 text-white rounded-tr-none"
              }`}
            >
              <p className="break-words">{msg.text}</p>
            </div>
            <p className="text-[10px] xs:text-xs text-gray-400 mt-1 px-1">
              {msg.date} | {msg.time}
            </p>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="border-t border-gray-200 px-3 xs:px-4 sm:px-6 py-3 xs:py-4">
        <div className="flex items-center gap-2 xs:gap-3">
          <button className="p-1.5 xs:p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors flex-shrink-0">
            <Image className="w-4 h-4 xs:w-5 xs:h-5" />
          </button>
          <button className="p-1.5 xs:p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors flex-shrink-0">
            <Paperclip className="w-4 h-4 xs:w-5 xs:h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full border border-gray-200 rounded-full px-3 xs:px-4 py-2 xs:py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="p-2 xs:p-2.5 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex-shrink-0"
          >
            <Send className="w-3 h-3 xs:w-4 xs:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;