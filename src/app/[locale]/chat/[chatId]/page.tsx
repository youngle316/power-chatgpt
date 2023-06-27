"use client";

import { useLocalStorage } from "usehooks-ts";
import MainContainer from "../../MainContainer";
import { CHAT_MESSAGES_STORAGE_KEY, SIDEBAR_CHAT_STORAGE_KEY } from "~/const";
import { usePathname } from "next-intl/client";
import { Settings, User, Loader2, AlertOctagon } from "lucide-react";
import Image from "next/image";
import ConvertToMarkdown from "~/components/ConvertToMarkdown";
import { useIsTypingState } from "~/store/chat";
import { useTranslations } from "next-intl";

function ChatPage() {
  const [chatMessage] = useLocalStorage<ChatMessages[]>(
    CHAT_MESSAGES_STORAGE_KEY,
    []
  );

  const pathname = usePathname();

  const { isTyping } = useIsTypingState();

  const messages = chatMessage.find((item) => pathname.includes(item.chatId));

  return (
    <MainContainer>
      {messages ? (
        messages?.messages.map((item) => {
          return <RenderChatMessages key={item.id} messages={item} />;
        })
      ) : (
        <RenderNoChat />
      )}
      {/* assistant is typing */}
      {isTyping && (
        <div className="rounded-lg px-6">
          <div className="flex items-center space-x-2 text-sm text-neutral-500">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="animate-pulse">Assistant is typing...</span>
          </div>
        </div>
      )}
    </MainContainer>
  );
}

export default ChatPage;

const RenderNoChat = () => {
  const t = useTranslations("Chat");
  return (
    <div className="flex items-center justify-center gap-1">
      <AlertOctagon className="h-5 w-5 text-orange-500" />
      {t("notFound")}
    </div>
  );
};

const RenderChatMessages = ({ messages }: { messages: MessagesItem }) => {
  const [sidebarData] = useLocalStorage<SideBarChatProps[]>(
    SIDEBAR_CHAT_STORAGE_KEY,
    []
  );
  const pathname = usePathname();

  const getChatModel = () =>
    sidebarData.find((item) => pathname.includes(item.id))?.chatModel || "";

  return (
    <div className="mb-2 rounded-lg px-4">
      <div className="relative min-h-[52px] scroll-mt-32 rounded-md pb-2 pl-14 pr-2 pt-2 hover:bg-neutral-50 dark:hover:bg-neutral-950">
        <div className="absolute left-2 top-2">
          <div
            className="group flex h-9 w-9 flex-none items-center justify-center overflow-hidden rounded-md 
					bg-neutral-200 text-neutral-500 transition-all hover:bg-neutral-300 active:bg-neutral-200"
          >
            {messages.role === "user" && <User className="h-5 w-5" />}
            {messages.role === "system" && <Settings className="h-5 w-5" />}
            {messages.role === "assistant" && (
              <Image
                className="h-5 w-5"
                alt="logo"
                src="/assets/logo.svg"
                width={20}
                height={20}
              />
            )}
          </div>
        </div>
        {/* TODO: Hover Button */}
        {/* <div>HoverButton</div> */}
        <div className="w-full">
          <div>
            {messages.role === "system" && (
              <>
                <div className="mb-1 whitespace-pre-line text-xs text-neutral-500">
                  model: {getChatModel()}
                </div>
                <div className="mb-1 whitespace-pre-line text-xs text-neutral-500">
                  {messages.text}
                </div>
              </>
            )}
            {messages.role === "user" && (
              <div
                className="highlight-darkblue w-fit max-w-full space-y-2 overflow-auto whitespace-pre-wrap break-words rounded-lg bg-blue-500 
							px-4 py-2 text-sm text-neutral-50 focus:outline"
              >
                {messages.text}
              </div>
            )}
            {messages.role === "assistant" && (
              <div className="prose prose-sm max-w-full break-words dark:prose-invert">
                <ConvertToMarkdown value={messages.text} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
