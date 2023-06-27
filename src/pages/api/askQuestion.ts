import chatgptQuery from "~/lib/queryApi";
import type { NextApiRequest, NextApiResponse } from "next";
import { ChatMessage } from "chatgpt";

type Data = {
  answer?: string;
  result?: ChatMessage;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {
    prompt,
    chatId,
    parentMessageId,
    apiKey,
    apiBaseUrl,
  }: FetchAskQuestionProps = req.body;

  if (!apiKey) {
    res.status(400).json({ err: "ApiKeyIsRequired" } as Data);
  } else {
    const result = await chatgptQuery({
      prompt,
      chatId,
      parentMessageId,
      apiKey,
      apiBaseUrl,
    });

    res.status(200).json({ result });
  }
}
