import { create } from "zustand";

type InputPrompt = {
  inputPrompt: string;
  setInputPrompt: (prompt: string) => void;
};

type IsTyping = {
  isTyping: boolean;
  setIsTyping: (isTyping: boolean) => void;
};

type EnterMessage = {
  enterMessage: { id: string; text: string };
  setEnterMessage: (val: EnterMessage["enterMessage"]) => void;
};

type IsCopied = {
  isCopied: boolean;
  setIsCopied: (val: boolean) => void;
};

const useInputPromptState = create<InputPrompt>()((set) => ({
  inputPrompt: "",
  setInputPrompt: (prompt) => set(() => ({ inputPrompt: prompt })),
}));

const useIsTypingState = create<IsTyping>()((set) => ({
  isTyping: false,
  setIsTyping: () => set((state) => ({ isTyping: !state.isTyping })),
}));

const useEnteredMessage = create<EnterMessage>()((set) => ({
  enterMessage: { id: "", text: "" },
  setEnterMessage: (message) => set(() => ({ enterMessage: message })),
}));

const useIsCopied = create<IsCopied>()((set) => ({
  isCopied: false,
  setIsCopied: (val) => set(() => ({ isCopied: val })),
}));

export {
  useInputPromptState,
  useIsTypingState,
  useEnteredMessage,
  useIsCopied,
};
