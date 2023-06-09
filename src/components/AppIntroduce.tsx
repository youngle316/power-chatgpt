"use client";

import React from "react";
import Logo from "./Logo";
import { APP_FEATURES } from "~/const";
import { BadgeCheck } from "lucide-react";
import { useTranslations } from "next-intl";

function AppIntroduce() {
	const t = useTranslations("APP");

	return (
		<div>
			<div className="flex gap-1 items-center justify-center space-x-2">
				<Logo />
				<div className="font-semibold text-4xl sm:text-5xl text-black dark:text-white ">
					Power
					<span className="text-blue-500">Chat</span>
				</div>
			</div>
			<div className="text-center my-4 font-light text-base sm:text-xl sm:my-6 text-black dark:text-white">
				A Power Tool for ChatGPT
			</div>
			<div className="flex items-center justify-center">
				<div className="my-4 grid sm:grid-cols-2 gap-y-2 gap-x-6">
					{APP_FEATURES.map((item) => {
						return (
							<div
								className="flex items-center justify-start space-x-1"
								key={item}
							>
								<>
									<BadgeCheck
										fill="rgb(74 222 128)"
										className="w-5 h-5 text-white"
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
