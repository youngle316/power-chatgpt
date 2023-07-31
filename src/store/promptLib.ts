import { create } from "zustand";

type IsShowModal = {
  isShowModal: boolean;
  setIsShowModal: (val: boolean) => void;
};

const useIsShowModal = create<IsShowModal>()((set) => ({
  isShowModal: false,
  setIsShowModal: (val) => set(() => ({ isShowModal: val })),
}));

export { useIsShowModal };
