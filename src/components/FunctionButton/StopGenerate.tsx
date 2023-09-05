import React from "react";
import Button from "~/components/FunctionButton/Button";
import { Square } from "lucide-react";
import { useAbortController, useIsTypingState } from "~/store/chat";
import { useTranslations } from "next-intl";

function StopGenerate() {
  const { isTyping } = useIsTypingState();
  const { abortController } = useAbortController();

  const t = useTranslations("button");

  const stopGenerate = () => {
    abortController?.abort();
  };

  return (
    <>
      {isTyping && (
        <Button
          color="bg-red-500"
          hoverColor="hover:bg-red-400"
          icon={<Square fill="white" className="h-4 w-4" />}
          onClick={stopGenerate}
        >
          {t("stop")}
        </Button>
      )}
    </>
  );
}

export default StopGenerate;
