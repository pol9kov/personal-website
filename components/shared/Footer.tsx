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

function EmailCopy({ label, copiedLabel }: { label: string; copiedLabel: string }) {
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
          // ПОЧЕМУ ПРАВЫЙ КРАЙ, А НЕ ЦЕНТР. Почта — последний элемент в строке,
          // прижатой вправо. Тултип шириной 162px, центрированный на ней
          // (left-1/2 + -translate-x-1/2), вылезал за правый край экрана: на
          // iPhone документ становился 434px при экране 390 и ВСЯ страница
          // ездила вбок — Егор 2026-08-15 («вправо-влево двигаю, ходит ходуном
          // вся страница», левая часть текста уходила за экран). Замер до
          // правки: scrollWidth 434 при clientWidth 390, единственный виновник —
          // этот span. Правый край держит тултип внутри контейнера всегда.
          "pointer-events-none absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-md px-2.5 py-1 text-xs",
          "bg-gray-900 text-gray-100 dark:bg-gray-100 dark:text-gray-900",
          "opacity-0 transition-opacity group-hover:opacity-100",
        )}
      >
        {copied ? copiedLabel : EMAIL}
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
      id="contacts"
      className={cn(
        // Нижний отступ на мобильном — обычные 2rem плюс РОВНО высота нижней
        // панели iOS Safari через env(safe-area-inset-bottom): жёсткий pb-28
        // раздувал футер на четверть экрана (Егор 2026-08-15), а прятал
        // контакты под панелью именно её системный размер — его env() и даёт.
        "border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 pt-8 pb-[calc(2rem+env(safe-area-inset-bottom))] sm:pb-8",
        className
      )}
    >
      <div className="container mx-auto px-4">
        {/* Правый край, как было до центрирования: ось сайта левая (герой
            снова слева словом Егора 2026-08-15), контакты — правый противовес. */}
        <div className="flex flex-col items-end gap-3">
          {/* Цветная «Написать» на каждой странице (Егор 2026-08-15): кнопка
              уехала из героя сюда — футер общий, CTA один и всегда в кадре. */}
          <a
            href="https://t.me/pol9kov"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
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
            <EmailCopy label={t("email")} copiedLabel={t("copied")} />
          </div>
        </div>
      </div>
    </footer>
  );
}
