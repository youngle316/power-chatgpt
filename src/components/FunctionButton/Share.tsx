import React, { Fragment, useState } from "react";
import { Share2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useTranslations } from "next-intl";
import {
  useOpenShareModal,
  useChatContentRef,
  useGptUrlModal,
  useGptUrl,
} from "~/store/page";
import { Image, FileJson, Link2 } from "lucide-react";
import { useSelectedChatId } from "~/store/sidebarStore";
import { toPng } from "html-to-image";
import dayjs from "dayjs";
import { useLocalStorage } from "usehooks-ts";
import { CHAT_MESSAGES_STORAGE_KEY } from "~/const";
import fileDownload from "js-file-download";
import { useIsTypingState } from "~/store/chat";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

type ConversationDataType = {
  avatarUrl: string;
  items: { from: string; value: string }[];
};

function Share() {
  const [shareGPTDis, setShareGPTDis] = useState(false);

  const t = useTranslations("button");
  const tModal = useTranslations("shareModal");

  const { isShareModalOpen, setIsShareModalOpen } = useOpenShareModal();
  const { selectedChatId } = useSelectedChatId();
  const { chatContentRef } = useChatContentRef();
  const { isGptUrlModalOpen, setIsGptUrlModalOpen } = useGptUrlModal();
  const { gptUrl, setGptUrl } = useGptUrl();
  const { isTyping } = useIsTypingState();

  const [chatMessage] = useLocalStorage<ChatMessages[]>(
    CHAT_MESSAGES_STORAGE_KEY,
    []
  );

  const shareByImage = () => {
    const ref = chatContentRef?.current as HTMLDivElement;
    if (ref === null) {
      return;
    }

    toPng(ref, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `${selectedChatId}-${dayjs().format(
          "YYYY-MM-DD HH:mm:ss"
        )}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const shareByJSON = () => {
    try {
      const exportData = chatMessage.find(
        (item) => item.chatId === selectedChatId
      );

      const fileName = `${selectedChatId}-${dayjs().format(
        "YYYY-MM-DD HH:mm:ss"
      )}`;
      fileDownload(JSON.stringify({ data: exportData }), `${fileName}.json`);
    } catch (error) {
      console.log(error);
    }
  };

  const shareByShareGPT = async () => {
    setShareGPTDis(true);
    const exportData = chatMessage
      .find((item) => item.chatId === selectedChatId)
      ?.messages.map((item) => {
        let from: string;
        if (item.role === "user") {
          from = "human";
        } else {
          from = "gpt";
        }
        return {
          from,
          value: item.text,
        };
      });

    const conversationData: ConversationDataType = {
      avatarUrl: "",
      items: exportData as ConversationDataType["items"],
    };
    const res = await fetch("https://sharegpt.com/api/conversations", {
      body: JSON.stringify(conversationData),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    setShareGPTDis(false);
    const { id } = await res.json();
    setGptUrl(`https://shareg.pt/${id}`);
    setIsShareModalOpen(false);
    setIsGptUrlModalOpen(true);
  };

  const shareMethods = [
    {
      buttonTitle: "JSON",
      onClick: shareByJSON,
      description: `${tModal("saveAsJSON")}`,
      icon: <FileJson className="h-5 w-5" />,
    },
    {
      buttonTitle: `${tModal("image")} / PNG`,
      onClick: shareByImage,
      description: `${tModal("saveAsPng")}`,
      icon: <Image className="h-5 w-5" />,
    },
    {
      buttonTitle: "ShareGPT",
      onClick: shareByShareGPT,
      description: `${tModal("saveAsShareGPT")}`,
      icon: <Link2 className="h-5 w-5" />,
      disabled: shareGPTDis,
    },
  ];

  return (
    <>
      {selectedChatId && !isTyping && (
        <Button
          className="flex gap-1.5 bg-violet-500 hover:bg-violet-400"
          onClick={() => setIsShareModalOpen(true)}
        >
          <Share2 className="h-4 w-4" />
          {t("share")}
        </Button>
      )}

      {isShareModalOpen && (
        <Dialog
          open={isShareModalOpen}
          defaultOpen={false}
          onOpenChange={setIsShareModalOpen}
        >
          <DialogContent className="max-w-xs sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{t("share")}</DialogTitle>
            </DialogHeader>
            <div>
              <div className="text-center font-semibold">
                {tModal("shareMethod")}
              </div>
              <div className="my-4">
                <div className="grid grid-cols-2 gap-4">
                  {shareMethods.map((item) => {
                    const {
                      buttonTitle,
                      onClick,
                      description,
                      icon,
                      disabled,
                    } = item;
                    return (
                      <Fragment key={buttonTitle}>
                        <div className="flex items-center justify-end">
                          <button
                            className={`basic_button gap-1 bg-blue-700 px-4 py-2 text-white hover:bg-blue-500 ${
                              disabled
                                ? "cursor-not-allowed disabled:bg-neutral-500"
                                : ""
                            }`}
                            onClick={onClick}
                            disabled={disabled}
                          >
                            {icon}
                            {buttonTitle}
                          </button>
                        </div>
                        <div className="flex items-center text-sm">
                          {description}
                        </div>
                      </Fragment>
                    );
                  })}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {isGptUrlModalOpen && (
        <Dialog
          open={isGptUrlModalOpen}
          defaultOpen={false}
          onOpenChange={setIsGptUrlModalOpen}
        >
          <DialogContent className="max-w-xs sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>ShareGPT Url</DialogTitle>
            </DialogHeader>
            <div className="text-center text-sm">{tModal("shareUrl")}</div>
            <div className="my-4 text-center">
              <a
                href={gptUrl}
                target="_blank"
                className="text-blue-500 hover:text-blue-400"
              >
                {gptUrl}
              </a>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default Share;
