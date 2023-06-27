import { useLocalStorage } from "usehooks-ts";
import { SIDEBAR_CHAT_STORAGE_KEY } from "~/const";
import SideBarChatItem from "./SideBarChatItem";

function SideBarChat() {
  const [chatData] = useLocalStorage<SideBarChatProps[]>(
    SIDEBAR_CHAT_STORAGE_KEY,
    []
  );

  return (
    <div className="mt-2 flex-1">
      <div className="flex flex-col gap-1">
        {chatData.map((item) => {
          return <SideBarChatItem key={item.id} data={item} />;
        })}
      </div>
    </div>
  );
}

export default SideBarChat;
