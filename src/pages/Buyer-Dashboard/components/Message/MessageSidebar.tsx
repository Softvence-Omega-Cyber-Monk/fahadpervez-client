// MessageSidebar.tsx
import { Search, X } from "lucide-react";
import { useState } from "react";

interface MessageSidebarProps {
  onSelectChat: (id: number | null) => void;
  selectedChat: number | null;
  isMobile: boolean;
}

const MessageSidebar = ({ onSelectChat, selectedChat, isMobile }: MessageSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const contacts = [
    {
      id: 1,
      name: "John Doe",
      message: "Pioneering physicist and chemist, cele...",
      time: "2 Sep, 2025",
      img: "https://i.pravatar.cc/40?img=12",
      unread: 2,
    },
    {
      id: 2,
      name: "Floyd Miles",
      message: "Pioneering physicist and chemist, cele...",
      time: "2 Sep, 2025",
      img: "https://i.pravatar.cc/40?img=13",
      unread: 0,
    },
    {
      id: 3,
      name: "Cameron Williamson",
      message: "Lorem ipsum dolor sit amet, consectetu...",
      time: "2 Sep, 2025",
      img: "https://i.pravatar.cc/40?img=14",
      unread: 1,
    },
    {
      id: 4,
      name: "Esther Howard",
      message: "My phone number: (217) 555-0113",
      time: "2 Sep, 2025",
      img: "https://i.pravatar.cc/40?img=15",
      unread: 0,
    },
    {
      id: 5,
      name: "Leslie Alexander",
      message: "Call me(303) 555-0105",
      time: "2 Sep, 2025",
      img: "https://i.pravatar.cc/40?img=16",
      unread: 0,
    },
    {
      id: 6,
      name: "Darrell Steward",
      message: "Sure sir.",
      time: "2 Sep, 2025",
      img: "https://i.pravatar.cc/40?img=17",
      unread: 3,
    },
    {
      id: 7,
      name: "Cody Fisher",
      message: "Pioneering physicist and chemist, cele...",
      time: "2 Sep, 2025",
      img: "https://i.pravatar.cc/40?img=18",
      unread: 0,
    },
  ];

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-full border border-gray-200 bg-white p-3 xs:p-4 sm:p-5 rounded-lg flex flex-col shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 xs:mb-4">
        <h2 className="text-lg xs:text-xl font-semibold text-gray-900">Messages</h2>
        {isMobile && (
          <button
            onClick={() => onSelectChat(null)}
            className="lg:hidden p-1 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        )}
      </div>

      {/* Search */}
      <div className="relative mb-3 xs:mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-2 xs:py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Contacts List */}
      <div className="overflow-y-auto flex-1 space-y-1 xs:space-y-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            onClick={() => onSelectChat(contact.id)}
            className={`flex items-center justify-between p-2 xs:p-3 rounded-lg cursor-pointer transition-all border border-transparent hover:border-blue-200 ${
              selectedChat === contact.id 
                ? 'bg-[#E6F3FF] border-blue-300 shadow-sm' 
                : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-2 xs:gap-3 min-w-0 flex-1">
              <div className="relative flex-shrink-0">
                <img
                  src={contact.img}
                  alt={contact.name}
                  className="w-8 h-8 xs:w-10 xs:h-10 rounded-full object-cover"
                />
                {contact.unread > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {contact.unread}
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between mb-0.5">
                  <h4 className="text-sm xs:text-base font-semibold text-gray-900 truncate pr-2">
                    {contact.name}
                  </h4>
                  <p className="text-[10px] xs:text-xs text-gray-400 whitespace-nowrap flex-shrink-0">
                    {contact.time}
                  </p>
                </div>
                <p className="text-xs xs:text-sm text-gray-500 truncate">
                  {contact.message}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {filteredContacts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">No conversations found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageSidebar;