import { MessagesSquare, Edit3, Trash, Check, X } from "lucide-react";
import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { LOCAL_STORAGE_PREFIX } from "~/const";
import { useProcessChatId } from "~/store/sidebarStore";

function SideBarChatItem({ data }: { data: SideBarChatProps }) {
	const { processChatId, setProcessChatId } = useProcessChatId();
	const [textAreaVal, setTextAreaVal] = useState("");
	const [processType, setProcessType] = useState("");

	const [chatData, setChatData] = useLocalStorage<SideBarChatProps[]>(
		`${LOCAL_STORAGE_PREFIX}sidebar-chat`,
		[],
	);

	const editChatItem = (data: SideBarChatProps) => {
		setProcessType("edit");
		setTextAreaVal(data.title);
		setProcessChatId(data.id);
	};

	const deleteChatItem = (data: SideBarChatProps) => {
		setProcessType("delete");
		setProcessChatId(data.id);
	};

	const cancelProcess = () => {
		setProcessChatId("");
		setProcessType("");
	};

	const confirmEditChatItem = (data: SideBarChatProps) => {
		if (processType === "edit") {
			const newChatData = chatData.map((item) => {
				if (item.id === data.id) {
					return {
						...item,
						title: textAreaVal,
					};
				}
				return item;
			});
			setChatData(newChatData);
			setProcessChatId("");
		}
		if (processType === "delete") {
			const newChatData = chatData.filter((item) => item.id !== data.id);
			setChatData(newChatData);
			setProcessChatId("");
		}
	};

	return (
		<div className="min-h-[56px]">
			<div
				className={`flex items-center text-gray-300 hover:bg-gray-700 hover:text-white
				text-sm font-medium w-full space-x-2 justify-between overflow-hidden cursor-pointer`}
			>
				<div className="flex flex-1 items-center justify-start gap-x-2 min-w-0 w-full px-2 py-2 text-sm group">
					<MessagesSquare size={28} />
					<div className="space-y-1 text-left w-full min-w-0">
						{processChatId === data.id && processType === "edit" ? (
							<TitleTextArea value={textAreaVal} setValue={setTextAreaVal} />
						) : (
							<div className="text-gray-100 truncate w-full">{data.title}</div>
						)}
						<div className="text-xs text-gray-400 font-normal truncate w-full">
							{data.des}
						</div>
					</div>
				</div>
				<div className="flex gap-2 text-gray-400 pr-2">
					{processChatId === data.id ? (
						<>
							<Check
								onClick={() => confirmEditChatItem(data)}
								size={16}
								className="hover:text-white"
							/>
							<X
								size={16}
								onClick={cancelProcess}
								className="hover:text-white"
							/>
						</>
					) : (
						<>
							<Edit3
								onClick={() => editChatItem(data)}
								size={16}
								className="hover:text-white"
							/>
							<Trash
								onClick={() => deleteChatItem(data)}
								size={16}
								className="hover:text-white"
							/>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

function TitleTextArea({
	value,
	setValue,
}: { value: string; setValue: (val: string) => void }) {
	return (
		<textarea
			id="message"
			rows={1}
			className="block px-1 w-full text-sm text-white bg-gray-900 rounded-lg border 
			border-gray-300 focus:ring-gray-900 focus:border-gray-900"
			placeholder="请输入标题"
			value={value}
			onChange={(e) => setValue(e.target.value)}
		/>
	);
}

export default SideBarChatItem;
