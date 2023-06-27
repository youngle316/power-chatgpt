"use client";

import { useSideBarState } from "~/store/sidebarStore";
import TopBar from "./TopBar";
import AppIntroduce from "~/components/AppIntroduce";
import PromptInput from "~/components/PromptInput";

function MainContainer({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSideBarState();

  return (
    <div className={`flex h-full flex-col ${isOpen ? "lg:pl-80" : "lg:pl-0"}`}>
      <div className="flex-1">
        <TopBar />
        <div className="relative mx-auto max-w-5xl pb-[180px] transition-all lg:px-12">
          <AppIntroduce />
          {children}
        </div>
        <PromptInput />
      </div>
    </div>
  );
}

export default MainContainer;
