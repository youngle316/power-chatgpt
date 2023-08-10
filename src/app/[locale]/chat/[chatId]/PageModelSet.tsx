"use client";

import { useTranslations } from "next-intl";
import ModelSwitcher from "./ModelSwitcher";
import { useSelectedChatId } from "~/store/sidebarStore";
import { useLocalStorage } from "usehooks-ts";
import { SIDEBAR_CHAT_STORAGE_KEY } from "~/const";
import React, { useState } from "react";
import { Models } from "~/const/switcher";
import { useOpenModalState } from "~/store/page";

function PageModelSet() {
  const t = useTranslations("ModelSetting");

  const { selectedChatId } = useSelectedChatId();

  const [sidebarData, setSidebarData] = useLocalStorage<SideBarChatProps[]>(
    SIDEBAR_CHAT_STORAGE_KEY,
    []
  );

  const { setIsModalOpen } = useOpenModalState();

  const currentChat = sidebarData.find(
    (item) => item.id === selectedChatId
  ) as SideBarChatProps;

  const [selected, setSelected] = useState(
    Models.find((model) => model === currentChat.chatModel) as string
  );

  const saveModelSetting = () => {
    const newCurrentChat = {
      ...currentChat,
      chatModel: selected,
    } as SideBarChatProps;
    const newSidebarData = sidebarData.map((item) => {
      if (item.id === selectedChatId) {
        return newCurrentChat;
      }
      return item;
    });
    setSidebarData(newSidebarData);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <span className="form-label">{t("model")}</span>
        <ModelSwitcher selected={selected} setSelected={setSelected} />
      </div>
      <div>
        <span className="form-label">{t("initialSystemInstructions")}</span>
        <textarea
          className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-neutral-900 ring-1 ring-inset ring-neutral-300 focus:ring-2 focus:ring-blue-600 disabled:text-neutral-500 dark:bg-zinc-700 dark:text-white sm:text-sm sm:leading-6"
          value={currentChat.systemMessage}
          disabled
        />
      </div>
      <button
        type="button"
        className="primary-button"
        onClick={saveModelSetting}
      >
        {t("save")}
      </button>
    </div>
  );
}

export default PageModelSet;
