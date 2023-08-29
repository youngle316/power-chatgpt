"use client";

import { Square, RefreshCcw, Book, Settings } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next-intl/client";
import { useLocalStorage } from "usehooks-ts";
import { CHAT_MESSAGES_STORAGE_KEY } from "~/const";
import {
  useAbortController,
  useRegenerateInputState,
  useSystemMessageRef,
} from "~/store/chat";
import { useSelectedChatId } from "~/store/sidebarStore";
import { useIsShowModal } from "~/store/promptLib";
import PromptLibModal from "~/components/promptLibModal/PromptLibModal";
import { useOpenModalState } from "~/store/page";

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

  const { selectedChatId } = useSelectedChatId();

  const { isShowModal, setIsShowModal } = useIsShowModal();

  const { setIsModalOpen } = useOpenModalState();

  const { inView } = useSystemMessageRef();

  console.log("inView", inView);

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
    <>
      <div className="my-4 flex w-full flex-wrap items-center justify-center gap-2 px-4 text-center">
        {!inView && selectedChatId && (
          <Button
            color="bg-gray-500"
            hoverColor="hover:bg-gray-400"
            icon={<Settings className="h-4 w-4" />}
            onClick={() => setIsModalOpen(true)}
          >
            {t("modelSetting")}
          </Button>
        )}
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
        {!isTyping && selectedChatId && (
          <>
            <Button
              color="bg-amber-500"
              hoverColor="hover:bg-amber-400"
              icon={<Book className="h-4 w-4" />}
              onClick={() => setIsShowModal(true)}
            >
              {t("prompt")}
            </Button>
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
      {isShowModal && <PromptLibModal />}
    </>
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
