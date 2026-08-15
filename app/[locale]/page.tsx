import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      {/* Секция навыков снята целиком (Егор 2026-08-15): сайт читает человек,
          а не ATS — навыки несёт резюме, сайт продаёт платформу. */}
      <Hero />
    </main>
  );
}
