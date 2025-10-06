import ChatWindow from "../components/Message/ChatWindow"
import MessageSidebar from "../components/Message/MessageSidebar"

const Message = () => {
  return (
   <div className=" bg-gray-50 flex flex-col md:flex-row gap-5">
      <MessageSidebar />
      <ChatWindow />
    </div>
  )
}

export default Message