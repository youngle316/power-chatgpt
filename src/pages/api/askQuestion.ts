import type { NextRequest } from "next/server";
import CreateAPI from "~/lib/createApi";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const {
    apiKey,
    apiBaseUrl,
    conversation,
    stream,
    model,
  }: FetchAskQuestionProps = await req.json();

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
        model: model || "gpt-3.5-turbo",
        messages: conversation,
        temperature: 0.7,
        stream,
      });

      if (stream) {
        return new Response(completion.body, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "text/event-stream;charset=utf-8",
            "Cache-Control": "no-cache, no-transform",
            "X-Accel-Buffering": "no",
          },
        });
      } else {
        return new Response(completion.body, {
          headers: {
            "content-type": "application/json",
          },
        });
      }
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
