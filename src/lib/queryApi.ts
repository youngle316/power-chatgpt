import { SYSTEM_MESSAGE_DEFAULT } from "~/const";
import CreateAPI from "./createApi";

const chatgptQuery = async ({
	apiKey,
	apiBaseUrl,
	prompt,
	parentMessageId,
}: FetchAskQuestionProps) => {
	const api = CreateAPI.getInstance(apiKey, apiBaseUrl);
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
