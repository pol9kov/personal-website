"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Button variant types
 */
export type ButtonVariant = "primary" | "secondary" | "ghost";

/**
 * Button size types
 */
export type ButtonSize = "sm" | "md" | "lg";

/**
 * Button component props
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual style variant
   * @default "primary"
   */
  variant?: ButtonVariant;

  /**
   * Button size
   * @default "md"
   */
  size?: ButtonSize;

  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;

  /**
   * Full width button
   * @default false
   */
  fullWidth?: boolean;
}

/**
 * Button component with variants and accessibility support
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md" onClick={() => console.log('clicked')}>
 *   Click me
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      disabled = false,
      fullWidth = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const variantStyles: Record<ButtonVariant, string> = {
      primary:
        "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600",
      secondary:
        "bg-gray-200 text-gray-900 hover:bg-gray-300 focus-visible:ring-gray-400",
      ghost: "hover:bg-gray-100 text-gray-700 focus-visible:ring-gray-400",
    };

    const sizeStyles: Record<ButtonSize, string> = {
      sm: "h-9 px-3 text-sm",
      md: "h-10 px-4 text-base",
      lg: "h-11 px-6 text-lg",
    };

    const widthStyles = fullWidth ? "w-full" : "";

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          widthStyles,
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
