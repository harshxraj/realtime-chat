import { useRef, useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import { BsFillImageFill } from "react-icons/bs";
import { IoSendSharp } from "react-icons/io5";
import usePreviewImg from "../../hooks/usePreviewImg";
import {
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  const imageRef = useRef(null);
  const { onClose } = useDisclosure();
  const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();
  const [isSending, setIsSending] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message && !imgUrl) return;
    if (isSending) return;
    setIsSending(true);
    await sendMessage(message, imgUrl);
    setMessage("");
    setIsSending(false);
    setImgUrl("");
  };

  return (
    <div className="relative">
      <form className="px-4 my-3" onSubmit={handleSubmit}>
        <div className="w-full relative">
          <input
            type="text"
            className="border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white"
            placeholder="Send a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="absolute inset-y-0 end-0 flex items-center pe-11">
            <BsFillImageFill
              size="22px"
              onClick={() => imageRef.current.click()}
            />
            <input
              type={"file"}
              hidden
              ref={imageRef}
              onChange={handleImageChange}
            />
          </button>
          <button
            type="submit"
            className="absolute inset-y-0 end-0 flex items-center pe-3"
          >
            {loading ? (
              <div className="loading loading-spinner"></div>
            ) : (
              <BsSend size="21px" />
            )}
          </button>
        </div>
      </form>
      <div>
        <Modal
          isOpen={imgUrl}
          onClose={() => {
            onClose();
            setImgUrl("");
          }}
        >
          <ModalOverlay />
          <ModalContent
            className="bg-black flex items-center absolute border border-1 rounded-md p-2 m-auto my-auto top-[200px]"
            width="420px"
          >
            <ModalHeader>
              <h1>Choose image to send..</h1>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex mt={5} w={"300px"}>
                <Image src={imgUrl} />
              </Flex>
              <Flex justifyContent={"flex-end"} my={5}>
                {!isSending ? (
                  <IoSendSharp
                    size={24}
                    cursor={"pointer"}
                    onClick={handleSubmit}
                  />
                ) : (
                  <Spinner size={"md"} />
                )}
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};
export default MessageInput;
