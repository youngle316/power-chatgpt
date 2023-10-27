"use client";

import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import {
  CHAT_MESSAGES_STORAGE_KEY,
  ENABLED_STREAM,
  OPENAI_API_ENDPOINT_STORAGE_KEY,
  OPENAI_API_KEY_STORAGE_KEY,
  SIDEBAR_CHAT_STORAGE_KEY,
} from "~/const";
import { useSettingModalState } from "~/store/sidebarStore";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import fileDownload from "js-file-download";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Switch } from "~/components/ui/switch";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { ArrowDownToLine } from "lucide-react";
import { DialogFooter } from "~/components/ui/dialog";

function SettingContent() {
  const t = useTranslations("Setting");

  return (
    <>
      <Tabs defaultValue="app">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="app">{t("appSetting")}</TabsTrigger>
          <TabsTrigger value="model">{t("modelSetting")}</TabsTrigger>
        </TabsList>
        <TabsContent value="app">
          <AppSetting />
        </TabsContent>
        <TabsContent value="model">
          <ModelSetting />
        </TabsContent>
      </Tabs>
    </>
  );
}

const ModelSetting = () => {
  const [enableStream, setEnableStream] = useLocalStorage(ENABLED_STREAM, true);

  const t = useTranslations("Setting");

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="model_setting"
        checked={enableStream}
        onCheckedChange={setEnableStream}
      />
      <Label htmlFor="model_setting">{t("modelSettingTitle")}</Label>
    </div>
  );
};

const AppSetting = () => {
  const [openaiApiKey, setOpenaiApiKey] = useLocalStorage(
    OPENAI_API_KEY_STORAGE_KEY,
    ""
  );

  const { setIsModalOpen } = useSettingModalState();

  const [apiEndPointKey, setApiEndPointKey] = useLocalStorage(
    OPENAI_API_ENDPOINT_STORAGE_KEY,
    ""
  );
  const [apiKeyValue, setApiKeyValue] = useState(openaiApiKey);
  const [apiEndPointValue, setApiEndPointValue] = useState(apiEndPointKey);

  const t = useTranslations("Setting");

  const [chatData] = useLocalStorage<SideBarChatProps[]>(
    SIDEBAR_CHAT_STORAGE_KEY,
    []
  );

  const [chatMessage] = useLocalStorage<ChatMessages[]>(
    CHAT_MESSAGES_STORAGE_KEY,
    []
  );

  const saveSetting = () => {
    setOpenaiApiKey(apiKeyValue);
    setApiEndPointKey(apiEndPointValue);
    setIsModalOpen(false);
  };

  const exportAllData = () => {
    const exportData = JSON.parse(JSON.stringify(chatData)).map(
      (item: SideBarChatProps) => {
        const message = chatMessage.find((message) => {
          return message.chatId === item.id;
        }) as ChatMessages;
        return Object.assign(item, {
          messages: message.messages,
        });
      }
    );

    const fileName = `PowerChat-export-${new Date().getTime()}`;

    fileDownload(JSON.stringify({ data: exportData }), `${fileName}.json`);
  };

  return (
    <div className="space-y-4">
      <div className="grid w-full items-center gap-2">
        <Label>{t("language")}</Label>
        <LanguageSwitcher />
      </div>

      <div className="grid w-full items-center gap-2">
        <Label>{t("theme")}</Label>
        <ThemeSwitcher />
      </div>

      <div className="grid w-full items-center gap-2">
        <Label>{t("openaiAPIKey")}</Label>
        <Input
          type="password"
          placeholder="sk-xxxxxx"
          value={apiKeyValue}
          onChange={(e) => setApiKeyValue(e.target.value)}
        />
      </div>

      <div className="grid w-full items-center gap-2">
        <Label>
          {t("openaiAPIEndPoint")}(
          <a
            className="cursor-pointer text-xs text-blue-500 hover:text-blue-400 hover:underline"
            href="https://xlog.xiaole.site/use-cloudflare-transfer-openai-api"
            target="_blank"
          >
            {t("howToUse")}
          </a>
          )
        </Label>
        <Input
          type="text"
          placeholder="https://example.dev/v1"
          value={apiEndPointValue}
          onChange={(e) => setApiEndPointValue(e.target.value)}
        />
      </div>

      <div className="grid w-full items-center gap-2">
        <Label>{t("exportAndImport")}</Label>
        <Button onClick={exportAllData}>
          <ArrowDownToLine className="mr-2 h-4 w-4" /> {t("export")}
        </Button>
      </div>

      <DialogFooter>
        <Button onClick={saveSetting}>{t("save")}</Button>
      </DialogFooter>
    </div>
  );
};

export default SettingContent;
