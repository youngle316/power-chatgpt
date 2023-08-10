"use client";

import { useSideBarState, useSettingModalState } from "~/store/sidebarStore";
import { AlignJustify, SlidersHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next-intl/client";
import { useLocalStorage } from "usehooks-ts";
import { SIDEBAR_CHAT_STORAGE_KEY, CHAT_MESSAGES_STORAGE_KEY } from "~/const";
import HeadLessDialog from "~/components/HeadLess/HeadLessDialog";
import SettingContent from "./SettingContent";

function TopBar() {
  const { setIsOpen } = useSideBarState();
  const { isModalOpen, setIsModalOpen } = useSettingModalState();

  const t = useTranslations("NavPage");

  const settingT = useTranslations("Setting");

  const pathname = usePathname();

  const chatId = pathname.split("/").pop();

  const [sidebarData] = useLocalStorage<SideBarChatProps[]>(
    SIDEBAR_CHAT_STORAGE_KEY,
    []
  );
  const [chatMessages] = useLocalStorage<ChatMessages[]>(
    CHAT_MESSAGES_STORAGE_KEY,
    []
  );

  const chatMessagesData = chatMessages.find(
    (item) => chatId === item.chatId
  )?.messages;

  const sidebarVal = sidebarData.find((item) => chatId === item.id);

  const getValues = () => {
    let values = "";
    sidebarData.forEach((item) => {
      if (item.id === chatId) {
        values = item.title.slice(0, 50);
      }
    });
    return values;
  };

  return (
    <div className="sticky top-0 z-30 h-16 border-b-2 border-neutral-200 bg-neutral-50 drop-shadow-md dark:border-neutral-800 dark:bg-neutral-950">
      <div className="absolute bottom-0 left-1 top-0 flex items-center justify-center">
        <button
          type="button"
          onClick={setIsOpen}
          className="inline-flex h-12 w-12 items-center justify-center rounded-md text-neutral-900 hover:text-neutral-900/50 dark:text-neutral-100
          dark:hover:text-neutral-100/50"
        >
          <AlignJustify />
        </button>
      </div>
      <div className="flex h-full w-full min-w-0 flex-col items-center justify-center ">
        <div className="w-full truncate px-12 text-center font-semibold text-black dark:text-white">
          {chatId ? getValues() : t("newChat")}
        </div>
        <div className="text-xs text-gray-400">
          {chatId && sidebarVal ? (
            <div className="flex gap-1">
              <div>{sidebarVal?.chatModel}</div>
              <>·</>
              <div>{chatMessagesData?.length} messages</div>
            </div>
          ) : (
            t("newChatContent")
          )}
        </div>
      </div>
      <div className="absolute bottom-0 right-4 top-0 flex items-center justify-center">
        <button type="button" onClick={() => setIsModalOpen(true)}>
          <SlidersHorizontal className="h-5 w-5" />
        </button>
        {isModalOpen && (
          <HeadLessDialog
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            title={settingT("setting")}
          >
            <SettingContent />
          </HeadLessDialog>
        )}
      </div>
    </div>
  );
}

export default TopBar;
