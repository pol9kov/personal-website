import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "About | Egor Polyakov",
  description:
    "Building Imperia OS — an AI assistant and the agent platform that goal requires. Over a decade of backend systems that stay understandable under complexity.",
};

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center bg-gradient-to-b from-white to-gray-50 py-20 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-5xl font-bold leading-snug text-gray-900 dark:text-white">
              {t("title")}
            </h1>
          </div>

          {/* The story: three paragraphs, each opening with a named trait.
              Career lives in the resume, architecture on the Imperia OS page —
              this page carries only the personal story (Egor, 2026-08-11). */}
          <div className="space-y-16">
            <section>
              <div className="space-y-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                <p>{t("whoIAm.p1")}</p>
                <p>{t("whoIAm.p2")}</p>
                <p>{t("whoIAm.p3")}</p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </main>
  );
}
