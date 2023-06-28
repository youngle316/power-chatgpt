"use client";

import React from "react";
import Logo from "./Logo";
import { APP_FEATURES } from "~/const";
import { BadgeCheck } from "lucide-react";
import { useTranslations } from "next-intl";

function AppIntroduce() {
  const t = useTranslations("APP");

  return (
    <div className="relative pb-12 pt-8">
      <div className="flex items-center justify-center gap-1 space-x-2">
        <Logo />
        <div className="text-4xl font-semibold text-neutral-950 dark:text-neutral-50 sm:text-5xl">
          Power
          <span className="text-blue-500">Chat</span>
        </div>
      </div>
      <div className="my-4 text-center text-base font-light text-neutral-950 dark:text-neutral-50 sm:my-6 sm:text-xl">
        A Power Tool for ChatGPT
      </div>
      <div className="flex items-center justify-center">
        <div className="my-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
          {APP_FEATURES.map((item) => {
            return (
              <div
                className="flex items-center justify-start space-x-1"
                key={item}
              >
                <>
                  <BadgeCheck
                    fill="rgb(74 222 128)"
                    className="h-5 w-5 text-white"
                  />
                  <span className="text-sm">{t(item)}</span>
                </>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AppIntroduce;
