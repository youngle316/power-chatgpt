import "./globals.css";
import { Inter } from "next/font/google";
import SideBar from "./SideBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Power ChatGPT",
	description: "Power ChatGPT Build With Next.js",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="h-full bg-white text-black dark:bg-zinc-800 dark:text-white transition-colors">
				<main>
					<SideBar />
					{children}
				</main>
			</body>
		</html>
	);
}
