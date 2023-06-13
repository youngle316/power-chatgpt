type SideBarChatProps = {
	id: string;
	title: string;
	des: string;
	// Timestamp
	createAt: int;
	updateAt?: int;
	systemMessage: string;
	chatModel: string;
};

type MessagesItem = {
	id: string;
	parentMessageId?: string;
	role: string;
	text: string;
	usage?: {
		prompt_tokens: int;
		completion_tokens: int;
		total_tokens: int;
	};
	model?: string;
	finish_reason?: string;
	createAt?: int;
	updateAt?: int;
};

type ChatMessages = {
	messages: MessagesItem[];
	chatId: string;
};

type FetchAskQuestionProps = {
	prompt: string;
	chatId: string;
	chatMessageStorage?: any;
	setChatMessageStorage?: any;
	sidebarDataStorage?: any;
	setSidebarDataStorage?: any;
	setIsTyping?: any;
};
