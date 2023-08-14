import { ArrowRight } from "lucide-react";
import { textAreaAutoHeight } from "~/tools";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useInputPromptState } from "~/store/chat";
import { useIsShowModal } from "~/store/promptLib";

type PromptItemProps = {
  prompt: Prompt;
};

function PromptItem({ prompt }: PromptItemProps) {
  const { inputPrompt, setInputPrompt } = useInputPromptState();
  const { setIsShowModal } = useIsShowModal();
  const usePromptLib = () => {
    setInputPrompt(prompt.content);
    setIsShowModal(false);
  };

  const t = useTranslations("promptModal");

  useEffect(() => {
    textAreaAutoHeight("chatTextArea");
  }, [inputPrompt]);

  return (
    <div className="flex items-center justify-between gap-3 space-x-2 rounded border border-neutral-200 bg-white/80 p-4 shadow-sm dark:border-neutral-600 dark:bg-black">
      <div className="flex flex-1 items-center font-bold text-neutral-800 dark:text-white">
        {prompt.title}
      </div>
      <div className="w-30">
        <button
          onClick={usePromptLib}
          className="basic_button bg-blue-500 text-neutral-50 hover:bg-blue-400"
        >
          {t("usePrompt")}
          <ArrowRight className="-mr-1 ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default PromptItem;
