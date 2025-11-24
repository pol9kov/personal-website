"use client";

import { Button } from "@/components/ui";
import { cn } from "@/lib/utils/cn";

/**
 * Contact section props
 */
export interface ContactProps {
  className?: string;
}

/**
 * Contact section - call to action with contact options
 *
 * @example
 * ```tsx
 * <Contact />
 * ```
 */
export function Contact({ className }: ContactProps) {

  return (
    <section
      className={cn(
        "bg-gradient-to-b from-gray-50 to-white py-20",
        "dark:from-gray-950 dark:to-gray-900",
        className
      )}
      id="contact"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            Let&apos;s Work Together
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Interested in collaborating or have a project in mind? Feel free to
            reach out!
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                window.open("https://t.me/pol9kov", "_blank");
              }}
            >
              Telegram
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                window.open("https://www.linkedin.com/in/egor-polyakov/", "_blank");
              }}
            >
              LinkedIn
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
