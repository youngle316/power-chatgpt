import React, { Fragment } from "react";
import {
  MoreHorizontal,
  Github,
  Twitter,
  Rocket,
  HelpCircle,
} from "lucide-react";
import { Menu, Transition } from "@headlessui/react";
import { useTranslations } from "next-intl";

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

  const menuButtonCls = (active: boolean): string => {
    return `${
      active ? "bg-blue-500" : ""
    } group flex w-full items-center rounded-md px-2 py-2 text-sm`;
  };

  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="flex h-7 w-7 items-center justify-center hover:text-neutral-500">
            <MoreHorizontal className="h-5 w-5" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className="absolute left-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md
          bg-neutral-50 text-neutral-950 shadow-lg dark:bg-neutral-950 dark:text-neutral-50"
          >
            <div className="cursor-pointer px-1 py-1">
              {menuButtons.map(({ value, label, icon, href }) => {
                return (
                  <Menu.Item key={value}>
                    {({ active }) => (
                      <a
                        target="_blank"
                        href={href}
                        type="button"
                        className={`${menuButtonCls(active)}`}
                      >
                        {icon}
                        {label}
                      </a>
                    )}
                  </Menu.Item>
                );
              })}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

export default SideBarFooter;
