import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { caseStudies } from "@/lib/constants/case-studies";
import { CaseStudyCard } from "@/components/case-studies/CaseStudyCard";

interface CaseStudiesPageProps {
  params: Promise<{ locale: string }>;
}

export default async function CaseStudiesPage({
  params,
}: CaseStudiesPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("caseStudies");

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 py-20">
        <div className="mb-12">
          <h1 className="inline text-4xl font-bold leading-snug text-gray-900 sm:text-5xl dark:text-white">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            {t("subtitle")}
          </p>
        </div>

        {/* Мобилка — одна горизонтальная полоса со свайпом; md+ — две колонки на всю ширину */}
        <div className="flex snap-x snap-mandatory gap-8 overflow-x-auto pb-4 md:grid md:grid-cols-2 md:overflow-visible md:pb-0">
          {caseStudies.map((study) => (
            <div key={study.id} className="min-w-[85%] snap-start md:min-w-0">
              <CaseStudyCard study={study} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
