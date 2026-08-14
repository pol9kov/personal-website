import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Header, Footer } from "@/components/shared";
import { Providers } from "@/components/providers/Providers";
import { routing } from "@/i18n/routing";
import "../globals.css";

type LocaleParam = { locale: string };

/*
 * ОТПЕЧАТОК СБОРКИ — ЛИЧНОСТЬ СТРАНИЦЫ, БЕЗ КОТОРОЙ «ВСТАЛО НА ЖИВОЙ»
 * НЕРАЗРЕШИМО.
 *
 * Разбор 2026-08-14 (класс owner-bafflement, объект
 * site-live-check-ignores-reader-cache): агент сказал «встало на живой, все три
 * языка», владелец ответил «там всё как было». ОБА были правы. Замер: 67ba292
 * запушен 10:07:07Z, край Vercel закэшировал НОВУЮ сборку в 10:08:00
 * (age 760 при выборке 10:20:40Z), владелец смотрел в 10:10Z — то есть на краю
 * уже лежало новое, а его webview просто не переспросил.
 *
 * КОРЕНЬ НЕ В КЭШЕ, А В ТОМ, ЧТО ЕГО НЕЧЕМ БЫЛО РАЗЛИЧИТЬ: страница не несла
 * НИКАКОГО отпечатка сборки (ни buildId, ни sha — проверено grep'ом по живому
 * HTML). Поэтому «живость» проверялась СОДЕРЖИМЫМ: агент читал свежий fetch,
 * владелец читал свою копию, общего различителя не существовало в принципе, и
 * расхождение мог поймать только сам владелец.
 *
 * Отсюда — один мета-тег. Он ничего не показывает читателю и нужен ровно затем,
 * чтобы вопрос «это моя сборка?» имел МАШИННЫЙ ответ вместо сверки абзацев.
 * Читает его проба соседнего репозитория imperiaos
 * (packages/dev-platform/scripts/site-live-stamp-probe.ts) — она же выдаёт
 * ссылку, которую кэш читателя не может обслужить.
 *
 * Значение приходит из системной переменной Vercel на СБОРКЕ: страницы
 * пререндерятся (x-nextjs-prerender: 1), поэтому sha впекается в HTML.
 * Локально переменной нет — там честное "dev", а не выдуманный sha.
 */
const BUILD_COMMIT = process.env.VERCEL_GIT_COMMIT_SHA ?? "dev";

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
    other: {
      "build-commit": BUILD_COMMIT,
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
