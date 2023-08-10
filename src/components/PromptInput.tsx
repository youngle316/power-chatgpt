"use client";

import React, { useEffect } from "react";
import { Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { textAreaAutoHeight } from "~/tools";
import {
  useAbortController,
  useAnswerNodeRef,
  useInputPromptState,
  useIsStreaming,
  useIsTypingState,
  useMoveDownRef,
  useRegenerateInputState,
} from "~/store/chat";
import { useLocalStorage } from "usehooks-ts";
import {
  CHAT_MESSAGES_STORAGE_KEY,
  SIDEBAR_CHAT_STORAGE_KEY,
  OPENAI_API_KEY_STORAGE_KEY,
  OPENAI_API_ENDPOINT_STORAGE_KEY,
  ENABLED_STREAM,
} from "~/const";
import { nanoid } from "nanoid";
import { usePathname, useRouter } from "next-intl/client";
import { createNewChat } from "~/tools";
import { useSettingModalState, useSideBarState } from "~/store/sidebarStore";
import { useScrollToView } from "~/hooks/useScrollToView";
import FunctionButton from "./FunctionButton";
import toast from "react-hot-toast";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { ChatCompletionRequestMessage } from "openai-edge";

class RetriableError extends Error {}
class FatalError extends Error {}

let tempStreamData: any = {};
let tempAbortStreamData: any = {};

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

  const { regenerateInput, setRegenerateInput } = useRegenerateInputState();

  const [apiKeyValue] = useLocalStorage<string>(OPENAI_API_KEY_STORAGE_KEY, "");

  const [apiEndPointValue] = useLocalStorage<string>(
    OPENAI_API_ENDPOINT_STORAGE_KEY,
    ""
  );

  const [enabledStream] = useLocalStorage<boolean>(ENABLED_STREAM, true);

  const { setIsStreaming } = useIsStreaming();

  const { isTyping, setIsTyping } = useIsTypingState();

  const { moveDownRef } = useMoveDownRef();

  const { answerNodeRef } = useAnswerNodeRef();

  const scrollIntoView = useScrollToView(moveDownRef);

  const { isOpen } = useSideBarState();

  const chatTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputPrompt(e.target.value);
  };

  const { abortController, setAbortController } = useAbortController();

  useEffect(() => {
    abortController?.signal.addEventListener("abort", () => {
      onClose();
    });
    return () => {
      abortController?.signal.removeEventListener("abort", () => {
        console.log("remove abort event listener");
      });
    };
  }, [abortController]);

  useEffect(() => {
    textAreaAutoHeight("promptInput");
  }, [inputPrompt]);

  useEffect(() => {
    scrollIntoView();
  }, [answerNodeRef?.current?.innerText]);

  function onData(data: string) {
    if (!answerNodeRef?.current) {
      return;
    }
    try {
      if (data !== "[DONE]") {
        const resData = JSON.parse(data);
        tempStreamData = resData;
        const text = resData.choices[0].delta.content;
        if (text) {
          answerNodeRef.current.innerText =
            answerNodeRef.current.innerText + text;
        }
      }
    } catch (err) {
      console.log(`Failed to parse data: ${data}`);
    }
  }

  function onClose() {
    if (!enabledStream) {
      return;
    }
    const { sidebarDataStorage, chatMessageStorage, chatId } =
      tempAbortStreamData;
    const answerNode = answerNodeRef?.current?.innerText as string;
    const message = { content: answerNode };
    const { id = nanoid(), model = "0613", created } = tempStreamData;
    const messageItem: MessagesItem = {
      id,
      role: "assistant",
      text: answerNode,
      createAt: created,
      model,
    };
    setIsStreaming(false);
    saveSidebarData({ sidebarDataStorage, chatId, message });
    saveChatMessageData({ chatMessageStorage, chatId, messageItem });
    if (answerNodeRef?.current) {
      answerNodeRef.current.innerText = "";
    }
  }

  const saveSidebarData = ({ sidebarDataStorage, chatId, message }: any) => {
    const sidebarData = sidebarDataStorage as SideBarChatProps[];
    const newSidebarData = sidebarData?.map((item) => {
      if (item.id === chatId) {
        return {
          ...item,
          des: message.content.slice(0, 50),
        };
      } else {
        return item;
      }
    });
    setSidebarData(newSidebarData);
  };

  const saveChatMessageData = ({
    chatMessageStorage,
    chatId,
    messageItem,
  }: any) => {
    const data = chatMessageStorage as ChatMessages[];
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
    setChatMessage(newData);
  };

  function getMessages(conversation: ChatMessages) {
    const data = conversation?.messages;
    const messages: ChatCompletionRequestMessage[] = [];
    messages.push({ role: "system", content: data[0].text });
    const number = 5;
    let formatData = [];
    if (data.length <= number) {
      formatData = data;
    } else {
      formatData = data.slice(-number);
    }
    formatData.forEach((item) => {
      messages.push({
        role: item.role === "user" ? "user" : "assistant",
        content: item.text,
      });
    });
    return messages;
  }

  const fetchAskQuestion = async ({
    chatId,
    chatMessageStorage,
    sidebarDataStorage,
  }: FetchAskQuestionProps) => {
    const abortController = new AbortController();
    setAbortController(abortController);
    tempAbortStreamData = { chatId, chatMessageStorage, sidebarDataStorage };

    const conversation = chatMessageStorage?.find(
      (item) => item.chatId === chatId
    ) as ChatMessages;

    const currentSidebarData = sidebarDataStorage?.find(
      (item) => item.id === chatId
    ) as SideBarChatProps;

    if (enabledStream && !!answerNodeRef?.current) {
      setIsStreaming(true);
      await fetchEventSource("/api/askQuestion", {
        signal: abortController?.signal,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiKey: apiKeyValue,
          apiBaseUrl: apiEndPointValue,
          conversation: getMessages(conversation),
          stream: true,
          model: currentSidebarData.chatModel,
        }),
        async onopen(response) {
          if (answerNodeRef?.current) {
            answerNodeRef.current.innerText = "";
          }
          console.log("onopen");
          if (
            response.ok &&
            response.headers.get("content-type")?.replace(/ /g, "") ===
              "text/event-stream;charset=utf-8"
          ) {
            return;
          } else if (
            response.status >= 400 &&
            response.status < 500 &&
            response.status !== 429
          ) {
            throw new FatalError();
          } else {
            throw new RetriableError();
          }
        },
        onmessage(msg) {
          if (msg.event === "FatalError") {
            throw new FatalError(msg.data);
          }
          try {
            onData(msg.data);
          } catch (error) {
            abortController.abort();
            onClose();
          }
        },
        onclose() {
          onClose();
        },
        onerror(err) {
          if (err instanceof FatalError) {
            console.log("onerror fatal", err);
            setIsStreaming(false);
          } else {
            console.log("onerror other", err);
          }
        },
      });
    } else {
      await fetch("/api/askQuestion", {
        signal: abortController?.signal,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiKey: apiKeyValue,
          apiBaseUrl: apiEndPointValue,
          conversation: getMessages(conversation),
          stream: false,
          model: currentSidebarData.chatModel,
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
          const { id, choices, created, model, usage }: ChatMessageRes =
            await res.json();
          const { message } = choices[0];
          const messageItem: MessagesItem = {
            id,
            role: message.role,
            text: message.content,
            createAt: created,
            usage,
            model,
          };
          saveSidebarData({ sidebarDataStorage, chatId, message });
          saveChatMessageData({ chatMessageStorage, chatId, messageItem });
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  };

  const sendPrompt = () => {
    if (!inputPrompt && !regenerateInput) return;

    const isHome = pathname === "/";

    let chatId = "";

    let chatMessageStorage;
    let sidebarDataStorage;

    setInputPrompt("");
    setIsTyping(true);

    const content: MessagesItem = {
      role: "user",
      text: inputPrompt,
      id: nanoid(),
    };

    if (regenerateInput) {
      chatMessageStorage = chatMessage;
      sidebarDataStorage = sidebarData;
      chatId = curChatId as string;
    } else {
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
      }
    }

    fetchAskQuestion({
      prompt: regenerateInput || inputPrompt,
      chatId,
      chatMessageStorage,
      sidebarDataStorage,
    }).then(() => {
      setIsTyping(false);
      scrollIntoView();
      if (regenerateInput) {
        setRegenerateInput("");
      }
    });
  };

  useEffect(() => {
    if (regenerateInput) {
      sendPrompt();
    }
  }, [regenerateInput]);

  const promptInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      sendPrompt();
    }
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-30 px-4 transition-all duration-300 ${
        isOpen ? "lg:pl-80" : ""
      }`}
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 transition-all md:px-8 lg:px-12">
        <div className="opacity-100">
          <FunctionButton isTyping={isTyping} />
        </div>
        <div className="bg-neutral-100 pb-4 pt-0 dark:bg-neutral-900">
          <div className="chat-textarea-container">
            <textarea
              id="promptInput"
              style={{ maxHeight: "200px", height: "24px" }}
              className="chat-textarea"
              onChange={chatTextAreaChange}
              placeholder={t("promptInputPlaceholder")}
              value={inputPrompt}
              onKeyDown={promptInputKeyDown}
              disabled={isTyping}
            />
            <button
              disabled={isTyping}
              type="button"
              className="chat-textarea-send-button"
              onClick={sendPrompt}
            >
              <Send className="m-1 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PromptInput;
