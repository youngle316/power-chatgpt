import React from "react";
import { Settings } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useTranslations } from "next-intl";
import { useSystemMessageRef } from "~/store/chat";
import { useSelectedChatId } from "~/store/sidebarStore";
import { useOpenModalState } from "~/store/page";
import ModelSettingDialog from "./ModelSettingDialog";

function ModelSetting() {
  const { inView } = useSystemMessageRef();
  const { selectedChatId } = useSelectedChatId();
  const { isModalOpen, setIsModalOpen } = useOpenModalState();

  const t = useTranslations("button");

  return (
    <>
      {!inView && selectedChatId && (
        <Button
          onClick={() => setIsModalOpen(true)}
          className="flex gap-1.5 bg-gray-500 hover:bg-gray-400"
        >
          <Settings className="h-4 w-4" />
          {t("modelSetting")}
        </Button>
      )}
      {isModalOpen && <ModelSettingDialog />}
    </>
  );
}

export default ModelSetting;
