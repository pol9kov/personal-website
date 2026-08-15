"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils/cn";

/**
 * Hero section props
 */
export interface HeroProps {
  className?: string;
}

/**
 * Hero section - landing page main section
 *
 * @example
 * ```tsx
 * <Hero />
 * ```
 */
export function Hero({ className }: HeroProps) {
  const t = useTranslations("hero");

  return (
    <section
      className={cn(
        // flex-1 вместо min-h в целый экран: жёсткая высота выталкивала футер
        // за кадр даже на пустой главной (Егор 2026-08-15: «должно влезать»).
        // Каркас в layout уже колонка в высоту экрана — герой занимает
        // остаток, и футер виден без скролла.
        "flex flex-1 items-center justify-center bg-gradient-to-b from-white to-gray-50",
        "dark:from-gray-900 dark:to-gray-950",
        className
      )}
    >
      <div className="container mx-auto px-4">
        {/* Левая ось, как на резюме и «Обо мне» — одна система на весь сайт
            (Егор 2026-08-15: «на всех страницах не центрировано»). Две оси
            давала центральная кнопка «Написать» — она убрана: CTA теперь
            цветная «Написать» в футере, общем для всех страниц. */}
        <div className="mx-auto max-w-2xl">
          {/* Фото уехало на «О себе» (Джамиль → Егор, 2026-08-15):
              главная продаёт работу, человека представляет личная страница. */}
          <h1
            className="inline text-4xl font-bold leading-snug sm:text-5xl md:text-6xl name-gradient"
          >
            {t("name")}
          </h1>
          <br className="sm:hidden" />
          <p className="inline text-xl text-gray-600 dark:text-gray-300 sm:text-2xl sm:block sm:mt-4">
            {t("subtitle")}
          </p>
          <p className="mt-5 font-mono text-xs tracking-widest text-gray-400 dark:text-gray-500 opacity-70 uppercase">
            {t("tags")}
          </p>
        </div>
      </div>
    </section>
  );
}
