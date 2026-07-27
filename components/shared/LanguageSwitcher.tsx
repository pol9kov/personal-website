"use client";

import { useState } from "react";
import { type Locale } from "@/i18n/routing";

// Short codes, not flag emoji: regional-indicator pairs render as two empty
// boxes on Windows Chrome (Segoe UI Emoji carries no flag glyphs) — the header
// showed "□□" where the language control should be.
const locales: { value: Locale; label: string; code: string }[] = [
  { value: "en", label: "English", code: "EN" },
  { value: "ru", label: "Русский", code: "RU" },
  { value: "es", label: "Español", code: "ES" },
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
    <div className="relative flex items-center h-9">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="icon-button h-9 w-9 rounded-lg flex items-center justify-center"
        title={currentLocaleData?.label}
        aria-label={currentLocaleData?.label}
        aria-expanded={isOpen}
      >
        <span className="w-5 h-5 flex items-center justify-center text-xs font-semibold tracking-wide leading-none">{currentLocaleData?.code}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div
            className="absolute right-0 top-full mt-1 w-36 border rounded-lg shadow-lg z-50 overflow-hidden"
            style={{ backgroundColor: 'var(--dropdown-bg)', borderColor: 'var(--border-color)' }}
          >
            {locales.map((locale) => (
              <button
                key={locale.value}
                onClick={() => handleLocaleChange(locale.value)}
                className="dropdown-item w-full flex items-center gap-2 px-3 py-2 text-sm"
                aria-pressed={currentLocale === locale.value}
              >
                <span className="text-xs font-semibold tracking-wide w-6">{locale.code}</span>
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
