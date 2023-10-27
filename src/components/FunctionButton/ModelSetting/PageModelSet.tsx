"use client";

import { useTranslations } from "next-intl";
import ModelSwitcher from "./ModelSwitcher";
import { useSelectedChatId } from "~/store/sidebarStore";
import { useLocalStorage } from "usehooks-ts";
import { SIDEBAR_CHAT_STORAGE_KEY } from "~/const";
import React, { useEffect, useState } from "react";
import { Models } from "~/const/switcher";
import { useOpenModalState, useSelectedLimit } from "~/store/page";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import AdvanceSetting from "./AdvanceSetting";
import { Button } from "~/components/ui/button";
import { DialogFooter } from "~/components/ui/dialog";

function PageModelSet() {
  const t = useTranslations("ModelSetting");

  const { selectedChatId } = useSelectedChatId();

  const [sidebarData, setSidebarData] = useLocalStorage<SideBarChatProps[]>(
    SIDEBAR_CHAT_STORAGE_KEY,
    []
  );

  const { setIsModalOpen } = useOpenModalState();
  const { contextLimit, setContextLimit } = useSelectedLimit();

  const currentChat = sidebarData.find(
    (item) => item.id === selectedChatId
  ) as SideBarChatProps;

  const [selected, setSelected] = useState(
    Models.find((model) => model === currentChat.chatModel) as string
  );

  useEffect(() => {
    setContextLimit(currentChat.contextLimit);
  }, []);

  const saveModelSetting = () => {
    const newCurrentChat = {
      ...currentChat,
      chatModel: selected,
      contextLimit,
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
    <div className="space-y-4">
      <div className="grid w-full items-center gap-2">
        <Label>{t("model")}</Label>
        <ModelSwitcher selected={selected} setSelected={setSelected} />
      </div>
      <div className="grid w-full gap-2">
        <Label>{t("initialSystemInstructions")}</Label>
        <Textarea
          disabled
          value={currentChat.systemMessage}
          placeholder="Type System Instructions Here."
        />
      </div>
      <div>
        <AdvanceSetting />
      </div>

      <DialogFooter>
        <Button onClick={saveModelSetting}>{t("save")}</Button>
      </DialogFooter>
    </div>
  );
}

export default PageModelSet;
