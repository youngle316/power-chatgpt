import { Configuration, OpenAIApi } from "openai-edge";

class CreateAPI {
  private static instance: OpenAIApi;

  public static getInstance(apiKey?: string, apiBaseUrl?: string): OpenAIApi {
    if (!CreateAPI.instance) {
      const configuration = new Configuration({
        apiKey: apiKey || "",
        basePath: apiBaseUrl || "https://openaiproxy-4bc.pages.dev/v1",
      });
      CreateAPI.instance = new OpenAIApi(configuration);
    }
    return CreateAPI.instance;
  }
}

export default CreateAPI;
