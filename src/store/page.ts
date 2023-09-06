import { create } from "zustand";
import React from "react";

type OpenModalType = {
  isModalOpen: boolean;
  setIsModalOpen: (val: boolean) => void;
};

type OpenShareModalType = {
  isShareModalOpen: boolean;
  setIsShareModalOpen: (val: boolean) => void;
};

type ChatContentType = {
  chatContentRef: React.RefObject<HTMLDivElement> | null;
  setChatContentRef: (ref: React.RefObject<HTMLDivElement>) => void;
};

type GptUrlModalType = {
  isGptUrlModalOpen: boolean;
  setIsGptUrlModalOpen: (val: boolean) => void;
};

type GptUrlType = {
  gptUrl: string;
  setGptUrl: (val: string) => void;
};

const useOpenModalState = create<OpenModalType>()((set) => ({
  isModalOpen: false,
  setIsModalOpen: (val: boolean) => set(() => ({ isModalOpen: val })),
}));

const useOpenShareModal = create<OpenShareModalType>()((set) => ({
  isShareModalOpen: false,
  setIsShareModalOpen: (val: boolean) => set(() => ({ isShareModalOpen: val })),
}));

const useChatContentRef = create<ChatContentType>()((set) => ({
  chatContentRef: null,
  setChatContentRef: (val) => set(() => ({ chatContentRef: val })),
}));

const useGptUrlModal = create<GptUrlModalType>()((set) => ({
  isGptUrlModalOpen: false,
  setIsGptUrlModalOpen: (val: boolean) =>
    set(() => ({ isGptUrlModalOpen: val })),
}));

const useGptUrl = create<GptUrlType>()((set) => ({
  gptUrl: "",
  setGptUrl: (val: string) => set(() => ({ gptUrl: val })),
}));

export {
  useOpenModalState,
  useOpenShareModal,
  useChatContentRef,
  useGptUrlModal,
  useGptUrl,
};
