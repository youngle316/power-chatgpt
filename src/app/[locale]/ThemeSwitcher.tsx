import { Listbox, Transition } from "@headlessui/react";
import { ChevronsUpDown, Check, Moon, Sun, Cog } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { Fragment, useState } from "react";

type ThemeProps = {
	value: string;
	icon?: React.ReactNode;
};

const Theme: ThemeProps[] = [
	{ value: "system", icon: <Cog className="h-5 w-5" /> },
	{ value: "dark", icon: <Moon className="h-5 w-5" /> },
	{ value: "light", icon: <Sun className="h-5 w-5" /> },
];

function ThemeSwitcher() {
	const { theme, setTheme } = useTheme();

	const t = useTranslations("Setting");

	const [selected, setSelected] = useState(
		Theme.find((item) => item.value === theme),
	);

	const switcherChange = (value: any) => {
		setSelected(value);
		setTheme(value.value);
	};

	return (
		<div>
			<Listbox value={selected} onChange={switcherChange}>
				<div className="relative mt-1">
					<Listbox.Button className="relative bg-gray-50 border border-gray-300 w-full cursor-default rounded-lg py-2 pl-3 pr-10 text-left dark:bg-gray-700">
						<span className="block truncate">{t(selected?.value)}</span>
						<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
							<ChevronsUpDown
								className="h-5 w-5 text-gray-400"
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
						<Listbox.Options className="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-700">
							{Theme.map((theme) => (
								<Listbox.Option
									key={theme.value}
									className={({ active }) =>
										`relative cursor-default select-none py-2 pl-10 pr-4 ${
											active
												? "bg-blue-100 text-blue-900"
												: "text-gray-900 dark:text-white"
										}`
									}
									value={theme}
								>
									{({ selected }) => (
										<>
											<span
												className={`block truncate ${
													selected ? "font-medium" : "font-normal"
												}`}
											>
												<div className="flex gap-1 items-center">
													{theme?.icon}
													{t(theme?.value)}
												</div>
											</span>
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

export default ThemeSwitcher;
