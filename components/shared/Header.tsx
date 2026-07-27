"use client";

import { useState, useTransition } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { type Locale } from "@/i18n/routing";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { useHydrated } from "@/lib/hooks/useHydrated";

export function Header() {
  const t = useTranslations("navigation");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const mounted = useHydrated();
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

  if (!mounted) {
    return (
      <header
        className="sticky top-0 z-50 h-12 border-b flex items-center px-4"
        style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border-color)' }}
      >
        <span className="text-lg font-semibold">{t("siteName")}</span>
      </header>
    );
  }

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
            <span className="text-lg font-semibold hidden sm:block">{t("siteName")}</span>
            <span className="text-base font-semibold sm:hidden">EP</span>
          </Link>
        </div>

        {/* Right: Nav + Language + Theme */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link text-sm font-medium"
                aria-current={pathname === item.href ? "page" : undefined}
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
            className="icon-button md:hidden p-2 rounded-lg"
            aria-label={tCommon("toggleMenu")}
            aria-expanded={isMenuOpen}
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
          className="md:hidden border-b px-4 py-3"
          style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border-color)' }}
        >
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="nav-link text-base font-medium"
                aria-current={pathname === item.href ? "page" : undefined}
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
