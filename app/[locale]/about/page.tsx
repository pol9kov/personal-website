import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "About | Egor Polyakov",
  description:
    "Solution Architect. I ask why before asking how.",
};

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-20 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-16 text-center">
            <h1 className="mb-4 text-5xl font-bold leading-snug text-gray-900 dark:text-white">
              {t("title")}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t("subtitle")}
            </p>
          </div>

          {/* Story Sections */}
          <div className="space-y-16">
            {/* Who I Am */}
            <section>
              <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
                {t("whoIAm.title")}
              </h2>
              <div className="space-y-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                <p>{t("whoIAm.p1")}</p>
                <p>{t("whoIAm.p2")}</p>
              </div>
            </section>

            {/* My Approach */}
            <section>
              <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
                {t("approach.title")}
              </h2>
              <div className="space-y-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                <p>{t("approach.p1")}</p>
                <p>{t("approach.p2")}</p>
              </div>
            </section>

            {/* Current Focus */}
            <section>
              <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
                {t("currentFocus.title")}
              </h2>
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                {t("currentFocus.p1")}
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
