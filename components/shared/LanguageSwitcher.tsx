"use client";

import { useState } from "react";
import { type Locale } from "@/i18n/routing";

const locales: { value: Locale; label: string; flag: string }[] = [
  { value: "en", label: "English", flag: "🇬🇧" },
  { value: "ru", label: "Русский", flag: "🇷🇺" },
  { value: "es", label: "Español", flag: "🇪🇸" },
];

interface LanguageSwitcherProps {
  currentLocale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

export function LanguageSwitcher({
  currentLocale,
  onLocaleChange,
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  const currentLocaleData = locales.find((l) => l.value === currentLocale);

  const handleLocaleChange = (locale: Locale) => {
    onLocaleChange(locale);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400"
        title={currentLocaleData?.label}
      >
        <span className="text-base">{currentLocaleData?.flag}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-36 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-[60] overflow-hidden">
            {locales.map((locale) => (
              <button
                key={locale.value}
                onClick={() => handleLocaleChange(locale.value)}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors ${
                  currentLocale === locale.value
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <span>{locale.flag}</span>
                {locale.label}
                {currentLocale === locale.value && (
                  <svg
                    className="w-4 h-4 ml-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
