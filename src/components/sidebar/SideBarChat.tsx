import { useLocalStorage } from "usehooks-ts";
import { SIDEBAR_CHAT_STORAGE_KEY } from "~/const";
import SideBarChatItem from "./SideBarChatItem";

function SideBarChat() {
	const [chatData] = useLocalStorage<SideBarChatProps[]>(
		SIDEBAR_CHAT_STORAGE_KEY,
		[],
	);

	return (
		<div className="flex-1 mt-2">
			<div>
				{chatData.map((item) => {
					return <SideBarChatItem key={item.id} data={item} />;
				})}
			</div>
		</div>
	);
}

export default SideBarChat;
