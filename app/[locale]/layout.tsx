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

type LocaleParam = { locale: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<LocaleParam>;
}): Promise<Metadata> {
  const { locale } = await params;

  const isRu = locale === "ru";
  const name = isRu ? "Егор Поляков" : "Egor Polyakov";
  const title = `${name} - Software Engineer`;
  const description = isRu
    ? "Более 10 лет опыта в создании универсальных фреймворков и элегантных архитектурных решений"
    : "Software Engineer with 10+ years of experience building universal frameworks and elegant architectural solutions";

  return {
    title,
    description,
    metadataBase: new URL("https://egor-polyakov.vercel.app"),
    openGraph: {
      title,
      description,
      url: `https://egor-polyakov.vercel.app/${locale}`,
      siteName: name,
      locale: isRu ? "ru_RU" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

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
