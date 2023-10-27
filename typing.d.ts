type SideBarChatProps = {
  id: string;
  title: string;
  des: string;
  createAt: number;
  updateAt?: number;
  systemMessage: string;
  chatModel: string;
  contextLimit: number;
};

type MessagesItem = {
  id?: string;
  role: string;
  text: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  model?: string;
  finish_reason?: string;
  createAt?: number;
  updateAt?: number;
};

type ChatMessages = {
  messages: MessagesItem[];
  chatId: string;
};

type FetchAskQuestionProps = {
  prompt: string;
  chatId?: string;
  chatMessageStorage?: ChatMessages[];
  sidebarDataStorage?: SideBarChatProps[];
  parentMessageId?: "";
  apiKey?: string;
  apiBaseUrl?: string;
  conversation?: any;
  stream?: boolean;
  model?: string;
};

type Prompt = {
  title: string;
  des: string;
  content: string;
  source: string;
};

type Prompts = {
  type: "en" | "cn" | "custom";
  address?: string;
  prompts: Prompt[];
};

type ChatMessageRes = {
  choices: {
    finish_reason: string;
    index: number;
    message: { role: string; content: string };
  }[];
  created: number;
  id: string;
  model: string;
  object: string;
  usage: {
    completion_tokens: number;
    prompt_tokens: number;
    total_tokens: number;
  };
};
