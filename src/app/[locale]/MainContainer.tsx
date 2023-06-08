"use client";

import { useSideBarState } from "~/store/sidebarStore";
import TopBar from "./TopBar";

function MainContainer({ children }: { children: React.ReactNode }) {
	const { isOpen } = useSideBarState();

	return (
		<div className={`flex flex-col h-full ${isOpen ? "lg:pl-80" : "lg:pl-0"}`}>
			<div className="flex-1">
				<TopBar />
				{children}
			</div>
		</div>
	);
}

export default MainContainer;
