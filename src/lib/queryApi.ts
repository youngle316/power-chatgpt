import { ChatGPTAPI } from "chatgpt";
import { SYSTEM_MESSAGE_DEFAULT } from "~/const";

type CreateApiProps = {
	apiKey: string;
	apiBaseUrl?: string;
};

type ChatGPTQuery = {
	apiKey: string;
	prompt: string;
	parentMessageId?: string;
	apiBaseUrl?: string;
};

const createApi = ({ apiKey, apiBaseUrl }: CreateApiProps) => {
	return new ChatGPTAPI({
		apiKey: apiKey,
		apiBaseUrl: apiBaseUrl || "https://openaiproxy-4bc.pages.dev/v1",
	});
};

const chatgptQuery = async ({
	apiKey,
	apiBaseUrl,
	prompt,
	parentMessageId,
}: FetchAskQuestionProps) => {
	const res = await createApi({ apiKey, apiBaseUrl })
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
