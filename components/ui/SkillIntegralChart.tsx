import { Skill } from "@/lib/types";

export interface SkillIntegralChartProps {
  category: Skill["category"];
}

/**
 * Static integral chart overlay using pre-generated SVG images
 * Images are generated at build time via scripts/generate-skill-images.ts
 */
// Cache buster - increment to force browser refresh
const CACHE_VERSION = 28;

export function SkillIntegralChart({ category }: SkillIntegralChartProps) {
  return (
    <img
      src={`/images/skills/${category}.svg?v=${CACHE_VERSION}`}
      alt=""
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
