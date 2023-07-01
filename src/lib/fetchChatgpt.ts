import { ChatMessage } from "chatgpt";
import toast from "react-hot-toast";

const fetchAskQuestion = async ({
  prompt,
  chatId,
  chatMessageStorage,
  setChatMessageStorage,
  sidebarDataStorage,
  setSidebarDataStorage,
  apiKey,
  apiBaseUrl,
  responseT,
  setIsModalOpen,
  abortController,
}: FetchAskQuestionProps) => {
  let parentMessageId = "";
  chatMessageStorage
    ?.find((item) => item.chatId === chatId)
    ?.messages?.forEach((item) => {
      if (item.role === "assistant") {
        parentMessageId = item.id;
      }
    });
  await fetch("/api/askQuestion", {
    signal: abortController?.signal,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
      chatId,
      parentMessageId,
      apiKey,
      apiBaseUrl,
    }),
  })
    .then(async (res) => {
      if (res.status === 400) {
        const { err } = await res.json();
        toast(responseT(err), {
          icon: "🔑",
        });
        if (setIsModalOpen) {
          setIsModalOpen(true);
        }
        return;
      }
      const {
        result: { id, parentMessageId, role, text, detail },
      }: { result: ChatMessage } = await res.json();
      const data = chatMessageStorage as ChatMessages[];
      const messageItem: MessagesItem = {
        id,
        parentMessageId,
        role,
        text,
        createAt: detail?.created,
        usage: detail?.usage,
        model: detail?.model,
      };
      const newData = data?.map((item) => {
        if (item.chatId === chatId) {
          return {
            ...item,
            messages: [...item.messages, messageItem],
          };
        } else {
          return item;
        }
      });
      const sidebarData = sidebarDataStorage as SideBarChatProps[];
      const newSidebarData = sidebarData?.map((item) => {
        if (item.id === chatId) {
          return {
            ...item,
            des: text.slice(0, 50),
          };
        } else {
          return item;
        }
      });
      setSidebarDataStorage(newSidebarData);
      setChatMessageStorage(newData);
    })
    .catch((error) => {
      console.log("error", error);
    });
};

export default fetchAskQuestion;
