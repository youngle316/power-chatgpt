"use client";

import React from "react";
import { Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { textAreaAutoHeight } from "~/tools";
import fetchAskQuestion from "~/lib/fetchChatgpt";
import { useInputPromptState, useIsTypingState } from "~/store/chat";
import { useLocalStorage } from "usehooks-ts";
import { CHAT_MESSAGES_STORAGE_KEY, SIDEBAR_CHAT_STORAGE_KEY } from "~/const";
import { nanoid } from "nanoid";
import { usePathname, useRouter } from "next-intl/client";
import { createNewChat } from "~/tools";

function PromptInput() {
	const t = useTranslations("Chat");

	const { inputPrompt, setInputPrompt } = useInputPromptState();

	const pathname = usePathname();

	const router = useRouter();

	const curChatId = pathname.split("/").pop();

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

		const isHome = pathname === "/";

		let chatId = "";

		let chatMessageStorage;
		let sidebarDataStorage;

		setInputPrompt("");
		setIsTyping(true);

		const content: MessagesItem = {
			role: "user",
			text: inputPrompt,
			id: nanoid(),
		};

		if (isHome) {
			const uuid = nanoid();
			const { newChatMessage, newChatData } = createNewChat({
				sidebarData,
				setSidebarData,
				chatMessage,
				setChatMessage,
				uuid,
			});
			router.push(`/chat/${uuid}`);

			chatId = uuid;
			chatMessageStorage = newChatMessage;
			sidebarDataStorage = newChatData;

			const newMessages = newChatMessage.map((item) => {
				if (item.chatId === uuid) {
					item.messages.push(content);
					return item;
				} else {
					return item;
				}
			});
			setChatMessage(newMessages);

			const newSidebarData = newChatData.map((item) => {
				if (item.id === uuid) {
					item.title = inputPrompt;
					return item;
				}
				return item;
			});
			setSidebarData(newSidebarData);
		} else {
			chatId = curChatId as string;
			chatMessageStorage = chatMessage;
			sidebarDataStorage = sidebarData;

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
		}

		await fetchAskQuestion({
			prompt: inputPrompt,
			chatId,
			chatMessageStorage,
			setChatMessageStorage: setChatMessage,
			sidebarDataStorage,
			setSidebarDataStorage: setSidebarData,
		});
		setIsTyping(false);
	};

	const promptInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			sendPrompt();
		}
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
						onKeyDown={promptInputKeyDown}
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
