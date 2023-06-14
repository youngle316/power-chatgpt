import { MessageCircle } from "lucide-react";
import { nanoid } from "nanoid";
import { useLocalStorage } from "usehooks-ts";
import { SIDEBAR_CHAT_STORAGE_KEY, CHAT_MESSAGES_STORAGE_KEY } from "~/const";
import { useTranslations } from "next-intl";
import { createNewChat } from "~/tools";

function SideBarNewChat() {
	const [sidebarData, setSidebarData] = useLocalStorage<SideBarChatProps[]>(
		SIDEBAR_CHAT_STORAGE_KEY,
		[],
	);

	const [chatMessage, setChatMessage] = useLocalStorage<ChatMessages[]>(
		CHAT_MESSAGES_STORAGE_KEY,
		[],
	);

	const t = useTranslations("NavPage");

	const newChat = () => {
		const uuid = nanoid();
		createNewChat({
			sidebarData,
			setSidebarData,
			chatMessage,
			setChatMessage,
			uuid,
		});
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
