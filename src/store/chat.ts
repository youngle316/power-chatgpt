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

type MoveDown = {
  moveDownRef: React.RefObject<HTMLDivElement> | null;
  setMoveDownRef: (ref: React.RefObject<HTMLDivElement>) => void;
};

type AbortControllerType = {
  abortController: AbortController | undefined;
  setAbortController: (val: AbortController) => void;
};

type RegenerateInputType = {
  regenerateInput: string;
  setRegenerateInput: (prompt: string) => void;
}

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

const useMoveDownRef = create<MoveDown>()((set) => ({
  moveDownRef: null,
  setMoveDownRef: (val) => set(() => ({ moveDownRef: val })),
}));

const useAbortController = create<AbortControllerType>()((set) => ({
  abortController: undefined,
  setAbortController: (val) => set(() => ({ abortController: val })),
}));

const useRegenerateInputState = create<RegenerateInputType>()((set) => ({
  regenerateInput: "",
  setRegenerateInput: (prompt) => set(() => ({ regenerateInput: prompt })),
}));

export {
  useInputPromptState,
  useIsTypingState,
  useEnteredMessage,
  useIsCopied,
  useMoveDownRef,
  useAbortController,
  useRegenerateInputState
};
