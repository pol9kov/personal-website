import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Card component props
 */
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Enable hover effect
   * @default false
   */
  hoverable?: boolean;

  /**
   * Padding size
   * @default "md"
   */
  padding?: "none" | "sm" | "md" | "lg";
}

/**
 * Card component - container with shadow and optional hover effect
 *
 * @example
 * ```tsx
 * <Card hoverable padding="lg">
 *   <h3>Title</h3>
 *   <p>Content</p>
 * </Card>
 * ```
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ hoverable = false, padding = "md", className, children, ...props }, ref) => {
    const baseStyles =
      "rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm transition-shadow";

    const hoverStyles = hoverable ? "hover:shadow-md dark:hover:shadow-gray-900/50 cursor-pointer" : "";

    const paddingStyles = {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    };

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          hoverStyles,
          paddingStyles[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
