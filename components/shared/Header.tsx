"use client";

import { useState, useTransition } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { type Locale } from "@/i18n/routing";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";

/**
 * ВНИМАНИЕ на будущее. Раньше весь Header ждал гидрации: до неё он возвращал
 * заглушку с одним именем, поэтому в серверном HTML не было НИ ОДНОЙ ссылки
 * меню — они появлялись только после того, как в браузере отработает JS.
 * Замер 2026-07-27 по живой странице: <header> в ответе сервера — 211 байт,
 * ноль <a> и ноль <button>. Любая заминка с гидрацией (медленная сеть,
 * блокировщик, ошибка в чанке) оставляла человека с пустой чёрной полосой —
 * ровно так это и выглядело у владельца сайта.
 *
 * Ждать гидрации нужно ОДНОЙ кнопке темы, и у неё для этого есть собственный
 * гард внутри ThemeToggle. Остальная шапка от темы не зависит и рендерится на
 * сервере. Не возвращай сюда общий mounted-гейт.
 */
export function Header() {
  const t = useTranslations("navigation");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [, startTransition] = useTransition();


  const navItems = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/imperia-os", label: t("imperiaOs") },
    { href: "/case-studies", label: t("caseStudies") },
    { href: "/resume", label: t("resume") },
  ];

  const switchLocale = (newLocale: Locale) => {
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`;
    startTransition(() => {
      router.replace(pathname, { locale: newLocale, scroll: false });
    });
  };


  return (
    <>
      <header
        className="sticky top-0 z-50 h-12 border-b flex items-center px-3 md:px-4 justify-between"
        style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border-color)' }}
      >
        {/* Left: Logo */}
        <div className="flex items-center gap-2 md:gap-3 min-w-0">
          <Link
            href="/"
            className="hover:opacity-80 transition-opacity flex items-center gap-2 shrink-0"
          >
            <span className="text-lg font-semibold max-sm:hidden">{t("siteName")}</span>
            <span className="text-base font-semibold hidden max-sm:block">EP</span>
          </Link>
        </div>

        {/* Видимость шапки устроена FAIL-OPEN. Раньше меню было спрятано по
            умолчанию (`hidden`) и показывалось только media-запросом — то есть
            если-запрос по любой причине не применился, человек оставался вообще
            без ссылок, и именно так это и выглядело у владельца сайта. Теперь
            наоборот: по умолчанию видно всё, media-запрос только СВОРАЧИВАЕТ на
            узком экране. Худший исход поменялся с «ничего нет» на «тесновато». */}
        {/* Right: Nav + Language + Theme */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          {/* Desktop navigation */}
          <nav className="flex max-sm:hidden items-center gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium transition-colors"
                style={{
                  color: pathname === item.href ? 'var(--nav-active-text, currentColor)' : 'var(--nav-text, currentColor)',
                }}
                onMouseEnter={(e) => {
                  if (pathname !== item.href) {
                    e.currentTarget.style.color = 'var(--nav-hover-text)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (pathname !== item.href) {
                    e.currentTarget.style.color = 'var(--nav-text, currentColor)';
                  }
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <LanguageSwitcher
            currentLocale={locale as Locale}
            onLocaleChange={switchLocale}
          />

          <ThemeToggle />

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            className="hidden max-sm:block p-2 rounded-lg transition-colors"
            style={{ color: 'var(--nav-text, currentColor)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--button-hover-bg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            {isMenuOpen ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div
          className="hidden max-sm:block border-b px-4 py-3"
          style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border-color)' }}
        >
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-base font-medium transition-colors"
                style={{
                  color: pathname === item.href ? 'var(--nav-active-text, currentColor)' : 'var(--nav-text, currentColor)',
                }}
                onMouseEnter={(e) => {
                  if (pathname !== item.href) {
                    e.currentTarget.style.color = 'var(--nav-hover-text)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (pathname !== item.href) {
                    e.currentTarget.style.color = 'var(--nav-text, currentColor)';
                  }
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
