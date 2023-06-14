import { ChatGPTAPI } from "chatgpt";

const api = new ChatGPTAPI({
	apiKey: (process.env.NEXT_PUBLIC_OPENAI_API_KEY as string) || "",
	apiBaseUrl: "https://openaiproxy-4bc.pages.dev/v1",
});

export { api };
