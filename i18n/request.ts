import { getRequestConfig } from "next-intl/server";
import { isLocale, routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = isLocale(requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
    onError(error) {
      // A missing key used to be a console.error during prerender: the build
      // stayed green and the page shipped the raw key path as visible copy
      // (that is how `imperiaOs.caseStudyTeaser` reached production).
      // Fail the build instead; in dev keep logging so editing stays fluid.
      if (process.env.NODE_ENV === "production") throw error;
      console.error(error);
    },
  };
});
