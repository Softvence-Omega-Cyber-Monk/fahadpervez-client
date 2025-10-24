import { RefObject } from 'react';
import ChatHeader from './ChatHeader';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import { Message as MessageType, ChatMessage as ChatMessageType } from '@/types/messageTypes';

interface ChatWindowProps {
  isMobileChatOpen: boolean;
  selectedChat: string | null;
  selectedMessage: MessageType | undefined;
  chatMessages: ChatMessageType[];
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAttachmentClick: () => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
  setIsMobileChatOpen: (isOpen: boolean) => void;
  messagesEndRef: RefObject<HTMLDivElement | null>;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  isMobileChatOpen,
  selectedChat,
  selectedMessage,
  chatMessages,
  newMessage,
  setNewMessage,
  handleSendMessage,
  handleKeyPress,
  handleFileUpload,
  handleAttachmentClick,
  fileInputRef,
  setIsMobileChatOpen,
  messagesEndRef,
}) => {
  return (
    <div className={`flex-1 flex-col bg-gray-50 transition-all duration-300 rounded-2xl ${
      isMobileChatOpen ? 'flex' : 'hidden md:flex'
    }`}>

      <ChatHeader
        selectedMessage={selectedMessage}
        setIsMobileChatOpen={setIsMobileChatOpen}
      />

      {/* Chat Body */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 space-y-4 ">
        <div className="max-w-4xl mx-auto w-full">
          {selectedChat ? (
            <>
              {chatMessages.map((chat) => (
                <ChatBubble
                  key={chat.id}
                  message={chat.message}
                  time={chat.time}
                  isSender={chat.isSender}
                />
              ))}
              <div ref={messagesEndRef} />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No conversation selected</h3>
              <p className="text-sm text-gray-500 text-center">Choose a chat from the list to start messaging</p>
            </div>
          )}
        </div>
      </div>

      {/* Chat Input */}
      {selectedChat && (
        <ChatInput
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleSendMessage={handleSendMessage}
          handleKeyPress={handleKeyPress}
          handleFileUpload={handleFileUpload}
          handleAttachmentClick={handleAttachmentClick}
          fileInputRef={fileInputRef}
        />
      )}
    </div>
  );
};

export default ChatWindow;
