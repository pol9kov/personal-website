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
    <div className="relative flex items-center">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-600 dark:text-neutral-400 flex items-center justify-center"
        title={currentLocaleData?.label}
      >
        <span className="w-5 h-5 flex items-center justify-center text-base leading-none">{currentLocaleData?.flag}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div
            className="absolute right-0 top-full mt-1 w-36 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 overflow-hidden"
            style={{ backgroundColor: 'var(--dropdown-bg)' }}
          >
            {locales.map((locale) => (
              <button
                key={locale.value}
                onClick={() => handleLocaleChange(locale.value)}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors"
                style={{
                  backgroundColor: currentLocale === locale.value ? 'var(--dropdown-selected-bg)' : 'transparent',
                  color: currentLocale === locale.value ? 'var(--dropdown-selected-text)' : 'var(--dropdown-text)',
                }}
                onMouseEnter={(e) => {
                  if (currentLocale !== locale.value) {
                    e.currentTarget.style.backgroundColor = 'var(--dropdown-hover-bg)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentLocale !== locale.value) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
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
