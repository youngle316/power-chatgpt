"use client";

import { Square, RefreshCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next-intl/client";
import { useLocalStorage } from "usehooks-ts";
import { CHAT_MESSAGES_STORAGE_KEY } from "~/const";
import { useAbortController, useRegenerateInputState } from "~/store/chat";

type FunctionButtonType = {
  isTyping: boolean;
};

type ButtonType = {
  children: React.ReactNode;
  color: string;
  hoverColor: string;
  onClick?: () => void;
  icon: React.ReactNode;
};

function FunctionButton({ isTyping }: FunctionButtonType) {
  const t = useTranslations("button");

  const { abortController } = useAbortController();

  const stopGenerate = () => {
    abortController?.abort();
  };

  const [chatMessages, setChatMessages] = useLocalStorage<ChatMessages[]>(
    CHAT_MESSAGES_STORAGE_KEY,
    []
  );

  const pathname = usePathname();

  const { setRegenerateInput } = useRegenerateInputState();

  const regenerate = () => {
    const messages = chatMessages.find((item) =>
      pathname.includes(item.chatId)
    );
    const chatMessage = messages?.messages;
    const lastUserMessage = chatMessage?.filter((item) => {
      return item.role === "user";
    });

    if (lastUserMessage) {
      setRegenerateInput(lastUserMessage[lastUserMessage.length - 1].text);
    }

    const tempMessages = messages?.messages;
    if (
      tempMessages &&
      tempMessages[tempMessages.length - 1].role === "assistant"
    ) {
      tempMessages.pop();
      setChatMessages(chatMessages);
    }
  };

  return (
    <div className="my-4 flex w-full flex-wrap items-center justify-center gap-2 px-4 text-center">
      {isTyping && (
        <Button
          color="bg-red-500"
          hoverColor="hover:bg-red-400"
          icon={<Square fill="white" className="h-4 w-4" />}
          onClick={stopGenerate}
        >
          {t("stop")}
        </Button>
      )}
      {!isTyping && (
        <>
          <Button
            color="bg-indigo-500"
            hoverColor="hover:bg-indigo-400"
            icon={<RefreshCcw className="h-4 w-4" />}
            onClick={regenerate}
          >
            {t("regenerate")}
          </Button>
        </>
      )}
    </div>
  );
}

function Button({ children, color, hoverColor, onClick, icon }: ButtonType) {
  return (
    <button
      className={`flex items-center gap-[6px] rounded-full px-4 py-[6px] text-sm text-white ${color} ${hoverColor}`}
      onClick={onClick}
    >
      {icon}
      {children}
    </button>
  );
}

export default FunctionButton;
