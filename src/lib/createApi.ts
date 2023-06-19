import { ChatGPTAPI } from "chatgpt";

class CreateAPI {
	private static instance: ChatGPTAPI;

	public static getInstance(apiKey?: string, apiBaseUrl?: string): ChatGPTAPI {
		if (!CreateAPI.instance) {
			CreateAPI.instance = new ChatGPTAPI({
				apiKey: apiKey || "",
				apiBaseUrl: apiBaseUrl || "https://openaiproxy-4bc.pages.dev/v1",
			});
		}
		return CreateAPI.instance;
	}
}

export default CreateAPI;
