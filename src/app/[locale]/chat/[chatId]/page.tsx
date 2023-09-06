"use client";

import { useLocalStorage } from "usehooks-ts";
import { CHAT_MESSAGES_STORAGE_KEY } from "~/const";
import { usePathname } from "next-intl/client";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import {
  useAnswerNodeRef,
  useIsStreaming,
  useIsTypingState,
  useSystemMessageRef,
} from "~/store/chat";
import dayjs from "dayjs";
import { useEffect, useRef } from "react";
import { useSelectedChatId } from "~/store/sidebarStore";
import RenderNoChat from "./RenderNoChat";
import RenderChatMessages from "./RenderChatMessages";
import HeadLessDialog from "~/components/HeadLess/HeadLessDialog";
import PageModelSet from "./PageModelSet";
import { useChatContentRef, useOpenModalState } from "~/store/page";
import { useTranslations } from "next-intl";
import { useInView } from "react-intersection-observer";
import dynamic from "next/dynamic";

const MainContainer = dynamic(() => import("../../MainContainer"), {
  ssr: false,
});

function ChatPage() {
  const [chatMessage] = useLocalStorage<ChatMessages[]>(
    CHAT_MESSAGES_STORAGE_KEY,
    []
  );

  const pathname = usePathname();

  const { setSelectedChatId } = useSelectedChatId();

  useEffect(() => {
    setSelectedChatId(pathname.split("/").pop() || "");
  }, [pathname]);

  const { isTyping } = useIsTypingState();

  const messages = chatMessage.find((item) => pathname.includes(item.chatId));

  useEffect(() => {
    setAnswerNodeRef(answerNode);
  }, []);

  const answerNode = useRef(null);

  const { answerNodeRef, setAnswerNodeRef } = useAnswerNodeRef();

  const { isStreaming } = useIsStreaming();

  const { isModalOpen, setIsModalOpen } = useOpenModalState();

  const t = useTranslations("ModelSetting");

  const { setInView } = useSystemMessageRef();

  const { ref, inView } = useInView();

  useEffect(() => {
    setInView(inView);
  }, [inView]);

  const { setChatContentRef } = useChatContentRef();
  const chatContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setChatContentRef(chatContentRef);
  }, [chatContentRef]);

  return (
    <MainContainer>
      {messages ? (
        <>
          <div ref={ref} />
          <div ref={chatContentRef}>
            {messages?.messages.map((item) => {
              return <RenderChatMessages key={item.id} messages={item} />;
            })}
          </div>
        </>
      ) : (
        <RenderNoChat />
      )}

      <div
        key="answer"
        className={`mb-2 rounded-lg px-4 ${isStreaming ? "flex" : "hidden"}`}
      >
        <div className="relative min-h-[52px] scroll-mt-32 rounded-md pb-2 pl-14 pr-2 pt-2 hover:bg-neutral-50 dark:hover:bg-neutral-950">
          <div className="absolute left-2 top-2">
            <div
              className="group flex h-9 w-9 flex-none items-center justify-center overflow-hidden rounded-md
					bg-neutral-200 text-neutral-500 transition-all hover:bg-neutral-300 active:bg-neutral-200"
            >
              <Image
                className="h-5 w-5"
                alt="logo"
                src="/assets/logo.svg"
                width={20}
                height={20}
              />
            </div>
          </div>
          <div>
            <div className="text-xs text-neutral-600/50 dark:text-neutral-400/50">
              {dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss")}
            </div>
            <p
              ref={answerNodeRef}
              className="prose prose-sm max-w-full break-words dark:prose-invert"
            />
            {isStreaming && <p className="animate-pulse">...</p>}
          </div>
        </div>
      </div>

      {/* assistant is typing */}
      {isTyping && !isStreaming && (
        <div className="rounded-lg px-6">
          <div className="flex items-center space-x-2 text-sm text-neutral-500">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="animate-pulse">Assistant is typing...</span>
          </div>
        </div>
      )}

      {isModalOpen && (
        <HeadLessDialog
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          title={t("title")}
        >
          <PageModelSet />
        </HeadLessDialog>
      )}
    </MainContainer>
  );
}

export default ChatPage;
