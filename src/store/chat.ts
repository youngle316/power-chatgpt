import { create } from "zustand";
import React from "react";

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
};

type IsStreaming = {
  isStreaming: boolean;
  setIsStreaming: (val: boolean) => void;
};

type AnswerNode = {
  answerNodeRef: React.RefObject<HTMLDivElement> | null;
  setAnswerNodeRef: (ref: React.RefObject<HTMLDivElement>) => void;
};

type StreamItem = {
  created?: number;
  id?: string;
  model?: string;
  object?: string;
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

const useIsStreaming = create<IsStreaming>()((set) => ({
  isStreaming: false,
  setIsStreaming: (val) => set(() => ({ isStreaming: val })),
}));

const useAnswerNodeRef = create<AnswerNode>()((set) => ({
  answerNodeRef: null,
  setAnswerNodeRef: (val) => set(() => ({ answerNodeRef: val })),
}));

export {
  useInputPromptState,
  useIsTypingState,
  useEnteredMessage,
  useIsCopied,
  useMoveDownRef,
  useAbortController,
  useRegenerateInputState,
  useIsStreaming,
  useAnswerNodeRef,
};
