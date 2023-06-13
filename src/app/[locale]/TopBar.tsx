"use client";

import { useSideBarState } from "~/store/sidebarStore";
import { AlignJustify } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next-intl/client";
import { useLocalStorage } from "usehooks-ts";
import { SIDEBAR_CHAT_STORAGE_KEY, CHAT_MESSAGES_STORAGE_KEY } from "~/const";

function TopBar() {
	const { setIsOpen } = useSideBarState();

	const t = useTranslations("NavPage");

	const pathname = usePathname();

	const chatId = pathname.split("/").pop();

	const [sidebarData] = useLocalStorage<SideBarChatProps[]>(
		SIDEBAR_CHAT_STORAGE_KEY,
		[],
	);
	const [chatMessages] = useLocalStorage<ChatMessages[]>(
		CHAT_MESSAGES_STORAGE_KEY,
		[],
	);

	const chatMessagesData = chatMessages.find(
		(item) => chatId === item.chatId,
	)?.messages;

	const sidebarVal = sidebarData.find((item) => chatId === item.id);

	const getValues = () => {
		let values = "";
		sidebarData.forEach((item) => {
			if (item.id === chatId) {
				values = item.title;
			}
		});
		return values;
	};

	const getTotalPrice = () => {
		let totalPrice = 0;
		chatMessagesData?.forEach((item) => {
			// $0.002 / 1K tokens
			if (item.model === "gpt-3.5-turbo-0301") {
				totalPrice += 0.002 * (item.usage?.total_tokens / 1000);
			}
		});
		return `$${totalPrice.toFixed(6)}`;
	};

	return (
		<div className="sticky z-30 top-0 h-16 bg-white dark:bg-gray-700 border-b-2 border-gray-200 dark:border-gray-700 drop-shadow-md">
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
					{chatId ? getValues() : t("newChat")}
				</div>
				<div className="text-xs text-gray-400">
					{chatId ? (
						<div className="flex gap-1">
							<div>{sidebarVal?.chatModel}</div>
							<>·</>
							<div>{chatMessagesData?.length} messages</div>
							<>·</>
							<div>{getTotalPrice()}</div>
						</div>
					) : (
						t("newChatContent")
					)}
				</div>
			</div>
		</div>
	);
}

export default TopBar;
