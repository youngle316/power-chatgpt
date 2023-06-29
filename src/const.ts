const LOCAL_STORAGE_PREFIX = "PC-";

const SIDEBAR_CHAT_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}SIDEBAR-CHAT`;

const OPENAI_API_KEY_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}OPENAI_API_KEY`;

const OPENAI_API_ENDPOINT_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}OPENAI_API_ENDPOINT`;

const CHAT_MESSAGES_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}CHAT-MESSAGES`;

const APP_FEATURES = ["noLogin", "useYourOwnAPIKey", "localSave", "more"];

const SYSTEM_MESSAGE_DEFAULT =
  "You are ChatGPT, a large language model trained by OpenAI.";

const CHAT_MODEL_DEFAULT = "gpt-3.5-turbo";

export {
  LOCAL_STORAGE_PREFIX,
  APP_FEATURES,
  SYSTEM_MESSAGE_DEFAULT,
  CHAT_MODEL_DEFAULT,
  SIDEBAR_CHAT_STORAGE_KEY,
  CHAT_MESSAGES_STORAGE_KEY,
  OPENAI_API_KEY_STORAGE_KEY,
  OPENAI_API_ENDPOINT_STORAGE_KEY,
};
