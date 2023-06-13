import { ChatMessage } from "chatgpt";

const fetchAskQuestion = async ({
	prompt,
	chatId,
	chatMessageStorage,
	setChatMessageStorage,
	sidebarDataStorage,
	setSidebarDataStorage,
}: FetchAskQuestionProps) => {
	await fetch("/api/askQuestion", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			prompt,
			chatId,
		}),
	})
		.then(async (res) => {
			const {
				result: { id, parentMessageId, role, text, detail },
			}: { result: ChatMessage } = await res.json();
			const data = chatMessageStorage as ChatMessages[];
			const messageItem: MessagesItem = {
				id,
				parentMessageId,
				role,
				text,
				createAt: detail?.created,
				usage: detail?.usage,
				model: detail?.model,
			};
			const newData = data?.map((item) => {
				if (item.chatId === chatId) {
					return {
						...item,
						messages: [...item.messages, messageItem],
					};
				} else {
					return item;
				}
			});
			const sidebarData = sidebarDataStorage as SideBarChatProps[];
			const newSidebarData = sidebarData?.map((item) => {
				if (item.id === chatId) {
					return {
						...item,
						des: text.slice(0, 50),
					};
				} else {
					return item;
				}
			});
			setSidebarDataStorage(newSidebarData);
			setChatMessageStorage(newData);
		})
		.catch(() => {});
};

export default fetchAskQuestion;
