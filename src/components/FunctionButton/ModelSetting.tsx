import React from "react";
import { Settings } from "lucide-react";
import Button from "~/components/FunctionButton/Button";
import { useOpenModalState } from "~/store/page";
import { useTranslations } from "next-intl";
import { useSystemMessageRef } from "~/store/chat";
import { useSelectedChatId } from "~/store/sidebarStore";

function ModelSetting() {
  const { setIsModalOpen } = useOpenModalState();
  const { inView } = useSystemMessageRef();
  const { selectedChatId } = useSelectedChatId();

  const t = useTranslations("button");

  return (
    <>
      {!inView && selectedChatId && (
        <Button
          color="bg-gray-500"
          hoverColor="hover:bg-gray-400"
          icon={<Settings className="h-4 w-4" />}
          onClick={() => setIsModalOpen(true)}
        >
          {t("modelSetting")}
        </Button>
      )}
    </>
  );
}

export default ModelSetting;
