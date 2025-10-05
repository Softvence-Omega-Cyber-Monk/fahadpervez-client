import { Search, Send, Paperclip, Image as ImageIcon } from 'lucide-react';

// --- Helper Components ---
// Refined MessageListItem to closer match the screenshot's styling (e.g., image placeholders)
const MessageListItem = ({ name, description, date, isSelected = false }: { name: string, description: string, date: string, isSelected?: boolean }) => (
  // Note: The screenshot does not show an unread dot, and all items have a different background.
  // The first item is slightly different, but I'll stick to a simple selected state for clarity.
  <div className={`flex items-center p-3 cursor-pointer border-b border-gray-100 last:border-b-0 ${
    isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
  }`}>
    {/* Avatar Placeholder: Matched size and rounded shape from the screenshot */}
    <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 flex-shrink-0">
      {/* Could put a user image here */}
    </div>
    
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-start">
        {/* Name styling */}
        <span className={`font-semibold text-sm ${isSelected ? 'text-gray-900' : 'text-gray-900'}`}>
          {name}
        </span>
        {/* Date styling: Used a slightly darker gray for better readability */}
        <span className="text-xs text-gray-500 ml-2 flex-shrink-0">{date}</span>
      </div>
      {/* Description styling: Truncate and correct line height */}
      <p className={`text-xs text-gray-500 truncate ${isSelected ? 'font-medium' : 'font-normal'}`}>{description}</p>
    </div>
    {/* Removed the unread dot as it wasn't clearly visible or consistently applied in the screenshot */}
  </div>
);

// Refined ChatBubble to better match the rounded corners and time position
const ChatBubble = ({ message, time, isSender = false }: { message: string, time: string, isSender?: boolean }) => (
  <div className={`flex mb-4 ${isSender ? 'justify-end' : 'justify-start'}`}>
    <div className={`max-w-xs lg:max-w-md p-3 shadow-sm ${
      isSender 
        // Sender: Blue background, white text, sharp corner on bottom right
        ? 'bg-blue-600 text-white rounded-xl rounded-br-sm' 
        // Receiver: Light gray background, dark text, sharp corner on bottom left
        : 'bg-white text-gray-800 rounded-xl rounded-bl-sm border border-gray-100'
    }`}>
      <p className="text-sm leading-relaxed">{message}</p>
      {/* Time styling is moved to the bottom right of the bubble */}
      <div className={`text-[10px] mt-1 text-right ${
        isSender ? 'text-blue-200' : 'text-gray-400'
      }`}>
        {time}
      </div>
    </div>
  </div>
);

// --- Main Component ---
const Message = () => {
  // Dummy Data for Message List - Used 3 Sep 2025 based on the screenshot, corrected isSelected value
  const messageList = [
    // The screenshot implies a different styling for the selected item, but the provided code
    // was slightly off. I've adjusted the date slightly for realism.
    { name: "John Doe", description: "Pioneering physicist and chemist, cele..", date: "2 Sep, 2025", isSelected: true },
    { name: "Floyd Miles", description: "Pioneering physicist and chemist, cele..", date: "2 Sep, 2025" },
    { name: "Cameron Williamson", description: "Lorem ipsum dolor sit amet, consectetur..", date: "2 Sep, 2025" },
    { name: "Esther Howard", description: "My phone number: (277) 555-0113", date: "2 Sep, 2025" },
    { name: "Leslie Alexander", description: "Call me: (503) 555-0105", date: "2 Sep, 2025" },
    { name: "Darrell Steward", description: "Sure sir.", date: "2 Sep, 2025" },
    { name: "Cody Fisher", description: "Pioneering physicist and chemist, cele..", date: "2 Sep, 2025" },
  ];

  // Dummy Data for Chat History - Adjusted the sender/receiver roles and time format to better match the screenshot
  const chatHistory = [
    {
      message: "I want to order bulk product from you. please help me !",
      time: "14/06/2025 | 2:06 Pm",
      isSender: false, // User/Customer (left side)
    },
    {
      message: "Yes. How can I help you ? just tell me your problem",
      time: "14/06/2025 | 2:10 Pm",
      isSender: true, // Seller/Our side (right side)
    },
    {
      message: "Have your more categories available ?",
      time: "14/06/2025 | 2:35 Pm",
      isSender: false,
    },
    {
      message: "Yes. Many more categoriesproduct available here.",
      time: "14/06/2025 | 2:40 Pm",
      isSender: true,
    },
  ];

  return (
    <div className="flex h-screen bg-white antialiased text-gray-900 overflow-hidden">
      
      {/* Left Column: Message List */}
      <div className="w-full md:w-[320px] lg:w-1/3 border-r border-gray-200 bg-white flex flex-col flex-shrink-0">
        
        {/* Header (Top section: MESSAGES and 'Message' title) */}
        <div className="p-6 pb-2">
          <h1 className="text-xl font-bold text-gray-700 tracking-wide mb-4">MESSAGES</h1>
          {/* Removed the 'Message' title and '1' count for a cleaner match to the image */}
        </div>
        
        {/* Search Bar */}
        <div className="px-6 pb-4">
          <div className="relative">
            {/* Input box matches the full-width, rounded look from the screenshot */}
            <input
              type="text"
              placeholder="Search"
              className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
            {/* Search button/icon is on the right side in the screenshot */}
            <button className="absolute right-0 top-0 h-full w-10 flex items-center justify-center bg-blue-500 text-white rounded-r-lg hover:bg-blue-600">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* List of Messages (Scrollable) */}
        <div className="flex-1 overflow-y-auto">
          {messageList.map((msg, index) => (
            <MessageListItem
              key={index}
              name={msg.name}
              description={msg.description}
              date={msg.date}
              isSelected={msg.isSelected}
            />
          ))}
        </div>
      </div>

      {/* Right Column: Chat Window */}
      <div className="hidden md:flex flex-1 flex-col bg-gray-50">
        
        {/* Chat Header */}
        <div className="flex items-center p-4 border-b border-gray-200 bg-white shadow-sm">
          {/* Avatar Placeholder */}
          <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 flex-shrink-0"></div>
          <div>
            <h2 className="text-base font-semibold text-gray-900">John Doe</h2>
            <p className="text-xs text-gray-500">Seller ID: CDF-2023452</p>
          </div>
        </div>

        {/* Chat Body (The scrollable message area) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="max-w-4xl mx-auto">
            {chatHistory.map((chat, index) => (
              <ChatBubble
                key={index}
                message={chat.message}
                time={chat.time}
                isSender={chat.isSender}
              />
            ))}
          </div>
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center space-x-2">
            
            {/* Attachment and Image Icons (Left side) */}
            <div className="flex space-x-1">
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <Paperclip className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <ImageIcon className="w-5 h-5" />
              </button>
            </div>
            
            {/* Text Input (Main part of the input area) */}
            <input
              type="text"
              placeholder="Send quick messages"
              // Adjusted border and padding to match the screenshot's flatter, non-full-rounded look
              className="flex-1 py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
            
            {/* Send Button (Blue and a simple circle/square with rounded corners) */}
            <button className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-150">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;