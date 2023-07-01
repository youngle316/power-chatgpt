"use client";

import { Square } from "lucide-react";
import { useTranslations } from "next-intl";
import { useAbortController } from "~/store/chat";

type FunctionButtonType = {
  isTyping: boolean;
};

type ButtonType = {
  children: React.ReactNode;
  color: string;
  hoverColor: string;
  onClick?: () => void;
  icon: React.ReactNode;
};

function FunctionButton({ isTyping }: FunctionButtonType) {
  const t = useTranslations("button");

  const { abortController } = useAbortController();

  const stopGenerate = () => {
    abortController?.abort();
  };

  return (
    <div className="my-4 flex w-full flex-wrap items-center justify-center gap-2 px-4 text-center">
      {isTyping && (
        <Button
          color="bg-red-500"
          hoverColor="hover:bg-red-400"
          icon={<Square fill="white" className="h-4 w-4" />}
          onClick={stopGenerate}
        >
          {t("stop")}
        </Button>
      )}
    </div>
  );
}

function Button({ children, color, hoverColor, onClick, icon }: ButtonType) {
  return (
    <button
      className={`flex items-center gap-2 rounded-full px-4 py-1 text-sm ${color} ${hoverColor}`}
      onClick={onClick}
    >
      {icon}
      {children}
    </button>
  );
}

export default FunctionButton;
