"use client";

import { MessagesSquare, Edit3, Trash, Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { CHAT_MESSAGES_STORAGE_KEY, SIDEBAR_CHAT_STORAGE_KEY } from "~/const";
import { useProcessChatId, useSelectedChatId } from "~/store/sidebarStore";
import Link from "next-intl/link";
import { usePathname, useRouter } from "next-intl/client";

function SideBarChatItem({ data }: { data: SideBarChatProps }) {
	const { processChatId, setProcessChatId } = useProcessChatId();
	const [textAreaVal, setTextAreaVal] = useState("");
	const [processType, setProcessType] = useState("");
	const [isActive, setIsActive] = useState(false);
	const { setSelectedChatId } = useSelectedChatId();

	const pathname = usePathname();
	const route = useRouter();

	useEffect(() => {
		if (pathname.includes(data.id)) {
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	}, [pathname]);

	const [chatData, setChatData] = useLocalStorage<SideBarChatProps[]>(
		SIDEBAR_CHAT_STORAGE_KEY,
		[],
	);

	const [chatMessages, setChatMessages] = useLocalStorage<ChatMessages[]>(
		CHAT_MESSAGES_STORAGE_KEY,
		[],
	);

	const editChatItem = (
		e: React.MouseEvent<SVGSVGElement, MouseEvent>,
		data: SideBarChatProps,
	) => {
		e.preventDefault();
		e.stopPropagation();
		setProcessType("edit");
		setTextAreaVal(data.title);
		setProcessChatId(data.id);
	};

	const deleteChatItem = (
		e: React.MouseEvent<SVGSVGElement, MouseEvent>,
		data: SideBarChatProps,
	) => {
		e.preventDefault();
		e.stopPropagation();
		setProcessType("delete");
		setProcessChatId(data.id);
	};

	const cancelProcess = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
		e.preventDefault();
		e.stopPropagation();
		setProcessChatId("");
		setProcessType("");
	};

	const confirmEditChatItem = (
		e: React.MouseEvent<SVGSVGElement, MouseEvent>,
		data: SideBarChatProps,
	) => {
		e.preventDefault();
		e.stopPropagation();
		if (processType === "edit") {
			const newChatData = chatData.map((item) => {
				if (item.id === data.id) {
					return {
						...item,
						title: textAreaVal,
						updateAt: Date.now(),
					};
				}
				return item;
			});
			setChatData(newChatData);
			setProcessChatId("");
		}
		if (processType === "delete") {
			const newChatData = chatData.filter((item) => item.id !== data.id);
			const newChatMessages = chatMessages.filter(
				(item) => item.chatId !== data.id,
			);
			setChatData(newChatData);
			setChatMessages(newChatMessages);
			setProcessChatId("");
			if (isActive) {
				route.push("/");
			}
		}
	};

	const selectChatId = () => {
		setSelectedChatId(data.id);
	};

	return (
		<Link
			href={`/chat/${data.id}`}
			className="min-h-[56px]"
			onClick={selectChatId}
		>
			<div
				className={`flex items-center hover:bg-blue-300/50 dark:hover:bg-blue-800/50
				text-sm font-medium w-full space-x-2 justify-between overflow-hidden cursor-pointer rounded-2xl ${
					isActive &&
					"bg-blue-200 hover:bg-blue-200 dark:bg-blue-800 dark:hover:bg-blue-800"
				}`}
			>
				<div className="flex flex-1 items-center justify-start gap-x-2 min-w-0 w-full px-2 py-2 text-sm group">
					<MessagesSquare size={28} />
					<div className="space-y-1 text-left w-full min-w-0">
						{processChatId === data.id && processType === "edit" ? (
							<TitleTextArea value={textAreaVal} setValue={setTextAreaVal} />
						) : (
							<div className="text-neutral-900 dark:text-neutral-100 truncate w-full">
								{data.title}
							</div>
						)}
						<div className="text-xs text-neutral-800/60 dark:text-neutral-200/60 font-normal truncate w-full">
							{data.des}
						</div>
					</div>
				</div>
				<div className="flex gap-2 pr-2">
					{processChatId === data.id ? (
						<>
							<Check
								onClick={(e) => confirmEditChatItem(e, data)}
								size={16}
								className="svg_icon_hover"
							/>
							<X size={16} onClick={cancelProcess} className="svg_icon_hover" />
						</>
					) : (
						<>
							<Edit3
								onClick={(e) => editChatItem(e, data)}
								size={16}
								className="svg_icon_hover"
							/>
							<Trash
								onClick={(e) => deleteChatItem(e, data)}
								size={16}
								className="svg_icon_hover"
							/>
						</>
					)}
				</div>
			</div>
		</Link>
	);
}

function TitleTextArea({
	value,
	setValue,
}: { value: string; setValue: (val: string) => void }) {
	const clickTextArea = (
		e: React.MouseEvent<HTMLTextAreaElement, MouseEvent>,
	) => {
		e.stopPropagation();
		e.preventDefault();
	};

	return (
		<textarea
			id="message"
			rows={1}
			className="block px-1 w-full text-sm rounded-lg border bg-white dark:bg-black"
			placeholder="请输入标题"
			value={value}
			onChange={(e) => setValue(e.target.value)}
			onClick={(e) => clickTextArea(e)}
		/>
	);
}

export default SideBarChatItem;
