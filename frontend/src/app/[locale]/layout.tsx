import clsx from "clsx";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { createTranslator, NextIntlClientProvider } from "next-intl";
import { Layout } from "@/utils/types";
import Navigation from "@/components/Header";
import Footer from "@/components/Footer";

import { useLocale } from "next-intl";
const locales = ["en", "tr"];

const inter = Inter({ subsets: ["latin"] });

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: {
    template: `%s | GLOBALTITLE`,
    default: "GLOBALTITLE",
  },
  openGraph: {
    images: '/og-image.jpg',
    title: {
      template: `%s | GLOBALTITLE`,
      default: "GLOBALTITLE",
    },
    description: 'The React Framework for the Web',
  },
};

async function getMessages(locale: string) {
  try {
    return (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: Layout) {
  const messages = await getMessages(locale);
  // Validate that the incoming `locale` parameter is valid
  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();
  return (
    <html lang={locale}>
      <body
        className={clsx(
          inter.className,
          "flex h-screen flex-col justify-between"
        )}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
