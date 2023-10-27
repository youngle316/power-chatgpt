import { Moon, Sun, Cog } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

type ThemeProps = {
  value: string;
  icon?: React.ReactNode;
  label?: string;
};

const Theme: ThemeProps[] = [
  { value: "system", icon: <Cog size={16} />, label: "System" },
  { value: "dark", icon: <Moon size={16} />, label: "Dark" },
  { value: "light", icon: <Sun size={16} />, label: "Light" },
];

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const [selected, setSelected] = useState(
    Theme.find((item) => item.value === theme)?.value as string
  );

  const switcherChange = (value: string) => {
    setSelected(value);
    setTheme(value);
  };

  return (
    <Select value={selected} onValueChange={switcherChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a Model" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Theme.map(({ icon, value, label }) => {
            return (
              <SelectItem key={value} value={value}>
                <div className="flex items-center gap-1">
                  {icon}
                  {label}
                </div>
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default ThemeSwitcher;
