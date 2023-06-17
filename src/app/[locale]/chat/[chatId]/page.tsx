"use client";

import { useLocalStorage } from "usehooks-ts";
import MainContainer from "../../MainContainer";
import { CHAT_MESSAGES_STORAGE_KEY, SIDEBAR_CHAT_STORAGE_KEY } from "~/const";
import { usePathname } from "next-intl/client";
import { Settings, User, Loader2, AlertOctagon } from "lucide-react";
import Image from "next/image";
import ConvertToMarkdown from "~/components/ConvertToMarkdown";
import { useIsTypingState } from "~/store/chat";
import { useTranslations } from "next-intl";

function ChatPage() {
	const [chatMessage] = useLocalStorage<ChatMessages[]>(
		CHAT_MESSAGES_STORAGE_KEY,
		[],
	);

	const pathname = usePathname();

	const { isTyping } = useIsTypingState();

	const messages = chatMessage.find((item) => pathname.includes(item.chatId));

	return (
		<MainContainer>
			{messages ? (
				messages?.messages.map((item) => {
					return <RenderChatMessages key={item.id} messages={item} />;
				})
			) : (
				<RenderNoChat />
			)}
			{/* assistant is typing */}
			{isTyping && (
				<div className="px-6 rounded-lg">
					<div className="text-sm text-gray-500 flex items-center space-x-2">
						<Loader2 className="w-5 h-5 animate-spin" />
						<span className="animate-pulse">Assistant is typing...</span>
					</div>
				</div>
			)}
		</MainContainer>
	);
}

export default ChatPage;

const RenderNoChat = () => {
	const t = useTranslations("Chat");
	return (
		<div className="flex justify-center items-center gap-1">
			<AlertOctagon className="w-5 h-5 text-orange-500" />
			{t("notFound")}
		</div>
	);
};

const RenderChatMessages = ({ messages }: { messages: MessagesItem }) => {
	const [sidebarData] = useLocalStorage<SideBarChatProps[]>(
		SIDEBAR_CHAT_STORAGE_KEY,
		[],
	);
	const pathname = usePathname();

	const getChatModel = () =>
		sidebarData.find((item) => pathname.includes(item.id))?.chatModel || "";

	return (
		<div className="px-4 rounded-lg mb-2">
			<div className="pl-14 relative scroll-mt-32 rounded-md hover:bg-gray-50 dark:hover:bg-zinc-900 pb-2 pt-2 pr-2 min-h-[52px]">
				<div className="absolute top-2 left-2">
					<div
						className="w-9 h-9 bg-gray-200 rounded-md flex-none flex items-center justify-center text-gray-500 
					hover:bg-gray-300 transition-all group active:bg-gray-200 overflow-hidden"
					>
						{messages.role === "user" && <User className="w-5 h-5" />}
						{messages.role === "system" && <Settings className="w-5 h-5" />}
						{messages.role === "assistant" && (
							<Image
								className="w-5 h-5"
								alt="logo"
								src="/assets/logo.svg"
								width={20}
								height={20}
							/>
						)}
					</div>
				</div>
				{/* TODO: Hover Button */}
				{/* <div>HoverButton</div> */}
				<div className="w-full">
					<div>
						{messages.role === "system" && (
							<>
								<div className="text-gray-500 text-xs mb-1 whitespace-pre-line">
									model: {getChatModel()}
								</div>
								<div className="text-gray-500 text-xs mb-1 whitespace-pre-line">
									{messages.text}
								</div>
							</>
						)}
						{messages.role === "user" && (
							<div
								className="break-words text-sm whitespace-pre-wrap space-y-2 w-fit text-white px-4 py-2 rounded-lg 
							max-w-full overflow-auto highlight-darkblue focus:outline bg-blue-500"
							>
								{messages.text}
							</div>
						)}
						{messages.role === "assistant" && (
							<div className="prose prose-sm max-w-full dark:prose-invert break-words">
								<ConvertToMarkdown value={messages.text} />
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
