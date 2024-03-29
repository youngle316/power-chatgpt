import { MessageCircle } from "lucide-react";
import { nanoid } from "nanoid";
import { useLocalStorage } from "usehooks-ts";
import { SIDEBAR_CHAT_STORAGE_KEY, CHAT_MESSAGES_STORAGE_KEY } from "~/const";
import { useTranslations } from "next-intl";
import { createNewChat } from "~/tools";
import SideBarFooter from "~/components/sidebar/SideBarFooter";
import { Button } from "~/components/ui/button";

function SideBarNewChat() {
  const [sidebarData, setSidebarData] = useLocalStorage<SideBarChatProps[]>(
    SIDEBAR_CHAT_STORAGE_KEY,
    []
  );

  const [chatMessage, setChatMessage] = useLocalStorage<ChatMessages[]>(
    CHAT_MESSAGES_STORAGE_KEY,
    []
  );

  const t = useTranslations("NavPage");

  const newChat = () => {
    const uuid = nanoid();
    createNewChat({
      sidebarData,
      setSidebarData,
      chatMessage,
      setChatMessage,
      uuid,
    });
  };

  return (
    <div className="flex h-16 w-full items-center gap-2 px-2">
      <Button
        onClick={newChat}
        className="flex w-full items-center justify-center gap-2"
      >
        <MessageCircle size={20} />
        {t("newChat")}
      </Button>
      <SideBarFooter />
    </div>
  );
}

export default SideBarNewChat;
