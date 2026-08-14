import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { ImperiaWidgetFrame } from "@/components/shared/ImperiaWidgetFrame";

export const metadata: Metadata = {
  title: "Imperia OS | Egor Polyakov",
  description:
    "An AI assistant that takes the shape its user needs — and the agent platform it takes to build one. Every action leaves a trail.",
};

interface ImperiaOSPageProps {
  params: Promise<{ locale: string }>;
}

/**
 * ОДНА ТИПОГРАФИКА НА ВСЮ СТРАНИЦУ — та же, что на /about: заголовок 4xl/5xl,
 * лид одним размером, дальше один ритм секций (space-y-16) и ОДИН размер
 * текста (text-lg). Прежде текст одного уровня стоял в трёх разных шкалах
 * (подзаголовок xl→2xl, строфа 2xl→3xl, body lg) с отступами mt-8 / mt-24 /
 * mt-20 — владелец прочёл это как «вырезки из разных газет разными шрифтами»
 * (2026-08-14). Единственный акцент страницы — герой; больше ни одного
 * размера не вводить.
 *
 * ПОРЯДОК — ЕГО СЛОВОМ (2026-08-14, событие 7e7a9f70): подзаголовок → живой
 * виджет → «Код повторяет замысел →» ССЫЛКОЙ на дерево требований. Отдельной
 * строки «У каждого действия есть след» БОЛЬШЕ НЕТ: она стояла отдельно от
 * абзаца и он прочёл это как лишнее — «ссылку можно вставить именно на код
 * повторяет замысел». Текст под заголовком короткий НАМЕРЕННО — детали
 * реализации он смотрит по ссылке, «там же всё видно». Раньше: разбор хода дословно повторял /about («у каждого действия есть
 * след, ошибки кричат сразу»), а аналогия «компилятор и программы на нём» была
 * снята им же — «аналогия не до конца правильная… за такую хуйню человек
 * закатит глаза» (2026-08-14, событие ce0b35fc). Один источник правды между
 * поверхностями: след живёт в /about и в самом виджете, здесь только ссылка.
 */
export default async function ImperiaOSPage({ params }: ImperiaOSPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("imperiaOs");

  const sections = ["proof", "next"] as const;

  return (
    <main className="bg-gradient-to-b from-white to-gray-50 pt-28 pb-24 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl">
          <h1 className="inline text-4xl font-bold leading-snug text-gray-900 sm:text-5xl dark:text-white">
            {t("title")}
          </h1>
          <p className="mt-4 text-xl leading-relaxed text-gray-600 dark:text-gray-300">
            {t("subtitle")}
          </p>

          <div className="mt-10">
            <ImperiaWidgetFrame locale={locale} />
          </div>

          <div className="mt-16 space-y-16">
            {sections.map((k) => (
              <section key={k}>
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  {k === "proof" ? (
                    <a
                      href="https://imperiaos.com/domains#content=spec%3Amessage"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {t(`${k}.title`)} →
                    </a>
                  ) : (
                    t(`${k}.title`)
                  )}
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
