import { SYSTEM_MESSAGE_DEFAULT } from "~/const";
import { api } from "./chatgpt";

const chatgptQuery = async ({
	prompt,
	parentMessageId,
}: FetchAskQuestionProps) => {
	const res = await api
		.sendMessage(prompt, {
			systemMessage: SYSTEM_MESSAGE_DEFAULT,
			parentMessageId: parentMessageId || undefined,
			timeoutMs: 60 * 1000,
		})
		.then((res) => {
			return res;
		})
		.catch();

	return res;
};

export default chatgptQuery;
