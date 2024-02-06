import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";
import { RiCheckDoubleFill } from "react-icons/ri";
import { Image, Modal, Flex, Skeleton } from "@chakra-ui/react";
import { useState } from "react";
import { GoTrash } from "react-icons/go";
import { FaTrash } from "react-icons/fa";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-800" : "bg-gray-800";
  const doubleTick = fromMe ? true : false;

  const shakeClass = message.shouldShake ? "shake" : "";

  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div>
      {fromMe ? (
        <div className={`chat chat-end`}>
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS chat bubble component" src={profilePic} />
            </div>
          </div>
          {message.message && (
            <div
              className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}
              style={{ maxWidth: "230px", wordWrap: "break-word" }}
            >
              {message.message}
            </div>
          )}
          {message.img && !imageLoaded && (
            <Flex mt={5} w={"200px"}>
              <Image
                src={message.img}
                hidden
                onLoad={() => setImageLoaded(true)}
                alt="message img"
                borderRadius={4}
              />
              <Skeleton w="200px" h="200px" />
            </Flex>
          )}

          {message.img && imageLoaded && (
            <Flex mt={5} w={"200px"}>
              <Image src={message.img} alt="message img" borderRadius={4} />
              <Skeleton w="200px" h="200px" />
            </Flex>
          )}
          <div className="chat-footer opacity-50 text-xs flex gap-2 items-center text-white font-semibold">
            {/* <FaTrash className="text-red-600 hover:cursor-pointer" /> */}

            {formattedTime}
            {doubleTick && (
              <RiCheckDoubleFill
                size={20}
                className={` ${message.seen ? "text-blue-800" : "text-white"}`}
              />
            )}
          </div>
        </div>
      ) : (
        <div className={`chat chat-start`}>
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS chat bubble component" src={profilePic} />
            </div>
          </div>
          {message.message && (
            <div
              className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}
              style={{ maxWidth: "230px", wordWrap: "break-word" }}
            >
              {message.message}
            </div>
          )}

          {message.img && !imageLoaded && (
            // <img width="180px" className="rounded-md" src={message.img} />
            <Flex mt={5} w={"200px"}>
              <Image
                src={message.img}
                hidden
                onLoad={() => setImageLoaded(true)}
                alt="message img"
                borderRadius={4}
              />
              <Skeleton w="200px" h="200px" />
            </Flex>
          )}

          {message.img && imageLoaded && (
            <Flex mt={5} w={"200px"}>
              <Image src={message.img} alt="message img" borderRadius={4} />
              <Skeleton w="200px" h="200px" />
            </Flex>
          )}
          <div className="chat-footer opacity-50 text-xs flex gap-1 items-center text-white font-semibold">
            {formattedTime}
            {doubleTick && (
              <RiCheckDoubleFill
                size={20}
                className={` ${message.seen ? "text-blue-400" : "text-white"}`}
              />
            )}
          </div>
        </div>
      )}
    </div>
    // <div className={`chat ${chatClassName}`}>
    //   <div className="chat-image avatar">
    //     <div className="w-10 rounded-full">
    //       <img alt="Tailwind CSS chat bubble component" src={profilePic} />
    //     </div>
    //   </div>
    //   <div
    //     className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}
    //   >
    //     {message.message}
    //   </div>
    //   <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
    //     {formattedTime}
    //     {doubleTick && (
    //       <RiCheckDoubleFill
    //         size={20}
    //         className={` ${message.seen ? "text-blue-400" : "text-white"}`}
    //       />
    //     )}
    //   </div>
    // </div>
  );
};
export default Message;
