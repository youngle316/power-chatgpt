"use client";

import { useSideBarState } from "~/store/sidebarStore";
import { AlignJustify } from "lucide-react";
import { useTranslations } from "next-intl";

function TopBar() {
	const { setIsOpen } = useSideBarState();

	const t = useTranslations("NavPage");

	return (
		<div className="sticky top-0 h-16 bg-white dark:bg-slate-700 border-b-2 border-slate-200 dark:border-slate-700 drop-shadow-md">
			<div className="flex absolute left-1 top-0 bottom-0 items-center justify-center">
				<button
					type="button"
					onClick={setIsOpen}
					className="inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 
          dark:hover:text-gray-100"
				>
					<AlignJustify />
				</button>
			</div>
			<div className="flex items-center justify-center w-full h-full flex-col min-w-0 ">
				<div className="font-semibold truncate w-full text-center px-12 text-black dark:text-white">
					{t("newChat")}
				</div>
				<div className="text-xs text-gray-400">{t("newChatContent")}</div>
			</div>
		</div>
	);
}

export default TopBar;
