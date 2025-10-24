// Message.tsx
import ChatWindow from "../components/Message/ChatWindow"
import MessageSidebar from "../components/Message/MessageSidebar"
import { useState } from "react"
import { Send } from "lucide-react"

const Message = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(null)
  const [isSidebarOpen] = useState(true)

  return (
    <div className="bg-gray-50 min-h-screen p-2 xs:p-3 sm:p-4 lg:p-5">
      <div className="flex flex-col lg:flex-row gap-3 xs:gap-4 sm:gap-5 max-w-7xl mx-auto">
        {/* Sidebar - Hidden on mobile when chat is selected */}
        <div className={`${selectedChat ? 'hidden lg:block' : 'block'} ${isSidebarOpen ? 'block' : 'hidden'} w-full lg:w-1/3 xl:w-1/4`}>
          <MessageSidebar 
            onSelectChat={setSelectedChat} 
            selectedChat={selectedChat}
            isMobile={selectedChat !== null}
          />
        </div>
        
        {/* Chat Window */}
        <div className={`${selectedChat ? 'block' : 'hidden lg:block'} w-full lg:w-2/3 xl:w-3/4`}>
          <ChatWindow 
            selectedChat={selectedChat}
            onBack={() => setSelectedChat(null)}
            isMobile={selectedChat !== null}
          />
        </div>

        {/* Show empty state when no chat selected on desktop */}
        {!selectedChat && (
          <div className="hidden lg:flex w-2/3 xl:w-3/4 bg-white rounded-lg items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
              <p className="text-sm">Choose a contact to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Message