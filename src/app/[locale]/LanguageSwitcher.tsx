"use client";

import React, { useState, Fragment, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Check, ChevronsUpDown } from "lucide-react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next-intl/client";

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
		Language.find((item) => item.value === locale),
	);

	const switcherChange = (value: any) => {
		setSelected(value);
		router.push(`${value?.value}/${pathname}`);
	};

	return (
		<div>
			<Listbox value={selected} onChange={switcherChange}>
				<div className="relative mt-1">
					<Listbox.Button
						className="relative bg-neutral-50 border-neutral-600 border w-full cursor-default 
					rounded-lg py-2 pl-3 pr-10 text-left dark:bg-neutral-950"
					>
						<span className="block truncate">{selected?.name}</span>
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
						<Listbox.Options className="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-neutral-950 py-1 text-base shadow-lg dark:bg-neutral-50">
							{Language.map((language) => (
								<Listbox.Option
									key={language.value}
									className={({ active }) =>
										`relative cursor-default select-none py-2 pl-10 pr-4 ${
											active
												? "bg-neutral-50 text-neutral-950 dark:bg-neutral-900 dark:text-neutral-50"
												: "text-neutral-50 dark:text-neutral-950"
										}`
									}
									value={language}
								>
									{({ selected }) => (
										<>
											<span className="block truncate">{language.name}</span>
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

export default LanguageSwitcher;
