import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ru", "es"],
  defaultLocale: "en",
});

export type Locale = (typeof routing.locales)[number];

/**
 * The one place that decides whether a string is a supported locale.
 * Call sites used to hand-write `locale as "en" | "ru"`, which silently stopped
 * covering "es" the moment it was added to `locales`.
 */
export function isLocale(value: string | undefined): value is Locale {
  return (
    value !== undefined && (routing.locales as readonly string[]).includes(value)
  );
}
