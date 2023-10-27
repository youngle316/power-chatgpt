import React from "react";
import {
  MoreHorizontal,
  Github,
  Twitter,
  Rocket,
  HelpCircle,
} from "lucide-react";
import { useTranslations } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

function SideBarFooter() {
  const t = useTranslations("NavPage");

  const menuButtons = [
    {
      value: "GitHub",
      label: "GitHub",
      icon: <Github className="mr-2 h-5 w-5" aria-hidden="true" />,
      href: "https://github.com/youngle316/power-chatgpt",
    },
    {
      value: "Twitter",
      label: "Twitter",
      icon: <Twitter className="mr-2 h-5 w-5" aria-hidden="true" />,
      href: "https://twitter.com/youngle316",
    },
    {
      value: "feedback",
      label: t("feedback"),
      icon: <HelpCircle className="mr-2 h-5 w-5" aria-hidden="true" />,
      href: "https://github.com/youngle316/power-chatgpt/issues",
    },
    {
      value: "updateLog",
      label: t("updateLog"),
      icon: <Rocket className="mr-2 h-5 w-5" aria-hidden="true" />,
      href: "https://github.com/youngle316/power-chatgpt/releases",
    },
  ];

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <MoreHorizontal className="h-5 w-5 hover:cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {menuButtons.map(({ value, label, icon, href }) => {
            return (
              <DropdownMenuItem key={value}>
                <a
                  className="flex items-center gap-1 hover:cursor-default"
                  target="_blank"
                  href={href}
                >
                  {icon}
                  {label}
                </a>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default SideBarFooter;
