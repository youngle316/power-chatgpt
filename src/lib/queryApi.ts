import { SYSTEM_MESSAGE_DEFAULT } from "~/const";
import { api } from "./chatgpt";

const chatgptQuery = async ({ prompt, chatId }: FetchAskQuestionProps) => {
	const res = await api
		.sendMessage(prompt, {
			systemMessage: SYSTEM_MESSAGE_DEFAULT,
			timeoutMs: 60 * 1000,
		})
		.then((res) => {
			return res;
		})
		.catch();

	return res;
};

export default chatgptQuery;
