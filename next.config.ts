import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // MAINTENANCE (Egor, 2026-08-10): the copy is mid-rewrite and must not be
      // read by hiring managers in its half-state. Everything redirects to the
      // stub EXCEPT paths carrying a file extension — resume PDFs are already
      // linked from live applications and must keep serving. Remove this block
      // to bring the site back.
      {
        source: "/((?!maintenance|_next|.*\\..*).*)",
        destination: "/maintenance",
        permanent: false,
      },
      // Short links with UTM tracking
      {
        source: "/go/telegram",
        destination: "/?utm_source=telegram&utm_medium=social&utm_campaign=share",
        permanent: false,
      },
      {
        source: "/go/linkedin",
        destination: "/?utm_source=linkedin&utm_medium=social&utm_campaign=share",
        permanent: false,
      },
      {
        source: "/go/twitter",
        destination: "/?utm_source=twitter&utm_medium=social&utm_campaign=share",
        permanent: false,
      },
      {
        source: "/go/email",
        destination: "/?utm_source=email&utm_medium=email&utm_campaign=signature",
        permanent: false,
      },
      {
        source: "/go/resume",
        destination: "/resume?utm_source=resume_link&utm_medium=document&utm_campaign=share",
        permanent: false,
      },
      {
        source: "/go/hh",
        destination: "/ru?utm_source=hh&utm_medium=job_board&utm_campaign=resume",
        permanent: false,
      },
      {
        source: "/go/freelancer",
        destination: "/ru?utm_source=freelancer&utm_medium=job_board&utm_campaign=resume",
        permanent: false,
      },
      {
        source: "/go/demo",
        destination: "https://imperiaos.com/",
        permanent: false,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
