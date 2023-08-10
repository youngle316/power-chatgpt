import { create } from "zustand";

type OpenModalType = {
  isModalOpen: boolean;
  setIsModalOpen: (val: boolean) => void;
};
const useOpenModalState = create<OpenModalType>()((set) => ({
  isModalOpen: false,
  setIsModalOpen: (val: boolean) => set(() => ({ isModalOpen: val })),
}));

export { useOpenModalState };
