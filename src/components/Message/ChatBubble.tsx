
interface ChatBubbleProps {
  message: string;
  time: string;
  isSender?: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  time,
  isSender = false,
}) => (
  <div className={`flex mb-4 ${isSender ? 'justify-end' : 'justify-start'}`}>
    <div className={`max-w-[85%] xs:max-w-xs sm:max-w-sm md:max-w-md p-3 shadow-sm ${
      isSender
        ? 'bg-blue-600 text-white rounded-xl rounded-br-sm'
        : 'bg-white text-gray-800 rounded-xl rounded-bl-sm border border-gray-200'
    }`}>
      <p className={`text-sm leading-relaxed break-words ${isSender ? "text-white" : ""}`}>{message}</p>
      <div className={`text-[10px] mt-1 text-right ${
        isSender ? 'text-blue-200' : 'text-gray-500'
      }`}>
        {time}
      </div>
    </div>
  </div>
);

export default ChatBubble;
