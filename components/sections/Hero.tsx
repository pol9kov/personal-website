"use client";

import Image from "next/image";
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

  const scrollToContacts = () => {
    const el = document.getElementById("contacts");
    if (!el) return;
    el.classList.remove("contacts-highlight");
    el.scrollIntoView({ behavior: "smooth", block: "end" });
    // Пульс — когда страница ДОЕХАЛА вниз, а не в момент клика:
    // ждём scrollend; таймер — на случай браузера без события
    // или когда скроллить уже нечего (scrollend тогда не приходит).
    let fired = false;
    const pulse = () => {
      if (fired) return;
      fired = true;
      window.removeEventListener("scrollend", pulse);
      void el.offsetWidth; // перезапуск анимации при повторном клике
      el.classList.add("contacts-highlight");
    };
    window.addEventListener("scrollend", pulse, { once: true });
    window.setTimeout(pulse, 1200);
  };

  return (
    <section
      className={cn(
        "flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-b from-white to-gray-50",
        "dark:from-gray-900 dark:to-gray-950",
        className
      )}
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl">
          {/* Photo floats to the right, text wraps around it */}
          <div
            className="relative float-right ml-2 mb-2 sm:ml-6 sm:mb-6 h-36 w-36 sm:h-44 sm:w-44 md:h-52 md:w-52 rounded-full overflow-hidden"
            style={{ shapeOutside: "circle(50%)" }}
          >
            {/* Mobile: pre-cropped zoomed version */}
            <Image
              src="/images/profile-mobile.jpg"
              alt={t("name")}
              fill
              className="object-cover sm:hidden"
              priority
            />
            {/* Desktop: full image */}
            <Image
              src="/images/profile.jpg"
              alt={t("name")}
              fill
              className="object-cover hidden sm:block"
              priority
            />
          </div>

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

          {/* Clear float */}
          <div className="clear-both"></div>

          <div className="mt-10 flex justify-center">
            <button
              onClick={scrollToContacts}
              className="text-lg font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors cursor-pointer"
            >
              {t("contactMe")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
