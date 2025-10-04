import { useState } from 'react';
import { Search, Send, Paperclip, Image } from 'lucide-react';

export default function Message() {
//   const [setSelectedUser] = useState('John Doe');
  const [message, setMessage] = useState('');

  const contacts = [
    {
      name: 'John Doe',
      message: 'Pioneering physicist and chemist, cele...',
      time: '2 Sep, 2025',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces',
      active: true
    },
    {
      name: 'Floyd Miles',
      message: 'Pioneering physicist and chemist, cele...',
      time: '2 Sep, 2025',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces',
      active: false
    },
    {
      name: 'Cameron Williamson',
      message: 'Lorem ipsum dolor sit amet, consectetur...',
      time: '2 Sep, 2025',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces',
      active: false
    },
    {
      name: 'Esther Howard',
      message: 'My phone number: (217) 555-0113',
      time: '2 Sep, 2025',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces',
      active: false
    },
    {
      name: 'Leslie Alexander',
      message: 'Get me: 0904.502.0106',
      time: '2 Sep, 2025',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces',
      active: false
    },
    {
      name: 'Darrell Steward',
      message: 'Sunt sit.',
      time: '2 Sep, 2025',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=faces',
      active: false
    },
    {
      name: 'Cody Fisher',
      message: 'Pioneering physicist and chemist, cele...',
      time: '2 Sep, 2025',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces',
      active: false
    }
  ];

  const chatMessages = [
    {
      text: 'I want to order bulk product from you. please help me !',
      time: '14/09/2025',
      timestamp: '2:06 Pm',
      sent: false
    },
    {
      text: 'Yes. How can I help you ? just tell me your problem',
      time: '14/09/2025',
      timestamp: '2:10 Pm',
      sent: true
    },
    {
      text: 'Have your more categories available ?',
      time: '14/09/2025',
      timestamp: '2:15 Pm',
      sent: false
    },
    {
      text: 'Yes. Many more categoriesproduct available here.',
      time: '14/09/2025',
      timestamp: '2:40 Pm',
      sent: true
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-full sm:w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-3">Message</h2>
          
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-4 pr-10 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center hover:bg-blue-700">
              <Search className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto">
          {contacts.map((contact, index) => (
            <div
              key={index}
            //   onClick={() => setSelectedUser(contact.name)}
              className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 ${
                contact.active ? 'bg-blue-50' : ''
              }`}
            >
              <img
                src={contact.avatar}
                alt={contact.name}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {contact.name}
                  </h3>
                  <span className="text-xs text-blue-600 flex-shrink-0 ml-2">
                    {contact.time}
                  </span>
                </div>
                <p className="text-xs text-gray-600 truncate">
                  {contact.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces"
            alt="John Doe"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="text-base font-medium text-gray-900">John Doe</h3>
            <p className="text-xs text-gray-600">Seller ID: CDF-2025452</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatMessages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sent ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-md ${msg.sent ? 'order-2' : 'order-1'}`}>
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    msg.sent ? 'bg-gray-100' : 'bg-white border border-gray-200'
                  }`}
                >
                  <p className="text-sm text-gray-900">{msg.text}</p>
                </div>
                <div className={`flex items-center gap-2 mt-1 text-xs text-gray-500 ${msg.sent ? 'justify-end' : 'justify-start'}`}>
                  <span>{msg.time}</span>
                  <span>|</span>
                  <span>{msg.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Paperclip className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Image className="w-5 h-5 text-gray-600" />
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Send quick messages"
              className="flex-1 px-4 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg">
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}