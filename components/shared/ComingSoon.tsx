import Link from "next/link";
import { cn } from "@/lib/utils/cn";

export interface ComingSoonProps {
  title: string;
  description: string;
  backLink?: string;
  backLabel?: string;
  className?: string;
}

/**
 * Coming Soon placeholder component
 */
export function ComingSoon({
  title,
  description,
  backLink = "/",
  backLabel = "Back to Home",
  className,
}: ComingSoonProps) {
  return (
    <main
      className={cn(
        "flex min-h-screen items-center justify-center bg-gradient-to-b from-white to-gray-50",
        "dark:from-gray-900 dark:to-gray-950",
        className
      )}
    >
      <div className="container mx-auto px-4 text-center">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
              <svg
                className="h-12 w-12 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
            </div>
            <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
              {title}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {description}
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href={backLink}
              className={cn(
                "inline-flex items-center rounded-lg px-6 py-3 text-sm font-medium transition-colors",
                "bg-blue-600 text-white hover:bg-blue-700",
                "dark:bg-blue-500 dark:hover:bg-blue-600"
              )}
            >
              <svg
                className="mr-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              {backLabel}
            </Link>
          </div>

          <div className="mt-12 text-sm text-gray-500 dark:text-gray-400">
            This page is currently under development. Check back soon!
          </div>
        </div>
      </div>
    </main>
  );
}
