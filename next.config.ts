import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  async redirects() {
    return [
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
    ];
  },
};

export default withNextIntl(nextConfig);
