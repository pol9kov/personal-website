import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Imperia OS | Egor Polyakov",
  description:
    "An app about life: it remembers everything and it is there for everything. Built by one person — as the platform's own work.",
};

interface ImperiaOSPageProps {
  params: Promise<{ locale: string }>;
}

/**
 * Страница говорит на языке сайта (герой главной): градиентный заголовок,
 * тихий подзаголовок, ссылка ТЕКСТОМ вместо кнопки-таблетки, воздух и
 * левое выравнивание. Секции — смысловые фразы, не ярлыки-этикетки.
 */
export default async function ImperiaOSPage({ params }: ImperiaOSPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("imperiaOs");

  const sections = ["proof", "inside", "next"] as const;

  return (
    <main className="bg-gradient-to-b from-white to-gray-50 pt-28 pb-24 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl">
          {/* Герой */}
          <h1 className="inline text-4xl font-bold leading-snug text-gray-900 sm:text-5xl md:text-6xl dark:text-white">
            {t("title")}
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 sm:text-2xl">
            {t("subtitle")}
          </p>

          {/* ОДНА дверь — живой виджет самой платформы в герое: не обещание
              «она работает», а её дышащие цифры (его крой 2026-08-13: ссылка
              стала лишней — её работу делает виджет). Клик по виджету — внутрь. */}
          <div className="mt-8">
            <iframe
              src="https://imperiaos.com/widget/executor"
              title="Imperia OS — live"
              loading="lazy"
              className="h-52 w-full rounded-xl border border-gray-200 dark:border-gray-800"
            />
            {/* Действие — ссылкой в языке сайта, не серой подписью-описанием
                (его нож 2026-08-13: «подпись идёт будто к виджету»). */}
            <a
              href="https://imperiaos.com/spec/message"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-base font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              {t("tryDemoCaption")} →
            </a>
          </div>

          {/* Мечта — крупная строфа, гвоздь градиентом */}
          <p className="mt-24 text-2xl font-medium leading-relaxed text-gray-900 dark:text-white sm:text-3xl">
            {t("dream.lead")}{" "}
            <span className="font-bold">{t("dream.nail")}</span>
          </p>

          <div className="mt-20 space-y-16">
            {sections.map((k) => (
              <section key={k}>
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  {t(`${k}.title`)}
                </h2>
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  {t(`${k}.text`)}
                </p>
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
