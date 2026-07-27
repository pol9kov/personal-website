import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Geist, Geist_Mono } from "next/font/google";

/*
 * Geist is initialised here, on <html>, not in the locale layout: that one
 * renders a <div>, so `--font-geist-sans` was defined *below* the `body` rule in
 * globals.css that consumes it. The declaration was therefore invalid at
 * computed-value time and every page inherited the ui-sans-serif fallback —
 * both font families were downloaded on every request and neither was used.
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
