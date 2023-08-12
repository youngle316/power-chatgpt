"use client";

import { useTranslations } from "next-intl";
import ModelSwitcher from "./ModelSwitcher";
import { useSelectedChatId } from "~/store/sidebarStore";
import { useLocalStorage } from "usehooks-ts";
import { SIDEBAR_CHAT_STORAGE_KEY } from "~/const";
import React, { useState } from "react";
import { Models } from "~/const/switcher";
import { useOpenModalState } from "~/store/page";
import { Disclosure } from "@headlessui/react";
import { ChevronRight } from "lucide-react";

const contextLimitData = [
  { label: "Last 1 message", value: 1 },
  { label: "Last 2 messages", value: 2 },
  { label: "Last 3 messages", value: 3 },
  { label: "Last 4 messages", value: 4 },
  { label: "Last 5 messages", value: 5 },
  { label: "Last 6 messages", value: 6 },
  { label: "Last 7 messages", value: 7 },
  { label: "Last 8 messages", value: 8 },
  { label: "Last 9 messages", value: 9 },
  { label: "Last 10 messages", value: 10 },
];

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

  const [contextLimit, setContextLimit] = useState(currentChat.contextLimit);

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

  const cancelSetting = () => {
    setIsModalOpen(false);
  };

  const contextLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setContextLimit(Number(e.target.value));
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
      <div>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-blue-200 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-400 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                <span>{t("advancedOptions")}</span>
                <ChevronRight
                  className={`${
                    open ? "rotate-90 transform" : ""
                  } h-5 w-5 text-blue-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-2 pb-2 pt-4">
                <div>
                  <div className="text-sm font-semibold">
                    <span>{t("contextLimit")}</span>
                  </div>
                  <div className="my-2 text-xs text-neutral-600">
                    {t("contextLimitDes")}
                  </div>
                  <div>
                    <select
                      onChange={contextLimitChange}
                      defaultValue={contextLimit}
                      value={contextLimit}
                      className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-neutral-900 ring-1 ring-inset ring-neutral-300 focus:ring-2 focus:ring-blue-600 dark:bg-neutral-700 dark:text-white sm:text-sm sm:leading-6"
                    >
                      {contextLimitData.map((item) => {
                        return (
                          <option key={item.value} value={item.value}>
                            {item.label}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>

      <div className="flex justify-center gap-2">
        <button
          type="button"
          className="basic_button bg-blue-600 hover:bg-blue-500"
          onClick={saveModelSetting}
        >
          {t("save")}
        </button>
        <button type="button" className="basic_button" onClick={cancelSetting}>
          {t("cancel")}
        </button>
      </div>
    </div>
  );
}

export default PageModelSet;
