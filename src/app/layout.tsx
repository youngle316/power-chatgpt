import "./globals.css";
import SideBar from "./SideBar";

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
				<main className="h-full">
					<SideBar />
					{children}
				</main>
			</body>
		</html>
	);
}
