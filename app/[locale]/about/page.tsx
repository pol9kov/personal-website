import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "About | Yegor Polyakov",
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
    <main className="bg-gradient-to-b from-white to-gray-50 pt-28 pb-24 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl">
          {/* Header */}
          <div className="mb-12">
            <h1 className="mb-4 inline text-4xl font-bold leading-snug text-gray-900 sm:text-5xl dark:text-white">
              {t("title")}
            </h1>
          </div>

          {/* The story: three paragraphs, each opening with a named trait.
              Career lives in the resume, architecture on the Imperia OS page —
              this page carries only the personal story (Egor, 2026-08-11). */}
          <div className="space-y-16">
            <section>
              {/* Фото переехало сюда с главной (Джамиль → Егор, 2026-08-15):
                  главная продаёт работу, человека представляет эта страница. */}
              <div
                className="relative float-right ml-4 mb-4 sm:ml-6 sm:mb-6 h-36 w-36 sm:h-44 sm:w-44 rounded-full overflow-hidden"
                style={{ shapeOutside: "circle(50%)" }}
              >
                <Image
                  src="/images/profile-mobile.jpg"
                  alt="Yegor Polyakov"
                  fill
                  className="object-cover sm:hidden"
                  priority
                />
                <Image
                  src="/images/profile.jpg"
                  alt="Yegor Polyakov"
                  fill
                  className="object-cover hidden sm:block"
                  priority
                />
              </div>
              <div className="space-y-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                <p>{t("whoIAm.p1")}</p>
                <p>{t("whoIAm.p2")}</p>
                <p>{t("whoIAm.p3")}</p>
              </div>
              <div className="clear-both"></div>
            </section>

          </div>
        </div>
      </div>
    </main>
  );
}
