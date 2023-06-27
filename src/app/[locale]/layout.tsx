import SideBar from "./SideBar";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { Analytics } from "@vercel/analytics/react";
import Toast from "~/provider/Toast";
import ThemesProviders from "~/provider/ThemeProvider";

export const metadata = {
  title: "Power ChatGPT",
  description: "Power ChatGPT Build With Next.js",
};

async function getMessages(locale: string) {
  try {
    return (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages(locale);
  return (
    <html lang={locale}>
      <body className="h-full bg-neutral-100 text-neutral-950 dark:bg-neutral-900 dark:text-neutral-50 transition-colors">
        <ThemesProviders>
          <Analytics />
          <Toast />
          <NextIntlClientProvider locale={locale} messages={messages}>
            <main className="h-full">
              <SideBar />
              {children}
            </main>
          </NextIntlClientProvider>
        </ThemesProviders>
      </body>
    </html>
  );
}
