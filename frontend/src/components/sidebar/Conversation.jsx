import { useSocketContext } from "../../context/SocketContext";
import getLastMessage from "../../utils/getLastMessage";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, lastIdx, emoji }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  //   console.log(getLastMessage(conversation._id));

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-gray-800 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-gray-800" : ""}
			`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="text-md text-gray-200 font-semibold">
              {conversation.fullName}
            </p>
            {/* <span className="indicator-item badge badge-secondary text-white bg-black rounded-md border-0 loading loading-dots loading-md"></span> */}
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};
export default Conversation;
