"use client";

import { useState } from "react";
import { type Locale } from "@/i18n/routing";

// Short codes, not flag emoji. A flag is a regional-indicator PAIR (RU =
// U+1F1F7 U+1F1FA) and the fonts shipped with Windows and most Linux desktops
// carry no glyph for it, so the browser draws two empty boxes — the header
// showed "□□" where the language control should be, live on /ru/about.
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
        className="h-9 w-9 rounded-lg transition-colors flex items-center justify-center"
        style={{ color: 'var(--nav-text)' }}
        title={currentLocaleData?.label}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--button-hover-bg)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <span className="w-5 h-5 flex items-center justify-center text-xs font-semibold leading-none">{currentLocaleData?.code}</span>
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
                <span className="text-xs font-semibold w-5 text-center">{locale.code}</span>
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
