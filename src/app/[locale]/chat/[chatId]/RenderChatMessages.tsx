import { useCopyToClipboard, useLocalStorage } from "usehooks-ts";
import { SIDEBAR_CHAT_STORAGE_KEY } from "~/const";
import { usePathname } from "next-intl/client";
import { useEnteredMessage, useIsCopied } from "~/store/chat";
import { Clipboard, ClipboardCheck, Settings, User } from "lucide-react";
import Image from "next/image";
import dayjs from "dayjs";
import ConvertToMarkdown from "~/components/ConvertToMarkdown";
import { useOpenModalState } from "~/store/page";

const RenderChatMessages = ({ messages }: { messages: MessagesItem }) => {
  const [sidebarData] = useLocalStorage<SideBarChatProps[]>(
    SIDEBAR_CHAT_STORAGE_KEY,
    []
  );
  const pathname = usePathname();

  const getChatModel = () =>
    sidebarData.find((item) => pathname.includes(item.id))?.chatModel || "";

  const { enterMessage, setEnterMessage } = useEnteredMessage();

  const { isCopied, setIsCopied } = useIsCopied();

  const [, copy] = useCopyToClipboard();

  const { setIsModalOpen } = useOpenModalState();

  const enterChatMessage = (messages: MessagesItem) => {
    setEnterMessage({
      id: messages.id as string,
      text: messages.text,
    });
  };

  const copyText = () => {
    copy(enterMessage.text)
      .then(() => {
        setIsCopied(true);
      })
      .catch(() => {
        setIsCopied(false);
      });
  };

  const mouseLeave = () => {
    setEnterMessage({ id: "", text: "" });
    setIsCopied(false);
  };

  return (
    <div
      className="mb-2 rounded-lg px-4"
      onMouseEnter={() => enterChatMessage(messages)}
      onMouseLeave={() => mouseLeave()}
    >
      <div className="relative min-h-[52px] scroll-mt-32 rounded-md pb-2 pl-14 pr-2 pt-2 hover:bg-neutral-50 dark:hover:bg-neutral-950">
        <div className="absolute left-2 top-2">
          <div
            className="group flex h-9 w-9 flex-none items-center justify-center overflow-hidden rounded-md
					bg-neutral-200 text-neutral-500 transition-all hover:bg-neutral-300 active:bg-neutral-200"
          >
            {messages.role === "user" && <User className="h-5 w-5" />}
            {messages.role === "system" && (
              <Settings
                onClick={() => setIsModalOpen(true)}
                className="h-5 w-5 cursor-pointer"
              />
            )}
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
        {messages.role !== "system" && enterMessage?.id === messages.id && (
          <div className="absolute bottom-[-8px] right-4 cursor-pointer">
            {isCopied ? (
              <ClipboardCheck className="h-6 w-6 text-lime-600" />
            ) : (
              <Clipboard
                onClick={copyText}
                className="h-6 w-6 hover:text-blue-600"
              />
            )}
          </div>
        )}
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
              <>
                <div className="text-xs text-neutral-600/50 dark:text-neutral-400/50">
                  {dayjs
                    .unix(messages.createAt as number)
                    .format("YYYY-MM-DD HH:mm:ss")}
                </div>
                <div className="prose prose-sm dark:prose-invert max-w-full break-words">
                  <ConvertToMarkdown value={messages.text} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenderChatMessages;
