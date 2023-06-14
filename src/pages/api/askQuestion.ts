import chatgptQuery from "~/lib/queryApi";
import type { NextApiRequest, NextApiResponse } from "next";
import { ChatMessage } from "chatgpt";

type Data = {
	answer?: string;
	result?: ChatMessage;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>,
) {
	const { prompt, chatId, parentMessageId }: FetchAskQuestionProps = req.body;

	const result = await chatgptQuery({ prompt, chatId, parentMessageId });

	res.status(200).json({ result });
}
