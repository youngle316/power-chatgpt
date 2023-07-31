import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { cnPrompts } from "~/const/prompts/cnPrompts";
import { enPrompts } from "~/const/prompts/enPrompts";
import PromptContent from "./PromptContent";
import { useTranslations } from "next-intl";
import { useIsShowModal } from "~/store/promptLib";
import { Tab } from "@headlessui/react";
import { motion } from "framer-motion";

const tabs = [
  { label: "中文", value: "cn" },
  { label: "English", value: "en" },
];

function PromptLibModal() {
  const { isShowModal, setIsShowModal } = useIsShowModal();

  const t = useTranslations("promptModal");

  return (
    <Transition appear show={isShowModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40"
        onClose={() => setIsShowModal(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-black">
                <Dialog.Title
                  as="h3"
                  className="flex justify-center text-lg font-medium leading-6 text-gray-900 dark:text-white"
                >
                  {t("promptLib")}
                </Dialog.Title>
                <Tab.Group>
                  <Tab.List className="my-4 flex gap-2">
                    {tabs.map((item) => {
                      return (
                        <Tab key={item.label}>
                          {({ selected }) => (
                            <button
                              className={`relative ${
                                selected ? "text-blue-500" : ""
                              }`}
                            >
                              {item.label}
                              {selected ? (
                                <motion.div
                                  className="absolute bottom-[-1px] left-0 right-0 h-[1px] bg-blue-500"
                                  layoutId="underline"
                                />
                              ) : null}
                            </button>
                          )}
                        </Tab>
                      );
                    })}
                  </Tab.List>
                  <Tab.Panels>
                    <Tab.Panel>
                      <PromptContent content={cnPrompts} />
                    </Tab.Panel>
                    <Tab.Panel>
                      <PromptContent content={enPrompts} />
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
                <div className="flex justify-center">
                  <button
                    onClick={() => setIsShowModal(false)}
                    className="basic_button bg-blue-600 hover:bg-blue-500 focus-visible:outline-blue-600"
                  >
                    {t("closePromptLib")}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default PromptLibModal;
