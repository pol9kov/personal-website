"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils/cn";

/**
 * Footer component props
 */
export interface FooterProps {
  className?: string;
}

const EMAIL = "egor.pol9kov@gmail.com";

function EmailCopy({ label }: { label: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard
      .writeText(EMAIL)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        // Буфер недоступен (старый браузер/без https) — честный фолбэк:
        // открываем mailto, а не молчим.
        window.location.href = `mailto:${EMAIL}`;
      });
  };
  return (
    <span className="group relative inline-block">
      <button
        onClick={copy}
        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
        aria-label={`${label}: ${EMAIL}`}
      >
        {copied ? "✓ " : ""}
        {label}
      </button>
      <span
        className={cn(
          "pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md px-2.5 py-1 text-xs",
          "bg-gray-900 text-gray-100 dark:bg-gray-100 dark:text-gray-900",
          "opacity-0 transition-opacity group-hover:opacity-100",
        )}
      >
        {copied ? "скопировано ✓" : EMAIL}
      </span>
    </span>
  );
}

/**
 * Site footer with copyright and links
 *
 * @example
 * ```tsx
 * <Footer />
 * ```
 */
export function Footer({ className }: FooterProps) {
  const t = useTranslations("footer");

  return (
    <footer
      className={cn(
        "border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 py-8",
        className
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-end gap-3">
          <a
            href="https://t.me/pol9kov"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            {t("contact")}
          </a>
          <div className="flex items-center gap-6">
            <a
              href="https://www.linkedin.com/in/egor-polyakov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
            <a
              href="https://t.me/pol9kov"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="Telegram"
            >
              Telegram
            </a>
            {/* Клик копирует адрес, а не открывает почтовый клиент: mailto
                уводил в системную почту (маковский Mail), которой владелец
                сайта и его гости не пользуются (Егор, 2026-08-13). Тултип
                показывает сам адрес; после клика — «скопировано». */}
            <EmailCopy label={t("email")} />
          </div>
        </div>
      </div>
    </footer>
  );
}
