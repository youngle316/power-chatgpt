import React from "react";
import { Book } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useIsTypingState } from "~/store/chat";
import { useTranslations } from "next-intl";
import { useIsShowModal } from "~/store/promptLib";
import PromptLibModal from "~/components/promptLibModal/PromptLibModal";

function Prompts() {
  const { isTyping } = useIsTypingState();
  const { isShowModal, setIsShowModal } = useIsShowModal();

  const t = useTranslations("button");

  return (
    <>
      {!isTyping && (
        <Button
          className="flex gap-1.5 bg-amber-500 hover:bg-amber-400"
          onClick={() => setIsShowModal(true)}
        >
          <Book className="h-4 w-4" />
          {t("prompt")}
        </Button>
      )}
      {isShowModal && <PromptLibModal />}
    </>
  );
}

export default Prompts;
