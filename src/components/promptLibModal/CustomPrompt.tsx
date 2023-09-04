import { useLocalStorage } from "usehooks-ts";
import { CUSTOM_PROMPT_STORAGE_KEY } from "~/const";
import { PlusCircleIcon, PlusIcon } from "lucide-react";
import React, { useState } from "react";
import SearchInput from "~/components/SearchInput";
import { useTranslations } from "next-intl";
import PromptItem from "~/components/promptLibModal/PromptItem";
import toast from "react-hot-toast";

function CustomPrompt() {
  const [customPromptData, setCustomPromptData] = useLocalStorage<Prompts>(
    CUSTOM_PROMPT_STORAGE_KEY,
    { type: "custom", address: "custom", prompts: [] }
  );

  const [searchValue, setSearchValue] = useState("");
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [titleValue, setTitleValue] = useState<string>("");
  const [desValue, setDesValue] = useState<string>("");
  const [promptValue, setPromptValue] = useState<string>("");
  const [addBtnDis, setAddBtnDis] = useState<boolean>(false);

  const t = useTranslations("promptModal");

  const addPrompt = () => {
    if (titleValue === "" || promptValue === "") {
      return;
    }

    const customPromptTitle = customPromptData.prompts.map(
      (item) => item.title
    );
    if (customPromptTitle.includes(titleValue)) {
      toast(t("promptTitleExist"), { icon: "🤔" });
      return;
    }

    setAddBtnDis(true);

    const newCustomPrompt: Prompts = {
      type: "custom",
      address: "custom",
      prompts: [
        {
          title: titleValue,
          des: desValue,
          content: promptValue,
          source: "custom",
        },
      ],
    };

    setCustomPromptData({
      type: "custom",
      address: "custom",
      prompts: [...customPromptData.prompts, ...newCustomPrompt.prompts],
    });

    setAddBtnDis(false);
    setIsAdding(false);
    setTitleValue("");
    setDesValue("");
    setPromptValue("");
  };

  return (
    <>
      {isAdding ? (
        <div className="mb-4 flex flex-col gap-2 border-b pb-3">
          <div>
            <label className="form-label">{t("title")}</label>
            <SearchInput
              setData={setTitleValue}
              placeholder={t("promptTitle")}
            />
          </div>
          <div>
            <label className="form-label">{t("des")}</label>
            <SearchInput setData={setDesValue} placeholder={t("promptDes")} />
          </div>
          <div>
            <label className="form-label">{t("prompt")}</label>
            <textarea
              rows={4}
              className="basic-input"
              placeholder={t("promptContent")}
              onChange={(e) => setPromptValue(e.target.value)}
            />
          </div>
          <div className="flex justify-center gap-5">
            <button
              disabled={titleValue === "" || promptValue === ""}
              onClick={addPrompt}
              className="basic_button gap-1 text-blue-500 hover:text-blue-400 disabled:cursor-not-allowed disabled:text-neutral-500"
            >
              <PlusIcon className="h-4 w-4" />
              {t("addPrompt")}
            </button>
            <button
              className="basic_button hover:text-neutral-400"
              onClick={() => setIsAdding(false)}
            >
              {t("cancelAddPrompt")}
            </button>
          </div>
        </div>
      ) : (
        <div className="mb-4 flex flex-col gap-3 border-b pb-3">
          <div className="flex">
            <div className="flex-1">
              <SearchInput
                setData={setSearchValue}
                placeholder={t("searchPrompt")}
              />
            </div>
            <div className="flex">
              <button
                disabled={addBtnDis}
                onClick={() => setIsAdding(true)}
                className="basic_button gap-1"
              >
                <PlusCircleIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
          <div
            className={`${
              customPromptData?.prompts.length === 0 &&
              "rounded-lg border border-dashed border-gray-700 px-5 py-3 text-sm text-gray-400 dark:border-white"
            }`}
          >
            {customPromptData?.prompts.length === 0 ? (
              <p>{t("noCustomPrompt")}</p>
            ) : (
              customPromptData?.prompts.map((item) => {
                const { title, des, source, content } = item;
                if (title.includes(searchValue)) {
                  return (
                    <PromptItem
                      key={item.title}
                      prompt={{ title, des, source, content }}
                    />
                  );
                }
              })
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default CustomPrompt;
