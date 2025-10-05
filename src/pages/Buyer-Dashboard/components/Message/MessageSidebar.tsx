import { Search } from "lucide-react";

const MessageSidebar = () => {
  const contacts = [
    {
      id: 1,
      name: "John Doe",
      message: "Pioneering physicist and chemist, cele...",
      time: "2 Sep, 2025",
      img: "https://i.pravatar.cc/40?img=12",
    },
    {
      id: 2,
      name: "Floyd Miles",
      message: "Pioneering physicist and chemist, cele...",
      time: "2 Sep, 2025",
      img: "https://i.pravatar.cc/40?img=13",
    },
    {
      id: 3,
      name: "Cameron Williamson",
      message: "Lorem ipsum dolor sit amet, consectetu...",
      time: "2 Sep, 2025",
      img: "https://i.pravatar.cc/40?img=14",
    },
    {
      id: 4,
      name: "Esther Howard",
      message: "My phone number: (217) 555-0113",
      time: "2 Sep, 2025",
      img: "https://i.pravatar.cc/40?img=15",
    },
    {
      id: 5,
      name: "Leslie Alexander",
      message: "Call me(303) 555-0105",
      time: "2 Sep, 2025",
      img: "https://i.pravatar.cc/40?img=16",
    },
    {
      id: 6,
      name: "Darrell Steward",
      message: "Sure sir.",
      time: "2 Sep, 2025",
      img: "https://i.pravatar.cc/40?img=17",
    },
    {
      id: 7,
      name: "Cody Fisher",
      message: "Pioneering physicist and chemist, cele...",
      time: "2 Sep, 2025",
      img: "https://i.pravatar.cc/40?img=18",
    },
  ];

  return (
    <div className="w-full md:w-1/3 lg:w-1/4 border-r border-gray-200 bg-white p-4 flex flex-col rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Message</h2>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="overflow-y-auto flex-1 space-y-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-[#E6F3FF] transition border-1 border-gray-200"
          >
            <div className="flex items-center gap-3">
              <img
                src={contact.img}
                alt={contact.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h4 className="text-sm font-semibold text-gray-900">
                  {contact.name}
                </h4>
                <p className="text-xs text-gray-500 truncate w-36 sm:w-40">
                  {contact.message}
                </p>
              </div>
            </div>
            <p className="text-[10px] text-gray-400 whitespace-nowrap">
              {contact.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageSidebar;
