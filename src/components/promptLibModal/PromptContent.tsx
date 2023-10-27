import PromptItem from "./PromptItem";
import { useState } from "react";
import { useTranslations } from "next-intl";
import SearchInput from "~/components/SearchInput";

type promptContentProps = {
  content: Prompts;
};

function PromptContent({ content }: promptContentProps) {
  const [searchValue, setSearchValue] = useState<string>("");

  const t = useTranslations("promptModal");

  return (
    <>
      <div className="my-4 flex gap-3">
        <div className="flex-1">
          <SearchInput
            setData={setSearchValue}
            placeholder={t("searchPrompt")}
          />
        </div>
        <div className="flex items-center justify-center text-sm">
          <a
            href={`${
              content.type === "en"
                ? "https://github.com/f/awesome-chatgpt-prompts"
                : "https://github.com/PlexPt/awesome-chatgpt-prompts-zh"
            }`}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-blue-500/80 hover:text-blue-500"
          >
            {t("promptsSource")}
          </a>
        </div>
      </div>
      <div className="mb-2 flex max-h-[520px] flex-col gap-3 overflow-y-scroll border-b pb-4">
        {content.prompts.map((prompt: Prompt) => {
          if (prompt.title.includes(searchValue)) {
            return <PromptItem key={prompt.source} prompt={prompt} />;
          }
        })}
      </div>
    </>
  );
}

export default PromptContent;
