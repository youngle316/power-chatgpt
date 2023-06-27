import { create } from "zustand";

type Store = {
  isOpen: boolean;
  setIsOpen: () => void;
};

type ProcessChatIdStore = {
  // The chat ID being edited or deleted
  processChatId: string;
  setProcessChatId: (id: string) => void;
};

type SelectedChatIdStore = {
  selectedChatId: string;
  setSelectedChatId: (id: string) => void;
};

type SettingModalStore = {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
};

const useSideBarState = create<Store>()((set) => ({
  isOpen: true,
  setIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}));

const useProcessChatId = create<ProcessChatIdStore>()((set) => ({
  processChatId: "",
  setProcessChatId: (id) => set(() => ({ processChatId: id })),
}));

const useSelectedChatId = create<SelectedChatIdStore>()((set) => ({
  selectedChatId: "",
  setSelectedChatId: (id) => set(() => ({ selectedChatId: id })),
}));

const useSettingModalState = create<SettingModalStore>()((set) => ({
  isModalOpen: false,
  setIsModalOpen: (value: boolean) => set(() => ({ isModalOpen: value })),
}));

export {
  useSideBarState,
  useProcessChatId,
  useSelectedChatId,
  useSettingModalState,
};
