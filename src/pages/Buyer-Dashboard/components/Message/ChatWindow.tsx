import { Image, Paperclip, Send } from "lucide-react";

const ChatWindow = () => {
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

  return (
    <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col bg-white ml-5 rounded-lg">
      <div className=" border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/40?img=12"
            alt="John Doe"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex justify-between w-full">
            <h3 className="font-semibold text-gray-900">John Doe</h3>
            <p className="text-sm text-gray-500">Seller ID: CDF-2023452</p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-6 py-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.sender === "user" ? "items-start" : "items-end"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg text-sm ${
                msg.sender === "user"
                  ? "bg-gray-100 text-gray-800"
                  : "bg-blue-500 text-white"
              }`}
            >
              {msg.text}
            </div>
            <p className="text-[11px] text-gray-400 mt-1">
              {msg.date} | {msg.time}
            </p>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 px-6 py-4 flex items-center gap-3">
        <Image className="text-gray-500 cursor-pointer" />
        <Paperclip className="text-gray-500 cursor-pointer" />
        <input
          type="text"
          placeholder="Send quick messages"
          className="flex-1 border border-gray-200 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="p-2 bg-blue-500 rounded-md text-white hover:bg-blue-600 transition">
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
