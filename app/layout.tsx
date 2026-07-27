import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Geist, Geist_Mono } from "next/font/google";

/*
 * Шрифты объявляются ЗДЕСЬ, а не в locale-layout, и вешаются на <html>.
 *
 * Раньше next/font вызывался в app/[locale]/layout.tsx, который рендерит <div>
 * внутри body. Переменные --font-geist-* оказывались объявлены НИЖЕ правила
 * `body { font-family: ... }`, которое их читает, — на body переменной просто
 * нет, объявление невалидно, и сайт рисовался Arial, предварительно скачав два
 * семейства Geist. Проверено по живой странице: 76 КБ шрифта качалось и не
 * использовалось.
 *
 * На <html> переменные видны и body, и всему остальному. Не переносить обратно
 * в locale-layout.
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

// Root layout - required by Next.js to have html and body tags
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body suppressHydrationWarning>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
