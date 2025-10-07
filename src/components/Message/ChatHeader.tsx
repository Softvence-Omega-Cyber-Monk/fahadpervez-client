import { Message as MessageType } from '@/types/messageTypes';

interface ChatHeaderProps {
  selectedMessage: MessageType | undefined;
  setIsMobileChatOpen: (isOpen: boolean) => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  selectedMessage,
  setIsMobileChatOpen,
}) => {
  return (
    <div className="flex items-center p-3 sm:p-4 border-b border-gray-200 bg-white rounded-t-2xl shadow-sm">
      <button
        onClick={() => setIsMobileChatOpen(false)}
        className="md:hidden mr-2 p-1 text-gray-500 hover:text-gray-700 transition-colors duration-200"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mr-2 sm:mr-3 flex-shrink-0 flex items-center justify-center text-white font-semibold text-sm">
        {selectedMessage?.name.charAt(0).toUpperCase() || 'U'}
      </div>
      <div className="flex-1 min-w-0">
        <h2 className="text-sm sm:text-base font-semibold text-gray-900 truncate">
          {selectedMessage?.name || 'Select a conversation'}
        </h2>
        <p className="text-xs text-gray-500 truncate">
          {selectedMessage ? 'Online • Last seen recently' : 'Choose a chat to start messaging'}
        </p>
      </div>
    </div>
  );
};

export default ChatHeader;
