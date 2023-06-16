"use client";

import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import {
	OPENAI_API_ENDPOINT_STORAGE_KEY,
	OPENAI_API_KEY_STORAGE_KEY,
} from "~/const";
import { useSettingModalState } from "~/store/sidebarStore";

function SettingContent() {
	const [openaiApiKey, setOpenaiApiKey] = useLocalStorage(
		OPENAI_API_KEY_STORAGE_KEY,
		"",
	);

	const { setIsModalOpen } = useSettingModalState();

	const [apiEndPointKey, setApiEndPointKey] = useLocalStorage(
		OPENAI_API_ENDPOINT_STORAGE_KEY,
		"",
	);
	const [apiKeyValue, setApiKeyValue] = useState(openaiApiKey);
	const [apiEndPointValue, setApiEndPointValue] = useState(apiEndPointKey);

	const t = useTranslations("Setting");

	const saveSetting = () => {
		setOpenaiApiKey(apiKeyValue);
		setApiEndPointKey(apiEndPointValue);
		setIsModalOpen(false);
	};

	return (
		<div>
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
				<button type="button" className="primary-button" onClick={saveSetting}>
					{t("save")}
				</button>
			</form>
		</div>
	);
}

export default SettingContent;
