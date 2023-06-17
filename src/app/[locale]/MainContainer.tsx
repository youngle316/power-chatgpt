"use client";

import { useSideBarState } from "~/store/sidebarStore";
import TopBar from "./TopBar";
import AppIntroduce from "~/components/AppIntroduce";
import PromptInput from "~/components/PromptInput";

function MainContainer({ children }: { children: React.ReactNode }) {
	const { isOpen } = useSideBarState();

	return (
		<div className={`flex flex-col h-full ${isOpen ? "lg:pl-80" : "lg:pl-0"}`}>
			<div className="flex-1">
				<TopBar />
				<div className="transition-all relative max-w-5xl mx-auto lg:px-12 pb-[180px]">
					<AppIntroduce />
					{children}
				</div>
				<PromptInput />
			</div>
		</div>
	);
}

export default MainContainer;
