import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Geist, Geist_Mono } from "next/font/google";
import { Header, Footer } from "@/components/shared";
import { Providers } from "@/components/providers/Providers";
import { routing } from "@/i18n/routing";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Egor Polyakov - Full-Stack Developer",
  description:
    "Personal website showcasing technical skills through code quality and architectural decisions",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "ru")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <div
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <NextIntlClientProvider messages={messages}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </NextIntlClientProvider>
    </div>
  );
}
