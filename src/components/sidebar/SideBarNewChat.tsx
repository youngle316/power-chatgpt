import { MessageCircle } from "lucide-react";
import { nanoid } from "nanoid";
import { useLocalStorage } from "usehooks-ts";
import {
	SYSTEM_MESSAGE_DEFAULT,
	CHAT_MODEL_DEFAULT,
	SIDEBAR_CHAT_STORAGE_KEY,
	CHAT_MESSAGES_STORAGE_KEY,
} from "~/const";
import { useTranslations } from "next-intl";

function SideBarNewChat() {
	const [chatData, setChatData] = useLocalStorage<SideBarChatProps[]>(
		SIDEBAR_CHAT_STORAGE_KEY,
		[],
	);

	const [chatMessages, setChatMessages] = useLocalStorage<ChatMessages[]>(
		CHAT_MESSAGES_STORAGE_KEY,
		[],
	);

	const t = useTranslations("NavPage");

	const newChat = () => {
		const uuid = nanoid();
		const newChat: SideBarChatProps = {
			id: uuid,
			title: "New Chat",
			des: "New Chat Content",
			createAt: Date.now(),
			systemMessage: SYSTEM_MESSAGE_DEFAULT,
			chatModel: CHAT_MODEL_DEFAULT,
		};
		const newChatData = [...chatData, newChat];
		setChatData(newChatData);
		setChatMessages([
			...chatMessages,
			{
				chatId: uuid,
				messages: [
					{ role: "system", id: nanoid(), text: SYSTEM_MESSAGE_DEFAULT },
				],
			},
		]);
	};

	return (
		<div className="p-2">
			<button type="button" className="sidebar_btn" onClick={newChat}>
				<MessageCircle size={20} />
				{t("newChat")}
			</button>
		</div>
	);
}

export default SideBarNewChat;
