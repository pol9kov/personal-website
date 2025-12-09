import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "About | Egor Polyakov",
  description:
    "Backend engineer with 10+ years of experience. Building systems that handle complexity while remaining understandable.",
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
            <h1 className="mb-4 text-5xl font-bold leading-tight text-gray-900 dark:text-white">
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
              <div className="space-y-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                <p>{t("currentFocus.p1")}</p>
                <p>{t("currentFocus.p2")}</p>
              </div>
            </section>

            {/* Values */}
            <section className="rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 p-8 dark:from-blue-950/30 dark:to-purple-950/30">
              <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
                {t("values.title")}
              </h2>
              <ul className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
                <li>
                  <strong className="text-gray-900 dark:text-white">
                    {t("values.continuousLearning.title")}
                  </strong>{" "}
                  - {t("values.continuousLearning.text")}
                </li>
                <li>
                  <strong className="text-gray-900 dark:text-white">
                    {t("values.curiosity.title")}
                  </strong>{" "}
                  - {t("values.curiosity.text")}
                </li>
                <li>
                  <strong className="text-gray-900 dark:text-white">
                    {t("values.progress.title")}
                  </strong>{" "}
                  - {t("values.progress.text")}
                </li>
                <li>
                  <strong className="text-gray-900 dark:text-white">
                    {t("values.trust.title")}
                  </strong>{" "}
                  - {t("values.trust.text")}
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
