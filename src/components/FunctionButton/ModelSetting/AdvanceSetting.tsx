import React from "react";
import { ChevronsUpDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { Button } from "~/components/ui/button";
import { useTranslations } from "next-intl";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useSelectedLimit } from "~/store/page";

const contextLimitData = [
  { label: "Last 1 message", value: 1 },
  { label: "Last 2 messages", value: 2 },
  { label: "Last 3 messages", value: 3 },
  { label: "Last 4 messages", value: 4 },
  { label: "Last 5 messages", value: 5 },
  { label: "Last 6 messages", value: 6 },
  { label: "Last 7 messages", value: 7 },
  { label: "Last 8 messages", value: 8 },
  { label: "Last 9 messages", value: 9 },
  { label: "Last 10 messages", value: 10 },
];

function AdvanceSetting() {
  const [isOpen, setIsOpen] = React.useState(false);

  const t = useTranslations("ModelSetting");

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="max-w-xl space-y-2"
    >
      <div className="flex items-center justify-between space-x-4">
        <h4 className="text-sm font-semibold">{t("advancedOptions")}</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="grid w-full items-center">
          <Label>{t("contextLimit")}</Label>
          <div className="my-2 text-xs text-neutral-600">
            {t("contextLimitDes")}
          </div>
          <ContextLimitSwitcher />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

const ContextLimitSwitcher = () => {
  const { contextLimit, setContextLimit } = useSelectedLimit();
  console.log("contextLimit", contextLimit);

  return (
    <Select
      value={contextLimit.toString()}
      onValueChange={(value) => setContextLimit(Number(value))}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a Model" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {contextLimitData.map((context) => {
            return (
              <SelectItem key={context.value} value={context.value.toString()}>
                {context.label}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default AdvanceSetting;
