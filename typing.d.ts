type SideBarChatProps = {
  id: string;
  title: string;
  des: string;
  createAt: int;
  updateAt?: int;
  systemMessage: string;
  chatModel: string;
  contextLimit: int;
};

type MessagesItem = {
  id?: string;
  role: string;
  text: string;
  usage?: {
    prompt_tokens: int;
    completion_tokens: int;
    total_tokens: int;
  };
  model?: string;
  finish_reason?: string;
  createAt?: int;
  updateAt?: int;
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
  type: "en" | "cn";
  address: string;
  prompts: Prompt[];
};

type ChatMessageRes = {
  choices: {
    finish_reason: string;
    index: int;
    message: { role: string; content: string };
  }[];
  created: int;
  id: string;
  model: string;
  object: string;
  usage: {
    completion_tokens: int;
    prompt_tokens: int;
    total_tokens: int;
  };
};
