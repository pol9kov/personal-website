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
            className="inline text-4xl font-bold sm:text-5xl md:text-6xl name-gradient"
            style={{ lineHeight: "1.3" }}
          >
            {t("name")}
          </h1>
          <br className="sm:hidden" />
          <p className="inline text-xl text-gray-600 dark:text-gray-300 sm:text-2xl sm:block sm:mt-4">
            {t("subtitle")}
          </p>
          <p className="mt-4 text-sm font-medium tracking-wide text-gray-500 dark:text-gray-400 sm:text-base">
            {t("tags")}
          </p>

          {/* Clear float */}
          <div className="clear-both"></div>

          <div className="mt-10 flex flex-col items-center">
            <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center">
              <a
                href="https://github.com/pol9kov?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="justify-self-end text-lg font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                {t("viewProjects")}
              </a>
              <div className="w-12" />
              <a
                href="https://t.me/pol9kov"
                target="_blank"
                rel="noopener noreferrer"
                className="justify-self-start text-lg font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                {t("contactMe")}
              </a>
            </div>
            <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
              <a href="https://github.com/pol9kov" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors" aria-label="GitHub">
                <svg style={{ width: '24px', height: '24px' }} fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
              </a>
              <a href="https://www.linkedin.com/in/egor-polyakov/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors" aria-label="LinkedIn">
                <svg style={{ width: '24px', height: '24px' }} fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
