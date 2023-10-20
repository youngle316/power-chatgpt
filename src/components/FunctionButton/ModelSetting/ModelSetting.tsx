import React from "react";
import { Settings } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useTranslations } from "next-intl";
import { useSystemMessageRef } from "~/store/chat";
import { useSelectedChatId } from "~/store/sidebarStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import PageModelSet from "./PageModelSet";

function ModelSetting() {
  const { inView } = useSystemMessageRef();
  const { selectedChatId } = useSelectedChatId();

  const t = useTranslations("button");
  const tModelSetting = useTranslations("ModelSetting");

  return (
    <>
      {!inView && selectedChatId && (
        <>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex gap-1.5 bg-gray-500 hover:bg-gray-400">
                <Settings className="h-4 w-4" />
                {t("modelSetting")}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
              <DialogHeader>
                <DialogTitle>{tModelSetting("title")}</DialogTitle>
              </DialogHeader>
              <PageModelSet />
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
}

export default ModelSetting;
