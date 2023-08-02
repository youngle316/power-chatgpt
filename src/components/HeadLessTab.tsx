import { motion } from "framer-motion";
import React from "react";
import { Tab } from "@headlessui/react";

type Tabs = {
  label: string;
  value: string;
};

type Contents = {
  value: React.ReactNode | string;
  key: string;
};

const HeadLessTab = ({
  tabs,
  content,
}: {
  tabs: Tabs[];
  content: Contents[];
}) => {
  return (
    <div>
      <Tab.Group>
        <Tab.List className="my-4 flex gap-2">
          {tabs.map((item) => {
            return (
              <Tab key={item.label}>
                {({ selected }) => (
                  <button
                    className={`relative ${selected ? "text-blue-500" : ""}`}
                  >
                    {item.label}
                    {selected ? (
                      <motion.div
                        className="absolute bottom-[-1px] left-0 right-0 h-[1px] bg-blue-500"
                        layoutId="underline"
                      />
                    ) : null}
                  </button>
                )}
              </Tab>
            );
          })}
        </Tab.List>
        <Tab.Panels>
          {content.map((item) => {
            return <Tab.Panel key={item.key}>{item.value}</Tab.Panel>;
          })}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default HeadLessTab;
