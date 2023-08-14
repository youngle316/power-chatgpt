"use client";

import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import {
  ENABLED_STREAM,
  OPENAI_API_ENDPOINT_STORAGE_KEY,
  OPENAI_API_KEY_STORAGE_KEY,
} from "~/const";
import { useSettingModalState } from "~/store/sidebarStore";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import HeadLessTab from "~/components/HeadLess/HeadLessTab";
import HeadLessSwitch from "~/components/HeadLess/HeadLessSwitch";

function SettingContent() {
  const t = useTranslations("Setting");

  const tabs = [
    {
      label: t("appSetting"),
      value: "app 设置",
    },
    {
      label: t("modelSetting"),
      value: "model 设置",
    },
  ];

  return (
    <div>
      <HeadLessTab
        tabs={tabs}
        content={[
          { value: <AppSetting />, key: "app" },
          { value: <ModelSetting />, key: "model" },
        ]}
      />
    </div>
  );
}

const ModelSetting = () => {
  const [enableStream, setEnableStream] = useLocalStorage(ENABLED_STREAM, true);

  const t = useTranslations("Setting");

  return (
    <div>
      <HeadLessSwitch
        enabled={enableStream}
        setEnabled={setEnableStream}
        title={t("modelSettingTitle")}
      />
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

  const saveSetting = () => {
    setOpenaiApiKey(apiKeyValue);
    setApiEndPointKey(apiEndPointValue);
    setIsModalOpen(false);
  };

  const cancelSetting = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="mb-4">
        <span className="form-label">{t("language")}</span>
        <LanguageSwitcher />
      </div>
      <div className="mb-4">
        <span className="form-label">{t("theme")}</span>
        <ThemeSwitcher />
      </div>
      <form id="settingForm">
        <div className="mb-4">
          <label htmlFor="apiKey" className="form-label">
            {t("openaiAPIKey")}
          </label>
          <input
            value={apiKeyValue}
            onChange={(e) => setApiKeyValue(e.target.value)}
            type="password"
            id="apiKey"
            className="form-content"
            placeholder="sk-xxxxxx"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="apiEndPoint" className="form-label">
            {t("openaiAPIEndPoint")}
          </label>
          <input
            value={apiEndPointValue}
            onChange={(e) => setApiEndPointValue(e.target.value)}
            type="text"
            id="apiEndPoint"
            className="form-content"
            placeholder="https://api.openai.com/v1"
          />
        </div>
      </form>
      <div className="flex justify-center gap-2">
        <button
          type="button"
          className="basic_button bg-blue-600 text-neutral-50 hover:bg-blue-500"
          onClick={saveSetting}
        >
          {t("save")}
        </button>
        <button type="button" className="basic_button" onClick={cancelSetting}>
          {t("cancel")}
        </button>
      </div>
    </div>
  );
};

export default SettingContent;
