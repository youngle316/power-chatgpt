"use client";

import { useSideBarState } from "~/store/sidebarStore";

export default function Home() {
	const { isOpen, setIsOpen } = useSideBarState();

	return (
		<div className={`flex ${isOpen ? "lg:pl-80" : "lg:pl-0"}`}>
			<button type="button" onClick={setIsOpen}>
				收缩与展开
			</button>
		</div>
	);
}
