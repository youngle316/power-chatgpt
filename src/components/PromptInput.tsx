"use client";

import React, { use } from "react";
import { Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { textAreaAutoHeight } from "~/tools";
import fetchAskQuestion from "~/lib/fetchChatgpt";
import { useInputPromptState, useIsTypingState } from "~/store/chat";
import { useSelectedChatId } from "~/store/sidebarStore";
import { useLocalStorage } from "usehooks-ts";
import { CHAT_MESSAGES_STORAGE_KEY, SIDEBAR_CHAT_STORAGE_KEY } from "~/const";
import { nanoid } from "nanoid";
import { usePathname } from "next-intl/client";

function PromptInput() {
	const t = useTranslations("Chat");

	const { inputPrompt, setInputPrompt } = useInputPromptState();

	const { selectedChatId } = useSelectedChatId();

	const pathname = usePathname();

	const [chatMessage, setChatMessage] = useLocalStorage<ChatMessages[]>(
		CHAT_MESSAGES_STORAGE_KEY,
		[],
	);

	const [sidebarData, setSidebarData] = useLocalStorage<SideBarChatProps[]>(
		SIDEBAR_CHAT_STORAGE_KEY,
		[],
	);

	const { setIsTyping } = useIsTypingState();

	const chatTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInputPrompt(e.target.value);
		textAreaAutoHeight("promptInput");
	};

	const sendPrompt = async () => {
		if (!inputPrompt) return;
		const content: MessagesItem = {
			role: "user",
			text: inputPrompt,
			id: nanoid(),
		};
		const newMessages = chatMessage.map((item) => {
			if (pathname.includes(item.chatId)) {
				item.messages.push(content);
				return item;
			} else {
				return item;
			}
		});
		setChatMessage(newMessages);
		const newSidebarData = sidebarData.map((item) => {
			if (pathname.includes(item.id)) {
				item.title = inputPrompt;
				return item;
			}
			return item;
		});
		setSidebarData(newSidebarData);
		setInputPrompt("");
		setIsTyping(true);
		await fetchAskQuestion({
			prompt: inputPrompt,
			chatId: selectedChatId,
			chatMessageStorage: chatMessage,
			setChatMessageStorage: setChatMessage,
			sidebarDataStorage: sidebarData,
			setSidebarDataStorage: setSidebarData,
			setIsTyping: setIsTyping,
		});
		setIsTyping(false);
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
						value={inputPrompt}
					/>
					<button
						type="button"
						className="chat-textarea-send-button"
						onClick={sendPrompt}
					>
						<Send className="m-1 h-4 w-4" />
					</button>
				</div>
			</div>
		</div>
	);
}

export default PromptInput;
