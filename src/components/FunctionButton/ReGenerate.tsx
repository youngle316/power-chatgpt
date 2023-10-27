import React from "react";
import { RefreshCcw } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useTranslations } from "next-intl";
import { useSelectedChatId } from "~/store/sidebarStore";
import { useLocalStorage } from "usehooks-ts";
import { CHAT_MESSAGES_STORAGE_KEY } from "~/const";
import { usePathname } from "next-intl/client";
import { useIsTypingState, useRegenerateInputState } from "~/store/chat";

function ReGenerate() {
  const t = useTranslations("button");

  const { selectedChatId } = useSelectedChatId();
  const { setRegenerateInput } = useRegenerateInputState();
  const { isTyping } = useIsTypingState();

  const [chatMessages, setChatMessages] = useLocalStorage<ChatMessages[]>(
    CHAT_MESSAGES_STORAGE_KEY,
    []
  );

  const pathname = usePathname();

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
      {!isTyping && selectedChatId && (
        <Button
          className="flex gap-1.5 bg-indigo-500 hover:bg-indigo-400"
          onClick={regenerate}
        >
          <RefreshCcw className="h-4 w-4" />
          {t("regenerate")}
        </Button>
      )}
    </>
  );
}

export default ReGenerate;
