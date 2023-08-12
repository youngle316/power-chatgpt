import { nanoid } from "nanoid";
import {
  CHAT_MODEL_DEFAULT,
  CONTEXT_LIMIT_DEFAULT,
  SYSTEM_MESSAGE_DEFAULT,
} from "./const";

const textAreaAutoHeight = (id: string) => {
  const textArea = document.getElementById(id) as HTMLTextAreaElement;
  if (textArea) {
    textArea.style.height = "24px";
    textArea.style.height = `${textArea.scrollHeight}px`;
  }
};

type CreateNewChatProps = {
  sidebarData: SideBarChatProps[];
  setSidebarData: React.Dispatch<React.SetStateAction<SideBarChatProps[]>>;
  chatMessage: ChatMessages[];
  setChatMessage: React.Dispatch<React.SetStateAction<ChatMessages[]>>;
  uuid: string;
};

const createNewChat = ({
  sidebarData,
  setSidebarData,
  chatMessage,
  setChatMessage,
  uuid,
}: CreateNewChatProps) => {
  const newChat: SideBarChatProps = {
    id: uuid,
    title: "New Chat",
    des: "New Chat Content",
    createAt: Date.now(),
    systemMessage: SYSTEM_MESSAGE_DEFAULT,
    chatModel: CHAT_MODEL_DEFAULT,
    contextLimit: CONTEXT_LIMIT_DEFAULT,
  };
  const newChatData = [...sidebarData, newChat];
  setSidebarData(newChatData);
  const newChatMessage = [
    ...chatMessage,
    {
      chatId: uuid,
      messages: [
        { role: "system", id: nanoid(), text: SYSTEM_MESSAGE_DEFAULT },
      ],
    },
  ];
  setChatMessage(newChatMessage);

  return { newChatData, newChatMessage };
};

export { textAreaAutoHeight, createNewChat };
