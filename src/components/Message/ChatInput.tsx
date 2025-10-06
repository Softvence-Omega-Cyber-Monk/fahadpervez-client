import React, { RefObject } from 'react';
import { Send, Paperclip, Image as ImageIcon } from 'lucide-react';

interface ChatInputProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAttachmentClick: () => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
}

const ChatInput: React.FC<ChatInputProps> = ({
  newMessage,
  setNewMessage,
  handleSendMessage,
  handleKeyPress,
  handleFileUpload,
  handleAttachmentClick,
  fileInputRef,
}) => {
  return (
    <div className="p-3 sm:p-4 border-t border-gray-200 bg-white">
      <div className="flex items-center space-x-1 sm:space-x-2">

        {/* Attachment and Image Icons */}
        <div className="flex space-x-1 flex-shrink-0">
          <button
            onClick={handleAttachmentClick}
            className="p-1 sm:p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
            title="Attach file"
          >
            <Paperclip className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={handleAttachmentClick}
            className="p-1 sm:p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
            title="Attach image"
          >
            <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*,.pdf,.doc,.docx"
            className="hidden"
          />
        </div>

        {/* Text Input */}
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 py-2 sm:py-3 px-3 sm:px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors duration-200"
        />

        {/* Send Button */}
        <button
          onClick={handleSendMessage}
          disabled={!newMessage.trim()}
          className="bg-blue-600 text-white p-2 sm:p-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex-shrink-0"
        >
          <Send className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
