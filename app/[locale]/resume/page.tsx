import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Resume | Yegor Polyakov",
  description: "Download my professional resume",
};

interface ResumePageProps {
  params: Promise<{ locale: string }>;
}

/**
 * Язык сайта («смысл впереди формы»): градиентный заголовок-гвоздь, ссылка
 * текстом со стрелкой, влево, воздух. Иконка-кружок и синяя кнопка с тенью
 * были шаблонным лендинг-элементом — сняты 2026-08-13 вместе с той же
 * таблеткой на странице Imperia OS.
 */
export default async function ResumePage({ params }: ResumePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("resume");

  // Each locale gets the resume Egor wrote in that language. A locale with no resume of
  // its own falls back to English — the one language every reader of this site shares.
  // ИМЯ ЖИВЁТ В САМОМ ПУТИ, а не рядом с ним вторым полем. Атрибут `download`
  // игнорируется, когда PDF открывается во встроенном просмотрщике: человек
  // сохраняет файл под именем ИЗ URL. Так и вышло — Джамиль 2026-08-15 получил
  // «resume-ru.pdf?» и спросил, как этот файл опознать в загрузках. Ведущее
  // подчёркивание — чтобы резюме стояло первым в списке загрузок (его слово
  // того же дня). Старые адреса живут редиректами в next.config.ts: ссылки
  // уже разосланы.
  const RESUME_EN = "/_Yegor_Polyakov_Resume_EN.pdf";
  const RESUME_BY_LOCALE: Record<string, string> = {
    en: RESUME_EN,
    ru: "/_Yegor_Polyakov_Resume_RU.pdf",
    es: "/_Yegor_Polyakov_Resume_ES.pdf",
  };
  const pdf = RESUME_BY_LOCALE[locale] ?? RESUME_EN;
  const pdfName = pdf.slice(1);

  return (
    <main className="bg-gradient-to-b from-white to-gray-50 pt-28 pb-24 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl">
          <h1 className="inline text-4xl font-bold leading-snug text-gray-900 sm:text-5xl dark:text-white">
            {t("title")}
          </h1>
          <div className="mt-8">
            <a
              href={pdf}
              download={pdfName}
              className="text-lg font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              {t("download")} →
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
