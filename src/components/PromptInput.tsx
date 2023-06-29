"use client";

import React, { useEffect } from "react";
import { Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { textAreaAutoHeight } from "~/tools";
import fetchAskQuestion from "~/lib/fetchChatgpt";
import {
  useInputPromptState,
  useIsTypingState,
  useMoveDownRef,
} from "~/store/chat";
import { useLocalStorage } from "usehooks-ts";
import {
  CHAT_MESSAGES_STORAGE_KEY,
  SIDEBAR_CHAT_STORAGE_KEY,
  OPENAI_API_KEY_STORAGE_KEY,
  OPENAI_API_ENDPOINT_STORAGE_KEY,
} from "~/const";
import { nanoid } from "nanoid";
import { usePathname, useRouter } from "next-intl/client";
import { createNewChat } from "~/tools";
import { useSettingModalState } from "~/store/sidebarStore";
import { useScrollToView } from "~/hooks/useScrollToView";

function PromptInput() {
  const t = useTranslations("Chat");

  const responseT = useTranslations("response");

  const { inputPrompt, setInputPrompt } = useInputPromptState();

  const { setIsModalOpen } = useSettingModalState();

  const pathname = usePathname();

  const router = useRouter();

  const curChatId = pathname.split("/").pop();

  const [chatMessage, setChatMessage] = useLocalStorage<ChatMessages[]>(
    CHAT_MESSAGES_STORAGE_KEY,
    []
  );

  const [sidebarData, setSidebarData] = useLocalStorage<SideBarChatProps[]>(
    SIDEBAR_CHAT_STORAGE_KEY,
    []
  );

  const [apiKeyValue] = useLocalStorage<string>(OPENAI_API_KEY_STORAGE_KEY, "");

  const [apiEndPointValue] = useLocalStorage<string>(
    OPENAI_API_ENDPOINT_STORAGE_KEY,
    ""
  );

  const { setIsTyping } = useIsTypingState();

  const { moveDownRef } = useMoveDownRef();

  const scrollIntoView = useScrollToView(moveDownRef);

  const chatTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputPrompt(e.target.value);
  };

  useEffect(() => {
    textAreaAutoHeight("promptInput");
  }, [inputPrompt]);

  const getChatMessagesLength = (chatMessages: ChatMessages[], id: string) => {
    return chatMessages.find((item) => item.chatId === id)?.messages.length;
  };

  const sendPrompt = async () => {
    if (!inputPrompt) return;

    const isHome = pathname === "/";

    let chatId = "";

    let chatMessageStorage;
    let sidebarDataStorage;

    setInputPrompt("");
    setIsTyping(true);
    scrollIntoView();

    const content: MessagesItem = {
      role: "user",
      text: inputPrompt,
      id: nanoid(),
    };

    if (isHome) {
      const uuid = nanoid();
      const { newChatMessage, newChatData } = createNewChat({
        sidebarData,
        setSidebarData,
        chatMessage,
        setChatMessage,
        uuid,
      });
      router.push(`/chat/${uuid}`);

      chatId = uuid;
      chatMessageStorage = newChatMessage;
      sidebarDataStorage = newChatData;

      const newMessages = newChatMessage.map((item) => {
        if (item.chatId === uuid) {
          item.messages.push(content);
          return item;
        } else {
          return item;
        }
      });
      setChatMessage(newMessages);

      const length = getChatMessagesLength(newChatMessage, uuid);

      const newSidebarData = newChatData.map((item) => {
        if (item.id === uuid && length && length === 2) {
          item.title = inputPrompt;
          return item;
        }
        return item;
      });
      setSidebarData(newSidebarData);
    } else {
      chatId = curChatId as string;
      chatMessageStorage = chatMessage;
      sidebarDataStorage = sidebarData;

      const newMessages = chatMessage.map((item) => {
        if (curChatId === item.chatId) {
          item.messages.push(content);
          return item;
        } else {
          return item;
        }
      });
      setChatMessage(newMessages);

      const length = getChatMessagesLength(chatMessage, curChatId as string);

      const newSidebarData = sidebarData.map((item) => {
        if (curChatId === item.id && length && length === 2) {
          item.title = inputPrompt;
          return item;
        }
        return item;
      });
      setSidebarData(newSidebarData);
    }

    await fetchAskQuestion({
      prompt: inputPrompt,
      chatId,
      chatMessageStorage,
      setChatMessageStorage: setChatMessage,
      sidebarDataStorage,
      setSidebarDataStorage: setSidebarData,
      apiKey: apiKeyValue,
      apiBaseUrl: apiEndPointValue,
      responseT: responseT,
      setIsModalOpen: setIsModalOpen,
    });
    setIsTyping(false);
  };

  const promptInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      sendPrompt();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 px-4 transition-all duration-300 lg:pl-80 ">
      <div className="mx-auto w-full max-w-5xl px-4 pb-4 transition-all dark:bg-neutral-900 md:px-8 lg:px-12">
        {/* Function Button */}
        <div />
        <div className="chat-textarea-container">
          <textarea
            id="promptInput"
            style={{ maxHeight: "200px", height: "24px" }}
            className="chat-textarea"
            onChange={chatTextAreaChange}
            placeholder={t("promptInputPlaceholder")}
            value={inputPrompt}
            onKeyDown={promptInputKeyDown}
          />
          <button
            type="button"
            className="chat-textarea-send-button"
            onClick={sendPrompt}
          >
            <Send className="m-1 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PromptInput;
