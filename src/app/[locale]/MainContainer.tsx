"use client";

import { useSideBarState } from "~/store/sidebarStore";
import TopBar from "./TopBar";
import AppIntroduce from "~/components/AppIntroduce";
import PromptInput from "~/components/PromptInput";
import { MoveDown } from "lucide-react";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useMoveDownRef } from "~/store/chat";
import { useScrollToView } from "~/hooks/useScrollToView";

function MainContainer({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSideBarState();

  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const { ref, inView } = useInView();

  const { moveDownRef, setMoveDownRef } = useMoveDownRef();

  const scrollIntoView = useScrollToView(moveDownRef);

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
          {children}
          <div
            ref={messageEndRef}
            className="h-32 w-full flex-shrink-0 md:h-48"
          >
            <div ref={ref} />
          </div>
          <button
            onClick={scrollTobBottom}
            className={`fixed bottom-32 right-2 z-10 cursor-pointer text-neutral-900 dark:text-neutral-100 lg:right-24 ${
              inView && "hidden"
            }`}
          >
            <MoveDown className="h-6 w-6" />
          </button>
        </div>
        <PromptInput />
      </div>
    </div>
  );
}

export default MainContainer;
