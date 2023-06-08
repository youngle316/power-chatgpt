import { MessageCircle } from "lucide-react";
import { nanoid } from "nanoid";
import { useLocalStorage } from "usehooks-ts";
import { LOCAL_STORAGE_PREFIX } from "~/const";
import { useTranslations } from "next-intl";

function SideBarNewChat() {
	const [chatData, setChatData] = useLocalStorage<SideBarChatProps[]>(
		`${LOCAL_STORAGE_PREFIX}sidebar-chat`,
		[],
	);

	const t = useTranslations("NavPage");

	const newChat = () => {
		const newChat = {
			id: nanoid(),
			title: "New Chat",
			des: "New Chat Content",
		};
		const newChatData = [...chatData, newChat];
		setChatData(newChatData);
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
