import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Imperia OS | Egor Polyakov",
  description:
    "An AI assistant and the platform that goal requires. The algorithm controls the flow, not the LLM.",
};

interface ImperiaOSPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ImperiaOSPage({ params }: ImperiaOSPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("imperiaOs");

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-24 pb-20 sm:py-20 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          {/* Hero */}
          <div className="mb-16 text-center">
            <h1 className="mb-4 text-3xl sm:text-4xl font-bold leading-snug text-gray-900 dark:text-white">
              {t("title")}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t("subtitle")}
            </p>
            {/* ОДНА дверь в платформу с этой страницы — живой юзкейз-пример:
                гость открывает спеку Message, пишет агенту и видит свой ход
                примером на той же странице. Остальное здесь — словами. */}
            <a
              href="https://imperiaos.com/spec/message"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-lg font-medium text-white transition-colors hover:bg-blue-700"
            >
              {t("tryDemo")}
            </a>
            <p className="mx-auto mt-4 max-w-xl text-sm text-gray-500 dark:text-gray-400">
              {t("tryDemoCaption")}
            </p>
          </div>

          <div className="space-y-16">
            {/* Dream — открытие: триптих Егора «обо всём / для всего», гвоздь про архитектуру */}
            <section className="text-center">
              <p className="text-2xl font-medium leading-relaxed text-gray-900 dark:text-white">
                {t("dream.lead")}
              </p>
            </section>

            {/* Доказательство: платформа строит себя сама — компания одного человека */}
            <section>
              <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
                {t("proof.title")}
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                {t("proof.text")}
              </p>
            </section>

            {/* Внутри: след каждого действия — без техники */}
            <section>
              <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
                {t("inside.title")}
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                {t("inside.text")}
              </p>
            </section>

            {/* Дальше: обмен полками между ассистентами — этаж 3, «кто дошёл, тот дошёл» */}
            <section>
              <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
                {t("next.title")}
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                {t("next.text")}
              </p>
            </section>

          </div>
        </div>
      </div>
    </main>
  );
}
