import React from "react";
import { Button } from "~/components/ui/button";
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
          className="flex gap-1.5 bg-red-500 hover:bg-red-400"
          onClick={stopGenerate}
        >
          <Square fill="white" className="h-4 w-4" />
          {t("stop")}
        </Button>
      )}
    </>
  );
}

export default StopGenerate;
