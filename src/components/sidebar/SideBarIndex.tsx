import dynamic from "next/dynamic";
import SideBarNewChat from "./SideBarNewChat";

const SideBarChat = dynamic(() => import("./SideBarChat"), {
  ssr: false,
});

function SideBarContent() {
  return (
    <div className="w-full flex-1 bg-neutral-50 px-2 dark:bg-neutral-950">
      <SideBarNewChat />
      <SideBarChat />
    </div>
  );
}

export default SideBarContent;
