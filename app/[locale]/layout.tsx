import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Header, Footer } from "@/components/shared";
import { Providers } from "@/components/providers/Providers";
import { routing } from "@/i18n/routing";
import "../globals.css";

type LocaleParam = { locale: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<LocaleParam>;
}): Promise<Metadata> {
  const { locale } = await params;

  const isRu = locale === "ru";
  const name = isRu ? "Егор Поляков" : "Egor Polyakov";
  const title = isRu ? "Backend & AI инженер" : "Backend & AI Engineer";
  const description = isRu
    ? "Агентные платформы и LLM-инфраструктура: потоком управляет алгоритм, а не LLM"
    : "Agent platforms and LLM infrastructure: the algorithm controls the flow, not the LLM";

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
      images: [
        {
          url: "https://egor-polyakov.vercel.app/api/og",
          width: 1200,
          height: 630,
          alt: "Egor Polyakov - Agent Platforms and LLM Infrastructure",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://egor-polyakov.vercel.app/api/og"],
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
      className="antialiased flex min-h-screen flex-col"
    >
      {/* Липкий футер: колонка в высоту экрана, main (flex-1) занимает
          остаток — футер виден без скролла на короткой странице и уезжает
          вниз на длинной. min-h-screen на САМИХ страницах толкал футер за
          экран везде (его специмен 2026-08-13). */}
      <NextIntlClientProvider messages={messages}>
        <Providers>
          <Header />
          <div className="flex flex-1 flex-col [&>main]:flex-1">
            {children}
          </div>
          <Footer />
        </Providers>
      </NextIntlClientProvider>
    </div>
  );
}
