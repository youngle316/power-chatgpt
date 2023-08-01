import type { NextRequest } from "next/server";
import CreateAPI from "~/lib/createApi";
import { ChatCompletionRequestMessage } from "openai-edge";

export const config = {
  runtime: "edge",
};

function getMessages({ conversation }: { conversation: ChatMessages }) {
  const data = conversation?.messages;
  const messages: ChatCompletionRequestMessage[] = [];
  messages.push({ role: "system", content: data[0].text });
  const number = 5;
  let formatData = [];
  if (data.length <= number) {
    formatData = data;
  } else {
    formatData = data.slice(-number);
  }
  formatData.forEach((item) => {
    messages.push({
      role: item.role === "user" ? "user" : "assistant",
      content: item.text,
    });
  });
  return messages;
}

export default async function handler(req: NextRequest) {
  const { apiKey, apiBaseUrl, conversation }: FetchAskQuestionProps =
    await req.json();

  if (!apiKey) {
    return new Response(JSON.stringify({ err: "ApiKeyIsRequired" }), {
      status: 400,
      headers: {
        "content-type": "application/json",
      },
    });
  } else {
    const openai = CreateAPI.getInstance(apiKey, apiBaseUrl);

    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: getMessages({ conversation }),
        max_tokens: 1024,
        temperature: 0.7,
        stream: false,
      });

      return new Response(completion.body, {
        headers: {
          "content-type": "application/json",
        },
      });
    } catch (error: any) {
      console.error(error);
      if (error.response) {
        console.error(error.response.status);
        console.error(error.response.data);
      } else {
        console.error(error.message);
      }
      return new Response(JSON.stringify(error), {
        status: 400,
        headers: {
          "content-type": "application/json",
        },
      });
    }
  }
}
