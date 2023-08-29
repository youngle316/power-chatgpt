"use client";

import { useSettingModalState, useSideBarState } from "~/store/sidebarStore";
import TopBar from "./TopBar";
import AppIntroduce from "~/components/AppIntroduce";
import PromptInput from "~/components/PromptInput";
import { MoveDown } from "lucide-react";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useMoveDownRef } from "~/store/chat";
import { useScrollToView } from "~/hooks/useScrollToView";
import { useLocalStorage } from "usehooks-ts";
import { OPENAI_API_KEY_STORAGE_KEY } from "~/const";
import { useTranslations } from "next-intl";

function MainContainer({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSideBarState();

  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const { ref, inView } = useInView();

  const { moveDownRef, setMoveDownRef } = useMoveDownRef();

  const scrollIntoView = useScrollToView(moveDownRef);

  const [openaiApiKey] = useLocalStorage(OPENAI_API_KEY_STORAGE_KEY, "");

  const t = useTranslations("APP");

  const { setIsModalOpen } = useSettingModalState();

  useEffect(() => {
    setMoveDownRef(messageEndRef);
  }, []);

  const scrollTobBottom = () => {
    scrollIntoView();
  };

  return (
    <div className={`flex h-full flex-col ${isOpen ? "lg:pl-80" : "lg:pl-0"}`}>
      <div className="flex-1">
        <TopBar />
        <div className="relative mx-auto max-w-5xl transition-all lg:px-12">
          <AppIntroduce />
          {!openaiApiKey && (
            <div className="flex justify-center gap-2">
              {t("enterKey")}
              <button
                onClick={() => setIsModalOpen(true)}
                type="button"
                className="text-blue-500"
              >
                {t("enter")}
              </button>
            </div>
          )}
          {children}
          <div
            ref={messageEndRef}
            className="h-32 w-full flex-shrink-0 md:h-48"
          >
            <div ref={ref} />
          </div>
          <button
            onClick={scrollTobBottom}
            className={`fixed bottom-36 right-2 z-10 cursor-pointer text-neutral-900 dark:text-neutral-100 lg:right-24 ${
              inView ? "hidden" : ""
            }`}
          >
            <MoveDown className="h-6 w-6 hover:text-blue-500" />
          </button>
        </div>
        <PromptInput />
      </div>
    </div>
  );
}

export default MainContainer;
