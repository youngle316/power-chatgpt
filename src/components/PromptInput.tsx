"use client";

import React from "react";
import { Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { textAreaAutoHeight } from "~/tools";

function PromptInput() {
	const t = useTranslations("Chat");

	const chatTextAreaChange = () => {
		textAreaAutoHeight("promptInput");
	};

	return (
		<div className="fixed pb-4 px-4 z-30 bottom-0 left-0 right-0 transition-all duration-300 lg:pl-80 ">
			<div className="mx-auto w-full transition-all max-w-5xl px-4 md:px-8 lg:px-12">
				{/* Function Button */}
				<div />
				<div className="chat-textarea-container">
					<textarea
						id="promptInput"
						style={{ maxHeight: "200px", height: "24px" }}
						className="chat-textarea"
						onChange={chatTextAreaChange}
						placeholder={t("promptInputPlaceholder")}
					/>
					<button type="button" className="chat-textarea-send-button">
						<Send className="m-1 h-4 w-4" />
					</button>
				</div>
			</div>
		</div>
	);
}

export default PromptInput;
