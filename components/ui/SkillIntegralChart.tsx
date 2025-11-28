import { Skill } from "@/lib/types";

/**
 * SkillsIntegralChart props
 */
export interface SkillIntegralChartProps {
  skills: Skill[];
  width?: number;
  height?: number;
}

/**
 * Decorative integral "icicle" visualization
 * Small visual element showing category proficiency
 *
 * @example
 * ```tsx
 * <SkillIntegralChart skills={categorySkills} width={120} height={100} />
 * ```
 */
export function SkillIntegralChart({
  skills,
  width = 120,
  height = 100,
}: SkillIntegralChartProps) {
  // Calculate average proficiency for the category
  const avgProficiency = skills.reduce((sum, s) => sum + s.proficiency, 0) / skills.length;
  const proficiencyPercent = (avgProficiency / 5) * 100;

  // Seed based on all skill names for consistent randomness
  const seed = skills.reduce((acc, s) => acc + s.name.charCodeAt(0), 0);

  // Generate simple icicle curve
  const numPoints = 40;
  const centerX = width / 2;
  const maxWidth = width * 0.35;
  const icicleHeight = (proficiencyPercent / 100) * height;

  const curvePoints: string[] = [];
  const fillPoints: string[] = [];

  // Start from top center
  fillPoints.push(`M ${centerX} 0`);

  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    const y = t * icicleHeight;

    // Create organic wave pattern
    const wave1 = Math.sin(t * Math.PI * 3 + seed * 0.01) * maxWidth * 0.4;
    const wave2 = Math.sin(t * Math.PI * 7 + seed * 0.02) * maxWidth * 0.2;
    const taper = Math.sin(t * Math.PI) * 0.8 + 0.2; // Narrow at top and bottom

    const offset = (wave1 + wave2) * taper;
    const x = centerX + offset;

    curvePoints.push(`${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`);
    fillPoints.push(`L ${x.toFixed(2)} ${y.toFixed(2)}`);
  }

  // Close the path
  fillPoints.push(`L ${centerX} ${icicleHeight.toFixed(2)}`);
  fillPoints.push("Z");

  const curvePath = curvePoints.join(" ");
  const filledPath = fillPoints.join(" ");

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="transition-all duration-500"
    >
      <defs>
        {/* Light theme gradient */}
        <linearGradient
          id={`icicle-gradient-light-${seed}`}
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="rgb(96, 165, 250)" stopOpacity="0.5" />
          <stop offset="50%" stopColor="rgb(129, 140, 248)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="rgb(167, 139, 250)" stopOpacity="0.7" />
        </linearGradient>

        {/* Dark theme gradient */}
        <linearGradient
          id={`icicle-gradient-dark-${seed}`}
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="rgb(37, 99, 235)" stopOpacity="0.6" />
          <stop offset="50%" stopColor="rgb(79, 70, 229)" stopOpacity="0.7" />
          <stop offset="100%" stopColor="rgb(124, 58, 237)" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* Filled icicle shape - light theme */}
      <path
        d={filledPath}
        fill={`url(#icicle-gradient-light-${seed})`}
        className="transition-all duration-500 dark:hidden"
      />

      {/* Filled icicle shape - dark theme */}
      <path
        d={filledPath}
        fill={`url(#icicle-gradient-dark-${seed})`}
        className="hidden dark:block transition-all duration-500"
      />

      {/* Outline curve */}
      <path
        d={curvePath}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-blue-600 dark:text-blue-400 opacity-60"
      />

      {/* Integral symbol at bottom */}
      <text
        x={centerX}
        y={height - 5}
        textAnchor="middle"
        className="text-sm font-mono fill-gray-500 dark:fill-gray-400 opacity-40"
        style={{ userSelect: "none" }}
      >
        ∫
      </text>
    </svg>
  );
}
