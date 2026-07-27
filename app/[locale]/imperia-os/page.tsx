import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export const metadata: Metadata = {
  title: "Imperia OS | Egor Polyakov",
  description:
    "AI-first development platform. The algorithm controls the flow, not the LLM.",
};

interface ImperiaOSPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ImperiaOSPage({ params }: ImperiaOSPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("imperiaOs");

  const steps = t.raw("steps") as string[];

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
            <a
              href="https://imperiaos.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-lg font-medium text-white transition-colors hover:bg-blue-700"
            >
              {t("tryDemo")}
            </a>
          </div>

          <div className="space-y-16">
            {/* Problem */}
            <section>
              <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
                {t("problem.title")}
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                {t("problem.text")}
              </p>
            </section>

            {/* Architecture */}
            <section>
              <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
                {t("solution.title")}
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                {t("solution.text")}
              </p>
            </section>

            {/* Development Flow */}
            <section>
              <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
                {t("howWeWork.title")}
              </h2>
              <ol className="space-y-4">
                {steps.map((step, index) => (
                  <li key={index} className="flex items-start text-lg text-gray-700 dark:text-gray-300">
                    <span className="mr-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </section>

            {/* Case Study Link */}
            <section className="rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 p-8 dark:from-blue-950/30 dark:to-purple-950/30 text-center">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                {t("caseStudyTeaser")}
              </p>
              <Link
                href="/case-studies/imperia-os"
                className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-lg font-medium text-white transition-colors hover:bg-blue-700"
              >
                {t("caseStudyLink")}
              </Link>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
