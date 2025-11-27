import { cn } from "@/lib/utils/cn";

/**
 * Footer component props
 */
export interface FooterProps {
  className?: string;
}

/**
 * Site footer with copyright and links
 *
 * @example
 * ```tsx
 * <Footer />
 * ```
 */
export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 py-8",
        className
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} Portfolio. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/pol9kov"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="GitHub"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/egor-polyakov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
