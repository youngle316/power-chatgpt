import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import PageModelSet from "~/components/FunctionButton/ModelSetting/PageModelSet";
import { useOpenModalState } from "~/store/page";
import { useTranslations } from "next-intl";

function ModelSettingDialog() {
  const { isModalOpen, setIsModalOpen } = useOpenModalState();

  const tModelSetting = useTranslations("ModelSetting");

  return (
    <Dialog
      open={isModalOpen}
      defaultOpen={false}
      onOpenChange={setIsModalOpen}
    >
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{tModelSetting("title")}</DialogTitle>
        </DialogHeader>
        <PageModelSet />
      </DialogContent>
    </Dialog>
  );
}

export default ModelSettingDialog;
