"use client";

import React, { useState } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next-intl/client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

type LanguageProps = {
  name: string;
  value: string;
};

const Language: LanguageProps[] = [
  { name: "🇨🇳 简体中文", value: "zh" },
  { name: "🇺🇸 English", value: "en" },
];

function LanguageSwitcher() {
  const locale = useLocale();

  const router = useRouter();

  const pathname = usePathname();

  const [selected, setSelected] = useState(
    Language.find((item) => item.value === locale)?.value as string
  );

  const switcherChange = (value: string) => {
    setSelected(value);
    router.push(`${value}/${pathname}`);
  };

  return (
    <div>
      <Select value={selected} onValueChange={switcherChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a Model" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {Language.map(({ name, value }) => {
              return (
                <SelectItem key={value} value={value}>
                  {name}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default LanguageSwitcher;
