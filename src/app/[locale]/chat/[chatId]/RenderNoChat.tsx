import { useTranslations } from "next-intl";
import { AlertOctagon } from "lucide-react";

const RenderNoChat = () => {
  const t = useTranslations("Chat");

  return (
    <div className="flex items-center justify-center gap-1">
      <AlertOctagon className="h-5 w-5 text-orange-500" />
      {t("notFound")}
    </div>
  );
};

export default RenderNoChat;
