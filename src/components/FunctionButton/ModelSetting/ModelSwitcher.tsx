import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Models } from "~/const/switcher";

type ModelSwitcherProps = {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
};

function ModelSwitcher({ selected, setSelected }: ModelSwitcherProps) {
  return (
    <Select value={selected} onValueChange={setSelected}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a Model" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Models.map((model) => {
            return (
              <SelectItem key={model} value={model}>
                {model}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default ModelSwitcher;
