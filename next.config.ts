import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Imperia OS — не кейс, а живое дело со своей страницей (Егор, 2026-08-13);
      // старый адрес разборного экрана ведёт на неё.
      {
        source: "/:locale(en|ru|es)/case-studies/imperia-os",
        destination: "/:locale/imperia-os",
        permanent: false,
      },
      {
        source: "/case-studies/imperia-os",
        destination: "/imperia-os",
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
