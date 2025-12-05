import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "About | Egor Polyakov",
  description:
    "Learn more about my journey, philosophy, and what drives me as a developer.",
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
            <h1 className="mb-4 text-5xl font-bold text-gray-900 dark:text-white">
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
                <p>
                  {t("whoIAm.p2")}{" "}
                  <em>{t("whoIAm.p2Emphasis")}</em>
                  {t("whoIAm.p2End")}
                </p>
                <p className="italic text-gray-600 dark:text-gray-400">
                  {t("whoIAm.quote")}
                </p>
              </div>
            </section>

            {/* The Journey */}
            <section>
              <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
                {t("journey.title")}
              </h2>
              <div className="space-y-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                <p>{t("journey.p1")}</p>
                <p>
                  {t("journey.p2")}{" "}
                  <em>{t("journey.p2Emphasis")}</em>
                  {t("journey.p2End")}
                </p>
                <p>{t("journey.p3")}</p>
                <p>{t("journey.p4")}</p>
              </div>
            </section>

            {/* Philosophy */}
            <section>
              <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
                {t("approach.title")}
              </h2>
              <div className="space-y-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                <p>
                  {t("approach.p1Start")}{" "}
                  <strong>{t("approach.p1Bold")}</strong>
                  {t("approach.p1End")}
                </p>
                <p>
                  {t("approach.p2Start")}{" "}
                  <strong>{t("approach.p2Bold")}</strong>
                  {t("approach.p2End")}
                </p>
                <p>
                  {t("approach.p3Start")}{" "}
                  <strong>{t("approach.p3Bold")}</strong>
                  {t("approach.p3End")}
                </p>
                <p>
                  {t("approach.p4Start")}{" "}
                  <strong>{t("approach.p4Bold")}</strong>
                  {t("approach.p4End")}
                </p>
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

            {/* Beyond Code */}
            <section>
              <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
                {t("beyondCode.title")}
              </h2>
              <div className="space-y-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                <p>{t("beyondCode.p1")}</p>
                <p>{t("beyondCode.p2")}</p>
              </div>
            </section>

            {/* Values */}
            <section className="rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 p-8 dark:from-blue-950/30 dark:to-purple-950/30">
              <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
                {t("values.title")}
              </h2>
              <ul className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="mr-3 text-2xl">🌱</span>
                  <div>
                    <strong className="text-gray-900 dark:text-white">
                      {t("values.continuousLearning.title")}
                    </strong>{" "}
                    {t("values.continuousLearning.text")}
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-2xl">🔍</span>
                  <div>
                    <strong className="text-gray-900 dark:text-white">
                      {t("values.curiosity.title")}
                    </strong>{" "}
                    {t("values.curiosity.text")}
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-2xl">📈</span>
                  <div>
                    <strong className="text-gray-900 dark:text-white">
                      {t("values.progress.title")}
                    </strong>{" "}
                    {t("values.progress.text")}
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-2xl">🤝</span>
                  <div>
                    <strong className="text-gray-900 dark:text-white">
                      {t("values.trust.title")}
                    </strong>{" "}
                    {t("values.trust.text")}
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-2xl">⚖️</span>
                  <div>
                    <strong className="text-gray-900 dark:text-white">
                      {t("values.balance.title")}
                    </strong>{" "}
                    {t("values.balance.text")}
                  </div>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
