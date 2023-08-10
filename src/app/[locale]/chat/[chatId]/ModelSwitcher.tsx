"use client";

import React, { useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Models } from "~/const/switcher";

type ModelSwitcherProps = {
  selected: string;
  setSelected: (value: string) => void;
};

function ModelSwitcher({ selected, setSelected }: ModelSwitcherProps) {
  const switcherChange = (value: string) => {
    setSelected(value);
  };

  return (
    <div>
      <Listbox value={selected} onChange={switcherChange}>
        <div className="relative mt-1">
          <Listbox.Button
            className="relative w-full cursor-default rounded-lg border border-neutral-600
					bg-neutral-50 py-2 pl-3 pr-10 text-left dark:bg-neutral-950"
          >
            <span className="block truncate">{selected}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronsUpDown
                className="h-5 w-5 text-neutral-950 dark:text-neutral-50"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-neutral-50 py-1 text-base shadow-lg dark:bg-neutral-700">
              {Models.map((model) => (
                <Listbox.Option
                  key={model}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active
                        ? "bg-blue-400 text-neutral-950 dark:bg-blue-400 dark:text-neutral-50"
                        : "text-neutral-950 dark:text-neutral-50"
                    }`
                  }
                  value={model}
                >
                  {({ selected }) => (
                    <>
                      <span className="block truncate">{model}</span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                          <Check className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

export default ModelSwitcher;
