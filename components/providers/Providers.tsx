"use client";

import { ThemeProvider } from "next-themes";

/**
 * Client-side providers wrapper
 * Uses next-themes for theme management
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
