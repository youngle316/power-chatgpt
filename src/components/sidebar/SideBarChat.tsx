import { useLocalStorage } from "usehooks-ts";
import { LOCAL_STORAGE_PREFIX } from "~/const";
import SideBarChatItem from "./SideBarChatItem";

function SideBarChat() {
	const [chatData] = useLocalStorage<SideBarChatProps[]>(
		`${LOCAL_STORAGE_PREFIX}sidebar-chat`,
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
