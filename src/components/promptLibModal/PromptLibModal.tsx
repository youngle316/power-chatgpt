import React from "react";
import { cnPrompts } from "~/const/prompts/cnPrompts";
import { enPrompts } from "~/const/prompts/enPrompts";
import PromptContent from "./PromptContent";
import { useTranslations } from "next-intl";
import { useIsShowModal } from "~/store/promptLib";
import CustomPrompt from "~/components/promptLibModal/CustomPrompt";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  Dialog,
} from "~/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

function PromptLibModal() {
  const { isShowModal, setIsShowModal } = useIsShowModal();

  const t = useTranslations("promptModal");

  return (
    <Dialog
      open={isShowModal}
      defaultOpen={false}
      onOpenChange={setIsShowModal}
    >
      <DialogContent className="max-h-[700px] max-w-xs sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t("promptLib")}</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="custom">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="custom">{t("yourPrompt")}</TabsTrigger>
            <TabsTrigger value="cn">中文</TabsTrigger>
            <TabsTrigger value="en">English</TabsTrigger>
          </TabsList>
          <TabsContent value="custom">
            <CustomPrompt />
          </TabsContent>
          <TabsContent value="cn">
            <PromptContent content={cnPrompts} />
          </TabsContent>
          <TabsContent value="en">
            <PromptContent content={enPrompts} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export default PromptLibModal;
