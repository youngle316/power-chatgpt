import React from "react";
import { Book } from "lucide-react";
import Button from "~/components/FunctionButton/Button";
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
          color="bg-amber-500"
          hoverColor="hover:bg-amber-400"
          icon={<Book className="h-4 w-4" />}
          onClick={() => setIsShowModal(true)}
        >
          {t("prompt")}
        </Button>
      )}
      {isShowModal && <PromptLibModal />}
    </>
  );
}

export default Prompts;
