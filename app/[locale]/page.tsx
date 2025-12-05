import { setRequestLocale } from "next-intl/server";
import { Hero, Skills } from "@/components/sections";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <Hero />
      <Skills />
    </main>
  );
}
