import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";
import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const Messages = () => {
  const { messages, setMessages, loading } = useGetMessages();
  const { selectedConversation } = useConversation();
  console.log(selectedConversation._id);
  const { authUser } = useAuthContext();
  const { socket } = useSocketContext();
  //   console.log("auther", authUser);
  console.log(messages);
  useListenMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  // Socke.io seen
  useEffect(() => {
    const lastMessageIsFromOtherUser =
      messages.length &&
      messages[messages.length - 1].senderId !== authUser._id;

    if (lastMessageIsFromOtherUser) {
      // bhai maine dekh liye tera msg, senderId: senderID, reciever: reciver;
      socket.emit("markMessagesAsSeen", {
        senderId: selectedConversation._id,
        receiverId: authUser._id,
      });
    }
    socket.on("messagesSeen", ({ senderId, receiverId }) => {
      console.log("comparing", selectedConversation._id, receiverId);
      if (selectedConversation._id === senderId) {
        setMessages((prev) => {
          const updateMessages = prev.map((message) => {
            if (!message.seen) {
              return {
                ...message,
                seen: true,
              };
            }
            return message;
          });
          console.log(updateMessages);
          return [...updateMessages];
        });
        // const dummy = [...messages];
        // console.log("duumy", dummy);
        // dummy.map((item) => (!item.seen ? { ...item, seen: true } : item));
        // setMessages(dummy);
      }
    });
  }, [socket, authUser._id, messages, selectedConversation]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
};
export default Messages;
