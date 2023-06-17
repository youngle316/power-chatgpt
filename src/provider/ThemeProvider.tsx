"use client";

import { ThemeProvider } from "next-themes";

function ThemesProviders({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider
			attribute="class"
			// defaultTheme="system"
			// enableSystem
			// themes={["light", "dark", "system"]}
		>
			{children}
		</ThemeProvider>
	);
}

export default ThemesProviders;
