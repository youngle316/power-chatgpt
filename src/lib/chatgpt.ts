import { ChatGPTAPI } from "chatgpt";
import { HttpsProxyAgent } from "https-proxy-agent";
import nodeFetch from "node-fetch";

const isDev = process.env.NODE_ENV === "development";

const api = new ChatGPTAPI({
	apiKey: (process.env.NEXT_PUBLIC_OPENAI_API_KEY as string) || "",
	fetch: isDev
		? (url, options = {}) => {
				const defaultOptions = {
					agent: new HttpsProxyAgent("http://127.0.0.1:7890"),
				};

				const mergedOptions = {
					...defaultOptions,
					...options,
				};

				return nodeFetch(url, mergedOptions);
		  }
		: fetch,
});

export { api };
