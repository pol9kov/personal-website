import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Everything except Next internals and files with an extension.
  // The previous `/(ru|en)/:path*` alternation had to be edited by hand every
  // time a locale was added, and it was not: "es" shipped without ever being
  // matched. Next.js requires this to be a literal, so it cannot be derived
  // from routing.locales — an exclusion pattern is what removes the drift.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
