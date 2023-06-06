import dynamic from "next/dynamic";
import SideBarNewChat from "./SideBarNewChat";

const SideBarChat = dynamic(() => import("./SideBarChat"), {
	ssr: false,
});

function SideBarContent() {
	return (
		<div className="flex-1 bg-slate-800">
			<SideBarNewChat />
			<SideBarChat />
		</div>
	);
}

export default SideBarContent;
