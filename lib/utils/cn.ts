import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names using clsx and tailwind-merge
 * @param inputs - Class names to combine
 * @returns Merged class names with Tailwind conflicts resolved
 *
 * @example
 * cn("text-red-500", "text-blue-500") // => "text-blue-500"
 * cn("px-4", someCondition && "px-6") // => "px-6" if someCondition is true
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
