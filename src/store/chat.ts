import { create } from "zustand";

type InputPrompt = {
  inputPrompt: string;
  setInputPrompt: (prompt: string) => void;
};

type IsTyping = {
  isTyping: boolean;
  setIsTyping: (isTyping: boolean) => void;
};

const useInputPromptState = create<InputPrompt>()((set) => ({
  inputPrompt: "",
  setInputPrompt: (prompt) => set(() => ({ inputPrompt: prompt })),
}));

const useIsTypingState = create<IsTyping>()((set) => ({
  isTyping: false,
  setIsTyping: () => set((state) => ({ isTyping: !state.isTyping })),
}));

export { useInputPromptState, useIsTypingState };
